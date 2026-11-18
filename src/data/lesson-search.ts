const sectionPattern = /\d+(?:\.\d+)+/g;
const compare = (a: string, b: string) => {
  const left = a.split(".").map(Number), right = b.split(".").map(Number);
  for (let i = 0; i < Math.max(left.length, right.length); i++) {
    const diff = (left[i] ?? 0) - (right[i] ?? 0);
    if (diff) return diff;
  }
  return 0;
};

export function matchesSection(text: string, query: string) {
  return text.split(/[、，,；;]/).some(part => {
    const [first, last] = part.match(sectionPattern) ?? [];
    if (!first) return false;
    const at = (section: string) => section === query || section.startsWith(query + ".");
    if (!last) return at(first);
    return at(first) || at(last) || (compare(query, first) >= 0 &&
      (compare(query, last) <= 0 || query.startsWith(last + ".")));
  });
}

export function matchesLesson(
  lesson: { title: string; en: string; objective: string; textbook?: string; keywords?: string },
  chapter: { title: string; en: string },
  input: string,
) {
  const query = input.trim().toLowerCase();
  if (/^\d+(?:\.\d+)+$/.test(query)) return matchesSection(lesson.textbook ?? "", query);
  return [lesson.title, lesson.en, lesson.objective, lesson.textbook, lesson.keywords, chapter.title, chapter.en]
    .some(value => value?.toLowerCase().includes(query));
}

export function textbookLabel(text: string, module: number) {
  const chapter = text.match(/第\s*(\d+)\s*章/)?.[1] ?? text.match(sectionPattern)?.[0].split(".")[0];
  const formatted = chapter && !text.startsWith("第") ? "第 " + chapter + " 章 · " + text : text;
  return formatted + "｜课程模块 " + module;
}
