import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.API_KEY,
  authDomain: "events-at-penn-e90f3.firebaseapp.com",
  projectId: "events-at-penn-e90f3",
  storageBucket: "events-at-penn-e90f3.appspot.com",
  messagingSenderId: "726473469195",
  appId: "1:726473469195:web:9345094ef30c81b4f0060e",
  measurementId: "G-T17WNVK0NX"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { app, auth };
