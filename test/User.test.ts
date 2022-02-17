import Affinity from '~affinity';
import User from '~structures/User';

describe('The User structure', () => {
	let client: Affinity;
	let newtUser: User;

	beforeAll(async () => {
		client = new Affinity(
			parseInt(process.env.CLIENT_ID),
			process.env.CLIENT_SECRET
		);

		await client.login();

		newtUser = await client.getUser(16009610);
	});

	it("can find a user's recent scores", async () => {
		const [score] = await newtUser.getScores();
		expect(score.userId).toBe(newtUser.id);
	});
});
