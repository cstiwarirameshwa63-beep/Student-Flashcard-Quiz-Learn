import React, { useState, useMemo } from "react";
import { 
  X, 
  Sparkles, 
  AlertCircle, 
  ShieldAlert, 
  GraduationCap, 
  Lock, 
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
  const [activeTab, setActiveTab] = useState<"student" | "admin">("student");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [adminPassword, setAdminPassword] = useState("");
  const [studentPassword, setStudentPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  // Check if entered email matches an existing student with a protected password
  const matchedStudent = useMemo(() => {
    if (!email.trim() || activeTab !== "student") return null;
    return existingStudents.find((s) => s.email.trim().toLowerCase() === email.trim().toLowerCase()) || null;
  }, [email, existingStudents, activeTab]);

  const isExistingPasswordProtected = Boolean(matchedStudent?.password);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) {
      setError("Please fill out all required fields.");
      return;
    }
    if (!email.includes("@")) {
      setError("Please enter a valid email address.");
      return;
    }

    if (activeTab === "admin") {
      if (adminPassword !== "admin") {
        setError("Invalid Admin Password. Please verify your credentials.");
        return;
      }
      onLoginSuccess({
        name: name.trim(),
        email: email.trim(),
        avatarSeed: name.trim() + Date.now(),
        role: "admin",
      });
      if (onClose) onClose();
      return;
    }

    // Student Authentication & Privacy Checks
    if (isExistingPasswordProtected) {
      if (!studentPassword) {
        setError("Please enter your password to sign in.");
        return;
      }
      if (studentPassword !== matchedStudent?.password) {
        setError("Incorrect password.");
        return;
      }
    } else {
      if (studentPassword.trim().length > 0 && studentPassword.trim().length < 3) {
        setError("Password must be at least 3 characters long.");
        return;
      }
    }

    const finalPassword = studentPassword.trim() || matchedStudent?.password || undefined;

    onLoginSuccess({
      name: name.trim(),
      email: email.trim(),
      avatarSeed: matchedStudent?.avatarSeed || name.trim() + Date.now(),
      role: "student",
      password: finalPassword,
    });
    if (onClose) onClose();
  };

  const cardContent = (
    <div className="relative w-full max-w-md overflow-hidden rounded-2xl bg-white shadow-xl border border-gray-100 text-left">
      {/* Decorative Top Accent */}
      <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-blue-500 via-sky-500 to-indigo-500" />

      {/* Modal Header */}
      <div className="flex items-center justify-between px-6 pt-6 pb-4 border-b border-gray-50">
        <div>
          <h3 className="text-lg font-bold text-gray-900">
            {activeTab === "student" ? "Student Sign In & Privacy" : "Admin Control Panel"}
          </h3>
          <p className="text-xs text-gray-500">
            {activeTab === "student" 
              ? "Protect your quiz progress and personal analytics" 
              : "Enter credentials to edit course modules and view rosters"}
          </p>
        </div>
        {!isEmbedded && onClose && (
          <button
            onClick={onClose}
            id="btn-close-auth"
            className="rounded-lg p-1.5 text-gray-400 hover:bg-gray-50 hover:text-gray-900 transition cursor-pointer"
          >
            <X className="h-5 w-5" />
          </button>
        )}
      </div>

      {/* Role Tabs */}
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

      {/* Modal Form */}
      <form onSubmit={handleSubmit} className="p-6 space-y-4">
        {error && (
          <div className="flex items-start gap-2 rounded-xl bg-red-50 p-3 text-xs text-red-700 border border-red-100 leading-relaxed">
            <AlertCircle className="h-4 w-4 mt-0.5 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-gray-700">Full Name</label>
          <input
            type="text"
            placeholder="Enter your full name"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              setError("");
            }}
            className="w-full rounded-xl border border-gray-200 px-3.5 py-2 text-sm text-gray-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            required
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-gray-700">Email Address (Gmail / Academic)</label>
          <input
            type="email"
            list={existingStudents.length > 0 ? "student-email-suggestions" : undefined}
            autoComplete="off"
            placeholder={existingStudents.length > 0 ? `e.g. ${existingStudents[0].email}` : "Enter your email"}
            value={email}
            onChange={(e) => {
              const val = e.target.value;
              setEmail(val);
              setError("");
              // Auto-fill existing name only if student has logged in before
              if (existingStudents.length > 0) {
                const existing = existingStudents.find((s) => s.email.trim().toLowerCase() === val.trim().toLowerCase());
                if (existing && !name) {
                  setName(existing.name);
                }
              }
            }}
            className="w-full rounded-xl border border-gray-200 px-3.5 py-2 text-sm text-gray-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            required
          />
          {existingStudents.length > 0 && (
            <datalist id="student-email-suggestions">
              {existingStudents.map((s) => (
                <option key={s.email} value={s.email}>
                  {s.name}
                </option>
              ))}
            </datalist>
          )}
          {existingStudents.length > 0 && !email && (
            <div className="flex items-center gap-1.5 flex-wrap pt-0.5">
              <span className="text-[10px] text-gray-400 font-medium">Recent account suggestion:</span>
              {existingStudents.slice(0, 2).map((s) => (
                <button
                  key={s.email}
                  type="button"
                  onClick={() => {
                    setEmail(s.email);
                    if (!name) setName(s.name);
                  }}
                  className="inline-flex items-center gap-1 rounded-md bg-blue-50 px-2 py-0.5 text-[10px] font-semibold text-blue-700 hover:bg-blue-100 transition cursor-pointer"
                >
                  <span>{s.email}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Student Password */}
        {activeTab === "student" && (
          <div className="space-y-1.5">
            <div className="flex justify-between items-center">
              <label className="text-xs font-semibold text-gray-700">Password</label>
              {isExistingPasswordProtected ? (
                <span className="text-[10px] text-blue-600 font-semibold flex items-center gap-1">
                  <Lock className="h-3 w-3" /> Required
                </span>
              ) : (
                <span className="text-[10px] text-gray-400">Optional</span>
              )}
            </div>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                value={studentPassword}
                onChange={(e) => {
                  setStudentPassword(e.target.value);
                  setError("");
                }}
                className="w-full rounded-xl border border-gray-200 px-3.5 py-2 pr-10 text-sm text-gray-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                required={isExistingPasswordProtected}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600 cursor-pointer"
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>
        )}

        {/* Admin Password Section */}
        {activeTab === "admin" && (
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-gray-700">Admin Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
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
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>
        )}

        <div className="bg-amber-50 rounded-xl p-3 border border-amber-100 text-xs text-amber-800 space-y-1">
          <div className="flex items-center gap-1 font-semibold">
            <Sparkles className="h-3.5 w-3.5 text-amber-600" />
            <span>Clean Slate Privacy Guarantee</span>
          </div>
          <p className="leading-relaxed text-[11px]">
            Your learning session, scores, and privacy passwords remain strictly in active memory. You have complete control over who can view your progress.
          </p>
        </div>

        <button
          type="submit"
          id="btn-auth-submit"
          className={`w-full rounded-xl px-4 py-2.5 text-sm font-semibold text-white shadow-md transition cursor-pointer ${
            activeTab === "student"
              ? "bg-blue-600 shadow-blue-100 hover:bg-blue-700"
              : "bg-sky-600 shadow-sky-100 hover:bg-sky-700"
          }`}
        >
          {activeTab === "student" ? "Start Learning Safely" : "Authenticate & Edit"}
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
