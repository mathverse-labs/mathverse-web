import { topics } from "@/data/topics";
import { TOPIC_LABELS } from "@/lib/constants";
import type { TopicSlug } from "@/types";
import { BookOpen, Calculator, Triangle, Activity, Dice5, BarChart2, ArrowRight, List, Shapes, Hash } from "lucide-react";

const TOPIC_ICONS: Record<TopicSlug, React.ComponentType<{ size?: number; className?: string }>> = {
  algebra: Calculator,
  functions: Activity,
  trigonometry: Triangle,
  calculus: Activity,
  probability: Dice5,
  statistics: BarChart2,
  vectors: ArrowRight,
  sequences: List,
  geometry: Shapes,
  "number-theory": Hash,
};

const FORMULA_HIGHLIGHTS: Record<TopicSlug, { name: string; formula: string }[]> = {
  algebra: [
    { name: "สูตรกำลังสอง", formula: "ax² + bx + c = 0  →  x = (-b ± √(b²-4ac)) / 2a" },
    { name: "ผลต่างกำลังสอง", formula: "a² - b² = (a+b)(a-b)" },
  ],
  functions: [
    { name: "ฟังก์ชันประกอบ", formula: "(g∘f)(x) = g(f(x))" },
    { name: "ฟังก์ชันผกผัน", formula: "สลับ x และ y แล้วแก้หา y" },
  ],
  trigonometry: [
    { name: "Pythagorean", formula: "sin²θ + cos²θ = 1" },
    { name: "Double angle", formula: "sin 2θ = 2 sin θ cos θ" },
  ],
  calculus: [
    { name: "กฎกำลัง", formula: "d/dx[xⁿ] = nxⁿ⁻¹" },
    { name: "ปริพันธ์กำลัง", formula: "∫xⁿ dx = xⁿ⁺¹/(n+1) + C" },
  ],
  probability: [
    { name: "ความน่าจะเป็น", formula: "P(A) = n(A) / n(S)" },
    { name: "Inclusion-Exclusion", formula: "|A∪B| = |A| + |B| - |A∩B|" },
  ],
  statistics: [
    { name: "ค่าเฉลี่ย", formula: "x̄ = Σxᵢ / n" },
    { name: "ส่วนเบี่ยงเบนมาตรฐาน", formula: "σ = √(Σ(xᵢ - x̄)² / n)" },
  ],
  vectors: [
    { name: "ขนาดเวกเตอร์", formula: "|v| = √(v₁² + v₂²)" },
    { name: "ผลคูณจุด", formula: "a·b = a₁b₁ + a₂b₂" },
  ],
  sequences: [
    { name: "พจน์ที่ n (เลขคณิต)", formula: "aₙ = a₁ + (n-1)d" },
    { name: "ผลรวม n พจน์ (เรขาคณิต)", formula: "Sₙ = a(rⁿ - 1) / (r - 1)" },
  ],
  geometry: [
    { name: "พื้นที่วงกลม", formula: "A = πr²" },
    { name: "ทฤษฎีพีทาโกรัส", formula: "a² + b² = c²" },
  ],
  "number-theory": [
    { name: "การหาร", formula: "a = bq + r  (0 ≤ r < b)" },
    { name: "จำนวนเฉพาะ", formula: "p หารลงตัวเฉพาะ 1 และ p เท่านั้น" },
  ],
};

export default function KnowledgeHubPage() {
  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div>
        <h2 className="text-xl font-bold text-gray-900 font-sarabun">คลังสูตรและทฤษฎี</h2>
        <p className="text-sm text-gray-500 mt-0.5 font-sarabun">
          รวบรวมสูตรสำคัญและทฤษฎีที่ออกสอบบ่อย
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-2">
        {topics.map((topic) => {
          const Icon = TOPIC_ICONS[topic.slug] ?? BookOpen;
          const formulas = FORMULA_HIGHLIGHTS[topic.slug] ?? [];

          return (
            <div
              key={topic.slug}
              className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="rounded-lg bg-brand-50 p-2 text-brand-500">
                  <Icon size={20} />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 font-sarabun">{topic.nameTh}</h3>
                  <p className="text-xs text-gray-400">{topic.nameEn}</p>
                </div>
                <span className="ml-auto text-xs text-gray-400 font-sarabun">
                  {topic.totalQuestions} ข้อ
                </span>
              </div>

              <p className="text-xs text-gray-500 mb-3 font-sarabun">{topic.description}</p>

              <div className="space-y-2">
                {formulas.map((f, i) => (
                  <div key={i} className="rounded-lg bg-gray-50 border border-gray-100 p-2.5">
                    <p className="text-xs font-semibold text-gray-600 font-sarabun mb-1">{f.name}</p>
                    <code className="text-xs text-brand-700 font-mono">{f.formula}</code>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
