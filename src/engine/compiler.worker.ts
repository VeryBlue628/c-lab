import { WASI, type WASIFS } from "@runno/wasi";
import type { RunOptions } from "../data/types";
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
  for (let i = 0; i + 512 <= tar.length; ) {
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
  relativeRoot = false,
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
    const imports = wasi.getImportObject();
    let runtimeMemory: WebAssembly.Memory;
    // Older bundled wasi-libc needs a dot preopen for relative paths.
    // fd 4 aliases the virtual root (fd 3); absolute paths remain available.
    if (relativeRoot)
      for (const namespace of Object.values(imports)) {
        const api = namespace as Record<string, WebAssembly.ImportValue>;
        const get = api.fd_prestat_get as (fd: number, ptr: number) => number;
        const name = api.fd_prestat_dir_name as (
          fd: number,
          ptr: number,
          len: number,
        ) => number;
        api.fd_prestat_get = (fd: number, ptr: number) =>
          get(fd === 4 ? 3 : fd, ptr);
        api.fd_prestat_dir_name = (fd: number, ptr: number, len: number) => {
          if (fd === 4) {
            if (len > 0) new Uint8Array(runtimeMemory.buffer, ptr, len)[0] = 46;
            return 0;
          }
          return name(fd, ptr, len);
        };
        for (const key of Object.keys(api)) {
          if (
            !key.startsWith("path_") &&
            !["fd_fdstat_get", "fd_filestat_get"].includes(key)
          )
            continue;
          const original = api[key];
          if (typeof original !== "function") continue;
          api[key] = (...args: number[]) => {
            if (args[0] === 4) args[0] = 3;
            if (key === "path_rename" && args[3] === 4) args[3] = 3;
            if (key === "path_link" && args[4] === 4) args[4] = 3;
            return original(...args);
          };
        }
      }
    const instance = await WebAssembly.instantiate(module, imports);
    runtimeMemory = instance.exports.memory as WebAssembly.Memory;
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
  data: {
    code: string;
    inputs: string[];
    options?: RunOptions[];
    toolchainBase?: string;
  };
}) => {
  try {
    await load(data.toolchainBase);
    send("compile", "正在按 C99 标准编译…");
    const options = data.options || [];
    const validName = (name: string) =>
      /^[A-Za-z0-9_][A-Za-z0-9_.-]{0,63}$/.test(name) && name !== "main.c";
    for (const o of options) {
      const entries = Object.entries(o.files || {});
      if (
        entries.length > 16 ||
        entries.some(([n, c]) => !validName(n) || typeof c !== "string") ||
        entries.reduce(
          (n, [, c]) => n + new TextEncoder().encode(c).length,
          0,
        ) > 131072
      )
        throw Error("虚拟文件名或容量不正确（最多16个文件，共128 KiB）。");
      if (
        (o.args?.length || 0) > 20 ||
        o.args?.some(
          (a) => typeof a !== "string" || a.length > 1000 || a.includes("\0"),
        )
      )
        throw Error("程序参数过多或不正确。");
    }
    const sourceFiles = Object.entries(options[0]?.files || {}).filter(([n]) =>
      /\.(c|h)$/.test(n),
    );
    if (
      options.some(
        (o) =>
          JSON.stringify(
            Object.entries(o.files || {})
              .filter(([n]) => /\.(c|h)$/.test(n))
              .sort(),
          ) !== JSON.stringify([...sourceFiles].sort()),
      )
    )
      throw Error("同一批测试的源文件与头文件必须一致。");
    let fs: WASIFS = {
      ...base,
      "/main.c": file(
        "/main.c",
        data.code.endsWith("\n") ? data.code : data.code + "\n",
      ),
      ...Object.fromEntries(
        sourceFiles.map(([n, c]) => [
          "/" + n,
          file("/" + n, c.endsWith("\n") ? c : c + "\n"),
        ]),
      ),
    };
    const sources = [
      "main.c",
      ...sourceFiles.filter(([n]) => n.endsWith(".c")).map(([n]) => n),
    ];
    const objects: string[] = [];
    let compileWarnings = "";
    for (let si = 0; si < sources.length; si++) {
      const object = "/unit-" + si + ".o";
      objects.push(object);
      const compile = await execute(
        clang,
        [
          "clang",
          "-cc1",
          "-triple",
          "wasm32-unknown-wasi",
          "-std=c99",
          "-pedantic-errors",
          "-I",
          "/",
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
          object,
          "/" + sources[si],
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
      compileWarnings += compile.result.stderr;
    }
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
        ...objects,
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
      const runtimeFS: WASIFS = Object.fromEntries(
        Object.entries(options[i]?.files || {}).map(([n, c]) => [
          "/" + n,
          file("/" + n, c),
        ]),
      );
      const run = await execute(
        program,
        ["program", ...(options[i]?.args || [])],
        runtimeFS,
        data.inputs[i],
        true,
      );
      const files: Record<string, number[]> = {};
      let fileBytes = 0;
      for (const [name, f] of Object.entries(run.fs)) {
        const bytes =
          f.mode === "binary"
            ? new Uint8Array(f.content)
            : new TextEncoder().encode(f.content);
        fileBytes += bytes.length;
        if (fileBytes > 1048576) throw Error("运行生成的文件超过 1 MiB 限制。");
        files[name.replace(/^\//, "")] = Array.from(bytes);
      }
      runs.push({
        ...run.result,
        files,
        stderr: compileWarnings + run.result.stderr,
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
