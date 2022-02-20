import Affinity from '~affinity';
import BeatmapSet from './BeatmapSet';
import User from './User';
import parseMode from '~functions/parseMode';
import links from '~helpers/links';

class BeatmapCompact {
	#client: Affinity;

	public id: number;
	public starRating: number;
	public beatmapsetId: number;
	public mode: Affinity.Modes;
	public status: BeatmapSet.RankStatus;
	public length: number;
	public mapperId: number;
	public difficultyName: string;

	constructor(client: Affinity, data: any) {
		this.#client = client;

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
}

export default BeatmapCompact;
