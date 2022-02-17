import Affinity from '~affinity';
import { GameMode, ScoreSearchTypes } from '~constants';

const userScores: Affinity.Options.UserScores = {
	type: ScoreSearchTypes.Best,
	mode: GameMode.Standard,
};

export default {
	userScores,
};
