import { Select, SelectContent, SelectItem, SelectTrigger } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { topics } from "@/data/topics";
import type { Difficulty, ExamType, TopicSlug } from "@/types";
import { EXAM_LABELS, DIFFICULTY_LABELS, TOPIC_LABELS } from "@/lib/constants";

interface PracticeControlsProps {
  selectedTopic: TopicSlug | "all";
  selectedDifficulty: Difficulty | "all";
  selectedExamType: ExamType | "all";
  onTopicChange: (v: TopicSlug | "all") => void;
  onDifficultyChange: (v: Difficulty | "all") => void;
  onExamTypeChange: (v: ExamType | "all") => void;
  onStart: () => void;
  questionCount: number;
}

const DIFFICULTIES: { value: Difficulty | "all"; label: string }[] = [
  { value: "all", label: "ทุกระดับ" },
  { value: "easy", label: DIFFICULTY_LABELS.easy },
  { value: "medium", label: DIFFICULTY_LABELS.medium },
  { value: "hard", label: DIFFICULTY_LABELS.hard },
  { value: "very-hard", label: DIFFICULTY_LABELS["very-hard"] },
];

const EXAM_TYPES: { value: ExamType | "all"; label: string }[] = [
  { value: "all", label: "ทุกการสอบ" },
  { value: "a-level-math1", label: EXAM_LABELS["a-level-math1"] },
  { value: "triam-udom", label: EXAM_LABELS["triam-udom"] },
  { value: "mwit", label: EXAM_LABELS["mwit"] },
  { value: "kvis", label: EXAM_LABELS["kvis"] },
  { value: "general", label: EXAM_LABELS["general"] },
];

const TOPIC_OPTIONS: { value: TopicSlug | "all"; label: string }[] = [
  { value: "all", label: "ทุกหัวข้อ" },
  ...topics.map((t) => ({ value: t.slug as TopicSlug, label: t.nameTh })),
];

function getLabelForValue<T extends string>(
  options: { value: T; label: string }[],
  value: T
): string {
  return options.find((o) => o.value === value)?.label ?? value;
}

export default function PracticeControls({
  selectedTopic,
  selectedDifficulty,
  selectedExamType,
  onTopicChange,
  onDifficultyChange,
  onExamTypeChange,
  onStart,
  questionCount,
}: PracticeControlsProps) {
  return (
    <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm space-y-6">
      <div>
        <h2 className="text-lg font-bold text-gray-900 font-sarabun">ตั้งค่าการฝึก</h2>
        <p className="text-sm text-gray-500 mt-0.5 font-sarabun">เลือกหัวข้อและระดับความยากที่ต้องการฝึก</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <div className="space-y-1.5">
          <label className="text-sm font-medium text-gray-700 font-sarabun">หัวข้อ</label>
          <Select value={selectedTopic} onValueChange={(v) => onTopicChange(v as TopicSlug | "all")}>
            <SelectTrigger className="w-full font-sarabun">
              <span className="text-sm font-sarabun">
                {getLabelForValue(TOPIC_OPTIONS, selectedTopic)}
              </span>
            </SelectTrigger>
            <SelectContent>
              {TOPIC_OPTIONS.map((t) => (
                <SelectItem key={t.value} value={t.value} className="font-sarabun">
                  {t.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-1.5">
          <label className="text-sm font-medium text-gray-700 font-sarabun">ระดับความยาก</label>
          <Select value={selectedDifficulty} onValueChange={(v) => onDifficultyChange(v as Difficulty | "all")}>
            <SelectTrigger className="w-full font-sarabun">
              <span className="text-sm font-sarabun">
                {getLabelForValue(DIFFICULTIES, selectedDifficulty)}
              </span>
            </SelectTrigger>
            <SelectContent>
              {DIFFICULTIES.map((d) => (
                <SelectItem key={d.value} value={d.value} className="font-sarabun">
                  {d.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-1.5">
          <label className="text-sm font-medium text-gray-700 font-sarabun">การสอบ</label>
          <Select value={selectedExamType} onValueChange={(v) => onExamTypeChange(v as ExamType | "all")}>
            <SelectTrigger className="w-full font-sarabun">
              <span className="text-sm font-sarabun">
                {getLabelForValue(EXAM_TYPES, selectedExamType)}
              </span>
            </SelectTrigger>
            <SelectContent>
              {EXAM_TYPES.map((e) => (
                <SelectItem key={e.value} value={e.value} className="font-sarabun">
                  {e.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-500 font-sarabun">
          พบ <span className="font-semibold text-brand-600">{questionCount}</span> ข้อ
        </p>
        <Button
          onClick={onStart}
          disabled={questionCount === 0}
          className="bg-brand-500 hover:bg-brand-600 text-white px-8 font-sarabun"
        >
          เริ่มฝึก
        </Button>
      </div>
    </div>
  );
}
