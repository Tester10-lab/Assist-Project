/**
 * One-time setup script to create the Firebase Auth admin user
 * and set the { admin: true } custom claim.
 *
 * Prerequisites:
 *   - GOOGLE_APPLICATION_CREDENTIALS env var pointing to a service account key
 *   - OR FIRESTORE_EMULATOR_HOST set for local testing
 *
 * Usage:
 *   node tools/setup-admin.mjs                          # Create admin user
 *   node tools/setup-admin.mjs --email other@domain.com # Custom email
 *   node tools/setup-admin.mjs --set-claim-only         # Only set claim on existing user
 *   node tools/setup-admin.mjs --dry-run                # Preview without changes
 */
import { getApps, initializeApp } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';

const DRY_RUN = process.argv.includes('--dry-run');
const SET_CLAIM_ONLY = process.argv.includes('--set-claim-only');

// Parse --email flag
let adminEmail = 'admin@assistroofing.com.au';
const emailFlagIndex = process.argv.indexOf('--email');
if (emailFlagIndex !== -1 && process.argv[emailFlagIndex + 1]) {
  adminEmail = process.argv[emailFlagIndex + 1];
}

// Initialize Firebase Admin
if (!getApps().length) {
  if (process.env.FIRESTORE_EMULATOR_HOST || process.env.FIREBASE_AUTH_EMULATOR_HOST) {
    console.log('[Setup] Using Firebase Emulators');
    initializeApp({ projectId: 'project-1-c8b7e' });
  } else if (process.env.GOOGLE_APPLICATION_CREDENTIALS) {
    initializeApp();
  } else {
    console.error('[Setup] Fatal: No credentials found.');
    console.error('  Set GOOGLE_APPLICATION_CREDENTIALS to your service account key file.');
    console.error('  Or set FIREBASE_AUTH_EMULATOR_HOST for local testing.');
    process.exit(1);
  }
}

const auth = getAuth();

async function setup() {
  console.log(`[Setup] Admin email: ${adminEmail}`);
  console.log(`[Setup] Mode: ${DRY_RUN ? 'DRY RUN' : 'LIVE'}`);
  console.log('');

  let uid;

  // Step 1: Find or create the user
  try {
    const existingUser = await auth.getUserByEmail(adminEmail);
    uid = existingUser.uid;
    console.log(`[Setup] Found existing user: ${uid}`);

    if (!SET_CLAIM_ONLY) {
      console.log('[Setup] User already exists. Use --set-claim-only to update claims on an existing user.');
    }
  } catch (err) {
    if (err.code === 'auth/user-not-found') {
      if (SET_CLAIM_ONLY) {
        console.error(`[Setup] Fatal: User ${adminEmail} not found. Cannot set claims on a non-existent user.`);
        process.exit(1);
      }

      console.log('[Setup] User does not exist. Creating...');

      // Generate a temporary password — admin should change it on first login
      const tempPassword = generateTempPassword();

      if (DRY_RUN) {
        console.log(`[Setup] [DRY RUN] Would create user with email: ${adminEmail}`);
        console.log(`[Setup] [DRY RUN] Would set custom claim: { admin: true }`);
        console.log('');
        console.log('[Setup] Dry run complete. No changes made.');
        process.exit(0);
      }

      const newUser = await auth.createUser({
        email: adminEmail,
        password: tempPassword,
        displayName: 'Administrator',
        emailVerified: true
      });
      uid = newUser.uid;
      console.log(`[Setup] Created user: ${uid}`);
      console.log('');
      console.log('  ╔══════════════════════════════════════════════════╗');
      console.log(`  ║  Temporary password: ${tempPassword}            ║`);
      console.log('  ║  Change this password immediately after login!  ║');
      console.log('  ╚══════════════════════════════════════════════════╝');
      console.log('');
    } else {
      throw err;
    }
  }

  // Step 2: Set custom claim
  if (DRY_RUN) {
    console.log(`[Setup] [DRY RUN] Would set custom claim { admin: true } on user ${uid}`);
    console.log('[Setup] Dry run complete. No changes made.');
    process.exit(0);
  }

  await auth.setCustomUserClaims(uid, { admin: true });
  console.log(`[Setup] Set custom claim { admin: true } on user ${uid}`);

  // Step 3: Verify
  const verifiedUser = await auth.getUser(uid);
  const claims = verifiedUser.customClaims || {};
  if (claims.admin === true) {
    console.log('[Setup] Verified: admin claim is set correctly.');
  } else {
    console.error('[Setup] ERROR: Verification failed. Custom claims:', claims);
    process.exit(1);
  }

  console.log('');
  console.log('[Setup] Admin setup complete.');
  console.log('[Setup] The user can now log in at /admin with their credentials.');
}

function generateTempPassword() {
  const chars = 'ABCDEFGHJKMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789!@#$%';
  let password = '';
  for (let i = 0; i < 16; i++) {
    password += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return password;
}

setup().catch(err => {
  console.error('[Setup] Fatal error:', err);
  process.exit(1);
});
