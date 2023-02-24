import { initializeApp } from "firebase/app";
import { getFirestore } from '@firebase/firestore'

//TODO Create .env Environment file to hide apiKey
const firebaseConfig = {
    apiKey: "AIzaSyAI0jnxdWlgmydpEUeI5wVHYf1Ib0TVLKo",
    authDomain: "aarsvp-e2ab7.firebaseapp.com",
    projectId: "aarsvp-e2ab7",
    storageBucket: "aarsvp-e2ab7.appspot.com",
    messagingSenderId: "1043662079738",
    appId: "1:1043662079738:web:51775a29099a140d6fab43",
    measurementId: "G-EMWC3SBKDT"
  };

const app = initializeApp(firebaseConfig);

export  const db = getFirestore(app)