import type { Difficulty, ExamType, TopicSlug } from "@/types";

export const DIFFICULTY_LABELS: Record<Difficulty, string> = {
  easy: "ง่าย",
  medium: "ปานกลาง",
  hard: "ยาก",
  "very-hard": "ยากมาก",
};

export const DIFFICULTY_COLORS: Record<Difficulty, string> = {
  easy: "bg-emerald-100 text-emerald-700",
  medium: "bg-amber-100 text-amber-700",
  hard: "bg-orange-100 text-orange-700",
  "very-hard": "bg-red-100 text-red-700",
};

export const EXAM_LABELS: Record<ExamType, string> = {
  "a-level-math1": "A-Level Math 1",
  "triam-udom": "เตรียมอุดม",
  mwit: "MWIT",
  kvis: "KVIS",
  general: "ทั่วไป",
};

export const EXAM_COLORS: Record<ExamType, string> = {
  "a-level-math1": "bg-brand-100 text-brand-700",
  "triam-udom": "bg-violet-100 text-violet-700",
  mwit: "bg-cyan-100 text-cyan-700",
  kvis: "bg-emerald-100 text-emerald-700",
  general: "bg-gray-100 text-gray-700",
};

export const TOPIC_LABELS: Record<TopicSlug, string> = {
  algebra: "พีชคณิต",
  functions: "ฟังก์ชัน",
  trigonometry: "ตรีโกณมิติ",
  calculus: "แคลคูลัส",
  probability: "ความน่าจะเป็น",
  statistics: "สถิติ",
  vectors: "เวกเตอร์",
  sequences: "ลำดับและอนุกรม",
  geometry: "เรขาคณิต",
  "number-theory": "ทฤษฎีจำนวน",
};

export const NAV_ITEMS = [
  { href: "/dashboard", labelTh: "หน้าหลัก", icon: "LayoutDashboard" },
  { href: "/practice", labelTh: "ฝึกทำโจทย์", icon: "PenLine" },
  { href: "/mock-exams", labelTh: "สอบจำลอง", icon: "ClipboardList" },
  { href: "/analytics", labelTh: "วิเคราะห์ผล", icon: "BarChart2" },
  { href: "/review", labelTh: "ทบทวนโจทย์", icon: "Search" },
  { href: "/knowledge-hub", labelTh: "คลังสูตร", icon: "BookOpen" },
  { href: "/pricing", labelTh: "แผนสมาชิก", icon: "Crown" },
] as const;
