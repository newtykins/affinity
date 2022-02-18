import { Mods } from '~affinity';

describe('The mods helper', () => {
	it('can parse a mod code into a string', () => {
		const code = Mods.numCodes.HD + Mods.numCodes.DT;
		const parsed = Mods.parseCode(code);
		expect(parsed).toBe('HDDT');
	});

	it('can parse a string into a mod code', () => {
		const code = Mods.parseString('HDDT');
		expect(code).toBe(Mods.numCodes.HD + Mods.numCodes.DT);
	});
});
