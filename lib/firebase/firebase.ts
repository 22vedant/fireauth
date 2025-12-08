// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { connectFunctionsEmulator, getFunctions } from "firebase/functions";
import { connectAuthEmulator, getAuth, RecaptchaVerifier } from "firebase/auth";
import { connectFirestoreEmulator, getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyB_Gq7l2bIPU8fzFx2sJ3Zc7TxZCrnJEeY",
    authDomain: "first-test-12cd8.firebaseapp.com",
    projectId: "first-test-12cd8",
    storageBucket: "first-test-12cd8.firebasestorage.app",
    messagingSenderId: "206799034070",
    appId: "1:206799034070:web:cae816cd4d941e1ba19b77"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const db = getFirestore(app);
export const functions = getFunctions(app)

if (process.env.NODE_ENV === "development") {
    connectFunctionsEmulator(functions, "localhost", 5001)
    connectAuthEmulator(auth, "http://localhost:9099");
    connectFirestoreEmulator(db, "localhost", 8080);
}