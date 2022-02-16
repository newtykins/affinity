import Affinity from '~affinity';
import AuthenticationError from '~errors/AuthenticationError';
import BadRequestError from '~errors/BadRequestError';
import User from '~structures/User';

const clientId = parseInt(process.env.CLIENT_ID);
const clientSecret = process.env.CLIENT_SECRET;

describe('The Affinity Client', () => {
	let client: Affinity;
	let newtUser: User;

	beforeAll(async () => {
		client = new Affinity(clientId, clientSecret);
		await client.login();

		newtUser = await client.getUser(16009610);
	});

	//* Login tests
	it('does not log in when no credentials are provided', async () => {
		try {
			// @ts-ignore
			const differentClient = new Affinity();
		} catch (e) {
			expect(e).toBeInstanceOf(AuthenticationError);
		}
	});

	it('can log into the API using client credentials', async () => {
		const differentClient = new Affinity(clientId, clientSecret);
		expect(await differentClient.login()).toBe(true);
	});

	it('can not use a method when not logged in', async () => {
		try {
			const differentClient = new Affinity(clientId, clientSecret);
			const user = await differentClient.getUser(newtUser.id);
		} catch (e) {
			expect(e).toBeInstanceOf(AuthenticationError);
		}
	});

	//* User tests
	it('finds the correct ID for the username "Newt x3"', async () => {
		const data = await client.getUser(newtUser.username);
		console.log(newtUser.username, data.id, client.loggedIn);
		expect(data.id).toBe(newtUser.id);
	});

	it("can find a user's best scores", async () => {
		const [score] = await client.getUserScores(newtUser.id);
		expect(score.userId).toBe(newtUser.id);
	});

	it('throws an error when you try looking for scores with a username', async () => {
		try {
			// @ts-ignore
			const [score] = await client.getUserScores(newtUser.username);
		} catch (e) {
			expect(e).toBeInstanceOf(BadRequestError);
		}
	});
});
