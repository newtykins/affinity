import Affinity from '~affinity';

class Links {
	private baseUrl: string = 'https://osu.ppy.sh';

	public user(id: number) {
		return `${this.baseUrl}/u/${id}`;
	}

	public beatmap(id: number) {
		return `${this.baseUrl}/b/${id}`;
	}

	public beatmapSet(id: number) {
		return `${this.baseUrl}/beatmapsets/${id}`;
	}

	public score(mode: Affinity.Modes, id: number) {
		return `${this.baseUrl}/scores/${mode}/${id}`;
	}
}

export default new Links();
