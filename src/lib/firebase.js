// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: import.meta.env.VITE_API_KEY,
    authDomain: "chat-lee-53a7b.firebaseapp.com",
    projectId: "chat-lee-53a7b",
    storageBucket: "chat-lee-53a7b.appspot.com",
    messagingSenderId: "137415768931",
    appId: "1:137415768931:web:890ab092ee6428b9253156",
    measurementId: "G-JPQPJSLMP4"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth()
export const db = getFirestore()
export const storage = getStorage()