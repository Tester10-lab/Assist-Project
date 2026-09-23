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

// Also copy to dist if dist exists
const DIST_DIR = path.join(__dirname, '..', 'dist');
if (fs.existsSync(DIST_DIR)) {
  const DIST_DATA_DIR = path.join(DIST_DIR, 'data');
  if (!fs.existsSync(DIST_DATA_DIR)) {
    fs.mkdirSync(DIST_DATA_DIR, { recursive: true });
  }
  fs.writeFileSync(path.join(DIST_DATA_DIR, 'cms-content.json'), JSON.stringify(publicSnapshot, null, 2), 'utf-8');
  console.log(`[CMS Build Sync] Synced CMS content to dist/data/cms-content.json`);

  // GitHub Pages SPA Routing Support:
  // 1. Copy index.html to 404.html so GitHub Pages serves the SPA on unknown/deep routes
  const distIndex = path.join(DIST_DIR, 'index.html');
  if (fs.existsSync(distIndex)) {
    fs.copyFileSync(distIndex, path.join(DIST_DIR, '404.html'));
    console.log(`[CMS Build Sync] Created dist/404.html for GitHub Pages SPA routing`);

    // 2. Create dist/admin/index.html so /admin returns 200 OK directly
    const distAdminDir = path.join(DIST_DIR, 'admin');
    if (!fs.existsSync(distAdminDir)) {
      fs.mkdirSync(distAdminDir, { recursive: true });
    }
    fs.copyFileSync(distIndex, path.join(distAdminDir, 'index.html'));
    console.log(`[CMS Build Sync] Created dist/admin/index.html for direct /admin route serving`);
  }
}
