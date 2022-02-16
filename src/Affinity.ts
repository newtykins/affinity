import axios, { Axios } from 'axios';
import _ from 'lodash';
import User from '~structures/User';
import Score from '~structures/Score';
import { Modes, ScoreSearchTypes } from '~constants';

interface AuthResponse {
	token: string;
	expires: number;
}

const camelCase = (object: Object) => {
	let newObject = {};

	for (const key in object) {
		if (typeof object[key] === 'object' && !Array.isArray(object[key])) {
			newObject[_.camelCase(key)] = camelCase(object[key]);
		} else {
			newObject[_.camelCase(key)] = object[key];
		}
	}

	return newObject;
};

// todo: comments
// todo: add more filters
class Affinity {
	#clientId: number;
	#clientSecret: string;
	private loggedIn: boolean = false;
	private rest: Axios;

	constructor(clientId: number, clientSecret: string) {
		if (!clientId)
			throw new Error('You must provide an ID for the client!');
		if (!clientSecret) throw new Error('You must provide a client secret!');

		// Store the client credentials
		this.#clientId = clientId;
		this.#clientSecret = clientSecret;

		// Create the REST client
		this.rest = axios.create({
			baseURL: 'https://osu.ppy.sh/api/v2/',
		});

		this.rest.interceptors.response.use((response) => {
			if (
				typeof response.data === 'object' &&
				!Array.isArray(response.data)
			) {
				response.data = camelCase(response.data);
			} else {
				response.data = response.data.map((v) => camelCase(v));
			}

			return response;
		});
	}

	/**
	 * Authenticate the client
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

		return { token: access_token, expires: expires_in };
	}

	/**
	 * Ensure that the client is logged in before authenticating a request!
	 * @private
	 */
	private loggedInCheck(): boolean {
		if (this.loggedIn) return true;
		else {
			throw new Error('You must be logged in to make use of Affinity!');
		}
	}

	/**
	 * Log into the API!
	 * @async
	 */
	public async login(): Promise<boolean> {
		if (!this.loggedIn) {
			const { token, expires } = await this.authenticate();

			// Update the axios instance's headers
			this.rest.defaults.headers['Authorization'] = `Bearer ${token}`;

			this.loggedIn = true;
		}

		return this.loggedIn;
	}

	/**
	 * Fetch data about a user!
	 * @async
	 */
	async getUser(
		query: string | number,
		mode: Modes = Modes.Standard
	): Promise<User> {
		if (this.loggedInCheck()) {
			const { data } = await this.rest.get(
				`users/${query}/${mode}?key=${
					typeof query === 'number' ? 'id' : 'username'
				}`
			);

			return new User(this, data);
		}
	}

	/**
	 * Fetch data about a user's scores by looking them up using their ID!
	 * @async
	 */
	async getUserScores(
		id: number,
		type: ScoreSearchTypes = ScoreSearchTypes.Best
	): Promise<Score[]> {
		if (this.loggedInCheck()) {
			const { data }: { data: any[] } = await this.rest.get(
				`users/${id}/scores/${type}`
			);

			return data.map((score) => new Score(this, score));
		}
	}
}

export default Affinity;
