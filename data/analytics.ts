import type { AnalyticsData } from "@/types";

export const analyticsData: AnalyticsData = {
  accuracyByTopic: {
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
  accuracyByDifficulty: {
    easy: 91,
    medium: 72,
    hard: 54,
    "very-hard": 31,
  },
  avgTimePerQuestion: 98,
  weeklyProgress: [
    { week: "สัปดาห์ 1", accuracy: 55, questionsAnswered: 28 },
    { week: "สัปดาห์ 2", accuracy: 59, questionsAnswered: 32 },
    { week: "สัปดาห์ 3", accuracy: 62, questionsAnswered: 35 },
    { week: "สัปดาห์ 4", accuracy: 58, questionsAnswered: 30 },
    { week: "สัปดาห์ 5", accuracy: 65, questionsAnswered: 40 },
    { week: "สัปดาห์ 6", accuracy: 70, questionsAnswered: 42 },
    { week: "สัปดาห์ 7", accuracy: 68, questionsAnswered: 38 },
    { week: "สัปดาห์ 8", accuracy: 72, questionsAnswered: 39 },
  ],
  readinessScore: 72,
  weakTopics: ["trigonometry", "probability", "calculus"],
};
