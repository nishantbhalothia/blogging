// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyATPJCifUi9vaLLQvTwbqgci99LcWtMT_U",
  authDomain: "blogging-app4.firebaseapp.com",
  projectId: "blogging-app4",
  storageBucket: "blogging-app4.appspot.com",
  messagingSenderId: "650577726663",
  appId: "1:650577726663:web:d1429cbf187339548142e2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db;