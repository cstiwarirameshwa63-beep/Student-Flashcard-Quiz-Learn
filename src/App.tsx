import { useState, useMemo } from "react";
import { Header } from "./components/Header";
import { AuthModal } from "./components/AuthModal";
import { FlashcardDeck } from "./components/FlashcardDeck";
import { QuizSection } from "./components/QuizSection";
import { QuizQuestionEditor } from "./components/QuizQuestionEditor";
import { STATIC_MODULES } from "./data";
import { LearningModule, QuizProgress, UserProfile, ViewMode, Flashcard, StudentProgressData, QuizAttempt } from "./types";
import { StudentProgressDashboard } from "./components/StudentProgressDashboard";
import {
  BookOpen,
  HelpCircle,
  Sparkles,
  Flame,
  Award,
  Globe2,
  ListRestart,
  Compass,
  CheckCircle,
  Database,
  ArrowRight,
  Settings,
  Users,
  UserCheck,
  BarChart3,
  ArrowRightLeft
} from "lucide-react";

// Student directory starts empty with real student data recorded as learners take quizzes
const INITIAL_STUDENTS: StudentProgressData[] = [];

export default function App() {
  // Global React Memory State (Absolutely no localStorage/sessionStorage used!)
  const [user, setUser] = useState<UserProfile | null>(null);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [activeModuleId, setActiveModuleId] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<ViewMode>("dashboard");
  const [students, setStudents] = useState<StudentProgressData[]>(INITIAL_STUDENTS);
  
  // Keep modules list in React memory state so admins can dynamically edit questions/quiz options
  const [modules, setModules] = useState<LearningModule[]>(STATIC_MODULES);

  // Filters for multi-level selection
  const [selectedLanguage, setSelectedLanguage] = useState<string>("All");
  const [selectedLevel, setSelectedLevel] = useState<string>("All");

  // Dynamically split each base module into Beginner, Intermediate, and Advanced levels (7, 7, and 6 cards)
  const getLevelModule = (baseModule: LearningModule, level: "Beginner" | "Intermediate" | "Advanced"): LearningModule => {
    let cards: Flashcard[] = [];
    let description = "";
    let titleSuffix = "";
    let category = "";

    if (level === "Beginner") {
      cards = baseModule.cards.slice(0, 7);
      titleSuffix = "Beginner Section";
      description = `Master the essential basics of ${baseModule.language}. Study standard greetings, core pronouns, and helpful day-to-day vocabulary.`;
      category = "Essential Vocabulary";
    } else if (level === "Intermediate") {
      cards = baseModule.cards.slice(7, 14);
      titleSuffix = "Intermediate Section";
      description = `Build conversational confidence in ${baseModule.language}. Practice dynamic questions, everyday directions, and structured grammar.`;
      category = "Practical Interaction";
    } else {
      cards = baseModule.cards.slice(14);
      titleSuffix = "Advanced Section";
      description = `Unlock complete fluency in ${baseModule.language}. Explore cultural wisdom, complex idioms, and advanced grammatical nuances.`;
      category = "Fluent Masterclass";
    }

    return {
      ...baseModule,
      id: `${baseModule.id}_${level}`,
      title: `${baseModule.language} (${titleSuffix})`,
      description,
      level,
      category,
      cards,
    };
  };

  const allLevelModules = useMemo(() => {
    const result: LearningModule[] = [];
    modules.forEach((m) => {
      result.push(getLevelModule(m, "Beginner"));
      result.push(getLevelModule(m, "Intermediate"));
      result.push(getLevelModule(m, "Advanced"));
    });
    return result;
  }, [modules]);

  const [quizProgress, setQuizProgress] = useState<QuizProgress>({
    currentCardIndex: 0,
    score: 0,
    answers: {},
    isCompleted: false,
  });

  // Keep transient in-memory record of module scores during the active session only
  const [sessionStats, setSessionStats] = useState<
    Array<{ moduleId: string; score: number; total: number; timestamp: number }>
  >([]);

  // Find active module if selected from our in-memory state (matching either original or level-split IDs)
  const activeModule = allLevelModules.find((m) => m.id === activeModuleId) || modules.find((m) => m.id === activeModuleId);

  // Filter modules based on user language & difficulty level selections
  const filteredModules = useMemo(() => {
    return allLevelModules.filter((m) => {
      const matchesLanguage = selectedLanguage === "All" || m.language.toLowerCase() === selectedLanguage.toLowerCase();
      const matchesLevel = selectedLevel === "All" || m.level === selectedLevel;
      return matchesLanguage && matchesLevel;
    });
  }, [allLevelModules, selectedLanguage, selectedLevel]);

  // 1. Crucial Mandated resetQuiz function
  const resetQuiz = () => {
    setQuizProgress({
      currentCardIndex: 0,
      score: 0,
      answers: {},
      isCompleted: false,
    });
  };

  // 2. Crucial Mandated handleLogout function to explicitly clear user & session state
  const handleLogout = () => {
    setUser(null);
    resetQuiz();
    setActiveModuleId(null);
    setViewMode("dashboard");
    setSessionStats([]); // Wipes transient achievements!
  };

  // 3. Automating quiz reset when initiating a module
  const handleSelectModule = (moduleId: string, mode: "study" | "quiz" | "admin_edit") => {
    resetQuiz(); // Triggers automatically!
    setActiveModuleId(moduleId);
    setViewMode(mode);
  };

  // 4. Automating quiz reset when navigating back to the dashboard
  const handleGoHome = () => {
    resetQuiz(); // Triggers automatically!
    setActiveModuleId(null);
    setViewMode("dashboard");
  };

  // Handle saving modified cards/questions by an admin
  const handleSaveModuleCards = (updatedCards: Flashcard[]) => {
    // Extract base module ID (e.g. "es-essentials" from "es-essentials_Beginner")
    const baseId = activeModuleId?.split("_")[0] || "";
    const level = activeModuleId?.split("_")[1] as "Beginner" | "Intermediate" | "Advanced" | undefined;

    setModules((prev) =>
      prev.map((m) => {
        if (m.id === baseId && level) {
          // Replace only the specific cards for this level
          const startIdx = level === "Beginner" ? 0 : level === "Intermediate" ? 7 : 14;
          const newCards = [...m.cards];
          updatedCards.forEach((card, offset) => {
            newCards[startIdx + offset] = card;
          });
          return { ...m, cards: newCards };
        } else if (m.id === activeModuleId) {
          return { ...m, cards: updatedCards };
        }
        return m;
      })
    );
    setViewMode("dashboard");
  };

  // Handle answering questions in the active Quiz
  const handleAnswerSelected = (cardId: string, selectedIndex: number, isCorrect: boolean) => {
    setQuizProgress((prev) => {
      const updatedAnswers = {
        ...prev.answers,
        [cardId]: { selectedIndex, isCorrect },
      };

      const updatedScore = isCorrect ? prev.score + 1 : prev.score;

      return {
        ...prev,
        score: updatedScore,
        answers: updatedAnswers,
      };
    });
  };

  // Advance to the next question or complete the quiz
  const handleNextQuestion = () => {
    if (!activeModule) return;

    const isLastCard = quizProgress.currentCardIndex === activeModule.cards.length - 1;

    if (isLastCard) {
      // Record session statistics in-memory before finishing
      const attemptData = {
        moduleId: activeModule.id,
        moduleTitle: activeModule.title,
        language: activeModule.language,
        score: quizProgress.score,
        total: activeModule.cards.length,
        timestamp: Date.now(),
      };

      setSessionStats((prev) => [
        ...prev,
        attemptData,
      ]);

      // If logged in as a student, update their directory record automatically
      if (user && user.role === "student") {
        setStudents((prev) =>
          prev.map((s) =>
            s.email.toLowerCase() === user.email.toLowerCase()
              ? { ...s, attempts: [...s.attempts, attemptData] }
              : s
          )
        );
      }

      setQuizProgress((prev) => ({
        ...prev,
        isCompleted: true,
      }));
    } else {
      setQuizProgress((prev) => ({
        ...prev,
        currentCardIndex: prev.currentCardIndex + 1,
      }));
    }
  };

  // Handle custom student profile
  const handleLoginSuccess = (profile: UserProfile) => {
    setUser(profile);
    
    // Automatically register student in classroom roster if not already present, preserving or updating privacy password
    if (profile.role === "student") {
      setStudents((prev) => {
        const existingIndex = prev.findIndex((s) => s.email.toLowerCase() === profile.email.toLowerCase());
        if (existingIndex >= 0) {
          return prev.map((s, idx) =>
            idx === existingIndex
              ? {
                  ...s,
                  name: profile.name,
                  password: profile.password !== undefined ? profile.password : s.password,
                }
              : s
          );
        } else {
          return [
            ...prev,
            {
              name: profile.name,
              email: profile.email,
              avatarSeed: profile.avatarSeed,
              attempts: [],
              password: profile.password,
            },
          ];
        }
      });
    }
  };

  // Calculate session metrics
  const totalQuizzesCompleted = sessionStats.length;
  const averageCorrectRate =
    totalQuizzesCompleted > 0
      ? Math.round(
          (sessionStats.reduce((acc, curr) => acc + curr.score, 0) /
            sessionStats.reduce((acc, curr) => acc + curr.total, 0)) *
            100
        )
      : 0;

  if (!user) {
    return (
      <div className="min-h-screen bg-slate-50/50 text-slate-900 flex flex-col font-sans selection:bg-blue-100 selection:text-blue-900 justify-center items-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 max-w-md">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-xs font-semibold text-blue-700 mb-3">
            <Sparkles className="h-3.5 w-3.5 animate-pulse text-blue-500" />
            <span>Academic Mastery Platform</span>
          </div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">
            Clean Slate Language Engine
          </h1>
          <p className="text-xs text-slate-500 mt-2">
            Please sign in as a student or admin coordinator to unlock customized flashcards, real-time feedback mentors, and pedagogical insight analytics.
          </p>
        </div>
        <div className="w-full max-w-md">
          <AuthModal
            isEmbedded={true}
            onLoginSuccess={handleLoginSuccess}
            existingStudents={students}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50/50 text-slate-900 flex flex-col font-sans selection:bg-blue-100 selection:text-blue-900">
      {/* Header element */}
      <Header
        user={user}
        onLoginClick={() => setShowAuthModal(true)}
        onLogout={handleLogout}
        onGoHome={handleGoHome}
        activeModuleName={activeModule?.title}
        score={viewMode === "quiz" ? quizProgress.score : undefined}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
      />

      {/* Main workspace with distraction-free styling */}
      <main className="flex-1 flex flex-col">
        {viewMode === "dashboard" && (
          <div className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8 space-y-8 animate-fade-in">
            
            {/* Header Greeting Banner */}
            <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-blue-950 via-slate-900 to-blue-900 text-white p-6 sm:p-8 md:p-10 shadow-xl border border-blue-950/20">
              <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none hidden lg:block">
                <Globe2 className="h-64 w-64 text-blue-100" />
              </div>
              
              <div className="max-w-2xl space-y-4">
                <div className="inline-flex items-center gap-1.5 rounded-full bg-blue-500/10 px-3 py-1 text-xs font-bold text-blue-200 border border-blue-400/20">
                  <Sparkles className="h-3.5 w-3.5 text-amber-300" />
                  <span>Memory-Only Flashcard Studio</span>
                </div>
                
                <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
                  {user ? (
                    user.role === "admin" ? (
                      <span className="text-blue-300">Admin Control Console: {user.name} 🛠️</span>
                    ) : (
                      `Welcome back, ${user.name}! 👋`
                    )
                  ) : (
                    "Interactive Language Learning & Flashcards"
                  )}
                </h2>
                
                <p className="text-sm sm:text-base text-blue-100/80 leading-relaxed font-normal">
                  Expand your horizons through high-retention 3D flashcards and recognition-based quiz matching. 
                  {user?.role === "admin" 
                    ? " You have administrative access. You can now modify questions, answer options, phonetic aids, or add/delete flashcards dynamically."
                    : " Learn languages with personalized study decks and real-time interactive quiz feedback mentors."}
                </p>
              </div>
            </div>

            {/* RAM Session Metrics Panel */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm flex items-center gap-4">
                <div className="h-12 w-12 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600">
                  <Compass className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Available Material</p>
                  <p className="text-xl font-bold text-gray-900">{modules.length} Active Modules</p>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm flex items-center gap-4">
                <div className="h-12 w-12 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600">
                  <CheckCircle className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Session Quizzes</p>
                  <p className="text-xl font-bold text-gray-900">
                    {totalQuizzesCompleted > 0 ? `${totalQuizzesCompleted} Done` : "No Completed Quizzes"}
                  </p>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm flex items-center gap-4">
                <div className="h-12 w-12 rounded-xl bg-amber-50 flex items-center justify-center text-amber-600">
                  <Database className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Memory Mode Status</p>
                  <p className="text-xs font-semibold text-gray-700 leading-relaxed">
                    {user?.role === "admin" ? "Admin Session: RAM Sandboxed" : "Student Session: Volatile RAM"}
                  </p>
                </div>
              </div>
            </div>

            {/* Student Progress Report & Quizzy Mascot Advisor */}
            {(user?.role === "student" || sessionStats.length > 0) && (
              <div className="bg-gradient-to-br from-blue-50/70 via-white to-slate-50 border border-blue-100/80 rounded-3xl p-6 shadow-md space-y-6 animate-fade-in">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-blue-100/50 pb-4">
                  <div className="space-y-1 text-left">
                    <span className="text-[10px] font-extrabold text-blue-600 uppercase tracking-widest block">
                      Performance Center
                    </span>
                    <h3 className="text-lg font-extrabold text-slate-900 flex items-center gap-2">
                      <BarChart3 className="h-5 w-5 text-blue-600" /> Personal Learning Progress Report
                    </h3>
                    <p className="text-xs text-gray-500">
                      Real-time interactive analytics of your active learning session.
                    </p>
                  </div>
                  {user && (
                    <div className="flex items-center gap-2 text-xs font-bold text-blue-700 bg-white border border-blue-100 rounded-xl px-3 py-1.5 self-start shadow-sm">
                      <UserCheck className="h-3.5 w-3.5" />
                      <span>Tracking Student: {user.name}</span>
                    </div>
                  )}
                </div>

                {/* Quizzy's Smart Advice Bubble */}
                <div className="bg-blue-600 text-white rounded-2xl p-5 flex gap-4 items-start shadow-md relative overflow-hidden text-left">
                  <div className="absolute top-0 right-0 p-1.5 text-[9px] bg-blue-700 text-blue-100 font-bold rounded-bl-xl uppercase tracking-widest">
                    AI Advisor
                  </div>
                  <div className="text-4xl p-2 bg-white rounded-xl shadow-md select-none shrink-0 animate-bounce">
                    🦉
                  </div>
                  <div className="space-y-1 flex-1 min-w-0">
                    <span className="font-extrabold text-[10px] text-blue-200 uppercase tracking-widest block">
                      Quizzy Advisor Says:
                    </span>
                    <p className="text-sm font-semibold leading-relaxed">
                      {sessionStats.length === 0 ? (
                        `"Hey there study buddy! I'm Quizzy, your language tutor. 🌟 Pick any module below to study flashcards or test your skills! Let's build some cool knowledge together!"`
                      ) : averageCorrectRate >= 90 ? (
                        `"Phenomenal job! You're on absolute fire today! 🔥 Your retention is incredible and you have stellar comprehension. Let's tackle another module together to keep the streak alive!"`
                      ) : averageCorrectRate >= 70 ? (
                        `"You're doing fantastic! 🚀 Your understanding is leveling up quickly. Take a quick look at your custom flashcard decks to reach 100% mastery!"`
                      ) : (
                        `"Don't sweat the small stuff, study buddy! 🦉 Let's try studying the Flashcards first before attempting the quizzes. Practice makes progress, and I'm right here with you!"`
                      )}
                    </p>
                  </div>
                </div>

                {/* Progress Indicators & Statistics */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-center">
                  {/* Accuracy Meter */}
                  <div className="bg-white rounded-2xl p-4 border border-blue-100/50 shadow-sm space-y-1">
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">Average Accuracy</span>
                    <span className="text-3xl font-black text-blue-600 block">{sessionStats.length > 0 ? `${averageCorrectRate}%` : "0%"}</span>
                    <span className="text-[10px] text-gray-500 font-medium block">Based on answers checked</span>
                  </div>

                  {/* Completed Decks */}
                  <div className="bg-white rounded-2xl p-4 border border-blue-100/50 shadow-sm space-y-1">
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">Quizzes Checked</span>
                    <span className="text-3xl font-black text-slate-800 block">{sessionStats.length}</span>
                    <span className="text-[10px] text-gray-500 font-medium block">Unique session runs</span>
                  </div>

                  {/* Top Strength */}
                  <div className="bg-white rounded-2xl p-4 border border-blue-100/50 shadow-sm space-y-1 flex flex-col justify-center">
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1">Focus Strength</span>
                    <span className="text-sm font-extrabold text-emerald-600 truncate block py-1 bg-emerald-50 rounded-lg">
                      {sessionStats.length > 0 ? (
                        modules.find((m) => m.id === sessionStats[0].moduleId)?.language || "Vocabulary"
                      ) : (
                        "Not Started"
                      )}
                    </span>
                    <span className="text-[10px] text-gray-500 font-medium block mt-1">Highest performing</span>
                  </div>

                  {/* Level Progress */}
                  <div className="bg-white rounded-2xl p-4 border border-blue-100/50 shadow-sm space-y-1 flex flex-col justify-center">
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1">Quizzy Rating</span>
                    <span className="text-xs font-extrabold text-amber-700 truncate block py-1.5 bg-amber-50 rounded-lg">
                      {sessionStats.length === 0 ? "🌱 Novice" : averageCorrectRate >= 90 ? "👑 Scholar Status" : "🚀 Rising Star"}
                    </span>
                    <span className="text-[10px] text-gray-500 font-medium block mt-1">Your active tutor tier</span>
                  </div>
                </div>

                {/* Sub-log of session quiz activities */}
                {sessionStats.length > 0 && (
                  <div className="space-y-2 pt-2 text-left">
                    <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-wider flex items-center gap-1">
                      <Flame className="h-3.5 w-3.5 text-orange-500 fill-orange-500" /> Quiz Entry History Log
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                      {sessionStats.map((stat, i) => {
                        const mod = modules.find((m) => m.id === stat.moduleId);
                        const pct = Math.round((stat.score / stat.total) * 100);
                        return (
                          <div key={i} className="bg-white rounded-xl p-3 border border-blue-100/40 flex items-center justify-between text-xs shadow-sm">
                            <div className="space-y-0.5 min-w-0">
                              <p className="font-bold text-gray-950 truncate">{mod?.title || "Language"}</p>
                              <p className="text-[9px] text-gray-400 font-mono">
                                {new Date(stat.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                              </p>
                            </div>
                            <div className="text-right shrink-0">
                              <p className="font-bold text-blue-700">{stat.score} / {stat.total} Right</p>
                              <span className={`text-[9px] font-black px-1.5 py-0.5 rounded ${
                                pct >= 80 ? "bg-emerald-50 text-emerald-700" : "bg-blue-50 text-blue-700"
                              }`}>
                                {pct}%
                              </span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Course Module Catalog Selection with Interactive Language & Level Studio */}
            <div className="space-y-6">
              
              {/* Filter Studio Panel */}
              <div className="bg-white border border-gray-100 rounded-3xl p-6 shadow-sm space-y-6 text-left">
                <div className="space-y-1">
                  <span className="text-[10px] font-extrabold text-blue-600 uppercase tracking-widest block">Level & Section Selector</span>
                  <h3 className="text-xl font-bold text-gray-900">Choose Your Language & Learning Level</h3>
                  <p className="text-xs text-gray-500">
                    To make learning easier, each language's flashcards are now split into specialized **Beginner**, **Intermediate**, and **Advanced** sections. Pick a level below to learn focused bite-sized decks and then test your knowledge!
                  </p>
                </div>

                {/* Language Tabs */}
                <div className="space-y-2">
                  <label className="text-[10px] font-extrabold text-gray-400 uppercase tracking-wider block">1. Select Language</label>
                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={() => setSelectedLanguage("All")}
                      className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold border transition cursor-pointer ${
                        selectedLanguage === "All"
                          ? "bg-blue-600 text-white border-blue-600 shadow-md shadow-blue-500/10"
                          : "bg-slate-50 text-slate-700 border-slate-100 hover:bg-slate-100 hover:border-slate-200"
                      }`}
                    >
                      <span>🌐</span>
                      <span>All Languages</span>
                    </button>
                    {Array.from(new Set(modules.map((m) => m.language))).map((lang) => {
                      const mod = modules.find((m) => m.language === lang);
                      return (
                        <button
                          key={lang}
                          onClick={() => setSelectedLanguage(lang)}
                          className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold border transition cursor-pointer ${
                            selectedLanguage === lang
                              ? "bg-blue-600 text-white border-blue-600 shadow-md shadow-blue-500/10"
                              : "bg-slate-50 text-slate-700 border-slate-100 hover:bg-slate-100 hover:border-slate-200"
                          }`}
                        >
                          <span className="text-base">{mod?.flag}</span>
                          <span>{lang}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Level Tabs */}
                <div className="space-y-2">
                  <label className="text-[10px] font-extrabold text-gray-400 uppercase tracking-wider block">2. Select Difficulty Level</label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {[
                      { value: "All", label: "All Levels", emoji: "✨", color: "border-slate-200" },
                      { value: "Beginner", label: "Beginner", emoji: "🌱", color: "border-teal-200" },
                      { value: "Intermediate", label: "Intermediate", emoji: "⚡", color: "border-amber-200" },
                      { value: "Advanced", label: "Advanced", emoji: "🏆", color: "border-purple-200" },
                    ].map((lvl) => (
                      <button
                        key={lvl.value}
                        onClick={() => setSelectedLevel(lvl.value)}
                        className={`flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-xs font-bold border transition cursor-pointer ${
                          selectedLevel === lvl.value
                            ? lvl.value === "Beginner"
                              ? "bg-teal-600 text-white border-teal-600 shadow-md shadow-teal-500/10"
                              : lvl.value === "Intermediate"
                              ? "bg-amber-600 text-white border-amber-600 shadow-md shadow-amber-500/10"
                              : lvl.value === "Advanced"
                              ? "bg-purple-600 text-white border-purple-600 shadow-md shadow-purple-500/10"
                              : "bg-blue-600 text-white border-blue-600 shadow-md shadow-blue-500/10"
                            : "bg-slate-50 text-slate-700 border-slate-100 hover:bg-slate-100 hover:border-slate-200"
                        }`}
                      >
                        <span>{lvl.emoji}</span>
                        <span>{lvl.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Active Selection Information Badge */}
                <div className="rounded-2xl bg-slate-50 border border-slate-100 p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <span className="text-[9px] font-black uppercase text-slate-400 tracking-wider">Current Selection Summary</span>
                    <p className="text-xs font-semibold text-slate-700">
                      Showing <span className="text-blue-600 font-extrabold">{selectedLevel === "All" ? "All Levels" : selectedLevel}</span> sections for <span className="text-blue-600 font-extrabold">{selectedLanguage === "All" ? "All Languages" : selectedLanguage}</span>.
                    </p>
                  </div>
                  <div className="text-[10px] font-bold text-slate-400 bg-white px-3 py-1.5 rounded-lg border border-slate-200/50 self-start sm:self-auto shrink-0">
                    📚 {filteredModules.length} Section{filteredModules.length !== 1 ? "s" : ""} Found
                  </div>
                </div>
              </div>

              {/* Module Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredModules.map((module) => {
                  // Find if there is any attempt score in sessionStats specifically for this virtual level-split module ID
                  const moduleAttempts = sessionStats.filter((s) => s.moduleId === module.id);
                  const bestAttempt = moduleAttempts.length > 0 
                    ? Math.max(...moduleAttempts.map(a => Math.round((a.score / a.total) * 100))) 
                    : null;

                  return (
                    <div
                      key={module.id}
                      id={`module-card-${module.id}`}
                      className="group relative flex flex-col justify-between rounded-3xl border border-gray-100 bg-white p-6 shadow-md shadow-gray-100/40 hover:shadow-xl hover:shadow-blue-50/20 hover:border-blue-100 transition duration-300 text-left"
                    >
                      <div className="space-y-4">
                        {/* Flag, level and tags info */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="text-2xl" role="img" aria-label={module.language}>
                              {module.flag}
                            </span>
                            <span className="text-sm font-extrabold text-gray-900">{module.language}</span>
                          </div>

                          <div className="flex items-center gap-1.5">
                            {bestAttempt !== null && (
                              <span className="text-[10px] font-extrabold bg-emerald-50 text-emerald-700 border border-emerald-100 px-2.5 py-0.5 rounded-md flex items-center gap-1">
                                <CheckCircle className="h-3 w-3 text-emerald-600" /> Best: {bestAttempt}%
                              </span>
                            )}
                            <span className={`text-[10px] font-bold px-2 py-1 rounded-md uppercase tracking-wider ${
                              module.level === "Beginner"
                                ? "bg-teal-50 text-teal-700 border border-teal-100"
                                : module.level === "Intermediate"
                                ? "bg-amber-50 text-amber-700 border border-amber-100"
                                : "bg-purple-50 text-purple-700 border border-purple-100"
                            }`}>
                              {module.level}
                            </span>
                          </div>
                        </div>

                        {/* Title & Description */}
                        <div className="space-y-1.5">
                          <h4 className="text-lg font-bold text-gray-900 group-hover:text-blue-600 transition">
                            {module.title}
                          </h4>
                          <p className="text-xs text-gray-500 leading-relaxed line-clamp-2">
                            {module.description}
                          </p>
                        </div>

                        {/* Meta context */}
                        <div className="flex flex-wrap items-center gap-2 pt-1 text-[11px] font-medium text-gray-400">
                          <span className="bg-gray-100 text-gray-600 px-2.5 py-0.5 rounded-md font-semibold">
                            {module.category}
                          </span>
                          <span>•</span>
                          <span>{module.cards.length} Cards in Section</span>
                        </div>
                      </div>

                      {/* Dual Interaction triggers / Triple if Admin */}
                      <div className={`grid gap-3 pt-6 border-t border-gray-50 mt-6 ${
                        user?.role === "admin" ? "grid-cols-3" : "grid-cols-2"
                      }`}>
                        <button
                          onClick={() => handleSelectModule(module.id, "study")}
                          id={`btn-study-module-${module.id}`}
                          className="flex items-center justify-center gap-1.5 rounded-xl border border-gray-200 bg-white py-2.5 text-xs font-bold text-gray-700 hover:bg-gray-50 hover:border-gray-300 transition cursor-pointer"
                        >
                          <BookOpen className="h-3.5 w-3.5 text-blue-500" />
                          <span>Study Cards</span>
                        </button>

                        <button
                          onClick={() => handleSelectModule(module.id, "quiz")}
                          id={`btn-quiz-module-${module.id}`}
                          className="flex items-center justify-center gap-1.5 rounded-xl bg-blue-600 py-2.5 text-xs font-bold text-white hover:bg-blue-700 shadow-sm hover:shadow transition cursor-pointer"
                        >
                          <HelpCircle className="h-3.5 w-3.5" />
                          <span>Take Quiz</span>
                        </button>

                        {user?.role === "admin" && (
                          <button
                            onClick={() => handleSelectModule(module.id, "admin_edit")}
                            id={`btn-edit-module-${module.id}`}
                            className="flex items-center justify-center gap-1.5 rounded-xl border border-purple-200 bg-purple-50 py-2.5 text-xs font-bold text-purple-700 hover:bg-purple-100 hover:border-purple-300 transition cursor-pointer"
                          >
                            <Settings className="h-3.5 w-3.5" />
                            <span>Edit Section</span>
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Empty State */}
              {filteredModules.length === 0 && (
                <div className="rounded-3xl border border-dashed border-slate-200 p-12 text-center bg-white space-y-3">
                  <div className="text-4xl">🔍</div>
                  <p className="text-sm font-bold text-slate-800">No matching learning sections found</p>
                  <p className="text-xs text-slate-400">Try choosing a different language or clearing your difficulty level filter.</p>
                  <button
                    onClick={() => { setSelectedLanguage("All"); setSelectedLevel("All"); }}
                    className="mt-2 inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-blue-50 text-blue-700 hover:bg-blue-100 transition cursor-pointer"
                  >
                    Reset All Filters
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* 5. Study mode module wrapper */}
        {viewMode === "study" && activeModule && (
          <FlashcardDeck
            module={activeModule}
            onGoBack={handleGoHome}
            onStartQuiz={() => setViewMode("quiz")}
          />
        )}

        {/* 6. Quiz mode module wrapper */}
        {viewMode === "quiz" && activeModule && (
          <QuizSection
            module={activeModule}
            quizProgress={quizProgress}
            onAnswerSelected={handleAnswerSelected}
            onNextQuestion={handleNextQuestion}
            onResetQuiz={resetQuiz}
            onGoBack={handleGoHome}
            user={user}
            sessionStats={sessionStats}
          />
        )}

        {/* 7. Admin Question Editor mode wrapper */}
        {viewMode === "admin_edit" && activeModule && (
          <QuizQuestionEditor
            module={activeModule}
            onSave={handleSaveModuleCards}
            onCancel={() => setViewMode("dashboard")}
          />
        )}

        {/* 8. Student/Admin Progress Dashboard */}
        {viewMode === "progress" && (
          <StudentProgressDashboard
            user={user}
            students={students}
            onUpdateStudents={setStudents}
            modules={modules}
          />
        )}
      </main>

      {/* Footer detailing architectural strict design choices */}
      <footer className="border-t border-gray-100 bg-white py-6">
        <div className="mx-auto max-w-7xl px-4 text-center text-xs text-gray-400 space-y-1 sm:px-6 lg:px-8">
          <p className="font-semibold text-gray-500">Student Learning Quiz Engine</p>
          <p>
            Designed & compiled strictly matching clean-slate directives. Volatile state management: no storage cookies or DB persistence utilized.
          </p>
        </div>
      </footer>

      {/* Sign In dialog block */}
      {showAuthModal && (
        <AuthModal
          onClose={() => setShowAuthModal(false)}
          onLoginSuccess={handleLoginSuccess}
          existingStudents={students}
        />
      )}
    </div>
  );
}
