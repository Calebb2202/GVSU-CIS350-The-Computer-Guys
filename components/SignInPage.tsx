import React from "react";
import { useNavigate } from "react-router-dom";
import { signInWithPopup, setPersistence, browserLocalPersistence } from "firebase/auth";
import { auth, googleProvider } from "../services/firebase";
import { Logo } from "./Icons";
import { upsertUserProfile } from "../services/userService";

export const SignInPage: React.FC = () => {
  const navigate = useNavigate();

  async function handleGoogleSignIn() {
    try {
      await setPersistence(auth, browserLocalPersistence);
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;

      await upsertUserProfile(user);
      console.log("✅ Logged in user:", user);

      navigate("/dashboard", { replace: true }); // manual redirect
    } catch (err) {
      console.error("⚠️ Sign-in error:", err);
    }
  }

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex items-center justify-center p-4">
      <div className="bg-slate-800 rounded-xl p-8 w-full max-w-md shadow-xl">
        <div className="flex items-center gap-3 mb-6 justify-center">
          <Logo className="w-10 h-10" />
          <h1 className="text-2xl font-semibold">Sign in</h1>
        </div>
        <button
          onClick={handleGoogleSignIn}
          className="w-full flex items-center justify-center gap-3 bg-white text-slate-900 rounded-md py-2 font-medium hover:opacity-90 transition"
        >
          <img
            src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
            alt="Google"
            className="w-5 h-5"
          />
          Continue with Google
        </button>
      </div>
    </div>
  );
};
