import { cn } from "@/lib/utils";
import { Flag } from "lucide-react";

interface QuestionNavigatorProps {
  total: number;
  current: number;
  answers: (string | null)[];
  flagged: boolean[];
  onJump: (index: number) => void;
}

export default function QuestionNavigator({
  total,
  current,
  answers,
  flagged,
  onJump,
}: QuestionNavigatorProps) {
  return (
    <div className="rounded-xl border border-gray-100 bg-white p-4 shadow-sm">
      <h4 className="text-sm font-semibold text-gray-700 mb-3 font-sarabun">นำทางข้อสอบ</h4>
      <div className="grid grid-cols-5 gap-1.5">
        {Array.from({ length: total }, (_, i) => {
          const isAnswered = answers[i] !== null;
          const isCurrent = i === current;
          const isFlagged = flagged[i];
          return (
            <button
              key={i}
              onClick={() => onJump(i)}
              className={cn(
                "relative flex h-8 w-full items-center justify-center rounded text-xs font-medium transition-colors",
                isCurrent
                  ? "bg-brand-500 text-white"
                  : isAnswered
                  ? "bg-emerald-100 text-emerald-700"
                  : "bg-gray-100 text-gray-500 hover:bg-gray-200"
              )}
            >
              {i + 1}
              {isFlagged && (
                <Flag
                  size={8}
                  className="absolute top-0.5 right-0.5 text-amber-500"
                  fill="currentColor"
                />
              )}
            </button>
          );
        })}
      </div>
      <div className="mt-3 flex flex-wrap gap-2 text-xs font-sarabun">
        <span className="flex items-center gap-1">
          <span className="h-2.5 w-2.5 rounded-sm bg-brand-500" /> กำลังทำ
        </span>
        <span className="flex items-center gap-1">
          <span className="h-2.5 w-2.5 rounded-sm bg-emerald-100" /> ตอบแล้ว
        </span>
        <span className="flex items-center gap-1">
          <span className="h-2.5 w-2.5 rounded-sm bg-gray-100" /> ยังไม่ได้ตอบ
        </span>
      </div>
    </div>
  );
}
