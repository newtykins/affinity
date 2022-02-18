import Affinity, { calculateAccuracy } from '~affinity';
import User from '~structures/User';

describe('The accuracy calculation helper', () => {
	let client: Affinity;
	let shigetora: User;

	beforeAll(async () => {
		client = new Affinity(
			parseInt(process.env.CLIENT_ID),
			process.env.CLIENT_SECRET
		);

		shigetora = await client.getUser(124493);
	});

	it("calculates the accuracy of shigetora's freedom dive play to be 99.83%", async () => {
		const topScores = await shigetora.fetchScores();
		const freedomDive = topScores.find(
			(score) => score.beatmapId === 129891
		);
		const calculatedAccuracy = calculateAccuracy('osu', freedomDive.hits);

		expect(calculatedAccuracy).toBe(99.83);
	});
});
