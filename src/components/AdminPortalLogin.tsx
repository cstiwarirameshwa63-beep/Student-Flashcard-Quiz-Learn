import { useState, useEffect } from "react";
import { signInWithPopup, signInWithRedirect, signOut } from "firebase/auth";
import {
  ShieldAlert,
  AlertCircle,
  ShieldCheck,
  Loader2,
  Sparkles,
  ArrowLeft,
  Copy,
  Check,
  ExternalLink,
  ArrowRight,
} from "lucide-react";
import {
  auth,
  googleProvider,
  isAllowedAdminEmail,
  formatFirebaseAuthError,
  AuthErrorDetails,
} from "../firebase";
import firebaseConfig from "../../firebase-applet-config.json";

interface AdminPortalLoginProps {
  externalError?: string;
  onBackToHome?: () => void;
}

export function AdminPortalLogin({ externalError = "", onBackToHome }: AdminPortalLoginProps) {
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [errorDetails, setErrorDetails] = useState<AuthErrorDetails | null>(
    externalError ? { code: "auth/access-denied", message: externalError } : null
  );
  const [copiedHost, setCopiedHost] = useState(false);

  const isTopLevelWindow =
    typeof window !== "undefined" && window.self === window.top;

  useEffect(() => {
    if (externalError) {
      setErrorDetails({ code: "auth/access-denied", message: externalError });
    }
  }, [externalError]);

  const handleCopyHost = async () => {
    if (!errorDetails?.unauthorizedHost) return;
    try {
      await navigator.clipboard.writeText(errorDetails.unauthorizedHost);
      setCopiedHost(true);
      setTimeout(() => setCopiedHost(false), 2000);
    } catch {
      // Clipboard API unavailable
    }
  };

  const startRedirectSignIn = async () => {
    setErrorDetails(null);
    setIsSigningIn(true);
    try {
      await signInWithRedirect(auth, googleProvider);
    } catch (err: unknown) {
      setErrorDetails(formatFirebaseAuthError(err, window.location.hostname));
      setIsSigningIn(false);
    }
  };

  const handleAdminSignIn = async () => {
    setErrorDetails(null);
    setIsSigningIn(true);

    try {
      const result = await signInWithPopup(auth, googleProvider);
      const fbUser = result.user;

      if (!fbUser.emailVerified || !isAllowedAdminEmail(fbUser.email)) {
        await signOut(auth);
        setErrorDetails({
          code: "auth/access-denied",
          message: "Access denied. This Google account is not authorized for the Admin Portal.",
        });
        return;
      }
    } catch (err: unknown) {
      const details = formatFirebaseAuthError(err, window.location.hostname);

      if (
        isTopLevelWindow &&
        (details.code === "auth/popup-blocked" ||
          details.code === "auth/web-storage-unsupported" ||
          details.code === "auth/operation-not-supported-in-this-environment")
      ) {
        try {
          await signInWithRedirect(auth, googleProvider);
          return;
        } catch (redirectErr: unknown) {
          setErrorDetails(formatFirebaseAuthError(redirectErr, window.location.hostname));
          setIsSigningIn(false);
          return;
        }
      }

      setErrorDetails(details);
    } finally {
      setIsSigningIn(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50/50 text-slate-900 flex flex-col font-sans selection:bg-blue-100 selection:text-blue-900 justify-center items-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-8 max-w-md">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-xs font-semibold text-blue-700 mb-3">
          <Sparkles className="h-3.5 w-3.5 text-blue-500" />
          <span>Restricted Administration</span>
        </div>
        <h1 className="text-3xl font-black text-slate-900 tracking-tight">
          Student Quiz Learning
        </h1>
        <p className="text-xs text-slate-500 mt-2">
          Protected Admin Portal for managing classroom analytics, student records, and flashcards.
        </p>
      </div>

      <div className="relative w-full max-w-md overflow-hidden rounded-2xl bg-white shadow-xl border border-gray-100 text-left">
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-blue-500 via-sky-500 to-indigo-500" />

        <div className="px-6 pt-6 pb-4 border-b border-gray-50 flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-sky-50 border border-sky-100 flex items-center justify-center text-sky-700 shrink-0">
            <ShieldAlert className="h-5 w-5" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-gray-900">Admin Portal Sign In</h2>
            <p className="text-xs text-gray-500">
              Authorized administrator Google account required
            </p>
          </div>
        </div>

        <div className="p-6 space-y-4">
          {errorDetails && (
            <div
              role="alert"
              className="rounded-xl bg-red-50 p-3.5 text-xs text-red-800 border border-red-100 leading-relaxed space-y-2.5 font-semibold"
            >
              <div className="flex items-start gap-2">
                <AlertCircle className="h-4 w-4 mt-0.5 shrink-0 text-red-600" />
                <div className="space-y-1">
                  <p>{errorDetails.message}</p>
                  {errorDetails.code && errorDetails.code !== "auth/access-denied" && (
                    <p className="text-[10px] font-mono font-normal text-red-600/80">
                      Error code: {errorDetails.code}
                    </p>
                  )}
                </div>
              </div>

              {errorDetails.unauthorizedHost && (
                <div className="pl-6 space-y-2 font-normal">
                  <div className="flex flex-wrap items-center gap-2">
                    <code className="rounded-lg bg-white px-2 py-1 text-[11px] font-mono text-red-900 border border-red-200 select-all">
                      {errorDetails.unauthorizedHost}
                    </code>
                    <button
                      type="button"
                      onClick={handleCopyHost}
                      className="inline-flex items-center gap-1 rounded-lg bg-white px-2.5 py-1 text-[11px] font-bold text-red-700 border border-red-200 hover:bg-red-100/60 transition cursor-pointer"
                    >
                      {copiedHost ? (
                        <>
                          <Check className="h-3 w-3 text-emerald-600" />
                          <span>Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="h-3 w-3" />
                          <span>Copy Domain</span>
                        </>
                      )}
                    </button>
                  </div>
                  <a
                    href={`https://console.firebase.google.com/project/${firebaseConfig.projectId}/authentication/settings`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-[11px] font-bold text-blue-700 hover:text-blue-800 underline"
                  >
                    <span>Open Firebase Console → Authorized domains</span>
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </div>
              )}

              {isTopLevelWindow && errorDetails.canRetryWithRedirect && (
                <div className="pl-6 font-normal">
                  <button
                    type="button"
                    onClick={startRedirectSignIn}
                    disabled={isSigningIn}
                    className="inline-flex items-center gap-1.5 rounded-lg bg-white px-3 py-1.5 text-[11px] font-bold text-blue-700 border border-blue-200 hover:bg-blue-50 transition cursor-pointer"
                  >
                    <span>Continue with Redirect Sign-In</span>
                    <ArrowRight className="h-3 w-3" />
                  </button>
                </div>
              )}
            </div>
          )}

          <div className="rounded-xl bg-blue-50/60 border border-blue-100 p-3.5 text-xs text-blue-900 space-y-1.5">
            <div className="flex items-center gap-1.5 font-bold text-blue-800">
              <ShieldCheck className="h-4 w-4 text-blue-600 shrink-0" />
              <span>Verified Admin Access Only</span>
            </div>
            <p className="text-[11px] text-blue-800/80 leading-relaxed">
              Sign in with the authorized administrator Google account to edit flashcards, inspect all students&apos; progress charts, and manage records.
            </p>
          </div>

          <button
            type="button"
            onClick={handleAdminSignIn}
            disabled={isSigningIn}
            id="btn-admin-auth-submit"
            className="w-full flex items-center justify-center gap-3 rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm font-bold text-gray-800 shadow-sm hover:bg-gray-50 hover:border-gray-300 disabled:opacity-60 disabled:cursor-not-allowed transition cursor-pointer"
          >
            {isSigningIn ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin text-blue-600" />
                <span>Verifying Admin Account...</span>
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
                <span>Sign in with Google</span>
              </>
            )}
          </button>

          {onBackToHome && (
            <button
              type="button"
              onClick={onBackToHome}
              className="w-full flex items-center justify-center gap-1.5 rounded-xl border border-gray-100 bg-gray-50 px-4 py-2.5 text-xs font-bold text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition cursor-pointer"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              <span>Back to Student Homepage</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
