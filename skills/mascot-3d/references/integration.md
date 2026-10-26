# Integration: page contract, worker mount, float and dock, accessibility, performance

How the mascot reaches real pages without blocking them, covering content or failing silently.
The worker mount is implemented in `assets/templates/mount-worker.js`. All names use a neutral
`mascot` prefix; rename to your character's name in your own project if you like.

Contents

1. The page contract
2. The engine API
3. Worker mount, fallback and the first-frame swap
4. Float and dock behaviour
5. Attention nudge policy
6. Accessibility and fallbacks
7. Performance tiers
8. Bundle facts

---

## 1. The page contract

Pages talk to the mascot through a small, fixed set of hooks and nothing else. Use delegated
listeners on `document`, so a page can add a hook without re-binding anything (this matters with
view transitions and client-side navigation).

| Hook | Meaning |
|---|---|
| `[data-mascot-stage][data-state="wave"]` | A box the mascot occupies while it is on screen; `data-state` is the pose to show there |
| `[data-mascot-hover="happy"]` | Delegated hover and focus reaction |
| `[data-mascot-section="explaining"]` | Scroll cue, fired once per page when the section is seen |
| `form[data-mascot-form]` | Typing in it sets `thinking` (and suppresses the attention nudge) |
| `body[data-mascot-hint="..."]` | The one line the mascot says in its bubble on this page |
| `mascot:sending`, `mascot:success`, `mascot:error`, `mascot:invalid` | Document events the form dispatches |
| `window.mascot` | A small global API (`setState`, `react`, `look`, `greet`) for anything bespoke |

```html
<section data-mascot-section="explaining">...</section>
<form data-mascot-form>...</form>
<script>document.dispatchEvent(new CustomEvent('mascot:success'));</script>
```

Reactions in the contract are visitor actions. The one time-based behaviour, if the brand keeps
it, is the attention nudge in section 5, owned by the float controller and not by pages.

## 2. The engine API

The engine is one factory that takes a canvas and options and returns a handle, or `null` when
WebGL is unavailable (for example `createMascot(opts)`). Options cover the canvas, a box to
measure, size, device pixel ratio and its cap, theme, whether to greet, reduced motion and a state
callback. The handle exposes: set state, react (a temporary state with a duration), look, greet,
face front, face a yaw, set mirror, pause, resume, resize, set visible, set theme, pointer,
dispose. The runtime template (`mascot-runtime.js`) supplies most of these.

The engine touches no DOM of its own. The box it is given only needs `getBoundingClientRect`, which
is what lets the same engine run inside a worker. With three.js on an OffscreenCanvas call
`renderer.setSize(w, h, false)`: an OffscreenCanvas has no `style` to update.

## 3. Worker mount, fallback and the first-frame swap

A mount function picks the worker path when `Worker`, `OffscreenCanvas` and
`canvas.transferControlToOffscreen` all exist, else the main thread, and returns the same handle
shape either way, so pages never know which path ran.

```js
const canWorker = 'Worker' in self && 'OffscreenCanvas' in self
  && 'transferControlToOffscreen' in HTMLCanvasElement.prototype;
```

The worker protocol is plain messages. The template's core set: page to worker `init`, `resize`,
`visible`, `dark`, `pointer`, `setState`, `react`, `dispose`; worker to page `ready`, `failed`,
`state`, `frame`. Add `look`, `greet`, `faceFront`, `face` and `mirror` the same way when the site
needs them.

The **frame** message, sent after the first rendered frame, is what lets the page swap the still
image for the canvas without a flash of nothing: keep the still visible, mount the canvas hidden,
and only on the first frame add a class on the root (`mascot-live`) that hides the stage stills.
The still is hidden exactly once and never before a real frame exists. On `failed`, do nothing:
the still stays. A transferred canvas cannot be used on the main thread again, so a main-thread
retry after a worker failure needs a fresh canvas (the template's `fallbackOnFail` option).

Pause rendering when the mascot is off screen (IntersectionObserver) or the tab is hidden
(`visibilitychange`); both feed the `visible` message.

Reusable unchanged across brands: the mount, the worker host, the float controller, the
extractor's structure, the SDF toolkit and the runtime. Brand-specific: the character config,
palette, states and geometry builders.

## 4. Float and dock behaviour

One fixed layer that persists across page changes (on Astro, `transition:persist`; in an SPA, a
component outside the router outlet), so the mascot survives navigation instead of re-mounting.

| Behaviour | Recommended range |
|---|---|
| Hero stage | The mascot sits in the page's stage box while the stage is on screen |
| Dock size | 120-160 px on desktop; 96-120 px below about 760 px viewport width |
| Dock margin / tuck tab | 16-24 px / 40-48 px |
| Follow stiffness | About 0.5-0.6 while in a stage, 0.15-0.25 while gliding toward the dock |
| Resting yaw | 0.3-0.4 rad toward the content, mirrored by side |
| Hint bubble | Appears 1.5-2 s after load, hides after 6-10 s, once per page |
| Sleep | After 60-90 s with no input; any input wakes it |
| Memory | Side and vertical position in `localStorage`; tucked state in `sessionStorage` |
| Attention nudge | Owner's choice; default about 9 s idle, at most once per about 22 s, with limits (section 5) |

Drag with plain pointer events and snap to the nearest side. GSAP Draggable adds `scrollY` to a
`position: fixed` element, which made a previous production mascot jump on drag; it was removed.

Worth shipping: the stage-to-dock glide, drag with snap, the tuck button, per-page hints, the
resting yaw toward the content, persistence across page changes, sleep.

Decide the mobile rule and build it or delete it. A brief that promises "reactions stop after the
first meaningful scroll on mobile" and never gets built is a common drift.

On premium pages, coordinate with `luxury-web-design`: one signature moment per page. If the
mascot's greeting is that moment, nothing else animates loudly; otherwise the mascot stays docked
and quiet.

Placement rules: never over text, a form field, the primary button or the on-screen keyboard
area; check at 390 px width; one mascot per page; it appears on every page or on none.

## 5. Attention nudge policy

The owner of a previous production mascot chose a time-based nudge as the default: after about
9 s with no pointer, scroll or key input, the docked mascot glances or gives a short wave toward
the content, at most once every 22 s or so. It keeps a docked mascot from feeling dead.

The trade-off: nine still seconds is usually reading, and a nudge then pulls the eye away. That is
why the default ships only with these limits, all in the float controller:

```js
const NUDGE_IDLE_S = 9, NUDGE_MIN_GAP_S = 22, NUDGE_MAX_PER_PAGE = 3;
function maybeNudge(now) {
  if (reducedMotion || tucked || sleeping || formFocused || dialogOpen) return;
  if (now - lastInput < NUDGE_IDLE_S || now - lastNudge < NUDGE_MIN_GAP_S) return;
  if (nudgesThisPage >= NUDGE_MAX_PER_PAGE) return;
  lastNudge = now; nudgesThisPage++;
  mascot.react('wave', 1.2);            // small motion only: no bubble, no sound, no mark
}
// any pointermove / scroll / keydown / focusin sets lastInput = now
```

Alternative (zero risk of nagging): trigger only on visitor actions (a section entered, a scroll
distance, a hover on the primary button, a sent form) and keep sleep as the only idle behaviour.
Record the chosen policy in the mascot plan, and test it in QA (`pipeline-and-qa.md`, item 9).

## 6. Accessibility and fallbacks

- The figure is decorative: `aria-hidden="true"`. The hint bubble is a `role="status"` region
  outside it, so the line is announced once.
- The tuck button, and any other control, is a real labelled `<button>` placed **beside** the
  hidden figure, never inside it (a focusable control under an `aria-hidden` ancestor is
  unreachable for assistive technology and costs Lighthouse accessibility points).
- **Reduced motion = stills.** An inline script in the head adds a class (for example `mascot-on`)
  to `<html>` only when `prefers-reduced-motion` is not `reduce`; the float controller and the
  mount are gated on that class, so reduced motion gets the stills and nothing moves (no float, no
  nudge, no blink).
- **No JS, failed WebGL, or a worker that reports failure: the still stays.** The stage stills are
  plain `<img>` (WebP) in the HTML; only the first-frame class hides them.
- **CSP:** a worker loaded from a bundle or blob needs `worker-src 'self' blob:`.
- The page must mean the same without the mascot: any status it acts out (sent, failed) is also
  shown as text by the form itself.

## 7. Performance tiers

Stills are not a separate route: they are the fallback and performance tier of the three.js
mascot, rendered from the same preview. The honest default for a new brand: **stills everywhere,
the live model only when the device clears a bar.** Mounting on every capable browser is more
generous than most sites need. Fewer parts also lowers the bar: a body-and-eyes mascot builds and
renders far cheaper than one with skinned hands and footwear.

| Condition | Tier |
|---|---|
| `prefers-reduced-motion: reduce` | Stills only |
| `navigator.hardwareConcurrency <= 4` or `navigator.deviceMemory <= 4` | Stills only, or the model with shadows off |
| No `OffscreenCanvas` and a weak CPU | Stills only, rather than a main-thread fallback |
| Dock size only, never a hero stage | Shadows off, pixel ratio 1, a coarser body grid (about 48 x 48 x 14 instead of 80 x 80 x 24) |

Always: lazy-import the engine after first paint; cap the pixel ratio (1.5-2); pause rendering
when the mascot is off screen or the tab is hidden; dispose on teardown. `deviceMemory` is not
available in every browser; treat its absence as "unknown", not "capable". Set the bar from a
real-phone measurement (`pipeline-and-qa.md`, section 6), not from a desktop.

## 8. Bundle facts

Measured on a previous production mascot's build (as of Oct 2026, three r170):

| Chunk | Raw | Gzipped |
|---|---|---|
| Worker (three.js + engine) | about 540 KB | about 141 KB |
| three.js for the main-thread fallback | about 494 KB | about 123 KB |
| Engine alone | about 44 KB | about 17 KB |
| A dozen WebP stills | about 260 KB total | - |

- three.js is bundled twice (worker and main-thread fallback) because the entry points compile
  separately. A visitor fetches only one.
- **A 150 KB JS budget is not reachable with three.js**: the worker chunk alone is about 141 KB
  gzipped. The budget's real intent is "do not block LCP", which lazy loading after first paint
  plus stills-first meets. If the number is contractual, ship the stills tier alone first.
- Lighthouse (simulated mobile) on that site: 96-98 performance across pages and 100 for
  accessibility, best practices and SEO after moving the build into a worker; 69 performance
  before. Real-phone numbers were not measured; use the procedure in `pipeline-and-qa.md`.
