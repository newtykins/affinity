import Affinity from '~affinity';
import Score from '~structures/Score';

type ManiaHitData = Score.Hits;
type TaikoHitData = Omit<ManiaHitData, 'hit50'>;
type OsuHitData = Omit<ManiaHitData, 'geki' | 'katu'>;
type CTBHitData = Omit<ManiaHitData, 'geki'>;

type AccuracyData<M extends Affinity.Modes> = M extends 'taiko'
	? TaikoHitData
	: M extends 'osu'
	? OsuHitData
	: M extends 'ctb'
	? CTBHitData
	: M extends 'mania'
	? ManiaHitData
	: ManiaHitData;

export default function calculateAccuracy<M extends Affinity.Modes>(
	mode: M,
	data: AccuracyData<M>
) {
	const { hit300, hit100, hit50, miss, geki, katu } = data as ManiaHitData;
	let accuracy = 0;

	switch (mode) {
		case 'osu':
			accuracy =
				(100 * (6 * hit300 + 2 * hit100 + hit50)) /
				(6 * (hit50 + hit100 + hit300 + miss));
			break;
		case 'taiko':
			accuracy =
				(100 * (2 * hit300 + hit100)) / (2 * (hit300 + hit100 + miss));
			break;
		case 'ctb':
			accuracy =
				(100 * (hit300 + hit100 + hit50)) /
				(hit300 + hit100 + hit50 + katu + miss);
			break;
		case 'mania':
			accuracy =
				(100 *
					(6 * geki + 6 * hit300 + 4 * katu + 2 * hit100 + hit50)) /
				(6 * (hit50 + hit100 + hit300 + miss + geki + katu));
			break;
	}

	return parseFloat(accuracy.toFixed(2));
}
