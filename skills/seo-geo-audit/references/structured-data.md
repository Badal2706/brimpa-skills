# Structured data reference

State as of Oct 2026. Google's Structured Data Gallery (`developers.google.com/search/docs/appearance/structured-data/search-gallery`) and the Search Central changelog (`developers.google.com/search/updates`) are the primary sources; re-check them before promising any rich result.

## Contents

1. [Ground rules](#1-ground-rules)
2. [Supported rich-result types (Oct 2026)](#2-supported-rich-result-types-oct-2026)
3. [Retired or removed features](#3-retired-or-removed-features)
4. [Review and rating rules](#4-review-and-rating-rules)
5. [LocalBusiness subtype guidance](#5-localbusiness-subtype-guidance)
6. [Required and recommended properties by type](#6-required-and-recommended-properties-by-type)
7. [JSON-LD templates](#7-json-ld-templates)
8. [Validation steps](#8-validation-steps)
9. [Framework injection points](#9-framework-injection-points)

---

## 1. Ground rules

- JSON-LD only (Google's stated preference), inside `<script type="application/ld+json">`, served in the initial HTML. One block per entity, or a single `@graph` with `@id` cross-references.
- `@context` is `https://schema.org` (https, not http). Every block needs `@context` and `@type`; a nested object without a type cannot attach (a rating without `@type: AggregateRating` never reaches the Product).
- Use the **most specific applicable type**. Bare `LocalBusiness`, `Organization` or `Thing` is a finding when a subtype fits.
- Markup must describe content that a human can see on that page. Do not add prices, hours, reviews or authors that are not visible. Missing data is emitted as `"MISSING_fieldName": "not found on page"` in the draft for the owner to fill, never guessed.
- Absolute HTTPS URLs; ISO 8601 dates (`2026-10-20`, `2026-10-20T09:00:00+05:30`) and durations (`PT15M`); numeric strings for prices without currency symbols; ISO 4217 `priceCurrency`; full schema.org URLs for enumerations (`https://schema.org/InStock`).
- Structured data is not a direct ranking factor; it unlocks rich results and helps machines disambiguate the entity. Do not sell it as an AI-visibility hack: Google's AI-optimisation guide lists "over-investing in structured data for AI" among the misconceptions. Normal structured data still helps rich results.
- Existing markup for a retired feature is reported as **Info**: harmless, no action required, no new instances.

## 2. Supported rich-result types (Oct 2026)

Listed in Google's gallery (page last updated 16 Oct 2026): Article, Breadcrumb, Carousel (only combined with another type), Course list, Dataset (Dataset Search only), Discussion forum, Education Q&A, Employer aggregate rating, Event, Image metadata, Job posting, Local business, Math solver, Movie, Organization, Product (merchant listing and product snippet), Profile page, Q&A, Recipe, Review snippet, Software app, Speakable (still beta), Subscription and paywalled content, Vacation rental, Video.

Recent expansions worth knowing: Discussion forum and QAPage gained comment-thread properties (Mar 2026); `VideoObject.creator` added (Sept 2026); merchant listings gained `hasAdultConsideration` (required for adult products since May 2026), `category` (July 2026) and shipping-policy markup (Nov 2025); `returnPolicyCountry` has been required in `MerchantReturnPolicy` since March 2025. Book actions remain supported (the phase-out banner was removed Nov 2025).

Safe to use without a rich result (machine-readable only): `Service`, `WebSite` (title-link signal; `SearchAction` no longer powers a sitelinks search box), `WebPage`, `ContactPage`, `Person`, `ImageObject`, `ItemList`, `Menu`/`MenuItem`, `OfferCatalog`.

## 3. Retired or removed features

| Feature / type | Status | Replacement |
|---|---|---|
| FAQ rich results (`FAQPage`) | Off for all sites since 7 May 2026; docs removed 15 June 2026. Restricted to gov/health since Aug 2023 before that. | Visible FAQ section on the page; `QAPage` only for genuine single-question community pages |
| HowTo | Removed Sept 2023 | Clear step headings (`<h2>`/`<ol>`); `VideoObject` for video steps |
| Sitelinks search box (`WebSite` + `SearchAction`) | Retired 21 Nov 2024 | Keep `WebSite` for the site name; drop the promise |
| Course info, Estimated salary, Learning video, Special announcement, Vehicle listing | Docs removed 9 Sept 2025; no longer shown | Course list; `JobPosting.baseSalary`; `VideoObject`; `Event` or `Article`; `Product` + `Car` with `Offer` (feed-based vehicle listings via Merchant Center still work) |
| Practice problem | Notice 5 Nov 2025; removed from tools Jan 2026 | None |
| ClaimReview | Phase-out banner June 2025; not in the current gallery | `Article` with clear dateline; Fact Check Explorer still reads it |
| Discover "Follow" feature | Removed 19 Nov 2025 | None |
| `Attorney` type | Schema.org-deprecated | `LegalService` + `Person` |
| Google Food Ordering direct checkout (`OrderAction`) | Discontinued June 2024 | Keep `Menu` markup for machines only |

Do not send owners to the Rich Results Test for retired types; the tool dropped them.

## 4. Review and rating rules

- **Self-serving reviews are ineligible.** Google's review-snippet doc: if the entity being reviewed controls the reviews about itself, pages using `LocalBusiness` or any `Organization` type are ineligible for star features. This includes reviews pulled in through an embedded third-party widget. Only sites that publish reviews about *other* businesses get stars from `LocalBusiness`/`Organization` markup. A clinic marking up its own Google rating risks a manual action; display the widget visibly and let the GBP listing carry the stars.
- Eligible review-snippet subjects: Book, Course, Event, Movie, Product, Recipe, Software app, local business and organisation (third-party sites only), plus creative-work types. Employers use `EmployerAggregateRating`.
- Each review needs `author` (Person or Organization with a name), `reviewRating.ratingValue`, and one clear subject (`itemReviewed`); Google's Nov 2025 clarification says do not describe the subject in several conflicting ways.
- **Fake or undisclosed incentivised reviews** violate the guidelines (added July 2026) and, in the US, FTC's Consumer Review Rule; in India they collide with the Consumer Protection Act's unfair-trade-practice rules. Never generate reviews, never mark up reviews that are not real and visible.
- `aggregateRating` requires `ratingValue` plus `reviewCount` or `ratingCount`, matching what is on the page.

## 5. LocalBusiness subtype guidance

Pick the deepest schema.org subtype that is still true; add a second type array only when both are honest (`["MedicalClinic", "Dentist"]` is rarely right; pick one).

| Vertical | Type(s) | Notes |
|---|---|---|
| Clinics and doctors | `MedicalClinic`, `Dentist`, `Physician` (as a `Person` or `MedicalBusiness` for the practice), `Hospital`, `Pharmacy`, `Optician`, `Physiotherapy` (use `MedicalBusiness` + `medicalSpecialty`) | `medicalSpecialty` from schema.org's `MedicalSpecialty` enumeration; doctors as `Person` with `jobTitle`, `hasCredential`, `worksFor`, registration-council `sameAs` |
| Legal | `LegalService` + `Person` per lawyer | Never `Attorney`; practice areas as `makesOffer` > `Service` |
| Home services | `Plumber`, `Electrician`, `HVACBusiness`, `RoofingContractor`, `GeneralContractor`, `HousePainter`, `Locksmith`, `MovingCompany`, `HomeAndConstructionBusiness` | Service-area businesses use `areaServed` (named cities/postcodes) and may omit `streetAddress` if the address is hidden on GBP |
| Food | `Restaurant`, `CafeOrCoffeeShop`, `Bakery`, `BarOrPub`, `FastFoodRestaurant`, `IceCreamShop` | `servesCuisine`, `menu` URL, `acceptsReservations` |
| Retail | `Store` subtypes (`ClothingStore`, `ElectronicsStore`, `GroceryStore`, `JewelryStore`, `Florist`, `HardwareStore`) | Products as `Product` on their own pages |
| Property | `RealEstateAgent` (no "brokerage" type exists) | Listings as `RealEstateListing` + `Offer` |
| Automotive | `AutoDealer`, `AutoRepair`, `AutoPartsStore` | Vehicles as `Car` + `Offer` |
| Beauty and wellness | `BeautySalon`, `HairSalon`, `DaySpa`, `NailSalon`, `HealthClub` | |
| Education | `School`, `EducationalOrganization`, `Preschool` | Courses as `Course` where real |
| Finance / professional | `AccountingService`, `FinancialService`, `InsuranceAgency`, `ProfessionalService` | YMYL: author credentials matter more than markup |
| Lodging | `Hotel`, `LodgingBusiness`, `BedAndBreakfast`, `Resort` | Vacation rental has its own feed-based rich result |

Multi-location businesses: `Organization` with an `@id` on the homepage; each location page carries its own subtype block with its own `@id`, `parentOrganization` (or `branchOf`) pointing at the organisation, its own `geo`, `telephone`, `openingHoursSpecification` and `hasMap`. Prefer `/locations/<city>/` subdirectories over subdomains.

## 6. Required and recommended properties by type

**LocalBusiness and subtypes** (Google doc updated Dec 2025)
- Required: `name` (exactly as on GBP), `address` as `PostalAddress` with `streetAddress`, `addressLocality`, `addressRegion`, `postalCode`, `addressCountry`.
- Recommended: `@id` (a stable URL), `url`, `telephone` (E.164, matching GBP and the page), `image` (array), `geo` (`GeoCoordinates`, >= 5 decimal places), `openingHoursSpecification` (24-hour `opens`/`closes`, `dayOfWeek` array; use `00:00`-`23:59` for 24 h), `priceRange` (< 100 characters, e.g. `"₹₹"` or `"₹500-₹2000"`), `hasMap` (CID URL), `sameAs` (GBP CID URL, social profiles, directory profiles), `areaServed`, `department`, `menu`/`servesCuisine` for restaurants, `aggregateRating`/`review` only on third-party sites.

**Organization** (homepage or about page)
- Recommended: `name`, `legalName`, `url`, `logo` (ImageObject or URL, >= 112x112 px, on a crawlable URL), `description`, `foundingDate`, `address`, `contactPoint` (`telephone`, `contactType`, `areaServed`, `availableLanguage`), `sameAs`, identifiers (`taxID`, `vatID`, `iso6523Code`, `duns`, `naics`) where public, `numberOfEmployees`, `email`.

**Article / BlogPosting / NewsArticle**
- Recommended: `headline` (keep under ~110 characters; longer is truncated), `image` (array with 16:9, 4:3 and 1:1 crops, each >= 50,000 pixels total, e.g. 1200x675), `datePublished`, `dateModified`, `author` (Person with `name` and `url` to a profile page; Organization for staff posts), `publisher`, `mainEntityOfPage`, `description`, `inLanguage`. Dates must match what the page shows.

**ProfilePage** (author and doctor bio pages)
- `mainEntity` is the `Person` (or `Organization`) with `name`, `alternateName`, `description`, `image`, `sameAs`, `jobTitle`, `worksFor`, `hasCredential`, `alumniOf`, `knowsAbout`. Supports E-E-A-T on YMYL sites.

**Product** (merchant listing eligibility)
- Required: `name`, `image`, `offers` as `Offer` (not `AggregateOffer` for merchant listings) with `price` > 0 and `priceCurrency`.
- Recommended: `description`, `sku`, `brand.name`, `gtin13`/`gtin14`/`mpn`, `offers.availability` (full URL), `offers.priceValidUntil` or `validFrom`/`validThrough`, `offers.shippingDetails`, `offers.hasMerchantReturnPolicy` (with `returnPolicyCountry`), `aggregateRating` and `review` where real, `color`/`material`/`size`, `category`, `hasAdultConsideration` (adult products only). Variants: `ProductGroup` with `variesBy` and `hasVariant`.

**BreadcrumbList**
- `itemListElement` of `ListItem` with sequential `position` from 1, `name`, and `item` (URL) on every element except optionally the last. Matches the visible breadcrumb.

**Service** (service and treatment pages; no rich result, but clean entity data)
- `name`, `serviceType`, `description`, `provider` (`@id` of the LocalBusiness), `areaServed`, `url`, optional `offers` with a price range only if the page shows prices, `hasOfferCatalog` for a menu of sub-services.

**Event**: `name`, `startDate` (with timezone), `location` (Place with address, or `VirtualLocation`), `eventStatus`, `eventAttendanceMode`, `image`, `description`, `offers`, `performer`, `organizer`, `endDate`.

**JobPosting**: `title`, `description` (HTML), `datePosted`, `hiringOrganization`, `jobLocation` (or `jobLocationType: TELECOMMUTE` + `applicantLocationRequirements`), `validThrough`, `baseSalary`, `employmentType`, `directApply`.

**VideoObject**: `name`, `description`, `thumbnailUrl`, `uploadDate`; recommended `duration`, `contentUrl`/`embedUrl`, `creator`, `hasPart` (Clip) for key moments, `interactionStatistic` with real counts.

**SoftwareApplication / WebApplication**: `name`, `operatingSystem`, `applicationCategory` (from Google's enumerated list), `offers` (price `0` for free), `aggregateRating` where real and third-party.

**QAPage**: a single question (`mainEntity: Question` with `name`, `text`, `answerCount`, `acceptedAnswer`/`suggestedAnswer`, each with `text`, `upvoteCount`, `author`, `dateCreated`). For community pages only; not a FAQ replacement.

## 7. JSON-LD templates

Replace every `MISSING_*` value or delete the property. Keep `@id` URLs stable across the site.

### 7.1 LocalBusiness (clinic example: MedicalClinic)

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "MedicalClinic",
  "@id": "https://www.example-clinic.in/#clinic",
  "name": "Example Chest Clinic",
  "url": "https://www.example-clinic.in/",
  "telephone": "+91XXXXXXXXXX",
  "image": ["https://www.example-clinic.in/images/clinic-front.webp"],
  "priceRange": "MISSING_priceRange",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Shop No. 4, Example Plaza, Sector 0",
    "addressLocality": "Indirapuram",
    "addressRegion": "Uttar Pradesh",
    "postalCode": "201014",
    "addressCountry": "IN"
  },
  "geo": { "@type": "GeoCoordinates", "latitude": 28.64123, "longitude": 77.37012 },
  "hasMap": "https://www.google.com/maps?cid=YOUR_CID",
  "sameAs": [
    "https://www.google.com/maps?cid=YOUR_CID",
    "https://www.instagram.com/exampleclinic",
    "https://www.practo.com/.../example-clinic"
  ],
  "medicalSpecialty": "Pulmonary",
  "openingHoursSpecification": [{
    "@type": "OpeningHoursSpecification",
    "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],
    "opens": "10:00", "closes": "21:00"
  }],
  "employee": { "@id": "https://www.example-clinic.in/doctors/dr-example/#person" }
}
</script>
```

For a non-medical local business swap `@type` (e.g. `Plumber`, `Restaurant`, `HairSalon`), drop `medicalSpecialty`, and for service-area businesses add `"areaServed": [{"@type":"City","name":"Ghaziabad"}, ...]`.

### 7.2 Person (doctor or author profile page)

```json
{
  "@context": "https://schema.org",
  "@type": "ProfilePage",
  "mainEntity": {
    "@type": "Person",
    "@id": "https://www.example-clinic.in/doctors/dr-example/#person",
    "name": "Dr. Example Name",
    "jobTitle": "Consultant Pulmonologist",
    "image": "https://www.example-clinic.in/images/dr-example.webp",
    "worksFor": { "@id": "https://www.example-clinic.in/#clinic" },
    "hasCredential": [{ "@type": "EducationalOccupationalCredential", "credentialCategory": "degree", "name": "MD (Pulmonary Medicine)" }],
    "alumniOf": { "@type": "CollegeOrUniversity", "name": "MISSING_alumniOf" },
    "knowsAbout": ["Asthma", "COPD", "Sleep apnea"],
    "sameAs": ["MISSING_registration_council_url", "https://www.linkedin.com/in/example"]
  }
}
```

### 7.3 Organization (homepage, non-local or multi-location brand)

```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": "https://www.example.com/#org",
  "name": "Example Pvt Ltd",
  "legalName": "Example Private Limited",
  "url": "https://www.example.com/",
  "logo": { "@type": "ImageObject", "url": "https://www.example.com/logo.png", "width": 512, "height": 512 },
  "description": "MISSING_description",
  "foundingDate": "2019",
  "contactPoint": [{ "@type": "ContactPoint", "telephone": "+91XXXXXXXXXX", "contactType": "customer service", "areaServed": "IN", "availableLanguage": ["en", "hi"] }],
  "address": { "@type": "PostalAddress", "streetAddress": "MISSING", "addressLocality": "MISSING", "addressRegion": "MISSING", "postalCode": "MISSING", "addressCountry": "IN" },
  "sameAs": ["https://www.linkedin.com/company/example", "https://www.instagram.com/example"]
}
```

### 7.4 Article / BlogPosting

```json
{
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  "mainEntityOfPage": "https://www.example.com/blog/asthma-monsoon-care/",
  "headline": "Asthma care during the monsoon: what our patients ask",
  "description": "MISSING_description",
  "image": ["https://www.example.com/images/asthma-monsoon-1200x675.webp", "https://www.example.com/images/asthma-monsoon-1200x900.webp", "https://www.example.com/images/asthma-monsoon-1200x1200.webp"],
  "datePublished": "2026-07-02",
  "dateModified": "2026-10-12",
  "author": { "@id": "https://www.example-clinic.in/doctors/dr-example/#person" },
  "publisher": { "@id": "https://www.example.com/#org" },
  "inLanguage": "en-IN"
}
```

### 7.5 Service (one per service or treatment page)

```json
{
  "@context": "https://schema.org",
  "@type": "Service",
  "@id": "https://www.example-clinic.in/asthma-treatment-indirapuram/#service",
  "name": "Asthma treatment",
  "serviceType": "Asthma diagnosis and treatment",
  "description": "MISSING_description",
  "provider": { "@id": "https://www.example-clinic.in/#clinic" },
  "areaServed": [{ "@type": "City", "name": "Indirapuram" }, { "@type": "City", "name": "Ghaziabad" }],
  "url": "https://www.example-clinic.in/asthma-treatment-indirapuram/"
}
```

### 7.6 Product

```json
{
  "@context": "https://schema.org",
  "@type": "Product",
  "name": "Example Water Purifier X1",
  "image": ["https://www.example.com/p/x1-1.webp", "https://www.example.com/p/x1-2.webp"],
  "description": "MISSING_description",
  "sku": "X1-WHT",
  "brand": { "@type": "Brand", "name": "Example" },
  "gtin13": "MISSING_gtin13",
  "offers": {
    "@type": "Offer",
    "url": "https://www.example.com/products/x1/",
    "price": "12999",
    "priceCurrency": "INR",
    "availability": "https://schema.org/InStock",
    "itemCondition": "https://schema.org/NewCondition",
    "priceValidUntil": "2026-12-31",
    "hasMerchantReturnPolicy": { "@type": "MerchantReturnPolicy", "returnPolicyCountry": "IN", "returnPolicyCategory": "https://schema.org/MerchantReturnFiniteReturnWindow", "merchantReturnDays": 7, "returnMethod": "https://schema.org/ReturnByMail", "returnFees": "https://schema.org/FreeReturn" }
  },
  "aggregateRating": { "@type": "AggregateRating", "ratingValue": "4.6", "reviewCount": "128" }
}
```

(`aggregateRating` only when those reviews are real and visible on the page.)

### 7.7 BreadcrumbList

```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.example-clinic.in/" },
    { "@type": "ListItem", "position": 2, "name": "Treatments", "item": "https://www.example-clinic.in/treatments/" },
    { "@type": "ListItem", "position": 3, "name": "Asthma treatment in Indirapuram" }
  ]
}
```

### 7.8 WebSite (site name only)

```json
{
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": "https://www.example.com/#website",
  "url": "https://www.example.com/",
  "name": "Example Clinic",
  "alternateName": "Example Chest Clinic Indirapuram",
  "publisher": { "@id": "https://www.example.com/#org" },
  "inLanguage": "en-IN"
}
```

## 8. Validation steps

1. Parse: the block is valid JSON (no trailing commas, no comments, no smart quotes). A quick local check: `node -e "JSON.parse(require('fs').readFileSync('block.json','utf8'))"`.
2. Placeholders: grep for `MISSING_`, `[Business Name]`, `REPLACE`, `XXXX`, `example.com` before publishing. Any left is a Critical finding.
3. Syntax and vocabulary: Schema Markup Validator (`validator.schema.org`).
4. Eligibility: Rich Results Test (`search.google.com/test/rich-results`) on the live URL, mobile user agent; zero errors, ideally zero warnings. Fetch the live page, not pasted code, so you also confirm the block is in the served HTML.
5. Parity: compare every value against the visible page and against GBP (name, address, phone, hours). Mismatches get the markup ignored or, for reviews, penalised.
6. Search Console: after indexing, check the Enhancements / rich-result reports for the type; URL Inspection shows detected structured data per URL.
7. Re-run the Rich Results Test after any template change; add the JSON-LD hash to the drift baseline.

## 9. Framework injection points

- Next.js (App Router): render `<script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />` in the page or layout component so it ships in the server HTML; Pages Router: inside `next/head`.
- Astro: inline `<script type="application/ld+json" set:html={JSON.stringify(data)} />` in the layout `<head>`.
- Nuxt: `useHead({ script: [{ type: 'application/ld+json', innerHTML: JSON.stringify(data) }] })`.
- SvelteKit: inside `<svelte:head>`, render the block with `{@html ...}` from a template string: `{@html '<script type="application/ld+json">' + JSON.stringify(data) + '</script>'}`.
- WordPress: a schema plugin that outputs JSON-LD, or `wp_head` hook; disable duplicate blocks from the theme and the SEO plugin (two `Organization` blocks with different data is a common finding).
- Static HTML / Jekyll / Hugo: in the head include or partial, one block per entity.
