import { CheckCircle, XCircle } from "lucide-react";
import MathRenderer from "@/components/shared/MathRenderer";
import { cn } from "@/lib/utils";

type AnswerState = "default" | "selected" | "correct" | "incorrect";

interface AnswerOptionProps {
  label: string;
  text: string;
  state: AnswerState;
  onClick?: () => void;
  disabled?: boolean;
}

const stateStyles: Record<AnswerState, string> = {
  default: "border-gray-200 bg-white hover:border-brand-300 hover:bg-brand-50 cursor-pointer",
  selected: "border-brand-500 bg-brand-50 cursor-pointer",
  correct: "border-emerald-500 bg-emerald-50",
  incorrect: "border-red-400 bg-red-50",
};

export default function AnswerOption({ label, text, state, onClick, disabled }: AnswerOptionProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled || state === "correct" || state === "incorrect"}
      className={cn(
        "w-full rounded-lg border-2 px-4 py-3 text-left transition-all",
        stateStyles[state],
        disabled && state === "default" ? "opacity-50 cursor-not-allowed" : ""
      )}
    >
      <div className="flex items-start gap-3">
        <span
          className={cn(
            "flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-bold",
            state === "selected" ? "bg-brand-500 text-white" :
            state === "correct" ? "bg-emerald-500 text-white" :
            state === "incorrect" ? "bg-red-400 text-white" :
            "bg-gray-100 text-gray-600"
          )}
        >
          {label}
        </span>
        <span className="flex-1 text-sm text-gray-700 leading-relaxed">
          <MathRenderer text={text} />
        </span>
        {state === "correct" && <CheckCircle size={18} className="text-emerald-500 shrink-0 mt-0.5" />}
        {state === "incorrect" && <XCircle size={18} className="text-red-400 shrink-0 mt-0.5" />}
      </div>
    </button>
  );
}
