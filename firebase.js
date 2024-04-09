// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const api = import.meta.env.VITE_APP_FIREBASE_API_KEY;
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
   apiKey: api,
   authDomain: "ugrademareact.firebaseapp.com",
   projectId: "ugrademareact",
   storageBucket: "ugrademareact.appspot.com",
   messagingSenderId: "835921943154",
   appId: "1:835921943154:web:972c2f885ba7be7e4800eb",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, db, storage };
