// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import { getFirestore } from "firebase/firestore"; // <- needed for Database

import { getAuth } from "firebase/auth"; // <- needed for auth later

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDz9T6fKVdWArWvDBSM7DZQOnSdowxKVO8",
  authDomain: "test-project-7a051.firebaseapp.com",
  projectId: "test-project-7a051",
  storageBucket: "test-project-7a051.appspot.com",
  messagingSenderId: "859710571321",
  appId: "1:859710571321:web:4571a8476f43d8f38a9ee8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app); // <- need for auth (later)
export {auth}

export const db = getFirestore(app); // <-- needed for Database so we can use it in our application