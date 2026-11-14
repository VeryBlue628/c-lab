import fs from "node:fs/promises";
await fs.writeFile(new URL("../docs/.nojekyll", import.meta.url), "");
console.log(
  "GitHub Pages build ready: docs/ → https://veryblue628.github.io/c-lab/",
);
