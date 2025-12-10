import { NextRequest, NextResponse } from "next/server";
import { register } from "@/lib/firebase/auth";
import { db } from "@/lib/firebase/firebase";
import { nanoid } from "nanoid"
import { collection, doc, updateDoc, serverTimestamp } from "firebase/firestore";
import { httpsCallable } from "firebase/functions";
import { functions } from "@/lib/firebase/firebase";

export async function POST(req: NextRequest) {
    try {
        const { email, password, displayName, phoneNumber } = await req.json();
        const { user } = await register(email, password);

        const userDoc = {
            uid: user.uid,
            email: email,
            displayName: displayName,
            photoURL: user.photoURL ?? null,
            signUpDate: serverTimestamp,
            username: (displayName?.replace(" ", "_").toLowerCase() ?? "") + nanoid(10),
            phoneNumber: phoneNumber ?? null,
            role: "user",
            isVerified: user.emailVerified,
            socialLinks: {
                "github": null,
                "linkedin": null,
                "portfolio": null,
                "twitter": null,
            }
        }

        const onUserCreation = httpsCallable(functions, "newOnUserCreation")
        const response = await onUserCreation({ userDoc })

        // const usersRef = collection(db, "users");
        // await updateDoc(doc(usersRef, user.uid), userDoc);

        return NextResponse.json({
            "message": "success",
            data: response.data
        })
    } catch (err: any) {
        console.error(err);
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}
