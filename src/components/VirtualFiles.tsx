import { useState } from "react";
import { Download, FilePlus2, Trash2 } from "lucide-react";
export function VirtualFiles({
  files,
  args,
  onFiles,
  onArgs,
  disabled,
}: {
  files: Record<string, string>;
  args: string[];
  onFiles: (f: Record<string, string>) => void;
  onArgs: (a: string[]) => void;
  disabled: boolean;
}) {
  const [name, setName] = useState(""),
    [error, setError] = useState("");
  return (
    <details
      className="virtual-files"
      open={Object.keys(files).length > 0 || args.length > 0}
    >
      <summary>
        虚拟文件与程序参数{" "}
        <small>
          {Object.keys(files).length} 个文件 · {args.length} 个参数
        </small>
      </summary>
      <p>
        每次运行从这些文件开始。.c 文件会分别编译，.h
        文件可被包含；其他文件供程序读写。运行后可下载结果。
      </p>
      {Object.entries(files).map(([n, c]) => (
        <label className="virtual-file" key={n}>
          <span>
            <strong>{n}</strong>
            <button
              disabled={disabled}
              type="button"
              className="icon-button"
              aria-label={"删除文件 " + n}
              onClick={() => {
                const copy = { ...files };
                delete copy[n];
                onFiles(copy);
              }}
            >
              <Trash2 size={13} />
            </button>
          </span>
          <textarea
            aria-label={"文件内容 " + n}
            spellCheck={false}
            value={c}
            disabled={disabled}
            onChange={(e) => onFiles({ ...files, [n]: e.target.value })}
          />
        </label>
      ))}
      <div className="file-add">
        <input
          aria-label="新建虚拟文件名"
          placeholder="例如 data.txt 或 calc.h"
          value={name}
          onChange={(e) => setName(e.target.value)}
          disabled={disabled}
        />
        <button
          className="secondary"
          disabled={disabled || Object.keys(files).length >= 16}
          onClick={() => {
            if (
              !/^[A-Za-z0-9_][A-Za-z0-9_.-]{0,63}$/.test(name) ||
              name === "main.c" ||
              Object.hasOwn(files, name)
            ) {
              setError("请使用未占用的英文文件名，main.c 由主编辑器管理。");
              return;
            }
            onFiles({ ...files, [name]: "" });
            setName("");
            setError("");
          }}
        >
          <FilePlus2 size={13} />
          添加
        </button>
      </div>
      {error && <p role="alert">{error}</p>}
      <label className="args-label">
        程序参数（每行一个，不含程序名）
        <textarea
          aria-label="程序参数"
          placeholder={"apple\nhello world"}
          disabled={disabled}
          value={args.join("\n")}
          onChange={(e) =>
            onArgs(e.target.value ? e.target.value.split("\n") : [])
          }
        />
      </label>
    </details>
  );
}
export function RunFiles({ files }: { files?: Record<string, number[]> }) {
  if (!files || !Object.keys(files).length) return null;
  return (
    <details className="run-files">
      <summary>运行后的虚拟文件（{Object.keys(files).length}）</summary>
      {Object.entries(files).map(([n, bytes]) => (
        <div key={n}>
          <strong>{n}</strong>
          <small>{bytes.length} B</small>
          <button
            className="text-button"
            aria-label={"下载 " + n}
            onClick={() => {
              const url = URL.createObjectURL(
                new Blob([new Uint8Array(bytes)]),
              );
              const a = document.createElement("a");
              a.href = url;
              a.download = n.split("/").at(-1) || "file";
              a.click();
              setTimeout(() => URL.revokeObjectURL(url), 1000);
            }}
          >
            <Download size={13} />
            下载
          </button>
          <pre>
            {n.endsWith(".bin")
              ? bytes
                  .slice(0, 256)
                  .map((b) => b.toString(16).padStart(2, "0"))
                  .join(" ")
              : new TextDecoder().decode(new Uint8Array(bytes.slice(0, 4096)))}
            {bytes.length > (n.endsWith(".bin") ? 256 : 4096)
              ? "\n（预览已截断，请下载完整文件）"
              : ""}
          </pre>
        </div>
      ))}
    </details>
  );
}
