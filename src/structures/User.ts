import type { AxiosInstance } from 'axios';
import createAxios from '~functions/createAxios';
import Affinity from '~affinity';
import { UserBeatmapTypes } from '~constants';
import defaultOptions from '~defaults';
import Beatmap from './Beatmap';
import BeatmapCompact from './BeatmapCompact';
import BeatmapSet from './BeatmapSet';
import BeatmapPlaycount from './BeatmapPlaycount';

class User {
	public rawData: any;
	#client: Affinity;
	#rest: AxiosInstance;

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
	public previousUsernames: string[];

	public active: boolean;
	public bot: boolean;
	public online: boolean;
	public supporter: boolean;
	public hasSupported: boolean;

	constructor(client: Affinity, token: string, data: any) {
		this.rawData = data;
		this.#client = client;
		this.#rest = createAxios(token);

		const { statistics } = data;

		this.id = data?.id;
		this.username = data?.username;
		this.avatar = data?.avatarUrl;
		this.coverUrl = data?.coverUrl;
		this.joinDate = new Date(data?.joinDate);
		this.playstyle = data?.playstyle;
		this.kudosu = data?.kudosu;
		this.country = data?.country;
		this.active = data?.isActive;
		this.bot = data?.isBot;
		this.online = data?.isOnline;
		this.supporter = data?.isSupporter;
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
		return `https://osu.ppy.sh/u/${this.id}`;
	}

	/**
	 * Fetch scores associated with this user!
	 * @async
	 */
	public async fetchScores(
		options: Affinity.Options.UserScores = defaultOptions.userScores
	) {
		return await this.#client.getUserScores(this.id, options);
	}

	/**
	 * Fetch beatmaps relating to this user!
	 * @async
	 */
	public async fetchBeatmaps<
		T extends UserBeatmapTypes = UserBeatmapTypes.Favourite
	>(
		type?: T
	): Promise<
		T extends UserBeatmapTypes.MostPlayed
			? BeatmapPlaycount[]
			: BeatmapSet[]
	> {
		// @ts-expect-error - ensure there is a type
		type = type ?? UserBeatmapTypes.Favourite;

		// Make the request
		const { data }: { data: any[] } = await this.#rest.get(
			`users/${this.id}/beatmapsets/${type}`
		);

		if (type === UserBeatmapTypes.MostPlayed) {
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
