import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import apiApp from './api.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;
const DIST_DIR = path.join(__dirname, '..', 'dist');

// Mount CMS API
app.use(apiApp);

// Serve static build assets
app.use(express.static(DIST_DIR));

// Fallback to index.html for SPA client-side routing
app.get('*', (req, res) => {
  res.sendFile(path.join(DIST_DIR, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`[Assist CMS Server] Running on http://localhost:${PORT}`);
  console.log(`[Assist CMS Server] Public Website: http://localhost:${PORT}/`);
  console.log(`[Assist CMS Server] Admin Panel:    http://localhost:${PORT}/admin`);
});
