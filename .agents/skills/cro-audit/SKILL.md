---
name: cro-audit
description: Analyze conversion rate optimization (CRO), CTA effectiveness, trust signals, quote form friction, and customer intent for Assist Roofing based on marketingskills frameworks.
user-invocable: true
argument-hint: "[page: home|services|quote]"
license: MIT
metadata:
  author: Assist Roofing Integration (via marketingskills)
  version: "1.0.0"
  category: marketing
---

# Conversion Rate Optimization (CRO) & Marketing Skill

## Purpose
This skill adapts the conversion optimization and copywriting principles from `coreyhaines31/marketingskills` for Assist Roofing. It analyzes conversion pathways to ensure maximum lead generation without altering verified business facts.

## Automated Execution
Run the CRO check script via terminal:
```bash
node tools/marketing/cro-audit.mjs
```

## Core Evaluation Framework

### 1. Value Proposition Clarity
- Within 5 seconds, can a Melbourne homeowner answer:
  - *Who is Assist Roofing?* (Licensed Melbourne Roofing Contractor, VBA Registered).
  - *What do they offer?* (Colorbond replacements, emergency leak repairs, roof restorations).
  - *Why choose them?* (10-Year Workmanship Warranty, $10M liability insurance, 4.9★ from 520+ reviews, Clean Jobsite Promise).

### 2. CTA Placement & Hierarchy
- Primary CTA: *"Get a Free Quote"* / *"Book Free Roof & Drone Inspection"*.
- Secondary CTA: Direct telephone call (`0478 250 790`) and floating WhatsApp chat for immediate emergency inquiries.
- Avoid passive labels (e.g., "Submit", "Send"). Use outcome-focused action labels (e.g., "Request Free Inspection & Quote").

### 3. Lead Form Friction Analysis
- Minimum essential fields only:
  1. Full Name
  2. Mobile / Phone Number
  3. Melbourne Postcode / Suburb
  4. Selected Roofing Service
  5. Optional Property Note
- Friction reducers present: Guarantee badges placed immediately beside the submit action.
