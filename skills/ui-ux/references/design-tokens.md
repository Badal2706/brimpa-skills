# Design tokens: primitive -> semantic -> component

Tokens make a UI themeable, consistent and auditable. Three layers; components consume the top two, never primitives directly. Brand values (hues, faces) come from `brand-identity`; this file is about structure, naming, states and dark mode.

## Contents

1. The three layers
2. Naming
3. Primitive scales (starting values)
4. Semantic roles
5. Component tokens
6. States and variants
7. Dark mode protocol
8. Mapping to Tailwind, CSS and native
9. Auditing an existing codebase
10. Pitfalls

## 1. The three layers

| Layer | Holds | Example | Changes when |
|---|---|---|---|
| Primitive | Raw values with no meaning | `--color-blue-600: #2563EB`, `--space-4: 1rem` | Rarely; foundational |
| Semantic | Purpose aliases referencing primitives | `--color-primary: var(--color-blue-600)`, `--color-border`, `--spacing-section` | Theme switch, rebrand |
| Component | Per-component values referencing semantic | `--button-bg: var(--color-primary)`, `--input-focus-ring` | A component needs to differ |

```css
/* Good: semantic */
.card { background: var(--color-card); color: var(--color-card-foreground); border: 1px solid var(--color-border); }
/* Bad: primitive leaks meaning into the component */
.card { background: var(--color-gray-50); color: var(--color-gray-900); }
```

File layout: `tokens/primitives.css`, `semantic.css`, `components.css`, `index.css`; or one file with layer comments. Token JSON for tooling follows the W3C Design Tokens Community Group format (`{"color":{"blue":{"600":{"$value":"#2563EB","$type":"color"}}}}`).

## 2. Naming

`--{category}-{item}-{variant}-{state}`: `--color-primary`, `--color-primary-hover`, `--button-bg-hover`, `--space-section-sm`. Categories: color, space, font-size, font, leading, tracking, radius, shadow, duration, ease, z. Name by purpose at the semantic layer ("muted-foreground", "destructive"), by value only at the primitive layer ("gray-500"). Never name a semantic token after a colour ("--color-blue-text") because it must survive a rebrand.

## 3. Primitive scales (starting values)

Use the project's existing scale when one exists. For a new web palette prefer OKLCH ramps (vary lightness, reduce chroma near white and black; about eight steps from roughly 15% to 95% lightness). Hex equivalents are fine in tokens.

- Spacing, 4px base: 0, 1px, 2, 4, 6, 8, 10, 12, 14, 16, 20, 24, 28, 32, 36, 40, 48, 56, 64, 80, 96 (`--space-0` ... `--space-24`). A 4-unit base gives the middle steps an 8-only scale misses.
- Font size: 12, 14, 16, 18, 20, 24, 30, 36, 48 (`--font-size-xs` ... `--font-size-5xl`); product UI uses a fixed rem scale at ratio 1.125-1.2 and the cleanest app scales are 12/14/16/24 or 12/14/18/24; marketing may use `clamp()`.
- Line height: 1, 1.25, 1.375, 1.5, 1.625, 2; body 1.5-1.7; 20px for 14px text and 24px for 16px in dense UI.
- Weight: 400, 500, 600, 700; a product screen uses about three and rarely exceeds 600.
- Tracking: -0.05em, -0.025em, 0, 0.025em, 0.05em; negative only on large type; wide only on short uppercase labels.
- Radius: 0, 2, 4, 6, 8, 12, 16, 24, 9999. Choose one family (tight 4-8 or soft 16-24) and step nested radii down.
- Shadow: `sm 0 1px 2px rgb(0 0 0 / .05)`, `default 0 1px 3px rgb(0 0 0 / .1)`, `md 0 4px 6px -1px rgb(0 0 0 / .1)`, `lg 0 10px 15px -3px rgb(0 0 0 / .1)`, `xl 0 20px 25px -5px rgb(0 0 0 / .1)`; shadows carry an offset and soft blur; a zero-offset coloured halo is decoration. On app screens, shadows for what floats; resting cards get a border or a tone step.
- Duration: 75, 100, 150, 200, 300, 500, 700ms with semantic `--duration-fast: 150ms`, `--duration-normal: 200ms`, `--duration-slow: 300ms`; `--ease-out: cubic-bezier(0.16, 1, 0.3, 1)`.
- Z-index: 0-50 for in-flow layering; dropdown 1000, sticky 1100, modal 1200, popover 1300, tooltip 1400.
- Status primitives: green 600 `#16A34A` (as text use a darker green such as `#247b50` to reach 4.5:1), yellow 500 `#EAB308`, red 600 `#DC2626`, blue 500 `#3B82F6`.

## 4. Semantic roles

Minimum set for a product UI (names follow the common shadcn-style convention so most component libraries map directly):

```css
:root {
  --color-background: var(--color-gray-50);      /* page ground */
  --color-foreground: var(--color-gray-900);
  --color-card: #fff;              --color-card-foreground: var(--color-gray-900);
  --color-popover: #fff;           --color-popover-foreground: var(--color-gray-900);
  --color-primary: var(--color-blue-600);  --color-primary-hover: var(--color-blue-700);
  --color-primary-active: var(--color-blue-800); --color-primary-foreground: #fff;
  --color-secondary: var(--color-gray-100); --color-secondary-foreground: var(--color-gray-900);
  --color-muted: var(--color-gray-100);     --color-muted-foreground: var(--color-gray-500);
  --color-accent: var(--color-gray-100);    --color-accent-foreground: var(--color-gray-900);
  --color-destructive: var(--color-red-600); --color-destructive-foreground: #fff;
  --color-success: var(--color-green-600);  --color-warning: var(--color-yellow-500);
  --color-error: var(--color-red-600);      --color-info: var(--color-blue-500);
  --color-border: var(--color-gray-200);    --color-input: var(--color-gray-200);
  --color-ring: var(--color-blue-500);
  --spacing-component: var(--space-3);      --spacing-section: var(--space-12);
  --spacing-page-x: var(--space-4);
  --font-body: var(--font-size-base);       --font-label: var(--font-size-sm);
  --font-caption: var(--font-size-xs);      --font-heading: var(--font-size-2xl);
  --ring-width: 2px; --ring-offset: 2px; --opacity-disabled: 0.5;
}
```

App-screen roles worth adding (from measured product screens): `--ground`, `--surface`, `--raised`, `--active` (nav pill fill), `--border`, `--rule` (row rules, one step lighter than border), `--control` (control borders, one step darker), `--text`, `--muted`, `--faint` (placeholders, still >= 4.5:1), `--positive`/`--negative` with pale pill pairs (`--pill-positive-bg: #dcfae5; --pill-positive-ink: #04250e; --pill-negative-bg: #ffedea; --pill-negative-ink: #831c1e; --pill-warning-bg: #fffbeb; --pill-warning-ink: #92400e`), `--grid` for chart gridlines, and one `--accent` for data.

Data-visualisation roles: `--chart-1` ... `--chart-5` (categorical, distinct in lightness as well as hue), a sequential ramp, a diverging ramp, and `--chart-reference` for targets. Colour is never the only code in data.

## 5. Component tokens

Define per component, referencing semantic tokens, including every state the component has:

```css
:root {
  --button-bg: var(--color-primary);           --button-fg: var(--color-primary-foreground);
  --button-hover-bg: var(--color-primary-hover); --button-active-bg: var(--color-primary-active);
  --button-padding-x: var(--space-4);          --button-padding-y: var(--space-2);
  --button-radius: var(--radius-md);           --button-font-size: var(--font-size-sm);
  --input-bg: var(--color-background);         --input-border: var(--color-input);
  --input-placeholder: var(--color-muted-foreground);
  --input-focus-ring: var(--color-ring);       --input-error-border: var(--color-error);
  --input-disabled-bg: var(--color-muted);     --input-radius: var(--radius-md);
  --card-bg: var(--color-card); --card-border: var(--color-border); --card-padding: var(--space-5); --card-radius: var(--radius-lg);
  --dialog-overlay-bg: rgb(0 0 0 / 0.6); --dialog-max-width: 32rem; --dialog-shadow: var(--shadow-lg);
  --table-header-fg: var(--color-muted-foreground); --table-row-hover-bg: var(--color-muted);
  --table-cell-padding-x: var(--space-4); --table-cell-padding-y: var(--space-3);
  --badge-radius: var(--radius-full); --badge-font-size: var(--font-size-xs);
}
```

Variants set the component's own custom properties rather than new rules:

```css
.button { background: var(--button-bg); color: var(--button-fg); }
.button.secondary { --button-bg: var(--color-secondary); --button-fg: var(--color-secondary-foreground); }
.button.destructive { --button-bg: var(--color-destructive); --button-fg: var(--color-destructive-foreground); }
.button.sm { --button-padding-y: var(--space-1-5); --button-font-size: var(--font-size-xs); }
```

## 6. States and variants

| State | Trigger | Treatment |
|---|---|---|
| default | none | base |
| hover | pointer over (only where `(hover: hover)`) | slight colour shift, cursor |
| focus | keyboard or programmatic focus | 2px ring with 2px offset, 3:1 |
| active | pressed | darkest colour, 100-150ms |
| selected | chosen in a set | fill or rule, persistent, distinct from focus and hover |
| disabled | `disabled` / `aria-disabled` | opacity 0.5 or muted fill, still >= 3:1 legible, `cursor: not-allowed`, reason available |
| loading | async in flight | in-place spinner or progress, controls inert, `aria-busy` |
| error | invalid | error border, message below, `aria-invalid` |
| success | confirmed | brief confirmation, then return to default |

Priority when several apply: disabled > loading > active > focus > hover > default. Transition colours and backgrounds at 150ms, transforms and shadows at 200ms, with the project's ease-out. Focus ring: `box-shadow: 0 0 0 var(--ring-offset) var(--color-background), 0 0 0 calc(var(--ring-offset) + var(--ring-width)) var(--ring-color)` or `outline` (outline also survives forced-colors mode). Error focus swaps the ring colour for `--color-error`.

Status pills: pale tint with dark text of the same hue; a saturated fill only for the one call to action and only while rare. Toggle on-colour is a semantic green or near-black, not the brand accent.

## 7. Dark mode protocol

1. Override semantic tokens only, under `.dark` or `[data-theme="dark"]`, with `prefers-color-scheme` as the default when no explicit choice is stored; never redefine primitives, never patch components.
2. Design the surfaces: elevation by lightness steps (ground `#000`/`#111`/`#171719`, surfaces one step lighter, nested panels another step), or the ground's fill with a 1px line; no navy or slate by reflex; shadows mostly disappear, a faint one for what floats.
3. Reduce chroma: saturated brand colours vibrate on dark; lift lightness and lower chroma for text and fills; status colours become a hue on a dark tint of itself (`#3fc07a` on `#172a1d`).
4. Text: `#fff` primary, about `#b4b4b4` secondary, about `#949494` meta; two greys at most, far enough apart to read as two; everything that carries words still >= 4.5:1. Light-on-dark reads thinner: one weight step or a little more tracking and leading where needed.
5. Lines: structural lines 22-31 levels above the ground (`#1a1a1a` on `#000`, `#2e2e2e` on `#111`); interactive outlines brighter (`#373737-#4c4c4c`) so an outlined button reads as clickable.
6. Emphasis without colour: an inverted white primary button, a grey-filled button, brightness for the active nav item.
7. Images and charts: tone down pure-white images with a slight filter; chart gridlines about `#2b2b2b`; one data hue still carries the main series.
8. Re-check every state in both themes with a contrast tool on rendered values; check `color-scheme: light dark` so form controls and scrollbars follow.
9. Pick light or dark by the use scene (who, where, under what light), not by category; offer both when sessions span day and night.

```css
:root { color-scheme: light dark; }
:root[data-theme="dark"], .dark {
  --color-background: var(--color-gray-950); --color-foreground: var(--color-gray-50);
  --color-card: var(--color-gray-900);       --color-card-foreground: var(--color-gray-50);
  --color-muted: var(--color-gray-800);      --color-muted-foreground: var(--color-gray-400);
  --color-secondary: var(--color-gray-800);  --color-border: var(--color-gray-800);
  --color-input: var(--color-gray-800);      --color-primary-foreground: var(--color-gray-950);
}
```

## 8. Mapping to Tailwind, CSS and native

As of Oct 2026:
- Tailwind v4: declare tokens in `@theme { --color-primary: oklch(...); --spacing-section: 3rem; }`; utilities such as `bg-primary` are generated from them; semantic overrides for dark mode go on `:root[data-theme="dark"]` outside `@theme` using the same variable names (`@theme inline` lets utilities read the live variable).
- Tailwind v3: `theme.extend.colors.primary = 'rgb(var(--color-primary-rgb) / <alpha-value>)'` with the variable holding channel values, or `'var(--color-primary)'` when opacity utilities are not needed; `darkMode: 'class'`.
- Plain CSS / CSS Modules / styled-components / Vue / Svelte: consume `var(--token)`; expose tokens on `:root` and the theme attribute; component libraries (shadcn/ui, Radix Themes, MUI, Vuetify) each read a theme object or CSS variables; map semantic names once at the adapter.
- Flutter: `ThemeData` with `ColorScheme` roles and `TextTheme`; extensions for custom semantic tokens; Material 3 colour roles map directly to semantic tokens.
- SwiftUI: semantic system colours (`Color.primary`, `.secondary`, `.background`) plus asset-catalog colour sets with light/dark variants; Dynamic Type text styles replace fixed font-size tokens.
- Android (Compose): `MaterialTheme.colorScheme` roles, `Typography` in `sp`, dynamic colour with a static fallback.
- Figma: variables in the same three collections (primitive, semantic, component) with light and dark modes on the semantic collection; export to DTCG JSON so code and design share one source.

## 9. Auditing an existing codebase

Scan in this order: CSS custom properties (`--color-`, `--font-`, `--spacing-`, `--radius-`, `--shadow-`, `--ease-`, `--duration-`); Tailwind config or `@theme`; CSS-in-JS theme objects; token JSON; component library theme; global stylesheet; rendered computed styles.

Classify drift at the narrowest correct level: missing token / one-off implementation / conceptual mismatch / local defect. Extract a token or component only for patterns used three or more times with the same intent; premature abstraction is worse than duplication. Flags: literal colours outside the palette; font sizes off the ramp; radii outside the scale; a second button implementation; `z-index: 9999`; hard-coded `#fff` that breaks in dark mode; values that do not change on theme switch.

## 10. Pitfalls

- A token for every value: tokens for roles, not for every pixel.
- Semantic names that encode colour or size ("blue-text", "big-heading").
- Components reading primitives, so a rebrand touches every file.
- Dark mode as inversion: identical contrast assumptions, shadows kept, saturated accents kept.
- Disabled styles that drop below 3:1; placeholders below 4.5:1.
- Alpha-stacked translucent layers instead of explicit colours (unpredictable contrast).
- Theme values duplicated between the token file and the documentation; keep one source and generate the other.
