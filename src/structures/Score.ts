import Affinity from '~affinity';
import User from './User';
import Beatmap from './Beatmap';
import BeatmapSet from './BeatmapSet';
import parseMode from '~functions/parseMode';

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
	public mode: Affinity.Modes;
	public replay: boolean;
	public beatmapId: number;
	public beatmapsetId: number;

	constructor(client: Affinity, data: any) {
		const { statistics } = data;

		this.rawData = data;
		this.#client = client;

		this.id = data?.id;
		this.userId = data?.userId;
		this.accuracy = data?.accuracy;
		this.mods = data?.mods;
		this.score = data?.score;
		this.maximumCombo = data?.maxCombo;
		this.passed = data?.passed;
		this.perfect = data?.perfect;
		this.rank = data?.rank;
		this.createdAt = new Date(data?.createdAt);
		this.pp = data?.pp;
		this.mode = parseMode(data?.mode);
		this.replay = data?.replay;
		this.beatmapId = data?.beatmap?.id;
		this.beatmapsetId = data?.beatmapset?.id;

		this.hits = {
			hit50: statistics?.['count50'],
			hit100: statistics?.['count100'],
			hit300: statistics?.['count300'],
			geki: statistics?.countGeki,
			katu: statistics?.countKatu,
			miss: statistics?.countMiss,
		};
	}

	public get url() {
		return `https://osu.ppy.sh/scores/${this.mode}/${this.id}`;
	}

	/**
	 * Fetch the user associated with this score!
	 * @async
	 */
	public async fetchUser(mode: Affinity.Modes = 'osu'): Promise<User> {
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
}

namespace Score {
	export type SearchTypes = 'best' | 'first' | 'recent';

	export interface Hits {
		hit50: number;
		hit100: number;
		hit300: number;
		geki: number;
		katu: number;
		miss: number;
	}
}

export default Score;
