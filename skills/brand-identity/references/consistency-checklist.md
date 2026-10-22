# Brand consistency checklist

Run this at the QA step of a new brand system, before any brand asset ships, and periodically on
live surfaces. Check two real surfaces at minimum (for example the homepage and one app screen or
invoice), not just the token file; drift happens in use.

Contents

1. Token integrity
2. Colour
3. Typography
4. Logo
5. Imagery, icons, shape
6. Voice and messaging
7. Accessibility
8. Channel audit
9. Pre-publish asset approval
10. Common issues and fixes
11. Audit cadence
12. Report format

---

## 1. Token integrity

- [ ] `BRAND.md` (or `DESIGN.md`), `tokens.css` and `tokens.json` agree on every value; one source
      generates the others.
- [ ] Every token is named by role, not by value; no `--blue-600` referenced from components.
- [ ] No hard-coded colours, font families or radii in component CSS or Tailwind classes that
      bypass the tokens (grep for `#` hex values and `font-family` outside the token file).
- [ ] Dark tokens exist for every light token that changes; `color-scheme` set.
- [ ] "Decisions and reasons" section present and current; "Undecided" list honest.

## 2. Colour

- [ ] One accent; any second colour has a named job written in BRAND.md.
- [ ] Neutrals are tinted toward the brand hue; no pure `#000` / `#fff` / reflexive `#111`.
- [ ] Accent owns its region or role; it is not scattered as dots on grey, and the primary action
      is the easiest thing to find.
- [ ] Semantic colours keep convention and are tinted into the palette; no meaning carried by
      colour alone.
- [ ] No AI-default cluster unless the brief asked for it (cream+serif+terracotta; black+neon glow;
      broadsheet hairlines; flat ink + hard shadows; purple-blue gradients; cyan on dark; gradient
      text; colour glows; radial spotlight).
- [ ] Secondary text on coloured surfaces derives from the surface or foreground hue, never flat grey.
- [ ] Roughly 60/30/10 on Restrained surfaces, or the committed strategy applied deliberately.

## 3. Typography

- [ ] Only the families in BRAND.md load; only the weights used are requested.
- [ ] Roles applied consistently across screens (same h2 everywhere); no arbitrary sizes.
- [ ] Body 16 px or larger on the web; nothing interactive under 11 px; body line height 1.5-1.7;
      prose measure 45-75 ch.
- [ ] Adjacent roles differ by at least 1.25x or by weight; hierarchy visible in a squint test.
- [ ] No all-caps body runs; caps labels short with +0.05 em tracking; no tracking on body.
- [ ] Display face not on the overused list without a written reason; no italic-serif hero or mono
      costume by default.
- [ ] Fallback stack metric-compatible; `font-display: swap`; no invisible text on load.
- [ ] Font licence recorded and sufficient for the surfaces (web pageviews, print, app embedding).

## 4. Logo

- [ ] Current version only; superseded files removed from shared folders.
- [ ] Correct variant for the context (horizontal in header, icon in tab, stacked in square avatar).
- [ ] Clear space held (height of the mark on all sides).
- [ ] At or above minimum size (full 120 px / 35 mm; icon 24 px / 10 mm).
- [ ] Correct colour version for the background; 3:1 between mark and background; plate behind
      photography.
- [ ] No stretching, rotation, effects, recolouring, cropping or re-set wordmark.
- [ ] Favicon set complete (`.ico` 16+32, SVG, Apple touch 180, manifest 192/512); OG image present.
- [ ] Not confusable with a known mark; search done and noted.

## 5. Imagery, icons, shape

- [ ] One icon style (stroke, grid, caps) throughout; icons use `currentColor`; titled or hidden
      from assistive tech appropriately.
- [ ] Photography follows the written direction (light, subjects, treatment); no stock clichés
      where the brief says real premises and people; no generated people standing in for staff.
- [ ] Illustration either in the committed style or absent; no shape-assembled SVG people, doodle
      outlines or grain blobs by default.
- [ ] Radius scale, border tint and the single shadow recipe applied; no colour glows; no cards
      nested in cards; no hairline-plus-wide-shadow "ghost cards".
- [ ] Images licensed or owned; credits where required; alt text meaningful.

## 6. Voice and messaging

- [ ] Copy passes the four tests (sounds like us; competitor could not say it; audience cares;
      consistent with last publication).
- [ ] No prohibited terms; no buzzword or cadence tells (see voice-and-messaging.md section 5).
- [ ] Same noun for the same thing across surfaces; CTAs name the action and keep the name through
      the flow.
- [ ] Errors state what failed and how to recover; success proportional; empty states give the next
      action.
- [ ] Key messages present on the main surfaces and consistent with the messaging summary; no
      invented proof, testimonials or numbers.
- [ ] Regulated-field wording respected (clinic, finance, legal cautions from BRAND.md).
- [ ] Storytelling sections pass the ego test (for the buyer, not the owner); no fake scarcity
      (resetting timers, invented "only 3 left"); no standing deep-discount banner that contradicts
      the brand's price position.

## 7. Accessibility

- [ ] Body text 4.5:1; large text 3:1; controls, icons, focus rings 3:1; both themes; hover, focus,
      disabled and text-on-image states checked.
- [ ] Visible focus indicator in the focus token colour on every interactive element.
- [ ] Colour-vision-deficiency simulation and greyscale pass for hierarchy and state.
- [ ] Reduced-motion path keeps meaning (including the mascot, if any).
- [ ] Headings in order; landmarks present; buttons are buttons; inputs labelled.
- [ ] Touch targets at least 44x44 px on touch surfaces.

## 8. Channel audit

| Channel | Check |
|---|---|
| Website | header/footer logo, favicon, OG image, 404 and error pages, forms, emails it sends |
| Web app | login, empty states, settings, invoices/PDF exports, notification emails, loading states |
| Email | header/footer, signature block, transactional templates, plain-text fallback |
| Social | avatar, cover, bio wording, post templates, link previews |
| Print and physical | business card, letterhead, signage, receipts, packaging, uniforms if any |
| Documents | proposals, slide master, contracts header, invoice template |
| Third-party surfaces | Google Business Profile, booking platforms, app stores, marketplaces |

## 9. Pre-publish asset approval

Quick gate for any new asset (banner, post, slide, PDF):

- [ ] Serves a stated purpose for a stated audience.
- [ ] Logo variant, clear space, size and colour version correct.
- [ ] Palette only; type roles only; imagery direction followed.
- [ ] Copy in voice; no prohibited terms; CTA clear; proofread.
- [ ] Contrast and alt text present; reduced motion for animated pieces.
- [ ] Correct dimensions and format for the platform; file named per convention; licence cleared.
- [ ] Legal: required disclosures, accurate prices, no misleading claims, privacy notices where
      data is collected (see dpdp-legal-compliance for Indian data rules).

## 10. Common issues and fixes

| Issue | Fix |
|---|---|
| Three near-identical accent values across the codebase | merge to one token; put the ramp underneath |
| Grey text on the accent button | derive from the accent hue or use the accent-text token |
| Logo recreated in a system font in an email | replace with PNG/SVG asset; add to misuse list |
| Headline face swapped on one page | enforce via the display token; remove inline font-family |
| Dark mode is a filter invert | design dark tokens per color-and-type.md section 7 |
| Generated copy full of "seamless" and "empower" | add to prohibited list; paste the voice chart into the generation prompt |
| Favicon blurry or missing | export the 512 master; generate the set; add manifest |
| Cream + serif + terracotta "because it looks premium" | run the category self-check; re-derive the accent from the product's own world |

## 11. Audit cadence

| Surface | Frequency |
|---|---|
| Website and app | every release, plus a monthly scan |
| Social profiles and templates | quarterly |
| Email templates and signatures | quarterly |
| Sales and print collateral | quarterly |
| Full brand audit against BRAND.md | yearly, or at any rebrand or new product line |

## 12. Report format

```
Brand consistency report: {brand} on {surfaces checked}, {date}
Tokens: in sync yes/no; hard-coded values found: {n} ({files})
Colour: {n} issues ({top two})
Type: {n} issues
Logo: {n} issues
Imagery/icons/shape: {n} issues
Voice: {n} issues; prohibited terms found: {list}
Accessibility: {n} contrast failures ({pairs}); focus visible yes/no; reduced motion yes/no
Blocking before ship: {list}
Nice to fix: {list}
```
