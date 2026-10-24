import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  ChevronLeft,
  ChevronRight,
  BookOpen,
  Volume2,
  CheckCircle2,
  HelpCircle,
  Play,
  RotateCcw,
  ArrowLeft
} from "lucide-react";
import { LearningModule, Flashcard } from "../types";

interface FlashcardDeckProps {
  module: LearningModule;
  onGoBack: () => void;
  onStartQuiz: () => void;
}

export function FlashcardDeck({ module, onGoBack, onStartQuiz }: FlashcardDeckProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [masteredIds, setMasteredIds] = useState<string[]>([]);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  // When module changes, reset index and deck state
  useEffect(() => {
    setCurrentIndex(0);
    setIsFlipped(false);
    setMasteredIds([]);
  }, [module]);

  const currentCard: Flashcard = module.cards[currentIndex];

  const handleNext = () => {
    if (currentIndex < module.cards.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setIsFlipped(false);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
      setIsFlipped(false);
    }
  };

  const handleToggleMastered = (cardId: string) => {
    if (masteredIds.includes(cardId)) {
      setMasteredIds((prev) => prev.filter((id) => id !== cardId));
    } else {
      setMasteredIds((prev) => [...prev, cardId]);
    }
  };

  const handleSpeak = (text: string, langCode: string) => {
    if (!("speechSynthesis" in window)) {
      // Mock audio visual trigger
      setIsPlayingAudio(true);
      setTimeout(() => setIsPlayingAudio(false), 1500);
      return;
    }

    try {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      
      // Determine voice lang matching
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
      } else {
        utterance.lang = "en-US";
      }

      utterance.rate = 0.85; // slightly slower for better learning
      utterance.onstart = () => setIsPlayingAudio(true);
      utterance.onend = () => setIsPlayingAudio(false);
      utterance.onerror = () => setIsPlayingAudio(false);
      
      window.speechSynthesis.speak(utterance);
    } catch {
      setIsPlayingAudio(true);
      setTimeout(() => setIsPlayingAudio(false), 1500);
    }
  };

  const resetDeckProgress = () => {
    setCurrentIndex(0);
    setIsFlipped(false);
    setMasteredIds([]);
  };

  const progressPercent = Math.round(((currentIndex + 1) / module.cards.length) * 100);
  const isMastered = masteredIds.includes(currentCard.id);

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 space-y-6">
      {/* Back button and quick info */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-gray-100 pb-4">
        <button
          onClick={onGoBack}
          id="btn-deck-back"
          className="flex items-center gap-2 rounded-xl border border-gray-200 px-4 py-2 text-sm font-semibold text-gray-600 hover:bg-gray-50 transition cursor-pointer"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Exit Study Mode</span>
        </button>

        <div className="flex items-center gap-2">
          <span className="rounded-md bg-blue-50 px-2.5 py-1 text-xs font-semibold text-blue-700">
            {module.flag} {module.language}
          </span>
          <span className="rounded-md bg-gray-100 px-2.5 py-1 text-xs font-semibold text-gray-600">
            {module.level}
          </span>
          <span className="rounded-md bg-sky-50 px-2.5 py-1 text-xs font-semibold text-sky-700">
            {module.category}
          </span>
        </div>
      </div>

      {/* Progress header */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs text-gray-500 font-medium">
          <span>Card {currentIndex + 1} of {module.cards.length}</span>
          <span>{progressPercent}% Studied</span>
        </div>
        <div className="h-2 w-full rounded-full bg-gray-100 overflow-hidden">
          <div
            className="h-full bg-blue-600 rounded-full transition-all duration-300"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* 3D Flashcard Stage */}
      <div className="relative h-96 w-full perspective-1000">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -15 }}
            transition={{ duration: 0.25 }}
            className="h-full w-full"
          >
            <div
              onClick={() => setIsFlipped(!isFlipped)}
              id={`card-interactive-${currentCard.id}`}
              className={`relative h-full w-full rounded-3xl cursor-pointer select-none transition-transform duration-500 preserve-3d shadow-xl shadow-gray-100 border border-gray-100 ${
                isFlipped ? "rotate-y-180" : ""
              }`}
            >
              {/* CARD FRONT */}
              <div className="absolute inset-0 flex flex-col justify-between rounded-3xl bg-white p-8 backface-hidden">
                <div className="flex justify-between items-start">
                  <span className="text-xs font-bold text-blue-500 tracking-wider uppercase">
                    Target Expression
                  </span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleSpeak(currentCard.foreignTerm, module.language);
                    }}
                    id={`btn-audio-front-${currentCard.id}`}
                    className={`rounded-full p-2.5 transition cursor-pointer ${
                      isPlayingAudio
                        ? "bg-blue-100 text-blue-700 animate-bounce"
                        : "bg-gray-50 text-gray-500 hover:bg-blue-50 hover:text-blue-600"
                    }`}
                    title="Listen Pronunciation"
                  >
                    <Volume2 className="h-5 w-5" />
                  </button>
                </div>

                <div className="flex flex-col items-center justify-center text-center py-4">
                  <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 leading-tight">
                    {currentCard.foreignTerm}
                  </h2>
                  <p className="mt-4 text-sm font-medium text-gray-400 font-mono">
                    [{currentCard.pronunciation}]
                  </p>
                </div>

                <div className="flex justify-between items-center text-xs text-gray-400 border-t border-gray-50 pt-4">
                  <span className="flex items-center gap-1 font-semibold text-blue-600">
                    <BookOpen className="h-3.5 w-3.5" /> Tap to reveal English
                  </span>
                  <div className="flex items-center gap-1">
                    <span className="font-medium text-gray-500">Mastery status:</span>
                    {isMastered ? (
                      <span className="font-bold text-emerald-600">Mastered</span>
                    ) : (
                      <span className="font-bold text-gray-400">Needs Study</span>
                    )}
                  </div>
                </div>
              </div>

              {/* CARD BACK */}
              <div className="absolute inset-0 flex flex-col justify-between rounded-3xl bg-blue-50/40 p-8 rotate-y-180 backface-hidden border-2 border-blue-200">
                <div className="flex justify-between items-start">
                  <span className="text-xs font-bold text-blue-600 tracking-wider uppercase">
                    English Translation
                  </span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleSpeak(currentCard.englishTranslation, "en");
                      }}
                      id={`btn-audio-back-${currentCard.id}`}
                      className="rounded-full bg-white p-2.5 text-gray-500 hover:bg-blue-50 hover:text-blue-600 transition cursor-pointer"
                      title="Listen English"
                    >
                      <Volume2 className="h-5 w-5" />
                    </button>
                  </div>
                </div>

                <div className="flex flex-col items-center justify-center text-center space-y-4 py-2">
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-blue-950">
                    {currentCard.englishTranslation}
                  </h3>
                  
                  <div className="max-w-md bg-white rounded-2xl p-4 border border-blue-100 shadow-sm text-left w-full space-y-2">
                    <div>
                      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Example Usage</p>
                      <p className="text-sm font-bold text-gray-800 italic mt-0.5">
                        "{currentCard.exampleSentenceForeign}"
                      </p>
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">English Context</p>
                      <p className="text-xs font-medium text-gray-600">
                        "{currentCard.exampleSentenceEnglish}"
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex justify-between items-center text-xs text-gray-500 border-t border-blue-100/50 pt-4">
                  <span className="font-semibold text-blue-600 flex items-center gap-1">
                    <BookOpen className="h-3.5 w-3.5" /> Tap to view foreign term
                  </span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleToggleMastered(currentCard.id);
                    }}
                    id={`btn-mastery-${currentCard.id}`}
                    className={`flex items-center gap-1 px-3 py-1.5 rounded-xl border font-bold transition cursor-pointer ${
                      isMastered
                        ? "bg-emerald-50 border-emerald-200 text-emerald-700"
                        : "bg-white border-gray-200 text-gray-600 hover:border-blue-200 hover:text-blue-600"
                    }`}
                  >
                    <CheckCircle2 className={`h-4 w-4 ${isMastered ? "fill-emerald-200" : ""}`} />
                    <span>{isMastered ? "Mastered" : "Mark Mastered"}</span>
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Card Navigation Controls */}
      <div className="flex items-center justify-between gap-4">
        <button
          onClick={handlePrev}
          disabled={currentIndex === 0}
          id="btn-deck-prev"
          className="flex h-12 items-center justify-center rounded-2xl border border-gray-200 bg-white px-6 font-semibold text-gray-700 transition hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
        >
          <ChevronLeft className="mr-1.5 h-5 w-5" />
          <span>Previous</span>
        </button>

        <div className="flex items-center gap-2">
          <button
            onClick={resetDeckProgress}
            id="btn-deck-reset"
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-gray-200 bg-white text-gray-500 hover:text-gray-900 hover:bg-gray-50 transition cursor-pointer"
            title="Reset study progress"
          >
            <RotateCcw className="h-4 w-4" />
          </button>
          <span className="text-xs font-semibold text-gray-400 bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-100">
            Mastered: {masteredIds.length} / {module.cards.length}
          </span>
        </div>

        <button
          onClick={handleNext}
          disabled={currentIndex === module.cards.length - 1}
          id="btn-deck-next"
          className="flex h-12 items-center justify-center rounded-2xl border border-gray-200 bg-white px-6 font-semibold text-gray-700 transition hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
        >
          <span>Next</span>
          <ChevronRight className="ml-1.5 h-5 w-5" />
        </button>
      </div>

      {/* Mini CTA Panel to Start the Quiz */}
      <div className="rounded-2xl bg-gradient-to-r from-blue-50 to-sky-50 p-6 border border-blue-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <h4 className="font-bold text-blue-950 flex items-center gap-1.5 text-base">
            <HelpCircle className="h-4 w-4 text-blue-600" /> Ready to test your memory?
          </h4>
          <p className="text-xs text-blue-900/70 leading-relaxed">
            Transition smoothly into the interactive quiz module to validate your recognition, spelling, and grammar.
          </p>
        </div>
        <button
          onClick={onStartQuiz}
          id="btn-study-start-quiz"
          className="flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-bold text-white shadow-md shadow-blue-100 hover:bg-blue-700 transition cursor-pointer whitespace-nowrap"
        >
          <Play className="h-4 w-4 fill-white" />
          <span>Launch Module Quiz</span>
        </button>
      </div>
    </div>
  );
}
