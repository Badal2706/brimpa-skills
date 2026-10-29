---
title: Task-specific "decision" models instead of a chat LLM - TypeSafe Jev (classify/score) and ScaleDown CDMs (classify, extract, summarize), with when to use them
topic: ai/inference
tags: [llm, classification, extraction, structured-output, constrained-decoding, jev, typesafe, scaledown, cdm, cost, latency, dpdp, clinic]
source: Hindi explainer reel "first LLM, then Jev, now CDMs" (Oct 2026); checked against InfoQ's Jev release report (1 Oct 2026), an ibl.ai critique of ScaleDown CDMs, LangChain's ScaleDown integration post (13 Oct 2026, as summarised), and independent reviews (beri.net, ai.plainenglish.io), read 30 Oct 2026
source_type: video
confidence: medium
date: 2026-10-30
---

# Task-specific decision models (Jev, CDMs)

## The point in one line
When an app only needs a label, a score or a few fields from a document, a small task model that returns typed output (with probabilities) is cheaper and faster than asking a chat LLM to write an answer; but "valid format" is not "correct value", so you still need thresholds, a fallback and an evaluation set.

## What exists (Oct 2026)
| Model | Maker | Does | Output | Price / speed (vendor figures) |
|---|---|---|---|---|
| **Jev** (first of its "System One" models) | TypeSafe AI (San Francisco), launched about mid-Sep 2026 | classification, routing, scoring: you send a state (text or structured data) plus typed questions, all answered in one pass | Choice / Score answers with a probability distribution and a confidence value | $0.042 per million input tokens, output free; 70-500 ms (users report a median of about 76 ms); 32k context; via Vercel AI Gateway, Netlify, a LangChain integration; pin a version (e.g. `jev-1.13.0`) |
| **CDMs** ("constrained decoding models"): Classify, Extract, Summarize | ScaleDown, launched 13 Oct 2026 with LangChain middleware | Classify: scores over a fixed label set. Extract: returns spans from the input with character offsets and confidence. Summarize: abstractive summary | typed / JSON | $0.05 per million input tokens, output free; up to 1M input tokens per call; also on OpenRouter and LiteLLM; hosted at api.scaledown.xyz, licensed self-hosted containers exist |

## When to use one (rules we keep)
- **Good fit:** spam or abuse filters, routing a WhatsApp or web enquiry to the right department, tagging tickets, triaging form submissions, pulling invoice number/amount/date from bills, consistent summaries of long PDFs.
- **Keep the LLM for:** anything that must write prose for a person, reason across steps, do arithmetic or date comparison (Jev's own docs say to keep maths in code), or generate code.
- **Act on the probability.** Pick a threshold per label from your own labelled sample; above it, automate; below it, send to a person or to a bigger model. One review found Jev's probabilities over-confident on some question types and under-confident on others, so a single global threshold is wrong.
- **Extraction with offsets is the useful part:** it lets the UI highlight where a value came from, which makes human review fast.
- **Benchmark on 50-200 of your own examples** against your current LLM prompt before switching; vendor speed and cost ratios (200x faster, 467x cheaper) compare against frontier chat models, and users report much smaller real gains (median about 7x faster, 30x cheaper for Jev).
- **Prompt injection still applies:** text inside the input measurably shifts Jev's probabilities. Treat user text as data, and guard decisions that move money or data (see skills/llm-app-security).
- **Health and personal data:** both are hosted US APIs by default. Patient notes, prescriptions or IDs from a Brimpa clinic client must not go there without DPDP notice, a processor agreement and a cross-border check (skills/dpdp-legal-compliance); prefer de-identified text or a self-hosted option.

## Free local alternative
GLiNER-family models (Apache-2.0, run locally) do zero-shot entity extraction and classification; ScaleDown's own benchmark shows them close on extraction. Worth testing first for anything with patient data.

## Caveats
- Both products are weeks old; prices, names and access (Jev may still be early access) will change.
- Performance figures are vendor-reported or from small independent tests.

## What the source got wrong
- "CDMs are a new kind of model": constrained decoding is an established technique (restricting tokens to a grammar or schema); the critique notes only Classify and Extract avoid token-by-token generation. Summarize is an ordinary generative model.
- "200 times faster than a frontier model" is the company's claim (the reel does say so); independent users see far smaller gains, and a structured answer can still be wrong.
- "Jev never writes, just decides" is right, but it can return a confident wrong valid value; the reel skips that a threshold and fallback are needed.

## Related
- ai/free-inference-endpoints.md
- skills/llm-app-security, skills/dpdp-legal-compliance
- integrations/whatsapp-api-options.md (routing incoming messages is a classic classify job)
