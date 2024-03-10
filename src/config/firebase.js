// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA20Y_1l0Xu-wVOpthmieSmcDL902p69uo",
  authDomain: "todo-list-dd769.firebaseapp.com",
  projectId: "todo-list-dd769",
  storageBucket: "todo-list-dd769.appspot.com",
  messagingSenderId: "706419002612",
  appId: "1:706419002612:web:cf2f5fdb2002c559d362a1",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)
