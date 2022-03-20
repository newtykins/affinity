import ClientAuth from '~auth/ClientAuth';
import path from 'path';
import Affinity from '~affinity';
import Beatmap from '~structures/beatmaps/Beatmap';
import Score from '~structures/scores/Score';

describe('The Beatmap structure', () => {
	let client: Affinity;
	let sunglow: Beatmap;
	let leaderboard: Score[];

	beforeAll(async () => {
		client = new Affinity(
			new ClientAuth(process.env.CLIENT_ID, process.env.CLIENT_SECRET)
		);

		sunglow = await client.getBeatmap(2486881);
		leaderboard = await sunglow.fetchLeaderboard();
	});

	it('fetches the profile of the mapper when fetchMapper is called', async () => {
		const mapper = await sunglow.fetchMapper();
		expect(mapper.id).toBe(7785535);
	});

	it('can fetch the beatmap set that the beatmap belongs to', async () => {
		const beatmapset = await sunglow.fetchBeatmapSet();
		expect(beatmapset.id).toBe(1193588);
	});

	it('can fetch the leaderboards for a beatmap', async () => {
		expect(leaderboard.length).toBe(50);
	});

	// it('can download a replay from the leaderboard', async () => {
	// 	const score =
	// 		leaderboard[Math.floor(Math.random() * leaderboard.length)];

	// 	score
	// 		.downloadReplay(
	// 			path.join(
	// 				__dirname,
	// 				'..',
	// 				'replays',
	// 				(await score.fetchUser()).username
	// 			)
	// 		)
	// 		.then(() => expect(true).toBeTruthy());
	// });
});
