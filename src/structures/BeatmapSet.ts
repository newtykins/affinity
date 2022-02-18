import _ from 'lodash';
import Affinity from '~affinity';
import { GameMode, Genre, RankStatus } from '~constants';
import Beatmap from './Beatmap';

class BeatmapSet {
	public rawData: any;
	#client: Affinity;

	public id: number;
	public artist: string;
	public artistUnicode: string;
	public title: string;
	public titleUnicode: string;
	public covers: BeatmapSet.Covers;
	public nsfw: boolean;
	public playCount: number;
	public preview: string;
	public status: keyof typeof RankStatus;
	public bpm: number;
	public lastUpdated: Date;
	public rankedDate: Date;
	public submittedDate: Date;
	public tags: string[];
	public beatmaps: Beatmap[];
	public genre: Genre;

	/**
	 * The mapper's name at the time of the set's submission - potentially outdated.
	 */
	public mapper: string;
	public mapperId: number;

	constructor(client: Affinity, data: any) {
		this.rawData = data;
		this.#client = client;

		this.id = data?.id;
		this.artist = data?.artist;
		this.artistUnicode = data?.artistUnicode;
		this.title = data?.title;
		this.titleUnicode = data?.titleUnicode;
		this.mapper = data?.creator;
		this.mapperId = data?.userId;
		this.nsfw = data?.nsfw;
		this.playCount = data?.playCount;
		this.preview = data?.previewUrl;
		this.status = data?.status;
		this.bpm = data?.bpm;
		this.lastUpdated = new Date(data?.lastUpdated);
		this.rankedDate = data?.rankedDate ? new Date(data?.rankedDate) : null;
		this.submittedDate = new Date(data?.submittedDate);
		this.tags = data?.tags?.split(' ');
		this.genre = data?.genre?.name;

		this.beatmaps = data?.beatmaps?.map(
			({ playcount, passcount, ...beatmap }) => {
				const b = new Beatmap(this.#client, {
					playCount: playcount,
					passCount: passcount,
					...beatmap,
				});

				b.mapper = this.mapper;

				return b;
			}
		);

		// @ts-expect-error - going to be populated momentarily
		this.covers = Object.keys(data?.covers).length > 0 ? {} : null;

		Object.keys(data?.covers).forEach((key) => {
			this.covers[_.camelCase(key).replace('X', 'x').replace('@', '')] =
				data?.covers[key];
		});
	}

	/**
	 * Fetch the mapper of the beatmap set!
	 * @async
	 */
	public async fetchMapper(mode: GameMode = GameMode.Standard) {
		return await this.#client.getUser(this.mapperId, mode);
	}
}

namespace BeatmapSet {
	export interface Covers {
		cover: string;
		cover2x: string;
		card: string;
		card2x: string;
		list: string;
		list2x: string;
		slimCover: string;
		slimCover2x: string;
	}
}

export default BeatmapSet;
