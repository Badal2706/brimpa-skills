# Technical SEO checklist

Thresholds and dated facts are stated as of Oct 2026. Numbers labelled "heuristic" are audit conventions, not Google rules.

## Contents

1. [Crawlability](#1-crawlability)
2. [Indexability and canonicals](#2-indexability-and-canonicals)
3. [robots.txt](#3-robotstxt)
4. [Sitemaps](#4-sitemaps)
5. [JavaScript SEO and rendering](#5-javascript-seo-and-rendering)
6. [Core Web Vitals and performance](#6-core-web-vitals-and-performance)
7. [Images](#7-images)
8. [Titles, meta descriptions, headings](#8-titles-meta-descriptions-headings)
9. [URLs, redirects, internal links](#9-urls-redirects-internal-links)
10. [Mobile and page experience](#10-mobile-and-page-experience)
11. [HTTPS and security headers](#11-https-and-security-headers)
12. [Hreflang and international](#12-hreflang-and-international)
13. [Site migrations and redesigns](#13-site-migrations-and-redesigns)
14. [Drift monitoring](#14-drift-monitoring)
15. [Severity cheat-sheet](#15-severity-cheat-sheet)
16. [Per-page on-page table and brand SERP](#16-per-page-on-page-table-and-brand-serp)
17. [Verification check bank ("Failed if:")](#17-verification-check-bank-failed-if)

---

## 1. Crawlability

- Fetch `/robots.txt` first. A **5xx** response makes compliant crawlers treat the whole site as disallowed until it recovers; a 4xx means no restrictions. Either state is a finding.
- Confirm the important pages are reachable through plain `<a href>` links within **3 clicks** of the homepage (heuristic). Menus that only open on hover or JS `onclick` handlers without `href` are not crawl paths.
- Check that CSS, JS and image paths needed to render the page are not disallowed.
- Googlebot processes only the first **2 MB** of an HTML response (Google crawler file-size limits; check the current crawler docs). Inline base64 images, giant inline SVG sprites or enormous nav markup can push the main content and JSON-LD past that point.
- Crawl budget only matters above roughly 10,000 URLs. For small business sites, "crawl budget" findings are almost always noise; focus on blockers.
- There is no manual crawl-rate setting any more (removed from Search Console in Jan 2024). Influence crawling through server speed, sitemaps and fewer junk URLs.
- Do not recommend AMP; it carries no ranking advantage.

## 2. Indexability and canonicals

- Every indexable page: `200` status, no `noindex` (meta or `X-Robots-Tag`), a **self-referencing `rel=canonical`** in the raw HTML, and no conflicting canonical in the rendered DOM. If raw and JS-injected canonicals differ, Google may use either.
- A `noindex` in the raw HTML can be honoured even if JavaScript later removes it. Google does not render JavaScript on non-200 pages.
- One hostname (`www` or bare), one scheme (`https`), one trailing-slash convention; 301 everything else. Parameter URLs, print views, filtered views and tag archives: canonical to the base page or `noindex`, but keep the links crawlable.
- Pagination: each page has its own self-referencing canonical and real `<a href>` links to the next page. Google has not used `rel=next/prev` since 2019. "Load more" and infinite scroll need paginated URLs underneath.
- After a canonical fix, Google can keep the old choice for up to about two weeks while it re-evaluates the duplicate cluster; an unchanged canonical the next day is not proof of failure.
- Soft 404s (a 200 page that says "not found") confuse indexing: return real 404/410.
- Staging and preview hosts: password-protect them or `noindex` them; never rely on robots.txt alone (blocked URLs can still be indexed from links). When the real site launches, remove the staging block and the `noindex` the same day.

## 3. robots.txt

- Location: `https://<host>/robots.txt`, UTF-8, one `Sitemap:` line per sitemap or sitemap index (absolute URL).
- RFC 9309 group selection: a crawler obeys **only the most specific `User-agent` group** that names it. Rules under `User-agent: *` do not apply to `GPTBot` if a `GPTBot` group exists. Repeat `Disallow` lines in every group.
- Never `Disallow: /` on production. After a rebuild, diff robots.txt against the previous version before go-live.
- robots.txt controls crawling, not indexing. To keep a URL out of the index, use `noindex` (and let it be crawled) or authentication.
- AI crawler groups: see `references/ai-search.md` for the table and a template. Decide per purpose (search vs training vs user-triggered), not per vendor.
- Check Search Console's robots.txt report for parse errors after any change.
- Discovery-file probes: request `/llms.txt`, `/llms-full.txt` and `/.well-known/security.txt` (plus any other `/.well-known/*` the stack uses) and report each status code as **optional, Info**; absent is not a defect. The only finding here is a probe that returns `200` with the HTML homepage, which means unknown paths are not real 404s (raise it under section 2, not here).

## 4. Sitemaps

- Limits per file: **50,000 URLs or 50 MB uncompressed**, whichever comes first; above that, split and use a sitemap index. Gzip is fine.
- Include only canonical, indexable, `200`, non-redirecting HTTPS URLs. Do not list `noindex` pages, redirects or parameter variants.
- `<lastmod>`: W3C datetime (`2026-10-20` or `2026-10-20T09:30:00+05:30`), reflecting the **last significant content change**. Google uses it only if it is consistently accurate; a build process that stamps today's date on every URL teaches Google to ignore it (flag identical `lastmod` across all URLs as Low).
- `<priority>` and `<changefreq>` are ignored by Google. Omit them.
- Split by content type (pages, posts, products, images) when the site is large; it makes Search Console's per-sitemap reporting useful.
- Image sitemaps: `<image:image>` + `<image:loc>` only (caption/title/license tags were dropped in 2022), max 1,000 images per `<url>`. Video sitemaps need `thumbnail_loc`, `title`, `description` and `content_loc` or `player_loc`. News sitemaps: max 1,000 entries, articles from the last 2 days only.
- Hreflang in sitemaps: declare `xmlns:xhtml` and list every alternate including the URL itself under each `<url>`.
- Submit in Search Console; the sitemap report shows submitted counts, **URL Inspection is the indexation truth**. Search Analytics data lags 2-3 days.
- IndexNow (Bing, Yandex, Seznam, Naver, Yep, Amazon, Internet Archive) is an optional, free submission option for non-Google engines: offer it when the CMS or CDN supports it, never report its absence above Low. Google does not support it (as of Oct 2026). Google's Indexing API is only for `JobPosting` and `BroadcastEvent`.

## 5. JavaScript SEO and rendering

- Serve title, meta description, canonical, meta robots, Open Graph and JSON-LD in the **initial HTML**. Rendering is deferred and some AI crawlers do not execute JS at all.
- Rendering strategy: SSR or SSG for public pages; client-side rendering only behind login. Dynamic rendering (serving a prerendered copy to bots) is a workaround Google calls not recommended; treat it as technical debt.
- JS-injected structured data may be picked up late; serve `Product`/`Offer` markup server-side because Google's JS structured-data guide warns dynamic Product markup can slow Shopping crawls.
- Frameworks that do this well out of the box: Next.js, Astro, SvelteKit, Nuxt, React Router v7 (Remix). With any of them, check that `robots` metadata, `canonical` and `alternates` are set per route and that the production build does not emit `noindex` from a leftover environment flag.
- Content behind tabs, accordions and "read more" expanders: keep it in the DOM on load. Google's April 2026 snippet guidance adds: do not force scroll position with JS and keep hash fragments intact, because deep links from Search ("read more" links) depend on them.
- Lazy-load primary text or images only with native `loading="lazy"` or IntersectionObserver; never require a click or scroll event before the main content exists.

## 6. Core Web Vitals and performance

| Metric | Good | Needs improvement | Poor |
|---|---|---|---|
| LCP (Largest Contentful Paint) | <= 2.5 s | 2.5-4.0 s | > 4.0 s |
| INP (Interaction to Next Paint) | <= 200 ms | 200-500 ms | > 500 ms |
| CLS (Cumulative Layout Shift) | <= 0.1 | 0.1-0.25 | > 0.25 |

- Assessed at the **75th percentile** of real-user (field) loads, mobile and desktop separately. INP replaced FID on 12 March 2024; never report FID. No new Core Web Vital has been added as of Oct 2026.
- Field data (CrUX via PageSpeed Insights or the CrUX API) is what ranking uses; Lighthouse lab scores are for debugging. A site with too little traffic has no CrUX data ("insufficient data"): say so, run lab tests, do not invent a field score.
- Supporting metrics: TTFB "good" < 800 ms; long tasks > 50 ms hurt INP; a DOM above ~1,500 elements is a warning sign (heuristics from web.dev).
- CWV is one lightweight signal among many. Do not promise ranking gains from passing; do fix it because conversions and bounce depend on it, and because "good page experience" is one of the fundamentals Google lists for AI features.
- Priority of fixes: LCP > CLS > INP for most small-business sites.
- Typical LCP causes: unoptimised hero image, render-blocking CSS/JS, slow TTFB (no caching/CDN), web fonts without `font-display: swap` and preload, third-party scripts. Fix: `fetchpriority="high"` on the LCP image, preconnect to critical origins, inline critical CSS, defer the rest.
- Typical CLS causes: images/iframes/ads without reserved dimensions, fonts swapping, content injected above existing content, cookie banners that push layout. Fix: `width`/`height` or `aspect-ratio` on every media element, reserve space for embeds, animate with `transform` only.
- Typical INP causes: heavy click handlers, long tasks on the main thread, large DOM, synchronous storage or XHR, layout thrashing. Fix: break up tasks, defer non-critical JS, remove unused third-party tags.
- Single-page apps: CrUX counts hard navigations only, so client-side route changes are a measurement blind spot. Warn the owner; do not report "no data" as "passing".
- Mobile load target from the clinic playbook ("under 3 seconds on mobile data") maps to LCP <= 2.5 s on a mid-range phone; test on cellular, not office Wi-Fi.
- Drift rule (heuristic): a p75 regression > 20% on any vital, or a Lighthouse performance drop of 10+ points, is a Warning worth investigating within a week.

## 7. Images

- Every meaningful `<img>` has descriptive `alt` (about 10-125 characters, heuristic); decorative images get `alt=""`. Alt text is the top Google Images signal; filenames come second; EXIF camera data counts for nothing.
- Descriptive, hyphenated, lowercase filenames (`dental-implant-consultation-ahmedabad.webp`), never `IMG_2041.jpg` and never keyword lists.
- Always set `width` and `height` (or CSS `aspect-ratio`) to prevent CLS.
- Formats: WebP by default, AVIF where the pipeline supports it, JPEG/PNG fallback via `<picture>`, SVG for logos and icons. Use `srcset` + `sizes` for responsive sizes.
- Size budgets (heuristic): thumbnails < 50 KB, content images < 100 KB, hero < 200 KB; flag > 200 KB as a warning and > 500 KB as critical for content images.
- `loading="lazy"` only below the fold; the LCP/hero image is eager with `fetchpriority="high"`. `decoding="async"` on the rest.
- Serve from a CDN with long cache lifetimes and immutable filenames.
- AI-generated product imagery for Merchant Center must carry IPTC `DigitalSourceType` metadata; AI-written product titles and descriptions must be labelled in the feed (Google Merchant Center policy).
- For licensing badges in Google Images: `ImageObject` with `license` and `acquireLicensePage`, or the IPTC Licensor fields.

## 8. Titles, meta descriptions, headings

- **Google imposes no length limit** on `<title>` or meta description; both are truncated to the device width. The industry rule of thumb of **50-60 characters** for titles and **120-160 characters** (about 155 displayed) for descriptions keeps them from being cut, and that rule is a convention, not a Google requirement.
- Google rewrites a title link when it sees: half-empty titles ("Home"), obsolete dates ("2023 guide" on a current page), inaccurate titles, micro-boilerplate (near-identical titles across pages), no clear main heading, language or script mismatch, duplicated site names. Sources Google draws on instead: the main visible heading, `<h1>`, `og:title`, anchor text, `WebSite` structured data. So: unique, descriptive, concise, `<h1>` consistent with `<title>`, brand once at the end after a delimiter.
- Pattern for local pages: `<Service> in <City> | <Brand>`; the primary phrase near the front.
- Meta description: unique per page, written as the reason to click, with a concrete detail (price from, years, area served, a date for articles). Google builds snippets mainly from page content and uses the description only when it describes the page better. Keyword lists, quotes of the title, and the same stock sentence across pages ("Contact us today!") are templated metadata; flag the pattern, not just duplicates.
- Programmatic generation of descriptions is acceptable on large sites if each one is specific to the page.
- Headings: exactly one `<h1>`; `<h2>`-`<h4>` in order without skipped levels; headings describe sections (question-form headings are fine where readers ask questions). Do not use headings for styling.
- `<html lang>` present and matching the content language (`en`, `en-IN`, `hi`). Google ignores code-level language markup, but Bing reads it as a hint and a missing or wrong value fails WCAG 3.1.1 (Language of Page): Low for SEO, flag it as an accessibility fail.
- Favicon: a `<link rel="icon">` on the homepage whose file returns `200` with real image bytes (not an HTML error page), square and a multiple of 48x48 px, not blocked by robots.txt (Google favicon guidelines); `apple-touch-icon` (180x180 by convention) returns `200` the same way. A missing favicon shows a generic icon in results: Low.
- `meta keywords` is ignored by Google; remove it to reduce noise. Keep `og:title`, `og:description`, `og:image` (1200x630), `og:url` and a Twitter card for sharing.
- Primary topic placement (one page, one intent): title (front), `<h1>`, URL slug, first 100 words, meta description, one image alt. Beyond that, write naturally; there is no keyword-density target and related terms do more than repetition. Cap a page at roughly one primary + 2-3 secondary + 3-4 supporting phrases, and never let two pages share a primary phrase (cannibalisation).

## 9. URLs, redirects, internal links

- URLs: lowercase, hyphenated, descriptive, no session or tracking parameters in canonical URLs, one trailing-slash convention, under ~100 characters (heuristic). Folder hierarchy that mirrors the site: `/services/<service>/`, `/locations/<city>/`, `/blog/<slug>/`.
- Redirects: 301 for permanent moves, one hop only. Audit crawls follow up to 3 hops and flag chains and loops. Redirect to the equivalent page, not the homepage.
- Internal links: descriptive anchors (never "click here"), varied but not keyword-stuffed, in body copy as well as navigation. Heuristics: service page 3-5 contextual links; 1,500-word article 5-10; product page 2-4; every important page has >= 3 incoming internal links; no orphan pages; hub pages link to every real child page from the sitemap; children link back to the hub; no single anchor text is more than ~40% of links to a page.
- External links to primary sources are a quality signal for readers; do not nofollow everything by reflex.
- Broken links (internal 404s) are a High finding on key pages, Medium elsewhere.
- Breadcrumbs: visible on the page and mirrored in `BreadcrumbList` JSON-LD.

## 10. Mobile and page experience

- Mobile-first indexing: Googlebot Smartphone is the primary crawler. The risk is **content parity**: the mobile version must carry the same primary content, headings, structured data, robots meta and links as desktop.
- Viewport meta present (`width=device-width, initial-scale=1`), no horizontal scroll at 360-390 px width, base text readable without zoom (16 px is a common practice, not a Google rule).
- `user-scalable=no` or a `maximum-scale` below 5 (e.g. `maximum-scale=1`) in the viewport meta blocks pinch-zoom: an accessibility fail (WCAG 1.4.4 Resize Text; Lighthouse `meta-viewport` audit), Medium, hand-off to ui-ux.
- Tap targets: WCAG 2.2 AA minimum **24x24 CSS px**; 48x48 with spacing is a comfortable guideline, not a Google requirement.
- Intrusive interstitials (full-screen popups on arrival from search, consent walls that redirect, app-install overlays that hide content) are a negative page-experience signal. Small banners, legal consent dialogs and age gates are fine.
- Back-button hijacking (`history.pushState`/`replaceState` abuse so "back" lands on another page, including via third-party ad scripts) is a spam-policy violation since April 2026. Treat as Critical.
- Keep key content visible on load, not only behind tabs; do not hijack scroll; keep hash fragments working.
- Click-to-call (`tel:`), WhatsApp link and a short form above the fold on every page of a local business site.
- The old Search Console Page Experience report is gone; use the Core Web Vitals and HTTPS reports.

## 11. HTTPS and security headers

- HTTPS everywhere with a valid certificate, HTTP -> HTTPS 301, no mixed content, HSTS. HTTPS is a confirmed but lightweight ranking signal; its real value is trust and avoiding browser warnings.
- Certificate coverage: the SAN list covers **every host that is served or linked** (bare and `www`, plus any subdomain in the sitemap or old backlinks), and the expiry date is written in the report. A 301 from an uncovered host never fires, because the TLS handshake fails first: High, Critical when the uncovered host is the canonical one. Public certificates are capped at 200 days since 15 Mar 2026 (CA/B Forum ballot SC-081), so confirm renewal is automated.
- Security headers: list each by name with present / absent and the raw value (`Strict-Transport-Security`, `Content-Security-Policy`, `X-Content-Type-Options`, `Referrer-Policy`, `X-Frame-Options` or CSP `frame-ancestors`, `Permissions-Policy`). Report them, do not score them for SEO, and hand off configuration to the security-review skill.
- Hacked content, sneaky redirects and malicious downloads trigger manual actions; check Search Console Security Issues during every audit.

## 12. Hreflang and international

- Every page in a language set lists every alternate **including itself** (missing self-reference invalidates the set), and every alternate links back (full mesh). One `x-default` per set pointing at the language selector or the fallback page.
- Codes: ISO 639-1 language (`en`, `hi`, `gu`, not `eng`), optional ISO 15924 script (`zh-Hans`), optional ISO 3166-1 alpha-2 region in uppercase (`en-IN`, `en-GB`; `en-uk`, `EU`, `es-LA` are invalid; region alone is invalid).
- Only on canonical, indexable URLs; exact URL match including trailing slash and protocol. Cross-domain sets need return tags on both domains.
- Methods: `<link rel="alternate" hreflang>` in `<head>` for small sets, HTTP headers for PDFs, sitemaps for large or cross-domain sets.
- Hreflang is a hint, not a directive. Google ignores geo meta tags. The Search Console International Targeting report was removed in 2022.
- Machine-translated pages published without human review count as scaled content abuse; reviewed translations are fine. Use page-level `noindex` for unreviewed drafts rather than blocking the whole language folder.
- Severity: missing self-reference or missing return tag Critical; invalid codes or non-canonical targets High; mixed protocol or trailing-slash mismatch Medium; the same set declared in both HTML and sitemap Low.

## 13. Site migrations and redesigns

Run this before and after any rebuild, domain change or CMS switch; most "traffic fell after the redesign" cases come from this list.

1. Export the full old URL inventory (sitemap, Search Console pages, analytics landing pages, crawl).
2. Build a 1:1 redirect map to the new URLs; redirect to equivalents, never blanket to the homepage.
3. Diff robots.txt, meta robots and `X-Robots-Tag` between staging and production; remove staging `Disallow: /` and `noindex` on launch day.
4. Confirm titles, descriptions, canonicals, hreflang and JSON-LD survived the new templates and are in the initial HTML.
5. Keep the sitemap pointing at new URLs only; resubmit it; inspect the top 20 URLs.
6. Preserve images and their alt text, or 301 old image URLs.
7. Re-run PageSpeed Insights on the top pages; new frameworks often ship heavier JS.
8. Watch Search Console for 404 spikes and coverage drops for 4-6 weeks; keep the redirect map live for at least a year.

## 14. Drift monitoring

Capture a baseline per key URL (title, meta description, canonical, meta robots, H1/H2 list, JSON-LD hash, Open Graph, status code, CWV p75) after each audit, and re-check monthly or after every deploy.

- Critical, act immediately: schema removed; canonical changed or removed; `noindex` added; H1 removed or changed beyond recognition; title removed; status 2xx -> 4xx/5xx.
- Warning, within a week: title or description changed unexpectedly; CWV p75 regressed > 20%; Lighthouse performance -10 points; Open Graph removed; schema content modified.
- Info: new schema added; H2 structure changed; content hash changed.

## 15. Severity cheat-sheet

| Finding | Default severity |
|---|---|
| Site or key template `noindex`, robots.txt blocking the site, 5xx on robots.txt | Critical |
| Hacked content, sneaky redirects, back-button hijacking, hidden text | Critical |
| Canonical pointing at the wrong page, redirect loops, HTTPS broken | Critical |
| Certificate SAN missing a served or linked host (Critical if it is the canonical host) | High |
| Missing or duplicate titles on key pages, missing H1, JSON-LD errors | High |
| Redirect chains, broken internal links on key pages, sitemap listing non-200 URLs | High |
| Hreflang missing self-reference or return tags | Critical (international sites) |
| Poor CWV on mobile for key pages | High |
| Templated meta descriptions, thin alt text, oversized images | Medium |
| Identical `lastmod`, `priority`/`changefreq` present, `meta keywords` present | Low / Info |
| Retired structured-data types present | Info |

## 16. Per-page on-page table and brand SERP

Fill one row per inspected page (homepage plus one per template) from the raw HTML; write the raw value or `missing`, never "ok". Duplicates and mismatches across rows are the findings.

| URL | title | description | H1 | canonical | robots | OG (title / image) | JSON-LD types |
|---|---|---|---|---|---|---|---|
| `/` | `Example Clinic \| Pulmonologist in Indirapuram` | `Asthma, COPD and sleep apnea care...` | `Pulmonologist in Indirapuram` | self | `index,follow` (default) | yes / 1200x630 | `MedicalClinic`, `WebSite` |

- Brand SERP and search intent: search the exact brand name (and brand + city) in a signed-out session from the target market, and record whether the official site ranks first, whether the Business Profile panel shows, which look-alike businesses or domains appear, and whether the results match the intent the business serves (a name shared with an unrelated company is an entity problem, not a ranking one). Note location, device and date; a look-alike outranking the brand on its own name is High.

## 17. Verification check bank ("Failed if:")

Every finding ends with one falsifiable check: a single command or observable condition that someone else can run after the fix, with a clear pass/fail. Copy from this bank and replace `example.com` and the paths. Run shell checks in bash (Git Bash or WSL on Windows). For checks with a lag (indexing, CrUX), state the window.

| Check | Command or observation | Failed if |
|---|---|---|
| Title present | `curl -s https://www.example.com/page/ \| grep -io '<title>[^<]*</title>'` | no output, empty text, or a half-empty title such as `Home` |
| Canonical self-referencing | `curl -s https://www.example.com/page/ \| grep -io '<link[^>]*rel="canonical"[^>]*>'` | no match, or the `href` is not exactly the requested URL (scheme, host, trailing slash) |
| Not noindexed | `curl -sI https://www.example.com/page/ \| grep -i x-robots-tag` and `curl -s https://www.example.com/page/ \| grep -io '<meta[^>]*name="robots"[^>]*>'` | either output contains `noindex` or `none` |
| 301, one hop | `curl -s -o /dev/null -w '%{http_code} %{redirect_url}\n' http://example.com/` then `curl -sL -o /dev/null -w '%{num_redirects} %{http_code} %{url_effective}\n' http://example.com/` | first code is not `301`/`308`, `num_redirects` > 1, or the final URL is not the canonical `200` |
| Real 404 | `curl -s -o /dev/null -w '%{http_code}\n' https://www.example.com/no-such-page-7f3a/` | anything other than `404` or `410` |
| Cert SAN covers www, expiry | `openssl s_client -connect www.example.com:443 -servername www.example.com </dev/null 2>/dev/null \| openssl x509 -noout -ext subjectAltName -enddate` (repeat for the bare host) | neither `DNS:www.example.com` nor `DNS:*.example.com` is listed, or `notAfter` is within 14 days with no automated renewal |
| robots.txt allows bot X | `curl -s -w '\n%{http_code}\n' https://www.example.com/robots.txt`, then read the most specific group for the bot (e.g. `grep -i -A8 'user-agent: oai-searchbot'`, else the `*` group) | status is 5xx, or that group disallows `/` or the audited path; for Googlebot, Search Console's robots.txt report shows an error |
| Sitemap lastmod present | `curl -s --compressed https://www.example.com/sitemap.xml \| grep -c '<loc>'`, the same with `'<lastmod>'`, then `... \| grep -o '<lastmod>[^<]*' \| sort -u \| wc -l` | the two counts differ, or there is one distinct `lastmod` across many URLs |
| JSON-LD parses | Rich Results Test (`search.google.com/test/rich-results`) and `validator.schema.org` on the URL | any parse error or invalid item, or the URL appears in Search Console's "Unparsable structured data" report |
| CWV field data | PageSpeed Insights "Discover what your real users are experiencing" (mobile), or `curl -s -H 'Content-Type: application/json' -d '{"origin":"https://www.example.com","formFactor":"PHONE"}' "https://chromeuxreport.googleapis.com/v1/records:queryRecord?key=$CRUX_KEY"` | p75 LCP > 2,500 ms, INP > 200 ms or CLS > 0.1; "insufficient data" is reported as not measured, never as failed or passed |
| `<html lang>` | `curl -s https://www.example.com/ \| grep -io '<html[^>]*>'` | no `lang` attribute, or a code that does not match the content language |
| Viewport allows zoom | `curl -s https://www.example.com/ \| grep -io '<meta[^>]*name="viewport"[^>]*>'` | no match, or it contains `user-scalable=no` or a `maximum-scale` below 5 |
| Favicon and touch icon | `curl -s -o /dev/null -w '%{http_code} %{content_type} %{size_download}\n' https://www.example.com/favicon.ico` (same for the `apple-touch-icon` href) | not `200`, a `text/html` content type, or 0 bytes |
| Indexed after the fix | Search Console URL Inspection on the URL, after the stated window (canonical and noindex fixes: up to 14 days) | still excluded for the same reason, or the Google-selected canonical differs from the declared one |

A check that cannot fail ("monitor rankings", "looks better") is not a check. For a KEEP or Info finding, write the regression condition instead: the observation that would turn it into a defect.
