# Prompts, templates and troubleshooting

Contents

1. Brief template (`refs/brand.md`)
2. Plan template (`out/plan.md`): angle, hook, key moments, user flow, cuts, stand-ins, audio
3. Tone presets
4. Master prompt (one-shot, two parts)
5. Step prompts (run one at a time, review between each)
6. Beat sheet template
7. Voiceover script template with emotion tags
8. TTS options: ElevenLabs and Kokoro
9. Share copy template (`out/share-copy.txt`)
10. "You see / you say" troubleshooting table
11. Review etiquette

Everything in [brackets] is product-specific and must be filled from the brief. The prompts are
written to be pasted into an agent session (or used as your own working plan when you are the
agent). Attach the screenshots and logo with the brief.

## 1. Brief template (`refs/brand.md`)

```
Product: [name] - [what it is, in one line]
For: [who it is for]
Pain today: [one line]
A number or moment from their day: [e.g. "40 calls before 10 am"]
Outcome: [three short payoffs]
Features in story order, as a user flow: [role does 1] -> [2] -> [3] -> [4]
Screens: [refs/screenshots/ (reference only) | local app at [url], a demo tenant can be seeded]
Screens I do not have: [describe; design to match]
Colours: ground [hex] (60) / text [hex] (30) / accent [hex] (10, never text) / accent-as-text [deeper hex]
Font: [display]; [body]; [mono for numbers]
Look: [three or four words, e.g. dark, glass, depth, calm]
Feel: [one reference, e.g. a calm premium launch film]
Tone preset: [cinematic | app-store | playful | technical | editorial]
Avoid: [e.g. purple gradients, confetti, more than one accent]
Music: [synthesize | refs/music/[file] + licence + BPM if known]
Voice: [accent, energy, use case] or none
Where it plays: [website hero | launch post | WhatsApp / email share | feed | app store]
Call to action: [one action - URL or button text]
```

Five honest lines beat fifty. Name screenshots by screen (`03-pipeline.png`) so beats map to them.

## 2. Plan template (`out/plan.md`)

Write it first and get it approved together with the beat sheets. Every line is a decision the
film will be judged against later.

```
# Plan: [product]

Cuts (all 1920x1080 @ 30 fps unless noted)
| Cut      | Length | Where it plays                          | Why this length                                        |
|----------|--------|-----------------------------------------|--------------------------------------------------------|
| [web]    | [30] s | [site hero; autoplays muted; loops]     | [problem -> product -> 4 proofs -> ask before a scroll] |
| [share]  | [80] s | [sent on WhatsApp to buyers]            | [a one-minute tour: 10 screens at ~5 s, under 90 s]     |
| [vertical]| [30] s | [Reels / Shorts], 1080x1920            | [hook in 2 s, two proofs]                               |
[One line on the lengths you rejected and why, e.g. "15 s leaves room for one proof; 2 min is too long for a forwarded video".]

What it is: [one line]
Angle: [one sentence - how the story is told, e.g. "a week of follow-ups, done before lunch"]
Hook (0-[2-4] s): [the number or moment] -> [the question or pain line], landing on bar [n]
Key moments (the proof; these get the push-ins and longest holds):
- [a specific on-screen moment, e.g. an order flips from Pending to Shipped as the tracking number is typed]
- [...]
- ([share cut only] [...])
Outro: [payoff line] -> mark -> [CTA] . [URL]
User flow worth showing: [role] [action] -> [result] -> [next role] [action] -> ... -> [the last role sees the result]
Tone: preset [..] (+ finish [..]); direction "[one sentence]"; interpretation: [holds, where motion comes from, jokes or none]
Visual identity (from the brand's tokens): ground [hex] (60) / text [hex], quiet [hex] (30) / accent [hex] (10) for
  [marks, strike-throughs, rings, cursor] - never text; accent-as-text [hex] (passes 4.5:1); display [font];
  body [font]; eyebrows [font, caps, tracked]; logo in its [ink | light] colourway, never recoloured; THEME = [light | dark]
Privacy stand-ins: source [rebuilt in code | demo tenant "[fictional name]"]; identity replaced before capture:
  [name, address, owner, phone, logo]; records seeded [date], all fictional; never shown: [sign-in email,
  developer panel, real hostnames, personal columns]
Audio: music [synthesized | "[track]" by [artist], [licence], [BPM] BPM]; bar = [240/BPM] s;
  drop at film [s] = track cue [s] (track offset [s]); problem muffled (low-passed, quieter);
  filter opens + riser [s-s]; silence [one beat, s-s]; full track from the drop; ends on a bar line, 1-bar fade.
  SFX posture: [full foley | sparse]: [which actions get sounds]; restraint: [rule].
  Audio-reactive: [the glow breathes with the bed's RMS | none]. Credit: [caption | end card, why].
Share copy (draft): [two sentences]

Storyboard per cut: see out/beat-sheet-[cut].md
```

## 3. Tone presets

Presets combine: the arc of one and the finish of another ("cinematic arc, app-store finish").

| Preset | Pacing | Music | SFX posture | Type and motion |
|---|---|---|---|---|
| cinematic | Tension then release; long holds; the drop is the emotional beat | Muffled problem -> riser -> silence -> drop | Sparse | Serif display, word-blur entrances, slow push-ins |
| app-store | One claim per scene, clean feature cards, steady rhythm | Bright, mid-tempo, steady | Sparse to medium | Eyebrow + headline beside a screen card, punch-in on the proof |
| playful | Cuts on beats, quicker holds | Upbeat | Full foley, pops | Rounded sans, overshoot letters (outBack on pops only) |
| technical | Screen-first, longer UI holds, captions carry the facts | Minimal pulse or none | Key ticks and clicks only | Mono for numbers, line-by-line reveals |
| editorial | Type-led, generous space, few screens | Calm pad or none | Almost none | Serif headlines, masked line reveals |

## 4. Master prompt (one-shot, two parts)

Part 1 - product, references, story:

```
You are a senior motion designer who makes premium product launch films. Build a [60]-second
launch film for my product entirely in code: no image models, no video models, no stock footage,
no screen recordings.

PRODUCT
- Name: [name]
- What it is, in one line: [...]
- Who it is for: [...]
- The pain today: [...]
- The outcome: [three payoffs]
- Call to action: [one action]

REFERENCES (attached)
- [N] screenshots of the product. Study them for layout, labels, data and hierarchy. Use them as
  reference ONLY: never show a screenshot in the film. Rebuild every screen and component from
  scratch in code. [Or: capture the screens from the seeded demo tenant "[fictional name]" at
  [url]; its identity and records are fictional; never open the sign-in or developer screens.]
- Screens I do not have yet: [...]. Design them to match.
- Logo: [logo.svg]. Colours: [background], [accent]. Font: [display]; [mono for numbers].
- Look: [...]. Feel: [...].
- On-screen data must be fictional: invent names, customers and amounts.

ANGLE: [one sentence]. HOOK (first 2-4 s): [the number or moment] -> [the question].
KEY MOMENTS: [3-5 specific on-screen proofs]. USER FLOW: [role -> action -> result -> ...].
TONE: [preset]. CUTS: [cut, length, where it plays, why] for each.

STORY: Problem -> Solution -> Showcase -> CTA
The viewer must get "[the one-sentence promise]" within the first second of the solution.
1. Problem [0-12 s]: open on the hook, then the pain, not the logo. Kinetic type plus visual chaos built from
   [the pain's ingredients]. End on one line that names the pain.
2. Solution [12-19 s]: the chaos collapses into a single dot that morphs into the logo; product
   name plus a one-line promise; the product window rises in 3D.
3. Showcase [19-49 s]: show [4] features being USED, in this order: [1 -> 2 -> 3 -> 4]. A cursor
   causes every reaction, and each beat grows out of the one before.
4. CTA [49-60 s]: three short payoff lines, then logo, tagline and the CTA. End on the same dot so
   the film loops.
```

Part 2 - motion, sound, deliverables (paste right after part 1):

```
MOTION RULES
- Every value is a pure function of time: render(t) draws the complete frame at second t on a
  1920x1080 canvas at 30 fps. No CSS animations, no timers. It must play live, scrub, and export
  frame-exact.
- No slideshow: each beat grows out of the previous one. Hard cuts only where they mean something.
- Kinetic type with masked word reveals; shape morphs; [surface style] with a [accent] outline;
  6% grain and a soft vignette.
- One camera move per action: push in about 2x on the field being typed or the card being dragged,
  follow the cursor with a slight lag, settle back out. Draw a hover ring on whatever the cursor
  is about to touch.
- Numbers count up; bars grow; nothing just appears.
- Anything the voice names must be readable: at least 26 px on screen after camera zoom.
- Easing: outExpo for entrances, inOutCubic for camera and cursor, outBack for pops and bars.

SOUND
- Synthesize every sound in Web Audio inside the same file, generated from the cursor and event
  timeline so it stays in sync when timing changes: cursor sweeps, mouse down/up on every click, a
  key tick per typed character, drag pickup and drop, notification pings, counter ticks, whooshes
  on transitions, a boom plus riser on the logo reveal, [chaos sounds] in the opening.
- A [120] bpm music bed from the reveal onward. One shared reverb room so it all sounds like one
  space. Leave room for a voiceover.
  [Or, with a licensed track at [BPM]: every scene change on a bar line; the problem plays the
  track low-passed and quieter; over the last bar before the reveal the filter opens under a
  riser; one beat of silence; the full track drops on the reveal, aligned to the track's strongest
  section at [cue] s; end on a bar line with a one-bar fade. Sparse SFX: one per line or card
  change, effects 3-6 dB under the bed's peaks.]

DELIVERABLES
1. FIRST: the plan (angle, hook, key moments, user flow, tone, visual identity with token roles,
   privacy stand-ins, audio, cuts table with a reason per length) and a beat sheet per cut (time
   range on the bar grid - what is on screen - motion technique - on-screen text - source screen -
   sound cue). Then stop and wait for my OK.
2. Then: one self-contained HTML file with a player (play/pause, scrubber, scene chips, left/right
   frame step, F full screen, M mute).
3. Then: 6 stills at key moments so I can review without watching.
4. Then: a [60]-second voiceover script with emotion tags in [square brackets], one short line per
   beat, each with its start time and the time it must end by.
5. Finally: every cut rendered, a poster per cut, the check report, and the share copy.
```

For a 40 s cut change the length, use 0-8 / 8-13 / 13-32 / 32-40 and three features.

## 5. Step prompts (run one at a time, review between each)

The master prompt is the fast path; the step prompts are slower but you steer every decision.

**Step 0 - Warm-up showreel (optional, 15 s).** Builds a shared vocabulary so later notes can say
"use the glint sweep from 0:07" instead of describing motion in words.

```
Make a 15-second motion design showreel as one self-contained HTML file: 1920x1080, 30 fps, every
frame a pure function of time, render(t). Pack it with every technique you do well: kinetic type
with squash and stretch, shape morphs, a layered grid, glass and liquid surfaces, glitch slices, 3D
perspective tilts, masked reveals, counters, a logo sting. Use [background] + [accent]. Add
synthesized sound effects (Web Audio) on every hit. Then list each technique with its timestamp so
I can point at the ones I want.
```

**Step 1 - Brief and beat sheet** (attach screenshots and logo). Locks the story before any code.

```
I am attaching [N] screenshots of my product, [name], and my logo. [Name] is [one line]. Today
[audience] deal with [the pain].

I want a [60]-second launch film built entirely in code[, in the style of the showreel]. Use the
screenshots as reference only: never show them, rebuild every component from scratch.
Look: [...].

Story:
1. Problem: open on the pain. [ingredients], no way to organise any of it.
2. Solution: introduce [name], the system that [one-line promise].
3. Showcase: [feature 1 -> 2 -> 3 -> 4]. [Any screen not in the screenshots: design it to match.]
4. CTA: [payoff 1, payoff 2, payoff 3] -> [one action].

Before building, decide how the story is told: in one second the viewer should get "[promise]".
It will play on [channels]. Give me the plan first (angle, hook for the first 2-4 s, key moments,
user flow, tone preset, visual identity from my tokens with 60/30/10 roles, privacy stand-ins,
music and SFX posture, and a cuts table with why each length), then a beat sheet per cut on the
bar grid (time - picture - motion technique - on-screen text - source screen - sound cue), and
wait for my OK.
```

**Step 2 - Build** (after approving or editing the beat sheet).

```
Approved. Build it as one self-contained HTML file:
- 1920x1080 canvas, 30 fps. render(t) draws the whole frame at time t; no CSS animations or timers,
  so it plays, scrubs and exports frame-exact.
- A player: play/pause, scrubber, scene chips that jump to each beat, left/right frame step, F full
  screen, M mute.
- Draw every UI element from scratch to match the screenshots. Fill it with realistic fictional
  data: [names, customers, amounts, dates].
- Each beat must grow out of the one before. No slideshow fades.
- Text the voice will say must be at least 26 px on screen after zoom.
When it is done, open it and give me stills at [1.5, 12, 25, 38, 50, 58] seconds so I can review
the cut without watching.
```

**Step 3 - Sound design** (once the picture is right; sound locks to timing).

```
Add sound, synthesized in Web Audio inside the same file (no audio files):
- Cursor movement: a soft band-passed noise sweep, louder for longer moves. A mouse down/up pair on
  every click. A key tick per typed character. Pickup and drop on drags. Pings on notifications.
  Ticks while counters run.
- Transitions: whooshes on moves, a boom plus riser on the logo reveal, [paper rustles and phone
  rings] during the chaos, glitch bursts where the picture glitches.
- A [120] bpm music bed from the reveal onward: kick, off-beat hats, clap on 2 and 4, a simple bass
  line.
- One shared reverb room, so everything sounds like one space.
Generate every sound from the cursor keyframes and the event timeline, so it stays in sync if I
change timing. Render the audio offline to a WAV for export.
```

With a licensed track instead of the synthesized bed:

```
Use [refs/music/track.mp3] ([artist], [licence], [BPM] BPM). Find its strongest section in the
first [40] s and align the drop to the reveal at [s] s. Cut every scene on a bar line. Prepare one
bed per cut: problem low-passed and quieter, the filter opening over the last bar under a riser,
one beat of silence, the full track from the drop, a one-bar fade on the last bar line. Sparse
effects: [key ticks on typing, one soft tick per problem line, a low whoosh per feature change
(two takes alternated), one pop on the key moment, riser + impact at the drop, one sting on the
end mark]. Effects 3-6 dB under the bed's peaks. Precompute the bed's RMS every 0.1 s and let the
accent glow breathe with it. Put the credit in the share copy, not on screen.
```

**Step 4 - Camera and motion polish** (when it works but feels flat; always a new version).

```
Polish the motion. Do not edit the current cut; save this as [v2] so I can compare.
- When the cursor fills a form field or drags a card, push the camera in about 2x on that spot,
  follow the cursor with a 0.1 s lag, then settle back out. One close-up per action.
- Draw a [accent] hover ring around whatever the cursor is about to touch (drawn on in 0.24 s,
  off in 0.22 s).
- Smooth every cut: things slide in and out, kinetic type, shape morph, depth and 3D tilts, a
  glitch only where the story needs energy.
- Cursor: eased path with a slight arc, faint motion-blur ghosts, a press squash and a click
  ripple.
- Keep a constant hand-held float (+/-3 px) so the camera never feels locked off.
```

**Step 5 - Voiceover script** (after the cut is locked; the script is written for the picture).

```
Write the voiceover for this exact cut.
- The visuals tell the story; the voice adds only what the picture cannot. One short line per beat.
- Format for an expressive TTS: delivery tags in [square brackets] before each line, like
  [warm, unhurried], [dry, knowing], [sighs]. Pauses with ... or [short pause] / [long pause].
  No SSML <break> tags. CAPS on one word at most.
- Spell the brand the way it sounds: [phonetic spelling].
- Give me (a) one take with [long pause] between lines and (b) a table: line - start time - the
  time it must end by.
[If a TTS connector is available: pick a [voice direction] voice, generate [4] takes on the newest
model, and send me the files.]
```

**Step 6 - A character to carry the story** (optional; attach the logo again; hand the character's
design to the `brand-identity` skill if it does not exist yet).

```
Make a variant with a character. Do not touch v1; build [v2] from the same frames.
[Describe the character: size, material, one signature element that ties it to the brand mark.]
It carries the whole film: born from the opening dot, overwhelmed in the chaos, absorbs the mess
and produces the logo dot, points at captions, rides the dragged cards, reacts when a record is
captured, travels with the sync pulse to the other view, stands on the rising bar, waves on the end
card, then returns into the dot.
Moods: [happy, wow, excited, worried, scared, dizzy, calm]. Arms that point at whatever we are
talking about. Squash and stretch on every landing. Implement it as one draw function:
body, signature element, a face per mood.
```

**Step 7 - Voice in, final MP4 out** (attach the voice file).

```
Here is the voiceover [voice.mp3].
1. Find the pauses (ffmpeg silencedetect) and split it into phrases.
2. Place each phrase on its beat. Two phrases must never overlap; each must end before its beat
   ends.
3. Mix: voice high-pass 80 Hz plus gentle compression; duck the music/SFX bed under the voice;
   master to -14 LUFS, true peak -1.5 dB.
4. Render the film frame by frame at 30 fps (Playwright + Chromium), encode H.264 with the mixed
   audio, and give me the MP4 plus a contact sheet of the cut and the measured loudness.
```

**Step 8 - Vertical cut.**

```
Make a 1080x1920 version: same beats, same timing, same voice mix, re-laid out for vertical. Keep
all text out of the top 250 px and bottom 350 px so platform UI never covers it, scale the product
window to fill the width, and push the camera close-ups further in. Render it the same way.
```

**Step 9 - Pack it for someone else.**

```
Pack everything into one folder I can hand to someone else: the beat sheet, every prompt or
decision in order, the full source, the brand and character code, the inputs, the render pipeline,
and one README that explains how to rebuild and change the film.
```

**Step 10 - Posters, checks, share copy.**

```
For every cut: a poster JPG (the reveal or brand frame at [s] s); for the non-looping share cut,
bake it in as frame 0 so feeds and chat apps show it as the thumbnail. Run tools/check.py on
every cut and show me the JSON summary and the scene and seam frames; fix every error, explain
any warning you keep. Write out/share-copy.txt: two sentences in the viewer's words, the CTA, the
music credit exactly as the licence asks, and "Screens from a demo; every name is fictional."
```

## 6. Beat sheet template

Write it before any code. One row per beat; a 60 s film has roughly 12-16 rows.

```
| # | Time        | Act      | On screen                                   | Motion technique              | On-screen text              | Source screenshot | Sound cue            |
|---|-------------|----------|---------------------------------------------|-------------------------------|-----------------------------|-------------------|----------------------|
| 1 | 0.0-3.0     | Problem  | Black; words slam in over paper piling up   | masked type, camera shake     | "[pain word 1]"             | -                 | paper, impact        |
| 2 | 3.0-8.0     | Problem  | Calls, windows, badge counting to 99+       | glitch slices, counter        | "[pain word 2]" "[3]"       | -                 | rings, ticks         |
| 3 | 8.0-12.0    | Problem  | Everything freezes; one line names the pain | hold, implosion begins        | "[the pain, one line]"      | -                 | riser                |
| 4 | 12.0-14.5   | Solution | Chaos implodes to a dot; dot morphs to logo | shape morph, glint sweep      | -                           | logo.svg          | boom, glint          |
| 5 | 14.5-19.0   | Solution | Name + promise; product window rises in 3D  | overshoot letters, tilt       | "[name]" "[promise]"        | 01-dashboard.png  | whoosh, bed starts   |
| 6 | 19.0-26.0   | Showcase | [Feature 1 being used]                      | typing, 2x push-in, hover ring| "[field labels]"            | 02-....png        | keys, clicks         |
| 7 | 26.0-33.0   | Showcase | [Feature 2]; element from beat 6 flies in   | arc flight, drag + lift       | ...                         | 03-....png        | pickup, drop, ping   |
| 8 | 33.0-41.0   | Showcase | [Feature 3]; other view updates live        | sync pulse, follow-cam        | ...                         | 04-....png (or designed) | ping          |
| 9 | 41.0-49.0   | Showcase | [Feature 4]; numbers count up               | counters, bars grow           | "[KPI labels]"              | 05-....png        | ticks, land          |
|10 | 49.0-55.0   | CTA      | Three payoff lines                          | mask reveals, letter rise     | "[payoff 1/2/3]"            | -                 | pad enters           |
|11 | 55.0-60.0   | CTA      | Logo, tagline, one action; collapse to dot  | chaos-to-order morph, loop    | "[tagline]" "[CTA]"         | logo.svg          | sting, bed out       |
```

Below the table: the one-sentence promise the viewer must get at the first second of beat 5, the
list of fictional names/amounts to use, and any screen that is designed rather than rebuilt.

One beat sheet per cut (`out/beat-sheet-[cut].md`). Times sit on the bar grid (at [BPM] a bar is
240/BPM s; at 120 BPM, 2 s); mark a half-bar boundary and say why (reading time). The long cut adds
showcase rows; the short cut drops rows; both keep the hook, reveal and CTA rows. With a licensed
track, the reveal row carries the drop time and the track cue it is aligned to.

## 7. Voiceover script template with emotion tags

Shape: pain (3-4 lines) -> name (1) -> proof (5-6, one per showcase beat) -> payoff (3) -> brand
plus promise (1). About 15 lines for 60 s, 10 for 40 s. Same four acts as the picture; the voice
adds only what the picture cannot say.

Tag rules:

- A tag is a plain description in square brackets before the line: `[warm, unhurried]`,
  `[dry, knowing]`, `[sighs]`, `[faster, a little overwhelmed]`, `[calm, confident, a hint of
  wonder]`, `[smiling, light]`, `[softly, sincere]`, `[calm, confident, final]`.
- Pauses: `...` inside a line, `[short pause]` between clauses, `[long pause]` between lines. SSML
  `<break>` is not reliably honoured by tag-based TTS; do not use it.
- CAPS stresses a word; once per script is enough.
- Spell the brand the way it sounds (`[Acme O-S]` not `AcmeOS`) and check the take.
- One idea per line; nothing over about 12 words; the line must fit before its beat ends.

Template (replace every bracketed line with the product's own words; emotions are suggestions,
not a fixed sequence):

```
[warm, unhurried, intimate] [Why the viewer started: the thing they wanted to do.]
[long pause]
[dry, knowing] [Not this: the pain in four words.]
[long pause]
[faster, a little overwhelmed] [The pain's ingredients, listed with ... between them.]
[long pause]
[sighs] [The line that names the pain - the same words as on screen.]
[long pause]
[calm, confident, a hint of wonder] Meet [brand, phonetic]. [short pause] [The one-line promise.]
[long pause]
[confident, measured] [Proof line for feature 1 - what the cursor is doing right now.]
[long pause]
[upbeat, easy] [Proof line for feature 2.]
[long pause]
[steady, assured] [Proof line for feature 3.]
[long pause]
[warm, leaning in] [Proof line for feature 4, or the "they see it too" moment.]
[long pause]
[smiling, light] [The single stressed WORD moment, if any.]
[long pause]
[confident] [Payoff 1.]
[long pause]
[relieved, lighter] [Payoff 2.]
[long pause]
[softly, sincere] [Payoff 3 - the emotional one.]
[long pause]
[calm, confident, final] [Brand, phonetic]. [short pause] [Tagline.]
```

Timing table (deliver with the script; the mix script reads it):

```
| Line | Start (s) | Must end by (s) | Beat |
|------|-----------|-----------------|------|
| 1    | 0.6       | 3.0             | 1    |
| ...  |           |                 |      |
```

## 8. TTS options: ElevenLabs and Kokoro

- **ElevenLabs** (hosted, paid tiers). As of Oct 2026 its expressive models accept delivery tags in
  square brackets as above, so one long take with `[long pause]` between lines can be generated,
  cut at the silences and placed. Generate about 4 takes, pick one, and keep the voice ID and
  model name in `out/voiceover.md` so a line can be regenerated later with the same voice. If the
  agent has an ElevenLabs connector, it can pick the voice and generate; otherwise the user
  generates in the web app and drops the MP3 into `refs/`.
- **Kokoro TTS** (open-source, Apache-2.0 model weights; runs locally on CPU via its Python package
  or ONNX build). No emotion tags: strip the bracketed tags, generate one clip per line so each
  phrase is already separated, steer pacing with punctuation and sentence length, and pick the
  voice preset closest to the direction. Good when the voice must stay on the user's machine or the
  budget is zero; expect a flatter read, so lean harder on the picture and the SFX.
- Either way: mono or stereo at 44.1 or 48 kHz, no music baked in, no processing (the mix stage
  adds the high-pass and compression). Do not clone a real person's voice without documented
  consent.

## 9. Share copy template (`out/share-copy.txt`)

```
[Two sentences: the viewer's day with the product, in their words; the product name and who it is
for.] [CTA]: [URL]

Music: "[track]" by [artist] ([source site]), [licence, e.g. CC BY 4.0]. Screens from a demo;
every name is fictional.
```

- Only claims the film shows. No numbers that are not on screen or in the brief.
- The credit line names title, author, source and licence, as the licence asks; it travels with
  every post of the film and sits on the web page beside an embedded video.
- Hand the draft to the `launch-marketing` skill for per-platform versions and a posting plan.

## 10. "You see / you say" troubleshooting table

| You see | You say (one change per message) |
|---|---|
| It feels like slides | Make each beat grow out of the last one. No fades. Hard cuts only where they mean something. |
| Cannot read it on a phone | Every caption and every UI label the voice names must be at least 26 px after camera zoom. Push in, do not shrink. |
| Voice and picture drift | Cut the take at its pauses and place each phrase on its beat. No overlaps. Never stretch the picture. |
| The UI looks generic | Match screenshot [04] exactly: spacing, labels, the order of the columns, the empty-state copy. |
| Everything is the same speed | Entrances outExpo, camera inOutCubic, pops outBack; exits faster than entrances; one focal move per beat. |
| The camera never rests | One push-in per action, settle back out, hold the wide shot for at least a second between actions. |
| Too many colours | One accent. The hover ring, cursor, CTA and logo dot share it; everything else is neutral. |
| Sound is a wall | Same recipe per event type, bed under -10 dB before the voice, duck under the voice; nothing louder than the boom. |
| The first second of the solution does not land | Put the promise on screen in that second in the largest type of the film; move the product window rise after it. |
| Rendering takes forever | Render frames 0-900 and 900-1800 in parallel processes, then encode the joined sequence. |
| Preview and export look different | Embed the fonts as base64 and wait for `document.fonts`; screenshot the canvas element at device scale 1. |
| The loop jumps | The last frame must draw the same dot, at the same position and size, as frame 0. |
| The end card asks for two things | Keep the one CTA from the brief; move anything else to the caption of the post. |
| The drop lands early or late | Align the drop to the track's strongest section: track offset = cue in the track - drop time in the film. Snap the reveal to that frame. |
| The reveal does not land | One beat of silence before the drop; the riser ends where the silence begins; the problem bed muffled so the drop opens up. |
| Cuts feel random against the music | Put every scene change on a bar line; problem lines one per bar, not per beat. |
| Sound is busy | Sparse posture: one sound per line or card change, alternate two takes of the whoosh, effects 3-6 dB under the bed's peaks. |
| Accent-coloured words are hard to read | The accent is for marks, strikes and rings; words use the deepened accent-text token or the text colour. |
| The thumbnail on WhatsApp or the feed is blank | Bake the poster into frame 0 of the non-looping share cut, or open with the hook already on screen. |
| Rings or bands in the glow | Encoding banding on a smooth gradient: per-frame grain over it, or a lower CRF. |
| The short cut feels like the long one squeezed | Cut rows, do not speed up tweens: fewer proofs, same holds. |

## 11. Review etiquette

- Do not skip the beat sheet. Fixing a table costs one message; fixing a rendered film costs
  twenty.
- Review stills, not the whole film: "stills at 1.5, 12, 25, 38, 50, 58".
- Change one thing per message after the first build; big rewrites break the timing.
- Name what you liked: "keep the glint sweep from the reveal" beats "make it better".
- Ask for variants, never overwrites: "save this as v2".
- Say which screenshot a screen should match, by file name.
