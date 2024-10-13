import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';

const firebaseConfig = {
  apiKey: "AIzaSyBZ5r6dLLsQEy3hM6jFCxDDHZkL4Y1SSoY",
  authDomain: "lunar-tech-b2800.firebaseapp.com",
  projectId: "lunar-tech-b2800",
  storageBucket: "lunar-tech-b2800.appspot.com",
  messagingSenderId: "19128373457",
  appId: "1:19128373457:web:9f39f58047861934beb5f0",
  measurementId: "G-49RGWB9774"
};

// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);

// Initialize Firestore and Auth
const db = firebaseApp.firestore();
const auth = firebase.auth();

export { db, auth };
