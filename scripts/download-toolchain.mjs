import fs from "node:fs/promises";
import { gzipSync } from "node:zlib";
import { createHash } from "node:crypto";
const dir = new URL("../public/toolchain/", import.meta.url);
await fs.mkdir(dir, { recursive: true });
const manifest = JSON.parse(
  await fs.readFile(new URL("manifest.json", dir), "utf8"),
);
for (const file of manifest.files) {
  const path = new URL(file.asset, dir);
  try {
    if ((await fs.stat(path)).size > 1000) continue;
  } catch {}
  console.log("Downloading", file.name);
  const response = await fetch(manifest.source + file.name);
  if (!response.ok) throw Error(response.status + " " + file.name);
  const bytes = new Uint8Array(await response.arrayBuffer());
  if (createHash("sha256").update(bytes).digest("hex") !== file.sha256)
    throw Error("Toolchain checksum mismatch: " + file.name);
  await fs.writeFile(
    path,
    file.asset.endsWith(".gzip") ? gzipSync(bytes, { level: 9 }) : bytes,
  );
  console.log("Saved", file.asset);
}
