import { useState } from "react";
import { signInWithPopup } from "firebase/auth";
import {
  X,
  AlertCircle,
  GraduationCap,
  ShieldCheck,
  Loader2,
  Lock,
} from "lucide-react";
import {
  auth,
  googleProvider,
} from "../firebase";

interface AuthModalProps {
  onClose?: () => void;
  onLoginSuccess?: (preferredName?: string) => void;
  initialMode?: "signin" | "signup";
  lockedPrompt?: boolean;
}

export function AuthModal({
  onClose,
  onLoginSuccess,
  initialMode = "signin",
  lockedPrompt = false,
}: AuthModalProps) {
  const [authMode, setAuthMode] = useState<"signin" | "signup">(initialMode);
  const [preferredName, setPreferredName] = useState("");
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [error, setError] = useState("");

  const handleGoogleSignIn = async () => {
    setError("");
    setIsSigningIn(true);

    if (onLoginSuccess) {
      onLoginSuccess(preferredName.trim() || undefined);
    }

    try {
      await signInWithPopup(auth, googleProvider);
      if (onClose) onClose();
    } catch (err: unknown) {
      const code = (err as { code?: string })?.code;
      if (code === "auth/popup-closed-by-user" || code === "auth/cancelled-popup-request") {
        setError("Sign-in popup was closed before completing authentication.");
      } else if (code === "auth/popup-blocked") {
        setError("Popup was blocked by your browser. Please allow popups for this site and try again.");
      } else {
        setError(err instanceof Error ? err.message : "Failed to sign in with Google.");
      }
    } finally {
      setIsSigningIn(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/60 backdrop-blur-sm">
      <div className="relative w-full max-w-md max-h-[92vh] overflow-y-auto rounded-2xl bg-white shadow-xl border border-gray-100 text-left">
        {/* Decorative Top Accent */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-blue-500 via-sky-500 to-indigo-500" />

        {/* Modal Header */}
        <div className="flex items-start justify-between px-4 sm:px-6 pt-5 sm:pt-6 pb-4 border-b border-gray-50">
          <div>
            {lockedPrompt && (
              <div className="inline-flex items-center gap-1.5 rounded-full bg-amber-50 border border-amber-100 px-2.5 py-0.5 text-[10px] font-bold text-amber-700 mb-2">
                <Lock className="h-3 w-3" />
                <span>Account Required</span>
              </div>
            )}
            <h3 className="text-lg font-bold text-gray-900">
              {lockedPrompt
                ? "Create a free account to continue"
                : authMode === "signin"
                ? "Student Sign In"
                : "Create Account"}
            </h3>
            <p className="text-xs text-gray-500 mt-0.5">
              {lockedPrompt
                ? "Sign in or create a free student account to take quizzes, save scores, and view your progress dashboard."
                : "Sign in with Google to save your quiz scores & progress."}
            </p>
          </div>

          {onClose && (
            <button
              onClick={onClose}
              id="btn-close-auth"
              className="rounded-lg p-1 text-gray-400 hover:bg-gray-50 hover:text-gray-900 transition cursor-pointer ml-1"
            >
              <X className="h-5 w-5" />
            </button>
          )}
        </div>

        {/* Sign In / Create Account Tabs (Student Only) */}
        <div className="grid grid-cols-2 border-b border-gray-100 bg-gray-50/50 p-1">
          <button
            type="button"
            onClick={() => {
              setAuthMode("signin");
              setError("");
            }}
            className={`flex items-center justify-center gap-2 py-2.5 text-xs font-bold transition rounded-lg cursor-pointer ${
              authMode === "signin"
                ? "bg-white text-blue-700 shadow-sm border border-gray-100"
                : "text-gray-500 hover:text-gray-900"
            }`}
          >
            <GraduationCap className="h-4 w-4" />
            <span>Sign In</span>
          </button>
          <button
            type="button"
            onClick={() => {
              setAuthMode("signup");
              setError("");
            }}
            className={`flex items-center justify-center gap-2 py-2.5 text-xs font-bold transition rounded-lg cursor-pointer ${
              authMode === "signup"
                ? "bg-white text-blue-700 shadow-sm border border-gray-100"
                : "text-gray-500 hover:text-gray-900"
            }`}
          >
            <ShieldCheck className="h-4 w-4" />
            <span>Create Account</span>
          </button>
        </div>

        {/* Auth Body */}
        <div className="p-4 sm:p-6 space-y-4">
          {error && (
            <div className="flex items-start gap-2 rounded-xl bg-red-50 p-3 text-xs text-red-700 border border-red-100 leading-relaxed">
              <AlertCircle className="h-4 w-4 mt-0.5 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {authMode === "signup" && (
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-gray-700">
                Display Name <span className="text-gray-400 font-normal">(optional)</span>
              </label>
              <input
                type="text"
                placeholder="Uses your Google name if left blank"
                autoComplete="off"
                maxLength={100}
                value={preferredName}
                onChange={(e) => {
                  setPreferredName(e.target.value);
                  setError("");
                }}
                className="w-full rounded-xl border border-gray-200 px-3.5 py-2 text-sm text-gray-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>
          )}

          <div className="rounded-xl bg-blue-50/60 border border-blue-100 p-3.5 text-xs text-blue-900 space-y-1.5">
            <div className="flex items-center gap-1.5 font-bold text-blue-800">
              <ShieldCheck className="h-4 w-4 text-blue-600 shrink-0" />
              <span>Private Cloud Progress Sync</span>
            </div>
            <p className="text-[11px] text-blue-800/80 leading-relaxed">
              Your student profile and quiz results are securely stored in Firebase Firestore under your Google account so your progress is always saved when you return.
            </p>
          </div>

          <button
            type="button"
            onClick={handleGoogleSignIn}
            disabled={isSigningIn}
            id="btn-auth-submit"
            className="w-full flex items-center justify-center gap-3 rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm font-bold text-gray-800 shadow-sm hover:bg-gray-50 hover:border-gray-300 disabled:opacity-60 disabled:cursor-not-allowed transition cursor-pointer"
          >
            {isSigningIn ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin text-blue-600" />
                <span>Connecting with Google...</span>
              </>
            ) : (
              <>
                <svg className="h-4 w-4 shrink-0" viewBox="0 0 24 24" aria-hidden="true">
                  <path
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    fill="#4285F4"
                  />
                  <path
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    fill="#34A853"
                  />
                  <path
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    fill="#FBBC05"
                  />
                  <path
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    fill="#EA4335"
                  />
                </svg>
                <span>
                  {authMode === "signin"
                    ? "Sign In with Google"
                    : "Create Account with Google"}
                </span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
