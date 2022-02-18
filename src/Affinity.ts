import axios, { AxiosInstance } from 'axios';
import _ from 'lodash';
import User from '~structures/User';
import Score from '~structures/Score';
import AuthenticationError from '~errors/AuthenticationError';
import BadRequestError from '~errors/BadRequestError';
import Beatmap from '~structures/Beatmap';
import BeatmapSet from '~structures/BeatmapSet';
import createAxios from '~functions/createAxios';
import getApiMode from '~functions/getApiMode';

interface AuthResponse {
	token: string;
	expires: number;
}

// todo: comments
// todo: add more filters
class Affinity {
	#clientId: number;
	#clientSecret: string;
	#rest: AxiosInstance;
	#authenticated: boolean = false;
	#token: string;

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
		this.#rest = createAxios();
	}

	/**
	 * Is the client currently logged in?
	 */
	public get loggedIn() {
		return this.#authenticated;
	}

	/**
	 * Authenticate with the osu! API
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
	 * @async
	 */
	private async isLoggedIn(): Promise<boolean> {
		// If the client is not logged in, make sure to log in
		if (!this.#authenticated) {
			const { token, expires } = await this.authenticate();

			// Update the axios instance's headers
			this.#rest.defaults.headers['Authorization'] = `Bearer ${token}`;
			this.#token = token;

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
		mode: Affinity.Modes = 'osu'
	): Promise<User> {
		const key = typeof query === 'number' ? 'id' : 'username';

		if (await this.isLoggedIn()) {
			const { data } = await this.#rest.get(
				`users/${query}/${getApiMode(mode)}`,
				{
					params: {
						key,
					},
				}
			);

			return new User(this, this.#token, mode, data);
		}
	}

	/**
	 * Fetch data about a user's scores by looking them up using their id!
	 * @async
	 */
	public async getUserScores(
		id: number,
		options: Affinity.Options.UserScores = { type: 'best', mode: 'osu' }
	): Promise<Score[]> {
		if (await this.isLoggedIn()) {
			// Ensure that the ID provided is a number
			if (isNaN(id))
				throw new BadRequestError(
					'You can only search for scores using an id!'
				);

			// Make the request
			const { type, mode, includeFails, limit, offset } = options ?? {
				type: 'best',
				mode: 'osu',
			};

			const { data }: { data: any[] } = await this.#rest.get(
				`users/${id}/scores/${type}`,
				{
					params: {
						include_fails: includeFails ? 1 : 0,
						mode: getApiMode(mode),
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
			type: Score.SearchTypes;
			mode: Modes;
			includeFails?: boolean;
			limit?: number;
			offset?: number;
		}

		export interface SearchBeatmapSets {
			mode?: Modes;
			rankedStatus?: Exclude<BeatmapSet.RankStatus, 'wip' | 'approved'>;
			genre?: BeatmapSet.Genre;
			language?: BeatmapSet.Language;
			include?: 'video' | 'storyboard';
			nsfw?: boolean;
		}
	}

	export type Modes = 'osu' | 'ctb' | 'mania' | 'taiko';
}

export default Affinity;
