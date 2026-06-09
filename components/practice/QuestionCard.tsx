import type { Question } from "@/types";
import DifficultyBadge from "@/components/shared/DifficultyBadge";
import ExamBadge from "@/components/shared/ExamBadge";
import MathRenderer from "@/components/shared/MathRenderer";
import AnswerOption from "./AnswerOption";
import { Clock } from "lucide-react";
import { TOPIC_LABELS } from "@/lib/constants";

type AnswerState = "default" | "selected" | "correct" | "incorrect";

interface QuestionCardProps {
  question: Question;
  selectedAnswer: string | null;
  isSubmitted: boolean;
  onSelectAnswer: (label: string) => void;
}

export default function QuestionCard({
  question,
  selectedAnswer,
  isSubmitted,
  onSelectAnswer,
}: QuestionCardProps) {
  function getState(label: string): AnswerState {
    if (!isSubmitted) {
      return selectedAnswer === label ? "selected" : "default";
    }
    if (label === question.correctAnswer) return "correct";
    if (label === selectedAnswer) return "incorrect";
    return "default";
  }

  return (
    <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm space-y-5">
      {/* Header badges */}
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-xs font-medium text-gray-500 font-sarabun">
          {TOPIC_LABELS[question.topic]}
        </span>
        <span className="text-gray-300">·</span>
        <DifficultyBadge difficulty={question.difficulty} />
        <ExamBadge examType={question.examType} />
        <div className="ml-auto flex items-center gap-1 text-xs text-gray-400 font-sarabun">
          <Clock size={12} />
          ~{Math.round(question.estimatedTimeSeconds / 60)} นาที
        </div>
      </div>

      {/* Question */}
      <div className="text-base font-medium text-gray-800 leading-relaxed font-sarabun">
        <MathRenderer text={question.questionText} />
      </div>

      {/* Choices */}
      <div className="space-y-2.5">
        {question.choices.map((choice) => (
          <AnswerOption
            key={choice.label}
            label={choice.label}
            text={choice.text}
            state={getState(choice.label)}
            onClick={() => !isSubmitted && onSelectAnswer(choice.label)}
            disabled={isSubmitted}
          />
        ))}
      </div>
    </div>
  );
}
