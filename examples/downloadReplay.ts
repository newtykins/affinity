import Affinity, { UserAuth } from '../dist';
import inquirer from 'inquirer';
import path from 'path';

const args = process.argv.slice(2);

// Setting up the Affinity client
const client = new Affinity(new UserAuth('username', 'password'));

const slowIterate = <T>(
	arr: T[],
	seconds: number,
	callback: (item: T) => void
) => {
	if (arr.length === 0) {
		return;
	}

	callback(arr[0]);

	setTimeout(() => {
		slowIterate(arr.slice(1), seconds, callback);
	}, seconds * 1000);
};

// Get rid of irrelevant arguments
const main = () => {
	return new Promise<void>(async (resolve) => {
		if (isNaN(args[0] as any) || !args[0])
			throw new Error('You must provide a beatmap ID!s');

		const mapId = parseInt(args[0]);
		const beatmap = await client.getBeatmap(mapId);
		const leaderboard = await beatmap.fetchLeaderboard();

		const answers = Object.values(
			await inquirer.prompt({
				type: 'checkbox',
				name: 'Which replay would you like to download?',
				choices: await Promise.all(
					leaderboard.map(async (score, i) => {
						return {
							name: `#${i + 1}. ${
								(await score.fetchUser()).username
							} - ${score.pp}`,
							value: i,
						};
					})
				),
			})
		);

		const indexes = answers[0] as number[];

		slowIterate(indexes, 7, async (index) => {
			const score = leaderboard[index];
			const { username } = await score.fetchUser();
			const filePath = path.join(__dirname, 'replays', `${username}.osr`);

			console.log(`Downloading ${username}'s replay`);

			score
				.downloadReplay(filePath)
				.then(() => console.log(`Downloaded ${username}'s replay!`));
		});
	});
};

main();
