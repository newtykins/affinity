import Affinity from '~affinity';
import { GameMode, RankStatus } from '~constants';
import User from '~structures/User';

class Beatmap {
	public rawData: any;
	#client: Affinity;

	// BeatmapCompact
	public id: number;
	public beatmapsetId: number;
	public mode: GameMode;
	public status: keyof typeof RankStatus;
	public starRating: number;
	public length: number;
	public difficultyName: string;
	public maxCombo: number;

	// Beatmap
	public difficultyStats: Beatmap.Difficulty;
	public bpm: number;
	public convert: boolean;
	public objectCounts: Beatmap.ObjectCounts;
	public passCount: number;
	public playCount: number;

	// Beatmapset

	/**
	 * The mapper's name at the time of submission - potentially outdated.
	 */
	public mapper: string;

	constructor(client: Affinity, data: any) {
		this.rawData = data;
		this.#client = client;

		this.id = data.id;
		this.beatmapsetId = data.beatmapsetId;
		this.mode = data.mode;
		this.status = data.status;
		this.starRating = data.difficultyRating;
		this.length = data.totalLength;
		this.difficultyName = data.version;
		this.maxCombo = data.maxCombo;

		this.difficultyStats = {
			cs: data.cs,
			ar: data.ar,
			od: data.acurracy,
			hp: data.drain,
		};

		this.bpm = data.bpm;
		this.convert = data.convert;

		this.objectCounts = {
			circles: data.countCircles,
			sliders: data.countSliders,
			spinners: data.countSpinners,
		};

		this.passCount = data.passCount;
		this.playCount = data.playCount;
		this.mapper = data.beatmapset.creator;
	}

	public get url() {
		return `https://osu.ppy.sh/b/${this.id}`;
	}

	public async fetchMapper(mode = this.mode): Promise<User> {
		return await this.#client.getUser(this.mapper, mode);
	}

	// todo: fetchBeatmapset
}

namespace Beatmap {
	export interface Difficulty {
		cs: number;
		ar: number;
		od: number;
		hp: number;
	}

	export interface ObjectCounts {
		circles: number;
		sliders: number;
		spinners: number;
	}
}

export default Beatmap;
