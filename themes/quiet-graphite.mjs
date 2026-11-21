import { createHash } from "node:crypto";
import { readFile, writeFile } from "node:fs/promises";

const upstream = "https://www.t3skins.dev/skins/quiet-graphite/skin.json";
const upstreamSha256 = "c46f795a1086f3f7c997baab64cba138165313a202ac40f6ca7e7b871ebaedc8";

// Source CSS locations are one-based and listed from bottom to top.
const edits = [
  { line: 833, remove: 1, add: [
    "    --studio-tooltip-surface: var(--app-theme-surface-overlay, var(--card));",
  ] },
  { line: 627, remove: 1 },
  { line: 623, remove: 1 },
  { line: 607, remove: 0, add: [
    "  }",
    "",
    "  html[data-theme-id] [data-slot=\"tooltip-popup\"]:not(.dropdown-glass) {",
    "    background: var(--studio-tooltip-surface);",
    "    backdrop-filter: none;",
    "  }",
    "",
    "  html[data-theme-id] [data-slot=\"tooltip-popup\"].dropdown-glass {",
    "    --popover: var(--studio-tooltip-surface);",
  ] },
  { line: 602, remove: 1 },
  { line: 598, remove: 1 },
  { line: 502, remove: 1, add: [
    "    --studio-scroll-button-fill: var(--studio-main-control-pressed);",
  ] },
  { line: 497, remove: 1, add: [
    "      --studio-scroll-button-fill: var(--studio-main-control-hover);",
  ] },
  { line: 477, remove: 1, add: [
    "  --studio-scroll-button-fill: var(--app-theme-surface-overlay, var(--popover));",
    "  background-color: color-mix(in srgb, var(--studio-scroll-button-fill) var(--glass-opacity), transparent);",
  ] },
  { line: 407, remove: 0, add: [
    "",
    "  &.surface-glass {",
    "    background-color: color-mix(in srgb, var(--studio-main-control-pressed) var(--glass-opacity), transparent);",
    "  }",
  ] },
  { line: 377, remove: 0, add: [
    "[data-chat-composer-surface] [data-chat-composer-footer-controls] button[data-chat-provider-model-picker] {",
    "  --studio-model-picker-tint: 0%;",
    "  --control-icon-color: currentColor;",
    "  color: var(--studio-composer-icon);",
    "  background-color: transparent;",
    "  border-radius: 0.4375rem;",
    "  box-shadow: none;",
    "  scale: none;",
    "  transition: none;",
    "  font-family: var(--studio-ui-font);",
    "  font-weight: 500;",
    "",
    "  &::before {",
    "    content: \"\";",
    "    order: 1;",
    "    flex: none;",
    "    inline-size: 0.3125rem;",
    "    block-size: 0.3125rem;",
    "    margin-inline: 0.125rem 0.0625rem;",
    "    border-right: 1px solid currentColor;",
    "    border-bottom: 1px solid currentColor;",
    "    color: var(--app-theme-text-muted, var(--muted-foreground));",
    "    transform: translateY(-1px) rotate(45deg);",
    "    pointer-events: none;",
    "  }",
    "",
    "  &:is(:hover, :focus-visible, :active, [data-pressed], [data-popup-open], [aria-expanded=\"true\"]):not(:disabled, [aria-disabled=\"true\"], [data-disabled]) {",
    "    background-color: color-mix(",
    "      in srgb,",
    "      color-mix(in srgb, var(--studio-composer-icon) var(--studio-model-picker-tint), transparent) var(--glass-opacity, 100%),",
    "      transparent",
    "    );",
    "  }",
    "",
    "  @media (hover: hover) {",
    "    &:hover {",
    "      --studio-model-picker-tint: 9%;",
    "    }",
    "  }",
    "",
    "  &:is(:active, [data-pressed], [data-popup-open], [aria-expanded=\"true\"]) {",
    "    --studio-model-picker-tint: 14%;",
    "  }",
    "",
    "  &:focus-visible {",
    "    outline: 2px solid var(--studio-composer-focus);",
    "    outline-offset: -2px;",
    "  }",
    "",
    "  &:is(:disabled, [aria-disabled=\"true\"], [data-disabled]) {",
    "    opacity: 0.5;",
    "  }",
    "",
    "  @media (prefers-reduced-motion: no-preference) {",
    "    transition: background-color 140ms ease-out;",
    "  }",
    "",
    "  & :is([data-chat-provider-model-picker-icon], [data-chat-provider-model-picker-label] + span:has(> [data-composer-control-label], > svg)) {",
    "    color: var(--app-theme-text-muted, var(--muted-foreground));",
    "  }",
    "",
    "  & [data-chat-provider-model-picker-label] + span:has(> [data-composer-control-label], > svg) {",
    "    gap: 0.25rem;",
    "    font-size: 0.875em;",
    "  }",
    "}",
    "",
  ] },
  { line: 310, remove: 1, add: [
    "  [data-chat-provider-model-picker]:not(:where([data-chat-composer-footer-controls] *))",
  ] },
  { line: 259, remove: 2, add: [
    "        block-size: 1.75rem;",
    "        padding-inline: 0.5rem;",
    "        font-size: 0.8125rem;",
  ] },
  { line: 130, remove: 1 },
  { line: 38, remove: 4 },
  { line: 26, remove: 10 },
];

async function readUpstream(file) {
  if (file) return readFile(file, "utf8");

  const response = await fetch(upstream, { signal: AbortSignal.timeout(15_000) });
  if (!response.ok) throw new Error(`T3 Skins returned HTTP ${response.status}.`);
  return response.text();
}

const [sourceFile, outputFile = "quiet-graphite.json", ...extra] = process.argv.slice(2);
if (extra.length) throw new Error("Usage: node themes/quiet-graphite.mjs [source.json] [output.json]");

const source = await readUpstream(sourceFile);
const sha256 = createHash("sha256").update(source).digest("hex");
if (sha256 !== upstreamSha256) {
  throw new Error(`The original Quiet Graphite file has changed. Expected SHA-256 ${upstreamSha256}.`);
}

const theme = JSON.parse(source);
const lines = theme.css.split("\n");
for (const { line, remove, add = [] } of edits) {
  lines.splice(line - 1, remove, ...add);
}

const output = source.replace(JSON.stringify(theme.css), () => JSON.stringify(lines.join("\n")));
await writeFile(outputFile, output, { flag: "wx" });
console.log(`Created ${outputFile}. Import it in the T3 Code Appearance settings.`);
