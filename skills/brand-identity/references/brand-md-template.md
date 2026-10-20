# BRAND.md template, tokens.css and tokens.json

Copy the blocks below, replace every `{placeholder}`, delete sections that do not apply, and keep
the "Decisions and reasons" section: it is what stops the next contributor (human or model) from
re-deciding settled questions. All colour values in the examples are placeholders, not a
recommended palette.

Contents

1. BRAND.md template
2. tokens.css (light, dark, type, spacing, radius, motion)
3. tokens.json (W3C Design Tokens draft shape)
4. DESIGN.md frontmatter variant (Impeccable-compatible)
5. assets/brand/ folder skeleton and naming
6. How web-design and ui-ux consume these files

---

## 1. BRAND.md template

```markdown
# {Brand name} brand guide v{1.0}

> Updated {YYYY-MM-DD}. Status: {draft | agreed}. Owner: {name}.
> Source of truth for colour, type, logo and voice. `tokens.css` and `tokens.json` are generated
> from the tables here; change the tables first, then regenerate.

## Quick reference

| Element | Value |
|---|---|
| Scene | {one sentence: who, where, what light} |
| Colour strategy | {Restrained / Committed / Full palette / Drenched}, {light-first / dark-first} |
| Accent | {name} `oklch({L} {C} {H})` / `#{hex}` |
| Canvas / text | `#{hex}` / `#{hex}` |
| Display face | {Family}, weights {600, 700} |
| Body face | {Family}, weights {400, 500} |
| Voice | {trait}, {trait}, {trait} |
| Logo | {mark type}; master `assets/brand/logo/logo-full.svg` |

## 1. Audience and personality

- Audience: {who, in what situation they meet the brand}
- Personality: {trait, not opposite} x 3-5
- Neighbours and their territory: {competitor: look in five words} (we step away from {what})
- Visual references from the audience's own world: {three concrete things, not websites}

## 2. Colour

### Roles (semantic tokens)

| Role | Token | Light | Dark | Used for |
|---|---|---|---|---|
| Canvas | `--color-canvas` | `oklch()` `#` | `oklch()` `#` | page background |
| Surface | `--color-surface` | | | cards, panels, inputs |
| Surface raised | `--color-surface-raised` | | | menus, dialogs |
| Text | `--color-text` | | | body, headings |
| Text muted | `--color-text-muted` | | | captions, helper text (derived from the text or surface hue, never flat grey) |
| Border | `--color-border` | | | dividers, input borders |
| Accent | `--color-accent` | | | primary actions, links, selection |
| Accent text | `--color-accent-text` | | | text on accent |
| Accent soft | `--color-accent-soft` | | | tinted backgrounds, hover washes |
| Focus | `--color-focus` | | | focus rings (3:1 against adjacent) |
| Success / Warning / Error / Info | `--color-success` ... | | | status, tinted toward the accent hue |

### Primitives (ramp)

{Accent name} ramp, OKLCH, hue {H}: 95 / 90 / 80 / 70 / 60 / 50 / 40 / 30 / 15 lightness, chroma
peaking mid-ramp and falling toward both ends. Neutral ramp: same hue, chroma kept low so it still
reads as grey.

### Contrast results

| Pair | Ratio | Needs | Result |
|---|---|---|---|
| text on canvas | {7.8}:1 | 4.5:1 | pass |
| text-muted on canvas | | 4.5:1 | |
| accent-text on accent | | 4.5:1 | |
| accent on canvas (as link) | | 4.5:1 | |
| border on canvas (inputs) | | 3:1 | |
| focus on canvas and on accent | | 3:1 | |
| (repeat for dark) | | | |

### Rules

- One accent. {Second colour, if any} exists only for {named job}.
- Roughly {60/30/10} canvas/surface/accent on product and reading surfaces.
- Semantic colours keep convention (red error etc.) and never carry meaning alone.
- Avoid: {gradients on text, purple-blue gradients, neon on black, cream+serif+terracotta...}.

## 3. Typography

| Role | Family | Size (desktop / mobile) | Weight | Line height | Tracking |
|---|---|---|---|---|---|
| Display | {Display face} | {3.5rem / 2.25rem} | 700 | 1.1 | -0.02em |
| H1 | | {2.5rem / 1.875rem} | 700 | 1.15 | -0.02em |
| H2 | | {1.875rem / 1.5rem} | 600 | 1.2 | -0.01em |
| H3 | | {1.375rem / 1.25rem} | 600 | 1.3 | 0 |
| Body | {Body face} | 1rem | 400 | 1.6 | 0 |
| Body small | | 0.875rem | 400 | 1.5 | 0 |
| Label (caps) | | 0.75rem | 600 | 1.3 | 0.05em |
| Mono | {Mono face or none} | 0.875rem | 400 | 1.5 | 0 |

- Scale ratio: {1.2 product / 1.25 marketing}. Prose measure 65-75ch.
- Loading: {Google Fonts / self-hosted}, weights {400, 500, 600, 700} only, `font-display: swap`.
- Fallbacks: `{Body face}, {metric-compatible fallback}, system-ui, sans-serif`.
- Licence: {OFL / commercial licence id and seat count}.

## 4. Logo

- Mark type: {wordmark / lettermark / combination / ...}. Why: {reason tied to usage}.
- Variants: full horizontal, stacked, icon, wordmark; each in colour, reversed, mono dark, mono light.
- Clear space: height of the mark on all sides. Minimum width: full 120 px / 35 mm; icon 24 px / 10 mm.
- Backgrounds: colour version on canvas and surface; reversed on accent and dark; mono when colour is unavailable.
- Misuse: do not stretch, rotate, recolour, add shadows/gradients/strokes/glows, crop, rearrange,
  place on busy photography without a plate, or reset the wordmark in a system font.
- Status: {exists at assets/brand/logo/ | brief written below, artwork pending}.

### Logo direction brief (delete once artwork is approved)

{Paste the brief from references/logo-and-visual-identity.md}

## 5. Iconography, imagery, illustration

- Icons: {outlined 2px / filled / duotone}, 24 px grid, `currentColor`, round caps.
- Photography: {light, subjects, treatment, what to avoid}.
- Illustration: {style, palette use, stroke}; or "none, photography only".
- Shape language: radius {sm 4px, md 8px, lg 12px}, borders {1px tinted}, shadows {one soft shadow, offset, never a colour glow}.

## 6. Voice and messaging

| Trait | We are | We are not |
|---|---|---|
| {Trait} | {description} | {anti-description} |

| Context | Tone | Example |
|---|---|---|
| Marketing | | |
| Onboarding | | |
| Support | | |
| Error messages | state what failed and how to recover | "{example}" |
| Success | brief, certain | "{example}" |

- Prohibited terms: {list with one-word reason each}.
- Value proposition (one line): {for whom, what, unlike what}.
- Key messages: 1. {message} (proof: {proof or "proof needed"}) 2. ... 3. ...
- Full positioning and naming: see launch-marketing output at {path}.

## 7. Assets

See `assets/brand/README.md` for the folder map and naming convention.

## 8. Decisions and reasons

| Decision | Reason | Date |
|---|---|---|
| Accent is {hue} not category blue | {reason} | |
| Light-first | {scene} | |
| One family | {reason} | |

## 9. Undecided

- {fact the owner still has to settle}

## Changelog

| Version | Date | Change |
|---|---|---|
| 1.0 | {date} | Initial guide |
```

---

## 2. tokens.css

```css
/* {Brand} design tokens. Generated from BRAND.md; edit the tables there first.
   Colours are OKLCH with hex fallbacks for browsers without OKLCH support. */

:root {
  color-scheme: light dark;

  /* Semantic colour roles, light */
  --color-canvas: #faf8f5;         --color-canvas: oklch(98% 0.005 {H});
  --color-surface: #f2efea;        --color-surface: oklch(95% 0.008 {H});
  --color-surface-raised: #ffffff; --color-surface-raised: oklch(100% 0 0);
  --color-text: #1d1b18;           --color-text: oklch(20% 0.01 {H});
  --color-text-muted: #5c5750;     --color-text-muted: oklch(45% 0.015 {H});
  --color-border: #d9d4cc;         --color-border: oklch(86% 0.01 {H});
  --color-accent: #{hex};          --color-accent: oklch(55% 0.14 {H});
  --color-accent-text: #ffffff;    --color-accent-text: oklch(99% 0.005 {H});
  --color-accent-soft: #{hex};     --color-accent-soft: oklch(93% 0.04 {H});
  --color-focus: #{hex};           --color-focus: oklch(60% 0.16 {H});
  --color-success: #{hex};         --color-success: oklch(55% 0.13 150);
  --color-warning: #{hex};         --color-warning: oklch(70% 0.14 75);
  --color-error: #{hex};           --color-error: oklch(55% 0.18 25);
  --color-info: #{hex};            --color-info: oklch(55% 0.12 240);

  /* Type */
  --font-display: "{Display face}", "{metric fallback}", system-ui, sans-serif;
  --font-body: "{Body face}", "{metric fallback}", system-ui, sans-serif;
  --font-mono: "{Mono face}", ui-monospace, monospace;
  --text-xs: 0.75rem;  --text-sm: 0.875rem; --text-base: 1rem;   --text-lg: 1.125rem;
  --text-xl: 1.25rem;  --text-2xl: 1.5rem;  --text-3xl: 1.875rem; --text-4xl: 2.5rem;
  --text-display: clamp(2.25rem, 5vw + 1rem, 3.5rem);
  --leading-tight: 1.15; --leading-snug: 1.3; --leading-body: 1.6;
  --tracking-display: -0.02em; --tracking-caps: 0.05em;
  --measure: 70ch;

  /* Space (4 px base) */
  --space-1: 0.25rem; --space-2: 0.5rem; --space-3: 0.75rem; --space-4: 1rem;
  --space-6: 1.5rem;  --space-8: 2rem;   --space-12: 3rem;   --space-16: 4rem;

  /* Shape */
  --radius-sm: 4px; --radius-md: 8px; --radius-lg: 12px; --radius-pill: 9999px;
  --border-width: 1px;
  --shadow-sm: 0 1px 2px oklch(20% 0.01 {H} / 0.08);
  --shadow-md: 0 4px 12px oklch(20% 0.01 {H} / 0.10);

  /* Motion */
  --duration-fast: 120ms; --duration-base: 200ms; --duration-slow: 320ms;
  --ease-standard: cubic-bezier(0.2, 0, 0, 1);
}

/* Dark theme: designed, not inverted. Surfaces lift by lightness; accent chroma drops a little
   so it does not glow; muted text stays derived from the hue. */
:root[data-theme="dark"] {
  --color-canvas: #15130f;         --color-canvas: oklch(16% 0.008 {H});
  --color-surface: #1e1b16;        --color-surface: oklch(21% 0.01 {H});
  --color-surface-raised: #27231d; --color-surface-raised: oklch(26% 0.012 {H});
  --color-text: #f1ede6;           --color-text: oklch(94% 0.008 {H});
  --color-text-muted: #b3aca1;     --color-text-muted: oklch(72% 0.015 {H});
  --color-border: #3b362e;         --color-border: oklch(34% 0.012 {H});
  --color-accent: #{hex};          --color-accent: oklch(72% 0.12 {H});
  --color-accent-text: #{hex};     --color-accent-text: oklch(18% 0.03 {H});
  --color-accent-soft: #{hex};     --color-accent-soft: oklch(28% 0.05 {H});
  --color-focus: #{hex};           --color-focus: oklch(78% 0.13 {H});
  --shadow-sm: 0 1px 2px oklch(0% 0 0 / 0.4);
  --shadow-md: 0 4px 12px oklch(0% 0 0 / 0.5);
}

@media (prefers-color-scheme: dark) {
  :root:not([data-theme="light"]) {
    /* repeat the dark block here, or generate both from the same source */
  }
}

@media (prefers-reduced-motion: reduce) {
  :root { --duration-fast: 0ms; --duration-base: 0ms; --duration-slow: 0ms; }
}
```

Notes

- Writing the hex line first and the OKLCH line second lets browsers that do not parse OKLCH keep
  the hex (the later declaration is ignored when invalid). Drop the hex lines once the project's
  browser support list no longer needs them.
- Keep this file free of component rules; it is tokens only. Components live in the site's CSS and
  reference `var(--color-accent)` and friends.
- Tailwind v4: map these into `@theme { --color-accent: ...; }`. Tailwind v3: reference them in
  `theme.extend.colors` as `accent: 'var(--color-accent)'`.

---

## 3. tokens.json

Shape follows the W3C Design Tokens Community Group draft (`$value`, `$type`, `$description`),
which most token tools import. Keep one file with both modes under `modes` or two files; pick what
the project's tooling expects.

```json
{
  "$schema": "https://design-tokens.github.io/community-group/format/",
  "brand": "{Brand name}",
  "version": "1.0",
  "updated": "{YYYY-MM-DD}",
  "color": {
    "canvas":        { "$type": "color", "$value": "oklch(98% 0.005 {H})", "$extensions": { "hex": "#faf8f5", "dark": "oklch(16% 0.008 {H})" }, "$description": "Page background" },
    "surface":       { "$type": "color", "$value": "oklch(95% 0.008 {H})", "$extensions": { "hex": "#f2efea", "dark": "oklch(21% 0.01 {H})" } },
    "text":          { "$type": "color", "$value": "oklch(20% 0.01 {H})",  "$extensions": { "hex": "#1d1b18", "dark": "oklch(94% 0.008 {H})" } },
    "text-muted":    { "$type": "color", "$value": "oklch(45% 0.015 {H})", "$extensions": { "hex": "#5c5750", "dark": "oklch(72% 0.015 {H})" } },
    "border":        { "$type": "color", "$value": "oklch(86% 0.01 {H})",  "$extensions": { "hex": "#d9d4cc", "dark": "oklch(34% 0.012 {H})" } },
    "accent":        { "$type": "color", "$value": "oklch(55% 0.14 {H})",  "$extensions": { "hex": "#{hex}",  "dark": "oklch(72% 0.12 {H})" }, "$description": "Primary action, links, selection" },
    "accent-text":   { "$type": "color", "$value": "oklch(99% 0.005 {H})", "$extensions": { "hex": "#ffffff", "dark": "oklch(18% 0.03 {H})" } },
    "accent-soft":   { "$type": "color", "$value": "oklch(93% 0.04 {H})",  "$extensions": { "hex": "#{hex}",  "dark": "oklch(28% 0.05 {H})" } },
    "focus":         { "$type": "color", "$value": "oklch(60% 0.16 {H})",  "$extensions": { "hex": "#{hex}",  "dark": "oklch(78% 0.13 {H})" } },
    "success":       { "$type": "color", "$value": "oklch(55% 0.13 150)" },
    "warning":       { "$type": "color", "$value": "oklch(70% 0.14 75)" },
    "error":         { "$type": "color", "$value": "oklch(55% 0.18 25)" },
    "info":          { "$type": "color", "$value": "oklch(55% 0.12 240)" }
  },
  "font": {
    "display": { "$type": "fontFamily", "$value": ["{Display face}", "{metric fallback}", "system-ui", "sans-serif"] },
    "body":    { "$type": "fontFamily", "$value": ["{Body face}", "{metric fallback}", "system-ui", "sans-serif"] },
    "mono":    { "$type": "fontFamily", "$value": ["{Mono face}", "ui-monospace", "monospace"] }
  },
  "typography": {
    "display": { "$type": "typography", "$value": { "fontFamily": "{font.display}", "fontSize": "3.5rem", "fontWeight": 700, "lineHeight": 1.1, "letterSpacing": "-0.02em" } },
    "h1":      { "$type": "typography", "$value": { "fontFamily": "{font.display}", "fontSize": "2.5rem", "fontWeight": 700, "lineHeight": 1.15, "letterSpacing": "-0.02em" } },
    "h2":      { "$type": "typography", "$value": { "fontFamily": "{font.display}", "fontSize": "1.875rem", "fontWeight": 600, "lineHeight": 1.2 } },
    "h3":      { "$type": "typography", "$value": { "fontFamily": "{font.display}", "fontSize": "1.375rem", "fontWeight": 600, "lineHeight": 1.3 } },
    "body":    { "$type": "typography", "$value": { "fontFamily": "{font.body}", "fontSize": "1rem", "fontWeight": 400, "lineHeight": 1.6 } },
    "small":   { "$type": "typography", "$value": { "fontFamily": "{font.body}", "fontSize": "0.875rem", "fontWeight": 400, "lineHeight": 1.5 } },
    "label":   { "$type": "typography", "$value": { "fontFamily": "{font.body}", "fontSize": "0.75rem", "fontWeight": 600, "lineHeight": 1.3, "letterSpacing": "0.05em", "textTransform": "uppercase" } }
  },
  "space":  { "1": { "$type": "dimension", "$value": "0.25rem" }, "2": { "$type": "dimension", "$value": "0.5rem" }, "4": { "$type": "dimension", "$value": "1rem" }, "8": { "$type": "dimension", "$value": "2rem" } },
  "radius": { "sm": { "$type": "dimension", "$value": "4px" }, "md": { "$type": "dimension", "$value": "8px" }, "lg": { "$type": "dimension", "$value": "12px" }, "pill": { "$type": "dimension", "$value": "9999px" } },
  "logo": {
    "markType": "{combination}",
    "clearSpace": "height of mark",
    "minWidth": { "fullDigitalPx": 120, "iconDigitalPx": 24, "fullPrintMm": 35, "iconPrintMm": 10 },
    "files": "assets/brand/logo/"
  },
  "voice": {
    "traits": ["{trait}", "{trait}", "{trait}"],
    "prohibited": ["{term}", "{term}"]
  }
}
```

---

## 4. DESIGN.md frontmatter variant

Projects that follow the Impeccable / Google `DESIGN.md` convention keep tokens in YAML
frontmatter. When that file exists, write there instead of a separate BRAND.md and keep the body
sections above below the frontmatter. Only these top-level keys are recognised by that convention
(as of Oct 2026): `name`, `description`, `colors`, `typography`, `rounded`, `spacing`, `components`.
Shadows, motion and breakpoints go into a sidecar file, not the frontmatter.

```yaml
---
name: {Brand name}
description: {one line: scene, strategy, accent, faces}
colors:
  canvas: "oklch(98% 0.005 {H})"
  surface: "oklch(95% 0.008 {H})"
  text: "oklch(20% 0.01 {H})"
  text-muted: "oklch(45% 0.015 {H})"
  border: "oklch(86% 0.01 {H})"
  accent: "oklch(55% 0.14 {H})"
  accent-text: "oklch(99% 0.005 {H})"
  focus: "oklch(60% 0.16 {H})"
  success: "oklch(55% 0.13 150)"
  warning: "oklch(70% 0.14 75)"
  error: "oklch(55% 0.18 25)"
typography:
  display: { fontFamily: "{Display face}", fontSize: "3.5rem", fontWeight: 700, lineHeight: 1.1, letterSpacing: "-0.02em" }
  h1:      { fontFamily: "{Display face}", fontSize: "2.5rem", fontWeight: 700, lineHeight: 1.15 }
  body:    { fontFamily: "{Body face}", fontSize: "1rem", fontWeight: 400, lineHeight: 1.6 }
  label:   { fontFamily: "{Body face}", fontSize: "0.75rem", fontWeight: 600, letterSpacing: "0.05em" }
rounded: { sm: 4px, md: 8px, lg: 12px, pill: 9999px }
spacing: { 1: 0.25rem, 2: 0.5rem, 4: 1rem, 8: 2rem }
components:
  button-primary: { backgroundColor: "{colors.accent}", textColor: "{colors.accent-text}", typography: "{typography.body}", rounded: "{rounded.md}", padding: "0.625rem 1rem" }
  button-primary-hover: { backgroundColor: "oklch(50% 0.14 {H})" }
---
```

Component entries use only eight properties in that convention: `backgroundColor`, `textColor`,
`typography`, `rounded`, `padding`, `size`, `height`, `width`; variants are sibling keys
(`button-primary-hover`). Reference tokens with `{colors.accent}`.

---

## 5. assets/brand/ skeleton and naming

```
assets/brand/
  README.md                 # what each file is, licence notes, who approved
  logo/
    logo-full.svg           # horizontal, full colour (master)
    logo-full-reversed.svg
    logo-full-mono-dark.svg
    logo-full-mono-light.svg
    logo-stacked.svg  (+ reversed, mono variants)
    logo-icon.svg     (+ reversed, mono variants)
    logo-wordmark.svg
    png/                    # exports: logo-full@2x.png, logo-icon-512.png
  favicon/
    favicon.ico             # 32x32 (and 16x16 inside)
    favicon.svg
    apple-touch-icon.png    # 180x180
    icon-192.png, icon-512.png   # web app manifest
  fonts/                    # only if self-hosting; include LICENSE per family
  social/
    avatar-512.png
    og-default-1200x630.png
  mascot/                   # optional: {name}.avatar.json, studio backup
  tokens/
    tokens.css
    tokens.json
```

Naming: `{what}-{variant}[-{state}][@scale].{ext}`, lowercase, hyphens, no spaces or dates in the
name (git holds history). One file per variant; never a light and dark version in one file.
Source files (`.fig`, `.ai`, `.afdesign`) sit beside their exports or in `source/`. Archive old
versions in `archive/{YYYY-MM}/` instead of deleting.

---

## 6. How web-design and ui-ux consume these files

- `web-design` reads `BRAND.md` first (scene, strategy, references, misuse list), imports
  `tokens.css` once at the root, and builds components against the semantic tokens. It may add
  page-level primitives (section spacing, grid) but not new colours; a new colour is a BRAND.md
  change.
- `ui-ux` reads the type scale floors, focus token and semantic status colours; it should never
  need to invent a colour for a state. If it does, the token set is missing a role: add it here.
- `launch-marketing` reads section 6 (voice and messaging) and writes positioning back to its
  own file; `BRAND.md` links to it rather than duplicating.
- `launch-video` reads the palette, faces and logo files for title cards and end plates.
