// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth} from "firebase/auth"
import {getFirestore} from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB2bn21gVzqnBdTO1uk-eDrBse1LtcKWGg",
  authDomain: "quran-8e61f.firebaseapp.com",
  projectId: "quran-8e61f",
  storageBucket: "quran-8e61f.appspot.com",
  messagingSenderId: "457805016203",
  appId: "1:457805016203:web:6906333e2b1206b6e4b88e",
  measurementId: "G-ERR5D2Q7ND"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);
