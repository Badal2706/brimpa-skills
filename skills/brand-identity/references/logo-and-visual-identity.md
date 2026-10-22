# Logo and visual identity

What to decide about the mark, how to brief it, how to use it, and how the rest of the visual
system (icons, imagery, shape language) stays consistent with it.

Contents

1. Logo types and when each fits
2. Aesthetic styles (vocabulary for the brief)
3. Colour psychology table (know the neighbours; do not copy them)
4. Scalability and quality tests
5. Logo direction brief template
6. Getting artwork made (designer or image model)
7. Logo usage rules: variants, clear space, minimum size, backgrounds
8. Misuse list
9. Co-branding
10. File formats, exports and platform sizes
11. Icon system
12. Imagery and illustration direction
13. Shape language and the "brand kit board"

---

## 1. Logo types and when each fits

| Type | What it is | Fits when | Watch out |
|---|---|---|---|
| Wordmark | the name set in distinctive type | short, pronounceable, distinctive name | needs real typographic craft; a system font is not a wordmark |
| Lettermark / monogram | initials | long names, professional firms, two to four letters | needs the full name nearby until known |
| Pictorial mark | a recognisable object | brand already known, or a name with a literal object | alone it needs recognition first |
| Abstract mark | non-representational shape | tech and products whose idea has no object | easy to make generic; must be ownable |
| Combination mark | icon + wordmark that can separate | most new small brands: header, favicon, invoice and avatar all covered | keep the lockup rules strict |
| Emblem / badge | symbol inside a shape | heritage, craft, food, clubs, institutions | detail disappears small; needs a simplified icon |
| Mascot | a character | family, food, education, community, kids, playful indie tools | not for finance, legal, clinical trust surfaces |

For a brand that will live mostly in a browser tab, an app icon and an invoice header, default to a
combination mark whose icon stands alone at 16 px and whose wordmark can be set in the display face.

## 2. Aesthetic styles (vocabulary for the brief)

Minimalist (essential geometry, one or two colours); geometric (circles, squares, exact symmetry);
organic (flowing, hand-drawn, earth tones); vintage/badge (heritage, slab or script, muted);
luxury (thin serif or refined sans, black/white plus one metal); monoline (single stroke weight);
negative space (a second read hidden in the counters); line art; flat; duotone; emblem.

Pick one primary style and at most one modifier; a brief that lists five styles produces mush.
Avoid gradient-3D-glossy icons as the master; they fail mono, print and small sizes. If the owner
wants one, make it a hero variant derived from a flat master.

## 3. Colour psychology table

Use this to understand what the category's neighbours chose, then decide whether to step away. It
is not a selection rule; see `color-and-type.md` section 2 for how to choose the accent.

| Hue | Commonly read as | Categories that overuse it | Notes |
|---|---|---|---|
| Blue | trust, stability, calm | finance, healthcare, tech, corporate | the most crowded hue on the web |
| Green | growth, health, nature | eco, wellness, finance | mint greens are now a tech default too |
| Red | energy, urgency, appetite | food, sports, sales | avoid as a healthcare accent (blood connotation) |
| Orange | friendly, energetic | food, retail, creator tools | reads warm; needs dark text at light values |
| Yellow / gold | optimism, warmth, luxury (gold) | kids, food, luxury | hard to make accessible as text |
| Purple | creative, premium | beauty, AI products | purple gradients are the strongest AI tell |
| Teal | calm plus fresh | clinics, SaaS | crowded in healthcare; works when muted and tinted |
| Black / near-black | sophistication, authority | luxury, fashion, developer tools | tint it; reflexive `#111` is a template |
| Warm neutrals (cream, sand) | handmade, calm | books, cafes, wellness | cream + serif + terracotta is an AI cluster |

Harmony vocabulary for the brief: monochromatic (one hue, tints and shades), complementary
(opposites, high contrast), analogous (neighbours, calm), triadic (three evenly spaced, lively).
About 8% of men have some colour-vision deficiency, so never let red/green alone carry meaning.

## 4. Scalability and quality tests

A logo is not approved until it passes all of these:

- Recognisable at 16x16 px (browser tab) and clean at 32x32.
- Legible at business-card size (full logo about 35 mm wide).
- Works in a single colour and in pure black/white (no reliance on gradient or shading).
- No detail that disappears when scaled; stroke weights survive at the minimum size.
- Sits on canvas, on dark, and on the accent without a special version (or has the reversed
  version ready).
- Still reads in greyscale and in a colour-vision-deficiency simulation.
- Does not resemble a known brand's mark, name or trade dress; search before approving.
- Vector master exists (SVG with outlined text, no embedded raster).

## 5. Logo direction brief template

```markdown
## Logo brief: {Brand}

Name as it must appear: {exact casing}; abbreviation allowed: {yes: XY / no}
Mark type: {combination mark: icon + wordmark that separate}
Primary style: {minimalist geometric}; modifier: {monoline}
Must express: {two or three traits from the brand personality}
Must avoid: {traits}, {neighbours' territory: e.g. "the blue cross and the tooth silhouette every dental clinic uses"}
Source of the idea: {a concrete object, place or ritual from the audience's world; not a metaphor table}
Colour: icon in accent {oklch / hex} on canvas {hex}; must also work in mono dark and mono light
Wordmark face: {display face from BRAND.md, or "custom letterforms based on {face}"}
Lockups needed: horizontal, stacked, icon only, wordmark only
Contexts it must survive: browser tab 16 px, app icon 512 px, invoice header, SMS/WhatsApp avatar, {signage / print}
Tests before approval: section 4 list
Deliverables: SVG masters per variant and colour version; PNG exports; one-page usage sheet
Reference images: {two or three, with what to take from each; never a competitor's logo}
```

## 6. Getting artwork made (designer or image model)

With a designer: send the brief, the BRAND.md palette and faces, and the test list. Ask for two
or three directions as flat mono sketches first; colour and lockups come after a direction is
picked. Never approve from a mockup on a photo; approve from the mono master at 16 px and 512 px.

With an image model (optional, for exploration rather than final art):

- Ask for flat, vector-style, single-colour marks on a plain white background, no text (models
  render text unreliably; set the wordmark in real type yourself), no gradients, no 3D, no
  photo-realism, no mockups.
- Generate several, pick a direction, then have it redrawn as real vectors (by hand, by a
  designer, or by tracing and cleaning in a vector tool). A raster from a model is a sketch, not a
  logo.
- Check the result against section 4 and against existing marks; models reproduce famous logos
  readily, which is a trademark problem, not a design win.
- Keep the record of the prompt and the model in `assets/brand/README.md`; some registries and
  clients ask about provenance.

## 7. Logo usage rules

Variants and colour versions

| Variant | Use |
|---|---|
| Full horizontal | website header, documents, email signature |
| Stacked | square spaces, social avatars with the name, merch |
| Icon only | favicon, app icon, small UI, watermark |
| Wordmark only | when the icon is already present nearby |

Each variant ships in full colour (default on canvas), reversed (on accent or dark), mono dark and
mono light (when colour is unavailable: fax, engraving, single-colour print).

Clear space: the height of the mark (icon) on all four sides; for a pure wordmark, the cap
height of the first letter. Nothing else enters that zone.

Minimum size

| Context | Full logo | Icon |
|---|---|---|
| Digital | 120 px wide | 24 px (16 px favicon derives from it) |
| Print | 35 mm wide | 10 mm |

Placement sizes: header 120-200 px wide; footer 100-150 px; favicon 32x32 (plus 16x16 in the
`.ico`); Apple touch icon 180x180; web app manifest icons 192 and 512; social avatar master
512x512 PNG and let each platform downscale.

Approved backgrounds: canvas and surface tokens (colour or mono dark); accent and dark surfaces
(reversed or mono light); photography only behind a solid or blurred plate that restores 3:1
between mark and background.

## 8. Misuse list

Write this into BRAND.md as is; it is the section people actually read.

- Do not stretch, compress or rotate.
- Do not recolour outside the approved versions; do not apply gradients, transparency, shadows,
  strokes, outlines or glows.
- Do not crop, rearrange, re-space or add elements to the lockup.
- Do not place on busy photography or low-contrast colour without a plate.
- Do not recreate the wordmark in a system font or "fix" the kerning.
- Do not use an old version; delete superseded files from shared folders.
- Do not animate the mark except with an approved motion file (see launch-video).

## 9. Co-branding

Equal visual weight (match x-height or mark height, not bounding boxes); a vertical divider or
generous gap between logos; each in its own approved colours; clear space applies to both; the
host brand sits first (left or top). Partner logos never get recoloured into the host palette.

## 10. File formats, exports and platform sizes

| Use | Format |
|---|---|
| Web master | SVG (text outlined, viewBox set, no embedded raster, optimised) |
| Web fallback, email, chat avatars | PNG with transparency, @1x and @2x |
| Print | PDF (vector); EPS only if a printer insists |
| Documents and slides | PNG at 300 dpi for the size used, or SVG where supported |
| Favicon | `favicon.ico` (16 + 32), `favicon.svg`, `apple-touch-icon.png` 180, manifest icons 192/512 |
| Social | avatar 512 PNG; Open Graph default image 1200x630 with logo and tagline |

Folder and naming: see `brand-md-template.md` section 5.

## 11. Icon system

Icons are part of the identity because they appear on every screen.

- One style only: outlined (2 px stroke, round caps and joins), filled, or duotone; do not mix
  styles in one product. Thin 1-1.5 px outlines suit editorial and luxury; bold 3 px suits
  headers and kids' products.
- 24 px grid (`viewBox="0 0 24 24"`), 2 px optical padding, consistent corner radius; test at 16
  and 48 px.
- `fill="currentColor"` / `stroke="currentColor"` so icons inherit text colour and theme; no
  hard-coded hex inside the SVG.
- Each SVG gets a `<title>` or is marked `aria-hidden="true"` when decorative.
- Prefer one open icon set that matches the style (there are several good OFL/MIT sets) and add
  custom icons only in the same grammar; a custom icon that breaks the grid is worse than none.

## 12. Imagery and illustration direction

Write three or four lines in BRAND.md and stick to them; imagery drift is the fastest way a brand
stops looking like one company.

- Photography: light (natural, soft / hard, studio), subjects (real staff and premises for local
  businesses; never stock smiles), framing (close, honest, uncluttered), treatment (keep colour
  true; one consistent grade; no heavy filters), what to avoid (handshakes, stock laptops, generic
  cityscapes).
- Illustration: either a committed style (flat, monoline, cut-paper, hand-drawn) in the palette
  only, or none. Shape-assembled SVG "people", doodle outlines and grainy blobs are generated
  defaults; author real assets or use photography.
- Diagrams and data: palette's data roles, labels on the data, colour never the only code.
- Prove, do not decorate: a picture of the product doing its job beats an abstract blob behind a
  headline.
- Real beats perfect: slightly imperfect photos of the actual business, its people, premises and
  product are the strongest trust signal a site has, and they beat sterile stock and generated
  images every time. Stock and AI imagery say the brand is interchangeable, and a brand that looks
  like a commodity gets priced like one. Show a distinct human point of view (who took it, where
  they stood, what they noticed) rather than a generic polish. Write "real photos only; no stock
  people, no generated people" into BRAND.md when the brief allows a photo shoot at all.

## 13. Shape language and the "brand kit board"

Shape language: radius scale (one small, one medium, one large; pills for tags only), border
weight and tint, one shadow recipe (soft, offset, never a colour glow), spacing base (4 px), and
whether corners are square, rounded or mixed by hierarchy. Write it once; `web-design` and `ui-ux`
inherit it.

Brand kit board: before shipping, assemble one page or image that shows the system together so
drift is visible at a glance: logo lockups in all colour versions, the palette with role names and
contrast numbers, a type specimen (display, heading, body, label at real sizes), the icon style,
a button and an input, two imagery samples, and the misuse row. If anything on that board looks
borrowed from a different brand, fix it before writing more pages.
