// Import the functions you need from the SDKs you need
import { getApp, getApps, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyARAGG46lDjRGbzuJSG-orcZMwQBD4GyWk",
  authDomain: "fitmentor-32097.firebaseapp.com",
  projectId: "fitmentor-32097",
  storageBucket: "fitmentor-32097.appspot.com",
  messagingSenderId: "214455310882",
  appId: "1:214455310882:web:9473adfbe78137bb89087b"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig):getApp();
const auth =getAuth(app);

export {app, auth}