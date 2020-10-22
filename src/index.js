module.exports = () => {
	// https://mths.be/emoji
	return /(?:<% RGI_Emoji %>|\p{Emoji_Presentation}|\p{Emoji}\uFE0F|\p{Emoji_Modifier_Base})(?!\uFE0E)/gu;
};
