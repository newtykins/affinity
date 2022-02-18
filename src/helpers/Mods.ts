class Mods {
	public numCodes: ModsData = {
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

	public order: ModsData = {
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
	public parseCode(mods: number): string {
		const enabled: {
			name: string;
			order: number;
		}[] = [];
		const values = Object.values(this.numCodes);

		// Populate the list of enabled mods
		for (let i = values.length - 1; i >= 0; i--) {
			const value = values[i];

			if (mods >= value) {
				const name = Object.keys(this.numCodes)[i];

				enabled.push({ name, order: this.order[name] });

				mods -= value;
			}
		}

		// Sort the mods, and output only their names
		const output = enabled
			.sort(({ order: a }, { order: b }) => (a > b ? 1 : b > a ? -1 : 0))
			.map((a) => a.name);

		// Return the mod selection or NM
		return output.length !== 0 ? output.join('') : 'NM';
	}

	public parseString(str: string): number {
		// Break up the string into two character pairs
		const mods = [...str.match(/.{1,2}/g)];
		if (!mods) return undefined;

		// Calculate the final mod code value
		return mods.reduce((a, b) => {
			if (typeof a === 'string') a = this.numCodes[a];
			return a + this.numCodes[b];
		}, 0);
	}
}

interface ModsData {
	[key: string]: number;
}

export default Mods;
