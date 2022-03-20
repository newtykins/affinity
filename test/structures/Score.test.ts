import ClientAuth from '~auth/ClientAuth';
import Affinity from '~affinity';
import Score from '~structures/scores/Score';
import User from '~structures/User';

describe('The Score structure', () => {
	let client: Affinity<ClientAuth>;
	let toy: User<ClientAuth>;
	let sidetrackedDay: Score;

	beforeAll(async () => {
		client = new Affinity(
			new ClientAuth(process.env.CLIENT_ID, process.env.CLIENT_SECRET)
		);

		toy = await client.getUser(2757689);

		const [score] = await toy.fetchScores();
		sidetrackedDay = score;
	});

	it('can find the user associated with a set of scores', async () => {
		const user = await sidetrackedDay.fetchUser();
		expect(user.id).toBe(toy.id);
	});

	it('can find the beatmap the score was set on', async () => {
		const beatmap = await sidetrackedDay.fetchBeatmap();
		expect(beatmap.id).toBe(1754777);
	});

	it('can find the beatmap set the score was set on', async () => {
		const beatmapset = await sidetrackedDay.fetchBeatmapSet();
		expect(beatmapset.id).toBe(838182);
	});
});
