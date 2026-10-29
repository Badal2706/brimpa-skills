---
name: knowledge-base
description: Look up and maintain Brimpa's curated knowledge notes (facts, formulas, checklists, tool catalogs, dated research findings) stored in this repo's knowledge/ folder, and process new material into them. Use whenever the user asks a factual question that the notes may already answer (property or rental-yield maths, what a free Cloudflare account covers, free LLM inference endpoints, hospital-system modules, caching strategy, which open-source tool to use, current SEO/DPDP/security facts), says "check our notes", "add this to the knowledge base", "process the inbox", shares a screenshot, Instagram or YouTube link, PDF or article "for later", or is building a local AI/RAG project that should ingest this knowledge. Also use to decide whether new material should become a note here or a procedure in a skill. Not for general web research when the notes are silent; say so and offer to research and file the result.
license: MIT
metadata:
  author: Brimpa
  version: "1.2"
  updated: "2026-10-30"
compatibility: Video intake needs ffmpeg and faster-whisper (pip install faster-whisper); a CUDA GPU is used when present. YouTube/Instagram intake needs yt-dlp.
---

# Knowledge base

The `knowledge/` folder at the repo root holds facts, not procedures: formulas, checklists, catalogs, dated research findings with citations. Skills say how to do a job; notes say what is known. This skill is the librarian: find the right note fast, keep notes trustworthy, and turn incoming material (screenshots, links, PDFs) into notes or skills without losing the source.

## How to run this

**Lookup**
1. Open `knowledge/INDEX.md` (one line per note: topic, title, file, tags, confidence, date). If it is missing or stale, run `python scripts/knowledge_index.py`.
2. Pick the one or two notes whose topic or tags match; read them in full. Do not read the whole folder.
3. Answer from the note, quoting its `confidence` and `date` when they matter ("medium confidence, from a social post in Aug 2026"). If the note is silent or older than the question needs, say so, research, and file the result (see Intake).

**Intake** (user shares material or says "process the inbox")
1. Collect the raw items: files in `knowledge/inbox/`, links in the message, pasted text.
2. Extract the content: screenshots and images with the Read tool; web pages with WebFetch; PDFs page by page; YouTube with yt-dlp auto-captions (`yt-dlp --skip-download --write-auto-subs --sub-langs en`; YouTube rate-limits after about 15 caption pulls in a row, so space them). For any local video file (mp4, mov, mkv, webm, downloaded reels and lectures), run `scripts/video_digest.py <file>`: it writes scene-change keyframes plus a timestamped Whisper transcript and `digest.md`; then read the digest, look at the frames, and read the transcript. Hindi, English and Hinglish are detected automatically; Hindi keeps its Devanagari transcript and also gets an English translation (`transcript_en.md`). Use `--model large-v3` for the best Hindi, `medium` (default) for speed, `--max-frames` to control how many frames to read. Instagram reels: `yt-dlp <reel url>` downloads public reels (some need `--cookies-from-browser chrome`), then run the digest; on-screen text in a reel is often clearer from a screenshot.
   - If the digest says `Audio: no`, the frames are the whole source: capture the on-screen text from every keyframe and say in the note that there was no speech.
   - If a name, repo, URL or number is unreadable in the keyframes, pull extra frames around its timestamp and tile them before guessing: `ffmpeg -ss <T> -t 8 -i <video> -vf fps=2,scale=540:-1 <out>/zoom_%02d.png`. A name that stays unreadable is written as unreadable, never inferred.
   - If transcript segments look truncated or repeat, re-run Whisper on that span (cut it with `ffmpeg -ss <T> -t <len>` and digest the clip) rather than filling the gap.
   - Hindi: Claude reads Devanagari directly, so `--no-translate` skips the English translation pass and saves time; the script already uses `condition_on_previous_text=False` and a short temperature ladder (0.0, 0.2, 0.4) for speed.
   - On this Windows machine (checked 2026-10-30) faster-whisper is installed in the user site-packages, so `python -I` cannot import it: run the digest with `python -P scripts/video_digest.py <file>` (still keeps the current folder off the import path) or plain `python`, and set `PYTHONIOENCODING=utf-8` so Devanagari prints on the console.
3. Classify each item: **procedure** (steps someone follows to produce something) -> extend the matching skill, or propose a new skill if it is a coherent, repeatable job; **knowledge** (facts, formulas, lists, tool pointers, research findings) -> a note; **mixed** -> split; **noise** (ads, personal receipts, unrelated) -> drop and say why.
4. Write or extend the note using the format in `knowledge/README.md`: frontmatter with title, topic, tags, source, source_type, confidence, date; sections "The point in one line", details, example, caveats, related. Rewrite in plain words; never paste copyrighted paragraphs or account handles; label every number with its source.
5. Prefer extending an existing note over creating a near-duplicate. One topic per file.
6. Run `python scripts/knowledge_index.py`, delete the processed raw files from the inbox, and report what went where.

**Verification pass** (when a note's `confidence` is medium or low and the answer matters)
- Check the primary source (vendor pricing page, official docs, the paper), update the note, raise or lower `confidence`, set `date`.

## Note format (summary)

```
---
title: <specific, searchable>
topic: <area>/<subarea>        # e.g. finance/real-estate, infra/cloudflare
tags: [..]
source: <where it came from, when, and whether it was rewritten>
source_type: social | video | pdf | paper | docs | own
confidence: high | medium | low
date: YYYY-MM-DD
---
```

Topics in use: `finance/*`, `infra/*`, `ai/*`, `backend/*`, `domains/*` (industry requirement lists such as hospital modules), `dev-tools/*`, `research/*` (dated, cited findings such as SEO, DPDP, security and web-psychology research), `web-psychology/*`.

## For a local AI / RAG project

- Chunk by file; use the frontmatter as metadata filters. Rebuild embeddings when `INDEX.md` changes.
- Put `confidence` and `date` into the prompt context so the model hedges correctly.
- Skills under `skills/` are also ingestible: `SKILL.md` describes the procedure; `references/` hold the detail. Index them separately from notes so retrieval can prefer procedures for "how do I" questions and notes for "what is" questions.

## Worked examples

- **"Is this flat worth 35 lakh if it rents for 10k?"** -> `knowledge/finance/real-estate-rental-yield.md`: 3.43% gross yield; explain how to read it; note it ignores appreciation and costs.
- **"Can I run a clinic site free on Cloudflare?"** -> `knowledge/infra/cloudflare-free-tier.md`: Pages + Workers + D1 + Turnstile + Access + Email Routing, with the caveats about limits.
- **User drops five Instagram screenshots in the inbox.** Transcribe each; two are security checklists (procedure -> already covered in security-review; add any new item there), one is a formula (note), two are ads (drop). Report the mapping.
- **"What changed in Google Search this year?"** -> `knowledge/research/2026-10-seo-dpdp-facts.md` (dated Oct 2026); if the question is newer than the note, research and update.

## Anti-patterns

- Answering from memory when a note exists, or citing a note without its confidence and date.
- Filing a procedure as a note (it belongs in a skill) or padding a skill with facts that belong in a note.
- Keeping the raw screenshot or PDF after its content is captured, unless it is usable on its own (a template, a form, a licensed asset).
- Copying social-media text verbatim or keeping creator handles.

## Related skills

Procedures live in the other skills of this repo; the web-psychology research behind `luxury-web-design` is mirrored under `knowledge/research/` so a local model can use it without the skill.
