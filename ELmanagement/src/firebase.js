// src/firebase.js

import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDYWm2Y1EGmxhoswc1u_DH0BVnyM_9o-OY",
  authDomain: "lmsystem-e6dc0.firebaseapp.com",
  projectId: "lmsystem-e6dc0",
  storageBucket: "lmsystem-e6dc0.appspot.com",
  messagingSenderId: "207190969588",
  appId: "1:207190969588:web:53e04f08ca429cc6b7a2a1",
  measurementId: "G-CZDTK0JXHN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);  // Corrected line
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);
