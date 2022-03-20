import ClientAuth from '~auth/ClientAuth';
import Affinity from '~affinity';
import calculateAccuracy from '~helpers/calculateAccuracy';
import User from '~structures/User';

const getScore = async (user: User, beatmapId: number) => {
	const scores = await user.fetchScores();
	return scores.find((score) => score.beatmapId === beatmapId);
};

describe('The accuracy calculation helper', () => {
	let client: Affinity;
	let shigetora: User;
	let jakads: User;
	let superw: User;
	let syaron: User;

	beforeAll(async () => {
		client = new Affinity(
			new ClientAuth(process.env.CLIENT_ID, process.env.CLIENT_SECRET)
		);

		shigetora = await client.getUser(124493);
		jakads = await client.getUser(259972, 'mania');
		superw = await client.getUser(4158549, 'ctb');
		syaron = await client.getUser(8741695, 'taiko');
	});

	it('calculates the accuracy of freedom dive (played by shigetora) correctly (osu!)', async () => {
		const freedomDive = await getScore(shigetora, 129891);
		const accuracy = calculateAccuracy('osu', freedomDive.hits);
		expect(accuracy).toBe(freedomDive.accuracy);
	});

	it('calculates the accuracy of last resort (played by jakads) correctly (osu!mania)', async () => {
		const lastResort = await getScore(jakads, 1679790);
		const accuracy = calculateAccuracy('mania', lastResort.hits);
		expect(accuracy).toBe(lastResort.accuracy);
	});

	it('calculates the accuracy of illness lilin (played by superw7) correctly (osu!ctb)', async () => {
		const illnessLilin = await getScore(superw, 2160014);
		const accuracy = calculateAccuracy('ctb', illnessLilin.hits);
		expect(accuracy).toBe(illnessLilin.accuracy);
	});

	it('calculates the accuracy of extraction zone (played by syaron105) correctly (osu!taiko)', async () => {
		const extractionZone = await getScore(syaron, 1402693);
		const accuracy = calculateAccuracy('taiko', extractionZone.hits);
		expect(accuracy).toBe(extractionZone.accuracy);
	});
});
