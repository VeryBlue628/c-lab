import { lessons, lessonById } from "../data/curriculum";
export type RecordState = {
  quizPassed?: boolean;
  practicePassed?: boolean;
  quizAttempts?: number;
  quizCorrect?: number;
  failures?: number;
  skipped?: boolean;
  draft?: string;
  answer?: string[];
  hint?: number;
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
export function validate(value: unknown): Progress {
  if (!value || typeof value !== "object") throw Error("备份格式不正确");
  const p = value as Progress;
  if (
    p.version !== 1 ||
    typeof p.current !== "string" ||
    !lessonById[p.current] ||
    typeof p.records !== "object" ||
    !p.records ||
    Array.isArray(p.records)
  )
    throw Error("备份版本或课程标识不正确");
  const records: Progress["records"] = {};
  for (const [id, r] of Object.entries(p.records)) {
    if (!lessonById[id] || !r || typeof r !== "object") continue;
    const clean: RecordState = {};
    for (const k of ["quizPassed", "practicePassed", "skipped"] as const) {
      if (r[k] !== undefined) {
        if (typeof r[k] !== "boolean") throw Error("进度状态不正确");
        clean[k] = r[k];
      }
    }
    for (const k of [
      "quizAttempts",
      "quizCorrect",
      "failures",
      "hint",
    ] as const) {
      if (r[k] !== undefined) {
        if (!Number.isSafeInteger(r[k]) || r[k]! < 0 || r[k]! > 1000000)
          throw Error("计数数据不正确");
        clean[k] = r[k];
      }
    }
    if (r.draft !== undefined) {
      if (typeof r.draft !== "string" || r.draft.length > 100000)
        throw Error("代码草稿过大");
      clean.draft = r.draft;
    }
    if (
      Array.isArray(r.answer) &&
      r.answer.every((a) => typeof a === "string" && a.length < 1000)
    )
      clean.answer = r.answer;
    if (
      (clean.quizCorrect || 0) > (clean.quizAttempts || 0) ||
      (clean.hint || 0) > 3
    )
      throw Error("答题计数或提示层级不正确");
    records[id] = clean;
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
export const completed = (r: RecordState | undefined) =>
  !!(r?.quizPassed && r?.practicePassed);
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
  const r = Object.values(p.records);
  const n = r.reduce((s, x) => s + (x.quizAttempts || 0), 0);
  return n
    ? Math.round((r.reduce((s, x) => s + (x.quizCorrect || 0), 0) / n) * 100)
    : 0;
};
