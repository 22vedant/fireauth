"use client"
import { useState, useEffect } from "react";
import useAuthStore from "@/store/useAuthStore";
import { register, login, logout, loginWithGithub } from "@/lib/firebase/auth";
// import { initRecaptcha } from "./lib/firebase";
import { auth } from "@/lib/firebase/firebase"
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { Separator } from "@/components/ui/separator";
export default function SignIn() {
    const user = useAuthStore(state => state.user);
    const loading = useAuthStore(state => state.loading);

    // Email login states
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    // Phone login states
    const [code, setCode] = useState("");    // OTP code
    const [otpSent, setOtpSent] = useState(false);
    const [confirmationResult, setConfirmationResult] = useState(null)
    const [phoneNumber, setPhoneNumber] = useState("")

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

    async function phoneSignIn(phoneNumber) {
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
            const confirmation = await signInWithPhoneNumber(auth, phoneNumber, appVerifier);
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
            <Card className="rounded-md w-[500px]">
                <CardHeader>
                    <CardTitle className="text-lg md:text-xl">Sign In</CardTitle>
                    <CardDescription className="text-xs md:text-sm">
                        Enter your information to create an account
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid gap-8">
                        <div className="grid gap-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="m@example.com"
                                required
                                onChange={(e) => {
                                    setEmail(e.target.value);
                                }}
                                value={email}
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="password">Password</Label>
                            <Input
                                id="password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                // autoComplete="new-password"
                                placeholder="Password"
                            />
                        </div>
                        <Button
                            type="submit"
                            className="w-full"
                            disabled={loading}
                            onClick={() => register(email, password)}
                        >
                            {loading ? (
                                <Loader2 size={16} className="animate-spin" />
                            ) : (
                                "Create an account"
                            )}
                        </Button>
                        <Separator />

                        <div className="grid gap-2">
                            <Label htmlFor="phonenumber">Phone Number</Label>
                            <Input
                                id="phonenumber"
                                placeholder="+918484836085"
                                onChange={(e) => {
                                    setPhoneNumber(e.target.value);
                                }}
                                value={phoneNumber}
                            />
                        </div>
                        {!otpSent && (
                            <Button
                                id="sign-in-button"
                                onClick={() => phoneSignIn(phoneNumber)}
                            >
                                Send OTP
                            </Button>
                        )}

                        {otpSent && (
                            <>
                                <Input
                                    placeholder="Enter OTP Code"
                                    value={code}
                                    onChange={(e) => setCode(e.target.value)}
                                />

                                <Button
                                    onClick={() => verifyCode(code)}
                                // className="bg-purple-600 text-white py-2 rounded hover:bg-purple-700"
                                >
                                    Verify Code
                                </Button>
                            </>
                        )}
                    </div>
                </CardContent>
            </Card>

        </div>
    );
}
