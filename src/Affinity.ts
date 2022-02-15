import axios, { Axios } from 'axios';
import _ from 'lodash';
import User from '~structures/User';
import { Modes } from './constants';

// todo: comments
class Affinity {
	private clientId: number;
	private clientSecret: string;
	private loggedIn: boolean = false;
	private rest: Axios;
	static Modes = Modes;

	constructor(clientId: number, clientSecret: string) {
		if (!clientId)
			throw new Error('You must provide an ID for the client!');
		if (!clientSecret) throw new Error('You must provide a client secret!');

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

			if (access_token) {
				// Create a new axios REST client
				this.rest = axios.create({
					baseURL: 'https://osu.ppy.sh/api/v2/',
					headers: {
						Authorization: `Bearer ${access_token}`,
					},
				});

				// Ensure that all properties are camel case
				const camelCase = (object: Object) => {
					let newObject = {};

					for (const key in object) {
						if (
							typeof object[key] === 'object' &&
							!Array.isArray(object[key])
						) {
							newObject[_.camelCase(key)] = camelCase(
								object[key]
							);
						} else {
							newObject[_.camelCase(key)] = object[key];
						}
					}

					return newObject;
				};

				this.rest.interceptors.response.use((response) => {
					response.data = camelCase(response.data);

					return response;
				});

				this.loggedIn = true;
			}
		}

		return this.loggedIn;
	}

	async getUser(
		query: string | number,
		mode: Modes = Affinity.Modes.Standard
	): Promise<User> {
		if (this.loggedIn) {
			const { data } = await this.rest.get(
				`users/${query}/${mode}?key=${
					typeof query === 'number' ? 'id' : 'username'
				}`
			);

			return new User(data);
		} else {
			throw new Error(
				'You must be logged in to fetch data about a user!'
			);
		}
	}
}

export default Affinity;
