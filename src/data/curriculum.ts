import questionBank from "./question-bank.json";
import masteryBank from "./mastery-challenges.json";
import type { Chapter } from "./types";
import c1 from "./lessons/chapter-1.json";
import q1 from "./quizzes/chapter-1.json";
import p1 from "./challenges/chapter-1.json";
import c2 from "./lessons/chapter-2.json";
import q2 from "./quizzes/chapter-2.json";
import p2 from "./challenges/chapter-2.json";
import c3 from "./lessons/chapter-3.json";
import q3 from "./quizzes/chapter-3.json";
import p3 from "./challenges/chapter-3.json";
import c4 from "./lessons/chapter-4.json";
import q4 from "./quizzes/chapter-4.json";
import p4 from "./challenges/chapter-4.json";
import c5 from "./lessons/chapter-5.json";
import q5 from "./quizzes/chapter-5.json";
import p5 from "./challenges/chapter-5.json";
import c6 from "./lessons/chapter-6.json";
import q6 from "./quizzes/chapter-6.json";
import p6 from "./challenges/chapter-6.json";
import c7 from "./lessons/chapter-7.json";
import q7 from "./quizzes/chapter-7.json";
import p7 from "./challenges/chapter-7.json";
import c8 from "./lessons/chapter-8.json";
import q8 from "./quizzes/chapter-8.json";
import p8 from "./challenges/chapter-8.json";
import c9 from "./lessons/chapter-9.json";
import q9 from "./quizzes/chapter-9.json";
import p9 from "./challenges/chapter-9.json";
const quizzes: Record<string, unknown> = Object.assign(
  {},
  q1,
  q2,
  q3,
  q4,
  q5,
  q6,
  q7,
  q8,
  q9,
);
const practices: Record<string, unknown> = Object.assign(
  {},
  p1,
  p2,
  p3,
  p4,
  p5,
  p6,
  p7,
  p8,
  p9,
);
export const chapters: Chapter[] = [c1, c2, c3, c4, c5, c6, c7, c8, c9].map(
  (c) => ({
    ...c,
    lessons: c.lessons.map((l) => ({
      ...l,
      quiz: quizzes[l.id],
      quizzes: (questionBank as Record<string, unknown>)[l.id],
      mastery: (masteryBank as Record<string, unknown>)[l.id],
      challenge: practices[l.id],
    })),
  }),
) as Chapter[];
export const lessons = chapters.flatMap((c) => c.lessons);
export const lessonById: Record<string, (typeof lessons)[number]> =
  Object.assign(
    Object.create(null),
    Object.fromEntries(lessons.map((l) => [l.id, l])),
  );
