---
title: Frontend interaction patterns - file uploads that feel safe, debounce vs throttle, and why payments need idempotency not just throttling
topic: frontend/patterns
tags: [ux, uploads, drag-and-drop, progress, retry, debounce, throttle, idempotency, payments, performance]
source: Two reels (Aug 2026): an English UX-engineering reel on upload flows and a Hindi frontend-system-design reel on debounce and throttle; rewritten and corrected from standard practice (MDN XMLHttpRequest upload progress, tus resumable-upload protocol, payment-gateway idempotency docs)
source_type: video
confidence: medium
date: 2026-10-30
---

# Uploads, debounce, throttle

## The point in one line
An upload must answer back at every stage (hover, progress, failure, success) and never make the user start over; debounce waits for the user to stop, throttle limits how often something runs, and neither one prevents a double payment on its own.

## Details

### Upload flow checklist
1. **Drop zone reacts before the drop:** border change, highlight/glow, copy changes to "Release to upload" (three signals on dragenter/dragover). Keep a click-to-browse button and keyboard access.
2. **Honest progress, not a spinner:** percent plus time or size left, so users can decide to wait or leave. Use `XMLHttpRequest.upload.onprogress` (fetch has no portable upload-progress event) or the storage SDK's progress callback.
3. **Failure never restarts from zero:** inline retry that keeps the file selected; for large files use chunked or resumable uploads (tus protocol, S3/R2 multipart) so a failure at 90% resumes at 90%.
4. **Proof of the right file:** thumbnail (or file-type icon), name, type and size after selection, with a remove/replace control.
5. **Many files:** each file gets its own progress bar, error and retry; one failure never blocks the others; show an overall count ("7 of 10 uploaded").
6. Validate type and size on the client for speed and again on the server for safety (content sniffing, size cap, malware scan for clinics accepting reports).

### Debounce vs throttle
| | Debounce | Throttle |
|---|---|---|
| Rule | Run once after input stops for N ms | Run at most once per N ms |
| Typical N | 250-500 ms for search | 100-200 ms for scroll/resize; 1-2 s for repeat clicks |
| Use for | search-as-you-type, autosave, resize end, validation | scroll/resize handlers, mousemove, analytics pings, rate-limited buttons |
| Memory hook | "debounce waits" | "throttle makes you wait" |
Typing a 10-letter query with no debounce fires up to 10 requests; with a 300-500 ms debounce it is usually 1-2. Also cancel the in-flight request when a new one starts (AbortController) so late responses cannot overwrite newer results.

### Payments and double submits
Throttling the pay button helps UX but is not a guarantee (double taps across tabs, retries on flaky networks, back button). Do all three: disable the button and show progress on first tap; send an idempotency key / unique order id with the request; make the server and the gateway (Razorpay, Stripe, PhonePe order ids) reject or merge duplicates.

## Example
Patient-report upload in a clinic portal: drop zone highlights with "Release to upload report"; each PDF shows a thumbnail, "2.4 MB of 6.1 MB, about 8 s left"; network drop at 70% shows "Upload paused - Retry" and resumes from 70%; one rejected 40 MB file shows "Too large (max 20 MB)" while the other files finish.

## Caveats
- The 500 ms and 2 s values are typical, not standards; tune per input (shorter for local filtering, longer for expensive APIs).
- Debounce adds perceived lag; show immediate local feedback (the typed text, a subtle loading state) while waiting.

### What the source got wrong
- "These two patterns reduce server load by 90% and save companies lakhs": illustrative, not measured; savings depend on traffic.
- "Instagram search uses a 500 ms debounce" and "PhonePe throttles the pay button for 2 s": plausible examples, not documented by those companies.
- Throttle alone "ensures only one transaction": false; idempotency on the server is what guarantees one charge.

## Related
- skills/ui-ux/references/app-patterns.md (search debounce, idempotent submits)
- skills/security-review (upload validation)
