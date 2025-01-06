// Import and configure Firebase
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyCnljc_eyw78_GcAEa7ntiXmUhyDLgA1Z4",
    authDomain: "swaad-anusar.firebaseapp.com",
    projectId: "swaad-anusar",
    storageBucket: "swaad-anusar.firebasestorage.app",
    messagingSenderId: "631082441857",
    appId: "1:631082441857:web:e78116d0a2aa378fd9c180",
    measurementId: "G-FE95LZWY4J"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
