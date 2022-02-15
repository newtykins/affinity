import axios, { Axios } from 'axios';

export default class {
	private clientId: number;
	private clientSecret: string;
	private loggedIn: boolean = false;
	private token: string;

	private rest: Axios;

	constructor(clientId: number, clientSecret: string) {
		this.clientId = clientId;
		this.clientSecret = clientSecret;
	}

	/**
	 * Log into the API!
	 */
	public async login(): Promise<boolean> {
		if (!this.loggedIn) {
			// Fetch the user's access token
			const {
				data: { access_token },
			} = await axios.post(`https://osu.ppy.sh/oauth/token`, {
				client_id: this.clientId,
				client_secret: this.clientSecret,
				grant_type: 'client_credentials',
				scope: 'public',
			});

			this.token = access_token;

			if (access_token) {
				// Create a new axios REST client
				this.rest = axios.create({
					baseURL: 'https://osu.ppy.sh/api/v2/',
					headers: {
						Authorization: `Bearer ${access_token}`,
					},
				});

				this.loggedIn = true;

				return true;
			} else return false;
		} else {
			return true;
		}
	}
}
