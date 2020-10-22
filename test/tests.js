const assert = require('assert');

const regex = require('../index.js');
const regexRgi = require('../RGI_Emoji.js');
const regexText = require('../text.js');

const regexES2015 = require('../es2015/index.js');
const regexRgiES2015 = require('../es2015/RGI_Emoji.js');
const regexTextES2015 = require('../es2015/text.js');

const unicodeDataPackage = require('../script/unicode-data-package.js');
const RGI_EMOJI_SEQUENCES = require('../script/get-sequences.js');

const suite = (emojiRegex, emojiRgiRegex, emojiWithTextRegex, additionalTests = () => {}) => () => {
	describe('regex', () => {

		// Start off with some hardcoded tests just to be safe. These are repeated by
		// the scripted loop below.
		it('matches expected code points', function() {

			// U+1F198 SQUARED SOS
			assert(emojiRegex().test('\u{1F198}'));

			// U+1F1FE REGIONAL INDICATOR SYMBOL LETTER Y
			// U+1F1EA REGIONAL INDICATOR SYMBOL LETTER E
			// → flag for Yemen
			assert(emojiRegex().test('\u{1F1FE}\u{1F1EA}'));
			assert.deepStrictEqual(
				'\u{1F1FE}\u{1F1EA}'.match(emojiRegex())[0],
				'\u{1F1FE}\u{1F1EA}'
			);

			// U+1F1FA REGIONAL INDICATOR SYMBOL LETTER U
			// U+1F1F8 REGIONAL INDICATOR SYMBOL LETTER S
			// → flag for United States
			assert(emojiRegex().test('\u{1F1FA}\u{1F1F8}'));
			assert.deepStrictEqual(
				'\u{1F1FA}\u{1F1F8}'.match(emojiRegex())[0],
				'\u{1F1FA}\u{1F1F8}'
			);

			// U+1F469 WOMAN
			// U+1F3FE EMOJI MODIFIER FITZPATRICK TYPE-5
			// U+200D ZERO WIDTH JOINER
			// U+2708 AIRPLANE
			// U+FE0F VARIATION SELECTOR-16
			// → woman pilot: medium-dark skin tone
			assert(emojiRegex().test('\u{1F469}\u{1F3FE}\u200D\u2708\uFE0F'));
			assert.deepStrictEqual(
				'\u{1F469}\u{1F3FE}\u200D\u2708\uFE0F'.match(emojiRegex())[0],
				'\u{1F469}\u{1F3FE}\u200D\u2708\uFE0F'
			);

		});

		it(`doesn’t match incorrect sequences`, () => {
			// Don’t match sequences ending with a text variation selector.
			assert(emojiRgiRegex().test('\u2757'));
			assert(!emojiRgiRegex().test('\u2757\uFE0E'));

			// Don’t match lone regional indicators.
			// U+1F1FE REGIONAL INDICATOR SYMBOL LETTER Y
			assert(!emojiRgiRegex().test('\u{1F1FE}'));
			assert(!emojiRgiRegex().test('\u{1F1FE}\u{1F1FE}'));
		});

		const test = (string) => {
			it(`matches ${ string } as a single unit`, () => {
				assert(emojiRegex().test(string));
				assert.deepStrictEqual(string.match(emojiRegex())[0], string);
			});
		};

		// Test `Emoji_Presentation` symbols.
		const Emoji_Presentation = require(`${unicodeDataPackage}/Binary_Property/Emoji_Presentation/symbols.js`);
		for (const symbol of Emoji_Presentation) {
			test(symbol);
		}

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

		// Test all RGI_Emoji sequences.
		for (const sequence of RGI_EMOJI_SEQUENCES) {
			test(sequence);
		}

		additionalTests(emojiRegex);

	});

	describe('regex for RGI_Emoji', () => {
		// Note in particular that `RGI_Emoji` excludes all instances of
		// emoji component code points, which are not intended for
		// independent, direct input. This means certain `Emoji` and
		// certain `Emoji_Presentation` code points should not match!
		const test = (string) => {
			it(`matches ${ string } as a single unit`, () => {
				assert(emojiRgiRegex().test(string));
				assert.deepStrictEqual(string.match(emojiRgiRegex())[0], string);
			});
		};

		// Test all RGI_Emoji sequences.
		for (const sequence of RGI_EMOJI_SEQUENCES) {
			test(sequence);
		}

		additionalTests(emojiRgiRegex);

	});

	describe('regex that includes emoji as their text representation', () => {

		const test = (string) => {
			it(`matches ${ string } as a single unit`, () => {
				assert(emojiWithTextRegex().test(string));
				assert.deepStrictEqual(string.match(emojiWithTextRegex())[0], string);
			});
		};

		// Test a default text presentation character rendered as emoji.
		// Hardcoded tests just to be safe, repeated by the scripted loop below.
		test('\u{2194}');
		test('\u{1F321}');

		// Test `Emoji` symbols.
		const Emoji = require(`${unicodeDataPackage}/Binary_Property/Emoji/symbols.js`);
		for (const symbol of Emoji) {
			test(symbol);
		}

		// Test all RGI_Emoji sequences.
		for (const sequence of RGI_EMOJI_SEQUENCES) {
			test(sequence);
		}

		additionalTests(emojiWithTextRegex);

	});

};

describe('ES5', suite(regex, regexRgi, regexText, (regex) => {
	it('contains no non-ASCII Unicode symbols', () => {
		const regexSource = regex().source;
		assert(/\\u\{/.test(regexSource) === false);
	});
}));

describe('ES2015 Unicode', suite(regexES2015, regexRgiES2015, regexTextES2015, (regex) => {
	it('contains no surrogate characters', () => {
		const regexSource = regex().source;
		assert(/\\uD[8-9a-fA-F]/g.test(regexSource) === false);
	});
}));
