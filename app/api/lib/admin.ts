import admin from "firebase-admin"
import { getAuth } from "firebase-admin/auth"
import serviceAccountJSON from "@/privateKey.json" assert {type: 'json'}
import { ServiceAccount } from "firebase-admin"

const serviceAccount = serviceAccountJSON as ServiceAccount

// Reuse existing app if already initialized
const app = admin.apps.length === 0
    ? admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
    })
    : admin.app();

export const adminAuth = app.auth();