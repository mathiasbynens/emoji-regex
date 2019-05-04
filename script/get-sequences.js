const properties = [
	'Emoji_Flag_Sequence',
	'Emoji_Keycap_Sequence',
	'Emoji_Modifier_Sequence',
	'Emoji_Tag_Sequence',
	'Emoji_ZWJ_Sequence',
];
const sequences = properties.reduce((accumulator, property) => {
	const array = require(`unicode-12.1.0/Sequence_Property/${property}/index.js`);
	return [...accumulator, ...array];
}, []).sort((a, b) => [...b].length - [...a].length);

module.exports = sequences;
