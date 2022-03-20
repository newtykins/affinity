import Score from '~structures/scores/Score';
import Affinity from '~affinity';
import fs from 'fs';
import https from 'https';
import AuthStrategy from '~auth/AuthStrategy';

export default class DownloadableScore extends Score {
	#auth: AuthStrategy;

	constructor(client: Affinity, auth: AuthStrategy, data: any) {
		super(client, data);
		this.#auth = auth;
	}

	public async downloadReplay(path: string) {
		return new Promise((resolve, reject) => {
			const file = fs.createWriteStream(path);

			https
				.get(
					`https://osu.ppy.sh/api/v2/scores/${this.mode}/${this.id}/download`,
					{
						headers: {
							Authorization: `Bearer ${this.#auth.token}`,
						},
					},
					(response) => {
						response.pipe(file);

						file.on('finish', () => {
							file.close(resolve);
						});
					}
				)
				.on('error', (err) => {
					fs.unlinkSync(path);
					reject(err.message);
				});
		});
	}
}
