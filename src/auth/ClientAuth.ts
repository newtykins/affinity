import axios, { AxiosInstance } from 'axios';
import AuthStrategy, { AuthResponse } from '~auth/AuthStrategy';
import AuthenticationError from '~errors/AuthenticationError';
import createAxios from '~functions/createAxios';

/**
 * An authentication strategy that signs in with the details of an OAuth client
 */
export default class ClientAuth implements AuthStrategy {
	#clientId: number;
	#clientSecret: string;

	public authenticated: boolean;
	public token: string;
	public rest: AxiosInstance;

	constructor(clientId: string | number, clientSecret: string) {
		if (!clientId)
			throw new AuthenticationError(
				'You must provide an id for the client!'
			);
		if (isNaN(clientId as any))
			throw new AuthenticationError('Your client ID must be numeric!');
		if (!clientSecret)
			throw new AuthenticationError('You must provide a client secret!');

		// Store the client credentials
		this.#clientId = parseInt(clientId as any);
		this.#clientSecret = clientSecret;

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
			client_id: this.#clientId,
			client_secret: this.#clientSecret,
			grant_type: 'client_credentials',
			scope: 'public',
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
