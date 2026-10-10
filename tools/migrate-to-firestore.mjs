import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { getApps, initializeApp } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DRY_RUN = process.argv.includes('--dry-run');
const MAX_BATCH_SIZE = 450; // Firestore limit is 500; leave margin

// Initialize Firebase Admin (Uses GOOGLE_APPLICATION_CREDENTIALS or Emulator)
if (!getApps().length) {
  if (process.env.FIRESTORE_EMULATOR_HOST) {
    console.log('[Migration] Using Firestore Emulator at', process.env.FIRESTORE_EMULATOR_HOST);
    initializeApp({ projectId: 'project-1-c8b7e' });
  } else {
    initializeApp();
  }
}

const db = getFirestore();

async function writeBatch(ops) {
  if (ops.length === 0) return;

  // Chunk into safe batch sizes
  for (let i = 0; i < ops.length; i += MAX_BATCH_SIZE) {
    const chunk = ops.slice(i, i + MAX_BATCH_SIZE);
    const batch = db.batch();
    for (const { ref, data } of chunk) {
      batch.set(ref, data);
    }
    if (DRY_RUN) {
      console.log(`  [DRY RUN] Would write batch of ${chunk.length} documents`);
    } else {
      await batch.commit();
      console.log(`  Committed batch of ${chunk.length} documents`);
    }
  }
}

function validateRecord(collectionName, item) {
  const errors = [];
  if (!item.id || typeof item.id !== 'string') {
    errors.push(`Missing or invalid 'id' field`);
  }
  if (item.id && item.id.length > 1500) {
    errors.push(`Document ID exceeds Firestore limit (${item.id.length} chars)`);
  }
  // Collection-specific validation
  if (['pages', 'services', 'locations', 'blog'].includes(collectionName)) {
    if (!item.status || !['published', 'draft'].includes(item.status)) {
      errors.push(`Invalid or missing 'status' field: ${item.status}`);
    }
  }
  return errors;
}

async function migrate() {
  console.log(`[Migration] Starting migration to Firestore${DRY_RUN ? ' (DRY RUN)' : ''}...`);
  const DB_FILE = path.join(__dirname, '..', 'server', 'data', 'db.json');
  if (!fs.existsSync(DB_FILE)) {
    // Try recovering from git
    console.error(`[Migration] Could not find db.json at ${DB_FILE}`);
    console.error('[Migration] If the file was deleted, recover it with: git checkout HEAD -- server/data/db.json');
    process.exit(1);
  }

  const raw = fs.readFileSync(DB_FILE, 'utf-8');
  const data = JSON.parse(raw);

  const collections = ['services', 'pages', 'locations', 'blog', 'media', 'enquiries', 'activity'];
  let totalDocs = 0;
  let totalErrors = 0;

  for (const collectionName of collections) {
    if (data[collectionName] && Array.isArray(data[collectionName])) {
      const items = data[collectionName];
      console.log(`[Migration] Processing collection: ${collectionName} (${items.length} items)`);

      const ops = [];
      for (const item of items) {
        const errors = validateRecord(collectionName, item);
        if (errors.length > 0) {
          console.warn(`  WARNING: Skipping ${collectionName}/${item.id || '(no id)'}: ${errors.join(', ')}`);
          totalErrors++;
          continue;
        }
        const docRef = db.collection(collectionName).doc(item.id);
        ops.push({ ref: docRef, data: item });
      }

      await writeBatch(ops);
      totalDocs += ops.length;
      console.log(`[Migration] Completed ${collectionName}: ${ops.length} documents.`);
    } else {
      console.log(`[Migration] Skipping ${collectionName}: not found or not an array.`);
    }
  }

  // Singletons (SEO, Settings) — stored under global/ collection
  if (data.seo) {
    console.log(`[Migration] Processing document: global/seo`);
    if (DRY_RUN) {
      console.log(`  [DRY RUN] Would write global/seo`);
    } else {
      await db.collection('global').doc('seo').set(data.seo);
      console.log(`  Committed global/seo`);
    }
    totalDocs++;
  }
  if (data.settings) {
    console.log(`[Migration] Processing document: global/settings`);
    if (DRY_RUN) {
      console.log(`  [DRY RUN] Would write global/settings`);
    } else {
      await db.collection('global').doc('settings').set(data.settings);
      console.log(`  Committed global/settings`);
    }
    totalDocs++;
  }

  console.log('');
  console.log(`[Migration] ========== SUMMARY ==========`);
  console.log(`[Migration] Total documents: ${totalDocs}`);
  console.log(`[Migration] Validation errors (skipped): ${totalErrors}`);
  console.log(`[Migration] Mode: ${DRY_RUN ? 'DRY RUN (no data written)' : 'LIVE'}`);
  console.log(`[Migration] Migration ${DRY_RUN ? 'dry run' : ''} completed successfully.`);
  process.exit(0);
}

migrate().catch(err => {
  console.error('[Migration] Fatal error:', err);
  process.exit(1);
});
