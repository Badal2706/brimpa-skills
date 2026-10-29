---
title: Claude's text watermark (Aug 2026) - what it is, what removes it, and why "watermark remover" skills are the wrong fix
topic: ai/provenance
tags: [claude, watermark, synthid, c2pa, eu-ai-act, ai-disclosure, content, ethics]
source: Hindi reel (Aug 2026) promoting a GitHub "watermarks-remover" skill; checked against Anthropic's announcement "Claude text watermark" (anthropic.com/news, 14 Aug 2026) and the guillaumemeyer/watermarks-remover repo metadata (GitHub API, read 2026-10-30)
source_type: video
confidence: high
date: 2026-10-30
---

# Claude's text watermark

## The point in one line
Since August 2026 Claude models mark their text statistically through word choice (no hidden characters), so stripping characters does nothing, light editing does not reliably remove it, and only a genuine rewrite does; write or rewrite in your own voice instead of running "remover" tools.

## Details
- **What:** a SynthID-Text-style watermark (adapted from Google DeepMind's method). Word sampling stays random but is steered by a secret key; whoever holds the key can test how likely it is that Claude wrote a passage.
- **Scope:** Claude models launched on or after 2 Aug 2026, applied worldwide (Anthropic cannot yet scope it by region); older models are being added over the following months.
- **Why:** EU AI Act transparency obligations and the EU Code of Practice on transparency of AI-generated content (signed July 2026).
- **Not:** no added tokens, no hidden Unicode, no user or chat identifiers; Anthropic says no effect on quality, cost or speed.
- **Detection:** an API in private preview for regulators, law enforcement, media, fact-checkers, researchers, education bodies and enterprises with compliance duties. It returns a likelihood, not proof.
- **What weakens it:** a full rewrite removes it; light edits usually do not; it is weak on short passages, factual text and lightly proofread human writing; translations remain watermarked. It cannot tell "Claude wrote this" from "Claude heavily edited this".
- **Images/files:** .png, .jpg and .svg outputs get a C2PA content credential in metadata (signed, no personal data); the pixels are unchanged.
- **Ownership:** Anthropic states the watermark does not change ownership, authorship or user rights under its terms.

### The "remover" repo
guillaumemeyer/watermarks-remover (MIT, about 25.5k stars on 2026-10-30) describes itself as stripping AI watermarks "from content you own". Its layers: (A) invisible Unicode, odd spaces, tag characters; (B) statistical token-sampling watermarks, which can only be defeated by rewriting/paraphrasing the text; (Files) C2PA/EXIF/XMP/document properties. Layer A is irrelevant to Claude's text mark; layer B is paraphrasing.

## Example
A clinic blog post drafted with Claude: publishing it as-is is legal in India today. If the clinic wants it in its own voice, have the doctor or Badal rewrite it properly (facts checked, local detail added) rather than running a remover. Stripping C2PA from an AI image and presenting it as a real photo of the clinic is deceptive and, for a healthcare business, a trust and advertising-standards risk.

## Caveats
- India has no general law (as of Oct 2026) requiring disclosure of AI-written marketing text, but IT Rules amendments on synthetically generated content and platform labelling rules are moving; check before relying on that.
- Universities, publishers and some clients prohibit undisclosed AI text; removing provenance to pass AI text off as human there is misconduct regardless of the tool.
- Install any third-party skill only after reading it (see dev-tools/agent-skills-ecosystem.md).

### What the source got wrong
- Implied a skill makes Claude text undetectable "easily": the mark is in word choice, so only a real rewrite removes it, and the detection API is not public anyway.
- Framed removal as a way to avoid "getting caught"; that is a deception use case, not a hygiene one, and the repo itself limits itself to content you own.
- Did not mention images get C2PA metadata rather than a text-style mark.

## Related
- dev-tools/agent-skills-ecosystem.md (vetting third-party skills)
- skills/launch-marketing (writing copy that does not read as AI)
