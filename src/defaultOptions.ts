import Affinity from '~affinity';
import { ScoreSearchTypes } from '~structures/Score';

const userScores: Affinity.Options.UserScores = {
	type: ScoreSearchTypes.Best,
	mode: 'osu',
};

export default {
	userScores,
};
