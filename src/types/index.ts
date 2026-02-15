export type QuestionType = 'mcq' | 'multi-select';

export interface Question {
  id: string;
  text: string;
  options: string[];
  correctAnswers: number[]; // indices of correct options
  type: QuestionType;
}

export interface Section {
  id: string;
  name: string;
  questions: Question[];
  timeLimit: number; // seconds
}

export interface UserAnswer {
  questionId: string;
  selectedOptions: number[];
}

export type SectionStatus = 'locked' | 'active' | 'completed';

export interface TestState {
  currentSectionIndex: number;
  currentQuestionIndex: number;
  answers: Record<string, UserAnswer>;
  sectionStatuses: SectionStatus[];
  isFinished: boolean;
}

export type TestAction =
  | { type: 'SELECT_ANSWER'; questionId: string; selectedOptions: number[] }
  | { type: 'NEXT_QUESTION' }
  | { type: 'PREV_QUESTION' }
  | { type: 'GO_TO_QUESTION'; index: number }
  | { type: 'SUBMIT_SECTION' }
  | { type: 'EXPIRE_SECTION' };

export interface TestResult {
  sections: Section[];
  answers: Record<string, UserAnswer>;
  score: number;
  totalQuestions: number;
  sectionScores: { sectionName: string; score: number; total: number }[];
}
