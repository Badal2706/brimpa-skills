---
name: brand-identity
description: Create or document a brand kit, brand guidelines, style guide or visual identity for a product, client or side project, and export it as design tokens (BRAND.md or DESIGN.md plus tokens.css and tokens.json) that web-design and ui-ux consume. Covers logo direction brief, colour palette with roles and contrast checks, type system, brand voice and tone summary, asset organisation, a consistency checklist, and an optional animated website mascot. Use whenever the user asks for a brand, logo direction, colour palette, "which fonts should we use", design tokens, brand voice or tone of voice, a mascot or character for a site, or starts a new product or client website with no agreed look yet, even if they never say "brand". Also use when a redesign needs the existing brand captured first, or when two surfaces of one product look inconsistent. Positioning and naming go to launch-marketing; page layout and visual page design go to web-design; usability of app screens goes to ui-ux.
license: MIT
metadata:
  author: Brimpa
  version: "1.1"
  updated: "2026-10-22"
---

# Brand identity

Create, or capture from an existing product, a small brand system and write it down in a form
that both humans and the `web-design` / `ui-ux` skills can read: a `BRAND.md` (or `DESIGN.md`
when the project already uses that name), a `tokens.css` of CSS custom properties, and a
`tokens.json`. A brand for a clinic, a SaaS tool or a side project does not need a 60-page
guideline; it needs five decisions made once, with reasons, and kept consistent.

Scope boundaries, so the skills do not overlap:

- Positioning, naming, tagline strategy, launch copy: `launch-marketing`. This skill only summarises
  the voice and the key messages so copy on every surface sounds like one company.
- Page design (hero, sections, layout, motion): `web-design`. This skill supplies the tokens it builds with.
- Usability of screens, forms, dashboards: `ui-ux`.
- Launch or explainer videos that must stay on-brand: `launch-video`.
- Premium or luxury positioning (identity signalling, world-building, counterposition, exclusivity
  narratives): load the `luxury-web-design` skill. This skill only makes sure the tokens and voice
  can carry the price once that positioning is decided.

A brand becomes recognisable through consistency held over years (the same accent, face, imagery
treatment and voice on every surface), not through a launch; every rule below exists to make that
repetition possible.

## How to run this

1. **Find what already exists.** Search the project for `BRAND.md`, `DESIGN.md`, `PRODUCT.md`,
   `tokens.*`, `tailwind.config.*`, a `:root {` block with custom properties, logo files
   (`logo*.svg`, `favicon*`), and a fonts folder or Google Fonts link. If a brand exists, the job is
   to document and tighten it, not replace it. Say so before changing a colour.
2. **Discover (one short round of questions, two at most).** Ask or infer: who the audience is and
   in what situation they meet the brand; three to five personality adjectives, each with its
   opposite ("confident, not loud"); two or three competitors or neighbours and what their visual
   territory looks like (so you can step out of it); the surfaces the brand must live on in the
   next six months (website, app, invoices, signage, social, print); any fixed facts (an existing
   logo, a legal name, a colour the owner will not give up). Never ask for hex codes or font names
   in this round; ask for meaning and let the system follow. Record undecided facts as undecided.
3. **Define the direction.** Write one sentence of physical scene ("a receptionist at a bright
   dental clinic at 9 am" / "a developer at night in a terminal") and let it decide light vs dark,
   warm vs cool, dense vs airy. Pick a colour strategy (Restrained, Committed, Full palette or
   Drenched; see Palette rules). List three concrete visual references from the audience's own
   world, not from the category's other websites. Run the self-check: if someone could guess this
   look from the category alone, rework it.
4. **Define the palette.** One accent, tinted neutrals, semantic colours, dark-mode variants,
   every text/background pair checked against the contrast floors. Write colours in OKLCH with hex
   alongside. Open `references/color-and-type.md` for the method and ramps.
5. **Define type.** One family, or two with distinct jobs. Choose from the subject's world and
   stay off the overused list. Fix the role scale (display, h1-h3, body, small, label, mono) with
   sizes, weights, line heights. Same reference file.
6. **Write the logo direction brief and usage rules** (type of mark, what it must do at 16 px and
   in one colour, clear space, minimum sizes, misuse list, file set). Open
   `references/logo-and-visual-identity.md`. If no logo exists yet, the brief is the deliverable;
   artwork comes from a designer or an image model and is then checked against the brief.
7. **Summarise voice and messaging.** Three to five traits as "we are / we are not", tone by
   context, prohibited terms, the one-line value proposition and three key messages with proof
   points. Open `references/voice-and-messaging.md`. Reuse `launch-marketing` output if it exists.
8. **Produce the files.** `BRAND.md`, `tokens.css`, `tokens.json`, and the asset folder skeleton,
   from `references/brand-md-template.md`. Include a "Decisions and reasons" section; a token
   without a reason gets overridden by the next person.
9. **QA.** Run `references/consistency-checklist.md` against the tokens and against two real
   surfaces (for example homepage and one app screen or invoice). Fix contrast failures before
   anything cosmetic.
10. **Hand off.** Tell the user which files to commit, how `web-design`/`ui-ux` will consume them
    (import `tokens.css`, read `BRAND.md` first), and what is still undecided. Offer the mascot
    only if the brand's personality supports a character (see Mascot).

## Palette rules

- **Build roles, not swatches.** Canvas, raised surface, text primary, text secondary, border,
  accent, accent text, focus, success, warning, error, info. Tokens are named by purpose
  (`--color-accent`), never by value (`--color-blue-600`). Primitives (the ramp) may exist
  underneath; surfaces reference semantics.
- **One accent.** Pick the hue from what the product means or where it lives (the clinic's
  teal-green tiles, the farm's soil) rather than from the category table ("healthcare = blue").
  A second brand colour needs a named job the first cannot do. Two to three colours plus
  neutrals, not five to seven. After choosing, check the tone and price the hue announces against
  the tone table in `references/color-and-type.md` section 15 (colour meanings are cultural and
  category-relative; the table is a check, not a picker).
- **Strategy decides dosage.** Restrained: tinted neutrals plus one accent (most product UI and
  reading surfaces). Committed: one saturated colour carries 30-60% of the surface. Full palette:
  three or four named roles. Drenched: the surface is the colour. Colour commits at page scale
  (a field owns a region) instead of as dots scattered on grey.
- **Tint the neutrals.** Pure `#000`/`#fff`/grey reads as unfinished; a reflexive `#111` reads as
  a template. Give every neutral a small amount of the accent hue, in both themes.
- **OKLCH first.** Write new palettes as `oklch(L C H)` so ramps keep perceived lightness even;
  vary lightness along a ramp and reduce chroma near white and black. Keep hex next to every value
  for tools that need it (email, Figma, print).
- **Contrast floors (WCAG 2.1 AA):** body text 4.5:1; large text (about 24 px regular or 19 px
  bold) 3:1; UI controls, icons and focus rings 3:1 against adjacent colours; aim 7:1 (AAA) for
  long reading. Check hover, focus, disabled, text on images, and both themes. Never grey text
  on a coloured surface; derive secondary text from the surface hue or the foreground.
- **Dark mode is designed, not inverted.** Lift surfaces by lightness, lower the accent's chroma
  slightly so it does not glow, raise body text weight or tracking a step where the face thins.
  Ship the dark tokens even if the first site is light-only; the next surface will want them.
- **Semantic colours keep convention** (red error, green success, amber warning) but are tinted
  toward the brand so they belong to the palette. Colour is never the only carrier of meaning;
  pair with icon, text or position.
- **Proportion:** roughly 60% canvas/neutral, 30% secondary surfaces, 10% accent is a sane default
  for Restrained brands; Committed and Drenched deliberately break it.
- **Avoid the AI-default clusters** unless the brief asks for one in its own words: warm cream +
  high-contrast serif + terracotta; near-black + one neon accent with glowing edges; broadsheet
  hairlines + italic serif + tracked mono labels; flat saturated ink + hard offset shadows +
  condensed display; purple-to-blue gradients; cyan on dark; gradient text; colour glows.

## Typography rules

- **Fewest families that make hierarchy unmistakable.** One family is often right for product
  UI. A second family earns its place only with a role the first cannot perform (display voice,
  code, tabular numbers).
- **Choose the face like an object from the subject's world**, in the register of the surface:
  marketing pages may let display type carry the voice; product UI wants stability and
  scanability. Naming any face on the overused list below needs a reason no other face satisfies,
  and "the subject is books so a serif" is not that reason. Type sets the price before a word is
  read (thin all-caps sans over a busy photo reads as a cheap counter; a calm serif on a clean
  ground reads as craft): confirm the family's tone against the tone table in
  `references/color-and-type.md` section 15.
- **Overused list (as of Oct 2026):** Inter (as display; Inter as a quiet UI body face is
  acceptable), Roboto, Arial and bare system stacks as the brand face, Geist, Plus Jakarta Sans,
  Space Grotesk, Space Mono, Fraunces, Playfair Display, Cormorant, Lora, Crimson, Newsreader,
  Recoleta, Syne, IBM Plex, DM Sans, DM Serif, Outfit, Instrument Sans. Italic-serif display heroes
  and monospace "for technical feel" are the same tell.
- **Floors:** body 16 px on the web (iOS Safari zooms focused inputs under 16 px); 14 px only for
  genuinely secondary text; 12 px captions sparingly; nothing interactive under 11 px. Body line
  height 1.5-1.7, headings 1.1-1.3, measure 45-75 ch (set `max-width: 65ch`-`75ch` on prose).
  Display size no larger than 6 rem; tracking no tighter than -0.04 em (-0.02 to -0.03 is usually
  better); all-caps labels get +0.05 em and stay short.
- **Scale:** product UI 1.125-1.2 ratio on a fixed rem scale; marketing 1.25 with responsive
  display sizes. Adjacent roles must differ by at least 1.25x in size or by weight, or the
  hierarchy is flat.
- **Delivery:** load only the weights used, `font-display: swap`, a metric-compatible fallback
  stack, `text-wrap: balance` on headings, `text-wrap: pretty` on body.

## Logo direction and usage rules

- **Decide the type of mark from how the brand will be used,** not from taste: wordmark when the
  name is short and distinctive; lettermark for long names; combination mark (icon + wordmark that
  can separate) for most new small brands because it is the most flexible; pictorial or abstract
  mark alone only once the brand has recognition; emblem/badge for heritage or craft; mascot for
  family, food, education and community brands.
- **Every logo must pass:** recognisable at 16x16 (favicon); legible at business-card size;
  works in one colour and in black/white; no detail that disappears when scaled; sits on light,
  dark and the brand accent.
- **File set:** full horizontal, stacked, icon only, wordmark only; each in full colour,
  reversed, mono dark, mono light; SVG master, PNG with transparency for places that cannot take
  SVG, PDF for print. Export a 512x512 PNG icon master for avatars and app icons; the 32x32 favicon
  and 180x180 Apple touch icon derive from it.
- **Clear space** = the height of the mark (or the cap height of the wordmark) on all sides.
  **Minimum width:** full logo 120 px digital / 35 mm print; icon 24 px digital / 10 mm print.
  Header logo 120-200 px wide, footer 100-150 px.
- **Misuse list** (write it into BRAND.md verbatim): do not stretch, rotate, recolour outside the
  palette, add shadows, gradients, strokes or glows, crop, rearrange elements, place on busy
  photography without a contrast plate, or recreate the wordmark in a system font.
- **Icons** that accompany the brand share one style (outlined 2 px, filled, or duotone), a 24 px
  grid, `currentColor`, rounded caps and joins for outlined styles, and are tested at 16 and 48 px.
- **Imagery: real beats perfect.** Slightly imperfect photos of the actual business, people and
  product are the strongest trust signal a surface has; stock and generated people say the brand
  is interchangeable, and a brand that looks like a commodity gets priced like one.
- Full detail, the logo brief template, colour-psychology table and co-branding rules are in
  `references/logo-and-visual-identity.md`.

## Voice framework summary

- **Voice is fixed, tone flexes.** Define voice as three to five traits with a "we are / we are
  not" pair each ("plain-spoken, not blunt"). Tone shifts by context: marketing, onboarding,
  support, errors, success, legal. Errors state what failed and how to recover, never joke about
  money, privacy, deletion or blocked work.
- **Four dials** to place the brand on: formal-casual, simple-complex, serious-playful,
  reserved-expressive. Mark where it sits and where it never goes.
- **Prohibited terms list.** Start with the buzzwords every AI draft reaches for (streamline,
  empower, supercharge, world-class, enterprise-grade, next-generation, cutting-edge,
  revolutionary, best-in-class, seamless, synergy, leverage) and add the client's own.
- **Four tests for any sentence:** Does it sound like us? Could a competitor say it word for
  word? Does the audience care? Is it consistent with the last thing we published? And for any
  storytelling section ("founded in 19XX", milestones, board messages), the ego test: is this here
  for the buyer, or for me? Keep the fact only where it answers a buyer's question.
- **Messaging summary only:** one-line value proposition, three key messages each with a proof
  point, one 10-second pitch. Deeper positioning and naming belong to `launch-marketing`.
- Templates and sample rewrites: `references/voice-and-messaging.md`.

## Deliverables

| File | What it holds | Consumer |
|---|---|---|
| `BRAND.md` (or `DESIGN.md`) | Quick reference, palette with roles and contrast results, type system, logo rules, voice, imagery, asset map, decisions and reasons, changelog | humans, `web-design`, `ui-ux`, `launch-video` |
| `tokens.css` | `:root` light tokens, `[data-theme="dark"]` and `prefers-color-scheme` dark tokens, type and spacing tokens | any site or app |
| `tokens.json` | The same tokens in W3C Design Tokens (draft) shape for Tailwind, Figma plugins, scripts | build tooling |
| `assets/brand/` | logo set, icon master, favicon set, fonts licence note, mascot export | repo |
| Logo direction brief | in `BRAND.md` under "Logo" when artwork does not exist yet | designer or image model |
| Consistency report | result of the checklist against two real surfaces | user |

Put the files where the project keeps docs (`docs/` or repo root for `BRAND.md`; `src/styles/` or
`public/` for `tokens.css`; `assets/brand/` for files). If the project has an Impeccable-style
`DESIGN.md` with frontmatter, write the tokens into that frontmatter instead of creating a second
source of truth. Templates: `references/brand-md-template.md`.

## Report / output format

End with this summary in the conversation, then the file list:

```
Brand summary: <name>
Scene: <one sentence of physical scene that set light/dark and temperature>
Strategy: Restrained | Committed | Full palette | Drenched, light-first | dark-first
Accent: <name> oklch(...) / #hex, used for <roles>
Neutrals: tinted toward <hue>; canvas #..., text #..., border #...
Type: <display face> for <roles>, <body face> for <roles>; scale <ratio>; body 16 px / 1.6
Logo: <mark type>; status: exists | brief written; passes 16 px + mono test: yes | no | untested
Voice: <trait, not opposite> x3-5; never: <top prohibited terms>
Contrast: <n> pairs checked, <n> pass AA, <n> fixed, <n> open (list)
Undecided: <facts the owner still has to settle>
Files written: BRAND.md, tokens.css, tokens.json, assets/brand/README.md
Next: web-design builds pages from tokens.css; launch-marketing owns positioning
```

## Mascot (optional)

Offer a mascot only when the personality allows a character (friendly, educational, community,
food, kids, indie tools) and the owner wants one; a law firm or a hospital billing system does not.
The workflow, kept product-agnostic in `references/mascot.md`, uses the open-source Avatar Lab
studio: write a mascot card first (name, personality line, starter body, body and eye colours from
the palette, five animations tied to page moments), build it in the browser, export only the
animations used, integrate with `@bible-strong/avatar-react` or `@bible-strong/avatar-web`, place it
bottom-right at 120 px, shrink it under 480 px so it never covers a button, wire the trigger map
(page open, hover on the primary button, submit, error, loading, 30 s idle, click), and show a still
expression under `prefers-reduced-motion`. **Licence caution:** Avatar Lab and its packages are
AGPL-3.0 (as of Oct 2026). Fine for personal, learning and open-source projects; for a
closed-source or paid product read the licence or ask the author before shipping, because it can
require releasing your own code. Say this to the user before they invest the time.

## Worked examples

**1. "Make our dental clinic site look professional" (no brand exists).** Step 1 finds nothing but
a JPEG logo. Scene: "a nervous patient in a bright waiting room at 9 am" forces light-first,
warm-neutral, calm. Strategy Restrained. Accent taken from the clinic's actual interior (a muted
teal-green) rather than "healthcare blue"; neutrals tinted toward it. One humanist sans with real
weights for everything; 1.2 scale. Logo brief asks for a combination mark that survives at 16 px
and on the appointment SMS. Voice: reassuring, plain, precise; never "state-of-the-art". Output:
`BRAND.md`, `tokens.css`, a vectorisation task for the JPEG, and a hand-off to `web-design`.

**2. "Document our brand so Claude stops inventing colours" (SaaS with a half-finished Tailwind
config).** Step 1 reads `tailwind.config.ts` and the live site. The skill captures what is actually
used (three near-duplicate blues, Inter, no dark mode), proposes merging to one accent with a
ramp, writes `DESIGN.md` frontmatter the project's `web-design` runs can read, flags four contrast
failures on grey-on-blue buttons, and lists the merge as a decision for the owner, not a silent
change.

**3. "We want a little character on the landing page."** The brand is a kids' coding club: a
mascot fits. The skill writes the mascot card from the palette (body = accent, eyes = text
colour), states the AGPL-3.0 caution because the club sells paid courses, and, if they proceed,
produces the integration plan with the trigger map and reduced-motion fallback.

## Anti-patterns / refuse

- Do not pick a palette or face from a category table ("fintech = navy + gold") or from the
  AI-default clusters; if the brief could be guessed from the category, it is not a brand yet.
- Do not ship more than one accent without a named job for the second; do not ship five fonts.
- Do not silently replace an existing brand colour, logo or name; propose, with the reason, and
  let the owner decide. Capturing beats inventing.
- Do not invent proof points, testimonials, customer logos or statistics for the messaging
  summary; write "proof needed" instead.
- Do not generate a logo that imitates a known brand's mark, name or trade dress, or that
  includes a real person without permission.
- Do not list tokens without contrast results; a palette that fails AA on body text is not done.
- Do not write BRAND.md as a wall of rules without the "why"; each section carries its reason in a
  clause so the next person (or model) can extend it correctly.
- Do not let the brand's rules permit brand-eroding tactics: no standing deep-discount blasts (a
  permanent 40-60% off teaches buyers the full price was a bluff), no fake scarcity (resetting
  countdowns, invented "only 3 left"). Write the refusal, with its reason, into BRAND.md.

## When the user pushes back

- "Just use blue, everyone trusts blue." Agree that trust matters, then show two tinted-neutral
  options where the accent is chosen from their own premises or product, next to the generic
  blue, and let them pick with the competitors' sites open beside them.
- "Inter is fine." It is, for product UI body text. Hold the line only on display/brand type, and
  only with an alternative in hand that has the same weights and language support.
- "We don't need dark mode." Ship the dark tokens anyway as a block they can ignore; it costs a
  few lines and avoids an inverted mess later.
- "The logo has to be a gradient 3D icon." Ask for the mono and 16 px versions first; if those
  work, the gradient version can be the hero variant.
- "Skip the voice part." Keep at least the prohibited-terms list and three traits; without them
  every generated paragraph drifts back to buzzwords.

## References

- `references/brand-md-template.md`: read when producing the files; it holds the `BRAND.md`
  template, the `tokens.css` block (light and dark), the `tokens.json` shape and the DESIGN.md
  frontmatter variant.
- `references/color-and-type.md`: read when defining the palette or type system; OKLCH ramps,
  contrast method, dark-mode derivation, the overused-font list, pairing rules, and the tone
  table (what colour and type families signal before a word is read, with the clarinet-shop case).
- `references/logo-and-visual-identity.md`: read when writing a logo brief, choosing a mark type,
  setting usage rules, icon style or imagery direction (including the real-photos-over-stock rule).
- `references/voice-and-messaging.md`: read when writing the voice chart, tone-by-context table,
  prohibited terms, the ego test for storytelling sections, or the messaging summary.
- `references/consistency-checklist.md`: read at the QA step and before any brand asset ships.
- `references/mascot.md`: read only if the user wants an animated character on the site.
- `references/sources.md`: upstream material and licences this skill was adapted from.
