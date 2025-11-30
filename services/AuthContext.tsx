// services/AuthContext.tsx
"use client";
import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth, db } from "./firebase"; 
import { doc, getDoc, setDoc } from "firebase/firestore"; 
import { useProgressStore } from "../store/stores"; 

type AuthContextValue = {
  user: User | null;
  loading: boolean;
};

const AuthContext = createContext<AuthContextValue>({ user: null, loading: true });

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const { loadProgress } = useProgressStore(); // --- State Store Access ---

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
                });
            }
        } else {
            // --- User is Logged Out ---
            setUser(null);
            // Reset the store to its default state
            loadProgress({ xp: 0, completedLessons: [], streakDays: 0, lastCompletedDate: null });
        }
        setLoading(false);
    });

    return () => unsubscribe();

}, [loadProgress]);

  return <AuthContext.Provider value={{ user, loading }}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}