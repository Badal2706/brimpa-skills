# Typography and colour

Numbers here come from two sources and are labelled: the gallery study (247 One Page Love and Awwwards sites measured in Oct 2026, via taste-skill) and the craft floor and detector thresholds (impeccable). Where the two disagree, both are given and the stricter one is the default for client work.

## Contents

1. Font pairing table
2. Overused-font list (name one only with a reason)
3. Type roles and scale
4. Setting display type and text
5. Loading fonts
6. Palette method in OKLCH
7. Colour commitment levels
8. Proportion and roles
9. Dark-mode protocol
10. Contrast floors
11. Palette families to refuse by reflex

## 1. Font pairing table

Roles: D = display/headings, T = text/body. "Overused" marks faces on the list in section 2; they are not banned, but naming one needs a reason no other face satisfies (a brand already using it counts). Every family below is on Google Fonts unless marked Fontshare (free, `api.fontshare.com`) or commercial.

| # | Pairing (D / T) | Class | Mood | Best for | Note |
|---|---|---|---|---|---|
| 1 | Switzer / Switzer | sans | neutral, modern, precise | SaaS, studios, dark cinematic, glass | Fontshare; one family at 400/500/700 |
| 2 | Archivo Black / Archivo | grotesk heavy + grotesk | industrial, loud, Swiss | brutalist, posters, agencies | Archivo Expanded for wide hero words |
| 3 | Lexend / Source Sans 3 | sans / sans | trustworthy, legible, plain | finance, government, healthcare systems | Lexend Mega for neo-brutalist display |
| 4 | Figtree / Noto Sans | sans / sans | clean, friendly-professional, medical | clinics, health apps, multilingual sites | Noto covers Indic and CJK scripts |
| 5 | Atkinson Hyperlegible / same | sans | accessible, clear | accessibility-first, public services | designed for low vision |
| 6 | Manrope / Manrope | sans | contemporary, balanced | product-led SaaS, e-commerce | pairs with Calistoga or Syne display |
| 7 | Source Serif 4 / Source Serif 4 | serif | literate, calm, bookish | quiet editorial, craft, publications | real italics; oldstyle numerals suit it |
| 8 | Libre Baskerville / Libre Baskerville | serif | classic, literary | editorial, law, heritage | wider than most; measure 60ch |
| 9 | EB Garamond / Lato | serif / sans | legal, formal, traditional | law firms, universities, archives | Crimson Text as the serif body alternative |
| 10 | Libre Bodoni / Public Sans | didone / sans | magazine, refined | publications, fashion editorial | Bodoni at display sizes only |
| 11 | Bodoni Moda / Jost | didone / geometric | luxury, minimal, couture | luxury monochrome, jewellery | Jost at 300/400 |
| 12 | Cinzel / Josefin Sans | engraved / geometric | property, classical, premium | real estate, hotels, architecture | Cinzel in small uppercase doses |
| 13 | Barlow Condensed / Barlow | condensed / sans | athletic, energetic | sports, fitness, events | condensed headlines take k ≈ 0.40 in the two-line arithmetic |
| 14 | Bebas Neue / Source Sans 3 | display caps / sans | bold, poster | marketing, events, portfolios | caps only; +0.02em tracking |
| 15 | Anton / Epilogue | display / sans | loud, Gen Z, brutal | streetwear, campaigns, neo-brutalist | Anton never below 40px |
| 16 | Outfit / Outfit | geometric | Bauhaus, constructed | colour-field poster, design-forward brands | overused; earn it with uppercase single-weight discipline |
| 17 | Syncopate / Public Sans | wide display / sans | kinetic, automotive, festival | 3D showcase, music, motion-led | two-word headlines only |
| 18 | Fredoka / Nunito | rounded display / rounded sans | playful, warm | kids, pets, snacks, education | Baloo 2 / Comic Neue for younger |
| 19 | Righteous / Nunito Sans | display / sans | fun, musical | entertainment, festivals | Varela Round throughout for the softest voice |
| 20 | Rubik / Nunito Sans | sans / sans | retail, clear, friendly | e-commerce storefronts | Rubik 500 for prices |
| 21 | Amatic SC / Cabin | hand display / sans | craft, artisan, indie | makers, cafes, farms | display sparingly, two or three words |
| 22 | Calistoga / Figtree | display serif / sans | boutique, warm, confident | SaaS with personality, cafes | Calistoga for one hero word |
| 23 | Abril Fatface / Merriweather | fat display / slab-ish serif | retro, dramatic | breweries, restaurants, posters | heavy; needs a quiet page |
| 24 | Poiret One / Didact Gothic | art deco / sans | 1920s, elegant | hotels, cocktail bars, vintage events | thin; keep large |
| 25 | JetBrains Mono / IBM Plex Sans | mono / sans | developer, precise | docs, dev tools | IBM Plex is overused; Figtree as text alternative |
| 26 | Press Start 2P / VT323 | pixel / pixel mono | arcade, 8-bit | retro games, zines | Press Start at 12-20px only, tiny doses |
| 27 | Orbitron / Exo 2 | tech display / sans | sci-fi, HUD | gaming, cyberpunk, crypto | easily a costume; needs the world |
| 28 | Kalam / Patrick Hand | handwriting / handwriting | sketchy, human | journaling, picture books, prototypes | never for a professional service |
| 29 | Noto Serif / Noto Sans (JP, KR, TC, SC, Arabic, Thai, Hebrew, Devanagari variants) | serif / sans | multilingual, neutral | any site in those scripts | subset by `unicode-range`; keep one Noto per script |
| 30 | Be Vietnam Pro / Noto Sans | sans / sans | international, readable | multilingual products | tested for Vietnamese diacritics |
| 31 | Great Vibes / Cormorant Infant | script / serif | wedding, romantic | invitations, bridal | script for names only, never paragraphs |
| 32 | Share Tech Mono / Fira Code | mono / mono | HUD, data | sci-fi dashboards, security marketing | one of the few mono-only pairings; short paragraphs |

Rules of pairing: two families at most, usually one (31% of studied sites use one family, 45% two). Each family has one job and never swaps. Never two faces in one headline. Italic is for titles of works and real emphasis, not decoration. Do not add a third face for labels, numbers or quotes.

## 2. Overused-font list

As of Oct 2026, these faces are the training-data defaults of generated pages. The impeccable detector flags the first six outright; the rest are listed in its new-work calibration. Subject association ("a bookshop wants a serif, a dev tool wants a mono") is never the reason to pick one.

Detector-flagged: **Inter, Roboto, Fraunces, Geist, Plus Jakarta Sans, Space Grotesk.**
Calibration list: **Playfair Display, Cormorant, Lora, Crimson (Pro/Text), Newsreader, Syne, Space Mono, IBM Plex (Sans/Mono), Inter as display, DM Sans, DM Serif, Outfit, Instrument Sans.**
Style-skill bans (soft and minimalist skills): **Arial, Open Sans, Helvetica** as defaults; system display faces (Impact, Arial Black) as the display voice of an own-world page.
Named tells: the oversized italic serif hero (Fraunces, Recoleta, Playfair, Newsreader italic) as the universal AI-startup hero.

Permitted when: the brand already uses it; the brief names it; the face does a job nothing else does (Atkinson for low vision; Noto for a script). Then say so in the plan. "The closest installed font is a failure, not a fallback": source and self-host the face the direction needs.

## 3. Type roles and scale

Roles, fewest that make hierarchy unmistakable: display, heading, lead (supporting sentence), body, small (captions, legal). Five sizes on a page is the ceiling; two or three do the visible work with nothing between.

```css
:root {
  --step-small:   clamp(0.8125rem, 0.79rem + 0.1vw, 0.875rem);  /* 13-14px   captions, legal */
  --step-body:    clamp(1.0625rem, 1rem + 0.25vw, 1.1875rem);   /* 17-19px   paragraphs */
  --step-lead:    clamp(1.25rem, 1.1rem + 0.7vw, 1.625rem);     /* 20-26px   supporting line, large body */
  --step-head:    clamp(2rem, 1.3rem + 3.2vw, 4rem);            /* 32-64px   section headings */
  --step-display: clamp(3rem, 1rem + 9vw, 9rem);                /* set by the direction */
}
```

Numbers to hold:
- Body floor on the web: 16px (1rem). iOS Safari force-zooms focused inputs under 16px. 14px only for genuinely secondary text; nothing under 13px (gallery house rule); detector: body under 12px flagged, interactive or content UI text under 11px fails (10px only for non-interactive legal smallprint).
- Body line height 1.45-1.6 (gallery); 1.5-1.7 (detector flags under 1.3). Lead 1.3-1.4. Display 0.85-1.05 (gallery median hero leading 1.0).
- Measure: 45-75 characters; 65-75ch is the craft-floor target; detector flags lines over about 80ch. A serif can run slightly longer; dense tables may exceed.
- Hierarchy: dominant heading and body roles at least 1.25x apart at every step (detector `flat-type-hierarchy`); on a marketing page the display size should be at least four times the body on desktop (gallery median headline ÷ body is 4.3; top sites 4.7).
- Display size: gallery median hero 72px (5.0vw) at 1440, middle half 43-109px, top sites 6.0vw; largest type on the page median 6.4vw, top sites 8.4vw against 5.0vw on weak sites; on a phone median 40px (32-59). Craft floor caps display at 6rem (96px) for product and most marketing surfaces; go past it only when the direction is explicitly poster-scale (Swiss, Colour-Field, Neo-Brutalist) and the headline is one to three words.
- Tracking: display -0.02 to -0.05em (gallery), floor -0.04em (craft floor; -0.02 to -0.03 usually reads better); tracking scales with size, so set it per step. Body tracking 0; detector flags over 0.05em on body. All-caps wants 0 to +0.03em at display, +0.02 to +0.06em at small sizes; all-caps runs of 80+ characters are flagged.
- Weight: half of studied heroes are set in regular weight; scale and spacing make type confident. Do not change weight on hover (reflow).
- Headlines: two lines or fewer at every width; about 32 characters survives everywhere (gallery median 5 words / 32 characters); a full sentence at display size over three or four lines is a tell. Statements (intro sentence, testimonial) are paragraphs at 36px or less on desktop, 24px on a phone, about 25 words.
- Product and app UI (ui-ux skill): fixed rem scale with ratio 1.125-1.2, not fluid; one family.

## 4. Setting display type and text

```css
.display {
  font-size: var(--step-display);
  line-height: 0.95;
  letter-spacing: -0.03em;
  font-kerning: normal;
  text-wrap: balance;
  max-width: 14ch;            /* choose the measure so lines break where you want */
  margin: 0 0 0 -0.05em;      /* optical alignment of round/diagonal first letters */
}
body { font-size: var(--step-body); line-height: 1.5; text-rendering: optimizeLegibility; }
p { max-width: 62ch; text-wrap: pretty; margin: 0; }
p + p { margin-top: 0.9em; }
.lead { font-size: var(--step-lead); line-height: 1.35; max-width: 40ch; }
```

- `text-wrap: balance` on headings and short centred blocks; `text-wrap: pretty` on body (progressive; a two-word last line is fine, a one-word straggler is not).
- Author the break on a headline where it matters (`Stools for<br>small kitchens`), check it at 390px, and hide or shorten the `<br>` under a breakpoint if it wraps.
- Space above a heading at least twice the space below it (detector `heading-rhythm`).
- Paragraph spacing OR first-line indent, not both. Do not centre paragraphs longer than three lines. Do not justify without `hyphens: auto` (rivers; CJK/Thai/Arabic exempt).
- `font-variant-numeric: tabular-nums` for prices, tables and dates in columns; `oldstyle-nums` suits serif running text.
- Links: `text-underline-offset: 0.18em; text-decoration-thickness: 0.07em` so underlines clear descenders.
- `hyphens: none` on headings; `overflow-wrap: anywhere` only on long URLs and emails; flex and grid text children get `min-width: 0`.
- Light text on a dark ground: one weight step lighter or +0.01em tracking, and slightly more leading.
- Theme the browser's own surfaces from the palette: `::selection`, caret colour, `:focus-visible` outline, scrollbar colour; browser defaults are the cheapest signal of an assembled page.
- Curly quotes and apostrophes, a real ellipsis, an en dash for ranges, a non-breaking space between a number and its unit.

## 5. Loading fonts

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="preload" as="font" type="font/woff2" crossorigin href="/fonts/display.woff2">
```

- Request only the weights you use (two or three in total). Subset with `unicode-range` for large scripts.
- `font-display: swap` (or `optional` for the body face when layout shift matters more than brand); metric-compatible fallbacks (`size-adjust`, `ascent-override`) so the swap does not reflow; always a fallback stack of the same broad kind (sans for sans, serif for serif).
- Preload the display face so the hero headline paints in the real face on the first frame (and below-the-fold masked lines rise in it). In a framework, use its loader (`next/font`) with the same family and weights.
- After building, verify the families that actually rendered (DevTools > Computed > Rendered Fonts). If a face did not load, nothing judged from the screenshots is real.

## 6. Palette method in OKLCH

Prefer OKLCH for a new web palette: lightness is perceptual, so ramps and contrast behave. Choose the hue from the product's meaning and material, never from category association (healthcare is not automatically cyan; finance is not automatically navy).

1. **Name the strategy first** (one line): emotional temperature, dominant relationship (one ground plus one accent; two fields; photographs carry colour), contrast range, dosage.
2. **Build roles, not swatches:**

```css
:root {
  --bg:         oklch(97% 0.01 80);    /* ground: 70-90% of the page */
  --surface:    oklch(94% 0.012 80);   /* one tone step from the ground: 2-6 L points; panels, inputs, tiles */
  --ink:        oklch(20% 0.02 60);    /* main text and strongest marks */
  --muted:      oklch(45% 0.02 60);    /* secondary text; still 4.5:1 on --bg */
  --accent:     oklch(55% 0.17 150);   /* the one accent: the action and at most one other thing */
  --accent-ink: oklch(98% 0.01 150);   /* text on the accent */
  /* --field-1 ... --field-n with their own inks when the direction uses colour fields */
}
```

3. **Ramps:** vary lightness, reduce chroma as you approach white and black. An 8-step tonal ramp from about 15% to about 95% lightness per hue is enough for surfaces, borders and states. Prefer explicit colours over chains of translucent overlays.
4. **Tint the neutrals** toward the world's hue when it creates cohesion; a neutral grey is valid when it serves the world. Neither pure `#000` nor a reflexive `#111`: tint deliberately.
5. **Use tokens for every colour in the build.** A raw hex inside a component is a second palette starting. Do not add greys between the roles: a quieter text is `--muted`, a quieter surface is `--surface`.
6. **Semantic layer on top of primitives** (`--color-action`, `--color-danger`), so a theme change remaps roles rather than values. Keep success/warning/error/info consistent across the site and respect domain conventions (red loss, green profit in finance; red critical, amber degraded in ops).
7. **Secondary text on a coloured surface** is derived from that surface's hue or from its ink (ink at 70% opacity if it still passes), never grey.
8. **Data and states** also need shape, text or position, so colour is never the only channel.

## 7. Colour commitment levels

Decide one for the page before colouring anything (impeccable new-work):

| Level | What it means | Typical directions |
|---|---|---|
| Restrained | neutrals tinted from the world plus one accent under 5-10% of any screen | Quiet Editorial, Corporate Trust, Product-led SaaS, Luxury |
| Committed | one saturated colour carries 30-60% of the surface (a coloured shell, a coloured hero field) | Soft and Calm (tinted), Dark Cinematic, Swiss (one red), Warm Organic |
| Full palette | three or four named roles, each owning regions | Playful Consumer, Neo-Brutalist Pop |
| Drenched | the surface is the colour; sections are fields with their own inks | Colour-Field Poster, event pages |

Colour commits at page scale (fields owning regions), not as accents scattered on a neutral template; a world reduced to an accent on a grey page is "the category default with a sticker on it". Light or dark is never picked by category: write one sentence of the physical scene (who, where, under what light) and let it decide. Top-scored gallery sites change the page's field colour between sections more often than weak ones (median two section grounds against one), and 52% of strong sites use neutral (black, white, grey) buttons; a coloured button is a choice.

## 8. Proportion and roles

- Ground 70-90% of the page; ink for text and perhaps one inverted section; accent under 5% of any screen (the action and at most one other recurring thing). The quieter rule of thumb from impeccable is the 10% accent rule. When the accent appears in five places it stops meaning "here".
- The accent is not for headings, icons, bullets, borders or underlines unless the direction says so; a headline is ink. No styled accent word inside a headline (italic, coloured, underlined, in a pill).
- Surfaces are separated by a tone step, not by a line or a shadow; one step is enough; never nest a panel inside a panel.
- Fields meet edge to edge; neighbouring fields differ in lightness, not only hue; order them like chapters (open strong, rest, surprise, close dark or very light). The `<meta name="theme-color">` and the navigation follow the first field.
- Photographs carrying the colour: the interface stays neutral and takes its ink from the darkest tone in the imagery; one treatment for all images (untouched, all greyscale, multiply on a field, or darkened for a dark page); never a brand-colour wash, duotone, vignette or grain overlay. Text over a photograph gets a neutral scrim (black or the ink at 30-55%, flat or fading over the text area only), the one gradient the house allows.

## 9. Dark-mode protocol

Dark mode is designed, never mechanically inverted. Decide first whether the page needs it at all: the use scene decides (a dev tool used at night, yes; a dental clinic's booking page, usually no). "Dark by default" is a listed anti-pattern for general SaaS marketing in the source catalog; dark is right when the audience, the product or the brief says so.

When you ship it:
1. `color-scheme: light dark` on `:root` (or `dark` for a dark-only page) so form controls and scrollbars follow; set `<meta name="theme-color">` per scheme.
2. Ground: a deep tone tinted from the palette (not `#000`, not a reflexive `#111`); three surface steps 2-6 lightness points apart (e.g. deep, base, elevated) and depth comes only from the lighter step, never from glows, coloured halos or wide shadows.
3. Ink: a soft light (`oklch(93-96%)`), not `#FFF` on `#000` unless the direction is deliberately two-tone; `--muted` must still pass 4.5:1 against the ground (this is where dark pages fail most).
4. Type: one weight step lighter where available, +0.01em tracking on body, slightly more line height; display faces with thin hairlines may need a different weight.
5. Accent: re-pick its lightness for the dark ground (the light-mode accent is usually too dark or too loud); check 3:1 for the control and 4.5:1 for text on it.
6. Images: `filter: brightness(0.85) contrast(1.05)` as a set so edges sink into the ground, or provide dark-specific assets; logos get a light variant.
7. Semantic tokens remap; primitives stay. Test both themes at every state (hover, focus, disabled, selected, error), overlays, text over images, and the browser's own surfaces (selection, scrollbar, caret).
8. Toggle: respect `prefers-color-scheme` first; a manual toggle persists per visitor and never flashes the wrong theme on load (set the class before paint).

## 10. Contrast floors

WCAG 2.2 AA, applied to every state and both themes:
- Body text and placeholders: 4.5:1. Large text (24px regular or 19px bold and up): 3:1. AAA target 7:1 where the audience or the sector asks (government, health systems); the gallery house palettes meet 7:1 ink on ground.
- Controls, icons that carry meaning, and focus indicators: 3:1 against adjacent colours. Focus indicator at least a 2 CSS px perimeter with 3:1 change between focused and unfocused states.
- Gray text on a coloured background fails by design; use a darker shade of the background hue or near-white.
- Text over photographs cannot be computed from flat colours: check it in the screenshots at the darkest and lightest regions, or add the scrim.
- Hover and focus raise contrast, never lower it. Disabled content is the only state allowed below the floor, and it is still readable.
- Do not lower opacity on text to make it "soft" unless the resulting ratio has been checked; dims no lower than 40% (dims of 10-15% read as missing text).
- Simulate the common colour-vision deficiencies once per palette; never rely on red versus green alone.

## 11. Palette families to refuse by reflex

Legitimate when a brief asks for them; defaults otherwise, as of Oct 2026:
- Warm yellow-cream ground (around `#F4F1EA`) with a terracotta, clay or signal-red accent, usually under a high-contrast serif. Either half is suspect; together unmistakable.
- Near-black with a single acid-green, vermilion or cyan accent and glowing edges; radial halos or spotlight gradients behind the hero.
- Purple-to-blue or violet-indigo gradients; AI-purple as a brand colour; cyan on dark.
- Broadsheet hairlines, zero radius and dense columns as the whole idea.
- The SaaS card kit: identical rounded cards, one radius everywhere, the same `rgba(0,0,0,.1)` shadow under each, gradient washes.
- Gradient text; coloured glow shadows (zero-offset chromatic halo); repeating-gradient stripes; decorative grid-line backgrounds; `feTurbulence` grain.
- Pure black or pure grey as the neutral without a decision; cream or beige "because it is tasteful".

What to do instead is in the direction cards: a low-chroma stone or bone ground, a deep ink, colour from photographs, or a full flat field used with conviction. Warmth is not beige.
