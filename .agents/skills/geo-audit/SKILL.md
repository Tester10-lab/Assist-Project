---
name: geo-audit
description: Analyze Generative Engine Optimization (GEO) and AI search visibility (ChatGPT, Perplexity, Gemini, Claude) for Assist Roofing based on geo-seo-claude specifications.
user-invocable: true
argument-hint: "[action: audit|generate-llms]"
license: MIT
metadata:
  author: Assist Roofing Integration (via geo-seo-claude)
  version: "1.0.0"
  category: geo
---

# Generative Engine Optimization (GEO) Skill

## Purpose
This skill executes Generative Engine Optimization (GEO) audits and maintains machine-readable specifications (`llms.txt`, `llms-full.txt`) based on `zubair-trabzada/geo-seo-claude`.

## Commands Available
1. **Audit GEO Readiness**:
   ```bash
   node tools/geo/geo-audit.mjs
   ```
2. **Re-generate / Validate llms.txt & llms-full.txt**:
   ```bash
   node tools/geo/llms-generator.mjs
   ```

## Evaluated Criteria
- **`llms.txt` Integrity**: Standardized format featuring official name, one-sentence summary, canonical service URLs, and key corporate facts.
- **`llms-full.txt` Depth**: Detailed technical steps, material grades (0.42/0.48mm BMT BlueScope), Australian Standards compliance (AS 4349.1, AS 1562.1, AS/NZS 4200.1), and authoritative FAQs.
- **Citability & AEO**: High-density factual answers, preventing hallucinations and maximizing exact citations in AI query engines.
- **AI Crawler Access**: Verifies OpenAI, Perplexity, and Applebot have uninterrupted access to public pages.
