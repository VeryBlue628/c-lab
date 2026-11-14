import { lessons, lessonById } from "../data/curriculum";
export type QuestionState = {
  passed: boolean;
  lastCorrect?: boolean;
  answer: string[];
  attempts: number;
  correct: number;
};
export type TaskState = {
  draft?: string;
  input?: string;
  hint?: number;
  passed?: boolean;
  failures?: number;
};
export type RecordState = {
  quizPassed?: boolean;
  practicePassed?: boolean;
  quizAttempts?: number;
  quizCorrect?: number;
  failures?: number;
  streak?: number;
  skipped?: boolean;
  draft?: string;
  answer?: string[];
  hint?: number;
  legacyCompleted?: boolean;
  questions?: Record<string, QuestionState>;
  tasks?: Record<string, TaskState>;
  currentQuestion?: number;
  activeChallenge?: "practice" | "mastery";
  lastTab?: "lesson" | "quiz" | "practice";
};
export type Progress = {
  version: 1;
  current: string;
  records: Record<string, RecordState>;
  freeMode: boolean;
  updatedAt: string;
};
const key = "c-lab-progress-v1";
export const fresh = (): Progress => ({
  version: 1,
  current: lessons[0].id,
  records: {},
  freeMode: false,
  updatedAt: new Date().toISOString(),
});
export const completed = (r: RecordState | undefined) =>
  !!(r?.legacyCompleted || (r?.quizPassed && r?.practicePassed));
function number(n: unknown, max = 1000000) {
  if (!Number.isSafeInteger(n) || (n as number) < 0 || (n as number) > max)
    throw Error("计数或提示层级不正确");
  return n as number;
}
function text(s: unknown, max = 100000) {
  if (typeof s !== "string" || s.length > max)
    throw Error("文本或代码草稿不正确");
  return s;
}
function answers(a: unknown) {
  if (!Array.isArray(a) || a.length > 20) throw Error("答案不正确");
  return a.map((x) => text(x, 1000));
}
export function validate(value: unknown): Progress {
  if (!value || typeof value !== "object") throw Error("备份格式不正确");
  const p = value as Progress;
  if (
    p.version !== 1 ||
    typeof p.current !== "string" ||
    !lessonById[p.current] ||
    !p.records ||
    typeof p.records !== "object" ||
    Array.isArray(p.records)
  )
    throw Error("备份版本或课程标识不正确");
  const records: Progress["records"] = {};
  for (const [id, r] of Object.entries(p.records)) {
    const lesson = lessonById[id];
    if (!lesson || !r || typeof r !== "object") continue;
    const c: RecordState = {};
    for (const k of [
      "quizPassed",
      "practicePassed",
      "skipped",
      "legacyCompleted",
    ] as const) {
      if (r[k] !== undefined) {
        if (typeof r[k] !== "boolean") throw Error("状态不正确");
        c[k] = r[k];
      }
    }
    for (const k of [
      "quizAttempts",
      "quizCorrect",
      "failures",
      "streak",
    ] as const)
      if (r[k] !== undefined) c[k] = number(r[k]);
    if (r.hint !== undefined) c.hint = number(r.hint, 3);
    if ((c.quizCorrect || 0) > (c.quizAttempts || 0))
      throw Error("答题计数不正确");
    if (r.draft !== undefined) c.draft = text(r.draft);
    if (r.answer !== undefined) c.answer = answers(r.answer);
    if (r.currentQuestion !== undefined)
      c.currentQuestion = number(r.currentQuestion, lesson.quizzes.length - 1);
    if (["practice", "mastery"].includes(r.activeChallenge || ""))
      c.activeChallenge = r.activeChallenge;
    if (["lesson", "quiz", "practice"].includes(r.lastTab || ""))
      c.lastTab = r.lastTab;
    if (
      r.questions &&
      typeof r.questions === "object" &&
      !Array.isArray(r.questions)
    ) {
      c.questions = {};
      for (const q of lesson.quizzes) {
        const s = r.questions[q.id!];
        if (!s) continue;
        const attempts = number(s.attempts),
          correct = number(s.correct);
        if (correct > attempts || typeof s.passed !== "boolean")
          throw Error("逐题记录不正确");
        c.questions[q.id!] = {
          passed: s.passed,
          lastCorrect:
            typeof s.lastCorrect === "boolean" ? s.lastCorrect : s.passed,
          answer: answers(s.answer),
          attempts,
          correct,
        };
      }
    }
    if (!r.questions && r.quizPassed) {
      c.questions = {
        [lesson.quizzes[0].id!]: {
          passed: true,
          answer: r.answer || [],
          attempts: 1,
          correct: 1,
        },
      };
      if (r.practicePassed) c.legacyCompleted = true;
      else c.quizPassed = false;
    }
    if (r.tasks && typeof r.tasks === "object" && !Array.isArray(r.tasks)) {
      c.tasks = {};
      for (const taskId of ["practice", "mastery"] as const) {
        if (taskId === "mastery" && !lesson.mastery) continue;
        const t = r.tasks[taskId];
        if (!t || typeof t !== "object") continue;
        const task: TaskState = {};
        if (t.draft !== undefined) task.draft = text(t.draft);
        if (t.input !== undefined) task.input = text(t.input);
        if (t.hint !== undefined) task.hint = number(t.hint, 3);
        if (t.failures !== undefined) task.failures = number(t.failures);
        if (t.passed !== undefined) {
          if (typeof t.passed !== "boolean") throw Error("挑战状态不正确");
          task.passed = t.passed;
        }
        c.tasks[taskId] = task;
      }
    }
    records[id] = c;
  }
  return {
    version: 1,
    current: p.current,
    records,
    freeMode: !!p.freeMode,
    updatedAt: new Date().toISOString(),
  };
}
export function load(): Progress {
  try {
    const raw = localStorage.getItem(key);
    return raw ? validate(JSON.parse(raw)) : fresh();
  } catch {
    return fresh();
  }
}
export function save(p: Progress) {
  localStorage.setItem(
    key,
    JSON.stringify({ ...p, updatedAt: new Date().toISOString() }),
  );
}
export function unlocked(id: string, p: Progress) {
  if (!lessonById[id]) return false;
  if (p.freeMode) return true;
  const i = lessons.findIndex((l) => l.id === id);
  return (
    i === 0 ||
    completed(p.records[lessons[i - 1]?.id]) ||
    !!p.records[lessons[i - 1]?.id]?.skipped ||
    completed(p.records[id]) ||
    !!p.records[id]?.skipped
  );
}
export const accuracy = (p: Progress) => {
  const rs = Object.values(p.records);
  const n = rs.reduce((a, r) => a + (r.quizAttempts || 0), 0);
  return n
    ? Math.round((rs.reduce((a, r) => a + (r.quizCorrect || 0), 0) / n) * 100)
    : 0;
};
