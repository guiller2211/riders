import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDnZy59C0vgf8iu54wg4NRAKVkozB9BD0Y",
  authDomain: "ducat-3ea24.firebaseapp.com",
  projectId: "ducat-3ea24",
  storageBucket: "ducat-3ea24.appspot.com",
  messagingSenderId: "409112039661",
  appId: "1:409112039661:web:89b0dc5a25e6c550807ce4",
  measurementId: "G-H8ZZ3NJDVP"
};

// Initialize Firebase
const appFirebase = initializeApp(firebaseConfig);
export const auth = getAuth(appFirebase);
export const db = getFirestore(appFirebase);
export const storage = getStorage(appFirebase, "gs://ducat-3ea24.appspot.com");
export default appFirebase;

