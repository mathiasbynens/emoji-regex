var fs = require('fs');
var path = require('path');

var regexgen = require('regexgen');
var template = require('lodash.template');
require('string.fromcodepoint');

var emojiCodePoints = require('unicode-tr51/code-points');
var strings = emojiCodePoints.map(function(value) {
	if (Array.isArray(value)) {
		return String.fromCodePoint.apply(null, value);
	}
	return String.fromCodePoint(value);
});

var ROOT = path.resolve(__dirname, '..');
var sourceTemplate = template(fs.readFileSync(ROOT + '/templates/index.js'));
var result = sourceTemplate({
	'regex': regexgen(strings, 'g')
});
fs.writeFileSync(ROOT + '/index.js', result);
