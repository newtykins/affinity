import Affinity from '~affinity';
import Beatmap from '~structures/Beatmap';

describe('The Beatmap structure', () => {
	let client: Affinity;
	let sunglow: Beatmap;

	beforeAll(async () => {
		client = new Affinity(
			parseInt(process.env.CLIENT_ID),
			process.env.CLIENT_SECRET
		);

		await client.login();

		sunglow = await client.getBeatmap(2486881);
	});

	it('fetches the profile of the mapper when fetchMapper is called', async () => {
		const mapper = await sunglow.fetchMapper();
		expect(mapper.previousUsernames.includes('Onlybiscuit')).toBe(true);
	});
});
