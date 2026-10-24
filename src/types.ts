export interface Flashcard {
  id: string;
  foreignTerm: string;
  englishTranslation: string;
  pronunciation: string;
  exampleSentenceForeign: string;
  exampleSentenceEnglish: string;
  quizOptions: string[];
  correctAnswerIndex: number;
}

export interface LearningModule {
  id: string;
  title: string;
  description: string;
  language: string;
  flag: string;
  level: "Beginner" | "Intermediate" | "Advanced";
  category: string;
  cards: Flashcard[];
}

export interface QuizProgress {
  currentCardIndex: number;
  score: number;
  answers: { [cardId: string]: { selectedIndex: number; isCorrect: boolean } };
  isCompleted: boolean;
}

export interface QuizAttempt {
  moduleId: string;
  moduleTitle: string;
  language: string;
  score: number;
  total: number;
  timestamp: number;
}

export interface StudentProgressData {
  email: string;
  name: string;
  avatarSeed: string;
  attempts: QuizAttempt[];
  password?: string;
}

export interface UserProfile {
  name: string;
  email: string;
  avatarSeed: string;
  role: "student" | "admin";
  password?: string;
}

export type ViewMode = "dashboard" | "study" | "quiz" | "admin_edit" | "progress";
