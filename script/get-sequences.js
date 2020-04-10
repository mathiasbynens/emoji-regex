const properties = [
	'Emoji_Keycap_Sequence',
	'RGI_Emoji_Flag_Sequence',
	'RGI_Emoji_Modifier_Sequence',
	'RGI_Emoji_Tag_Sequence',
	'RGI_Emoji_ZWJ_Sequence',
];
const set = new Set();
for (const property of properties) {
	const array = require(`unicode-13.0.0/Sequence_Property/${property}/index.js`);
	for (const sequence of array) {
		set.add(sequence);
	}
}

const sequences = [...set].sort((a, b) => [...b].length - [...a].length);

module.exports = sequences;
