import Affinity from '~affinity';
import AuthenticationError from '~errors/AuthenticationError';
import BadRequestError from '~errors/BadRequestError';
import User from '~structures/User';

const clientId = parseInt(process.env.CLIENT_ID);
const clientSecret = process.env.CLIENT_SECRET;

describe('The Affinity Client', () => {
	let client: Affinity;
	let newt: User;

	beforeAll(async () => {
		client = new Affinity(clientId, clientSecret);
		newt = await client.getUser(16009610);
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

	//* User tests
	it('finds the correct id for the username "Newt x3"', async () => {
		const data = await client.getUser(newt.username);
		expect(data.id).toBe(newt.id);
	});

	//* User Score tests
	it("can find a user's best scores", async () => {
		const [score] = await client.getUserScores(newt.id);
		expect(score.userId).toBe(newt.id);
	});

	it('throws an error when you try looking for scores with a username', async () => {
		try {
			// @ts-ignore
			const [score] = await client.getUserScores(newt.username);
		} catch (e) {
			expect(e).toBeInstanceOf(BadRequestError);
		}
	});

	//* Beatmap tests
	it(`can find the difficulty of the beatmap with the id 2486881`, async () => {
		const beatmap = await client.getBeatmap(2486881);
		expect(beatmap.difficultyName).toBe('Harmony');
	});

	//* Beatmap set tests
	it('can list the difficulties on the beatmap with the id 2486881', async () => {
		const beatmapset = await client.getBeatmapSet(1193588);
		const difficulties = beatmapset.beatmaps.map(
			(beatmap) => beatmap.difficultyName
		);

		expect(difficulties).toEqual(expect.arrayContaining(['Harmony']));
	});

	it('can search for beatmap sets', async () => {
		const beatmapsets = await client.searchBeatmapSets('Sunglow');
		expect(beatmapsets.length).toBeGreaterThan(0);
	});
});
