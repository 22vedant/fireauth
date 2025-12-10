import { NextRequest, NextResponse } from "next/server";
import { getAuth } from "firebase-admin/auth";
import { adminAuth } from "../../lib/admin";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
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

        const response = await adminAuth.updateUser(uid, body)

        return NextResponse.json({
            "message": "success",
            data: response
        })
    } catch (err: any) {
        console.error(err);
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}
