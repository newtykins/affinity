import { Modes } from '~constants';
import Affinity from '~affinity';
import User from './User';

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
	public mode: Modes;
	public replay: boolean;

	// todo: public beatmap: Beatmap;
	// todo: public beatmapSet: BeatmapSet;
	// todo: public user: UserCompact;

	constructor(client: Affinity, data: any) {
		// Provide the raw data
		this.rawData = data;
		this.#client = client;

		const { statistics } = data;

		// Parse the data
		this.id = data.id;
		this.userId = data.userId;
		this.accuracy = data.accuracy;
		this.mods = data.mods;
		this.score = data.score;
		this.maximumCombo = data.maxCombo;
		this.passed = data.passed;
		this.perfect = data.perfect;

		this.hits = {
			50: statistics['count50'],
			100: statistics['count100'],
			300: statistics['count300'],
			geki: statistics.countGeki,
			katu: statistics.countKatu,
			miss: statistics.countMiss,
		};

		this.rank = data.rank;
		(this.createdAt = new Date(data.createdAt)), (this.pp = data.pp);
		this.mode = data.mode;
		this.replay = data.replay;
	}

	/**
	 * Fetch the user associated with this score!
	 * @async
	 */
	public async fetchUser(mode: Modes = Modes.Standard): Promise<User> {
		return this.userId ? this.#client.getUser(this.userId, mode) : null;
	}
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

export default Score;
