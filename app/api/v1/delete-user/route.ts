import { deleteUserF } from "@/lib/firebase/auth";
import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/firebase/firebase";
import { collection, doc, deleteDoc } from "firebase/firestore";
import { getAuth, IdTokenResult, User } from "firebase/auth";

export async function POST(req: NextRequest) {
    const auth = getAuth()
    auth.onAuthStateChanged((user) => {
        if (user) {
            try {
                const response = deleteUserF(user)

                return NextResponse.json({
                    "message": "User Deleted Successfully",
                })
            } catch (error: unknown) {
                throw new Error("Error", error.message)
            }
        } else {
            return NextResponse.json({
                message: "User not logged in"
            })
        }
    })

}