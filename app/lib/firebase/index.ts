// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { Auth, getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.API_KEY,
  authDomain: "events-at-penn-e90f3.firebaseapp.com",
  projectId: "events-at-penn-e90f3",
  storageBucket: "events-at-penn-e90f3.appspot.com",
  messagingSenderId: "726473469195",
  appId: "1:726473469195:web:9345094ef30c81b4f0060e",
  measurementId: "G-T17WNVK0NX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app)

export {app, auth};
