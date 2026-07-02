// Firebase initialization.
//
// All config values come from environment variables — nothing is
// hardcoded here, so the same code works across dev/staging/prod just by
// swapping the .env file. Copy .env.local.example to .env.local and fill
// in the values from your Firebase project settings (Project settings >
// General > Your apps > SDK setup and configuration).

import { initializeApp, getApps, getApp, type FirebaseApp } from "firebase/app";
import { getAuth, type Auth } from "firebase/auth";
import { getFirestore, type Firestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

export function isFirebaseConfigured(): boolean {
  return Object.values(firebaseConfig).every((value) => Boolean(value));
}

function ensureFirebaseConfigured(): void {
  if (!isFirebaseConfigured()) {
    throw new Error("Firebase is not configured yet. Add your Firebase credentials to .env.local to enable authentication.");
  }
}

function getFirebaseApp(): FirebaseApp {
  ensureFirebaseConfigured();
  return getApps().length ? getApp() : initializeApp(firebaseConfig);
}

// Lazily created so the app doesn't crash at import time in environments
// (like this sandbox, or a CI build) where env vars aren't set yet.
let _auth: Auth | null = null;
let _db: Firestore | null = null;

export function getFirebaseAuth(): Auth {
  if (!_auth) _auth = getAuth(getFirebaseApp());
  return _auth;
}

export function getFirebaseDb(): Firestore {
  if (!_db) _db = getFirestore(getFirebaseApp());
  return _db;
}
