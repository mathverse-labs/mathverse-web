"use client";

import { useState } from "react";
import { CheckCircle, XCircle, Lightbulb, Sparkles } from "lucide-react";
import MathRenderer from "@/components/shared/MathRenderer";
import { Button } from "@/components/ui/button";
import type { Question } from "@/types";

interface ExplanationPanelProps {
  question: Question;
  selectedAnswer: string | null;
  isCorrect: boolean;
}

export default function ExplanationPanel({
  question,
  selectedAnswer,
  isCorrect,
}: ExplanationPanelProps) {
  const [aiState, setAiState] = useState<"idle" | "loading" | "done">("idle");
  const [aiMessage, setAiMessage] = useState("");

  const triggerAi = (msg: string) => {
    setAiState("loading");
    setTimeout(() => {
      setAiState("done");
      setAiMessage(msg);
    }, 1500);
  };

  return (
    <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm space-y-4">
      {/* Verdict */}
      <div
        className={`flex items-center gap-3 rounded-lg p-3 ${
          isCorrect ? "bg-emerald-50 border border-emerald-100" : "bg-red-50 border border-red-100"
        }`}
      >
        {isCorrect ? (
          <CheckCircle size={20} className="text-emerald-600 shrink-0" />
        ) : (
          <XCircle size={20} className="text-red-500 shrink-0" />
        )}
        <div>
          <p className={`font-semibold text-sm font-sarabun ${isCorrect ? "text-emerald-700" : "text-red-600"}`}>
            {isCorrect ? "ถูกต้อง! 🎉" : "ยังไม่ถูก"}
          </p>
          {!isCorrect && (
            <p className="text-xs text-gray-600 font-sarabun">
              คำตอบที่ถูก: <strong>{question.correctAnswer}</strong>{" "}
              (คุณเลือก: {selectedAnswer ?? "ไม่ได้เลือก"})
            </p>
          )}
        </div>
      </div>

      {/* Explanation */}
      <div>
        <h4 className="text-sm font-semibold text-gray-700 mb-2 font-sarabun">เฉลยและวิธีทำ</h4>
        <div className="text-sm text-gray-700 leading-relaxed font-sarabun">
          <MathRenderer text={question.explanation} />
        </div>
      </div>

      {/* Formula notes */}
      {question.formulaNotes && (
        <div className="rounded-lg bg-amber-50 border border-amber-100 p-3 flex gap-2">
          <Lightbulb size={16} className="text-amber-500 shrink-0 mt-0.5" />
          <div className="text-sm text-amber-800 font-sarabun">
            <span className="font-semibold">สูตรที่ใช้: </span>
            <MathRenderer text={question.formulaNotes} />
          </div>
        </div>
      )}

      {/* AI panel */}
      <div className="rounded-lg border border-gray-100 p-4 space-y-2">
        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">AI ช่วยอธิบาย</p>
        {aiState === "loading" && (
          <div className="flex items-center gap-2 text-sm text-gray-500 font-sarabun">
            <div className="h-4 w-4 animate-spin rounded-full border-2 border-brand-500 border-t-transparent" />
            AI กำลังวิเคราะห์...
          </div>
        )}
        {aiState === "done" && (
          <div className="rounded-lg bg-brand-50 border border-brand-100 p-3 text-sm text-brand-700 font-sarabun">
            {aiMessage}
          </div>
        )}
        {aiState === "idle" && (
          <div className="flex gap-2 flex-wrap">
            <Button
              size="sm"
              variant="outline"
              className="text-brand-600 border-brand-200 hover:bg-brand-50 font-sarabun"
              onClick={() =>
                triggerAi(
                  "AI จะอธิบายวิธีทำแบบทีละขั้นตอน — ฟีเจอร์นี้จะพร้อมใช้เร็วๆ นี้"
                )
              }
            >
              💡 ถาม AI
            </Button>
            <Button
              size="sm"
              variant="outline"
              className="text-brand-600 border-brand-200 hover:bg-brand-50 font-sarabun"
              onClick={() =>
                triggerAi(
                  "กำลังสร้างโจทย์คล้ายกัน — ฟีเจอร์นี้จะพร้อมใช้เร็วๆ นี้"
                )
              }
            >
              <Sparkles size={14} className="mr-1" />
              สร้างโจทย์คล้ายกัน
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
