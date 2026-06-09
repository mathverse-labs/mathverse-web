"use client";

import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  RadialBarChart,
  RadialBar,
  Legend,
} from "recharts";
import { analyticsData } from "@/data/analytics";
import { userProgress } from "@/data/userProgress";
import { TOPIC_LABELS, DIFFICULTY_LABELS } from "@/lib/constants";
import { formatPercent } from "@/lib/formatters";
import type { TopicSlug, Difficulty } from "@/types";
import StatCard from "@/components/shared/StatCard";
import { Target, Zap, BookOpen, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

function getBarColor(acc: number) {
  if (acc >= 75) return "#10b981";
  if (acc >= 50) return "#f59e0b";
  return "#ef4444";
}

const topicBarData = (
  Object.entries(analyticsData.accuracyByTopic) as [TopicSlug, number][]
).map(([slug, acc]) => ({
  topic: TOPIC_LABELS[slug],
  accuracy: acc,
  fill: getBarColor(acc),
}));

const difficultyRadarData = (
  Object.entries(analyticsData.accuracyByDifficulty) as [Difficulty, number][]
).map(([d, acc]) => ({
  subject: DIFFICULTY_LABELS[d],
  accuracy: acc,
}));

const readinessData = [
  {
    name: "พร้อมสอบ",
    value: analyticsData.readinessScore,
    fill: "#6366f1",
  },
];

export default function AnalyticsPage() {
  const overallAccuracy = Math.round(
    (userProgress.totalCorrect / userProgress.totalQuestionsAnswered) * 100
  );
  const questionsThisWeek = analyticsData.weeklyProgress[7]?.questionsAnswered ?? 0;

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Top stat cards */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard
          title="ความแม่นยำโดยรวม"
          value={formatPercent(overallAccuracy)}
          icon={Target}
        />
        <StatCard
          title="คะแนนพร้อมสอบ"
          value={`${analyticsData.readinessScore}/100`}
          icon={Zap}
          iconColor="text-brand-500"
        />
        <StatCard
          title="โจทย์สัปดาห์นี้"
          value={questionsThisWeek}
          subtitle="ข้อ"
          icon={BookOpen}
        />
        <StatCard
          title="เวลาเฉลี่ย/ข้อ"
          value={`${analyticsData.avgTimePerQuestion}s`}
          subtitle="วินาที"
          icon={Clock}
          iconColor="text-amber-500"
        />
      </div>

      {/* Charts grid */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Accuracy by topic */}
        <div className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm">
          <h3 className="font-semibold text-gray-800 mb-4 font-sarabun">ความแม่นยำแต่ละหัวข้อ</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart
              data={topicBarData}
              layout="vertical"
              margin={{ left: 20, right: 20 }}
            >
              <CartesianGrid strokeDasharray="3 3" horizontal={false} />
              <XAxis type="number" domain={[0, 100]} unit="%" tick={{ fontSize: 11 }} />
              <YAxis type="category" dataKey="topic" tick={{ fontSize: 11 }} width={80} />
              <Tooltip formatter={(v) => [`${v}%`, "ความแม่นยำ"]} />
              <Bar dataKey="accuracy" radius={[0, 4, 4, 0]}>
                {topicBarData.map((entry, i) => (
                  <Cell key={i} fill={entry.fill} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Progress over time */}
        <div className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm">
          <h3 className="font-semibold text-gray-800 mb-4 font-sarabun">ความก้าวหน้า 8 สัปดาห์</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={analyticsData.weeklyProgress} margin={{ right: 20 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="week" tick={{ fontSize: 10 }} />
              <YAxis domain={[0, 100]} unit="%" tick={{ fontSize: 11 }} />
              <Tooltip formatter={(v) => [`${v}%`, "ความแม่นยำ"]} />
              <Line
                type="monotone"
                dataKey="accuracy"
                stroke="#6366f1"
                strokeWidth={2}
                dot={{ fill: "#6366f1", r: 4 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Radar by difficulty */}
        <div className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm">
          <h3 className="font-semibold text-gray-800 mb-4 font-sarabun">ความแม่นยำตามระดับความยาก</h3>
          <ResponsiveContainer width="100%" height={300}>
            <RadarChart data={difficultyRadarData}>
              <PolarGrid />
              <PolarAngleAxis dataKey="subject" tick={{ fontSize: 12 }} />
              <Radar
                name="ความแม่นยำ"
                dataKey="accuracy"
                stroke="#6366f1"
                fill="#6366f1"
                fillOpacity={0.3}
              />
              <Tooltip formatter={(v) => [`${v}%`, "ความแม่นยำ"]} />
            </RadarChart>
          </ResponsiveContainer>
        </div>

        {/* Readiness gauge */}
        <div className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm">
          <h3 className="font-semibold text-gray-800 mb-4 font-sarabun">คะแนนพร้อมสอบ</h3>
          <div className="relative">
            <ResponsiveContainer width="100%" height={300}>
              <RadialBarChart
                innerRadius="60%"
                outerRadius="90%"
                data={readinessData}
                startAngle={180}
                endAngle={0}
              >
                <RadialBar dataKey="value" cornerRadius={8} background={{ fill: "#f3f4f6" }} />
                <Legend />
              </RadialBarChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex flex-col items-center justify-center pb-8">
              <span className="text-4xl font-bold text-brand-600">
                {analyticsData.readinessScore}
              </span>
              <span className="text-sm text-gray-500 font-sarabun">/ 100</span>
              <span className="text-xs text-gray-400 mt-1 font-sarabun">คะแนนพร้อมสอบ</span>
            </div>
          </div>
        </div>
      </div>

      {/* Weak topics */}
      <div className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm">
        <h3 className="font-semibold text-gray-800 mb-4 font-sarabun">จุดอ่อนที่ควรทบทวน</h3>
        <div className="space-y-3">
          {analyticsData.weakTopics.map((slug) => {
            const acc = analyticsData.accuracyByTopic[slug];
            return (
              <div key={slug} className="flex items-center gap-4">
                <div className="flex-1">
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium text-gray-700 font-sarabun">
                      {TOPIC_LABELS[slug]}
                    </span>
                    <span className="text-sm font-semibold text-red-500">{formatPercent(acc)}</span>
                  </div>
                  <div className="h-2 rounded-full bg-gray-100">
                    <div
                      className="h-full rounded-full bg-red-400 transition-all"
                      style={{ width: `${acc}%` }}
                    />
                  </div>
                </div>
                <Link href="/practice">
                  <Button size="sm" className="bg-brand-500 hover:bg-brand-600 text-white font-sarabun shrink-0">
                    ฝึกทันที
                  </Button>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
