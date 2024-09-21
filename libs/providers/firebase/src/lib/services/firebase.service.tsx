import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBBa-iESd6SuyXbkQXBES_plj2KcqsBfWE",
  authDomain: "rider-s-realm-25d75.firebaseapp.com",
  projectId: "rider-s-realm-25d75",
  storageBucket: "rider-s-realm-25d75.appspot.com",
  messagingSenderId: "729284885221",
  appId: "1:729284885221:web:474c7cf85addc74f8cf20c",
  measurementId: "G-XTGKEXBKRR"
};

// Initialize Firebase
const appFirebase = initializeApp(firebaseConfig);
export const auth = getAuth(appFirebase);
export const db = getFirestore(appFirebase);
export const storage = getStorage(appFirebase, "gs://rider-s-realm-25d75.appspot.com");
export default appFirebase;
