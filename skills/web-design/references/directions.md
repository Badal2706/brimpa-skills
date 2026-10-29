# Direction catalog

Sixteen visual directions, each a complete starting world: palette proportions, type, grid, surface policy, imagery, motion depth and one signature move. Pick one per project (or compose two, naming which one leads), then derive the actual colours and faces from the client's subject. A card is a set of proportions and habits, not a paint job; two projects on the same card with different subjects should still look like different sites.

Hex values are starting points taken from the source catalogs, not brand colours. Replace them with colours from the subject's own material (its street, product, packaging, landscape) whenever the subject has them.

## Contents

- How to choose (candidate table by industry and mood)
- Composition rule and the "roll" rule
- 1. Quiet Editorial / Minimal
- 2. Soft and Calm (wellness, clinics)
- 3. Swiss Industrial / Brutalist
- 4. Neo-Brutalist Pop
- 5. Dark Cinematic
- 6. Luxury Monochrome
- 7. Warm Organic / Craft
- 8. Corporate Trust (finance, legal, health systems)
- 9. Playful Consumer
- 10. Retro / Terminal
- 11. Glass / Spatial (with warnings)
- 12. 3D / Immersive Showcase
- 13. Magazine / Broadsheet
- 14. Product-led SaaS (restrained)
- 15. System-led: Material 3 / Fluent 2 / Polaris
- 16. Colour-Field Poster (drenched)
- Brief-to-design-system map (when to use Material, Fluent, Carbon, Polaris, Primer, Radix, shadcn, Tailwind, plain CSS)

## How to choose

Read the brief for four things: industry, audience (who, where, what light they sit in), mood words the client actually used, and the page's job (book, buy, sign up, read, hire). Then shortlist two or three candidates from this table and pick the one that can carry something only this client has. Never shortlist one.

| Brief signal | Candidate directions (pick one, not the first) |
|---|---|
| Clinic, dentist, physio, therapist, spa, yoga | 2 Soft and Calm, 1 Quiet Editorial, 7 Warm Organic, 8 Corporate Trust (hospital group) |
| Law firm, CA/accountant, insurance, bank, govt | 8 Corporate Trust, 1 Quiet Editorial, 13 Magazine (thought-leadership), 3 Swiss |
| B2B SaaS, dev tool, productivity app | 14 Product-led SaaS, 3 Swiss, 5 Dark Cinematic (dev/pro tools only), 16 Colour-Field |
| Consumer app, D2C brand, food delivery, kids, pets | 9 Playful Consumer, 4 Neo-Brutalist Pop, 16 Colour-Field, 7 Warm Organic |
| Fashion, jewellery, hotel, real-estate premium | 6 Luxury Monochrome, 1 Quiet Editorial, 12 3D Showcase (one hero object), 13 Magazine |
| Restaurant, cafe, bakery, craft maker, farm | 7 Warm Organic, 16 Colour-Field, 1 Quiet Editorial, 13 Magazine (menu as broadsheet) |
| Photographer, architect, designer, studio portfolio | 1 Quiet Editorial, 3 Swiss, 13 Magazine, 6 Luxury Monochrome |
| Agency, music, streetwear, Gen Z marketing, event | 4 Neo-Brutalist Pop, 16 Colour-Field, 10 Retro, 12 3D Showcase |
| E-commerce storefront (general) | 14 Product-led (restrained), 16 Colour-Field, 9 Playful, 6 Luxury (premium goods) |
| Editorial, newsletter, publication, blog | 13 Magazine, 1 Quiet Editorial, 3 Swiss |
| Gaming, crypto, sci-fi, hacker tools | 10 Retro / Terminal, 5 Dark Cinematic, 12 3D Showcase |
| Android/Google-aligned product, Microsoft 365 add-in, Shopify app | 15 System-led |
| Hardware, car, furniture, a single hero product | 12 3D Showcase, 6 Luxury Monochrome, 5 Dark Cinematic |

Mood words map too: "calm, trustworthy" pulls toward 1, 2, 8; "bold, loud, young" toward 4, 16, 9; "premium, exclusive" toward 6, 1, 12; "technical, precise" toward 3, 14, 10; "warm, handmade" toward 7, 16.

Style names map too. When the client names a style ("make it bento", "something Y2K", "glassmorphism"), translate the word into a direction before shortlisting, then confirm with one reference screenshot, because the word means different things to different people. Common ones: minimalism to 1; Swiss or brutalism to 3; neo-brutalism to 4; luxury typography or neo-classical to 6 (with luxury-web-design); editorial to 1 or 13; scrapbook, bohemian or wabi sabi to 7; ethereal to 2; Y2K, synthwave or cyberpunk to 10 or 16; maximalism or graffiti to 16; bento is a features-block layout inside 14, not a whole page; claymorphism and anthropomorphic styles are an illustration or mascot layer (brand-identity), not the layout. The full table (29 style names) is the repo's `knowledge/web/design-style-vocabulary.md`, reachable through the knowledge-base skill. Decline neumorphism, and glass as the whole system, for forms and for healthcare even when the client names them: both cut contrast below the WCAG floors in §2 of the pre-flight, which hits older patients first; offer the nearest direction (2 or 11 at one fixed element) and keep the named style as one accent. This is the one exception to "the brief wins" below, because it is an accessibility floor, not taste.

## Composition rule and the "roll" rule

- **The brief wins.** If the client pins a look ("make it look like a terminal", "we are cream and terracotta"), build that at full fidelity even where this catalog warns against it. Redirecting a clear brief toward your own taste is failure.
- **Compose at most two.** Say which leads (grid, type, surfaces) and what the second lends (usually only palette proportion or one signature move). Three directions blended is no direction.
- **Roll a different direction for the same industry.** Keep a short ledger per client or workspace (client, industry, direction, date). When a new brief lands in an industry already in the ledger, shortlist from the table and strike the direction used last time. Two clinics built this year should not share a card unless their brands force it. If there is no ledger, write down what you would produce by reflex for this category and treat that as the struck option.
- **The avoidance aesthetic is also a tell.** A page that is merely "not cream, not purple, not cards" with nothing put in their place reads as an empty page with good manners (taste-skill, tells §8). Each card below therefore says what to fill the space with: scale, full content, a real picture, a field of flat colour.
- **The standing exit.** If the user explicitly asks for the category standard played straight, do it at full fidelity and ask which two or three products it should sit beside. Do not recommend it yourself.

---

## 1. Quiet Editorial / Minimal

**Mood:** composed, literate, unhurried, confident by omission.
**Best for:** portfolios, studios, architects, premium services, personal sites, publications that want calm.
**Avoid for:** brands that need energy (sports, kids, nightlife), feature-heavy SaaS that must explain a lot, anyone whose brief says "fun".

**Palette (Restrained):** one ground, one ink, one accent used under 5% of any screen.
- Ground: warm bone `#F7F6F3` or `#FBFBFA`, or pure white `#FFFFFF` (a quarter of strong gallery sites sit on pure white).
- Ink: off-black `#111111` or charcoal `#2F3437`; secondary `#787774`. Never pure `#000` on `#FFF` unless the direction is deliberately stark.
- Accent: one, taken from the subject (a deep green, an oxblood, a cobalt). Not terracotta on cream; that pairing is the most recognisable generated look as of Oct 2026.
- Surfaces: a tone step of 2-6 lightness points from the ground, no borders, no shadows at rest.

**Type:** one family is normal here; two at most, each with a fixed job.
- Pairing A: a text serif with real italics for headings and body (Source Serif 4; Libre Baskerville; EB Garamond) and nothing else.
- Pairing B: a humanist grotesk for everything (Switzer or Archivo for display, same face for text), weights 400 and 500 only.
- Settings: display at regular weight (48% of studied heroes are regular, bold is optional), tracking -0.02 to -0.03em, leading 0.95-1.05; body 17-19px, leading 1.5, measure 60-65ch. Two or three sizes do the visible work, with nothing in between.

**Spacing and grid:** 12 columns, tight outer margins 16-32px, text hung from one off-centre anchor line (a third across, 42%, or the midpoint) and reused for every section. Sections 160-240px apart on desktop, 72-112px on a phone. Left-aligned; centre at most one moment on the page.

**Radius / shadow / border:** square corners on media and buttons (73% of studied sites leave media square); buttons flat, one fill, square or fully round, decided once; no hairlines, no 1px boxes; separate by space and tone.

**Imagery:** one dominant picture per screen rather than six small; same two crop ratios throughout; untouched or all-greyscale; captions one short line in the small size. Hero media covering half the first screen is the norm, or a deliberate typographic statement.

**Motion depth:** low. One masked line reveal on the first section heading below the fold (the hero headline is already readable on the first frame; load sequence settled by 1.2 s), reveals once on two or three sections only, link underline that fills on hover. No hover lift, no parallax.

**Signature move:** the index with preview (rows of work names; the pointed-at row shows its picture in a frame anchored to the row, other rows dimmed to 0.4), or a slow crossfade through three or four photographs at 5-6 s each.

**Pitfalls:** thinness (restraint without substance reads unfinished: set type larger, write the full content, place real pictures); grey body text (running text is full ink); nine nearly-equal font sizes; the centred headline-paragraph-two-buttons stack; "editorial" labels ("Field notes", "On our desks").

---

## 2. Soft and Calm (wellness, clinics)

**Mood:** gentle, reassuring, clean, unhurried, human.
**Best for:** clinics, dentists, physiotherapy, mental-health practices, spas, yoga, maternity, elder care, pharmacies.
**Avoid for:** anything that needs urgency or edge; data-dense tools; brands whose audience is "pro".

**Palette (Restrained, light by default: the scene is a daylit waiting room):**
- Ground: near-white with a hint of the accent hue, e.g. `#ECFEFF` (cyan-tinted), `#F0FDFA` (teal-tinted) or `#FFF5F5` (warm, for a spa). Saturation of the ground under about 15%.
- Ink: a deep version of the same hue rather than grey: `#164E63`, `#134E4A`, or charcoal `#2D3436`.
- Accent: one calm mid-tone from the subject's world: `#0891B2` (clinical cyan), `#0D9488` (teal), `#A8D5BA` (sage), `#E8B4B8` (soft rose for beauty). Health green `#059669` for confirmation only.
- Secondary text tinted from the hue, not grey; gray on a coloured ground fails the craft floor.
- Dark mode: optional, only if the audience uses the site at night (a sleep clinic, an on-call line). Otherwise ship light and skip the toggle.

**Type:**
- Pairing A: Figtree (headings and body) with Noto Sans as the multilingual fallback (uupm "Medical Clean").
- Pairing B: a soft text serif for headings over a humanist sans for body, e.g. Source Serif 4 over Figtree, or Literata over Manrope. Lora/Raleway is the catalog default for wellness; use it only with a reason.
- Settings: headline 48-72px desktop, 36-40px phone, regular or medium weight, tracking -0.01 to -0.02em; body 17-18px, leading 1.55-1.6; measure 55-65ch. Sentence case everywhere; no tiny tracked labels.

**Spacing and grid:** generous but not empty: sections 120-200px apart desktop; one 12-column grid; the booking action and phone number never further than one screen away (a sticky bottom bar on phones is acceptable here because the job is "book").

**Radius / shadow / border:** rounded is allowed and should be decided once: either 12-16px on cards and 999px on buttons, or square everywhere. Depth by tone step, not shadow. Neumorphism and soft double shadows are catalog suggestions for wellness; skip them unless the brief asks (they fail contrast easily).

**Imagery:** real photographs of the actual premises, staff and equipment beat everything; ask for them. If none exist, show the neighbourhood (found and credited) and draw the clinic's own things (the chair, the door, the logo) in one flat language. Never a stock smiling patient that could be mistaken for the clinic's own. Doctor portraits large, square-cropped, same ratio.

**Motion depth:** low to medium. One soft load sequence (headline readable from the first frame, picture settles from 1.08 scale; masked lines only on a section heading below the fold), hover on cards limited to a tone shift, press feedback on the booking button. No pulsing "we are open" dots unless the status is live from real data.

**Signature move:** the live thing is the booking: real open slots, or a "call / WhatsApp / directions" trio that works on a thumb, or an opening-hours block that says whether the clinic is open right now computed from real hours. Secondary: a held picture with passing captions for the treatment journey (consult, plan, treatment, review).

**Pitfalls:** cyan-plus-white that could be any clinic (take one colour from the building, the uniform or the city); icon-topped "Our services" cards in a row of three (use a list with a picture per service, or a two-column table of service and price); invented review counts and star rows; a hero metric ("10,000+ smiles"); forgetting the phone-width composition when most patients arrive from Maps on a phone. Ship the LocalBusiness-subtype JSON-LD (`Dentist`, `Physiotherapy`, `MedicalClinic`) with the build from the facts on the page; see the seo-geo-audit skill for NAP consistency and the full schema rules.

---

## 3. Swiss Industrial / Brutalist

**Mood:** rational, mechanical, engineered, unsentimental, exact.
**Best for:** architecture, engineering firms, manufacturing, design studios, developer tools with a print sensibility, museums, agencies that want authority without softness.
**Avoid for:** conservative customer-facing services where it reads as cold, children, wellness, anything where warmth is the job.

**Palette (Restrained to Committed): choose ONE substrate and keep it.**
- Light print substrate: ground `#F4F4F0` or `#EAE8E3` (unbleached paper), ink `#050505` to `#111111`, one accent only, hazard red `#E61919` or `#FF2A2A`, used for strike-throughs, thick dividing bars and vital highlights.
- Alternative accent from the subject: a single flat blue or yellow when red is wrong for the brand.
- Depth: none. Surfaces are told apart by tone or by a thick (4px+) bar in ink. Hairlines are the tell of broadsheet cosplay; if the brief wants visible compartments, draw them at 2px or more and mean it.

**Type:**
- Pairing A: Archivo Black or Roboto Flex (heavy) for display, Archivo for text. Neue Haas Grotesk or Monument Extended if licensed.
- Pairing B: a single grotesk at two weights (Switzer 700 / 400), capitals only for the structural headers.
- Settings: display fluid, `clamp(4rem, 10vw, 15rem)`, tracking -0.03 to -0.06em (do not crush past where letters keep their shapes), leading 0.85-0.95; body 16-18px at normal tracking. Monospace is not part of this direction unless there is real code or data; "technical" is not a reason.

**Spacing and grid:** a visible 12-column discipline felt through alignment; bimodal density (tight clusters of small text against vast negative space framing one huge numeral or word); things anchored to grid tracks, never floated. Equal outer margins 16-24px.

**Radius / shadow / border:** 0px radius everywhere; no shadows; `display: grid; gap: 2px` with contrasting backgrounds makes razor-thin compartments without border declarations when compartments are the idea.

**Imagery:** photographs greyscale as a set, or 1-bit dithered / halftone for the whole page (one treatment, never mixed); technical drawings, plans, patents and maps from open collections, credited; type alone is legitimate here.

**Motion depth:** low and instant. 0 ms or 140 ms state changes; one scroll-linked pushed line (very large type moved sideways by scroll, reading whole at mid-run); no easing flourishes.

**Signature move:** a viewport-wide display line sized by measurement (script sets size from the container width) that bleeds from one margin; or colour by chapter with hard cuts and a header whose ink follows.

**Pitfalls:** ASCII bracket decoration, crosshairs and crop marks (design-tool chrome as ornament is a listed tell); monospace micro-labels; numbered section markers "01 / 02" that carry no sequence; grey body text; making every corner a compartment so the page becomes a spreadsheet.

---

## 4. Neo-Brutalist Pop

**Mood:** loud, flat, cartoon-mechanical, playful, confident, slightly rude.
**Best for:** Gen Z and youth brands, creative tools, streetwear drops, indie products, event promotion, agencies, Figma/Notion-adjacent apps.
**Avoid for:** luxury, finance, healthcare, legal, government, any audience that reads thick black outlines as unserious.

**Palette (Full palette):** flat fields, no gradients.
- Ground: cream `#FFFDF5` or white; ink `#000000` or rich black `#09090B` (pure black is correct in this direction).
- Fields: 2-3 saturated flats from the subject, e.g. yellow `#FFEB3B` / `#FFD93D`, red `#FF5252` / `#FF6B6B`, blue `#2196F3`; or acid yellow `#DFE104` for the kinetic variant.
- Every field has its own assigned ink that passes 4.5:1 (black on yellow passes; white on yellow does not).

**Type:**
- Pairing A: Lexend Mega or Anton for display (uppercase, huge), Public Sans or Epilogue for text.
- Pairing B: Archivo Black for display with Rubik for text.
- Settings: display `clamp(3rem, 9vw, 9rem)`, weight 800-900, leading 0.9, tracking -0.02em; body 17-18px; buttons in the display face at 16-18px uppercase with 0.02em tracking.

**Spacing and grid:** blocky; sections butt against each other as colour fields with hard edges; margins 16-24px; generous padding inside blocks (24-40px). Elements may sit slightly rotated (-2 to 3 degrees) once per screen, never on text people must read.

**Radius / shadow / border:** 2-3px solid black borders and the hard offset shadow `box-shadow: 4px 4px 0 #000` are legitimate HERE and only here (outside a neo-brutalist world they are a listed tell). 0px radius, or one big radius (24px+) on stickers; never the 12px "soft" default. On press: `transform: translate(4px, 4px)` and shadow to 0, mechanical and instant.

**Imagery:** cut-out product photos set on flat fields (`mix-blend-mode: multiply` on a light field removes a white studio background); bold flat illustration in the palette with one consistent stroke; stickers and badges drawn, not emoji. Real photography framed in a thick black border is fine.

**Motion depth:** medium, mechanical. Instant or 140 ms state changes; one marquee at most (pausable, stops under reduced motion); tiles that snap into place once on scroll with a 0.16 s stagger (the bento-build recipe, which allows `back.out(1.5)` here because overshoot is the direction's voice).

**Signature move:** a sticker-sheet hero (product cut-out, two or three hand-placed labels, one huge word) or the word rotator in a flat pill (2 s per word, four words max).

**Pitfalls:** every element outlined so nothing leads; rotation on body text; gradients sneaking in via "glossy" buttons; using the hard shadow on a page whose world is not neo-brutalist; accessibility of white-on-yellow; the look applied to a hospital because "the client wanted modern".

---

## 5. Dark Cinematic

**Mood:** immersive, precise, premium-technical, nocturnal, focused.
**Best for:** developer tools, pro productivity apps, fintech and trading products, media and streaming, hardware launches, studios whose work is film or 3D.
**Avoid for:** clinics and health (listed "do not use for" in the source catalog), children, warmth-led consumer brands, anything read in bright daylight at a counter.

**Palette (Committed, dark from the scene, not from the category):**
- Ground layers: deep `#020203`, base `#050506`, elevated `#0A0A0C` (three tones, 2-6 lightness points apart; depth comes from the lighter step, never from glows). Tint the deep ground slightly toward the palette's hue; avoid both pure `#000` and a reflexive `#111`.
- Ink: soft light `#EAEAEA` or `#F8FAFC`, never `#FFFFFF` on `#000000` unless the direction is deliberately two-tone.
- Accent: one, from the subject. Warm amber `#F59E0B`, signal green `#22C55E` for live/positive states only, or a brand hue. The catalog default here is indigo `#5E6AD2`; violet and indigo are the first-wave AI palette as of Oct 2026, so use them only when the brand owns them.
- Rule: no coloured glow shadows, no radial halos behind the hero, no cyan-on-dark unless the brand is cyan.

**Type:**
- Pairing A: a grotesk at one step lighter than you would use on light (light text looks heavier): Switzer 400/500 for everything, +0.01em tracking on body.
- Pairing B: Calistoga (display serif) over Inter-class body replaced by Figtree or Manrope; use the serif for two or three words at most.
- Settings: display 64-120px, leading 1.0; body 17-18px, leading 1.6; `color-scheme: dark` on the root so form controls and scrollbars follow.

**Spacing and grid:** one object per screen; large negative space; 12 columns; text docked to corners with the middle given to the picture or product.

**Radius / shadow / border:** 8-12px radius on media and panels, decided once; hairline `rgba(255,255,255,0.08)` borders only on true interface fragments (`data-ui`), not as page decoration; no drop shadows (nothing to cast them on).

**Imagery:** the product itself, large, lit like a studio shot; real interface fragments built in HTML with real data; film stills or footage as a muted loop with a poster frame; images darkened to sit in the ground (`filter: brightness(0.85) contrast(1.05)`).

**Motion depth:** medium to high. One scroll-driven moment (the opening window: a picture grows from a 38-60% window to full-bleed over about one screen; or a receding hero that sinks 8% and dims to 35% as it leaves), a load sequence settled by 1.2 s, press and hover feedback. Blur-in at most 8px and gone once settled, never on body text.

**Signature move:** the opening window on the hero product, or a sheet-over-held-picture chapter structure (a full-bleed photograph holds for one screen; the next chapter slides up over it).

**Pitfalls:** "near-black with one neon accent and glowing edges" (a named calibration cluster); gradient mesh orbs behind glass cards; monospace as a technical costume; secondary text at 40% opacity that fails 4.5:1 (check `--muted` on the dark ground); choosing dark because the product is "tech" rather than because of where it is used.

---

## 6. Luxury Monochrome

**Mood:** exclusive, exact, hushed, couture, timeless.
**Best for:** fashion, jewellery, watches, high-end hotels and real estate, galleries, premium services, luxury e-commerce.
**Avoid for:** friendly consumer apps, anything needing approachability, colourful brands, value-led retail.

**Palette (Restrained to the point of two-tone):**
- Ground and ink: pure white `#FFFFFF` with near-black `#0C0A09`/`#1C1917`, or inverted (12% of strong gallery sites sit on pure black; here it is a decision, not a default). Warm stone `#FAFAF9` as the lighter alternative.
- Accent: at most one metallic-adjacent tone used almost never: `#A16207` (deep gold) or `#D4AF37`, on a single element per page, or no accent at all. Colour arrives through photography.
- Neutral buttons (black or white) are normal: 52% of studied sites use neutral buttons.

**Type:**
- Pairing A: Bodoni Moda (display, high contrast) over Jost (text).
- Pairing B: a single grotesk at light and regular weights (Jost 300/400 or Switzer 300/400) with generous tracking only on short uppercase lines (+0.04 to +0.1em).
- Settings: display can be small and exact (28-40px with wide tracking) or huge and regular; never bold-heavy. Body 16-18px, leading 1.6, measure 55-65ch. Cormorant and Playfair are the catalog defaults for "luxury"; name a different face unless the brand already uses them.

**Spacing and grid:** wide, deliberate margins are allowed here (one of the few directions where 80px+ margins are right on desktop); vast rests; one image per screen; alignment to two anchor lines only.

**Radius / shadow / border:** 0px radius; no shadows; no borders; images touch edges or float with equal large margins as a deliberate mount.

**Imagery:** the product or the place, photographed well, full-bleed or on a vast white mount; one treatment for the whole page; a slow crossfade hero (5-6 s per image); product on a flat field via multiply; never a device mock-up or a frame.

**Motion depth:** low and slow. Crossfades 1,100-1,600 ms, masked line reveals at 900 ms on expo-out, a picture that drifts 4% inside an oversized frame. Nothing bounces.

**Signature move:** the carried picture: the product clicked in the index travels into place as the product page's hero via cross-document view transitions (480 ms, off under reduced motion).

**Pitfalls:** italic serif display as the premium shortcut; gold gradient text; hairline rules everywhere; grey body text at 13px (the best gallery sites get usability wrong this way; do not copy it); so little content that the page does not say what is sold or at what price.

---

## 7. Warm Organic / Craft

**Mood:** handmade, grounded, generous, tactile, honest.
**Best for:** bakeries, cafes, farms, artisans, furniture makers, organic food, sustainable brands, boutique hospitality, family businesses.
**Avoid for:** tech startups, gaming, nightlife, corporate finance, high-energy brands.

**Palette (Committed, warm without beige):** warmth comes from a low-chroma stone, bone or putty ground (saturation under about 15%), a deep ink, photographs, or one full warm field used flat and with conviction. It does not come from yellow-cream with terracotta; that pairing is banned here because it is the generated-page house look as of Oct 2026, and the gallery study found exactly one terracotta primary button in 246 sites.
- Ground: putty `#EAE8E3`, bone `#F7F6F3`, or a real warm field (mustard, tomato red, pink) at full strength.
- Ink: deep brown `#1C1714` / oak `#251E19`, forest green `#228B22` darkened, or oxblood.
- Accent: earth brown `#8B4513`, moss, a single bright taken from the product (the pink of the icing, the orange of the kiln).
- Sand `#D4C4A8` and clay `#B5651D` from the "Nature Distilled" catalog row are usable as fields or inks; do not combine clay with a cream ground.

**Type:**
- Pairing A: Amatic SC or Calistoga for display (sparingly, two or three words), Cabin or Karla for text.
- Pairing B: a sturdy text serif throughout (Literata; Source Serif 4; Crimson Pro) with real italics for dish names and quotes.
- Settings: display 56-96px regular; body 17-19px, leading 1.55; tabular figures on prices and menus.

**Spacing and grid:** sections as full-width colour fields that meet edge to edge; margins 16-32px; the menu, the price list and the hours as real typographic tables with room to breathe.

**Radius / shadow / border:** square media; buttons square or fully round; no shadows; texture only if it is the subject's real material photographed (paper, linen, wood close-ups from open collections), never a `feTurbulence` grain overlay.

**Imagery:** the maker's own photographs first (the oven at five, the hands, the loaves); the street and the market in old postcards and engravings from open collections, credited, used large; the product drawn flat in the palette when no photo exists; a botanical plate or a map as the page's one motif returning at two scales.

**Motion depth:** low. A slow drift or scale on one large photograph, reveals once on a few sections, nothing else.

**Signature move:** the artefact: the page is the menu, the label, the ticket or the invoice of the subject's world (a menu with cut lines, a jar label as the hero); or the real map of the street as the contact section with the door marked.

**Pitfalls:** cream plus serif plus terracotta "for a bakery" (the default wearing the subject's clothes); clip-art wheat; a stock smiling baker who is not this baker; "Our story" sections with no story; thin menus (write the whole menu with prices and list the sample items in the report).

---

## 8. Corporate Trust (finance, legal, health systems)

**Mood:** credible, orderly, plain-spoken, durable, institutional without being dull.
**Best for:** banks, insurers, law firms, accountants, hospital groups, government and public services, B2B services selling credibility and ROI.
**Avoid for:** youth brands, creative studios, anything whose promise is delight.

**Palette (Restrained; high contrast is a feature):**
- Ground: `#F8FAFC` or white; ink: navy `#0F172A` / `#020617`; secondary `#334155`.
- Accent: one trust blue `#0369A1` for the primary action only; green for success states only. Government variants target 7:1 (AAA) on body text.
- No purple/pink gradients (listed anti-pattern for B2B and banking in the source catalog); no gold unless the brand owns it.
- Dark mode: not by default (the scene is an office at a desk); provide it only if the product is used at night.

**Type:**
- Pairing A: Lexend (headings) over Source Sans 3 (body); Atkinson Hyperlegible for both when accessibility is the brief.
- Pairing B: EB Garamond (headings) over Lato (body) for law and heritage; IBM Plex Sans throughout for finance is the catalog default, so use it with a reason.
- Settings: headline 48-64px desktop, 32-36px phone, medium weight; body 17-18px, leading 1.6; measure 60-70ch; tabular figures everywhere numbers align. No tracked uppercase labels; sentence case.

**Spacing and grid:** 12 columns, 24-32px margins, predictable rhythm; a rows-for-long-copy structure (heading in the left third, body in the right two-thirds, same split for every row) carries policy and service pages well.

**Radius / shadow / border:** small radius decided once (4-8px) or square; elevation declared once (border OR a soft offset shadow, never both, the "ghost card"); tables may have lines because they are real tables.

**Imagery:** the institution's own buildings and people (large, square-cropped, one treatment); documents, seals and certificates shown as what they are; charts drawn from real figures with units; never a stock handshake. Where no photographs exist, type and colour alone is more credible than stock.

**Motion depth:** low. 150-250 ms state changes, one reveal pass, rolling figures for three or four real numbers at most (never for a value that changes after load).

**Signature move:** the proof table: the plain comparison or fee schedule set as the page's central object with real numbers; or a timeline of the firm's real history as a held picture with passing captions.

**Pitfalls:** navy-and-blue that could be any bank (take a second neutral from the brand's building or paper stock); stat tiles with invented numbers ("98% satisfaction"); security-badge rows with no verifiable claim; a hero metric; dense legal text at 13px grey. Forms that collect personal data in India need the dpdp-legal-compliance skill's notice and consent pattern.

---

## 9. Playful Consumer

**Mood:** friendly, bright, energetic, approachable, a little silly on purpose.
**Best for:** consumer apps, kids and education, pets, food and snacks, D2C brands, social products, onboarding flows.
**Avoid for:** finance, healthcare, legal, luxury, anyone over-indexed on "professional".

**Palette (Full palette, flat):** three or four named fields plus a dark ink; no gradients.
- Example fields: hot pink `#FF71CE`, yellow `#FFCE5C`, teal `#86CCCA` (Memphis row), or pastel clay `#FDBCB4`, `#ADD8E6`, `#98FF98`, `#E6E6FA` for younger audiences.
- Ink: `#1A1A1A` or a deep hue of one field; each field gets its own ink at 4.5:1 (white on pastel never passes).
- Neighbouring fields differ in lightness, not only hue, or the page vibrates.

**Type:**
- Pairing A: Fredoka (display) over Nunito (text); Baloo 2 over Comic Neue for kids.
- Pairing B: Righteous or Rubik (display) over Nunito Sans (text); Varela Round throughout for the softest voice.
- Settings: display 56-96px bold, leading 1.0; body 17-18px, leading 1.55; buttons large (18px, 48px tall) and fully round.

**Spacing and grid:** big blocks, 48px+ gaps between groups, one idea per screen; fields as chapters.

**Radius / shadow / border:** fully round buttons and large radii (16-24px) decided once; claymorphism's inner-plus-outer soft shadows are allowed as a committed look (never mixed with flat); no hairlines.

**Imagery:** flat illustration in the palette with one stroke weight and three levels of detail (big shapes, describing shapes, a few small marks); a mascot if one exists (see the brand-identity skill for making one); product cut-outs on fields; real photos of real customers only with consent.

**Motion depth:** medium to high, but one moving thing per screen. Spring-like easing is allowed here (`back.out(1.4)`) because it is the voice; keep press feedback 140 ms; tiles may fly in once with 0.16 s stagger; the click-success button (shrink to a 130px circle, spinner tied to the real request, check and confetti on success, shake on error) is at home here.

**Signature move:** a live toy from the subject (pick a flavour and the pack changes colour; type your dog's name and see the tag), built with real content and a thumb-sized phone version.

**Pitfalls:** emoji as icons; gradient blobs; cartoon illustration of nothing in particular; animation on every element so nothing leads; rainbow palettes without assigned inks; playful applied to a serious transaction (payments, medical booking).

---

## 10. Retro / Terminal

**Mood:** nostalgic, nerdy, raw, hardware-literate, in on the joke.
**Best for:** developer tools with a hacker voice, indie games, retro brands, cybersecurity marketing, ARGs, personal sites of engineers, music and zines.
**Avoid for:** consumer products needing approachability, health, finance, anyone over forty who is not the joke's audience, accessibility-critical public services.

**Palette (Committed, one substrate):**
- Terminal: ground `#0A0A0A` or `#121212` (deactivated CRT; avoid pure `#000`), ink white phosphor `#EAEAEA`, terminal green `#4AF626` / `#33FF00` for ONE element only (a status readout, a cursor in a real input), hazard red `#E61919` for alerts. If green does not serve a purpose, omit it.
- Pixel / arcade: a limited NES-like palette, four or five flats, no gradients.
- Vintage analog: faded cream `#F5E6C8`, sepia `#D4A574`, muted teal `#4A7B7C` as flats, photographs with one film treatment.

**Type:**
- Pairing A: JetBrains Mono or IBM Plex Mono throughout (the one direction where monospace running text is the point, and even then keep paragraphs short and 16-18px), with a heavy grotesk (Archivo Black) for one giant header.
- Pairing B: Press Start 2P (display, tiny doses) over VT323 (text) for pixel; Courier Prime for typewriter.
- Settings: mono body at 16-18px with leading 1.5 and tracking 0 to +0.02em; uppercase only for short labels with +0.05 to +0.1em tracking; display `clamp(3rem, 9vw, 9rem)`.

**Spacing and grid:** a strict character grid (sizes in `ch` and `lh`), visible compartments at 1-2px are acceptable here because the world is a terminal; dense data blocks against empty screens.

**Radius / shadow / border:** 0px; no shadows; phosphor glow allowed on one element only (`text-shadow: 0 0 10px`), never page-wide; scanlines via `repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.1) 2px, rgba(0,0,0,0.1) 4px)` on a fixed, pointer-events-none layer, and only when the CRT is the brief.

**Imagery:** real screenshots or an HTML terminal fragment with real commands and real output; 1-bit dithered photographs as a set; pixel art drawn for the subject; patent drawings and manuals from open collections.

**Motion depth:** medium. A typing effect only inside a real input or a short command demonstration (never the headline; real words arrive whole); a blinking cursor only where typing is possible; instant state changes; a scramble or decode effect is a listed tell and stays out.

**Signature move:** a working command line or query box that answers with the subject's real content (type `prices`, get the price list), with a plain fallback.

**Pitfalls:** the matrix-green-on-black cliché with no purpose; mono for a brand that merely sells software; decorative blinking cursors; glitch effects on text people must read; tiny 10-12px mono body; the costume applied to a tool whose users want a normal product (that is the ui-ux skill's territory).

---

## 11. Glass / Spatial (with warnings)

**Mood:** layered, luminous, modern, device-like, airy.
**Best for:** Apple-platform-aligned apps (Liquid Glass is scoped as an Apple platform material), spatial and AR/VR surfaces, overlays and navigation chrome on top of rich imagery, a single hero control over a photograph or video.
**Avoid for:** reading surfaces, data-dense pages, low-contrast backgrounds, performance-limited devices, accessibility-critical products, and any brief where glass would be decoration rather than a specific effect.

**Warnings before choosing it:** backdrop blur over moving content repaints continuously and drops frames on mid-range phones; translucent text surfaces fail contrast as soon as the content behind them changes; glass panels and floating pill navigation are listed second-wave tells as of Oct 2026, warned at two or more instances. Use glass on one or two fixed elements (the nav bar, one overlay), never on cards or sections.

**Palette (Restrained, the material carries it):**
- Surfaces: translucent white `rgba(255,255,255,0.1-0.3)` or dark `rgba(10,10,12,0.5)` with a 1px `rgba(255,255,255,0.2)` edge, on top of a committed photograph, video or a solid field (not a gradient mesh of purple orbs).
- Ink: solid, full contrast, measured against the darkest and lightest regions the panel can sit over; add a solid scrim behind text if either fails.
- Accent: one, solid, from the brand.

**Type:**
- Pairing A: a system-grade grotesk (Switzer; Figtree) at medium weight; spatial UIs want legible, neutral faces.
- Pairing B: the platform's own (SF on Apple surfaces, via `-apple-system`), with one brand display face for the hero word.
- Settings: body 17px minimum on glass; headings regular to medium; no thin weights over translucency.

**Spacing and grid:** generous; panels inset 16-24px from edges; one layer of depth, not a stack (cards in glass in glass is nested cards).

**Radius / shadow / border:** large radius (20-28px) on the one or two glass elements, concentric inner radius if nested (`calc(outer - padding)`); shadows with offset and soft blur only on what truly floats; no coloured glows.

**Imagery:** a strong full-bleed photograph or muted video is the ground that makes glass legible; without it, choose another direction.

**Motion depth:** medium. Panels open from where they were triggered (`transform-origin` at the trigger, scale from 0.97); blur only on fixed elements; reduced motion drops the blur-in.

**Signature move:** the fluid island nav: a detached pill that morphs into a full-screen sheet with links rising in a 100-150 ms stagger; or one glass control floating over a real product video.

**Pitfalls:** glass everywhere; gradient orbs as the "background"; grey text on translucent panels; hamburger menus that hide three links; performance on a Rs 15,000 Android phone (test it).

---

## 12. 3D / Immersive Showcase

**Mood:** spectacular, tactile, product-as-hero, cinematic, spatial.
**Best for:** hardware, cars, furniture, footwear, jewellery, consumer electronics, architectural visualisation, product configurators, launch campaigns with one hero object.
**Avoid for:** low-end mobile audiences, performance-limited contexts, data tables and forms, text-heavy sites, SEO-critical content that must be readable without WebGL.

**Palette (Restrained; the object carries colour):**
- Ground: a neutral studio `#E8E8E8` / white, or a deep tinted ground `#001F3F`-class for drama; the object's real materials supply the rest.
- Ink: full contrast solid; accent one, usually the product's own colour.

**Type:**
- Pairing A: a wide or extended grotesk for the hero word (Syncopate; Archivo Expanded) with a humanist sans for specs (Manrope; Figtree).
- Pairing B: a single grotesk at regular weight, specs in tabular figures.
- Settings: hero word 96-160px or a modest 32px line docked at a corner while the object leads; specs 16-18px.

**Spacing and grid:** one object per screen; text in corners; a held stage of one to four screens per scene, about one screen of scroll per step, with a visible plain count ("2 of 4") on any held sequence longer than two steps.

**Radius / shadow / border:** none on the page; the object's own shadow comes from the render.

**Imagery:** a real 3D model (Three.js, `<model-viewer>`, or an image sequence scrubbed by scroll) with a poster image for the first paint and for devices without WebGL; the configurator must have buttons and keyboard controls, not drag only; keep models compressed and lazy-initialised near the viewport.

**Motion depth:** high, but orchestrated. Scroll-scrubbed camera moves locked to the scrollbar (linear, no smoothing or 0.1-0.14 lerp at most, off for touch and reduced motion); the HTML headline, sentence and action are readable on the first frame while the scene loads behind them; no preloader counter.

**Signature move:** the configurator as the hero: pick a material and see it (real options, real prices); or the opening window from a cropped detail to the whole object.

**Pitfalls:** a wheel-driven scene with no page scroll (scroll hijack costs usability); a 20-screen runway for three claims; the page unreadable until the model loads; a static "3D-looking" render pretending to be interactive; fake specifications.

---

## 13. Magazine / Broadsheet

**Mood:** literate, structured, authoritative, curated, newsy.
**Best for:** publications, newsletters, journalism, long-form blogs, thought-leadership for firms, festival and exhibition programmes, restaurant menus treated as a paper.
**Avoid for:** dashboards, apps, e-commerce catalogs, real-time data, short-form marketing.

**Palette (Restrained):**
- Ground: paper white `#FDFBF7` or `#F5F5F5` (E-Ink row) or pure white; ink `#1A1A1A`; one accent from the masthead (a red, a blue, a green), used for the current section and the action only.
- Colour by section is legitimate (two section grounds is the top-site median), as flat fields with hard cuts.

**Type:**
- Pairing A: Libre Bodoni (display) over Public Sans (text); Libre Caslon Text as the reading serif alternative.
- Pairing B: a condensed grotesk for headlines (Barlow Condensed; Archivo Narrow) over a text serif (Source Serif 4; Literata) for body. Newsreader and Playfair are the catalog defaults; use with a reason.
- Settings: headline 48-96px, leading 1.0; deck (standfirst) 22-26px, max 40ch; body 17-19px, leading 1.55-1.65, measure 60-70ch (a serif can run slightly longer); drop caps and pull quotes as `<p>`/`<blockquote>` at statement size (36px or less desktop), not as headings; `text-wrap: pretty` on body.

**Spacing and grid:** a real multi-column grid (12 columns; articles in 6-8, sidebars in 3-4); asymmetric placement; a masthead that is the page's one large type moment; sections told apart by space and a change of column structure.

**Radius / shadow / border:** square; thick ink bars (4px+) where the broadsheet uses rules, not hairlines everywhere (hairline broadsheet cosplay is a named calibration cluster as of Oct 2026); tables may have lines.

**Imagery:** editorial photography with captions and credits in the small size; illustration commissioned or drawn in one language; archival pictures from open collections with their archive captions; one or two crop ratios.

**Motion depth:** low. Reveals once on article openers; a scroll-linked progress indicator that is meaningful (reading position); nothing else.

**Signature move:** the masthead that scales with the scroll (a giant wordmark shrinking a few percent as the hero leaves) and a sticky section index whose current item follows the reader.

**Pitfalls:** hairline grids and zero radius as the whole idea; italic serif display as premium shorthand; tracked mono date lines and middle-dot meta strings ("A · B · C"); "Field notes" labels; justified text without hyphenation in narrow columns (rivers); body under 16px.

---

## 14. Product-led SaaS (restrained)

**Mood:** clear, competent, specific, quietly confident; the product does the talking.
**Best for:** B2B and B2C SaaS, developer tools with a mainstream audience, productivity apps, marketplaces, any software whose best proof is a working screen.
**Avoid for:** products with nothing to show yet (choose 16 or 13 and lead with the argument), and for teams who want "wow" (choose 5 or 16).

**Palette (Restrained; one accent for the action):**
- Ground: white or `#F8FAFC`; ink `#1E293B` / `#0F172A`; a second neutral (slightly cooler or warmer) for the product shell inside fragments.
- Accent: one, from the brand, e.g. trust blue `#2563EB` with a contrasting action orange `#EA580C`, or teal `#0D9488`. Avoid the indigo/violet default and purple-to-blue gradients.
- Dark mode: provide it when the product itself ships dark (developers), designed explicitly with its own surface steps, never inverted.

**Type:**
- Pairing A: a humanist grotesk throughout (Figtree; Manrope; Switzer), weights 400/600.
- Pairing B: Lexend (headings) over Source Sans 3 (body) for a plainer voice. The catalog defaults (Inter, Plus Jakarta Sans, DM Sans, Space Grotesk) are the most overused faces on the web as of Oct 2026; name one only with a reason.
- Settings: headline 48-72px, medium weight, -0.02em; body 17-18px, leading 1.6; code in a real mono only inside `<pre>/<code>`.

**Spacing and grid:** 12 columns, 24-32px margins, sections 120-200px apart; no two neighbouring sections share a layout (split, then full-bleed interface, then list, then table, then statement).

**Radius / shadow / border:** 8-12px decided once; elevation declared once (border OR shadow); real interface fragments keep their own 1px control borders and small radii inside a `data-ui` root; the page around them stays flat.

**Imagery:** the product's real interface, rebuilt in HTML at true size with believable data that adds up and one state worth seeing (an alert, a filter, a result), cropped to the part that makes the point; real screenshots shown large and uncropped at least once; no laptop or phone frames; no grey-bar fake dashboards.

**Motion depth:** medium. One cursor tour (a single task, cursor moves at 0.6-0.9 s per move, loop with a 1.5 s pause) or one bento build; a price roll on the billing toggle (1 s, 0.06 s stagger between digit columns, savings computed from real maths); reveals once; feedback on every control.

**Signature move:** the product demonstrates itself: a tiny working version of the feature in the hero (a real search box over real data, a calculator that returns the real figure, a live preview), with a plain fallback.

**Pitfalls:** the split hero (copy left, screenshot right, badge row) and the centred headline over a row of cards; three icon-topped feature cards; logo walls and quotes you do not have; hero eyebrow chips ("New: v2.0"); the comparison table that compares things that are not true; "Get started" and "Learn more" as the only button labels.

---

## 15. System-led: Material 3 / Fluent 2 / Polaris

**Mood:** familiar, platform-native, dependable, accessible by construction.
**Best for:** products whose users live inside a platform: Android and Pixel-aligned apps and their marketing (Material 3), Microsoft 365 add-ins, Windows apps and enterprise line-of-business tools (Fluent 2), Shopify merchant apps and checkout extensions (Polaris), Adobe-adjacent creative tools (Spectrum). Also for marketing pages that must visibly belong to the product they sell.
**Avoid for:** brands that should not inherit a platform's conventions; brutalist, terminal or monochrome luxury worlds; generic marketing sites outside those ecosystems (the Polaris row says so explicitly).

**Palette:** the system's roles, themed with the brand.
- Material 3: `primary`, `on-primary`, `surface`, `surface-variant`, `secondary-container`, `outline`, `error`; the baseline primary `#6750A4` with `#E8DEF8` container and `#7D5260` tertiary is Google's default, so re-seed it from the brand colour and let Dynamic Color (Material You) generate the tonal palette with a static fallback. Tonal elevation, not drop shadows.
- Fluent 2: the Fluent neutral ramp with brand and status tokens; calm, rounded, tokenised.
- Polaris: Shopify admin semantic tokens with merchant brand accents only where Polaris allows.
- Dark theme is first-class in all three; design it through the system's tokens, never by inverting.

**Type:** the system's type scale roles (Material: Display/Headline/Title/Body/Label in large/medium/small, Roboto or a brand face themed in, `sp` units in-app; Fluent: Segoe-class system face; Polaris: its own scale). On a marketing page you may add one brand display face for the hero word and keep everything else on the system scale.

**Spacing and grid:** the system's spacing scale (4dp/4px base) and layout grid; components at their documented sizes (48dp touch targets on Android, 44pt on iOS, 24 CSS px minimum on web).

**Radius / shadow / border:** whatever the system specifies (Material 3 shape scale; Fluent corner radii; Polaris borders). Do not restyle controls; brand lives in colour roles, type, density and one signature move.

**Imagery:** real product screens in the system's components; device frames only when the product is a phone app and the frame is a plain rounded rectangle; illustration in the platform's style if the brand has one.

**Motion depth:** the system's: Material container transform, shared-axis and fade-through; Fluent's calm 150-300 ms transitions; honour "Remove animations" and Reduce Motion.

**Signature move:** one, expressed inside the system: the hero as a working component (a Material date picker that shows real availability; a Polaris index table with real merchant data). A world that shows up only as a colour scheme has not found its move yet.

**Pitfalls:** mixing Cupertino and Material controls; a Material app wearing iOS bottom tabs or vice versa; custom-styled checkboxes inside a system that has them; using the baseline purple as if it were a brand; building app screens here at all (usability, states and navigation of the app itself belong to the ui-ux skill; this card is for the marketing surface and the visual world).

---

## 16. Colour-Field Poster (drenched)

**Mood:** bold, flat, graphic, chaptered, unmistakable.
**Best for:** festivals and events, agencies, D2C launches, food and drink, cultural institutions, a one-pager whose argument is three or four strong claims, any brief that says "stand out" without saying "luxury".
**Avoid for:** dense reading, data tools, conservative institutions, products whose proof is a complex interface.

**Palette (Drenched: the surface IS the colour):** each section is one field at full strength with its own assigned ink; fields meet edge to edge with hard cuts; nothing fades.
- Example sets: Bauhaus primaries `#D02020`, `#1040C0`, `#F0C020` with black and bone; or a subject-derived set (the three colours of the product line; the city's tram, river and brick). Open strong, rest on a light field, surprise, close dark or very light.
- Proportion inside each section: field, its ink, nothing else; the one accent (if any) is a second field, not a button colour.
- The nav and `theme-color` follow the first field; a fixed header's ink follows the chapter beneath it in 300 ms.

**Type:**
- Pairing A: Outfit as a single geometric family at one weight (uppercase display, sentence-case text) for the Bauhaus voice; Anton over Epilogue for louder.
- Pairing B: a wide grotesk (Syncopate) for two-word headlines over Public Sans text.
- Settings: display 8-12vw (the top gallery sites' largest type runs a median 8.4vw), leading 0.9, tracking -0.02 to -0.04em; body 17-19px in the field's ink at full strength.

**Spacing and grid:** sections are screens (each a poster: one dominant thing and the content it carries); margins 16-24px; text docked to corners or hung from one anchor line; the phone keeps one dominant thing per screen.

**Radius / shadow / border:** square everything; no shadows; depth is impossible and unnecessary; buttons are a flat block in the field's ink or inverted.

**Imagery:** cut-out products via multiply on the field; photographs sampled for a field colour so a section sits with its picture; type alone is a valid chapter; found engravings multiplied onto a field as the page's motif.

**Motion depth:** medium. Colour by chapter as hard cuts (never recoloured by an observer), masked line reveals per chapter, one pushed line, one rolling figure block if the case is numbers.

**Signature move:** the chapter structure itself, plus one live thing in the subject's field colours (pick the flavour, the field changes to it).

**Pitfalls:** fields that differ only in hue (vibrates); muted grey text on a coloured field (use the field's ink at full strength or 70% if it still passes); gradients between chapters; three stats in every field; forgetting that the first screen must still say what this is and offer the action.

---

## Brief-to-design-system map

Use this when the brief names a platform, a stack, or an existing component library. "Design system" here means the component and token system the build will use; the visual direction above still decides how it looks. As of Oct 2026.

| Signal in the brief | Use | Why |
|---|---|---|
| Android app, Pixel/Wear OS, Google-ecosystem product, Jetpack Compose | Material 3 (Material You with static fallback) | Users expect Material controls, navigation and dark theme; brand enters through colour roles, type and shape |
| Microsoft 365 add-in, Windows desktop app, enterprise line-of-business tool, Copilot extension | Fluent 2 | Inherits Microsoft platform conventions; calm, tokenised, cross-platform |
| IBM-adjacent enterprise data product, heavy tables and dashboards with a corporate mandate | Carbon | Built for dense enterprise data UI and documentation; strong grid and type scale |
| Shopify merchant app, checkout or customer-account extension, POS | Polaris | Required for the Shopify admin surface; not for a storefront's marketing page |
| GitHub-style developer tool, open-source project site, internal dev platform | Primer | Developer-familiar density, accessible defaults, dark mode first-class |
| Custom visual world but accessible interactive primitives needed (menus, dialogs, comboboxes) | Radix primitives (headless), styled with your tokens | You keep the direction's look and get keyboard and ARIA behaviour for free |
| React or Next.js product, small team, needs a credible UI fast and will customise | shadcn/ui (Radix + Tailwind, components copied into the repo) | Fully themeable via CSS variables; start by replacing its default radius, font and palette with the direction's tokens, or it looks like every shadcn site |
| Any stack, utility styling wanted, marketing and app in one codebase | Tailwind CSS with tokens defined in `@theme` / CSS variables | Fast and consistent; define the direction's colours, type and radius once and never use raw palette classes in components |
| A marketing site or portfolio with its own world and few interactive components | Plain CSS (custom properties, grid, `clamp()`, scroll timelines, view transitions) | No framework look to fight; fastest pages; everything the directions above need is native CSS |
| Existing brand or design system already in the repo | Keep it; take only composition from the direction | Map the brand's colours and faces onto the roles; if the brand owns a "banned" device (gradient logo, violet accent) keep it and say so |

Rules that apply to every row:
- The system supplies controls, states and navigation; the direction supplies type voice, palette proportion, density and one signature move. Never restyle a system's controls into a costume.
- A product's app screens (dashboards, settings, forms, admin) follow the ui-ux skill, whatever system is chosen; this skill designs the public pages and the visual world the app inherits.
- Check the dependency file before adding a system to an existing project; no framework or styling migration as part of a redesign.
