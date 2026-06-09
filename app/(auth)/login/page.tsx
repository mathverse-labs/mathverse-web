"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => router.push("/dashboard"), 800);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2">
            <div className="h-10 w-10 rounded-xl bg-brand-500 flex items-center justify-center">
              <span className="text-lg font-bold text-white">M</span>
            </div>
            <span className="text-xl font-bold text-gray-900">MathVerse</span>
          </Link>
          <h1 className="mt-4 text-2xl font-bold text-gray-900 font-sarabun">เข้าสู่ระบบ</h1>
          <p className="mt-1 text-sm text-gray-500 font-sarabun">ยินดีต้อนรับกลับมา</p>
        </div>

        <div className="rounded-2xl border border-gray-100 bg-white p-8 shadow-sm space-y-4">
          {/* Google button */}
          <Button
            variant="outline"
            className="w-full font-sarabun gap-2"
            type="button"
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            เข้าสู่ระบบด้วย Google
          </Button>

          <div className="flex items-center gap-3">
            <div className="flex-1 h-px bg-gray-100" />
            <span className="text-xs text-gray-400 font-sarabun">หรือ</span>
            <div className="flex-1 h-px bg-gray-100" />
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-gray-700 font-sarabun">อีเมล</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="you@example.com"
                className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm outline-none focus:border-brand-400 focus:ring-2 focus:ring-brand-100 transition-all font-sarabun"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-gray-700 font-sarabun">รหัสผ่าน</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="••••••••"
                  className="w-full rounded-lg border border-gray-200 px-3 py-2.5 pr-10 text-sm outline-none focus:border-brand-400 focus:ring-2 focus:ring-brand-100 transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <Button
              type="submit"
              className="w-full bg-brand-500 hover:bg-brand-600 text-white font-sarabun"
              disabled={loading}
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                  กำลังเข้าสู่ระบบ...
                </span>
              ) : (
                "เข้าสู่ระบบ"
              )}
            </Button>
          </form>
        </div>

        <p className="mt-4 text-center text-sm text-gray-500 font-sarabun">
          ยังไม่มีบัญชี?{" "}
          <Link href="/signup" className="font-medium text-brand-600 hover:underline">
            สมัครสมาชิก
          </Link>
        </p>
      </div>
    </div>
  );
}
