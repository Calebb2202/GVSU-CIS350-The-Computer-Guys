// src/components/SignInPage.tsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { signInWithPopup, signInWithRedirect } from "firebase/auth";
import { auth, googleProvider } from "../services/firebase";
import { Logo } from "./Icons";
import { useAuth } from "../services/AuthContext";

export const SignInPage: React.FC = () => {
  const navigate = useNavigate();
  const { signInAsGuest } = useAuth();

  async function handleGoogleSignIn() {
    try {
      // Try popup first (desktop)
      await signInWithPopup(auth, googleProvider);
      navigate("/dashboard", { replace: true });
    } catch (err) {
      console.warn("Popup blocked, reverting to redirect:", err);

      // Fallback for mobile / popup-blocked
      await signInWithRedirect(auth, googleProvider);
    }
  }

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex items-center justify-center p-4">
      <div className="bg-slate-800 rounded-xl p-8 w-full max-w-md shadow-xl">
        <div className="flex items-center gap-3 mb-6 justify-center">
          <Logo className="w-10 h-10" />
          <h1 className="text-2xl font-semibold">Sign in</h1>
        </div>

        {/* ✅ Google login button */}
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
        
        {/* Continue as guest */}
        <div className="mt-4 text-center">
          <button
            onClick={() => { signInAsGuest('Guest'); navigate('/dashboard', { replace: true }); }}
            className="w-full mt-3 bg-slate-700 text-white rounded-md py-2 font-medium hover:opacity-90 transition"
          >
            Continue as Guest
          </button>
        </div>
      </div>
    </div>
  );
};
