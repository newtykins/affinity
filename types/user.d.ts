declare namespace Affinity {
	type Playstyles = 'mouse' | 'keyboard' | 'tablet' | 'touch';

	interface UserBadge {
		url: string;
		imageUrl: string;
		description: string;
		awardedAt: Date;
	}

	interface Playcount {
		startDate: string;
		count: number;
	}

	interface Achievement {
		id: number;
		achievedAt: Date;
	}

	export interface User {
		id: number;
		username: string;
		avatar: string;
		coverUrl: string;
		joinDate: Date;
		playstyle: Playstyles[];

		kudosu: {
			total: number;
			available: number;
		};

		profile: {
			occupation: string;
			website: string;
			discord: string;
			followers: number;
			previousNames: string[];
		};

		country: {
			code: string;
			name: string;
		};

		information: {
			active: boolean;
			bot: boolean;
			online: boolean;
			supporter: boolean;
			hasSupported: boolean;
		};

		statistics: {
			level: number;
			globalRank: number;
			pp: number;
			rankedScore: number;
			hitAccuracy: number;
			playCount: number;
			playTime: number;
			totalScore: number;
			totalHits: number;
			maximumCombo: nuumber;

			rankCounts: {
				ss: number;
				ssh: number;
				s: number;
				sh: number;
				a: number;
			};

			countryRank: number;
		};

		badges: UserBadge[];
		playcounts: Playcount[];
		achievements: Achievement[];

		rankHistory: {
			mode: string;
			data: number[];
		};
	}
}
