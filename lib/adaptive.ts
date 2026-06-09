import type { Difficulty, ExamType, Question, TopicSlug, UserProgress } from "@/types";

export function getWeakTopics(progress: UserProgress): TopicSlug[] {
  return (Object.entries(progress.topicAccuracy) as [TopicSlug, number][])
    .filter(([, accuracy]) => accuracy < 60)
    .map(([slug]) => slug);
}

export function getRecommendedTopic(progress: UserProgress): TopicSlug {
  const candidates = (
    Object.entries(progress.topicAccuracy) as [TopicSlug, number][]
  ).filter(([slug]) => (progress.topicCoverage[slug] ?? 0) > 10);

  if (candidates.length === 0) return "algebra";

  return candidates.reduce((weakest, current) =>
    current[1] < weakest[1] ? current : weakest
  )[0];
}

export function calculateReadinessScore(progress: UserProgress): number {
  const topics = Object.keys(progress.topicAccuracy) as TopicSlug[];
  const total = topics.reduce((sum, slug) => {
    const accuracy = progress.topicAccuracy[slug] ?? 0;
    const coverage = progress.topicCoverage[slug] ?? 0;
    return sum + (accuracy * coverage) / 100;
  }, 0);
  return Math.round(total / topics.length);
}

export function filterQuestions(
  questions: Question[],
  topic?: TopicSlug,
  difficulty?: Difficulty,
  examType?: ExamType
): Question[] {
  return questions.filter((q) => {
    if (topic && q.topic !== topic) return false;
    if (difficulty && q.difficulty !== difficulty) return false;
    if (examType && q.examType !== examType) return false;
    return true;
  });
}
