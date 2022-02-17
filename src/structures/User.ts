import Affinity from '~affinity';
import { ScoreSearchTypes } from '~constants';
import defaultOptions from '~defaults';

class User {
	public rawData: any;
	#client: Affinity;

	public id: number;
	public username: string;
	public avatar: string;
	public coverUrl: string;
	public joinDate: Date;
	public playstyle: User.Playstyle[];
	public kudosu: User.Kudosu;
	public profile: User.Profile;
	public country: User.Country;
	public statistics: User.Statistics;
	public badges: User.Badge[];
	public playcounts: User.Playcount[];
	public achievements: User.Achievement[];
	public rankHistory: User.RankHistory;

	public active: boolean;
	public bot: boolean;
	public online: boolean;
	public supporter: boolean;
	public hasSupported: boolean;

	constructor(client: Affinity, data: any) {
		// Provide the raw data
		this.rawData = data;
		this.#client = client;

		// Parse the data
		this.id = data.id;
		this.username = data.username;
		this.avatar = data.avatarUrl;
		this.coverUrl = data.coverUrl;
		this.joinDate = new Date(data.joinDate);
		this.playstyle = data.playstyle;
		this.kudosu = data.kudosu;
		this.country = data.country;
		this.active = data.isActive;
		this.bot = data.isBot;
		this.online = data.isOnline;
		this.supporter = data.isSupporter;
		this.hasSupported = data.hasSupported;

		this.profile = {
			occupation: data.occupation,
			website: data.website,
			discord: data.discord,
			followers: data.followerCount,
			previousNames: data.previousUsernames,
		};

		this.statistics = {
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
		};

		this.badges = data.badges?.map(({ awardedAt, ...data }) => {
			return {
				...data,
				awardedAt: new Date(awardedAt),
			};
		});

		this.playcounts = data.monthlyPlaycounts.map((p) => {
			return {
				startDate: p.start_date,
				count: p.count,
			};
		});

		this.achievements = data.userAchievements.map((a) => {
			return {
				id: a.achievement_id,
				achievedAt: new Date(a.achieved_at),
			};
		});

		this.rankHistory = data.rankHistory;
	}

	/**
	 * Fetch scores associated with this user!
	 * @async
	 */
	public async getScores(
		options: Affinity.Options.UserScores = defaultOptions.userScores
	) {
		return await this.#client.getUserScores(this.id, options);
	}
}

namespace User {
	export type Playstyle = 'mouse' | 'keyboard' | 'tablet' | 'touch';

	export interface Kudosu {
		total: number;
		available: number;
	}

	export interface Profile {
		occupation: string;
		website: string;
		discord: string;
		followers: number;
		previousNames: string[];
	}

	export interface Country {
		code: string;
		name: string;
	}

	export interface Statistics {
		level: number;
		globalRank: number;
		pp: number;
		rankedScore: number;
		hitAccuracy: number;
		playCount: number;
		playTime: number;
		totalScore: number;
		totalHits: number;
		maximumCombo: number;

		rankCounts: {
			ss: number;
			ssh: number;
			s: number;
			sh: number;
			a: number;
		};

		countryRank: number;
	}

	export interface Badge {
		url: string;
		imageUrl: string;
		description: string;
		awardedAt: Date;
	}

	export interface Playcount {
		startDate: string;
		count: number;
	}

	export interface Achievement {
		id: number;
		achievedAt: Date;
	}

	export interface RankHistory {
		mode: string;
		data: number[];
	}
}

export default User;
