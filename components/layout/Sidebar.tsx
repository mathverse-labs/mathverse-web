"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  PenLine,
  ClipboardList,
  BarChart2,
  Search,
  BookOpen,
  Crown,
} from "lucide-react";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { href: "/dashboard", label: "หน้าหลัก", icon: LayoutDashboard },
  { href: "/practice", label: "ฝึกทำโจทย์", icon: PenLine },
  { href: "/mock-exams", label: "สอบจำลอง", icon: ClipboardList },
  { href: "/analytics", label: "วิเคราะห์ผล", icon: BarChart2 },
  { href: "/review", label: "ทบทวนโจทย์", icon: Search },
  { href: "/knowledge-hub", label: "คลังสูตร", icon: BookOpen },
  { href: "/pricing", label: "แผนสมาชิก", icon: Crown },
];

interface SidebarProps {
  onClose?: () => void;
}

export default function Sidebar({ onClose }: SidebarProps) {
  const pathname = usePathname();

  return (
    <div className="flex h-full flex-col bg-brand-950 py-6">
      {/* Logo */}
      <div className="px-6 mb-8">
        <Link href="/dashboard" onClick={onClose}>
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-500">
              <span className="text-sm font-bold text-white">M</span>
            </div>
            <span className="text-lg font-bold text-white tracking-tight">
              MathVerse
            </span>
          </div>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 space-y-1">
        {NAV_ITEMS.map(({ href, label, icon: Icon }) => {
          const isActive = pathname === href || pathname.startsWith(href + "/");
          return (
            <Link
              key={href}
              href={href}
              onClick={onClose}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors font-sarabun",
                isActive
                  ? "bg-brand-600 text-white"
                  : "text-brand-200 hover:bg-brand-800/50 hover:text-white"
              )}
            >
              <Icon size={18} className="shrink-0" />
              {label}
            </Link>
          );
        })}
      </nav>

      {/* Bottom user section */}
      <div className="px-3 mt-4">
        <div className="rounded-lg bg-brand-900/50 px-3 py-3">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-full bg-brand-500 flex items-center justify-center shrink-0">
              <span className="text-xs font-bold text-white">ว</span>
            </div>
            <div className="min-w-0">
              <p className="text-sm font-medium text-white truncate font-sarabun">
                วรนาถ
              </p>
              <p className="text-xs text-brand-400 font-sarabun">A-Level Math 1</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
