// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// import { createUserWithEmailAndPassword } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import {
  getAuth,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  FacebookAuthProvider,
  signInWithPopup,
  updateProfile,
  sendPasswordResetEmail,
  fetchSignInMethodsForEmail,
} from "firebase/auth";
import { useState, useEffect, useContext } from "react";
import { getFirestore } from "firebase/firestore";

// import { SignInContext } from "./utilities/Context";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const REACT_APP_FIREBASE_API_KEY = process.env.REACT_APP_FIREBASE_API_KEY;
const REACT_APP_AUTH_DOMAIN = process.env.REACT_APP_AUTH_DOMAIN;
const REACT_APP_PROJECT_ID = process.env.REACT_APP_PROJECT_ID;
const REACT_APP_STORAGE_BUCKET = process.env.REACT_APP_STORAGE_BUCKET;
const REACT_APP_MESSAGING_SENDER_ID = process.env.REACT_APP_MESSAGING_SENDER_ID;
const REACT_APP_APP_ID = process.env.REACT_APP_APP_ID;
const REACT_APP_MEASUREMENT_ID = process.env.REACT_APP_MEASUREMENT_ID;

const firebaseConfig = {
  apiKey: `${REACT_APP_FIREBASE_API_KEY}`,
  authDomain: `${REACT_APP_AUTH_DOMAIN}`,
  projectId: `${REACT_APP_PROJECT_ID}`,
  storageBucket: `${REACT_APP_STORAGE_BUCKET}`,
  messagingSenderId: `${REACT_APP_MESSAGING_SENDER_ID}`,
  appId: `${REACT_APP_APP_ID}`,
  measurementId: `${REACT_APP_MEASUREMENT_ID}`,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
export const storage = getStorage();

export default getFirestore();

//Custom Hook
export function useAuth() {
  const [currentUser, setCurrentUser] = useState();

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => setCurrentUser(user));
    return unsub;
  }, []);
  // setCurrentUserID(currentUser.uid);
  return currentUser;
}
