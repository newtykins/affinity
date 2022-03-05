import Affinity from '~affinity';
import Beatmap from '~structures/beatmaps/Beatmap';

describe('The Beatmap structure', () => {
	let client: Affinity;
	let sunglow: Beatmap;

	beforeAll(async () => {
		client = new Affinity(
			parseInt(process.env.CLIENT_ID),
			process.env.CLIENT_SECRET
		);

		sunglow = await client.getBeatmap(2486881);
	});

	it('fetches the profile of the mapper when fetchMapper is called', async () => {
		const mapper = await sunglow.fetchMapper();
		expect(mapper.id).toBe(7785535);
	});

	it('can fetch the beatmap set that the beatmap belongs to', async () => {
		const beatmapset = await sunglow.fetchBeatmapSet();
		expect(beatmapset.id).toBe(1193588);
	});
});
