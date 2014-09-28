var fs = require('fs');
var path = require('path');
var jsesc = require('jsesc');
var regenerate = require('regenerate');
var template = require('lodash.template');
require('string.fromcodepoint');

var ROOT = path.resolve(__dirname, '..');

var emojiCodePoints = require('unicode-tr51/code-points');
var loneCodePoints = [];
var multipleCodePoints = [];
emojiCodePoints.forEach(function(value) {
	if (Array.isArray(value)) {
		multipleCodePoints.push(value);
	} else {
		loneCodePoints.push(value);
	}
});

var loneCodePointsPart = regenerate(loneCodePoints).toString();

// TODO: Optimize the output here using something like `frak` (which is still
// not available on npm: https://github.com/noprompt/frak/issues/11).
var multipleCodePointsPart = multipleCodePoints.map(function(codePoints) {
	var string = String.fromCodePoint.apply(null, codePoints);
	return jsesc(string);
}).join('|');

var sourceTemplate = fs.readFileSync(ROOT + '/templates/index.js');
var result = template(sourceTemplate, {
	'multipleCodePointsPart': multipleCodePointsPart,
	'loneCodePointsPart': loneCodePointsPart
});
fs.writeFileSync(ROOT + '/index.js', result);
