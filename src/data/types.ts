export type Quiz = {
  type: "single" | "multi" | "boolean" | "fill" | "predict" | "debug";
  question: string;
  options?: string[];
  answer: string[];
  explanation: string;
};
export type TestCase = { input: string; output: string };
export type Lesson = {
  id: string;
  chapter: number;
  index: number;
  en: string;
  title: string;
  objective: string;
  explanation: string[];
  syntax: string;
  syntaxNotes: string;
  example: string;
  exampleInput?: string;
  exampleOutput: string;
  walkthrough: string;
  mistakes: string[];
  summary: string;
  quiz: Quiz;
  challenge: {
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
