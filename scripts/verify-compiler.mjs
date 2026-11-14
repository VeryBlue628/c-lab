import { readChapter } from "./read-curriculum.mjs";
import fs from "node:fs/promises";
import path from "node:path";
import { Worker } from "node:worker_threads";
import { build } from "esbuild";
import assert from "node:assert/strict";
import { fileURLToPath } from "node:url";
const project = fileURLToPath(new URL("../", import.meta.url));
const work = process.argv[2]
  ? path.resolve(process.argv[2])
  : path.join(project, ".qa");
await fs.mkdir(work, { recursive: true });
const bundle = path.join(work, "compiler.bundle.mjs");
await build({
  entryPoints: [path.join(project, "src/engine/compiler.worker.ts")],
  bundle: true,
  format: "esm",
  platform: "browser",
  outfile: bundle,
});
const wrapper = path.join(work, "worker.mjs");
await fs.writeFile(
  wrapper,
  `import {parentPort} from 'node:worker_threads';import fs from 'node:fs/promises';globalThis.self=globalThis;globalThis.postMessage=m=>parentPort.postMessage(m);globalThis.fetch=async url=>new Response(await fs.readFile(${JSON.stringify(path.join(project, "public"))}+url),{headers:{'Content-Type':'application/wasm'}});await import(${JSON.stringify(new URL("file:///" + bundle.replaceAll("\\", "/")).href)});parentPort.on('message',data=>self.onmessage({data}));`,
);
let worker = new Worker(wrapper);
let serial = 0;
function job(code, inputs, timeout = 20000) {
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => {
      worker.terminate();
      reject(Error("timeout"));
    }, timeout);
    const handler = (m) => {
      if (m.type === "result") {
        clearTimeout(timer);
        worker.off("message", handler);
        resolve(m.runs);
      }
    };
    worker.on("message", handler);
    worker.postMessage({ code, inputs });
  });
}
const normalize = (s) =>
  s
    .replace(/\r\n?/g, "\n")
    .trim()
    .split("\n")
    .map((line) => line.trim().replace(/[ \t]+/g, " "))
    .join("\n");
const report = {
  lessons: 0,
  examples: 0,
  solutions: 0,
  testCases: 0,
  errors: [],
};
for (let i = 1; i <= 9; i++) {
  const c = await readChapter(i);
  for (const l of c.lessons) {
    for (const kind of ["example", "solution"]) {
      const code = kind === "example" ? l.example : l.challenge.solution;
      const cases =
        kind === "example"
          ? [{ input: l.exampleInput || "", output: l.exampleOutput }]
          : l.challenge.tests;
      const runs = await job(
        code,
        cases.map((c) => c.input),
      );
      for (let t = 0; t < cases.length; t++) {
        const r = runs[t];
        if (
          r?.status !== "success" ||
          normalize(r.stdout) !== normalize(cases[t].output)
        )
          report.errors.push({
            lesson: l.id,
            kind,
            test: t + 1,
            expected: cases[t].output,
            result: r,
          });
      }
      report[kind === "example" ? "examples" : "solutions"]++;
      if (kind === "solution") report.testCases += cases.length;
    }
    report.lessons++;
  }
  console.log("Chapter", i, "checked. Errors:", report.errors.length);
}
const mastery = JSON.parse(
  await fs.readFile(
    new URL("../src/data/mastery-challenges.json", import.meta.url),
    "utf8",
  ),
);
report.mastery = 0;
for (const [id, m] of Object.entries(mastery)) {
  const runs = await job(
    m.solution,
    m.tests.map((t) => t.input),
  );
  for (let i = 0; i < m.tests.length; i++) {
    if (
      runs[i]?.status !== "success" ||
      normalize(runs[i].stdout) !== normalize(m.tests[i].output)
    )
      report.errors.push({
        lesson: id,
        kind: "mastery",
        test: i + 1,
        expected: m.tests[i].output,
        result: runs[i],
      });
  }
  report.mastery++;
  report.testCases += m.tests.length;
}
const bad = await job("int main(void) { missing syntax }", [""]);
assert.equal(bad[0].status, "compile-error");
const trap = await job("int main(void) { __builtin_trap(); }", [""]);
assert.equal(trap[0].status, "runtime-error");
const empty = await job(
  '#include <stdio.h>\nint main(void) { int n; if (scanf("%d", &n)!=1) puts("EOF"); return 0; }',
  [""],
);
assert.equal(empty[0].stdout.trim(), "EOF");
const flood = await job(
  '#include <stdio.h>\nint main(void) { for (;;) puts("output"); }',
  [""],
);
assert.equal(flood[0].status, "runtime-error");
assert(flood[0].stderr.includes("64 KiB"));
await worker.terminate();
await fs.writeFile(
  path.join(work, "compiler-report.json"),
  JSON.stringify(report, null, 2),
);
console.log(JSON.stringify(report, null, 2));
if (report.errors.length) process.exitCode = 1;
