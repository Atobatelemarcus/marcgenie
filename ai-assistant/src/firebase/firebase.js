// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

// Use your existing firebaseConfig
const firebaseConfig = {
  apiKey: "AIzaSyA2v7219YzTi7iSOUNS7kfjML76wONqrMM",
  authDomain: "marcgenie-web.firebaseapp.com",
  projectId: "marcgenie-web",
  storageBucket: "marcgenie-web.appspot.com",
  messagingSenderId: "654388111617",
  appId: "1:654388111617:web:0108e3c2e634f71da95300",
  measurementId: "G-Y35LRMFJ60",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export Auth & Realtime DB to use across your app
export const auth = getAuth(app);
export const db = getDatabase(app);
