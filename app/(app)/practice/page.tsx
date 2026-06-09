"use client";

import { useState, useMemo } from "react";
import { questions as allQuestions } from "@/data/questions";
import { filterQuestions } from "@/lib/adaptive";
import type { Difficulty, ExamType, Question, TopicSlug } from "@/types";
import PracticeControls from "@/components/practice/PracticeControls";
import QuestionCard from "@/components/practice/QuestionCard";
import ExplanationPanel from "@/components/practice/ExplanationPanel";
import { Button } from "@/components/ui/button";
import { CheckCircle, RotateCcw } from "lucide-react";

type PracticeState = "selecting" | "answering" | "reviewing" | "complete";

interface SessionAnswer {
  questionId: string;
  selected: string | null;
  correct: boolean;
}

export default function PracticePage() {
  const [state, setState] = useState<PracticeState>("selecting");
  const [selectedTopic, setSelectedTopic] = useState<TopicSlug | "all">("all");
  const [selectedDifficulty, setSelectedDifficulty] = useState<Difficulty | "all">("all");
  const [selectedExamType, setSelectedExamType] = useState<ExamType | "all">("all");

  const [sessionQuestions, setSessionQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [sessionAnswers, setSessionAnswers] = useState<SessionAnswer[]>([]);

  const filteredQuestions = useMemo(() => {
    return filterQuestions(
      allQuestions,
      selectedTopic === "all" ? undefined : selectedTopic,
      selectedDifficulty === "all" ? undefined : selectedDifficulty,
      selectedExamType === "all" ? undefined : selectedExamType
    );
  }, [selectedTopic, selectedDifficulty, selectedExamType]);

  const currentQuestion = sessionQuestions[currentIndex];

  const handleStart = () => {
    setSessionQuestions([...filteredQuestions]);
    setCurrentIndex(0);
    setSelectedAnswer(null);
    setIsSubmitted(false);
    setSessionAnswers([]);
    setState("answering");
  };

  const handleSubmit = () => {
    if (!selectedAnswer || !currentQuestion) return;
    setIsSubmitted(true);
    setSessionAnswers((prev) => [
      ...prev,
      {
        questionId: currentQuestion.id,
        selected: selectedAnswer,
        correct: selectedAnswer === currentQuestion.correctAnswer,
      },
    ]);
    setState("reviewing");
  };

  const handleNext = () => {
    if (currentIndex + 1 >= sessionQuestions.length) {
      setState("complete");
    } else {
      setCurrentIndex((i) => i + 1);
      setSelectedAnswer(null);
      setIsSubmitted(false);
      setState("answering");
    }
  };

  const handleRestart = () => {
    setState("selecting");
    setSessionAnswers([]);
  };

  if (state === "selecting") {
    return (
      <div className="max-w-2xl mx-auto">
        <PracticeControls
          selectedTopic={selectedTopic}
          selectedDifficulty={selectedDifficulty}
          selectedExamType={selectedExamType}
          onTopicChange={setSelectedTopic}
          onDifficultyChange={setSelectedDifficulty}
          onExamTypeChange={setSelectedExamType}
          onStart={handleStart}
          questionCount={filteredQuestions.length}
        />
      </div>
    );
  }

  if (state === "complete") {
    const correct = sessionAnswers.filter((a) => a.correct).length;
    const accuracy = Math.round((correct / sessionAnswers.length) * 100);
    return (
      <div className="max-w-lg mx-auto">
        <div className="rounded-xl border border-gray-100 bg-white p-8 shadow-sm text-center space-y-4">
          <div className="flex justify-center">
            <div className="rounded-full bg-brand-100 p-4">
              <CheckCircle size={40} className="text-brand-600" />
            </div>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 font-sarabun">สรุปผลการฝึก</h2>
          <div className="grid grid-cols-3 gap-4 py-4">
            <div>
              <p className="text-3xl font-bold text-brand-600">{accuracy}%</p>
              <p className="text-xs text-gray-500 font-sarabun mt-1">ความแม่นยำ</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-emerald-600">{correct}</p>
              <p className="text-xs text-gray-500 font-sarabun mt-1">ถูกต้อง</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-gray-700">{sessionAnswers.length}</p>
              <p className="text-xs text-gray-500 font-sarabun mt-1">ทั้งหมด</p>
            </div>
          </div>
          <div className="flex gap-3 justify-center">
            <Button
              variant="outline"
              onClick={handleRestart}
              className="font-sarabun gap-2"
            >
              <RotateCcw size={16} />
              ฝึกต่อ
            </Button>
            <Button
              className="bg-brand-500 hover:bg-brand-600 text-white font-sarabun"
              onClick={handleStart}
            >
              เริ่มใหม่ (ชุดเดิม)
            </Button>
          </div>
        </div>
      </div>
    );
  }

  if (!currentQuestion) return null;

  const isCorrect = selectedAnswer === currentQuestion.correctAnswer;

  return (
    <div className="max-w-2xl mx-auto space-y-4">
      {/* Progress bar */}
      <div className="flex items-center justify-between text-sm text-gray-500 font-sarabun">
        <span>ข้อ {currentIndex + 1} / {sessionQuestions.length}</span>
        <span>{sessionAnswers.filter((a) => a.correct).length} ถูก</span>
      </div>
      <div className="h-1.5 rounded-full bg-gray-100">
        <div
          className="h-full rounded-full bg-brand-500 transition-all"
          style={{ width: `${((currentIndex) / sessionQuestions.length) * 100}%` }}
        />
      </div>

      <QuestionCard
        question={currentQuestion}
        selectedAnswer={selectedAnswer}
        isSubmitted={isSubmitted}
        onSelectAnswer={setSelectedAnswer}
      />

      {/* Controls */}
      {state === "answering" && (
        <div className="flex justify-end">
          <Button
            onClick={handleSubmit}
            disabled={!selectedAnswer}
            className="bg-brand-500 hover:bg-brand-600 text-white px-8 font-sarabun"
          >
            ส่งคำตอบ
          </Button>
        </div>
      )}

      {state === "reviewing" && currentQuestion && (
        <>
          <ExplanationPanel
            question={currentQuestion}
            selectedAnswer={selectedAnswer}
            isCorrect={isCorrect}
          />
          <div className="flex justify-end">
            <Button
              onClick={handleNext}
              className="bg-brand-500 hover:bg-brand-600 text-white px-8 font-sarabun"
            >
              {currentIndex + 1 >= sessionQuestions.length ? "ดูสรุป" : "ข้อต่อไป →"}
            </Button>
          </div>
        </>
      )}
    </div>
  );
}
