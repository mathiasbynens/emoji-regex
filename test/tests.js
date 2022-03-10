const assert = require('assert');

const regex = require('../index.js');

const unicodeDataPackage = require('./unicode-data-package.js');
const RGI_EMOJI_SEQUENCES = require('./get-sequences.js');

describe('regex', () => {

	// Start off with some hardcoded tests just to be safe. These are repeated by
	// the scripted loop below.
	it('matches expected code points', function() {

		// U+1F198 SQUARED SOS
		assert(regex().test('\u{1F198}'));

		// U+1F1FE REGIONAL INDICATOR SYMBOL LETTER Y
		// U+1F1EA REGIONAL INDICATOR SYMBOL LETTER E
		// → flag for Yemen
		assert(regex().test('\u{1F1FE}\u{1F1EA}'));
		assert.deepStrictEqual(
			'\u{1F1FE}\u{1F1EA}'.match(regex())[0],
			'\u{1F1FE}\u{1F1EA}'
		);

		// U+1F1FA REGIONAL INDICATOR SYMBOL LETTER U
		// U+1F1F8 REGIONAL INDICATOR SYMBOL LETTER S
		// → flag for United States
		assert(regex().test('\u{1F1FA}\u{1F1F8}'));
		assert.deepStrictEqual(
			'\u{1F1FA}\u{1F1F8}'.match(regex())[0],
			'\u{1F1FA}\u{1F1F8}'
		);

		// U+1F469 WOMAN
		// U+1F3FE EMOJI MODIFIER FITZPATRICK TYPE-5
		// U+200D ZERO WIDTH JOINER
		// U+2708 AIRPLANE
		// U+FE0F VARIATION SELECTOR-16
		// → woman pilot: medium-dark skin tone
		assert(regex().test('\u{1F469}\u{1F3FE}\u200D\u2708\uFE0F'));
		assert.deepStrictEqual(
			'\u{1F469}\u{1F3FE}\u200D\u2708\uFE0F'.match(regex())[0],
			'\u{1F469}\u{1F3FE}\u200D\u2708\uFE0F'
		);

	});

	const test = (string) => {
		it(`matches ${ string } as a single unit`, () => {
			assert(regex().test(string));
			assert.deepStrictEqual(string.match(regex())[0], string);
		});
	};

	// Test `Emoji_Modifier_Base` symbols.
	const Emoji_Modifier_Base = require(`${unicodeDataPackage}/Binary_Property/Emoji_Modifier_Base/symbols.js`);
	for (const symbol of Emoji_Modifier_Base) {
		test(symbol);
	}

	// Test an `Emoji_Modifier_Base` followed by an `Emoji_Modifier`.
	test('\u{1F469}\u{1F3FF}');

	// Test an `Emoji_Modifier_Base` not followed by an `Emoji_Modifier`.
	test('\u{1F469}');

	// Test a default text presentation character rendered as emoji.
	test('\u{2194}\uFE0F');
	test('\u{1F321}\uFE0F');
	test('\u261D\uFE0F');

	// Test an emoji that was added in v4 of emoji-data.txt.
	test('\u{1F923}'); // U+1F923 ROLLING ON THE FLOOR LAUGHING

	// Test a regular emoji sequence (`emoji-sequences.txt`).
	test('1\uFE0F\u20E3');
	test('\u{1F3F4}\u{E0067}\u{E0062}\u{E0065}\u{E006E}\u{E0067}\u{E007F}');

	// Test a ZWJ emoji sequence (`emoji-zwj-sequences.txt`).
	test('\u{1F3CA}\u{1F3FD}\u200D\u2640\uFE0F');

	// Test an Emoji 13.1 sequence.
	test('\u{1F48F}\u{1F3FF}');

	// Test all RGI_Emoji sequences.
	for (const sequence of RGI_EMOJI_SEQUENCES) {
		test(sequence);
	}

	it('contains no non-ASCII Unicode symbols', () => {
		const regexSource = regex().source;
		assert(/\\u\{/.test(regexSource) === false);
	});

	it('can be imported as an ecmascript module', async () => {
		const { default: regex } = await import('../index.mjs');
		assert(regex().test('\u{1F600}'));
	});

});
