// services/firebase.ts
import { initializeApp, getApps } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  setPersistence,
  browserLocalPersistence,
} from "firebase/auth";
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAxFxBkBgsWHWfc2qdEwZc0MlxVm2onDWs",
  authDomain: "syntax-sensei.firebaseapp.com",
  projectId: "syntax-sensei",
  storageBucket: "syntax-sensei.firebasestorage.app",
  messagingSenderId: "809569281591",
  appId: "1:809569281591:web:1aa41bef3060bf44ff81b2",
  measurementId: "G-MYJN7MNQ0E"
};

const app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

// Firestore DB (used by services/api.ts to read lessons/units)
export const db = getFirestore(app);

// keep user signed in across reloads/tabs
setPersistence(auth, browserLocalPersistence).catch(() => {});

export default app;
