const assert = require('assert');

const regex = require('../index.js');
const textRegex = require('../text.js');

const regexES2015 = require('../es2015/index.js');
const textRegexES2015 = require('../es2015/text.js');

const EMOJI_SEQUENCES = require('unicode-tr51/sequences.js');

const suite = (emojiRegex, emojiWithTextRegex, additionalTests = () => {}) => () => {
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
			assert.deepEqual(
				'\u{1F1FE}\u{1F1EA}'.match(emojiRegex())[0],
				'\u{1F1FE}\u{1F1EA}'
			);

			// U+1F1FA REGIONAL INDICATOR SYMBOL LETTER U
			// U+1F1F8 REGIONAL INDICATOR SYMBOL LETTER S
			// → flag for United States
			assert(emojiRegex().test('\u{1F1FA}\u{1F1F8}'));
			assert.deepEqual(
				'\u{1F1FA}\u{1F1F8}'.match(emojiRegex())[0],
				'\u{1F1FA}\u{1F1F8}'
			);

		});

		const test = (string) => {
			it(`matches ${ string } as a single unit`, () => {
				assert(emojiRegex().test(string));
				assert.deepEqual(string.match(emojiRegex())[0], string);
			});
		};

		// Test `Emoji_Presentation` symbols.
		const Emoji_Presentation = require('unicode-tr51/Emoji_Presentation.js');
		for (const codePoint of Emoji_Presentation) {
			test(String.fromCodePoint(codePoint));
		}

		// Test `Emoji_Modifier_Base` symbols.
		const Emoji_Modifier_Base = require('unicode-tr51/Emoji_Modifier_Base.js');
		for (const codePoint of Emoji_Modifier_Base) {
			test(String.fromCodePoint(codePoint));
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

		// Test all emoji sequences.
		for (const sequence of EMOJI_SEQUENCES) {
			test(sequence);
		}

		additionalTests(emojiRegex);

	});

	describe('regex that includes emoji as their text representation', () => {

		const test = (string) => {
			it(`matches ${ string } as a single unit`, () => {
				assert(emojiWithTextRegex().test(string));
				assert.deepEqual(string.match(emojiWithTextRegex())[0], string);
			});
		};

		// Test a default text presentation character rendered as emoji.
		// Hardcoded tests just to be safe, repeated by the scripted loop below.
		test('\u{2194}');
		test('\u{1F321}');

		// Test `Emoji` symbols.
		const Emoji = require('unicode-tr51/Emoji.js');
		for (const codePoint of Emoji) {
			test(String.fromCodePoint(codePoint));
		}

		// Test all emoji sequences.
		for (const sequence of EMOJI_SEQUENCES) {
			test(sequence);
		}

		additionalTests(emojiWithTextRegex);

	});

};

describe('ES5', suite(regex, textRegex, (regex) => {
	it('contains no non-ASCII Unicode symbols', () => {
		const regexSource = regex().source;

		assert(/\\u\{/.test(regexSource) === false);
	});
}));

describe('ES2015 Unicode', suite(regexES2015, textRegexES2015, (regex) => {
	it('contains no surrogate characters', () => {
		const regexSource = regex().source;

		assert(/\\uD[8-9a-fA-F]/g.test(regexSource) === false);
	});
}));
