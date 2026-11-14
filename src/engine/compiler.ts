import type { Execution } from "./types";
let worker: Worker | undefined;
let active = false;
let cancelJob: (() => void) | undefined;
export function stop() {
  cancelJob?.();
}
export async function runCode(
  code: string,
  inputs: string[],
  onStage: (s: string) => void = () => {},
): Promise<Execution[]> {
  if (active) throw Error("请等待当前运行结束");
  if (code.length > 100000)
    return [
      {
        status: "system-error",
        stdout: "",
        stderr: "代码超过 100 KB 限制。",
        exitCode: -1,
        duration: 0,
      },
    ];
  active = true;
  worker ??= new Worker(new URL("./compiler.worker.ts", import.meta.url), {
    type: "module",
  });
  return new Promise((resolve) => {
    let timer: ReturnType<typeof setTimeout>;
    const partial: Execution[] = [];
    const finish = (runs: Execution[], terminate = false) => {
      clearTimeout(timer);
      if (terminate) {
        worker?.terminate();
        worker = undefined;
      }
      if (worker) {
        worker.onmessage = null;
        worker.onerror = null;
      }
      cancelJob = undefined;
      active = false;
      resolve(runs);
    };
    const deadline = (ms: number) => {
      clearTimeout(timer);
      timer = setTimeout(
        () =>
          finish(
            [
              ...partial,
              {
                status: "timeout",
                stdout: "",
                stderr: "运行超时，已终止沙箱。检查循环条件或递归出口。",
                exitCode: -1,
                duration: ms,
              },
            ],
            true,
          ),
        ms,
      );
    };
    cancelJob = () =>
      finish(
        [
          {
            status: "cancelled",
            stdout: "",
            stderr: "已停止运行。",
            exitCode: -1,
            duration: 0,
          },
        ],
        true,
      );
    worker!.onmessage = ({ data }) => {
      if (data.type === "stage") {
        onStage(data.message);
        deadline(
          data.stage === "loading"
            ? 120000
            : data.stage === "compile"
              ? 20000
              : 2500,
        );
      } else if (data.type === "partial") partial.push(data.result);
      else if (data.type === "result") finish(data.runs);
    };
    worker!.onerror = (e) =>
      finish(
        [
          {
            status: "system-error",
            stdout: "",
            stderr: e.message,
            exitCode: -1,
            duration: 0,
          },
        ],
        true,
      );
    deadline(120000);
    worker!.postMessage({
      code,
      inputs,
      toolchainBase: new URL("toolchain/", document.baseURI).href,
    });
  });
}
