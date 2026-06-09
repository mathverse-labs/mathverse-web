"use client";

import { useState, useMemo } from "react";
import { questions } from "@/data/questions";
import { TOPIC_LABELS, DIFFICULTY_LABELS, EXAM_LABELS } from "@/lib/constants";
import DifficultyBadge from "@/components/shared/DifficultyBadge";
import ExamBadge from "@/components/shared/ExamBadge";
import MathRenderer from "@/components/shared/MathRenderer";
import type { Difficulty, ExamType, TopicSlug } from "@/types";
import { Select, SelectContent, SelectItem, SelectTrigger } from "@/components/ui/select";
import { topics } from "@/data/topics";
import { ChevronDown, ChevronUp } from "lucide-react";

const incorrectQuestionIds = ["q002", "q005", "q007", "q014", "q018"];
const incorrectQuestions = questions.filter((q) =>
  incorrectQuestionIds.includes(q.id)
);

export default function ReviewPage() {
  const [filterTopic, setFilterTopic] = useState<TopicSlug | "all">("all");
  const [filterDifficulty, setFilterDifficulty] = useState<Difficulty | "all">("all");
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const filtered = useMemo(() => {
    return incorrectQuestions.filter((q) => {
      if (filterTopic !== "all" && q.topic !== filterTopic) return false;
      if (filterDifficulty !== "all" && q.difficulty !== filterDifficulty) return false;
      return true;
    });
  }, [filterTopic, filterDifficulty]);

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Filters */}
      <div className="rounded-xl border border-gray-100 bg-white p-4 shadow-sm flex flex-wrap gap-3 items-center">
        <p className="text-sm font-medium text-gray-700 font-sarabun">กรอง:</p>
        <Select value={filterTopic} onValueChange={(v) => setFilterTopic(v as TopicSlug | "all")}>
          <SelectTrigger className="w-40 font-sarabun">
            <span className="text-sm font-sarabun">
              {filterTopic === "all" ? "ทุกหัวข้อ" : TOPIC_LABELS[filterTopic as TopicSlug]}
            </span>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all" className="font-sarabun">ทุกหัวข้อ</SelectItem>
            {topics.map((t) => (
              <SelectItem key={t.slug} value={t.slug} className="font-sarabun">
                {t.nameTh}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={filterDifficulty} onValueChange={(v) => setFilterDifficulty(v as Difficulty | "all")}>
          <SelectTrigger className="w-40 font-sarabun">
            <span className="text-sm font-sarabun">
              {filterDifficulty === "all" ? "ทุกระดับ" : DIFFICULTY_LABELS[filterDifficulty as Difficulty]}
            </span>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all" className="font-sarabun">ทุกระดับ</SelectItem>
            {(["easy", "medium", "hard", "very-hard"] as Difficulty[]).map((d) => (
              <SelectItem key={d} value={d} className="font-sarabun">
                {DIFFICULTY_LABELS[d]}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <p className="ml-auto text-sm text-gray-500 font-sarabun">
          {filtered.length} ข้อ
        </p>
      </div>

      {/* Question list */}
      <div className="space-y-3">
        {filtered.map((q) => {
          const isExpanded = expandedId === q.id;
          return (
            <div key={q.id} className="rounded-xl border border-gray-100 bg-white shadow-sm overflow-hidden">
              <button
                className="w-full p-4 text-left"
                onClick={() => setExpandedId(isExpanded ? null : q.id)}
              >
                <div className="flex items-start gap-3">
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap gap-1.5 mb-2">
                      <span className="text-xs text-gray-500 font-sarabun">{TOPIC_LABELS[q.topic]}</span>
                      <DifficultyBadge difficulty={q.difficulty} />
                      <ExamBadge examType={q.examType} />
                    </div>
                    <div className="text-sm text-gray-800 line-clamp-2 font-sarabun">
                      <MathRenderer text={q.questionText} />
                    </div>
                  </div>
                  {isExpanded ? (
                    <ChevronUp size={16} className="text-gray-400 shrink-0 mt-0.5" />
                  ) : (
                    <ChevronDown size={16} className="text-gray-400 shrink-0 mt-0.5" />
                  )}
                </div>
              </button>

              {isExpanded && (
                <div className="border-t border-gray-100 p-4 space-y-3 bg-gray-50">
                  {/* Choices */}
                  <div className="space-y-1.5">
                    {q.choices.map((c) => (
                      <div
                        key={c.label}
                        className={`flex gap-2 rounded-lg p-2 text-sm font-sarabun ${
                          c.label === q.correctAnswer
                            ? "bg-emerald-50 text-emerald-700 font-medium"
                            : "text-gray-600"
                        }`}
                      >
                        <span className="font-bold shrink-0">{c.label}.</span>
                        <MathRenderer text={c.text} />
                      </div>
                    ))}
                  </div>

                  {/* Explanation */}
                  <div className="rounded-lg bg-white border border-gray-100 p-3">
                    <p className="text-xs font-semibold text-gray-500 mb-1 font-sarabun">เฉลย</p>
                    <div className="text-sm text-gray-700 font-sarabun">
                      <MathRenderer text={q.explanation} />
                    </div>
                  </div>

                  {q.formulaNotes && (
                    <div className="rounded-lg bg-amber-50 border border-amber-100 p-3 text-sm text-amber-800 font-sarabun">
                      <span className="font-semibold">สูตร: </span>
                      <MathRenderer text={q.formulaNotes} />
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}

        {filtered.length === 0 && (
          <div className="text-center py-16 text-gray-400 font-sarabun">
            ไม่พบโจทย์ที่ตรงกับตัวกรองที่เลือก
          </div>
        )}
      </div>
    </div>
  );
}
