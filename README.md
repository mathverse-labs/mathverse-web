# MathVerse

แพลตฟอร์ม AI-driven สำหรับฝึกคณิตศาสตร์ระดับพรีเมียม สำหรับนักเรียนไทยที่เตรียมสอบ A-Level Math 1, เตรียมอุดม, MWIT และ KVIS

---

## Setup

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

```bash
npm run build   # production build
npm run lint    # lint check
```

---

## Project Structure

```
/app
  /page.tsx              Landing page
  /(app)/                Authenticated app pages (Dashboard, Practice, etc.)
  /(auth)/               Login / Signup pages

/components
  /layout/               Sidebar, TopNav, AppShell
  /shared/               MathRenderer, StatCard, DifficultyBadge, ExamBadge, EmptyState
  /practice/             QuestionCard, AnswerOption, ExplanationPanel, PracticeControls
  /mock-exams/           ExamTimer, QuestionNavigator

/data/                   Mock data (questions, topics, mockExams, userProgress, analytics)
/types/index.ts          All TypeScript interfaces
/lib/
  adaptive.ts            Adaptive recommendation logic
  formatters.ts          Date, percent, number formatters
  constants.ts           Labels, colors, nav items
```

---

## How to Add New Questions

Edit [`/data/questions.ts`](data/questions.ts). Each question follows the `Question` interface:

```typescript
{
  id: "q021",                        // unique ID
  examType: "a-level-math1",         // ExamType union
  topic: "calculus",                 // TopicSlug union
  subtopic: "derivatives",
  difficulty: "medium",              // Difficulty union
  questionText: "หา $f'(x)$ เมื่อ $f(x) = x^3$",  // LaTeX: $...$ inline, $$...$$ block
  choices: [
    { label: "A", text: "$3x^2$" },
    { label: "B", text: "$x^2$" },
    { label: "C", text: "$3x$" },
    { label: "D", text: "$3$" },
  ],
  correctAnswer: "A",
  explanation: "ใช้กฎกำลัง: $f'(x) = 3x^2$",
  formulaNotes: "$\\frac{d}{dx}[x^n] = nx^{n-1}$",  // optional
  estimatedTimeSeconds: 60,
  tags: ["power rule"],
}
```

LaTeX is rendered by [KaTeX](https://katex.org/) via `react-katex`. Use `$...$` for inline math and `$$...$$` for block math.

---

## Future Architecture

### Backend — Supabase

```sql
-- Key tables
users               -- profile, exam goal, subscription tier
topics              -- slug, name, description
questions           -- full question objects with metadata
attempts            -- userId, questionId, selectedAnswer, isCorrect, timeSpent
mock_exam_attempts  -- userId, examId, answers[], score, completedAt
user_progress       -- userId, topicAccuracy (jsonb), topicCoverage (jsonb)
subscriptions       -- userId, plan, stripeCustomerId, status
```

### Authentication — Supabase Auth

Replace mock redirect in `/login` and `/signup` with:

```typescript
const { error } = await supabase.auth.signInWithPassword({ email, password });
```

Add `middleware.ts` to protect `/(app)` routes — redirect to `/login` if no session.

### Payments — Stripe

- POST `/api/checkout` → create Stripe Checkout Session for Pro plan
- POST `/api/webhooks/stripe` → handle `customer.subscription.created/updated/deleted`
- Gate Pro features by checking subscription status from Supabase

### AI Explanations — Anthropic Claude API

```typescript
// POST /api/explain
const response = await anthropic.messages.create({
  model: "claude-opus-4-8",
  max_tokens: 1024,
  messages: [{
    role: "user",
    content: `อธิบายวิธีทำโจทย์นี้ทีละขั้นตอน:\n\n${question.questionText}\n\nเฉลย: ${question.explanation}`,
  }],
});
```

### Adaptive Engine — Supabase Edge Functions

Move `adaptive.ts` logic server-side. Recompute `user_progress` after each `attempt` insert and return personalized recommendations.

### Admin Panel

Protected `/admin` route for content editors:
- Add/edit/delete questions with live KaTeX preview
- Bulk CSV import
- Topic and difficulty distribution dashboard

### School Dashboard

Role-based access (`teacher` role):
- `/classroom` — manage students, view class-level analytics
- Assign custom practice sets and mock exams
- Export student progress reports
