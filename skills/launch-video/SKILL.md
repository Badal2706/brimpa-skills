---
name: launch-video
description: Produce a 40-60 second product launch film, feature demo or social clip entirely in code, from screenshots and a brief - beat sheet -> deterministic HTML render(t) animation -> Playwright frame capture -> ffmpeg MP4 with synthesized Web Audio sound effects and an optional TTS voiceover (ElevenLabs or open-source Kokoro) -> 1080x1920 vertical cut. Use whenever the user wants a launch video, promo video, demo video, teaser, trailer, explainer, Reel/Short/TikTok of their app, an animated walkthrough of screens, "a video for the landing page", a Product Hunt or app-store preview, a kinetic-type intro, logo reveal or end card, or says "turn these screenshots into a video", "animate my UI", "make a trailer for my SaaS", "something moving for the launch post" - even if they never say "video". Also use for frame-exact rendering of any HTML or canvas animation to MP4, adding synced sound effects to a motion piece, mixing a voiceover under music to -14 LUFS, or re-cutting an existing film to vertical.
license: MIT
metadata:
  author: Badal Patel
  version: "1.0"
  updated: "2026-10-20"
---

# Launch video: a product film built entirely in code

Make a short product film where every pixel is drawn by code you write: the app UI rebuilt from
screenshots, kinetic type, a logo reveal, a cursor that types and drags, synthesized sound, and an
optional voiceover. No image or video generator, no stock footage, no screen recording. The whole
film is one HTML file in which every frame is a pure function of time, `render(t)`; a script steps
`t` in 1/30 s increments, screenshots each frame with Playwright, and ffmpeg encodes the MP4 and
mixes the audio.

Target spec: 1920x1080 at 30 fps. A 60 s film is 1,800 frames; a 40 s film is 1,200. Vertical cut:
1080x1920, same timing.

## How to run this

1. **Collect the brief and references** (see Inputs). Put them in `refs/`. Do not start the build
   without screenshots and one call to action; a film with no CTA has no job.
2. **Write the beat sheet first** and stop for approval: time range, what is on screen, motion
   technique, on-screen text, and which screenshot each showcase beat is rebuilt from. Fixing a table
   costs one message; fixing a rendered film costs twenty. Template in `references/prompts.md`.
3. **Build v1**: one self-contained HTML file with `render(t)` and a player (play/pause, scrubber,
   scene chips, arrow-key frame step, F fullscreen, M mute). Skeleton in
   `references/render-pipeline.md`. Open it in a browser and scrub; produce 6 stills at key seconds
   so the user reviews without watching.
4. **Add sound** once the picture is locked, synthesized in Web Audio from the same event timeline
   that drives the cursor, so it stays in sync when timing changes. Recipes in
   `references/motion-and-sound.md`.
5. **Camera and motion polish as v2**, never over v1: 2x push-ins, cursor follow, hover rings,
   hand-held float. Compare v1 and v2 side by side.
6. **Voiceover**: write the script for the exact cut (one short line per beat with start and
   must-end-by times), generate takes (ElevenLabs or Kokoro), split at pauses, place each phrase on
   its beat.
7. **Render**: Playwright frames + offline-rendered SFX WAV -> ffmpeg H.264 -> voice mix mastered to
   -14 LUFS. Commands in `references/render-pipeline.md`.
8. **QA** with the checklist below; fix with the "you see / you say" table in
   `references/prompts.md`.
9. **Vertical cut** (1080x1920) with the same beats, timing and voice mix, re-laid out for a phone.
10. **Deliver** the output folder and the delivery note (format below).

Work one change per message after the first build; big rewrites break the timing. Review stills,
not the whole film. Name what to keep ("keep the glint sweep from the reveal") rather than "make it
better". Ask for variants, never overwrites.

## Inputs

Must-have (ask for anything missing before the beat sheet):

| Input | Why it is needed |
|---|---|
| 10-20 screenshots, one per screen that appears in the film, named by screen (`03-pipeline.png`) | Layout, labels, hierarchy and the shape of the data. They are **reference only**: the film never shows a screenshot; every screen is rebuilt as code so it can animate. |
| Logo (SVG preferred) | The reveal and the end card. |
| Brand tokens: background, one accent colour, font(s) | Keeps every frame on-brand instead of generic. Hand off to the `web-design` skill if the product has no tokens yet. |
| The pain, in one line | Becomes the opening act. |
| 3-5 features in story order (4 for 60 s, 3 for 40 s) | Becomes the showcase. Order as a story, not a menu. |
| Who it is for | Sets tone, copy and the examples on screen. |
| Exactly one call to action | The last frame asks for one thing. |

Nice-to-have: a reference film for pacing and feel; word descriptions of screens that do not exist
yet (design them to match the real ones); a character or mascot to carry the story (hand off to the
`brand-identity` skill to design one); voice direction (accent, energy, tone).

Put this line in every brief, because it is the rule most often broken: "Use the screenshots as
reference only. Never show them. Rebuild every component from scratch in code." Screenshots usually
contain real customer names and amounts; render fictional placeholders on screen. The film needs
the shape of the data, not the data.

A five-line `refs/brand.md` beats fifty: colours, font, one adjective for the feel, what to avoid,
the CTA.

## Story structure and beat timings

Every second has one job. Four acts, always in this order; a stranger must be able to say what the
product is for within the first second of the Solution act.

| Act | Job | 60 s cut | 40 s cut |
|---|---|---|---|
| 1 Problem | Open on the viewer's pain, not the logo. Kinetic type over visual chaos (paper, calls, overlapping windows, a badge counting up). End on one line that names the pain. | 0-12 s | 0-8 s |
| 2 Solution | The chaos collapses into one dot; the dot morphs into the logo; product name plus a one-line promise; the product window rises in 3D as the bridge into the demo. | 12-19 s | 8-13 s |
| 3 Showcase | Features being **used**, never listed. A cursor types, clicks and drags; the camera pushes in on each action; each beat grows out of the previous one (a captured record flies into the next screen; a dragged item updates another view live). | 19-49 s (4 features) | 13-32 s (3 features) |
| 4 CTA | Three short payoff lines, then logo, tagline and the one action. Collapse back into the opening dot so the film loops. | 49-60 s | 32-40 s |

Techniques by act: Problem - masked type, glitch slices, camera shake, implosion. Solution - shape
morph, glint sweep, overshoot letters, perspective tilt. Showcase - typing, arc flight, drag with
lift and tilt, counters, follow-cam, hover rings. CTA - mask reveals, chaos-to-order morph, letter
rise, loop.

Short feature demos and social clips use the same skeleton with Act 1 compressed to 2-3 s and one
or two showcase beats; keep the one-second test and the single CTA.

## Hard rules

- **`render(t)` is a pure function.** It draws the complete frame for second `t` from scratch, with
  no CSS animations, no timers, no `Date.now()`, no unseeded randomness and no state carried between
  calls. This is the whole trick: the same file plays live, scrubs like an editor timeline and
  exports frame-exact. Rendering frame 731 twice must give identical pixels.
- **No slideshow.** Each beat grows out of the one before. Hard cuts only where they mean something;
  no fades between "slides".
- **One camera move per action.** Push in about 2x on the field being typed or the card being
  dragged, follow the cursor with a slight lag, settle back out. Without it a 1080p UI is tiny text
  on a big screen.
- **Anything the voice names is at least 26 px on screen after camera zoom.** Measure the rendered
  size, not the font size.
- **Easing:** outExpo for entrances, inOutCubic for camera and cursor, outBack only for pops and
  bars. Exits faster than entrances. No bounce or elastic by reflex.
- **One accent colour.** The eye must know where to land.
- **Numbers count up, bars grow, nothing just appears.**
- **Fictional data only** on screen: names, emails, amounts, dates.
- **One CTA** on the end card.
- **Never overwrite a working version.** v1 stays; polish, character and experiments become v2, v3.

## Ten rules, beginner vs pro

| # | Beginner | Pro |
|---|---|---|
| 1 | Opens on the logo | Opens on the viewer's pain |
| 2 | Screen-recorded UI, tiny and flat | UI rebuilt in code from screenshots |
| 3 | A list of features | A story: problem -> solution -> showcase -> CTA |
| 4 | Fades between slides | Every beat grows out of the last |
| 5 | Locked-off camera | 2x push-in on every action, follow the cursor |
| 6 | A rainbow of colours | One accent colour |
| 7 | A stock music loop | A sound on every click plus a bed that ducks under the voice |
| 8 | Text too small on a phone | Anything the voice names is >= 26 px |
| 9 | One giant prompt, no review | Beat sheet first, approve, then build |
| 10 | Edits the only version | Keeps v1, builds v2, compares |

## Toolchain

- **Renderer:** one HTML file, Canvas 2D (or DOM + CSS transforms driven by `render(t)`), fonts
  embedded as base64 so headless Chromium draws the same glyphs as the browser preview.
- **Capture:** Python 3 + Playwright (Chromium). `pip install playwright` then
  `python -m playwright install chromium`.
- **Encode and mix:** ffmpeg from ffmpeg.org (or the platform package manager).
- **Voice (optional):** ElevenLabs (hosted; supports delivery tags in square brackets on its
  expressive models as of Oct 2026) or Kokoro TTS (open-source, runs locally; no emotion tags, so
  steer pacing with punctuation and one clip per line). Either way the user supplies or approves the
  voice file; place it, never stretch the picture to fit it.
- If an install or render fails, read the full error and fix the script; the user should never
  have to debug Python.

Only the audio and the frame capture leave the browser; there is no other AI model in the chain.

## QA checklist (before anything is posted)

- **1-second test:** show a stranger the first second of the Solution act. Can they say what it is
  for?
- **Mute test:** most people watch without sound. Does the story still read?
- **Phone test:** watch on a phone at arm's length. Every caption and every UI label the voice names
  is readable (>= 26 px after zoom; vertical cut keeps text out of the top 250 px and bottom
  350 px).
- **Fictional data only:** no real client names, emails or amounts on screen.
- **One CTA** on the end card, matching the brief.
- **Loudness:** integrated -14 LUFS, true peak -1.5 dB (peaks below -1 dB). Verify with
  `loudnorm` measurement, not by ear.
- **Voice placement:** no two phrases overlap; each phrase ends before its beat ends.
- **Counters and charts:** every number counts up; nothing pops in finished.
- **Determinism:** re-render three random frames and diff them against the first pass (identical
  bytes or pixel-identical).
- **Loop seam:** last frame returns to the opening dot; play the loop twice.
- **Accent discipline:** one accent; the hover ring, cursor and CTA share it.

## Output folder layout

```
launch-film/
  refs/
    screenshots/        10-20 screens, named by screen
    logo.svg
    brand.md            colours, font, feel, avoid, CTA
    voice.mp3           TTS take (added at step 6)
  src/
    film.html           the renderer + player (or src/*.js built into dist/film.html)
  tools/
    render.py           Playwright frame capture + offline SFX WAV
    preview.py          stills at chosen seconds + contact sheet
    encode.sh           ffmpeg frames + SFX -> MP4
    vo_mix.py           split voice at pauses, place on beats, duck, master
  work/
    frames/             00000.jpg ... (git-ignored)
    sfx.wav
    stills/
  out/
    beat-sheet.md
    film-v1.mp4  film-v2.mp4  film-final.mp4  film-vertical.mp4
    contact-sheet.jpg
    voiceover.md        script with tags and timing table
    README.md           how to rebuild and change the film
```

## Delivery note (paste with the files)

```
Film: <product> launch film, <60|40> s, 1920x1080 @ 30 fps (<frames> frames), H.264 + AAC
Vertical: 1080x1920, same cut
Versions: v1 (picture), v2 (camera polish), final (voice mix) - all kept
Voice: <ElevenLabs|Kokoro|none>, <n> takes, take <k> used; <n> phrases placed, 0 overlaps
Loudness (measured): I = <x> LUFS, TP = <x> dBTP, LRA = <x>
QA: 1-second [ ] mute [ ] phone [ ] fictional data [ ] one CTA [ ] determinism [ ] loop [ ]
Stills: 1.5 s, <solution start>, <showcase 1>, <showcase 3>, <CTA start>, <end card>
To change: beats -> out/beat-sheet.md; timing -> EVENTS in src/film.html; voice -> refs/voice.mp3
```

## Worked examples

- **"Here are 14 screenshots of our clinic booking app, make a launch video."** Ask for the logo,
  tokens, the pain line, the feature order and the CTA; propose a 60 s beat sheet (Problem: missed
  calls and a paper diary; Solution: dot -> logo -> the booking window rises; Showcase: book a slot
  -> reminder goes out -> front-desk view updates live -> weekly report counts up; CTA: "Start free
  trial"). Build after approval; fictional patient names.
- **"Just a 15-second clip of the new export feature for LinkedIn."** Feature-demo variant: 2 s
  pain line ("Reports took an hour"), one showcase beat with a 2x push-in on the export dialog, a
  counter, a 3 s end card with one CTA. Render 1920x1080 and 1080x1920.
- **"The video feels like slides."** Do not rebuild; make each beat carry an element into the next
  (the submitted form becomes the card that slides into the pipeline), replace fades with motion,
  save as v2 and show stills side by side with v1.
- **"The voice does not match the picture."** Cut the take at its pauses (silencedetect), place
  each phrase at its beat start, confirm each ends before the beat ends, re-mix. Never stretch the
  picture to the voice.

## Anti-patterns / refuse

- Pasting screenshots or screen recordings into the film. Rebuild them.
- Real customer data on screen, even "just for the preview".
- Invented claims in captions or voice (customer counts, revenue figures, awards). Captions carry
  the product's real feature names and the brief's promise; illustrative numbers in the UI are
  labelled fictional in the README.
- A second CTA, a QR code plus a URL plus "follow us".
- CSS keyframes, `setTimeout` or physics simulations inside `render(t)`; they break scrubbing and
  frame-exact export.
- Stock music loops that cannot follow a timing change; synthesize the bed or ask the user for a
  licensed track and duck it.
- Cloning a real person's voice without their documented consent; use a stock or synthetic voice.

## When the user pushes back

- "Skip the beat sheet, just build it": build a 10-line beat sheet anyway and show it with the
  first stills; it costs one message and it is what you will debug against.
- "Use our real dashboard numbers": offer plausible fictional numbers of the same magnitude, or ask
  for written sign-off that the figures are public.
- "Add all nine features": keep 4 (60 s) or 3 (40 s) in the film and offer a second feature clip.
- "Make the text smaller so the whole screen fits": push the camera in instead; the 26 px rule
  exists because the phone is the real screen.
- "We need it in 4K / 60 fps": the pipeline scales (change canvas size and fps constants, frame
  count multiplies); warn that render time scales too and split the frame range across processes.

## Hand-offs

- `web-design`: brand tokens (colours, type scale, surface style) when the product has none.
- `brand-identity`: designing a mascot or character to carry the story; the film only needs its
  moods and poses as one draw function.
- `launch-marketing`: captions, posting plan and landing-page placement for the finished film.
- `ui-ux`: if rebuilding the screens exposes usability problems worth fixing in the product.

## References

- `references/render-pipeline.md` - read when building the HTML skeleton, the Playwright capture
  script, the ffmpeg encode, audio mux, voice placement and loudness normalization commands.
- `references/motion-and-sound.md` - read when choosing easing and durations, setting up the
  camera and cursor, checking text size, writing Web Audio SFX recipes, or setting mix and ducking
  values.
- `references/prompts.md` - read when writing the brief, the beat sheet, the step prompts, the
  voiceover script with emotion tags, or diagnosing a film that looks off ("you see / you say").
- `references/sources.md` - attribution for the method and numbers used here.
