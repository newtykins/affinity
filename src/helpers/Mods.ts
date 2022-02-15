import { modNumCodes, modsOrder } from '../constants';

class Mods {
	static numCodes: Mods.NumCodes = modNumCodes;
	static order: Mods.Order = modsOrder;

	public static parseCode(mods: number): string {
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
}

namespace Mods {
	export type NumCodes = typeof modNumCodes;
	export type Order = { [key: string]: number };
}

export default Mods;
