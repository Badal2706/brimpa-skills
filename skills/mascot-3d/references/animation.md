# Animation: channels, hand presets, states, per-frame model, mirroring

How a procedural mascot is posed and animated without a keyframe editor. Everything here is
implemented in `assets/templates/mascot-runtime.js` (engine-agnostic; it reaches the scene graph
through an adapter). Ranges are recommended sanity ranges, not any one character's values. For the
three.js skeleton and skinning API (r186), see `threejs-skills` (animation).

Contents

1. The flat channel object
2. Hand presets
3. The state schema
4. The per-frame model
5. States: the five musts and the optional ones
6. Building a new state in under an hour
7. The no-overlap check
8. Mirroring

---

## 1. The flat channel object

Keep the whole pose in **one flat object of numeric channels**, built from the parts the mascot
has (`buildNeutral(parts)`): about 6 channels for a body only, 15-20 with eyes, 40-60 with arms,
hands, legs and an accent object. Flat is the
point: every channel can be eased, crossfaded, summed with an animation delta and mirrored by name
without walking a tree. A pose is a partial object that overrides the neutral one.

Typical groups and sane ranges (include a group only if the mascot has that part):

| Group | Channels | Typical range |
|---|---|---|
| Eyes (usual) | happy (smile shape), closed | 0..1 |
| | horizontal and vertical scale, left and right | 1 neutral; about 0.7..1.2 |
| | rotation left and right, lift | a few tenths of a radian; a few hundredths of a unit |
| Gaze | look x, look y | -1..1; drives eye offset, body yaw (up to about 0.3 rad) and pitch (under 0.1 rad) |
| | follow | 1 follows the pointer; 0 holds the pose's own look values |
| Body (always) | the signature channel, tilt, yaw, pitch | radians; the signature channel's full value = the mark's own angle |
| | jump, shift | body units; small negative to about 0.3 |
| | squash | multiplier, 1 neutral; the only channel the animation multiplies rather than adds to |
| Arms, per side (optional) | out, forward, elbow bend, elbow twist | radians; out up to about 2.8 (arm overhead), forward up to about 1, bend up to about 1.7 |
| | shoulder slide forward and inward | 0..0.3 units |
| Hands, per side (optional) | curl, index, thumb, spread, twist, rotation | set by presets (section 2) |
| Legs, per side (optional) | forward, out | forward about ±0.8 rad; out 0..0.15 rad |
| Accent object (optional) | offset x, offset y, glow, ring, scale | offsets about ±0.3 units; glow and ring 0..1; scale 1..1.25 |

Name channels so the side is a consistent suffix (`armOutL` / `armOutR`): mirroring is done by
renaming (section 8), and the runtime validates that every state only sets channels that exist,
so a pose that moves a part the mascot does not have fails at start-up. Appendages (ears, tail,
stalk) get their own channels, often the signature channel. A mascot without eyes can still turn
toward the pointer: give the body `lookX` / `lookY` / `follow` channels.

## 2. Hand presets (if the mascot has hands)

Five or six named presets usually cover every pose: open, relaxed, fist, point, thumb (up), grip.
A pose names a preset per hand (`hands: { L: 'open', R: 'point' }`); the runtime expands the name
into the hand channels before easing, so hands crossfade like everything else. Add a preset only
when two or more states would use it.

## 3. The state schema

One record per state:

| Field | Purpose |
|---|---|
| `id` | The API key pages use (`setState('happy')`) |
| `label` | Human name shown on the expression sheet |
| `trigger` | Documentation: the visitor action that causes it |
| `notes` | Documentation strings describing intent per area (eyes, body, accent, marks) |
| `pose` | Partial channel object plus the two hand preset names (if hands) |
| `variants` | Optional: a list of `{ requires: [parts], pose, anim, props }`; the first whose parts all exist wins (`resolveStates`). End with a variant that needs only the body |
| `props` | Names of sprites (marks) shown in this state |
| `anim(te, p, t)` | Writes additive deltas into `p` each frame; `te` is seconds since the state was entered, `t` is clock time |

Keep the documentation fields even though the code never reads them: the preview's expression
sheet renders them, and they are the only place the intent of a pose is written down. They must
match the code; a previous production mascot shipped a sleep trigger documented with one timeout
and coded with another, so check for that drift in QA.

## 4. The per-frame model

Each frame:

1. **Ease every channel toward the target** with a frame-rate-independent factor:

   ```js
   const k = 1 - Math.exp(-dt * rate);   // rate about 5-8 for channels, 5-7 for prop visibility, 3-5 for body yaw
   p[c] += (target[c] - p[c]) * k;
   ```

   Clamp `dt` (about 0.1 s) so a tab that was hidden does not snap the pose on return.
2. **Crossfade animation deltas.** On a state change, evaluate both the old and the new state's
   `anim` for a fade window (0.4-0.6 s) and blend them with a smoothstep, so a wave does not snap
   mid-swing.
3. **Blink.** Schedule the next blink 2.5 to 6 s ahead at random; each lasts about 0.15 s with a
   half-sine shape. Skip it when the eyes are already closed or smiling.
4. **Pointer follow.** When `follow` is on, the body yaws by the pose's yaw plus look x times about
   0.3 rad, pitches by look y times under 0.1, and the eyes slide a few hundredths of a unit. The
   pointer is in screen space and is never mirrored.
5. **Gaze wander.** If the pointer has been still for about 2.5 s, pick a random gaze and change it
   every 2 to 4.5 s. This is what stops the mascot looking dead on a touch device.
6. **Click squash.** A damped sine on the squash channel for about 1 s after a click:

   ```js
   const sq = u < 1 ? -0.2 * Math.sin(u * 18) * Math.exp(-u * 5) : 0;  // u = seconds since click
   ```

Keep `anim` amplitudes under about 0.1 rad; larger loops read as frantic at dock size. A `freeze`
hook stops the clock, the blink and the wander for stills and crop reviews; `seek(t)` plus a seeded
random makes film frames deterministic.

## 5. States: the five musts and the optional ones

Every must-have state works with any subset of parts. Write the full version first, then the
fallbacks down to the body alone (`MUST_HAVE_STATES` in the runtime template has starting points):

| State | Typical trigger | With limbs and eyes | Fallback without the part |
|---|---|---|---|
| idle | Default | Breathing squash, relaxed arms, blink, gaze | Body only: breathing squash and a slow signature-channel drift |
| wave | First paint (once per visit) | One arm waves, happy eyes | No arms: sway an appendage; no appendage either: tilt toward the visitor and hop twice |
| happy | Hover or focus on the primary button | Happy eyes, small hop, open hands, accent brighter | No eyes: quicker hop and a squash; no accent: no glow change |
| success | Form sent; a task completed; recovered from a 404 | Both arms up, hop, tick mark, accent flare | No arms: double hop with a squash and the tick mark |
| error | Send failed; 404 | Looks down, droops, accent dims | No eyes: pitch forward and squash down |

Optional states:

| State | Typical trigger | Keep for any brand? |
|---|---|---|
| thinking | Typing in a form | Strong |
| explaining | Scrolled into a product or feature section | Strong |
| typing | Form sending | Optional (needs a prop) |
| confused | Field validation failed (signature channel at full value) | Optional |
| idea | Opened a case study or an article | Optional |
| excited | Clicked the primary action | Optional |
| sleeping | Long inactivity (60-90 s) | Optional, cheap, and the one idle behaviour that removes motion |

The five musts cover the whole feedback loop: present, greeting, approval, success, failure. Get
`idle` and `wave` approved by the owner before building any other state. Never map a celebratory
state to an error or a destructive confirmation.

## 6. Building a new state in under an hour

1. Copy the nearest existing pose, and decide its fallback variants for the parts this mascot may
   not have.
2. With the preview live, move one arm channel at a time; keep `follow` at 0 unless the gaze should
   track the pointer during this state.
3. Set the hand presets, then the eye channels, then the accent object.
4. Add the `anim` sine last, with amplitudes under about 0.1 rad.
5. Run the no-overlap check (section 7) on the target pose and on the extremes of the `anim` loop
   (`poseAt(id, te)` evaluates any moment without easing).
6. Crossfade into it from at least two other states and watch for limbs passing through the body
   mid-fade.
7. Render it on the expression sheet and do a side-by-side crop against the expression sheet panel.
8. Write the `trigger` and documentation strings.

## 7. The no-overlap check

No limb, appendage or prop enters the body volume in any pose. Check it numerically, not by eye,
and only for the parts that exist: a body-only mascot (or one whose parts cannot reach the body)
has nothing to check, and the probe should say so rather than report a pass.

- Expose a preview hook that, for a pose, samples points along each arm and hand and reports the
  minimum of the body field over them minus the limb radius (the clearance). The preview template
  has a starting version (`window.__mascot.clearance(id)`).
- Require a clearance of at least about 0.02 units.
- For any pose that reaches across the body (pointing at the other side, hand on chest), solve the
  arm channels numerically: a small search that moves the arm channels until the palm reaches a
  target point while the clearance stays above the minimum. On a previous production mascot about
  a third of the poses were solved that way rather than by eye.
- Re-check during crossfades: two clear poses can collide halfway between them.

## 8. Mirroring

A docked mascot should point into the page: on the right edge it points left, and the reverse.
Do not author mirrored copies of every state; mirror at run time (`setMirror(true)`):

- A **swap map** pairing every left channel with its right counterpart, built from the naming
  convention (the runtime swaps the `L`/`R` suffix).
- A **negate list** for channels whose sign flips under reflection: look x, tilt, the signature
  channel if it is a lean, yaw, accent offset x, body shift, and the two eye rotations.
- A **prop map** for handed sprites (a hand-held tick swaps for its left-hand version), and a
  no-flip list for sprites that already come as a left/right pair. Other sprites negate their x
  position in the adapter.
- Apply the mirror to the target pose, to the `anim` delta and to the hand preset names, so a state
  that is animating mirrors correctly mid-swing.

The mirror is site behaviour, not preview behaviour: inject or enable it in the site module. Only
channels are mirrored, so meshes are untouched; if you ever mirror geometry itself, remember that
a reflection inverts triangle winding.
