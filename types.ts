
export type Lesson = {
  id: string;
  title: string;
  track: "beginner" | "refresh" | "interview";
  items: LessonItem[];
};

export type LessonItem = {
  id: string;
  type: "mcq" | "fill" | "debug" | "concept";
  prompt: string;
  content?: string; // For concept type
  code?: string;
  choices?: string[];
  correct?: string | string[];
  explanation?: string;
  difficulty: 1 | 2 | 3 | 4 | 5;
};

export type AnswerPayload = { lessonId: string; itemId: string; value: string };

export type CheckResult = {
  correct: boolean;
  correctAnswer: string | string[];
  feedback: string;
  xpDelta: number;
};

export type Profile = {
  userId: string;
  email: string;
  displayName: string;
  xp: number;
  streakDays: number;
  badges: string[];
};

export type LessonSummary = {
  id: string;
  title: string;
  xpRequired: number;
  totalItems: number;
};

export type Unit = {
  id: string;
  title: string;
  description: string;
  lessons: LessonSummary[];
};
