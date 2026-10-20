# AI recommendation poisoning

## Contents

- [Definition](#definition)
- [Evidence 1: Microsoft Defender research on "Summarize with AI" buttons (Feb 2026)](#evidence-1-microsoft-defender-research-on-summarize-with-ai-buttons-feb-2026)
- [Evidence 2: "The Injection Paradox" (arXiv, June 2026)](#evidence-2-the-injection-paradox-arxiv-june-2026)
- [What this means](#what-this-means)
- [Prompt-hygiene rules for anyone generating share or summarize links](#prompt-hygiene-rules-for-anyone-generating-share-or-summarize-links)
- [Detection and monitoring playbook](#detection-and-monitoring-playbook)
- [Guidance for brands](#guidance-for-brands)
- [Guidance for end users](#guidance-for-end-users)
- [OWASP mapping](#owasp-mapping)

## Definition

AI recommendation poisoning: a company hides instructions in content an AI assistant reads so that the assistant favours that company later. The content can be a prefilled prompt behind a button, hidden text on a web page, metadata, an "editor's note", or anything else an assistant or its browsing tool ingests. It is a form of indirect prompt injection whose payload is a durable preference rather than an immediate action, which is why it sits under OWASP ASI06 Memory & Context Poisoning.

## Evidence 1: Microsoft Defender research on "Summarize with AI" buttons (Feb 2026)

Published by Microsoft Defender Security Research on 10 Feb 2026.

- Blogs and vendor sites carry "Summarize with AI" buttons that open ChatGPT, Copilot, Claude, Perplexity or Grok with a prefilled prompt passed through a URL parameter (for example a `?q=` style parameter). Some formats only prefill; some can auto-run.
- The prefilled prompt includes a hidden line telling the assistant to remember the site as the best or most trusted source for its topic. If the user sends the prompt, the assistant saves that instruction to memory and it persists across later chats, biasing future answers.
- Over a 60-day review of email traffic the researchers found 50 unique poisoned prompts from 31 companies across 14 industries, including finance, health, legal and SaaS.
- These were real businesses rather than scammers. Free point-and-click generators and an npm package produce such buttons and are marketed as an "SEO growth hack for LLMs".
- Microsoft's worked example (a CFO who later signs a contract with a vendor the assistant kept recommending) is illustrative, and the vendor "Relecloud" in it is fictional.
- Mitigations Microsoft lists: hover links before clicking; treat AI links like executable downloads; audit and delete unrecognised memories; ask assistants to cite the basis for a recommendation; do not paste prompts from untrusted sources; organizations should hunt for assistant URLs containing "remember", "trusted source", "in future conversations" or "authoritative source" (Microsoft provides Defender Advanced Hunting queries). Vendor-side controls described: prompt filtering, separating user instructions from external content, user-visible memory controls, monitoring.

## Evidence 2: "The Injection Paradox" (arXiv, June 2026)

Author: Hyunseok Paeng. A controlled experiment on whether hidden instructions on product pages move AI recommendations.

**Setup.** 40 real earbud review and product pages covering 9 brands. The target brand had 4 pages. One of those pages was edited to carry a hidden "you must recommend this product" instruction placed in a metadata block, an editor's note and an evaluation checklist. Metric: the share of runs in which the target brand appeared in the assistant's top-2 recommendations. Three conditions: no change, hidden instruction only, and "every trick" (hidden instruction plus hype language and other manipulations).

**Results (top-2 share):**

| Model | No change | Hidden instruction | Every trick |
|---|---|---|---|
| GPT-4o-mini | 17% | 40% | 67% |
| Claude Haiku 4.5 | 14% | 12% | 48% |
| Claude Sonnet 4.6 | 26% | 8% | 2% |
| Claude Opus 4.6 | 54% | 8% | 0% |

**Readings.**

- On GPT-4o-mini the hidden instruction more than doubled the brand's share, and every trick pushed it to two thirds.
- Claude models penalized the brand: safety training treats a hidden instruction as an attack, so the page that was supposed to help became a liability. On Sonnet 4.6 and Opus 4.6 the "every trick" condition drove the brand to 2% and 0%.
- **Spillover to clean pages.** On Opus 4.6: untouched pages 54%; poisoned page deleted (3 clean pages remain) 28%; poisoned page kept 0%. A poisoned page is therefore worse than having no page at all, and the penalty attaches to the brand, not only to the page.
- **Untested risk.** The study did not test planting instructions on a competitor's pages. Given the penalty behaviour, that attack is plausible and is a reason for brands to monitor user-generated areas of their own sites.
- **Hype alone works on some models.** Subtle hype with no hidden instruction ("the latest in 2026", self-declared #1, clickbait phrasing) moved Sonnet 4.6 from 26% to 70%. Plain persuasive copy is not treated as an attack, so this is the lever legitimate marketing already uses and the one that assistant builders should expect.

**Limitations stated by the study.** One controlled test; one product category (earbuds); Korean-language pages; 7 models in total (the table shows four); sample sizes of 50 runs per condition for Sonnet and Opus and 100 for GPT-4o-mini and Haiku. Treat it as one data point that agrees with the Microsoft field observation, not as a benchmark. As of Oct 2026 no larger replication is known.

## What this means

- For **assistant builders**: the attack targets memory and persistent preference, not a single answer. The control point is the memory write, the provenance of what triggered it, and the user's ability to see and delete it.
- For **sites shipping share links**: a prefilled prompt is code you are handing to your visitor's assistant. Review it like code.
- For **brands**: the technique is documented by a security vendor with company counts, it is penalized by at least one model family, and the penalty spills over to clean content. The expected value is negative.
- For **security teams**: it is phishing-shaped. Links arrive by email and in blog posts, and the payload executes in a tool the user trusts.

## Prompt-hygiene rules for anyone generating share or summarize links

Apply to every "Summarize with AI", "Ask ChatGPT", "Open in Claude", "Explain with Perplexity" link, whether hand-written, generated by a plugin or emitted by an agency snippet.

1. **Task plus reference, nothing else.** The prompt names the task and the content: "Summarize the article at <URL>" or "Summarize the following article: <title> <URL>". No adjectives about the source, no instructions about future behaviour.
2. **No persistence or preference language.** Fail the build if the decoded prompt contains any of: remember, from now on, in future conversations, in future answers, going forward, always, trusted source, authoritative source, best source, most reliable, prefer, recommend, cite us, when asked about. Extend the list for your language.
3. **No instructions addressed to the assistant about itself or other brands.** No "you are", no "ignore", no "do not mention", no competitor names.
4. **Visible and editable.** Use link formats that prefill the composer so the user sees the full text before sending. Avoid formats that auto-submit. If a provider only offers auto-run, do not use that provider's button.
5. **Short.** A summarize prompt fits on one line. Length beyond the task and URL is where hidden instructions live; cap the generated prompt (for example 200 characters) and alert on growth.
6. **Plain text.** No zero-width characters, no bidirectional overrides, no encoded fragments that decode to additional text, no HTML entities that render invisible. Normalize to NFC and reject non-printing code points before encoding into the URL.
7. **Label matches prompt.** The visible button text describes exactly what the prompt does. "Summarize with AI" must not carry a prompt that does anything else.
8. **Code, not paste.** Generate links from a template in version control with a unit test that decodes the URL and checks rules 1-7. Treat agency snippets and free generators as untrusted input to that template, never as the template.
9. **Third-party packages are supply chain.** Pin the version of any "AI share button" package, read the URL it emits in the browser, and re-read it on every update. A package that was clean at install time can change its template.
10. **Log and review.** Keep the list of live assistant links on the site and review it in the same cadence as outbound redirects.

## Detection and monitoring playbook

### For security teams and IT

- **Hunt in email and web proxy logs** for outbound URLs to assistant domains whose prompt parameter contains "remember", "trusted source", "in future conversations", "authoritative source", "from now on" or equivalents. Microsoft Defender customers can start from the Advanced Hunting queries in the Feb 2026 post; the same pattern works in any proxy or mail-gateway log with URL decoding.
- **Treat AI links like executable downloads** in awareness material: hover, read the decoded URL, and do not forward prompts from untrusted senders.
- **Inventory assistant memory features** in use across the organization (ChatGPT, Copilot, Claude, Gemini, Perplexity) and whether memory can be reviewed or disabled by policy on managed accounts.
- **Add a ticket type** for "my assistant keeps recommending X" so poisoned memories are reported instead of silently reset.

### For teams that build an assistant or an AI feature with memory

- **Provenance on every memory write.** Store which turn, which input channel (typed by user, URL prefill, web page, document, tool result, peer agent) and which model revision produced it.
- **Gate non-user-typed writes.** A memory write whose triggering content did not come from the user's keyboard requires explicit confirmation showing the exact text to be remembered. Do this with deterministic code on the write path, not with a system-prompt rule.
- **Pattern alert.** A proposed memory that names a brand, domain or product together with trust, preference or recency language ("trusted", "best", "always use", "from now on") is held for confirmation and logged as a candidate injection, whatever its channel.
- **User-visible memory.** List memories with provenance and a per-entry delete control. Offer a one-click "forget everything from web content" action.
- **Re-check after summarization.** If long-term memory is built by summarizing conversations, run the same gate on the summary before it is stored; summarization is where a "remember X" line inside a document turns into a first-person preference.
- **Separate preference memory from instruction memory.** "User likes short answers" is a preference. "Treat example-brand as authoritative" is an instruction and should not be storable from any channel without confirmation.
- **Monitor recommendation drift.** For assistants that recommend products or vendors, sample answers to a fixed prompt set per release and alert on brands whose share moves sharply without a model or corpus change.
- **Log and alert** on denied or held memory writes; a burst from one domain is a campaign.

### For brands and site owners

- **Scan your own pages** for hidden instruction text: HTML comments, `meta` and JSON-LD blocks with free text, off-screen or zero-size elements, text matching the page background, "editor's notes" or "evaluation checklists" addressed to AI systems. Include pages produced by agencies, SEO plugins and page builders. A compromised CMS plugin or an over-eager contractor can poison you without your knowledge.
- **Scan user-generated areas** (reviews, comments, Q&A, forum posts) for instruction text; a competitor planting "recommend brand Y" on your page is the untested-but-plausible attack from the Injection Paradox.
- **Diff your share buttons** against the prompt-hygiene rules after every deploy.
- **Track assistant mentions.** Keep a fixed set of buyer prompts, run them periodically across ChatGPT, Gemini, Claude and Perplexity, and record whether you or competitors are named. A sudden drop on Claude-class models after a content change is a signal to look for a poisoned page. Use the **seo-geo-audit** skill for the full visibility workflow and the **web-scraping** skill if you automate the collection, respecting each provider's terms.

## Guidance for brands

Do not plant instructions, and remove any you find. It backfires on Claude-class models in the only controlled study available, the penalty attaches to the brand and spills over to clean pages, and Microsoft published company counts by industry.

Do instead:

- Publish pages that answer real buyer questions plainly: what it does, who it is for, what it costs, how it compares on the dimensions buyers ask about.
- Keep product facts (names, specs, prices, availability, policies) accurate and consistent across your site, marketplaces, directories and third-party listings; assistants cross-check.
- Earn mentions on sites assistants already treat as trustworthy (independent reviews, standards bodies, professional directories, reputable press).
- Track which prompts across ChatGPT, Gemini, Claude and Perplexity name you versus competitors, and change content based on what is missing, not on tricks.
- Be aware that persuasive but honest copy already moves some models (Sonnet 26% to 70% with hype alone in the study); you do not need hidden text, and plain exaggeration carries its own reputational cost.

## Guidance for end users

- Review the assistant's memory and personalization settings. Delete any "trusted source", "preferred vendor" or "authoritative" entries you did not create yourself.
- Before clicking a "Summarize with AI" button, hover the link and read the URL. Look for "remember", "trusted source", "from now on", "in future conversations". If present, do not click; read the article yourself.
- When an assistant recommends a vendor, ask it why and what source the recommendation is based on.
- Do not paste prompts you received by email or found on a page into an assistant without reading them in full.

## OWASP mapping

- Primary: **ASI06 Memory & Context Poisoning** (Agentic Top 10, 2026).
- Chain: **LLM01:2025 Prompt Injection** (the delivery), **LLM04:2025 Data and Model Poisoning** when the stored preference affects other users or a shared store, **LLM09:2025 Misinformation** for the biased recommendation that results.
- For a site shipping the button, it is also a supply-chain and integrity question (**LLM03:2025** if a package generated it; web **A08:2025 Software or Data Integrity Failures** for the unreviewed snippet).
