"use client"
import { useState, useEffect } from "react";
import useAuthStore from "@/store/useAuthStore";
import { register, login, logout, loginWithGithub } from "@/lib/firebase/auth";
// import { initRecaptcha } from "./lib/firebase";
import { auth } from "@/lib/firebase/firebase"
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
export default function App() {
    const user = useAuthStore(state => state.user);
    const loading = useAuthStore(state => state.loading);

    // Email login states
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    // Phone login states
    const [phone, setPhone] = useState("");  // e.g. +905555555555
    const [code, setCode] = useState("");    // OTP code
    const [otpSent, setOtpSent] = useState(false);
    const [confirmationResult, setConfirmationResult] = useState(null)

    // useEffect(() => {
    //   // Create invisible recaptcha once
    //   // initRecaptcha
    // }, []);

    if (loading) return <h3>Loading...</h3>;

    if (user) return (
        <div>
            <h2>Welcome {user.email || user.phoneNumber}</h2>
            <button onClick={logout}>Logout</button>
        </div>
    );

    async function phoneSignIn(phone) {
        try {
            // Clear existing verifier if it exists
            if (window.recaptchaVerifier) {
                window.recaptchaVerifier.clear();
                window.recaptchaVerifier = null;
            }

            // Create a new verifier
            window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
                'size': 'invisible',
                'callback': (response) => {
                    console.log("reCAPTCHA solved");
                }
            });

            const appVerifier = window.recaptchaVerifier;
            const confirmation = await signInWithPhoneNumber(auth, phone, appVerifier);
            setConfirmationResult(confirmation);
            setOtpSent(true);
        } catch (error) {
            console.error("Error sending OTP:", error);

            // Clean up on error
            if (window.recaptchaVerifier) {
                window.recaptchaVerifier.clear();
                window.recaptchaVerifier = null;
            }

            alert("Failed to send OTP: " + error.message);
        }
    }

    async function verifyCode(code) {

        try {
            await confirmationResult.confirm(code).then((result) => {
                // User signed in successfully.
                const user = result.user;
                // ...
            }).catch((error) => {
                // User couldn't sign in (bad verification code?)
                // ...
            });
        } catch (error) {
            console.log(error);

        }
    }


    return (
        <div className="flex justify-center items-center min-h-screen min-w-screen">
            <div id="recaptcha-container"></div>
            <div className="flex flex-col gap-4 p-8 rounded-2xl border-2 w-80">

                <h2 className="text-2xl font-semibold text-center">
                    Firebase Auth
                </h2>

                {/* Email Login/Register */}
                <input
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="border p-2 rounded outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                    placeholder="Password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="border p-2 rounded outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button onClick={() => register(email, password)} className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
                    Sign Up
                </button>
                <button onClick={() => login(email, password)} className="bg-green-600 text-white py-2 rounded hover:bg-green-700">
                    Login
                </button>
                <button onClick={loginWithGithub} className="bg-gray-800 text-white py-2 rounded hover:bg-black">
                    Login with GitHub
                </button>

                {/* Phone Login */}
                <hr className="my-3" />
                <input
                    placeholder="Phone Number (e.g. +905555555555)"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="border p-2 rounded outline-none focus:ring-2 focus:ring-blue-500"
                />

                {!otpSent && (
                    <button
                        id="sign-in-button"
                        onClick={() => phoneSignIn(phone)}
                        className="bg-purple-600 text-white py-2 rounded hover:bg-purple-700"
                    >
                        Send OTP
                    </button>
                )}

                {otpSent && (
                    <>
                        <input
                            placeholder="Enter OTP Code"
                            value={code}
                            onChange={(e) => setCode(e.target.value)}
                            className="border p-2 rounded outline-none focus:ring-2 focus:ring-blue-500"
                        />

                        <button
                            onClick={() => verifyCode(code)}
                            className="bg-purple-600 text-white py-2 rounded hover:bg-purple-700"
                        >
                            Verify Code
                        </button>
                    </>
                )}

            </div>
        </div>
    );
}
