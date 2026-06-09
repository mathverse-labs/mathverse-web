export type Difficulty = 'easy' | 'medium' | 'hard' | 'very-hard';
export type ExamType = 'a-level-math1' | 'triam-udom' | 'mwit' | 'kvis' | 'general';
export type TopicSlug =
  | 'algebra'
  | 'functions'
  | 'trigonometry'
  | 'calculus'
  | 'probability'
  | 'statistics'
  | 'vectors'
  | 'sequences'
  | 'geometry'
  | 'number-theory';

export interface Question {
  id: string;
  examType: ExamType;
  topic: TopicSlug;
  subtopic: string;
  difficulty: Difficulty;
  questionText: string;
  choices: { label: string; text: string }[];
  correctAnswer: string;
  explanation: string;
  formulaNotes?: string;
  estimatedTimeSeconds: number;
  tags: string[];
}

export interface Topic {
  slug: TopicSlug;
  nameTh: string;
  nameEn: string;
  description: string;
  totalQuestions: number;
  icon: string;
}

export interface MockExam {
  id: string;
  title: string;
  examType: ExamType;
  durationMinutes: number;
  questionCount: number;
  difficulty: Difficulty;
  description: string;
}

export interface UserProgress {
  userId: string;
  topicAccuracy: Record<TopicSlug, number>;
  topicCoverage: Record<TopicSlug, number>;
  totalQuestionsAnswered: number;
  totalCorrect: number;
  studyStreakDays: number;
  lastStudied: string;
  mockExamScores: { examId: string; score: number; date: string }[];
}

export interface AnalyticsData {
  accuracyByTopic: Record<TopicSlug, number>;
  accuracyByDifficulty: Record<Difficulty, number>;
  avgTimePerQuestion: number;
  weeklyProgress: { week: string; accuracy: number; questionsAnswered: number }[];
  readinessScore: number;
  weakTopics: TopicSlug[];
}
