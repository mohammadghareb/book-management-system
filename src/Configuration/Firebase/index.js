// Import the functions you need from the SDKs you need
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore'; 
import "firebase/storage";
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
  measurementId: "G-N9C47BF9MZ"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
  

export default firebase;
