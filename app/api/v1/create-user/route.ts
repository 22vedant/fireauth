import { NextRequest, NextResponse } from "next/server";
import { register } from "@/lib/firebase/auth";
import { db } from "@/lib/firebase/firebase";
import { collection, doc, updateDoc } from "firebase/firestore";

export async function POST(req: NextRequest) {
    try {
        const { email, password, displayName, phoneNumber } = await req.json();
        const { user } = await register(email, password);

        const usersRef = collection(db, "users");
        await updateDoc(doc(usersRef, user.uid), {
            displayName,
            phoneNumber,
            username: displayName + Math.floor(Math.random() * 10000),
        });

        return NextResponse.json({
            "message": "success"
        })
    } catch (err: any) {
        console.error(err);
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}
