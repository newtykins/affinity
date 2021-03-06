import Affinity, { ClientAuth } from '../dist';

// Setting up the Affinity client
const client = new Affinity(
	new ClientAuth('your-client-id', 'your-super-secret-password')
);

const ppLeaderboard = async (ids: number[]) => {
	// Fetch user data
	let users = await Promise.all(
		ids.map(async (id) => await client.getUser(id))
	);

	// Sort the users by their PP values
	users = users.sort((a, b) => b.statistics.pp - a.statistics.pp);

	console.log('--- PP Leaderboard ---');

	// Output the information
	users.forEach((user, i) => {
		console.log(
			`${i + 1}. ${
				user.username
			} (${user.statistics.pp.toLocaleString()} pp)`
		);
	});
};

ppLeaderboard([
	16009610, // Newt x3
	7562902, // mrekk
	4384207, // DigitalHypno
]).then(() => process.exit());
