import React, { useState } from "react";
import { 
  ArrowLeft, 
  Save, 
  Plus, 
  Trash2, 
  Sparkles, 
  AlertCircle, 
  Check, 
  Languages, 
  HelpCircle,
  FileText,
  Eye,
  ArrowLeftRight
} from "lucide-react";
import { LearningModule, Flashcard, QuizProgress } from "../types";
import { FlashcardDeck } from "./FlashcardDeck";
import { QuizSection } from "./QuizSection";

interface QuizQuestionEditorProps {
  module: LearningModule;
  onSave: (updatedCards: Flashcard[]) => void;
  onCancel: () => void;
}

export function QuizQuestionEditor({ module, onSave, onCancel }: QuizQuestionEditorProps) {
  const [cards, setCards] = useState<Flashcard[]>([...module.cards]);
  const [activeCardId, setActiveCardId] = useState<string | null>(cards[0]?.id || null);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // Preview Sandbox States
  const [isPreviewing, setIsPreviewing] = useState(false);
  const [previewView, setPreviewView] = useState<"study" | "quiz">("study");
  const [previewQuizProgress, setPreviewQuizProgress] = useState<QuizProgress>({
    currentCardIndex: 0,
    score: 0,
    answers: {},
    isCompleted: false,
  });

  const startPreview = (view: "study" | "quiz") => {
    setPreviewQuizProgress({
      currentCardIndex: 0,
      score: 0,
      answers: {},
      isCompleted: false,
    });
    setPreviewView(view);
    setIsPreviewing(true);
  };

  const activeCard = cards.find((c) => c.id === activeCardId);

  const handleCardChange = (cardId: string, field: keyof Flashcard, value: any) => {
    setCards((prev) =>
      prev.map((c) => (c.id === cardId ? { ...c, [field]: value } : c))
    );
  };

  const handleQuizOptionChange = (cardId: string, optionIndex: number, newValue: string) => {
    setCards((prev) =>
      prev.map((c) => {
        if (c.id === cardId) {
          const updatedOptions = [...c.quizOptions];
          updatedOptions[optionIndex] = newValue;
          return { ...c, quizOptions: updatedOptions };
        }
        return c;
      })
    );
  };

  const handleAddNewCard = () => {
    const newId = `custom-card-${Date.now()}`;
    const newCard: Flashcard = {
      id: newId,
      foreignTerm: "New Term",
      englishTranslation: "New Translation",
      pronunciation: "Pron-un-ci-a-tion",
      exampleSentenceForeign: "Example in source language",
      exampleSentenceEnglish: "Example in English",
      quizOptions: ["Option A", "Option B", "Option C", "Option D"],
      correctAnswerIndex: 0,
    };

    setCards((prev) => [...prev, newCard]);
    setActiveCardId(newId);
    setSuccessMessage("Added a new blank flashcard!");
    setTimeout(() => setSuccessMessage(""), 3000);
  };

  const handleDeleteCard = (cardId: string) => {
    if (cards.length <= 1) {
      setErrorMessage("A module must have at least one flashcard/question.");
      setTimeout(() => setErrorMessage(""), 3000);
      return;
    }

    const indexToDelete = cards.findIndex((c) => c.id === cardId);
    const updatedCards = cards.filter((c) => c.id !== cardId);
    setCards(updatedCards);

    // Set new active card
    if (activeCardId === cardId) {
      const newActiveIndex = Math.max(0, indexToDelete - 1);
      setActiveCardId(updatedCards[newActiveIndex]?.id || null);
    }

    setSuccessMessage("Card deleted successfully.");
    setTimeout(() => setSuccessMessage(""), 3000);
  };

  const handleSaveChanges = () => {
    // Validate cards
    for (let i = 0; i < cards.length; i++) {
      const card = cards[i];
      if (!card.foreignTerm.trim() || !card.englishTranslation.trim()) {
        setErrorMessage(`Card #${i + 1} has empty foreign term or translation.`);
        return;
      }
      for (let j = 0; j < card.quizOptions.length; j++) {
        if (!card.quizOptions[j].trim()) {
          setErrorMessage(`Card #${i + 1} has empty multiple-choice option at choice ${String.fromCharCode(65 + j)}.`);
          return;
        }
      }
    }

    onSave(cards);
  };

  if (isPreviewing) {
    const previewModule = {
      ...module,
      cards: cards,
    };

    return (
      <div className="mx-auto max-w-6xl px-4 py-8 space-y-6">
        {/* Preview Mode Switcher Header */}
        <div className="bg-blue-600 text-white p-5 rounded-3xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xl border border-blue-700">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/20 px-2.5 py-1 text-[10px] font-extrabold text-emerald-200 border border-emerald-400/30">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-ping" />
              <span>LIVE TEST DRAFT PREVIEW MODE</span>
            </div>
            <h2 className="text-xl font-black tracking-tight">
              Testing Edits for: <span className="text-blue-200">{module.title}</span>
            </h2>
            <p className="text-xs text-blue-100/80 leading-relaxed">
              Verify your questions, multiple-choice answers, pronunciation tips, and examples in real-time.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => {
                setPreviewView(previewView === "study" ? "quiz" : "study");
                setPreviewQuizProgress({
                  currentCardIndex: 0,
                  score: 0,
                  answers: {},
                  isCompleted: false,
                });
              }}
              className="flex items-center gap-1.5 px-4 py-2.5 bg-white/10 hover:bg-white/20 active:bg-white/30 text-xs font-bold rounded-xl transition border border-white/10 cursor-pointer"
            >
              <ArrowLeftRight className="h-3.5 w-3.5" />
              <span>Switch to {previewView === "study" ? "Interactive Quiz" : "Flashcard Deck"}</span>
            </button>
            <button
              onClick={() => setIsPreviewing(false)}
              className="flex items-center gap-1.5 px-5 py-2.5 bg-white text-blue-700 hover:bg-blue-50 active:bg-blue-100 text-xs font-black rounded-xl transition shadow-md cursor-pointer"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              <span>Back to Admin Editor</span>
            </button>
          </div>
        </div>

        {/* Live Sub-component Frame */}
        <div className="bg-slate-50/40 rounded-3xl p-4 border border-gray-100/50">
          {previewView === "study" ? (
            <FlashcardDeck
              module={previewModule}
              onGoBack={() => setIsPreviewing(false)}
              onStartQuiz={() => startPreview("quiz")}
            />
          ) : (
            <QuizSection
              module={previewModule}
              quizProgress={previewQuizProgress}
              onAnswerSelected={(cardId, selectedIndex, isCorrect) => {
                setPreviewQuizProgress((prev) => {
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
              }}
              onNextQuestion={() => {
                const isLastCard = previewQuizProgress.currentCardIndex === cards.length - 1;
                if (isLastCard) {
                  setPreviewQuizProgress((prev) => ({
                    ...prev,
                    isCompleted: true,
                  }));
                } else {
                  setPreviewQuizProgress((prev) => ({
                    ...prev,
                    currentCardIndex: prev.currentCardIndex + 1,
                  }));
                }
              }}
              onResetQuiz={() => {
                setPreviewQuizProgress({
                  currentCardIndex: 0,
                  score: 0,
                  answers: {},
                  isCompleted: false,
                });
              }}
              onGoBack={() => setIsPreviewing(false)}
              user={{ name: "Admin (Sandbox Preview)", email: "admin@quiz.co", avatarSeed: "admin-pre", role: "admin" }}
              sessionStats={[]}
            />
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 space-y-6">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-100 pb-5">
        <div>
          <span className="text-xs font-extrabold text-sky-700 bg-sky-50 px-2.5 py-1 rounded-md uppercase tracking-wider">
            Admin Mode active
          </span>
          <h2 className="text-2xl font-black text-gray-900 tracking-tight mt-1.5 flex items-center gap-2">
            <Languages className="h-6 w-6 text-sky-600" />
            Edit Module: {module.title}
          </h2>
          <p className="text-xs text-gray-500">
            Customize quiz questions, example sentences, options, and pronunciation tips.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => startPreview("study")}
            id="btn-admin-preview"
            className="flex items-center gap-1.5 rounded-xl border border-blue-200 bg-blue-50 px-4 py-2.5 text-sm font-bold text-blue-700 hover:bg-blue-100 transition cursor-pointer"
          >
            <Eye className="h-4 w-4" />
            <span>Preview Student View</span>
          </button>
          <button
            onClick={onCancel}
            id="btn-editor-cancel"
            className="flex items-center gap-1.5 rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-semibold text-gray-700 hover:bg-gray-50 transition cursor-pointer"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Discard Changes</span>
          </button>
          <button
            onClick={handleSaveChanges}
            id="btn-editor-save"
            className="flex items-center gap-1.5 rounded-xl bg-sky-600 px-5 py-2.5 text-sm font-bold text-white shadow-md shadow-sky-100 hover:bg-sky-700 transition cursor-pointer animate-pulse"
          >
            <Save className="h-4 w-4" />
            <span>Save Module Quiz</span>
          </button>
        </div>
      </div>

      {/* Status Notifications */}
      {successMessage && (
        <div className="flex items-center gap-2 bg-emerald-50 border border-emerald-100 rounded-xl p-3.5 text-sm text-emerald-800 animate-fade-in">
          <Check className="h-4 w-4 shrink-0" />
          <span>{successMessage}</span>
        </div>
      )}
      {errorMessage && (
        <div className="flex items-center gap-2 bg-red-50 border border-red-100 rounded-xl p-3.5 text-sm text-red-800 animate-fade-in">
          <AlertCircle className="h-4 w-4 shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* Main Split Interface */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Side: Cards selector */}
        <div className="lg:col-span-4 bg-white border border-gray-100 rounded-2xl p-4 shadow-md shadow-gray-50 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider">
              Questions ({cards.length})
            </h3>
            <button
              onClick={handleAddNewCard}
              id="btn-add-question"
              className="flex items-center gap-1 text-xs font-bold text-sky-600 hover:text-sky-800 transition bg-sky-50 hover:bg-sky-100 px-2.5 py-1 rounded-lg cursor-pointer"
            >
              <Plus className="h-3.5 w-3.5" />
              <span>Add Question</span>
            </button>
          </div>

          <div className="space-y-2 max-h-[460px] overflow-y-auto pr-1">
            {cards.map((card, i) => (
              <div
                key={card.id}
                onClick={() => {
                  setActiveCardId(card.id);
                  setErrorMessage("");
                }}
                className={`group flex items-center justify-between gap-2 p-3 rounded-xl border text-left cursor-pointer transition ${
                  activeCardId === card.id
                    ? "border-sky-600 bg-sky-50/40 shadow-sm"
                    : "border-gray-100 hover:border-gray-200 bg-gray-50/50"
                }`}
              >
                <div className="truncate space-y-0.5 min-w-0">
                  <span className="text-[9px] font-bold text-gray-400 uppercase tracking-wider">
                    Question #{i + 1}
                  </span>
                  <p className="text-xs font-bold text-gray-800 truncate">
                    {card.foreignTerm || "Empty term"}
                  </p>
                  <p className="text-[10px] text-gray-400 truncate">
                    {card.englishTranslation || "Empty translation"}
                  </p>
                </div>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeleteCard(card.id);
                  }}
                  className="p-1.5 rounded-lg text-gray-400 hover:text-red-600 hover:bg-red-50 opacity-0 group-hover:opacity-100 focus:opacity-100 transition cursor-pointer"
                  title="Delete question"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Right Side: Question Detail Form */}
        <div className="lg:col-span-8 bg-white border border-gray-100 rounded-2xl p-6 shadow-md shadow-gray-50 space-y-6">
          {activeCard ? (
            <div className="space-y-6">
              <div className="border-b border-gray-50 pb-4">
                <h3 className="text-sm font-bold text-sky-950 flex items-center gap-1.5">
                  <FileText className="h-4.5 w-4.5" /> Question Properties
                </h3>
                <p className="text-xs text-gray-400">Configure core terminology, vocabulary translations, and guides.</p>
              </div>

              {/* Core translations */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-gray-700">Foreign Term / Phrase</label>
                  <input
                    type="text"
                    value={activeCard.foreignTerm}
                    onChange={(e) => handleCardChange(activeCard.id, "foreignTerm", e.target.value)}
                    className="w-full rounded-xl border border-gray-200 px-3.5 py-2 text-sm text-gray-900 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
                    placeholder="e.g. Bonjour"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-gray-700">English Translation</label>
                  <input
                    type="text"
                    value={activeCard.englishTranslation}
                    onChange={(e) => handleCardChange(activeCard.id, "englishTranslation", e.target.value)}
                    className="w-full rounded-xl border border-gray-200 px-3.5 py-2 text-sm text-gray-900 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
                    placeholder="e.g. Hello"
                  />
                </div>
              </div>

              {/* Pronunciation */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-gray-700">Phonetic Pronunciation Guide</label>
                <input
                  type="text"
                  value={activeCard.pronunciation}
                  onChange={(e) => handleCardChange(activeCard.id, "pronunciation", e.target.value)}
                  className="w-full rounded-xl border border-gray-200 px-3.5 py-2 text-sm text-gray-900 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-100 font-mono"
                  placeholder="e.g. bohn-zhoor"
                />
              </div>

              {/* Sentences */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-gray-700">Example Sentence (Foreign)</label>
                  <textarea
                    rows={2}
                    value={activeCard.exampleSentenceForeign}
                    onChange={(e) => handleCardChange(activeCard.id, "exampleSentenceForeign", e.target.value)}
                    className="w-full rounded-xl border border-gray-200 px-3.5 py-2 text-sm text-gray-900 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
                    placeholder="e.g. Bonjour, mon ami."
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-gray-700">Example Sentence (English translation)</label>
                  <textarea
                    rows={2}
                    value={activeCard.exampleSentenceEnglish}
                    onChange={(e) => handleCardChange(activeCard.id, "exampleSentenceEnglish", e.target.value)}
                    className="w-full rounded-xl border border-gray-200 px-3.5 py-2 text-sm text-gray-900 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
                    placeholder="e.g. Hello, my friend."
                  />
                </div>
              </div>

              {/* Multiple choice Options */}
              <div className="space-y-4 border-t border-gray-50 pt-4">
                <h4 className="text-xs font-extrabold text-sky-950 uppercase tracking-wider flex items-center gap-1.5">
                  <HelpCircle className="h-4 w-4 text-sky-600" /> Multiple-Choice Quiz Options
                </h4>
                <p className="text-[11px] text-gray-400">
                  Provide exactly 4 answers and select which one is correct using the indicator on the left.
                </p>

                <div className="grid grid-cols-1 gap-3">
                  {activeCard.quizOptions.map((option, idx) => {
                    const isCorrect = idx === activeCard.correctAnswerIndex;
                    return (
                      <div key={idx} className="flex items-center gap-3">
                        <button
                          type="button"
                          onClick={() => handleCardChange(activeCard.id, "correctAnswerIndex", idx)}
                          className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full border transition cursor-pointer ${
                            isCorrect
                              ? "bg-emerald-500 border-emerald-600 text-white shadow-sm"
                              : "border-gray-200 bg-white hover:border-sky-400 text-gray-300 hover:text-sky-600"
                          }`}
                          title={isCorrect ? "Correct answer option" : "Mark as correct option"}
                        >
                          <Check className="h-4 w-4" />
                        </button>

                        <div className="relative flex-1">
                          <span className="absolute left-3 top-2.5 text-xs font-extrabold text-gray-400">
                            {String.fromCharCode(65 + idx)}
                          </span>
                          <input
                            type="text"
                            value={option}
                            onChange={(e) => handleQuizOptionChange(activeCard.id, idx, e.target.value)}
                            className="w-full rounded-xl border border-gray-200 pl-8 pr-3.5 py-2 text-sm text-gray-900 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
                            placeholder={`Option ${String.fromCharCode(65 + idx)}`}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Auto-fill translation helpers warning */}
              <div className="bg-sky-50 border border-sky-100 rounded-xl p-3.5 text-xs text-sky-950 flex items-start gap-2.5">
                <Sparkles className="h-4 w-4 text-sky-600 shrink-0 mt-0.5" />
                <p className="leading-relaxed font-medium">
                  Remember to mark the correct option index using the checkmark. For a good test balance, always ensure the correct answer matches the literal English translation of the phrase.
                </p>
              </div>
            </div>
          ) : (
            <div className="h-64 flex flex-col items-center justify-center text-center text-gray-400 space-y-2">
              <Languages className="h-10 w-10 text-gray-300" />
              <p className="font-semibold text-sm">No Active Question Selected</p>
              <p className="text-xs">Select or add a flashcard/question from the left column to begin customizing.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
