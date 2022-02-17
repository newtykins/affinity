import Affinity from '~affinity';
import BeatmapSet from '~structures/BeatmapSet';

describe('The Beatmap Set structure', () => {
	let client: Affinity;
	let sinkIntoTheDeepSeaWorld: BeatmapSet;

	beforeAll(async () => {
		client = new Affinity(
			parseInt(process.env.CLIENT_ID),
			process.env.CLIENT_SECRET
		);

		await client.login();
		sinkIntoTheDeepSeaWorld = await client.getBeatmapSet(779495);
		console.log(sinkIntoTheDeepSeaWorld);
	});

	it('can fetch difficulities living on the beatmap set', async () => {
		const difficulty = [
			...sinkIntoTheDeepSeaWorld.difficulties.values(),
		][0];
		const beatmap = await difficulty.fetchBeatmap();

		expect(beatmap.beatmapsetId).toBe(sinkIntoTheDeepSeaWorld.id);
	});
});
