import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import {
  stripHtml,
  normalizeBreakdown,
  jevInjectionQuestion,
} from "./lib.mjs";

const dir = dirname(fileURLToPath(import.meta.url));
const article = readFileSync(join(dir, "fixtures/article.html"), "utf8");
const inject = readFileSync(join(dir, "fixtures/injection.html"), "utf8");

test("stripHtml drops tags and scripts", () => {
  const t = stripHtml(article);
  assert.match(t, /city council/);
  assert.doesNotMatch(t, /<p>/);
  assert.doesNotMatch(t, /alert\(/);
});

test("normalizeBreakdown fills empties and clamps sentiment", () => {
  const n = normalizeBreakdown({
    title: "Hi",
    sentiment: { score: 9, rationale: "x" },
    vitals: { who: ["A"] },
  });
  assert.equal(n.title, "Hi");
  assert.deepEqual(n.vitals.who, ["A"]);
  assert.equal(n.sentiment.score, 1);
  assert.equal(n.quotes.length, 0);
});

test("injection fixture still has the jailbreak line after strip", () => {
  const t = stripHtml(inject);
  assert.match(t, /ignore previous instructions/i);
});

test("jev question is a noul", () => {
  const q = jevInjectionQuestion();
  assert.equal(q.type, "noul");
});
