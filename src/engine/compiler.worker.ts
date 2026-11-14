import { WASI, type WASIFS } from "@runno/wasi";
import { gunzipSync } from "fflate";
let base: WASIFS | undefined;
let clang: WebAssembly.Module, ld: WebAssembly.Module;
const send = (stage: string, message: string) =>
  self.postMessage({ type: "stage", stage, message });
const file = (path: string, content: string) => ({
  path,
  content,
  mode: "string" as const,
  timestamps: {
    access: new Date(),
    change: new Date(),
    modification: new Date(),
  },
});
async function load(toolchainBase = "/toolchain/") {
  if (base) return;
  send(
    "loading",
    "首次运行：正在加载 Clang 编译器（约 19 MB），之后使用浏览器缓存…",
  );
  const fetchAsset = async (name: string) => {
    const r = await fetch(toolchainBase + name);
    if (!r.ok)
      throw Error("编译器资源加载失败：" + name + " (" + r.status + ")");
    const bytes = new Uint8Array(await r.arrayBuffer());
    return bytes[0] === 0x1f && bytes[1] === 0x8b
      ? gunzipSync(bytes).buffer
      : bytes.buffer;
  };
  const [c, l, archive] = await Promise.all(
    ["clang.wasm.gzip", "wasm-ld.wasm.gzip", "clang-fs.tar.gz"].map(fetchAsset),
  );
  [clang, ld] = await Promise.all([
    WebAssembly.compile(c),
    WebAssembly.compile(l),
  ]);
  const packed = new Uint8Array(archive);
  const tar =
    packed[0] === 0x1f && packed[1] === 0x8b ? gunzipSync(packed) : packed;
  const decode = new TextDecoder();
  base = {};
  for (let i = 0; i + 512 <= tar.length;) {
    const name = decode.decode(tar.subarray(i, i + 100)).replace(/\0.*$/s, "");
    if (!name) break;
    const prefix = decode
      .decode(tar.subarray(i + 345, i + 500))
      .replace(/\0.*$/s, "");
    const size =
      parseInt(
        decode
          .decode(tar.subarray(i + 124, i + 136))
          .replace(/\0/g, "")
          .trim(),
        8,
      ) || 0;
    const type = tar[i + 156];
    const path = "/" + (prefix ? prefix + "/" : "") + name.replace(/^\.\//, "");
    if (type === 0 || type === 48)
      base[path] = {
        ...file(path, ""),
        mode: "binary",
        content: tar.slice(i + 512, i + 512 + size),
      };
    i += 512 + Math.ceil(size / 512) * 512;
  }
}
async function execute(
  module: WebAssembly.Module,
  args: string[],
  fs: WASIFS,
  input = "",
) {
  let stdout = "",
    stderr = "",
    remaining = input,
    outputBytes = 0;
  const start = performance.now();
  let exitCode = -1;
  const output = (kind: "out" | "err", text: string) => {
    outputBytes += new TextEncoder().encode(text).length;
    if (outputBytes > 65536) throw Error("输出超过 64 KiB 限制，请检查循环。");
    if (kind === "out") stdout += text;
    else stderr += text;
  };
  try {
    const wasi = new WASI({
      args,
      env: {},
      fs,
      isTTY: false,
      stdin: (max) => {
        if (!remaining) return null;
        const value = remaining.slice(0, max);
        remaining = remaining.slice(value.length);
        return value;
      },
      stdout: (t) => output("out", t),
      stderr: (t) => output("err", t),
    });
    const instance = await WebAssembly.instantiate(
      module,
      wasi.getImportObject(),
    );
    const result = wasi.start({ module, instance });
    exitCode = result.exitCode;
    return {
      fs: result.fs,
      result: {
        status: exitCode === 0 ? "success" : "runtime-error",
        stdout,
        stderr,
        exitCode,
        duration: performance.now() - start,
      },
    };
  } catch (e) {
    return {
      fs,
      result: {
        status: "runtime-error",
        stdout,
        stderr: stderr + "\n" + String(e),
        exitCode,
        duration: performance.now() - start,
      },
    };
  }
}
self.onmessage = async ({
  data,
}: {
  data: { code: string; inputs: string[]; toolchainBase?: string };
}) => {
  try {
    await load(data.toolchainBase);
    send("compile", "正在按 C11 标准编译…");
    let fs: WASIFS = { ...base, "/main.c": file("/main.c", data.code) };
    const compile = await execute(
      clang,
      [
        "clang",
        "-cc1",
        "-triple",
        "wasm32-unknown-wasi",
        "-std=c11",
        "-x",
        "c",
        "-isysroot",
        "/sys",
        "-internal-isystem",
        "/sys/include",
        "-internal-isystem",
        "/sys/lib/clang/8.0.1/include",
        "-ferror-limit",
        "8",
        "-O0",
        "-emit-obj",
        "-o",
        "/main.o",
        "/main.c",
      ],
      fs,
    );
    if (compile.result.status !== "success") {
      self.postMessage({
        type: "result",
        runs: [{ ...compile.result, status: "compile-error" }],
      });
      return;
    }
    fs = compile.fs;
    const link = await execute(
      ld,
      [
        "wasm-ld",
        "--no-threads",
        "--export-dynamic",
        "--max-memory=67108864",
        "-z",
        "stack-size=1048576",
        "-L/sys/lib/wasm32-wasi",
        "/sys/lib/wasm32-wasi/crt1.o",
        "/main.o",
        "-lc",
        "-lm",
        "-o",
        "/main.wasm",
      ],
      fs,
    );
    if (link.result.status !== "success") {
      self.postMessage({
        type: "result",
        runs: [{ ...link.result, status: "compile-error" }],
      });
      return;
    }
    const binary = link.fs["/main.wasm"];
    if (binary.mode !== "binary") throw Error("编译器没有生成 WebAssembly");
    const program = await WebAssembly.compile(new Uint8Array(binary.content));
    const runs = [];
    for (let i = 0; i < data.inputs.length; i++) {
      send("run", "正在运行测试 " + (i + 1) + " / " + data.inputs.length);
      const run = await execute(program, ["program"], {}, data.inputs[i]);
      runs.push({
        ...run.result,
        stderr: compile.result.stderr + run.result.stderr,
      });
      self.postMessage({ type: "partial", index: i, result: runs[i] });
    }
    self.postMessage({ type: "result", runs });
  } catch (e) {
    self.postMessage({
      type: "result",
      runs: [
        {
          status: "system-error",
          stdout: "",
          stderr: String(e),
          exitCode: -1,
          duration: 0,
        },
      ],
    });
  }
};
