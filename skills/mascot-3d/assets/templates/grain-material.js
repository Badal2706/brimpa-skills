/**
 * grain-material.js - a matte, pebbled "leather" material for a procedural mascot.
 *
 * Part of the mascot-3d skill (brimpa-skills, MIT). Written fresh from references/modelling.md
 * (section 6); it contains no character data.
 *
 * What it does
 * - MeshPhysicalMaterial (sheen, high roughness, no metalness) plus one Worley (cellular) noise
 *   pass injected with onBeforeCompile.
 * - The noise is evaluated in OBJECT space (the vertex position, or a stable `grainPos` attribute
 *   on geometry that is rebuilt every frame), so the grain sticks to the surface and no UV unwrap
 *   is needed.
 * - e = F2 - F1 (second-nearest minus nearest cell distance) is near 0 on cell borders. Borders
 *   darken the base colour (`crease`), and the normal is bent by the analytic gradient of a
 *   height built from e (`bump`), projected onto the tangent plane. No normal map, no texture.
 *
 * Parameters and failure modes (body units: half the body width = 1.0)
 *   freq   cells per unit. Large surfaces about 35-50; hands and other small parts about 100-150;
 *          tiny parts (cuffs, trims) 150+ or no grain. Too LOW for the part's on-screen size reads
 *          as golf-ball dimples.
 *   bump   normal strength per cell, independent of freq. About 0.02-0.035 on large surfaces,
 *          under 0.02 on small parts. Above about 0.04 the grain turns into lumps that show in
 *          the silhouette's shading.
 *   crease border darkening, 0.04-0.1 (darker surfaces take slightly more).
 *   edge   border width in noise units (0.15-0.3). Narrower reads as cracks, wider as soft hills.
 *   sheen, sheenColor, sheenRoughness, roughness: the leather look. Keep metalness at 0.
 *
 * three.js versions
 * - Written for WebGLRenderer, three r170+. onBeforeCompile and customProgramCacheKey still work
 *   in r186 under WebGLRenderer.
 * - WebGPURenderer has no onBeforeCompile: port the grain to a TSL node (colorNode + normalNode)
 *   using the same maths; see threejs-skills (shaders, materials).
 * - r186 (per threejs-skills): material.envMapIntensity scales only the material's own envMap,
 *   not scene.environment. Either set material.envMap explicitly or use scene.environmentIntensity.
 *
 * Usage
 *   import * as THREE from 'three';
 *   import { createGrainMaterial, tubeGrainPositions } from './grain-material.js';
 *   const mat = createGrainMaterial(THREE, { color: '#e9e2d6', freq: 44, bump: 0.03 });
 *   mat.userData.grain.grainFreq.value = 60;          // live tuning from a preview slider
 */

const GRAIN_COMMON_VERT = /* glsl */ `
#ifdef GRAIN_ATTR
attribute vec3 grainPos;
#endif
varying vec3 vGrainP;
varying vec3 vGrainAx;
varying vec3 vGrainAy;
varying vec3 vGrainAz;
`;

const GRAIN_BEGIN_VERT = /* glsl */ `
#ifdef GRAIN_ATTR
  vGrainP = grainPos;
#else
  vGrainP = position;
#endif
  // Object axes in view space, so the fragment stage can turn an object-space gradient into a
  // view-space normal offset (normalMatrix is not available in the fragment shader).
  // Skinned and instanced meshes: these axes ignore bone and instance rotation; acceptable for
  // fine grain, but bake grainPos in bind pose so the pattern does not swim.
  vGrainAx = normalMatrix * vec3(1.0, 0.0, 0.0);
  vGrainAy = normalMatrix * vec3(0.0, 1.0, 0.0);
  vGrainAz = normalMatrix * vec3(0.0, 0.0, 1.0);
`;

const GRAIN_COMMON_FRAG = /* glsl */ `
uniform float grainFreq;
uniform float grainBump;
uniform float grainCrease;
uniform float grainEdge;
varying vec3 vGrainP;
varying vec3 vGrainAx;
varying vec3 vGrainAy;
varying vec3 vGrainAz;

vec3 grainHash(vec3 c) {
  return fract(sin(vec3(dot(c, vec3(127.1, 311.7, 74.7)),
                        dot(c, vec3(269.5, 183.3, 246.1)),
                        dot(c, vec3(113.5, 271.9, 124.6)))) * 43758.5453);
}

// Returns e = F2 - F1 and its gradient with respect to p (noise space).
// r1, r2 are vectors from p to the nearest and second-nearest feature points.
// d|p - q| / dp = -r / |r|, so grad(F2 - F1) = -r2 / F2 + r1 / F1.
float grainWorley(vec3 p, out vec3 grad) {
  vec3 cell = floor(p);
  vec3 f = p - cell;
  float d1 = 1e9;
  float d2 = 1e9;
  vec3 r1 = vec3(0.0);
  vec3 r2 = vec3(0.0);
  for (int z = -1; z <= 1; z++) {
    for (int y = -1; y <= 1; y++) {
      for (int x = -1; x <= 1; x++) {
        vec3 o = vec3(float(x), float(y), float(z));
        vec3 r = o + grainHash(cell + o) - f;
        float d = dot(r, r);
        if (d < d1) { d2 = d1; r2 = r1; d1 = d; r1 = r; }
        else if (d < d2) { d2 = d; r2 = r; }
      }
    }
  }
  float a = max(sqrt(d1), 1e-5);
  float b = max(sqrt(d2), 1e-5);
  grad = -r2 / b + r1 / a;
  return b - a;
}
`;

// Runs right after <color_fragment>: computes the noise once and darkens the borders.
// grainT / grainG stay in scope for the normal injection later in main().
const GRAIN_COLOR_FRAG = /* glsl */ `
  vec3 grainG;
  float grainE = grainWorley(vGrainP * grainFreq, grainG);
  float grainT = clamp(grainE / grainEdge, 0.0, 1.0);
  float grainH = grainT * grainT * (3.0 - 2.0 * grainT); // 0 on borders, 1 inside a cell
  diffuseColor.rgb *= 1.0 - grainCrease * (1.0 - grainH);
`;

// Runs right after <normal_fragment_maps>: bends the view-space normal by the height gradient.
const GRAIN_NORMAL_FRAG = /* glsl */ `
  {
    float grainDh = 6.0 * grainT * (1.0 - grainT) / grainEdge;  // d smoothstep / d e
    vec3 gObj = grainDh * grainG;          // per noise unit: bump stays comparable across freq
    vec3 gView = gObj.x * vGrainAx + gObj.y * vGrainAy + gObj.z * vGrainAz;
    gView -= dot(gView, normal) * normal;  // keep only the tangent-plane part
    normal = normalize(normal - grainBump * gView);
  }
`;

/**
 * Create the grain material.
 * @param THREE  the three.js namespace (keeps this file free of a hard import)
 * @param opts   { color, freq, bump, crease, edge, roughness, sheen, sheenColor, sheenRoughness,
 *                 envMapIntensity, vertexColors, useGrainAttribute, side }
 */
export function createGrainMaterial(THREE, opts = {}) {
  const {
    color = '#d6cfc4',
    freq = 44,
    bump = 0.03,
    crease = 0.06,
    edge = 0.22,
    roughness = 0.82,
    sheen = 0.6,
    sheenColor = '#ffffff',
    sheenRoughness = 0.7,
    envMapIntensity = 0.35,
    vertexColors = false,
    useGrainAttribute = false,
    side = THREE.FrontSide,
  } = opts;

  const material = new THREE.MeshPhysicalMaterial({
    color, roughness, metalness: 0, sheen, sheenColor, sheenRoughness, envMapIntensity, vertexColors, side,
  });

  // One uniforms object per material, shared by reference with the compiled shader, so a slider
  // can write material.userData.grain.grainFreq.value at any time without a recompile.
  const uniforms = {
    grainFreq: { value: freq },
    grainBump: { value: bump },
    grainCrease: { value: crease },
    grainEdge: { value: edge },
  };
  material.userData.grain = uniforms;
  if (useGrainAttribute) material.defines = { ...(material.defines || {}), GRAIN_ATTR: '' };

  material.onBeforeCompile = (shader) => {
    Object.assign(shader.uniforms, uniforms);
    shader.vertexShader = inject(shader.vertexShader, '#include <common>', GRAIN_COMMON_VERT);
    shader.vertexShader = inject(shader.vertexShader, '#include <begin_vertex>', GRAIN_BEGIN_VERT);
    // Declare custom uniforms and functions right after the common chunk. Declaring them later
    // (inside main, or after a chunk that already uses them) is a classic compile failure.
    shader.fragmentShader = inject(shader.fragmentShader, '#include <common>', GRAIN_COMMON_FRAG);
    shader.fragmentShader = inject(shader.fragmentShader, '#include <color_fragment>', GRAIN_COLOR_FRAG);
    shader.fragmentShader = inject(shader.fragmentShader, '#include <normal_fragment_maps>', GRAIN_NORMAL_FRAG);
  };

  // Without a distinct key three.js may reuse a program compiled for a different variant (here:
  // the attribute and position paths), and the wrong grain source silently wins.
  material.customProgramCacheKey = () => `mascot-grain-v1${useGrainAttribute ? '-attr' : ''}`;
  return material;
}

/** Update grain parameters by plain name: setGrain(mat, { freq: 60, bump: 0.025 }). */
export function setGrain(material, { freq, bump, crease, edge } = {}) {
  const u = material.userData.grain;
  if (!u) return;
  if (freq !== undefined) u.grainFreq.value = freq;
  if (bump !== undefined) u.grainBump.value = bump;
  if (crease !== undefined) u.grainCrease.value = crease;
  if (edge !== undefined) u.grainEdge.value = edge;
}

/**
 * Stable grain coordinates for a THREE.TubeGeometry that is rebuilt every frame (an arm along a
 * moving curve). Uses (distance along the tube, around the tube) instead of the bent positions,
 * so the grain does not swim as the curve moves. Vertex order matches TubeGeometry
 * ((tubularSegments + 1) rings of (radialSegments + 1) vertices).
 * Use with createGrainMaterial(THREE, { useGrainAttribute: true }) and
 *   geometry.setAttribute('grainPos', new THREE.BufferAttribute(array, 3)).
 */
export function tubeGrainPositions(tubularSegments, radialSegments, length, radius) {
  const out = new Float32Array((tubularSegments + 1) * (radialSegments + 1) * 3);
  let o = 0;
  for (let i = 0; i <= tubularSegments; i++) {
    const s = (i / tubularSegments) * length;
    for (let j = 0; j <= radialSegments; j++) {
      const a = (j / radialSegments) * Math.PI * 2;
      out[o++] = s;
      out[o++] = Math.cos(a) * radius;
      out[o++] = Math.sin(a) * radius;
    }
  }
  return out;
}

function inject(src, anchor, code) {
  // Exactly-once guard: if three.js renames a chunk, fail loudly instead of rendering plain.
  const n = src.split(anchor).length - 1;
  if (n !== 1) throw new Error(`grain-material: anchor "${anchor}" found ${n} times; check the three.js version`);
  return src.replace(anchor, `${anchor}\n${code}`);
}
