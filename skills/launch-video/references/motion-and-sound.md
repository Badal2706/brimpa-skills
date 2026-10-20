# Motion and sound

Contents

1. Easing table
2. Duration table
3. Camera: push-in, follow, settle, hand-held
4. Cursor and hover ring
5. Text size rule (26 px after zoom)
6. Continuity: how a beat grows out of the last
7. Web Audio: busses, reverb, scheduling
8. SFX recipes by event type
9. Music bed at 120 bpm
10. Mix settings, ducking and loudness

All motion values are functions of `t` (see `render-pipeline.md`). The helpers assumed below:
`seg(t, a, b, ease)` returns eased progress 0..1 through the window `[a, b]`; `lerp(a, b, p)`;
`hash(frame, salt)` for frame-stable noise.

## 1. Easing table

| Move | Easing | Formula | Why |
|---|---|---|---|
| Entrances (type, cards, windows, logo) | outExpo | `1 - 2^(-10x)` | Arrives fast, lands softly; the CSS equivalent `cubic-bezier(0.16, 1, 0.3, 1)` |
| Camera moves, cursor travel | inOutCubic | `x<.5 ? 4x^3 : 1-(-2x+2)^3/2` | Symmetric acceleration reads as a hand on a dolly, not a snap |
| Pops, bars, counters landing, badge bumps | outBack (s = 1.70158) | `1+(s+1)(x-1)^3+s(x-1)^2` | A single overshoot of about 10% sells weight; keep it for things that "arrive" |
| Exits | outExpo over a shorter window, or inCubic | | Exits are faster than entrances; the eye is already elsewhere |
| Loops (float, breathing glow) | sine | `0.5 - 0.5*cos(2*pi*t/period)` | Seamless; no visible restart |

No bounce or elastic easing by reflex: it reads as dated. outBack is the only overshoot in the
film and it is reserved for pops and bars.

Kinetic type: squash and stretch on landings (scale x 1.06 / y 0.94 at impact, back to 1 over
120 ms with outExpo). Masked word reveals: clip to the line box and slide the glyphs up from
+110% with outExpo, staggered 40-60 ms per word.

## 2. Duration table

Durations in a film are longer than in a product UI because the viewer is not waiting on them, but
the same ladder applies: the smaller the meaning, the shorter the move.

| Purpose | Duration | Film examples |
|---|---|---|
| Immediate feedback | 100-150 ms | Cursor press squash, click ripple, key tick flash |
| Routine state change | 150-300 ms | Hover ring on (240 ms) / off (220 ms), toggle, badge bump |
| Layout, overlay, view change | 300-500 ms | Card slides into a column, drawer opens, counter run-up start |
| Authored focal entrance | 500-800 ms | Product window rising in 3D, headline reveal |
| Film-only set pieces | 0.8-2 s | Chaos implosion to a dot, dot-to-logo morph, riser into the reveal |
| Camera push-in / settle | 600 ms in, 800 ms out | One per action |
| Counter run-up | 1.0-1.6 s | Revenue, visitors; ends with an outBack landing |

Exit faster than entrance. If a move is long enough to feel like latency in a UI, it is only
justified in the film when it is the focal moment of that beat.

## 3. Camera: push-in, follow, settle, hand-held

- **One camera move per action.** When the cursor fills a form field or drags a card, push in
  about 2x on that spot, follow the cursor with a 0.1 s lag, then settle back out. Two push-ins in
  one beat feel like a search.
- **Why:** the zoom tells the viewer where to look. Without it a 1080p UI is tiny text on a big
  screen, and nothing passes the phone test.
- Camera scale is interpolated with inOutCubic from 1 to 2 over about 600 ms starting 300 ms before
  the action; settle back over about 800 ms after the action ends.
- Camera target = cursor position at `t - 0.1`, blended toward the cursor by the zoom amount, so a
  wide shot stays centred and a close-up tracks the hand.
- **Hand-held float:** a constant +/-3 px drift (`(hash(frame, salt) - 0.5) * 6`, smoothed by
  averaging three neighbouring frames, or a slow sine pair) so the camera never feels locked off.
  Apply it in camera space before the scale, so it is +/-3 px at 1x and +/-6 px at 2x.
- **Camera shake** (Problem act only): amplitude 8-14 px decaying with outExpo over 400 ms on each
  impact. Never during typing.
- **Finish:** 6% grain (per-frame hash, 2-3 px blocks, `globalAlpha 0.06`) and a soft radial
  vignette drawn in screen space after the camera transform, so they do not zoom with the picture.

## 4. Cursor and hover ring

- Path: eased with inOutCubic, with a slight arc (sine bump of about 24 px perpendicular to
  travel). Straight-line cursors look robotic.
- Motion-blur ghosts: draw the cursor at `t - 1/FPS` and `t - 2/FPS` at 30% and 15% alpha during
  moves longer than 300 px.
- Press: squash to 0.85 for 120 ms on mouse-down; click ripple expanding from 0 to 36 px radius
  over 250 ms, alpha 0.5 to 0.
- **Hover ring:** an accent-coloured ring around whatever the cursor is about to touch. Draws on
  over 0.24 s (outExpo, stroke length 0 to 100% around the element) starting when the cursor is
  within 60 px, and off over 0.22 s after the click. It is the pre-echo that lets the viewer predict
  the action.
- Drag: pickup lifts the card (scale 1.04, shadow blur x2, tilt 2-3 degrees in the drag direction)
  over 150 ms; during drag the card lags the cursor by 40 ms; drop lands with outBack over 300 ms.
- Typing: one character per keystroke at 12-16 characters per second with +/-20% jitter from
  `hash`, caret blink at 1 Hz synced to `t`.

## 5. Text size rule (26 px after zoom)

Anything the voice names, and every caption, must be at least 26 px tall as rendered on the
1920x1080 frame after the camera scale is applied.

- Rendered size = font size in canvas units x camera scale. A 14 px field label is 28 px at a 2x
  push-in and passes; the same label in the wide shot does not, so the voice must not name it
  while the camera is wide.
- Check it mechanically: for each voice line, find its beat window, sample the camera scale at the
  start of the line, and assert `fontPx * scale >= 26` for the named element. Print a table; fix by
  pushing in further or holding the push-in longer, not by shrinking other text.
- Vertical cut: keep text out of the top 250 px and bottom 350 px; close-ups go to 2.5-3x; re-run
  the check.
- Captions use the brand font at a weight one step heavier than the UI text (light-on-dark loses
  apparent weight).

## 6. Continuity: how a beat grows out of the last

The anti-slideshow rule in practice. Every transition hands one element forward:

| From | To | Carry |
|---|---|---|
| Chaos (paper, calls, windows) | Logo | Everything implodes into one dot; the dot morphs into the logo mark |
| Logo | Product window | The logo shrinks into the window's top-left app icon as the window rises in 3D (perspective tilt 12 degrees to 0) |
| Form submitted | Pipeline | The submit button's card detaches and arc-flies into the first column |
| Card dragged to Done | Client-facing view | A pulse travels along a line from the card to the other panel, which updates live |
| Dashboard counter | Payoff lines | The rising bar becomes the baseline the payoff words stand on |
| End card | Opening | Logo collapses back to the dot that opened the film, so it loops |

Hard cuts are allowed when they mean something (the slam from pain to the solution's calm), never
as a default. Scene functions overlap by about half a second so both can draw during the hand-off.

## 7. Web Audio: busses, reverb, scheduling

Everything is synthesized inside the film file from the same `EVENTS` list that drives the cursor,
so a timing change moves the sound with it; stock music cannot follow your cursor. One graph
builder serves live playback (`AudioContext`) and export (`OfflineAudioContext`).

- Busses: `sfx` and `music` gain nodes into a master `DynamicsCompressor` used as a safety limiter
  (threshold -3 dB, knee 0, ratio 20). SFX bus about -6 dB, music bus about -10 dB before the voice
  mix; the voice is added later in ffmpeg.
- **One shared reverb room:** a `ConvolverNode` with a generated impulse (stereo, 1.6 s,
  exponentially decaying noise, slightly low-passed), fed from a send gain of about 0.18 on both
  busses. One room is why disparate synthesized sounds feel like one space.
- Scheduling: each recipe takes `(ctx, bus, event)` and schedules with absolute times
  `ctx.currentTime + (event.t - tLiveStart)` live, or plain `event.t` offline. Live playback uses a
  0.25 s look-ahead so sounds are queued before they are due.
- Shared helpers: `noise(ctx, seconds)` (white-noise `AudioBuffer`), `env(gainParam, at, attack,
  hold, release, peak)` (linear attack, exponential release to 0.0001), `tone(ctx, type, f0, f1,
  dur)` (oscillator with an exponential frequency ramp).

All recipe values below are starting points; tune by ear against the picture.

## 8. SFX recipes by event type

| Event | Recipe (starting point) | Gain |
|---|---|---|
| Cursor move (`move`, `drag` travel) | Noise -> band-pass sweeping 1200 -> 600 Hz, Q 1, over the move; envelope attack 20 ms, release 120 ms; peak scales with distance (0.04 at 200 px, 0.12 at 1000 px) | 0.04-0.12 |
| Click (`click`) | Down: 8 ms noise burst through high-pass 2 kHz plus a 180 Hz sine thump decaying over 30 ms. Up, 70 ms later: same at 60% | 0.35 |
| Key tick (`type`, per character) | 6 ms noise burst, high-pass 3 kHz, plus a 15 ms sine at 2.2-2.8 kHz (pitch from `hash(charIndex)`); every 4th-6th key slightly louder | 0.15 |
| Drag pickup | Sine chirp 300 -> 500 Hz over 80 ms, plus a soft 20 ms noise tap | 0.25 |
| Drop | Sine 500 -> 200 Hz over 60 ms, plus a 120 Hz thump 80 ms; send to reverb | 0.3 |
| Notification ping (`ping`) | Two sines, 1320 Hz and 1980 Hz (a fifth above), 400 ms exponential decay, second partial at 40%; strong reverb send | 0.2 |
| Counter tick (`count`, per step) | 4 ms noise, high-pass 4 kHz; schedule one tick per visible digit change, capped at 25 per second; a final outBack "land" uses the Drop recipe at 50% | 0.06 |
| Whoosh (transitions) | Noise -> band-pass sweeping 200 -> 2000 -> 400 Hz over 450 ms, bell-shaped gain, slight stereo pan across the move direction | 0.25 |
| Riser (before the reveal) | Noise -> band-pass 200 -> 6000 Hz over 2 s, gain crescendo from 0 to 0.3 with inOutCubic; cut hard at the hit | up to 0.3 |
| Boom (on the reveal) | Sine 55 -> 30 Hz over 1.2 s with exponential decay, plus a 60 ms noise burst low-passed at 200 Hz; long reverb tail | 0.6 |
| Paper (Problem chaos) | Noise -> band-pass 3-5 kHz, amplitude modulated by `hash` at 20-40 Hz, 150 ms bursts | 0.1 |
| Phone ring (Problem chaos) | Sines 440 Hz + 480 Hz, 20 Hz amplitude modulation, 1 s on / 2 s off; pan left or right per phone | 0.12 |
| Glitch burst (where the picture glitches) | 30-80 ms slices of a square wave at 80-200 Hz alternating with bit-crushed noise (sample-and-hold every 8-16 samples), stutter pattern from `hash` | 0.25 |
| Logo glint sweep | Short sine 4 kHz -> 6 kHz over 200 ms with reverb, synced to the glint crossing the mark | 0.12 |

Rules of thumb: every visible action has a sound and every sound has a visible cause; the same
event type always uses the same recipe so the ear learns the vocabulary; nothing louder than the
boom; during the voice, SFX sit under the duck.

## 9. Music bed at 120 bpm

Starts at the reveal (Solution act), fades in over one bar, runs to the end card and fades out
with the collapse to the dot. At 120 bpm a beat is 0.5 s and a bar is 2 s.

- Kick on every beat: sine 150 -> 40 Hz over 150 ms, exponential decay, gain 0.5.
- Hats on the off-beats: 30 ms noise burst, high-pass 7 kHz, gain 0.08; open hat (120 ms) on the
  last off-beat of every second bar.
- Clap on beats 2 and 4: three 10 ms noise bursts 12 ms apart, band-pass 1.5 kHz, 150 ms reverb
  send, gain 0.2.
- Bass: eighth notes, triangle or saw through a low-pass at 300 Hz, root on beats 1-2, fifth on
  beats 3-4, one chord change per 4 bars; gain 0.25.
- Optional pad under the CTA: two detuned saws through a slow low-pass, gain 0.08, enters at the
  first payoff line.
- Lay the structure on the beat sheet: an 8-bar section per act, a fill (hat roll) into the CTA.
- Leave room for the voice: no melodic lead; the bass and kick carry it.

## 10. Mix settings, ducking and loudness

| Stage | Setting |
|---|---|
| Voice | High-pass 80 Hz (removes rumble and plosive thumps); compressor threshold -20 dBFS, ratio 3:1 |
| Music + SFX bed | Gain 0.8; side-chain ducked under the voice: threshold 0.025, ratio 5, attack 25 ms, release 380 ms |
| Master | loudnorm I = -14 LUFS, TP = -1.5 dBTP, LRA = 11 |

- The duck is fast in (25 ms) so the first syllable is clear and slow out (380 ms) so the bed
  breathes back instead of pumping. Threshold 0.025 (about -32 dBFS) means even quiet consonants
  hold the bed down.
- -14 LUFS integrated with a -1.5 dBTP ceiling is the level the major social platforms normalise
  to as of Oct 2026; master above it and the platform turns the film down, below it and it sounds
  weak next to the next clip.
- Verify with a `loudnorm` measurement pass and write the measured values into the delivery note
  (target reached when integrated is within 0.5 LU of -14 and true peak is at or below -1.5 dBTP).
- Leave a 0.3 s silent head and a 0.5 s tail so the loop point and the first SFX do not clip the
  platform's fade-in.

Exact ffmpeg filtergraphs are in `render-pipeline.md`, section 8.
