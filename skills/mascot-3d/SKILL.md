---
name: mascot-3d
description: Design and ship an original 3D brand mascot for a website, always built procedurally in three.js - derive the character and its parts from the logo, get concept sheets approved (ChatGPT prompts included), model it with SDFs, give it animated states and wire it into pages with still fallbacks. Use whenever the user wants a mascot, brand character or 3D buddy for a site, says "turn our logo into a character" or "a mascot that reacts to visitors", asks for turnaround, hand or expression sheets, mascot states, a hand rig, SDF modelling, surface nets, a character rendered in a Web Worker with OffscreenCanvas, a floating or docked mascot, or mascot stills and OG images, even if they never say "3D". Also use to debug a three.js mascot (holes in the mesh, fused fingers, a limb through the body, a jump on drag, slow start-up, a Lighthouse drop). A quick 2D mascot goes to brand-identity (Avatar Lab); rebuilding an object from one image goes to img2threejs; three.js API detail goes to threejs-skills.
license: MIT
metadata:
  author: Brimpa
  version: "1.1"
  updated: "2026-10-26"
---

# 3D brand mascot

Design an original character from a brand's mark, get it approved on paper, build it as a
procedural three.js model from the parts its mark calls for, give it a set of named states, and
ship it on a website without hurting load time, accessibility or the content it sits beside.

**One technology, on purpose.** Every mascot in this skill is built procedurally in three.js
(signed distance fields, a small rig, a flat channel object). Focusing on one pipeline is what
lets the toolkit, the templates and the pitfalls list get better with every mascot.

This method was proven on Brimpa's own mascot, which stays private. Nothing here describes or
rebuilds that character: no shape, palette, proportion, part list, state list, code or render of
it is published. What this skill carries is the reusable logic: the procedures, the fixed rules,
the parameter ranges with their failure modes, and fresh generic templates in `assets/templates/`.
Lessons phrased as "a previous production mascot found..." come from that build with its
specifics removed.

Scope boundaries:

- **Out of scope:** a Rive state machine, a GLTF character from a 3D artist, or a 2D studio
  mascot. If a client insists on one of those, it is a different job; `brand-identity`
  (`skills/brand-identity/references/mascot.md`, Avatar Lab) covers the quick 2D route.
- **Stills are not an alternative route.** They are the fallback and performance tier of the
  three.js mascot: rendered from the same preview, shown first, kept for reduced motion, no JS,
  failed WebGL and weak devices (`references/integration.md`, Performance tiers).
- Rebuilding a specific object or character from one reference image: `img2threejs`. Borrow its
  comparison and turntable gates for QA (see Review loop).
- three.js API detail: `threejs-skills`. The templates are written against three r170 and note
  the r186 changes (`Clock` gave way to `Timer`, `RGBELoader` became `HDRLoader`,
  `PCFSoftShadowMap` is deprecated, `envMapIntensity` no longer scales `scene.environment`,
  WebGPU with TSL is the recommended path for custom shaders). Check every API against them.

## When to use

- A brand wants a recurring character for its site that reacts to what visitors do (greets,
  approves, celebrates a sent form, sympathises with an error) and also appears in stills, OG
  images and films.
- The brand mark is geometric (circles, arcs, bars, rounded squares, a dot, a rotation or spacing
  rule), so a character can be built from primitives, and the owner wants to tune it by numbers.
- An existing three.js mascot is broken, slow, covers content or nags.

Not for: brands whose trust depends on gravity (legal, clinical records, payments) unless the
owner insists after hearing the case against; a one-off illustration (use an illustrator); a
character that must be organic and highly detailed (procedural SDFs suit geometric characters).

## How to run this

Fifteen steps. Steps marked "if" run only when the mascot has that part. Rough totals: a
body-and-eyes mascot about 10-18 hours of model work; a full set (arms, hands, legs, feet, an
accent object) about 25-40 hours; plus the owner's review rounds. Budget for at least ten
numbered drafts; a previous production mascot with many parts needed more than twenty.

| # | Step | Estimate |
|---|---|---|
| 1 | Read the identity: mark geometry (SVG or a geometry file), palette tokens, any rotation or spacing rule, voice traits | 30 min |
| 2 | Map the mark's vocabulary to body / face / light / props, **choose the parts** (Parts catalogue) and write both into MASCOT.md | 30-45 min |
| 3 | Concept sheets (`references/concept-sheets.md`): turnaround and expression sheet always; hand sheet if hands; foot sheet if feet | 1-3 h |
| 4 | **Gate: the owner approves the parts list and the sheets in writing. No modelling before this.** | - |
| 5 | Copy `assets/templates/` and set PARTS, the palette (lit variant), sliders and states in the preview | 30 min |
| 6 | Body (always): an SDF per body part, ray-projection meshing at a fine grid, vertex-colour contact shadow | 2-4 h |
| 7 | Lighting and camera, matched to the sheet's viewing angle | 1 h |
| 8 | If arms or legs: tube arms rebuilt per frame, capsule legs, cuffs | 1-2 h |
| 9 | If hands: SDF digits, surface nets, skeleton, skinning, presets (the hardest part) | 4-8 h |
| 10 | If feet or footwear: every layer driven from one outline | 3-6 h |
| 11 | Face (eyes, a mouth only if the mark has one), and if present the accent object and appendages | 0.5-2 h |
| 12 | Channel object built from the chosen parts, hand presets if hands, then `idle` and `wave`. **Owner approves both before any other state** | 1-2 h |
| 13 | Remaining states, each with a fallback for absent parts; if limbs, numeric solving for any pose that reaches across the body | 2-5 h |
| 14 | Extract the engine into a site module; worker mount; float and dock behaviour | 2-3 h |
| 15 | Stills, OG images, the QA checklist, Lighthouse on every page, a real-phone measurement | 2-3 h |

Read `references/concept-sheets.md` at step 3, `references/modelling.md` at steps 6-11,
`references/animation.md` at steps 12-13, `references/integration.md` at step 14 and
`references/pipeline-and-qa.md` at steps 5, 14 and 15.

Working rules for the whole run:

- **One source of truth.** The model lives in the preview page; the site module is generated from
  it by an extractor and never hand-edited (pitfall 8).
- **The owner names parts, you rebuild parts.** Each draft changes the parts the owner named and
  nothing else, then goes through the review loop. Number the drafts and keep a short log: what
  changed, the crop pair that justified it, what the owner said.
- **Numbers over adjectives.** "The toe reads 15% short against the side sheet", not "the shoe
  looks off".

## Parts catalogue

Not every mascot has hands, legs or a glowing orb. The body is the only required part; every
other part is a module chosen at step 2 because the mark or the state list calls for it. Fewer
parts means less build time, a faster start-up and fewer collision checks; a body-only mascot is
a valid, complete design.

| Part | Status | What it lets the mascot do | Adds | Fallback when absent |
|---|---|---|---|---|
| Body | Required | Squash, tilt, hop, yaw toward the pointer, the signature channel | Step 6 | - |
| Eyes | Usual | Gaze, blink, smile shape | Step 11, about 1 h | The body turns toward the pointer; acting by tilt and squash |
| Mouth | Only if the mark has a curve that reads as one | Speech-like beats, a grin | About 0.5 h | Eyes and body carry the acting |
| Arms | Optional | Wave, point, raise both arms | Step 8 | Wave = sway an appendage, else tilt toward the visitor and hop twice |
| Hands (need arms) | Optional | Open, fist, point, thumbs-up, holding a prop | Step 9, 4-8 h | Arms end in rounded tips; marks stand in for gestures |
| Legs | Optional | Standing height, steps, knee bend in a hop | Step 8 | Body rests on the ground or floats; hop = jump + squash |
| Feet or footwear (need legs) | Optional | Grounding, a style detail | Step 10, 3-6 h | Legs end in rounded caps |
| Accent object (a floating orb, a lamp, a spark) | Optional, when the mark's accent maps to light | Glow reactions, a second focus point | About 0.5 h | Nothing glows; the accent colour appears only in marks |
| Appendages (ears, tail, antennae, a stalk) | Optional | Secondary motion; often carries the signature channel | 0.5-2 h each | The signature channel moves the body (tilt, bounce) |
| Props and marks | Optional per state | Tick, question mark, zzz, a held object | About 0.5 h each | Marks stay sprites outside the silhouette either way |

How the choice flows through everything:

- **Channels** are built from the chosen parts (`buildNeutral(parts)` in
  `assets/templates/mascot-runtime.js`); a pose that touches a channel of an absent part fails at
  start-up.
- **States** are written with variants, each listing the parts it requires, ending in a variant
  that needs only the body (`resolveStates`). The five musts must work for any subset.
- **Sheets**: skip the hand sheet without hands and the foot sheet without feet.
- **QA**: the no-overlap check runs only on parts that exist; a mascot with no limbs, props or
  appendages that can swing toward the body has nothing to check.

## Templates

Generic, original implementations of the algorithms in the references, with neutral names and
inline failure-mode comments. Copy them into the project; none of them holds a character.

| File | What it is | Read or copy it when |
|---|---|---|
| `assets/templates/sdf-toolkit.js` | Smooth min, rounded box, tapered capsule with creases, ray-projection mesher, surface nets with gradient winding fix, Laplacian relax, Newton projection, `meshSmooth()` chaining them, contact shade | Building or debugging any geometry (steps 6-11), or a mesh shows holes, seams, fused fingers or pleats |
| `assets/templates/grain-material.js` | MeshPhysicalMaterial with object-space Worley grain via `onBeforeCompile` (colour plus analytic normal bump), `freq` / `bump` / `crease` / sheen / roughness, stable grain for rebuilt tubes | Setting up materials (step 6 on), or grain reads as dimples, lumps or swims |
| `assets/templates/mascot-runtime.js` | Engine-agnostic core: parts catalogue to channels, states with per-part variants, additive `anim(te, p, t)`, exponential easing, crossfade, blink, gaze, click squash, run-time mirror, `poseAt()` | Choosing parts and designing channels and states (steps 2, 12-13); any jump, snap or mirroring bug |
| `assets/templates/mount-worker.js` | OffscreenCanvas worker mount with main-thread fallback, message protocol, first-frame swap from a still, pause when hidden or off screen | Putting the mascot on a site (step 14); slow start-up or a Lighthouse drop |
| `assets/templates/preview.html` | Preview skeleton with switchable parts (`?parts=`), sliders with "Copy values", state buttons, expression-sheet mode, turntable, review views, `window.__mascot` hooks, three from a pinned CDN import map | Step 5, and whenever stills, crop reviews or the no-overlap check need hooks |

Run `node --check` on each `.js` after editing. The preview loads ES modules, so serve the folder
over HTTP (file:// blocks module imports) or inline the modules into the page.

## Review loop: side-by-side crops

The core QA mechanism. On a previous production mascot it was what finally exposed size and
shape gaps that whole-figure screenshots hid.

1. Freeze the render (a freeze hook that stops the clock, the blink and gaze wander).
2. Put the camera at the sheet's angle and framing: front, three-quarter, side or sole.
3. Crop the same region from the reference sheet and from the render, at the same scale (scale by
   a known dimension, usually body width).
4. Place them side by side in one image and judge one part at a time: outline, proportions, then
   joins, then surface.
5. Write the gaps as numbers, fix one part, re-shoot the same crop pair. Keep every pair as
   evidence in the draft log.

Use it for every change, not only at the end. img2threejs ships a comparison-sheet script
(`forge/stage4_review/make_comparison_sheet.py`) and a turntable gate (front, right, rear, left);
both work for a mascot even though its full reconstruction pipeline does not apply to an original
character. Its left/right rule applies too: a pair is a reflection, never a rotation, and
reflecting inverts triangle winding.

## Deriving the character from the brand mark

1. **List the mark's vocabulary**: the distinct shapes in the logo with their geometry (three to
   six is the workable range).
2. **Assign each element to exactly one of body, face, light, props**, and pick the parts from the
   catalogue that those assignments and the state list need. An element that fits nowhere stays
   out. Nothing assigned to face means eyes only; nothing assigned to light means no accent object.
3. **Any rotation rule becomes an animation channel, not a fixed transform** (the signature
   channel): full value for the strongest expression that uses it, about half for a milder one,
   zero at rest. A brand with no rotation rule picks a different signature (a bounce height, a
   squash, a spacing rhythm).
4. **The accent colour owns the one emissive object**, if the mascot has one. Everything else is
   matte.
5. **No mouth unless the mark has a curve that reads as one.** Eyes only forces the body to carry
   the acting, which keeps a simple character readable at dock size.

**Worked example (fictional).** A bakery whose mark is a circle, a wheat stalk leaning 15 degrees
and a small dot in the accent colour.

| Element | Geometry | Role | Becomes |
|---|---|---|---|
| Circle | Fills most of the mark | Body | A round bun body, slightly wider than tall |
| Wheat stalk | Thin, leaning 15 degrees | Body (an appendage) | A stalk sprouting from the top of the head |
| 15-degree lean | A rotation rule | Signature channel | `sway`: 0 at rest, half in `thinking`, full in a `confused` state |
| Dot | Small, accent colour | Light | The glowing tip of the stalk, the only emissive part |
| (no open curve) | - | Face: nothing | Eyes only, no mouth |

Parts: body, eyes, appendage (stalk), accent object. Arms with hands and short legs are optional
here: the owner adds them only if waving and standing read better on the sheets; without arms,
`wave` becomes a sway of the stalk. Had the circle carried a bite-shaped cut, that cut could have
become a mouth. The preview template ships this placeholder (switch parts with `?parts=`); replace
it with your brand's mapping.

### Identity rules

Fixed for every brand (write them into the plan and enforce them in QA):

- One expression at a time. No blended expressions, only a crossfade from one state to the next.
- Marks (question mark, ticks, sparks, zzz) live outside the silhouette as sprites, never drawn on
  the body.
- If the mascot has an accent object, it is the only light it owns; otherwise nothing glows. No rim
  glow, no emissive body.
- No limb, appendage or prop enters the body volume in any pose (checked numerically for the parts
  that exist, see `references/animation.md`).
- Never covers content; any attention behaviour is rate-limited and quiet (see Attention nudge).

Parametrised per brand: the parts list, palette offset, proportions, the state list and its
fallbacks, digits on the hand (if hands), the signature channel, placement, dock size and the
nudge policy.

## Palette: the lit variant

Render the mascot in a **lit variant** of the brand tokens, deliberately a little warmer and
lighter than the tokens themselves. A mascot in the exact page colours sinks into a page built on
those colours; the offset is what separates it from the background. A previous production mascot
settled on this after the exact tokens made it hard to read against its own site.

- Mix each body (and limb) colour about 6-12% toward a warm white (for example `#fff3e0`), or raise
  lightness 2-5 points and nudge hue a few degrees warmer. The preview template does the mix in
  one place (`LIT_MIX`).
- Keep the accent object, if any, on its exact token; its emission already lifts it.
- Check the result on the light and dark themes at dock size, against the actual section colours.
- **Record the decision in BRAND.md**, so later work does not "fix" the drift back to the tokens:

```markdown
### Mascot render palette (lit variant)
Offset: body and limb colours mixed {8}% toward {#fff3e0}; accent object (if any) on its exact token.
Reason: the exact tokens blend into the site's own backgrounds; the lit variant separates the mascot.
Approved by {owner} on {date}. Check on both themes before changing either the tokens or the offset.
```

## Proportions

- **Body: tune live, then lock.** Expose the body proportions as preview sliders, tune them with
  the owner at real dock and hero sizes, then press "Copy values", bake them as defaults, hide the
  sliders and record the values and date in the plan. Image generators drift body proportions
  between views, so the sheet is a guide for the body, not a ruler.
- **Hands and feet (if present): measure off the sheets.** They are small, detailed and judged up
  close; take finger length, width, spacing, thumb root, sole thickness and toe shape from the
  hand and foot sheets (`references/concept-sheets.md`, section 5).
- **Fingers (if hands) are a per-brand parameter.** Start from three fingers plus a thumb: it reads
  clearly at dock size and leaves room between digits. Four fingers plus a thumb is supported,
  with a caveat: on the same palm each finger gets thinner and the gaps narrower, so fingers fuse
  unless the blend width stays near 0.004 units, the gap between neighbours stays visible (centre
  spacing well above twice the finger radius), and the surface-nets step shrinks to keep two or
  more samples across each gap (cost grows eight-fold per halving). Render the four-finger hand at
  dock size before committing.

## Concept sheets

Sheets come before code. Without a turnaround you cannot settle depth; without a hand sheet the
hand is guesswork. Minimum set: body turnaround and an expression sheet of the five must-have
states always; a hand sheet if the mascot has hands; a foot or shoe sheet if it has feet. A
previous production mascot's sheets were made with ChatGPT image generation;
`references/concept-sheets.md` has a prompt template for each sheet with explicit brand and parts
placeholders, consistency tactics (upload the logo and the approved turnaround as references,
one chat thread, neutral grey background, orthographic labelled views, a measurement grid), how
to iterate, and how to take numbers off the result.

## Attention nudge (owner's choice)

Default, as chosen by the owner of the previous production mascot: a small nudge (a glance, a
short wave or, without arms, a tilt-and-hop toward the content) after about 9 s with no input, at
most once every 22 s. It keeps a docked mascot from feeling dead. The trade-off is real: nine
still seconds is often reading, and a nudge then pulls the eye away. Keep the default only with
all of these limits:

- rate-limited (about 22 s minimum between nudges) and capped per page (a few at most);
- never while a form field has focus, the visitor is typing, a dialog is open or the mascot is
  tucked; never under reduced motion;
- small motion only: no bubble, no sound, no mark;
- any input resets the timer.

Alternative for brands that want zero risk of nagging: trigger only on visitor actions (a section
entered, a scroll distance, a hover on the primary button, a sent form) and keep sleep as the only
idle behaviour. Record which policy the brand chose in the plan.

## Output: the mascot plan

Write this to `MASCOT.md` (or `assets/brand/mascot/README.md`) during steps 1-4; the owner approves
it together with the sheets, and it is updated at every later gate.

```markdown
# Mascot plan: {name}
Build: procedural three.js (SDF); stills as the fallback and performance tier
Vocabulary mapping: {element -> role}, ...   Signature channel: {channel, value at full}
Parts: body + {eyes | mouth | arms | hands | legs | feet/footwear | accent object | appendages: ... | props}
  Left out on purpose: {parts} because {reason}
Identity rules: the five fixed rules + {brand-specific additions}
Palette: lit variant, offset {n}% toward {colour} (recorded in BRAND.md on {date})
Proportions (units: half body width = 1.0): body {w x h x d}, tuned with sliders and locked on {date};
  hands and feet (if any) {numbers}, each with the sheet panel it came from
Hand (if any): {3 | 4} fingers + thumb.  Footwear (if feet): {yes/no}
States: idle, wave, happy, success, error + {optional}, each with its trigger and its fallback for absent parts
Attention: {time-based nudge ~9 s, max 1 per ~22 s, with limits | action-based only}
Placement: {hero stage on which pages}; dock {side, size desktop / phone}
Budget: stills always; live model only when {device bar}; must not block LCP
Fallbacks: reduced motion, no JS, WebGL failure, worker failure, weak device -> stills
Licence: code {licence}; character, config and renders reserved by {owner}
Approved: {owner} on {date} (parts list; sheets: {list}); idle + wave approved on {date}
```

## Parameters a new brand supplies

| Parameter | Recommended range or start | Failure mode outside it |
|---|---|---|
| Parts | Body plus only what the mark and the states need | Parts "because mascots have them": more build time, more collisions, a busier silhouette |
| Palette roles | ground, ink, one mid-tone, one accent; lit offset 6-12% | 0%: the mascot blends into the page; over about 15%: off-brand |
| Mark vocabulary | three to six elements, with geometry | Two: too little to build from; seven or more: a cluttered character |
| Signature channel | Full value = the mark's own angle or rhythm | A fixed transform instead of a channel: no acting range |
| Body | Tuned with sliders, then locked; depth about 0.5-0.8 of width for a blocky body | Too shallow: reads as a card from the side; too deep: a crate |
| Digits (if hands) | Three fingers plus a thumb; four supported | Four on a small palm with a coarse grid: fused mitten |
| States | The five musts first, each with a body-only fallback | Optional states before idle and wave are approved: rework |
| Dock | 120-160 px desktop; 96-120 px below about 760 px | Larger covers text and form fields on phones |
| Surface grain | `freq` about 35-50 on large surfaces, 100-150 on small parts; `bump` under 0.04 | See `references/modelling.md` |

## Anti-patterns and pitfalls

The ten that cost a previous production mascot the most time, in build order (the part-specific
ones apply when the mascot has that part):

1. **Modelling before the sheets are approved.** Every hour of geometry before the gate is spent twice.
2. **Not fixing triangle winding against the field gradient after surface nets.** The mesh looks
   fine from the front and shows holes from the side (a "torn hand").
3. **Smoothing ray-projected (sculpt) output.** Laplacian relaxing opens the box-face seams as
   visible lines. Smooth surface-nets meshes only.
4. **Blend radii too large (hands).** Fingers fuse into a mitten above a smooth-min width of about
   0.015 units; keep finger-to-finger blends near 0.004 and the gap between fingers visible.
5. **Switching cross-section radius across a narrow band.** It prints as a diagonal crease where a
   seam meets the outline. Blend over a wide band, or use one radius.
6. **Building geometry on the main thread.** About 2 s on a desktop became about 13 s of blocking
   under Lighthouse's simulated mobile CPU and cost about 30 performance points. Use a worker with
   OffscreenCanvas from the start.
7. **GSAP Draggable on a `position: fixed` layer.** It adds `scrollY`, so the mascot jumps on
   drag. Use plain pointer events (GSAP is still fine for the bubble and scroll cues).
8. **Hand-editing the generated site module.** The next extract silently reverts it. Site-only
   behaviour belongs in the extractor's replacement list.
9. **Focusable controls inside an `aria-hidden` figure.** Hides a working control from assistive
   technology and costs Lighthouse accessibility points. Put buttons beside the figure.
10. **A time-based nudge without limits.** A nudge on a timer is a legitimate owner's choice (see
    Attention nudge), but without a rate limit, a per-page cap and the focus, typing and
    reduced-motion exclusions it pokes people who are reading and breaks "never nags". Ship the
    limits with the timer, or use action-based triggers.

Also avoid: parts added by habit (hands, legs, an orb) that the mark does not call for; a state
that silently does nothing because its only variant needs a missing part; a mouth or blended
expressions "for more personality"; marks painted on the body; a second emissive surface; the
mascot in the exact token colours; mounting the live model on every capable browser by default;
shipping without stills; a hero-size mascot that pushes the headline below the fold on a phone.

## When the user pushes back

- **"Skip the sheets, start modelling."** The gate is the cheapest hour in the project; on a
  previous production mascot every late geometry decision was settled against a sheet. Offer a
  1-3 h sheet round with the ChatGPT prompts.
- **"Every mascot needs hands and legs."** Not this one unless the mark or the states call for
  them. Show the body-only fallbacks on the expression sheet (wave as a tilt-and-hop, success as a
  hop with a tick); add a part only if the owner prefers it on the sheets.
- **"Let's do it in Rive / get a 3D artist / use a 2D avatar tool."** Out of scope for this
  skill: it builds every mascot procedurally in three.js so the pipeline improves with each one.
  A 2D studio mascot is the quick route in `brand-identity`; anything else is a separate project.
- **"Make it nudge people after a few seconds."** Fine as a choice: use the default (about 9 s, at
  most once per 22 s) with the limits in Attention nudge, and offer action-based triggers as the
  zero-nag alternative.
- **"Use our exact brand colours."** Show both on the real page; the lit variant separates the
  mascot from backgrounds built on the same tokens. Record whichever the owner picks in BRAND.md.
- **"Keep the 150 KB budget."** Not reachable for the live model: a production three.js worker
  chunk was about 141 KB gzipped on its own. The budget's real intent is "do not block LCP"; meet
  that with stills first and lazy loading after first paint. If the number is contractual, ship
  the stills tier only and keep the live model for later.
- **"Show it on every device."** Default to stills; mount the model only when the device clears a
  capability bar, and measure on a real phone before widening the bar.
- **"Give it a mouth / blend happy and thinking."** Eyes only and one expression at a time are what
  keep it readable at dock size. A mouth is fine if the mark has a curve that reads as one.
- **"Make it bigger on mobile."** It may never cover text or a form; the dock shrinks under about
  760 px and can be tucked away.
- **"Just copy Brimpa's mascot."** It is private and not in this repo. Derive your own character
  from your mark; the templates carry all the reusable logic.

## Hand-offs

| Need | Skill |
|---|---|
| Brand tokens, voice traits, the quick 2D Avatar Lab mascot (a different job), "should we have a mascot", recording the lit-variant offset in BRAND.md | `brand-identity` |
| Where the stage and dock sit in the page composition; the page's motion moment | `web-design` |
| Premium pages: one signature moment per page, so the mascot is either that moment or stays docked and quiet | `luxury-web-design` |
| Accessibility, never covering forms or primary actions, bubble text as UX copy | `ui-ux` |
| Current three.js API (r186), shadows, TSL shaders, performance tooling | `threejs-skills` |
| Rebuilding an object from one reference image; comparison sheets and turntable gates | `img2threejs` |
| Scroll cues for section states (ScrollTrigger), bubble entrances; never Draggable on a fixed layer | `gsap-skills` |
| The mascot in a launch film or social clip (deterministic frames from the preview) | `launch-video` |
| Hint lines and launch copy in the brand voice | `launch-marketing` |

## Reference index

- `references/concept-sheets.md` - read this at step 3: ChatGPT image prompt templates for the
  turnaround, hand, foot and expression sheets (by chosen parts), consistency tactics, iteration
  and measuring.
- `references/modelling.md` - read this when building or debugging geometry, materials, lights or
  the camera (steps 6-11): the SDF toolkit with ranges and failure modes, the parts catalogue in
  geometry terms, the grain material, the light and camera rig.
- `references/animation.md` - read this when designing the channel object from the parts, hand
  presets, states and their fallbacks, the per-frame update, mirroring or the no-overlap check
  (steps 12-13).
- `references/integration.md` - read this when putting the mascot on a site (step 14): page
  contract, worker mount and fallback, float and dock ranges, the nudge policy, accessibility,
  performance tiers including stills, bundle facts.
- `references/pipeline-and-qa.md` - read this when setting up the preview and extractor, rendering
  stills and OG images, or running QA and the real-phone measurement (steps 5, 14, 15).
- `references/sources.md` - read this for provenance, the privacy boundary, template licence and
  the owner decisions this version encodes.
