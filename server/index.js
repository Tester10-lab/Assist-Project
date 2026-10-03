import express from 'express';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import apiApp from './api.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;
const DIST_DIR = path.join(__dirname, '..', 'dist');
const UPLOADS_DIR = path.join(__dirname, '..', 'public', 'uploads');

// Ensure uploads directory exists
if (!fs.existsSync(UPLOADS_DIR)) {
  fs.mkdirSync(UPLOADS_DIR, { recursive: true });
}

// Mount CMS API
app.use(apiApp);

// Serve uploaded media files directly
app.use('/uploads', express.static(UPLOADS_DIR));

// Serve static build assets without automatic trailing-slash redirection
// This preserves canonical URLs (e.g. /services/roof-restoration) with 200 OK responses
app.use(express.static(DIST_DIR, { redirect: false, index: false }));

// Pre-rendered deep routes and client-side SPA routing fallback (Express 5 compatible)
app.use((req, res) => {
  // Strip leading and trailing slashes for clean route matching
  const cleanPath = req.path.replace(/^\/+|\/+$/g, '');

  if (cleanPath) {
    // 1. Check if a pre-rendered deep-route HTML stub exists (e.g. dist/services/roof-restoration/index.html)
    const deepRouteHtml = path.join(DIST_DIR, cleanPath, 'index.html');
    if (fs.existsSync(deepRouteHtml)) {
      return res.sendFile(deepRouteHtml);
    }

    // 2. Check if a direct file exists in dist (e.g. dist/sitemap.xml, dist/robots.txt)
    const directFile = path.join(DIST_DIR, cleanPath);
    if (fs.existsSync(directFile) && fs.statSync(directFile).isFile()) {
      return res.sendFile(directFile);
    }
  }

  // 3. Fallback to main index.html for root or SPA client-side routing
  const indexHtml = path.join(DIST_DIR, 'index.html');
  if (fs.existsSync(indexHtml)) {
    return res.sendFile(indexHtml);
  }

  res.status(404).send('Not Found');
});

const server = app.listen(PORT, () => {
  console.log(`[Assist CMS Server] Running on http://localhost:${PORT}`);
  console.log(`[Assist CMS Server] Public Website: http://localhost:${PORT}/`);
  console.log(`[Assist CMS Server] Admin Panel:    http://localhost:${PORT}/admin`);
});

export default app;
export { app, server };
