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
10. Capturing a seeded demo tenant (`tools/capture_demo.py`)
11. Several cuts from one source
12. Poster frames
13. Pre-delivery checks (`tools/check.py`)
14. If the HyperFrames skills are installed
15. Troubleshooting

Stages, always in this order, per cut: BUILD (src -> `film.html`, fonts embedded) -> MUSIC (a
licensed track edited to the cut + its RMS array; skip for the synthesized bed) -> FRAMES
(`render(t)` x DUR x 30 -> JPEGs + SFX WAV) -> ENCODE (ffmpeg -> H.264 MP4) -> MIX (voice on beats,
bed ducked, -14 LUFS) -> POSTER -> CHECK.

```bash
python tools/music.py --cut web                                      # work/bed-web.wav + work/rms-web.json
python tools/preview.py dist/film.html 1.5,8,12,18,24,29 web          # stills + contact sheet
python tools/render.py dist/film.html --cut web --out work/frames/web --audio work/sfx-web.wav
bash   tools/encode.sh work/frames/web work/sfx-web.wav out/film-web-v1.mp4
python tools/vo_mix.py --vo refs/voice.mp3 --bed work/sfx-web.wav --video out/film-web-v1.mp4 --out out/film-web-final.mp4
python tools/check.py dist/film.html out/acme-web-30s.mp4 --cut web --loop
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
// ---------- cuts: one source, several films (?cut=web) ----------
const CUT = new URLSearchParams(location.search).get("cut") || "launch";
const CUTS = {                                            // scene starts sit on the bar grid (motion-and-sound.md 11)
  launch: { DUR: 60, DROP: 12, scenes: [["Problem", 0], ["Solution", 12], ["Showcase", 19], ["CTA", 49]] },
  web:    { DUR: 30, DROP: 8,  scenes: [["Problem", 0], ["Solution", 8], ["Showcase", 11], ["CTA", 26.5]] },
  // share: { DUR: 80, DROP: 14, scenes: [...] }        a longer tour adds showcase scenes, not longer ones
};                                                        // 40 s: 0 / 8 / 13 / 32
const W = 1920, H = 1080, FPS = 30;                       // vertical cut: W=1080, H=1920
const { DUR, DROP } = CUTS[CUT];
const SCENES = CUTS[CUT].scenes.map(([name, t]) => ({ name, t }));
const span = name => { const i = SCENES.findIndex(s => s.name === name);   // [start, end) of a scene
  return i < 0 ? [Infinity, Infinity] : [SCENES[i].t, (SCENES[i + 1] || { t: DUR }).t]; };
const at = (name, dt) => span(name)[0] + dt;              // events are written scene-relative, so they move with the scene
const MUSIC = { bpm: 120, drop: DROP };                   // measured BPM of the bed or the licensed track

// ---------- theme: one switch; palettes by role (60 ground / 30 text / 10 accent) ----------
const THEME = "dark";
const PALETTES = {                                        // ACCENT: marks, rings, cursor - never text
  dark:  { GROUND: "#0B0B0C", TEXT: "#F4F4F5", QUIET: "#A1A1AA", ACCENT: "#4F8CFF", ACCENT_TEXT: "#4F8CFF", GLOW_LO: 0.12, GLOW_SPAN: 0.13 },
  light: { GROUND: "#F7F5F0", TEXT: "#0A0A0A", QUIET: "#57534E", ACCENT: "#4F8CFF", ACCENT_TEXT: "#1D4ED8", GLOW_LO: 0.05, GLOW_SPAN: 0.09 },
};                                                        // ACCENT_TEXT: the deepened accent that passes 4.5:1 as text
const P = PALETTES[THEME];
const BRAND = { bg: P.GROUND, accent: P.ACCENT, text: P.TEXT, font: "Brand", mono: "Mono" };
const RMS = ({ launch: [], web: [] })[CUT] || [];         // paste work/rms-<cut>.json here (motion-and-sound.md 14)
const rmsAt = t => { const i = t * 10, a = RMS[Math.floor(i)] ?? 0, b = RMS[Math.floor(i) + 1] ?? a; return a + (b - a) * (i % 1); };
// every line of on-screen text: [text, t0, t1, rendered px after camera zoom]; read by tools/check.py
const CAPTIONS = [ /* { text: "[pain line]", t0: at("Problem", 2), t1: at("Problem", 4.5), px: 72 }, ... */ ];

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
const EVENTS = [                                          // times via at(scene, dt): a moved scene keeps its sounds
  { t: at("Showcase", 0.6), type: "move",  to: [640, 420], dur: 0.6 },
  { t: at("Showcase", 1.2), type: "click", at: [640, 420], target: "field.name" },
  { t: at("Showcase", 1.4), type: "type",  text: "Asha Verma", at: [640, 420], cps: 14 },   // chars per second
  { t: at("Showcase", 3.0), type: "move",  to: [980, 640], dur: 0.5 },
  { t: at("Showcase", 3.5), type: "drag",  from: [980, 640], to: [1420, 640], dur: 0.8, target: "card.lead" },
  { t: at("Showcase", 4.6), type: "ping",  at: [1500, 120] },
  { t: at("Showcase", 5.0), type: "count", from: 0, to: 128400, dur: 1.4, target: "kpi.revenue" },
].sort((a, b) => a.t - b.t);

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
// windows come from SCENES, so every cut works; overlap by ~0.5 s so one beat can hand off to the next
const live = (t, name) => { const [a, b] = span(name); return t >= a - 0.5 && t <= b + 1; };
function drawProblem(ctx, t)  { if (!live(t, "Problem"))  return; /* hook, kinetic type, chaos, one line per bar ... */ }
function drawSolution(ctx, t) { if (!live(t, "Solution")) return; /* implode to dot, morph to logo on DROP, window rises ... */ }
function drawShowcase(ctx, t) { if (!live(t, "Showcase")) return; /* rebuilt or captured screens, driven by EVENTS ... */ }
function drawCTA(ctx, t)      { if (!live(t, "CTA"))      return; /* payoffs, logo, tagline, one action, collapse to dot ... */ }
function drawGlow(ctx, t) {                                // the one audio-reactive element, behind the cards
  const g = ctx.createRadialGradient(W / 2, H * 0.52, 0, W / 2, H * 0.52, W * 0.5);
  g.addColorStop(0, P.ACCENT); g.addColorStop(1, "rgba(0,0,0,0)");
  ctx.save(); ctx.globalAlpha = P.GLOW_LO + P.GLOW_SPAN * rmsAt(t); ctx.fillStyle = g; ctx.fillRect(0, 0, W, H); ctx.restore();
}

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
  drawGlow(ctx, t);                                        // screen space, under the camera
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
  ready: false, W, H, FPS, DUR, SCENES, CUT, EVENTS, CAPTIONS, MUSIC, PALETTE: P,   // check.py reads these
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
  scheduleMusic(ctx, bus, DROP, DUR, MUSIC.bpm);           // synthesized bed from the drop; skip it when a
                                                             // licensed bed (work/bed-<cut>.wav) is mixed in ffmpeg
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
   python tools/render.py dist/film.html --cut web --out work/frames/web --audio work/sfx-web.wav"""
import argparse, base64, pathlib
from playwright.sync_api import sync_playwright

ap = argparse.ArgumentParser()
ap.add_argument("html")
ap.add_argument("--out", default="work/frames")
ap.add_argument("--start", type=int, default=0)        # first frame (inclusive)
ap.add_argument("--end", type=int)                     # last frame (exclusive); default: the cut's DUR * fps
ap.add_argument("--cut", default="")                   # which cut of the film (?cut=...)
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
    page.goto(pathlib.Path(a.html).resolve().as_uri() + (f"?cut={a.cut}" if a.cut else ""))
    page.wait_for_function("document.fonts.status === 'loaded' && window.__film && window.__film.ready")
    page.evaluate("window.__film.exportMode(true)")
    if a.end is None:
        a.end = round(page.evaluate("window.__film.DUR") * a.fps)
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
"""python tools/preview.py dist/film.html 1.5,12,25,38,50,58 [cut] -> work/stills/<cut>/still-12.00s.png + sheet"""
import pathlib, subprocess, sys
from playwright.sync_api import sync_playwright
html, secs = sys.argv[1], [float(s) for s in sys.argv[2].split(",")]
cut = sys.argv[3] if len(sys.argv) > 3 else ""
out = pathlib.Path("work/stills") / (cut or "main"); out.mkdir(parents=True, exist_ok=True)
with sync_playwright() as p:
    b = p.chromium.launch(); page = b.new_page(viewport={"width": 1920, "height": 1080})
    page.goto(pathlib.Path(html).resolve().as_uri() + (f"?cut={cut}" if cut else ""))
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

A licensed track instead of the synthesized bed: edit it per cut first (`tools/music.py`,
`motion-and-sound.md` sections 12-13), then mix the bed and the SFX WAV before the voice. With a
voice, the bed takes the same 0.8 gain and the same ducking; without one:

```bash
ffmpeg -y -i out/film-web-v2.mp4 -i work/bed-web.wav -i work/sfx-web.wav -filter_complex "
  [1:a]volume=0.4[m];[m][2:a]amix=inputs=2:normalize=0[mix]" \
  -map 0:v -map "[mix]" -c:v copy -c:a pcm_s16le work/web-premaster.mov
```

Then the two-pass `loudnorm` above (pass 2 can also bake the poster into frame 0, section 12).

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
- One vertical per cut that needs it (usually the short one); `?cut=web&vertical=1` keeps it one
  source.

## 10. Capturing a seeded demo tenant (`tools/capture_demo.py`)

When the app runs locally, real screens from a demo tenant are more convincing than a rebuild and
faster to make. The privacy rules in `SKILL.md` apply: local database only, never production, a
fictional identity and seeded fictional records, and nothing from the account the demo was copied
from.

- Seed first: create or reset the tenant with its fictional name, address, owner, phone and a
  generated logo; seed today's records (customers, orders, invoices) with invented names and numbers
  of a plausible size.
- Capture at 2x (`device_scale_factor=2` on a 1440x810 viewport gives 2880x1620 stills) so
  punch-ins stay sharp; a phone page at 3x on a 400 px wide viewport.
- Typing: one screenshot per keystroke (`press_sequentially` one character at a time), saved as
  `typing/f000.png`, `f001.png`, ... `render(t)` steps through them on the typing schedule, with
  short pauses at field changes; the status chip that flips is a key moment with its own sound.
- Stop on real data: list the real identifiers (the source account's name, owner, phone, domain)
  and abort the capture if any appears in the page text. Then look at every image at 100% before it
  enters the film; crop columns that leak personal times or notes.
- In the film: load the images from `refs/capture/` by relative path and await `img.decode()`
  before `ready = true`; draw them as cards (rounded, shadowed) and punch in inside the card's frame
  (1.4-1.6x), so the card itself never shows an empty edge.

```python
#!/usr/bin/env python3
"""python tools/capture_demo.py http://localhost:5173 refs/capture   (local demo tenant only)"""
import os, pathlib, sys
from playwright.sync_api import sync_playwright
BASE, OUT = sys.argv[1], pathlib.Path(sys.argv[2]); (OUT / "typing").mkdir(parents=True, exist_ok=True)
SCREENS = {"dashboard": "/dashboard", "billing": "/billing"}     # name -> route, one per beat
REAL = [x for x in os.environ.get("REAL_IDENTIFIERS", "").split("|") if x]   # source account's name, owner, phone...
with sync_playwright() as p:
    page = p.chromium.launch().new_page(viewport={"width": 1440, "height": 810}, device_scale_factor=2)
    # sign in as the demo user here (credentials from env vars); never screenshot the sign-in page
    for name, route in SCREENS.items():
        page.goto(BASE + route); page.wait_for_load_state("networkidle")
        text = page.inner_text("body")
        if any(r.lower() in text.lower() for r in REAL): sys.exit(f"real data on {name}: fix the seed first")
        page.screenshot(path=str(OUT / f"{name}.png"))
    page.goto(BASE + "/customers/new"); field = page.locator("#name"); field.click()   # your form and field
    page.screenshot(path=str(OUT / "typing" / "f000.png"))
    for i, ch in enumerate("Asha Verma", 1):                       # fictional name
        field.press_sequentially(ch); page.screenshot(path=str(OUT / "typing" / f"f{i:03d}.png"))
```

## 11. Several cuts from one source

- One `film.html`, one `CUTS` table, `?cut=` in the URL. Scenes are shared draw functions; a cut
  is a list of scene starts on its own bar grid plus its `DUR` and `DROP`. Events are written
  relative to their scene (`at("Showcase", 1.2)`), so a scene that moves takes its cursor, camera
  and sounds with it.
- The long cut adds scenes (more proofs, 2-3 bars each); the short cut drops scenes and shortens
  the problem to two lines. Do not speed up tweens to fit: fewer proofs, same holds.
- Each cut gets its own bed (`work/bed-<cut>.wav`, same drop alignment, different track offset),
  its own RMS array, SFX WAV, loudness pass, poster and check report.
- Render cuts in parallel processes; frames go to `work/frames/<cut>/`.

```bash
for c in web share; do python tools/render.py dist/film.html --cut $c --out work/frames/$c --audio work/sfx-$c.wav & done; wait
```

- Name the outputs by product, cut and length (`acme-web-30s.mp4`, `acme-share-80s.mp4`) so
  nobody uploads the wrong one.

## 12. Poster frames

Every cut gets a poster JPG beside the MP4, named the same (`acme-web-30s.jpg`): the frame that
says the most on its own, usually the reveal (mark, name, one-line promise) after its entrances
settle, or the end card. Take it from the film, not the encoded file, so it is sharp:

```bash
python tools/preview.py dist/film.html 9.5 web       # then convert the PNG:
ffmpeg -y -i work/stills/web/still-09.50s.png -q:v 2 out/acme-web-30s.jpg
```

- Uses: the `poster` attribute of the `<video>` on the website, the custom thumbnail on YouTube or
  LinkedIn, the poster frame of an App Store preview.
- Chat apps and some feeds show frame 0 as the thumbnail. For a **non-looping** share cut, bake the
  poster into frame 0 in the same pass as loudness pass 2, so the file is encoded once and length
  and sync do not change:

```bash
ffmpeg -y -i work/share-premaster.mov -i out/acme-share-80s.jpg \
  -filter_complex "[0:v][1:v]overlay=0:0:enable='eq(n,0)'[v]" -map "[v]" -map 0:a \
  -af "loudnorm=I=-14:TP=-1.5:LRA=11:measured_I=...:measured_TP=...:measured_LRA=...:measured_thresh=...:offset=...:linear=true,aresample=48000" \
  -c:v libx264 -preset slow -crf 18 -pix_fmt yuv420p -c:a aac -b:a 192k -movflags +faststart out/acme-share-80s.mp4
```

- Do not bake it into a **looping** cut: it flashes for one frame on every loop. The website uses
  the `poster` attribute instead, and the opening dot stays frame 0.

## 13. Pre-delivery checks (`tools/check.py`)

Run per cut on the final MP4. It reads what the film declares about itself (`window.__film`),
measures the encoded file, saves frames to look at, and writes `work/check-<cut>.json`. Exit 1 on
any error. Fix every error; fix or explain every warning in the delivery note.

| Code | Severity | What it checks |
|---|---|---|
| `line_unread` | warning | A line holds at least 0.5 s + 0.3 s per word |
| `closing_line_short` | warning | The last line to appear stays at least 2 s |
| `text_below_26px` | error | Every caption renders at 26 px or more after zoom |
| `contrast` | error | TEXT, QUIET and ACCENT_TEXT on GROUND at 4.5:1; ACCENT (marks, non-text) at 3:1 |
| `off_grid` / `half_bar` | warning / info | Scene starts on the bar grid, anchored at the drop |
| `dead_stretch` | warning | No 3 s window without a scene start, event or caption change (a deliberate hold is fine: say so) |
| `size`, `pix_fmt`, `duration`, `no_audio` | error | The file matches the film: W x H, yuv420p, video stream within two frames of DUR, audio present |
| `loudness`, `true_peak` | error (warning for TP between -1.5 and -1.0) | Integrated -14 LUFS +/-0.5; true peak target -1.5 dBTP, never above -1.0 after the AAC encode |
| `first_frame_empty` | warning | Frame 0 is not bare ground (skipped with `--loop`) |
| `forbidden_text` | error | None of the `--forbid` strings (real names, domains) appear in the film source |

Frames saved to `work/check-<cut>/`: frame 0, the middle of every scene, two frames either side of
every seam, and a banding view (a corner of the ground, contrast-stretched) at the reveal. Look at
all of them; a seam frame shows a half-exited element or a flash that the stills never catch.

```python
#!/usr/bin/env python3
"""python tools/check.py dist/film.html out/acme-web-30s.mp4 --cut web [--loop] [--forbid "Real Org|real.com"]"""
import argparse, json, pathlib, subprocess
from PIL import Image, ImageStat
from playwright.sync_api import sync_playwright

ap = argparse.ArgumentParser(); ap.add_argument("html"); ap.add_argument("mp4")
ap.add_argument("--cut", default="launch"); ap.add_argument("--loop", action="store_true"); ap.add_argument("--forbid", default="")
a = ap.parse_args()
out = pathlib.Path(f"work/check-{a.cut}"); out.mkdir(parents=True, exist_ok=True)
F, L = [], None
def find(sev, code, msg, **kw): F.append({"severity": sev, "code": code, "message": msg, **kw})

with sync_playwright() as p:                                        # 1. what the film declares
    b = p.chromium.launch(); page = b.new_page()
    page.goto(pathlib.Path(a.html).resolve().as_uri() + f"?cut={a.cut}")
    page.wait_for_function("window.__film && window.__film.ready")
    film = page.evaluate("""() => { const f = window.__film; return { W: f.W, H: f.H, FPS: f.FPS, DUR: f.DUR,
      SCENES: f.SCENES, EVENTS: f.EVENTS.map(e => ({ t: e.t })), CAPTIONS: f.CAPTIONS, MUSIC: f.MUSIC, P: f.PALETTE }; }""")
    b.close()
FPS, DUR, caps = film["FPS"], film["DUR"], film["CAPTIONS"]

for c in caps:                                                      # 2. reading time and type size
    need, held = 0.5 + 0.3 * len(c["text"].split()), min(c["t1"], DUR) - c["t0"]
    if held + 1e-3 < need: find("warning", "line_unread", f'"{c["text"]}" holds {held:.2f} s, needs {need:.2f} s', t=c["t0"])
    if c.get("px", 99) < 26: find("error", "text_below_26px", f'"{c["text"]}" renders at {c["px"]:.0f} px', t=c["t0"])
if caps:
    last = max(caps, key=lambda c: c["t0"])
    if min(last["t1"], DUR) - last["t0"] < 2.0: find("warning", "closing_line_short", f'"{last["text"]}" is on screen under 2 s')

def lum(h):                                                         # 3. WCAG contrast of the palette
    f = lambda c: c / 12.92 if c <= 0.04045 else ((c + 0.055) / 1.055) ** 2.4
    r, g, bl = (f(int(h.lstrip("#")[i:i + 2], 16) / 255) for i in (0, 2, 4)); return 0.2126 * r + 0.7152 * g + 0.0722 * bl
P = film["P"]
for key, need in (("TEXT", 4.5), ("QUIET", 4.5), ("ACCENT_TEXT", 4.5), ("ACCENT", 3.0)):
    hi, lo = sorted((lum(P[key]), lum(P["GROUND"])), reverse=True); r = (hi + 0.05) / (lo + 0.05)
    if r < need: find("error", "contrast", f'{key} {P[key]} on {P["GROUND"]} is {r:.2f}:1, needs {need}:1')

m = film.get("MUSIC") or {}                                         # 4. bar grid, anchored at the drop
if m.get("bpm"):
    bar = 240 / m["bpm"]
    for sc in film["SCENES"]:
        k = (sc["t"] - m["drop"]) / bar; off = abs(k - round(k * 2) / 2) * bar
        if off > 1.5 / FPS: find("warning", "off_grid", f'"{sc["name"]}" starts {off:.2f} s off the bar grid', t=sc["t"])
        elif abs(k - round(k)) > 0.01: find("info", "half_bar", f'"{sc["name"]}" starts on a half bar', t=sc["t"])

marks = sorted({0.0, DUR} | {sc["t"] for sc in film["SCENES"]} | {e["t"] for e in film["EVENTS"]}
               | {c["t0"] for c in caps} | {min(c["t1"], DUR) for c in caps})   # 5. dead stretches
for x, y in zip(marks, marks[1:]):
    if y - x > 3.0: find("warning", "dead_stretch", f"nothing changes from {x:.1f} s to {y:.1f} s", t=x)

src = pathlib.Path(a.html).read_text(encoding="utf-8", errors="ignore").lower()   # 6. privacy in the source
for word in filter(None, a.forbid.split("|")):
    if word.lower() in src: find("error", "forbidden_text", f'"{word}" appears in the film source')

pr = json.loads(subprocess.run(["ffprobe", "-v", "error", "-show_streams", "-show_format", "-of", "json", a.mp4],
                               capture_output=True, text=True, check=True).stdout)            # 7. the encoded file
v = next(st for st in pr["streams"] if st["codec_type"] == "video")
if (v["width"], v["height"]) != (film["W"], film["H"]): find("error", "size", f'{v["width"]}x{v["height"]}, film is {film["W"]}x{film["H"]}')
if v.get("pix_fmt") != "yuv420p": find("error", "pix_fmt", f'{v.get("pix_fmt")}; phones need yuv420p')
vdur = float(v.get("duration", pr["format"]["duration"]))          # the video stream; AAC padding lengthens the format
if abs(vdur - DUR) > 2 / FPS: find("error", "duration", f"video {vdur:.3f} s, film is {DUR} s")
if not any(st["codec_type"] == "audio" for st in pr["streams"]): find("error", "no_audio", "no audio stream")
else:
    err = subprocess.run(["ffmpeg", "-hide_banner", "-i", a.mp4, "-af", "loudnorm=I=-14:TP=-1.5:LRA=11:print_format=json",
                          "-f", "null", "-"], capture_output=True, text=True).stderr
    L = json.loads(err[err.rindex("{"):err.rindex("}") + 1])
    if abs(float(L["input_i"]) + 14) > 0.5: find("error", "loudness", f'integrated {L["input_i"]} LUFS, target -14')
    tp = float(L["input_tp"])                                       # target -1.5; AAC may overshoot a little
    if tp > -1.0: find("error", "true_peak", f"true peak {tp} dBTP, never above -1.0")
    elif tp > -1.5: find("warning", "true_peak", f"true peak {tp} dBTP, target -1.5")

def grab(t, name, vf=None):                                         # 8. frames to look at
    path = out / f"{name}.png"
    subprocess.run(["ffmpeg", "-v", "error", "-y", "-ss", f"{max(0.0, t):.3f}", "-i", a.mp4, "-frames:v", "1",
                    *(["-vf", vf] if vf else []), str(path)], check=True); return path
f0 = grab(0, "000-first-frame")
if not a.loop and ImageStat.Stat(Image.open(f0).convert("L")).stddev[0] < 8:
    find("warning", "first_frame_empty", "frame 0 is bare ground; chat apps and feeds use it as the thumbnail")
starts = [sc["t"] for sc in film["SCENES"]] + [DUR]
for i, sc in enumerate(film["SCENES"]):
    grab((starts[i] + starts[i + 1]) / 2, f"{i + 1:02d}-{sc['name']}-mid")
    if i: grab(sc["t"] - 2 / FPS, f"{i + 1:02d}-seam-before"); grab(sc["t"] + 2 / FPS, f"{i + 1:02d}-seam-after")
grab(m.get("drop", DUR / 3) + 1, "zz-banding", "crop=iw/2.4:ih/3:0:0,format=gray,normalize=smoothing=0")

report = {"cut": a.cut, "file": a.mp4, "ok": not any(f["severity"] == "error" for f in F),
       "errors": sum(f["severity"] == "error" for f in F), "warnings": sum(f["severity"] == "warning" for f in F),
       "loudness": L, "findings": F, "frames": str(out)}
pathlib.Path(f"work/check-{a.cut}.json").write_text(json.dumps(report, indent=2))
print(json.dumps({k: report[k] for k in ("cut", "ok", "errors", "warnings")}))
raise SystemExit(0 if report["ok"] else 1)
```

The banding view: smooth bands with hard steps mean the encoder flattened a gradient; per-frame
grain over the gradient (section 2, `drawGrainAndVignette`) or a lower CRF fixes it.

## 14. If the HyperFrames skills are installed

The method above stays the same; these jobs are done better or faster by the HyperFrames skills.

| Job | This pipeline | With HyperFrames |
|---|---|---|
| Named visuals: grain, cursor, transitions, caption styles, charts | Hand-built draw functions | `hyperframes-registry`: `npx hyperframes catalog --query "<what the beat does>" --json`, then `add` and restyle to the tokens |
| Burnt-in captions from a voiceover | Word timings from a transcript, drawn in `render(t)` | The `hyperframes` skill's captions guidance, `npx hyperframes transcribe` for word timings |
| Beat grid of a track | Library metadata, a beat tracker, `tools/strong.py` | `npx hyperframes beats` (`hyperframes-cli`); still pick the strong section by ear |
| Music and sound effects | The user's track, CC0 packs, synthesis | `media-use`: `npx hyperframes media-use resolve --type bgm` or `--type sfx` (licence recorded in its ledger) |
| Loudness | Two-pass `loudnorm` | `npx hyperframes normalize-audio` (`media-use`); verify with a `loudnorm` measurement either way |
| Checks and frames | `tools/check.py` | `npx hyperframes check --json` and `snapshot` (`hyperframes-cli`): lint, runtime, layout overflow, contrast on sampled frames, reading time, type floor (28 px, which also meets the 26 px rule), empty first frame |
| Render | Playwright + ffmpeg, parallel frame ranges | `npx hyperframes render`; `cloud render`, `lambda render` or `cloudrun render` when local Chrome or ffmpeg is the bottleneck |
| Several cuts | `?cut=` switch | A build script that writes one project per cut from shared scene templates, or `render --batch` with variables |

The HyperFrames contract (one paused, seekable timeline per composition; no clocks, timers or
unseeded randomness) is the same determinism rule as `render(t)`. Its scene sub-compositions with
local times play the role of `at(scene, dt)`.

## 15. Troubleshooting

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
| One cut renders the other cut's scenes | `?cut=` missing from the URL; pass `--cut` to every tool. |
| The drop is a frame or two off the reveal | Bar times not snapped to frames, or the bed rendered at a different offset; rebuild the bed from the same `DROP` and check `barT`. |
| The glow flickers frame to frame | RMS read without interpolation, or computed from the unedited track; use `rmsAt(t)` on the final bed's array. |
| Captured screens look soft in close-ups | Capture at 2x (`device_scale_factor=2`) and keep punch-ins at or under 1.6x. |
