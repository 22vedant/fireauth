import { create } from "zustand";
import { auth } from "../lib/firebase/firebase";
import { onAuthStateChanged } from "firebase/auth";
import type { User } from "firebase/auth";
interface useAuthStoreState {
    user: User | undefined,
    loading: boolean,
    setUser: (userInfo: User) => void
    setLoading: (loading: boolean) => void
}

const useAuthStore = create<useAuthStoreState>()((set) => ({
    user: undefined,
    loading: true,
    setUser: (user) => set({ user }),
    setLoading: (loading) => set({ loading })
}))

export default useAuthStore;
