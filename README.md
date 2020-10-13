# emoji-regex [![Build status](https://travis-ci.org/mathiasbynens/emoji-regex.svg?branch=master)](https://travis-ci.org/mathiasbynens/emoji-regex)

_emoji-regex_ offers a regular expression to match all emoji symbols (including textual representations of emoji) as per the Unicode Standard.

This repository contains a script that generates this regular expression based on [Unicode data](https://github.com/node-unicode/node-unicode-data). Because of this, the regular expression can easily be updated whenever new emoji are added to the Unicode standard.

## Installation

Via [npm](https://www.npmjs.com/):

```bash
npm install emoji-regex
```

In [Node.js](https://nodejs.org/):

```js
const emojiRegex = require('emoji-regex');
// Note: because the regular expression has the global flag set, this module
// exports a function that returns the regex rather than exporting the regular
// expression itself, to make it impossible to (accidentally) mutate the
// original regular expression.

const text = `
\u{231A}: ⌚ default emoji presentation character (Emoji_Presentation)
\u{2194}\u{FE0F}: ↔️ default text presentation character rendered as emoji
\u{1F469}: 👩 emoji modifier base (Emoji_Modifier_Base)
\u{1F469}\u{1F3FF}: 👩🏿 emoji modifier base followed by a modifier
`;

const regex = emojiRegex();
let match;
while (match = regex.exec(text)) {
  const emoji = match[0];
  console.log(`Matched sequence ${ emoji } — code points: ${ [...emoji].length }`);
}
```

Console output:

```
Matched sequence ⌚ — code points: 1
Matched sequence ⌚ — code points: 1
Matched sequence ↔️ — code points: 2
Matched sequence ↔️ — code points: 2
Matched sequence 👩 — code points: 1
Matched sequence 👩 — code points: 1
Matched sequence 👩🏿 — code points: 2
Matched sequence 👩🏿 — code points: 2
```

To match emoji in their textual representation as well (i.e. emoji that are not `Emoji_Presentation` symbols and that aren’t forced to render as emoji by a variation selector), `require` the other regex:

```js
const emojiRegex = require('emoji-regex/text.js');
```

Additionally, in environments which support ES2015 Unicode escapes, you may `require` ES2015-style versions of the regexes:

```js
const emojiRegex = require('emoji-regex/es2015/index.js');
const emojiRegexText = require('emoji-regex/es2015/text.js');
```

## For maintainers

### How to update emoji-regex after new Unicode Standard releases

1. Update the Unicode data dependency in `package.json` by running the following commands:

    ```sh
    # Example: updating from Unicode v12 to Unicode v13.
    npm uninstall @unicode/unicode-12.0.0
    npm install @unicode/unicode-13.0.0 --save-dev
    ````

1. Generate the new output:

    ```sh
    npm run build
    ```

1. Verify that tests still pass:

    ```sh
    npm test
    ```

1. Send a pull request with the changes.

1. In a separate pull request, bump the emoji-regex version number in `package.json`:

    ```sh
    npm version patch -m 'Release v%s'
    ```

    Instead of `patch`, use `minor` or `major` [as needed](https://semver.org/).

1. Once both pull requests are merged, tag the new release:

    ```sh
    git tag v0.1.2
    git push --tags
    ```

    Our CI then automatically publishes the new release to npm.

## Author

| [![twitter/mathias](https://gravatar.com/avatar/24e08a9ea84deb17ae121074d0f17125?s=70)](https://twitter.com/mathias "Follow @mathias on Twitter") |
|---|
| [Mathias Bynens](https://mathiasbynens.be/) |

## License

_emoji-regex_ is available under the [MIT](https://mths.be/mit) license.
