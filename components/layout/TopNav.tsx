"use client";

import { useState } from "react";
import { Menu, Bell, Settings } from "lucide-react";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import Sidebar from "./Sidebar";
import { usePathname } from "next/navigation";

const PAGE_TITLES: Record<string, string> = {
  "/dashboard": "หน้าหลัก",
  "/practice": "ฝึกทำโจทย์",
  "/mock-exams": "สอบจำลอง",
  "/analytics": "วิเคราะห์ผล",
  "/review": "ทบทวนโจทย์",
  "/knowledge-hub": "คลังสูตร",
  "/pricing": "แผนสมาชิก",
};

export default function TopNav() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const title =
    Object.entries(PAGE_TITLES).find(
      ([key]) => pathname === key || pathname.startsWith(key + "/")
    )?.[1] ?? "MathVerse";

  return (
    <>
      <header className="sticky top-0 z-30 flex h-14 items-center gap-3 border-b border-gray-100 bg-white/95 px-4 backdrop-blur-sm">
        {/* Mobile hamburger */}
        <Button
          variant="ghost"
          size="icon"
          className="lg:hidden"
          onClick={() => setOpen(true)}
        >
          <Menu size={20} />
        </Button>

        <h1 className="text-base font-semibold text-gray-800 font-sarabun">{title}</h1>

        <div className="ml-auto flex items-center gap-1">
          <Button variant="ghost" size="icon" className="text-gray-500">
            <Bell size={18} />
          </Button>
          <Button variant="ghost" size="icon" className="text-gray-500">
            <Settings size={18} />
          </Button>
          <div className="ml-2 h-8 w-8 rounded-full bg-brand-500 flex items-center justify-center">
            <span className="text-xs font-bold text-white">ว</span>
          </div>
        </div>
      </header>

      {/* Mobile drawer */}
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent side="left" className="w-60 p-0">
          <Sidebar onClose={() => setOpen(false)} />
        </SheetContent>
      </Sheet>
    </>
  );
}
