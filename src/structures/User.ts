import type { AxiosInstance } from 'axios';
import createAxios from '~functions/createAxios';
import Affinity from '~affinity';
import BeatmapSet from './BeatmapSet';
import BeatmapPlaycount from './BeatmapPlaycount';
import links from '~helpers/links';

class User {
	public rawData: any;
	#client: Affinity;
	#rest: AxiosInstance;
	#mode: Affinity.Modes;

	public id: number;
	public username: string;
	public avatar: string;
	public coverUrl: string;
	public joinDate: Date;
	public kudosu: User.Kudosu;
	public profile: User.Profile;
	public country: User.Country;
	public statistics: User.Statistics;
	public badges: User.Badge[];
	public playcounts: User.Playcount[];
	public achievements: User.Achievement[];
	public rankHistory: User.RankHistory;
	public previousUsernames: string[];
	public isActive: boolean;
	public isBot: boolean;
	public isOnline: boolean;
	public currentSupporter: boolean;
	public hasSupported: boolean;
	public playstyles: User.Playstyle[];

	constructor(
		client: Affinity,
		token: string,
		mode: Affinity.Modes,
		data: any
	) {
		this.rawData = data;
		this.#client = client;
		this.#rest = createAxios(token);
		this.#mode = mode;

		const { statistics } = data;

		this.id = data?.id;
		this.username = data?.username;
		this.avatar = data?.avatarUrl;
		this.coverUrl = data?.coverUrl;
		this.joinDate = new Date(data?.joinDate);
		this.playstyles = data?.playstyle;
		this.kudosu = data?.kudosu;
		this.country = data?.country;
		this.isActive = data?.isActive;
		this.isBot = data?.isBot;
		this.isOnline = data?.isOnline;
		this.currentSupporter = data?.isSupporter;
		this.hasSupported = data?.hasSupported;

		this.profile = {
			occupation: data?.occupation,
			website: data?.website,
			discord: data?.discord,
			followers: data?.followerCount,
			previousNames: data?.previousUsernames,
		};

		this.statistics = {
			level: statistics?.level?.current,
			globalRank: statistics?.globalRank,
			pp: statistics?.pp,
			rankedScore: statistics?.rankedScore,
			hitAccuracy: statistics?.hitAccuracy,
			playCount: statistics?.playCount,
			playTime: statistics?.playTime,
			totalScore: statistics?.totalScore,
			totalHits: statistics?.totalHits,
			maximumCombo: statistics?.maximumCombo,
			rankCounts: statistics?.gradeCounts,
			countryRank: statistics?.countryRank,
		};

		this.badges = data?.badges?.map(({ awardedAt, ...data }) => {
			return {
				...data,
				awardedAt: new Date(awardedAt),
			};
		});

		this.playcounts = data?.monthlyPlaycounts.map((p) => {
			return {
				startDate: p.start_date,
				count: p.count,
			};
		});

		this.achievements = data?.userAchievements.map((a) => {
			return {
				id: a.achievement_id,
				achievedAt: new Date(a.achieved_at),
			};
		});

		this.rankHistory = data?.rankHistory;
		this.previousUsernames = data?.previousUsernames;
	}

	public get url() {
		return links.user(this.id);
	}

	/**
	 * Fetch scores associated with this user!
	 * @async
	 */
	public async fetchScores(
		options: Affinity.Options.UserScores = {
			type: 'best',
			mode: this.#mode,
		}
	) {
		return await this.#client.getUserScores(this.id, options);
	}

	/**
	 * Fetch beatmaps relating to this user!
	 * @async
	 */
	public async fetchBeatmaps<T extends User.BeatmapTypes = 'favourite'>(
		type?: T
	): Promise<T extends 'most_played' ? BeatmapPlaycount[] : BeatmapSet[]> {
		// @ts-expect-error - ensure there is a type
		type = type ?? 'favourite';

		// Make the request
		const { data }: { data: any[] } = await this.#rest.get(
			`users/${this.id}/beatmapsets/${type}`
		);

		if (type === 'most_played') {
			// @ts-expect-error
			return data.map(
				(beatmap) => new BeatmapPlaycount(this.#client, beatmap)
			);
		} else {
			// @ts-expect-error
			return data.map((beatmap) => new BeatmapSet(this.#client, beatmap));
		}
	}
}

namespace User {
	export type Playstyle = 'mouse' | 'keyboard' | 'tablet' | 'touch';

	export type BeatmapTypes =
		| 'favourite'
		| 'graveyard'
		| 'loved'
		| 'most_played'
		| 'pending'
		| 'ranked'
		| 'pending';

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
