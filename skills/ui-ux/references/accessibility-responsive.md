# Accessibility, responsive and adaptive

Targets are WCAG 2.2 Level AA unless marked AAA. Native specifics follow Apple's Human Interface Guidelines and Material Design 3. As of Oct 2026.

## Contents

1. Contrast and colour
2. Structure and semantics
3. Keyboard and focus
4. Screen readers and live regions
5. Forms
6. Targets, pointers, gestures
7. Motion, media, time
8. Zoom, reflow, text spacing
9. Authentication and help
10. Responsive: breakpoints, input, safe areas
11. Adapting between contexts
12. Native iOS and Android basics
13. Performance targets
14. Testing tools and evidence
15. Quick CSS and ARIA snippets

## 1. Contrast and colour

- Text and placeholder text >= 4.5:1; large text (>= 24px, or >= 18.5px bold) >= 3:1; AAA is 7:1. UI component boundaries, icons that carry meaning, and focus indicators >= 3:1 against adjacent colours.
- Check both themes, interactive states (hover, selected, disabled where it conveys information), text over images and gradients, and overlays. Grey on a coloured surface almost always fails; derive secondary text from the surface or foreground hue.
- Colour is never the only channel: add text, icon, pattern, position or shape for status, selection, errors and chart series. Simulate deuteranopia and protanopia at least once.
- Windows High Contrast / forced-colors mode: borders and focus survive (`@media (forced-colors: active)`; use `outline`, not only `box-shadow`, for focus).

## 2. Structure and semantics

- Buttons are `<button>`, links are `<a href>`; a `div` with a click handler is a defect. Toggle-like compact controls use `<button aria-pressed>` or `role="tab"`/`aria-selected`; the exposed state matches the visible label.
- One `h1` per screen; heading levels in order with no skips; landmarks (`header`, `nav`, `main`, `aside`, `footer`) so screen-reader users can jump.
- Images: alt text that conveys the information; `alt=""` for decoration; charts get a text summary or a data table.
- Tables: `<th scope>` headers, a `<caption>` or `aria-labelledby`; sortable headers expose `aria-sort`.
- Icon-only controls: `aria-label` equal to the visible tooltip; decorative icons `aria-hidden="true"`.
- Language declared (`<html lang>`), and on runs in another language.

## 3. Keyboard and focus

- Every action reachable and operable by keyboard; tab order follows the visual order; no traps; `Esc` closes the topmost overlay.
- Visible focus indicator at least a 2 CSS px perimeter with 3:1 against adjacent colours (`:focus-visible`), never removed with `outline: none` without a replacement.
- Focus not obscured: sticky headers and bars offset with `scroll-padding-top`; persistent overlays (cookie bars, chat widgets) dismissable or placed so they never cover the focused element.
- Focus management: on dialog open, focus the dialog (or its first field); on close, return focus to the trigger; after a failed submit, focus the error summary; after a route change, focus the new `h1` or main region and announce it.
- Composite widgets (menus, tabs, grids, listboxes, trees) use roving tabindex and arrow keys per the ARIA Authoring Practices; a single Tab stop per widget.
- Skip link to main content as the first focusable element.

## 4. Screen readers and live regions

- Announce loading, success and errors: `aria-live="polite"` for status ("Saved", "3 items in cart"); `role="alert"` for blocking errors. One atomic message per change; never a stream of "updated".
- Regions that load set `aria-busy="true"` and the skeleton is hidden from assistive tech (`aria-hidden`) so empty bars are not read.
- Names, roles and states of custom components exposed and tested with at least one screen reader (NVDA or JAWS on Windows, VoiceOver on macOS/iOS, TalkBack on Android).
- Visible label and accessible name agree so voice control users can say what they see.

## 5. Forms

- Every input has a programmatic label (`<label for>` or wrapping); required state in the label text or `aria-required`; help text and errors linked with `aria-describedby`; invalid fields `aria-invalid="true"`.
- A focusable error summary at the top after failed submit, with links to each invalid field; inline errors below the field.
- Correct `type`, `inputmode`, `autocomplete` tokens; no redundant entry (auto-populate values entered earlier in the flow, or let the user pick them).
- Time limits extendable; sessions warn before expiry and preserve the form.

## 6. Targets, pointers, gestures

- Web: targets >= 24x24 CSS px (WCAG 2.2 minimum), or 24px of clear spacing around smaller ones; aim for 44x44 on touch surfaces with >= 8px between targets. iOS 44x44pt; Android 48x48dp with 8dp between.
- Any drag or multi-point gesture has a single-pointer, non-drag alternative (buttons, menus, tap-to-move) and keyboard operation.
- Pointer actions complete on up-event or can be aborted; no essential hover-only functions.
- Avoid horizontal swipe on main content (conflicts with system Back and page scroll); set `touch-action` on custom drag surfaces; disable pull-to-refresh where it conflicts.

## 7. Motion, media, time

- `prefers-reduced-motion: reduce` gets an intentional alternative: remove spatial movement, parallax and scroll-jacking; keep opacity, colour and state transitions that carry meaning; present the final readable state. Not a global `* { animation-duration: 0.01ms }` kill.
- Auto-rotating or auto-playing content has previous/next and pause controls, stops on hover and focus and when reduced motion is requested; video prefers click-to-play with captions; nothing flashes more than three times a second; sound only on explicit action.
- Continuous animation only for loading indicators and genuinely live data (a pulsing dot that lies about liveness is a defect).
- Transitions cancellable and replaceable: set the final semantic state directly if motion is interrupted.

## 8. Zoom, reflow, text spacing

- Works at 200% browser zoom and at 320 CSS px width without horizontal scroll of the page (reflow); fluid sizes, content-driven heights, unitless line heights.
- Survives user text-spacing overrides (line height 1.5, paragraph spacing 2x, letter spacing 0.12em, word spacing 0.16em) without clipping.
- Respects Dynamic Type (iOS) and font scale up to 1.3 and beyond (Android) by using text styles and `sp`, never fixed pixel sizes.
- Chip collections wrap or expose hidden values through an operable "+n" disclosure; compact labels with unpredictable values bound only the value and expose the full text to keyboard, pointer and touch.

## 9. Authentication and help

- Accessible authentication: no cognitive function test (memorising, transcribing) as the only path; allow paste and password managers; offer passkeys, OAuth or email links; OTP fields accept a pasted code.
- Consistent help: contact, self-help and automated help appear in the same relative place on every screen.

## 10. Responsive: breakpoints, input, safe areas

- Mobile-first with `min-width` queries; breakpoints where the content breaks, not at device sizes; three usually suffice (640/768/1024). Indicative bands: 320-767 phone, 768-1023 tablet, 1024+ desktop. Test at 320, 375, 414, 768, 1024, 1440, and the owner's actual viewport.
- `<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">`; never `maximum-scale=1` or `user-scalable=no`.
- Input detection, not screen size: `@media (hover: hover) and (pointer: fine)` for hover affordances; `(pointer: coarse)` to enlarge targets; a touch laptop is both.
- Safe areas: `padding-bottom: max(1rem, env(safe-area-inset-bottom))` on fixed bars; account for other fixed elements when positioning.
- Use `dvh` (or `svh`) rather than `vh` for full-height layouts because mobile browser chrome changes the viewport; `100vh` overflows under the URL bar.
- Images: `max-width: 100%; height: auto`; `srcset`/`sizes` with width descriptors; `<picture>` for art direction; `aspect-ratio` or dimensions to prevent layout shift; lazy load below the fold only.
- Container queries for components that appear in different contexts; `clamp()` for fluid values on marketing surfaces; fixed rem scales on product UI.
- Long tokens: `overflow-wrap: anywhere` and `min-width: 0` on flex/grid children; `display: none` still downloads, so hide sparingly.
- Tables: two-line rows or card layout below about 640px, or horizontal scroll inside the table's own frame with the first column fixed; the page never scrolls sideways.
- Z-index: one declared scale; `position: fixed` elements account for safe areas and each other.

## 11. Adapting between contexts

Adaptation rethinks the screen for the new context; it does not scale pixels. Name the source assumptions (large screen? mouse? fast network? quiet room?) and the target's device, input, constraints, connection and usage scene.

| From -> to | Do |
|---|---|
| Desktop -> phone | Single column; full-width controls; bottom nav or a menu sheet; 44px targets; no hover dependence; bottom sheets instead of dropdowns; thumbs first; progressive disclosure; >= 16px text; sticky header; Back everywhere |
| Phone -> tablet | Two columns; master-detail; side panels; orientation-adaptive; touch plus pointer; denser than phone; multi-column forms; never a phone bottom bar stretched across a tablet |
| Phone -> desktop | Multi-column; visible side nav; multiple panels; a max-width (do not stretch to 4K); hover information; keyboard shortcuts; context menus; drag and drop; multi-select |
| Screen -> print | Page breaks; strip nav, footer and interactive chrome; expand hidden content; full URLs after links; margins and page numbers; print-safe charts |
| Screen -> email | 600px max, single column, inline CSS, table layout, buttons not links, no hover, deep links |

Avoid: hiding core functions on mobile; assuming desktop means powerful; different information architecture per context; forgetting landscape; device detection instead of feature detection; separate mobile and desktop codebases.

## 12. Native iOS and Android basics

iOS (HIG governs structure; brand expresses through tint, type, motion, content):
- Safe-area insets respected (notch, Dynamic Island, home indicator); tab bar for 2-5 sections (sections, never actions); navigation stack for hierarchy with large titles collapsing to inline; sheets for self-contained tasks with Cancel/Done and swipe-to-dismiss unless data loss; edge-swipe back never disabled.
- 44x44pt targets. Dynamic Type text styles (Body 17pt, 11pt floor), no hard-coded point sizes; SF Pro for UI, brand face for display moments.
- Semantic system colours (label, secondaryLabel, systemBackground, separator, tint); one tint drives interactive elements; Dark Mode first-class; system materials for blur.
- Platform controls (switch, segmented, stepper, pickers, action sheets, alerts, context menus, swipe actions); SF Symbols; grouped/inset lists for settings; honour Reduce Motion with crossfades.
- Verify on every device class in the Simulator (`xcrun simctl io booted screenshot`, `xcrun simctl ui booted appearance dark`), large Dynamic Type, and on hardware for gestures and performance.
- The iOS slop test: would a fluent iPhone user trust this app, or does it read as a ported website (reinvented nav bars, web-shaped buttons, hover affordances)?

Android (Material Design 3 governs; brand through Material theming):
- Navigation bar with 3-5 destinations on compact width, rail or drawer on expanded; never a phone bottom bar on a tablet; system and predictive Back always work; edge-to-edge with window insets (status bar, nav bar, cutout, IME); top app bar plus one FAB when there is one primary action.
- 48x48dp targets with >= 8dp between. Material type scale roles in `sp`, never fixed px; Roboto or a themed brand face.
- Material colour roles (primary, on-primary, surface, surface-variant, outline, error); Dynamic Color with a static fallback; dark theme first-class with tonal elevation, not a quick invert.
- Material buttons (filled/tonal/outlined/text), switches, chips, snackbars (transient; one action at most), bottom sheets, dialogs only for interrupting decisions; Material motion; honour "Remove animations".
- Verify: `adb exec-out screencap -p`, `adb shell cmd uimode night yes`, `adb shell settings put system font_scale 1.3`; hardware for gestures, refresh rates and performance.
- The Android slop test: an iOS app wearing Android's skin (bottom-only nav copied from iPhone, a back arrow that ignores system Back, Cupertino switches and dialogs).

Both: phone -> tablet restructures via size classes (iOS) or window size classes (Android), never device-model checks; orientation restructures, never clips or letterboxes; foldables tested folded, unfolded and tabletop; a cross-platform framework still owes each platform its idioms.

## 13. Performance targets

- Core Web Vitals: LCP < 2.5s (hero media sized and preloaded, critical CSS, CDN, SSR where useful); INP < 200ms (break long tasks, defer non-critical JS, web workers); CLS < 0.1 (dimensions on media, `aspect-ratio`, reserved space for async content, nothing injected above existing content).
- Measure first (Lighthouse, DevTools Performance, WebPageTest, CrUX, RUM); optimise the biggest bottleneck; never trade accessibility for speed.
- Images WebP/AVIF at 80-85% quality, sized, lazy below the fold only. Fonts: `font-display: swap` or `optional`, subset, preload the critical face, limit weights, metric-compatible fallbacks. JS: route and feature splitting, tree shaking, no unused third-party scripts. CSS: critical inline, rest async. Lists past a few hundred rows virtualised (react-window, TanStack Virtual or the framework's equivalent). `content-visibility: auto` for long pages.
- Animate `transform` and `opacity`; bound blur, filter and shadow to small regions; `will-change` only during a known animation; 60fps (16ms) target; test on a low-end Android and throttled 3G.

## 14. Testing tools and evidence

- Automated: axe DevTools or axe-core in CI, WAVE, Lighthouse accessibility, Pa11y; eslint-plugin-jsx-a11y or the framework's lint rules. A clean automated run catches roughly a third of issues; it is evidence, not proof.
- Manual: a full keyboard pass; one screen reader on desktop (NVDA with Firefox, or VoiceOver with Safari) and one on mobile (VoiceOver, TalkBack); 200% zoom; text-spacing bookmarklet; forced-colors mode; reduced motion on; a colour-deficiency simulator; contrast checker on real rendered colours (computed values, not design tokens).
- Responsive: DevTools device emulation for breadth; the "Mobile View - Mobile Simulator & Preview" Chrome extension to see several device frames beside the desktop view at once; then at least one real iPhone, one real Android (a cheap one reveals performance problems) and a tablet. Exercise every custom control's primary gesture on a real touch screen: a scroll across a slider must scroll the page; a drag along its axis must move it.
- Loading states: generate skeletons from the rendered UI (for example the open-source Boneyard tool) so they match real sizes and avoid layout shift.
- Report what produced the evidence (emulated viewport, synthesized touch, which engine; Chromium is not Safari) and what stayed untested. Never claim a pass you did not run.

## 15. Quick CSS and ARIA snippets

```css
/* Focus ring that survives any background */
:focus-visible {
  outline: 2px solid var(--color-ring);
  outline-offset: 2px;
}
/* Keep focused elements out from under sticky bars */
html { scroll-padding-top: 72px; }

/* Reduced motion: remove movement, keep meaning */
@media (prefers-reduced-motion: reduce) {
  .reveal { transform: none; transition: opacity 150ms linear; }
  .parallax { transform: none !important; }
}

/* Hover affordances only where hover exists */
@media (hover: hover) and (pointer: fine) {
  .row:hover { background: var(--color-muted); }
}

/* Safe areas on a fixed bottom bar */
.bottom-bar { padding-bottom: max(0.75rem, env(safe-area-inset-bottom)); }

/* Full height without the mobile URL-bar overflow */
.screen { min-height: 100dvh; }

/* Prevent long tokens from blowing up flex/grid layouts */
.cell { min-width: 0; overflow-wrap: anywhere; }

/* Visually hidden but readable */
.sr-only { position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px;
  overflow: hidden; clip: rect(0 0 0 0); white-space: nowrap; border: 0; }
```

```html
<!-- Icon-only button -->
<button type="button" aria-label="Delete invoice 1042">
  <svg aria-hidden="true">...</svg>
</button>

<!-- Field with hint and error -->
<label for="email">Email</label>
<input id="email" type="email" autocomplete="email" inputmode="email"
       aria-describedby="email-hint email-error" aria-invalid="true">
<p id="email-hint">We send appointment reminders here.</p>
<p id="email-error" role="alert">Email is missing @</p>

<!-- Status announcement -->
<div aria-live="polite" class="sr-only" id="status">Saved</div>

<!-- Loading region -->
<section aria-busy="true" aria-labelledby="deploys-h">
  <h2 id="deploys-h">Deployments</h2>
  <div aria-hidden="true" class="skeleton">...</div>
</section>

<!-- Dialog -->
<dialog aria-labelledby="dlg-title">
  <h2 id="dlg-title">Delete 3 photos?</h2>
  <p>You can't undo this.</p>
  <button type="button" value="cancel">Cancel</button>
  <button type="button" value="confirm">Delete 3 photos</button>
</dialog>
```
