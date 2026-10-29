# Motion

Motion is the last pass, never a way to rescue a weak layout: the static page must already be finished. Numbers below come from the gallery motion study (99 Awwwards Sites of the Day, July to October 2026, via taste-skill), impeccable's animate and craft-floor rules, the ui-ux-pro-max motion table, and the "12 landing page animations" guide (MadeToScale, 2026) for the GSAP recipes. The video recipes in §12 are adapted from the MIT-licensed parts of Motionsites-AI/claude-skill and rewritten to the house rules; every browser behaviour in them was checked against MDN, WebKit or the hls.js docs in Oct 2026 (the check is noted beside each claim).

## Contents

1. The one-moment rule and the budget
2. Timing and easing table
3. Tokens
4. Reduced motion
5. Performance rules
6. Scroll behaviour
7. Load sequence in 1.2 seconds
8. The twelve animation recipes (parameters, when to use, when to avoid)
9. Signature moves by direction
10. What gives generated motion away
11. Motion pre-flight
12. Background and hero video (when to use it, the base recipe, HLS, crossfade loop, framing, scroll scrub, boomerang, scrims, budgets)

When the build uses GSAP or needs ready-made transitions, install the upstreams listed in the repo's UPSTREAM.md alongside this skill: `gsap-skills` (GreenSock's official rules for core, timelines, ScrollTrigger and plugins) and `transitions.dev` (crafted UI transitions, page-to-page fades, error shakes, with timing and easing). This file decides *what* moves and how much; those decide *how* to write it correctly. The Brimpa site used both this way (Oct 2026).

## 1. The one-moment rule and the budget

- **One moving thing per screen.** If two animations are visible at the same time, cut one.
- **One signature moment per page:** the thing a visitor would describe an hour later (a section headline rising out of a mask below the fold, a picture opening to full-bleed, a product that configures itself; the first-screen headline, sentence and action are never the masked thing, see §7). Only this move may be loud. Everything else is quiet so it lands.
- **One moving picture** (a muted loop with a poster frame, a slow drift on one photograph, or a scroll-linked move on the hero picture); **one marquee at most**, pausable.
- **Feedback on every control:** press 140 ms, hover a tone shift, focus visible. Motion that answers a user action (open, expand, confirm) is always welcome when it shows what changed.
- **Entrances choreographed per section, not stamped:** the parts of a section arrive in reading order (heading, text, picture), staggered 60-90 ms, rising 16-32px with opacity, once; a list arrives row by row, a picture settles from a slight scale, a figure counts once. The identical fade-and-rise on every block is the most cited motion tell.
- **Intros under 2.5 s** (the animation guide's ceiling); the house target is the load sequence settled by 1.2 s with four moving elements at most. Nobody waits for an animation to finish before they read.
- **Play once, not on every scroll.** Re-running an entrance every time someone scrolls past gets annoying fast.
- Persuade and Experience surfaces may let motion carry the voice; Operate and Read surfaces (apps, docs) get feedback and continuity only, no page-load choreography (see the ui-ux skill).

## 2. Timing and easing table

| Job | Duration | Easing | Notes |
|---|---|---|---|
| Press feedback | 100-160 ms (140) | ease-out | `transform: scale(0.97)`; disable the button while a request runs |
| Hover colour or underline | 150-200 ms (180) | `ease` | hover raises contrast, never lowers it; behind `(hover: hover)` |
| Hover that moves something (label roll, arrow) | 300-400 ms | ease-out | displacement under 2px reads as feedback, not motion |
| Menus, popovers, tooltips | 150-250 ms (240) | ease-out | open from the trigger (`transform-origin`), start at scale 0.95-0.98, never from 0 |
| Dialogs, drawers, accordions | 250-450 ms (320 for accordions) | ease-out | accordion via `grid-template-rows: 0fr -> 1fr` |
| Routine state change (toggle, tab) | 150-300 ms | ease-out | exits 60-70% of the matching entrance |
| Layout, overlay, view transition | 300-500 ms (380-480) | in-out for travel | cross-document view transitions 480 ms maximum |
| Section reveal | 500-900 ms (700-900) | expo-out | fires once when the element's top is 85-90% down the viewport; rise 12-32px |
| Authored focal entrance | 500-800 ms | expo-out | the one orchestrated moment |
| Picture openings and clip wipes | 1,100-1,600 ms (1,200) | in-out | shutter, opening window |
| Slow crossfade (hero photographs) | 5-6 s per image | linear or `ease` | 3-4 images, pause when the tab is hidden |
| Stagger between lines | 75-120 ms (90) | - | four steps at most in one sequence |
| Stagger between list items | 50-100 ms (70) | - | lists over 10 items: 20-40 ms; never over 100 ms per item |
| Stagger between characters | 20-40 ms | - | only in a heading of one to three words |
| Scroll-linked travel | tied to scroll | linear | 14 of 18 scrubbing sites lock to the scrollbar; smoothing, if any, lerp 0.1-0.14 and off for touch |
| Skeleton shimmer | 1,200-1,600 ms loop | sine in-out | one loop per skeleton group; no loader for waits under 300 ms |

The gallery median of everything that ran is 420 ms. Overshoot (bounce, elastic, `back.out`) sits in 19 stylesheets and ran on 2; it is banned on interface elements and permitted only where a Playful or Neo-Brutalist direction makes it the voice. `ease-in` only for something leaving for good, short. Framework defaults (`.4,0,.2,1`, `linear`, `ease-in-out` everywhere) read as unauthored.

## 3. Tokens

```css
:root {
  --ease-out:    cubic-bezier(0.22, 1, 0.36, 1);         /* quint out: entrances, moving hovers, UI under 600ms */
  --ease-expo:   cubic-bezier(0.16, 1, 0.3, 1);          /* expo out: reveals of 800ms+, line rises, openings */
  --ease-in-out: cubic-bezier(0.76, 0, 0.24, 1);         /* wipes, panels, things that travel while visible */
  --ease-soft:   cubic-bezier(0.33, 1, 0.68, 1);         /* slow scale and drift on photographs */
  --ease-exit:   cubic-bezier(0.55, 0.055, 0.675, 0.19); /* something leaving for good, short */
  --t-press: 140ms; --t-hover: 180ms; --t-ui: 240ms; --t-reveal: 800ms; --t-open: 1200ms;
  --stagger-line: 90ms; --stagger-item: 70ms;
}
```

GSAP equivalents: `power3.out` / `expo.out` for entrances, `power2.inOut` for travel, `none` for scrub; the guide's `back.out` values are listed per recipe below and should be swapped for `expo.out` outside playful directions.

## 4. Reduced motion

`prefers-reduced-motion: reduce` means fewer and gentler animations, not none: keep opacity and colour changes that carry meaning, drop travel, scale, parallax, blur and autoplay. Build it so the reduced state is simply the finished state:

```html
<script>document.documentElement.classList.add('js')</script>
```
```css
@media (prefers-reduced-motion: no-preference) {
  .js [data-reveal] { opacity: 0; transform: translateY(24px); transition: opacity 700ms var(--ease-out), transform 900ms var(--ease-out); }
  .js [data-reveal].is-in { opacity: 1; transform: none; }
}
```

- Every hidden state lives inside a `no-preference` block and behind the `.js` class, so content is visible when JavaScript fails or the preference is set. A reveal that never fires leaves a blank band; `unobserve` after the first intersection so it never replays.
- Never a global `* { animation-duration: 0.01ms !important }` kill; the audit flags it. Provide the intentional alternative per effect.
- Loops (crossfades, marquees, grain, video) pause off-screen, when the tab is hidden, and under reduced motion. Autoplay video is muted, has a poster, a visible pause, and captions when it carries speech.
- Carousels and auto-rotation need previous/next and play/pause controls, stop on focus or hover, and never continue while focus is inside.
- Nothing moves across text the visitor is reading; a moving line must read whole at some point of its run; fills start at 45% ink; dims no lower than 40%; blur at most 8px and gone once settled, never on body text.

## 5. Performance rules

- Animate `transform`, `opacity` and `clip-path`. Width, height, top, left, margin and padding force layout every frame and stutter on cheap phones; `grid-template-rows` for accordions is the accepted short exception.
- Blur, backdrop-filter, filter, shadow and canvas belong to the palette only when bounded to a small, isolated region; backdrop blur only on fixed or sticky elements, never on scrolling content.
- `will-change` only on an element about to animate, removed afterwards; never broadly.
- Scroll reveals via `IntersectionObserver` (with a `rootMargin` of about `-12%` bottom), never a `scroll` listener; scroll-linked motion via CSS scroll timelines inside `@supports (animation-timeline: view())` with a static fallback, or GSAP ScrollTrigger scoped to its section.
- Scroll timelines need a scroller to watch: `overflow: hidden` on a frame creates one and silently stops `view()` on its children; use `overflow: clip`.
- Target 60 fps (16 ms per frame); simplify below 50. Test on a mid-range Android phone (the guide's rule: smooth on a Rs 15,000 phone is smooth everywhere) and with the CPU throttled.
- Heavy scenes (WebGL, image sequences) lazy-initialise near the viewport, pause off-screen, and never delay the first paint of the HTML headline, sentence and action.
- No preloader, no counter, no entry gate, no sound before a gesture, no custom cursor, no scroll hijacking: each one cost usability in the study (half the usable award pages were still unreadable 2.5 s after load because of preloaders; scroll-hijacked pages scored 6.01 usability against 6.50).

## 6. Scroll behaviour

| Behaviour | House version |
|---|---|
| Reveal on scroll | once, at 85-90% down the viewport, 12-32px rise or a line mask, 700-900 ms, on two or three sections, never on everything above the fold |
| Held (sticky) stage | at most two per page, about one screen of scroll per step, three screens per stage, a line of text and a plain count ("2 of 4") on every held screen |
| Scroll-scrubbed scene | linear, locked to the scrollbar; a finished composition for reduced motion and unsupported browsers |
| Parallax | travel under 8% of the element; pictures held at 106-110% inside their frames; never on body copy |
| Scale on scroll | between 0.94 and 1.15 |
| Colour by chapter | hard cuts at section edges; a fixed header's ink follows in 300 ms; never recolour the whole page from an observer |
| Horizontal track | native drag row with scroll snapping first; pinned sideways gallery only on wide screens, rows under three screens long, keyboard support, 1:1 speed |
| Smooth-scroll library | optional; lerp 0.1-0.14; off for touch and reduced motion; never a page that keeps sliding after the hand stops |
| Marquee | one per page, slow, duplicated content with a `translateX(-50%)` linear loop, pauses on hover and under reduced motion |
| Page to page | cross-document view transitions, old page fades 200 ms, new rises 380 ms, shared picture travels 480 ms; off under reduced motion |

## 7. Load sequence in 1.2 seconds

Everything is in the HTML and painted on the first frame; the sequence only adds arrival. The first-screen headline, sentence and action are fully visible and readable at frame 0: no line mask, no clip and no opacity below 1 on them at any point, because the first-paint check (`references/preflight.md` §13, about 0.35 s) fails a hero whose words are still behind a mask. Four moving elements at most, all of them pictures or decoration: the hero picture opens from a clip and settles from 1.08 scale (150-1,150 ms); a rule, underline or mark beside the headline draws or slides in (100-990 ms, expo-out, 90-110 ms apart when staggered). If the text must move at all, it settles by 8px or less with `transform` only, from full opacity. Masked headline lines are a below-the-fold move: they rise from behind their baselines as a section reveal on scroll (§6), never on load above the fold. Nothing in the navigation animates. Preload the display font so the headline paints in the real face; give the hero image `fetchpriority="high"` and a ground colour sampled from it so a slow image opens onto its own colour. Reduced motion: everything is simply there.

## 8. The twelve animation recipes

Each recipe lists the parameters that make it work, the section it belongs to, and when to avoid it. All assume: single self-contained implementation (CSS or GSAP 3 from a CDN), transform and opacity only, `prefers-reduced-motion` shows the final state instantly, play once, real data only. Where the guide specifies `back.out` easing, prefer `expo.out` unless the direction is Playful Consumer or Neo-Brutalist Pop.

**01 Hero reveal (hero).** Split the headline into one `<span>` per word (or per line; lines read better for sentences); start each at opacity 0, 40px lower, 12px blur; reveal with a 0.12 s stagger, `power3.out`; then fade in the supporting sentence and the button; then slide one proof card up only if the number on it is real. Total under 2.5 s (house target 1.2 s). Highlight at most one word, and only if the direction allows a styled word (most do not). Avoid on pages whose hero is a working form; the form should be usable at once.

**02 Word rotator (hero).** A fixed sentence with one gap; options in a vertical list inside a fixed-height pill with `overflow: hidden`; every 2 s slide up by exactly one row height (`back.inOut` in the guide; `--ease-in-out` here); duplicate the first word at the end for a seamless loop; progress dots under the pill. Four words maximum, roughly equal length. Pause under reduced motion and on hover. Avoid when the rotating words are the only statement of what the product is; the headline must still say it when the rotator is paused.

**03 Sale pings (social proof, stores).** A phone mock-up with a lock screen; a new order notification drops in from the top every 1.5-3 s (2 s typical) with a springy ease, keep the newest four, fade older ones; beside it a revenue figure counting up and an SVG sparkline drawn with `stroke-dashoffset`. Orders come from a JavaScript array at the top of the file so real data plugs in. Only real orders, exact amounts; fake pings mislead buyers and can break consumer-protection rules. Avoid entirely when real order data is not available: do not ship the demo array.

**04 Review shuffle (social proof).** Three review cards stacked as a deck, each behind one 34px lower, 6% smaller and fainter; every 2.5 s throw the top card off to the left with a -18 degree rotation, move the others forward, return the thrown card to the back; average rating and count under the deck. Real reviews with first name and initial; stop the shuffle on hover and focus so people can read. Avoid with fewer than three real reviews.

**05 Count-up stats (results).** Three cards: a progress ring (`stroke-dashoffset`) with the number counting in the middle; a revenue figure with seven bars growing from the bottom with a stagger, the last bar in the accent; a rating counting from 0.0 with a trend line drawn last. Trigger once via `IntersectionObserver`, `power3.out`, about 2 s total, `toLocaleString` formatting, unit next to every number. Avoid: re-counting on every scroll; the hero-metric template (this belongs in a results section, not the first screen); any number you cannot source.

**06 Bento build (features).** Build the final CSS Grid first (2 columns by 3 rows, last tile spanning both); give each tile a starting offset (pushed away, rotated plus or minus 10 degrees, scaled 0.8); on scroll into view snap tiles into place with a 0.16 s stagger (`back.out(1.5)` in the guide); start each tile's inner animation after it lands; 28px radius in the guide (use the direction's radius policy instead); single column on mobile with rotation dropped. One headline and one visual per tile; strongest feature in the biggest tile. Avoid in restrained directions (bento rows of equal tiles are a warned tell) and never fill tiles with icon-plus-text.

**07 Cursor tour (features, SaaS).** Rebuild a simplified app screen in HTML (sidebar, header, cards); an absolutely positioned SVG cursor; one GSAP timeline: move to a button (`power2.inOut`, 0.6-0.9 s per move, human speed), click ripple, open a modal, type into its input letter by letter, click Create, pop the new item into the grid; positions from `getBoundingClientRect`, recalculated on resize; loop with a 1.5 s pause. One task only; a tour that does five things loses people. Avoid when a real interactive fragment can be built instead, and on touch-only audiences where a fake cursor means nothing.

**08 Process draw (how it works).** Three step nodes (five maximum) in a row connected by one curved SVG path behind them; `stroke-dasharray` set to the path length, animate `stroke-dashoffset` to 0 over 2 s ease in-out when the section enters; fill each node in the accent and pop a check as the line reaches it; end with a short outcome line ("Your page is live"). Vertical line on phones. Write each step as an outcome, not a task. Avoid numbered "Step 1/2/3" labels (banned); the path and order carry the sequence.

**09 Before / after (case studies, portfolios).** Two full-size layers, old underneath, new on top; hide part of the top layer with `clip-path: inset(0 0 0 X%)`; a vertical handle at X draggable with pointer events (mouse and touch); on first view auto-sweep 88% to 12% to 50% so people get it without touching; "Before" and "After" labels. Same crop and zoom for both images; the biggest visible change in the middle of the frame. Avoid for images that are not truly the same view.

**10 Price roll (pricing).** A Monthly/Yearly toggle with a sliding knob; each digit of every price as a column of 0-9 inside a fixed-height box with `overflow: hidden`, moved up by digit times row height; on toggle roll every column to its new digit, `power3.inOut`, 1 s, 0.06 s stagger between columns; a "Save X%" badge that is the real maths. Default to yearly only if most revenue is annual. Avoid with one price or when the saving is invented; `font-variant-numeric: tabular-nums` so widths do not jump.

**11 Us vs them (before pricing).** A three-column table (feature, others, us); a highlight behind the "us" column grows in first (a flat field, not the guide's glow); rows slide in with a 0.3 s stagger; a grey cross for others, a check in the accent for us; the action under the table. Five rows maximum, only comparisons that are true. On mobile keep three columns and shrink the text or stack as a definition list. Avoid when the comparison is with named competitors you cannot substantiate.

**12 Click success (sign-up, checkout).** A large pill button; on click fade the label, shrink the button to a 130px circle (`power3.inOut`), show a spinning ring while awaiting the real request's promise; on success turn the circle the accent, draw a check, burst 28 confetti pieces outward that fade as they fall, show a success message that says what happens next; on error shake and restore the label. Tie it to the real request, never a fixed delay; disable the button while pending. Avoid confetti in Corporate Trust, Luxury and Soft and Calm directions (a quiet check is enough) and anywhere the action is routine.

## 9. Signature moves by direction

Pick by subject; if the move says nothing about the subject it is decoration.

| Move | What happens | Suits |
|---|---|---|
| Masked headline | lines of a section headline rise from behind their baselines as it scrolls into view; below the fold only (on load the first-screen text is already there, §7) | most directions |
| Shutter image | hero image opens from an edge, settling from 1.12 scale | product pages, Dark Cinematic, Luxury |
| Scaling wordmark | a giant wordmark shrinks a few percent as the hero scrolls out | Magazine, Quiet Editorial, name-led brands |
| Held picture, passing captions | one picture holds while 3-5 captions pass with a visible count | clinics (journey), craft (process), 3D Showcase |
| Index with preview | rows of names; the pointed-at row shows its picture in a frame anchored to the row | portfolios, studios |
| Curtain footer | the last section is revealed from under the page | agencies, editorial |
| Slow crossfade | hero crossfades through 3-4 photographs, 5-6 s each | restaurants, hotels, Luxury |
| Colour by chapter | each chapter is its own flat field with hard cuts; header ink follows | Colour-Field Poster, Swiss, events |
| Opening window | a picture grows from a 38-60% window to full-bleed over about one screen of scroll | one great photograph; Dark Cinematic; product |
| Ink-fill statement | one statement fills from 45% to full ink as it rises, once per page | editorial, manifesto pages |
| Sheet over a held picture | a full-bleed photograph holds; the next chapter slides up over it as an opaque sheet | chaptered stories |
| Sideways gallery | a short row moves sideways while the vertical scroll holds the stage | rooms, kitchens, pieces (under eight) |
| Pushed line | one line of very large type pushed sideways by the scroll, reading whole at mid-run | Swiss, Colour-Field, a brand whose claim is a word |
| Rolling figures | three or four real numbers roll up once | reports, funds, practices that lead with numbers |
| Carried picture | the picture clicked in a list travels into place as the next page's hero (view transitions) | portfolios and shops with built case pages |
| The live thing | one working element made from the subject (configure, compute, check availability) | every direction; it is the strongest move of all |

## 10. What gives generated motion away

The same fade-up on every block; a dozen staggered entrances in the hero; hover lift or zoom on every card and image; bounce or elastic easing on interface elements; infinite loops that mean nothing (pulsing dots, floating shapes, shimmering text, rotating badges, decorative blinking cursors); auto-scrolling marquees that hide half their content; parallax as the thesis; scramble, decode and typewriter headlines (real words arrive whole); preloaders and counters; custom cursors; wheel-driven scenes with no page scroll; reveals that fail and leave a blank band; a reduced-motion rule that is a global kill or absent (35 of 99 award pages had any rule).

## 11. Motion pre-flight

- Headline, sentence and action readable on the first frame; load sequence settled by 1.2 s (never over 2.5 s).
- One signature move; one moving picture; one marquee at most; nothing else loud.
- No two animations visible at once on any screen; entrances play once.
- Every hidden state inside `prefers-reduced-motion: no-preference` and behind `.js`; the reduced page is the finished page; loops stop off-screen and when hidden.
- Only transform, opacity and clip-path animate (plus the accordion exception); blur bounded; `will-change` not left on at rest.
- Easing from the tokens; no bounce outside playful directions; exits shorter than entrances.
- Scroll-linked motion linear and locked; parallax under 8%; held stages with a count and text on every screen.
- Every control has press, hover and focus feedback; carousels have controls and stop on focus.
- Tested on a mid-range Android and with CPU throttling; no dropped frames on the signature move.
- Nothing animated is fake: counters, pings, reviews, progress and success states all read real data or real requests.
- Any background or hero video passes §12: poster composed on the first frame, muted and inline, a pause control, off-screen and hidden-tab pause, no download under reduced motion or save-data, inside the size budget.

## 12. Background and hero video

A video counts as the page's one moving picture (§1). It never replaces a decided first screen: the hero must already be composed on its poster, with the headline, sentence and action readable, before a single video byte arrives.

### When video is the wrong choice

Use a still (or nothing) when any of these is true:
- There is no real footage of the subject. A stock loop of "the vibe" is decoration and fails the cover-the-name test; a real photograph of the client's own place beats it.
- The visitor arrives on a phone to act fast (a clinic from Maps, a takeaway menu): the page's job is the action, and the bytes compete with it.
- The text would sit over the busy part of the frame for most of the loop, or the footage only works under a heavy dark overlay. Choose calmer footage or a picture.
- The page already has a loud signature move, a marquee or another loop on the same screen (one moving thing per screen).
- The surface is an app screen, docs or anything people read or operate (ui-ux skill: feedback and continuity only).
- The footage carries information (speech, a demo to follow). Then it is content: controls and captions, no autoplay.

### Base recipe: muted inline autoplay with poster and fallbacks

- `muted` and `playsinline` on the element, and `video.muted = true` in script as well. MDN's autoplay guide (checked Oct 2026): media may autoplay when it is muted or has no audio track; `playsinline` is required for autoplay in Safari. WebKit's iOS policy: muted autoplay starts only while the element is visible in the viewport and pauses when it leaves; without `playsinline` iPhone plays fullscreen.
- Strip the audio track at encode time (`-an`): a silent file is the safest autoplay case and smaller.
- `play()` returns a promise that rejects (for example `NotAllowedError`) when autoplay is refused (MDN). Catch it and leave the poster; never show an error or a broken frame.
- The poster is a separate `<img>` with `fetchpriority="high"` under the video, exported from the clip's first frame so the hand-over is invisible. web.dev counts a `<video>`'s poster load or first frame, whichever is earlier, as its LCP time (checked Oct 2026); a separate poster image keeps LCP on an image you control. Give the section a ground colour sampled from the poster.
- Reduced motion and low data never download the video: the sources sit in `data-src` and script assigns them only when allowed. Under `prefers-reduced-motion: reduce` the poster is the finished state. For low data read `navigator.connection.saveData` where it exists (Chromium only, not Baseline per MDN, Oct 2026). Do not rely on `prefers-reduced-data`: MDN marks it experimental and unsupported by any browser (Oct 2026).
- A visible pause control: WCAG 2.2.2 (Pause, Stop, Hide) requires one for moving content that starts automatically and lasts over five seconds. A user pause sticks; scrolling back does not restart it.
- Pause off-screen (IntersectionObserver) and when the tab is hidden (`visibilitychange`).
- Settle-in: the video fades in over its own poster (700 ms, `--ease-out`) and settles from `scale(1.04)` inside the 1.2 s load sequence (§7). Never fade up from black, never hold the reveal past the load sequence.
- Without JavaScript the page shows the poster and works.

```html
<section class="vhero">
  <img class="vhero__still" src="hero-poster.avif" alt="" width="1920" height="1080" fetchpriority="high">
  <video class="vhero__video" muted loop playsinline preload="none" aria-hidden="true">
    <source data-src="hero-av1.webm" type='video/webm; codecs="av01.0.08M.08"'>
    <source data-src="hero-hevc.mp4" type='video/mp4; codecs="hvc1.1.6.L120.90"'>
    <source data-src="hero-h264.mp4" type="video/mp4">
  </video>
  <button class="vhero__pause" type="button" aria-pressed="false" hidden>Pause background video</button>
  <div class="vhero__copy">headline, sentence, action</div>
</section>
```
```css
.vhero { position: relative; min-height: 100svh; overflow: clip; background: var(--poster-ground); isolation: isolate; }
.vhero__still, .vhero__video { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; object-position: var(--focus, 50% 50%); z-index: -1; }
.vhero__video { opacity: 0; }
.vhero__video.is-playing { opacity: 1; }
@media (prefers-reduced-motion: no-preference) {
  .vhero__video { transform: scale(1.04); transition: opacity 700ms var(--ease-out), transform 1200ms var(--ease-soft); }
  .vhero__video.is-playing { transform: none; }
}
```
```js
function mountHeroVideo(root) {
  const v = root.querySelector('video'), btn = root.querySelector('.vhero__pause');
  const still = matchMedia('(prefers-reduced-motion: reduce)').matches || navigator.connection?.saveData === true;
  if (still) return;                                   // the poster is the finished state
  root.querySelectorAll('source[data-src]').forEach((s) => { s.src = s.dataset.src; });
  v.muted = true; v.load();
  let inView = false, userPaused = false;
  const play = () => { if (inView && !userPaused && !document.hidden) v.play().catch(() => {}); };
  v.addEventListener('playing', () => { v.classList.add('is-playing'); btn.hidden = false; }, { once: true });
  new IntersectionObserver(([e]) => { inView = e.isIntersecting; inView ? play() : v.pause(); }).observe(v);
  document.addEventListener('visibilitychange', () => (document.hidden ? v.pause() : play()));
  btn.addEventListener('click', () => {
    userPaused = !userPaused; userPaused ? v.pause() : play();
    btn.setAttribute('aria-pressed', String(userPaused));
    btn.textContent = userPaused ? 'Play background video' : 'Pause background video';
  });
}
document.querySelectorAll('.vhero').forEach(mountHeroVideo);
```

The browser plays the first `<source>` it can and moves to the next when one fails (MDN `<video>`, Oct 2026), so order sources best codec first. Write the `codecs` string that matches the actual encode and confirm each with `video.canPlayType()` in the target browsers; the strings above are examples for 1080p AV1 Main and HEVC Main.

### HLS streams (`.m3u8`)

A 6-12 s loop is one MP4; HLS earns its cost for long footage, many renditions, or a host that only serves `.m3u8`. Support as checked in Oct 2026:
- Safari on macOS and iOS plays HLS natively through `video.src`.
- Desktop Chromium added built-in HLS playback around Chrome 141-142 (late 2025, per the Chromium issue tracker and press reports; no official release note found). The hls.js README warns that Chrome 147 reports support through `canPlayType('application/vnd.apple.mpegurl')` yet may fail on some assets, and recommends hls.js (Media Source Extensions) first, with native first only where `ManagedMediaSource` exists (modern Safari). So a bare `canPlayType` check, the common recipe, is no longer enough.
- Firefox needs hls.js.

Order: native where `ManagedMediaSource` is present, else hls.js where `Hls.isSupported()`, else native if `canPlayType` answers (older iOS without MSE), else the poster stays. Load hls.js only on the path that needs it.

```js
const loadScript = (src) => new Promise((ok, fail) => {
  const s = document.createElement('script'); s.src = src; s.onload = ok; s.onerror = fail; document.head.append(s);
});
async function attachStream(video, url) {
  const native = video.canPlayType('application/vnd.apple.mpegurl') !== '';
  if (native && 'ManagedMediaSource' in window) { video.src = url; return null; }
  try { await loadScript('https://cdn.jsdelivr.net/npm/hls.js@1/dist/hls.min.js'); } catch {}  // pin an exact 1.x in production
  if (window.Hls?.isSupported()) {
    const hls = new Hls({ capLevelToPlayerSize: true });  // only renditions that fit the element (default false)
    hls.loadSource(url); hls.attachMedia(video);
    return hls;                                           // hls.destroy() on unmount; stopLoad()/startLoad() off and on screen
  }
  if (native) video.src = url;
  return null;
}
```

Everything else from the base recipe applies: off-screen and hidden-tab pause, the settle-in on the first `playing` event, and reduced motion or save-data keep the poster and never attach the stream. In a component framework, destroy the instance in the effect cleanup.

### Seamless loop via crossfade

A native `loop` shows a hard cut when the last frame differs from the first. Fix it in the file:

```bash
# clip length D=8 s, fade F=1 s: body = 1..8 s, head = 0..1 s, xfade offset = D - 2F; output is D - F seconds
ffmpeg -i in.mp4 -an -filter_complex "[0:v]split[a][b];[a]trim=1:8,setpts=PTS-STARTPTS[body];[b]trim=0:1,setpts=PTS-STARTPTS[head];[body][head]xfade=transition=fade:duration=1:offset=6[v]" -map "[v]" -c:v libx264 -crf 24 -pix_fmt yuv420p -movflags +faststart loop.mp4
```
The output starts at the source's 1 s frame and its last second dissolves into the source's first second, which ends on that same 1 s frame, so the loop point matches. Then use native `loop`.

Runtime crossfade only when the file cannot be re-encoded: two stacked `<video>` elements with the same source; when the playing one has F seconds left, start the other from 0 and fade it in over F (opacity only), then swap roles. It costs a second decoder and double memory, so keep it off phones. Never dip to black between loops.

### Framing per breakpoint

- Focal point by `object-position` from a custom property changed per breakpoint, so the subject lands away from the copy: `--focus: 50% 50%` on phones, `--focus: 70% 50%` from 1024px with the copy on the left. Check at 390, 768 and 1440 on frames from the start, middle and end of the clip.
- Bleed: `scale(1.02-1.05)` hides encoder edge lines and one-pixel letterbox slivers.
- On phones, when the text would sit over the subject, put the video in-flow below the copy in a 1:1 or 4:5 frame instead of behind the text.
- A portrait encode beats cropping a landscape one: choose the source with `matchMedia('(max-width: 768px)')` once at mount (never swap on resize) and give it its own poster.

### Edge-blend scrim for text over video

The one gradient the house rules allow: a neutral scrim from the section's exact ground colour (or neutral black) to transparent, under text only. Never chromatic, never a glow.
- Start late and ease it with several stops; a two-stop gradient bands: `linear-gradient(to top, var(--ground) 0%, color-mix(in oklch, var(--ground) 85%, transparent) 10%, color-mix(in oklch, var(--ground) 55%, transparent) 22%, color-mix(in oklch, var(--ground) 20%, transparent) 34%, transparent 46%)`.
- The exact ground colour of the next section, so the hand-off has no seam.
- On portrait screens a directional scrim from the copy's side usually beats a full-frame dim.
- Contrast is checked over the brightest frame in the text zone, not the poster alone: grab frames at 0, 50 and 100% of the clip.
- No scrim is better when the footage has a calm zone; never rescue busy footage with a heavy overlay.

### Scroll-scrubbed video via a canvas frame cache

The scroll position is the timeline: a fixed clip advances only as the visitor scrolls. It is the page's signature move and its one moving picture, so nothing else moves near it; it suits 3D / Immersive Showcase and Dark Cinematic with two or three sparse screens of text.

- Layers: a poster `<img>`, under a paused `<video>` (fallback), under a `<canvas>` drawing pre-extracted frames.
- Frame count `clamp(round(duration x 12), 24, 90)`; frames at most 960px wide (640px on phones); canvas at `min(devicePixelRatio, 2)`; draw with cover maths.
- Start extracting only after the visible video reports `loadeddata` plus about 300 ms, so the first paint is not starved; extract by seeking a hidden copy and drawing after each `seeked`.
- Map progress linearly to the section's scroll range; smoothing, if any, lerp 0.1-0.14 and off for touch (§2). Until the cache is ready, seek the video directly, only when not already seeking and the change is over about 0.04 s.
- Encode the fallback with short keyframe intervals so seeks land quickly (`-g 6`, or all-intra `-g 1` for a larger file).
- Drawing a cross-origin video into a canvas works but taints it, which only blocks reading pixels back (`getImageData`, `toDataURL`, `toBlob`; MDN, Oct 2026). Do not add `crossorigin` unless the host sends CORS headers, or the video fails to load.
- Reduced motion: the poster and the text, no scrub (§6, the finished composition).

The cost, stated in the report: each cached frame is width x height x 4 bytes, so 90 frames at 960x540 hold about 187 MB and 90 at 640x360 about 83 MB; extraction is seconds of decode work after load; each transformation needs about 80vh of scroll runway. On phones prefer a held picture with passing captions (§9) or a pre-extracted image sequence served as files.

### Boomerang loop (pre-rendered)

For a clip that does not loop (a push-in, a flower opening), play it forward then backward, rendered into the file and looped natively:

```bash
ffmpeg -i in.mp4 -an -filter_complex "[0:v]split[a][b];[b]reverse[r];[a][r]concat=n=2:v=1:a=0[v]" -map "[v]" -c:v libx264 -crf 22 -pix_fmt yuv420p -movflags +faststart boomerang.mp4
```
The `reverse` filter buffers the whole clip in memory, so trim the source to 3-5 s first; the output doubles in length and size. Capturing frames at runtime (with `requestVideoFrameCallback`, Baseline since Oct 2024 per MDN, and a `requestAnimationFrame` fallback) costs about 2 MB per 960x540 frame and is a last resort.

### Budgets and formats

Durations and sizes adapted from the Motionsites guide; codec support checked against MDN's web video codec guide (Oct 2026).
- Hero loop 6-12 s, no audio track, 24-30 fps; 1080p for desktop at about 5 MB (8 MB ceiling); a 720p (or portrait) encode for phones. Anything over 25 MB or a minute is flagged in the report (`references/preflight.md` §8).
- `-movflags +faststart` on every MP4 so playback starts before the file finishes downloading.
- Codec ladder, best first:
  1. AV1 in WebM or MP4: smallest; Chrome, Edge and Firefox decode it; Safari only on devices with a hardware decoder (M3 Macs and later, iPhone 15 Pro, iPhone 16 and later).
  2. HEVC in MP4 tagged `hvc1` (`-tag:v hvc1`; Apple's HLS authoring guidance prefers `hvc1` over `hev1`): Safari decodes it; Chrome 107+ and Firefox depend on platform hardware or OS support.
  3. H.264 in MP4: the universal fallback every major browser plays (Firefox through the OS codecs).
- WebM for AV1 or VP9 where an open container is wanted; MP4 for HEVC and H.264. Never ship only AV1 or only HEVC.

```bash
ffmpeg -i in.mp4 -an -vf "scale=1920:-2,fps=24" -c:v libsvtav1 -crf 35 -preset 6 hero-av1.webm
ffmpeg -i in.mp4 -an -vf "scale=1920:-2,fps=24" -c:v libx265 -crf 28 -tag:v hvc1 -pix_fmt yuv420p -movflags +faststart hero-hevc.mp4
ffmpeg -i in.mp4 -an -vf "scale=1920:-2,fps=24" -c:v libx264 -crf 24 -preset slow -pix_fmt yuv420p -movflags +faststart hero-h264.mp4
ffmpeg -i in.mp4 -an -vf "scale=1280:-2,fps=24" -c:v libx264 -crf 26 -preset slow -pix_fmt yuv420p -movflags +faststart hero-720.mp4
ffmpeg -i hero-h264.mp4 -frames:v 1 hero-poster.png   # then convert to AVIF or WebP for the poster
```
Tune CRF until the file meets the budget; judge the result by eye at the hero's real size.

Not adopted from the source (house rules): a delayed video reveal after the type intro (breaks the 1.2 s load sequence), fade-to-black loops, glass chrome or grain over footage, progressive backdrop blur over full-screen video, cursor-scrubbed video, and a bobbing foreground frame over a scene switcher (an infinite loop that means nothing).
