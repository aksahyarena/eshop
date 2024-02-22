// Firestore is the storage service


import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth';
import {getFirestore} from 'firebase/firestore';
import {getStorage} from 'firebase/storage';
// Your web app's Firebase configuration
export const firebaseConfig = {
  apiKey: "AIzaSyAL_mZrJvSX503G_VceYbQypslgjyuaL0o",
  authDomain: "eshop-react-474c7.firebaseapp.com",
  projectId: "eshop-react-474c7",
  storageBucket: "eshop-react-474c7.appspot.com",
  messagingSenderId: "571005552514",
  appId: "1:571005552514:web:51958ca2ff0b9ce33fb19b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth= getAuth(app)
export const db= getFirestore(app)
export const storage= getStorage(app)
export default app