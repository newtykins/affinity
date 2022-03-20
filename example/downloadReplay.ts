import Affinity, { UserAuth } from '../dist';
import inquirer from 'inquirer';
import path from 'path';

const args = process.argv.slice(2);

// Setting up the Affinity client
// const client = new Affinity(new UserAuth('username', 'password'));
const client = new Affinity(new UserAuth('Newt x3', 'javaScript666!'));

// Get rid of irrelevant arguments
const main = async () => {
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

	indexes.forEach(async (index) => {
		const score = leaderboard[index];
		const { username } = await score.fetchUser();

		console.log(`Downloading ${username}'s replay`);

		score
			.downloadReplay(path.join(__dirname, 'replays', `${username}.osr`))
			.then(() => console.log(`Downloaded ${username}'s replay!`));
	});
};

main().then(() => process.exit());
