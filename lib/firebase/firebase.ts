// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, RecaptchaVerifier } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

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

// export const initRecaptcha = (auth) => {
//     if (!window.recaptchaVerifier) {
//         window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
//             'size': 'invisible',
//             'callback': (response) => {
//                 // reCAPTCHA solved
//             }
//         });
//     }
//     return window.recaptchaVerifier;
// };