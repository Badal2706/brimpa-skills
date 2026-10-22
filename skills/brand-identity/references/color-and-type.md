# Colour and type for a small brand

How to arrive at a palette and a type system that belong to this product rather than to the
category, and that pass accessibility without a redesign later.

Contents

1. Palette structure (roles)
2. Choosing the accent hue
3. Colour strategy and dosage
4. OKLCH: why and how
5. Building ramps and tinted neutrals
6. Contrast floors and how to check
7. Dark mode derivation
8. Semantic colours
9. The AI-default clusters to step around
10. Type: choosing faces
11. Overused faces (as of Oct 2026)
12. Type scale, roles and floors
13. Font loading and licences
14. Hand-off to tokens
15. Tone table: what colour and type say before a word is read

---

## 1. Palette structure (roles)

Define roles first; swatches follow. A small brand needs:

| Group | Roles | Count |
|---|---|---|
| Surfaces | canvas, surface, surface-raised | 3 |
| Text | text, text-muted, text-on-accent | 3 |
| Lines | border, border-strong (inputs, tables) | 1-2 |
| Action | accent, accent-hover, accent-soft, focus | 3-4 |
| Status | success, warning, error, info (each with a soft background) | 4 |
| Optional | secondary accent with a named job; data series for charts | 0-2 |

Name tokens by purpose. `--color-accent` survives a rebrand; `--color-teal-600` does not. Keep a
primitive ramp underneath (`--teal-50` ... `--teal-900`) only if the project's tooling wants it;
components always reference the semantic layer.

## 2. Choosing the accent hue

- Start from meaning or place: the material of the product (copper, paper, soil, water), the
  physical premises (the clinic's actual tiles, the cafe's awning), the ritual the audience knows
  (a stamped passport, a lab notebook). Write the source down in "Decisions and reasons".
- Do not start from the category table (blue = trust, green = eco). Colour psychology tables are
  weak heuristics and every competitor already followed them, which is exactly why a different hue
  reads as a brand. The table in `logo-and-visual-identity.md` is there to know what the neighbours
  did, not to copy it. Section 15 below shows what a hue or typeface family tends to signal, so a
  chosen hue is checked for tone after it is chosen for meaning, not picked from the table.
- Test the candidate at three chroma levels (muted, mid, saturated) on the chosen canvas before
  committing. Many hues only work muted on light canvases and only work saturated on dark ones.
- If the owner already has a colour they will not give up, keep its hue and tune lightness and
  chroma for contrast; a hue change is a rebrand, an L/C change is maintenance.

## 3. Colour strategy and dosage

Name the strategy before picking values; it decides how much colour the surfaces carry.

| Strategy | What it means | Typical fit |
|---|---|---|
| Restrained | Neutrals tinted from the brand hue, one accent used sparingly on actions and selection | Product UI, documentation, clinics, services, anything people operate or read |
| Committed | One saturated colour carries 30-60% of the surface (a coloured header band, a full-bleed section, a coloured rail) | Marketing pages, brands with one strong colour |
| Full palette | Three or four named colour roles that each own a region or category | Editorial, education, kids, data-heavy products with categories |
| Drenched | The surface is the colour; text and controls derive from it | Campaign pages, single-product brands, posters |

Colour commits at page scale: a field that owns a region, not accent dots sprinkled over grey. On
Restrained surfaces a 60/30/10 split (canvas / secondary surfaces / accent) is a sane default.
Light or dark is never a default either: write one sentence describing the physical scene (who,
where, what light) and let it decide. A dark theme for a receptionist at 9 am is a costume; a light
theme for a night-shift monitoring tool is glare.

## 4. OKLCH: why and how

`oklch(L C H)`: L is perceived lightness 0-100%, C is chroma (0 is grey; most screen colours sit
under 0.37), H is hue angle 0-360. Unlike HSL, equal steps in L look equal to the eye and a hue
keeps its identity as it lightens, which is what makes ramps and dark-mode variants predictable.

- Write new palettes in OKLCH; keep hex beside each value for tools that cannot read it (email
  clients, some design tools, print).
- Browser support is broad as of Oct 2026 but put the hex declaration first and the OKLCH
  declaration second on the same property so older browsers keep the hex.
- Hues that sit near the gamut edge (saturated yellows, cyans) clip on sRGB screens; if a value
  looks dull or shifts, lower C rather than fighting it.

## 5. Building ramps and tinted neutrals

Accent ramp (8-9 steps): hold H constant, step L from about 95% down to about 15%, let C peak in
the middle (around L 50-65%) and fall toward both ends. Near white and near black chroma must drop
or the ends look dirty. Pick the step that passes 4.5:1 against the canvas as the link/accent
colour and the step that gives white text 4.5:1 as the button fill; they are often not the same
step.

Neutral ramp: same hue as the accent (or a deliberately chosen counter-hue), chroma kept low enough
that the colour still reads as grey but no longer as a default. Canvas near L 97-99%, text near
L 15-25%, borders around L 85-88% on light canvases. Never pure `#fff`, `#000`, or the reflexive
`#111`; the tint is what makes the whole page feel like one object.

Secondary text on coloured surfaces: derive it from the surface hue (same H, lower contrast step)
or from the foreground at reduced opacity on a solid, never flat grey over colour, which reads as
disabled.

## 6. Contrast floors and how to check

WCAG 2.1 AA floors; check every pair in both themes and in every state.

| Element | Minimum | Notes |
|---|---|---|
| Body text, labels, helper text | 4.5:1 | includes placeholder text people must read |
| Large text (about 24 px regular, 19 px bold) | 3:1 | |
| UI component boundaries, icons, focus indicators | 3:1 | against adjacent colours, not just canvas |
| Long-form reading, ideal | 7:1 (AAA) | |
| Disabled controls | exempt, but keep them readable where the content matters | |

Method: relative luminance from sRGB (linearise each channel: `v/12.92` when `v <= 0.03928`, else
`((v+0.055)/1.055)^2.4`; luminance `0.2126 R + 0.7152 G + 0.0722 B`), then
`(lighter + 0.05) / (darker + 0.05)`. Any contrast checker that reports WCAG 2.1 ratios will do;
record the numbers in the BRAND.md table so reviewers do not re-measure. Also view the palette
through a colour-vision-deficiency simulator and in greyscale: hierarchy and state must survive
both. Colour-conveyed information always gets a second channel (icon, text, shape, position).

## 7. Dark mode derivation

Design it; do not invert.

- Surfaces: canvas around L 14-18%, surface a few points lighter, raised surface lighter still
  (elevation by lightness, not by shadow). Keep the same hue tint as light mode.
- Text: L 92-95% for primary (not pure white, which glares), muted text about L 70-75%.
- Accent: raise L and lower C a little compared with light mode so it does not glow; re-check
  4.5:1 for accent-as-text and for text on accent (dark text on a light accent often wins here).
- Shadows: lower opacity, or replace with a one-step surface lift. Never a coloured glow.
- Body type: light-on-dark thins the face; compensate with a touch more line height, tracking, or
  one weight step where the face offers it.
- Implement as `:root[data-theme="dark"]` plus a `prefers-color-scheme: dark` block for the default,
  and set `color-scheme: light dark` so native controls follow.

## 8. Semantic colours

Keep the conventions people already know (red error, green success, amber warning, blue or
neutral info) and tint each toward the brand so they sit inside the palette instead of looking
imported. Each needs a strong value (text/icon, 4.5:1 on canvas) and a soft value (background
tint). Never rely on the colour alone; pair with an icon and words.

## 9. The AI-default clusters to step around

Every model trained on the same templates produces the same looks. They are legitimate when a
brief asks for them in its own words; as defaults they make a brand anonymous.

1. Warm cream canvas (near `#F4F1EA`) + high-contrast serif display + terracotta or signal-red
   accent.
2. Near-black canvas + one neon (acid green, cyan, vermilion) accent with glowing edges.
3. Broadsheet editorial: hairline rules, italic serif display, small tracked mono labels, zero
   radius.
4. Flat saturated ink, black boxes, hard offset shadows, heavy condensed display type.
5. Purple-to-blue or violet gradients; cyan on dark; gradient text; zero-offset colour glow shadows;
   radial spotlight behind the hero.

Self-check: if someone could guess the look from the category alone, or from the category plus
"avoiding the obvious", it is still a default. A warm, bookish or child-facing subject does not
soften this: cream plus serif for a book subject is the default wearing the subject's clothes.

## 10. Type: choosing faces

- Fewest families that make the hierarchy unmistakable. One family with real weights is often
  right for product UI; a second family needs a role only it can perform (display voice, code,
  tabular figures, a script language the first lacks).
- Choose the face like an object from the subject's world, in the register of the surface. Ask:
  what would this brand's signage, packaging or letterhead be set in before the web existed? Then
  find a contemporary face with proper weights, italics if needed, and the language coverage the
  audience requires (Devanagari, Gujarati, Tamil and so on for Indian clients; check before you
  commit).
- Marketing surfaces may let display type carry the voice. Product UI wants stability, scanability
  and a fixed role scale; the brand shows through in the display face, the accent and the copy.
- Test candidates with the brand's real words at the real sizes: the name at 16 px in the header,
  a 40-character headline, a paragraph at 16 px/1.6, a table of numbers, a form label at 14 px.
- Check the tone the family signals against the price and craft the brand claims (section 15); a
  face that reads cheaper than the work keeps prices low.

## 11. Overused faces (as of Oct 2026)

These read as "generated" because they appear in most AI-produced sites. Naming one requires a
reason no other face could satisfy; subject association ("tech wants a mono", "books want a serif")
is never that reason.

- Sans: Inter (as display; acceptable as a quiet product-UI body face), Roboto, Arial and bare
  system stacks used as the brand face, Geist, Plus Jakarta Sans, Space Grotesk, DM Sans, Outfit,
  Instrument Sans, IBM Plex Sans, Syne.
- Serif: Fraunces, Playfair Display, Cormorant, Lora, Crimson, Newsreader, Recoleta, DM Serif,
  IBM Plex Serif.
- Mono: Space Mono, IBM Plex Mono as a "technical" costume; monospace for small data labels.
- Patterns: italic-serif display hero; tracked all-caps eyebrow above every heading; mono labels
  under a serif headline.

Where to look instead: a type foundry's catalogue filtered by the register you need, Google Fonts
sorted by anything other than "trending", the faces used by the audience's own institutions and
publications. Keep a shortlist of three, test per section 10, and write the reason in BRAND.md.

## 12. Type scale, roles and floors

Roles: display, h1, h2, h3, body, body-small, label, mono. Fewer is fine; more needs a reason.

Floors and ranges (web):

| Item | Value |
|---|---|
| Body size | 16 px minimum (iOS Safari zooms inputs under 16 px); 14 px only for genuinely secondary text; 12 px captions sparingly |
| Interactive or content UI text | never under 11 px (10 px only for non-interactive legal smallprint) |
| Body line height | 1.5-1.7 (tune to face and measure; longer lines need more) |
| Heading line height | 1.1-1.3 |
| Measure | 45-75 ch; set `max-width` 65-75 ch on prose |
| Display size | at most 6 rem |
| Display tracking | not tighter than -0.04 em; -0.02 to -0.03 usually better |
| All-caps labels | +0.05 em tracking, short runs only; never body text in caps |
| Body tracking | 0 (anything above 0.05 em reads as a mistake) |
| Hierarchy step | adjacent roles differ by at least 1.25x in size, or by weight plus space |

Scale ratios: product UI 1.125-1.2 on a fixed rem scale so screens stay predictable; marketing
1.25 (major third) with `clamp()` on display sizes. Example 1.25 scale from 16 px: 12.8 / 16 / 20 /
25 / 31 / 39 / 49 / 61 px. Pair weights deliberately: body 400, UI labels and buttons 500-600,
headings 600-700; avoid weights under 400 at small sizes.

Line breaks: `text-wrap: balance` on headings and short centred blocks; `text-wrap: pretty` on
body copy. Left-align body text; justified text without hyphenation in narrow columns is a tell.
Paragraph spacing or first-line indent, not both.

## 13. Font loading and licences

- Load only the weights and styles used; a variable font is often smaller than three static cuts.
- `font-display: swap` and a metric-compatible fallback (size-adjust / ascent-override) so the
  page does not reflow when the web font lands.
- Self-host when the privacy posture requires it (some jurisdictions treat third-party font
  requests as a data transfer); otherwise a `preconnect` to the font host.
- Record the licence in BRAND.md: Open Font License faces are free for web and print; commercial
  faces carry web pageview or seat terms. A client brand built on a face they cannot afford to
  license is a liability.

## 14. Hand-off to tokens

Every value decided here lands in three places: the BRAND.md tables (with the reason), `tokens.css`
(semantic custom properties, light and dark), and `tokens.json`. Contrast results go in the
BRAND.md table. See `brand-md-template.md` for the exact blocks.

## 15. Tone table: what colour and type say before a word is read

Visitors read the palette and the type before the headline, and the tone they infer sets the price
they expect. Use this table as a check after choosing (does the chosen hue and face match the
register and price the brand claims?), never as a selection rule: section 2 and section 9 explain
why starting from "blue = trust" produces the category default and the AI clusters.

Caveats, both load-bearing: colour meanings are cultural (white is bridal in one market and
mourning in another; red is luck in one and danger in another; check the audience's own
associations, especially for Indian and other multilingual audiences), and they are
category-relative (green reads as "safe" in therapy and as "cheap organic" on a supermarket shelf
already full of it). The typeface readings below are about families and treatments, not single
fonts; the overused list in section 11 still applies to any named face.

| Family or treatment | Typical tone read | Typical price read | Watch out |
|---|---|---|---|
| Blue (muted, mid) | trust, stability, calm | neutral to professional | the most crowded hue; a brand, not a category, needs a reason beyond "trust" |
| Green (muted) | growth, safety, health | neutral | mint green is a tech default; saturated green reads as discount or eco-cliche |
| Deep reds, maroon, burgundy | craft, heritage, seriousness | higher | bright red flips to urgency and sale |
| Warm neutrals with one accent | considered, calm, established | higher | cream + serif + terracotta is an AI cluster; tint from the brand hue instead |
| Black or near-black with one metal or one muted accent | authority, sophistication | high | reflexive `#111` and neon-on-black read as a template, not luxury |
| Saturated multi-colour, high chroma | playful, youthful, energetic | lower unless the whole world is built that way on purpose | works for loud challenger brands; fails for high-stakes services |
| Thin, all-caps sans over busy imagery | generic, hurried | lower | the combination, not the sans, is the problem: caps plus thin weight plus clutter |
| Rounded sans (soft terminals, open shapes) | warm, casual, approachable | neutral to lower | friendly brands, kids, community; not for wealth or surgery |
| Tall, condensed or angular sans | bold, assertive, athletic | neutral | one weight too many turns it into shouting |
| Humanist sans with real weights | clear, steady, modern | neutral to higher | the safe default for product UI; let colour and copy carry the voice |
| Elegant serif (moderate contrast, generous size) | craft, expertise, patience | higher | high-contrast display serifs are on the overused list; pick by register, not by name |
| Monospace as display | technical costume | neutral | a tell when the subject is not actually code |
| Script or display face | personality, occasion | varies | one role only (display); never body or UI |

Case (adapted from a practitioner talk; see `sources.md`): a boutique clarinet repair and sales
shop set its site in thin all-caps sans over a cluttered workbench photo. It read as a cheap repair
counter, and the owner kept prices low to match. An elegant serif on a clean background with a
deep maroon accent matched the craftsmanship the shop actually delivered and gave the owner the
confidence to raise prices. Nothing about the service changed; the tone the type and colour
announced did.

How to use it: pick the hue from meaning and place (section 2) and the face from the subject's
world (section 10), then read this table once to confirm the tone and price they announce match
the brand's positioning (for premium or luxury positioning work, the `luxury-web-design` skill owns
that). If they do not, adjust lightness, chroma, weight or treatment first; change the hue or
family only when the mismatch is in kind, not degree.
