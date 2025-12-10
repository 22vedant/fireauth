"use client"
import useAuthStore from "@/store/useAuthStore"
import { onAuthStateChanged } from "firebase/auth"
import { useEffect } from "react"
import { auth } from "./firebase/firebase"


const useAuth = () => {
    const { user, setUser, loading, setLoading } = useAuthStore()
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser!)
            setLoading(false)
        })

        return () => unsubscribe()
    }, [])
    return { user, loading }
}

export default useAuth