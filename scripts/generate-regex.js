var fs = require('fs');
var path = require('path');

var jsesc = require('jsesc');
var regenerate = require('regenerate');
var regExpTrie = require('regex-trie');
var template = require('lodash.template');
require('string.fromcodepoint');

var emojiCodePoints = require('unicode-tr51/code-points');

var multipleCodePointsTrie = regExpTrie();
var loneCodePointsSet = regenerate();
emojiCodePoints.forEach(function(value) {
	if (Array.isArray(value)) {
		var string = String.fromCodePoint.apply(null, value);
		multipleCodePointsTrie.add(string);
	} else {
		loneCodePointsSet.add(value);
	}
});

var loneCodePointsPart = loneCodePointsSet.toString();
var multipleCodePointsPart = multipleCodePointsTrie.toString();

var ROOT = path.resolve(__dirname, '..');
var sourceTemplate = fs.readFileSync(ROOT + '/templates/index.js');
var result = template(sourceTemplate, {
	'multipleCodePointsPart': multipleCodePointsPart,
	'loneCodePointsPart': loneCodePointsPart
});
fs.writeFileSync(ROOT + '/index.js', result);
