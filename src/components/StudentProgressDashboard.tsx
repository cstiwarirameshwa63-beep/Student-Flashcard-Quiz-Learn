import React, { useState, useMemo, FormEvent } from "react";
import { 
  BarChart3, 
  TrendingUp, 
  Award, 
  BookOpen, 
  Users, 
  UserCheck, 
  History, 
  ArrowRight, 
  PlusCircle, 
  Trash2, 
  Activity, 
  Clock, 
  CheckCircle2, 
  AlertCircle,
  Sparkles,
  ChevronRight,
  User,
  Search,
  Lock,
  Unlock,
  KeyRound,
  ShieldCheck,
  Eye,
  EyeOff,
  X
} from "lucide-react";
import { StudentProgressData, QuizAttempt, UserProfile, LearningModule } from "../types";

interface StudentProgressDashboardProps {
  user: UserProfile;
  students: StudentProgressData[];
  onUpdateStudents: (updated: StudentProgressData[]) => void;
  modules: LearningModule[];
}

export function StudentProgressDashboard({ 
  user, 
  students, 
  onUpdateStudents,
  modules 
}: StudentProgressDashboardProps) {
  const [selectedStudentEmail, setSelectedStudentEmail] = useState<string>(
    user.role === "admin" ? (students[0]?.email || "") : user.email
  );
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState<"charts" | "logs">("charts");
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const [passwordSuccess, setPasswordSuccess] = useState("");

  // Filter students by search term for admin
  const filteredStudents = useMemo(() => {
    if (user.role !== "admin") return [];
    return students.filter(s => 
      s.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      s.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [students, searchTerm, user.role]);

  // Find currently viewed student
  const viewedStudent = useMemo(() => {
    if (user.role === "student") {
      const found = students.find(s => s.email.toLowerCase() === user.email.toLowerCase());
      return found || {
        name: user.name,
        email: user.email,
        avatarSeed: user.avatarSeed,
        attempts: [] as QuizAttempt[]
      };
    }
    // Admin role
    const effectiveEmail = selectedStudentEmail || (students[0]?.email ?? "");
    const found = students.find(s => s.email.toLowerCase() === effectiveEmail.toLowerCase());
    if (found) return found;

    return {
      name: students.length === 0 ? "No Students Registered" : (students[0]?.name ?? "No Student Selected"),
      email: students.length === 0 ? "Awaiting student activity" : (students[0]?.email ?? ""),
      avatarSeed: "empty",
      attempts: [] as QuizAttempt[]
    };
  }, [students, selectedStudentEmail, user]);

  // Calculate viewed student stats
  const studentStats = useMemo(() => {
    const attempts = viewedStudent.attempts || [];
    const totalTaken = attempts.length;
    
    if (totalTaken === 0) {
      return { totalTaken, avgAccuracy: 0, highestScore: 0, latestAttempt: null };
    }

    const avgAccuracy = Math.round(
      (attempts.reduce((sum, att) => sum + att.score, 0) / 
       attempts.reduce((sum, att) => sum + att.total, 0)) * 100
    );

    const highestScore = Math.max(...attempts.map(att => Math.round((att.score / att.total) * 100)));
    const sortedAttempts = [...attempts].sort((a, b) => b.timestamp - a.timestamp);
    const latestAttempt = sortedAttempts[0];

    return { totalTaken, avgAccuracy, highestScore, latestAttempt };
  }, [viewedStudent]);

  // Global class stats for admin
  const classStats = useMemo(() => {
    if (user.role !== "admin") return null;
    
    const activeStudents = students.filter(s => s.attempts.length > 0);
    const totalStudents = students.length;
    const totalQuizzes = students.reduce((sum, s) => sum + s.attempts.length, 0);
    
    let avgClassAccuracy = 0;
    let totalScore = 0;
    let totalQuestions = 0;

    students.forEach(s => {
      s.attempts.forEach(att => {
        totalScore += att.score;
        totalQuestions += att.total;
      });
    });

    if (totalQuestions > 0) {
      avgClassAccuracy = Math.round((totalScore / totalQuestions) * 100);
    }

    return {
      totalStudents,
      activeStudentsCount: activeStudents.length,
      totalQuizzes,
      avgClassAccuracy
    };
  }, [students, user.role]);

  // Render responsive SVG Line Chart for student's trend
  const renderTrendLineChart = (attempts: QuizAttempt[]) => {
    if (attempts.length === 0) {
      return (
        <div className="h-48 flex flex-col items-center justify-center bg-slate-50 border border-dashed border-slate-200 rounded-2xl text-slate-400">
          <TrendingUp className="h-8 w-8 mb-2 stroke-1" />
          <p className="text-xs font-semibold">No quiz attempts logged yet</p>
          <p className="text-[10px] text-slate-400">Complete a quiz to plot your trendline</p>
        </div>
      );
    }

    // Sort attempts chronologically for the chart
    const chronAttempts = [...attempts].sort((a, b) => a.timestamp - b.timestamp);
    
    // SVG Dimensions
    const width = 500;
    const height = 180;
    const padding = 30;
    const chartWidth = width - padding * 2;
    const chartHeight = height - padding * 2;

    const points = chronAttempts.map((att, idx) => {
      const accuracyPct = (att.score / att.total) * 100;
      const x = padding + (idx / (Math.max(chronAttempts.length - 1, 1))) * chartWidth;
      const y = padding + chartHeight - (accuracyPct / 100) * chartHeight;
      return { x, y, val: Math.round(accuracyPct), title: att.moduleTitle };
    });

    // Generate line path
    let d = "";
    if (points.length === 1) {
      d = `M ${padding} ${points[0].y} H ${width - padding}`;
    } else {
      d = points.map((p, idx) => `${idx === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(" ");
    }

    // Generate area path for gradient
    const dArea = points.length === 1
      ? `M ${padding} ${points[0].y} H ${width - padding} V ${height - padding} H ${padding} Z`
      : `${d} L ${points[points.length - 1].x} ${height - padding} L ${points[0].x} ${height - padding} Z`;

    return (
      <div className="w-full">
        <div className="flex justify-between items-center mb-3">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">
            <TrendingUp className="h-3.5 w-3.5 text-blue-500" /> Progress Curve (Accuracy %)
          </span>
          <span className="text-[10px] text-slate-400 font-mono">
            {chronAttempts.length} quizzes taken
          </span>
        </div>
        <div className="relative bg-gradient-to-b from-white to-slate-50/50 p-2 border border-slate-100 rounded-2xl shadow-sm">
          <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto overflow-visible">
            <defs>
              <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#2563eb" stopOpacity="0.15" />
                <stop offset="100%" stopColor="#2563eb" stopOpacity="0.00" />
              </linearGradient>
            </defs>

            {/* Horizontal Gridlines */}
            {[0, 25, 50, 75, 100].map((grid, idx) => {
              const y = padding + chartHeight - (grid / 100) * chartHeight;
              return (
                <g key={idx}>
                  <line 
                    x1={padding} 
                    y1={y} 
                    x2={width - padding} 
                    y2={y} 
                    stroke="#f1f5f9" 
                    strokeWidth="1" 
                    strokeDasharray="4 4"
                  />
                  <text 
                    x={padding - 8} 
                    y={y + 3} 
                    fontSize="9" 
                    fontFamily="monospace" 
                    fill="#94a3b8" 
                    textAnchor="end"
                  >
                    {grid}%
                  </text>
                </g>
              );
            })}

            {/* Area under the curve */}
            <path d={dArea} fill="url(#chartGrad)" />

            {/* The line itself */}
            <path 
              d={d} 
              fill="none" 
              stroke="#2563eb" 
              strokeWidth="2.5" 
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {/* Data Points */}
            {points.map((p, idx) => (
              <g key={idx} className="group/node">
                <circle 
                  cx={p.x} 
                  cy={p.y} 
                  r="5" 
                  fill="#ffffff" 
                  stroke="#2563eb" 
                  strokeWidth="2.5"
                  className="transition duration-150 hover:r-6 cursor-pointer"
                />
                <circle 
                  cx={p.x} 
                  cy={p.y} 
                  r="10" 
                  fill="#2563eb" 
                  fillOpacity="0"
                  className="cursor-pointer hover:fill-opacity-10"
                />
                <text 
                  x={p.x} 
                  y={p.y - 10} 
                  fontSize="9" 
                  fontWeight="bold" 
                  fontFamily="sans-serif" 
                  fill="#1e3a8a" 
                  textAnchor="middle"
                  className="bg-white px-1 pointer-events-none"
                >
                  {p.val}%
                </text>
                <text 
                  x={p.x} 
                  y={height - padding + 15} 
                  fontSize="8" 
                  fontWeight="600" 
                  fill="#64748b" 
                  textAnchor="middle"
                  className="pointer-events-none hidden sm:block"
                >
                  Q{idx + 1}
                </text>
              </g>
            ))}
          </svg>
        </div>
      </div>
    );
  };

  // Render Horizontal Mastery Bar Chart by Language Module
  const renderMasteryBarChart = (attempts: QuizAttempt[]) => {
    if (attempts.length === 0) {
      return (
        <div className="h-48 flex flex-col items-center justify-center bg-slate-50 border border-dashed border-slate-200 rounded-2xl text-slate-400">
          <BarChart3 className="h-8 w-8 mb-2 stroke-1" />
          <p className="text-xs font-semibold">No performance bars to display</p>
          <p className="text-[10px] text-slate-400">Modules you attempt will be scored here</p>
        </div>
      );
    }

    // Group attempts by module and find the average score for each
    const moduleGroup: { [modId: string]: { title: string; lang: string; count: number; maxScorePct: number } } = {};
    attempts.forEach(att => {
      const scorePct = Math.round((att.score / att.total) * 100);
      if (!moduleGroup[att.moduleId]) {
        moduleGroup[att.moduleId] = {
          title: att.moduleTitle,
          lang: att.language,
          count: 1,
          maxScorePct: scorePct
        };
      } else {
        moduleGroup[att.moduleId].count += 1;
        moduleGroup[att.moduleId].maxScorePct = Math.max(moduleGroup[att.moduleId].maxScorePct, scorePct);
      }
    });

    const masteryList = Object.values(moduleGroup);

    return (
      <div className="w-full space-y-3">
        <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
          Module Best Accuracy
        </span>
        <div className="space-y-3 bg-white p-4 border border-slate-100 rounded-2xl shadow-sm">
          {masteryList.map((item, idx) => {
            const barWidth = `${item.maxScorePct}%`;
            return (
              <div key={idx} className="space-y-1">
                <div className="flex justify-between items-center text-xs">
                  <div className="font-bold text-slate-800 truncate max-w-[200px] flex items-center gap-1.5">
                    <span>{item.title}</span>
                    <span className="text-[9px] font-normal text-slate-400 bg-slate-100 px-1.5 py-0.2 rounded-md">
                      {item.lang}
                    </span>
                  </div>
                  <span className="font-mono font-bold text-blue-600">{item.maxScorePct}%</span>
                </div>
                <div className="relative w-full h-3 bg-slate-100 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full transition-all duration-500 ease-out" 
                    style={{ width: barWidth }}
                  />
                </div>
                <div className="flex justify-between items-center text-[9px] text-slate-400">
                  <span>Attempts: {item.count}</span>
                  <span>
                    {item.maxScorePct >= 90 ? "🏆 Mastered" : item.maxScorePct >= 70 ? "👍 Proficient" : "🌱 Learning"}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  // Render Admin Comparative Bar Chart
  const renderClassComparisonChart = () => {
    // Generate comparison data for all students in the class
    const data = students.map(s => {
      const totalTaken = s.attempts.length;
      let avg = 0;
      if (totalTaken > 0) {
        const totalScore = s.attempts.reduce((sum, a) => sum + a.score, 0);
        const totalQuestions = s.attempts.reduce((sum, a) => sum + a.total, 0);
        avg = Math.round((totalScore / totalQuestions) * 100);
      }
      return { name: s.name, avg, quizzes: totalTaken, email: s.email };
    });

    return (
      <div className="bg-white p-5 border border-slate-100 rounded-2xl shadow-sm space-y-4">
        <div className="flex justify-between items-center">
          <div>
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
              <Users className="h-4 w-4 text-sky-600" /> Class Performance Standings
            </h4>
            <p className="text-[10px] text-slate-400">Comparing average quiz accuracy across all students</p>
          </div>
        </div>

        <div className="space-y-3 pt-1">
          {data.length === 0 ? (
            <div className="py-6 text-center text-slate-400 text-xs">
              <Users className="h-6 w-6 mx-auto mb-1.5 text-slate-300 stroke-1" />
              <p>No student quiz scores logged yet</p>
            </div>
          ) : (
            data.map((item, idx) => {
              const isSelected = item.email === selectedStudentEmail;
              return (
                <div 
                  key={idx} 
                  onClick={() => setSelectedStudentEmail(item.email)}
                  className={`p-2.5 rounded-xl border transition cursor-pointer flex items-center justify-between ${
                    isSelected 
                      ? "bg-blue-50/70 border-blue-200 shadow-sm" 
                      : "border-transparent bg-slate-50/50 hover:bg-slate-50"
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className={`h-8 w-8 rounded-full font-bold text-xs flex items-center justify-center shrink-0 ${
                      isSelected ? "bg-blue-600 text-white" : "bg-slate-200 text-slate-700"
                    }`}>
                      {item.name.charAt(0)}
                    </div>
                    <div className="truncate text-left">
                      <p className="text-xs font-extrabold text-slate-900">{item.name}</p>
                      <p className="text-[9px] text-slate-400 font-mono">{item.quizzes} tests completed</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <span className="text-xs font-black text-slate-800 font-mono">{item.avg}%</span>
                      <span className="text-[9px] text-slate-400 block font-semibold">Average</span>
                    </div>
                    <div className="w-24 h-2 bg-slate-100 rounded-full overflow-hidden hidden sm:block">
                      <div 
                        className={`h-full rounded-full transition-all duration-500 ${
                          item.avg >= 85 ? "bg-emerald-500" : item.avg >= 70 ? "bg-blue-500" : "bg-amber-500"
                        }`}
                        style={{ width: `${item.avg}%` }}
                      />
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    );
  };

  const handleClearAttempts = () => {
    const targetEmail = user.role === "admin" ? selectedStudentEmail : user.email;
    const updatedStudents = students.map(s => {
      if (s.email.toLowerCase() === targetEmail.toLowerCase()) {
        return {
          ...s,
          attempts: []
        };
      }
      return s;
    });
    onUpdateStudents(updatedStudents);
  };

  const handleSaveStudentPassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword.trim().length > 0 && newPassword.trim().length < 3) {
      setPasswordError("Password must be at least 3 characters.");
      return;
    }
    if (newPassword.trim() && newPassword !== confirmNewPassword) {
      setPasswordError("Passwords do not match.");
      return;
    }

    const updatedStudents = students.map((s) => {
      if (s.email.toLowerCase() === user.email.toLowerCase()) {
        return {
          ...s,
          password: newPassword.trim() || undefined,
        };
      }
      return s;
    });

    onUpdateStudents(updatedStudents);
    setPasswordSuccess(newPassword.trim() ? "Password successfully updated! Your profile is now private." : "Password removed. Profile is now open.");
    setTimeout(() => {
      setShowPasswordModal(false);
      setPasswordSuccess("");
      setPasswordError("");
      setNewPassword("");
      setConfirmNewPassword("");
    }, 1200);
  };

  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-8 space-y-6 animate-fade-in">
      
      {/* 1. Header Navigation and Title */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-4">
        <div className="space-y-1 text-left">
          <span className="text-[10px] font-extrabold text-blue-600 uppercase tracking-widest block">
            Academic Analytics Hub
          </span>
          <h2 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
            <BarChart3 className="h-6 w-6 text-blue-600" />
            {user.role === "admin" ? "Academic Classroom Progress Panel" : "My Personal Progress Analytics"}
          </h2>
          <p className="text-xs text-slate-500">
            {user.role === "admin" 
              ? "Oversee classroom metrics, analyze module completions, and audit student performance trends."
              : "Analyze your flashcard test history, identify module strengths, and monitor accuracy trajectories."}
          </p>
        </div>

        {/* Dashboard Actions */}
        <div className="flex flex-wrap items-center gap-2 self-start md:self-center">
          <button
            onClick={handleClearAttempts}
            disabled={viewedStudent.attempts.length === 0}
            className="flex items-center gap-1.5 px-3 py-2 text-xs font-bold text-slate-600 bg-white hover:bg-slate-50 border border-slate-200 rounded-xl transition cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Trash2 className="h-4 w-4" />
            <span>Reset Profile Progress</span>
          </button>
        </div>
      </div>

      {/* 2. Admin Global Class Overview Grid (Only for Admin) */}
      {user.role === "admin" && classStats && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white rounded-2xl p-4 border border-slate-100 shadow-sm flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
              <Users className="h-5 w-5" />
            </div>
            <div className="text-left">
              <p className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">Class Roster</p>
              <p className="text-lg font-black text-slate-800">{classStats.totalStudents} Registered</p>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-4 border border-slate-100 shadow-sm flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
              <Activity className="h-5 w-5" />
            </div>
            <div className="text-left">
              <p className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">Active Students</p>
              <p className="text-lg font-black text-slate-800">{classStats.activeStudentsCount} Active</p>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-4 border border-slate-100 shadow-sm flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
              <CheckCircle2 className="h-5 w-5" />
            </div>
            <div className="text-left">
              <p className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">Completed Quizzes</p>
              <p className="text-lg font-black text-slate-800">{classStats.totalQuizzes} Submissions</p>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-4 border border-slate-100 shadow-sm flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
              <Award className="h-5 w-5" />
            </div>
            <div className="text-left">
              <p className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">Average Accuracy</p>
              <p className="text-lg font-black text-slate-800">{classStats.avgClassAccuracy}% Class Score</p>
            </div>
          </div>
        </div>
      )}

      {/* 3. Main Split Panel Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* LEFT COLUMN: Admin Class Roster Finder (Only for Admin) */}
        {user.role === "admin" && (
          <div className="lg:col-span-4 space-y-4 text-left">
            <div className="bg-white p-4 border border-slate-100 rounded-3xl shadow-sm space-y-4">
              <span className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                <Users className="h-4 w-4 text-blue-600" /> Student Directory
              </span>

              {/* Search Bar */}
              <div className="relative">
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Filter students..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-9 pr-4 py-1.5 text-xs text-slate-900 border border-slate-200 rounded-xl outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-100 transition"
                />
              </div>

              {/* Roster Items */}
              <div className="space-y-1.5 max-h-[350px] overflow-y-auto pr-1">
                {filteredStudents.length === 0 ? (
                  <div className="py-8 text-center text-slate-400 text-xs">
                    {students.length === 0 ? "No students registered yet" : "No matching students found"}
                  </div>
                ) : (
                  filteredStudents.map((stud) => {
                    const isSelected = stud.email.toLowerCase() === selectedStudentEmail.toLowerCase();
                    const studAvg = stud.attempts.length > 0
                      ? Math.round(
                          (stud.attempts.reduce((sum, a) => sum + a.score, 0) / 
                           stud.attempts.reduce((sum, a) => sum + a.total, 0)) * 100
                        )
                      : 0;
                    return (
                      <button
                        key={stud.email}
                        onClick={() => setSelectedStudentEmail(stud.email)}
                        className={`w-full text-left p-3 rounded-2xl border transition flex items-center justify-between cursor-pointer ${
                          isSelected 
                            ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white border-blue-500 shadow-md shadow-blue-100" 
                            : "bg-slate-50/50 border-transparent hover:bg-slate-50 text-slate-800"
                        }`}
                      >
                        <div className="min-w-0 flex items-center gap-2">
                          <div className={`h-7 w-7 rounded-full font-bold text-[10px] flex items-center justify-center shrink-0 ${
                            isSelected ? "bg-white text-blue-600" : "bg-blue-100 text-blue-700"
                          }`}>
                            {stud.name.charAt(0)}
                          </div>
                          <div className="truncate">
                            <div className="flex items-center gap-1.5">
                              <p className="text-xs font-bold truncate leading-snug">{stud.name}</p>
                              {stud.password && (
                                <span title="Protected by student password">
                                  <Lock className={`h-3 w-3 ${isSelected ? "text-blue-100" : "text-emerald-500"}`} />
                                </span>
                              )}
                            </div>
                            <p className={`text-[9px] truncate font-mono ${isSelected ? "text-blue-100" : "text-slate-400"}`}>
                              {stud.email}
                            </p>
                          </div>
                        </div>
                        <div className="text-right shrink-0">
                          <span className={`text-[9px] font-black px-1.5 py-0.5 rounded ${
                            isSelected ? "bg-blue-700/50 text-blue-50" : "bg-white text-slate-700 border border-slate-100"
                          }`}>
                            {stud.attempts.length > 0 ? `${studAvg}%` : "🌱 0%"}
                          </span>
                        </div>
                      </button>
                    );
                  })
                )}
              </div>
            </div>

            {/* General Class standings */}
            {renderClassComparisonChart()}
          </div>
        )}

        {/* RIGHT COLUMN: Performance charts for selected student */}
        <div className={`space-y-6 ${user.role === "admin" ? "lg:col-span-8" : "lg:col-span-12"}`}>
          
          {/* Viewed Student Summary Card */}
          <div className="bg-gradient-to-r from-blue-950 to-slate-950 text-white p-5 rounded-3xl shadow-md border border-slate-900/50 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-left relative overflow-hidden">
            <div className="absolute top-0 right-0 p-3 opacity-5 pointer-events-none">
              <Award className="h-40 w-40 text-blue-100" />
            </div>

            <div className="flex items-center gap-4 min-w-0">
              <div className="h-12 w-12 rounded-2xl bg-gradient-to-tr from-blue-500 to-indigo-500 text-white flex items-center justify-center font-extrabold text-lg shadow-md shrink-0">
                {viewedStudent.name.charAt(0)}
              </div>
              <div className="truncate">
                <span className="text-[9px] font-black text-blue-400 uppercase tracking-widest block">
                  {user.role === "admin" ? "Active Directory Selection" : "My Learning Profile"}
                </span>
                <div className="flex items-center gap-2">
                  <h3 className="text-lg font-extrabold truncate">{viewedStudent.name}</h3>
                  {viewedStudent.password && (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 text-[10px] font-bold">
                      <Lock className="h-3 w-3" />
                      <span>Password Protected</span>
                    </span>
                  )}
                </div>
                <p className="text-xs text-slate-400 font-mono truncate">{viewedStudent.email}</p>
                {user.role === "student" && (
                  <button
                    onClick={() => {
                      setNewPassword("");
                      setConfirmNewPassword("");
                      setPasswordError("");
                      setPasswordSuccess("");
                      setShowPasswordModal(true);
                    }}
                    className="mt-1 text-[11px] font-bold text-blue-300 hover:text-white flex items-center gap-1 transition cursor-pointer underline underline-offset-2"
                  >
                    <KeyRound className="h-3 w-3" />
                    <span>{viewedStudent.password ? "Change Privacy Password" : "Set Password for Privacy"}</span>
                  </button>
                )}
              </div>
            </div>

            {/* Mini metrics pill */}
            <div className="flex flex-wrap items-center gap-2 sm:self-center">
              <div className="bg-white/10 backdrop-blur-sm border border-white/5 rounded-2xl px-3 py-2 text-center">
                <span className="text-[9px] font-bold text-slate-400 block uppercase">Accuracy</span>
                <span className="text-base font-black text-blue-300 font-mono">{studentStats.avgAccuracy}%</span>
              </div>
              <div className="bg-white/10 backdrop-blur-sm border border-white/5 rounded-2xl px-3 py-2 text-center">
                <span className="text-[9px] font-bold text-slate-400 block uppercase">Completions</span>
                <span className="text-base font-black text-emerald-300 font-mono">{studentStats.totalTaken}</span>
              </div>
              <div className="bg-white/10 backdrop-blur-sm border border-white/5 rounded-2xl px-3 py-2 text-center">
                <span className="text-[9px] font-bold text-slate-400 block uppercase">High Score</span>
                <span className="text-base font-black text-amber-300 font-mono">{studentStats.highestScore}%</span>
              </div>
            </div>
          </div>

          {/* Tab Switcher for Details */}
          <div className="flex border-b border-slate-200">
            <button
              onClick={() => setActiveTab("charts")}
              className={`pb-2.5 px-4 text-xs font-bold transition flex items-center gap-1.5 cursor-pointer border-b-2 ${
                activeTab === "charts"
                  ? "border-blue-600 text-blue-600"
                  : "border-transparent text-slate-400 hover:text-slate-700"
              }`}
            >
              <BarChart3 className="h-4 w-4" />
              <span>Interactive Analytics Charts</span>
            </button>
            <button
              onClick={() => setActiveTab("logs")}
              className={`pb-2.5 px-4 text-xs font-bold transition flex items-center gap-1.5 cursor-pointer border-b-2 ${
                activeTab === "logs"
                  ? "border-blue-600 text-blue-600"
                  : "border-transparent text-slate-400 hover:text-slate-700"
              }`}
            >
              <History className="h-4 w-4" />
              <span>Quiz Attempt Logs ({viewedStudent.attempts.length})</span>
            </button>
          </div>

          {/* Tab Content 1: Visual Charts */}
          {activeTab === "charts" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left animate-fade-in">
              {/* Curve Chart */}
              <div className="bg-white p-5 border border-slate-100 rounded-3xl shadow-sm space-y-4">
                {renderTrendLineChart(viewedStudent.attempts)}
              </div>

              {/* Mastery bar chart */}
              <div className="bg-white p-5 border border-slate-100 rounded-3xl shadow-sm space-y-4">
                {renderMasteryBarChart(viewedStudent.attempts)}
              </div>
            </div>
          )}

          {/* Tab Content 2: Raw Submission Logs */}
          {activeTab === "logs" && (
            <div className="bg-white border border-slate-100 rounded-3xl shadow-sm overflow-hidden animate-fade-in text-left">
              <div className="p-4 border-b border-slate-100 bg-slate-50/50">
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Clock className="h-4 w-4 text-indigo-500" /> Historic Performance Record Log
                </h4>
              </div>

              {viewedStudent.attempts.length === 0 ? (
                <div className="p-12 text-center text-slate-400 space-y-2">
                  <History className="h-10 w-10 mx-auto stroke-1 text-slate-300 animate-pulse" />
                  <p className="text-xs font-semibold">No historic submissions found</p>
                  <p className="text-[10px] text-slate-400 max-w-sm mx-auto">
                    Take a language module quiz to automatically log high-precision scores and telemetry insights.
                  </p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-xs text-left">
                    <thead className="text-[10px] text-slate-400 uppercase tracking-wider bg-slate-50 border-b border-slate-100 font-bold">
                      <tr>
                        <th className="px-6 py-3">Language Module</th>
                        <th className="px-6 py-3">Language</th>
                        <th className="px-6 py-3">Correct Answers</th>
                        <th className="px-6 py-3">Accuracy</th>
                        <th className="px-6 py-3">Submission Timestamp</th>
                        <th className="px-6 py-3">Feedback Descriptor</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                      {[...viewedStudent.attempts].sort((a,b) => b.timestamp - a.timestamp).map((att, idx) => {
                        const pct = Math.round((att.score / att.total) * 100);
                        return (
                          <tr key={idx} className="hover:bg-slate-50/50 transition">
                            <td className="px-6 py-4 font-extrabold text-slate-900">{att.moduleTitle}</td>
                            <td className="px-6 py-4">
                              <span className="bg-blue-50 text-blue-700 px-2 py-0.5 rounded-md font-bold text-[10px]">
                                {att.language}
                              </span>
                            </td>
                            <td className="px-6 py-4 font-mono font-bold">{att.score} / {att.total}</td>
                            <td className="px-6 py-4">
                              <span className={`px-2 py-0.5 rounded font-black text-[10px] ${
                                pct >= 90 
                                  ? "bg-emerald-50 text-emerald-700 border border-emerald-100" 
                                  : pct >= 70 
                                    ? "bg-blue-50 text-blue-700 border border-blue-100" 
                                    : "bg-amber-50 text-amber-700 border border-amber-100"
                              }`}>
                                {pct}%
                              </span>
                            </td>
                            <td className="px-6 py-4 text-slate-400 font-mono text-[10px]">
                              {new Date(att.timestamp).toLocaleString()}
                            </td>
                            <td className="px-6 py-4 font-semibold text-[10px]">
                              {pct >= 90 ? "👑 Scholar Performance" : pct >= 70 ? "🚀 Strong Standing" : "🌱 Target Practice"}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

        </div>

      </div>

      {/* Student Password Settings Modal */}
      {showPasswordModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in text-left">
          <div className="relative w-full max-w-md overflow-hidden rounded-2xl bg-white shadow-2xl border border-slate-100 p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <div className="h-9 w-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                  <KeyRound className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-sm font-black text-slate-900">Student Privacy Password</h3>
                  <p className="text-[11px] text-slate-500">Keep friends from logging in with your email</p>
                </div>
              </div>
              <button
                onClick={() => setShowPasswordModal(false)}
                className="text-slate-400 hover:text-slate-700 p-1 rounded-lg cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {passwordError && (
              <div className="flex items-center gap-2 rounded-xl bg-red-50 p-3 text-xs text-red-700 border border-red-100">
                <AlertCircle className="h-4 w-4 shrink-0" />
                <span>{passwordError}</span>
              </div>
            )}

            {passwordSuccess && (
              <div className="flex items-center gap-2 rounded-xl bg-emerald-50 p-3 text-xs text-emerald-800 border border-emerald-200">
                <ShieldCheck className="h-4 w-4 shrink-0 text-emerald-600" />
                <span>{passwordSuccess}</span>
              </div>
            )}

            <form onSubmit={handleSaveStudentPassword} className="space-y-4">
              <div className="space-y-1.5">
                <div className="flex justify-between items-center">
                  <label className="text-xs font-semibold text-slate-700">
                    {viewedStudent.password ? "New Password" : "Create Password"}
                  </label>
                  <span className="text-[10px] text-slate-400">Min 3 characters</span>
                </div>
                <div className="relative">
                  <input
                    type={showNewPassword ? "text" : "password"}
                    placeholder="Enter private password..."
                    value={newPassword}
                    onChange={(e) => {
                      setNewPassword(e.target.value);
                      setPasswordError("");
                    }}
                    className="w-full rounded-xl border border-slate-200 px-3.5 py-2 pr-10 text-sm text-slate-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  />
                  <button
                    type="button"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                    className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600 cursor-pointer"
                  >
                    {showNewPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              {newPassword.trim().length > 0 && (
                <div className="space-y-1.5 animate-fade-in">
                  <label className="text-xs font-semibold text-slate-700">Confirm Password</label>
                  <input
                    type={showNewPassword ? "text" : "password"}
                    placeholder="Confirm new password"
                    value={confirmNewPassword}
                    onChange={(e) => {
                      setConfirmNewPassword(e.target.value);
                      setPasswordError("");
                    }}
                    className="w-full rounded-xl border border-slate-200 px-3.5 py-2 text-sm text-slate-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                    required
                  />
                </div>
              )}

              <div className="rounded-xl bg-slate-50 p-3 border border-slate-100 text-[11px] text-slate-600 space-y-1">
                <p className="font-semibold text-slate-800 flex items-center gap-1">
                  <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" />
                  <span>Privacy Protection</span>
                </p>
                <p>
                  Once set, anyone trying to log in using your email address will be required to provide your private password.
                </p>
              </div>

              <div className="flex items-center gap-2 pt-2">
                <button
                  type="submit"
                  className="flex-1 rounded-xl bg-blue-600 px-4 py-2.5 text-xs font-bold text-white shadow-md shadow-blue-100 hover:bg-blue-700 transition cursor-pointer"
                >
                  Save Password
                </button>
                {viewedStudent.password && (
                  <button
                    type="button"
                    onClick={() => {
                      const updatedStudents = students.map((s) => {
                        if (s.email.toLowerCase() === user.email.toLowerCase()) {
                          const { password, ...rest } = s;
                          return rest;
                        }
                        return s;
                      });
                      onUpdateStudents(updatedStudents);
                      setPasswordSuccess("Password removed. Your account can now be accessed with just your email.");
                      setTimeout(() => {
                        setShowPasswordModal(false);
                        setPasswordSuccess("");
                      }, 1200);
                    }}
                    className="rounded-xl border border-red-200 bg-red-50 hover:bg-red-100 px-3 py-2.5 text-xs font-bold text-red-700 transition cursor-pointer"
                  >
                    Remove
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => setShowPasswordModal(false)}
                  className="rounded-xl border border-slate-200 px-3 py-2.5 text-xs font-bold text-slate-600 hover:bg-slate-50 transition cursor-pointer"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
