import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD0VUQGishheuYAIURra-fRspKoLmoYZ8c",
  authDomain: "emsauth-c96d1.firebaseapp.com",
  projectId: "emsauth-c96d1",
  storageBucket: "emsauth-c96d1.appspot.com",
  messagingSenderId: "111191180033",
  appId: "1:111191180033:web:3b86ed2750abdde57f9100",
  measurementId: "G-06SKMMVJ6J",
};

// Initialize Firebase
export const FirebaseAuth = initializeApp(firebaseConfig);
export const FirebaseAuthInstance = getAuth(FirebaseAuth);
