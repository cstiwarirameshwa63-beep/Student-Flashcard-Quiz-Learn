import React, { useState } from "react";
import { 
  X, 
  AlertCircle, 
  ShieldAlert, 
  GraduationCap, 
  Eye, 
  EyeOff 
} from "lucide-react";
import { UserProfile, StudentProgressData } from "../types";

interface AuthModalProps {
  onClose?: () => void;
  onLoginSuccess: (user: UserProfile) => void;
  isEmbedded?: boolean;
  existingStudents?: StudentProgressData[];
}

export function AuthModal({ onClose, onLoginSuccess, isEmbedded = false, existingStudents = [] }: AuthModalProps) {
  // Main view state: "login" or "register"
  const [pageMode, setPageMode] = useState<"login" | "register">("login");
  
  // Role tab for login view
  const [activeTab, setActiveTab] = useState<"student" | "admin">("student");

  // Form input fields - strictly blank with no suggestions
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [adminName, setAdminName] = useState("");
  const [adminPassword, setAdminPassword] = useState("");
  const [studentPassword, setStudentPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Admin login path
    if (pageMode === "login" && activeTab === "admin") {
      const cleanAdminName = adminName.trim();
      if (!cleanAdminName) {
        setError("Please enter your admin name.");
        return;
      }
      if (!adminPassword.trim()) {
        setError("Please enter the admin password.");
        return;
      }
      if (adminPassword !== "admin") {
        setError("Invalid Admin Password. Please verify your credentials.");
        return;
      }
      onLoginSuccess({
        name: cleanAdminName,
        email: "admin@platform.edu",
        avatarSeed: "admin_" + cleanAdminName.replace(/\s+/g, "_") + "_" + Date.now(),
        role: "admin",
      });
      if (onClose) onClose();
      return;
    }

    const cleanEmail = email.trim().toLowerCase();
    if (!cleanEmail || !cleanEmail.includes("@")) {
      setError("Please enter a valid email address.");
      return;
    }

    // CREATE ACCOUNT (manual)
    if (pageMode === "register") {
      const cleanName = name.trim();
      if (!cleanName) {
        setError("Please enter your full name.");
        return;
      }

      // Check if email already registered
      const existing = existingStudents.find((s) => s.email.trim().toLowerCase() === cleanEmail);
      if (existing) {
        setError("An account with this email already exists. Click 'Sign in' in the corner to log in!");
        return;
      }

      if (!studentPassword || studentPassword.trim().length < 3) {
        setError("Please choose a password of at least 3 characters.");
        return;
      }

      if (studentPassword !== confirmPassword) {
        setError("Passwords do not match. Please verify both password fields.");
        return;
      }

      onLoginSuccess({
        name: cleanName,
        email: cleanEmail,
        avatarSeed: cleanName + Date.now(),
        role: "student",
        password: studentPassword.trim(),
      });
      if (onClose) onClose();
      return;
    }

    // SIGN IN (manual)
    if (!studentPassword) {
      setError("Please enter your password to sign in.");
      return;
    }

    const matched = existingStudents.find((s) => s.email.trim().toLowerCase() === cleanEmail);
    if (!matched) {
      setError("No student account found with this email. Click 'Create account' in the corner to sign up!");
      return;
    }

    if (matched.password && matched.password !== studentPassword) {
      setError("Incorrect password. Please verify your credentials.");
      return;
    }

    onLoginSuccess({
      name: matched.name,
      email: matched.email,
      avatarSeed: matched.avatarSeed,
      role: "student",
      password: matched.password,
    });
    if (onClose) onClose();
  };

  const cardContent = (
    <div className="relative w-full max-w-md max-h-[92vh] overflow-y-auto rounded-2xl bg-white shadow-xl border border-gray-100 text-left">
      {/* Decorative Top Accent */}
      <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-blue-500 via-sky-500 to-indigo-500" />

      {/* Modal Header with the single line link in the corner */}
      <div className="flex items-start justify-between px-4 sm:px-6 pt-5 sm:pt-6 pb-4 border-b border-gray-50">
        <div>
          <h3 className="text-lg font-bold text-gray-900">
            {pageMode === "register"
              ? "Create Student Account"
              : activeTab === "student"
              ? "Student Sign In"
              : "Admin Portal"}
          </h3>
          <p className="text-xs text-gray-500 mt-0.5">
            {pageMode === "register"
              ? "Create your account to take quizzes and track progress"
              : activeTab === "student"
              ? "Sign in to access your quizzes and track progress"
              : "Enter your admin name and password to access course editor"}
          </p>
        </div>

        {/* Single line in the corner */}
        <div className="flex items-center gap-2">
          {pageMode === "login" ? (
            <button
              type="button"
              onClick={() => {
                setPageMode("register");
                setError("");
              }}
              className="text-xs font-bold text-blue-600 hover:text-blue-800 transition cursor-pointer hover:underline"
            >
              Create account →
            </button>
          ) : (
            <button
              type="button"
              onClick={() => {
                setPageMode("login");
                setError("");
              }}
              className="text-xs font-bold text-blue-600 hover:text-blue-800 transition cursor-pointer hover:underline"
            >
              Sign in →
            </button>
          )}

          {!isEmbedded && onClose && (
            <button
              onClick={onClose}
              id="btn-close-auth"
              className="rounded-lg p-1 text-gray-400 hover:bg-gray-50 hover:text-gray-900 transition cursor-pointer ml-1"
            >
              <X className="h-5 w-5" />
            </button>
          )}
        </div>
      </div>

      {/* Role Tabs (Only on Login view) */}
      {pageMode === "login" && (
        <div className="grid grid-cols-2 border-b border-gray-100 bg-gray-50/50 p-1">
          <button
            type="button"
            onClick={() => {
              setActiveTab("student");
              setError("");
            }}
            className={`flex items-center justify-center gap-2 py-2.5 text-xs font-bold transition rounded-lg cursor-pointer ${
              activeTab === "student"
                ? "bg-white text-blue-700 shadow-sm border border-gray-100"
                : "text-gray-500 hover:text-gray-900"
            }`}
          >
            <GraduationCap className="h-4 w-4" />
            <span>Student Login</span>
          </button>
          <button
            type="button"
            onClick={() => {
              setActiveTab("admin");
              setError("");
            }}
            className={`flex items-center justify-center gap-2 py-2.5 text-xs font-bold transition rounded-lg cursor-pointer ${
              activeTab === "admin"
                ? "bg-white text-sky-700 shadow-sm border border-gray-100"
                : "text-gray-500 hover:text-gray-900"
            }`}
          >
            <ShieldAlert className="h-4 w-4" />
            <span>Admin Portal</span>
          </button>
        </div>
      )}

      {/* Modal Form */}
      <form onSubmit={handleSubmit} className="p-4 sm:p-6 space-y-4">
        {error && (
          <div className="flex items-start gap-2 rounded-xl bg-red-50 p-3 text-xs text-red-700 border border-red-100 leading-relaxed">
            <AlertCircle className="h-4 w-4 mt-0.5 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* CREATE ACCOUNT: Name Field */}
        {pageMode === "register" && (
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-gray-700">Full Name</label>
            <input
              type="text"
              placeholder=""
              autoComplete="off"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                setError("");
              }}
              className="w-full rounded-xl border border-gray-200 px-3.5 py-2 text-sm text-gray-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              required
            />
          </div>
        )}

        {/* EMAIL FIELD (Student Login or Create Account) */}
        {(pageMode === "register" || activeTab === "student") && (
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-gray-700">
              Email Address
            </label>
            <input
              type="email"
              placeholder=""
              autoComplete="off"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setError("");
              }}
              className="w-full rounded-xl border border-gray-200 px-3.5 py-2 text-sm text-gray-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              required
            />
          </div>
        )}

        {/* PASSWORD FIELD */}
        {(pageMode === "register" || activeTab === "student") && (
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-gray-700">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder=""
                autoComplete="off"
                value={studentPassword}
                onChange={(e) => {
                  setStudentPassword(e.target.value);
                  setError("");
                }}
                className="w-full rounded-xl border border-gray-200 px-3.5 py-2 pr-10 text-sm text-gray-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600 cursor-pointer"
                tabIndex={-1}
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>
        )}

        {/* CONFIRM PASSWORD (Only on Create Account) */}
        {pageMode === "register" && (
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-gray-700">Confirm Password</label>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                placeholder=""
                autoComplete="off"
                value={confirmPassword}
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                  setError("");
                }}
                className="w-full rounded-xl border border-gray-200 px-3.5 py-2 pr-10 text-sm text-gray-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                required
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600 cursor-pointer"
                tabIndex={-1}
              >
                {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>
        )}

        {/* Admin Name & Password Fields */}
        {pageMode === "login" && activeTab === "admin" && (
          <>
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-gray-700">Admin Name</label>
              <input
                type="text"
                placeholder=""
                autoComplete="off"
                value={adminName}
                onChange={(e) => {
                  setAdminName(e.target.value);
                  setError("");
                }}
                className="w-full rounded-xl border border-gray-200 px-3.5 py-2 text-sm text-gray-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                required
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-gray-700">Admin Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder=""
                  autoComplete="off"
                  value={adminPassword}
                  onChange={(e) => {
                    setAdminPassword(e.target.value);
                    setError("");
                  }}
                  className="w-full rounded-xl border border-gray-200 px-3.5 py-2 pr-10 text-sm text-gray-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600 cursor-pointer"
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>
          </>
        )}

        {/* Action Button */}
        <button
          type="submit"
          id="btn-auth-submit"
          className="w-full rounded-xl px-4 py-2.5 text-sm font-semibold text-white bg-blue-600 shadow-md shadow-blue-100 hover:bg-blue-700 transition cursor-pointer"
        >
          {pageMode === "register"
            ? "Create Account & Start Learning"
            : activeTab === "admin"
            ? "Authenticate & Edit"
            : "Sign In"}
        </button>
      </form>
    </div>
  );

  if (isEmbedded) {
    return cardContent;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/60 backdrop-blur-sm">
      {cardContent}
    </div>
  );
}
