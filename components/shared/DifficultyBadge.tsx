import type { Difficulty } from "@/types";
import { DIFFICULTY_LABELS, DIFFICULTY_COLORS } from "@/lib/constants";
import { cn } from "@/lib/utils";

interface DifficultyBadgeProps {
  difficulty: Difficulty;
  className?: string;
}

export default function DifficultyBadge({ difficulty, className }: DifficultyBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium font-sarabun",
        DIFFICULTY_COLORS[difficulty],
        className
      )}
    >
      {DIFFICULTY_LABELS[difficulty]}
    </span>
  );
}
