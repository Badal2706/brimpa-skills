# Concept sheets with ChatGPT image generation

How to produce the concept sheets that gate modelling (turnaround and expression sheet always; the
hand sheet only if the mascot has hands; the foot sheet only if it has feet), with ChatGPT's image generation (the
tool a previous production mascot's sheets were made with; its exact prompts were not kept, so
the templates below are written fresh). The same prompts work, with small changes, in other image
generators. Every `{...}` is a brand placeholder: fill all of them before sending, and never leave
one in a prompt.

Contents

1. Before the first prompt
2. Consistency tactics
3. Prompt templates (turnaround, hand, foot or shoe, expression)
4. Iterating
5. Measuring numbers off the sheets
6. Checklist before the approval gate

---

## 1. Before the first prompt

Have these ready (they come from SKILL.md steps 1-2 and the brand's BRAND.md):

| Placeholder | What to put in | Example (the fictional bakery from SKILL.md) |
|---|---|---|
| `{brand}` | Brand name or a neutral codename | "a small neighbourhood bakery" |
| `{character}` | The mascot's working name | "Bun" |
| `{personality}` | One line from the voice traits | "warm, unhurried, quietly proud of its work" |
| `{mapping}` | Mark element -> role, one per line | circle -> round body; wheat stalk -> stalk on the head; dot -> glowing tip of the stalk |
| `{signature}` | The rotation or rhythm rule and its value | "the stalk leans 15 degrees at full value" |
| `{face}` | "eyes only" or "eyes and a mouth" | "eyes only, two simple vertical pills" |
| `{palette}` | Hex values with their roles | body {#d4a373}, ink {#3b2a20}, accent {#e85d3a} (glowing tip only) |
| `{material}` | Surface description | "matte, fine pebbled grain like soft leather; only the tip glows" |
| `{parts}` | The parts chosen at step 2 (SKILL.md, Parts catalogue), and the ones left out | "body, eyes, a stalk on the head, a glowing tip; no arms, no legs" |
| `{digits}` | Only if hands: "three fingers and a thumb" or "four fingers and a thumb" | (none: no hands) |
| `{footwear}` | Only if feet: "rounded feet" or a short shoe description | (none: no legs) |
| `{proportions}` | Rough intent, not numbers yet | "body about two thirds of total height, short legs" |

Use the lit variant of the palette for the sheets too (SKILL.md, Palette), so the sheets look like
the final render on the real page.

## 2. Consistency tactics

Image generators drift between images. These keep every sheet describing one character:

- **One chat thread for the whole set.** Start a new thread only to escape a bad direction, and
  then re-upload the references.
- **Upload references with every prompt after the first:** the logo (SVG exported to PNG on a
  plain background) always; once approved, the turnaround as well. Say what each upload is for:
  "Image 1 is the brand logo (shape vocabulary only). Image 2 is the approved turnaround: match it
  exactly."
- **Neutral grey background** (about #dcdcdc to #e6e6e6), no scene, no props that are not listed,
  no text other than panel labels and the grid.
- **Orthographic views**, stated in every prompt: "orthographic, no perspective distortion, camera
  at mid-body height". Perspective makes measuring unreliable.
- **Labelled panels** in a fixed order, the same character size in every panel, one ground line.
- **Same lighting** in every prompt: "soft, even studio light from front-left, very soft shadow".
- **A measurement grid**: "a light grid behind the character with lines every {1/10 of the body
  width}, and a vertical height scale on the left". It is what makes the sheets measurable.
- **Keep a running "character bible"** of the exact sentences that describe the character, and
  paste the same block into every prompt, unchanged. Changing a word changes the character.

## 3. Prompt templates

Paste the character bible first, then the sheet-specific part.

**Character bible (reused in every prompt):**

```text
Character: {character}, the mascot for {brand}. Personality: {personality}.
Built from the brand mark's shapes: {mapping}. Signature: {signature}.
Parts: {parts}. Draw only these parts; do not add arms, legs, hands, feet or a glowing object
that are not listed. Face: {face}. Hands (if listed): {digits}, rounded, no nails.
Feet (if listed): {footwear}.
Proportions: {proportions}. Colours, use only these: {palette}.
Surface: {material}. Only the accent part glows; everything else is matte.
Never: a mouth unless stated, text or logos on the body, a second glowing part, extra accessories,
blended expressions, limbs overlapping the body.
```

**Sheet 1: body turnaround.**

```text
[character bible]
Make a character turnaround sheet, landscape 16:9, for 3D modelling reference.
Four panels left to right, labelled FRONT, THREE-QUARTER, SIDE, BACK. Same character, same scale,
standing on one shared ground line, neutral relaxed pose, limbs (if any) slightly away from the
body so the silhouette is clear.
Orthographic views, no perspective distortion, camera at mid-body height.
Plain neutral grey background (#e0e0e0), soft even studio light from front-left, very soft shadow.
A light measurement grid behind the character with lines every 1/10 of the body width, and a
height scale on the left edge.
Clean, simple 3D-render style. No scene, no text other than the panel labels.
Image 1 is the brand logo: use its shapes as described, do not copy it as a flat graphic.
```

**Sheet 2: hand sheet** (only if the mascot has hands).

```text
[character bible]
Image 1 is the brand logo. Image 2 is the approved turnaround: match the hand style, colour and
size relative to the body exactly.
Make a hand reference sheet, landscape 16:9, for 3D modelling. Right hand only.
Panels in two rows, each labelled: PALM, BACK, SIDE (thumb side), FIST, POINT, OPEN WAVE,
RELAXED, THUMB UP.
In the PALM panel add dimension lines with labels: finger length, finger width, the gap between
fingers, palm width, palm height, thumb root position, wrist width, cuff height (if any).
{digits}. Fingers clearly separated with a visible gap, rounded tips, simple shapes, no nails,
no wrinkles except optional soft knuckle creases on the palm side.
Orthographic views, plain neutral grey background (#e0e0e0), same soft studio light, a light grid
behind each hand with lines every 1/10 of the palm width.
```

**Sheet 3: foot or shoe sheet** (only if the mascot has feet).

```text
[character bible]
Image 1 is the brand logo. Image 2 is the approved turnaround: match the foot style, colour and
size relative to the body exactly.
Make a foot reference sheet, landscape 16:9, for 3D modelling. Right foot only.
Panels labelled SIDE (outer), FRONT, BACK, SOLE (from below), and one DETAIL panel of the
{toe | collar | sole edge}.
Add dimension lines with labels: length, toe width, heel width, sole thickness, height at the
collar or ankle, toe spring (how far the toe lifts).
Every part follows one outline seen from above; no decorations unless listed here: {decorations
or "none"}.
Orthographic views, plain neutral grey background (#e0e0e0), same soft studio light, a light grid
with lines every 1/10 of the foot length.
```

**Sheet 4: expression sheet.**

```text
[character bible]
Image 1 is the brand logo. Image 2 is the approved turnaround: match the character exactly.
Make an expression sheet, landscape 16:9. Five panels in one row, same scale, same three-quarter
camera, each labelled with the state name and its trigger in small text underneath:
IDLE (default), WAVE (first visit), HAPPY (hover on the main button), SUCCESS (form sent),
ERROR (send failed).
One expression per panel, never blended. Act only with the parts listed ({parts}): eyes, body
tilt, squash and hop, arms if listed, and the {signature} channel; not with a mouth ({face}).
Without arms, WAVE is a tilt toward the viewer with a small hop.
Marks such as a tick or a question mark float OUTSIDE the silhouette, never drawn on the body.
The accent part may glow brighter in HAPPY and SUCCESS and dimmer in ERROR.
No limb overlaps or passes through the body.
Plain neutral grey background (#e0e0e0), same soft studio light, one shared ground line.
```

Optional states (thinking, explaining, confused, sleeping) go on a second expression sheet after
`idle` and `wave` are approved in 3D.

## 4. Iterating

- **Turnaround first, alone.** Do not generate the other sheets until the owner approves a
  turnaround; it is the reference every later prompt uploads.
- **Generate three or four variants** of the turnaround, pick one with the owner, then iterate on
  that one only.
- **Change one thing per round**, with a named part and a number: "Make the body 10% wider in all
  four views; keep everything else identical." Vague requests ("make it cuter") restart the design.
- **Ask for corrections on the same image** ("Edit the previous image: ...") rather than a new
  generation when only one part is wrong.
- **When views disagree** (a common failure: the side view is deeper than the three-quarter view
  implies), regenerate only the panel that is wrong, uploading the sheet and naming the panel.
- **When the tool drifts** (new colours, extra accessories, a mouth appears), paste the character
  bible again unchanged and list what to remove; if two rounds do not fix it, start a fresh thread
  with the logo and the last good sheet uploaded.
- **Budget** about three to eight rounds for the turnaround, fewer for the others once it is fixed.
  Save every accepted image with a version number and the prompt that produced it in the draft log,
  so the set can be regenerated later.

## 5. Measuring numbers off the sheets

What to measure where: hands and feet are measured off their sheets. The body is tuned live with
preview sliders and then locked (SKILL.md, Proportions), because generators drift body depth and
height between views; use the turnaround as the guide for the slider session, not as a ruler.

1. Open the sheet in an image editor that shows pixel coordinates (or a browser with a simple
   measuring overlay).
2. Pick one reference dimension per sheet: body width on the turnaround, palm width on the hand
   sheet, foot length on the foot sheet. Measure it in pixels in the most orthographic panel.
3. Convert to body units: half the body width = 1.0. For the hand and foot sheets, first find the
   palm width or foot length in body units from the turnaround (measure the hand or foot there
   against the body width), then scale everything on the detail sheet by that ratio.
4. Measure every other length in pixels and divide. Use the grid as a cross-check: if a number
   disagrees with the grid by more than about 5%, the panel is distorted; measure on another panel.
5. Measure only near the centre line of each panel; edges distort more.
6. Record each number in the plan with the sheet, panel and version it came from:
   `finger length 0.21 (hand v3, PALM panel)`.
7. When two sheets disagree, ask the owner which wins; do not average.

## 6. Checklist before the approval gate

- [ ] Every placeholder filled; no `{...}` left in any prompt or sheet.
- [ ] All four views of the turnaround show the same character at one scale on one ground line.
- [ ] Only palette colours appear; only the accent part glows.
- [ ] No mouth (unless the mark has one), no text or logos on the body, no extra accessories.
- [ ] Only the chosen parts appear on every sheet; nothing added by the generator.
- [ ] Hand sheet (if hands) shows the chosen digit count with visible gaps and labelled dimensions.
- [ ] Foot or shoe sheet (if any) has side, front, sole and one detail view, with dimensions.
- [ ] Expression sheet has the five musts, one expression each, marks outside the silhouette, no
      limb through the body.
- [ ] Prompts and accepted images saved with version numbers.
- [ ] Owner approval written down with the date (SKILL.md, step 4).
