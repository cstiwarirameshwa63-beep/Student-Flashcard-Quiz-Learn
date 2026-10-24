import { GraduationCap, LogIn, LogOut, Award, Sparkles, BarChart3, LayoutDashboard } from "lucide-react";
import { UserProfile, ViewMode } from "../types";

interface HeaderProps {
  user: UserProfile | null;
  onLoginClick: () => void;
  onLogout: () => void;
  onGoHome: () => void;
  activeModuleName?: string;
  score?: number;
  viewMode: ViewMode;
  onViewModeChange: (mode: ViewMode) => void;
}

export function Header({
  user,
  onLoginClick,
  onLogout,
  onGoHome,
  activeModuleName,
  score,
  viewMode,
  onViewModeChange,
}: HeaderProps) {
  // Generate simple initials or dynamic colors based on user avatar seed
  const getAvatarStyle = (seed: string) => {
    let hash = 0;
    for (let i = 0; i < seed.length; i++) {
      hash = seed.charCodeAt(i) + ((hash << 5) - hash);
    }
    const h = Math.abs(hash) % 360;
    return {
      backgroundColor: `hsl(${h}, 70%, 45%)`,
      color: "#ffffff",
    };
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-gray-100 bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Left: Brand Identity */}
        <button
          onClick={onGoHome}
          id="btn-brand-home"
          className="flex items-center gap-2.5 transition hover:opacity-90 cursor-pointer text-left"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-white shadow-md shadow-blue-100">
            <GraduationCap className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-lg font-bold tracking-tight text-gray-900 font-sans">
              Student Learning Quiz
            </h1>
            <p className="text-xs font-medium text-gray-500">
              Clean Slate Language Engine
            </p>
          </div>
        </button>

        {/* Navigation Tabs (Only when logged in) */}
        {user && (
          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl">
            <button
              onClick={() => onViewModeChange("dashboard")}
              id="nav-btn-decks"
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
                viewMode === "dashboard" || viewMode === "study" || viewMode === "quiz" || viewMode === "admin_edit"
                  ? "bg-white text-blue-700 shadow-sm border border-slate-200/50"
                  : "text-slate-500 hover:text-slate-800"
              }`}
            >
              <LayoutDashboard className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Learning Decks</span>
            </button>
            <button
              onClick={() => onViewModeChange("progress")}
              id="nav-btn-progress"
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
                viewMode === "progress"
                  ? "bg-white text-blue-700 shadow-sm border border-slate-200/50"
                  : "text-slate-500 hover:text-slate-800"
              }`}
            >
              <BarChart3 className="h-3.5 w-3.5" />
              <span>{user.role === "admin" ? "Classroom Progress" : "My Progress"}</span>
            </button>
          </div>
        )}

        {/* Middle: Live Learning Stats Context */}
        {activeModuleName && (
          <div className="hidden md:flex items-center gap-4 bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-100 text-sm">
            <span className="text-gray-500 font-medium">Active Module:</span>
            <span className="font-semibold text-blue-700">{activeModuleName}</span>
            {score !== undefined && (
              <>
                <span className="text-gray-300">|</span>
                <span className="flex items-center gap-1 text-emerald-600 font-medium">
                  <Award className="h-4 w-4" /> Score: {score}
                </span>
              </>
            )}
          </div>
        )}

        {/* Right: Auth Flow & Quick Controls */}
        <div className="flex items-center gap-3">
          {user ? (
            <div className="flex items-center gap-3 bg-gray-50/50 pl-3 pr-2 py-1.5 rounded-full border border-gray-100">
              <div className="hidden sm:block text-right">
                <p className="text-xs font-semibold text-gray-900">{user.name}</p>
                <p className="text-[10px] text-gray-500">{user.email}</p>
              </div>
              <div
                style={getAvatarStyle(user.avatarSeed)}
                className="flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold shadow-inner"
              >
                {user.name.charAt(0).toUpperCase()}
              </div>
              <button
                onClick={onLogout}
                id="btn-logout"
                title="Sign Out"
                className="flex h-8 w-8 items-center justify-center rounded-full text-gray-500 hover:text-red-600 hover:bg-red-50 transition cursor-pointer"
              >
                <LogOut className="h-4 w-4" />
              </button>
            </div>
          ) : (
            <button
              onClick={onLoginClick}
              id="btn-login-trigger"
              className="flex items-center gap-2 rounded-xl bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-700 hover:bg-blue-100 transition cursor-pointer"
            >
              <LogIn className="h-4 w-4" />
              <span>Sign In</span>
            </button>
          )}

          {/* Sparkle decorative indicator showing offline/memory state */}
          <div className="hidden xl:flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 text-amber-700 border border-amber-100 text-[11px] font-medium">
            <Sparkles className="h-3.5 w-3.5 animate-pulse" />
            <span>Memory Mode Active</span>
          </div>
        </div>
      </div>
    </header>
  );
}
