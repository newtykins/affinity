import axios, { AxiosInstance } from 'axios';
import _ from 'lodash';
import User from '~structures/User';
import Score from '~structures/Score';
import AuthenticationError from '~errors/AuthenticationError';
import BadRequestError from '~errors/BadRequestError';
import Beatmap from '~structures/beatmaps/Beatmap';
import BeatmapSet from '~structures/BeatmapSet';
import createAxios from '~functions/createAxios';
import getApiMode from '~functions/getApiMode';

interface AuthResponse {
	token: string;
	expires: number;
}

/**
 * The Affinity client!
 */
class Affinity {
	#clientId: number;
	#clientSecret: string;
	#rest: AxiosInstance;
	#authenticated: boolean = false;
	#token: string;
	#config: Affinity.Config;

	constructor(
		clientId: string | number,
		clientSecret: string,
		config?: Affinity.Config
	) {
		if (!clientId)
			throw new AuthenticationError(
				'You must provide an id for the client!'
			);
		if (isNaN(clientId as any))
			throw new AuthenticationError('Your client ID must be numeric!');
		if (!clientSecret)
			throw new AuthenticationError('You must provide a client secret!');

		// Store the client credentials
		this.#clientId = parseInt(clientId as any);
		this.#clientSecret = clientSecret;

		// Set the config
		this.#config = config ?? {};
		this.#config.defaultGamemode ??= 'osu';

		// Create the REST client
		this.#rest = createAxios();
	}

	/**
	 * Is the client currently logged in?
	 */
	public get loggedIn() {
		return this.#authenticated;
	}

	public get config() {
		return this.#config;
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
	 * Update config on the client!
	 */
	public updateConfig(config: Partial<Affinity.Config>) {
		for (const key in config) {
			this.#config[key] = config[key];
		}

		return this;
	}

	/**
	 * Fetch a user by their username or ID!
	 * @async
	 */
	public async getUser(
		query: string | number,
		mode: Affinity.Modes = this.#config.defaultGamemode
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
	 * Fetch a user's scores using their ID!
	 * @async
	 */
	public async getUserScores(
		id: number,
		options: Affinity.Options.UserScores = {
			type: 'best',
			mode: this.#config.defaultGamemode,
		}
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
				mode: this.#config.defaultGamemode,
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
	 * Fetch a beatmap by its ID!
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

			return new Beatmap(this, this.#token, data);
		}
	}

	/**
	 * Fetch a beatmap set by its ID!
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

			return new BeatmapSet(this, this.#token, data);
		}
	}

	/**
	 * Search beatmap sets with a query - returns a list of search results
	 */
	public async searchBeatmapSets(
		query: string,
		options: Affinity.Options.SearchBeatmapSets = {}
	): Promise<BeatmapSet[]> {
		// todo: support pagination
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
				(beatmapset) => new BeatmapSet(this, this.#token, beatmapset)
			);
		}
	}
}

namespace Affinity {
	export type Modes = 'osu' | 'ctb' | 'mania' | 'taiko';

	export interface Config {
		defaultGamemode?: Modes;
	}

	export namespace Options {
		export interface Pagination {
			limit?: number;
			offset?: number;
		}

		export interface UserScores extends Pagination {
			type: Score.SearchTypes;
			mode: Modes;
			includeFails?: boolean;
		}

		export interface SearchBeatmapSets {
			mode?: Modes;
			rankedStatus?: Exclude<BeatmapSet.RankStatus, 'wip' | 'approved'>;
			genre?: BeatmapSet.Genre;
			language?: BeatmapSet.Language;
			include?: 'video' | 'storyboard';
			nsfw?: boolean;
		}

		export interface RecentActivity {
			maximum?: number;
			offset?: number;
		}
	}
}

export default Affinity;
