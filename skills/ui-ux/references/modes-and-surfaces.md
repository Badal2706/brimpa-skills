# Modes and surfaces

The mode names what the visitor's success looks like on this surface. Choose it from the requested surface, never from the product: a developer tool's landing page is Persuade; a fashion house's documentation is Read; a docs index is Read, not Persuade. Record the mode once per surface and keep it stable across sessions.

## The four modes

| Mode | Visitor success | Typical surfaces | Design posture |
|---|---|---|---|
| Persuade | Decides and acts | Landing pages, marketing, campaigns, pricing, product pages | Earn attention and action. The visual world may own and structure the page. The action is the category's working form (a clinic's open slots, a store's add-to-cart, a route-and-dates search), not a decorative link to it. |
| Operate | Completes a task | App UI, dashboards, editors, admin, settings, tools, inboxes, builders | Scanability, consistency, native expectations and the real usage scene outrank expression. Brand lives in precise details. The world lends only type, palette, density and one signature move. |
| Read | Understands something | Docs, articles, guides, help, changelogs, policies | Structure for comprehension, then make reading worth staying in. The world owns the frame; the reading column stays calm. |
| Experience | Is inside the work itself | Portfolios, galleries, showcases | The artifact leads from the first viewport; interface recedes. Rules as for Persuade. |

## What each mode lends and forbids

### Persuade

- The opening makes the offer intelligible and desirable, exposes a clear action, and demonstrates something only this product can prove. If a visitor left after one viewport, what would they describe an hour later? If the answer is a mood, the page is not committed.
- Conversion lives in the form's own vocabulary: one-line hook, visible primary action, legible reading order. Wherever the world puts a part, the page still works: nav reads as links, copy is set text, the primary action is unmistakable, the section below starts as a section.
- Both ends erase direction: a painted poster with no working parts, and the generic product page (headline over subcopy and a button, row of equal cards).
- Usability still applies in full: the five-second test, two-line headlines, a real button on the first screen, equal margins, every section headed, keyboard and reduced motion. Visual direction for this mode lives in the `web-design` skill.

### Operate

- Someone who uses tools like this should know where everything is before noticing the world. Product UI's failure mode is not flatness; it is strangeness without purpose: over-decorated buttons, mismatched form controls, gratuitous motion, display fonts where labels should be, invented affordances. The bar is earned familiarity; the tool disappears into the task.
- Four contributions from the brand, no more: type, palette, density, one signature move. Never layout, navigation model or controls. A direction whose world shows up only as a colour scheme has not found its move; name the move concretely ("service health drawn as a transit map", "the schedule in a timetable's column rhythm").
- Every control is a standard one (web component on the web, native control in an app). A comp an engineer could not build from the platform's standard components is a picture of the tool, not the tool.
- Typography: one family is often right; fixed rem scale, not fluid; scale ratio 1.125-1.2; prose 65-75ch, dense UI denser, tables fine at 120ch+.
- Colour: restrained by default; state-rich semantic vocabulary (hover, focus, active, disabled, selected, loading, error, warning, success, info) standardised; accent for primary actions, current selection and state indicators; a second neutral layer for sidebars and panels. "A grey screen with one accent colour is the category default without the category's polish, not restraint": colour must do real jobs (shell, state, data series, selection, signature move).
- Motion: 150-250ms on most transitions; motion conveys state, not decoration; no page-load choreography; nothing on the screen performs an entrance.
- Prompt and build with real content: product name, realistic data with units, real labels, one state worth seeing (alert, degraded service, empty filter). State colours only where they carry meaning.
- Self-check: cover the name; does it still read as a product of its category? Could the visitor do the task? Is it at least as clean as the category standard and more distinctive?

### Read

- The reader's question leads; comprehension and wayfinding stay intact at every step. Docs read as docs, a changelog as a changelog.
- The frame (masthead, nav rail, ground, title and section openers, how code, tables and callouts are set) can commit fully to the world. The reading column stays calm: a reading face, real contrast, real measure (web about 60-75ch, body near 16px; native platform body style), nothing performing behind the text.
- Monospace is for code, parameters and small labels, never running text or headings by default. The signature move is one system used where it earns its place, never a frame repeated around every element.
- Wayfinding: can a reader tell where they are and where to go next? Table of contents for anything over about 300 lines, breadcrumbs for 3+ levels, "on this page" rail at desktop widths, previous/next at the end.
- Self-check: cover the name; could this be any other product's docs? If yes, push the frame further into the world. If it reads as an artifact of the world before a document, pull the world back to the frame.

### Experience

- The work leads from the first viewport. Interface recedes to the minimum that keeps orientation (where am I, how do I get back, how do I see the next piece).
- Still owes: keyboard navigation through the pieces, reduced-motion path, legible captions, no autoplay with sound.

## Choosing by surface

| Surface | Mode | Note |
|---|---|---|
| Landing, pricing, campaign, product page | Persuade | Even for an internal tool's public page |
| Sign-up, checkout, booking flow | Operate, with Persuade entry | The first step may sell; from the first field onward it is a task |
| Onboarding, first run | Operate | Get to the first real success; skippable |
| Dashboard, admin, list, detail, settings, editor | Operate | |
| Docs, help centre, guide, changelog, blog post, policy page | Read | |
| Email (transactional) | Operate | 600px, single column, buttons not links, no hover |
| Email (marketing) | Persuade | |
| Error pages (404, 500, offline) | Operate | What happened, what to do next; one link back to safety |
| Portfolio, gallery, showcase | Experience | |
| Print view, PDF export | Read | Strip nav and interactivity; expand hidden content; full URLs |

## Mixed requests

- A product site that shows its interface is a Persuade page; the interface fragments on it follow Operate rules on the inside. Build each with its own run and share one palette and one typeface. Fragments must be real pieces with data that adds up and one finding stated; grey bars and lorem numbers are the weakest thing a product page can show.
- A docs site with an interactive playground: Read frame, Operate playground.
- A dashboard with a "what's new" panel: Operate screen; the panel is a small Read surface and obeys Read measure and calm.

## Refinement versus redesign

- Refinement keeps the incumbent identity, behaviour, copy and everything out of scope; ask before replacing factual copy or adding claims.
- Redesign keeps product truth, content, function, native affordances and constraints, but treats the old look as evidence and anti-reference. Never split the difference into polish on a discarded look.
- A section, component or state inside an established surface inherits that surface; it is never a new identity exercise. A missing design file does not make a project greenfield: the coherent identity in the code is the authority.

## Shaping interview (2-3 questions per round, one round by default)

Round 1: what is it for, who, the primary understanding or action, what is uniquely true here.
Round 2 (only if gaps): real content and ranges (min, typical, max); states and transitions; fidelity, breadth, interactivity; what must stay untouched; binding constraints.
Per mode, ask what changes the work: Persuade - who must act, believe what, with which real proof. Operate - task, information, states, frequency, constraints. Read - the reader's question, source material, structure, wayfinding. Experience - what leads, how exploration unfolds. Always: what success looks like, what stays untouched, what would make a polished result feel wrong.

Brief (3-5 bullets when settled): job and audience with mode; outcome and proof; scope and anti-goals; states and ranges; interaction and layout intent (not CSS); constraints and open decisions. Confirm, then build.
