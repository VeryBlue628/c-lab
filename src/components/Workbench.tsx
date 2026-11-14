import { VirtualFiles, RunFiles } from "./VirtualFiles";
import { diagnose } from "../engine/diagnostics";
import { useEffect, useRef, useState } from "react";
import {
  Play,
  Send,
  Square,
  RotateCcw,
  Copy,
  Trash2,
  Minus,
  Plus,
  Terminal,
  ChevronUp,
  ChevronDown,
  Lightbulb,
  Check,
  CheckCircle2,
  XCircle,
  FileCode2,
  Loader2,
  Maximize2,
  Minimize2,
} from "lucide-react";
import type { Lesson } from "../data/types";
import type { RecordState } from "../services/progress";
import { CodeEditor } from "./CodeEditor";
import { runCode, stop } from "../engine/compiler";
import { judge } from "../engine/judge";
import type { Execution } from "../engine/types";
const titles = {
  success: "运行成功",
  "compile-error": "编译错误",
  "runtime-error": "运行错误",
  timeout: "运行超时",
  cancelled: "已停止",
  "system-error": "运行环境错误",
};
const strip = (s: string) => s.replace(/\x1b\[[0-9;]*m/g, "");
export function Workbench({
  lesson,
  record,
  files,
  args,
  onFiles,
  onArgs,
  onDraft,
  onPassed,
  onFailed,
  onHint,
  input,
  onInput,
  notify,
}: {
  files: Record<string, string>;
  args: string[];
  onFiles: (f: Record<string, string>) => void;
  onArgs: (a: string[]) => void;
  lesson: Lesson;
  record: RecordState;
  onDraft: (s: string) => void;
  onPassed: () => void;
  onFailed: () => void;
  onHint: (n: number) => void;
  input: string;
  onInput: (s: string) => void;
  notify: (s: string) => void;
}) {
  const [busy, setBusy] = useState(false),
    [stage, setStage] = useState(""),
    [runs, setRuns] = useState<Execution[] | null>(null),
    [submitted, setSubmitted] = useState(false),
    [font, setFont] = useState(13),
    [stdinOpen, setStdinOpen] = useState(true),
    [fullscreen, setFullscreen] = useState(false),
    [confirm, setConfirm] = useState<"reset" | "clear" | "answer" | null>(null);
  const mounted = useRef(true);
  const terminal = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (runs)
      terminal.current?.scrollIntoView({
        block: "nearest",
        behavior: "instant",
      });
  }, [runs]);
  useEffect(() => {
    mounted.current = true;
    return () => {
      mounted.current = false;
      stop();
    };
  }, []);
  const code = record.draft ?? lesson.challenge.starter;
  const hint = Math.min(record.hint || 0, 3);
  const [answerVisible, setAnswerVisible] = useState(false);
  const dialog = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    if (confirm) dialog.current?.showModal();
    else dialog.current?.close();
  }, [confirm]);
  const run = async (submit: boolean) => {
    if (busy) return;
    setBusy(true);
    setSubmitted(submit);
    setRuns(null);
    setStage("正在准备编译器…");
    try {
      const result = await runCode(
        code,
        submit ? lesson.challenge.tests.map((t) => t.input) : [input],
        setStage,
        submit
          ? lesson.challenge.tests.map((t) => ({
              files: { ...files, ...t.files },
              args: t.args ?? args,
            }))
          : [{ files, args }],
      );
      if (!mounted.current) return;
      setRuns(result);
      if (submit) {
        const verdict = judge(lesson.challenge.tests, result);
        if (verdict.every((t) => t.passed)) onPassed();
        else if (
          !result.some((r) => ["cancelled", "system-error"].includes(r.status))
        )
          onFailed();
      }
    } catch (e) {
      if (mounted.current)
        setRuns([
          {
            status: "system-error",
            stdout: "",
            stderr: String(e),
            exitCode: -1,
            duration: 0,
          },
        ]);
    } finally {
      if (mounted.current) setBusy(false);
    }
  };
  useEffect(() => {
    const key = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
        e.preventDefault();
        void run(e.shiftKey);
      }
    };
    window.addEventListener("keydown", key);
    return () => window.removeEventListener("keydown", key);
  }, [code, input, busy, files, args]);
  const verdict =
    runs && submitted ? judge(lesson.challenge.tests, runs) : null;
  const errorLine =
    runs?.[0]?.status === "compile-error"
      ? Number(runs[0].stderr.match(/main\.c:(\d+):/)?.[1])
      : undefined;
  return (
    <div className={"workbench " + (fullscreen ? "fullscreen" : "")}>
      <div className="workbench-top">
        <div>
          <FileCode2 size={16} />
          <strong>代码实验室</strong>
        </div>
        <span>
          <i />
          Clang · C99
        </span>
        <button
          className="icon-button"
          aria-label={fullscreen ? "退出全屏编辑器" : "全屏编辑器"}
          onClick={() => setFullscreen(!fullscreen)}
        >
          {fullscreen ? <Minimize2 size={15} /> : <Maximize2 size={15} />}
        </button>
      </div>
      <div className="editor-toolbar">
        <span className="file-tab">
          <span className="file-c">C</span>main.c
          <span className="file-dot" />
        </span>
        <div className="editor-tools">
          <button
            className="icon-button"
            aria-label="缩小代码字号"
            disabled={font <= 11}
            onClick={() => setFont(font - 1)}
          >
            <Minus size={13} />
          </button>
          <span>{font}</span>
          <button
            className="icon-button"
            aria-label="放大代码字号"
            disabled={font >= 22}
            onClick={() => setFont(font + 1)}
          >
            <Plus size={13} />
          </button>
          <i />
          <button
            className="icon-button"
            title="复制代码"
            aria-label="复制代码"
            onClick={async () => {
              try {
                await navigator.clipboard.writeText(code);
                notify("代码已复制");
              } catch {
                notify("复制失败，请在编辑器中全选后复制");
              }
            }}
          >
            <Copy size={14} />
          </button>
          <button
            className="icon-button"
            aria-label="清空代码"
            title="清空代码"
            onClick={() => setConfirm("clear")}
          >
            <Trash2 size={14} />
          </button>
          <button
            className="icon-button"
            aria-label="恢复默认代码"
            title="恢复默认代码"
            onClick={() => setConfirm("reset")}
          >
            <RotateCcw size={14} />
          </button>
        </div>
      </div>
      <div className="editor-resize">
        <CodeEditor
          value={code}
          onChange={onDraft}
          fontSize={font}
          errorLine={errorLine}
        />
      </div>
      <div className="editor-status">
        <span>
          C99<span>UTF-8</span>
        </span>
        <span>{code.split("\n").length} 行 · Tab 缩进</span>
      </div>
      <div className="stdin-area">
        <button
          className="stdin-heading"
          aria-expanded={stdinOpen}
          onClick={() => setStdinOpen(!stdinOpen)}
        >
          <span>
            <Terminal size={13} />
            标准输入 <small>stdin</small>
          </span>
          {stdinOpen ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
        </button>
        {stdinOpen && (
          <textarea
            aria-label="标准输入 stdin"
            placeholder="程序需要输入时，在这里填写；多行输入也可以。"
            value={input}
            onChange={(e) => onInput(e.target.value)}
          />
        )}
      </div>
      <VirtualFiles
        files={files}
        args={args}
        onFiles={onFiles}
        onArgs={onArgs}
        disabled={busy}
      />
      <div className="run-actions">
        <button
          className="run-button"
          disabled={busy}
          onClick={() => run(false)}
        >
          {busy ? <Loader2 size={16} className="spin" /> : <Play size={16} />}
          运行代码<kbd>Ctrl ↵</kbd>
        </button>
        {busy ? (
          <button className="stop-button" onClick={stop}>
            <Square size={13} />
            停止
          </button>
        ) : (
          <button className="primary submit-button" onClick={() => run(true)}>
            <Send size={15} />
            提交答案
          </button>
        )}
      </div>
      <div className="terminal-panel" ref={terminal}>
        <div className="terminal-heading">
          <div>
            <Terminal size={15} />
            终端输出
            <span className="tiny-badge">
              {submitted ? "测试结果" : "OUTPUT"}
            </span>
          </div>
          <button
            className="text-button"
            disabled={busy}
            onClick={() => {
              setRuns(null);
              setSubmitted(false);
            }}
          >
            清除
          </button>
        </div>
        <div className="terminal-content" aria-live="polite">
          {busy ? (
            <div className="terminal-loading">
              <Loader2 size={17} className="spin" />
              <span>{stage}</span>
            </div>
          ) : !runs ? (
            <div className="terminal-empty">
              <span className="terminal-prompt">❯</span>
              <p>
                写下你的思路，运行看看。
                <small>真实编译 · 浏览器沙箱 · 无需安装环境</small>
              </p>
            </div>
          ) : (
            <>
              {runs[0] && runs[0].status !== "success" && !submitted ? (
                <>
                  <div className="output-status error">
                    <XCircle size={15} />
                    {titles[runs[0].status]}
                  </div>
                  <pre className="error-output">{strip(runs[0].stderr)}</pre>
                  <p className="error-advice">{diagnose(runs[0])}</p>
                  {runs[0].status === "compile-error" && (
                    <p className="error-advice">
                      {errorLine
                        ? "已定位编辑器中的第 " + errorLine + " 行。"
                        : ""}
                      检查分号、括号、声明和格式控制符；修复第一个错误后再编译。
                    </p>
                  )}
                </>
              ) : verdict ? (
                <>
                  <div
                    className={
                      "output-status " +
                      (verdict.every((t) => t.passed) ? "success" : "error")
                    }
                  >
                    {verdict.every((t) => t.passed) ? (
                      <CheckCircle2 size={15} />
                    ) : (
                      <XCircle size={15} />
                    )}
                    通过 {verdict.filter((t) => t.passed).length} /{" "}
                    {verdict.length} 组测试
                  </div>
                  {verdict.map((v, i) => (
                    <details
                      open={!v.passed}
                      className={
                        "test-case " + (v.passed ? "passed" : "failed")
                      }
                      key={i}
                    >
                      <summary>
                        {v.passed ? <Check size={13} /> : <XCircle size={13} />}
                        测试 {i + 1}
                        <span>
                          {v.passed
                            ? "通过"
                            : v.run?.status === "timeout"
                              ? "超时"
                              : "未通过"}
                        </span>
                        <small>
                          {v.run
                            ? Math.round(v.run.duration) + " ms"
                            : "未运行"}
                        </small>
                        <ChevronDown size={12} />
                      </summary>
                      <div>
                        <p>
                          输入：<code>{v.test.input || "（无）"}</code>
                        </p>
                        <p>
                          期望：<code>{v.test.output || "（无输出）"}</code>
                        </p>
                        <p>
                          实际：<code>{v.run?.stdout || "（无输出）"}</code>
                        </p>
                        {Object.entries(v.test.expectedFiles || {}).map(
                          ([name, expected]) => (
                            <p key={name}>
                              文件 {name}：<code>{expected}</code>（逐字节检查）
                            </p>
                          ),
                        )}
                        <RunFiles files={v.run?.files} />
                        {v.run?.stderr && (
                          <pre className="error-output">
                            {strip(v.run.stderr)}
                            {"\n" + diagnose(v.run)}
                          </pre>
                        )}
                      </div>
                    </details>
                  ))}
                  {verdict.every((t) => t.passed) ? (
                    <p className="success-note">
                      {record.quizPassed
                        ? "本挑战通过；基础挑战与本节全部检测通过后，课程才完成。"
                        : "挑战已通过，完成知识检测后即可完成本课。"}
                    </p>
                  ) : (
                    <p className="error-advice">
                      展开未通过用例，对照实际值与期望值。连续出错时，建议回到讲解并查看分级提示。
                    </p>
                  )}
                </>
              ) : (
                <>
                  <div className="output-status success">
                    <CheckCircle2 size={15} />
                    运行成功<span>{Math.round(runs[0].duration)} ms</span>
                  </div>
                  <pre className="program-output">
                    {runs[0].stdout || "（程序没有输出）"}
                  </pre>
                  {runs[0].stderr && (
                    <pre className="warning-output">
                      {strip(runs[0].stderr)}
                    </pre>
                  )}
                  <RunFiles files={runs[0].files} />
                  <p className="finish-note">
                    Program finished successfully. Exit code: 0
                  </p>
                </>
              )}
            </>
          )}
        </div>
      </div>
      <div className="hints-area">
        <div>
          <Lightbulb size={15} />
          <strong>卡住了？一点提示</strong>
          <button
            className="text-button"
            disabled={hint >= 3}
            onClick={() => onHint(hint + 1)}
          >
            {hint < 3 ? "查看提示 " + (hint + 1) + "/3" : "提示已全部展开"}
            <ChevronDown size={13} />
          </button>
        </div>
        {Array.from({ length: hint }, (_, i) => (
          <p key={i}>
            <span>{i + 1}</span>
            {lesson.challenge.hints[i]}
          </p>
        ))}
        {hint >= 3 && (
          <button
            className="text-button solution-link"
            onClick={() => setConfirm("answer")}
          >
            查看参考答案与思路
          </button>
        )}
        {answerVisible && (
          <div className="solution">
            <strong>参考答案</strong>
            <p>{lesson.challenge.hints[2]}</p>
            <pre>{lesson.challenge.solution}</pre>
            <button
              className="text-button"
              onClick={() => {
                onDraft(lesson.challenge.solution);
                notify("参考答案已载入，请运行并理解每一步");
              }}
            >
              载入编辑器 →
            </button>
          </div>
        )}
      </div>
      <dialog
        ref={dialog}
        className="small-dialog"
        onCancel={() => setConfirm(null)}
      >
        <h2>
          {confirm === "answer"
            ? "查看参考答案？"
            : confirm === "clear"
              ? "清空编辑器？"
              : "恢复默认代码？"}
        </h2>
        <p>
          {confirm === "answer"
            ? "先对照提示整理自己的思路。参考答案不会自动替你完成课程。"
            : "当前代码将被替换。你可以使用编辑器的 Ctrl+Z 撤销。"}
        </p>
        <div className="dialog-actions">
          <button className="secondary" onClick={() => setConfirm(null)}>
            取消
          </button>
          <button
            className="primary"
            onClick={() => {
              if (confirm === "answer") setAnswerVisible(true);
              else {
                onDraft(confirm === "clear" ? "" : lesson.challenge.starter);
                if (confirm === "reset") {
                  onFiles(lesson.challenge.files || {});
                  onArgs(lesson.challenge.args || []);
                }
              }
              setConfirm(null);
            }}
          >
            确认
          </button>
        </div>
      </dialog>
    </div>
  );
}
