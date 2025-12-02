// agriverse-firebase.js

import { initializeApp } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-firestore.js";
import { getDatabase } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-database.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-storage.js";

const firebaseConfig = {
  apiKey: "AIzaSyDyQUzxnSsx-tsVuHPRCKlARkA3BvHBfUU",
  authDomain: "agriverse-pro.firebaseapp.com",
  projectId: "agriverse-pro",
  storageBucket: "agriverse-pro.firebasestorage.app",
  messagingSenderId: "66541832128",
  appId: "1:66541832128:web:56470582b214409367aa25",
  databaseURL: "https://agriverse-pro-default-rtdb.firebaseio.com"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const rtdb = getDatabase(app);
export const storage = getStorage(app);
