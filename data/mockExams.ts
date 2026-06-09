import type { MockExam } from "@/types";

export const mockExams: MockExam[] = [
  {
    id: "exam001",
    title: "A-Level Math 1 — ชุดจำลอง 1",
    examType: "a-level-math1",
    durationMinutes: 90,
    questionCount: 30,
    difficulty: "hard",
    description:
      "ข้อสอบจำลอง A-Level Math 1 ครอบคลุมทุกหัวข้อ ความยากระดับสอบจริง เหมาะสำหรับการเตรียมสอบขั้นสุดท้าย",
  },
  {
    id: "exam002",
    title: "เตรียมอุดม — คณิตศาสตร์ชุด A",
    examType: "triam-udom",
    durationMinutes: 120,
    questionCount: 50,
    difficulty: "very-hard",
    description:
      "ข้อสอบจำลองเตรียมอุดม รูปแบบเหมือนสอบจริง เน้นโจทย์ประยุกต์และการคิดวิเคราะห์",
  },
  {
    id: "exam003",
    title: "MWIT — คณิตศาสตร์พื้นฐาน",
    examType: "mwit",
    durationMinutes: 60,
    questionCount: 25,
    difficulty: "hard",
    description:
      "ข้อสอบจำลองสำหรับผู้เตรียมสอบ MWIT เน้นหัวข้อที่ออกบ่อยและเทคนิคการแก้โจทย์",
  },
  {
    id: "exam004",
    title: "ทบทวนพื้นฐาน — ม.4 เทอม 1",
    examType: "general",
    durationMinutes: 45,
    questionCount: 20,
    difficulty: "easy",
    description:
      "ข้อสอบทบทวนความรู้พื้นฐานคณิตศาสตร์ ม.4 เทอม 1 เหมาะสำหรับการทดสอบก่อนเรียน",
  },
  {
    id: "exam005",
    title: "KVIS — วิทยาศาสตร์คณิตศาสตร์",
    examType: "kvis",
    durationMinutes: 90,
    questionCount: 35,
    difficulty: "very-hard",
    description:
      "ข้อสอบคณิตศาสตร์สำหรับการคัดเลือก KVIS เน้นการคิดเชิงระบบและโจทย์ความคิดสร้างสรรค์",
  },
];
