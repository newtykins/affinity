import Affinity from '~affinity';
import BeatmapCompact from './BeatmapCompact';

export default class BeatmapPlaycount extends BeatmapCompact {
	public count: number;

	constructor(client: Affinity, data: any) {
		super(client, data.beatmap);
		this.count = data?.count;
	}
}
