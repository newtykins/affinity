import { GameMode } from '~constants';
import Affinity from '~affinity';
import User from './User';
import Beatmap from './Beatmap';
import BeatmapSet from './BeatmapSet';

class Score {
	public rawData: any;
	#client: Affinity;

	public id: number;
	public userId: number;
	public accuracy: number;
	public mods: string[];
	public score: number;
	public maximumCombo: string;
	public passed: boolean;
	public perfect: boolean;
	public hits: Score.Hits;
	public rank: string;
	public createdAt: Date;
	public pp: number;
	public mode: GameMode;
	public replay: boolean;
	public beatmapId: number;
	public beatmapsetId: number;

	constructor(client: Affinity, data: any) {
		this.rawData = data;
		this.#client = client;

		const { statistics } = data;

		this.id = data?.id;
		this.userId = data?.userId;
		this.accuracy = data?.accuracy;
		this.mods = data?.mods;
		this.score = data?.score;
		this.maximumCombo = data?.maxCombo;
		this.passed = data?.passed;
		this.perfect = data?.perfect;

		this.hits = {
			50: statistics?.['count50'],
			100: statistics?.['count100'],
			300: statistics?.['count300'],
			geki: statistics?.countGeki,
			katu: statistics?.countKatu,
			miss: statistics?.countMiss,
		};

		this.rank = data?.rank;
		this.createdAt = new Date(data?.createdAt);
		this.pp = data?.pp;
		this.mode = data?.mode;
		this.replay = data?.replay;
		this.beatmapId = data?.beatmap?.id;
		this.beatmapsetId = data?.beatmapset?.id;
	}

	public get url() {
		return `https://osu.ppy.sh/scores/${this.mode}/${this.id}`;
	}

	/**
	 * Fetch the user associated with this score!
	 * @async
	 */
	public async fetchUser(mode: GameMode = GameMode.Standard): Promise<User> {
		return await this.#client.getUser(this.userId, mode);
	}

	/**
	 * Fetch the beatmap this score was set on!
	 * @async
	 */
	public async fetchBeatmap(): Promise<Beatmap> {
		return await this.#client.getBeatmap(this.beatmapId);
	}

	/**
	 * Fetch the beatmap set of the beatmap this score was set on!
	 * @async
	 */
	public async fetchBeatmapSet(): Promise<BeatmapSet> {
		return await this.#client.getBeatmapSet(this.beatmapsetId);
	}

	// todo: fetchBeatmapset
}

namespace Score {
	export type SearchTypes = 'best' | 'first' | 'recents';

	export interface Hits {
		50: number;
		100: number;
		300: number;
		geki: number;
		katu: number;
		miss: number;
	}
}

enum ScoreSearchTypes {
	Best = 'best',
	First = 'first',
	Recent = 'recent',
}

export default Score;
export { ScoreSearchTypes };
