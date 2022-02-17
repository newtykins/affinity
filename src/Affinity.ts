import axios, { Axios } from 'axios';
import _ from 'lodash';
import User from '~structures/User';
import Score from '~structures/Score';
import { GameMode, ScoreSearchTypes } from '~constants';
import AuthenticationError from '~errors/AuthenticationError';
import BadRequestError from '~errors/BadRequestError';
import defaultOptions from '~defaults';
import Beatmap from '~structures/Beatmap';

interface AuthResponse {
	token: string;
	expires: number;
}

const camelCase = (object: Object) => {
	let newObject = {};

	for (const key in object) {
		if (typeof object[key] === 'object' && !Array.isArray(object[key])) {
			newObject[_.camelCase(key)] = camelCase(object[key]);
		} else {
			newObject[_.camelCase(key)] = object[key];
		}
	}

	return newObject;
};

// todo: comments
// todo: add more filters
class Affinity {
	#clientId: number;
	#clientSecret: string;
	#rest: Axios;
	public loggedIn: boolean = false;

	constructor(clientId: number, clientSecret: string) {
		if (!clientId)
			throw new AuthenticationError(
				'You must provide an ID for the client!'
			);
		if (!clientSecret)
			throw new AuthenticationError('You must provide a client secret!');

		// Store the client credentials
		this.#clientId = clientId;
		this.#clientSecret = clientSecret;

		// Create the REST client
		this.#rest = axios.create({
			baseURL: 'https://osu.ppy.sh/api/v2/',
		});

		this.#rest.interceptors.response.use((response) => {
			if (
				typeof response.data === 'object' &&
				!Array.isArray(response.data)
			) {
				response.data = camelCase(response.data);
			} else {
				response.data = response.data.map((v) => camelCase(v));
			}

			return response;
		});
	}

	/**
	 * Authenticate the client
	 * @private
	 * @async
	 */
	private async authenticate(): Promise<AuthResponse> {
		// Fetch the user's access token
		const {
			data: { access_token, expires_in },
		} = await axios.post(`https://osu.ppy.sh/oauth/token`, {
			client_id: this.#clientId,
			client_secret: this.#clientSecret,
			grant_type: 'client_credentials',
			scope: 'public',
		});

		return { token: access_token, expires: expires_in * 1000 };
	}

	/**
	 * Ensure that the client is logged in before authenticating a request!
	 * @private
	 */
	private loggedInCheck(): boolean {
		if (this.loggedIn) return true;
		else {
			throw new AuthenticationError(
				'You must be logged in to make use of Affinity!'
			);
		}
	}

	/**
	 * Log into the API!
	 * @async
	 */
	public async login(): Promise<boolean> {
		const refresh = async () => {
			const { token, expires } = await this.authenticate();

			// Update the axios instance's headers
			this.#rest.defaults.headers['Authorization'] = `Bearer ${token}`;

			// Refresh the token on expiry
			setTimeout(async () => await refresh(), expires);
		};

		if (!this.loggedIn) {
			await refresh();
			this.loggedIn = true;
		}

		return this.loggedIn;
	}

	/**
	 * Fetch data about a user!
	 * @async
	 */
	public async getUser(
		query: string | number,
		mode: GameMode = GameMode.Standard
	): Promise<User> {
		const key = typeof query === 'number' ? 'id' : 'username';

		if (this.loggedInCheck()) {
			const { data } = await this.#rest.get(`users/${query}/${mode}`, {
				params: {
					key,
				},
			});

			return new User(this, data);
		}
	}

	/**
	 * Fetch data about a user's scores by looking them up using their ID!
	 * @async
	 */
	public async getUserScores(
		id: number,
		options: Affinity.Options.UserScores = defaultOptions.userScores
	): Promise<Score[]> {
		if (this.loggedInCheck()) {
			// Ensure that the ID provided is a number
			if (isNaN(id))
				throw new BadRequestError(
					'You can only search for scores using an ID!'
				);

			// Make the request
			const { type, mode, includeFails, limit, offset } = options;
			const { data }: { data: any[] } = await this.#rest.get(
				`users/${id}/scores/${type}`,
				{
					params: {
						include_fails: includeFails ? 1 : 0,
						mode,
						limit,
						offset,
					},
				}
			);

			// Turn the data from the API into Affinity-wrapped scores
			return data.map((score) => new Score(this, score));
		}
	}

	/**
	 * Fetch data about a beatmap by its ID!
	 * @async
	 */
	public async getBeatmap(id: number) {
		if (this.loggedInCheck()) {
			// Ensure that the ID provided is a number
			if (isNaN(id))
				throw new BadRequestError(
					'You can only fetch a beatmap by its ID!'
				);

			// Make the request
			const { data } = await this.#rest.get(`beatmaps/${id}`);

			return new Beatmap(this, data);
		}
	}
}

namespace Affinity {
	export namespace Options {
		export interface UserScores {
			type: ScoreSearchTypes;
			mode: GameMode;
			includeFails?: boolean;
			limit?: number;
			offset?: number;
		}
	}
}

export default Affinity;
