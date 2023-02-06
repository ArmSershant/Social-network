// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"
import { getAuth } from "firebase/auth"
import { getStorage } from "firebase/storage"

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAqTiOhhNyEqg1VD0_zcd5L0vXGFlOhuiw",
  authDomain: "my-first-project-with-re-12453.firebaseapp.com",
  projectId: "my-first-project-with-re-12453",
  storageBucket: "my-first-project-with-re-12453.appspot.com",
  messagingSenderId: "301346223576",
  appId: "1:301346223576:web:a338715584ae5c56c5aead",
  measurementId: "G-NZD8R73GP2",
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)
export const auth = getAuth(app)
export const storage = getStorage(app)