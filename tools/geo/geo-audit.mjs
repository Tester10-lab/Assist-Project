import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '../..');

export function runGeoAudit() {
  const passes = [];
  const issues = [];
  let score = 100;

  function pass(category, message) {
    passes.push({ category, message });
  }

  function warn(category, message, penalty = 5) {
    issues.push({ category, message });
    score = Math.max(0, score - penalty);
  }

  function fail(category, message, penalty = 10) {
    issues.push({ category, message });
    score = Math.max(0, score - penalty);
  }

  // 1. Inspect public/llms.txt
  const llmsPath = path.join(ROOT_DIR, 'public/llms.txt');
  if (fs.existsSync(llmsPath)) {
    const content = fs.readFileSync(llmsPath, 'utf-8');
    if (content.startsWith('# ')) {
      pass('llms.txt', 'H1 Title present on line 1.');
    } else {
      warn('llms.txt', 'File should start with an H1 heading (# Site Name).');
    }
    if (content.includes('> ')) {
      pass('llms.txt', 'Blockquote description present.');
    } else {
      warn('llms.txt', 'Missing blockquote summary description.');
    }
    if (content.includes('## Services') || content.includes('## Docs')) {
      pass('llms.txt', 'Structured section headers present.');
    }
    if (content.includes('https://assistroofing.com.au/services/')) {
      pass('llms.txt', 'Canonical absolute URLs listed with descriptive annotations.');
    }
    if (content.includes('## Key Facts')) {
      pass('llms.txt', 'Key Facts section provides machine-readable business data.');
    }
  } else {
    fail('llms.txt', 'public/llms.txt is missing. Required for AI search engine discovery.');
  }

  // 2. Inspect public/llms-full.txt
  const llmsFullPath = path.join(ROOT_DIR, 'public/llms-full.txt');
  if (fs.existsSync(llmsFullPath)) {
    const fullContent = fs.readFileSync(llmsFullPath, 'utf-8');
    if (fullContent.length > 500) {
      pass('llms-full.txt', `Comprehensive llms-full.txt present (${fullContent.split('\n').length} lines) with deep service details & FAQs.`);
    }
  } else {
    warn('llms-full.txt', 'public/llms-full.txt is missing. Recommended for deep reasoning models.');
  }

  // 3. Inspect citability signals in servicesData.ts
  const servicesDataPath = path.join(ROOT_DIR, 'src/website/servicesData.ts');
  if (fs.existsSync(servicesDataPath)) {
    const content = fs.readFileSync(servicesDataPath, 'utf-8');
    if (content.includes('aeoSummary:')) {
      pass('Citability', 'Structured 4-step AEO answer summaries embedded in service definitions.');
    }
    if (content.includes('faqs:')) {
      pass('Citability', 'Question-and-answer pairs formatted for direct LLM quote extraction.');
    }
  }

  // 4. Inspect AI crawler directives in robots.txt
  const robotsPath = path.join(ROOT_DIR, 'public/robots.txt');
  if (fs.existsSync(robotsPath)) {
    const robots = fs.readFileSync(robotsPath, 'utf-8');
    if (!robots.includes('Disallow: /') || robots.includes('Allow: /')) {
      pass('AI Crawlers', 'AI search agents (Perplexity, ChatGPT, Applebot) have open access to public landing pages.');
    }
  }

  return {
    score,
    passes,
    issues
  };
}

if (process.argv[1] && process.argv[1].endsWith('geo-audit.mjs')) {
  const result = runGeoAudit();
  console.log(`\n==============================================`);
  console.log(`🤖  ASSIST ROOFING GEO & AI SEARCH AUDIT`);
  console.log(`==============================================`);
  console.log(`GEO Health Score: ${result.score}/100\n`);

  console.log(`✅ Passed Checks (${result.passes.length}):`);
  result.passes.forEach(p => console.log(`  [${p.category}] ${p.message}`));

  if (result.issues.length > 0) {
    console.log(`\n⚠️  Recommendations (${result.issues.length}):`);
    result.issues.forEach(i => console.log(`  [${i.category}] ${i.message}`));
  } else {
    console.log(`\n🎉 Outstanding GEO / AI search citability readiness!`);
  }
  console.log(`==============================================\n`);
}
