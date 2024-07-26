import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC5t7MWx_-eglqaGsm-lZhQLRU17fUapBg",
  authDomain: "mental-care-app.firebaseapp.com",
  projectId: "mental-care-app",
  storageBucket: "mental-care-app.appspot.com",
  messagingSenderId: "588153598189",
  appId: "1:588153598189:web:90d544d5532bed63419ce4",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getFirestore(app);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
export { database, auth, googleProvider };
