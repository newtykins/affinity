import Affinity from '~affinity';

export default function getApiMode(mode: Affinity.Modes): string {
	if (mode === 'ctb') return 'fruits';
	else return mode;
}
