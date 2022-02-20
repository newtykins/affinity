import Affinity from '~affinity';

export default function parseMode(mode: string): Affinity.Modes {
	if (mode === 'fruits') return 'ctb';
	else return mode as Affinity.Modes;
}
