import fs from "node:fs/promises";
export async function readChapter(i) {
  if (i > 9) {
    const added = JSON.parse(
      await fs.readFile(
        new URL("../src/data/textbook-lessons.json", import.meta.url),
        "utf8",
      ),
    );
    return added.find((c) => c.id === i);
  }
  const read = async (folder) =>
    JSON.parse(
      await fs.readFile(
        new URL(
          "../src/data/" + folder + "/chapter-" + i + ".json",
          import.meta.url,
        ),
        "utf8",
      ),
    );
  const [c, q, p] = await Promise.all(
    ["lessons", "quizzes", "challenges"].map(read),
  );
  return {
    ...c,
    lessons: c.lessons.map((l) => ({
      ...l,
      quiz: q[l.id],
      challenge: p[l.id],
    })),
  };
}
