# Process and measurement: what a premium engagement does before, during and after the build

The unseen layers that make an expensive site expensive, framed as scope the client is buying; and how to judge the result with numbers instead of opinion. Budget figures are from the price-tier and expensive-websites videos (as claimed) and are used as scope framing, not as prices to quote.

## Contents

1. The premium engagement process
2. Research artefacts
3. Budget tiers as scope framing
4. QA layers, risk and accountability
5. Measurement: benchmarks, tests and metrics
6. The post-launch loop and the two-week memory test

## 1. The premium engagement process

On a cheap build the client's request is taken and built. On a premium build the first one to two weeks are strategy, and the design tool stays closed until the thinking is done (as described in the expensive-websites video). Sequence:

1. **Discovery.** Calls with the owner, the people who sell, the people who answer the phone; what the business needs the site to accomplish (the Goal test); what buyers ask before buying; what the brand will never do (the marketing vector).
2. **Audience research.** Personas from data (orders, CRM, call notes, reviews); awareness levels; the buyer's stakes and status needs; a short survey or five interviews with real buyers for the memory test.
3. **Competitor and aspiration audit.** Five to eight direct competitors and two aspirational brands outside the category: first screens captured, journey stages scored with the audit scorecard, the gap written in one paragraph (what every competitor does on autopilot; what none of them says).
4. **Positioning and brief.** The Premium Strategy Brief (SKILL.md); positioning and messaging hierarchy with launch-marketing; brand gaps to brand-identity.
5. **Sitemap and content hierarchy.** Fewer, better pages; one page per persona where personas diverge; the About page flipped; the pricing or fees page decided.
6. **Wireframes.** Section plan mapped to journey stages (attention-architecture worksheet), claims with proof, before any visual design.
7. **Imagery plan.** Shot list, photographer, dates; the phone shoot now, the proper shoot scheduled; renders labelled.
8. **Consultative pushback.** Where the brief conflicts with the audience data, show the data and propose the alternative; the premium client is paying for the disagreement (the hero case: client wanted minimal, data said more, conversion nearly doubled after doubling above-the-fold content, as claimed).
9. **Design and build** with web-design (direction draw inside the constraints, tokens, blueprints, build, motion, pre-flight).
10. **QA layers** (§4), the Premium Audit of the built page, launch.
11. **Post-launch loop** (§6).

## 2. Research artefacts

Each is a short document the client sees; together they are most of the cost of the engagement.

| Artefact | Contents | Used by |
|---|---|---|
| Goal statement | the one job, the one button, what the site is not for | every later decision |
| Persona sheet (per persona) | who, intent, action, awareness, stakes, status need, source channel, lifetime value, three quotes | copy depth, segmented pages, proof selection |
| Competitor audit | first screens at 1440 and 390, scorecard rows, the autopilot pattern, the gap | positioning, memory test, direction constraints |
| Positioning summary | identity, world, counterposition, quiet/loud register, marketing vector (never-do list) | launch-marketing, brand-identity |
| Sitemap and content hierarchy | pages, their jobs, their order of argument | web-design blueprints |
| Wireframes with stage map | each section's stage, claim, proof, layout in words | web-design |
| Shot list and proof inventory | templates in `references/imagery-and-proof.md` §10 | the shoot, the build |
| Measurement plan | benchmarks, tests, metrics, dates (§5) | post-launch |

## 3. Budget tiers as scope framing

What each tier buys, so the client sees where the money goes (as described in the price-tier video; figures are US-market examples from 2025-2026 and vary widely by country):

| Tier | Who builds | What it includes | What it does not | Fits |
|---|---|---|---|---|
| About $500 | a template executor on a site builder | a functional, responsive site of up to ten pages | type, imagery, interaction, copy strategy, conversion thinking; the seller carries no downside | a side project, a first presence |
| $5,000-10,000+ | a skilled independent designer-developer | custom design and motion, refined type, brand storytelling, content strategy, conversion-minded layouts, a CMS the client can edit; outcomes sold, not page counts | research depth, copywriting, photography and QA at agency scale | startups and studios that want to double leads |
| $50,000+ | an agency team: strategist, copywriter, UX researcher, designer, motion designer, developers, project manager, over months | the whole process in §1, accessibility and performance audits, integrations, accountability | - | enterprise and luxury-tier work where the site carries revenue or reputation |

Use the tiers to frame scope: a luxury-tier brief on a $500 scope is a mismatch to name on day one, not a discount to absorb. Research, copy and photography are what move a build from the middle tier to the top; they are also the layers a client cannot see in a screenshot, so list them.

## 4. QA layers, risk and accountability

The invisible technical shadow work that cheap sites skip and premium clients are paying for (as described; thresholds from web.dev and WCAG):

- **Speed on a weak phone.** LCP under 2.5 s, INP under 200 ms, CLS under 0.1, measured on a throttled mid-range Android on slow 4G, not on a laptop on office wi-fi. Uncompressed images, bloated plugins and heavy animation are the usual causes. Every published A/B case tied vitals to revenue (moderate).
- **Cross-device.** Real devices or named emulations at 320-1440; an iPhone-perfect page that breaks on Android costs sales.
- **Accessibility.** WCAG 2.2 AA: contrast, keyboard, focus, labels, reduced motion, pause controls on moving content over five seconds; a legal requirement in several jurisdictions.
- **Structure for search and AI search.** Headings, landmarks, metadata, structured data; hand to seo-geo-audit.
- **Findability (care test).** The phone number, the booking field, the size guide, the price: each found in one look in a recording review.
- **Honesty.** Every proof item traceable; every scarcity statement true; no timers; no AI product or people imagery.
- **Security and privacy.** security-review on forms and client areas; dpdp-legal-compliance for personal data in India.

**Risk and accountability.** A cheap build has no downside for the seller once paid; a premium studio's reputation, portfolio and relationship ride on whether the site works, so the incentives differ and the client is paying to transfer risk (as argued). Make that explicit in the engagement: named owners for each QA layer, a post-launch review date, and the measurement plan agreed before design.

## 5. Measurement: benchmarks, tests and metrics

Opinion is the worst judge of a premium page: the founder's eye is biased, and designers' peers reward what buyers would never open. Measure.

- **Benchmarks over opinion.** Compare conversion against the category's published benchmarks (industry panels such as Contentsquare's yearly benchmark give baselines: in the 2026 edition conversion fell about 5% year on year and about 13% of visitors return within 30 days; use the current edition) and against the site's own before.
- **Five-second stranger test.** Show the first screen for five seconds to someone who has not seen the brief; ask what the business does and where they would click; two wrong answers fail the hero.
- **Headings-only skim.** Read only the headings top to bottom; they must say what this is, for whom, and what to do next.
- **Heatmaps and recordings.** Where the eye lands first, where people hunt, where they leave; predictive attention maps on the first screen before launch, real heatmaps after.
- **VisAWI short form.** Four items (simplicity, diversity, colourfulness, craftsmanship) rated by five to ten target buyers on the prototype; a validated instrument (strong); maximise simplicity and craftsmanship.
- **Metrics beyond conversion.** Hook rate (how many stay past the first screen), hold rate (scroll depth and time to the proof), click-through to the action, conversion, and cohort retention (do buyers come back, which for fashion is the signal that story and identity landed), alongside return on ad spend (the premium-branding video's holistic set, as described).
- **Two-week test of the honesty rules.** Turn off any countdown on evergreen products for two weeks and watch average order value, not only conversion (as suggested in the product-page video).
- **Segment results by persona** where separate pages exist; the professional and the individual convert differently and should be read separately.

## 6. The post-launch loop and the two-week memory test

Launch is the starting line (brutally-honest video). After launch:

1. Week 1: recordings and heatmaps reviewed; findability fixes; vitals re-measured on a real phone.
2. Week 2: the memory test with five real buyers who saw the site two weeks earlier: what do they remember, would they come back, what would they tell a friend; if the answer is "a mood" or "nothing", the difference is not landing and the voice or imagery needs work.
3. Month 1: conversion and hook/hold against the benchmark and the before; the three biggest moves re-prioritised with the audit scorecard; one change at a time, measured.
4. Quarterly: proof refreshed (new letters, press, figures with new periods), prices and ladder reviewed, the never-do list re-read, the shoot updated so the imagery stays current and real.
