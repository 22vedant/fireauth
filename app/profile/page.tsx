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
import { useEffect, useState } from "react";
import Image from "next/image";
import { Loader2, X } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Separator } from "@/components/ui/separator";
import axios from "axios";

import { auth } from "@/lib/firebase/firebase"
import { onAuthStateChanged } from "firebase/auth";
import useAuthStore from "@/store/useAuthStore";
import useAuth from "@/lib/useAuth";

const page = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("")
    const [password, setPassword] = useState("");
    const [passwordConfirmation, setPasswordConfirmation] = useState("");
    const router = useRouter();
    // const [loading, setLoading] = useState(false);

    const { user, loading } = useAuth()


    async function handleUpdate() {
        const token = await auth.currentUser?.getIdToken(true)
        try {
            const response = await axios.post('/api/v1/update-user', user, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })

            console.log(response.data)
        } catch (error) {
            console.error(error);

        }
    }
    async function handleSubmit() {
        // const auth = getAuth()
        const token = await auth.currentUser?.getIdToken(true)
        try {
            // const response = await axios.post('/api/v1/delete-user', user)
            const response = await axios.get('/api/v1/delete-user', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })

            console.log(response.data)
            router.push('/')

        } catch (error) {
            throw new Error(error.message)
        }
    }
    return (
        <div className="flex justify-center items-center min-w-screen min-h-screen">
            <Card className="z-50 rounded-md max-w-md">
                <CardHeader>
                    <CardTitle className="text-lg md:text-xl">Profile</CardTitle>
                    <CardDescription className="text-xs md:text-sm">
                        Edit your information to update your account
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid gap-4">
                        <div className="grid grid-cols-2 gap-2">
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
                            <div></div>
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="username">Username</Label>
                            <Input
                                id="username"
                                placeholder="@xyz"
                                required
                                onChange={(e) => {
                                    setUsername(e.target.value);
                                }}
                                value={username}
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="phonenumber">Phone Number</Label>
                            <Input
                                id="phonenumber"
                                placeholder="+91 98901-32123"
                                required
                                onChange={(e) => {
                                    setPhoneNumber(e.target.value);
                                }}
                                value={phoneNumber}
                            />
                        </div>
                        <Separator />
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
                                autoComplete="new-password"
                                placeholder="Password"
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="password">Confirm Password</Label>
                            <Input
                                id="password_confirmation"
                                type="password"
                                value={passwordConfirmation}
                                onChange={(e) => setPasswordConfirmation(e.target.value)}
                                autoComplete="new-password"
                                placeholder="Confirm Password"
                            />
                        </div>
                        <Button
                            type="submit"
                            className="w-full"
                            // disabled={loading}
                            onClick={handleUpdate}
                        >
                            Update
                        </Button>
                        <Separator />
                        <div className="grid gap-2">
                            <Label>Delete User</Label>
                            <Button
                                variant={"destructive"}
                                onClick={handleSubmit}
                            >Delete User</Button>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

export default page