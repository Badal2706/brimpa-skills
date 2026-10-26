---
name: launch-video
description: Produce a product launch film, feature demo or social clip entirely in code, from screenshots or a seeded demo app - plan (angle, hook, cuts per channel) -> beat sheet -> deterministic HTML render(t) animation -> Playwright frame capture -> ffmpeg MP4 cut to the music's bar grid, with synthesized or licensed music, SFX and an optional TTS voiceover at -14 LUFS -> vertical cut, posters and share copy. Use whenever the user wants a launch video, promo video, demo video, teaser, trailer, explainer, Reel/Short/TikTok of their app, a walkthrough of screens, "a video for the landing page" or for WhatsApp, a Product Hunt or app-store preview, a kinetic-type intro, logo reveal or end card, or says "turn these screenshots into a video", "animate my UI", "make a trailer for my SaaS", "something moving for the launch post" - even if they never say "video". Also use for frame-exact HTML-to-MP4 rendering, syncing cuts or sound to music, mixing a voiceover, or re-cutting a film to vertical or another length.
license: MIT
metadata:
  author: Brimpa
  version: "1.2"
  updated: "2026-10-26"
---

# Launch video: a product film built entirely in code

Make a short product film where every pixel is drawn by code you write: the app UI rebuilt from
screenshots (or captured as stills and keystroke frames from a seeded demo tenant), kinetic type, a
logo reveal, a cursor that types and drags, music cut to its bar grid, sound effects and an optional
voiceover. No image or video generator, no stock footage, no screen recording. The whole film is one
HTML file in which every frame is a pure function of time, `render(t)`; a script steps `t` in
1/30 s increments, screenshots each frame with Playwright, and ffmpeg encodes the MP4 and mixes the
audio.

Target spec: 1920x1080 at 30 fps. A 60 s film is 1,800 frames; a 40 s film is 1,200. Vertical cut:
1080x1920, same timing. Several cuts (a website hero and a longer share version, say) are built
from the same source by a `CUT` switch, so a scene fixed once is fixed in every cut.

## How to run this

1. **Collect the brief and references** (see Inputs). Put them in `refs/`. Do not start the build
   without screens to work from and one call to action; a film with no CTA has no job.
2. **Write the plan** (`out/plan.md`, template in `references/prompts.md`): the angle in one
   sentence, the hook for the first 2-4 s, 3-5 key moments, the user flow worth showing, the tone
   preset, the visual identity (token roles), the privacy stand-ins, the music and SFX posture, and
   a **cuts table** (channel, length, why that length). Then a **beat sheet per cut**: time range
   on the bar grid, picture, motion technique, on-screen text, source screen, sound cue. Stop for
   approval. Fixing a table costs one message; fixing a rendered film costs twenty.
3. **Build v1**: one self-contained HTML file with `render(t)` and a player (play/pause, scrubber,
   scene chips, arrow-key frame step, F fullscreen, M mute, a cut switch). Skeleton in
   `references/render-pipeline.md`. Open it in a browser and scrub; produce 6 stills at key seconds
   so the user reviews without watching.
4. **Add sound** once the picture is locked. Either synthesize the bed and effects in Web Audio from
   the same event timeline that drives the cursor, or edit a licensed track to the film: known BPM,
   every cut on a bar line, the drop aligned to the track's strongest section, the problem act
   muffled, a filter-opening riser and one beat of silence before the drop. Pick the SFX posture
   (full foley or sparse) in the plan. Recipes in `references/motion-and-sound.md`.
5. **Camera and motion polish as v2**, never over v1: 2x push-ins, cursor follow, hover rings,
   hand-held float, a glow that breathes with the music's RMS. Compare v1 and v2 side by side.
6. **Voiceover** (optional): write the script for the exact cut (one short line per beat with start
   and must-end-by times), generate takes (ElevenLabs or Kokoro), split at pauses, place each phrase
   on its beat.
7. **Render every cut**: Playwright frames + audio -> ffmpeg H.264 -> mix mastered to -14 LUFS ->
   poster frame per cut. Commands in `references/render-pipeline.md`.
8. **QA**: run the automated checks (`tools/check.py` writes `work/check-<cut>.json` plus scene and
   seam frames), look at the frames, then the human tests below; fix with the "you see / you say"
   table in `references/prompts.md`.
9. **Vertical cut** (1080x1920) with the same beats, timing and mix, re-laid out for a phone.
10. **Deliver** the output folder, the share copy (`out/share-copy.txt`, with any music credit)
    and the delivery note (format below).

Work one change per message after the first build; big rewrites break the timing. Review stills,
not the whole film. Name what to keep ("keep the glint sweep from the reveal") rather than "make it
better". Ask for variants, never overwrites.

## Inputs

Must-have (ask for anything missing before the plan):

| Input | Why it is needed |
|---|---|
| 10-20 screenshots, one per screen that appears in the film, named by screen (`03-pipeline.png`), or a locally running app where a demo tenant can be seeded | Layout, labels, hierarchy and the shape of the data. The user's screenshots are **reference only** and never appear: they carry real data. Screens on screen are either rebuilt in code or captured from a seeded demo tenant (see Privacy stand-ins). |
| Logo (SVG preferred) | The reveal and the end card, in its own colourway for the film's ground; never recoloured. |
| Brand tokens: ground, text, one accent, font(s) | Every frame on-brand. Hand off to the `web-design` or `brand-identity` skill if the product has no tokens yet. |
| The pain in one line, and one concrete number or moment from the viewer's day | The hook and the opening act. |
| 3-5 features in story order, as a user flow | The showcase. Order as a story (who does what, what happens next), not a menu. |
| Who it is for | Tone, copy and the examples on screen. |
| Where each cut will play | The cuts table: lengths, aspect, whether it must read muted and loop. |
| Exactly one call to action | The last frame asks for one thing. |

Nice-to-have: a reference film for pacing and feel; word descriptions of screens that do not exist
yet (design them to match the real ones); a music track the user owns or has licensed, with its
licence; a character or mascot to carry the story (hand off to `brand-identity`); voice direction.

Put this line in every brief, because it is the rule most often broken: "Never show the screenshots
I give you. Rebuild every component in code, or capture it from the seeded demo tenant."

A five-line `refs/brand.md` beats fifty: colours with roles, font, one adjective for the feel, what
to avoid, the CTA.

## Plan: angle, hook, cuts

- **Angle**: one sentence that says how this film tells the story, not what the product is
  ("a week of follow-ups, done before lunch"; "the report that used to take an hour"). Every beat
  serves it; a beat that does not is cut.
- **Hook (first 2-4 s)**: it must work as a muted autoplay and as a thumbnail. A concrete number or
  moment the viewer recognises from their own day, then the question or the pain line, landing on a
  bar line. Not the logo, not a generic claim.
- **Key moments**: 3-5 specific things on screen that prove the promise (an order's status flips
  from Pending to Shipped as the tracking number is typed; the customer's phone lights up). These get the
  push-ins, the longest holds and the sound accents.
- **User flow worth showing**: the chain across roles that the showcase follows (a rep logs
  the lead -> the manager assigns it -> the customer gets the quote -> the founder sees the pipeline).
- **Tone preset**: cinematic, app-store, playful, technical or editorial (table in
  `references/prompts.md`); it sets pacing, music, SFX posture and type.

Cuts per channel (as of Oct 2026; write the "why" for every cut in the plan):

| Channel | Length | Why |
|---|---|---|
| Website hero / product section (autoplays muted, often loops) | 20-30 s | Problem -> product -> 3-4 proofs -> ask, finished before the visitor scrolls; must read with no sound |
| Launch post, Product Hunt, landing-page play button | 40-60 s | The full four-act film below (this skill's default) |
| Direct share (WhatsApp, email, a DM to a buyer) | 60-90 s | Someone who opened a forwarded video gives it about a minute: a tour of 8-12 screens at about 5 s each, ending before 90 s |
| Social feed (Reels, Shorts, TikTok), vertical | 15-30 s | Hook in the first 2 s; one or two proofs |
| App Store app preview | up to 30 s | Apple's limit |

Under 20 s there is room for two screens at most; over 90 s asks a busy buyer for too much. The
short cut works as a trailer, the long one as a tour.

## Story structure and beat timings

Every second has one job. Four acts, always in this order; a stranger must be able to say what the
product is for within the first second of the Solution act. The hook is the first 2-4 s of Act 1.

| Act | Job | 60 s cut | 40 s cut |
|---|---|---|---|
| 1 Problem | Open on the hook, then the viewer's pain, not the logo. Kinetic type over visual chaos (paper, calls, overlapping windows, a badge counting up), one line per bar. End on one line that names the pain. | 0-12 s | 0-8 s |
| 2 Solution | The chaos collapses into one dot; the dot morphs into the logo on the music's drop; product name plus a one-line promise; the product window rises in 3D as the bridge into the demo. | 12-19 s | 8-13 s |
| 3 Showcase | Features being **used**, never listed, along the user flow. A cursor types, clicks and drags; the camera pushes in on each action; each beat grows out of the previous one. | 19-49 s (4 features) | 13-32 s (3 features) |
| 4 CTA | Three short payoff lines, then logo, tagline and the one action, held at least 2 s. Collapse back into the opening dot so the film loops. | 49-60 s | 32-40 s |

Other lengths: keep the proportions and snap every boundary to a bar line (at 120 BPM a bar is
2 s). A 30 s web cut runs roughly hook and problem 0-8 / reveal 8-11 / three or four proofs
11-26.5 / CTA 26.5-30; a 60-90 s tour adds showcase beats of 2-3 bars each rather than longer acts.

Techniques by act: Problem - masked type, strike-throughs, glitch slices, camera shake, implosion.
Solution - shape morph, glint sweep, overshoot letters, perspective tilt. Showcase - typing, arc
flight, drag with lift and tilt, counters, follow-cam, hover rings, punch-in inside a screen card.
CTA - mask reveals, chaos-to-order morph, letter rise, loop.

Short feature demos and social clips use the same skeleton with Act 1 compressed to 2-3 s and one
or two showcase beats; keep the one-second test and the single CTA.

## Hard rules

- **`render(t)` is a pure function.** It draws the complete frame for second `t` from scratch, with
  no CSS animations, no timers, no `Date.now()`, no unseeded randomness and no state carried between
  calls. The same file plays live, scrubs like an editor timeline and exports frame-exact.
  Rendering frame 731 twice must give identical pixels. Audio-reactive values come from a
  precomputed array indexed by `t`, never from a live analyser.
- **The hook lands in the first 2-4 s** and works muted.
- **Cut on the bar grid.** Scene changes, problem lines and the reveal land on bar lines (half a bar
  only when reading time needs it); the drop lands on the reveal frame.
- **No slideshow.** Each beat grows out of the one before. Hard cuts only where they mean something;
  no fades between "slides".
- **One camera move per action.** Push in about 2x on the field being typed or the card being
  dragged (1.4-1.6x inside a captured screen card), follow the cursor with a slight lag, settle out.
- **Anything the voice names, and every caption, is at least 26 px on screen after camera zoom.**
  Measure the rendered size, not the font size.
- **Reading time:** a line stays on screen at least 0.5 s + 0.3 s per word; the closing line at
  least 2 s.
- **Easing:** outExpo for entrances, inOutCubic for camera and cursor, outBack only for pops and
  bars. Exits faster than entrances. No bounce or elastic by reflex.
- **Colour by role, from the brand's tokens:** ground about 60%, text about 30%, one accent about
  10% for marks, strike-throughs, rings and the cursor. The accent is never body text; where it must
  read as text, use a deepened accent-text token that passes 4.5:1 on the ground. Palettes live
  behind one `THEME` switch.
- **Numbers count up, bars grow, nothing just appears.**
- **Privacy stand-ins only** on screen: fictional names, emails, phones, amounts, addresses, logos.
- **One CTA** on the end card.
- **Never overwrite a working version.** v1 stays; polish, character and experiments become v2, v3.

## Privacy stand-ins

Two allowed sources for what is on screen, both fictional:

- **Rebuilt in code** from the user's screenshots, filled with invented records (the default).
- **Captured from a seeded demo tenant** when the app runs locally: give the tenant a fictional
  identity (organisation name, address, owner, phone and a generated logo, replacing anything the
  demo account was copied from), seed fictional records dated today, then capture stills and
  keystroke frames with Playwright. Sign-in emails, developer panels, real hostnames and personal
  columns are cropped or never opened. Captured screens are still animated by `render(t)`: cards,
  punch-ins, highlight rings, frame-stepped typing.

List every stand-in in the plan, and put "Screens from a demo; every name is fictional" in the
share copy. The film needs the shape of the data, not the data.

## Ten rules, beginner vs pro

| # | Beginner | Pro |
|---|---|---|
| 1 | Opens on the logo | Opens on a hook from the viewer's own day |
| 2 | Screen-recorded UI, tiny and flat | UI rebuilt in code, or captured from a seeded demo, with push-ins |
| 3 | A list of features | A story: problem -> solution -> showcase -> CTA, along a user flow |
| 4 | Fades between slides | Every beat grows out of the last |
| 5 | Locked-off camera | 2x push-in on every action, follow the cursor |
| 6 | A rainbow of colours | Token roles 60/30/10, one accent, never as text |
| 7 | A stock loop under everything | Music cut to its bar grid, a drop on the reveal, sound with restraint |
| 8 | Text too small on a phone | Anything the voice names is >= 26 px |
| 9 | One giant prompt, one length for everywhere | Plan and beat sheets first; one cut per channel, each with a reason |
| 10 | Edits the only version | Keeps v1, builds v2, compares |

## Toolchain

- **Renderer:** one HTML file, Canvas 2D (or DOM + CSS transforms driven by `render(t)`), fonts
  embedded as base64 so headless Chromium draws the same glyphs as the browser preview.
- **Capture:** Python 3 + Playwright (Chromium). `pip install playwright` then
  `python -m playwright install chromium`.
- **Encode and mix:** ffmpeg from ffmpeg.org (or the platform package manager).
- **Voice (optional):** ElevenLabs (hosted; supports delivery tags in square brackets on its
  expressive models as of Oct 2026) or Kokoro TTS (open-source, runs locally; no emotion tags, so
  steer pacing with punctuation and one clip per line). The user supplies or approves the voice
  file; place it, never stretch the picture to fit it.
- If an install or render fails, read the full error and fix the script; the user should never
  have to debug Python.

**If the HyperFrames skills are installed**, they cover capture and encode with less hand-built
tooling, and some jobs better. Use `hyperframes-registry` (`npx hyperframes catalog`) for named
visuals (grain, cursors, transitions, caption styles) before hand-building them; the `hyperframes`
skill's captions guidance for burnt-in captions; `hyperframes-cli` for the music's beat grid
(`beats`), the automated gate (`check --json`, `snapshot`) and cloud renders (`cloud render`,
`lambda`, `cloudrun`) when local Chrome or ffmpeg is the bottleneck; `media-use` to find licensed
music and sound effects, `normalize-audio` and `transcribe`. Keep this skill's plan, beat structure,
hard rules, sound design and QA; HyperFrames' paused, seekable timelines are the same determinism
rule as `render(t)`.

## QA checklist (before anything is posted)

- **Automated checks:** `tools/check.py` per cut (`references/render-pipeline.md`) returns zero
  errors; every warning is fixed or explained in the delivery note. Look at the scene and seam
  frames it saves.
- **Hook test:** the first 3 s, muted. Does a stranger know whose problem this is?
- **1-second test:** show a stranger the first second of the Solution act. Can they say what it is
  for?
- **Mute test:** most people watch without sound. Does the story still read?
- **Phone test:** every caption and every UI label the voice names is readable (>= 26 px after zoom;
  vertical cut keeps text out of the top 250 px and bottom 350 px).
- **Reading time:** every line holds 0.5 s + 0.3 s per word; the closing line at least 2 s.
- **Privacy:** no real names, emails, phones, amounts, logos or hostnames in any frame.
- **One CTA** on the end card, matching the brief.
- **Music sync:** the drop hits on the reveal frame, scene changes sit on bar lines, the beat of
  silence before the drop is audible.
- **Loudness:** integrated -14 LUFS, true peak -1.5 dB (never above -1 dB after the AAC encode).
  Verify with a `loudnorm` measurement, not by ear.
- **Voice placement:** no two phrases overlap; each phrase ends before its beat ends.
- **Counters and charts:** every number counts up; nothing pops in finished.
- **Determinism:** re-render three random frames and diff them against the first pass.
- **Colour:** one accent; the accent is never body text; token pairs pass contrast; gradients and
  glows show no banding in the encoded MP4 (grain fixes it).
- **Poster and first frame:** each cut has a poster; a non-looping share cut does not open on empty
  ground.
- **Loop seam** (looping cuts): last frame returns to the opening dot; play the loop twice.
- **Licence:** any CC BY music is credited in the share copy; no NC-licensed music.

## Output folder layout

```
launch-film/
  refs/
    screenshots/        10-20 screens, named by screen (reference only)
    logo.svg
    brand.md            colours with roles, font, feel, avoid, CTA
    music/              licensed track + licence.txt (if not synthesized)
    voice.mp3           TTS take (added at step 6)
  src/
    film.html           the renderer + player (or src/*.js built into dist/film.html)
  tools/
    capture_demo.py     stills + keystroke frames from the seeded demo tenant (if used)
    music.py            track edited per cut + RMS array
    render.py           Playwright frame capture + offline SFX WAV
    preview.py          stills at chosen seconds + contact sheet
    encode.sh           ffmpeg frames + audio -> MP4
    vo_mix.py           split voice at pauses, place on beats, duck, master
    check.py            pre-delivery checks -> work/check-<cut>.json + frames
  work/
    frames/<cut>/       00000.jpg ... (git-ignored)
    check-<cut>.json    and check-<cut>/ (scene and seam frames)
  out/
    plan.md             angle, hook, key moments, flow, tone, identity, stand-ins, cuts, audio
    beat-sheet-<cut>.md
    <product>-<cut>-<len>s.mp4   <product>-<cut>-<len>s.jpg (poster)   <product>-vertical.mp4
    share-copy.txt      caption, music credit, demo-data line
    voiceover.md        script with tags and timing table
    README.md           how to rebuild and change the film
```

## Delivery note (paste with the files)

```
Film: <product> launch film, 1920x1080 @ 30 fps, H.264 + AAC
Cuts: <cut> <len> s for <channel> (<why>) | <cut> <len> s for <channel> (<why>) | vertical 1080x1920
Angle: <one sentence>   Hook: <first 2-4 s>
Versions: v1 (picture), v2 (camera polish), final (mix) - all kept
Music: <synthesized 120 BPM | "<track>" by <artist>, <licence>, <BPM> BPM, drop at <s> s (track cue <s> s)>
Voice: <ElevenLabs|Kokoro|none>, take <k>; <n> phrases placed, 0 overlaps
Loudness (measured, per cut): I = <x> LUFS, TP = <x> dBTP, LRA = <x>
Checks: work/check-<cut>.json - <0> errors, <n> warnings (<kept on purpose: why>)
QA: hook [ ] 1-second [ ] mute [ ] phone [ ] reading time [ ] privacy [ ] one CTA [ ] sync [ ] determinism [ ] loop [ ]
Posters: <file per cut> (frame at <s> s)
Share copy: out/share-copy.txt (music credit included)
To change: story -> out/plan.md; timing -> EVENTS/SCENES in src/film.html; theme -> THEME; cut -> CUTS
```

## Worked examples

- **"Here are 14 screenshots of our clinic booking app, make a launch video."** Ask for the logo,
  tokens, the pain line, a number from the clinic's day, the feature order, where it will play and
  the CTA; propose the plan and a 60 s beat sheet (hook: "40 calls before 10 am."; Solution: dot ->
  logo on the drop -> booking window rises; Showcase: book a slot -> reminder goes out -> front-desk
  view updates live -> weekly report counts up; CTA: "Start free trial"). Fictional patients.
- **"A short one for the website and a longer one to send to customers."** Two rows in the cuts
  table (a 30 s hero that reads muted and loops; a 60-90 s tour), one source, a `CUT` switch, the
  same drop and bar grid; the long cut adds showcase beats, not longer holds.
- **"Just a 15-second clip of the new export feature for LinkedIn."** Feature-demo variant: 2 s
  hook, one showcase beat with a 2x push-in on the export dialog, a counter, a 3 s end card with one
  CTA. Render 1920x1080 and 1080x1920.
- **"The video feels like slides."** Make each beat carry an element into the next, replace fades
  with motion, save as v2 and show stills side by side with v1.
- **"The voice does not match the picture."** Cut the take at its pauses (silencedetect), place
  each phrase at its beat start, confirm each ends before the beat ends, re-mix. Never stretch the
  picture to the voice.

## Anti-patterns / refuse

- Pasting the user's screenshots or screen recordings into the film. Rebuild them, or capture a
  seeded demo tenant.
- Real customer data on screen, even "just for the preview".
- Invented claims in captions or voice (customer counts, revenue figures, awards). Captions carry
  the product's real feature names and the brief's promise; illustrative numbers in the UI are
  labelled fictional in the README and the share copy.
- A second CTA, a QR code plus a URL plus "follow us".
- CSS keyframes, `setTimeout`, live audio analysers or physics simulations inside `render(t)`.
- A stock loop laid under the film without editing it to the cut; synthesize the bed, or edit a
  licensed track to the bar grid and duck it.
- Music without a licence that covers commercial use, or CC BY music with no credit. NC-licensed
  tracks do not fit a launch film.
- A sound on every card, harsh hits, effects louder than the bed's peaks.
- Cloning a real person's voice without their documented consent; use a stock or synthetic voice.

## When the user pushes back

- "Skip the plan, just build it": write a 10-line plan and beat sheet anyway and show them with the
  first stills; it costs one message and it is what you will debug against.
- "Use our real dashboard numbers": offer plausible fictional numbers of the same magnitude, or ask
  for written sign-off that the figures are public.
- "Add all nine features": keep 4 (60 s) or 3 (40 s) and put the rest in the longer share cut.
- "Make the text smaller so the whole screen fits": push the camera in instead; the 26 px rule
  exists because the phone is the real screen.
- "Put the music credit on the end card": do it when the film plays where there is no caption (an
  event screen, a TV loop); otherwise the caption keeps the end card to one CTA.
- "We need it in 4K / 60 fps": the pipeline scales (change canvas size and fps constants, frame
  count multiplies); warn that render time scales too and split the frame range across processes.

## Hand-offs

- `web-design`: brand tokens (colours, type scale, surface style) when the product has none.
- `brand-identity`: token roles, logo colourways, or a mascot to carry the story.
- `launch-marketing`: the share copy polished, a posting plan and landing-page placement.
- `ui-ux`: if rebuilding the screens exposes usability problems worth fixing in the product.

## References

- `references/render-pipeline.md` - read when building the HTML skeleton (cuts, theme switch, RMS
  array), capturing a demo tenant, the Playwright capture, ffmpeg encode, voice placement, loudness,
  poster frames and the pre-delivery checks.
- `references/motion-and-sound.md` - read when choosing easing and durations, camera and cursor,
  text size, Web Audio SFX, cutting to the bar grid, editing a licensed track (strong-section drop,
  muffled-to-open riser, silence beat), RMS-reactive accents, SFX posture, mix and music licences.
- `references/prompts.md` - read when writing the brief and plan (angle, hook, key moments, user
  flow, tone presets, cuts table, privacy stand-ins, share copy), the beat sheet, the step prompts,
  the voiceover script, or diagnosing a film that looks off ("you see / you say").
- `references/sources.md` - attribution for the method and numbers used here.
