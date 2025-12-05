import { create } from "zustand";
import { auth } from "../lib/firebase/firebase";
import { onAuthStateChanged } from "firebase/auth";

const useAuthStore = create((set) => ({
    user: null,
    loading: true,

    setUser: (user) => set({ user }),
    setLoading: (loading) => set({ loading }),

    listenToAuth: () => {
        set({ loading: true });
        return onAuthStateChanged(auth, (user) => {
            set({ user, loading: false });
        });
    },
}));

// Start listener once when importing
useAuthStore.getState().listenToAuth();

export default useAuthStore;
