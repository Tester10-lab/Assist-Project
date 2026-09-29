---
name: seo-audit
description: Run a full technical, schema, and local SEO audit on Assist Roofing. Analyzes robots.txt, sitemap.xml, canonical URLs, JSON-LD Schema.org graphs, Melbourne local ranking signals, and Core Web Vitals readiness.
user-invocable: true
argument-hint: "[mode: technical|local|full]"
license: MIT
metadata:
  author: Assist Roofing Integration (via claude-seo)
  version: "1.0.0"
  category: seo
---

# Technical & Local SEO Audit Skill

## Purpose
This skill executes the comprehensive SEO auditing methodology inspired by `AgriciDaniel/claude-seo`, customized for Assist Roofing (`https://assistroofing.com.au`).

## Automated Execution
Run the automated audit script via terminal:
```bash
node tools/seo/audit-runner.mjs
```

## Audit Dimensions Covered

### 1. Technical Health
- **Crawlability & Directives**: Validates `public/robots.txt` ensuring user-agents (`Googlebot`, `Bingbot`, `Applebot`) are properly instructed and `/admin` is shielded.
- **Indexability & Sitemaps**: Validates `public/sitemap.xml`, ensuring clean canonical URLs with Google Image extensions (`xmlns:image`).
- **Resource Hints**: Checks for `preconnect` to Google Fonts and CDNs, font preload directives for LCP optimization.
- **Charset & Head Ordering**: Guarantees `<meta charset="UTF-8">` is within the first 1024 bytes.

### 2. Metadata & Open Graph
- Title tags strictly between 30–65 characters.
- Meta descriptions strictly between 120–160 characters with Melbourne roofing keyword intent.
- Canonical tags pointing strictly to `https://assistroofing.com.au/...`.
- Open Graph and Twitter Card tags with explicit dimensions (`1200x630`) and descriptive alt text.

### 3. Structured Data (Schema.org)
- Multi-typed `RoofingContractor` & `Organization` with NAP (Name, Address, Phone) consistency.
- `WebSite` entity declaring canonical URL, publisher, and locale `en-AU`.
- `FAQPage` rich snippets for common customer questions.
- Route-level `BreadcrumbList` and `Service` schema with `OfferCatalog` and `AggregateRating`.

### 4. Melbourne Local SEO Signals
- Verified business address: `139 Boundary Road, North Melbourne VIC 3051`.
- Primary telephone: `+61 478 250 790`.
- Service areas: Melbourne, North Melbourne, South Yarra, Brighton, Toorak, Hawthorn, Kew, Camberwell, Malvern, Armadale, St Kilda, Richmond.
- Licensing and standards: VBA registration, AS 4349.1 visual inspection standards.
