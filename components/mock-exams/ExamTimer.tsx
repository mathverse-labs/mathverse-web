"use client";

import { useEffect, useState } from "react";
import { Clock } from "lucide-react";
import { formatTime } from "@/lib/formatters";
import { cn } from "@/lib/utils";

interface ExamTimerProps {
  durationSeconds: number;
  onTimeUp: () => void;
}

export default function ExamTimer({ durationSeconds, onTimeUp }: ExamTimerProps) {
  const [remaining, setRemaining] = useState(durationSeconds);

  useEffect(() => {
    if (remaining <= 0) {
      onTimeUp();
      return;
    }
    const id = setInterval(() => setRemaining((r) => r - 1), 1000);
    return () => clearInterval(id);
  }, [remaining, onTimeUp]);

  const isLow = remaining < 300;

  return (
    <div
      className={cn(
        "flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm font-bold font-mono",
        isLow
          ? "bg-red-100 text-red-600 animate-pulse"
          : "bg-gray-100 text-gray-700"
      )}
    >
      <Clock size={14} />
      {formatTime(remaining)}
    </div>
  );
}
