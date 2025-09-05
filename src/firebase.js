// src/firebase.js
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"; // 🔥 Firestore
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA8j2d2gBttXOQjf-ayxMExIqKqpqDjgGI",
  authDomain: "yoginourish.firebaseapp.com",
  projectId: "yoginourish",
  storageBucket: "yoginourish.firebasestorage.app",
  messagingSenderId: "615157260715",
  appId: "1:615157260715:web:64302c6e5ae69cf683b2ee",
  measurementId: "G-MM371JZTSQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app); // 🔥 Export Firestore