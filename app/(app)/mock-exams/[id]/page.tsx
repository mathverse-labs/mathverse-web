"use client";

import { useState, useCallback } from "react";
import { use } from "react";
import { mockExams } from "@/data/mockExams";
import { questions } from "@/data/questions";
import ExamTimer from "@/components/mock-exams/ExamTimer";
import QuestionNavigator from "@/components/mock-exams/QuestionNavigator";
import QuestionCard from "@/components/practice/QuestionCard";
import { Button } from "@/components/ui/button";
import { Flag, ChevronLeft, ChevronRight, CheckCircle } from "lucide-react";
import { DIFFICULTY_LABELS, EXAM_LABELS } from "@/lib/constants";
import DifficultyBadge from "@/components/shared/DifficultyBadge";
import ExamBadge from "@/components/shared/ExamBadge";
import { Clock, FileText } from "lucide-react";

type ExamState = "ready" | "in-progress" | "complete";

export default function ExamPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const exam = mockExams.find((e) => e.id === id);

  const examQuestions = questions.slice(0, exam?.questionCount ?? 10);

  const [state, setState] = useState<ExamState>("ready");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<(string | null)[]>(
    Array(examQuestions.length).fill(null)
  );
  const [flagged, setFlagged] = useState<boolean[]>(
    Array(examQuestions.length).fill(false)
  );

  const handleTimeUp = useCallback(() => setState("complete"), []);

  if (!exam) {
    return (
      <div className="text-center py-16 font-sarabun text-gray-500">
        ไม่พบข้อสอบนี้
      </div>
    );
  }

  if (state === "ready") {
    return (
      <div className="max-w-lg mx-auto">
        <div className="rounded-xl border border-gray-100 bg-white p-8 shadow-sm space-y-5">
          <div className="flex flex-wrap gap-2">
            <ExamBadge examType={exam.examType} />
            <DifficultyBadge difficulty={exam.difficulty} />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 font-sarabun">{exam.title}</h1>
          <p className="text-gray-500 text-sm font-sarabun">{exam.description}</p>

          <div className="grid grid-cols-2 gap-4 rounded-lg bg-gray-50 p-4">
            <div className="flex items-center gap-2 text-sm font-sarabun">
              <Clock size={16} className="text-brand-500" />
              <span className="text-gray-600">เวลา: <strong>{exam.durationMinutes} นาที</strong></span>
            </div>
            <div className="flex items-center gap-2 text-sm font-sarabun">
              <FileText size={16} className="text-brand-500" />
              <span className="text-gray-600">จำนวน: <strong>{examQuestions.length} ข้อ</strong></span>
            </div>
          </div>

          <ul className="text-sm text-gray-500 space-y-1 font-sarabun list-disc list-inside">
            <li>ตอบทุกข้อให้ครบก่อนส่งข้อสอบ</li>
            <li>กดปุ่ม "ตั้งธง" เพื่อทำเครื่องหมายข้อที่ต้องการกลับมาตรวจ</li>
            <li>เวลาจะนับถอยหลังโดยอัตโนมัติ</li>
          </ul>

          <Button
            className="w-full bg-brand-500 hover:bg-brand-600 text-white text-base font-sarabun"
            onClick={() => setState("in-progress")}
          >
            เริ่มสอบ
          </Button>
        </div>
      </div>
    );
  }

  if (state === "complete") {
    const answered = answers.filter((a) => a !== null);
    const correct = examQuestions.filter(
      (q, i) => answers[i] === q.correctAnswer
    ).length;
    const score = Math.round((correct / examQuestions.length) * 100);

    return (
      <div className="max-w-lg mx-auto">
        <div className="rounded-xl border border-gray-100 bg-white p-8 shadow-sm text-center space-y-4">
          <div className="flex justify-center">
            <div className="rounded-full bg-brand-100 p-4">
              <CheckCircle size={40} className="text-brand-600" />
            </div>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 font-sarabun">ผลการสอบ</h2>
          <p className="text-gray-500 text-sm font-sarabun">{exam.title}</p>

          <div className="grid grid-cols-3 gap-4 py-4">
            <div>
              <p className="text-3xl font-bold text-brand-600">{score}%</p>
              <p className="text-xs text-gray-500 font-sarabun mt-1">คะแนน</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-emerald-600">{correct}</p>
              <p className="text-xs text-gray-500 font-sarabun mt-1">ถูกต้อง</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-gray-700">{examQuestions.length}</p>
              <p className="text-xs text-gray-500 font-sarabun mt-1">ทั้งหมด</p>
            </div>
          </div>

          <Button
            className="w-full bg-brand-500 hover:bg-brand-600 text-white font-sarabun"
            onClick={() => {
              setState("ready");
              setAnswers(Array(examQuestions.length).fill(null));
              setFlagged(Array(examQuestions.length).fill(false));
              setCurrentIndex(0);
            }}
          >
            ทำซ้ำ
          </Button>
        </div>
      </div>
    );
  }

  const currentQ = examQuestions[currentIndex];

  return (
    <div className="max-w-5xl mx-auto">
      {/* Exam top bar */}
      <div className="sticky top-0 z-10 mb-4 flex items-center justify-between gap-3 rounded-xl border border-gray-100 bg-white p-3 shadow-sm">
        <p className="font-semibold text-gray-800 text-sm font-sarabun truncate">{exam.title}</p>
        <div className="flex items-center gap-2">
          <ExamTimer
            durationSeconds={exam.durationMinutes * 60}
            onTimeUp={handleTimeUp}
          />
          <Button
            size="sm"
            className="bg-brand-500 hover:bg-brand-600 text-white font-sarabun"
            onClick={() => setState("complete")}
          >
            ส่งข้อสอบ
          </Button>
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        {/* Question area */}
        <div className="lg:col-span-2 space-y-4">
          <QuestionCard
            question={currentQ}
            selectedAnswer={answers[currentIndex]}
            isSubmitted={false}
            onSelectAnswer={(label) => {
              const updated = [...answers];
              updated[currentIndex] = label;
              setAnswers(updated);
            }}
          />

          {/* Controls */}
          <div className="flex items-center justify-between">
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentIndex((i) => Math.max(0, i - 1))}
                disabled={currentIndex === 0}
                className="font-sarabun gap-1"
              >
                <ChevronLeft size={16} /> ก่อนหน้า
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  const updated = [...flagged];
                  updated[currentIndex] = !updated[currentIndex];
                  setFlagged(updated);
                }}
                className={`font-sarabun gap-1 ${flagged[currentIndex] ? "border-amber-400 text-amber-600" : ""}`}
              >
                <Flag size={14} /> ตั้งธง
              </Button>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentIndex((i) => Math.min(examQuestions.length - 1, i + 1))}
              disabled={currentIndex === examQuestions.length - 1}
              className="font-sarabun gap-1"
            >
              ถัดไป <ChevronRight size={16} />
            </Button>
          </div>
        </div>

        {/* Navigator */}
        <div className="lg:sticky lg:top-20">
          <QuestionNavigator
            total={examQuestions.length}
            current={currentIndex}
            answers={answers}
            flagged={flagged}
            onJump={setCurrentIndex}
          />
        </div>
      </div>
    </div>
  );
}
