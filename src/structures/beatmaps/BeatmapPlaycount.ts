import Affinity from '~affinity';
import AuthStrategy from '~auth/AuthStrategy';
import BeatmapCompact from './BeatmapCompact';

export default class BeatmapPlaycount extends BeatmapCompact {
	public count: number;

	constructor(client: Affinity, auth: AuthStrategy, data: any) {
		super(client, auth, data.beatmap);
		this.count = data?.count;
	}
}
