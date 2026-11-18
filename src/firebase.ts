import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore, doc, getDocFromServer } from "firebase/firestore";
import firebaseConfig from "../firebase-applet-config.json";

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app, firebaseConfig.firestoreDatabaseId);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
googleProvider.addScope("email");
googleProvider.addScope("profile");
googleProvider.setCustomParameters({ prompt: "select_account" });

export interface AuthErrorDetails {
  code: string;
  message: string;
  unauthorizedHost?: string;
  canRetryWithRedirect?: boolean;
}

export function formatFirebaseAuthError(err: unknown, currentHostname: string): AuthErrorDetails {
  const authErr = err as { code?: string; message?: string };
  const code = authErr?.code || "auth/unknown";

  if (code === "auth/popup-closed-by-user") {
    return {
      code,
      message: "Sign-in popup was closed before completing Google authentication.",
      canRetryWithRedirect: true,
    };
  }
  if (code === "auth/cancelled-popup-request") {
    return {
      code,
      message: "A previous sign-in popup was still open. Please try again.",
    };
  }
  if (code === "auth/popup-blocked") {
    return {
      code,
      message:
        "Your browser blocked the Google Sign-In popup. Allow popups for this site or use redirect sign-in below.",
      canRetryWithRedirect: true,
    };
  }
  if (code === "auth/web-storage-unsupported" || code === "auth/operation-not-supported-in-this-environment") {
    return {
      code,
      message:
        "Browser storage or third-party iframe cookies are restricted for popup sign-in. Try redirect sign-in below or enable cookies.",
      canRetryWithRedirect: true,
    };
  }
  if (code === "auth/unauthorized-domain") {
    return {
      code,
      unauthorizedHost: currentHostname,
      message: `This website domain (${currentHostname}) is not authorized in Firebase Authentication > Settings > Authorized domains.`,
    };
  }
  if (code === "auth/operation-not-allowed") {
    return {
      code,
      message:
        "Google Sign-In is disabled in Firebase Console > Authentication > Sign-in method. Please enable the Google provider.",
    };
  }
  if (code === "auth/network-request-failed") {
    return {
      code,
      message: "Network error while contacting Google/Firebase Authentication. Check your internet connection and try again.",
    };
  }

  return {
    code,
    message: authErr?.message ? `${authErr.message} (${code})` : `Failed to sign in with Google (${code}).`,
    canRetryWithRedirect: code === "auth/internal-error",
  };
}

export const BOOTSTRAPPED_ADMIN_EMAIL = "cs.tiwarirameshwa63@gmail.com";
export const ADMIN_EMAILS = ["cs.tiwarirameshwa63@gmail.com"];

export function isAllowedAdminEmail(email?: string | null): boolean {
  if (!email) return false;
  return ADMIN_EMAILS.some((allowed) => allowed.toLowerCase() === email.toLowerCase());
}

export enum OperationType {
  CREATE = "create",
  UPDATE = "update",
  DELETE = "delete",
  LIST = "list",
  GET = "get",
  WRITE = "write",
}

export interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
    emailVerified?: boolean | null;
    isAnonymous?: boolean | null;
    tenantId?: string | null;
    providerInfo?: {
      providerId?: string | null;
      email?: string | null;
    }[];
  };
}

export function handleFirestoreError(
  error: unknown,
  operationType: OperationType,
  path: string | null
): never {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid,
      email: auth.currentUser?.email,
      emailVerified: auth.currentUser?.emailVerified,
      isAnonymous: auth.currentUser?.isAnonymous,
      tenantId: auth.currentUser?.tenantId,
      providerInfo:
        auth.currentUser?.providerData?.map((provider) => ({
          providerId: provider.providerId,
          email: provider.email,
        })) || [],
    },
    operationType,
    path,
  };
  console.error("Firestore Error: ", JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

async function testConnection() {
  try {
    await getDocFromServer(doc(db, "test", "connection"));
  } catch (error) {
    if (error instanceof Error && error.message.includes("the client is offline")) {
      console.error("Please check your Firebase configuration.");
    }
  }
}

testConnection();
