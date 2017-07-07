module.exports = () => {
	// https://mathiasbynens.be/notes/es-unicode-property-escapes#emoji
	return /<% emojiSequenceUnicode %>|\p{Emoji_Modifier_Base}\p{Emoji_Modifier}?|\p{Emoji_Presentation}|\p{Emoji}\uFE0F?/gu;
};
