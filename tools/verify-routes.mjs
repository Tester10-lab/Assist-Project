import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DIST_DIR = path.resolve(__dirname, '..', 'dist');

const ROUTES_TO_TEST = [
  { path: '/', filePath: 'index.html', expectedText: 'Assist Roofing' },
  { path: '/about', filePath: 'about/index.html', expectedText: 'About' },
  { path: '/services', filePath: 'services/index.html', expectedText: 'Roofing Services' },
  { path: '/services/roof-restoration', filePath: 'services/roof-restoration/index.html', expectedText: 'Roof Restoration' },
  { path: '/services/roof-repairs', filePath: 'services/roof-repairs/index.html', expectedText: 'Roof Repairs' },
  { path: '/services/roof-replacement', filePath: 'services/roof-replacement/index.html', expectedText: 'Roof Replacement' },
  { path: '/services/colorbond-roofing', filePath: 'services/colorbond-roofing/index.html', expectedText: 'Colorbond' },
  { path: '/services/guttering', filePath: 'services/guttering/index.html', expectedText: 'Gutter' },
  { path: '/services/leak-detection', filePath: 'services/leak-detection/index.html', expectedText: 'Leak Detection' },
  { path: '/testimonials', filePath: 'testimonials/index.html', expectedText: 'Reviews' },
  { path: '/contact', filePath: 'contact/index.html', expectedText: 'Contact' },
  { path: '/admin', filePath: 'admin/index.html', expectedText: 'Assist Roofing' },
  { path: '/data/cms-content.json', filePath: 'data/cms-content.json', expectedText: 'services' },
  { path: '/sitemap.xml', filePath: 'sitemap.xml', expectedText: '<urlset' },
  { path: '/robots.txt', filePath: 'robots.txt', expectedText: 'User-agent:' },
  { path: '/llms.txt', filePath: 'llms.txt', expectedText: 'Assist Roofing' }
];

async function runVerification() {
  console.log('======================================================');
  console.log('🧪 VERIFYING PRODUCTION PRE-RENDERED ROUTES & ASSETS');
  console.log('======================================================\n');

  if (!fs.existsSync(DIST_DIR)) {
    console.error('❌ Build directory dist/ not found. Run `npm run build` first.');
    process.exit(1);
  }

  let allPassed = true;
  const results = [];

  for (const item of ROUTES_TO_TEST) {
    const fullPath = path.join(DIST_DIR, ...item.filePath.split('/'));
    try {
      if (!fs.existsSync(fullPath)) {
        allPassed = false;
        console.error(`  ❌ [MISSING] ${item.path} -> File not found: ${item.filePath}`);
        results.push({ path: item.path, passed: false, error: 'File not found' });
        continue;
      }

      const content = fs.readFileSync(fullPath, 'utf-8');
      const passedContent = content.toLowerCase().includes(item.expectedText.toLowerCase());

      if (passedContent) {
        console.log(`  ✅ [PASS] ${item.path} (${item.filePath}, ${content.length}b)`);
        results.push({ path: item.path, passed: true });
      } else {
        allPassed = false;
        console.error(`  ❌ [FAIL] ${item.path} - Expected content "${item.expectedText}" not found in ${item.filePath}`);
        results.push({ path: item.path, passed: false });
      }
    } catch (err) {
      allPassed = false;
      console.error(`  ❌ [ERROR] ${item.path}:`, err.message);
      results.push({ path: item.path, passed: false, error: err.message });
    }
  }

  console.log('\n======================================================');
  if (allPassed) {
    console.log(`🎉 ALL ${results.length} ROUTES VERIFIED SUCCESSFULLY!`);
    console.log('======================================================\n');
    process.exit(0);
  } else {
    console.error('⚠️ SOME ROUTES FAILED VERIFICATION.');
    console.log('======================================================\n');
    process.exit(1);
  }
}

runVerification();
