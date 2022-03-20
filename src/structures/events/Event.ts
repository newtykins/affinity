import Affinity from '~affinity';

type GameMode = Omit<Affinity.Modes, 'ctb'> | 'fruits';

interface BaseEvent {
	createdAt: string; // todo: convert to date
	id: number;
	type: UserEvent.Type;
}

namespace UserEvent {
	export type Type =
		| 'achievement'
		| 'beatmapPlaycount'
		| 'beatmapsetApprove'
		| 'beatmapsetDelete'
		| 'beatmapsetRevive'
		| 'beatmapsetUpdate'
		| 'beatmapsetUpload'
		| 'rank'
		| 'rankLost'
		| 'userSupportAgain'
		| 'userSupportFirst'
		| 'userSupportGift'
		| 'usernameChange';

	interface Beatmap {
		title: string;
		url: string;
	}

	interface BeatmapSet {
		title: string;
		url: string;
	}

	interface User {
		username: string;
		url: string;
	}

	interface AchievementData {
		iconUrl: string;
		id: number;
		name: string;
		grouping: string;
		ordering: number;
		slug: string;
		description: string;
		mode: string;
	}

	export namespace Structures {
		export interface Achievement extends BaseEvent {
			achievement: AchievementData;
			user: User;
		}

		export interface BeatmapPlaycount extends BaseEvent {
			beatmap: Beatmap;
			count: number;
		}

		export interface BeatmapSetApprove extends BaseEvent {
			approval: 'ranked' | 'approved' | 'qualified' | 'loved';
			beatmapSet: BeatmapSet;
			user: User;
		}

		export interface BeatmapSetDelete extends BaseEvent {
			beatmapSet: BeatmapSet;
		}

		export interface BeatmapSetRevive extends BaseEvent {
			beatmapSet: BeatmapSet;
			user: User;
		}

		export interface BeatmapSetUpdate extends BaseEvent {
			beatmapSet: BeatmapSet;
			user: User;
		}

		export interface BeatmapSetUpload extends BaseEvent {
			beatmapSet: BeatmapSet;
			user: User;
		}

		export interface Rank extends BaseEvent {
			scoreRank: string;
			rank: number;
			mode: GameMode;
			beatmap: Beatmap;
			user: User;
		}

		export interface RankLost extends BaseEvent {
			mode: GameMode;
			beatmap: Beatmap;
			user: User;
		}

		export interface UserSupportAgain extends BaseEvent {
			user: User;
		}

		export interface UserSupportFirst extends BaseEvent {
			user: User;
		}

		export interface UserSupportGift extends BaseEvent {
			user: User;
		}

		export interface UsernameChange extends BaseEvent {
			user: User & {
				previousUsername: string;
			};
		}
	}
}

type UserEvent<T extends UserEvent.Type> = T extends 'achievement'
	? UserEvent.Structures.Achievement
	: T extends 'beatmapPlaycount'
	? UserEvent.Structures.BeatmapPlaycount
	: T extends 'beatmapsetApprove'
	? UserEvent.Structures.BeatmapSetApprove
	: T extends 'beatmapsetDelete'
	? UserEvent.Structures.BeatmapSetDelete
	: T extends 'beatmapsetRevive'
	? UserEvent.Structures.BeatmapSetRevive
	: T extends 'beatmapsetUpdate'
	? UserEvent.Structures.BeatmapSetUpdate
	: T extends 'beatmapsetUpload'
	? UserEvent.Structures.BeatmapSetUpload
	: T extends 'rank'
	? UserEvent.Structures.Rank
	: T extends 'rankLost'
	? UserEvent.Structures.RankLost
	: T extends 'userSupportAgain'
	? UserEvent.Structures.UserSupportAgain
	: T extends 'userSupportFirst'
	? UserEvent.Structures.UserSupportFirst
	: T extends 'userSupportGift'
	? UserEvent.Structures.UserSupportGift
	: T extends 'usernameChange'
	? UserEvent.Structures.UsernameChange
	: BaseEvent;

export default UserEvent;
