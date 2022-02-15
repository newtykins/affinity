import Affinity from '../src/Affinity';

describe('The Affinity Client', () => {
	let client: Affinity;

	beforeEach(() => {
		client = new Affinity(
			parseInt(process.env.CLIENT_ID),
			process.env.CLIENT_SECRET
		);
	});

	it('can log into the API using client credentials', async () => {
		const loggedIn = await client.login();
		expect(loggedIn).toBe(true);
	});
});
