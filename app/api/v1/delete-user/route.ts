import { NextRequest, NextResponse } from "next/server";
import { adminAuth } from "../../lib/admin";
import { getFirestore } from "firebase-admin/firestore"
export async function GET(req: NextRequest) {
    try {
        const authHeader = req.headers.get("authorization");

        if (!authHeader?.startsWith("Bearer ")) {
            return NextResponse.json(
                { error: "Missing or invalid Authorization header" },
                { status: 401 }
            );
        }

        const token = authHeader.split(" ")[1];

        const decoded = await adminAuth.verifyIdToken(token);
        const uid = decoded.user_id;

        await adminAuth.deleteUser(uid);

        await getFirestore().collection("users").doc(uid).delete()

        return NextResponse.json({ success: true, uid });
    } catch (error: any) {
        console.error("Error verifying token:", error);
        return NextResponse.json(
            { error: error.message ?? "Server Error" },
            { status: 500 }
        );
    }
}
