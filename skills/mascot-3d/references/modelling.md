# Modelling: SDF toolkit, parts, materials, lights and camera

How to build a geometric mascot as signed distance fields (SDFs) in three.js and turn the fields
into meshes. Every number below is a recommended range with the failure mode on either side;
the values that worked on a previous production mascot sit inside these ranges and are not
published individually. Code for everything in sections 2-4 and 6 is in
`assets/templates/sdf-toolkit.js` and `assets/templates/grain-material.js`. The templates target
three r170; check class and shader-chunk names against `threejs-skills` (r186) before use.

Contents

1. Units and the build budget
2. The SDF toolkit
3. Meshing: ray projection vs surface nets
4. Clean-up: winding, relax, project
5. The parts
6. Materials
7. Lighting and camera
8. Failure modes at a glance

---

## 1. Units and the build budget

Work in body units: half the body width = 1.0. Every radius, blend width and grid step is written
in these units, which keeps the numbers comparable across parts and across brands.

Meshing cost is set by grid resolution and grows with the cube of it: halving a step multiplies
the sample count, time and memory by eight. A previous production mascot's full build took about
2 s on a desktop, with the hands the largest share (about half), then the body, then the feet.
That is why the build must run in a worker (`references/integration.md`). Parts are optional
(SKILL.md, Parts catalogue): a mascot without hands or feet builds several times faster.

## 2. The SDF toolkit

Each part is a function `f(x, y, z)` returning the signed distance to its surface (negative
inside). Build parts from a handful of primitives combined with a smooth minimum.

**Smooth minimum (`smin`).** A quadratic polynomial blend that rounds the join between two fields.
`k` is the blend width in body units (`smin` in the toolkit).

| Join | k | Too small | Too large |
|---|---|---|---|
| Finger to neighbouring finger | 0.003-0.006 | A hard crease where fingers touch | From about 0.015: fingers fuse into a mitten |
| Palm to finger root, palm to wrist | 0.02-0.04 | A visible step at the root | Fingers shorten into the palm |
| Large part to large part (collar to upper, head to body) | 0.04-0.07 | Reads as two glued objects | The smaller part melts into a bump |

Fingers also fuse whenever the gap between them is under about one sample of the mesher's grid,
whatever `k` is: keep the centre-to-centre spacing comfortably above twice the finger radius.

**2D cross-section primitives.** A rounded rectangle in 2D, plus intersections that round off one
corner or cut it at 45 degrees, extruded with a rounded edge, gives slab-like body parts. Use one
corner radius for the whole outline; switching radius across a narrow band prints a diagonal
crease where a seam meets the outline. If two radii are unavoidable, blend over a wide band.

**Tapered capsule.** A capsule between two points with a different radius at each end (`capsule`
in the toolkit). Every digit and limb segment can be one. Variant with creases: narrow Gaussian
dents at named fractions along the capsule (knuckle lines), gated so they appear only on the palm
side (a smooth ramp on the local forward axis) and the back of the hand stays smooth. Depth about
0.005-0.01 and width about twice the depth read as creases; deeper than about a third of the
finger radius reads as a cut.

**Rounded box** (`roundBox`). For cuffs, soles and other slabs.

**Profile sweep.** For parts that are rotational but not round: sweep a spline side profile around
a superellipse cross-section (an exponent a little above 2 gives a soft-cornered oval). Produces a
mesh directly, with no field.

**One outline, many layers.** When several parts must agree (a shoe's upper, sole and welt; a
cap's crown and brim), derive them all from one 2D outline function, for example a small circle
smooth-min'd into a larger one. Then they cannot disagree, and a change to the outline moves every
layer.

## 3. Meshing: ray projection vs surface nets

Two extractors, each for a different kind of part.

**Ray projection ("sculpt", `meshRayProjection`).** Subdivide a box that encloses the part. For
each vertex, search along the ray from the part's centre through the vertex for the zero crossing
of the field (bisection, 20-30 steps) and move the vertex there. Normals come from central
differences of the field (step about 0.001).

- Strengths: cheap (cost grows with face area, not volume), clean quad topology, crisp bevels.
- Limit: **cannot represent overhangs**, because each vertex can only move along its own ray. A
  part that curls back (a shoe tongue, an ear) pleats.
- Resolution: below about 80 subdivisions across a large face (and about 24 through a shallow
  depth) the bevels read as faceted at hero size. About 48 x 48 x 14 is enough for a dock-only
  tier.

**Surface nets (`meshSurfaceNets`, or `meshSmooth` for the full chain).** Sample the field on a
regular grid; in every cell whose corners change sign, place one vertex at the mean of the edge
crossings; emit a quad across every grid edge that crosses the surface. Normals come from the
field gradient (step about a quarter to half the grid step).

- Strengths: handles overhangs and thin, concave forms (hands, shoes).
- Step: about 0.009-0.012 for a hand, about 0.01 for a shoe upper, 0.02-0.03 for a quick preview.
  A hand-sized box at 0.011 is roughly 0.5-0.7 million samples (about half a second in the
  toolkit on a desktop). Halving the step costs eight times as much.
- A feature thinner than about two steps (a finger gap, a sole edge) drops out or bridges.
- Weakness: a faint stair pattern and unreliable triangle winding (section 4).

| Part type | Extractor |
|---|---|
| Convex, box-like or blob body parts with bevels | Ray projection |
| Anything with overhangs, concavity or thin parts (hands, shoe upper, tongue, ears) | Surface nets |
| Rotational parts without a field | Profile sweep |
| Simple capsules, spheres, tori (legs, eyes, the accent object) | three.js built-in geometry |

## 4. Clean-up: winding, relax, project

After surface nets, always run three passes, in this order (`meshSmooth` chains them, then
re-checks winding once more).

**Winding fix (`fixWinding`).** For every triangle, compare its face normal with the field gradient
at its centroid and swap two indices when they disagree. Without this the mesh looks fine from the
front and has holes from some angles (a "torn hand"). Keep the grid step under half the thinnest
part, or a centroid on one side of a thin sheet reads the other side's gradient.

```js
// per triangle (a, b, c): make it face outward
const n = cross(sub(b, a), sub(c, a));
if (dot(n, gradient(sdf, centroid(a, b, c))) < 0) swapIndices(tri, 1, 2);
```

**Relax (`relax`).** Laplacian smoothing over each vertex's one-ring: 2-4 iterations at a factor of
0.4-0.6. It removes the stair pattern but shrinks the mesh off the surface. More iterations round
off intended edges; a factor near 1 oscillates.

**Project (`project`).** Newton steps back onto the zero level: move each vertex by minus the field
value along the gradient (3-5 iterations, gradient step about 0.001-0.002), then take normals from
the gradient. Always pair it with relax.

**Never relax ray-projected output.** Each box face carries its own copy of the edge vertices; a
Laplacian pass moves the copies apart and opens the face seams as visible lines.

## 5. The parts

Only the body is required; build the other parts only if they were chosen at step 2 (SKILL.md,
Parts catalogue). How to build each one:

- **Body (required).** One field per visible part (panels, a dome, a bun), each its own ray-projected mesh.
  Bake a contact shadow into vertex colours (`bakeContactShade`): for each vertex, the distance to
  the nearest *other* part's field, mapped through a smoothstep from about 0.7 at contact to 1.0 at
  about 0.1 units. Fill any visible gap between parts with a dark inner shape so you never see
  through the body.
- **Hands (optional, need arms).** One skinned mesh per hand, extracted once from an open rest pose. Skeleton: wrist,
  then each finger with a middle joint, and a thumb with a middle joint. Weights are part-based
  and come from the same fields (bind each vertex to the bone of the part whose field is nearest).
  Poses are bone rotations only, never re-meshing. Digit count is a brand parameter (SKILL.md,
  Proportions): three fingers plus a thumb is the starting point; four needs thinner fingers, a
  finer grid and a check at dock size.
- **Arms (optional).** Tubes along a cubic bezier from shoulder to wrist, rebuilt every frame from the pose
  channels, ending slightly inside the cuff (about 0.02 units) so no gap opens. Give the tube a
  stable grain-position attribute (`tubeGrainPositions` in the grain template) so the surface
  grain does not swim as the tube rebuilds. Parent the cuff to the forearm, not the wrist, or it
  tilts away from the arm; keep the wrist segment short or it swings out of the cuff during a wave.
- **Legs (optional).** Capsules on a hip pivot. Without legs the body rests on the ground or
  floats, and a hop is body jump plus squash.
- **Feet or shoes (optional, need legs).** An upper from surface nets and a sole as a slab of the
  same outline. Test every decoration at dock size before keeping it: small trims read as
  jewellery, a bump at the collar reads as a growth, a flare reads as a second part. Lettering
  under a sole costs effort and is rarely seen.
- **Eyes (usual).** Simple primitives (pills, discs) that squash for blinks, plus an arc shape for a
  smiling eye if the state list needs one. Decide whites and pupils from the mark, not by habit.
- **Accent object (optional).** Whatever the accent element maps to (a floating orb, a dot on an
  appendage, a spark, a lamp), with an optional ring or halo faded in by a channel. If present,
  the only emissive part; without one, nothing glows.
- **Appendages (optional).** Ears, a tail, antennae, a stalk: thin capsules or small surface-nets
  parts on a pivot, often carrying the signature channel. Include them in the no-overlap check if
  they can swing toward the body.
- **Props and marks.** Sprites with canvas textures, scaled up from almost zero when a state shows
  them, always outside the silhouette.

## 6. Materials

**Grain material** (`createGrainMaterial`). A physical material (sheen, high roughness, no
metalness, low environment intensity) with one Worley (cellular) noise pass injected into the
shader:

- Evaluate the noise in **object space** (the vertex position, or the stable grain attribute on
  rebuilt tubes) so the grain sticks to the surface. No UV unwrap is needed anywhere.
- Use the distance to the nearest and second-nearest cell points. The gap between them marks cell
  borders: darken the base colour there (the `crease` amount) and bend the normal by the analytic
  gradient of a height built from that gap, projected onto the tangent plane (the `bump` amount).
  Because the gradient is analytic there is no normal map.
- Parameters: `freq` (cells per unit), `bump` (normal strength per cell), `crease` (border
  darkening), `edge` (border width), plus sheen, sheen colour and roughness.

| Surface | freq | bump | crease | Failure modes |
|---|---|---|---|---|
| Large surfaces (body) | 35-50 | 0.02-0.035 | 0.05-0.08 (darker surfaces take more) | `bump` above about 0.04: grain turns into lumps visible in the silhouette's shading |
| Small parts (hands, gloves) | 100-150 | 0.012-0.02 | 0.03-0.06 | `freq` near 85 with `bump` near 0.03: golf-ball dimples at small sizes |
| Tiny parts (cuffs, trims) | 150+ or none | under 0.015 | low | Visible grain on a tiny part reads as noise |

Rule of thumb: raise `freq` as the part gets smaller on screen; keep `bump` well under 0.04.

Shader injection notes (WebGLRenderer): inject through `onBeforeCompile`; give each variant its own
`customProgramCacheKey` or three.js reuses the wrong program; declare custom uniforms and functions
right after the common chunk (declaring them elsewhere is a common compile failure); assert each
anchor occurs exactly once so a three.js chunk rename fails loudly. Under `WebGPURenderer` there
is no `onBeforeCompile`: rewrite the grain as a TSL node (see `threejs-skills`, shaders and
materials). In r186 `envMapIntensity` scales only the material's own `envMap`; use
`scene.environmentIntensity` or set `envMap` explicitly.

**Eyes.** Very glossy: low roughness, full clearcoat with a low clearcoat roughness, environment
intensity a little above 1. If an eye shader carries an emissive term, drive it from a channel or
remove it; a term multiplied by zero is dead code that confuses the next reader.

**Accent object.** High metalness, low roughness, strong environment intensity, emissive driven by
a glow channel.

## 7. Lighting and camera

A four-light rig plus a hemisphere and an environment. The ratios carry across brands; every
colour is re-tuned for the page the mascot sits on.

| Element | Role | Starting point |
|---|---|---|
| Hemisphere | Base fill | Intensity about 1.0-1.2; sky tinted toward the page, ground toward the floor |
| Key (directional) | Main light, casts shadows | Intensity about 2.0, high and front-left |
| Fill (directional) | Opens the shadow side | About a third of the key, front-right and lower |
| Rim (directional) | Separates the back edge | About 0.3 of the key, from behind and above |
| Bounce (directional) | Floor bounce under the chin and arms | About 0.35-0.4 of the key, from below and in front, tinted with the floor colour |
| Environment | Reflections on glossy parts | A prefiltered `RoomEnvironment` |
| Tone mapping | | Neutral tone mapping; exposure 1.0 on light pages, about 0.95 on dark |

Shadows: variance shadow maps (`VSMShadowMap`) with a 2048 map, a small negative bias and a normal
bias of about 0.02, a soft radius and an orthographic shadow frustum fitted tightly around the
character. The ground is a large plane with a shadow-only material (opacity about 0.1-0.2 on light
pages, 0.3-0.45 on dark) sunk a hair below zero so it never z-fights the feet. With VSM every mesh
that receives shadows also casts them. `PCFSoftShadowMap` is deprecated in r182+; check current
shadow types and light units in `threejs-skills` (lighting).

Camera: a narrow perspective (field of view about 28-35) from a slight three-quarter angle, a
little above the body's centre, looking at chest height. Stills pull the camera back so the whole
figure and its marks fit with margin. Match the angle to the concept sheet before judging any crop.

## 8. Failure modes at a glance

| Symptom | Cause | Fix |
|---|---|---|
| Holes visible from the side only | Winding not fixed after surface nets | `fixWinding` against the gradient |
| Thin lines along box-face edges | Relaxing ray-projected meshes | Relax surface-nets output only |
| Fingers fused into a mitten | Blend width too large, fingers too close, grid too coarse | Blend near 0.004; visible gap; finer step |
| Pleats or folds on an overhang | Ray projection on a part with overhangs | Switch that part to surface nets |
| Faceted bevels | Ray-projection grid too coarse | About 80 across a large face, 24 through depth |
| Stair pattern on hands or shoes | Raw surface nets | Relax, then project |
| Diagonal crease where seams meet the outline | Two corner radii switched over a narrow band | One radius, or a wide blend |
| Grain swims on moving arms | Grain from per-frame positions | Stable grain-position attribute |
| Grain reads as dimples or lumps | `freq` too low or `bump` too high for the part's size | Raise `freq`, keep `bump` under 0.04 |
| Cuff tilts away from the arm | Cuff parented to the wrist | Parent to the forearm |
| Layers of a shoe or cap disagree | Separate outlines per layer | Drive every layer from one outline |
| Mascot sinks into the page | Exact token colours | Lit variant (SKILL.md, Palette) |
| Start-up blocks the page | Build on the main thread | Worker plus OffscreenCanvas |
