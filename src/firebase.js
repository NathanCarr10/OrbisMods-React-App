import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDqvYxcN6bD4V5q3E0hxjN6WEI4vCU1rzc",
  authDomain: "orbis-mods.firebaseapp.com",
  projectId: "orbis-mods",
  storageBucket: "orbis-mods.firebasestorage.app",
  messagingSenderId: "804452887090",
  appId: "1:804452887090:web:b4a0b862bfe0eb8bdaaa2b",
  measurementId: "G-HVQ81BPXZ6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

  