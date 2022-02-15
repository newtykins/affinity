import { Mods } from '~affinity';

describe('The Mods Helper', () => {
	it('can parse a mod code into a string', () => {
		const code = Mods.numCodes.HD + Mods.numCodes.DT;
		const parsed = Mods.parseCode(code);
		expect(parsed).toBe('HDDT');
	});
});
