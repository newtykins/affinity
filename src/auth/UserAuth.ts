import axios, { AxiosInstance } from 'axios';
import AuthStrategy, { AuthResponse } from '~auth/AuthStrategy';
import AuthenticationError from '~errors/AuthenticationError';
import createAxios from '~functions/createAxios';

/**
 * An authentication strategy that signs in with the username and password of an osu! account
 */
export default class UserAuth implements AuthStrategy {
	#username: string;
	#password: string;

	public authenticated: boolean;
	public token: string;
	public rest: AxiosInstance;

	constructor(username: string, password: string) {
		if (!username)
			throw new AuthenticationError('You must provide a username!');
		if (!password)
			throw new AuthenticationError('You must provide a password!');

		// Store the credentials
		this.#username = username;
		this.#password = password;

		// Create the REST client
		this.rest = createAxios();
	}

	/**
	 * Authenticate with the osu! API
	 * @private
	 * @async
	 */
	private async authenticate(): Promise<AuthResponse> {
		// Fetch the user's access token
		const {
			data: { access_token, expires_in },
		} = await axios.post(`https://osu.ppy.sh/oauth/token`, {
			username: this.#username,
			password: this.#password,
			grant_type: 'password',
			scope: '*',
			client_id: 5,
			client_secret: 'FGc9GAtyHzeQDshWP5Ah7dega8hJACAJpQtw6OXk',
		});

		return { token: access_token, expires: expires_in * 1000 };
	}

	/**
	 * Ensure that the client is authenticated!
	 * @async
	 */
	async checkAuthentication(): Promise<boolean> {
		// If the client is not logged in, make sure to log in
		if (!this.authenticated) {
			const { token, expires } = await this.authenticate();

			// Mark the client as logged out
			setTimeout(() => {
				this.authenticated = false;
			}, expires);

			this.authenticated = true;
			this.token = token;
			this.rest.defaults.headers['Authorization'] = `Bearer ${token}`;
		}

		return this.authenticated;
	}
}
