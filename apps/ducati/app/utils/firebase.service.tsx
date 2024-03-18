// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  /*   apiKey: process.env.API_KEY,
    authDomain: process.env.AUTH_DOMAIN,
    projectId: process.env.PROJECT_ID,
    storageBucket: process.env.STORAGE_BUCKET,
    messagingSenderId: process.env.MESSAGING_SENDER_ID,
    appId: process.env.APP_ID,
    measurementId: process.env.MEASUREMENT_ID */
  apiKey: "AIzaSyDnZy59C0vgf8iu54wg4NRAKVkozB9BD0Y",
  authDomain: "ducat-3ea24.firebaseapp.com",
  projectId: "ducat-3ea24",
  storageBucket: "ducat-3ea24.appspot.com",
  messagingSenderId: "409112039661",
  appId: "1:409112039661:web:89b0dc5a25e6c550807ce4",
  measurementId: "G-H8ZZ3NJDVP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

