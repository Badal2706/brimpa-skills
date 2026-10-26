/**
 * mascot-runtime.js - pose, state and animation core for a procedural mascot. Engine-agnostic.
 *
 * Part of the mascot-3d skill (brimpa-skills, MIT). Written fresh from references/animation.md;
 * it contains no character data. It never imports three.js: the scene graph is reached only
 * through an adapter you supply, so the same core drives a three.js rig, a canvas 2D test view
 * or a headless clearance check.
 *
 * The model
 * - ONE FLAT CHANNEL OBJECT holds the whole pose ({ tilt: 0, yaw: 0, armOutL: 0.2, ... }). Flat is
 *   the point: every channel can be eased, crossfaded, summed with an animation delta and mirrored
 *   by name without walking a tree. Typical size: 40-60 channels.
 * - Side channels end in L or R (armOutL / armOutR). Mirroring renames them; lateral channels in
 *   `negate` flip sign.
 * - A STATE is { id, label, trigger, notes, pose, props, anim }:
 *     pose  partial channel object (overrides `neutral`) plus optional hands: { L: 'open', R: 'point' }
 *     props names of sprites (marks) shown in this state, eased in and out
 *     anim(te, p, t)  writes ADDITIVE deltas into p each frame; te = seconds in this state,
 *                     t = runtime clock. Channels listed in `multiplicative` (squash) are applied as
 *                     value * (1 + delta). Keep amplitudes under about 0.1 rad: larger loops read as
 *                     frantic at dock size.
 *   label, trigger and notes are documentation that the code never reads. Keep them anyway: the
 *   preview's expression sheet renders them, and they are the only written intent of a pose.
 *   QA must check they still match the code (a trigger that says 60 s while the code says 75 s).
 * - Each frame: ease every channel toward the target with k = 1 - exp(-dt * rate) (frame-rate
 *   independent), crossfade the old and new state's anim deltas over `crossfade` seconds with a
 *   smoothstep, then add blink, gaze (follow or wander) and the click squash.
 *
 * Adapter contract
 *   adapter.apply(out, info)
 *     out   final flat channel object for this frame (do not keep a reference; it is reused)
 *     info  { props: { name: 0..1 }, mirrored: boolean, time, stateId }
 *   Example (three.js): root.rotation.z = out.tilt; root.position.y = out.jump;
 *     root.scale.set(1 / Math.sqrt(out.squash), out.squash, 1 / Math.sqrt(out.squash));
 *     for (const [name, v] of Object.entries(info.props)) sprites[name].scale.setScalar(v * size);
 *   Sprites that are not a left/right pair should negate their x position when info.mirrored.
 *   The adapter only touches the parts the mascot has; channels of absent parts never exist.
 *
 * Parts are optional modules
 * - Only the body is required. Build the channel object from the parts the mascot has with
 *   buildNeutral(parts), and write states with `variants` so each one has a fallback when a part
 *   is missing (a wave without hands becomes a body sway, or a tilt and a hop). resolveStates()
 *   picks, per state, the first variant whose `requires` parts all exist. A pose that sets a
 *   channel of an absent part fails validation at start-up instead of silently doing nothing.
 */

// ---------------------------------------------------------------------------------------------
// Parts catalogue -> channels
// ---------------------------------------------------------------------------------------------

/**
 * Channel groups per part, with neutral values. Extend or rename to taste; keep side suffixes L/R.
 * body is always included. `signature` is the brand's signature channel (a lean, a bounce...):
 * name it after what it moves (for example `sway` for a leaning appendage) and add it under the
 * part it belongs to.
 */
export const PART_CHANNELS = {
  body: { tilt: 0, yaw: 0, pitch: 0, jump: 0, shift: 0, squash: 1 },
  eyes: { lookX: 0, lookY: 0, follow: 1, eyesClosed: 0, eyesHappy: 0, eyeScaleL: 1, eyeScaleR: 1, eyeRotL: 0, eyeRotR: 0 },
  mouth: { mouthOpen: 0, mouthSmile: 0 },
  arms: { armOutL: 0.12, armOutR: 0.12, armFwdL: 0.05, armFwdR: 0.05, elbowL: 0.1, elbowR: 0.1, elbowTwistL: 0, elbowTwistR: 0 },
  hands: { handCurlL: 0, handCurlR: 0, handIndexL: 0, handIndexR: 0, handThumbL: 0, handThumbR: 0, handSpreadL: 0, handSpreadR: 0, handTwistL: 0, handTwistR: 0 },
  legs: { legFwdL: 0, legFwdR: 0, legOutL: 0, legOutR: 0 },
  accent: { accentX: 0, accentY: 0, accentGlow: 0.3, accentRing: 0, accentScale: 1 },
  appendages: { sway: 0, earL: 0, earR: 0, tail: 0 },
};

/** Requires-rules between parts: hands need arms, feet live on legs. */
const PART_DEPENDS = { hands: ['arms'] };

/**
 * Build the neutral channel object from a parts list, e.g. ['body', 'eyes', 'accent'].
 * `extra` adds or overrides channels (your signature channel, per-character neutrals).
 */
export function buildNeutral(parts, extra = {}) {
  const set = new Set(['body', ...parts]);
  for (const p of set) {
    for (const dep of PART_DEPENDS[p] || []) {
      if (!set.has(dep)) throw new Error(`mascot-runtime: part "${p}" needs "${dep}"`);
    }
  }
  const neutral = {};
  for (const p of set) {
    if (!PART_CHANNELS[p]) throw new Error(`mascot-runtime: unknown part "${p}"; add it to PART_CHANNELS`);
    Object.assign(neutral, PART_CHANNELS[p]);
  }
  return Object.assign(neutral, extra);
}

/**
 * Flatten states written with variants into plain states for the parts this mascot has.
 *   { id: 'wave', label, trigger, variants: [
 *       { requires: ['arms', 'hands'], pose: {...}, anim, props },
 *       { requires: [], pose: { tilt: 0.06 }, anim: (te, p) => { p.jump += ... } } ] }
 * The first variant whose requires are all present wins; a state with no matching variant is
 * dropped with a console warning (so a must-have state should always end with requires: []).
 * The chosen variant is recorded as `variant` (its index) for the expression sheet.
 */
export function resolveStates(states, parts) {
  const have = new Set(['body', ...parts]);
  const out = [];
  for (const s of states) {
    if (!s.variants) { out.push(s); continue; }
    const i = s.variants.findIndex((v) => (v.requires || []).every((r) => have.has(r)));
    if (i < 0) { console.warn(`mascot-runtime: state "${s.id}" has no variant for parts [${[...have]}]`); continue; }
    const { requires, ...v } = s.variants[i];
    const { variants, ...base } = s;
    out.push({ ...base, ...v, variant: i, requires });
  }
  return out;
}

/** Seeded random generator (mulberry32) for deterministic stills and film frames. */
export function seededRandom(seed = 1) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const smooth01 = (x) => { const t = Math.min(Math.max(x, 0), 1); return t * t * (3 - 2 * t); };
const cap = (s) => s.charAt(0).toUpperCase() + s.slice(1);

/**
 * Hand preset expansion: preset { curl: 1, thumb: 0.2 } on side L becomes handCurlL / handThumbL.
 * A pose names a preset per hand, so hands ease and crossfade like every other channel.
 * Add a preset only when two or more states would use it.
 */
export function handChannel(key, side) {
  return `hand${cap(key)}${side}`;
}

export function createMascotRuntime({
  neutral,
  states,
  handPresets = {},
  adapter,
  negate = ['lookX', 'tilt', 'yaw', 'shift', 'accentX', 'eyeRotL', 'eyeRotR'],
  propMirror = {},
  noFlipProps = [],
  rates = { default: 7, yaw: 4 },
  propRate = 6,
  crossfade = 0.55,
  multiplicative = ['squash'],
  blink = { min: 2.5, max: 6, duration: 0.16, channel: 'eyesClosed', skipIf: (p) => (p.eyesHappy || 0) > 0.5 },
  gaze = { x: 'lookX', y: 'lookY', follow: 'follow', wanderAfter: 2.5, every: [2, 4.5], rate: 5 },
  squash = { channel: 'squash', amp: 0.2, freq: 18, decay: 5, duration: 1 },
  initialState = 'idle',
  random = Math.random,
  onState = null,
} = {}) {
  if (!neutral || !states || !adapter) throw new Error('mascot-runtime: neutral, states and adapter are required');
  const channels = Object.keys(neutral);
  const byId = new Map(states.map((s) => [s.id, s]));
  validate();
  // Features switch off by themselves when their part is absent: no eyes -> no blink and no gaze
  // (add lookX / lookY / follow through buildNeutral's `extra` to let a body-only mascot turn
  // toward the pointer); squash lives on the body, so it is always there.
  const has = (c) => Object.prototype.hasOwnProperty.call(neutral, c);
  const useBlink = !!blink && has(blink.channel);
  const useGaze = !!gaze && has(gaze.x) && has(gaze.y);
  const useSquash = !!squash && has(squash.channel);

  // ---------------------------------------------------------------- mirroring
  const swapName = (c) => (/[LR]$/.test(c) ? c.slice(0, -1) + (c.endsWith('L') ? 'R' : 'L') : c);
  const negateSet = new Set(negate);
  const propSwap = { ...propMirror };
  for (const [a, b] of Object.entries(propMirror)) propSwap[b] = a;
  function mirrorInto(src, dst) {
    for (const c of channels) {
      const from = swapName(c);
      const v = src[from];
      dst[c] = negateSet.has(c) ? -v : v;
    }
    return dst;
  }

  // ---------------------------------------------------------------- runtime state
  const p = { ...neutral };            // eased channels
  const out = { ...neutral };          // final output, reused every frame
  const target = { ...neutral };
  const scratch = { ...neutral };
  const dNew = zero(), dOld = zero(), dMix = zero(), dMir = zero();
  const propVis = {};
  for (const s of states) for (const n of s.props || []) propVis[n] = 0;
  for (const n of Object.values(propMirror)) propVis[n] = propVis[n] || 0;

  let time = 0;
  let frozen = false;
  let mirrored = false;
  let current = { state: byId.get(initialState) || states[0], since: 0 };
  let previous = null;
  let fadeFrom = -1;
  let baseId = current.state.id;
  let reactUntil = -1;
  // blink
  let nextBlink = randIn(blink.min, blink.max);
  let blinkStart = -1;
  // gaze
  const pointer = { x: 0, y: 0, at: -1e9 };
  const wander = { x: 0, y: 0, next: 0 };
  const gazeNow = { x: 0, y: 0 };
  // squash
  let pokeAt = -1e9;

  function zero() { const o = {}; for (const c of channels) o[c] = 0; return o; }
  function clearDelta(d) { for (const c of channels) d[c] = 0; }
  function randIn(a, b) { return a + (b - a) * random(); }

  function validate() {
    for (const s of states) {
      for (const k of Object.keys(s.pose || {})) {
        if (k !== 'hands' && !(k in neutral)) throw new Error(`mascot-runtime: state "${s.id}" sets unknown channel "${k}"`);
      }
      for (const side of ['L', 'R']) {
        const name = s.pose?.hands?.[side];
        if (name && !handPresets[name]) throw new Error(`mascot-runtime: state "${s.id}" uses unknown hand preset "${name}"`);
      }
    }
  }

  /** Neutral + pose + expanded hand presets (+ mirror), written into dst. */
  function composeTarget(state, dst, mirror) {
    const src = mirror ? scratch : dst;
    Object.assign(src, neutral);
    const pose = state.pose || {};
    for (const k in pose) if (k !== 'hands') src[k] = pose[k];
    if (pose.hands) {
      for (const side of ['L', 'R']) {
        const preset = handPresets[pose.hands[side]];
        if (!preset) continue;
        for (const key in preset) {
          const c = handChannel(key, side);
          if (c in src) src[c] = preset[key];
        }
      }
    }
    if (mirror) mirrorInto(scratch, dst);
    return dst;
  }

  function evalAnim(entry, d) {
    clearDelta(d);
    if (entry && entry.state.anim) entry.state.anim(time - entry.since, d, time);
    return d;
  }

  function rateOf(c) { return rates[c] ?? rates.default ?? 7; }

  // ---------------------------------------------------------------- per frame
  function update(dtIn) {
    let dt = frozen ? 0 : Math.min(Math.max(dtIn || 0, 0), 0.1); // clamp after a hidden tab
    time += dt;

    if (reactUntil >= 0 && time >= reactUntil) { reactUntil = -1; enter(baseId); }

    // 1. ease toward the target
    composeTarget(current.state, target, mirrored);
    for (const c of channels) {
      const k = 1 - Math.exp(-dt * rateOf(c));
      p[c] += (target[c] - p[c]) * k;
    }

    // 2. crossfade the animation deltas
    evalAnim(current, dNew);
    let delta = dNew;
    if (previous && fadeFrom >= 0) {
      const s = smooth01((time - fadeFrom) / crossfade);
      if (s >= 1) { previous = null; fadeFrom = -1; }
      else {
        evalAnim(previous, dOld);
        for (const c of channels) dMix[c] = dOld[c] + (dNew[c] - dOld[c]) * s;
        delta = dMix;
      }
    }
    if (mirrored) delta = mirrorInto(delta, dMir);
    for (const c of channels) out[c] = multiplicative.includes(c) ? p[c] * (1 + delta[c]) : p[c] + delta[c];

    // 3. gaze: follow the pointer, or wander once the pointer has been still
    if (useGaze) {
      let gx, gy;
      const follow = has(gaze.follow) ? out[gaze.follow] : 1;
      if (!frozen && time - pointer.at > gaze.wanderAfter) {
        if (time >= wander.next) {
          wander.x = randIn(-0.8, 0.8); wander.y = randIn(-0.5, 0.5);
          wander.next = time + randIn(gaze.every[0], gaze.every[1]);
        }
        gx = wander.x; gy = wander.y;
      } else { gx = pointer.x; gy = pointer.y; }
      const k = 1 - Math.exp(-dt * (gaze.rate || 5));
      gazeNow.x += (gx - gazeNow.x) * k; gazeNow.y += (gy - gazeNow.y) * k;
      // The pointer lives in screen space, so it is never mirrored: a mirrored mascot still looks
      // at the real cursor. Only the pose's own look values (already mirrored above) flip.
      out[gaze.x] = out[gaze.x] * (1 - follow) + gazeNow.x * follow;
      out[gaze.y] = out[gaze.y] * (1 - follow) + gazeNow.y * follow;
    }

    // 4. blink: half-sine, skipped when the eyes are already closed or smiling
    if (useBlink && !frozen) {
      if (blinkStart < 0 && time >= nextBlink) {
        if ((out[blink.channel] || 0) < 0.5 && !(blink.skipIf && blink.skipIf(out))) blinkStart = time;
        nextBlink = time + randIn(blink.min, blink.max);
      }
      if (blinkStart >= 0) {
        const u = (time - blinkStart) / blink.duration;
        if (u >= 1) blinkStart = -1;
        else out[blink.channel] = Math.max(out[blink.channel] || 0, Math.sin(Math.PI * u));
      }
    }

    // 5. click squash: a damped sine for about a second after a poke
    if (useSquash) {
      const u = time - pokeAt;
      if (u >= 0 && u < squash.duration) {
        out[squash.channel] *= 1 - squash.amp * Math.sin(u * squash.freq) * Math.exp(-u * squash.decay);
      }
    }

    // 6. props (marks): eased visibility, swapped for handed sprites when mirrored
    const kp = 1 - Math.exp(-dt * propRate);
    const shown = new Set((current.state.props || []).map((n) => (mirrored && !noFlipProps.includes(n) && propSwap[n]) || n));
    for (const n in propVis) propVis[n] += ((shown.has(n) ? 1 : 0) - propVis[n]) * kp;

    adapter.apply(out, { props: propVis, mirrored, time, stateId: current.state.id });
    return out;
  }

  // ---------------------------------------------------------------- state control
  function enter(id) {
    const s = byId.get(id);
    if (!s) throw new Error(`mascot-runtime: unknown state "${id}"`);
    if (s === current.state) return;
    previous = current;
    fadeFrom = time;
    current = { state: s, since: time };
    if (onState) onState(id);
  }

  /** Set the base state (stays until the next setState). */
  function setState(id) { baseId = id; reactUntil = -1; enter(id); }

  /** A temporary state for `seconds`, then back to the base state. */
  function react(id, seconds = 2) { enter(id); reactUntil = time + seconds; }

  /** Pointer in -1..1 around the mascot's centre (x right, y up). */
  function setPointer(x, y) { pointer.x = x; pointer.y = y; pointer.at = time; }

  /** Click or tap on the mascot. */
  function poke() { pokeAt = time; }

  /** Docked on the right edge -> point left: setMirror(true). Channels only; meshes untouched. */
  function setMirror(on) { mirrored = !!on; }

  /** Stop the clock, the blink and the wander (stills, crop reviews, film frames). */
  function freeze(on = true) { frozen = !!on; if (frozen) blinkStart = -1; }

  /**
   * Jump the clock to an exact time for deterministic frames. Combine with freeze(true) and a
   * seededRandom() passed as `random`. settle = true snaps the eased channels to the target.
   */
  function seek(t, { settle = true } = {}) {
    const offset = t - time;
    time = t;
    current.since += offset;
    if (settle) {
      composeTarget(current.state, target, mirrored);
      Object.assign(p, target);
      previous = null; fadeFrom = -1;
      const shown = new Set((current.state.props || []).map((n) => (mirrored && !noFlipProps.includes(n) && propSwap[n]) || n));
      for (const n in propVis) propVis[n] = shown.has(n) ? 1 : 0;
    }
  }

  /**
   * Pure evaluation of a state at te seconds (no easing, no blink, no gaze): for the no-overlap
   * clearance check, the expression sheet and stills. Returns a new object.
   */
  function poseAt(id, te = 1.5, { mirror = false } = {}) {
    const s = byId.get(id);
    if (!s) throw new Error(`mascot-runtime: unknown state "${id}"`);
    const tgt = composeTarget(s, { ...neutral }, mirror);
    const d = zero();
    if (s.anim) s.anim(te, d, te);
    const dm = mirror ? mirrorInto(d, zero()) : d;
    const res = {};
    for (const c of channels) res[c] = multiplicative.includes(c) ? tgt[c] * (1 + dm[c]) : tgt[c] + dm[c];
    return res;
  }

  /** Apply a pose object directly (preview sliders, sheet mode). The next update() eases from it. */
  function applyPose(pose) {
    Object.assign(p, pose);
    adapter.apply({ ...neutral, ...pose }, { props: propVis, mirrored, time, stateId: current.state.id });
  }

  return {
    update, setState, react, setPointer, poke, setMirror, freeze, seek, poseAt, applyPose,
    get state() { return current.state.id; },
    get time() { return time; },
    get mirrored() { return mirrored; },
    channels: () => ({ ...p }),
    states: () => states.map(({ id, label, trigger, notes, props }) => ({ id, label, trigger, notes, props })),
    handPresets: () => ({ ...handPresets }),
  };
}

/**
 * The five must-have states every brand keeps (present, greeting, approval, success, failure),
 * written with per-part fallbacks so they work for any subset of parts. The values are neutral
 * starting points, not any character's; tune them in the preview. Pass through resolveStates().
 */
export const MUST_HAVE_STATES = [
  { id: 'idle', label: 'Idle', trigger: 'Default; nothing else is happening',
    variants: [{ requires: [], pose: {}, anim: (te, p) => { p.squash += 0.012 * Math.sin(te * 2.2); } }] },
  { id: 'wave', label: 'Wave', trigger: 'First paint (greet once per visit)',
    variants: [
      { requires: ['arms'], pose: { armOutR: 2.5, armFwdR: 0.3 }, anim: (te, p) => { p.armOutR += 0.09 * Math.sin(te * 9); } },
      { requires: ['appendages'], pose: { sway: 0.2 }, anim: (te, p) => { p.sway += 0.12 * Math.sin(te * 7); } },
      // no arms, no appendage: tilt toward the visitor and hop twice
      { requires: [], pose: { tilt: -0.08 }, anim: (te, p) => { p.jump += te < 1.2 ? 0.08 * Math.abs(Math.sin(te * 5.2)) : 0; } },
    ] },
  { id: 'happy', label: 'Happy', trigger: 'Hover or focus on the primary button',
    variants: [
      { requires: ['eyes'], pose: { eyesHappy: 1, jump: 0.03 }, anim: (te, p) => { p.jump += 0.02 * Math.abs(Math.sin(te * 5)); } },
      { requires: [], pose: { jump: 0.04, squash: 1.03 }, anim: (te, p) => { p.jump += 0.03 * Math.abs(Math.sin(te * 5)); } },
    ] },
  { id: 'success', label: 'Success', trigger: 'Form sent; a task completed', props: ['tick'],
    variants: [
      { requires: ['arms'], pose: { armOutL: 2.4, armOutR: 2.4 }, anim: (te, p) => { p.jump += 0.06 * Math.abs(Math.sin(te * 4)); } },
      { requires: [], pose: {}, anim: (te, p) => { p.jump += 0.08 * Math.abs(Math.sin(te * 4)); p.squash += 0.04 * Math.sin(te * 8); } },
    ] },
  { id: 'error', label: 'Error', trigger: 'Send failed; 404',
    variants: [
      { requires: ['eyes'], pose: { pitch: 0.12, lookY: -0.6, follow: 0, squash: 0.97 }, anim: (te, p) => { p.yaw += 0.04 * Math.sin(te * 1.3); } },
      { requires: [], pose: { pitch: 0.14, squash: 0.95 }, anim: (te, p) => { p.yaw += 0.04 * Math.sin(te * 1.3); } },
    ] },
];
