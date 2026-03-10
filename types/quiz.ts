// @/types/quiz.ts

export type QuestionType = "multiple_choice" | "fill_in" | "single_choice";

export interface Question {
  id: string;
  content: string;
  type: QuestionType;
  options?: string[]; // Optional because 'fill_in' might not have options
  chapter_id: number;
  correct_answer?: string; // Usually hidden on frontend, but good for type completeness
}

export interface Chapter {
  id: number;
  title: string;
  subject: "algebra" | "geometry";
  grade_id: number;
}

export interface Grade {
  id: number;
  level: string; // e.g., "Clasa a VIII-a"
}

export interface EvalDetail {
  question_id: string;
  is_correct: boolean;
  correct_answer: string;
  user_answer: string;
}

export interface QuizResult {
  score: number;
  total: number;
  details: EvalDetail[];
}
