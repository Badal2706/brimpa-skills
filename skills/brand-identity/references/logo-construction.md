# Logo construction: from brief to tested SVG

Use this when the brand needs an actual mark drawn, not only a brief for a designer. It runs: fast brief, word map, concept funnel, three marks built in SVG, test battery, greyscale checkpoint (stop), then the kit. Method adapted and rewritten from kaankiziltug/logo-design-skill (MIT), pinned under `upstream/logo-design-skill`; its Python tools (`svg_audit.py`, `preview_sheet.py`, `export_variants.py`, `render_png.py`, `concept_sheet.py`, `presentation_board.py`; stdlib only, PNG needs one renderer such as Edge/Chrome headless, rsvg-convert or cairosvg) run from the pinned copy. Its 1,400-logo library is tech-heavy (one health logo, no local trades) and the SVGs are third-party trademarks: **never feed library files into the drawing context, never copy them into a client board, never vendor `svg/` into this repo.**

## Contents
1. Fast brief and warning signs
2. Word map
3. Concept funnel
4. Mark-type decision, in order
5. SVG construction rules
6. Optical corrections (starting values)
7. Small-size floors
8. Test battery (pass/fail)
9. Lockups, visibility devices, type study
10. Checkpoint, kit and delivery set
11. Critique mode and redesign equity audit
12. India-specific checks

## 1. Fast brief and warning signs
Ask at most five questions, or state assumptions and proceed: what the business does in plain nouns; who must recognise the mark (patients, contractors, resellers); where it must work (6 m flex hoarding, letterhead, WhatsApp avatar, favicon, embroidery, sandblasting, single-colour print); which marks the owner admires and why; **who signs off**. Treat "total creative freedom", "show everything we do", "make it pop" and "no decision-maker" as warnings to resolve before drawing.

## 2. Word map
From the name, the offering, the brand adjectives and the promise, branch into drawable nouns, materials, processes, places and opposites. Circle the points where two branches cross (a stone yard: "cut" x "layers" -> a stepped slab edge; a clinic: "care" x "the town's river" -> a bend that reads as a hand). Turn 6-10 crossings into one-sentence concepts. If the name gives nothing, use abstract keywords that translate to form (steady, precise, warm).

## 3. Concept funnel
Write 8-12 one-sentence concepts across at least two mark types. Score each 1-5 on idea, distinction, simplicity, relevance and 16-px strength. Build only the three strongest **and most different**. A sentence that could describe a competitor's mark is not a concept; a concept that is just the product drawn (a tooth, a slab) must be pushed one step further or dropped.

## 4. Mark-type decision, in order (first strong yes wins)
1. Is the name short and distinctive enough to carry alone? -> wordmark.
2. Is one initial distinctive and ownable? -> letterform mark (one initial as the symbol).
3. Is there a concrete object or idea everyone will read at 16 px? -> pictorial mark.
4. Is there a negative-space idea that adds a second reading? -> negative-space mark.
5. Does the brand need a face (children, consumer app)? -> mascot mark, with a simplified head version tested at 24 px (Brimpa: the 3D mascot needs a flat one-colour head mark for favicon and avatar use).
6. Otherwise -> abstract mark, always paired with a wordmark.
Design the symbol and the horizontal lockup as a pair; a symbol that only works alone is unfinished. The seven-type table with fit notes is in `logo-and-visual-identity.md` §1.

## 5. SVG construction rules
- Describe the construction in words first: primitives, radii, angles, grid unit.
- Canvas `viewBox="0 0 256 256"`; lockups keep height 256. Snap to an 8- or 16-unit grid.
- Exact angles only (0/15/30/45/60/90); arcs for circular geometry; few anchors.
- Real holes with `fill-rule="evenodd"`; no `<text>` (convert to paths), no raster, no filters, no `foreignObject` in a master file.
- Black on white first; colour is the last decision. Save v1/v2/v3 files instead of overwriting.

## 6. Optical corrections (starting values; practitioners' rules, not measured)
- Overshoot: curves 1-3%, points 3-6% past the flat edges.
- Bone effect: use continuous-curvature corners (control handles about 0.55-0.65 of the corner size) instead of a plain `rx`.
- Irradiation: thin the reversed (light-on-dark) file by 2-5% of the stroke.
- Thin horizontal strokes by 5-10%; place the mark slightly above geometric centre of its container.

## 7. Small-size floors
Smallest gap at least 1/32 of the mark's width; no detail under 1/48 of the canvas; monoline stroke at least 8% of width. When the full mark turns to mush at 16 px, ship a separate simplified favicon drawing rather than shrinking the master.

## 8. Test battery (every concept, pass/fail, documented)
16 px pixel test; one colour; reversed; greyscale and colour-blind simulation (already in §4 of `logo-and-visual-identity.md`), plus:
- **Squint** (2 px blur) and **mirror**: does the silhouette survive?
- **Rotate 90 and 180**: any unintended reading (offensive, political, religious, hazard sign)?
- **Letter test**: every modified letter still reads as itself.
- **Junction check**: no notches, slivers or ink traps where strokes meet.
- **Shelf test** beside the real local competitors (hand-collected, not the tech library).
- **Minimum size**: shrink until identity is lost; record the size.
- **Circle crop** (WhatsApp/Instagram avatar); **embroidery** gaps of at least 1 mm at the sewn size.
Run `svg_audit.py` from the pinned upstream for live text, raster, filters, near-miss angles and sub-1/48 shapes; treat its score as a linter, not a verdict (its complexity percentiles come from tech icons and flag Indic wordmarks unfairly).

## 9. Lockups, visibility devices, type study
- Symbol height between cap height and about 1.5-2.5x cap height, judged by eye; the symbol-to-wordmark gap derives from a mark element (a stem width, the x-height). Align optically. Drop the tagline below about 120 px wide.
- Symbol and type share radius, stroke and angle logic; a detailed symbol takes plain type.
- Visibility devices for photos and busy grounds: an outline version and a container version shaped like the mark, beside the contrast plate in §7 of `logo-and-visual-identity.md`.
- Type study: set the name in 20-40 faces in lower, upper and title case; judge letter pairs, not single letters; customise in four levels (re-space, adjust terminals, redraw letters, draw from scratch); space optically; **confirm the font licence allows logo and trademark use**. Bilingual wordmarks: design the Devanagari/Gujarati line with the Latin one, not after; match weight and x-height visually, not numerically.

## 10. Checkpoint, kit and delivery set
**Checkpoint (always):** one greyscale sheet with the three concepts at true 64/32/16 px, one line of idea and one honest risk per concept, a recommendation. Then stop. Build the kit only after the owner picks and says yes.
**Kit:** colour versions (palette from `color-and-type.md`), horizontal/stacked/symbol-only lockups, misuse sheet, mockup board in the client's real contexts (signboard, prescription pad, slab tag, WhatsApp avatar, letterhead), one-page guidelines.
**Delivery set** (add to §10 of `logo-and-visual-identity.md`): `maskable-512.png` with the mark inside the 80% safe zone; app-icon tile with the mark at about 62% of the tile and a -2% optical lift; `site.webmanifest` plus the `<head>` snippet; favicon 48 px and 16/32 ICO; app icon 1024 px; folders `print/ digital/ social/ source/`; colours as HEX/RGB plus whole-number CMYK and an approximate Pantone for flex printers and letterheads (OKLCH alone is useless to an Indian print shop).

## 11. Critique mode and redesign equity audit
**Critique:** score 1-5 on idea, distinction, simplicity, relevance, 16-px strength, construction, optical balance, lockup, reproduction (one colour, reversed), ownability; one fatal flaw outweighs the total. Use a symptom -> cause -> fix table ("mush at 16 px" -> detail under 1/48 -> simplify or make a favicon drawing; "looks heavier reversed" -> irradiation -> thin the reversed file 2-5%; "corners look pinched" -> bone effect -> continuous-curvature corners). Output the top three fixes with exact units.
**Redesign:** rank what the public recognises (colour, shape, letter, mascot); say what must survive; choose evolution or revolution explicitly; show before/after at the same sizes.

## 12. India-specific checks
- Clearance is not a look-alike check against tech logos: run IP India's public trademark search in the right class (44 medical, 35 retail, 19/37 for stone and construction, 42 software) and a reverse image search.
- The red cross emblem is legally restricted (Geneva Conventions Act 1960); clinics use a different device.
- Colour meanings in the upstream are Western; check saffron, green and white combinations for unintended political or religious readings, and check the mark in both scripts the signboard will carry.
- Print reality: flex hoardings, screen-printed bags, embroidered uniforms, sandblasted stone. The one-colour and 1 mm embroidery tests are not optional for local businesses.

## Parity test (when the owner wants to compare)
Brief both the pinned upstream skill and this one on the same task (for example a Selection Granite & Marble mark that must work on a 6 m hoarding, a favicon, a WhatsApp avatar, sandblasted stone and a one-colour letterhead, with an optional Gujarati line). Judge: brief handling, three genuinely different mark types, `svg_audit` with no FAIL, the 16 px / one-colour / reversed / squint / mirror sheet, visible optical corrections, the checkpoint obeyed, Indic handling, delivery set with maskable icon and CMYK, a trademark note.
