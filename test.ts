import Affinity from './dist';
import dotenv from 'dotenv';

dotenv.config();
(async () => {
	const client = new Affinity(
		process.env.CLIENT_ID,
		process.env.CLIENT_SECRET
	);

	const beatmapset = await client.getBeatmapSet(779495);
	console.log(await beatmapset.fetchMapper());
	client.updateConfig({ defaultGamemode: 'ctb' });
	console.log(await beatmapset.fetchMapper());
})();
