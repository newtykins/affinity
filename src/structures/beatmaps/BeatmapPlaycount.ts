import Affinity from '~affinity';
import BeatmapCompact from './BeatmapCompact';

export default class BeatmapPlaycount extends BeatmapCompact {
	public count: number;

	constructor(client: Affinity, token: string, data: any) {
		super(client, token, data.beatmap);
		this.count = data?.count;
	}
}
