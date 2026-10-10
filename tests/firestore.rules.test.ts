import { initializeTestEnvironment, RulesTestEnvironment, assertFails, assertSucceeds } from '@firebase/rules-unit-testing';
import { readFileSync } from 'fs';
import { resolve } from 'path';
import { describe, beforeAll, afterAll, beforeEach, it } from 'vitest';

let testEnv: RulesTestEnvironment;

beforeAll(async () => {
  // Read rules file
  const rules = readFileSync(resolve(__dirname, '../firestore.rules'), 'utf8');
  
  // Initialize test environment
  testEnv = await initializeTestEnvironment({
    projectId: 'demo-project-1-c8b7e',
    firestore: {
      rules,
      host: '127.0.0.1',
      port: 8080,
    },
  });
});

beforeEach(async () => {
  // Clear the database between tests
  await testEnv.clearFirestore();
});

afterAll(async () => {
  // Cleanup test environment
  if (testEnv) {
    await testEnv.cleanup();
  }
});

describe('Firestore Security Rules', () => {
  const getContext = (auth?: { uid: string; email?: string; token?: { admin?: boolean } }) => {
    return auth 
      ? testEnv.authenticatedContext(auth.uid, { email: auth.email, ...auth.token })
      : testEnv.unauthenticatedContext();
  };

  describe('Enquiries Collection (Public)', () => {
    it('should deny unauthenticated reads', async () => {
      const db = getContext().firestore();
      await assertFails(db.collection('enquiries').get());
    });

    it('should allow public to create an enquiry with valid schema', async () => {
      const db = getContext().firestore();
      const validEnquiry = {
        name: 'John Doe',
        phone: '0400000000',
        email: 'john@example.com',
        address: '123 Fake St',
        service: 'Roof Leak',
        message: 'Help',
        type: 'contact',
        status: 'new',
        createdAt: new Date().toISOString()
      };
      const docRef = db.collection('enquiries').doc('new-enq');
      await assertSucceeds(docRef.set(validEnquiry));
    });

    it('should deny public creating enquiry with invalid status', async () => {
      const db = getContext().firestore();
      const invalidEnquiry = {
        name: 'John Doe',
        phone: '0400000000',
        email: 'john@example.com',
        address: '123 Fake St',
        service: 'Roof Leak',
        message: 'Help',
        type: 'contact',
        status: 'completed', // not "new"
        createdAt: new Date().toISOString()
      };
      const docRef = db.collection('enquiries').doc('new-enq2');
      await assertFails(docRef.set(invalidEnquiry));
    });
  });

  describe('CMS Collections (Admin only)', () => {
    it('should allow public reads to published services', async () => {
      const db = getContext().firestore();
      await assertSucceeds(db.collection('services').where('status', '==', 'published').get());
    });

    it('should allow public reads to published pages', async () => {
      const db = getContext().firestore();
      await assertSucceeds(db.collection('pages').where('status', '==', 'published').get());
    });

    it('should deny public reads to global settings', async () => {
      const db = getContext().firestore();
      await assertFails(db.collection('global').get());
    });

    it('should deny public writes to global settings', async () => {
      const db = getContext().firestore();
      await assertFails(db.collection('global').doc('settings').set({ foo: 'bar' }));
    });

    it('should allow admin writes to global settings', async () => {
      const adminDb = getContext({ uid: 'admin-123', email: 'admin@assistroofing.com.au', token: { admin: true } }).firestore();
      await assertSucceeds(adminDb.collection('global').doc('settings').set({ foo: 'bar' }));
    });
    
    it('should allow admin via email whitelist to write to global settings', async () => {
      const adminDb = getContext({ uid: 'admin-456', email: 'admin@assistroofing.com.au' }).firestore();
      await assertSucceeds(adminDb.collection('global').doc('seo').set({ title: 'test' }));
    });
    
    it('should deny non-admin writes to global settings', async () => {
      const userDb = getContext({ uid: 'user-123', email: 'user@example.com' }).firestore();
      await assertFails(userDb.collection('global').doc('settings').set({ foo: 'bar' }));
    });
  });

  describe('Private Admin Activity Collection', () => {
    it('should deny public reads to activity logs', async () => {
      const db = getContext().firestore();
      await assertFails(db.collection('activity_logs').get());
    });
    
    it('should deny non-admin reads to activity logs', async () => {
      const userDb = getContext({ uid: 'user-123', email: 'user@example.com' }).firestore();
      await assertFails(userDb.collection('activity_logs').get());
    });
    
    it('should allow admin to write and read activity logs', async () => {
      const adminDb = getContext({ uid: 'admin-123', token: { admin: true } }).firestore();
      const logRef = adminDb.collection('activity_logs').doc('log1');
      await assertSucceeds(logRef.set({ action: 'login', timestamp: Date.now() }));
      await assertSucceeds(adminDb.collection('activity_logs').get());
    });
  });
});
