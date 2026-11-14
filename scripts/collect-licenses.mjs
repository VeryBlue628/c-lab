import fs from "node:fs/promises";
import path from "node:path";
const project = new URL("../", import.meta.url);
const output = new URL("public/licenses/", project);
await fs.mkdir(output, { recursive: true });
const modules = new URL("node_modules/", project);
const dirs = [];
for (const e of await fs.readdir(modules, { withFileTypes: true })) {
  if (!e.isDirectory() || e.name.startsWith(".")) continue;
  if (e.name.startsWith("@"))
    for (const s of await fs.readdir(new URL(e.name + "/", modules)))
      dirs.push(e.name + "/" + s);
  else dirs.push(e.name);
}
for (const name of dirs) {
  const dir = new URL(name + "/", modules);
  try {
    const p = JSON.parse(
      await fs.readFile(new URL("package.json", dir), "utf8"),
    );
    const license = (await fs.readdir(dir)).find((n) =>
      /^licen[sc]e(\.|$)/i.test(n),
    );
    if (license)
      await fs.writeFile(
        new URL(name.replaceAll("/", "__") + ".txt", output),
        p.name +
          " " +
          p.version +
          "\n\n" +
          (await fs.readFile(new URL(license, dir), "utf8")),
      );
  } catch {}
}
const sources = {
  "wasm-clang-Apache-2.0.txt":
    "https://raw.githubusercontent.com/binji/wasm-clang/master/LICENSE",
  "llvm-8.0.1.txt":
    "https://raw.githubusercontent.com/llvm/llvm-project/llvmorg-8.0.1/llvm/LICENSE.TXT",
  "wasi-libc-NOTICE.txt":
    "https://raw.githubusercontent.com/WebAssembly/wasi-libc/main/LICENSE",
  "wasi-libc-Apache-LLVM.txt":
    "https://raw.githubusercontent.com/WebAssembly/wasi-libc/main/LICENSE-APACHE-LLVM",
  "wasi-libc-Apache.txt":
    "https://raw.githubusercontent.com/WebAssembly/wasi-libc/main/LICENSE-APACHE",
  "wasi-libc-MIT.txt":
    "https://raw.githubusercontent.com/WebAssembly/wasi-libc/main/LICENSE-MIT",
  "musl-COPYRIGHT.txt":
    "https://raw.githubusercontent.com/WebAssembly/wasi-libc/main/libc-top-half/musl/COPYRIGHT",
};
for (const [name, url] of Object.entries(sources)) {
  const r = await fetch(url);
  if (!r.ok) throw Error("License fetch failed " + name + " " + r.status);
  await fs.writeFile(new URL(name, output), await r.text());
}
console.log("License notices collected");
