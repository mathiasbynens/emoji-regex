const fs = require('fs');

const Trie = require('regexgen').Trie;
const sequences = require('unicode-tr51/sequences.js');

const trie = new Trie();
for (const sequence of sequences) {
	trie.add(sequence);
}
const sequencePattern = trie.toString();
console.log(sequencePattern);

for (const file of ['index.js', 'text.js']) {
	const input = fs.readFileSync(file, 'utf8');
	const output = input.replace('<% emojiSequence %>', sequencePattern);
	fs.writeFileSync(file, output);
}
