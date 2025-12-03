// services/AuthContext.tsx
"use client";
import { createContext, useContext, useEffect, useState, useRef, ReactNode } from "react";
import { onAuthStateChanged, User, signOut as firebaseSignOut } from "firebase/auth";
import { auth, db } from "./firebase"; 
import { doc, getDoc, setDoc } from "firebase/firestore"; 
import { useProgressStore } from "../store/stores"; 

type GuestUser = { isGuest: true; uid: string; displayName?: string | null; email?: string | null; photoURL?: string | null };

type AuthContextValue = {
    user: User | GuestUser | null;
    loading: boolean;
    signOut: () => Promise<void>;
    signInAsGuest: (displayName?: string) => void;
};

const AuthContext = createContext<AuthContextValue>({ user: null, loading: true, signOut: async () => {}, signInAsGuest: () => {} });

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
    // track if signOut() was intentionally called so we don't clear local progress
    // on transient/auth-token loss events
    const manualSignOutRef = useRef(false);
  const { loadProgress } = useProgressStore(); // --- State Store Access ---

    const signOut = async () => {
        // Mark that this sign-out was initiated by the user/code so the onAuthStateChanged
        // handler can distinguish between an intentional sign-out and an unexpected
        // auth state loss (network/token expiration). We only want to reset stored
        // progress on intentional sign-outs.
        manualSignOutRef.current = true;

        try {
            // If current user is a guest (local only), clear local state without calling Firebase signOut
            // Note: user may be a GuestUser object or a Firebase User
            // We capture current user from state by using a functional updater
            setUser(prev => {
                // if prev is a guest-like object, just clear local state
                if ((prev as any)?.isGuest) {
                    // reset progress as well
                    loadProgress({ xp: 0, completedLessons: [], streakDays: 0, lastCompletedDate: null, belt: 'white' });
                    return null as any;
                }
                return prev as any;
            });

            // For real Firebase users, call signOut which will trigger onAuthStateChanged to reset state
            await firebaseSignOut(auth);
            // After calling firebase signOut, the onAuthStateChanged callback will run and
            // see `manualSignOutRef.current === true`; it will perform the proper
            // reset there and then clear this flag.
        } catch (err) {
            console.error('Error signing out:', err);
            // ensure we clear local guest state anyway
            setUser(null as any);
            loadProgress({ xp: 0, completedLessons: [], streakDays: 0, lastCompletedDate: null, belt: 'white' });
        }
    };

        const signInAsGuest = (displayName?: string) => {
            const guest: GuestUser = {
                isGuest: true,
                uid: `guest-${Date.now()}`,
                displayName: displayName || 'Guest',
                email: null,
                photoURL: null,
            };
            // set local user state to the guest object and load default progress
            setUser(guest as any);
            loadProgress({ xp: 0, completedLessons: [], streakDays: 0, lastCompletedDate: null, belt: 'white' });
            setLoading(false);
        };

useEffect(() => {
    // Make the callback async to wait for data
    const unsubscribe = onAuthStateChanged(auth, async (u) => {
        if (u) {
            // --- User is Logged In ---
            setUser(u);

            const userRef = doc(db, "users", u.uid);
            const userSnap = await getDoc(userRef);

            if (userSnap.exists()) {
                // --- User Exists: Load their progress ---
                const data = userSnap.data();
                loadProgress({
                    xp: data.xp || 0,
                    completedLessons: data.completedLessons || [],
                    streakDays: data.streakDays || 0,
                    lastCompletedDate: data.lastCompletedDate || null,
                    belt: data.belt || 'white',
                    xpByDay: data.xpByDay || {},
                });
            } else {
                // --- NEW USER: Create their profile ---
                const defaultUserData = {
                    uid: u.uid,
                    email: u.email,
                    displayName: u.displayName || u.email?.split('@')[0],
                    xp: 0,
                    completedLessons: [],
                    streakDays: 0,
                    lastCompletedDate: null,
                    belt: 'white',
                };

                try {
                    // Create the document in Firestore
                    await setDoc(userRef, defaultUserData);
                } catch (error) {
                    console.error("Error creating new user document:", error);
                }

                // Load these defaults into the local state
                loadProgress({
                    xp: defaultUserData.xp,
                    completedLessons: defaultUserData.completedLessons,
                    streakDays: defaultUserData.streakDays,
                    lastCompletedDate: defaultUserData.lastCompletedDate,
                    belt: defaultUserData.belt,
                });
            }
        } else {
            // --- User is Logged Out ---
            setUser(null);
            if (manualSignOutRef.current) {
                // This logout was initiated by our signOut() call. Clear progress.
                console.debug('Auth: intentional sign-out detected; resetting local progress.');
                loadProgress({ xp: 0, completedLessons: [], streakDays: 0, lastCompletedDate: null, belt: 'white' });
                manualSignOutRef.current = false;
            } else {
                // Unexpected sign-out (token expiry/network). Preserve local progress to avoid
                // wiping in-progress lessons. The UI should prompt the user to re-authenticate
                // when appropriate.
                console.warn('Auth: user became null without manual sign-out. Preserving local progress.');
            }
        }
        setLoading(false);
    });

    return () => unsubscribe();

}, [loadProgress]);

        return <AuthContext.Provider value={{ user, loading, signOut, signInAsGuest }}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}