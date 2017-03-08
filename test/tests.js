const assert = require('assert');
const emojiRegex = require('../src/index.js');

describe('Emoji regex', () => {

	// Start off with some hardcoded tests just to be safe. These are repeated by
	// the scripted loop below.
	it('matches expected code points', function() {

		// U+1F198 SQUARED SOS
		assert(emojiRegex().test('\u{1F198}'));

		// TODO: implement sequence support.
		// http://unicode.org/Public/emoji/4.0/emoji-sequences.txt
		// The remaining (commented-out) tests in this block rely on it.

		// U+1F1FE REGIONAL INDICATOR SYMBOL LETTER Y
		// U+1F1EA REGIONAL INDICATOR SYMBOL LETTER E
		// → flag for Yemen
		// assert(emojiRegex().test('\u{1F1FE}\u{1F1EA}'));
		// assert.deepEqual(
		// 	'\uD83C\uDDFE\uD83C\uDDEA'.match(emojiRegex())[0],
		// 	'\uD83C\uDDFE\uD83C\uDDEA'
		// );

		// U+1F1FA REGIONAL INDICATOR SYMBOL LETTER U
		// U+1F1F8 REGIONAL INDICATOR SYMBOL LETTER S
		// → flag for United States
		// assert(emojiRegex().test('\u{1F1FA}\u{1F1F8}'));
		// assert.deepEqual(
		// 	'\u{1F1FA}\u{1F1F8}'.match(emojiRegex())[0],
		// 	'\u{1F1FA}\u{1F1F8}'
		// );

		// U+0031 DIGIT ONE
		// U+20E3 COMBINING ENCLOSING KEYCAP
		// assert(emojiRegex().test('1\u20E3'));
		// assert.deepEqual(
		// 	'1\u20E3'.match(emojiRegex())[0],
		// 	'1\u20E3'
		// );

	});

	const test = (string) => {
		it(`matches ${ string } as a single unit`, () => {
			assert(emojiRegex().test(string));
			console.log(string.match(emojiRegex()))
			assert.deepEqual(string.match(emojiRegex())[0], string);
		});
	};

	// // Test `Emoji_Presentation` symbols.
	// const Emoji_Presentation = require('unicode-tr51/Emoji_Presentation.js');
	// for (const string of Emoji_Presentation) {
	// 	test(string);
	// }

	// // Test `Emoji_Modifier_Base` symbols.
	// const Emoji_Modifier_Base = require('unicode-tr51/Emoji_Modifier_Base.js');
	// for (const string of Emoji_Modifier_Base) {
	// 	test(string);
	// }

	// Test an `Emoji_Modifier_Base` followed by an `Emoji_Modifier`.
	test('\u{1F469}\u{1F3FF}');

	// Test an `Emoji_Modifier_Base` not followed by an `Emoji_Modifier`.
	test('\u{1F469}');

	// Test a default text presentation character rendered as emoji.
	test('\u{2194}\u{FE0F}');

	// Test an emoji that was added in v4 of emoji-data.txt.
	test('\u{1F923}'); // U+1F923 ROLLING ON THE FLOOR LAUGHING

});
