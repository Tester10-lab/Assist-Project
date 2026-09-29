---
name: assist-seo
description: Master unified SEO, GEO, CRO, and Content workflow orchestrating claude-seo, marketingskills, geo-seo-claude, and seomachine capabilities for Assist Roofing.
user-invocable: true
argument-hint: "[command: audit|local|geo|cro|content|report]"
license: MIT
metadata:
  author: Assist Roofing Unified System
  version: "1.0.0"
  category: seo
---

# Assist Roofing Master SEO / GEO / Marketing Workflow

## Purpose
This skill unifies the capabilities of four leading open-source frameworks:
1. **`AgriciDaniel/claude-seo`**: Technical, schema, and local Melbourne SEO auditing.
2. **`coreyhaines31/marketingskills`**: Conversion rate optimization (CRO), trust signals, and CTA frictionless flow.
3. **`zubair-trabzada/geo-seo-claude`**: Generative Engine Optimization (GEO), `llms.txt`, and AI search citability.
4. **`TheCraigHewitt/seomachine`**: Content research, topic clustering, and long-form draft brief creation.

## Unified Commands
You can run any workflow command directly from terminal:

- **Run Full Master Report**:
  ```bash
  node tools/assist-seo.mjs report
  ```
- **Technical & Local SEO Audit**:
  ```bash
  node tools/assist-seo.mjs audit
  ```
- **GEO & AI Search Audit**:
  ```bash
  node tools/assist-seo.mjs geo
  ```
- **CRO & Conversion Optimization Audit**:
  ```bash
  node tools/assist-seo.mjs cro
  ```
- **Content Clusters & Research**:
  ```bash
  node tools/assist-seo.mjs content
  ```
- **Generate Topic Brief**:
  ```bash
  node tools/assist-seo.mjs content-brief melbourne-roof-restoration-costs-guide
  ```
- **Regenerate / Sync llms.txt & llms-full.txt**:
  ```bash
  node tools/assist-seo.mjs generate-llms
  ```

## Mandatory Guardrails & Conventions
- **Zero Website Rewrites**: Tool commands are analytical and draft-generating; they never alter production content or routes automatically.
- **Fact Integrity**: Verified business data (VBA registration, 10-year warranty, 520+ 4.9★ reviews, 139 Boundary Rd, North Melbourne) is strictly preserved.
- **Topical Alignment**: All content strategy centers around the 6 core service pillars (`roof-restoration`, `roof-repairs`, `roof-replacement`, `colorbond-roofing`, `guttering`, `leak-detection`).
