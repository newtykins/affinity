import Affinity from '~affinity';
import BeatmapSet from '~structures/BeatmapSet';
import User from '~structures/User';
import parseMode from '~functions/parseMode';
import links from '~helpers/links';
import AuthStrategy from '~auth/AuthStrategy';
import DownloadableScore from '~structures/scores/DownloadableScore';
import UserAuth from '~auth/UserAuth';
import Score from '~structures/scores/Score';

class BeatmapCompact<AuthType extends AuthStrategy = AuthStrategy> {
	#client: Affinity<AuthType>;
	#auth: AuthStrategy;

	public id: number;
	public starRating: number;
	public beatmapsetId: number;
	public mode: Affinity.Modes;
	public status: BeatmapSet.RankStatus;
	public length: number;
	public mapperId: number;
	public difficultyName: string;

	constructor(client: Affinity<AuthType>, auth: AuthStrategy, data: any) {
		this.#client = client;
		this.#auth = auth;

		this.id = data?.id;
		this.beatmapsetId = data?.beatmapsetId;
		this.mode = parseMode(data?.mode);
		this.status = data?.status;
		this.starRating = data?.difficultyRating;
		this.length = data?.totalLength;
		this.difficultyName = data?.version;
		this.mapperId = data?.userId;
	}

	public get url() {
		return links.beatmap(this.id);
	}

	/**
	 * Fetch the mapper of the beatmap!
	 * @async
	 */
	public async fetchMapper(mode = this.mode): Promise<User> {
		return await this.#client.getUser(this.mapperId, mode);
	}

	/**
	 * Fetch the beatmap set this beatmap belongs to!
	 * @async
	 */
	public async fetchBeatmapSet(): Promise<BeatmapSet> {
		return await this.#client.getBeatmapSet(this.beatmapsetId);
	}

	// todo: allow mod input
	/**
	 * Fetch the top 50 scores on the beatmap!
	 * @async
	 */
	public async fetchLeaderboard(): Promise<
		AuthType extends UserAuth ? DownloadableScore[] : Score[]
	> {
		if (await this.#auth.authenticated) {
			const {
				data: { scores },
			}: { data: { scores: any[] } } = await this.#auth.rest.get(
				`beatmaps/${this.id}/scores`,
				{
					params: {
						type: 'global',
						mode: this.mode,
					},
				}
			);

			return scores.map(
				(score) =>
					new DownloadableScore(this.#client, this.#auth, score)
			);
		}
	}
}

export default BeatmapCompact;
