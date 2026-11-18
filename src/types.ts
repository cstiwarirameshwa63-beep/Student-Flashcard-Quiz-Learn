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
  id?: string;
  studentUid?: string;
  studentName?: string;
  moduleId: string;
  moduleTitle: string;
  language: string;
  level?: "Beginner" | "Intermediate" | "Advanced";
  score: number;
  total: number;
  timestamp: number;
}

export interface StudentProgressData {
  uid?: string;
  email: string;
  name: string;
  avatarSeed: string;
  role?: "student" | "admin";
  attempts: QuizAttempt[];
}

export interface UserProfile {
  uid: string;
  name: string;
  email: string;
  avatarSeed: string;
  role: "student" | "admin";
}

export type ViewMode = "dashboard" | "study" | "quiz" | "admin_edit" | "progress";
