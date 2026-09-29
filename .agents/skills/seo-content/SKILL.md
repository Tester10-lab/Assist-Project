---
name: seo-content
description: Plan, research, and draft SEO and GEO-optimized content briefs for Assist Roofing based on the seomachine workflow. Strictly operates as a draft/review workflow and never publishes automatically.
user-invocable: true
argument-hint: "[command: clusters|brief <topic-slug>]"
license: MIT
metadata:
  author: Assist Roofing Integration (via seomachine)
  version: "1.0.0"
  category: content
---

# SEO Content Research & Drafting Skill

## Purpose
This skill adapts the content research, drafting, and optimization pipeline from `TheCraigHewitt/seomachine` for Assist Roofing. It maintains topical authority for the 6 primary service pillars without automatic publishing.

## Commands Available
1. **List Topic Clusters & Keyword Targets**:
   ```bash
   node tools/content/content-planner.mjs
   ```
2. **Generate Draft Brief for Specific Topic**:
   ```bash
   node tools/content/content-planner.mjs brief melbourne-roof-restoration-costs-guide
   ```

## Writing & Optimization Rules
- **Direct Answer First**: Articles must begin with a concise, factual 2-sentence direct answer designed for featured snippets and AI search citation.
- **Topical Clustering**: Every article must support one of the 6 core pillars (`roof-restoration`, `roof-repairs`, `roof-replacement`, `colorbond-roofing`, `guttering`, `leak-detection`) with reciprocal contextual links.
- **Verified Fact Enforcement**: All prices, warranties, licensing numbers, and service areas must match verified project data. Never invent customer numbers, guarantees, or certifications.
- **Draft Safeguard**: Generated content files are stored in `tools/content/drafts/` for human review prior to CMS entry.
