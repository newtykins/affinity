import Affinity from '~affinity';
import { GameMode, RankStatus } from '~constants';
import BeatmapSet from './BeatmapSet';
import User from './User';

class BeatmapCompact {
	#client: Affinity;

	public id: number;
	public starRating: number;
	public beatmapsetId: number;
	public mode: GameMode;
	public status: keyof typeof RankStatus;
	public length: number;
	public mapperId: number;
	public difficultyName: string;

	constructor(client: Affinity, data: any) {
		this.#client = client;

		this.id = data?.id;
		this.beatmapsetId = data?.beatmapsetId;
		this.mode = data?.mode;
		this.status = data?.status;
		this.starRating = data?.difficultyRating;
		this.length = data?.totalLength;
		this.difficultyName = data?.version;
		this.mapperId = data?.userId;
	}

	public get url() {
		return `https://osu.ppy.sh/b/${this.id}`;
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

namespace BeatmapCompact {}

export default BeatmapCompact;
