// src/services/userService.ts
import { doc, setDoc, getDoc } from "firebase/firestore";
import { db } from "./firebase";

export async function upsertUserProfile(user: any) {
  if (!user) return;

  const userRef = doc(db, "users", user.uid);
  const snapshot = await getDoc(userRef);

  // If user document does NOT exist → create it
  if (!snapshot.exists()) {
    await setDoc(userRef, {
      displayName: user.displayName || "Anonymous",
      email: user.email || "",
      currentBelt: "white",
      completedLessons: []
    });
  } else {
    // If the user exists → update email/displayName if changed
    await setDoc(
      userRef,
      {
        displayName: user.displayName || "Anonymous",
        email: user.email || ""
      },
      { merge: true }
    );
  }
}
