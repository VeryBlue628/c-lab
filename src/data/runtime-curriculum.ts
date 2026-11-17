import catalog from './catalog.json';
import { chapterLoaders } from './chapter-loaders';
import { chapterOrder } from './pathway';
import type { Chapter } from './types';
// Metadata is sufficient for navigation/progress. Content consumers must call
// ensureChapter before reading quizzes, explanations or challenges.
export const chapters = catalog as unknown as Chapter[];
export const learningChapters = chapterOrder.map(id => chapters.find(c => c.id === id)!);
export const lessons = learningChapters.flatMap(c => c.lessons);
export const lessonById = Object.assign(Object.create(null), Object.fromEntries(lessons.map(l => [l.id,l]))) as Record<string, Chapter['lessons'][number]>;
export const curriculumStats = {chapters:chapters.length, lessons:lessons.length, mastery:lessons.filter(l=>l.mastery).length, challenges:lessons.length+lessons.filter(l=>l.mastery).length, questions:lessons.reduce((n,l)=>n+l.quizzes.length,0)};
const errors = new Map<number, unknown>();
const loaded = new Set<number>();
const pending = new Map<number, Promise<void>>();
export function loadChapter(id: number): Promise<void> {
  if (loaded.has(id)) return Promise.resolve();
  if (!pending.has(id)) {
    const loader = chapterLoaders[id as keyof typeof chapterLoaders];
    if (!loader) return Promise.reject(Error('课程不存在'));
    const promise = loader().then(module => {
      for (const lesson of (module.default as Chapter).lessons) Object.assign(lessonById[lesson.id], lesson);
      loaded.add(id);
    }).catch(error => { errors.set(id, error); throw error; });
    pending.set(id, promise);
  }
  return pending.get(id)!;
}
export function ensureChapter(id: number) {
  if (errors.has(id)) throw errors.get(id);
  if (!loaded.has(id)) throw loadChapter(id);
}
