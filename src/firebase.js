// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: 'AIzaSyBzaUXhFFnj1OVmmvF8BFTD7qQtmkmgIF8',
    authDomain: "mern-sphere-profile.firebaseapp.com",
    projectId: "mern-sphere-profile",
    storageBucket: "mern-sphere-profile.appspot.com",
    messagingSenderId: "21428361202",
    appId: "1:21428361202:web:a4a0f4a7fdb13e20aefd6b",
    measurementId: "G-6C0FJQYPMR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app);