import path from 'path';
import Affinity from '~affinity';
import Beatmap from '~structures/beatmaps/Beatmap';
import DownloadableScore from '~structures/scores/DownloadableScore';
import UserAuth from '~auth/UserAuth';
import fs from 'fs';

const replaysDir = path.join(__dirname, '..', 'replays');

describe('The Beatmap structure', () => {
	let client: Affinity<UserAuth>;
	let sunglow: Beatmap<UserAuth>;
	let leaderboard: DownloadableScore[];

	beforeAll(async () => {
		fs.mkdirSync(replaysDir);

		client = new Affinity(
			new UserAuth(process.env.USERNAME, process.env.PASSWORD)
		);

		sunglow = await client.getBeatmap(2486881);
		leaderboard = await sunglow.fetchLeaderboard();
	});

	afterAll(() => {
		fs.rmSync(replaysDir, { recursive: true, force: true });
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

	it('can download a replay from the leaderboard', async () => {
		const score =
			leaderboard[Math.floor(Math.random() * leaderboard.length)];
		const { username } = await score.fetchUser();
		const filePath = path.join(replaysDir, `${username}.osr`);

		score.downloadReplay(filePath).then(() => {
			expect(fs.existsSync(filePath)).toBeTruthy();
		});
	});
});
