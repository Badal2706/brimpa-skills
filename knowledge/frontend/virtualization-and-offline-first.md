---
title: Long lists and flaky internet - list virtualization (windowing) and offline-first apps (service worker cache + IndexedDB queue + sync)
topic: frontend/patterns
tags: [performance, virtualization, windowing, infinite-scroll, react, tanstack-virtual, content-visibility, offline-first, pwa, service-worker, indexeddb, background-sync, clinic, dpdp]
source: Two reels (Aug 2026) - a Hindi explainer of virtualization/windowing for a 1000-post feed (middle 30 s re-transcribed with Whisper large-v3 after the first pass truncated it), and an English explainer of how Google Docs works offline; checked against MDN (content-visibility, Background Synchronization API, read 2026-10-30) and Google Docs offline setup guides
source_type: video
confidence: high
date: 2026-10-30
---

# Long lists and flaky internet

## The point in one line
Render only the rows on screen (virtualization) when a list has hundreds or thousands of rich items, and for apps used where the internet drops (clinic front desks, field staff) cache the app shell with a service worker and queue writes in IndexedDB, syncing when the connection returns.

## 1. List virtualization (windowing)
**Problem:** rendering 1,000 feed posts or patient rows creates thousands of DOM nodes; scrolling and typing lag even though the data arrived fine.

**How it works (the reel's steps):**
1. Keep all data in memory (the API may return 1,000 or 10,000 items).
2. Read the scroll position: with 200 px rows and `scrollTop` = 4,000 px, the first visible row is 4,000 / 200 = row 20.
3. Compute the visible range: viewport 800 px / row 200 px = 4 rows visible; render those plus a buffer (overscan) above and below, about 6 in total.
4. Create one tall "fake" container whose height equals the whole list (row count x row height), so the scrollbar behaves as if everything were loaded, and position the rendered rows absolutely (or with a transform) at their true offsets inside it.
5. As the user scrolls, rows entering the window mount and rows leaving unmount; keep one or two extra rows mounted so a quick reverse scroll does not flash blank.

**Rule of thumb from the reel (correct):** virtualization optimises the DOM, not the data. Fetching 10,000 items is still slow and memory-heavy; combine it with pagination or cursor-based infinite loading.

**Tools (the reel named react-window, react-virtualized and, misheard as "10-step virtualization", TanStack Virtual):** TanStack Virtual (React, Vue, Solid, Svelte), react-window / react-virtuoso (React; virtuoso handles variable heights and chat-style reverse lists well). Variable row heights need measurement (`measureElement` in TanStack Virtual).

**Cheaper first step:** CSS `content-visibility: auto` with `contain-intrinsic-size: auto 500px` on each row or section lets the browser skip rendering off-screen content while keeping it in the DOM, find-in-page and the accessibility tree (MDN: Baseline 2024, newly available since Sept 2024). Good for a few hundred rows; real virtualization for thousands.

**Costs of true virtualization:**
- Ctrl+F cannot find rows that are not mounted; provide an in-app search box.
- Screen readers see only mounted rows; set `aria-rowcount`/`aria-rowindex` (tables) or `aria-setsize`/`aria-posinset` (lists).
- Content not in the DOM is invisible to crawlers; never virtualize SEO content on public pages.
- Keyboard focus can be lost when a focused row unmounts; keep the focused row mounted.

**When to use it at Brimpa:** patient lists, appointment history, lab results, inventory or audit logs that can exceed a few hundred rows on one screen. Under about 100-200 simple rows, plain pagination is simpler and better.

## 2. Offline-first (how Google Docs keeps working without internet)
**Pieces:**
1. **Service worker**: a script the browser installs that sits between the page and the network like a small proxy. On first visit it caches the app shell (HTML, JS, CSS, fonts); later loads come from the cache, so the app opens instantly with no network.
2. **IndexedDB**: the browser's structured database (much larger and richer than localStorage). Edits are written there first, with a local queue of pending changes and timestamps.
3. **Sync**: when the connection returns, pending changes are sent to the server in order. In Chromium browsers the Background Sync API can wake the service worker to do this even if the tab closed; Firefox and Safari do not support it (MDN: "Limited availability", not Baseline), so the app must also sync on the `online` event and on next open.
4. **Conflict handling**: two people editing the same record offline need a rule: last-write-wins with a timestamp (simple, loses data), field-level merge, or CRDTs/operational transforms (what collaborative editors use; libraries such as Yjs, Automerge).
This pattern (installable, cache-first, works offline) is the core of a Progressive Web App.

**For clinic and hospital apps:**
- Good fit: front-desk registration, queue tokens, vitals entry, pharmacy billing drafts during an outage; show a clear "offline - 3 changes waiting to sync" banner.
- Do not cache what must be live: appointment slot availability, payments, stock counts used for dispensing; block or mark them as stale offline.
- Patient data stored in the browser is personal (often sensitive) data under DPDP: store the minimum, clear it on logout, avoid shared-PC persistence, and consider encrypting the IndexedDB store with a key held in memory. Service-worker caches must never hold authenticated API responses for another user on a shared machine.
- Use Workbox (Google) for caching strategies instead of hand-writing them.

## Caveats
- Library names and browser support as of 2026-10-30; re-check MDN compatibility tables before promising Safari behaviour.

## What the source got wrong
- Virtualization reel: "virtualization and windowing" are presented as two concepts; in practice they are the same technique (windowing is how virtualization is implemented). The numbers (800 px viewport, 200 px row, 4 visible + buffer = 6 rendered) are illustrative, not a rule; the diagram on screen showed 10 DOM nodes for 1,000 posts.
- The "giant container" example says 200 px posts produce an 8,000 px scroll area; for the reel's own 1,000 posts it would be 1,000 x 200 = 200,000 px. The container height is row count x row height, whatever the viewport.
- "react-virtualization" is react-virtualized (older, largely superseded by react-window and TanStack Virtual).
- Offline reel: "if I open Google Docs with the internet off it opens" holds only after offline access is turned on (Chrome, the Google Docs Offline extension and the Drive setting; files must have been opened or marked available offline). It is not automatic for every user.
- "The service worker kicks in and syncs when internet comes back" is only automatic with Background Sync in Chromium; elsewhere the app's own code must trigger the sync.
- "Stores every keystroke and mouse movement": Docs stores document operations, not mouse movement.
- "Spotify web does the same with music": offline music downloads are a Premium feature of the desktop and mobile apps; the web player does not offer offline playback. Treat as unverified at best.

## Related
- frontend/upload-debounce-throttle-patterns.md
- backend/postgres-replaces-extra-services.md (LISTEN/NOTIFY for live updates)
- domains/hospital-management-modules.md
- skills/ui-ux (harden step: 0 and 1000+ items, offline errors)
