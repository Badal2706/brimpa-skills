# Animated website mascot

An optional character for a site, built with the open-source Avatar Lab browser studio and wired
to react to visitors. Everything here is product-agnostic: the only brand-specific inputs are the
palette, the personality traits and the page moments.

Contents

1. Should this brand have a mascot?
2. Licence caution (read before starting)
3. Prerequisites
4. Plan first: the mascot card
5. Build in the studio
6. Export options
7. Integrate: React / Next.js
8. Integrate: any other site
9. Placement rules
10. Trigger map (make it react)
11. Accessibility and performance
12. Troubleshooting
13. Hand-off and files

---

## 1. Should this brand have a mascot?

Yes when the voice allows a character (friendly, educational, community, kids, food, indie and
developer tools with humour) and the owner wants a recurring face for the site, videos and social.
No for brands where trust depends on gravity (legal, clinical records, payments, insurance claims)
or where the voice is reserved. A mascot that contradicts the voice chart undoes the brand work.

## 2. Licence caution

Avatar Lab (studio at `avatars.bible-strong.app`, source at
`github.com/smontlouis/bible-strong-avatar-lab`, packages `@bible-strong/avatar-react` and
`@bible-strong/avatar-web`) is free and open source under **AGPL-3.0** (as of Oct 2026). That is
fine for learning, personal sites and open-source projects. For a closed-source or paid product,
AGPL can require you to release your own source code, including for software served over a
network. Before a client or a paid product depends on it, read the licence, check the repository
for any commercial terms, or ask the author. State this to the user before they spend time in the
studio, and record the decision in `assets/brand/README.md`. Credit the maker where the site
credits open-source components.

## 3. Prerequisites

| Need | Why |
|---|---|
| Desktop browser | the studio runs in the browser; a phone screen is too small to edit |
| The brand palette | body and eye colours come from the tokens |
| Node.js 22.12 or newer | to run the site locally and install the packages (paths B and C) |
| A coding agent or editor | to integrate the export (Claude Code, Cursor or similar) |
| The site's code, or the studio's React demo | where the mascot will live |

Three paths: (A) a still picture only (PNG/SVG for posts, avatars, stickers), about 10 minutes;
(B) live on the website, about 20 minutes; (C) run the studio locally to modify it (optional).

## 4. Plan first: the mascot card

Most people open the editor and drag sliders until they have a random blob. Write the card first;
it gives exact settings and tells you which animations to export.

Studio constraints to plan within: bodies are simple 3D-looking shapes; ten starters to copy
(round ball, block with ears, drop, bean, black ball, sun with dots, puffy, cloud, soft cube,
soft blob); editable size, roundness, rotation, body colour, eye colour, and per eye width,
height, position, spacing and tilt; extra simple shapes (ears) can be added; faces have eyes only,
no mouth, so personality comes from shape, colour and eyes. Twenty-three ready animations:
sleeping, waking, idle, listening, thinking, searching, working, excited, bored, suspicious,
angry, drowsy, happy, curious, confused, surprised, proud, shy, sad, laughing, scared, playful,
celebrate. Blinking and breathing are automatic.

Mascot card template (fill from BRAND.md):

```markdown
## Mascot card: {Name}

Name: {easy to say}; personality in one line: {from the voice traits}
Starter to copy: {e.g. round ball} because {reads friendly / sturdy / quick}
Body: {shape changes}; body colour {accent token / hex}; eye colour {text token / hex}
Eyes: {size, spacing, tilt in plain words; close together = cute, tilted in = cheeky}
Five animations and their moments:
  - waking -> idle: page opens
  - excited: hover or tap on the primary button
  - celebrate: form sent / order placed
  - confused: form error
  - drowsy -> sleeping: 30 s without activity
Three places to use it: {site corner, video intro, social avatar}
Studio checklist: Pose (try only) · Expressions · Animations (keep the five) · Export (format, subset, backup)
```

Prompt to generate the card with any assistant: give it the brand or page name, what the product
does in one line, the audience, the brand colours, three vibe words, the studio constraints above,
and ask for the card in the structure above, short and simple.

## 5. Build in the studio

1. Open the studio on a desktop browser. No sign-up; work saves in the browser automatically.
2. Pick the starter from the card in the avatar grid; double-click to edit (permanent changes) or
   create a new one. The Pose tab is only for trying temporary poses.
3. Set body colour, size and roundness from the card; drag the character to move or rotate;
   labels marked with arrows drag left/right to change numbers.
4. Spend most of the time on the eyes (width, height, spacing, tilt per eye); they carry the acting.
5. Expressions tab has ready presets to tweak or save; Animations tab has the 23 ready ones and a
   timeline (expressions with hold times; loop, once or ping-pong) for custom ones.
6. Back up: Export -> Studio project. Work lives only in that browser profile; clearing history or
   switching machines loses it. Commit the backup file to `assets/brand/mascot/`.

## 6. Export options

Choose the format first: React / TypeScript for React or Next.js sites; JavaScript / ESM for
anything else. Under "Animations to export" choose Customize and keep only the animations on the
card; fewer animations means a smaller file.

| Want | Export | Result |
|---|---|---|
| A picture | Photo Mode -> Take picture | PNG or SVG, transparent, solid or gradient background, chosen size |
| On the site | Download `.avatar.json` | one small file with the definition and its animations |
| A working demo | Download React demo (.zip) | ready project; `npm install && npm run dev`, usually `localhost:5173` |
| Agent setup | Copy instruction for AI | setup steps to paste into the coding agent |
| Backup | Studio project | every avatar, expression and animation; restore in any browser |

The mascot is drawn as SVG, so it stays sharp at any size.

## 7. Integrate: React / Next.js

```bash
npm install @bible-strong/avatar-react
```

```jsx
// Mascot.jsx (Next.js: add 'use client' at the top; it must be a client component)
import { createAvatar } from '@bible-strong/avatar-react'
import '@bible-strong/avatar-react/styles.css'   // import once in the app
import definition from './mascot.avatar.json'

const Mascot = createAvatar(definition)
export default function SiteMascot() {
  return <Mascot defaultAnimation="idle" size={120} />
}
```

Read the JSON first and list the animation names it actually contains; `defaultAnimation` and
every trigger must use one of those names or the component throws "Unknown animation". Controller
API (as of Oct 2026): `play(animation)`, `pause()`, `stop()`, `setExpression(expression)`,
`getState()`, and an `onAnimationEnd` callback; check the repository README for the current
signature before wiring triggers.

## 8. Integrate: any other site (plain HTML, Vite, Astro, ...)

```bash
npm install @bible-strong/avatar-web
```

```js
import { createAvatar } from '@bible-strong/avatar-web'
import definition from './mascot.avatar.json'
createAvatar('#mascot', { definition, defaultAnimation: 'idle' })
```

Without a build tool, load the ESM build from a CDN through an import map, `fetch()` the JSON,
then call `createAvatar`. Give the container a fixed size so nothing shifts when it mounts.

## 9. Placement rules

- Default: fixed, bottom-right corner, 120 px wide, with a margin that clears the scrollbar and
  any cookie banner or chat widget (if a chat widget exists, pick one corner each or drop one).
- Under 480 px viewport width: shrink (for example to 72-80 px) or hide on screens with a primary
  action in that corner; it must never cover a button, a form field or the keyboard area.
- Reserve its box in layout so mounting causes no layout shift; `pointer-events` only on the
  mascot itself, never on an invisible wrapper.
- Keep it out of the first-viewport reading order on marketing pages; it supports the page, it
  does not replace the hero.
- One mascot per page; it appears on every page or on none, not randomly.

## 10. Trigger map (make it react)

"A mascot that only loops is a sticker; one that reacts feels alive." Wire these with the
controller, using only animation names present in the export:

| Event | Play |
|---|---|
| Page opens | `waking`, then `idle` when it ends (or after 2 s if it loops) |
| Hover (or tap on touch) on the primary button | `excited` |
| Form sent, order placed, sign-up done | `celebrate` |
| Form validation error | `confused` |
| Something loading | `thinking` or `working` |
| No mouse, scroll or key for 30 s | `drowsy`, then `sleeping`; any activity wakes it to `idle` |
| Click or tap on the mascot | `laughing` or `playful` |

Rules: no layout jumps; tap instead of hover on touch devices (`@media (hover: none)`); reactions
off when the visitor prefers reduced motion; never play a celebratory animation on an error or a
destructive confirmation; keep a short list of what triggers what in the component file.

Optional "guide" mode: a small speech bubble beside the mascot with one short, on-voice tip per
section the visitor scrolls to. Copy comes from the voice chart; it must pass the prohibited-terms
list like any other string.

## 11. Accessibility and performance

- `prefers-reduced-motion: reduce`: render a still expression (no blinking loop) and disable
  triggers; the page must mean the same without the motion.
- The mascot is decorative: `aria-hidden="true"` on its container unless it conveys status, in
  which case the status also appears as text.
- Keyboard: the mascot is not a tab stop unless clicking it does something meaningful; if it is
  interactive, it is a button with a label.
- Export only the animations used; lazy-load the component below the fold or after first paint on
  marketing pages; measure that it does not hurt Largest Contentful Paint.

## 12. Troubleshooting

| Symptom | Fix |
|---|---|
| Mascot does not show | `styles.css` not imported, or the JSON path is wrong |
| "Unknown animation" | use a name that exists in the JSON, or re-export with that animation selected |
| Covers buttons on phones | shrink or hide under 480 px; move to the other corner |
| Avatars vanished in the studio | different browser or cleared history; import the Studio project backup |
| Node version error | install Node.js LTS 22.12 or newer and reopen the terminal |
| `pnpm: command not found` (running the studio locally) | `npm install -g pnpm`, then `pnpm install && pnpm dev` |

Running the studio locally (path C) is only needed to change the studio itself or work offline:
clone the repository, `pnpm install`, `pnpm dev`, open the printed local URL.

## 13. Hand-off and files

Commit `assets/brand/mascot/{name}.avatar.json`, the studio project backup, a PNG still for social,
and a `README.md` note with: the licence decision (AGPL-3.0 caution acknowledged by {owner} on
{date}), the mascot card, the trigger map, and the reduced-motion behaviour. Add the mascot row to
BRAND.md's asset section so `web-design` and `launch-video` know it exists and how it behaves.


## The deep route: a procedural 3D mascot (`mascot-3d`)

When a client wants more craft than a 2D studio gives (a character derived from the logo's own
shapes, arbitrary poses, stills and films from one source), use the `mascot-3d` skill. It builds
every mascot procedurally in three.js, with only the body required and every other part (eyes,
arms and hands, legs and feet, a glowing accent object, appendages) chosen from the mark. It covers
deriving the character from the mark (each logo element becomes body, face, light or props; a
rotation rule becomes an animation channel; the accent colour owns the one glowing part; a mouth
only if the mark has a curve that reads as one), concept sheets made with an image generator,
procedural three.js modelling, named states, a worker-rendered mount with still-image fallbacks,
and QA. It ships generic templates. This method was proven on Brimpa's own mascot, which stays
private; nothing in either skill describes that character. Avatar Lab remains the fast,
low-budget option. For three.js API detail install the upstream `threejs-skills` plugin.

Rules worth copying whatever the tool: derive every shape and colour from the brand mark; render
the mascot in a slightly warmer, lighter "lit variant" of the tokens so it separates from a page
built on the same colours, and record the offset in BRAND.md; eyes only unless the brand speaks;
one expression at a time; marks and props sit outside the silhouette; the mascot never covers
content, and any idle nudge is rate-limited and quiet (respect a sleep state); reduced motion
means no mount at all, with a still in its place.
