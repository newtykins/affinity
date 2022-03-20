import _ from 'lodash';
import User from '~structures/User';
import Score from '~structures/scores/Score';
import BadRequestError from '~errors/BadRequestError';
import Beatmap from '~structures/beatmaps/Beatmap';
import BeatmapSet from '~structures/BeatmapSet';
import getApiMode from '~functions/getApiMode';
import AuthStrategy from '~auth/AuthStrategy';

/**
 * The Affinity client!
 */
class Affinity {
	#auth: AuthStrategy;
	#authenticated: boolean = false;
	#config: Affinity.Config;

	constructor(auth: AuthStrategy, config?: Affinity.Config) {
		this.#auth = auth;
		this.#config = config ?? {};
		this.#config.defaultGamemode ??= 'osu';
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

		if (await this.#auth.checkAuthentication()) {
			const { data } = await this.#auth.rest.get(
				`users/${query}/${getApiMode(mode)}`,
				{
					params: {
						key,
					},
				}
			);

			return new User(this, this.#auth, mode, data);
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
		if (await this.#auth.checkAuthentication()) {
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

			const { data }: { data: any[] } = await this.#auth.rest.get(
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
		if (await this.#auth.checkAuthentication()) {
			// Ensure that the ID provided is a number
			if (isNaN(id))
				throw new BadRequestError(
					'You can only fetch a beatmap by its id!'
				);

			// Make the request
			const { data } = await this.#auth.rest.get(`beatmaps/${id}`);

			return new Beatmap(this, this.#auth, data);
		}
	}

	/**
	 * Fetch a beatmap set by its ID!
	 * @async
	 */
	public async getBeatmapSet(id: number): Promise<BeatmapSet> {
		if (await this.#auth.checkAuthentication()) {
			// Ensure that the ID provided is a number
			if (isNaN(id))
				throw new BadRequestError(
					'You can only fetch a beatmapset by its id!'
				);

			// Make the request
			const { data } = await this.#auth.rest.get(`beatmapsets/${id}`);

			return new BeatmapSet(this, this.#auth, data);
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

		if (await this.#auth.checkAuthentication()) {
			// Make the request
			const {
				data: { beatmapsets },
			}: { data: { beatmapsets: any[] } } = await this.#auth.rest.get(
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
				(beatmapset) => new BeatmapSet(this, this.#auth, beatmapset)
			);
		}
	}
}

namespace Affinity {
	export type Modes = 'osu' | 'ctb' | 'mania' | 'taiko';
	export type LoginMethod = 'client' | 'user';

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
