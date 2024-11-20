
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCZSPLLaEf_R3NhafbUQkVNdE0Otj2ReTs",
  authDomain: "financeirin.firebaseapp.com",
  projectId: "financeirin",
  storageBucket: "financeirin.firebasestorage.app",
  messagingSenderId: "383578673181",
  appId: "1:383578673181:web:82d26d936988494d79f6f4",
  measurementId: "G-G8CE8KWVQ7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Inicializar o Firestore
const db = getFirestore(app);

export { db };