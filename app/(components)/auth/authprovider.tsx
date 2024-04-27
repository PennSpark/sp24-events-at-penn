"use client";
import { auth } from "@/app/lib/firebase";
import { User, onAuthStateChanged } from "firebase/auth";
import { createContext, ReactNode, useEffect, useState } from "react";

export const AuthContext = createContext<User | null>(null);

export default function AuthProvider({ children }: { children: ReactNode }) {
    const [ user, setUser ] = useState<User | null>(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (authUser) => {
            console.log(authUser);
            if (authUser) {
                setUser(authUser);
            } else {
                setUser(null);
            }
        });
        return () => unsubscribe();
    }, []); 
    return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>;
}