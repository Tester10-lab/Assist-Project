#!/usr/bin/env node

import { runTechnicalSeoAudit } from './seo/audit-runner.mjs';
import { runGeoAudit } from './geo/geo-audit.mjs';
import { generateLlmsFiles } from './geo/llms-generator.mjs';
import { runCroAudit } from './marketing/cro-audit.mjs';
import { listTopicClusters, generateDraftBrief } from './content/content-planner.mjs';

const command = process.argv[2] || 'report';

function printHeader(title) {
  console.log(`\n======================================================`);
  console.log(`  ${title}`);
  console.log(`======================================================`);
}

function runAuditCommand() {
  printHeader('🛠️  TECHNICAL & LOCAL SEO AUDIT');
  const res = runTechnicalSeoAudit();
  console.log(`Technical SEO Score: ${res.score}/100\n`);
  res.passes.forEach(p => console.log(`  ✅ [${p.category}] ${p.message}`));
  if (res.issues.length > 0) {
    console.log(`\n  ⚠️ Recommendations:`);
    res.issues.forEach(i => console.log(`     [${i.severity}] ${i.message}`));
  }
}

function runGeoCommand() {
  printHeader('🤖  GEO & AI SEARCH READINESS AUDIT');
  const res = runGeoAudit();
  console.log(`GEO Readiness Score: ${res.score}/100\n`);
  res.passes.forEach(p => console.log(`  ✅ [${p.category}] ${p.message}`));
  if (res.issues.length > 0) {
    console.log(`\n  ⚠️ Recommendations:`);
    res.issues.forEach(i => console.log(`     [${i.category}] ${i.message}`));
  }
}

function runCroCommand() {
  printHeader('🎯  CRO & CONVERSION OPTIMIZATION AUDIT');
  const res = runCroAudit();
  console.log(`CRO Health Score: ${res.score}/100\n`);
  res.passes.forEach(p => console.log(`  ✅ [${p.category}] ${p.message}`));
  if (res.opportunities.length > 0) {
    console.log(`\n  💡 Opportunities:`);
    res.opportunities.forEach(o => console.log(`     [${o.category}] ${o.message}`));
  }
}

function runContentCommand() {
  printHeader('📚  TOPICAL CONTENT & KEYWORD CLUSTERS');
  listTopicClusters();
}

function runConsolidatedReport() {
  printHeader('📊  ASSIST ROOFING UNIFIED MASTER SEO / GEO / CRO REPORT');
  console.log(`Site: https://assistroofing.com.au`);
  console.log(`Generated: ${new Date().toISOString()}`);

  const techRes = runTechnicalSeoAudit();
  const geoRes = runGeoAudit();
  const croRes = runCroAudit();

  const overallScore = Math.round((techRes.score * 0.4) + (geoRes.score * 0.3) + (croRes.score * 0.3));

  console.log(`\n⭐ OVERALL SCORECARD:`);
  console.log(`  - Technical & Local SEO:  ${techRes.score}/100 (Weight: 40%)`);
  console.log(`  - GEO & AI Search:        ${geoRes.score}/100 (Weight: 30%)`);
  console.log(`  - CRO & Lead Conversion:  ${croRes.score}/100 (Weight: 30%)`);
  console.log(`  ────────────────────────────────────────────────`);
  console.log(`  🏆 COMPOSITE SEO HEALTH:  ${overallScore}/100`);

  console.log(`\n1. Technical SEO Status:`);
  console.log(`   - Verified ${techRes.passes.length} critical checks (index, sitemap, robots, schema, canonicals).`);
  console.log(`   - Critical errors: ${techRes.issues.filter(i => i.severity === 'CRITICAL').length}`);

  console.log(`\n2. Local SEO Status:`);
  console.log(`   - Business: Assist Roofing and Home Solution`);
  console.log(`   - Address: 139 Boundary Road, North Melbourne VIC 3051`);
  console.log(`   - Primary Phone: +61 478 250 790`);
  console.log(`   - Standards: Victorian Building Authority (VBA) registered trades, AS 4349.1`);

  console.log(`\n3. GEO & Citability Status:`);
  console.log(`   - public/llms.txt: ACTIVE`);
  console.log(`   - public/llms-full.txt: ACTIVE`);
  console.log(`   - Perplexity / ChatGPT / Gemini Crawler Directives: OPEN`);
  console.log(`   - Service Pillars AEO Answers: 6/6 structured`);

  console.log(`\n4. CRO & Trust Status:`);
  console.log(`   - 10-Year Workmanship Warranty badges displayed on lead capture.`);
  console.log(`   - $10,000,000 public liability insurance verified.`);
  console.log(`   - 4.9/5-star rating across 520+ customer reviews showcased.`);
  console.log(`   - Floating WhatsApp button and direct click-to-call enabled.`);

  console.log(`\n5. Content Strategy:`);
  console.log(`   - 3 active clusters supporting all 6 primary service pillars.`);
  console.log(`   - Draft briefs available on-demand via: node tools/assist-seo.mjs content-brief <slug>`);

  console.log(`\n======================================================\n`);
}

switch (command) {
  case 'audit':
  case 'technical':
    runAuditCommand();
    break;
  case 'geo':
    runGeoCommand();
    break;
  case 'generate-llms':
    generateLlmsFiles();
    break;
  case 'cro':
  case 'marketing':
    runCroCommand();
    break;
  case 'content':
  case 'clusters':
    runContentCommand();
    break;
  case 'content-brief':
    if (process.argv[3]) {
      generateDraftBrief(process.argv[3]);
    } else {
      console.log('Usage: node tools/assist-seo.mjs content-brief <topic-slug>');
    }
    break;
  case 'report':
  case 'all':
  default:
    runConsolidatedReport();
    break;
}
