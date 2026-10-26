# knowledge/

Plain-markdown notes that are facts, formulas, checklists and references rather than procedures. Skills tell an agent *how* to do a job; this folder holds *what is known*. It is meant to be read by Claude through the `knowledge-base` skill and to be embedded as-is into a local model's retrieval index.

## Note format

One topic per file, YAML frontmatter, then short sections. Keep each note self-contained so a retrieval system can return it alone.

```markdown
---
title: Rental yield: is a property worth its price
topic: finance/real-estate
tags: [real-estate, formula, india, investment]
source: Instagram comment on a property-pricing reel (2026-08), rewritten
source_type: social        # social | video | pdf | paper | docs | own
confidence: medium         # high = verified against a primary source; medium = plausible, single source; low = unverified
date: 2026-10-26
---

# Title

## The point in one line
## Details / formula / checklist
## Example
## Caveats
## Related
```

Rules:
- Numbers carry their source and date. Anything from a social post is `confidence: medium` at best until verified.
- No marketing, no account handles, no copied paragraphs; rewrite in your own words.
- Prefer one longer note per topic over many fragments; append to an existing note before creating a new one.
- `INDEX.md` is generated. Run `python scripts/knowledge_index.py` after adding or editing a note.

## Intake (screenshots, links, PDFs)

1. Drop raw material into `knowledge/inbox/` (screenshots, a `.txt` with links, PDFs). The folder is git-ignored except for its README.
2. Ask Claude to process the inbox with the `knowledge-base` skill. It transcribes or fetches, decides whether the content is a **procedure** (becomes or extends a skill) or **knowledge** (becomes or extends a note), writes it, records the source, and deletes the raw file.
3. Review the diff; commit.

What Claude can read directly:
- **Local video files** (mp4, mov, mkv, webm): `python skills/knowledge-base/scripts/video_digest.py <file>` extracts scene-change keyframes and a timestamped Whisper transcript (Hindi, English or Hinglish, auto-detected; Hindi also gets an English translation). Tested on this machine's RTX 3050 with the `medium` model: a 75-second English talk took 26 seconds end to end (including the first-run model load), transcript accurate. Hindi accuracy is best with `--model large-v3`.
- **YouTube**: auto-captions via yt-dlp, or download and run the digest.
- **Instagram reels**: yt-dlp downloads public reels (some need browser cookies), then the digest. On-screen text is often clearer from a screenshot.
- **Web pages** and **PDFs**: fetched or read page by page.

For a folder of downloaded videos, drop them in `knowledge/inbox/` (git-ignored) and ask Claude to process the inbox; it runs the digest on each, writes or extends notes, and deletes the raw video once captured.

## Using these notes with a local model

- Chunk by file; the frontmatter is the metadata (filter by `topic`, `tags`, `confidence`, `date`).
- Rebuild embeddings when `INDEX.md` changes.
- Treat `confidence: low` notes as hints, not facts, in prompts.
