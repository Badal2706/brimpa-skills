# Pipeline and QA: preview, extractor, stills, OG images, checklist, measurement

The build flow from a single preview page to a shipped site module and a set of stills, then the
checks that gate release, including the real-phone measurement.

Contents

1. Preview first
2. The extractor and its exact-once asserts
3. Stills with a headless browser
4. WebP and OG images
5. The QA checklist
6. Performance: what is known, and measuring on a real phone
7. A mascot in films

---

## 1. Preview first

Keep one standalone HTML page as the single source of truth for the character (start from
`assets/templates/preview.html`; a full character typically grows to around a thousand lines).
It carries everything the owner and the reviewer need, and none of it may reach the site:

- sliders for the proportions under review (width, height, depth, corner radii, seam softness,
  cuff, hand size, finger length, sole and so on). Body proportions are tuned here with the owner
  at real dock and hero sizes, then locked: "Copy values", bake them as defaults, hide the panel,
  record the values and date in the plan. Hands and feet come from the sheets instead;
- the parts switch (`PARTS`, or `?parts=` in the URL) so the owner can compare, for example, the
  mascot with and without arms before the parts list is locked;
- a button per state, an expression-sheet mode that lays every state out with its documentation
  strings, a turntable and fixed review views;
- test hooks on a neutral global (`window.__mascot`): freeze, seek, set state, sheet mode, view
  and yaw setters, parameter setters, a body-clearance probe, and read access to the state list,
  hand presets and channel object. Add hand-aiming helpers for IK when a pose needs them.

Why not a shared module imported by both preview and site: the preview's sliders and hooks must
never ship, and the extractor is a reliable way to keep them out.

## 2. The extractor and its exact-once asserts

A small script reads the preview, slices the engine between two anchors, drops the page-only
ranges (sliders, buttons, hooks), applies a list of string replacements, and writes the site
module. The site module is generated and is never edited by hand.

The whole safety story is one rule: **every replacement asserts that its anchor occurs exactly
once**, so a preview edit that moves or duplicates an anchor fails loudly instead of producing a
broken module.

```python
for old, new in replacements:
    assert src.count(old) == 1, (src.count(old), old[:80])
    src = src.replace(old, new)
```

Lessons:

- When anchors drift, drop ranges swallow live code and produce errors such as "X is not
  defined" or `'return' outside of function`. Anchor on code that never moves, and build
  multi-line end markers from explicit newline characters rather than pasted text.
- Keep the site-only behaviour in a second replacement list in the same script (for example:
  remove drag-to-spin, add a resting yaw, enable the mirror system).
- Run the extractor after every preview change and commit both files together.

## 3. Stills with a headless browser

A script drives the preview in a headless browser and screenshots each state:

1. Serve the preview (or open a single inlined file) with `?test`; wait (generous timeout, about
   60 s) for `window.__mascot.ready`.
2. Hide everything except the canvas box; set the stills camera (pulled back so the figure and its
   marks fit).
3. For each state: set the state, wait for it to settle (about 1.5-2 s; less for a state that
   reaches its key pose sooner, such as a wave mid-swing), freeze, wait about 250 ms, screenshot
   with a transparent background.
4. Two passes: device scale 1 for the site stills (around 900 x 1100) and 2 for a high-resolution
   export set, plus a four-view turnaround of idle for reviews. `?test&sheet` gives one image of
   the expression sheet.

Take the browser channel as a parameter rather than hard-coding one vendor's browser; elsewhere
use the bundled Chromium. Headless WebGL needs the SwiftShader flags:

```js
const browser = await chromium.launch({ channel: process.env.BROWSER_CHANNEL || undefined,
  args: ['--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist'] });
```

Under SwiftShader, screenshots are slow: clip to the canvas box and raise the screenshot timeout.
The render is a software rasteriser, so check one still against a GPU render by eye before
trusting a full set.

## 4. WebP and OG images

- Convert the PNG stills to WebP (for example Pillow at quality about 80, method 6) for the site;
  keep the PNGs and the 2x export in the repo for print and social.
- OG images: compose a still with the page title in an HTML template, render at 1200 x 630 with the
  same headless setup, and regenerate them whenever positioning copy changes (stale copy in OG
  templates is easy to miss because nobody looks at them in the browser).
- Stills are the reduced-motion, no-JS and failed-WebGL fallback, so every stage state used on a
  page needs a still.

## 5. The QA checklist

Run all twelve before release (items that name a part apply only if the mascot has it), and the relevant ones after every change.

1. Every state from the expression sheet, then each again after a crossfade from a different state.
   Each state resolves to a variant that the chosen parts support; none silently does nothing.
2. For the parts that exist: no limb, appendage, prop or accent object intersects the body in any
   pose (the clearance probe, at least about 0.02 units), including mid-crossfade. Skip with a note
   when the mascot has no such parts.
3. Turnaround at 0, ±0.6, 1.45 and π radians (`__mascot.yaw(rad)`): no back faces, no holes.
4. Stills: one per state, transparent, same camera, none caught mid-swing.
5. Hero still visible before the model; no flash on takeover; stage still hidden exactly once.
6. Drag to each side, tuck, untuck, reload: side and tuck state remembered.
7. Page change: exactly one mascot; the bubble shows the new page's hint only.
8. Light and dark themes, and the theme toggled while the model is live; the lit-variant palette
   still separates the mascot from every section background.
9. Reduced motion: stills, no float, no nudges. JS off and WebGL blocked: stills correct. Nudge
   policy: never while typing or with a field focused, never more often than the minimum gap,
   capped per page (or absent, if the brand chose action-based triggers).
10. Phone at 390 px: no horizontal scroll; the dock covers neither text nor the form.
11. Lighthouse mobile on every page: 90+ on all four scores.
12. Real-phone measurement done and recorded (section 6) before widening the live tier.

Add per-draft: the side-by-side crop pairs for every part changed (see SKILL.md, Review loop), and
a check that the states' documentation strings still match the code.

## 6. Performance: what is known, and measuring on a real phone

Known from a previous production mascot (as of Oct 2026):

- Geometry build on a desktop: about 2 s, roughly half of it the hands.
- Build on the main thread under Lighthouse's simulated mobile CPU: about 13 s of blocking,
  performance score 69.
- After moving the build into a worker: total blocking time 0; 96-98 performance across pages,
  with accessibility, best practices and SEO at 100.

**Unmeasured:** start-up on a real mid-range phone, steady-state frame time, memory and battery.
Do not quote real-device numbers for any mascot until they have been measured this way.

### Real-phone procedure (Android + Chrome)

Prepare once:

1. On the phone: Settings > About phone > tap Build number seven times to enable Developer
   options; then Developer options > enable **USB debugging**.
2. Connect the phone to the desktop by USB and accept the "Allow USB debugging" prompt on the
   phone. Use a mid-range device (the one most visitors have, not the newest flagship), charged
   above 50%, not in battery saver, screen brightness fixed, other apps closed.
3. Serve a production build (not the preview) over the local network or a staging URL, and open it
   in Chrome on the phone.
4. On the desktop open `chrome://inspect/#devices`, find the phone's tab and click **inspect**.

Instrument the build (keep this behind a `?perf` flag so it never ships active):

```js
performance.mark('mascot:mount-start');
const handle = mountMascot({ /* ... */, onLive: () => {
  performance.mark('mascot:first-frame');
  performance.measure('mascot:mount-to-first-frame', 'mascot:mount-start', 'mascot:first-frame');
}});
// in the worker or engine, around the geometry build:
performance.mark('mascot:build-start'); /* build */ performance.mark('mascot:build-end');
performance.measure('mascot:build', 'mascot:build-start', 'mascot:build-end');
```

```js
// rAF frame deltas over 300 frames; run once at dock size and once at hero size
function sampleFrames(n = 300) {
  return new Promise((resolve) => {
    const d = []; let last = performance.now();
    const step = (t) => { d.push(t - last); last = t; d.length < n ? requestAnimationFrame(step) : resolve(d); };
    requestAnimationFrame(step);
  });
}
const d = (await sampleFrames()).sort((a, b) => a - b);
console.log('median', d[150].toFixed(1), 'p95', d[285].toFixed(1), 'max', d[299].toFixed(1));
```

When the engine renders in a worker, the main-thread rAF shows main-thread smoothness (scrolling,
input); post the worker's own frame deltas back with a `perf` message to measure the render.

Measure:

1. **Start-up.** In DevTools > Performance, enable CPU throttling "No throttling" (the phone is the
   real CPU), click record, reload the page, stop after the mascot is live. Read the
   `mascot:build` and `mascot:mount-to-first-frame` measures in the Timings track, and the total
   blocking time and long tasks on the main thread.
2. **Frame time.** With the mascot docked and idle, run `sampleFrames()` from the console; record
   median, p95 and max. Scroll to a hero stage and repeat at hero size.
3. **Memory.** DevTools > Memory: take a heap snapshot before mount (load with the mascot disabled,
   or before the lazy import fires) and another after the first frame; record the difference.
   For worker memory pick the worker's context in the snapshot target list.
4. **Battery and heat.** Leave the page open with the mascot idle for 10 minutes, screen on; note
   the battery drop and whether the phone gets warm, against the same page with the mascot tucked.
   This is a rough signal, not a lab number; repeat once to check it is stable.
5. Repeat each measurement three times and record the median.

Results (fill in; one row per device):

| Date | Device, Android, Chrome | Build ms | Mount to first frame ms | Main-thread TBT ms | Dock median / p95 ms | Hero median / p95 ms | Heap delta MB | 10 min battery, mascot / tucked | Notes |
|---|---|---|---|---|---|---|---|---|---|
| {date} | {device} | | | | | | | | |

Write the table into the mascot plan and set the capability bar for the live tier from it: if the
p95 frame time at dock size is above about 20 ms, or start-up to first frame above about 3 s, keep
that class of device on stills.

## 7. A mascot in films

For a launch film or social clip (`launch-video`), drive the preview, not the site: freeze, then
use `seek(t)` with a seeded random so blink and wander are deterministic, and capture frames the
way the stills script does. Keep the identity rules: one expression at a time, marks outside the
silhouette, the accent object as the only light.
