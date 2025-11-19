
export enum ViewState {
  DASHBOARD = 'DASHBOARD',
  CURRICULUM = 'CURRICULUM',
  LESSON = 'LESSON',
  PRACTICE = 'PRACTICE',
  WRITING = 'WRITING',
  TUTOR = 'TUTOR',
  IRREGULAR_VERBS = 'IRREGULAR_VERBS',
}

export type Language = 'en' | 'pl';

export enum TenseCategory {
  PAST = 'Past',
  PRESENT = 'Present',
  FUTURE = 'Future',
}

export enum TenseAspect {
  SIMPLE = 'Simple',
  CONTINUOUS = 'Continuous',
  PERFECT = 'Perfect',
  PERFECT_CONTINUOUS = 'Perfect Continuous',
}

export interface TenseInfo {
  id: string;
  name: string;
  category: TenseCategory;
  aspect: TenseAspect;
  formula: string;
  description: string;
  example: string;
  color: string;
}

export interface GrammarTopic {
  id: string;
  title: string;
  description: string;
  example: string;
  color: string;
  tags: string[];
}

// --- Curriculum Types ---
export interface Chapter {
  title: string;
  content: string[];
}

export interface LevelData {
  level: string;
  chapters: Chapter[];
}

export interface CurriculumData {
  [key: string]: LevelData;
}
// ------------------------

export type QuestionType = 'multiple-choice' | 'text-input' | 'verb-forms';

export interface QuizQuestion {
  id: number;
  type: QuestionType;
  text: string;
  // For multiple choice
  options?: string[];
  correctAnswerIndex?: number;
  // For text input / vocab
  correctAnswer?: string; // Main accepted answer
  acceptableAnswers?: string[]; // Synonyms
  verbForms?: string[]; // [Base, Past, Participle] for verb drills
  explanation: string;
}

export interface QuizData {
  title?: string;
  questions: QuizQuestion[];
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: number;
}

export type PracticeMode = 'grammar' | 'vocabulary';
export type VocabDirection = 'PL_EN' | 'EN_PL';

export type WritingLength = 'Short (50-100 words)' | 'Medium (100-200 words)' | 'Long (200+ words)';

export interface WritingFeedback {
  overallScore: number;
  grammarScore: number;
  vocabularyScore: number;
  relevanceScore: number;
  generalFeedback: string;
  corrections: Array<{
    original: string;
    correction: string;
    explanation: string;
  }>;
}
