# Film types: pick the case before the plan

The pipeline in this skill (beat sheet -> deterministic `render(t)` -> Playwright frames -> ffmpeg on the bar grid) is shared, but the four jobs below want different hooks, lengths, sources and QA. Decide the type in the brief and say it in `out/plan.md`; mixing them is the usual reason a film feels off ("a 90-second SaaS demo posted as a reel").

| | A. SaaS / software launch film | B. Physical product film | C. Social reel / short | D. Motion-graphics ad (breakdown deliverable) |
|---|---|---|---|---|
| Typical job | Launch page hero film, Product Hunt video, feature demo for a hospital or clinic system | A granite yard, a clinic's premises, a device, a pack | Founder clip, tip reel, before/after, "we shipped X" | Brand ad built from type, shapes and UI stills; client wants to see how it was made |
| Length and ratio | 45-90 s, 16:9 master, 9:16 cut | 20-45 s, 16:9 and 9:16, 1:1 for catalogue | 7-30 s, 9:16 only, square optional | 15-30 s, 16:9 master |
| Hook (first 1-2 s) | The result on screen, not the logo | The material or place in motion (water on stone, the saw) | A spoken or on-screen claim in the first second; no intro | Type or shape move on the downbeat |
| Source material | Seeded demo tenant captured with `capture_demo.py`; screenshots; no real patient data | Real photos and phone video of the real place/product; never generated people or premises | Phone footage, screen recordings, text cards | Vector, type, UI stills; stock footage only with a licence record |
| Voice and captions | Optional VO at -14 LUFS; captions for every spoken line | Usually music + on-screen text; VO optional | Burned-in captions always (most watch muted); 3-4 words per cue, under 20 characters per line, 0.5-5 s per cue | Rarely VO |
| Music | Licensed or generated bed, bar grid known | Same | Platform library audio only if the account is a business account and the licence allows; otherwise licensed bed | Same as A |
| Must show | Real UI doing the real job; the before/after in numbers | The thing as a buyer would see it; scale (a hand, a tile) | One idea; the payoff before the 3-second mark | The draft -> final relationship if the client asked for a breakdown |
| QA extras | `vo_action_drift`, text >= 26 px after zoom, privacy stand-ins | Colour fidelity of the product; no AI-generated stand-ins | Safe zones: keep text out of the bottom ~20% and right ~15% (platform UI); first frame readable as a still | `cut_drift` on the encoded file; breakdown contact sheet |
| Deliverables | master, vertical cut, posters, share copy | master, square, vertical, 3 stills | 9:16 MP4 under 60 s, cover frame, caption text | master + `*-breakdown.mp4` + draft/final contact sheet |

## Rules that differ by type
- **A (SaaS):** lock the promise (motion-led UI film) in the plan; if a render path fails, stop and ask, never fall back to a slideshow of stills. Zoom by UI element (`motion-and-sound.md` §3) and at most two attention cues at once (§4).
- **B (Physical product):** the camera work is in the footage, not in `render(t)`; the HTML layer adds type, cuts and colour, and must not "improve" the product's colour. Real premises only; this is the rule from web-design (no generated people or places for clinics and local businesses).
- **C (Social reel):** the beat sheet is 3-6 beats, one idea per reel; the caption text is written first (it is the script); a reel made from a launch film is a **re-cut** (`render-pipeline.md` §9 and §11), not a resize. Hashtags and trending-audio tactics belong to the account owner; the skill supplies the file, the cover frame and the caption text.
- **D (Motion-graphics ad):** build the greyscale draft pass first (`SKILL.md` step 2b), get the drafts approved, then the final; deliver the breakdown cut (`render-pipeline.md` §11) when the client wants to see the process.

## Reference films from the client ("make it like this")
Analyse before planning: content, pacing (cuts per 10 s), structure (how many sections, where the turn is), style, and the two or three things that make it work. Record which references are excluded and why (live action we cannot shoot, a budget we do not have). Offer two or three distinct angles for the client's own film; never a shot-for-shot copy, and never ship a frame of the reference. (Method observed in NullMotion, MIT, and OpenMontage, AGPL-3.0, not copied.)

## When to split further
If one of these types starts carrying its own references, tools and QA (for example a steady stream of social reels with their own caption and cover-frame tooling), move it into its own skill and leave a one-line hand-off here. Until then this table is the routing.
