import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from "firebase/auth"
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_APIKEY,
  authDomain: "interviewai-f56a7.firebaseapp.com",
  projectId: "interviewai-f56a7",
  storageBucket: "interviewai-f56a7.firebasestorage.app",
  messagingSenderId: "288535262203",
  appId: "1:288535262203:web:c3f628242c653f4761115e"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app)

const provider = new GoogleAuthProvider()

export {auth , provider}