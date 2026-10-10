import { initializeApp } from 'firebase/app';
import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore';
import { getAuth, connectAuthEmulator } from 'firebase/auth';
import { getStorage, connectStorageEmulator } from 'firebase/storage';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyCnVSh2Du5I-qu7FQqGnw5drRRaZXaDkPs",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "project-1-c8b7e.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "project-1-c8b7e",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "project-1-c8b7e.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "522665812124",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:522665812124:web:f7e3073441b74979184d59",
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || "G-K4YL602H68"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);

if (import.meta.env.DEV || import.meta.env.VITE_USE_FIREBASE_EMULATOR === 'true') {
  console.log('[Firebase] Using local emulators');
  connectFirestoreEmulator(db, '127.0.0.1', 8080);
  connectAuthEmulator(auth, 'http://127.0.0.1:9099');
  connectStorageEmulator(storage, '127.0.0.1', 9199);
}

export { app, db, auth, storage };
