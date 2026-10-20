# Motion

Motion is the last pass, never a way to rescue a weak layout: the static page must already be finished. Numbers below come from the gallery motion study (99 Awwwards Sites of the Day, July to October 2026, via taste-skill), impeccable's animate and craft-floor rules, the ui-ux-pro-max motion table, and the "12 landing page animations" guide (MadeToScale, 2026) for the GSAP recipes.

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

## 1. The one-moment rule and the budget

- **One moving thing per screen.** If two animations are visible at the same time, cut one.
- **One signature moment per page:** the thing a visitor would describe an hour later (a headline rising out of a mask, a picture opening to full-bleed, a product that configures itself). Only this move may be loud. Everything else is quiet so it lands.
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

Everything is in the HTML and painted on the first frame; the sequence only adds arrival. Four elements at most: headline lines rise from behind their baselines (100-990 ms, expo-out, 90-110 ms apart), the hero picture opens from a clip and settles from 1.08 scale (150-1,150 ms), the sentence and the button rise 12px (420-980 ms). Nothing in the navigation animates. Preload the display font so the lines rise in the real face; give the hero image `fetchpriority="high"` and a ground colour sampled from it so a slow image opens onto its own colour. Reduced motion: everything is simply there.

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
| Masked headline | lines rise from behind their baselines on load | most directions |
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
