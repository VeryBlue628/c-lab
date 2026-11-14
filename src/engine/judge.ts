import type { TestCase } from "../data/types";
import type { Execution } from "./types";
export const normalize = (s: string) =>
  s
    .replace(/\r\n?/g, "\n")
    .trim()
    .split("\n")
    .map((line) => line.trim().replace(/[ \t]+/g, " "))
    .join("\n");
export const outputMatches = (
  expected: string,
  actual: string,
  exact = false,
) =>
  exact
    ? expected.replace(/\r\n?/g, "\n") === actual.replace(/\r\n?/g, "\n")
    : normalize(expected) === normalize(actual);
export function judge(tests: TestCase[], runs: Execution[]) {
  return tests.map((test, i) => ({
    test,
    run: runs[i],
    passed:
      runs[i]?.status === "success" &&
      outputMatches(test.output, runs[i].stdout, test.exact) &&
      Object.entries(test.expectedFiles || {}).every(([name, content]) => {
        const bytes = runs[i]?.files?.[name];
        const expected = new TextEncoder().encode(content);
        return (
          !!bytes &&
          bytes.length === expected.length &&
          bytes.every((b, j) => b === expected[j])
        );
      }),
  }));
}
