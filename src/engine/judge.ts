import type { TestCase } from "../data/types";
import type { Execution } from "./types";
export const normalize = (s: string) =>
  s
    .replace(/\r\n?/g, "\n")
    .trim()
    .split("\n")
    .map((line) => line.trim().replace(/[ \t]+/g, " "))
    .join("\n");
export function judge(tests: TestCase[], runs: Execution[]) {
  return tests.map((test, i) => ({
    test,
    run: runs[i],
    passed:
      runs[i]?.status === "success" &&
      normalize(test.output) === normalize(runs[i].stdout),
  }));
}
