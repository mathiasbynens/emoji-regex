const unicodeDataPackage = require('./unicode-data-package.js');

const sequences = require(`${unicodeDataPackage}/Sequence_Property/RGI_Emoji/index.js`)
	// Sort by code point length; longest sequences first.
	.sort((a, b) => [...b].length - [...a].length);

module.exports = sequences;
