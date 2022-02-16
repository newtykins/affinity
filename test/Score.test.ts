import Affinity from '~affinity';
import User from '~structures/User';

describe('The Score structure', () => {
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

	it('can find the user associated with a set of scores', async () => {
		const [score] = await client.getUserScores(newtUser.id);
		const user = await score.fetchUser();

		expect(user.id).toBe(newtUser.id);
	});
});
