/* // Import the functions you need from the SDKs you need
import { getApp, initializeApp } from "firebase/app";
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
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
const firebaseApp = getApp();
export const storage = getStorage(app, "gs://ducat-3ea24.appspot.com");

 */
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
