# Render pipeline: from one HTML file to an MP4

Contents

1. Determinism rules for `render(t)`
2. HTML skeleton (canvas, easing, events, camera, player, export hooks)
3. Offline audio render to WAV (inside the page)
4. Playwright frame capture (`tools/render.py`)
5. Stills and contact sheet (`tools/preview.py`)
6. ffmpeg encode: 1080p, vertical, parallel chunks
7. Voice: detect pauses, split, place on beats
8. Mix: high-pass, compression, ducking, loudness (`tools/vo_mix.py`)
9. Vertical cut
10. Troubleshooting

Four stages, always in this order: BUILD (src -> `film.html`, fonts embedded) -> FRAMES
(`render(t)` x 1,800 -> JPEGs + SFX WAV) -> ENCODE (ffmpeg -> H.264 MP4) -> MIX (voice on beats,
bed ducked, -14 LUFS).

```bash
python tools/preview.py dist/film.html 1.5,12,25,38,50,58            # stills + contact sheet
python tools/render.py dist/film.html --out work/frames --start 0 --end 1800 --audio work/sfx.wav
bash   tools/encode.sh work/frames work/sfx.wav out/film-v1.mp4
python tools/vo_mix.py --vo refs/voice.mp3 --bed work/sfx.wav --video out/film-v1.mp4 --out out/film-final.mp4
```

## 1. Determinism rules for `render(t)`

`render(t)` must return the same pixels for the same `t`, every time, in any browser session.
Playwright seeks to arbitrary times and may render frames out of order or in parallel processes.

- No `Date.now()`, `performance.now()` or `requestAnimationFrame` inside `render`. The live player
  uses rAF only to compute `t` and call `render(t)`.
- No CSS transitions or `@keyframes`, no `setTimeout`/`setInterval`, no physics stepped per frame.
  Anything that moves is an explicit function of `t`.
- No `Math.random()`. Use a seeded hash (`hash(frameIndex, salt)`) for grain, glitch slices and
  hand-held jitter so a frame re-renders identically.
- No state carried between calls (no `lastX`, no accumulating counters). Cursor position at `t` is
  computed from the keyframe list, not integrated from the previous frame.
- Fonts embedded as base64 `@font-face` and awaited (`document.fonts.ready`) before the first frame;
  a fallback font changes every text width.
- Images: logo as inline SVG path data or a base64 `<img>` decoded before `ready = true`. No remote
  URLs.
- Draw synchronously inside `seek(t)`; the capture script screenshots immediately after it returns.
- Clear and redraw the whole canvas every frame; never rely on what the previous frame left behind.

Quick self-test: `seek(24.37)`, grab `canvas.toDataURL()`, `seek(3)`, `seek(24.37)` again, compare
strings. They must be identical.

## 2. HTML skeleton

Single file, Canvas 2D. Keep scene code in small draw functions that each take `t` and return early
outside their time window; overlapping windows are how one beat carries into the next.

```html
<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>Launch film</title>
<style>
  @font-face{font-family:"Brand";src:url(data:font/woff2;base64,/*...*/) format("woff2");font-weight:400 800}
  @font-face{font-family:"Mono";src:url(data:font/woff2;base64,/*...*/) format("woff2")}
  html,body{margin:0;height:100%;background:#000;overflow:hidden}
  #stage{position:fixed;left:50%;top:50%;transform:translate(-50%,-50%) scale(var(--fit,1));transform-origin:center}
  #player{position:fixed;left:0;right:0;bottom:0;padding:10px 14px;background:rgba(0,0,0,.6);color:#fff;
          font:12px system-ui;display:flex;gap:10px;align-items:center}
  #player input[type=range]{flex:1}
  .chip{padding:2px 8px;border:1px solid #666;border-radius:999px;cursor:pointer}
  body.export #player{display:none}
</style>
</head>
<body>
<canvas id="stage" width="1920" height="1080"></canvas>
<div id="player">
  <button id="play">Play</button>
  <span id="time">0.00</span>
  <input id="scrub" type="range" min="0" max="1800" step="1" value="0">
  <span id="chips"></span>
  <span>&larr;/&rarr; frame &middot; F full &middot; M mute</span>
</div>
<script>
// ---------- constants ----------
const W = 1920, H = 1080, FPS = 30, DUR = 60;            // vertical cut: W=1080, H=1920
const SCENES = [                                          // 60 s timings; 40 s: 0 / 8 / 13 / 32
  { name: "Problem",  t: 0  },
  { name: "Solution", t: 12 },
  { name: "Showcase", t: 19 },
  { name: "CTA",      t: 49 },
];
const BRAND = { bg: "#0B0B0C", accent: "#4F8CFF", text: "#F4F4F5", font: "Brand", mono: "Mono" };

// ---------- easing + helpers ----------
const clamp01   = x => Math.max(0, Math.min(1, x));
const lerp      = (a, b, p) => a + (b - a) * p;
const outExpo   = x => x >= 1 ? 1 : 1 - Math.pow(2, -10 * x);
const inOutCubic= x => x < .5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;
const outBack   = (x, s = 1.70158) => 1 + (s + 1) * Math.pow(x - 1, 3) + s * Math.pow(x - 1, 2);
// progress of t through [a, b] with easing e; 0 before a, 1 after b
const seg = (t, a, b, e = outExpo) => e(clamp01((t - a) / (b - a)));
// seeded, frame-stable pseudo-random in [0,1)
function hash(n, salt = 0) {
  let x = Math.imul((n | 0) ^ (salt * 374761393), 668265263);
  x = Math.imul(x ^ (x >>> 13), 1274126177);
  return ((x ^ (x >>> 16)) >>> 0) / 4294967296;
}

// ---------- event timeline (drives cursor, camera, SFX) ----------
// One source of truth. Sound and camera are generated from this list, so moving a beat moves everything.
const EVENTS = [
  { t: 19.6, type: "move",  to: [640, 420], dur: 0.6 },
  { t: 20.2, type: "click", at: [640, 420], target: "field.name" },
  { t: 20.4, type: "type",  text: "Asha Verma", at: [640, 420], cps: 14 },   // chars per second
  { t: 22.0, type: "move",  to: [980, 640], dur: 0.5 },
  { t: 22.5, type: "drag",  from: [980, 640], to: [1420, 640], dur: 0.8, target: "card.lead" },
  { t: 23.6, type: "ping",  at: [1500, 120] },
  { t: 24.0, type: "count", from: 0, to: 128400, dur: 1.4, target: "kpi.revenue" },
];

// cursor position at t: last move/drag before t, eased with a slight arc; frame-stable
function cursorAt(t) {
  let pos = [W / 2, H / 2];
  for (const e of EVENTS) {
    if (e.t > t) break;
    if (e.type === "move" || e.type === "drag") {
      const from = e.from || pos, p = seg(t, e.t, e.t + e.dur, inOutCubic);
      const arc = Math.sin(p * Math.PI) * 24;                     // slight arc, px
      pos = [lerp(from[0], e.to[0], p), lerp(from[1], e.to[1], p) - arc];
    }
  }
  return pos;
}

// camera: 2x push-in on the active action, 0.1 s lag behind the cursor, settle out after
function cameraAt(t) {
  const active = EVENTS.find(e => (e.type === "type" || e.type === "drag") &&
                                  t >= e.t - 0.3 && t <= e.t + (e.dur || (e.text.length / e.cps)) + 0.5);
  const c = cursorAt(t - 0.1);
  const zoomIn = active ? seg(t, active.t - 0.3, active.t + 0.3, inOutCubic) : 0;
  const scale = lerp(1, 2, zoomIn);
  const float = [(hash(Math.floor(t * FPS), 1) - .5) * 6, (hash(Math.floor(t * FPS), 2) - .5) * 6]; // +/-3 px hand-held
  return { x: lerp(W / 2, c[0], zoomIn) + float[0], y: lerp(H / 2, c[1], zoomIn) + float[1], scale };
}

// ---------- scenes ----------
function drawProblem(ctx, t)  { if (t > 13) return; /* kinetic type, chaos, badge counting up ... */ }
function drawSolution(ctx, t) { if (t < 11.5 || t > 20) return; /* implode to dot, morph to logo, window rises ... */ }
function drawShowcase(ctx, t) { if (t < 18.5 || t > 50) return; /* rebuilt UI screens, driven by EVENTS ... */ }
function drawCTA(ctx, t)      { if (t < 48.5) return; /* payoffs, logo, tagline, one action, collapse to dot ... */ }

function drawCursor(ctx, t) {
  const [x, y] = cursorAt(t);
  const pressing = EVENTS.some(e => e.type === "click" && t >= e.t && t < e.t + 0.12);
  const s = pressing ? 0.85 : 1;                                  // press squash
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  // ... arrow shape, faint ghosts at cursorAt(t-1/FPS), cursorAt(t-2/FPS) at 30% / 15% alpha
  ctx.restore();
}
function drawGrainAndVignette(ctx, t) {
  // 6% grain from hash(frame, pixelBlock), soft radial vignette; drawn in screen space after the camera transform
}

// ---------- the one function that matters ----------
const stage = document.getElementById("stage");
function render(t) {
  const ctx = stage.getContext("2d");
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.fillStyle = BRAND.bg; ctx.fillRect(0, 0, W, H);
  const cam = cameraAt(t);
  ctx.translate(W / 2, H / 2); ctx.scale(cam.scale, cam.scale); ctx.translate(-cam.x, -cam.y);
  drawProblem(ctx, t); drawSolution(ctx, t); drawShowcase(ctx, t); drawCTA(ctx, t);
  drawCursor(ctx, t);
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  drawGrainAndVignette(ctx, t);
}

// ---------- live player (the only place time comes from a clock) ----------
let playing = false, tAt = 0, t0 = 0, muted = false;
const scrub = document.getElementById("scrub"), timeEl = document.getElementById("time");
function show(t) { tAt = t; render(t); scrub.value = Math.round(t * FPS); timeEl.textContent = t.toFixed(2); }
function tick(now) {
  if (playing) {
    let t = (now - t0) / 1000; if (t >= DUR) { t0 = now; t = 0; }  // loop
    show(t); if (!muted) sfxLive.advance(t);                         // schedule upcoming sounds (section 3)
  }
  requestAnimationFrame(tick);
}
document.getElementById("play").onclick = () => { playing = !playing; t0 = performance.now() - tAt * 1000; sfxLive.unlock(); };
scrub.oninput = () => { playing = false; show(+scrub.value / FPS); };
SCENES.forEach(s => { const c = document.createElement("span"); c.className = "chip"; c.textContent = s.name;
  c.onclick = () => { playing = false; show(s.t); }; document.getElementById("chips").append(c); });
addEventListener("keydown", e => {
  if (e.key === "ArrowRight") { playing = false; show(Math.min(DUR - 1 / FPS, tAt + 1 / FPS)); }
  if (e.key === "ArrowLeft")  { playing = false; show(Math.max(0, tAt - 1 / FPS)); }
  if (e.key === " ")          { document.getElementById("play").click(); e.preventDefault(); }
  if (e.key.toLowerCase() === "f") document.documentElement.requestFullscreen();
  if (e.key.toLowerCase() === "m") muted = !muted;
});
function fit() { document.documentElement.style.setProperty("--fit", Math.min(innerWidth / W, (innerHeight - 48) / H)); }
addEventListener("resize", fit); fit();

// ---------- export hooks used by tools/render.py ----------
window.__film = {
  ready: false, W, H, FPS, DUR, SCENES,
  seek: t => { playing = false; show(t); },                  // synchronous draw
  exportMode: on => { playing = false; document.body.classList.toggle("export", on); },
  renderAudio: () => renderAudioOffline(),                    // returns base64 WAV (section 3)
};
document.fonts.ready.then(() => { window.__film.ready = true; show(0); requestAnimationFrame(tick); });
</script>
</body>
</html>
```

Build step: if the film is split into `src/*.js` for sanity, concatenate into `dist/film.html` with
a 20-line `tools/build.py` that inlines scripts and base64-encodes the fonts. The deliverable is
always the single file.

## 3. Offline audio render to WAV

Sound is scheduled from `EVENTS` into an `AudioContext` (live) or an `OfflineAudioContext`
(export). Write the graph-building code once and pass it the context, so what you hear in the
browser is what the WAV contains.

```js
function buildGraph(ctx) {          // returns busses; same for live and offline (recipes: motion-and-sound.md)
  const master = ctx.createDynamicsCompressor();            // safety limiter
  master.threshold.value = -3; master.knee.value = 0; master.ratio.value = 20; master.connect(ctx.destination);
  const sfx = ctx.createGain(), music = ctx.createGain(), verb = ctx.createConvolver();
  verb.buffer = impulse(ctx, 1.6);                           // one shared room
  const send = ctx.createGain(); send.gain.value = 0.18; send.connect(verb); verb.connect(master);
  sfx.connect(master); sfx.connect(send); music.connect(master); music.connect(send);
  return { sfx, music, send };
}
function scheduleAll(ctx, bus, fromT = 0, toT = DUR) {       // schedule every event with t in [fromT, toT)
  for (const e of EVENTS) if (e.t >= fromT && e.t < toT) SFX[e.type]?.(ctx, bus, e);
  scheduleMusic(ctx, bus, SCENES[1].t, DUR, 120);            // bed from the reveal onward, 120 bpm
}
async function renderAudioOffline() {
  const sr = 48000, ctx = new OfflineAudioContext(2, sr * DUR, sr);
  scheduleAll(ctx, buildGraph(ctx));
  const buf = await ctx.startRendering();
  return btoa(String.fromCharCode(...new Uint8Array(encodeWav16(buf)))); // chunk the conversion for long buffers
}
// live: a 0.25 s look-ahead scheduler that calls SFX[e.type] once per event as tAt passes e.t - lookahead
```

`encodeWav16(audioBuffer)`: 44-byte RIFF header, 16-bit PCM, interleaved channels. Browsers block
audio until a user gesture, so `sfxLive.unlock()` resumes the context on the first Play click; the
offline context has no such restriction.

## 4. Playwright frame capture (`tools/render.py`)

```python
#!/usr/bin/env python3
"""Step render(t) frame by frame and screenshot each one. Usage:
   python tools/render.py dist/film.html --out work/frames --start 0 --end 1800 --audio work/sfx.wav"""
import argparse, base64, pathlib
from playwright.sync_api import sync_playwright

ap = argparse.ArgumentParser()
ap.add_argument("html")
ap.add_argument("--out", default="work/frames")
ap.add_argument("--start", type=int, default=0)        # first frame (inclusive)
ap.add_argument("--end", type=int, default=1800)       # last frame (exclusive)
ap.add_argument("--fps", type=int, default=30)
ap.add_argument("--width", type=int, default=1920)
ap.add_argument("--height", type=int, default=1080)
ap.add_argument("--quality", type=int, default=92)     # JPEG; use --png for lossless intermediates
ap.add_argument("--png", action="store_true")
ap.add_argument("--audio", help="also render the SFX/music WAV to this path")
a = ap.parse_args()

out = pathlib.Path(a.out); out.mkdir(parents=True, exist_ok=True)
with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page(viewport={"width": a.width, "height": a.height}, device_scale_factor=1)
    page.goto(pathlib.Path(a.html).resolve().as_uri())
    page.wait_for_function("document.fonts.status === 'loaded' && window.__film && window.__film.ready")
    page.evaluate("window.__film.exportMode(true)")
    canvas = page.locator("#stage")
    for f in range(a.start, a.end):
        page.evaluate("t => window.__film.seek(t)", f / a.fps)
        if a.png:
            canvas.screenshot(path=str(out / f"{f:05d}.png"))
        else:
            canvas.screenshot(path=str(out / f"{f:05d}.jpg"), type="jpeg", quality=a.quality)
        if f % 150 == 0:
            print(f"frame {f}/{a.end}", flush=True)
    if a.audio:
        wav_b64 = page.evaluate("() => window.__film.renderAudio()")
        pathlib.Path(a.audio).write_bytes(base64.b64decode(wav_b64))
    browser.close()
```

Notes:

- Screenshot the canvas element, not the page, so the player chrome and the `--fit` scale never
  leak in. `device_scale_factor=1` keeps 1920x1080 exactly.
- Speed depends on scene complexity: time a 100-frame sample first and extrapolate before
  committing to a full render. For faster turnarounds run two or more processes on disjoint ranges (`--start 0 --end 900` and
  `--start 900 --end 1800`) into the same folder; numbering stays continuous so ffmpeg reads them
  as one sequence.
- Preview renders: `--fps 10` with `--end 600` gives a quick 60 s at 10 fps for timing checks
  (encode with `-framerate 10`).

## 5. Stills and contact sheet (`tools/preview.py`)

Review stills, not the whole film. Default review seconds for a 60 s cut: 1.5, 12, 25, 38, 50, 58
(opening, reveal, two showcase beats, payoff, end card).

```python
#!/usr/bin/env python3
"""python tools/preview.py dist/film.html 1.5,12,25,38,50,58  -> work/stills/still-12.00s.png + sheet"""
import pathlib, subprocess, sys
from playwright.sync_api import sync_playwright
html, secs = sys.argv[1], [float(s) for s in sys.argv[2].split(",")]
out = pathlib.Path("work/stills"); out.mkdir(parents=True, exist_ok=True)
with sync_playwright() as p:
    b = p.chromium.launch(); page = b.new_page(viewport={"width": 1920, "height": 1080})
    page.goto(pathlib.Path(html).resolve().as_uri())
    page.wait_for_function("window.__film && window.__film.ready"); page.evaluate("window.__film.exportMode(true)")
    for s in secs:
        page.evaluate("t => window.__film.seek(t)", s)
        page.locator("#stage").screenshot(path=str(out / f"still-{s:05.2f}s.png"))
    b.close()
files = sorted(out.glob("still-*.png"))
subprocess.run(["ffmpeg", "-y", *sum([["-i", str(f)] for f in files], []),
                "-filter_complex", f"{''.join(f'[{i}:v]' for i in range(len(files)))}hstack=inputs={len(files)},scale=-1:240",
                str(out / "sheet.png")], check=True)
```

Contact sheet of a finished MP4 (one frame every 5 s of a 30 fps film, 4x3 grid):

```bash
ffmpeg -y -i out/film-final.mp4 -vf "select='not(mod(n,150))',scale=480:-1,tile=4x3" -frames:v 1 out/contact-sheet.jpg
```

## 6. ffmpeg encode

`tools/encode.sh FRAMES_DIR SFX_WAV OUT_MP4`:

```bash
#!/usr/bin/env bash
set -euo pipefail
FRAMES=$1; AUDIO=$2; OUT=$3; FPS=${FPS:-30}
ffmpeg -y -framerate "$FPS" -i "$FRAMES/%05d.jpg" -i "$AUDIO" \
  -c:v libx264 -preset slow -crf 18 -pix_fmt yuv420p -profile:v high -level 4.1 \
  -color_primaries bt709 -color_trc bt709 -colorspace bt709 \
  -c:a aac -b:a 192k -ar 48000 -shortest -movflags +faststart "$OUT"
```

- `yuv420p` is required for QuickTime, Instagram and most phones; without it the file plays only in
  some desktop players.
- `-crf 18` is visually lossless for UI content; use `-crf 20` if file size matters for upload.
- Vertical (1080x1920) uses the identical command; only the frames differ. Add
  `-vf "scale=1080:1920:flags=lanczos"` if the frames were captured at another size (avoid; capture
  at the target size so text stays sharp).
- Frames rendered as PNG: swap `%05d.png`.
- Picture only, no audio yet: drop the `-i "$AUDIO"`, `-c:a`, `-shortest` arguments.
- Frames in chunks from parallel renders are already one numbered sequence. If two folders were
  used, encode each (`-start_number 900` for the second) and join with
  `ffmpeg -f concat -safe 0 -i list.txt -c copy joined.mp4` where `list.txt` holds `file 'a.mp4'`
  lines.
- GIF or WebM for a landing page: `ffmpeg -i film.mp4 -c:v libvpx-vp9 -b:v 0 -crf 32 -an film.webm`.

## 7. Voice: detect pauses, split, place on beats

Generate one long take with a long pause between lines (see `prompts.md`), then cut it at the
silences and place each phrase on its beat start from the timing table. The picture is never
stretched to the voice.

```bash
# 1. find silences (threshold and minimum length may need tuning per voice)
ffmpeg -i refs/voice.mp3 -af "silencedetect=noise=-35dB:d=0.35" -f null - 2>&1 | grep -E "silence_(start|end)"
# 2. cut one phrase (seconds from the detect output; pad 40 ms each side)
ffmpeg -y -i refs/voice.mp3 -ss 3.21 -to 5.87 -c:a pcm_s16le -ar 48000 work/vo/phrase-05.wav
```

`tools/vo_mix.py` does this in a loop: parse `silence_end`/`silence_start` pairs into phrase
intervals, cut each, read the beat start times from `out/voiceover.md` (or a JSON list), and build
one filtergraph that delays each phrase to its start:

```python
# phrases = [("work/vo/phrase-01.wav", 0.6), ("work/vo/phrase-02.wav", 3.4), ...]  # (file, start_s)
inputs, chain = [], []
for i, (f, start) in enumerate(phrases):
    inputs += ["-i", f]
    ms = int(start * 1000)
    chain.append(f"[{i}:a]adelay={ms}|{ms}[p{i}]")
mix = "".join(f"[p{i}]" for i in range(len(phrases))) + f"amix=inputs={len(phrases)}:normalize=0,apad=whole_dur={DUR}[vo]"
cmd = ["ffmpeg", "-y", *inputs, "-filter_complex", ";".join(chain + [mix]), "-map", "[vo]", "-ar", "48000", "work/vo_placed.wav"]
```

Check before mixing: for every phrase, `start + duration <= must_end_by` from the timing table, and
no two intervals overlap. If one is long, shorten the line and regenerate that line only; do not
time-stretch the voice.

## 8. Mix: high-pass, compression, ducking, loudness

| Stage | Setting |
|---|---|
| Voice | High-pass 80 Hz; compressor threshold -20 dBFS (linear 0.1), ratio 3:1 |
| Music + SFX bed | Gain 0.8; side-chain ducked under the voice: threshold 0.025, ratio 5, attack 25 ms, release 380 ms |
| Master | `loudnorm` I = -14 LUFS, TP = -1.5 dBTP, LRA = 11 |

```bash
ffmpeg -y -i out/film-v2.mp4 -i work/sfx.wav -i work/vo_placed.wav -filter_complex "
  [2:a]highpass=f=80,acompressor=threshold=0.1:ratio=3:attack=15:release=200,asplit=2[vo][sc];
  [1:a]volume=0.8[bed];
  [bed][sc]sidechaincompress=threshold=0.025:ratio=5:attack=25:release=380[ducked];
  [ducked][vo]amix=inputs=2:normalize=0,loudnorm=I=-14:TP=-1.5:LRA=11,aresample=48000[mix]" \
  -map 0:v -map "[mix]" -c:v copy -c:a aac -b:a 192k -movflags +faststart out/film-final.mp4
```

- `asplit` is needed because `sidechaincompress` consumes its key input; one copy ducks the bed,
  the other is mixed.
- The video stream is copied (`-c:v copy`), so re-mixing the voice never re-encodes the picture.
- Single-pass `loudnorm` is dynamic. For the final master do two passes: measure, then apply the
  measured values linearly.

```bash
# pass 1: measure
ffmpeg -i out/film-final.mp4 -af loudnorm=I=-14:TP=-1.5:LRA=11:print_format=json -f null - 2>&1 | tail -n 12
# pass 2: apply with measured_I / measured_TP / measured_LRA / measured_thresh / offset from pass 1
ffmpeg -y -i out/film-final.mp4 -af "loudnorm=I=-14:TP=-1.5:LRA=11:measured_I=-16.2:measured_TP=-3.1:measured_LRA=9.8:measured_thresh=-26.5:offset=0.4:linear=true,aresample=48000" \
  -c:v copy -c:a aac -b:a 192k out/film-final.mp4.tmp.mp4 && mv out/film-final.mp4.tmp.mp4 out/film-final.mp4
# verify: output_i near -14, output_tp <= -1.5
ffmpeg -i out/film-final.mp4 -af loudnorm=print_format=summary -f null - 2>&1 | tail -n 12
```

-14 LUFS integrated with true peak at or below -1.5 dBTP is the target the source method used so
the major social platforms (which normalise to around -14 LUFS as of Oct 2026) do not turn the film
down or clip it. Report the measured numbers in the delivery note.

If the user supplies a licensed music track instead of the synthesized bed, drop it in as another
input, place it from the reveal with `adelay`, give it the same 0.8 gain and the same ducking.

## 9. Vertical cut

Same `EVENTS`, same timing, same voice mix; only layout and camera change.

- Set `W = 1080, H = 1920`; keep `FPS` and `DUR`.
- Keep all text out of the top 250 px and bottom 350 px so platform UI never covers it.
- Scale the product window to fill the width; push the camera close-ups further in (2x becomes
  about 2.5-3x; re-check the 26 px rule).
- Re-stack layouts that were side by side; a pipeline with five columns becomes a vertical list
  with the active column expanded.
- Capture with `--width 1080 --height 1920`, encode with the same command, then reuse the mixed
  audio: `ffmpeg -i vertical-sfx.mp4 -i out/film-final.mp4 -map 0:v -map 1:a -c copy -shortest out/film-vertical.mp4`.
  The SFX bed is identical because it is generated from the same `EVENTS`.

## 10. Troubleshooting

| Symptom | Cause and fix |
|---|---|
| Text widths differ between preview and frames | Font not embedded or not awaited. Base64 the woff2 and wait for `document.fonts.status === "loaded"`. |
| Frames differ on re-render | Some `Math.random()`, `Date.now()` or cross-frame state slipped in. Grep `render` and helpers; replace with `hash(frame, salt)` and pure functions. |
| Black frames at the start | Screenshots taken before `ready`; the wait_for_function must include `window.__film.ready`. |
| Player chrome visible in frames | `exportMode(true)` not called, or page screenshot used instead of the canvas locator. |
| Rendering takes forever | Render disjoint frame ranges in parallel processes; lower JPEG quality to 85 for drafts; use `--fps 10` for timing checks. |
| MP4 will not play on a phone | Missing `-pix_fmt yuv420p` or odd dimensions. Dimensions must be even. |
| Audio drifts from picture | SFX WAV must be exactly `DUR` seconds at the same sample rate; `OfflineAudioContext(2, sr*DUR, sr)` guarantees it. Check with `ffprobe -show_entries stream=duration`. |
| Voice phrases overlap | Shorten the line and regenerate it; or move the beat in `EVENTS` and re-render that range. Never time-stretch. |
| Loud clicks or clipping | Master limiter threshold too high, or SFX gains add up; lower bus gains, keep true peak at -1.5 dBTP. |
| Headless Chromium draws differently from the desktop browser | Same engine, different GPU path; avoid `filter: blur()` on large regions and use canvas-drawn soft shadows; set `device_scale_factor=1`. |
