import type { UserProgress } from "@/types";

export const currentUser = {
  id: "user001",
  name: "วรนาถ สุขสวัสดิ์",
  email: "woranat@example.com",
  examGoal: "a-level-math1" as const,
  targetScore: 80,
  avatar: null as null,
};

export const userProgress: UserProgress = {
  userId: "user001",
  topicAccuracy: {
    algebra: 82,
    functions: 78,
    trigonometry: 45,
    calculus: 58,
    probability: 52,
    statistics: 71,
    vectors: 65,
    sequences: 74,
    geometry: 68,
    "number-theory": 60,
  },
  topicCoverage: {
    algebra: 75,
    functions: 68,
    trigonometry: 40,
    calculus: 55,
    probability: 35,
    statistics: 50,
    vectors: 45,
    sequences: 60,
    geometry: 52,
    "number-theory": 30,
  },
  totalQuestionsAnswered: 284,
  totalCorrect: 190,
  studyStreakDays: 7,
  lastStudied: "2026-06-09",
  mockExamScores: [
    { examId: "exam001", score: 68, date: "2026-05-28" },
    { examId: "exam004", score: 85, date: "2026-06-02" },
    { examId: "exam003", score: 72, date: "2026-06-07" },
  ],
};
