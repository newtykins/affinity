import Affinity from '~affinity';
import { Modes, ScoreSearchTypes } from '~constants';

const userScores: Affinity.Options.UserScores = {
	type: ScoreSearchTypes.Best,
	mode: Modes.Standard,
};

export default {
	userScores,
};
