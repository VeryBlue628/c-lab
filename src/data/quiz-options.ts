import type { Quiz } from "./types";

export function quizOptions(quiz: Quiz) {
  if (!quiz.options || quiz.type !== "single") return quiz.options;
  // A stable hash keeps the displayed choices identical on reload and review.
  let hash = 2166136261;
  for (const character of quiz.id ?? quiz.question)
    hash = Math.imul(hash ^ character.charCodeAt(0), 16777619);
  const offset = (hash >>> 0) % quiz.options.length;
  return [...quiz.options.slice(offset), ...quiz.options.slice(0, offset)];
}
