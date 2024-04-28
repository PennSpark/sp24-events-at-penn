"use client";
import { auth } from "@/app/lib/firebase";
import { Organizer } from "@/app/lib/types";
import { User, onAuthStateChanged } from "firebase/auth";
import { createContext, ReactNode, useEffect, useState } from "react";

interface AuthState {
    user: User | null;
    organizer: Organizer | null;
}

export const AuthContext = createContext<AuthState>({ user: null, organizer: null});

export default function AuthProvider({ children }: { children: ReactNode }) {
    const [ authState, setAuthState ] = useState<AuthState>({ user: null, organizer: null });

    useEffect(() => {
        onAuthStateChanged(auth, async (authUser) => {
            console.log("FETCHING AUTH CONTEXT");
            if(authUser) {
                const res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/users/${authUser.uid}`);
                setAuthState({
                    user: authUser,
                    organizer: (await res.json()).body,
                });
            } else {
                setAuthState({ user: null, organizer: null })
            }
        });
    }, []); 

    return <AuthContext.Provider value={authState}>{children}</AuthContext.Provider>;
}
