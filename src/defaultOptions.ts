import Affinity from '~affinity';
import { GameMode } from '~constants';
import { ScoreSearchTypes } from '~structures/Score';

const userScores: Affinity.Options.UserScores = {
	type: ScoreSearchTypes.Best,
	mode: GameMode.Standard,
};

export default {
	userScores,
};
