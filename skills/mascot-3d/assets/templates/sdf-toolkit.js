/**
 * sdf-toolkit.js - signed distance fields and meshers for a procedural mascot.
 *
 * Part of the mascot-3d skill (brimpa-skills, MIT). Written fresh from the algorithms described in
 * references/modelling.md; it contains no character data. Copy it into your project and adapt it.
 *
 * Conventions
 * - An SDF is a function (x, y, z) => number: negative inside, positive outside, zero on the surface.
 * - Points are [x, y, z] arrays. Work in body units: half the body width = 1.0, so every radius,
 *   blend width and grid step below is comparable across parts and across brands.
 * - A mesh is { positions: Float32Array, normals: Float32Array | null, indices: Uint32Array }.
 *   Only toBufferGeometry() touches three.js, and it takes the THREE namespace as an argument, so
 *   this file runs unchanged in a worker, in Node (for tests) and in the browser.
 * - Written against three r170; BufferGeometry and setIndex are unchanged in r186.
 *
 * Which mesher for which part
 * - meshRayProjection(): convex, box-like or blob parts (body panels, cuffs). Cheap, clean quads,
 *   crisp bevels. Cannot represent overhangs. Never relax its output.
 * - meshSmooth() (= meshSurfaceNets + fixWinding + relax + project): anything with overhangs,
 *   concavity or thin parts (hands, shoes, tongues, ears).
 * - three.js built-in geometry: plain spheres, capsules and tori (eyes, legs, the accent object).
 */

// ---------------------------------------------------------------------------------------------
// Blending
// ---------------------------------------------------------------------------------------------

/**
 * Polynomial (quadratic) smooth minimum. Rounds the join between two fields over width k.
 * Failure modes (k in body units):
 * - Neighbouring fingers: keep k around 0.003-0.006. From about 0.015 up, fingers fuse into a
 *   mitten. They also fuse whenever the gap between them is under about twice the finger
 *   radius, whatever k is.
 * - Palm to wrist: 0.02-0.04. Large part to large part (collar to upper, head to body): 0.04-0.07.
 * - k much larger than the smaller part's radius swallows that part into a bump.
 */
export function smin(a, b, k) {
  if (k <= 0) return Math.min(a, b);
  const h = Math.max(k - Math.abs(a - b), 0) / k;
  return Math.min(a, b) - h * h * k * 0.25;
}

/** Smooth maximum (smooth intersection; smooth subtraction is smax(a, -b, k)). */
export function smax(a, b, k) {
  return -smin(-a, -b, k);
}

/** Smooth union of a list of fields with one blend width. */
export function unionSmooth(fields, k) {
  return (x, y, z) => {
    let d = fields[0](x, y, z);
    for (let i = 1; i < fields.length; i++) d = smin(d, fields[i](x, y, z), k);
    return d;
  };
}

// ---------------------------------------------------------------------------------------------
// Primitives (factories returning (x, y, z) => distance)
// ---------------------------------------------------------------------------------------------

export function sphere(center, r) {
  const [cx, cy, cz] = center;
  return (x, y, z) => Math.hypot(x - cx, y - cy, z - cz) - r;
}

/**
 * Rounded box centred at `center` with half extents `half` and edge radius `r`.
 * Use one radius per outline: switching radius across a narrow band prints a diagonal crease
 * where a seam meets the outline. If two radii are unavoidable, blend over a wide band.
 */
export function roundBox(center, half, r) {
  const [cx, cy, cz] = center;
  const hx = half[0] - r, hy = half[1] - r, hz = half[2] - r;
  return (x, y, z) => {
    const qx = Math.abs(x - cx) - hx;
    const qy = Math.abs(y - cy) - hy;
    const qz = Math.abs(z - cz) - hz;
    const outside = Math.hypot(Math.max(qx, 0), Math.max(qy, 0), Math.max(qz, 0));
    const inside = Math.min(Math.max(qx, Math.max(qy, qz)), 0);
    return outside + inside - r;
  };
}

/**
 * Tapered capsule (capped cone with round ends) from point a (radius ra) to point b (radius rb).
 * Every digit and limb segment can be one. With ra === rb it is an exact capsule.
 *
 * The taper uses the radius interpolated at the projected point, which is a close bound rather
 * than an exact distance when the taper is steep. Keep |ra - rb| under about half the segment
 * length; the Newton projection in meshSmooth() absorbs the small error.
 *
 * Optional creases (knuckle lines): narrow Gaussian dents at fractions along the segment, gated
 * to one side so the back of the hand stays smooth.
 *   creases: [{ at: 0.35, depth: 0.008, width: 0.016 }], creaseSide: [0, 0, 1]
 * The gate is a smooth ramp on the local side axis (creaseSide, roughly the palm normal).
 * A depth over about a third of the radius reads as a cut, not a crease.
 */
export function capsule(a, b, ra, rb = ra, opts = {}) {
  const [ax, ay, az] = a;
  const bax = b[0] - ax, bay = b[1] - ay, baz = b[2] - az;
  const len2 = bax * bax + bay * bay + baz * baz || 1e-12;
  const len = Math.sqrt(len2);
  const creases = opts.creases || [];
  const side = opts.creaseSide || [0, 0, 1];
  return (x, y, z) => {
    const pax = x - ax, pay = y - ay, paz = z - az;
    const t = Math.min(Math.max((pax * bax + pay * bay + paz * baz) / len2, 0), 1);
    const dx = pax - bax * t, dy = pay - bay * t, dz = paz - baz * t;
    const radial = Math.hypot(dx, dy, dz);
    let d = radial - (ra + (rb - ra) * t);
    if (creases.length && radial > 1e-9) {
      const facing = (dx * side[0] + dy * side[1] + dz * side[2]) / radial; // -1..1
      const gate = smoothstep(-0.2, 0.6, facing);
      if (gate > 0) {
        for (const c of creases) {
          const s = (t - c.at) * len / c.width;
          d += c.depth * Math.exp(-s * s) * gate; // positive = pushed inward = a dent
        }
      }
    }
    return d;
  };
}

export function smoothstep(e0, e1, x) {
  const t = Math.min(Math.max((x - e0) / (e1 - e0), 0), 1);
  return t * t * (3 - 2 * t);
}

/** Central-difference gradient of an SDF, written into `out` (length 3). Not normalised. */
export function gradient(sdf, x, y, z, h, out = [0, 0, 0]) {
  const i2h = 1 / (2 * h);
  out[0] = (sdf(x + h, y, z) - sdf(x - h, y, z)) * i2h;
  out[1] = (sdf(x, y + h, z) - sdf(x, y - h, z)) * i2h;
  out[2] = (sdf(x, y, z + h) - sdf(x, y, z - h)) * i2h;
  return out;
}

/** Recompute normals from the field gradient (smoother than face normals, and seam-free). */
export function normalsFromField(mesh, sdf, h = 0.001) {
  const p = mesh.positions;
  const n = new Float32Array(p.length);
  const g = [0, 0, 0];
  for (let i = 0; i < p.length; i += 3) {
    gradient(sdf, p[i], p[i + 1], p[i + 2], h, g);
    const l = Math.hypot(g[0], g[1], g[2]) || 1;
    n[i] = g[0] / l; n[i + 1] = g[1] / l; n[i + 2] = g[2] / l;
  }
  mesh.normals = n;
  return mesh;
}

// ---------------------------------------------------------------------------------------------
// Mesher 1: ray projection ("sculpt") for convex blobs
// ---------------------------------------------------------------------------------------------

/**
 * Subdivide the faces of a box that encloses the part, then move every vertex along the ray from
 * `center` through it to the zero crossing of the field (bisection).
 *
 * Options
 *   center  a point strictly inside the part; every ray from it must cross the surface once
 *   min/max the enclosing box (must lie fully outside the part)
 *   res     [nx, ny, nz] subdivisions along x, y, z. Below about 80 across a large face (and 24
 *           through a shallow depth) the bevels read as faceted at hero size; about 48 x 48 x 14
 *           is enough for a dock-only tier. Cost grows with face area only, so this is cheap.
 *   steps   bisection steps (20-30; each one halves the error along the ray)
 *   normalStep  central-difference step for normals (about 0.001)
 *
 * Failure modes
 * - Overhangs: a ray that crosses the surface more than once lands on an arbitrary crossing and
 *   the surface pleats (a shoe tongue, an ear that curls back). Use meshSmooth() for that part.
 * - The part is not star-shaped from `center`: same pleating. Move the centre or split the part.
 * - NEVER relax this output. Each box face carries its own copy of the edge vertices; the copies
 *   sit on the same ray so they coincide, but a Laplacian pass sees different neighbours per face,
 *   moves the copies apart and opens the face seams as visible lines.
 *
 * Returns { mesh, clipped } where clipped counts vertices whose box point was already inside the
 * part (the box is too small: enlarge it).
 */
export function meshRayProjection(sdf, { center, min, max, res = [80, 80, 24], steps = 26, normalStep = 0.001 }) {
  const [cx, cy, cz] = center;
  if (sdf(cx, cy, cz) >= 0) throw new Error('meshRayProjection: center is not inside the part');
  const [x0, y0, z0] = min, [x1, y1, z1] = max;
  const [nx, ny, nz] = res;
  const sx = x1 - x0, sy = y1 - y0, sz = z1 - z0;
  // Each face: origin, u axis, v axis, subdivisions along u and v. u x v points outward, so the
  // triangles (a, b, c) and (a, c, d) below face out, and ray projection preserves that.
  const faces = [
    [[x1, y0, z0], [0, sy, 0], [0, 0, sz], ny, nz], // +X
    [[x0, y0, z0], [0, 0, sz], [0, sy, 0], nz, ny], // -X
    [[x0, y1, z0], [0, 0, sz], [sx, 0, 0], nz, nx], // +Y
    [[x0, y0, z0], [sx, 0, 0], [0, 0, sz], nx, nz], // -Y
    [[x0, y0, z1], [sx, 0, 0], [0, sy, 0], nx, ny], // +Z
    [[x0, y0, z0], [0, sy, 0], [sx, 0, 0], ny, nx], // -Z
  ];
  let vcount = 0, icount = 0;
  for (const f of faces) { vcount += (f[3] + 1) * (f[4] + 1); icount += f[3] * f[4] * 6; }
  const positions = new Float32Array(vcount * 3);
  const indices = new Uint32Array(icount);
  let vi = 0, ii = 0, clipped = 0;
  for (const [o, u, v, nu, nv] of faces) {
    const base = vi;
    for (let j = 0; j <= nv; j++) {
      for (let i = 0; i <= nu; i++) {
        const a = i / nu, b = j / nv;
        const qx = o[0] + u[0] * a + v[0] * b;
        const qy = o[1] + u[1] * a + v[1] * b;
        const qz = o[2] + u[2] * a + v[2] * b;
        const dx = qx - cx, dy = qy - cy, dz = qz - cz;
        let t = 1;
        if (sdf(qx, qy, qz) < 0) clipped++; // the part pokes out of the box here
        else {
          let lo = 0, hi = 1;
          for (let s = 0; s < steps; s++) {
            const m = (lo + hi) * 0.5;
            if (sdf(cx + dx * m, cy + dy * m, cz + dz * m) < 0) lo = m; else hi = m;
          }
          t = (lo + hi) * 0.5;
        }
        positions[vi * 3] = cx + dx * t;
        positions[vi * 3 + 1] = cy + dy * t;
        positions[vi * 3 + 2] = cz + dz * t;
        vi++;
      }
    }
    const row = nu + 1;
    for (let j = 0; j < nv; j++) {
      for (let i = 0; i < nu; i++) {
        const a = base + j * row + i, b = a + 1, c = a + 1 + row, d = a + row;
        indices[ii++] = a; indices[ii++] = b; indices[ii++] = c;
        indices[ii++] = a; indices[ii++] = c; indices[ii++] = d;
      }
    }
  }
  const mesh = { positions, normals: null, indices };
  normalsFromField(mesh, sdf, normalStep);
  return { mesh, clipped };
}

// ---------------------------------------------------------------------------------------------
// Mesher 2: surface nets for overhangs, concavity and thin parts
// ---------------------------------------------------------------------------------------------

const CORNERS = [];
for (let c = 0; c < 8; c++) CORNERS.push([c & 1, (c >> 1) & 1, (c >> 2) & 1]);
const EDGES = [];
for (let a = 0; a < 8; a++) for (const bit of [1, 2, 4]) if (!(a & bit)) EDGES.push([a, a | bit]);

/**
 * Naive surface nets. Sample the field on a regular grid; in every cell whose corners change sign
 * place one vertex at the mean of its edge crossings; emit a quad across every grid edge that
 * crosses the surface.
 *
 * Options: min, max (a box around the part with at least one step of margin), step (grid step).
 * Cost is cubic in 1/step: halving the step multiplies samples, time and memory by eight.
 * Starting points (body units): about 0.009-0.012 for a hand, about 0.01 for a shoe upper,
 * 0.02-0.03 for a quick preview. A hand-sized box at 0.011 is roughly 0.5 to 0.7 million samples.
 *
 * Failure modes
 * - A feature thinner than about two steps (a finger gap, a sole edge) drops out or bridges.
 * - Raw output shows a faint stair pattern: always follow with relax() and project().
 * - Quad orientation from the grid alone is not reliable: always run fixWinding(), or the mesh
 *   looks fine from the front and shows holes from some angles.
 */
export function meshSurfaceNets(sdf, { min, max, step }) {
  const [x0, y0, z0] = min;
  const nx = Math.ceil((max[0] - x0) / step) + 1;
  const ny = Math.ceil((max[1] - y0) / step) + 1;
  const nz = Math.ceil((max[2] - z0) / step) + 1;
  const total = nx * ny * nz;
  if (total > 12e6) throw new Error(`meshSurfaceNets: ${total} samples; raise the step or shrink the box`);
  const field = new Float32Array(total);
  const at = (i, j, k) => i + nx * (j + ny * k);
  for (let k = 0; k < nz; k++) {
    const z = z0 + k * step;
    for (let j = 0; j < ny; j++) {
      const y = y0 + j * step;
      for (let i = 0; i < nx; i++) field[at(i, j, k)] = sdf(x0 + i * step, y, z);
    }
  }
  const cx = nx - 1, cy = ny - 1, cz = nz - 1;
  const cellVert = new Int32Array(cx * cy * cz).fill(-1);
  const cellAt = (i, j, k) => i + cx * (j + cy * k);
  const pos = [];
  const v = new Float32Array(8);
  for (let k = 0; k < cz; k++) {
    for (let j = 0; j < cy; j++) {
      for (let i = 0; i < cx; i++) {
        let mask = 0;
        for (let c = 0; c < 8; c++) {
          const o = CORNERS[c];
          v[c] = field[at(i + o[0], j + o[1], k + o[2])];
          if (v[c] < 0) mask |= 1 << c;
        }
        if (mask === 0 || mask === 255) continue;
        let sx = 0, sy = 0, sz = 0, n = 0;
        for (const [a, b] of EDGES) {
          if ((v[a] < 0) === (v[b] < 0)) continue;
          const t = v[a] / (v[a] - v[b]);
          const oa = CORNERS[a], ob = CORNERS[b];
          sx += oa[0] + (ob[0] - oa[0]) * t;
          sy += oa[1] + (ob[1] - oa[1]) * t;
          sz += oa[2] + (ob[2] - oa[2]) * t;
          n++;
        }
        cellVert[cellAt(i, j, k)] = pos.length / 3;
        pos.push(x0 + (i + sx / n) * step, y0 + (j + sy / n) * step, z0 + (k + sz / n) * step);
      }
    }
  }
  const idx = [];
  // `inside` = the edge starts inside the part. With the cell orders below, an edge that starts
  // inside needs (a, b, c) to face out; one that starts outside needs the reverse. fixWinding()
  // still runs afterwards, because ambiguous cells can fold a quad.
  const quad = (a, b, c, d, inside) => {
    if (a < 0 || b < 0 || c < 0 || d < 0) return;
    if (inside) idx.push(a, b, c, a, c, d); else idx.push(a, c, b, a, d, c);
  };
  for (let k = 0; k < nz; k++) {
    for (let j = 0; j < ny; j++) {
      for (let i = 0; i < nx; i++) {
        const inside = field[at(i, j, k)] < 0;
        // grid edge along +x: shared by the four cells around it in y and z
        if (i < cx && j > 0 && k > 0 && j < cy && k < cz && inside !== (field[at(i + 1, j, k)] < 0)) {
          quad(cellVert[cellAt(i, j - 1, k - 1)], cellVert[cellAt(i, j, k - 1)],
            cellVert[cellAt(i, j, k)], cellVert[cellAt(i, j - 1, k)], inside);
        }
        // grid edge along +y
        if (j < cy && i > 0 && k > 0 && i < cx && k < cz && inside !== (field[at(i, j + 1, k)] < 0)) {
          quad(cellVert[cellAt(i - 1, j, k - 1)], cellVert[cellAt(i - 1, j, k)],
            cellVert[cellAt(i, j, k)], cellVert[cellAt(i, j, k - 1)], inside);
        }
        // grid edge along +z
        if (k < cz && i > 0 && j > 0 && i < cx && j < cy && inside !== (field[at(i, j, k + 1)] < 0)) {
          quad(cellVert[cellAt(i - 1, j - 1, k)], cellVert[cellAt(i, j - 1, k)],
            cellVert[cellAt(i, j, k)], cellVert[cellAt(i - 1, j, k)], inside);
        }
      }
    }
  }
  return { positions: new Float32Array(pos), normals: null, indices: new Uint32Array(idx), samples: total };
}

// ---------------------------------------------------------------------------------------------
// Clean-up passes for surface-nets output: winding, relax, project
// ---------------------------------------------------------------------------------------------

/**
 * Make every triangle face outward: compare its face normal with the field gradient at its
 * centroid and swap two indices when they disagree. Returns the number of triangles flipped.
 * Keep the grid step under half the thinnest part, or a triangle's centroid on one side of a thin
 * sheet can read the gradient of the other side.
 */
export function fixWinding(mesh, sdf, h = 0.001) {
  const p = mesh.positions, ix = mesh.indices;
  const g = [0, 0, 0];
  let flipped = 0;
  for (let t = 0; t < ix.length; t += 3) {
    const a = ix[t] * 3, b = ix[t + 1] * 3, c = ix[t + 2] * 3;
    const ux = p[b] - p[a], uy = p[b + 1] - p[a + 1], uz = p[b + 2] - p[a + 2];
    const vx = p[c] - p[a], vy = p[c + 1] - p[a + 1], vz = p[c + 2] - p[a + 2];
    const nx = uy * vz - uz * vy, ny = uz * vx - ux * vz, nz = ux * vy - uy * vx;
    gradient(sdf, (p[a] + p[b] + p[c]) / 3, (p[a + 1] + p[b + 1] + p[c + 1]) / 3,
      (p[a + 2] + p[b + 2] + p[c + 2]) / 3, h, g);
    if (nx * g[0] + ny * g[1] + nz * g[2] < 0) {
      const tmp = ix[t + 1]; ix[t + 1] = ix[t + 2]; ix[t + 2] = tmp;
      flipped++;
    }
  }
  return flipped;
}

/**
 * Laplacian relax over each vertex's one-ring. Removes the surface-nets stair pattern but shrinks
 * the mesh off the surface, so always follow it with project(). Starting point: 3 iterations,
 * factor 0.55. More iterations round off intended edges; a factor near 1 oscillates.
 * Neighbours are listed once per incident triangle; on a closed mesh every edge belongs to two
 * triangles, so each neighbour is counted twice and the weighting stays uniform.
 */
export function relax(mesh, { iterations = 3, factor = 0.55 } = {}) {
  const p = mesh.positions, ix = mesh.indices, n = p.length / 3;
  const start = new Uint32Array(n + 1);
  for (let t = 0; t < ix.length; t++) start[ix[t] + 1] += 2;
  for (let i = 0; i < n; i++) start[i + 1] += start[i];
  const nbr = new Uint32Array(start[n]);
  const fill = start.slice(0, n);
  for (let t = 0; t < ix.length; t += 3) {
    const a = ix[t], b = ix[t + 1], c = ix[t + 2];
    nbr[fill[a]++] = b; nbr[fill[a]++] = c;
    nbr[fill[b]++] = c; nbr[fill[b]++] = a;
    nbr[fill[c]++] = a; nbr[fill[c]++] = b;
  }
  let src = p, dst = new Float32Array(p.length);
  for (let it = 0; it < iterations; it++) {
    for (let i = 0; i < n; i++) {
      const s = start[i], e = start[i + 1], o = i * 3;
      if (e === s) { dst[o] = src[o]; dst[o + 1] = src[o + 1]; dst[o + 2] = src[o + 2]; continue; }
      let ax = 0, ay = 0, az = 0;
      for (let q = s; q < e; q++) { const k = nbr[q] * 3; ax += src[k]; ay += src[k + 1]; az += src[k + 2]; }
      const inv = 1 / (e - s);
      dst[o] = src[o] + (ax * inv - src[o]) * factor;
      dst[o + 1] = src[o + 1] + (ay * inv - src[o + 1]) * factor;
      dst[o + 2] = src[o + 2] + (az * inv - src[o + 2]) * factor;
    }
    const tmp = src; src = dst; dst = tmp;
  }
  if (src !== p) p.set(src);
  return mesh;
}

/**
 * Newton projection back onto the zero level: move each vertex by minus the field value along the
 * gradient, a few times, then take normals from the gradient. Starting point: 4 iterations,
 * gradient step about 0.0015. Pair it with relax() every time.
 */
export function project(mesh, sdf, { iterations = 4, h = 0.0015 } = {}) {
  const p = mesh.positions;
  const g = [0, 0, 0];
  for (let i = 0; i < p.length; i += 3) {
    let x = p[i], y = p[i + 1], z = p[i + 2];
    for (let it = 0; it < iterations; it++) {
      const f = sdf(x, y, z);
      gradient(sdf, x, y, z, h, g);
      const g2 = g[0] * g[0] + g[1] * g[1] + g[2] * g[2];
      if (g2 < 1e-12) break; // on a medial axis: leave the vertex where relax put it
      x -= f * g[0] / g2; y -= f * g[1] / g2; z -= f * g[2] / g2;
    }
    p[i] = x; p[i + 1] = y; p[i + 2] = z;
  }
  return normalsFromField(mesh, sdf, h);
}

/**
 * The chained helper: surface nets -> fix winding -> relax -> project -> fix winding again.
 * One call, so nobody forgets a pass. Returns the mesh with field normals.
 */
export function meshSmooth(sdf, { min, max, step, relaxIterations = 3, relaxFactor = 0.55, projectIterations = 4, gradStep } = {}) {
  const h = gradStep || Math.min(0.0015, step * 0.25);
  const mesh = meshSurfaceNets(sdf, { min, max, step });
  fixWinding(mesh, sdf, h);
  relax(mesh, { iterations: relaxIterations, factor: relaxFactor });
  project(mesh, sdf, { iterations: projectIterations, h });
  fixWinding(mesh, sdf, h); // relax can fold a sliver triangle; re-check against the field
  return mesh;
}

// ---------------------------------------------------------------------------------------------
// Extras
// ---------------------------------------------------------------------------------------------

/**
 * Bake a contact shadow into vertex colours: darken each vertex by its distance to the nearest
 * OTHER part's field. `near` is the factor at contact (about 0.7), `range` the distance at which
 * it reaches 1.0 (about 0.1 units). Returns RGB triples for a `color` attribute (set
 * vertexColors: true on the material). Also fill any visible gap between parts with a dark
 * inner shape so the body never reads as hollow.
 */
export function bakeContactShade(mesh, otherSdf, { near = 0.7, range = 0.1 } = {}) {
  const p = mesh.positions;
  const col = new Float32Array(p.length);
  for (let i = 0; i < p.length; i += 3) {
    const d = Math.max(otherSdf(p[i], p[i + 1], p[i + 2]), 0);
    const f = near + (1 - near) * smoothstep(0, range, d);
    col[i] = col[i + 1] = col[i + 2] = f;
  }
  return col;
}

/** Turn a toolkit mesh into a THREE.BufferGeometry. Pass the THREE namespace in. */
export function toBufferGeometry(THREE, mesh, { colors = null } = {}) {
  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.BufferAttribute(mesh.positions, 3));
  if (mesh.normals) geo.setAttribute('normal', new THREE.BufferAttribute(mesh.normals, 3));
  if (colors) geo.setAttribute('color', new THREE.BufferAttribute(colors, 3));
  geo.setIndex(new THREE.BufferAttribute(mesh.indices, 1));
  if (!mesh.normals) geo.computeVertexNormals();
  geo.computeBoundingSphere();
  return geo;
}
