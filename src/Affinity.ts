import axios, { Axios } from 'axios';
import _ from 'lodash';

enum Modes {
	CTB = 'fruits',
	Mania = 'mania',
	Standard = 'osu',
	Taiko = 'taiko',
}

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
	): Promise<Affinity.User> {
		if (this.loggedIn) {
			const { data } = await this.rest.get(
				`users/${query}/${mode}?key=${
					typeof query === 'number' ? 'id' : 'username'
				}`
			);

			return {
				id: data.id,
				username: data.username,
				avatar: data.avatarUrl,
				coverUrl: data.coverUrl,
				joinDate: new Date(data.joinDate),
				playstyle: data.playstyle,

				kudosu: data.kudosu,

				profile: {
					occupation: data.occupation,
					website: data.website,
					discord: data.discord,
					followers: data.followerCount,
					previousNames: data.previousUsernames,
				},

				country: data.country,

				information: {
					active: data.isActive,
					bot: data.isBot,
					online: data.isOnline,
					supporter: data.isSupporter,
					hasSupported: data.hasSupported,
				},

				statistics: {
					level: data.statistics.level.current,
					globalRank: data.statistics.globalRank,
					pp: data.statistics.pp,
					rankedScore: data.statistics.rankedScore,
					hitAccuracy: data.statistics.hitAccuracy,
					playCount: data.statistics.playCount,
					playTime: data.statistics.playTime,
					totalScore: data.statistics.totalScore,
					totalHits: data.statistics.totalHits,
					maximumCombo: data.statistics.maximumCombo,
					rankCounts: data.statistics.gradeCounts,
					countryRank: data.statistics.countryRank,
				},

				badges: data.badges?.map(({ awardedAt, ...data }) => {
					return {
						...data,
						awardedAt: new Date(awardedAt),
					};
				}),

				playcounts: data.monthlyPlaycounts.map((p) => {
					return {
						startDate: p.start_date,
						count: p.count,
					};
				}),

				achievements: data.userAchievements.map((a) => {
					return {
						id: a.achievement_id,
						achievedAt: new Date(a.achieved_at),
					};
				}),

				rankHistory: data.rankHistory,
			};
		} else {
			throw new Error(
				'You must be logged in to fetch data about a user!'
			);
		}
	}
}

export default Affinity;
