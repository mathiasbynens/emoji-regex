# emoji-regex [![Build status](https://travis-ci.org/mathiasbynens/emoji-regex.svg?branch=master)](https://travis-ci.org/mathiasbynens/emoji-regex) [![Code coverage status](http://img.shields.io/coveralls/mathiasbynens/emoji-regex/master.svg)](https://coveralls.io/r/mathiasbynens/emoji-regex) [![Dependency status](https://gemnasium.com/mathiasbynens/emoji-regex.svg)](https://gemnasium.com/mathiasbynens/emoji-regex)

_emoji-regex_ offers a regular expression to match all emoji symbols (including textual representations of emoji) as per the Unicode Standard.

This repository contains a script that generates this regular expression based on [the data from Unicode Technical Report #51](https://github.com/mathiasbynens/unicode-tr51). Because of this, the regular expression can easily be updated whenever new emoji are added to the Unicode standard.

## Installation

Via [npm](https://www.npmjs.com/):

```bash
npm install emoji-regex
```

In [Node.js](https://nodejs.org/):

```js
var emojiRegex = require('emoji-regex');
// Note: because the regular expression has the global flag set, this module
// exports a function that returns the regex rather than exporting the regular
// expression itself, to make it impossible to (accidentally) mutate the
// original regular expression.

emojiRegex().test('🆘');
// → true
emojiRegex().test('💩');
// → true
emojiRegex().test('🇺🇸');
// → true

var flag = '🇺🇸'; // flag for United States
flag.match(emojiRegex())[0] == flag;
// → true
```

## Author

| [![twitter/mathias](https://gravatar.com/avatar/24e08a9ea84deb17ae121074d0f17125?s=70)](https://twitter.com/mathias "Follow @mathias on Twitter") |
|---|
| [Mathias Bynens](https://mathiasbynens.be/) |

## License

_emoji-regex_ is available under the [MIT](https://mths.be/mit) license.
