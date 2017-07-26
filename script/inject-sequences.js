const fs = require('fs');

const Trie = require('regexgen').Trie;
const sequences = require('unicode-tr51/sequences.js')
	.sort((a, b) => b.length - a.length);

const trie = new Trie();
trie.addAll(sequences);

const emojiSequenceES5 = trie.toString();
console.log(emojiSequenceES5);

const emojiSequenceES2015 = trie.toString('u');
console.log(emojiSequenceES2015);

for (const file of ['index.js', 'text.js', 'es2015/index.js', 'es2015/text.js']) {
	const emojiSequence = file.startsWith('es2015/') ? emojiSequenceES2015 : emojiSequenceES5;

	const input = fs.readFileSync(file, 'utf8');
	const output = input.replace('<% emojiSequence %>', emojiSequence) +
		(input.endsWith('\n') ? '' : '\n');

	fs.writeFileSync(file, output);
}
