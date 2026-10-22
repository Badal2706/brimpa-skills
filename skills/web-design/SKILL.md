---
name: web-design
description: Visual design and page composition for websites that must not look like AI templates. Use whenever the user asks to design, build, redesign, restyle or "make it look good/premium/modern" for a landing page, marketing site, homepage, portfolio, clinic or local-business site, SaaS marketing page, e-commerce storefront, event page, newsletter or editorial site, in any stack (HTML/CSS, Tailwind, React, Next.js, Astro, Vue, Svelte, WordPress, Webflow, Framer). Also when they say a page looks generic, templated, "AI-made", boring, or "like every other site"; when they ask for a hero, sections, colour palette, fonts, dark mode, scroll animations or a style direction; and when a new client brief arrives even if nobody says "design". Infers a direction from the brief, offers 16 distinct directions with tokens, writes the section plan and copy, adds one orchestrated motion moment, and ends with a hard pre-flight. For app screens, dashboards, forms and usability use the ui-ux skill.
license: MIT
metadata:
  author: Brimpa
  version: "1.1"
  updated: "2026-10-22"
---

# Web design: different sites for different clients

A page built on autopilot is the average of every page the model has seen: centred headline, small label above it, three icon cards, a soft gradient, a few hairlines, Inter. Nothing is wrong and nothing was decided. This skill replaces defaults with decisions: read the brief for what is true, pick one direction from a catalog of sixteen (and a different one next time the same industry shows up), write the tokens and the argument before any markup, build with real content, add one motion moment, then run a pre-flight that fails honestly.

Scope: public pages people read and scroll (Persuade and Experience surfaces: landing, marketing, portfolio, store, event, editorial). Screens people work in (dashboards, admin, settings, forms, onboarding) follow the ui-ux skill; this skill still supplies the visual world they inherit (type, palette, density, one signature move). For high-budget, premium or luxury builds and attention-grabbing launch pages, load the luxury-web-design skill together with this one; it overrides direction, proof, imagery and conversion-architecture rules while this skill still runs the build and pre-flight.

## How to run this

Steps 1-5 take a few minutes and decide whether the page is any good. Do them in order.

1. **Read the brief and the product truth.** Find: the subject, the audience and where they will be when they read (desk, waiting room, phone from Google Maps), the one action the page must get, the stack and constraints, any existing brand (logo, colours, faces), and above all **what imagery truly exists** (own photos, real product UI, an image tool, or nothing). Then inventory the subject: eight to twelve things that belong to this client and no competitor (name and its meaning, street and what it looks like, numbers in the brief, the constraint it lives with, materials, rituals and hours, printed artefacts). If the brief is vague, state your reading in one line and proceed; ask only when a missing fact blocks (no product name, no price).
2. **Infer industry, audience, mood and job.** Write one line each. Then write the sentence of the physical scene ("a 34-year-old parent on a phone in a car park at 6 pm") so light or dark mode and density follow from use, not from category. Name the buyer's stakes in the same breath: what the visitor loses if they choose wrong. Low-stakes purchases (a sandwich, a haircut) want a minimal page and an instant action; high-stakes buyers (savings, surgery, a year-long contract) need more explanation above the fold (method, people, process, proof) or the restraint reads as evasive. Calibrate the depth of the blueprint to that, not to taste.
3. **Pick ONE direction** from the catalog (summary table below; full cards in `references/directions.md`). Shortlist two or three from the industry table, strike the one you used last time for this industry (keep a ledger: client, industry, direction, date), strike the one you would produce by reflex, and choose the one that can carry something only this client has. Composing is allowed: at most two, saying which leads. The brief wins over the catalog: a pinned look is built at full fidelity. Write the idea sentence: "On this page, **[something of the subject]** becomes **[the device the direction calls for]**", and test it by putting the nearest competitor in it; if it still works, dig again. Name the one live thing the visitor can do (real slots, a real calculator, a configurator).
4. **Write the token plan** (template below): 4-6 colours as named hex or OKLCH with roles and proportions, type faces with roles and a scale, spacing base and section gap, radius and shadow policy decided once, motion depth, light/dark decision. Then write the direction contract (six short blocks). Use `references/typography-and-color.md` for faces, scale numbers, OKLCH method, commitment levels and the dark-mode protocol.
5. **Review the plan before code**, twice. First against the AI-tell list below and the calibration question: could someone guess this aesthetic from the category alone, or from category plus the list of things to avoid? Second against "what would I produce for any similar brief": work the plan for a different client in the same category and see whether you land in the same place. If any part reads as the default, revise it and say what changed and why.
6. **Write the section blueprint.** List the page as claims with proof, one line per section; delete sections without a claim; the order of the argument is the order of the page, so the sequence changes from project to project. Choose a hero pattern that is not the hero-metric or split-hero default, then four to seven sections, no two neighbours sharing a layout, the idea carried into pricing, FAQ and footer. Open `references/sections.md` for anatomy by job, hero patterns, blueprints, proof rules, pricing, nav and footer.
7. **Copy pass.** Write the whole page as plain text before markup: headline two lines or fewer at every width (about 32 characters is safe), one supporting sentence under 22 words, buttons that name the action, headings that name the content, the full content (whole menu, every room, every price), sample details where the brief leaves gaps, and never invented proof. Copy rules per section are in `references/sections.md` §11.
8. **Build with real content, motion off in your head.** Tokens first as CSS custom properties; the hero exactly as planned at desktop and phone; each section from its blueprint; imagery in order of preference (own, generated, real pictures of the subject's world from open collections with credit, drawn in code for this subject, type and colour alone; a slightly imperfect phone photograph of the actual shop, team or product beats stock and AI imagery, which visitors now read as "they did not care enough to photograph their own shop"); the live thing; states and semantics; the phone as its own composition. Dark mode by default only where the scene asks for it (dev tools, media, night use); when shipped, design it explicitly (protocol in `references/typography-and-color.md` §9), never invert.
9. **Motion pass: one orchestrated moment.** A load sequence settled by 1.2 s, one signature move, choreographed entrances per section played once, feedback on every control, one moving picture at most, every hidden state behind `prefers-reduced-motion: no-preference`. Recipes, timing table and the twelve landing-page animations with parameters are in `references/motion.md`.
10. **Pre-flight, hard and honest.** Screenshot at 1440, 768 and 390 with motion settled, open every capture, run `references/preflight.md` (craft floor numbers, AI-tell sweep, specificity, content honesty, responsive, accessibility, performance budget, image credits, links and forms, the 61-rule self-lint). Fix, look again, two rounds maximum. Report with the template; list every check you did not run.

## Token plan template

```
Direction: <name> (+ <second> lends <what>)      Scene: <who, where, what light> -> light / dark / both
Colours (roles, proportions):
  ground   #------  (70-90%)        surface  #------  (one tone step, 2-6 L points)
  ink      #------                  muted    #------  (4.5:1 on ground)
  accent   #------  (<5% of any screen: the action + one other thing)   accent-ink #------
  fields   #------ / #------ (only if the direction uses colour fields; each with its own ink)
Commitment: Restrained | Committed (30-60%) | Full palette | Drenched
Type: display <face, weight, size clamp, tracking, leading>; text <face, 17-19px, 1.5-1.6, 60-65ch>; roles used: display / head / lead / body / small
Spacing: base 4px; margins 16-32px equal; section gap <120-240px desktop / 72-112px phone>; anchor line at <column>
Radius: square | fully round | <n>px, decided once     Shadow: none at rest | offset+blur on floating only     Borders: none | tables and inputs only
Imagery: <what exists>, <two crop ratios>, <one treatment>, credits in footer
Motion depth: low | medium | high; signature move: <name>; live thing: <what>
Principles (what makes this page this client's): <2-3 lines>
```

Direction contract (about 150 words, six blocks; if a block reads like a mood, the direction is not decided): **Thesis** (one idea, and the category-default arrangement it refuses) / **Own-world** (palette and component language recognisable with the content removed) / **Story** (what the visitor understands, believes, does) / **First viewport** (exact composition: what is where, at what scale, where the action sits) / **Form** (grid, type system, surfaces) / **Finish** (states, motion, the close). Never paste the contract into shipped source.

## Direction catalog (summary)

Full cards with palette examples, two type pairings, grid, surface policy, imagery, motion depth, signature move and pitfalls: `references/directions.md`. Read it at step 3; never pick from this table alone.

| # | Direction | One line | Lean toward for |
|---|---|---|---|
| 1 | Quiet Editorial / Minimal | one ground, one ink, one accent; large regular-weight type; off-centre anchor line; square media | portfolios, studios, premium services |
| 2 | Soft and Calm | hue-tinted near-white ground, deep ink of the same hue, one calm accent; booking as the live thing | clinics, wellness, therapists, spas |
| 3 | Swiss Industrial / Brutalist | paper ground, carbon ink, one hazard red; heavy grotesk at 10vw; 0 radius; nothing soft | architecture, engineering, manufacturing, design studios |
| 4 | Neo-Brutalist Pop | flat fields, 2-3px black borders, hard offset shadow (only here), huge uppercase display | Gen Z brands, creative tools, drops, events |
| 5 | Dark Cinematic | three tinted dark surfaces, soft light ink, one accent, no glow; the object leads | dev and pro tools, media, hardware |
| 6 | Luxury Monochrome | white or black two-tone, one near-absent metallic, didone or light grotesk, vast rests | fashion, jewellery, hotels, premium property |
| 7 | Warm Organic / Craft | putty or bone ground (never cream + terracotta), deep brown or green ink, one warm field; the artefact as page | bakeries, makers, farms, boutique hospitality |
| 8 | Corporate Trust | navy ink, one trust blue for the action, high contrast, rows of heading and body; proof table as centrepiece | finance, legal, insurance, hospital groups, government |
| 9 | Playful Consumer | three or four flat fields with assigned inks, rounded display, large round buttons; one live toy | consumer apps, kids, pets, snacks, D2C |
| 10 | Retro / Terminal | one substrate (CRT dark, pixel, or analog film); mono only when the terminal is the world; one green element | hacker-voice dev tools, indie games, zines |
| 11 | Glass / Spatial | translucency on one or two fixed elements over a strong photograph; solid ink; warnings apply | Apple-aligned apps, AR/VR, one hero control |
| 12 | 3D / Immersive Showcase | neutral studio or deep ground, one object per screen, scroll-locked camera, configurator as hero | hardware, cars, furniture, footwear |
| 13 | Magazine / Broadsheet | paper white, masthead as the one big type moment, real multi-column grid, thick ink bars not hairlines | publications, newsletters, programmes |
| 14 | Product-led SaaS (restrained) | white or `#F8FAFC`, one accent on the action, real interface fragments at true size; the product demonstrates itself | SaaS, dev tools with a mainstream audience, marketplaces |
| 15 | System-led (Material 3 / Fluent 2 / Polaris) | the platform's roles, type scale and controls themed with the brand; one move inside the system | Android, Microsoft 365, Shopify, Adobe-adjacent products |
| 16 | Colour-Field Poster (drenched) | every section a flat field with its own ink, hard cuts, 8-12vw display, square everything | festivals, agencies, launches, cultural institutions |

## House rules (rule -> instead)

These hold in every direction unless the brief or the brand explicitly requires the device (then keep it and say so in the report).

| Rule | Instead |
|---|---|
| Headlines two lines or fewer at every width; the one `h1` says what this is | Cut words, then widen the measure, size last |
| A heading on every section; no small label standing in for one | "Prices", "The rooms", "How it works" in the heading face |
| No kicker/eyebrow above a heading, no hero pill chip (banned) | Put it in the heading or the first sentence, or drop it |
| No index numbering (01/02/03, "Step 2") without a real sequence | Order by position, size or words; a real `<ol>` if order matters |
| Equal outer margins 16-32px; no section huddled on one side; no blank stretch over half a screen | Close every void with the picture, a second column, a list or a figure |
| No hairline dividers, 1px outlined boxes, grid lines, crosshairs, crop marks | Space, a tone step, a change of scale, a filled shape, a thick bar if a bar is the idea |
| No gradients (backgrounds, buttons, text) | Flat colour or a photograph; a neutral scrim under text on a photo is the one exception |
| No shadows on things at rest, no glows; depth declared once (border OR shadow) | A tone step between surfaces; offset-and-blur shadows only on what floats |
| No cards nested in cards; no rows of identical icon-topped cards; no card as page structure | The section blueprint: split, list, table, statement, full-bleed, held picture |
| No cream + terracotta, no violet/indigo, no near-black + neon glow by reflex | A palette derived from the subject at a declared commitment level |
| No gray text on coloured backgrounds; running text in full ink | Secondary text tinted from the hue or the ink; `--muted` passes 4.5:1 |
| No monospace outside real code, data or measurement | The text face; tabular figures where numbers align |
| No tiny tracked uppercase labels; no styled accent word inside a headline | Sentence case at a readable size; one face, one colour per headline |
| No glass panels or floating pill nav as decoration; no emoji or glyphs as icons | A plain bar (wordmark, 3-5 links, one action); drawn icons from one set |
| No real illustration means none: no sketch-style or shape-assembled SVG scenes, no `feTurbulence` grain, no blob clip-paths | A real picture of the subject's world (credited), the subject drawn flat with care, or type and colour alone |
| Two typefaces at most, usually one; none from the overused list without a reason | A face chosen like an object from the subject's world |
| Buttons flat, one fill, square or fully round, decided once; one primary per screen | A second action is a text link; labels name the action |
| No fake proof, fake forms, fake pings, fake progress | Real data or nothing; `mailto:`/`tel:`/real destination; say what is sample content |
| Light or dark from the scene, never from the category | One sentence of who, where, what light |
| Removing an ornament never leaves a hole | Fill it with scale, full content, a real picture or a field of flat colour |

## The AI-tell list (short form)

Check the plan at step 5 and the build at step 10. Full sweep with copy and motion tells in `references/preflight.md` §3.

- **Calibration clusters:** warm cream + high-contrast serif + terracotta; near-black + one acid/vermilion/cyan accent + glowing edges; broadsheet hairlines + zero radius + dense columns; the SaaS card kit (identical rounded cards, one radius, the same grey shadow, gradient washes); template chrome (tracked caps eyebrow, "A · B · C" meta strings, "WORD — fragment" labels, `#0B0B0B` standing in for black, mono data labels, "→" on every link).
- **Structure:** hero-metric template; split hero with badge row; centred headline over a row of cards; icon tile above every heading; ghost cards; thick side-tab borders; numbered section labels; every section the same shape; the stock section order.
- **Type:** Inter/Roboto/Geist/Space Grotesk/Plus Jakarta/Fraunces by reflex; italic serif hero; nine nearly equal sizes; a full-sentence h1 over three lines.
- **Colour and surface:** purple-to-blue gradients, gradient text, colour glows, radial spotlights, stripes and grid backgrounds, glass as decoration, cream by reflex, pure grey neutrals.
- **Motion:** fade-and-rise on every block, hover lift on every card, bounce easing, pulsing dots, blinking cursors, marquees, parallax as thesis, preloaders, custom cursors.
- **Copy:** buzzwords, "Not X. Y." cadence, tricolons, em-dash saturation, "Get started / Learn more", editorial labels, furniture text, lorem and "Acme".

## Pre-flight (short form)

Every line verified by looking at the rendered page at 1440, 768 and 390, or listed as "not verified". Full list with numbers in `references/preflight.md`.

1. Contrast 4.5:1 body / 3:1 large, controls and focus, both themes, over images.
2. Body 16px+, line height 1.45-1.7, measure 45-75ch, display at most 6rem unless poster-scale, tracking no tighter than -0.04em, at most five sizes, every headline two lines or fewer.
3. Equal margins 16-32px; sections 120-240px apart; no holes; more space above headings than below; padding 12-16px inside containers.
4. Depth and radius decided once; browser surfaces themed; the specified fonts actually rendered.
5. AI-tell sweep clean or justified; cover-the-name test passed; the idea reaches the footer.
6. Real content; no invented proof; sample details listed; first screen passes the five-second stranger test (what is this, where do I click) and the headings alone tell the story (skim test); a testimonial sits beside the primary action and trust marks beside the price.
7. 320-1440 widths with no horizontal scroll; the phone is its own composition; 44px targets; hover guarded.
8. Semantic headings and landmarks, keyboard and visible focus, labelled forms with announced errors, alt text, reduced motion per effect, `lang`, title and description.
9. LCP < 2.5 s, INP < 200 ms, CLS < 0.1 on a throttled mid-range phone; images in modern formats with `srcset` and dimensions; two or three font weights; no console errors; works without JS.
10. Every picture is own, generated, open-licensed (CC0/PD/CC BY/CC BY-SA, downloaded, credited, listed) or drawn; stand-ins listed to replace.
11. Every link resolves; the primary action works or is wired to a real destination; no fake success.
12. Report written with the template; direction ledger updated.

## Report format

Use the template in `references/preflight.md` §12: direction and the struck candidates, the idea sentence and live thing, the token plan, the section order, dark-mode decision, pre-flight results per group with the evidence used, sample content to confirm, image credits, everything not verified, and hand-offs. Do not claim a check you did not run.

## Worked examples

**A dental clinic in Ahmedabad, brief: "modern, trustworthy, we need more bookings", has 20 phone photos of the clinic and the two dentists.**
Step 2: audience arrives from Maps on a phone, often in daylight, job is "book or call". Step 3: shortlist Soft and Calm, Quiet Editorial, Corporate Trust; the ledger shows the last clinic got Soft and Calm with cyan, so this one takes Quiet Editorial with a Committed field colour sampled from the clinic's actual teal reception wall; idea: "the appointment card becomes the page" (hours, doctor, chair as a card-like sequence); live thing: open slots for today and tomorrow with a WhatsApp fallback. Step 6: hero with the real reception photo at 50% of the screen and the h1 "Dentist in Navrangpura, open till 8 pm"; services as a service-and-price table; the two dentists large, same crop; real Google reviews quoted with first name and initial; the map section; footer with the full NAP. Dark mode: not shipped. Motion: one masked headline, hours block computed live, nothing else. Hand-off: seo-geo-audit for LocalBusiness schema and NAP.

**A B2B invoicing SaaS, brief: "clean, like the big players", has real screenshots.**
Shortlist Product-led SaaS, Swiss, Colour-Field; ledger shows last SaaS got Product-led, so this takes Swiss with the product's own single accent; idea: "the invoice itself becomes the grid" (the page is set on the invoice's columns: description, quantity, amount); live thing: type an amount and see the real GST split and due date. Hero is the working calculator beside a true-size interface fragment, not a screenshot in a laptop. Pricing shows real monthly and annual totals; the comparison table has four true rows. Dark mode shipped because the app is dark and used late; designed with three surface steps, no glow. Motion: price roll on the toggle, one cursor tour of one task.

**A photographer's portfolio, brief: "let the work speak", 60 images.**
Experience mode: the work leads from the first viewport. Direction: Luxury Monochrome composed with Quiet Editorial (editorial leads the grid, monochrome lends the two-tone palette and slow crossfade). Idea: "the contact sheet becomes the index" (rows with frame numbers that are real roll numbers, so numbering carries information and is allowed). Live thing: the index with preview; the carried picture via view transitions into each case. Footer: the email as a headline-sized line. Motion: crossfade at 6 s, nothing else moves. Pre-flight flags the 13px captions and raises them to 14px.

**A sneaker resale drop, brief: "loud, young, sell out in an hour".**
Shortlist Neo-Brutalist Pop, Colour-Field, Retro; pick Neo-Brutalist Pop with fields taken from the shoe's three colourways; the hard offset shadow is legitimate here. Hero: the cut-out shoe via multiply on a yellow field, "Drops Friday 7 pm IST" in the h1, add-to-cart as the working form; a countdown reading the real date; sale pings only if wired to real orders, otherwise omitted. Motion: bento build with `back.out(1.5)` allowed by the direction, a marquee of the real sizes left, pausable.

## Anti-patterns and refusals

- Do not pick the direction before reading the brief, and do not pick the same direction for the same industry twice in a row without a brand reason.
- Do not blend three directions, and do not "split the difference" in a redesign (polish on the discarded look); refinement preserves, redesign replaces.
- Refuse to invent testimonials, logos, counts, ratings, sale notifications or benchmarks, whatever the user says about "placeholders": build the section with plainly fictional sample content labelled as such, or leave it out.
- Refuse fake payment, booking or sign-up flows; wire to a real destination or `mailto:`/`tel:` and say so.
- Do not reach for a stock photo that could pass as the client's own premises, staff or product.
- Do not ship a page that depends on JavaScript to show its content, or a reveal that leaves blank bands when it fails.
- Do not add a dependency, framework or styling library to an existing project as part of a redesign; keep the stack, content and what works.
- Do not treat "the client wants modern" as a brief for the default; ask what they mean by showing two directions in words.
- Loaded symbols (militarist, supremacist, hate emblems) never appear as decoration.

## When the user pushes back

- "Just use Inter and the purple gradient, it's fine": do it if it is their brand; otherwise explain in two lines that it reads as generated as of Oct 2026 and offer one alternative face and one flat palette from the subject. Their call after that.
- "Add more animation": offer to make the one signature move better rather than adding a second; show the one-moment rule and the 2.5 s intro ceiling.
- "Make it look like [competitor]": take the competitor's proportions as a reference, then derive the palette, faces and idea from this client's subject; a copy fails the competitor test by definition.
- "Fill it with placeholder reviews for now": fictional sample content is fine when it is obviously fictional and listed in the report; real-sounding names and logos are not.
- "Skip the mobile pass": the phone is where most local-business and consumer traffic arrives; do the 390px composition and show both screenshots.
- "Dark mode everywhere": ask for the scene; ship dark where night use or the product asks for it, light otherwise, and never a mechanical inversion.

## Special cases

- **Existing brand or design system:** keep the brand's colours and faces, map them onto the roles, take only composition from the direction. If the brand owns a "banned" device (gradient logo, violet accent), keep it and note it.
- **Redesign, restyle or review:** record the before (screenshots at three widths, fonts, colours, what must survive: routes, forms, data, behaviour); a review stops after the critique and names the three changes that would move the page most; a restyle keeps the layout and takes type, colour and components from a direction; a redesign deals a full direction and rebuilds sections inside the existing components. Order of work: type, colour, the frame (margins, rhythm, title, headings), states, then stock components replaced by blueprints. Prove it with before/after screenshots and a click-through of everything that worked before.
- **A single component or section:** skip the draw unless there is no direction to follow; match the surroundings, apply the house rules, still pre-flight it.
- **No imagery at all:** the subject's city, street, materials and trade are in open collections (Wikimedia Commons, Openverse, museum APIs) free to use with a credit; draw the client's own things in one flat language; or commit to type and colour alone. Never grey boxes.
- **No backend:** primary action to the real destination, else `mailto:` with subject and body prefilled, `tel:`/WhatsApp for local businesses, `#checkout` noted for shops.

## Hand-offs

- **luxury-web-design**: high-budget, premium or luxury builds and attention-grabbing launch pages; load it together with this skill. It overrides direction, proof, imagery and conversion-architecture rules while this skill still runs the build and pre-flight.
- **ui-ux**: usability, states, navigation and forms of app screens, dashboards, onboarding and anything people operate; this skill hands it the visual world (type, palette, density, one move).
- **brand-identity**: when the client has no logo, palette or voice to design from; also mascots.
- **seo-geo-audit**: metadata, structured data (LocalBusiness, FAQPage, Product), NAP consistency, Core Web Vitals follow-up after the page is designed.
- **launch-marketing** and **launch-video**: campaign copy, launch assets and film once the site exists.
- **security-review** and **llm-app-security**: any form, backend or AI feature before it goes live.
- **dpdp-legal-compliance**: notice and consent for forms that collect personal data from people in India.

## Reference files

| File | Read it when |
|---|---|
| `references/directions.md` | Step 3: choosing and composing a direction; the industry candidate table, sixteen full cards, the roll rule, and the brief-to-design-system map (Material, Fluent, Carbon, Polaris, Primer, Radix, shadcn, Tailwind, plain CSS) |
| `references/typography-and-color.md` | Step 4: font pairings (32) and the overused list, type scale numbers, OKLCH palette method, commitment levels, proportion, dark-mode protocol, contrast floors |
| `references/sections.md` | Steps 6-7: anatomy by job, hero patterns and the ones to refuse, section blueprints, social proof rules, pricing, FAQ, nav, footer, spacing rhythm, copy rules per section, forms without a backend |
| `references/motion.md` | Step 9: the one-moment rule, timing and easing tokens, reduced motion, performance, scroll behaviour, the load sequence, the twelve animation recipes with parameters, signature moves by direction |
| `references/preflight.md` | Step 10: the full checklist with numbers, the AI-tell sweep, the 61-rule self-lint and the report template |
| `references/sources.md` | When attributing or checking where a rule or number came from |
