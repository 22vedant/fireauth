import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    GithubAuthProvider,
    signInWithPopup,
    deleteUser
} from "firebase/auth";
import type { User } from "firebase/auth";
import { auth } from "./firebase";
// import { recaptchaVerifier } from "./firebase";

export const register = (email, password) =>
    createUserWithEmailAndPassword(auth, email, password);

export const login = (email, password) =>
    signInWithEmailAndPassword(auth, email, password);

export const logout = () => signOut(auth);

export const loginWithGithub = () => {
    const provider = new GithubAuthProvider();
    return signInWithPopup(auth, provider);
};

export const deleteUserF = (user: User) => {
    deleteUser(user)
}

// function getPhoneNumberFromUserInput(phoneNumber: string) {
//     return phoneNumber
// }

