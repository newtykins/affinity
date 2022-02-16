import Affinity from '~affinity';
import User from '~structures/User';

describe('The Affinity Client', () => {
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

	//* Login tests
	it('does not log in when no credentials are provided', async () => {
		try {
			// @ts-ignore
			const differentClient = new Affinity();
		} catch (e) {
			expect(e).toBeInstanceOf(Error);
		}
	});

	it('can log into the API using client credentials', async () => {
		const differentClient = new Affinity(
			parseInt(process.env.CLIENT_ID),
			process.env.CLIENT_SECRET
		);

		expect(await differentClient.login()).toBe(true);
	});

	//* User tests
	it('finds the correct ID for the username "Newt x3"', async () => {
		const data = await client.getUser('Newt x3');
		expect(data.id).toBe(newtUser.id);
	});

	it("can find a user's best scores using the method on the client", async () => {
		const [score] = await client.getUserScores(newtUser.id);

		expect(score.userId).toBe(newtUser.id);
	});

	it("can find a user's recent scores using the method on a user class", async () => {
		const [score] = await newtUser.getScores();

		expect(score.userId).toBe(newtUser.id);
	});
});
