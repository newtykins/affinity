import mods from '~helpers/mods';

describe('The mods helper', () => {
	it('can parse a mod code into a string', () => {
		const code = mods.numCodes.HD + mods.numCodes.DT;
		const parsed = mods.parseCode(code);
		expect(parsed).toBe('HDDT');
	});

	it('can parse a string into a mod code', () => {
		const code = mods.parseString('HDDT');
		expect(code).toBe(mods.numCodes.HD + mods.numCodes.DT);
	});
});
