import Affinity from '~affinity';
import BeatmapSet from '~structures/BeatmapSet';
import User from '~structures/User';
import parseMode from '~functions/parseMode';
import links from '~helpers/links';
import createAxios from '~functions/createAxios';
import { AxiosInstance } from 'axios';
import Score from '~structures/Score';

class BeatmapCompact {
	#client: Affinity;
	#rest: AxiosInstance;

	public id: number;
	public starRating: number;
	public beatmapsetId: number;
	public mode: Affinity.Modes;
	public status: BeatmapSet.RankStatus;
	public length: number;
	public mapperId: number;
	public difficultyName: string;

	constructor(client: Affinity, token: string, data: any) {
		this.#client = client;
		this.#rest = createAxios(token);

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

	/**
	 * Fetch the top 50 scores on the beatmap!
	 */
	public async fetchLeaderboard(): Promise<Score[]> {
		console.log(this.mode);

		const {
			data: { scores },
		}: { data: { scores: any[] } } = await this.#rest.get(
			`beatmaps/${this.id}/scores`,
			{
				params: {
					type: 'global',
				},
			}
		);

		return scores.map((score) => new Score(this.#client, score));
	}
}

export default BeatmapCompact;
