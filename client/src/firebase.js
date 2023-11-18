// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "e-state-3abae.firebaseapp.com",
  projectId: "e-state-3abae",
  storageBucket: "e-state-3abae.appspot.com",
  messagingSenderId: "1023403116830",
  appId: "1:1023403116830:web:eaaa0efe34c650d841a10f",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
