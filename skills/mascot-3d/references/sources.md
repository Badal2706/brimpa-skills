# Sources, privacy boundary, licence and owner decisions

This skill is released under MIT as part of the brimpa-skills collection. It describes a method in
its own words and ships generic templates written fresh for this skill.

## Privacy boundary

The method was proven on Brimpa's own mascot, which stays private. By the owner's instruction
(Oct 2026) this skill publishes the logic only: the derivation procedure, generic rules, parameter
ranges with failure modes, the pipeline, QA and pitfalls. It does not publish that character's
identity or anything that would let someone rebuild it: no shapes, palette, proportions, limb
sizes, state list, page-contract names, function names, code, configuration, renders or
draft history. Lessons from that build are phrased as "a previous production mascot found...".
The worked example in SKILL.md and the placeholder character in `assets/templates/preview.html`
are invented (a fictional bakery) and do not describe it.

## Sources

| Source | Location | Licence | What was taken |
|---|---|---|---|
| Brimpa's internal method notes for its mascot (Oct 2026) and the owner's answers to the open questions (26 Oct 2026) | Private, not published | Brimpa internal; summarised and generalised, not reproduced | The derivation procedure, identity rules, SDF toolkit concepts and parameter ranges, grain material ranges, light and camera rig ratios, channel and state schema, per-frame model, the five must-have states, mirroring, page contract structure, worker mount, float and dock ranges, accessibility and fallbacks, extractor and stills pipeline, bundle and Lighthouse figures, the 15-step procedure, QA checklist, pitfalls, and the owner decisions below |
| img2threejs (version 2.0.0, SKILL.md and README) | https://github.com/img2threejs/img2threejs | Apache-2.0 | Routing only: what it is for (reconstructing an object from one reference image as code), pointers to its comparison-sheet script, turntable gate and left/right reflection rule. No text or code reproduced |
| threejs-skills (CloudAI-X, targets three.js r186) | https://github.com/CloudAI-X/threejs-skills | MIT | Routing, plus the r160 to r186 API notes the templates cite (`Clock` to `Timer`, `RGBELoader` to `HDRLoader`, `PCFSoftShadowMap` deprecated, `envMapIntensity` vs `scene.environmentIntensity`, `onBeforeCompile` only under WebGLRenderer, the pinned import map) |
| gsap-skills (GreenSock, skill list) | https://github.com/greensock/gsap-skills | MIT | Routing only: which GSAP skills to hand off to (ScrollTrigger, core). The Draggable-on-fixed-layer pitfall comes from the private method notes, not from gsap-skills |
| "Make Your Own Animated Mascot" guide, covering Avatar Lab (Bible Strong Avatar Lab by Stéphane Montlouis-Calixte) | studio https://avatars.bible-strong.app ; source https://github.com/smontlouis/bible-strong-avatar-lab | Guide: personal copy, summarised in brand-identity; Avatar Lab: **AGPL-3.0** | Only the out-of-scope pointer: a 2D studio mascot is a different job, covered (with its AGPL caution) in `brand-identity` (`references/mascot.md`) |
| brand-identity skill, `references/mascot.md` (this collection) | `skills/brand-identity/` | MIT | Placement and trigger conventions shared with the 2D route; the quick 2D job this skill hands off |

Figures that age: bundle sizes and Lighthouse scores (three r170 build, Oct 2026), three.js API
names (re-check against threejs-skills), the Avatar Lab licence, ChatGPT image generation
behaviour. Re-verify every few months.

## Templates

`assets/templates/` (sdf-toolkit.js, grain-material.js, mascot-runtime.js, mount-worker.js,
preview.html) are original code written for this skill from the algorithms documented in the
references (version 1.1, Oct 2026). No code was copied from the private implementation. They are
MIT like the rest of the collection. Checked with `node --check`; the toolkit and runtime were
exercised in Node with body-only, body-and-eyes, body-eyes-appendage and full part sets, and the
preview was rendered headless (Chrome, SwiftShader, three r170) with all parts, body and eyes
with an accent object, and body only.

## Owner decisions encoded in version 1.1 (26 Oct 2026)

1. **Privacy:** the reference character stays private; publish the logic, never the identity.
2. **Concept sheets:** made with ChatGPT image generation; the original prompts were not saved, so
   `references/concept-sheets.md` gives fresh templates and tactics.
3. **Palette:** the mascot renders a lit variant of the brand tokens, deliberately warmer and
   lighter, because a mascot in the exact token colours is hard to separate from a background
   built on them. Record the offset and reason in BRAND.md.
4. **Proportions:** body tuned live with preview sliders and then locked; hands and feet measured
   off the sheets.
5. **Attention nudge:** a time-based nudge (about 9 s without input, at most once per about 22 s)
   is the owner's default, documented with its "never nags" trade-off, the limits it must ship
   with, and the action-based alternative.
6. **Fingers:** a per-brand parameter; three fingers plus a thumb is the starting point; four is
   supported with the fusing caveat.
7. **Phone performance:** not measured yet; `references/pipeline-and-qa.md` section 6 gives the
   step-by-step procedure and a results table.
8. **three.js only:** every mascot is built procedurally in three.js, so one pipeline improves over
   time. Rive, artist-made GLTF and 2D studio mascots are out of scope (a 2D studio mascot is the
   quick route in brand-identity). Stills remain, as the fallback and performance tier of the
   three.js mascot, not as an alternative route.
9. **Parts are optional modules:** only the body is required; eyes are usual; arms, hands, legs,
   feet, an accent object, appendages and props are chosen at step 2 and recorded in MASCOT.md.
   Channels are built from the chosen parts, every must-have state has fallbacks for absent parts,
   and the no-overlap check runs only on parts that exist.

Still open: real-phone numbers for any production mascot.
