import { mockExams } from "@/data/mockExams";
import { EXAM_LABELS, DIFFICULTY_LABELS } from "@/lib/constants";
import DifficultyBadge from "@/components/shared/DifficultyBadge";
import ExamBadge from "@/components/shared/ExamBadge";
import { Button } from "@/components/ui/button";
import { Clock, FileText, ChevronRight } from "lucide-react";
import Link from "next/link";
import { userProgress } from "@/data/userProgress";

export default function MockExamsPage() {
  const completedIds = userProgress.mockExamScores.map((s) => s.examId);

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div>
        <h2 className="text-xl font-bold text-gray-900 font-sarabun">สอบจำลอง</h2>
        <p className="text-sm text-gray-500 mt-0.5 font-sarabun">
          ข้อสอบจำลองที่ออกแบบให้ใกล้เคียงกับการสอบจริง
        </p>
      </div>

      <div className="space-y-4">
        {mockExams.map((exam) => {
          const score = userProgress.mockExamScores.find((s) => s.examId === exam.id);
          const isDone = completedIds.includes(exam.id);

          return (
            <div
              key={exam.id}
              className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap gap-2 mb-2">
                    <ExamBadge examType={exam.examType} />
                    <DifficultyBadge difficulty={exam.difficulty} />
                    {isDone && (
                      <span className="inline-flex items-center rounded-full bg-brand-100 px-2.5 py-0.5 text-xs font-medium text-brand-700 font-sarabun">
                        ทำแล้ว — {score?.score}%
                      </span>
                    )}
                  </div>
                  <h3 className="font-semibold text-gray-900 font-sarabun">{exam.title}</h3>
                  <p className="text-sm text-gray-500 mt-1 font-sarabun">{exam.description}</p>
                  <div className="flex gap-4 mt-3">
                    <span className="flex items-center gap-1 text-xs text-gray-400 font-sarabun">
                      <Clock size={12} /> {exam.durationMinutes} นาที
                    </span>
                    <span className="flex items-center gap-1 text-xs text-gray-400 font-sarabun">
                      <FileText size={12} /> {exam.questionCount} ข้อ
                    </span>
                  </div>
                </div>
                <Link href={`/mock-exams/${exam.id}`}>
                  <Button
                    className={
                      isDone
                        ? "bg-gray-100 text-gray-700 hover:bg-gray-200 font-sarabun"
                        : "bg-brand-500 hover:bg-brand-600 text-white font-sarabun"
                    }
                  >
                    {isDone ? "ทำซ้ำ" : "เริ่มสอบ"}
                    <ChevronRight size={16} />
                  </Button>
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
