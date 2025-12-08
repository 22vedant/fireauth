"use client";

import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import Image from "next/image";
import { Loader2, X } from "lucide-react";
// import { signUp } from "@/lib/auth-client";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function SignUp() {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [passwordConfirmation, setPasswordConfirmation] = useState("");
    const [image, setImage] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    async function handleSubmit() {
        const body = {
            email,
            password,
            displayName: firstName + " " + lastName,
            phoneNumber
        }
        try {
            const response = await axios.post('/api/v1/create-user', body)
        } catch (error) {

        }
    }

    return (
        <div className="flex justify-center items-center min-w-screen min-h-screen">
            <Card className="z-50 rounded-md max-w-md">
                <CardHeader>
                    <CardTitle className="text-lg md:text-xl">Sign Up</CardTitle>
                    <CardDescription className="text-xs md:text-sm">
                        Enter your information to create an account
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid gap-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="grid gap-2">
                                <Label htmlFor="first-name">First name</Label>
                                <Input
                                    id="first-name"
                                    placeholder="Max"
                                    required
                                    onChange={(e) => {
                                        setFirstName(e.target.value);
                                    }}
                                    value={firstName}
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="last-name">Last name</Label>
                                <Input
                                    id="last-name"
                                    placeholder="Robinson"
                                    required
                                    onChange={(e) => {
                                        setLastName(e.target.value);
                                    }}
                                    value={lastName}
                                />
                            </div>
                        </div>
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
                            <Label htmlFor="phonenumber">Phone Number</Label>
                            <Input
                                id="phonenumber"
                                type="phonenumber"
                                placeholder="+91 84848-36085"
                                required
                                onChange={(e) => {
                                    setPhoneNumber(e.target.value);
                                }}
                                value={phoneNumber}
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="password">Password</Label>
                            <Input
                                id="password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                autoComplete="new-password"
                                placeholder="Password"
                            />
                        </div>
                        <Button
                            type="submit"
                            className="w-full"
                            disabled={loading}
                            onClick={handleSubmit}
                        >
                            {loading ? (
                                <Loader2 size={16} className="animate-spin" />
                            ) : (
                                "Create an account"
                            )}
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}