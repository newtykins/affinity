import Affinity from '~affinity';
import BeatmapSet from '~structures/BeatmapSet';
import User from '~structures/User';

describe('The User structure', () => {
	let client: Affinity;
	let newt: User;

	beforeAll(async () => {
		client = new Affinity(
			parseInt(process.env.CLIENT_ID),
			process.env.CLIENT_SECRET
		);

		newt = await client.getUser(16009610);
	});

	it("can find a user's recent scores", async () => {
		const [score] = await newt.fetchScores();
		expect(score.userId).toBe(newt.id);
	});

	it("can fetch a user's favourite beatmaps successfully", async () => {
		const beatmaps = await newt.fetchBeatmaps();
		const undercoverMartyn = beatmaps.find((b) => b.id === 1337086);
		expect(undercoverMartyn).toBeInstanceOf(BeatmapSet);
	});
});