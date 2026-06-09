"use client";

import { useState } from "react";
import { Target, BookOpen, Flame, TrendingUp, CheckCircle, XCircle } from "lucide-react";
import StatCard from "@/components/shared/StatCard";
import { userProgress, currentUser } from "@/data/userProgress";
import { topics } from "@/data/topics";
import { mockExams } from "@/data/mockExams";
import { questions } from "@/data/questions";
import { TOPIC_LABELS, DIFFICULTY_LABELS } from "@/lib/constants";
import { formatPercent, formatDate } from "@/lib/formatters";
import { getWeakTopics, calculateReadinessScore } from "@/lib/adaptive";
import type { TopicSlug } from "@/types";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Progress } from "@/components/ui/progress";

function getAccuracyColor(acc: number) {
  if (acc >= 75) return "text-emerald-600 bg-emerald-50";
  if (acc >= 50) return "text-amber-600 bg-amber-50";
  return "text-red-600 bg-red-50";
}

const recentActivity = questions.slice(0, 5).map((q, i) => ({
  question: q,
  result: i % 3 !== 2 ? "correct" : "incorrect",
  date: "2026-06-09",
}));

function AiStudyPlanCard() {
  const [state, setState] = useState<"idle" | "loading" | "done">("idle");

  const handleClick = () => {
    setState("loading");
    setTimeout(() => setState("done"), 1500);
  };

  return (
    <div className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm">
      <div className="flex items-center gap-2 mb-3">
        <span className="text-lg">🤖</span>
        <h3 className="font-semibold text-gray-800 font-sarabun">AI Study Plan</h3>
      </div>
      <p className="text-xs text-gray-500 mb-3 font-sarabun">
        ให้ AI วิเคราะห์จุดอ่อนและสร้างแผนการเรียน 7 วันที่เหมาะกับคุณ
      </p>

      {state === "loading" && (
        <div className="flex items-center gap-2 text-sm text-gray-500 font-sarabun">
          <div className="h-4 w-4 animate-spin rounded-full border-2 border-brand-500 border-t-transparent" />
          AI กำลังวิเคราะห์...
        </div>
      )}
      {state === "done" && (
        <div className="rounded-lg bg-brand-50 border border-brand-100 p-3 text-sm text-brand-700 font-sarabun">
          AI กำลังวิเคราะห์จุดอ่อนของคุณเพื่อสร้างแผน 7 วัน — ฟีเจอร์นี้จะพร้อมใช้เร็วๆ นี้
        </div>
      )}
      {state === "idle" && (
        <Button
          size="sm"
          variant="outline"
          className="w-full font-sarabun border-brand-200 text-brand-600 hover:bg-brand-50"
          onClick={handleClick}
        >
          สร้างแผนการเรียน 7 วัน
        </Button>
      )}
    </div>
  );
}

export default function DashboardPage() {
  const weakTopics = getWeakTopics(userProgress);
  const readinessScore = calculateReadinessScore(userProgress);
  const overallAccuracy = Math.round(
    (userProgress.totalCorrect / userProgress.totalQuestionsAnswered) * 100
  );
  const recommendedTopics = weakTopics.slice(0, 3);
  const upcomingExam = mockExams[0];

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Welcome */}
      <div>
        <h2 className="text-xl font-bold text-gray-900 font-sarabun">
          สวัสดี, {currentUser.name.split(" ")[0]} 👋
        </h2>
        <p className="text-sm text-gray-500 mt-0.5 font-sarabun">
          วันนี้ฝึกทำโจทย์เพื่อเตรียมสอบ A-Level Math 1
        </p>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard
          title="ความแม่นยำ"
          value={formatPercent(overallAccuracy)}
          subtitle="จากโจทย์ทั้งหมด"
          icon={Target}
          trend={{ value: 5, label: "จากสัปดาห์ที่แล้ว" }}
        />
        <StatCard
          title="โจทย์ที่ทำ"
          value={userProgress.totalQuestionsAnswered}
          subtitle="ข้อทั้งหมด"
          icon={BookOpen}
        />
        <StatCard
          title="สตรีคต่อเนื่อง"
          value={`${userProgress.studyStreakDays} วัน`}
          subtitle="ติดต่อกัน"
          icon={Flame}
          iconColor="text-orange-500"
        />
        <StatCard
          title="คะแนนพร้อมสอบ"
          value={`${readinessScore}/100`}
          subtitle="ประเมินจาก AI"
          icon={TrendingUp}
          iconColor="text-brand-500"
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Main content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Weak topics */}
          <div className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm">
            <h3 className="font-semibold text-gray-800 mb-3 font-sarabun">หัวข้อที่ควรพัฒนา</h3>
            <div className="flex flex-wrap gap-2">
              {(Object.entries(userProgress.topicAccuracy) as [TopicSlug, number][])
                .sort((a, b) => a[1] - b[1])
                .map(([slug, acc]) => (
                  <Link key={slug} href="/practice">
                    <span
                      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-medium cursor-pointer transition-opacity hover:opacity-80 font-sarabun ${getAccuracyColor(acc)}`}
                    >
                      {TOPIC_LABELS[slug]}
                      <span className="font-bold">{formatPercent(acc)}</span>
                    </span>
                  </Link>
                ))}
            </div>
          </div>

          {/* Recommended practice */}
          <div className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm">
            <h3 className="font-semibold text-gray-800 mb-3 font-sarabun">แนะนำให้ฝึก</h3>
            <div className="space-y-3">
              {recommendedTopics.map((slug) => {
                const topic = topics.find((t) => t.slug === slug);
                const acc = userProgress.topicAccuracy[slug];
                if (!topic) return null;
                return (
                  <div
                    key={slug}
                    className="flex items-center justify-between rounded-lg border border-gray-100 p-3"
                  >
                    <div>
                      <p className="font-medium text-gray-800 font-sarabun">{topic.nameTh}</p>
                      <p className="text-xs text-gray-500 font-sarabun">
                        ความแม่นยำ: {formatPercent(acc)}
                      </p>
                    </div>
                    <Link href="/practice">
                      <Button size="sm" className="bg-brand-500 hover:bg-brand-600 text-white font-sarabun">
                        ฝึกเลย
                      </Button>
                    </Link>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Recent activity */}
          <div className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm">
            <h3 className="font-semibold text-gray-800 mb-3 font-sarabun">กิจกรรมล่าสุด</h3>
            <div className="space-y-2">
              {recentActivity.map(({ question, result }, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 rounded-lg border border-gray-50 p-3 text-sm"
                >
                  {result === "correct" ? (
                    <CheckCircle size={16} className="text-emerald-500 shrink-0" />
                  ) : (
                    <XCircle size={16} className="text-red-500 shrink-0" />
                  )}
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-gray-700 truncate font-sarabun">
                      {TOPIC_LABELS[question.topic]} — {question.subtopic}
                    </p>
                    <p className="text-xs text-gray-400 font-sarabun">
                      {DIFFICULTY_LABELS[question.difficulty]}
                    </p>
                  </div>
                  <span className="text-xs text-gray-400 shrink-0 font-sarabun">
                    {formatDate(recentActivity[i].date)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right panel */}
        <div className="space-y-4">
          {/* Goal progress */}
          <div className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm">
            <h3 className="font-semibold text-gray-800 mb-1 font-sarabun">เป้าหมาย</h3>
            <p className="text-xs text-gray-500 mb-3 font-sarabun">
              A-Level Math 1 — เป้าหมาย {currentUser.targetScore}%
            </p>
            <Progress value={overallAccuracy} className="h-2" />
            <div className="flex justify-between mt-1">
              <span className="text-xs text-gray-400 font-sarabun">ปัจจุบัน {formatPercent(overallAccuracy)}</span>
              <span className="text-xs text-gray-400 font-sarabun">เป้า {currentUser.targetScore}%</span>
            </div>
          </div>

          {/* Upcoming exam */}
          <div className="rounded-xl border border-brand-100 bg-brand-50 p-5">
            <p className="text-xs font-medium text-brand-600 mb-1 font-sarabun">สอบจำลองถัดไป</p>
            <p className="font-semibold text-gray-800 text-sm font-sarabun">{upcomingExam.title}</p>
            <p className="text-xs text-gray-500 mt-0.5 font-sarabun">
              {upcomingExam.durationMinutes} นาที · {upcomingExam.questionCount} ข้อ
            </p>
            <Link href={`/mock-exams/${upcomingExam.id}`}>
              <Button
                size="sm"
                className="mt-3 w-full bg-brand-500 hover:bg-brand-600 text-white font-sarabun"
              >
                เริ่มสอบ
              </Button>
            </Link>
          </div>

          <AiStudyPlanCard />
        </div>
      </div>
    </div>
  );
}
