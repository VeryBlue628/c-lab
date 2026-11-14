import fs from "node:fs/promises";
import assert from "node:assert/strict";
import { build } from "esbuild";
import path from "node:path";
import { pathToFileURL } from "node:url";
const read = async (file) =>
  JSON.parse(
    await fs.readFile(new URL("../src/data/" + file, import.meta.url), "utf8"),
  );
const bank = await read("question-bank.json"),
  mastery = await read("mastery-challenges.json");
const totals = [26, 85, 61, 44, 26, 53, 39, 47, 3];
let count = 0;
const questions = new Set();
for (let c = 1; c <= 9; c++) {
  const chapter = await read("lessons/chapter-" + c + ".json");
  let chapterCount = 0;
  for (const l of chapter.lessons) {
    const qs = bank[l.id];
    assert(qs.length >= 1);
    for (const q of qs) {
      assert(!questions.has(q.id));
      questions.add(q.id);
      assert(q.question.length > 5);
      assert(q.explanation.length > 8);
      assert(q.answer.length > 0);
      if (q.options)
        for (const answer of q.answer)
          assert(q.options.includes(answer), q.id + " option");
      assert.equal(new Set(q.options || []).size, q.options?.length || 0);
      chapterCount++;
    }
  }
  assert.equal(chapterCount, totals[c - 1]);
  count += chapterCount;
}
assert.equal(count, 384);
assert.equal(Object.keys(mastery).length, 17);
for (const m of Object.values(mastery)) {
  assert(m.tests.length >= 3);
  assert.equal(m.hints.length, 3);
  assert(m.starter && m.solution);
}
const work = path.resolve(process.argv[2] || ".qa");
await fs.mkdir(work, { recursive: true });
const out = path.join(work, "expanded.bundle.mjs");
await build({
  entryPoints: ["src/services/progress.ts", "src/engine/judge.ts"],
  bundle: true,
  platform: "node",
  format: "esm",
  outdir: path.join(work, "expanded"),
  outExtension: { ".js": ".mjs" },
});
const { validate, completed } = await import(
  pathToFileURL(path.join(work, "expanded/services/progress.mjs"))
);
const old = {
  version: 1,
  current: "c1-1",
  records: { "c1-1": { quizPassed: true, practicePassed: true } },
  freeMode: false,
};
assert(completed(validate(old).records["c1-1"]));
assert(
  validate({ ...old, records: { "c1-1": { quizPassed: true } } }).records[
    "c1-1"
  ].quizPassed === false,
);
const { judge } = await import(
  pathToFileURL(path.join(work, "expanded/engine/judge.mjs"))
);
const run = (stdout) => ({
  status: "success",
  stdout,
  stderr: "",
  exitCode: 0,
  duration: 0,
});
assert.equal(
  judge([{ input: "", output: "A\nB" }], [run("A B")])[0].passed,
  false,
);
assert.equal(
  judge([{ input: "", output: "1 2\n" }], [run("1  2  \n")])[0].passed,
  true,
);
console.log(
  "Expanded content, old progress migration and line-sensitive judging passed:",
  count,
  "quizzes,",
  Object.keys(mastery).length,
  "mastery challenges",
);
