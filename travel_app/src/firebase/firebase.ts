import { initializeApp } from "@firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyCygrTLqSL51NNItYoCr_L41nDIwEP7nKc",
  authDomain: "shapevt6002.firebaseapp.com",
  databaseURL:
    "https://shapevt6002-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "shapevt6002",
  storageBucket: "shapevt6002.firebasestorage.app",
  messagingSenderId: "206766188452",
  appId: "1:206766188452:web:314abe66f78d1ee9040331",
  measurementId: "G-TRYXE9P30K",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getDatabase(app);