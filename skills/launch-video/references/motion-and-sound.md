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
11. Cutting to the bar grid
12. Licensed track: BPM, strongest section, offset
13. Problem to reveal: muffled bed, filter-opening riser, silence beat, drop
14. Audio-reactive accents from RMS
15. SFX posture and restraint
16. Music licences and credits

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

Rules of thumb: every sound has a visible cause; the same event type always uses the same recipe
so the ear learns the vocabulary; nothing louder than the boom; during the voice, SFX sit under the
duck. Whether every visible action gets a sound depends on the posture (section 15).

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
- Cut the picture to this bed's bar grid (section 11) and give the reveal the same muffled-to-open
  treatment a licensed track gets (section 13): it is what makes the drop feel earned.

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
- A licensed bed with no voice: place it at about 0.4 of full scale with effects 3-6 dB under its
  peaks, then let the two-pass `loudnorm` bring the whole mix to -14 LUFS. Two-pass linear keeps
  the drop's dynamics instead of compressing them flat.
- Measure each cut separately; a 30 s cut and an 80 s cut of the same bed do not land at the same
  integrated loudness.

Exact ffmpeg filtergraphs are in `render-pipeline.md`, section 8.

## 11. Cutting to the bar grid

Let the music set the clock. Scene changes that land on bar lines feel edited; the same changes a third
of a beat off feel like a slideshow with a song under it.

- Beat = 60 / BPM, bar = 4 beats in 4/4. At 120 BPM a beat is 0.5 s and a bar 2 s.
- Use the measured BPM, not a rounded one, and anchor the grid at the drop:
  `barT(k) = DROP + k * BAR`. A 120.19 BPM track has a 1.997 s bar; rounding it to 2 s drifts about
  0.13 s over 40 bars, which is visible on a late hit. Snap every bar time to the nearest frame.
- What lands where: scene changes, the reveal and the end mark on bar lines; lines meant to be read
  (problem lines, payoffs) one per bar, never one per beat, because they are read, not danced to;
  entrances inside a scene may sit on beats.
- Half a bar only when reading time needs it (0.5 s + 0.3 s per word); note it in the beat sheet.
- Snap tolerance: a major hit may move up to about 0.15 s toward a strong cue and a small entrance
  about 0.1 s toward a beat. Anything more means the story or reading time wins and the music gives
  way.
- In code, define scenes by bar index, not seconds, so a tempo change moves the whole film:

```js
const BPM = 120.19, DROP = 8.0, BAR = 240 / BPM;               // per cut; DROP is the reveal
const barT = k => Math.round((DROP + k * BAR) * FPS) / FPS;    // frame-snapped bar line
const SCENES = [ { name: "Hook", t: 0 }, { name: "Problem", t: barT(-2) },
                 { name: "Reveal", t: barT(0) }, { name: "Proof 1", t: barT(1.5) } /* ... */ ];
```

## 12. Licensed track: BPM, strongest section, offset

1. **Pick by feel and tempo**, not by the product's subject ("a calm pulse that builds to a bright
   drop, around 120 BPM"). Start the bed where the track has energy rather than in its quiet intro,
   and check that what remains after the entry point covers the longest cut.
2. **BPM and beats:** from the library's metadata; or `npx hyperframes beats` (the
   `hyperframes-cli` skill) if HyperFrames is installed, which writes the track's beat grid as JSON;
   or a beat tracker such as aubio or librosa. Tap along once to confirm.
3. **Loudness curve:** RMS every 0.1 s with ffmpeg (one line per window in `work/track_rms.txt`):

```bash
ffmpeg -v error -i refs/music/track.mp3 -af "aresample=48000,asetnsamples=n=4800:p=0,astats=metadata=1:reset=1,ametadata=mode=print:key=lavfi.astats.Overall.RMS_level:file=work/track_rms.txt" -f null -
```

4. **Strongest section:** the bar whose energy jumps most against the two bars before it, tried at
   all four beat phases (`tools/strong.py`, standard library only):

```python
#!/usr/bin/env python3
"""python tools/strong.py work/track_rms.txt BPM FIRST_BEAT_S [UNTIL_S] -> strongest section starts"""
import re, sys
txt, bpm, b0 = sys.argv[1], float(sys.argv[2]), float(sys.argv[3])
until = float(sys.argv[4]) if len(sys.argv) > 4 else 60.0
raw = open(txt).read().replace("-inf", "-120")
lin = [10 ** (float(v) / 20) for v in re.findall(r"RMS_level=(-?[\d.]+)", raw)]   # one value per 0.1 s
beat, bar = 60 / bpm, 240 / bpm
def energy(a): w = lin[int(a * 10):int((a + bar) * 10)]; return sum(w) / max(1, len(w))
best = []
for phase in range(4):                                  # which beat of the bar is the downbeat
    t, bars = (b0 + phase * beat) % bar, []
    while t + bar <= min(until, len(lin) / 10): bars.append((t, energy(t))); t += bar
    for i in range(2, len(bars)):
        best.append((bars[i][1] / max(1e-6, (bars[i - 1][1] + bars[i - 2][1]) / 2), round(bars[i][0], 2)))
best.sort(reverse=True)
for ratio, t in best[:5]: print("strong section at %.2f s (energy x%.2f vs the two bars before)" % (t, ratio))
```

   This finds where the energy steps up, not where it feels like a drop: listen to the top two
   candidates and pick by ear. A library that ships cue files (strong beats, reveal candidates)
   saves this step; read them first.
5. **Offset:** `track_offset = cue_in_track - drop_in_film`. A 30 s cut with the drop at 8.0 s on a
   cue at 16.0 s starts the track at 8.0 s; an 80 s cut with the drop at 14.0 s starts it at 2.0 s.
   A negative offset means choose a later cue or a later drop; never stretch the track.

## 13. Problem to reveal: muffled bed, filter-opening riser, silence beat, drop

The emotional beat of the film is the music opening up as the product arrives. Timeline per cut
(times in film seconds; values from the parity reference job, tune by ear):

| Span | Muffled copy (low-passed) | Full copy | Effects |
|---|---|---|---|
| 0 -> build start | Low-pass 380 Hz twice (steep), gain 0.62 | Silent | Soft tick per problem line |
| Build: the last 3 beats before the silence (1.5 s at 120 BPM) | Fades linearly to 0 | Rises on a squared curve to 0.85: the filter "opens" | Riser ending exactly where the silence begins |
| Silence: one beat (0.5 s at 120 BPM) | 0 | 0 | Nothing: the held breath |
| Drop (the reveal frame) -> last bar | 0 | 1.0 | Impact + a bell or sting on the mark |
| Last bar | 0 | Fades to 0 on the final bar line | One sting on the end mark |

`tools/music.py` builds one bed per cut with ffmpeg (B0 = build start, S0 = silence start, F0 =
last bar start, BAR = bar length; all derived from BPM, DROP and the cut length):

```bash
ffmpeg -y -i refs/music/track.mp3 -filter_complex "
  [0:a]atrim=start=$OFFSET:duration=$TOTAL,asetpts=PTS-STARTPTS,asplit=2[a][b];
  [a]lowpass=f=380,lowpass=f=380,volume=eval=frame:volume='if(lt(t,$B0),0.62,if(lt(t,$S0),0.62*(1-(t-$B0)/($S0-$B0)),0))'[m];
  [b]volume=eval=frame:volume='if(lt(t,$B0),0,if(lt(t,$S0),0.85*pow((t-$B0)/($S0-$B0),2),if(lt(t,$DROP),0,if(lt(t,$F0),1,max(0,1-(t-$F0)/$BAR)))))'[f];
  [m][f]amix=inputs=2:normalize=0,afade=t=in:st=0:d=0.6[o]" -map "[o]" -ar 48000 work/bed-$CUT.wav
```

- **Riser:** the synthesized noise riser (section 8), or a reversed bell: take a bell hit, pitch it
  down about 12% (`asetrate=44100*0.88,aresample=44100`), `areverse`, fade in over 0.9 s, and place
  it so its end meets the silence.
- **Synthesized bed:** the same shape in Web Audio. Put a `BiquadFilterNode` (lowpass) on the music
  bus: `frequency` at 380 Hz until the build, `exponentialRampToValueAtTime(18000, S0)`; bus gain
  `setValueAtTime(0, S0)` and `setValueAtTime(1, DROP)`. It renders identically in the
  `OfflineAudioContext`.
- The beat of silence is the part people skip and the part that makes the drop. Keep it even in
  the 15 s cut.

## 14. Audio-reactive accents from RMS

One accent element (the soft glow behind the cards) breathes with the music; nothing else reacts.

- Compute RMS every 0.1 s from each cut's **final** bed (after the edit, so the silence beat shows
  as a dip), normalise to 0-1 and embed it per cut:

```python
import json, re, sys   # python tools/rms_json.py work/bed-web_rms.txt work/rms-web.json
v = [10 ** (float(x) / 20) for x in re.findall(r"RMS_level=(-?[\d.]+)", open(sys.argv[1]).read().replace("-inf", "-120"))]
m = max(v) or 1; json.dump([round(x / m, 3) for x in v], open(sys.argv[2], "w"))
```

- In `render(t)`: interpolate the array, map it to the glow's opacity over a narrow band (about
  0.05-0.14 on a light ground, 0.12-0.25 on a dark one), and draw. A precomputed array keeps the
  frame a pure function of `t`; a live `AnalyserNode` would not.

```js
function rmsAt(t) { const i = t * 10, a = RMS[Math.floor(i)] ?? 0, b = RMS[Math.floor(i) + 1] ?? a; return lerp(a, b, i % 1); }
const glowAlpha = t => P.GLOW_LO + P.GLOW_SPAN * rmsAt(t);   // per-theme values in the palette
```

- No equaliser bars, waveforms or text that pulses: those read as a music video, not a product.

## 15. SFX posture and restraint

Choose the posture in the plan:

| Posture | When | What gets a sound |
|---|---|---|
| Full foley | Synthesized bed, cursor-driven demo; playful or technical tone | Every visible action, from the recipes in section 8 |
| Sparse | A licensed track carries the film; cinematic or app-store tone | Key ticks on typed text (every other key), one soft tick per problem line, one low whoosh per feature change (two takes alternated), one pop on each key moment, riser + impact at the drop, one sting on the end mark |

Restraint, either way:

- Nothing harsh: no hard clicks, sirens or bright hits; low-pass anything that bites.
- No sound on every card; the music carries the cuts.
- Effects sit 3-6 dB under the bed's peaks.
- Never the same sample twice in a row: alternate two takes or vary pitch by a few percent.
- A key moment gets a sound only where the picture moves.

Sound files, when not synthesized: CC0 packs (Kenney's audio packs are CC0) or the `media-use`
skill's sound-effect search if HyperFrames is installed; keep each file's licence next to it.

## 16. Music licences and credits

Not legal advice; when the licence is unclear, ask the user for it before using the track.

- Fine for a launch film: music the user owns or licensed for commercial video, the synthesized
  bed, CC0, and CC BY.
- Not fine: CC BY-NC (a launch film is commercial use) and CC BY-ND. Under the CC 4.0 licences,
  music synced in timed relation with a moving image always counts as adapted material, which ND
  does not allow to be shared.
- CC BY 4.0 asks for a credit "in any reasonable manner based on the medium": title, author,
  source, licence with a link, and a note that it was modified (the muffled, cut and faded bed is a
  modification). For a film posted with a caption, put the credit in the caption and on the web
  page beside an embedded video, not burnt into the film: the end card keeps its one CTA and a
  re-cut needs no re-render. Credit on screen only where no caption travels with the film (an
  event screen, a TV loop).
- Keep `refs/music/licence.txt` (where the track came from, the licence text or link, the date) and
  put the credit line in `out/share-copy.txt` and the README.
