/**
 * mount-worker.js - mount a mascot engine in a Web Worker on an OffscreenCanvas, with a
 * main-thread fallback, a first-frame swap from a still image, and pausing when hidden.
 *
 * Part of the mascot-3d skill (brimpa-skills, MIT). Written fresh from references/integration.md
 * (section 3); it contains no character data. One file serves both sides:
 *   page:    import { mountMascot } from './mount-worker.js';
 *   worker:  import { serveMascotWorker } from './mount-worker.js';
 *            import { createEngine } from './engine.js';
 *            serveMascotWorker(createEngine);
 * Nothing touches window or document at import time, so the worker can import this file.
 *
 * Why a worker: a procedural mascot's geometry build took about 2 s on a desktop on a previous
 * production mascot, which became about 13 s of main-thread blocking under Lighthouse's
 * simulated mobile CPU and cost about 30 performance points. In a worker the page stays at zero
 * total blocking time. Start with the worker; do not retrofit it.
 *
 * Engine contract (your code; the same factory runs in the worker and on the main thread)
 *   createEngine({ canvas, width, height, dpr, dark, reducedMotion, state, onState, onFrame })
 *     -> handle | null (null = WebGL unavailable)
 *   handle: resize(w, h, dpr), setVisible(bool), setDark(bool), pointer(x, y), setState(id),
 *           react(id, seconds), dispose()
 *   The engine touches no DOM: it gets sizes and pointer positions from this module. With three.js
 *   on an OffscreenCanvas call renderer.setSize(w, h, false): updateStyle must be false, because an
 *   OffscreenCanvas has no style. Call onFrame() after every render; only the first is forwarded.
 *   Pause the render loop on setVisible(false) (rAF exists in dedicated workers in current
 *   Chromium and Firefox; fall back to setTimeout where it does not).
 *
 * Protocol (plain messages)
 *   page -> worker: init, resize, visible, dark, pointer, setState, react, dispose
 *   worker -> page: ready, failed, state, frame
 *
 * First-frame swap: the still <img> stays visible and the canvas stays hidden until the first
 * real frame exists; then `liveClass` is added to `root` (CSS hides the stills). On failure
 * nothing changes and the still stays. Suggested CSS:
 *   [data-mascot-canvas] { opacity: 0; }
 *   .mascot-live [data-mascot-canvas] { opacity: 1; }
 *   .mascot-live [data-mascot-still] { visibility: hidden; }
 * CSP: a worker from the bundle or a blob needs worker-src 'self' blob:.
 */

// =============================================================================== page side

/**
 * @param {object} o
 *   canvas        the <canvas> to render into (marked data-mascot-canvas)
 *   box           element whose size the mascot fills (default: canvas.parentElement)
 *   root          element that receives liveClass (default: document.documentElement)
 *   workerUrl     URL of the worker entry (module worker). Omit to force the main thread.
 *   loadEngine    async () => createEngine, for the main-thread path (lazy import)
 *   state         initial state id (default 'idle')
 *   dprCap        device pixel ratio cap (1.5-2; default 1.75)
 *   liveClass     default 'mascot-live'
 *   fallbackOnFail  if the worker fails, retry on the main thread with a fresh canvas (default
 *                   false: keep the still, which is the safer default on weak devices)
 *   onState, onLive, onFail  callbacks
 * @returns handle { mode, setState, react, setDark, dispose } (same shape on both paths)
 */
export function mountMascot(o) {
  const { workerUrl, loadEngine, state = 'idle', dprCap = 1.75, liveClass = 'mascot-live',
    fallbackOnFail = false, onState, onLive, onFail } = o;
  let canvas = o.canvas;
  const box = o.box || canvas.parentElement;
  const root = o.root || document.documentElement;
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const darkQuery = matchMedia('(prefers-color-scheme: dark)');
  let dark = o.dark ?? darkQuery.matches;

  const canWorker = !!workerUrl && typeof Worker !== 'undefined' && typeof OffscreenCanvas !== 'undefined'
    && 'transferControlToOffscreen' in HTMLCanvasElement.prototype;

  let send = () => {};          // filled by the chosen path
  let teardownPath = () => {};
  let live = false;
  let disposed = false;
  const handle = { mode: 'none', setState, react, setDark, dispose };

  const size = () => {
    const r = box.getBoundingClientRect();
    return { width: Math.max(1, Math.round(r.width)), height: Math.max(1, Math.round(r.height)),
      dpr: Math.min(devicePixelRatio || 1, dprCap) };
  };

  function goLive() {
    if (live || disposed) return;
    live = true;
    root.classList.add(liveClass); // the still is hidden exactly once, and only after a real frame
    onLive && onLive(handle.mode);
  }

  function fail(reason) {
    teardownPath();
    if (fallbackOnFail && handle.mode === 'worker' && loadEngine) {
      // A transferred canvas cannot be used on the main thread again: swap in a fresh one.
      const fresh = canvas.cloneNode(false);
      canvas.replaceWith(fresh);
      canvas = fresh;
      startMain();
      return;
    }
    handle.mode = 'failed';
    onFail && onFail(reason);       // nothing else: the still stays
  }

  // ---- worker path
  function startWorker() {
    handle.mode = 'worker';
    let worker;
    try {
      worker = new Worker(workerUrl, { type: 'module' });
    } catch (e) { fail(String(e)); return; }
    const off = canvas.transferControlToOffscreen();
    worker.onmessage = (e) => {
      const m = e.data || {};
      if (m.type === 'frame') goLive();
      else if (m.type === 'state') onState && onState(m.id);
      else if (m.type === 'failed') fail(m.reason || 'worker reported failure');
      // 'ready' needs no action: wait for the first frame before swapping the still
    };
    worker.onerror = (e) => { e.preventDefault?.(); fail(e.message || 'worker error'); };
    send = (msg) => worker.postMessage(msg);
    worker.postMessage({ type: 'init', canvas: off, ...size(), dark, reducedMotion, state }, [off]);
    teardownPath = () => { try { worker.postMessage({ type: 'dispose' }); } catch {} worker.terminate(); send = () => {}; };
  }

  // ---- main-thread path (no OffscreenCanvas, or forced)
  async function startMain() {
    handle.mode = 'main';
    try {
      const createEngine = await loadEngine();
      if (disposed) return;
      const engine = createEngine({ canvas, ...size(), dark, reducedMotion, state,
        onState: (id) => onState && onState(id), onFrame: goLive });
      if (!engine) { fail('WebGL unavailable'); return; }
      send = (m) => route(engine, m);
      teardownPath = () => { engine.dispose(); send = () => {}; };
    } catch (e) { fail(String(e)); }
  }

  // ---- shared observers: size, visibility, pointer, theme
  const ro = new ResizeObserver(() => send({ type: 'resize', ...size() }));
  ro.observe(box);

  let onScreen = true;
  const pushVisible = () => send({ type: 'visible', value: onScreen && document.visibilityState === 'visible' });
  const io = new IntersectionObserver((entries) => {
    onScreen = entries.some((en) => en.isIntersecting);
    pushVisible();
  });
  io.observe(box);
  document.addEventListener('visibilitychange', pushVisible);

  let pendingPointer = null;
  let rafId = 0;
  const onPointer = (e) => {
    const r = box.getBoundingClientRect();
    const cx = r.left + r.width / 2, cy = r.top + r.height / 2;
    // -1..1 around the mascot, clamped; y up. Scale by viewport so far-away pointers saturate.
    pendingPointer = {
      x: Math.max(-1, Math.min(1, (e.clientX - cx) / (innerWidth / 2))),
      y: Math.max(-1, Math.min(1, -(e.clientY - cy) / (innerHeight / 2))),
    };
    if (!rafId) rafId = requestAnimationFrame(() => { rafId = 0; send({ type: 'pointer', ...pendingPointer }); });
  };
  addEventListener('pointermove', onPointer, { passive: true });

  const onScheme = (e) => { if (o.dark === undefined) setDark(e.matches); };
  darkQuery.addEventListener('change', onScheme);

  function setState(id) { send({ type: 'setState', id }); }
  function react(id, seconds = 2) { send({ type: 'react', id, seconds }); }
  function setDark(value) { dark = !!value; send({ type: 'dark', value: dark }); }
  function dispose() {
    if (disposed) return;
    disposed = true;
    teardownPath();
    ro.disconnect(); io.disconnect();
    document.removeEventListener('visibilitychange', pushVisible);
    removeEventListener('pointermove', onPointer);
    darkQuery.removeEventListener('change', onScheme);
    if (rafId) cancelAnimationFrame(rafId);
  }

  if (canWorker) startWorker();
  else if (loadEngine) startMain();
  else fail('no worker support and no loadEngine');
  return handle;
}

// =============================================================================== worker side

/**
 * Call once in the worker entry with your engine factory. Translates protocol messages into
 * engine calls and reports ready / failed / state / frame.
 */
export function serveMascotWorker(createEngine) {
  let engine = null;
  let framed = false;
  self.onmessage = (e) => {
    const m = e.data || {};
    if (m.type === 'init') {
      try {
        engine = createEngine({
          canvas: m.canvas, width: m.width, height: m.height, dpr: m.dpr, dark: m.dark,
          reducedMotion: m.reducedMotion, state: m.state,
          onState: (id) => self.postMessage({ type: 'state', id }),
          onFrame: () => { if (!framed) { framed = true; self.postMessage({ type: 'frame' }); } },
        });
        self.postMessage(engine ? { type: 'ready' } : { type: 'failed', reason: 'WebGL unavailable in worker' });
      } catch (err) {
        self.postMessage({ type: 'failed', reason: String(err && err.message || err) });
      }
      return;
    }
    if (!engine) return;
    if (m.type === 'dispose') { engine.dispose(); engine = null; self.close(); return; }
    route(engine, m);
  };
  // An exception escaping the engine's own loop: report it so the page keeps the still.
  self.addEventListener('error', (ev) => self.postMessage({ type: 'failed', reason: ev.message }));
}

// =============================================================================== shared

function route(engine, m) {
  switch (m.type) {
    case 'resize': engine.resize(m.width, m.height, m.dpr); break;
    case 'visible': engine.setVisible(!!m.value); break;   // pause rendering when hidden or off screen
    case 'dark': engine.setDark(!!m.value); break;
    case 'pointer': engine.pointer(m.x, m.y); break;
    case 'setState': engine.setState(m.id); break;
    case 'react': engine.react(m.id, m.seconds); break;
    case 'dispose': engine.dispose(); break;
    default: break;
  }
}
