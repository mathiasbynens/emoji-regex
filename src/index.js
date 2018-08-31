module.exports = () => {
	// https://mths.be/emoji
	return /<% emojiSequence %>|\p{Emoji_Presentation}|\p{Emoji}\uFE0F|\p{Emoji_Modifier_Base}/gu;
};
