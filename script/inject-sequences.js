const fs = require('fs');

const Trie = require('regexgen').Trie;
const sequences = require('unicode-tr51/sequences.js');
sequences.sort((a, b) => b.length - a.length);

const trie = new Trie();
trie.addAll(sequences);

const emojiSequence = trie.toString();
console.log(emojiSequence);

const emojiSequenceUnicode = trie.toString('u');
console.log(emojiSequenceUnicode);

for (const file of ['index.js', 'text.js', 'es2015/index.js', 'es2015/text.js']) {
	const input = fs.readFileSync(file, 'utf8');

	const output = input
		.replace('<% emojiSequence %>', emojiSequence)
		.replace('<% emojiSequenceUnicode %>', emojiSequenceUnicode);

	fs.writeFileSync(file, output);
}
