# T3 Code Themes

A growing collection of themes for T3 Code. The first included theme is Lunar Graphite, a dark graphite skin with quiet contrast, cool neutral surfaces, rounded controls, and restrained interaction states.

## Install

1. Open T3 Code theme settings.
2. Import a theme JSON from `themes/`.
3. Select the imported theme, such as **Lunar Graphite**.

Each importable JSON file contains the complete color roles and CSS for one theme.

## Included themes

- **Lunar Graphite** — `themes/lunar-graphite.json`
- **Graphite Sage** — `themes/graphite-sage.json`
- **Quiet Graphite** (light and dark) — [theme JSON](themes/quiet-graphite.json)

## Quiet Graphite

This version builds on the [Quiet Graphite community skin from T3 Skins](https://www.t3skins.dev/skins/quiet-graphite). It makes the composer, menus, and other native glass surfaces follow T3 Code's **Glass opacity** slider. The composer model picker uses a compact text label, a small chevron, and softer text and icons that respond gradually to T3 Code's **Contrast** slider.

Download [quiet-graphite.json](https://raw.githubusercontent.com/xiaohu31/t3-code-themes/main/themes/quiet-graphite.json) and import it under **Settings → Appearance**.

To regenerate the JSON from the upstream skin, run this from the repository root with Node.js 18 or later:

```sh
node themes/quiet-graphite.mjs
```

The script downloads the original skin, checks its SHA-256, and creates `quiet-graphite.json` in the current directory. You can also pass a previously downloaded original file and choose the output path:

```sh
node themes/quiet-graphite.mjs path/to/original-quiet-graphite.json quiet-graphite.json
```

## Design notes: Lunar Graphite

- Graphite canvas with cool silver text and controls.
- Rounded sidebar rows and search input.
- Composer border and focus treatment without forcing an opaque background, so T3 transparency settings can affect the composer.
- The composer status row is left to T3's native layout.

## Updating

Future themes belong under `themes/`. Keep each theme in its own JSON file and update the changelog with the T3 theme id and a short list of visual changes. This repository is intended to grow as one collection rather than represent a single theme only.

## License

The code, themes, and adjustments authored in this repository are MIT licensed. The Quiet Graphite generator obtains the original community skin from T3 Skins.


