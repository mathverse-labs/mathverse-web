import { Check, X, Crown, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const plans = [
  {
    id: "free",
    name: "ฟรี",
    price: "ฟรี",
    priceSub: "ตลอดไป",
    description: "เหมาะสำหรับการทดลองใช้",
    cta: "เริ่มใช้ฟรี",
    ctaHref: "/signup",
    featured: false,
    features: [
      { label: "โจทย์ต่อวัน", value: "10 ข้อ" },
      { label: "สอบจำลอง", value: false },
      { label: "AI อธิบาย", value: false },
      { label: "วิเคราะห์ผล", value: "พื้นฐาน" },
      { label: "ทบทวนโจทย์", value: true },
      { label: "คลังสูตร", value: true },
      { label: "Support", value: false },
    ],
  },
  {
    id: "pro-monthly",
    name: "Pro รายเดือน",
    price: "฿299",
    priceSub: "ต่อเดือน",
    description: "ครบทุกฟีเจอร์ สำหรับผู้เตรียมสอบจริงจัง",
    cta: "สมัคร Pro",
    ctaHref: "/signup",
    featured: false,
    badge: null,
    features: [
      { label: "โจทย์ต่อวัน", value: "ไม่จำกัด" },
      { label: "สอบจำลอง", value: true },
      { label: "AI อธิบาย", value: true },
      { label: "วิเคราะห์ผล", value: "เต็มรูปแบบ" },
      { label: "ทบทวนโจทย์", value: true },
      { label: "คลังสูตร", value: true },
      { label: "Support", value: false },
    ],
  },
  {
    id: "pro-annual",
    name: "Pro รายปี",
    price: "฿2,490",
    priceSub: "ต่อปี",
    description: "ประหยัดที่สุด — เหมือนได้ฟรี 3 เดือน",
    cta: "สมัคร Pro รายปี",
    ctaHref: "/signup",
    featured: true,
    badge: "ประหยัด 31%",
    features: [
      { label: "โจทย์ต่อวัน", value: "ไม่จำกัด" },
      { label: "สอบจำลอง", value: true },
      { label: "AI อธิบาย", value: true },
      { label: "วิเคราะห์ผล", value: "เต็มรูปแบบ" },
      { label: "ทบทวนโจทย์", value: true },
      { label: "คลังสูตร", value: true },
      { label: "Support", value: "Priority" },
    ],
  },
];

function FeatureValue({ value }: { value: string | boolean }) {
  if (value === true) return <Check size={16} className="text-emerald-500" />;
  if (value === false) return <X size={16} className="text-gray-300" />;
  return <span className="text-sm text-gray-700 font-sarabun">{value}</span>;
}

export default function PricingPage() {
  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold text-gray-900 font-sarabun">แผนสมาชิก</h2>
        <p className="text-gray-500 font-sarabun">เลือกแผนที่เหมาะกับคุณ ยกเลิกได้ทุกเมื่อ</p>
      </div>

      {/* Pricing cards */}
      <div className="grid gap-6 sm:grid-cols-3">
        {plans.map((plan) => (
          <div
            key={plan.id}
            className={`relative rounded-2xl border p-6 flex flex-col ${
              plan.featured
                ? "ring-2 ring-brand-500 border-brand-200 bg-white shadow-lg"
                : "border-gray-100 bg-white shadow-sm"
            }`}
          >
            {plan.featured && plan.badge && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                <span className="inline-flex items-center gap-1 rounded-full bg-brand-500 px-3 py-1 text-xs font-semibold text-white font-sarabun">
                  <Crown size={10} /> {plan.badge}
                </span>
              </div>
            )}

            <div className="mb-4">
              <h3 className="font-semibold text-gray-800 font-sarabun">{plan.name}</h3>
              <div className="mt-2 flex items-baseline gap-1">
                <span className="text-3xl font-bold text-gray-900">{plan.price}</span>
                <span className="text-sm text-gray-400 font-sarabun">{plan.priceSub}</span>
              </div>
              <p className="mt-1.5 text-xs text-gray-500 font-sarabun">{plan.description}</p>
            </div>

            <div className="flex-1 space-y-3 mb-6">
              {plan.features.map((f, i) => (
                <div key={i} className="flex items-center justify-between">
                  <span className="text-sm text-gray-600 font-sarabun">{f.label}</span>
                  <FeatureValue value={f.value} />
                </div>
              ))}
            </div>

            <Link href={plan.ctaHref}>
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

      {/* School CTA */}
      <div className="rounded-2xl border border-brand-100 bg-brand-50 p-8 text-center">
        <h3 className="text-lg font-bold text-gray-900 mb-2 font-sarabun">
          แผนสำหรับโรงเรียน / ติวเตอร์
        </h3>
        <p className="text-gray-500 text-sm mb-4 font-sarabun">
          ใช้งานเป็นทีม ราคาพิเศษสำหรับสถาบัน พร้อม dashboard สำหรับครูและผู้ดูแล
        </p>
        <Button
          variant="outline"
          className="border-brand-300 text-brand-600 hover:bg-brand-100 font-sarabun gap-2"
        >
          <Mail size={16} />
          ติดต่อเรา
        </Button>
      </div>
    </div>
  );
}
