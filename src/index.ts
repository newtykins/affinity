import Affinity from './Affinity';
import Mods from '~helpers/Mods';
import { GameMode, RankStatus } from '~constants';
import { ScoreSearchTypes } from '~structures/Score';

export default Affinity;

const mods = new Mods();
export { mods as Mods, GameMode, RankStatus, ScoreSearchTypes };
