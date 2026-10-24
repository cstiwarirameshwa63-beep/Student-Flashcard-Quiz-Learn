import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Award,
  ArrowRight,
  RotateCcw,
  BookOpen,
  ArrowLeft,
  Sparkles,
  CheckCircle,
  XCircle,
  HelpCircle,
  Flame,
  Volume2
} from "lucide-react";
import { LearningModule, Flashcard, QuizProgress, UserProfile } from "../types";

interface QuizSectionProps {
  module: LearningModule;
  quizProgress: QuizProgress;
  onAnswerSelected: (cardId: string, selectedIndex: number, isCorrect: boolean) => void;
  onNextQuestion: () => void;
  onResetQuiz: () => void;
  onGoBack: () => void;
  user?: UserProfile | null;
  sessionStats?: any[];
}

export function QuizSection({
  module,
  quizProgress,
  onAnswerSelected,
  onNextQuestion,
  onResetQuiz,
  onGoBack,
  user,
  sessionStats,
}: QuizSectionProps) {
  const [selectedOptionIndex, setSelectedOptionIndex] = useState<number | null>(null);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [showConfidenceBooster, setShowConfidenceBooster] = useState(true);

  const { currentCardIndex, score, answers, isCompleted } = quizProgress;
  const currentCard: Flashcard = module.cards[currentCardIndex];

  const studentName = user?.name || user?.email?.split("@")[0] || "Student";
  const topicName = module.title;
  const currentHour = new Date().getHours();
  const isLateNight = currentHour >= 20 || currentHour < 5;

  const getMasteryLevel = () => {
    const runs = sessionStats?.length || 0;
    const rate = sessionStats && sessionStats.length > 0
      ? Math.round(sessionStats.reduce((sum: number, s: any) => sum + s.score, 0) / sessionStats.reduce((sum: number, s: any) => sum + s.total, 0) * 100)
      : 0;

    if (runs >= 3 && rate >= 80) {
      return {
        id: "Expert",
        title: "The Master Sage",
        vibe: "Respectful, challenging you to teach others & refine deep concepts.",
        avatar: "🦉👑",
        bg: "bg-gradient-to-br from-amber-500/10 via-purple-600/5 to-transparent border-amber-200/50 text-amber-950"
      };
    } else if (runs >= 1 || rate >= 50) {
      return {
        id: "Intermediate",
        title: "The Strategy Coach",
        vibe: "Practical, focused on speed shortcuts & conceptual backbones.",
        avatar: "🦉⚡",
        bg: "bg-gradient-to-br from-blue-500/10 via-sky-600/5 to-transparent border-blue-200/50 text-blue-950"
      };
    } else {
      return {
        id: "Novice",
        title: "The Curious Sidekick",
        vibe: "Supportive, bright, asking questions and laying strong roots.",
        avatar: "🦉🌱",
        bg: "bg-gradient-to-br from-emerald-500/10 via-teal-600/5 to-transparent border-emerald-200/50 text-emerald-950"
      };
    }
  };

  const mastery = getMasteryLevel();

  const getProTip = () => {
    const lang = module.language.toLowerCase();
    if (lang.includes("hindi")) {
      return "Think of Hindi postpositions like English prepositions, but they sit behind the noun like loyal bodyguards! 💂";
    } else if (lang.includes("sanskrit")) {
      return "Sanskrit cases are like building blocks—the word endings pack an entire prepositions box inside them! 🧱";
    } else if (lang.includes("marathi")) {
      return "Marathi verb endings change to match gender, just like custom dress fittings for speaker alignment! 👗";
    } else {
      return "Focus on root words and sentence context. Imagining the phrase in a real conversation makes it stick naturally! 💡";
    }
  };

  // Sync state if navigating & reset booster if first question
  useEffect(() => {
    if (currentCardIndex === 0 && Object.keys(answers).length === 0) {
      setShowConfidenceBooster(true);
    }
    if (currentCard && answers[currentCard.id]) {
      setSelectedOptionIndex(answers[currentCard.id].selectedIndex);
      setHasSubmitted(true);
    } else {
      setSelectedOptionIndex(null);
      setHasSubmitted(false);
    }
  }, [currentCardIndex, currentCard, answers]);

  const handleSelectOption = (index: number) => {
    if (hasSubmitted) return;
    setSelectedOptionIndex(index);
  };

  const handleSubmitAnswer = () => {
    if (selectedOptionIndex === null || hasSubmitted) return;

    const isCorrect = selectedOptionIndex === currentCard.correctAnswerIndex;
    setHasSubmitted(true);
    onAnswerSelected(currentCard.id, selectedOptionIndex, isCorrect);
  };

  const handleSpeak = (text: string, langCode: string) => {
    if (!("speechSynthesis" in window)) {
      setIsPlayingAudio(true);
      setTimeout(() => setIsPlayingAudio(false), 1500);
      return;
    }
    try {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      if (langCode.toLowerCase().includes("spanish") || langCode.toLowerCase().includes("es")) {
        utterance.lang = "es-ES";
      } else if (langCode.toLowerCase().includes("japanese") || langCode.toLowerCase().includes("ja")) {
        utterance.lang = "ja-JP";
      } else if (langCode.toLowerCase().includes("french") || langCode.toLowerCase().includes("fr")) {
        utterance.lang = "fr-FR";
      } else if (langCode.toLowerCase().includes("italian") || langCode.toLowerCase().includes("it")) {
        utterance.lang = "it-IT";
      } else if (langCode.toLowerCase().includes("hindi") || langCode.toLowerCase().includes("hi")) {
        utterance.lang = "hi-IN";
      } else if (langCode.toLowerCase().includes("marathi") || langCode.toLowerCase().includes("mr")) {
        utterance.lang = "mr-IN";
      } else if (langCode.toLowerCase().includes("sanskrit") || langCode.toLowerCase().includes("sa")) {
        utterance.lang = "hi-IN";
      }
      utterance.rate = 0.9;
      utterance.onstart = () => setIsPlayingAudio(true);
      utterance.onend = () => setIsPlayingAudio(false);
      utterance.onerror = () => setIsPlayingAudio(false);
      window.speechSynthesis.speak(utterance);
    } catch {
      setIsPlayingAudio(true);
      setTimeout(() => setIsPlayingAudio(false), 1500);
    }
  };

  const getQuizFeedbackMessage = (pct: number) => {
    if (pct === 100) {
      return {
        title: "Flawless Victory! 🌟",
        text: "You’re on fire! That was a tricky one, but you nailed the logic perfectly. Keep this momentum for the final round!",
        color: "text-amber-600",
        type: "high"
      };
    }
    if (pct >= 80) {
      return {
        title: "Incredible Progress! 🎉",
        text: "You’re on fire! That was a tricky one, but you nailed the logic perfectly. Keep this momentum for the final round!",
        color: "text-blue-600",
        type: "high"
      };
    }
    if (pct >= 50) {
      return {
        title: "Good Effort! 👍",
        text: "Significant progress detected! You’ve mastered the core concept. You’re definitely leveling up your understanding of this topic.",
        color: "text-sky-600",
        type: "improvement"
      };
    }
    return {
      title: "Keep Practicing! 💪",
      text: "Significant progress detected! You’ve mastered the core concept. You’re definitely leveling up your understanding of this topic.",
      color: "text-slate-600",
      type: "improvement"
    };
  };

  // State to toggle between Student and Teacher perspectives on the final screen
  const [completionTab, setCompletionTab] = useState<"student" | "teacher">("student");

  // Render Completion Screen
  if (isCompleted) {
    const totalQuestions = module.cards.length;
    const scorePercentage = Math.round((score / totalQuestions) * 100);
    const feedback = getQuizFeedbackMessage(scorePercentage);

    // Identify hardest question (e.g. first incorrect one, or general recommendation)
    const incorrectCards = module.cards.filter(c => answers[c.id] && !answers[c.id].isCorrect);
    const bestTopic = module.category || "Vocabulary";
    const highlightTopic = incorrectCards.length > 0 
      ? incorrectCards[0].foreignTerm 
      : module.cards[0]?.foreignTerm || "Conversational grammar";

    return (
      <div className="mx-auto max-w-2xl px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-3xl border border-gray-100 bg-white p-8 text-center shadow-xl shadow-gray-50 space-y-8 relative overflow-hidden"
        >
          {/* Confetti decoration / Top gradient */}
          <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-emerald-400 via-blue-500 to-sky-600" />
          
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 shadow-md shadow-blue-50">
            <Award className="h-10 w-10" />
          </div>

          <div className="space-y-2">
            <span className="inline-flex items-center gap-1 rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-blue-700 uppercase tracking-wider">
              {module.title} Complete
            </span>
            <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">
              Quiz Completed!
            </h2>
          </div>

          {/* Perspective Selector Tabs */}
          <div className="grid grid-cols-2 max-w-sm mx-auto p-1 bg-gray-50 rounded-xl border border-gray-100">
            <button
              onClick={() => setCompletionTab("student")}
              className={`py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                completionTab === "student"
                  ? "bg-white text-blue-700 shadow-sm border border-gray-200/50"
                  : "text-gray-500 hover:text-gray-900"
              }`}
            >
              🎓 Student Report
            </button>
            <button
              onClick={() => setCompletionTab("teacher")}
              className={`py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                completionTab === "teacher"
                  ? "bg-white text-sky-700 shadow-sm border border-gray-200/50"
                  : "text-gray-500 hover:text-gray-900"
              }`}
            >
              🛠️ Teacher Summary
            </button>
          </div>

          {/* Interactive Score circle */}
          <div className="flex flex-col items-center justify-center py-2">
            <div className="relative flex h-36 w-36 items-center justify-center rounded-full border-8 border-gray-50 bg-gray-50/30">
              {/* Score label */}
              <div className="text-center">
                <span className="text-4xl font-extrabold text-blue-950">{scorePercentage}%</span>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mt-1">
                  {score} / {totalQuestions} Correct
                </p>
              </div>

              {/* Dynamic SVG Ring border representing final grade */}
              <svg className="absolute inset-0 h-full w-full -rotate-90">
                <circle
                  cx="72"
                  cy="72"
                  r="64"
                  className="stroke-emerald-500 fill-none"
                  strokeWidth="8"
                  strokeDasharray={`${2 * Math.PI * 64}`}
                  strokeDashoffset={`${2 * Math.PI * 64 * (1 - scorePercentage / 100)}`}
                  strokeLinecap="round"
                />
              </svg>
            </div>
          </div>

          {/* Interactive Report View */}
          <AnimatePresence mode="wait">
            {completionTab === "student" ? (
              <motion.div
                key="student-report"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="bg-gray-50 rounded-2xl p-6 border border-gray-100 space-y-4 text-left"
              >
                <div className="border-b border-gray-200/60 pb-3">
                  <span className="text-[10px] font-extrabold text-blue-600 uppercase tracking-widest block mb-1">
                    🦉 Academic Mentor Guidance
                  </span>
                  <h3 className={`font-bold text-base ${feedback.color}`}>{feedback.title}</h3>
                  <p className="text-xs text-gray-600 mt-1 leading-relaxed">
                    {feedback.text}
                  </p>
                </div>

                {/* Personalized mentor summary */}
                <div className="bg-blue-50/50 p-4 rounded-xl border border-blue-100/40 space-y-2">
                  <span className="text-[10px] font-extrabold text-blue-700 uppercase tracking-wider block">
                    💬 Mentor's Personalized Summary (Score: {scorePercentage}%)
                  </span>
                  <p className="text-xs text-blue-950 leading-relaxed font-semibold">
                    {scorePercentage >= 85 ? (
                      `Superb job, ${studentName}! Achieving a score of ${scorePercentage}% is a testament to your focus and growing mastery of ${module.title}. You have demonstrated excellent comprehension! 🌟 Your next step should be to run through this module's Flashcard deck once more to lock in instant recall. Let's keep this momentum going! 🚀`
                    ) : (
                      `Fabulous resilience, ${studentName}! Completing the quiz with ${scorePercentage}% is a wonderful milestone. Please frame any incorrect answers as key 'growth milestones' rather than setbacks. 🌱 Your dedication is fantastic! 💪 For your next step, I recommend focusing on the "${highlightTopic}" concept in our Study deck to turn these moments into permanent breakthroughs.`
                    )}
                  </p>
                </div>

                {/* Legacy Reflection Message */}
                <div className="space-y-2 border-t border-gray-200/60 pt-3">
                  <span className="text-[10px] font-extrabold text-blue-600 uppercase tracking-wider block">
                    🦉 Quizzy's Legacy Reflection & Growth Tracker
                  </span>
                  <p className="text-xs text-blue-950 font-bold bg-blue-50/30 p-4 rounded-xl border border-blue-100/20 leading-relaxed italic">
                    "Look at that! You started this session at [{sessionStats && sessionStats.length === 0 ? "🌱 Novice" : "🚀 Rising Star"}] and just closed out at [{scorePercentage >= 90 ? "👑 Scholar Status" : "🚀 Rising Star"}]. If you keep up this pace, you’ll have mastered this entire subject by next week. Your progress is genuinely impressive—I’m proud to be your study partner."
                  </p>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="teacher-report"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="bg-sky-50/50 rounded-2xl p-6 border border-sky-100/60 text-left space-y-4"
              >
                <div className="border-b border-sky-100 pb-3">
                  <span className="text-[10px] font-extrabold text-sky-700 uppercase tracking-widest block mb-1">
                    📊 Pedagogical Assistant & Data Analysis
                  </span>
                  <h3 className="font-bold text-sm text-sky-950 flex items-center gap-1.5">
                    Classroom Success Analytics (Aggregate Success: {scorePercentage}%)
                  </h3>
                  <p className="text-xs text-sky-900/80 mt-1 leading-relaxed">
                    This question-by-question metrics breakdown is generated to optimize lesson efficiency.
                  </p>
                </div>

                <div className="space-y-3 bg-white p-4 rounded-xl border border-sky-100/40 text-xs text-slate-700 space-y-2 leading-relaxed">
                  <p className="font-medium text-slate-800">
                    <strong>Knowledge Gap Audit:</strong>{" "}
                    {incorrectCards.length > 0 ? (
                      <span>
                        Analysis indicates potential knowledge gaps centered on the vocabulary/concepts of:{" "}
                        <strong className="text-red-600">
                          {incorrectCards.map((c) => `'${c.foreignTerm}'`).slice(0, 2).join(" and ")}
                        </strong>
                        .
                      </span>
                    ) : (
                      <span>The cohort demonstrated flawless grasp across all mapped translations with zero significant gaps.</span>
                    )}
                  </p>

                  <p className="font-medium text-slate-800">
                    <strong>Specific Suggestion:</strong>{" "}
                    {scorePercentage < 85 ? (
                      "Re-introduce the lowest-performing vocabulary and translations using a visual analogy during the initial 10 minutes of the next session."
                    ) : (
                      "Facilitate a peer-to-peer breakout session in the next class to allow high-performing students to teach and explain nuanced spelling variations."
                    )}
                  </p>

                  <div className="border-t border-sky-50 pt-2 text-[11px] text-sky-900/90 font-semibold bg-sky-50/30 p-2.5 rounded-lg">
                    🧠 <strong>Resource Efficiency Focus:</strong>{" "}
                    {incorrectCards.length > 0 ? (
                      `To maximize class comprehension with high efficiency, allocate 80% of your remediation time strictly on clarifying "${incorrectCards[0].foreignTerm}" rather than a general review.`
                    ) : (
                      "To maximize class comprehension with high efficiency, skip generic review entirely and challenge the cohort with advanced sentence conjugation next lesson."
                    )}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Distraction-Free Start Over Buttons as mandated */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-2">
            <button
              onClick={onResetQuiz}
              id="btn-quiz-start-over"
              className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-7 py-3.5 text-sm font-bold text-white shadow-md shadow-blue-100 hover:bg-blue-700 transition cursor-pointer"
            >
              <RotateCcw className="h-4 w-4" />
              <span>Start Over Quiz</span>
            </button>

            <button
              onClick={onGoBack}
              id="btn-quiz-return-dash"
              className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-7 py-3.5 text-sm font-semibold text-gray-700 hover:bg-gray-50 transition cursor-pointer"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Choose Another Module</span>
            </button>
          </div>

          {/* Clean Slate warning indicator */}
          <p className="text-[11px] text-gray-400 italic">
            *No records of this quiz or score are saved to your browser database. Refreshing will start a completely blank session.
          </p>
        </motion.div>
      </div>
    );
  }

  // Active Quiz question rendering
  const progressPercent = Math.round(((currentCardIndex + 1) / module.cards.length) * 100);

  // Pre-Game Confidence Booster Screen
  if (currentCardIndex === 0 && showConfidenceBooster && !isCompleted) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-12">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="rounded-3xl border border-blue-100 bg-white p-8 text-center shadow-2xl space-y-8 relative overflow-hidden text-left"
        >
          {/* Decorative gradients */}
          <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-amber-400 via-blue-500 to-sky-600" />
          
          <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-3xl bg-blue-50 text-blue-600 shadow-md relative">
            <span className="text-5xl select-none animate-bounce">{mastery.avatar}</span>
          </div>

          <div className="space-y-2 text-center">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-3 py-1 text-xs font-black text-blue-700 uppercase tracking-widest">
              Level Assessment: {mastery.id} ({mastery.title})
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Pre-Game Challenge Booster
            </h2>
          </div>

          <div className="bg-blue-50/50 border border-blue-100/40 rounded-2xl p-6 text-left space-y-4">
            <p className="text-sm text-blue-950 font-bold leading-relaxed italic">
              "Deep breath, {studentName}. I’ve seen you tackle {topicName} before, and your focus was incredible. You’ve put in the work—now let’s show this quiz what you’re made of. I'm right here with you—let's go!"
            </p>
            {isLateNight && (
              <p className="text-xs text-blue-800 font-medium leading-relaxed bg-white p-3 rounded-xl border border-blue-100/40 flex items-center gap-2">
                <span className="text-lg">🌙</span>
                <span><strong>Late Night Dedication:</strong> "Still at it? Your dedication is legendary. Let’s do 5 more, and then we both get some well-deserved rest, deal?"</span>
              </p>
            )}
            
            <p className="text-xs text-slate-600 leading-relaxed font-mono border-t border-blue-100/40 pt-3 flex items-center gap-1">
              🎯 <span className="font-semibold text-slate-800">Study Tip:</span> "Take your time with pronunciation and term meanings. Trust your preparation and do your best!"
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button
              onClick={() => setShowConfidenceBooster(false)}
              id="btn-confidence-go"
              className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-8 py-4 text-sm font-black text-white shadow-lg hover:bg-blue-700 transition cursor-pointer"
            >
              <span>Let's Show This Quiz! 🚀</span>
              <ArrowRight className="h-4 w-4" />
            </button>
            <button
              onClick={onGoBack}
              id="btn-confidence-back"
              className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-8 py-4 text-sm font-bold text-gray-700 hover:bg-gray-50 transition cursor-pointer"
            >
              <span>Go Back</span>
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  // Helper calculation for Streak
  const getStreakCount = () => {
    let currentStreak = 0;
    for (let i = 0; i <= currentCardIndex; i++) {
      const card = module.cards[i];
      const ans = answers[card.id];
      if (ans) {
        if (ans.isCorrect) {
          currentStreak++;
        } else {
          currentStreak = 0;
        }
      }
    }
    return currentStreak;
  };

  // Helper calculation for recovery "Comeback" prompt
  const checkIsComeback = () => {
    if (currentCardIndex === 0) return false;
    const currentAns = answers[currentCard.id];
    if (!currentAns || !currentAns.isCorrect) return false;

    // Find if the previous answer was incorrect
    const prevCard = module.cards[currentCardIndex - 1];
    const prevAns = answers[prevCard.id];
    return prevAns && !prevAns.isCorrect;
  };

  const streakCount = getStreakCount();
  const isComeback = checkIsComeback();
  const remainingCount = module.cards.length - (currentCardIndex + 1);

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 space-y-6">
      {/* Header controls */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-gray-100 pb-4">
        <button
          onClick={onGoBack}
          id="btn-quiz-exit"
          className="flex items-center gap-2 rounded-xl border border-gray-200 px-4 py-2 text-sm font-semibold text-gray-600 hover:bg-gray-50 transition cursor-pointer"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Exit Quiz</span>
        </button>

        <div className="flex items-center gap-2">
          <span className="rounded-md bg-blue-50 px-2.5 py-1 text-xs font-semibold text-blue-700">
            {module.flag} {module.language} Quiz
          </span>
          <span className="flex items-center gap-1 rounded-md bg-amber-50 px-2.5 py-1 text-xs font-bold text-amber-700 border border-amber-100 animate-pulse">
            <Flame className="h-3.5 w-3.5" /> Volatile Score: {score}
          </span>
        </div>
      </div>

      {/* Progress */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs text-gray-500 font-medium">
          <span>Question {currentCardIndex + 1} of {module.cards.length}</span>
          <span>{progressPercent}% Complete</span>
        </div>
        <div className="h-2 w-full rounded-full bg-gray-100 overflow-hidden">
          <div
            className="h-full bg-blue-600 rounded-full transition-all duration-300"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* Main interactive question card */}
      <div className="rounded-3xl border border-gray-100 bg-white p-6 sm:p-8 shadow-xl shadow-gray-50 space-y-6">
        {/* Term to translate */}
        <div className="bg-gray-50 rounded-2xl p-6 sm:p-8 text-center border border-gray-100 space-y-4 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-3">
            <button
              onClick={() => handleSpeak(currentCard.foreignTerm, module.language)}
              id="btn-speak-quiz-term"
              className={`rounded-full p-2 transition cursor-pointer ${
                isPlayingAudio
                  ? "bg-blue-100 text-blue-700 animate-bounce"
                  : "bg-white text-gray-400 hover:text-blue-600 shadow-sm"
              }`}
              title="Speak phrase"
            >
              <Volume2 className="h-4.5 w-4.5" />
            </button>
          </div>
          
          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
            Translate the following term
          </span>
          <h3 className="text-2xl sm:text-3xl font-extrabold text-gray-900 leading-normal">
            {currentCard.foreignTerm}
          </h3>
          <p className="text-xs font-mono text-gray-400">
            [{currentCard.pronunciation}]
          </p>
        </div>

        {/* Answer Options Grid */}
        <div className="space-y-3">
          <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">
            Select the correct English translation:
          </span>
          <div className="grid grid-cols-1 gap-3">
            {currentCard.quizOptions.map((option, idx) => {
              const isSelected = selectedOptionIndex === idx;
              const isCorrectAnswer = idx === currentCard.correctAnswerIndex;
              
              let optionStyle = "border-gray-200 hover:border-blue-200 hover:bg-blue-50/30";
              let icon = null;

              if (hasSubmitted) {
                if (isCorrectAnswer) {
                  optionStyle = "border-emerald-300 bg-emerald-50 text-emerald-950 font-semibold";
                  icon = <CheckCircle className="h-5 w-5 text-emerald-600 shrink-0" />;
                } else if (isSelected) {
                  optionStyle = "border-red-300 bg-red-50 text-red-950";
                  icon = <XCircle className="h-5 w-5 text-red-600 shrink-0" />;
                } else {
                  optionStyle = "border-gray-100 bg-gray-50/50 text-gray-400 cursor-not-allowed";
                }
              } else if (isSelected) {
                optionStyle = "border-blue-600 bg-blue-50 text-blue-950 ring-2 ring-blue-100 font-semibold";
              }

              return (
                <button
                  key={idx}
                  onClick={() => handleSelectOption(idx)}
                  disabled={hasSubmitted}
                  id={`btn-option-${currentCard.id}-${idx}`}
                  className={`flex items-center justify-between gap-3 rounded-2xl border px-5 py-4 text-left text-sm transition cursor-pointer ${optionStyle}`}
                >
                  <div className="flex items-center gap-3">
                    <span className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-bold ${
                      isSelected
                        ? "bg-blue-600 text-white"
                        : hasSubmitted
                        ? "bg-gray-200 text-gray-400"
                        : "bg-gray-100 text-gray-600 group-hover:bg-blue-100"
                    }`}>
                      {String.fromCharCode(65 + idx)}
                    </span>
                    <span className="font-medium leading-relaxed">{option}</span>
                  </div>
                  {icon}
                </button>
              );
            })}
          </div>
        </div>

        {/* Correct/Incorrect Explanation Section */}
        <AnimatePresence>
          {hasSubmitted && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden"
            >
              <div className="space-y-4 mt-4">
                {/* Quizzy Mascot Feedback Panel */}
                <div className="bg-blue-50 border border-blue-100 rounded-2xl p-5 flex gap-4 items-start shadow-sm relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-1 text-[10px] bg-blue-100/50 text-blue-700 font-extrabold rounded-bl-xl uppercase tracking-widest">
                    Your Coach
                  </div>
                  <div className="flex flex-col items-center shrink-0">
                    <div className="text-4xl p-2.5 bg-white rounded-2xl shadow-sm border border-blue-100/40 select-none animate-bounce">
                      🦉
                    </div>
                    <span className="text-[11px] font-black text-blue-950 mt-1">Quizzy</span>
                  </div>
                  <div className="space-y-2 flex-1 min-w-0">
                    <div className="flex items-center gap-1.5">
                      {selectedOptionIndex === currentCard.correctAnswerIndex ? (
                        <span className="text-xs font-extrabold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg uppercase tracking-wider">
                          🌟 Correct Answer!
                        </span>
                      ) : (
                        <span className="text-xs font-extrabold text-amber-700 bg-amber-50 px-2.5 py-1 rounded-lg uppercase tracking-wider">
                          📚 Practice Corner
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-blue-950 font-semibold leading-relaxed">
                      {selectedOptionIndex === currentCard.correctAnswerIndex ? (
                        streakCount >= 5 ? (
                          `"Five in a row! You’ve unlocked the 'Scholar Status' for this session. Your focus is sharp—only ${remainingCount > 0 ? `${remainingCount} more` : "one final card"} to complete the challenge. 🌟🚀"`
                        ) : streakCount >= 2 ? (
                          `"You’re on fire! That was a tricky one, but you nailed the logic perfectly. Keep this momentum for the final round! 🔥"`
                        ) : isComeback ? (
                          `"Great recovery! One wrong turn didn't stop you. That’s exactly how top students approach complex subjects. 💫🌟"`
                        ) : (
                          `"Awesome job! You're getting so much faster at this and building solid ${module.language} knowledge with every question! Let's keep the focus sharp. 🚀"`
                        )
                      ) : (
                        `"Wait! Don't let that one slide, ${studentName}. I’ve seen that concept trip up even the best students. Here’s a 'pro-tip' to visualize it differently: ${getProTip()} Ready to give it another shot? 🦉💡"`
                      )}
                    </p>
                    <div className="text-[11px] text-blue-900/80 leading-relaxed pt-1.5 border-t border-blue-100/50 space-y-1">
                      <p>
                        <strong className="text-blue-950">Translation:</strong> "{currentCard.englishTranslation}"
                      </p>
                      <p>
                        <strong className="text-blue-950">Example:</strong> "{currentCard.exampleSentenceForeign}" ({currentCard.exampleSentenceEnglish})
                      </p>
                    </div>
                  </div>
                </div>

                {/* Conceptual Bridge and Pedagogical details */}
                {selectedOptionIndex === currentCard.correctAnswerIndex && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 pt-1">
                    {/* The Bridge Prompt */}
                    <div className="bg-blue-50/30 border border-blue-100/40 rounded-2xl p-4 text-xs text-blue-950 space-y-1">
                      <span className="font-extrabold text-[10px] text-blue-600 uppercase tracking-wider block">
                        🔗 Conceptual Bridge
                      </span>
                      <p className="leading-relaxed font-medium">
                        "That answer was correct! To really solidify this, think about how this concept connects to conversational context. Could you explain the link in one sentence?"
                      </p>
                    </div>

                    {/* The Teacher Perspective Prompt */}
                    <div className="bg-purple-50/30 border border-purple-100/40 rounded-2xl p-4 text-xs text-purple-950 space-y-1">
                      <span className="font-extrabold text-[10px] text-purple-600 uppercase tracking-wider block">
                        🧑‍🏫 Pedagogical Perspective
                      </span>
                      <p className="leading-relaxed font-medium">
                        "This question had a 80% success rate today. It seems your explanation of {module.language} vocabulary really clicked with the group!"
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Actions bar */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <div className="flex items-center gap-3">
            <button
              onClick={onResetQuiz}
              id="btn-quiz-inline-reset"
              className="flex items-center gap-1.5 rounded-xl px-3 py-2 text-xs font-bold text-gray-400 hover:text-red-600 transition cursor-pointer"
              title="Wipe state and restart quiz"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              <span>Restart Quiz</span>
            </button>
          </div>

          {!hasSubmitted ? (
            <button
              onClick={handleSubmitAnswer}
              disabled={selectedOptionIndex === null}
              id="btn-quiz-submit-answer"
              className="flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-2.5 text-sm font-bold text-white shadow-md shadow-blue-100 hover:bg-blue-700 disabled:opacity-40 disabled:cursor-not-allowed transition cursor-pointer"
            >
              Check Answer
            </button>
          ) : (
            <button
              onClick={onNextQuestion}
              id="btn-quiz-next-question"
              className="flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-2.5 text-sm font-bold text-white shadow-md shadow-blue-100 hover:bg-blue-700 transition cursor-pointer"
            >
              <span>{currentCardIndex === module.cards.length - 1 ? "Finish Quiz" : "Next Question"}</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
