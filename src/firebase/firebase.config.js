// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA1-d1Icv-JvQFfMFuBVpbB8-WLm7RKMxU",
  authDomain: "blood-donation-362b9.firebaseapp.com",
  projectId: "blood-donation-362b9",
  storageBucket: "blood-donation-362b9.firebasestorage.app",
  messagingSenderId: "766931113680",
  appId: "1:766931113680:web:25e3581e5e09f5df7f70d5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);