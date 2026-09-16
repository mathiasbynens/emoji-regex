# emoji-regex [![Build status](https://github.com/mathiasbynens/emoji-regex/actions/workflows/main.yml/badge.svg)](https://github.com/mathiasbynens/emoji-regex/actions/workflows/main.yml) [![emoji-regex on npm](https://img.shields.io/npm/v/emoji-regex)](https://www.npmjs.com/package/emoji-regex)

_emoji-regex_ offers a regular expression to match all emoji symbols and sequences (including textual representations of emoji) as per the Unicode Standard. It’s based on [_emoji-test-regex-pattern_](https://github.com/mathiasbynens/emoji-test-regex-pattern), which generates (at build time) the regular expression pattern based on the Unicode Standard. As a result, _emoji-regex_ can easily be updated whenever new emoji are added to Unicode.

Since each version of _emoji-regex_ is tied to the latest Unicode version at the time of release, results are deterministic. This is important for use cases like image replacement, where you want to guarantee that an image asset is available for every possibly matched emoji. If you don’t need a deterministic regex, a lighter-weight, general emoji pattern is available via the [_emoji-regex-xs_](https://github.com/slevithan/emoji-regex-xs) package that follows the same API.

## Installation

Via [npm](https://www.npmjs.com/):

```bash
npm install emoji-regex
```

In [Node.js](https://nodejs.org/):

```js
import emojiRegex from 'emoji-regex';
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
for (const match of text.matchAll(regex)) {
	const emoji = match[0];
	console.log(`Matched sequence ${emoji} — code points: ${[...emoji].length}`);
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

## For maintainers

### How to update emoji-regex after new Unicode Standard releases

1. [Update _emoji-test-regex-pattern_ as described in its repository](https://github.com/mathiasbynens/emoji-test-regex-pattern#how-to-update-emoji-test-regex-pattern-after-new-uts51-releases).

1. Bump the _emoji-test-regex-pattern_ dependency to the latest version.

1. Update the Unicode data dependency in `package.json` by running the following commands:

   ```sh
   # Example: updating from Unicode v13 to Unicode v14.
   npm uninstall @unicode/unicode-13.0.0
   npm install @unicode/unicode-14.0.0 --save-dev
   ```

1. Generate the new output:

   ```sh
   npm run build
   ```

1. Verify that tests still pass:

   ```sh
   npm test
   ```

### How to publish a new release

1. On the `main` branch, bump the emoji-regex version number in `package.json`:

   ```sh
   npm version patch -m 'Release v%s'
   ```

   Instead of `patch`, use `minor` or `major` [as needed](https://semver.org/).

   Note that this produces a Git commit + tag.

1. Push the release commit and tag:

   ```sh
   git push && git push --tags
   ```

   Our CI then automatically publishes the new release to npm.

## Author

| [![twitter/mathias](https://gravatar.com/avatar/24e08a9ea84deb17ae121074d0f17125?s=70)](https://twitter.com/mathias 'Follow @mathias on Twitter') |
| ------------------------------------------------------------------------------------------------------------------------------------------------- |
| [Mathias Bynens](https://mathiasbynens.be/)                                                                                                       |

## License

_emoji-regex_ is available under the [MIT](https://mths.be/mit) license.


## 🌐 Web Resources & Aesthetic Symbols Index
- [SYM 1D44D](https://neon-gamer-symbols-64.pages.dev/symbol/sym-1d44d/)
- [SYM 26D1](https://soft-pink-fonts-41.pages.dev/symbol/sym-26d1/)
- [SYM 1D486](https://kawaii-kaomoji-hub-96.pages.dev/symbol/sym-1d486/)
- [SYM 1D423](https://coquette-symbols.pages.dev/symbol/sym-1d423/)
- [SYM 1D43E](https://angelic-bow-symbols-42.pages.dev/symbol/sym-1d43e/)
- [SYM 26CC](https://pastel-chibi-emotes-23.pages.dev/symbol/sym-26cc/)
- [SYM 1F973](https://coquette-aesthetic-symbols-86.pages.dev/symbol/sym-1f973/)
- [SYM 1F635 200D 1F4AB](https://angelic-bow-symbols-76.pages.dev/symbol/sym-1f635-200d-1f4ab/)
- [SYM 26B2](https://chibi-bunny-symbols-82.pages.dev/symbol/sym-26b2/)
- [SYM 1F498](https://cyber-clan-tags-90.pages.dev/symbol/sym-1f498/)
- [SYM 1F925](https://glitch-matrix-fonts-28.pages.dev/symbol/sym-1f925/)
- [CLOUD WEATHER SYMBOL](https://angelic-bow-symbols-76.pages.dev/symbol/cloud-weather-symbol/)
- [SYM 1F636 200D 1F32B FE0F](https://coquette-aesthetic-symbols-84.pages.dev/symbol/sym-1f636-200d-1f32b-fe0f/)
- [KAOMOJI](https://pastel-moe-emoticons-80.pages.dev/kaomoji/)
- [EIGHT POINTED BLACK STAR](https://gothic-bio-fonts-86.pages.dev/symbol/eight-pointed-black-star/)
- [RU](https://monochrome-text-lab-86.pages.dev/ru/)
- [GAMING WEAPONS](https://clean-mono-fonts-64.pages.dev/gaming-weapons/)
- [SYM 1F910](https://theeduplaycampen.pages.dev/symbol/sym-1f910/)
- [SYM 1D416](https://witchy-runic-text-71.pages.dev/symbol/sym-1d416/)
- [ROTATED HEART BULLET](https://gothic-bio-fonts-86.pages.dev/symbol/rotated-heart-bullet/)
- [SYM 1F4A9](https://moe-soft-emoticons-41.pages.dev/symbol/sym-1f4a9/)
- [SYM 1D450](https://clean-mono-fonts-64.pages.dev/symbol/sym-1d450/)
- [SYM 1F47D](https://soft-pink-fonts-41.pages.dev/symbol/sym-1f47d/)
- [SYM 1F63C](https://scholarly-vintage-symbols-48.pages.dev/symbol/sym-1f63c/)
- [SYM 1D42E](https://anime-sparkle-text-23.pages.dev/symbol/sym-1d42e/)
- [SYM 2749](https://soft-pink-fonts-41.pages.dev/symbol/sym-2749/)
- [SYM 1D44F](https://kawaii-kaomoji-hub-96.pages.dev/symbol/sym-1d44f/)
- [SYM 1D451](https://clean-mono-fonts-64.pages.dev/symbol/sym-1d451/)
- [SYM 1F608](https://anime-sparkle-text-22.pages.dev/symbol/sym-1f608/)
- [ANGEL WINGS HEART](https://angelic-bow-symbols-76.pages.dev/symbol/angel-wings-heart/)
- [BRACKETS](https://kawaii-kaomoji-hub-96.pages.dev/es/brackets/)
- [SYM 1F971](https://kawaii-kaomoji-hub-51.pages.dev/symbol/sym-1f971/)
- [SYM 26C3](https://witchy-runic-text-71.pages.dev/symbol/sym-26c3/)
- [SYM 1D43D](https://clean-mono-fonts-64.pages.dev/symbol/sym-1d43d/)
- [FREEFIRE NAMES](https://raven-gothic-kaomoji-25.pages.dev/pt/freefire-names/)
- [ZODIAC CELESTIAL](https://angelic-bow-symbols-42.pages.dev/pt/zodiac-celestial/)
- [SYM 2617](https://soft-pink-fonts-41.pages.dev/symbol/sym-2617/)
- [SYM 1D409](https://clean-mono-fonts-64.pages.dev/symbol/sym-1d409/)
- [SYM 26E6](https://sleek-dot-symbols-31.pages.dev/symbol/sym-26e6/)
- [GEORGIAN LOVE HEART](https://angelic-bow-symbols-76.pages.dev/symbol/georgian-love-heart/)
- [ARROWS LINES](https://soft-pink-fonts-41.pages.dev/vi/arrows-lines/)
- [SYM 26CB](https://lace-bow-symbols-18.pages.dev/symbol/sym-26cb/)
- [SYM 265B](https://zen-spacing-text-68.pages.dev/symbol/sym-265b/)
- [SYM 267D](https://coquette-aesthetic-symbols-63.pages.dev/symbol/sym-267d/)
- [SYM 26FF](https://moe-soft-emoticons-41.pages.dev/symbol/sym-26ff/)
- [SYM 2654](https://anime-sparkle-text-22.pages.dev/symbol/sym-2654/)
- [SYM 1F49F](https://angelic-bow-symbols-76.pages.dev/symbol/sym-1f49f/)
- [SYM 2747](https://coquette-aesthetic-symbols-86.pages.dev/symbol/sym-2747/)
- [SYM 1D46A](https://clean-mono-fonts-64.pages.dev/symbol/sym-1d46a/)
- [SYM 1D46F](https://clean-mono-fonts-64.pages.dev/symbol/sym-1d46f/)
- [SYM 26D9](https://anime-sparkle-text-22.pages.dev/symbol/sym-26d9/)
- [MUSIC SHARP SIGN](https://lace-bow-symbols-18.pages.dev/symbol/music-sharp-sign/)
- [SYM 1D411](https://kawaii-kaomoji-hub-96.pages.dev/symbol/sym-1d411/)
- [SYM 1D428](https://raven-gothic-kaomoji-25.pages.dev/symbol/sym-1d428/)
- [SYM 1D41D](https://soft-pink-fonts-41.pages.dev/symbol/sym-1d41d/)
- [KAOMOJI](https://soft-pink-fonts-41.pages.dev/ru/kaomoji/)
- [SYM 26A7](https://lace-heart-kaomoji-64.pages.dev/symbol/sym-26a7/)
- [GAMING WEAPONS](https://gothic-bio-fonts-86.pages.dev/pt/gaming-weapons/)
- [ROBLOX NAMES](https://angelic-bow-symbols-76.pages.dev/pt/roblox-names/)
- [SYM 1F925](https://angelic-bow-symbols-76.pages.dev/symbol/sym-1f925/)
- [ES](https://monochrome-text-lab-86.pages.dev/es/)
- [HEARTS](https://coquette-aesthetic-symbols-63.pages.dev/hearts/)
- [SYM 2639 FE0F](https://kawaii-kaomoji-hub-93.pages.dev/symbol/sym-2639-fe0f/)
- [SYM 1F648](https://kawaii-kaomoji-hub-93.pages.dev/symbol/sym-1f648/)
- [SYM 1F61F](https://kawaii-kaomoji-hub-93.pages.dev/symbol/sym-1f61f/)
- [BOLD TIPPED ARROW](https://angelic-bow-symbols-76.pages.dev/symbol/bold-tipped-arrow/)
- [SYM 2676](https://anime-sparkle-text-23.pages.dev/symbol/sym-2676/)
- [SYM 26F6](https://anime-sparkle-text-23.pages.dev/symbol/sym-26f6/)
- [SYM 1D47A](https://soft-pink-fonts-41.pages.dev/symbol/sym-1d47a/)
- [SYM 26BE](https://soft-pink-fonts-41.pages.dev/symbol/sym-26be/)
- [INSTAGRAM BIO](https://anime-sparkle-text-23.pages.dev/ru/instagram-bio/)
- [SYM 1F92C](https://coquette-symbols.pages.dev/symbol/sym-1f92c/)
- [SYM 1F649](https://cyber-clan-tags-38.pages.dev/symbol/sym-1f649/)
- [SYM 1F60E](https://matrix-glitch-text-59.pages.dev/symbol/sym-1f60e/)
- [SYM 2634](https://cyber-clan-tags-23.pages.dev/symbol/sym-2634/)
- [SKULL AND CROSSBONES](https://monochrome-text-lab-86.pages.dev/symbol/skull-and-crossbones/)
- [LATIN CROSS FAITH](https://soft-pink-fonts-41.pages.dev/symbol/latin-cross-faith/)
- [LEFT HEAVY BRACKET BOX](https://theeduplaycampen.pages.dev/symbol/left-heavy-bracket-box/)
- [SYM 1F497](https://chibi-bunny-symbols-82.pages.dev/symbol/sym-1f497/)
- [SYM 2748](https://lace-bow-symbols-18.pages.dev/symbol/sym-2748/)
- [SYM 1D41D](https://anime-sparkle-text-23.pages.dev/symbol/sym-1d41d/)
- [KHANDA EMBLEM](https://cyberpunk-clan-tags-43.pages.dev/symbol/khanda-emblem/)
- [SYM 1D429](https://matrix-glitch-text-37.pages.dev/symbol/sym-1d429/)
- [STARS](https://theeduplaycampen.pages.dev/vi/stars/)
- [INSTAGRAM BIO](https://dolly-kaomoji-text-94.pages.dev/ru/instagram-bio/)
- [BORDERS DIVIDERS](https://matrix-glitch-text-59.pages.dev/ru/borders-dividers/)
- [SYM 26CA](https://zen-spacing-text-68.pages.dev/symbol/sym-26ca/)
- [SYM 1D402](https://clean-mono-fonts-64.pages.dev/symbol/sym-1d402/)
- [LATIN CROSS FAITH](https://cyber-clan-tags-38.pages.dev/symbol/latin-cross-faith/)
- [HEARTS](https://mecha-crosshair-tags-20.pages.dev/ja/hearts/)
- [SYM 26E6](https://theeduplaycampen.pages.dev/symbol/sym-26e6/)
- [SYM 1F976](https://scholarly-vintage-symbols-48.pages.dev/symbol/sym-1f976/)
- [SYM 1D425](https://clean-mono-fonts-64.pages.dev/symbol/sym-1d425/)
- [SYM 1F62D](https://anime-sparkle-text-22.pages.dev/symbol/sym-1f62d/)
- [SYM 1D408](https://anime-sparkle-text-23.pages.dev/symbol/sym-1d408/)
- [SYM 1D481](https://theeduplaycampen.pages.dev/symbol/sym-1d481/)
- [SYM 1F639](https://scholarly-vintage-symbols-48.pages.dev/symbol/sym-1f639/)
- [HEARTS](https://lace-bow-symbols-18.pages.dev/es/hearts/)
- [SYM 2628](https://kawaii-kaomoji-hub-96.pages.dev/symbol/sym-2628/)
- [SYM 2742](https://anime-sparkle-text-23.pages.dev/symbol/sym-2742/)
- [SYM 26F3](https://moe-soft-emoticons-41.pages.dev/symbol/sym-26f3/)
- [SYM 2646](https://raven-gothic-kaomoji-25.pages.dev/symbol/sym-2646/)
- [SYM 1F60B](https://lace-heart-kaomoji-64.pages.dev/symbol/sym-1f60b/)
- [LEFT WING CLAN FLARE](https://neon-gamer-symbols-64.pages.dev/symbol/left-wing-clan-flare/)
- [SYM 1D41B](https://cyberpunk-clan-tags-43.pages.dev/symbol/sym-1d41b/)
- [SYM 1D466](https://witchy-runic-text-71.pages.dev/symbol/sym-1d466/)
- [DISCORD STATUS](https://cyber-clan-tags-38.pages.dev/ru/discord-status/)
- [ROBLOX NAMES](https://neon-gamer-symbols-64.pages.dev/es/roblox-names/)
- [HIGH VOLTAGE LIGHTNING](https://neon-gamer-symbols-64.pages.dev/symbol/high-voltage-lightning/)
- [INSTAGRAM BIO](https://kawaii-kaomoji-hub-93.pages.dev/pt/instagram-bio/)
- [SYM 26CA](https://raven-gothic-kaomoji-25.pages.dev/symbol/sym-26ca/)
- [SYM 1D497](https://lace-heart-kaomoji-64.pages.dev/symbol/sym-1d497/)
- [SYM 26DC](https://cyber-clan-tags-38.pages.dev/symbol/sym-26dc/)
- [SYM 26B3](https://kawaii-kaomoji-hub-51.pages.dev/symbol/sym-26b3/)
- [SYM 1D408](https://kawaii-kaomoji-hub-93.pages.dev/symbol/sym-1d408/)
- [SYM 2613](https://anime-sparkle-text-23.pages.dev/symbol/sym-2613/)
- [SYM 26E8](https://gothic-bio-fonts-86.pages.dev/symbol/sym-26e8/)
- [SYM 26CC](https://raven-gothic-kaomoji-25.pages.dev/symbol/sym-26cc/)
- [SYM 1D41F](https://clean-mono-fonts-64.pages.dev/symbol/sym-1d41f/)
- [SYM 26BB](https://soft-pink-fonts-41.pages.dev/symbol/sym-26bb/)
- [NATURE FLOWERS](https://angelic-bow-symbols-76.pages.dev/ru/nature-flowers/)
- [SYM 1D48A](https://cyber-clan-tags-38.pages.dev/symbol/sym-1d48a/)
- [AESTHETIC MINIMAL CLOUD](https://angelic-bow-symbols-76.pages.dev/symbol/aesthetic-minimal-cloud/)
- [SYM 1F976](https://moe-soft-emoticons-41.pages.dev/symbol/sym-1f976/)
- [SYM 1D409](https://anime-sparkle-text-23.pages.dev/symbol/sym-1d409/)
- [SINGLE EIGHTH MUSICAL NOTE](https://soft-pink-fonts-41.pages.dev/symbol/single-eighth-musical-note/)
- [SYM 260B](https://anime-sparkle-text-14.pages.dev/symbol/sym-260b/)
- [SYM 260E](https://soft-pink-fonts-41.pages.dev/symbol/sym-260e/)
- [SYM 2728](https://scholarly-vintage-symbols-48.pages.dev/symbol/sym-2728/)
- [SYM 1D408](https://pearl-girly-fonts-86.pages.dev/symbol/sym-1d408/)
