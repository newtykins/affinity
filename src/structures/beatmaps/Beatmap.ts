import Affinity from '~affinity';
import BeatmapCompact from '~structures/beatmaps/BeatmapCompact';

class Beatmap extends BeatmapCompact {
	public rawData: any;

	public maxCombo: number;
	public difficultyStats: Beatmap.Difficulty;
	public bpm: number;
	public convert: boolean;
	public objectCounts: Beatmap.ObjectCounts;
	public passCount: number;
	public playCount: number;

	/**
	 * The mapper's name at the time of submission - potentially outdated.
	 */
	public mapper: string;

	constructor(client: Affinity, token: string, data: any) {
		super(client, token, data);
		this.rawData = data;

		this.maxCombo = data?.maxCombo;

		this.difficultyStats = {
			cs: data?.cs,
			ar: data?.ar,
			od: data?.acurracy,
			hp: data?.drain,
		};

		this.bpm = data?.bpm;
		this.convert = data?.convert;

		this.objectCounts = {
			circles: data?.countCircles,
			sliders: data?.countSliders,
			spinners: data?.countSpinners,
		};

		this.passCount = data?.passCount;
		this.playCount = data?.playCount;
		this.mapper = data?.beatmapset?.creator;
	}
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
