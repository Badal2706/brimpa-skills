# Pre-flight check

Run this on the built page before you call it done. It is hard and honest: every line is either verified or listed as not verified in the report. "Verified" means you looked at the rendered result at the widths it ships at, or ran the check; it never means "the code says so". A clean scan is evidence, not proof; visual judgement still follows.

## Contents

1. How to run it
2. Craft floor (numbers)
3. AI-tell sweep
4. Direction and specificity
5. Content and honesty
6. Responsiveness
7. Accessibility
8. Performance budget
9. Images, credits and licences
10. Links, forms and states
11. Self-lint list (61 detector rules)
12. Report template

## 1. How to run it

1. Settle or disable entrance motion, then capture full-page screenshots from the top at 1440, 768 and 390 (plus the user's actual viewport). Open every capture and confirm it shows what its name claims.
2. Batch the checks: fix everything one look shows before looking again. Two rounds is the ceiling for a build; a third means the plan was wrong.
3. Review in a fresh context where possible (a second pass without the build thread's optimism); judge only the pictures: if a problem is visible in a screenshot it is real, whatever the code says.
4. Report at the scope you checked. Never dress a fix-list score as whole-page approval, and never claim a check you did not run.

## 2. Craft floor (numbers)

- Contrast: body and placeholder text 4.5:1; large text 3:1; controls, icons and focus indicators 3:1; both themes, every state, text over images checked in the screenshot.
- Type: body 16px or more (13px absolute floor for captions; UI text never under 11px); body line height 1.45-1.7; measure 45-75ch (over about 80ch fails); display at most 6rem unless the direction is poster-scale with a one-to-three-word headline; tracking no tighter than -0.04em; heading-to-body step at least 1.25x; no more than five sizes; every headline two lines or fewer at 1440, 768 and 390; statements at 36px or less desktop / 24px phone as `<p>` or `<blockquote>`.
- Spacing: one pair of equal outer margins, 16-32px, never under 16px; sections 120-240px apart desktop, 72-112px phone; more space above a heading than below (at least 2x); padding inside bordered or coloured containers 8px minimum, ideally 12-16px; body text at least 16px from the viewport edge (12px at 480px and below); no stretch taller than about half a screen with nothing in it; no half-empty sections; no first-screen hole of 28% or more.
- Depth declared once: border OR shadow; shadows only on what floats (menu, dialog) and with offset and soft blur; no zero-offset coloured halo; no shadow on things at rest in flat directions.
- Radius decided once: square or fully round for buttons, one radius for all media; no "soft" 9-16px default by reflex.
- Browser surfaces themed from the palette: `::selection`, caret, `:focus-visible`, scrollbar colour, underline offset, tabular numerals where numbers align.
- Fonts actually rendered are the fonts specified (check Rendered Fonts in DevTools); only used weights loaded; metric-compatible fallbacks.
- CSS specificity checked: section padding not cancelled by element selectors; flex and grid text children have `min-width: 0`; no horizontal scroll at any width.

## 3. AI-tell sweep

Walk the page against this list. Each is a default, not a ban (except the kicker/eyebrow, which is banned outright), so a hit needs a reason written in the report or a fix.

Structure: cards nested in cards; everything in cards; same-size icon + heading + text cards as page structure; rounded-square icon tile above headings; kicker or eyebrow above a heading; hero pill chip; numbered section labels (01/02/03) without a real sequence; hero-metric template; split hero with badge row; centred headline over a row of cards; hairline border plus wide soft shadow on every card ("ghost card"); thick coloured side-tab border on cards; stock section order (hero, logos, three features, testimonial, pricing, CTA); every section the same layout family; everything centred; one medium radius on everything; nine nearly equal font sizes; link-column footer as the only close.

Surfaces and colour: cream ground with terracotta or clay accent; violet/indigo or purple-to-blue gradients; near-black with one neon accent and glow; cyan on dark; gradient text; gradient buttons; glass panels and floating pill nav as decoration; coloured glow shadows; radial halo or spotlight behind the hero; repeating-gradient stripes; decorative grid-line backgrounds; `feTurbulence` grain; shape-assembled or sketch-style SVG illustration; many-vertex clip-path "organic" shapes; gray text on coloured backgrounds; pure black/grey neutrals without a decision; monospace as a technical costume; a system display face (Impact, Arial Black) as the display voice; emoji or Unicode glyphs as icons; tiny tracked uppercase labels; one word of a headline styled differently.

Copy: buzzwords (streamline, empower, supercharge, unlock, unleash, elevate, seamless, effortless, robust, cutting-edge, next-generation, world-class, enterprise-grade, all-in-one, blazing fast); the correction ("Not a feature. A platform.") three or more times; tricolon headlines; "theater" framing; em-dash saturation (eight or more); oversized full-sentence h1; "Get started" / "Learn more" / "Submit" as labels; "Field notes" / "Quietly trusted by" labels; middle-dot meta strings; "WORD — fragment" labels; "→" on every link; furniture text (local time, coordinates, "Est. 2024", "Scroll to explore", "Available for work" with a dot); lorem ipsum; "John Doe" / "Acme Corp".

Motion: fade-and-rise on every section; hover lift on every card; scattered scroll reveals; parallax as thesis; bounce or elastic easing; pulsing status dots; decorative blinking cursor; auto-scrolling marquee; page-load choreography on product UI; typewriter or scramble headlines; preloader or counter; custom cursor; scroll hijack.

Calibration question: could someone guess this aesthetic from the category alone, or from category plus the list of things to avoid? If yes, rework. A bookish subject does not soften the test ("cream plus serif for a book subject is the default wearing the subject's clothes").

## 4. Direction and specificity

- The direction contract exists (thesis, own-world, story, first viewport, form, finish) and the page matches it; no block of the contract reads like a mood.
- Cover the name: could an unrelated product in the same category use this page unchanged? If yes, the direction is not committed.
- The skeleton test: strip the copy; does the bare structure still say what each section is?
- One memorable element, everything around it quiet; boldness spent once. "Before leaving the house, remove one accessory."
- At least one crafted artefact from the subject's real-world paper or signage (menu card, receipt, ticket, appointment chit, prescription pad, letterhead) is on the page, built in real HTML with real content, readable at 390, carrying the boldness, and named in the report. A page whose only distinctive element is its motion move fails this (rules and ideas: `references/sections.md` §4).
- The idea sentence ("On this page, X becomes Y") survives the competitor test and reaches pricing, FAQ and footer.
- The direction ledger is updated (client, industry, direction, date) so the next brief in this industry rolls differently.

## 5. Content and honesty

- Real content throughout: the full menu, every room, every speaker, the real price.
- Every sample detail (an invented price, duration, response time, walk-in policy, payment method or operational promise) carries a visible marker on the rendered page, a "[sample: confirm]" tag or the one highlighted placeholder style, and is listed in the report for the client to confirm. Check in the screenshot, not the source: a value marked only in an HTML comment fails.
- No invented proof: customers, quotes, logos, user counts, ratings, sale pings, benchmarks, certifications, "as seen in". Any placeholder testimonial section is plainly fictional, has no real names, and is flagged in the report.
- Every claim and configuration comes from supplied truth; illustrative values are labelled on the page; no invented prices, endpoints or capabilities.
- Numbers carry units and periods; dates and currency are locale-correct.
- The first screen says what this is and offers the action. Five-second stranger test: show the first screen to someone who has not seen the brief for five seconds, then ask what the business does and where they would click; two wrong answers fail the hero.
- Skim test: read only the headings from top to bottom; they alone must say what this is, for whom, and what to do next. No text block runs over about 75 words.
- A testimonial or trust mark sits beside the primary action and beside the price; the page's depth matches the buyer's stakes named at step 2 (minimal for low stakes, thorough above the fold for high stakes).
- Every section the visitor came for has a heading naming it and a place in the navigation.
- Loaded symbols stay out of decoration.
- Copy reads in the product's own language; controls name their action; errors name the problem and the recovery.

## 6. Responsiveness

- Checked at 320, 375, 414, 768, 1024 and 1440 widths with real copy; no horizontal scroll; no three-line headlines; no text at the edge.
- The phone is its own composition: one dominant thing on the first screen; images re-cropped with `object-position`; headline breaks re-authored; margins 16-20px; body 16-18px.
- Touch targets at least 44x44 CSS px (24x24 is the WCAG 2.2 minimum; 44 is the house floor), 8px between adjacent targets; no hover-dependent functionality (`@media (hover: hover)` guards hover styles).
- `width=device-width, initial-scale=1`; `100svh`/`dvh` instead of `100vh` for full-height sections; safe-area insets with `env()` where the page has fixed bars.
- Fixed elements never cover content at any scroll position, especially the phone nav and sticky bars; `scroll-padding-top` set for the sticky header.
- Tables reflow (horizontal scroll container or card rows with `data-label`); long tokens wrap (`overflow-wrap: anywhere` on URLs); chips wrap or expose a `+n` disclosure.
- Breakpoints are content-driven (where the layout breaks), mobile-first with `min-width` queries; DevTools emulation is not a phone: state which real device or emulation produced the evidence and what stayed untested.

## 7. Accessibility

- Semantic structure: one `h1`, no skipped heading levels, landmarks (`header`, `nav`, `main`, `footer`), buttons are `<button>`, links are `<a href>`, lists are lists, tables are tables.
- Keyboard: everything operable; visible focus on every control including inside menus and dialogs; logical tab order matching visual order; no traps; Esc closes overlays; skip link to main content; focus not obscured by sticky bars.
- Images: meaningful alt text; empty alt on decorative images; the hero image's alt describes the subject, not the mood.
- Forms: visible labels (`for`/`id` or wrapping), required indicators, specific errors referenced by `aria-describedby` and announced (`role="alert"` or `aria-live`), a focusable error summary at the top on failed submit, autocomplete attributes, correct `type` and `inputmode`, password managers and paste allowed.
- Colour never the only channel (icons, text, position accompany state); contrast per section 2; Windows high contrast mode and 200% zoom do not break the layout; text spacing overrides (line height 1.5, paragraph 2em, letter 0.12em, word 0.16em) do not clip anything.
- Motion: `prefers-reduced-motion` honoured per effect with an intentional alternative; no flashing; autoplaying media muted with a visible pause and captions; carousels controllable.
- Icon-only controls have accessible names; live badge updates use one atomic status message; dragging has a button alternative.
- Language set on `<html lang>`; page title and meta description present (the seo-geo-audit skill owns the rest of metadata and the full schema rules; the local-business JSON-LD check is in §10).

## 8. Performance budget

Targets are Core Web Vitals "good" thresholds; measure with Lighthouse and the Performance panel, throttled to a mid-range Android on slow 4G, not only a desktop.
- LCP under 2.5 s: hero image sized correctly, `fetchpriority="high"`, preloaded display font, critical CSS inline, no lazy loading above the fold, no preloader.
- INP under 200 ms: no long tasks on load; third-party scripts `defer`/`async`; animation libraries loaded only when needed.
- CLS under 0.1: width and height (or `aspect-ratio`) on every image and embed; `font-display: swap` with metric fallbacks; space reserved for late content; nothing injected above existing content.
- Images: WebP or AVIF, `srcset`/`sizes` with width descriptors, `<picture>` for art direction, 80-85% quality, lazy below the fold, served at about twice the rendered CSS width for anything full-bleed (capped around 2400px wide); hero poster for any video.
- Fonts: two or three weights total, subset, self-hosted or preconnected, `font-display` set.
- JS: the page reads and works without it (content visible, links and `<details>` work); motion and the live thing enhance; no dependency added for what CSS already expresses; check the dependency file before adding anything.
- 3D and video: compressed, lazy-initialised near the viewport, paused off-screen, poster first; models and clips over 25 MB or one minute flagged in the report.
- No console errors on load (a script error invalidates every other judgement); no layout thrashing; `content-visibility: auto` on long below-fold sections where helpful.

## 9. Images, credits and licences

- Every picture is one of: the client's own; generated for this brief; found in an open collection under CC0, public domain, CC BY or CC BY-SA; drawn in code for this subject. Non-commercial (NC) and no-derivatives (ND) licences are out for client work; CC BY-SA alterations must be shared alike.
- Found pictures show the subject's world (city, street, material, trade, history) and never pass as the client's own product, room, dish, person, team or customers.
- The real shop, team and product are photographed, even imperfectly on a phone, rather than stood in for by stock or AI imagery; visitors read the fake as "they did not care enough to photograph their own shop".
- Every found picture is downloaded into the project (never hotlinked), credited on the page (title, creator, link to source, link to licence, small, usually in the footer) and listed in the report with file, title, creator, licence and source page. Public-domain pictures get a credit anyway.
- Stock placeholders (Picsum ids, Unsplash) are listed in the report as stand-ins to replace; no watermarks, burned-in text, scanner edges or recognisable people who could be taken for staff or customers.
- One treatment for the whole set (untouched, all greyscale, multiply on a field, darkened for dark); two or three crop ratios; square corners or one radius; no device frames or browser chrome around pictures; no colour washes, duotones, vignettes or grain overlays.
- Nothing lies on top of a headline or a statement; text over a photograph sits in a calm region or on a neutral scrim.
- At least four real pictures on a page that has a subject to show (usually six to twelve); SVG drawings and placeholders do not count toward that floor; software pages count their real interface fragments.
- Photo placeholders (the client's photos are not shot yet) are modest and intentional: never the largest element on the desktop or phone first screen; each styled as a drawn stand-in, a caption-led slot stating the shot to take, or a type-and-colour composition; never an empty grey box; each listed in the report as a shot to take.

## 10. Links, forms and states

- Every link resolves (no `#` placeholders left except a documented `#checkout`); external links open sensibly; `mailto:`/`tel:`/`wa.me` links carry the real address and number.
- Primary action works end to end or is wired to a real destination; no fake payment, booking or sign-up success; success animations await the real request; errors restore the form with input preserved.
- The primary action goes straight to the action when a direct one exists, and its label matches its destination: "Book on WhatsApp" opens `wa.me/<number>?text=` with a prefilled, URL-encoded message; "Call" is `tel:`; "Book online" is the real booking URL. A button that scrolls to a form never names a channel; the form further down is the second path. Tap each one on a phone.
- On a phone the booking form shows only the minimum fields; optional fields are collapsed; three to seven options are chips, not a dropdown.
- Local business: JSON-LD of the most specific LocalBusiness subtype (`Dentist`, not plain `LocalBusiness`) with name, address, geo if known, telephone, openingHoursSpecification and sameAs; every value is visible on the page and identical to it; no value still tagged as sample; no rating without real reviews; it parses in the Schema Markup Validator or Rich Results Test (or is listed as not verified). Full rules: seo-geo-audit.
- States present where relevant: hover, focus, active, disabled, loading, error, empty, success; the booking or contact form has been submitted once in testing, on a phone, as the first thing checked (it is the end of the visit and what is remembered), and the confirmation says what happens next and when.
- Opening hours, prices, addresses and names match the client's listing exactly (NAP consistency: see seo-geo-audit).
- Dark mode (if shipped) checked in every state and overlay; theme does not flash on load; `theme-color` set per scheme.
- Legal and privacy links exist where personal data is collected (dpdp-legal-compliance for Indian audiences); the security-review skill has been run on anything with a form or a backend before launch.
- The report lists every sample detail, every stand-in picture and photo slot, every redraw of the direction and every check not run.

## 11. Self-lint list (61 detector rules)

Derived from impeccable's deterministic detector (v4.7, Oct 2026). Scan the HTML/CSS and the rendered page for each; fix or justify. Slop rules first, then quality.

Slop (31): `side-tab` thick coloured one-side border on a card; `border-accent-on-rounded` thick accent border on a rounded card; `overused-font` Inter, Roboto, Fraunces, Geist, Plus Jakarta Sans, Space Grotesk; `flat-type-hierarchy` heading and body under 1.25x apart; `gradient-text`; `ai-color-palette` purple/violet gradients or cyan on dark; `cream-palette` reflex cream/beige ground; `nested-cards`; `monotonous-spacing` the same value everywhere; `bounce-easing`; `pulsing-dot`; `blinking-cursor` where no input exists; `shape-assembled-illustration` large primitive-shape SVG scene; `dark-glow` coloured glow shadows; `radial-halo` chromatic radial wash on dark; `radial-spotlight-glow` accent spotlight behind the hero; `marquee` auto-scrolling content; `icon-tile-stack` rounded-square icon above a heading; `italic-serif-display` oversized italic serif hero; `hero-eyebrow-chip`; `kicker-above-heading` (banned); `numbered-section-labels`; `em-dash-overuse` eight or more at about one per 500 characters; `marketing-buzzword`; `aphoristic-cadence` three or more "X. No Y." endings; `oversized-h1` full-sentence display headline dominating the viewport; `extreme-negative-tracking` past where characters keep their shapes; `gpt-thin-border-wide-shadow` hairline plus diffuse shadow on every card; `repeating-stripes-gradient`; `codex-grid-background` decorative hairline grid; `theater-slop-phrase`.

Quality (30): `organic-clip-path` many-vertex blob or torn-edge clip; `buried-raster` background image under a near-opaque wash; `broken-image` empty or placeholder src; `script-error` uncaught exception on load; `content-hidden-at-rest` text left at opacity 0 after reveal handlers; `edge-flush-cards` scroller cards flush against one edge; `text-occlusion` text under an opaque element; `first-viewport-column-overflow` one hero column running far past the fold; `gray-on-color`; `low-contrast` below 4.5:1 / 3:1; `line-length` over about 80ch; `cramped-padding` under 8px inside containers; `body-text-viewport-edge` within 16px of the edge (12px at 480px and below); `tight-leading` under 1.3; `skipped-heading` h1 to h3; `heading-rhythm` heading closer to the block above than to its own content; `justified-text` without hyphenation in a narrow column; `straggler` one-word last line (advisory); `unbalanced-heading` (advisory; `text-wrap: balance`); `tiny-text` body under 12px; `undersized-ui-text` interactive text under 11px; `all-caps-body` uppercase runs of 80+ characters; `wide-tracking` over 0.05em on body; `text-overflow` content wider than its container doing harm; `repeated-container-text` the same literal text three or more times in one card; `clipped-overflow-container` overflow hidden clipping a positioned popover or tooltip; `design-system-font`, `design-system-color`, `design-system-radius`, `design-system-font-size` values outside the project's documented tokens.

Rules that are tool-specific do not apply here (ignore markers, hook tiers); the names are kept so findings can be reported in a shared vocabulary.

## 12. Report template

```
Direction: <name> (composed with <name> for <what>), chosen over <struck candidates>; category default refused: <one line>.
Idea: On this page, <subject thing> becomes <device>. Live thing: <what the visitor can do>.
Artefact: <real-world object rebuilt on the page, its content, where it sits>.
Tokens: colours <4-6 named hex>; type <faces and roles>; spacing base <n>px, sections <n>px; radius <policy>; shadow <policy>; motion depth <low/medium/high>.
Sections (in order): <hero pattern>, <section: blueprint>, ...; footer: <close>.
Dark mode: <shipped / not shipped and why>.
Pre-flight:
  Craft floor: pass / fails listed
  AI-tell sweep: hits and justification
  Responsive (320/375/414/768/1024/1440): pass / issues; evidence: <device or emulation>
  Accessibility: pass / issues
  Performance (LCP/INP/CLS, measured on <device/throttle>): <numbers or "not measured">
  Images: <count>, credits listed below; stand-ins to replace: <list>; photo slots: <list with the shot to take>
  Links and forms: <primary goes to wa.me / tel: / booking URL; form as second path; #checkout noted / mailto fallback>
  Structured data: <subtype, fields, validated with what, or not verified>
Sample content to confirm: <list, each visibly tagged on the page>
Image credits: <file, title, creator, licence, source, where credited>
Not verified: <every check you did not run>
Hand-offs: ui-ux (app screens), seo-geo-audit (metadata, schema, NAP), security-review (forms), dpdp-legal-compliance (consent), brand-identity (logo/palette gaps), launch-marketing, launch-video.
```
