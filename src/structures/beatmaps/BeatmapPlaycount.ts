import Affinity from '~affinity';
import AuthStrategy from '~auth/AuthStrategy';
import BeatmapCompact from './BeatmapCompact';

export default class BeatmapPlaycount<
	AuthType extends AuthStrategy
> extends BeatmapCompact<AuthType> {
	public count: number;

	constructor(client: Affinity<AuthType>, auth: AuthStrategy, data: any) {
		super(client, auth, data.beatmap);
		this.count = data?.count;
	}
}
