import type { ExamType } from "@/types";
import { EXAM_LABELS, EXAM_COLORS } from "@/lib/constants";
import { cn } from "@/lib/utils";

interface ExamBadgeProps {
  examType: ExamType;
  className?: string;
}

export default function ExamBadge({ examType, className }: ExamBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium font-sarabun",
        EXAM_COLORS[examType],
        className
      )}
    >
      {EXAM_LABELS[examType]}
    </span>
  );
}
