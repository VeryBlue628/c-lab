import { build } from "esbuild";
import fs from "node:fs/promises";
import path from "node:path";
import assert from "node:assert/strict";
import { pathToFileURL } from "node:url";
const dir = path.resolve(process.argv[2] || ".qa");
await fs.mkdir(dir, { recursive: true });
const target = path.join(dir, "progress.bundle.mjs");
await build({
  entryPoints: ["src/services/progress.ts"],
  bundle: true,
  format: "esm",
  platform: "node",
  outfile: target,
});
const { validate, fresh, unlocked, completed, load, save } = await import(
  pathToFileURL(target)
);
const p = fresh();
assert.equal(unlocked("c1-1", p), true);
assert.equal(unlocked("c1-2", p), false);
assert.equal(completed({ quizPassed: true }), false);
assert.equal(completed({ quizPassed: true, practicePassed: true }), true);
assert.throws(() => validate({ ...p, current: "__proto__" }));
assert.throws(() => validate({ ...p, current: ["c1-1"] }));
assert.throws(() =>
  validate({ ...p, records: { "c1-1": { quizAttempts: 1, quizCorrect: 2 } } }),
);
assert.throws(() => validate({ ...p, records: { "c1-1": { hint: 4 } } }));
assert.equal(unlocked("toString", { ...p, freeMode: true }), false);
const skip = { ...p, records: { "c1-1": { skipped: true } } };
assert.equal(unlocked("c1-2", skip), true);
assert.equal(completed(skip.records["c1-1"]), false);
assert.equal(
  validate({
    ...p,
    records: { "c1-1": { draft: "int main(void) {return 0;}" } },
  }).records["c1-1"].draft,
  "int main(void) {return 0;}",
);
console.log("Progress validation and unlock checks passed");

const storage = new Map();
globalThis.localStorage = { getItem: k => storage.get(k) ?? null, setItem: (k,v) => storage.set(k,v) };
save({...fresh(), records:{'c1-1':{quizPassed:true,practicePassed:true},'c2-1':{hint:99}}});
assert(completed(load().records['c1-1']));
assert(storage.has('c-lab-progress-v1-recovery'));
storage.set('c-lab-progress-v1','broken json');
assert.deepEqual(load().records,{});
assert.equal(storage.get('c-lab-progress-v1-recovery'),'broken json');
console.log('Partial recovery and invalid JSON backup checks passed');
