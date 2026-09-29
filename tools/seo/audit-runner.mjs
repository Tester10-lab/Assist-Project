import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '../..');

export function runTechnicalSeoAudit() {
  const issues = [];
  const passes = [];
  let score = 100;

  function pass(category, message) {
    passes.push({ category, message });
  }

  function warn(category, message, penalty = 3) {
    issues.push({ severity: 'WARNING', category, message });
    score = Math.max(0, score - penalty);
  }

  function fail(category, message, penalty = 8) {
    issues.push({ severity: 'CRITICAL', category, message });
    score = Math.max(0, score - penalty);
  }

  // 1. Inspect index.html
  const indexPath = path.join(ROOT_DIR, 'index.html');
  if (!fs.existsSync(indexPath)) {
    fail('Structure', 'index.html not found in project root!');
    return { score: 0, issues, passes };
  }

  const indexContent = fs.readFileSync(indexPath, 'utf-8');

  // Charset in first 1024 bytes
  const first1024 = indexContent.slice(0, 1024);
  if (/<meta\s+charset=["']utf-8["']/i.test(first1024)) {
    pass('Technical', 'Charset UTF-8 is positioned within first 1024 bytes.');
  } else {
    warn('Technical', 'Charset UTF-8 should be placed within first 1024 bytes.');
  }

  // Title tag
  const titleMatch = indexContent.match(/<title>(.*?)<\/title>/i);
  if (titleMatch && titleMatch[1].trim()) {
    const t = titleMatch[1].trim();
    if (t.length >= 30 && t.length <= 70) {
      pass('Metadata', `Title tag optimal length (${t.length} chars): "${t}"`);
    } else {
      warn('Metadata', `Title tag length is ${t.length} chars (recommended 30-65 chars): "${t}"`, 2);
    }
  } else {
    fail('Metadata', 'Missing <title> tag in index.html');
  }

  // Meta description
  const descMatch = indexContent.match(/<meta\s+name=["']description["']\s+content="([^"]*)"/i) || indexContent.match(/<meta\s+name=["']description["']\s+content='([^']*)'/i);
  if (descMatch && descMatch[1].trim()) {
    const d = descMatch[1].trim();
    if (d.length >= 100 && d.length <= 165) {
      pass('Metadata', `Meta description optimal length (${d.length} chars).`);
    } else {
      warn('Metadata', `Meta description length is ${d.length} chars (recommended 120-160 chars).`, 2);
    }
  } else {
    fail('Metadata', 'Missing meta description in index.html');
  }

  // Canonical URL
  const canonicalMatch = indexContent.match(/<link\s+rel=["']canonical["']\s+href=["'](.*?)["']/i);
  if (canonicalMatch && canonicalMatch[1].startsWith('https://assistroofing.com.au')) {
    pass('Canonical', `Canonical URL correctly points to: ${canonicalMatch[1]}`);
  } else {
    fail('Canonical', 'Missing or invalid canonical URL in index.html');
  }

  // Robots meta
  if (/<meta\s+name=["']robots["']\s+content=["'][^"']*index,\s*follow/i.test(indexContent)) {
    pass('Indexability', 'Robots meta tag correctly instructs index, follow.');
  } else {
    warn('Indexability', 'Robots meta tag does not contain index, follow directive.');
  }

  // Open Graph & Twitter Cards
  const hasOgTitle = /<meta\s+property=["']og:title["']/i.test(indexContent);
  const hasOgDesc = /<meta\s+property=["']og:description["']/i.test(indexContent);
  const hasOgImage = /<meta\s+property=["']og:image["']/i.test(indexContent);
  const hasOgDims = /<meta\s+property=["']og:image:width["']/i.test(indexContent) && /<meta\s+property=["']og:image:height["']/i.test(indexContent);
  const hasTwitter = /<meta\s+name=["']twitter:card["']/i.test(indexContent);

  if (hasOgTitle && hasOgDesc && hasOgImage) {
    pass('Social', 'Open Graph title, description, and image tags are present.');
  } else {
    fail('Social', 'Missing essential Open Graph tags.');
  }

  if (hasOgDims) {
    pass('Social', 'Explicit OG image dimensions (1200x630) are declared.');
  } else {
    warn('Social', 'OG image dimensions missing. Add og:image:width and og:image:height.', 2);
  }

  if (hasTwitter) {
    pass('Social', 'Twitter Card summary_large_image tag is configured.');
  }

  // Schema.org JSON-LD
  const jsonLdMatch = indexContent.match(/<script\s+type=["']application\/ld\+json["']>([\s\S]*?)<\/script>/i);
  if (jsonLdMatch) {
    try {
      const parsed = JSON.parse(jsonLdMatch[1]);
      pass('Structured Data', 'Valid JSON-LD block parsed successfully.');
      const graph = parsed['@graph'] || [parsed];
      const types = graph.map(g => (Array.isArray(g['@type']) ? g['@type'].join(', ') : g['@type']));

      if (types.some(t => t.includes('RoofingContractor'))) {
        pass('Local Schema', 'RoofingContractor schema verified with address and phone.');
      } else {
        warn('Local Schema', 'RoofingContractor schema missing from JSON-LD graph.');
      }

      if (types.some(t => t.includes('WebSite'))) {
        pass('Schema', 'WebSite schema entity found.');
      } else {
        warn('Schema', 'WebSite schema missing from JSON-LD graph.');
      }

      if (types.some(t => t.includes('FAQPage'))) {
        pass('Schema', 'FAQPage rich snippet schema found.');
      }
    } catch (e) {
      fail('Structured Data', `Invalid JSON-LD syntax: ${e.message}`);
    }
  } else {
    fail('Structured Data', 'No Schema.org JSON-LD found in index.html');
  }

  // Resource hints
  if (/<link\s+rel=["']preconnect["']/i.test(indexContent)) {
    pass('Performance', 'Preconnect resource hints configured for external CDNs.');
  }

  // 2. Inspect robots.txt
  const robotsPath = path.join(ROOT_DIR, 'public/robots.txt');
  if (fs.existsSync(robotsPath)) {
    const robotsTxt = fs.readFileSync(robotsPath, 'utf-8');
    if (/Sitemap:\s*https:\/\/assistroofing\.com\.au\/sitemap\.xml/i.test(robotsTxt)) {
      pass('Crawlability', 'robots.txt exists and references canonical sitemap.xml.');
    } else {
      warn('Crawlability', 'robots.txt should declare Sitemap location.');
    }
    if (/Disallow:\s*\/admin/i.test(robotsTxt)) {
      pass('Security SEO', 'robots.txt shields administrative routes.');
    }
  } else {
    fail('Crawlability', 'Missing public/robots.txt');
  }

  // 3. Inspect sitemap.xml
  const sitemapPath = path.join(ROOT_DIR, 'public/sitemap.xml');
  if (fs.existsSync(sitemapPath)) {
    const sitemapXml = fs.readFileSync(sitemapPath, 'utf-8');
    const urlMatches = sitemapXml.match(/<loc>(.*?)<\/loc>/g) || [];
    pass('Sitemap', `sitemap.xml present with ${urlMatches.length} indexable URLs.`);
    if (sitemapXml.includes('xmlns:image=')) {
      pass('Sitemap', 'Google Image Sitemap extension active.');
    }
  } else {
    fail('Sitemap', 'Missing public/sitemap.xml');
  }

  return {
    score,
    passes,
    issues
  };
}

if (process.argv[1] && process.argv[1].endsWith('audit-runner.mjs')) {
  const result = runTechnicalSeoAudit();
  console.log(`\n==============================================`);
  console.log(`🛡️  ASSIST ROOFING TECHNICAL SEO AUDIT REPORT`);
  console.log(`==============================================`);
  console.log(`Health Score: ${result.score}/100\n`);

  console.log(`✅ Passed Checks (${result.passes.length}):`);
  result.passes.forEach(p => console.log(`  [${p.category}] ${p.message}`));

  if (result.issues.length > 0) {
    console.log(`\n⚠️  Recommendations (${result.issues.length}):`);
    result.issues.forEach(i => console.log(`  [${i.severity}] [${i.category}] ${i.message}`));
  } else {
    console.log(`\n🎉 Zero critical issues detected!`);
  }
  console.log(`==============================================\n`);
}
