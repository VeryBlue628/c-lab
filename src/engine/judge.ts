import type { TestCase } from "../data/types";
import type { Execution } from "./types";
export const normalize = (s: string) =>
  s.replace(/\r/g, "").trim().split(/\s+/).join(" ");
export function judge(tests: TestCase[], runs: Execution[]) {
  return tests.map((test, i) => ({
    test,
    run: runs[i],
    passed:
      runs[i]?.status === "success" &&
      normalize(test.output) === normalize(runs[i].stdout),
  }));
}
