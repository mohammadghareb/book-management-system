// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
} from "firebase/auth";

// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// I haven't use .env for this project, but for security reason we should add .env to hide these credentials
const firebaseConfig = {
  apiKey: "AIzaSyC98XNR06ipidwtzAhF7cEu_rscnoMr7RI",
  authDomain: "book-management-system-804a1.firebaseapp.com",
  projectId: "book-management-system-804a1",
  storageBucket: "book-management-system-804a1.appspot.com",
  messagingSenderId: "1031203702627",
  appId: "1:1031203702627:web:23a8a707139def7f1af556",
  measurementId: "G-N9C47BF9MZ",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

const sendPasswordReset = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email);
    alert("Password reset link sent!");
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

const logInWithEmailAndPassword = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

const logout = () => {
  signOut(auth);
};

export {
  auth,
  db,
  storage,
  logout,
  logInWithEmailAndPassword,
  sendPasswordReset,
};
