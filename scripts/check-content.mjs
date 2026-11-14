import { readChapter } from "./read-curriculum.mjs";
import fs from "node:fs/promises";
import assert from "node:assert/strict";
const counts = [4, 11, 9, 7, 5, 9, 7, 8, 3];
let total = 0,
  tests = 0;
const ids = new Set();
for (let i = 1; i <= 9; i++) {
  const c = await readChapter(i);
  assert.equal(c.lessons.length, counts[i - 1]);
  for (const l of c.lessons) {
    assert(!ids.has(l.id));
    ids.add(l.id);
    assert(l.explanation.length >= 2);
    assert(l.explanation.join("").length > 90);
    for (const k of [
      "objective",
      "syntax",
      "syntaxNotes",
      "example",
      "walkthrough",
      "summary",
    ])
      assert(l[k]?.length > 0, l.id + " " + k);
    assert(l.mistakes.length >= 2);
    assert(l.mistakes.every((m) => m.trim().length >= 8));
    assert.equal(new Set(l.mistakes).size, l.mistakes.length);
    assert(l.quiz.answer.length > 0);
    assert(l.quiz.explanation.length > 10);
    assert(l.challenge.tests.length > 0);
    assert.equal(l.challenge.hints.length, 3);
    assert(!/\b(cout|cin|class|new|delete)\b/.test(l.example));
    assert(!/\b(cout|cin|class|new|delete)\b/.test(l.challenge.solution));
    tests += l.challenge.tests.length;
    total++;
  }
}
assert.equal(total, 63);
console.log("Content structure OK:", total, "lessons,", tests, "test cases.");
