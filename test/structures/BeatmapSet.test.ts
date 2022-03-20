import ClientAuth from '~auth/ClientAuth';
import Affinity from '~affinity';
import BeatmapSet from '~structures/BeatmapSet';

describe('The Beatmap Set structure', () => {
	let client: Affinity;
	let sinkIntoTheDeepSeaWorld: BeatmapSet;

	beforeAll(async () => {
		client = new Affinity(
			new ClientAuth(process.env.CLIENT_ID, process.env.CLIENT_SECRET)
		);

		sinkIntoTheDeepSeaWorld = await client.getBeatmapSet(779495);
	});

	it('can fetch the mapper of the beatmap set', async () => {
		const mapper = await sinkIntoTheDeepSeaWorld.fetchMapper();
		expect(mapper.id).toBe(7184125);
	});
});
