import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { db } from './db.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PUBLIC_DATA_DIR = path.join(__dirname, '..', 'public', 'data');
if (!fs.existsSync(PUBLIC_DATA_DIR)) {
  fs.mkdirSync(PUBLIC_DATA_DIR, { recursive: true });
}

const PUBLIC_CONTENT_FILE = path.join(PUBLIC_DATA_DIR, 'cms-content.json');

const publishedServices = db.data.services
  .filter(s => s.status === 'published')
  .sort((a, b) => (a.order || 99) - (b.order || 99));

const publishedPages = db.data.pages
  .filter(p => p.status === 'published')
  .reduce((acc, p) => {
    acc[p.id] = p;
    return acc;
  }, {});

const publishedLocations = db.data.locations
  .filter(l => l.status === 'published');

const publishedBlog = db.data.blog
  .filter(b => b.status === 'published')
  .sort((a, b) => new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime());

const publicSnapshot = {
  services: publishedServices,
  pages: publishedPages,
  locations: publishedLocations,
  blog: publishedBlog,
  seo: db.data.seo,
  settings: db.data.settings,
  exportedAt: new Date().toISOString()
};

fs.writeFileSync(PUBLIC_CONTENT_FILE, JSON.stringify(publicSnapshot, null, 2), 'utf-8');
console.log(`[CMS Build Sync] Successfully synced published CMS content to ${PUBLIC_CONTENT_FILE}`);

// ── SITEMAP & STATIC DEEP ROUTES ARCHITECTURE ──
const BASE_URL = 'https://assistroofing.com.au';
const TODAY = new Date().toISOString().split('T')[0];

const CANONICAL_ROUTES = [
  {
    path: '',
    title: 'Roofing Contractor & Roof Restoration Melbourne | Assist Roofing',
    description: "Melbourne's trusted roofing contractor for Colorbond restorations, emergency leak repairs & inspections. VBA registered, 10-year warranty. Free quote.",
    priority: '1.0',
    changefreq: 'weekly',
    image: {
      loc: 'https://assistroofing.com.au/roofora-assets/images/portfolio-img1.jpg',
      title: 'Assist Roofing Melbourne - Professional Roof Restoration'
    }
  },
  {
    path: 'about',
    title: 'About Us | VBA Registered Roofers Melbourne | Assist Roofing',
    description: "Learn about Assist Roofing's 8+ years of Melbourne roofing expertise, VBA-registered master trades, $10M insurance, and clean jobsite promise.",
    priority: '0.8',
    changefreq: 'monthly',
    image: {
      loc: 'https://assistroofing.com.au/roofora-assets/images/about-img1.jpg',
      title: 'About Assist Roofing Melbourne'
    }
  },
  {
    path: 'services',
    title: 'Roofing Services Melbourne | Repairs, Restoration & Re-Roofing',
    description: 'Explore comprehensive Melbourne roofing services: Colorbond roof replacements, emergency leak repairs, guttering, and restorations backed by a 10-year warranty.',
    priority: '0.9',
    changefreq: 'weekly'
  },
  {
    path: 'services/roof-restoration',
    title: 'Roof Restoration Melbourne | Tile Cleaning & SupaPoint Pointing',
    description: 'Professional Melbourne roof restorations by VBA registered trades. High-pressure cleaning, SupaPoint flexible repointing, tile repairs, and 10-year warranty.',
    priority: '0.9',
    changefreq: 'weekly',
    image: {
      loc: 'https://assistroofing.com.au/roofora-assets/images/services-img4.jpg',
      title: 'Roof Restoration Melbourne - Tile Repointing and Membrane Sealing'
    }
  },
  {
    path: 'services/roof-repairs',
    title: 'Emergency Roof Repairs Melbourne | Broken Tiles & Leak Repairs',
    description: 'Fast, reliable emergency roof repairs across Melbourne. We repair cracked tiles, leaking flashings, storm damage, and rusted valleys. Starting from $550.',
    priority: '0.9',
    changefreq: 'weekly',
    image: {
      loc: 'https://assistroofing.com.au/roofora-assets/images/services-img1.jpg',
      title: 'Emergency Roof Leak Repairs Melbourne'
    }
  },
  {
    path: 'services/roof-replacement',
    title: 'Roof Replacement Melbourne | Tile to Colorbond Re-Roofing',
    description: 'Complete roof replacement and tile-to-Colorbond re-roofing in Melbourne. AS/NZS 4200.1 sarking, treated timber battens, and 10-year workmanship warranty.',
    priority: '0.9',
    changefreq: 'weekly',
    image: {
      loc: 'https://assistroofing.com.au/roofora-assets/images/services-img2.jpg',
      title: 'Roof Replacement & Re-Roofing Melbourne'
    }
  },
  {
    path: 'services/colorbond-roofing',
    title: 'Colorbond Roofing Melbourne | BlueScope Steel Installation',
    description: 'Expert Colorbond metal roofing installations across Melbourne. Genuine BlueScope steel, 22 designer colors, AS 1562.1 compliance & up to 25-year warranty.',
    priority: '0.9',
    changefreq: 'weekly',
    image: {
      loc: 'https://assistroofing.com.au/roofora-assets/images/services-img3.jpg',
      title: 'Colorbond Steel Roofing Melbourne'
    }
  },
  {
    path: 'services/guttering',
    title: 'Gutter Replacement Melbourne | Colorbond Gutters & Leaf Guard',
    description: 'High-capacity Colorbond gutter replacement, downpipes & leaf guard across Melbourne. Prevent overflow and foundation damage with VBA registered roof plumbers.',
    priority: '0.8',
    changefreq: 'monthly',
    image: {
      loc: 'https://assistroofing.com.au/roofora-assets/images/services-img5.jpg',
      title: 'Gutter Replacement and Downpipe Repairs Melbourne'
    }
  },
  {
    path: 'services/leak-detection',
    title: 'Roof Leak Detection Melbourne | Drone Inspection & Moisture Tests',
    description: 'Pinpoint roof leak detection in Melbourne using digital drone imaging and electronic moisture meters. $350 inspection fee credited toward repair when hired.',
    priority: '0.9',
    changefreq: 'weekly',
    image: {
      loc: 'https://assistroofing.com.au/roofora-assets/images/services-img6.jpg',
      title: 'Roof Leak Detection & Drone Thermal Inspection Melbourne'
    }
  },
  {
    path: 'projects',
    title: 'Roofing Projects Gallery Melbourne | Before & After Photos',
    description: 'Browse completed roofing projects across Melbourne. High-resolution before and after photos of tile restorations, Colorbond replacements, and re-bedding.',
    priority: '0.8',
    changefreq: 'weekly'
  },
  {
    path: 'testimonials',
    title: 'Customer Reviews & Testimonials | Assist Roofing Melbourne',
    description: 'Read verified Google customer reviews for Assist Roofing Melbourne. 4.9/5 average rating across 520+ reviews for roof restorations, leak repairs & re-roofing.',
    priority: '0.8',
    changefreq: 'monthly'
  },
  {
    path: 'contact',
    title: 'Contact Assist Roofing Melbourne | Book Free Roof Inspection',
    description: 'Contact Assist Roofing in North Melbourne. Call 0478 250 790 or book a free on-site roof condition assessment and itemized fixed-price quote.',
    priority: '0.9',
    changefreq: 'monthly'
  }
];

function escapeXml(unsafe) {
  if (!unsafe) return '';
  return String(unsafe)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

// Generate Clean Sitemap (No hash fragments, strictly canonical indexable URLs with image sitemap extension)
const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${CANONICAL_ROUTES.map(route => {
  const loc = route.path ? `${BASE_URL}/${route.path}` : `${BASE_URL}/`;
  const imageXml = route.image ? `
    <image:image>
      <image:loc>${escapeXml(route.image.loc)}</image:loc>
      <image:title>${escapeXml(route.image.title)}</image:title>
    </image:image>` : '';
  return `  <url>
    <loc>${escapeXml(loc)}</loc>
    <lastmod>${TODAY}</lastmod>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>${imageXml}
  </url>`;
}).join('\n')}
</urlset>
`;

// Write sitemap to public/sitemap.xml
const PUBLIC_SITEMAP_FILE = path.join(__dirname, '..', 'public', 'sitemap.xml');
fs.writeFileSync(PUBLIC_SITEMAP_FILE, sitemapXml, 'utf-8');
console.log(`[CMS Build Sync] Generated clean canonical sitemap at ${PUBLIC_SITEMAP_FILE}`);

// Also copy to dist if dist exists
const DIST_DIR = path.join(__dirname, '..', 'dist');
if (fs.existsSync(DIST_DIR)) {
  const DIST_DATA_DIR = path.join(DIST_DIR, 'data');
  if (!fs.existsSync(DIST_DATA_DIR)) {
    fs.mkdirSync(DIST_DATA_DIR, { recursive: true });
  }
  fs.writeFileSync(path.join(DIST_DATA_DIR, 'cms-content.json'), JSON.stringify(publicSnapshot, null, 2), 'utf-8');
  console.log(`[CMS Build Sync] Synced CMS content to dist/data/cms-content.json`);

  // Write sitemap to dist/sitemap.xml
  fs.writeFileSync(path.join(DIST_DIR, 'sitemap.xml'), sitemapXml, 'utf-8');
  console.log(`[CMS Build Sync] Generated dist/sitemap.xml`);

  // Sync llms.txt & llms-full.txt to dist
  const publicLlms = path.join(__dirname, '..', 'public', 'llms.txt');
  const publicLlmsFull = path.join(__dirname, '..', 'public', 'llms-full.txt');
  if (fs.existsSync(publicLlms)) {
    fs.copyFileSync(publicLlms, path.join(DIST_DIR, 'llms.txt'));
  }
  if (fs.existsSync(publicLlmsFull)) {
    fs.copyFileSync(publicLlmsFull, path.join(DIST_DIR, 'llms-full.txt'));
  }

  // GitHub Pages SPA Routing Support:
  const distIndex = path.join(DIST_DIR, 'index.html');
  if (fs.existsSync(distIndex)) {
    // 1. Copy index.html to 404.html so GitHub Pages serves the SPA on unknown routes
    fs.copyFileSync(distIndex, path.join(DIST_DIR, '404.html'));
    console.log(`[CMS Build Sync] Created dist/404.html for GitHub Pages fallback routing`);

    // 2. Create dist/admin/index.html so /admin returns 200 OK directly
    const distAdminDir = path.join(DIST_DIR, 'admin');
    if (!fs.existsSync(distAdminDir)) {
      fs.mkdirSync(distAdminDir, { recursive: true });
    }
    fs.copyFileSync(distIndex, path.join(distAdminDir, 'index.html'));
    console.log(`[CMS Build Sync] Created dist/admin/index.html for direct /admin route serving`);

    // 3. Generate Static Deep-Route Directory Stubs with Custom Pre-Rendered Metadata
    const originalHtml = fs.readFileSync(distIndex, 'utf-8');

    for (const route of CANONICAL_ROUTES) {
      if (!route.path) continue; // Root index.html already exists

      const routeDir = path.join(DIST_DIR, ...route.path.split('/'));
      if (!fs.existsSync(routeDir)) {
        fs.mkdirSync(routeDir, { recursive: true });
      }

      const canonicalUrl = `${BASE_URL}/${route.path}`;

      // Customize metadata for direct crawler & browser loads
      let routeHtml = originalHtml;

      // Replace title
      routeHtml = routeHtml.replace(/<title>.*?<\/title>/i, `<title>${route.title}</title>`);

      // Replace description
      routeHtml = routeHtml.replace(
        /<meta\s+name=["']description["']\s+content=["'].*?["']\s*\/?>/i,
        `<meta name="description" content="${route.description}" />`
      );

      // Replace canonical
      routeHtml = routeHtml.replace(
        /<link\s+rel=["']canonical["']\s+href=["'].*?["']\s*\/?>/i,
        `<link rel="canonical" href="${canonicalUrl}" />`
      );

      // Replace OG Title, Description, and URL
      routeHtml = routeHtml.replace(
        /<meta\s+property=["']og:title["']\s+content=["'].*?["']\s*\/?>/i,
        `<meta property="og:title" content="${route.title}" />`
      );
      routeHtml = routeHtml.replace(
        /<meta\s+property=["']og:description["']\s+content=["'].*?["']\s*\/?>/i,
        `<meta property="og:description" content="${route.description}" />`
      );
      routeHtml = routeHtml.replace(
        /<meta\s+property=["']og:url["']\s+content=["'].*?["']\s*\/?>/i,
        `<meta property="og:url" content="${canonicalUrl}" />`
      );

      // Replace Twitter Title and Description
      routeHtml = routeHtml.replace(
        /<meta\s+name=["']twitter:title["']\s+content=["'].*?["']\s*\/?>/i,
        `<meta name="twitter:title" content="${route.title}" />`
      );
      routeHtml = routeHtml.replace(
        /<meta\s+name=["']twitter:description["']\s+content=["'].*?["']\s*\/?>/i,
        `<meta name="twitter:description" content="${route.description}" />`
      );

      // Replace OG Image and Twitter Image if specific image provided
      if (route.image?.loc) {
        routeHtml = routeHtml.replace(
          /<meta\s+property=["']og:image["']\s+content=["'].*?["']\s*\/?>/i,
          `<meta property="og:image" content="${route.image.loc}" />`
        );
        routeHtml = routeHtml.replace(
          /<meta\s+name=["']twitter:image["']\s+content=["'].*?["']\s*\/?>/i,
          `<meta name="twitter:image" content="${route.image.loc}" />`
        );
      }

      const targetPath = path.join(routeDir, 'index.html');
      fs.writeFileSync(targetPath, routeHtml, 'utf-8');
      console.log(`[CMS Build Sync] Created static deep route: dist/${route.path}/index.html (200 OK + custom SEO)`);
    }
  }
}
