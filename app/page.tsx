import Link from "next/link";
import { Button } from "@/components/ui/button";
import { questions } from "@/data/questions";
import {
  Brain,
  BarChart2,
  Zap,
  Target,
  BookOpen,
  Clock,
  Check,
  X,
  ChevronRight,
  Crown,
} from "lucide-react";
import MathRenderer from "@/components/shared/MathRenderer";
import DifficultyBadge from "@/components/shared/DifficultyBadge";
import ExamBadge from "@/components/shared/ExamBadge";

const FEATURES = [
  {
    icon: Brain,
    title: "AI อธิบายขั้นตอน",
    desc: "ให้ AI อธิบายวิธีทำแบบทีละขั้น เข้าใจง่าย เหมือนมีติวเตอร์ส่วนตัว",
  },
  {
    icon: Target,
    title: "Adaptive Learning",
    desc: "ระบบวิเคราะห์จุดอ่อนและแนะนำโจทย์ที่เหมาะกับระดับของคุณโดยอัตโนมัติ",
  },
  {
    icon: BarChart2,
    title: "วิเคราะห์เชิงลึก",
    desc: "ติดตามความก้าวหน้า วิเคราะห์ความแม่นยำแต่ละหัวข้อ และดูพัฒนาการแบบกราฟ",
  },
  {
    icon: BookOpen,
    title: "คลังโจทย์คุณภาพ",
    desc: "โจทย์กว่า 400 ข้อ ครอบคลุมทุกหัวข้อ พร้อมเฉลยและสูตรสำคัญ",
  },
  {
    icon: Clock,
    title: "สอบจำลองเหมือนจริง",
    desc: "สอบจำลองรูปแบบเหมือนสอบจริง พร้อมจับเวลาและวิเคราะห์ผลทันที",
  },
  {
    icon: Zap,
    title: "ฝึกทุกที่ทุกเวลา",
    desc: "ใช้งานผ่านเว็บเบราว์เซอร์ รองรับมือถือ แท็บเล็ต และคอมพิวเตอร์",
  },
];

const EXAM_CATEGORIES = [
  { label: "A-Level Math 1", color: "bg-brand-100 text-brand-700 border-brand-200" },
  { label: "เตรียมอุดม", color: "bg-violet-100 text-violet-700 border-violet-200" },
  { label: "MWIT", color: "bg-cyan-100 text-cyan-700 border-cyan-200" },
  { label: "KVIS", color: "bg-emerald-100 text-emerald-700 border-emerald-200" },
  { label: "ม.ปลายทั่วไป", color: "bg-gray-100 text-gray-700 border-gray-200" },
];

const PRICING_SUMMARY = [
  {
    name: "ฟรี",
    price: "ฟรี",
    features: ["10 ข้อ/วัน", "คลังสูตร", "วิเคราะห์พื้นฐาน"],
    featured: false,
    cta: "เริ่มเลย",
  },
  {
    name: "Pro รายเดือน",
    price: "฿299/เดือน",
    features: ["ไม่จำกัดโจทย์", "AI อธิบาย", "สอบจำลอง", "วิเคราะห์เต็มรูปแบบ"],
    featured: false,
    cta: "สมัคร Pro",
  },
  {
    name: "Pro รายปี",
    price: "฿2,490/ปี",
    features: ["ทุกอย่างใน Pro", "Priority Support", "ประหยัด 31%"],
    featured: true,
    badge: "ดีที่สุด",
    cta: "สมัคร Pro รายปี",
  },
];

const demoQuestion = questions[0];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Nav */}
      <nav className="sticky top-0 z-50 border-b border-gray-100 bg-white/95 backdrop-blur-sm">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-brand-500 flex items-center justify-center">
              <span className="text-sm font-bold text-white">M</span>
            </div>
            <span className="text-lg font-bold text-gray-900">MathVerse</span>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/login">
              <Button variant="ghost" className="font-sarabun text-gray-600">
                เข้าสู่ระบบ
              </Button>
            </Link>
            <Link href="/signup">
              <Button className="bg-brand-500 hover:bg-brand-600 text-white font-sarabun">
                ลองฟรี
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* 1. Hero */}
      <section className="relative overflow-hidden py-20 px-4">
        <div
          className="absolute inset-0 -z-10"
          style={{
            background:
              "radial-gradient(ellipse 80% 50% at 50% -10%, #eef2ff 0%, transparent 70%)",
          }}
        />
        <div className="mx-auto max-w-4xl text-center space-y-6">
          <div className="inline-flex items-center gap-1.5 rounded-full border border-brand-200 bg-brand-50 px-3 py-1 text-xs font-medium text-brand-600 font-sarabun">
            <Zap size={12} />
            AI-Powered สำหรับนักเรียนไทย
          </div>
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl font-sarabun">
            เตรียมสอบคณิตศาสตร์
            <span className="block text-brand-500 mt-1">อย่างชาญฉลาดด้วย AI</span>
          </h1>
          <p className="mx-auto max-w-xl text-lg text-gray-600 font-sarabun">
            แพลตฟอร์มฝึกโจทย์ที่ออกแบบสำหรับ A-Level, เตรียมอุดม, MWIT และ KVIS
            พร้อม AI วิเคราะห์จุดอ่อนและแนะนำแผนการเรียนส่วนตัว
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link href="/signup">
              <Button className="bg-brand-500 hover:bg-brand-600 text-white px-8 py-6 text-base font-sarabun gap-2">
                เริ่มใช้งานฟรี <ChevronRight size={18} />
              </Button>
            </Link>
            <Link href="/dashboard">
              <Button variant="outline" className="px-8 py-6 text-base font-sarabun border-gray-200 text-gray-600">
                ดูตัวอย่าง Dashboard
              </Button>
            </Link>
          </div>
          <p className="text-xs text-gray-400 font-sarabun">ไม่ต้องใช้บัตรเครดิต · ใช้งานได้ทันที</p>
        </div>
      </section>

      {/* 2. Feature Grid */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="mx-auto max-w-5xl">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold text-gray-900 font-sarabun">
              ทุกสิ่งที่คุณต้องการเพื่อพิชิตการสอบ
            </h2>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {FEATURES.map((f, i) => {
              const Icon = f.icon;
              return (
                <div key={i} className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm">
                  <div className="mb-3 inline-flex rounded-lg bg-brand-50 p-2.5 text-brand-500">
                    <Icon size={22} />
                  </div>
                  <h3 className="font-semibold text-gray-800 mb-1 font-sarabun">{f.title}</h3>
                  <p className="text-sm text-gray-500 font-sarabun">{f.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3. Exam Categories */}
      <section className="py-14 px-4">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-8 font-sarabun">
            ครอบคลุมทุกการสอบที่สำคัญ
          </h2>
          <div className="flex flex-wrap justify-center gap-3">
            {EXAM_CATEGORIES.map((cat) => (
              <span
                key={cat.label}
                className={`rounded-full border px-5 py-2.5 text-sm font-semibold font-sarabun ${cat.color}`}
              >
                {cat.label}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Sample Question Preview */}
      <section className="py-14 px-4 bg-gray-50">
        <div className="mx-auto max-w-2xl">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-8 font-sarabun">
            ลองดูตัวอย่างโจทย์จริง
          </h2>
          <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm space-y-4">
            <div className="flex flex-wrap gap-2">
              <ExamBadge examType={demoQuestion.examType} />
              <DifficultyBadge difficulty={demoQuestion.difficulty} />
            </div>
            <div className="text-base font-medium text-gray-800 leading-relaxed font-sarabun">
              <MathRenderer text={demoQuestion.questionText} />
            </div>
            <div className="space-y-2.5">
              {demoQuestion.choices.map((c) => (
                <div
                  key={c.label}
                  className={`flex items-start gap-3 rounded-lg border-2 px-4 py-3 ${
                    c.label === demoQuestion.correctAnswer
                      ? "border-emerald-400 bg-emerald-50"
                      : "border-gray-100 bg-gray-50"
                  }`}
                >
                  <span
                    className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-bold ${
                      c.label === demoQuestion.correctAnswer
                        ? "bg-emerald-500 text-white"
                        : "bg-gray-200 text-gray-500"
                    }`}
                  >
                    {c.label}
                  </span>
                  <span className="text-sm text-gray-700">
                    <MathRenderer text={c.text} />
                  </span>
                  {c.label === demoQuestion.correctAnswer && (
                    <Check size={16} className="text-emerald-500 ml-auto shrink-0 mt-0.5" />
                  )}
                </div>
              ))}
            </div>
            <div className="rounded-lg bg-brand-50 border border-brand-100 p-3">
              <p className="text-xs font-semibold text-brand-600 mb-1 font-sarabun">เฉลย</p>
              <div className="text-sm text-gray-700 font-sarabun">
                <MathRenderer text={demoQuestion.explanation} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Analytics Preview (static mockup) */}
      <section className="py-14 px-4">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-8 font-sarabun">
            วิเคราะห์ผลเชิงลึก เข้าใจจุดอ่อนได้ชัดเจน
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-6">
            {[
              { label: "ความแม่นยำโดยรวม", value: "67%" },
              { label: "คะแนนพร้อมสอบ", value: "72/100" },
              { label: "โจทย์ที่ทำ", value: "284" },
              { label: "สตรีคต่อเนื่อง", value: "7 วัน" },
            ].map((s) => (
              <div key={s.label} className="rounded-xl border border-gray-100 bg-white p-4 shadow-sm text-center">
                <p className="text-2xl font-bold text-brand-600">{s.value}</p>
                <p className="text-xs text-gray-500 mt-1 font-sarabun">{s.label}</p>
              </div>
            ))}
          </div>
          <div className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm">
            <h4 className="font-semibold text-gray-700 mb-4 font-sarabun">ความแม่นยำแต่ละหัวข้อ</h4>
            <div className="space-y-2.5">
              {[
                { topic: "พีชคณิต", acc: 82, color: "bg-emerald-400" },
                { topic: "ฟังก์ชัน", acc: 78, color: "bg-emerald-400" },
                { topic: "สถิติ", acc: 71, color: "bg-amber-400" },
                { topic: "แคลคูลัส", acc: 58, color: "bg-amber-400" },
                { topic: "ความน่าจะเป็น", acc: 52, color: "bg-red-400" },
                { topic: "ตรีโกณมิติ", acc: 45, color: "bg-red-400" },
              ].map((row) => (
                <div key={row.topic} className="flex items-center gap-3">
                  <span className="w-32 text-sm text-gray-600 font-sarabun shrink-0">{row.topic}</span>
                  <div className="flex-1 h-2 rounded-full bg-gray-100">
                    <div
                      className={`h-full rounded-full ${row.color}`}
                      style={{ width: `${row.acc}%` }}
                    />
                  </div>
                  <span className="w-8 text-right text-xs font-medium text-gray-600 font-sarabun">{row.acc}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 6. Pricing Preview */}
      <section className="py-14 px-4 bg-gray-50">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-8 font-sarabun">
            ราคาที่เข้าถึงได้
          </h2>
          <div className="grid gap-4 sm:grid-cols-3">
            {PRICING_SUMMARY.map((plan) => (
              <div
                key={plan.name}
                className={`rounded-2xl border p-6 flex flex-col bg-white ${
                  plan.featured ? "ring-2 ring-brand-500 border-brand-200 shadow-lg" : "border-gray-100 shadow-sm"
                }`}
              >
                {plan.featured && plan.badge && (
                  <span className="mb-3 inline-flex w-fit items-center gap-1 rounded-full bg-brand-500 px-2.5 py-0.5 text-xs font-semibold text-white font-sarabun">
                    <Crown size={10} /> {plan.badge}
                  </span>
                )}
                <h3 className="font-semibold text-gray-800 font-sarabun">{plan.name}</h3>
                <p className="text-xl font-bold text-gray-900 mt-1 mb-4">{plan.price}</p>
                <ul className="flex-1 space-y-2 mb-5">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm text-gray-600 font-sarabun">
                      <Check size={14} className="text-emerald-500 shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
                <Link href="/signup">
                  <Button
                    className={`w-full font-sarabun ${
                      plan.featured
                        ? "bg-brand-500 hover:bg-brand-600 text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    {plan.cta}
                  </Button>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Footer */}
      <footer className="border-t border-gray-100 py-10 px-4">
        <div className="mx-auto max-w-5xl flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="h-7 w-7 rounded-lg bg-brand-500 flex items-center justify-center">
              <span className="text-xs font-bold text-white">M</span>
            </div>
            <span className="font-bold text-gray-800">MathVerse</span>
          </div>
          <div className="flex gap-6 text-sm text-gray-500 font-sarabun">
            <Link href="/pricing" className="hover:text-gray-800">แผนสมาชิก</Link>
            <Link href="/login" className="hover:text-gray-800">เข้าสู่ระบบ</Link>
            <Link href="/signup" className="hover:text-gray-800">สมัครสมาชิก</Link>
          </div>
          <p className="text-xs text-gray-400 font-sarabun">
            © 2026 MathVerse. สงวนลิขสิทธิ์
          </p>
        </div>
      </footer>
    </div>
  );
}
