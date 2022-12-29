// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA1krC0O59XHhdhtegms-oVEFh4sJs1TMs",
  authDomain: "theleague-ffc8b.firebaseapp.com",
  databaseURL: "https://theleague-ffc8b-default-rtdb.firebaseio.com",
  projectId: "theleague-ffc8b",
  storageBucket: "theleague-ffc8b.appspot.com",
  messagingSenderId: "125430946890",
  appId: "1:125430946890:web:0e6e953a067b2db5a55ab3",
  measurementId: "G-F42665HPBL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export default app;