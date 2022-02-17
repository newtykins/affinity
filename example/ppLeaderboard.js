const { default: Affinity, GameMode } = require('../dist');

const ppLeaderboard = async (ids) => {
	// Setting up the Affinity client
	const client = new Affinity(
		10397,
		'iLFVYjrYsKKnggGQ1xIOptHWxp96LGem0x8WTVrd'
	);

	await client.login();

	// Fetch user data
	let users = await Promise.all(
		ids.map(async (id) => await client.getUser(id, GameMode.Standard)) // standard is default, but we are declaring it here just to demonstrate the usage of enums
	);

	// Sort the users by their PP values
	users = users.sort((a, b) => b.statistics.pp - a.statistics.pp);

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
