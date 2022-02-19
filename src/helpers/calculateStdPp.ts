import ojsama from 'ojsama';
import axios from 'axios';
import Score from '~structures/Score';
import calculateAccuracy from './calculateAccuracy';
import Mods from './Mods';

type HitAccuracy = Omit<Score.Hits, 'geki' | 'katu' | 'miss'>;

interface PPStats {
	accuracy?: number | HitAccuracy;
	combo?: number;
	miss?: number;
	mods?: Mods.ModCombos;
}

interface PPResult {
	starStats: {
		aim: number;
		speed: number;
	};

	ppStats: {
		aim: number;
		speed: number;
		accuracy: number;
	};

	starRating: number;
	pp: number;
}

const fetchBeatmap = async (beatmapId: number): Promise<string> => {
	const { data } = await axios.get(`https://osu.ppy.sh/osu/${beatmapId}`, {
		responseType: 'blob',
	});

	return data;
};

export default async function calculateStdPp(
	beatmapId: number,
	stats?: PPStats
): Promise<PPResult> {
	let { accuracy, combo, miss, mods } = stats ?? {};

	// Prepare the calculator
	const beatmap = await fetchBeatmap(beatmapId);
	const parser = new ojsama.parser();
	parser.feed(beatmap);

	const map = parser.map;
	const stars = new ojsama.diff().calc({
		map,
		mods: mods ? new Mods().parseString(mods) : null,
	});
	const maxCombo = map.max_combo();

	// Validate the data
	miss ??= 0;
	accuracy ??= 100;
	combo ??= maxCombo;

	if (accuracy > 100) accuracy = 100;
	else if (accuracy < 0) accuracy = 0;

	if (combo > maxCombo) combo = maxCombo;
	else if (combo < 0) combo = 0;

	// Calculate the pp
	const pp = ojsama.ppv2({
		stars,
		combo,
		nmiss: miss,
		n300: (accuracy as HitAccuracy)?.hit300,
		n100: (accuracy as HitAccuracy)?.hit100,
		n50: (accuracy as HitAccuracy)?.hit50,
		acc_percent:
			typeof accuracy === 'number'
				? accuracy
				: calculateAccuracy('osu', { miss, ...accuracy }),
	});

	return {
		starStats: {
			aim: stars.aim,
			speed: stars.speed,
		},
		ppStats: {
			aim: pp.aim,
			speed: pp.speed,
			accuracy: pp.acc,
		},
		starRating: stars.total,
		pp: pp.total,
	};
}
