// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC2_OcV3l9dmuSaB7219dQ6OUcpj09lioc",
  authDomain: "fir-task-list-221c3.firebaseapp.com",
  projectId: "fir-task-list-221c3",
  storageBucket: "fir-task-list-221c3.firebasestorage.app",
  messagingSenderId: "279464239371",
  appId: "1:279464239371:web:7e59d2ac24c4ceb14c420e",
  measurementId: "G-005SKCTJKH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);