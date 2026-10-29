# Prompt mode for other builders

Use this when the owner wants a prompt to paste into Lovable, Bolt, v0, Framer AI or a similar builder instead of code from us. The prompt is the deliverable, and it carries the same decisions a build would: the brief reading, the direction, the token plan, the section blueprint and the copy (steps 1-7 of the workflow) all still run. What changes is the hand-off: the builder writes the code, so everything it would otherwise default to must be stated. Builders default hard (shadcn cards, Inter, gradients, glass, emoji icons, invented images and copy), and they fill every gap with their default.

Structure adapted from the "prompts for other builders" reference in Motionsites-AI/claude-skill (MIT parts), rewritten to the house rules. Tool defaults below are dated Oct 2026; check the tool's current docs before relying on one.

## Contents

1. Order of the prompt
2. Stack line per tool
3. Assets: exact URLs the owner controls
4. Direction and token plan, condensed
5. Sections, copy and motion
6. Pre-flight the builder must pass
7. Constraints last: "Do not..." lines
8. After the builder runs
9. Template

## 1. Order of the prompt

Imperative, exact, ordered; numbers, never adjectives.

1. Stack line (first line, so the builder sets up the right project).
2. Brief in three lines: what this is, for whom, the one action; the idea sentence; the live thing.
3. Direction, condensed (§4).
4. Token block as CSS custom properties.
5. Assets with exact URLs (§3).
6. Sections in order, each with its exact copy, layout and states (§5).
7. Motion: the one moment with values, and the reduced-motion state.
8. Responsive rules at 390, 768 and 1440.
9. Pre-flight checks the result must pass (§6).
10. "Do not..." lines, last (§7). Builders weight what comes last.

Do not trim values to save length; a precise prompt for a whole page is long, and every value left out is a default put in.

## 2. Stack line per tool

| Tool | Open with | Notes |
|---|---|---|
| Lovable | "React + Vite + TypeScript + Tailwind CSS + shadcn/ui; motion with CSS or Framer Motion; icons from one set (lucide-react)." | Its usual output stack (Lovable guides, Oct 2026). Put the tokens as CSS variables in the global stylesheet. Ask for the hero and the next two sections first on a long page, then continue. |
| Bolt | "Vite + React + TypeScript + Tailwind CSS, single page, no backend." | Bolt can scaffold several frameworks, so name one. Keep sections numbered in the prompt (numbering in the prompt, not on the page) and the tokens in one block. |
| v0 | "Next.js App Router + React + TypeScript + Tailwind CSS + shadcn/ui." | v0's documented default stack (v0 docs, Oct 2026). Its docs say it is trained on default shadcn/ui components and may struggle with heavy customisation, so state every override (radius, shadow, borders, fonts) explicitly. It is conservative with motion: spell the one moment out in full. |
| Framer AI | "Framer site: native stacks with desktop, tablet and phone breakpoints (checked at 1440, 768 and 390), text styles and colour styles from the tokens below; a code component only for the live thing." | Framer's help docs (Oct 2026) advise generating one section at a time and being specific about headline, text and button style; a reference image can be attached. Send the token and asset blocks once, then one prompt per section. |
| Cursor, Claude Code and other coding agents | The owner's existing stack, or "a single index.html, inline CSS and JS, no build step". | They follow long prompts; include the file layout. Usually better: run this skill directly instead of prompt mode. |
| Other agentic builders | "A single standalone index.html, inline CSS and JS, no build step." | One self-contained file with every asset URL spelled out works most reliably. |

## 3. Assets: exact URLs the owner controls

- Paste every asset URL in full, each with its job: what it shows, where it sits, the crop (`object-fit`, `object-position` per breakpoint), the alt text, and for video the poster URL, attributes (`muted playsinline loop`, pause control) and fallback. A vague asset line is an invitation to invent one.
- Only URLs the owner controls: the client's own site, bucket or CDN, or the builder's own asset upload. Open-collection pictures are downloaded, re-hosted by the owner and credited (credit line included in the footer copy). Never hotlink third-party files, and never use media from a prompt library or template shelf.
- Before sending, request each URL once and confirm it returns the file (status 200, the right type). A dead URL in the prompt becomes a broken image or a substitute picture.
- No asset for a slot: say so and give the stand-in exactly (a caption-led slot naming the shot to take, or type and colour alone), per the house rules for photo placeholders. Never "add a relevant image".
- Fonts: the exact family names, weights and the loading URL (Google Fonts link, Fontshare link or self-hosted files).

## 4. Direction and token plan, condensed

Keep the reasoning out; send the decisions.
- Direction: name it and give the direction contract in six short lines (thesis, own-world, story, first viewport, form, finish), with the first viewport described exactly: what sits where, at what scale, where the action is.
- Token block, verbatim CSS: ground, surface, ink, muted, accent, accent-ink (and fields if used), each with its role and proportion as a comment; type faces, the size scale with `clamp()` values, line heights and tracking; spacing base, margins and section gap; radius and shadow policy ("radius 0 on everything", "no shadows at rest"); motion tokens (§3 of `references/motion.md`).
- The crafted artefact: what real-world object it rebuilds, its exact content, where it sits.
- The live thing: what it does, its inputs and outputs, its states.

## 5. Sections, copy and motion

- One block per section, in the blueprint's order: heading (exact text), layout (grid in numbers), content (every item, every price, every hour), states, and what it must not be ("not three cards").
- Exact copy everywhere: h1 with its line break marked, the supporting sentence, button labels and their destinations (`https://wa.me/<number>?text=<encoded message>`, `tel:`, the booking URL), nav labels, footer. Left alone, builders write "Get started" and lorem.
- Sample details the brief lacks are written in, each followed by the visible tag "[sample: confirm]".
- Motion: the one orchestrated moment with trigger, delay, duration, easing and from/to values; entrances once; "everything else does not move". Reduced motion: "under `prefers-reduced-motion: reduce` every element is in its final state".
- Responsive: per section, what changes at 390 and 768 (re-crops, re-authored headline breaks, in-flow media).

## 6. Pre-flight the builder must pass

State these as acceptance checks the result must pass before it is called done, worded so the builder can test them:
- Every headline two lines or fewer at 1440, 768 and 390; body 16px or more; contrast 4.5:1 for body text and 3:1 for large text and controls, including text over images and video.
- No horizontal scroll at any width from 320 to 1440 (`document.documentElement.scrollWidth` equals `clientWidth`).
- Touch targets 44x44 CSS px or larger; visible focus on every control; one `h1`; landmarks; labelled form fields.
- The specified fonts actually load (no system fallback in the h1).
- The first frame (about 0.35 s after load) already shows the ground colour, headline, sentence and action; no preloader, no blank reveal.
- Video: muted, inline, poster first, a pause button, paused off-screen, no video under reduced motion.
- No console errors and no failed requests; every link goes to its real destination.
- Content works without JavaScript where the stack allows (static export or server rendering).

## 7. Constraints last: "Do not..." lines

End the prompt with plain "Do not..." lines. Always include the house rules the builder's defaults break, then add the brief's own. Drop a line only when the chosen direction or the brand requires that device (Glass / Spatial's one glass control, Neo-Brutalist Pop's offset shadow, a brand's own gradient logo), and say so in the report:

```
Do not add sections, cards, badges, chips or labels that are not listed above.
Do not put a small label, eyebrow or pill above any heading.
Do not number sections (01/02/03).
Do not use gradients (backgrounds, buttons or text), glows, glass panels or blurred backdrops; the only gradient allowed is the neutral scrim under text on the hero picture.
Do not add shadows to anything at rest, hairline borders around boxes, or decorative grid lines.
Do not use Inter, Roboto, Geist or any font not named above.
Do not style one word of a headline differently (no italic or coloured accent words).
Do not use emoji or Unicode glyphs as icons; use one icon set, only where listed.
Do not add placeholder or stock images, or any image or video URL not listed above.
Do not invent testimonials, logos, ratings, user counts or numbers.
Do not add marquees, custom cursors, preloaders, counters, scramble or typewriter text, grain overlays or parallax.
Do not animate anything except the motion listed above.
Do not change the copy.
```

## 8. After the builder runs

- Get the preview URL and run the pre-flight on it like any build: screenshots at 1440, 768 and 390, the first-paint frame and the QA probes (`references/preflight.md` §13), the AI-tell sweep.
- Send fixes one per message, each with exact values ("make the h1 clamp(48px, 6vw, 88px) with -0.03em tracking"), not a long list; builders handle one focused change better than ten.
- Report as usual, adding: which builder, the prompt as sent, the fixes sent, and every check not run.

## 9. Template

```
Stack: <stack line from §2>

Build <a single landing page | the hero and the next two sections> for <client>, <what it is>, for <audience>, who must <one action>.
Idea: on this page, <subject thing> becomes <device>. Live thing: <what the visitor can do>.

Direction: <name>.
- Thesis: <one idea; the category default it refuses>
- Own-world: <palette and component language; the crafted artefact>
- Story: <understand, believe, do>
- First viewport: <exactly what is where, at what scale; where the action sits>
- Form: <grid, type system, surfaces>
- Finish: <states, the one motion moment, the close>

Tokens (use exactly):
:root { --ground: #...; --surface: #...; --ink: #...; --muted: #...; --accent: #...; --accent-ink: #...;
        --font-display: "<face>", <fallback>; --font-text: "<face>", <fallback>;
        --step-display: clamp(...); --step-head: clamp(...); --step-body: 1.0625rem;
        --space: 4px; --margin: clamp(16px, 4vw, 32px); --section-gap: clamp(72px, 12vw, 160px);
        --radius: 0; --ease-out: cubic-bezier(0.22, 1, 0.36, 1); }
Fonts: <exact loading URL and weights>.

Assets:
- hero: <URL> - <what it shows>; object-fit cover; object-position <phone> / <desktop>; alt "<text>"
- <slot>: <URL> - ...
(no other images or videos)

Sections, in order:
1. Hero - h1 "<line 1 / line 2>"; sentence "<text>"; button "<label>" -> <destination>. Layout: <numbers>.
2. <Heading> - <layout>; content: <every item>.
...
Footer - <close>; NAP: <exact>; credits: <lines>.

Motion: <the one moment: element, trigger, delay, duration, easing, from -> to>. Entrances play once. Nothing else moves.
Reduced motion: every element in its final state; no video.
Responsive: <per section at 390 and 768>.

Acceptance checks (all must pass):
<the list from §6>

<the "Do not..." lines from §7, plus the brief's own>
```
