import { lessons, lessonById } from "../data/runtime-curriculum";
export type QuestionState = {
  passed: boolean;
  lastCorrect?: boolean;
  answer: string[];
  attempts: number;
  correct: number;
};
export type TaskState = {
  files?: Record<string, string>;
  args?: string[];
  draft?: string;
  draftHistory?: string[];
  input?: string;
  hint?: number;
  passed?: boolean;
  failures?: number;
};
export type RecordState = {
  practiceRevision?: number;
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
function text(s: unknown, max = 1000000) {
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
    if (r.practiceRevision !== undefined) c.practiceRevision = number(r.practiceRevision, 100);
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
        if (t.draftHistory !== undefined) {
          if (!Array.isArray(t.draftHistory) || t.draftHistory.length > 5) throw Error("草稿历史不正确");
          task.draftHistory = t.draftHistory.map(code => text(code));
        }
        if (t.input !== undefined) task.input = text(t.input);
        if (t.args !== undefined) {
          if (!Array.isArray(t.args) || t.args.length > 20)
            throw Error("参数不正确");
          task.args = t.args.map((a) => text(a, 1000));
        }
        if (t.files !== undefined) {
          if (!t.files || typeof t.files !== "object" || Array.isArray(t.files))
            throw Error("虚拟文件不正确");
          const entries = Object.entries(t.files);
          if (entries.length > 16) throw Error("虚拟文件过多");
          task.files = Object.create(null);
          let size = 0;
          for (const [name, content] of entries) {
            if (
              !/^[A-Za-z0-9_][A-Za-z0-9_.-]{0,63}$/.test(name) ||
              name === "main.c"
            )
              throw Error("虚拟文件名不正确");
            const value = text(content, 131072);
            size += new TextEncoder().encode(value).length;
            task.files![name] = value;
          }
          if (size > 131072) throw Error("虚拟文件过大");
        }
        if (t.hint !== undefined) task.hint = number(t.hint, 3);
        if (t.failures !== undefined) task.failures = number(t.failures);
        if (t.passed !== undefined) {
          if (typeof t.passed !== "boolean") throw Error("挑战状态不正确");
          task.passed = t.passed;
        }
        c.tasks[taskId] = task;
      }
    }
    if (lesson.challenge.revision === 2 && c.practiceRevision !== 2) {
      if (completed(c)) c.legacyCompleted = true;
      c.practicePassed = false;
      if (c.tasks?.practice) c.tasks.practice.passed = false;
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
  let raw: string | null = null;
  try {
    raw = localStorage.getItem(key);
    if (!raw) return fresh();
    const parsed = JSON.parse(raw);
    try { return validate(parsed); } catch {
      try { localStorage.setItem(key + "-recovery", raw); } catch {}
      const recovered = { ...fresh(), ...parsed, current: lessonById[parsed.current] ? parsed.current : lessons[0].id, records: {} } as Progress;
      for (const [id, record] of Object.entries(parsed.records || {})) {
        try { Object.assign(recovered.records, validate({ ...recovered, records: { [id]: record } }).records); } catch {}
      }
      return validate(recovered);
    }
  } catch {
    if (raw) { try { localStorage.setItem(key + "-recovery", raw); } catch {} }
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
  if (p.freeMode || p.current === id) return true;
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
