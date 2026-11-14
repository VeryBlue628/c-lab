import fs from "node:fs/promises";
import assert from "node:assert/strict";
import { build } from "esbuild";
import path from "node:path";
import { pathToFileURL } from "node:url";
const read = async (n) =>
  JSON.parse(
    await fs.readFile(new URL("../src/data/" + n, import.meta.url), "utf8"),
  );
const added = await read("textbook-lessons.json"),
  guide = await read("textbook-guide.json");
assert.equal(added.flatMap((c) => c.lessons).length, 84);
const audit = await read("page-review.json");
assert.equal(audit.status, "complete");
assert.equal(audit.sourcePages, 395);
assert.deepEqual(
  audit.pages.map((p) => p.page),
  Array.from({ length: 371 }, (_, i) => 1 + i),
);
const work = path.resolve(process.argv[2] || ".qa");
await fs.mkdir(work, { recursive: true });
const bundle = path.join(work, "textbook.mjs");
await build({
  entryPoints: [
    "src/data/curriculum.ts",
    "src/services/progress.ts",
    "src/engine/judge.ts",
  ],
  bundle: true,
  platform: "node",
  format: "esm",
  outdir: path.join(work, "textbook"),
  outExtension: { ".js": ".mjs" },
});
const { chapters, lessons, lessonById, curriculumStats } = await import(
  pathToFileURL(path.join(work, "textbook/data/curriculum.mjs"))
);
const { validate, completed } = await import(
  pathToFileURL(path.join(work, "textbook/services/progress.mjs"))
);
const { judge } = await import(
  pathToFileURL(path.join(work, "textbook/engine/judge.mjs"))
);
assert.equal(lessons.length, 147);
assert.equal(chapters.length, 20);
assert.equal(curriculumStats.questions, 663);
assert.equal(curriculumStats.challenges, 168);
const ids = new Set(),
  qs = new Set();
assert.deepEqual(
  chapters.map((c) => c.id),
  Array.from({ length: 20 }, (_, i) => i + 1),
);
for (const l of lessons) {
  assert(!ids.has(l.id));
  ids.add(l.id);
  assert(l.textbook);
  for (const q of l.quizzes) {
    assert(!qs.has(q.id));
    qs.add(q.id);
    assert(q.answer.length && q.explanation.length > 8);
    if (q.options) for (const a of q.answer) assert(q.options.includes(a));
  }
  if (l.chapter > 9) {
    assert(
      l.explanation.length >= 2 && l.explanation.join("").length > 100,
      l.id,
    );
    assert(l.mistakes.length >= 2 && l.challenge.hints.length === 3);
    assert(l.challenge.tests.length >= 1);
  }
}
for (const c of guide) for (const id of c.lessons) assert(lessonById[id], id);
for (const p of audit.pages)
  for (const id of p.lessons) assert(lessonById[id], "audit " + id);
const mapped = new Set(guide.flatMap((c) => c.lessons));
for (const l of lessons.filter((l) => l.chapter !== 9))
  assert(mapped.has(l.id), "unmapped " + l.id);
const old = validate({
  version: 1,
  current: "c1-1",
  records: { "c1-1": { quizPassed: true, practicePassed: true } },
  freeMode: false,
});
assert(completed(old.records["c1-1"]));
const fresh = validate({
  version: 1,
  current: "c12-3",
  records: {
    "c12-3": {
      tasks: {
        practice: {
          draft: "code",
          files: { "calc.h": "header" },
          args: ["one", "two words"],
        },
      },
    },
  },
  freeMode: true,
});
assert.equal(fresh.records["c12-3"].tasks.practice.files["calc.h"], "header");
assert.deepEqual(fresh.records["c12-3"].tasks.practice.args, [
  "one",
  "two words",
]);
const test = {
    input: "",
    output: "5",
    expectedFiles: { "note.txt": "hello\n" },
  },
  run = {
    status: "success",
    stdout: "5",
    stderr: "",
    exitCode: 0,
    duration: 0,
  };
assert(!judge([test], [run])[0].passed);
assert(
  judge(
    [test],
    [
      {
        ...run,
        files: { "note.txt": [...new TextEncoder().encode("hello\n")] },
      },
    ],
  )[0].passed,
);
const formatting = {
  input: "",
  output: "|     7|7     |\n|hel|\n",
  exact: true,
};
assert(judge([formatting], [{ ...run, stdout: formatting.output }])[0].passed);
assert(
  judge(
    [formatting],
    [{ ...run, stdout: formatting.output.replaceAll("\n", "\r\n") }],
  )[0].passed,
);
assert(
  !judge([formatting], [{ ...run, stdout: "| 7|7 |\n|hel|\n" }])[0].passed,
);
assert(
  !judge([formatting], [{ ...run, stdout: formatting.output.trimEnd() }])[0]
    .passed,
);
assert(
  judge(
    [{ ...formatting, exact: false }],
    [{ ...run, stdout: "| 7|7 |\n|hel|" }],
  )[0].passed,
);
assert(
  !judge(
    [test],
    [{ ...run, files: { "note.txt": [...new TextEncoder().encode("hello")] } }],
  )[0].passed,
);
console.log(
  "Textbook mapping, 147 lessons / 663 questions / 168 challenges, 371 page records, exact/file judging and progress migration passed.",
);
