import Score from '~structures/scores/Score';
import Affinity from '~affinity';
import fs from 'fs';
import https from 'https';
import AuthStrategy from '~auth/AuthStrategy';
import path from 'path';
import getApiMode from '~functions/getApiMode';

export default class DownloadableScore extends Score {
	#auth: AuthStrategy;

	constructor(client: Affinity, auth: AuthStrategy, data: any) {
		super(client, data);
		this.#auth = auth;
	}

	// todo: progress with rxjs
	/**
	 * Download the replay of this score to a specified file path!
	 * @async
	 */
	public async downloadReplay(filePath: string): Promise<void> {
		// Ensure the folder exists
		const folders = path.dirname(filePath).split('\\');

		folders.forEach((folder, i) => {
			let folderPath = folder;

			for (let j = 0; j < i; j++) {
				folderPath += `/folders[j]`;
			}

			if (!fs.existsSync(folderPath)) {
				fs.mkdirSync(folderPath);
			}
		});

		return new Promise<void>((resolve, reject) => {
			const file = fs.createWriteStream(filePath);

			https
				.get(
					`https://osu.ppy.sh/api/v2/scores/${getApiMode(
						this.mode
					)}/${this.id}/download`,
					{
						headers: {
							Authorization: `Bearer ${this.#auth.token}`,
						},
					},
					(response) => {
						response.pipe(file);

						file.on('finish', () => {
							file.close(() => resolve());
						});
					}
				)
				.on('error', (err) => {
					fs.unlinkSync(filePath);
					reject(err.message);
				});
		});
	}
}
