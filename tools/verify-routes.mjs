import http from 'http';
import app from '../server/index.js';

const TEST_PORT = 5055;

const ROUTES_TO_TEST = [
  { path: '/', expectedText: 'Assist Roofing', type: 'text/html' },
  { path: '/about', expectedText: 'About Us', type: 'text/html' },
  { path: '/services', expectedText: 'Roofing Services', type: 'text/html' },
  { path: '/services/roof-restoration', expectedText: 'Roof Restoration', type: 'text/html' },
  { path: '/services/roof-repairs', expectedText: 'Roof Repairs', type: 'text/html' },
  { path: '/services/roof-replacement', expectedText: 'Roof Replacement', type: 'text/html' },
  { path: '/services/colorbond-roofing', expectedText: 'Colorbond', type: 'text/html' },
  { path: '/services/guttering', expectedText: 'Gutter', type: 'text/html' },
  { path: '/services/leak-detection', expectedText: 'Leak Detection', type: 'text/html' },
  { path: '/projects', expectedText: 'Projects', type: 'text/html' },
  { path: '/testimonials', expectedText: 'Reviews', type: 'text/html' },
  { path: '/contact', expectedText: 'Contact', type: 'text/html' },
  { path: '/admin', expectedText: '<html', type: 'text/html' },
  { path: '/data/cms-content.json', expectedText: 'services', type: 'application/json' },
  { path: '/sitemap.xml', expectedText: '<urlset', type: 'application/xml' },
  { path: '/robots.txt', expectedText: 'User-agent:', type: 'text/plain' },
  { path: '/llms.txt', expectedText: 'Assist Roofing', type: 'text/plain' },
  { path: '/api/public/content', expectedText: 'services', type: 'application/json' }
];

function fetchRoute(port, routePath) {
  return new Promise((resolve, reject) => {
    const req = http.get(`http://localhost:${port}${routePath}`, (res) => {
      let data = '';
      res.on('data', chunk => { data += chunk; });
      res.on('end', () => {
        resolve({
          status: res.statusCode,
          headers: res.headers,
          body: data
        });
      });
    });
    req.on('error', reject);
    req.setTimeout(5000, () => {
      req.destroy();
      reject(new Error(`Timeout fetching ${routePath}`));
    });
  });
}

async function runVerification() {
  console.log('======================================================');
  console.log('🧪 VERIFYING CPANEL PRODUCTION EXPRESS ROUTES & HEADERS');
  console.log('======================================================\n');

  // Start test server on TEST_PORT
  const server = app.listen(TEST_PORT);

  await new Promise(resolve => server.once('listening', resolve));
  console.log(`Test server running on port ${TEST_PORT}\n`);

  let allPassed = true;
  const results = [];

  for (const item of ROUTES_TO_TEST) {
    try {
      const res = await fetchRoute(TEST_PORT, item.path);
      const passedStatus = res.status === 200;
      const passedContent = res.body.toLowerCase().includes(item.expectedText.toLowerCase());

      if (passedStatus && passedContent) {
        console.log(`  ✅ [200 OK] ${item.path} (Length: ${res.body.length}b)`);
        results.push({ path: item.path, status: res.status, passed: true });
      } else {
        allPassed = false;
        console.error(`  ❌ [FAIL] ${item.path} - Status: ${res.status}, Matched: ${passedContent}`);
        results.push({ path: item.path, status: res.status, passed: false });
      }
    } catch (err) {
      allPassed = false;
      console.error(`  ❌ [ERROR] ${item.path}:`, err.message);
      results.push({ path: item.path, status: 0, passed: false, error: err.message });
    }
  }

  server.close();

  console.log('\n======================================================');
  if (allPassed) {
    console.log(`🎉 ALL ${results.length} ROUTES VERIFIED SUCCESSFULLY!`);
    console.log('======================================================\n');
    process.exit(0);
  } else {
    console.error(`⚠️ SOME ROUTES FAILED VERIFICATION.`);
    console.log('======================================================\n');
    process.exit(1);
  }
}

runVerification();
