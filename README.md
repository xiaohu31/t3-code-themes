# T3 Code Themes

A growing collection of themes for T3 Code. The first included theme is Lunar Graphite, a dark graphite skin with quiet contrast, cool neutral surfaces, rounded controls, and restrained interaction states.

## Install

1. Open T3 Code theme settings.
2. Import the theme JSON you want from `themes/`.
3. Select the imported theme, such as **Lunar Graphite**.

Each JSON file is the source of truth for one theme. It contains the complete color roles and CSS overrides used by that theme.

## Included themes

- **Lunar Graphite** — `themes/lunar-graphite.json`

## Design notes: Lunar Graphite

- Graphite canvas with cool silver text and controls.
- Rounded sidebar rows and search input.
- Composer border and focus treatment without forcing an opaque background, so T3 transparency settings can affect the composer.
- The composer status row is left to T3's native layout.

## Updating

Future themes belong under `themes/`. Keep each theme in its own JSON file and update the changelog with the T3 theme id and a short list of visual changes. This repository is intended to grow as one collection rather than represent a single theme only.

## License

MIT
