import Affinity from '~affinity';
import User from '~structures/User';
import Beatmap from '~structures/beatmaps/Beatmap';
import BeatmapSet from '~structures/BeatmapSet';
import parseMode from '~functions/parseMode';
import links from '~helpers/links';

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
	public hasReplay: boolean;
	public beatmapId: number;
	public beatmapSetId: number;

	constructor(client: Affinity, data: any) {
		const { statistics } = data;

		this.rawData = data;
		this.#client = client;

		this.id = data?.id;
		this.userId = data?.userId;
		this.mods = data?.mods;
		this.score = data?.score;
		this.maximumCombo = data?.maxCombo;
		this.passed = data?.passed;
		this.perfect = data?.perfect;
		this.rank = data?.rank;
		this.createdAt = new Date(data?.createdAt);
		this.pp = data?.pp;
		this.mode = parseMode(data?.mode);
		this.hasReplay = data?.replay;
		this.beatmapId = data?.beatmap?.id;
		this.beatmapSetId = data?.beatmapset?.id;
		this.accuracy = parseFloat(
			(parseFloat(data?.accuracy) * 100).toFixed(2)
		);

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
		return links.score(this.mode, this.id);
	}

	/**
	 * Fetch the user associated with this score!
	 * @async
	 */
	public async fetchUser(
		mode: Affinity.Modes = this.#client.config.defaultGamemode
	): Promise<User> {
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
		return await this.#client.getBeatmapSet(this.beatmapSetId);
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
