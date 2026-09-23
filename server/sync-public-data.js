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
