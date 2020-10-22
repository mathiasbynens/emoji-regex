module.exports = () => {
	// https://mths.be/emoji
	return /<% RGI_Emoji %>(?!\uFE0E)/gu;
};
