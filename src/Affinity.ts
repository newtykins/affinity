import axios, { Axios } from 'axios';
import _ from 'lodash';
import User from '~structures/User';
import Score, { ScoreSearchTypes } from '~structures/Score';
import { GameMode, Genre, Language, RankStatus } from '~constants';
import AuthenticationError from '~errors/AuthenticationError';
import BadRequestError from '~errors/BadRequestError';
import defaultOptions from '~defaults';
import Beatmap from '~structures/Beatmap';
import BeatmapSet from '~structures/BeatmapSet';

interface AuthResponse {
	token: string;
	expires: number;
}

const camelCase = (object: object | object[]) => {
	let newObject = {};

	for (const key in object) {
		const newKey = _.camelCase(key);

		if (typeof object[key] === 'object' && !Array.isArray(object[key])) {
			newObject[newKey] = camelCase(object[key]);
		} else if (Array.isArray(object[key])) {
			newObject[newKey] = [];

			object[key].forEach((value) => {
				if (typeof value === 'object') value = camelCase(value);
				newObject[newKey].push(value);
			});
		} else {
			newObject[newKey] = object[key];
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
	#authenticated: boolean = false;

	constructor(clientId: number, clientSecret: string) {
		if (!clientId)
			throw new AuthenticationError(
				'You must provide an id for the client!'
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
	 * Is the client currently logged in?
	 */
	public get loggedIn() {
		return this.#authenticated;
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
	private async isLoggedIn(): Promise<boolean> {
		// If the client is not logged in, make sure to log in
		if (!this.#authenticated) {
			const { token, expires } = await this.authenticate();

			// Update the axios instance's headers
			this.#rest.defaults.headers['Authorization'] = `Bearer ${token}`;

			// Mark the client as logged out
			setTimeout(() => {
				this.#authenticated = false;
			}, expires);

			this.#authenticated = true;
		}

		return this.#authenticated;
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

		if (await this.isLoggedIn()) {
			const { data } = await this.#rest.get(`users/${query}/${mode}`, {
				params: {
					key,
				},
			});

			return new User(this, data);
		}
	}

	/**
	 * Fetch data about a user's scores by looking them up using their id!
	 * @async
	 */
	public async getUserScores(
		id: number,
		options: Affinity.Options.UserScores = defaultOptions.userScores
	): Promise<Score[]> {
		if (await this.isLoggedIn()) {
			// Ensure that the ID provided is a number
			if (isNaN(id))
				throw new BadRequestError(
					'You can only search for scores using an id!'
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
	 * Fetch data about a beatmap by its id!
	 * @async
	 */
	public async getBeatmap(id: number) {
		if (await this.isLoggedIn()) {
			// Ensure that the ID provided is a number
			if (isNaN(id))
				throw new BadRequestError(
					'You can only fetch a beatmap by its id!'
				);

			// Make the request
			const { data } = await this.#rest.get(`beatmaps/${id}`);

			return new Beatmap(this, data);
		}
	}

	/**
	 * Fetch data about a beatmap set by its id!
	 * @async
	 */
	public async getBeatmapSet(id: number): Promise<BeatmapSet> {
		if (await this.isLoggedIn()) {
			// Ensure that the ID provided is a number
			if (isNaN(id))
				throw new BadRequestError(
					'You can only fetch a beatmapset by its id!'
				);

			// Make the request
			const { data } = await this.#rest.get(`beatmapsets/${id}`);

			return new BeatmapSet(this, data);
		}
	}

	public async searchBeatmapSets(
		query: string,
		options: Affinity.Options.SearchBeatmapSets = {}
	): Promise<BeatmapSet[]> {
		const { mode, rankedStatus, genre, language, include, nsfw } = options;

		if (await this.isLoggedIn()) {
			// Make the request
			const {
				data: { beatmapsets },
			}: { data: { beatmapsets: any[] } } = await this.#rest.get(
				'beatmapsets/search',
				{
					params: {
						q: query,
						m: mode,
						s: rankedStatus,
						g: genre,
						l: language,
						e: include,
						nsfw,
					},
				}
			);

			return beatmapsets.map(
				(beatmapset) => new BeatmapSet(this, beatmapset)
			);
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

		export interface SearchBeatmapSets {
			mode?: GameMode;
			rankedStatus?: Exclude<keyof typeof RankStatus, 'wip' | 'approved'>;
			genre?: Genre;
			language?: Language;
			include?: 'video' | 'storyboard';
			nsfw?: boolean;
		}
	}
}

export default Affinity;
