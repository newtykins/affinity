import Mods from '~helpers/Mods';

// enum RankStatus {
// 	graveyard = -2,
// 	wip = -1,
// 	pending = 0,
// 	ranked = 1,
// 	approved = 2,
// 	qualified = 3,
// 	loved = 4,
// }

enum UserBeatmapTypes {
	Favourite = 'favourite',
	Graveyard = 'graveyard',
	Loved = 'loved',
	MostPlayed = 'most_played',
	Pending = 'pending',
	Ranked = 'ranked',
	Unranked = 'pending',
}

export const modNumCodes = {
	NF: 1,
	EZ: 2,
	TD: 4,
	HD: 8,
	HR: 16,
	SD: 32,
	DT: 64,
	RX: 128,
	HT: 256,
	NC: 576,
	FL: 1024,
	AT: 2048,
	SO: 4096,
	AP: 8192,
	PF: 16416,
	'4K': 32768,
	'5K': 65536,
	'6K': 131072,
	'7K': 262144,
	'8K': 524288,
	Fl: 1048576,
	RD: 2097152,
	LM: 4194304,
	Target: 8388608,
	'9K': 16777216,
	KeyCoop: 33554432,
	'1K': 67108864,
	'3K': 134217728,
	'2K': 268435456,
	ScoreV2: 536870912,
	LastMod: 1073741824,
};

export const modsOrder: Mods.Order = {
	NF: 0,
	EZ: 1,
	HD: 2,
	DT: 3,
	NC: 3,
	HT: 3,
	HR: 4,
	SO: 5,
	SD: 5,
	PF: 5,
	FL: 6,
	TD: 7,
};

export { UserBeatmapTypes };
