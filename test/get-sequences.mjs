import unicodeDataPackage from './unicode-data-package.mjs';

const { default: rawSequences } = await import(
	`${unicodeDataPackage}/Sequence_Property/RGI_Emoji/index.mjs`
);

const sequences = rawSequences
	// Sort by code point length; longest sequences first.
	.sort((a, b) => [...b].length - [...a].length);

export default sequences;
