export type Quiz = {
  id?: string;
  type: "single" | "multi" | "boolean" | "fill" | "predict" | "debug";
  question: string;
  options?: string[];
  answer: string[];
  explanation: string;
};
export type RunOptions = { files?: Record<string, string>; args?: string[] };
export type TestCase = RunOptions & {
  input: string;
  output: string;
  expectedFiles?: Record<string, string>;
};
export type Lesson = {
  id: string;
  chapter: number;
  index: number;
  en: string;
  title: string;
  textbook?: string;
  objective: string;
  explanation: string[];
  syntax: string;
  syntaxNotes: string;
  example: string;
  exampleInput?: string;
  exampleFiles?: Record<string, string>;
  exampleArgs?: string[];
  exampleOutput: string;
  walkthrough: string;
  mistakes: string[];
  summary: string;
  quizzes: Quiz[];
  mastery?: Lesson["challenge"];
  quiz: Quiz;
  challenge: RunOptions & {
    id?: string;
    title: string;
    difficulty: string;
    description: string;
    input: string;
    output: string;
    tests: TestCase[];
    starter: string;
    solution: string;
    hints: string[];
  };
};
export type Chapter = {
  id: number;
  en: string;
  title: string;
  description: string;
  lessons: Lesson[];
};
