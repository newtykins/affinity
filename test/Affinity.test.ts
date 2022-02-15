import Affinity from '../src/Affinity';

describe('The Affinity Client', () => {
	let client: Affinity;

	beforeAll(async () => {
		client = new Affinity(
			parseInt(process.env.CLIENT_ID),
			process.env.CLIENT_SECRET
		);

		await client.login();
	});

	it('can log into the API using client credentials', async () => {
		const differentClient = new Affinity(
			parseInt(process.env.CLIENT_ID),
			process.env.CLIENT_SECRET
		);

		expect(await differentClient.login()).toBe(true);
	});

	it('finds the correct ID for the username "Newt x3"', async () => {
		const data = await client.getUser('Newt x3');
		expect(data.id).toBe(16009610);
	});
});
