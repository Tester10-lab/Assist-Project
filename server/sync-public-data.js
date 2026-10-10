import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { getApps, initializeApp } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const isPrerenderOnly = process.argv.includes('--prerender');

let db = null;
let useMockData = false;

if (!isPrerenderOnly) {
  try {
    if (!getApps().length) {
      if (process.env.FIRESTORE_EMULATOR_HOST) {
        console.log('[Sync] Using Firestore Emulator at', process.env.FIRESTORE_EMULATOR_HOST);
        initializeApp({ projectId: 'project-1-c8b7e' });
        db = getFirestore();
      } else if (process.env.GOOGLE_APPLICATION_CREDENTIALS || process.env.GOOGLE_APPLICATION_CREDENTIALS_JSON) {
        initializeApp();
        db = getFirestore();
      } else {
        if (process.env.CI === 'true' || process.env.GITHUB_ACTIONS === 'true') {
          console.error('[Sync] Fatal: No Firebase credentials found in CI environment. Production build requires valid credentials.');
          process.exit(1);
        }
        console.warn('[Sync] WARNING: No Firebase credentials found (GOOGLE_APPLICATION_CREDENTIALS missing). Falling back to mock fixture data for local build.');
        useMockData = true;
      }
    } else {
      db = getFirestore();
    }
  } catch (err) {
    if (process.env.CI === 'true' || process.env.GITHUB_ACTIONS === 'true') {
      console.error('[Sync] Fatal: Could not initialize Firebase Admin in CI environment. Check credentials.', err);
      process.exit(1);
    }
    console.warn('[Sync] Could not initialize Firebase Admin:', err.message);
    useMockData = true;
  }
}

async function fetchSnapshot() {
  if (useMockData || !db) {
    return {
      services: [],
      pages: {},
      locations: [],
      blog: [],
      seo: {},
      settings: { business: { name: 'Assist Roofing (Mock)' } },
      exportedAt: new Date().toISOString()
    };
  }
  const servicesSnap = await db.collection('services').where('status', '==', 'published').orderBy('order').get();
  const pagesSnap = await db.collection('pages').where('status', '==', 'published').get();
  const locationsSnap = await db.collection('locations').where('status', '==', 'published').get();
  const blogSnap = await db.collection('blog').where('status', '==', 'published').get();

  const seoSnap = await db.collection('global').doc('seo').get();
  const settingsSnap = await db.collection('global').doc('settings').get();

  const publishedServices = servicesSnap.docs.map(d => d.data());
  const publishedPages = pagesSnap.docs.reduce((acc, d) => {
    acc[d.id] = d.data();
    return acc;
  }, {});
  const publishedLocations = locationsSnap.docs.map(d => d.data());
  
  if (process.env.CI === 'true' || process.env.GITHUB_ACTIONS === 'true') {
    if (publishedServices.length === 0 && Object.keys(publishedPages).length === 0) {
      console.error('[Sync] Fatal: Required published content (services/pages) is missing from Firestore. Aborting production build.');
      process.exit(1);
    }
  }
  
  const publishedBlog = blogSnap.docs.map(d => d.data()).sort((a, b) => new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime());

  return {
    services: publishedServices,
    pages: publishedPages,
    locations: publishedLocations,
    blog: publishedBlog,
    seo: seoSnap.exists ? seoSnap.data() : {},
    settings: settingsSnap.exists ? settingsSnap.data() : {},
    exportedAt: new Date().toISOString()
  };
}

async function sync() {
  const BASE_URL = 'https://assistroofing.com.au';
  const TODAY = new Date().toISOString().split('T')[0];

  if (isPrerenderOnly) {
    console.log('[CMS Build Sync] Starting HTML Pre-rendering...');
    const DIST_DIR = path.join(__dirname, '..', 'dist');
    const DIST_INDEX = path.join(DIST_DIR, 'index.html');
    
    if (!fs.existsSync(DIST_INDEX)) {
      throw new Error(`[CMS Build Sync] Pre-rendering failed: ${DIST_INDEX} does not exist. Run vite build first.`);
    }

    // Read snapshot from dist if it exists, otherwise use mock
    const DIST_DATA_DIR = path.join(DIST_DIR, 'data');
    const snapshotPath = path.join(DIST_DATA_DIR, 'cms-content.json');
    let snapshot = {};
    if (fs.existsSync(snapshotPath)) {
      snapshot = JSON.parse(fs.readFileSync(snapshotPath, 'utf8'));
    }

    // Basic routes
    const CANONICAL_ROUTES = [
      {
        path: '',
        title: 'Roofing Contractor & Roof Restoration Melbourne | Assist Roofing',
        description: "Melbourne's trusted roofing contractor for Colorbond restorations, emergency leak repairs & inspections. VBA registered, 10-year warranty. Free quote.",
        priority: '1.0',
        changefreq: 'weekly',
        image: { loc: 'https://assistroofing.com.au/roofora-assets/images/portfolio-img1.jpg', title: 'Assist Roofing' }
      },
      { path: 'about', title: 'About Us | Assist Roofing', description: 'About Assist Roofing', priority: '0.8', changefreq: 'monthly' },
      { path: 'services', title: 'Services | Assist Roofing', description: 'Roofing Services', priority: '0.9', changefreq: 'weekly' },
      { path: 'contact', title: 'Contact | Assist Roofing', description: 'Contact Assist Roofing', priority: '0.9', changefreq: 'monthly' },
      { path: 'gallery', title: 'Gallery | Assist Roofing', description: 'View our past roofing projects', priority: '0.8', changefreq: 'monthly' },
      { path: 'testimonials', title: 'Testimonials | Assist Roofing', description: 'Read what our clients say about us', priority: '0.8', changefreq: 'monthly' }
    ];

    if (snapshot.locations) {
      snapshot.locations.forEach(loc => {
        CANONICAL_ROUTES.push({
          path: `locations/${loc.slug}`,
          title: loc.seoTitle || loc.pageTitle,
          description: loc.metaDescription,
          priority: '0.7',
          changefreq: 'monthly'
        });
      });
    }

    fs.copyFileSync(DIST_INDEX, path.join(DIST_DIR, '404.html'));
    
    const distAdminDir = path.join(DIST_DIR, 'admin');
    if (!fs.existsSync(distAdminDir)) fs.mkdirSync(distAdminDir, { recursive: true });
    fs.copyFileSync(DIST_INDEX, path.join(distAdminDir, 'index.html'));
    
    const originalHtml = fs.readFileSync(DIST_INDEX, 'utf-8');

    for (const route of CANONICAL_ROUTES) {
      if (!route.path) continue; 
      const routeDir = path.join(DIST_DIR, ...route.path.split('/'));
      if (!fs.existsSync(routeDir)) {
        fs.mkdirSync(routeDir, { recursive: true });
      }

      const canonicalUrl = `${BASE_URL}/${route.path}`;
      let routeHtml = originalHtml;
      routeHtml = routeHtml.replace(/<title>.*?<\/title>/i, `<title>${route.title}</title>`);
      routeHtml = routeHtml.replace(/<meta\s+name=["']description["']\s+content=["'].*?["']\s*\/?>/i, `<meta name="description" content="${route.description}" />`);
      routeHtml = routeHtml.replace(/<link\s+rel=["']canonical["']\s+href=["'].*?["']\s*\/?>/i, `<link rel="canonical" href="${canonicalUrl}" />`);
      
      const targetPath = path.join(routeDir, 'index.html');
      fs.writeFileSync(targetPath, routeHtml, 'utf-8');
    }
    console.log('[CMS Build Sync] Pre-rendering completed.');
    return;
  }

  // SNAPSHOT PHASE
  console.log('[CMS Build Sync] Starting Firestore Data Snapshot...');
  const PUBLIC_DATA_DIR = path.join(__dirname, '..', 'public', 'data');
  if (!fs.existsSync(PUBLIC_DATA_DIR)) {
    fs.mkdirSync(PUBLIC_DATA_DIR, { recursive: true });
  }

  const PUBLIC_CONTENT_FILE = path.join(PUBLIC_DATA_DIR, 'cms-content.json');
  const publicSnapshot = await fetchSnapshot();

  fs.writeFileSync(PUBLIC_CONTENT_FILE, JSON.stringify(publicSnapshot, null, 2), 'utf-8');
  console.log(`[CMS Build Sync] Successfully generated CMS content to ${PUBLIC_CONTENT_FILE}`);

  // Sitemap generation
  const CANONICAL_ROUTES = [
    { path: '', changefreq: 'weekly', priority: '1.0' },
    { path: 'about', changefreq: 'monthly', priority: '0.8' },
    { path: 'services', changefreq: 'weekly', priority: '0.9' },
    { path: 'contact', changefreq: 'monthly', priority: '0.9' },
    { path: 'gallery', changefreq: 'monthly', priority: '0.8' },
    { path: 'testimonials', changefreq: 'monthly', priority: '0.8' }
  ];

  if (publicSnapshot.locations) {
    publicSnapshot.locations.forEach(loc => {
      CANONICAL_ROUTES.push({ path: `locations/${loc.slug}`, priority: '0.7', changefreq: 'monthly' });
    });
  }

  const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${CANONICAL_ROUTES.map(route => {
  const loc = route.path ? `${BASE_URL}/${route.path}` : `${BASE_URL}/`;
  return `  <url>
    <loc>${loc}</loc>
    <lastmod>${TODAY}</lastmod>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>
  </url>`;
}).join('\n')}
</urlset>
`;
  const PUBLIC_SITEMAP_FILE = path.join(__dirname, '..', 'public', 'sitemap.xml');
  fs.writeFileSync(PUBLIC_SITEMAP_FILE, sitemapXml, 'utf-8');
  console.log(`[CMS Build Sync] Generated sitemap at ${PUBLIC_SITEMAP_FILE}`);
}

sync().catch(err => {
  console.error('[CMS Build Sync] Fatal Error', err);
  process.exit(1);
});
