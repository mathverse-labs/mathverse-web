import type { Metadata } from "next";
import { Inter, Sarabun } from "next/font/google";
import "katex/dist/katex.min.css";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const sarabun = Sarabun({
  subsets: ["thai"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-sarabun",
});

export const metadata: Metadata = {
  title: "MathVerse — แพลตฟอร์มคณิตศาสตร์ระดับพรีเมียม",
  description: "ฝึกทำโจทย์คณิตศาสตร์สำหรับการสอบ A-Level, Triam Udom, MWIT, KVIS ด้วย AI",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="th"
      className={`${inter.variable} ${sarabun.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-gray-50 text-gray-900">{children}</body>
    </html>
  );
}
