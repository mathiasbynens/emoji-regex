const fs = require('fs');

const Trie = require('regexgen').Trie;

const sequences = require('../script/get-sequences.js');

const trie = new Trie();
trie.addAll(sequences);

const emojiSequenceES5 = trie.toString();
console.log(emojiSequenceES5);

const emojiSequenceES2015 = trie.toString('u');
console.log(emojiSequenceES2015);

const files = [
	'index.js',
	'RGI_Emoji.js',
	'RGI_Emoji-pattern.txt',
	'text.js',
	'es2015/index.js',
	'es2015/RGI_Emoji.js',
	'es2015/text.js',
];
for (const file of files) {
	const RGI_Emoji_pattern = file.startsWith('es2015/') ? emojiSequenceES2015 : emojiSequenceES5;

	const input = fs.readFileSync(file, 'utf8');
	const output = input.replace('<% RGI_Emoji %>', RGI_Emoji_pattern) +
		(input.endsWith('\n') ? '' : '\n');

	fs.writeFileSync(file, output);
}
