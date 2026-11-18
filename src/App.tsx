import { useCallback, useEffect, useRef, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  CheckCircle2,
  ChevronRight,
  Menu,
  SkipForward,
  Lock,
  Settings2,
  X,
  Code2,
  Save,
} from "lucide-react";
import { chapters, lessons, lessonById, ensureChapter, learningChapters } from "./data/runtime-curriculum";
import {
  validate,
  completed,
  unlocked,
  type Progress,
  type RecordState,
  type TaskState,
} from "./services/progress";
import { Sidebar } from "./components/Sidebar";
import { useProgress } from "./services/useProgress";
import { mergeTask } from "./services/progress-store";
import { LessonContent, type Tab } from "./components/LessonContent";
import { Workbench } from "./components/Workbench";
import { TextbookGuide } from "./components/TextbookGuide";
import { Journey } from "./components/Journey";
import { Completion } from "./components/Completion";
import { StudyDialog } from "./components/StudyDialog";
export default function App({ initial, storageFailed }: { initial: Progress; storageFailed: boolean }) {
  const { progress: stored, latest, change: setProgress, saveStatus, retry } = useProgress(initial, storageFailed);
  const [current, setCurrent] = useState(() => {
    const id = location.hash.slice(1);
    return unlocked(id, initial) ? id : initial.current;
  });
  const progress = { ...stored, current };
  const [tab, setTab] = useState<Tab>(() => initial.records[current]?.lastTab || "lesson"),
    [mobileNav, setMobileNav] = useState(false),
    [panel, setPanel] = useState<"records" | "diagnostic" | "review" | null>(
      null,
    ),
    [journey, setJourney] = useState(false),
    [textbook, setTextbook] = useState(false),
    [completion, setCompletion] = useState<string | null>(null),
    [toast, setToast] = useState(""),
    [gate, setGate] = useState<{
      kind: "locked" | "skip" | "import" | "unknown";
      fromUrl?: boolean;
      id?: string;
      data?: Progress;
    } | null>(null);
  useEffect(() => {
    const mq = matchMedia("(max-width:1050px)");
    const aside = document.querySelector<HTMLElement>(".sidebar");
    const workspace = document.querySelector<HTMLElement>(".workspace");
    const sync = () => {
      if (aside) aside.inert = mq.matches && !mobileNav;
      if (workspace) workspace.inert = mq.matches && mobileNav;
      if (!mq.matches) setMobileNav(false);
    };
    sync();
    mq.addEventListener("change", sync);
    if (mobileNav) aside?.querySelector<HTMLButtonElement>(".mobile-close")?.focus();
    return () => {
      mq.removeEventListener("change", sync);
      if (mobileNav && workspace) {
        workspace.inert = false;
        workspace.querySelector<HTMLButtonElement>(".nav-toggle")?.focus();
      }
    };
  }, [mobileNav]);
  const returnToLesson = useRef<{ trigger: HTMLElement; positions: [Element, number][] } | null>(null);
  const jumpToCode = () => {
    const trigger = document.activeElement as HTMLElement | null;
    if (trigger) {
      const positions: [Element, number][] = [];
      for (let element = trigger.parentElement; element; element = element.parentElement) {
        if (element.scrollHeight > element.clientHeight) positions.push([element, element.scrollTop]);
      }
      returnToLesson.current = { trigger, positions };
    }
    const title = document.getElementById("code-lab-title");
    title?.focus({ preventScroll: true });
    title?.scrollIntoView({ block: "start" });
  };
  const jumpBack = () => {
    const previous = returnToLesson.current;
    if (previous?.trigger.isConnected) {
      previous.trigger.focus({ preventScroll: true });
      for (const [element, top] of previous.positions) element.scrollTop = top;
    } else {
      const tab = document.querySelector<HTMLElement>('[role="tab"][aria-selected="true"]');
      tab?.focus({ preventScroll: true });
      tab?.scrollIntoView({ block: "center" });
    }
  };
  const gateDialog = useRef<HTMLDialogElement>(null),
    timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const baseLesson = lessonById[progress.current],
    rootRecord = progress.records[baseLesson.id] || {},
    activeChallenge =
      rootRecord.activeChallenge === "mastery" && baseLesson.mastery
        ? "mastery"
        : "practice",
    lesson =
      activeChallenge === "mastery"
        ? { ...baseLesson, challenge: baseLesson.mastery! }
        : baseLesson,
    chapter = chapters[lesson.chapter - 1],
    record = progress.records[lesson.id] || {},
    index = lessons.indexOf(baseLesson);
  const task = record.tasks?.[activeChallenge] || {};
  const input = task.input ?? "";
  const displayRecord = {
    ...record,
    draft:
      task.draft ?? (activeChallenge === "practice" ? record.draft : undefined),
    hint: task.hint ?? (activeChallenge === "practice" ? record.hint : 0),
    practicePassed:
      task.passed ??
      (activeChallenge === "practice" ? record.practicePassed : false),
  };
  const announced = useRef(
    new Set(
      lessons.filter((l) => completed(progress.records[l.id])).map((l) => l.id),
    ),
  );
  useEffect(() => {
    if (completed(record) && !announced.current.has(lesson.id)) {
      announced.current.add(lesson.id);
      setCompletion(lesson.id);
    }
  }, [record, lesson.id]);
  useEffect(() => {
    setTab(record.lastTab || "lesson");
    document.title = lesson.title + " · C Lab";
  }, [lesson.id]);
  const done = completed(record);
  const notify = useCallback((message: string) => {
    clearTimeout(timer.current);
    setToast(message);
    timer.current = setTimeout(() => setToast(""), 4500);
  }, []);
  const lessonLocation = (id: string) => {
    setCurrent(id);
    setMobileNav(false);
    if (location.hash !== "#" + id) history.pushState(null, "", "#" + id);
  };
  const navigate = (id: string, explore = false) => {
    if (!lessonById[id]) return;
    setMobileNav(false);
    if (!explore && !unlocked(id, progress)) {
      setGate({ kind: "locked", id });
      return;
    }
    lessonLocation(id);
    if (latest.current.current !== id || (explore && !latest.current.freeMode))
      setProgress(p => ({ ...p, current: id, freeMode: explore || p.freeMode }));
  };
  useEffect(() => {
    const handler = () => {
      const id = location.hash.slice(1);
      if (!id) { history.replaceState(null, "", "#" + current); return; }
      if (!lessonById[id]) { setGate({ kind: "unknown", fromUrl: true }); return; }
      if (!unlocked(id, { ...latest.current, current })) {
        setGate({ kind: "locked", id, fromUrl: true });
        return;
      }
      setGate(null);
      setCurrent(id);
      setMobileNav(false);
    };
    handler();
    window.addEventListener("hashchange", handler);
    return () => window.removeEventListener("hashchange", handler);
  }, [current]);
  const closeGate = () => {
    if (gate?.fromUrl) history.replaceState(null, "", "#" + current);
    setGate(null);
  };
  useEffect(() => {
    if (gate) gateDialog.current?.showModal();
    else gateDialog.current?.close();
  }, [gate]);
  const update = (patch: Partial<RecordState>) =>
    setProgress((p) => ({
      ...p,
      records: {
        ...p.records,
        [lesson.id]: { ...p.records[lesson.id], ...patch },
      },
    }));
  const updateTask = (patch: Partial<TaskState>) => {
    const seen = task;
    const baseline = { ...seen, files: seen.files ?? lesson.challenge.files };
    setProgress((p) => {
      const r = p.records[lesson.id] || {};
      return {
        ...p,
        records: {
          ...p.records,
          [lesson.id]: {
            ...r,
            tasks: {
              ...r.tasks,
              [activeChallenge]: mergeTask(
                { ...r.tasks?.[activeChallenge], files: r.tasks?.[activeChallenge]?.files ?? lesson.challenge.files },
                baseline,
                patch,
              ),
            },
          },
        },
      };
    });
  };
  const changeTab = (value: Tab) => {
    setTab(value);
    update({ lastTab: value });
  };
  const quizFor = (
    id: string,
    questionId: string,
    correct: boolean,
    answer: string[],
  ) => {
    setProgress((p) => {
      const r = p.records[id] || {};
      const previous = r.questions?.[questionId];
      const questions = {
        ...r.questions,
        [questionId]: {
          passed: previous?.passed || correct,
          lastCorrect: correct,
          answer,
          attempts: (previous?.attempts || 0) + 1,
          correct: (previous?.correct || 0) + (correct ? 1 : 0),
        },
      };
      return {
        ...p,
        records: {
          ...p.records,
          [id]: {
            ...r,
            questions,
            legacyCompleted: r.legacyCompleted || completed(r),
            quizPassed: lessonById[id].quizzes.every(
              (q) => questions[q.id!]?.passed,
            ),
            quizAttempts: (r.quizAttempts || 0) + 1,
            quizCorrect: (r.quizCorrect || 0) + (correct ? 1 : 0),
            failures: (r.failures || 0) + (correct ? 0 : 1),
            streak: correct ? 0 : (r.streak || 0) + 1,
          },
        },
      };
    });
  };
  const quiz = (correct: boolean, answer: string[], id: string) =>
    quizFor(lesson.id, id, correct, answer);
  const next = () => {
    if (index === lessons.length - 1) {
      setPanel("records");
      return;
    }
    const id = lessons[index + 1].id;
    if (unlocked(id, progress)) navigate(id);
    else notify("通过知识检测和编程挑战，或选择已掌握跳过后，继续下一课。");
  };
  const passed = () => {
    setProgress((p) => {
      const r = p.records[lesson.id] || {};
      return {
        ...p,
        records: {
          ...p.records,
          [lesson.id]: {
            ...r,
            streak: 0,
            ...(activeChallenge === "practice"
              ? { practicePassed: true, practiceRevision: lesson.challenge.revision || 1, skipped: false }
              : {}),
            tasks: {
              ...r.tasks,
              [activeChallenge]: {
                ...r.tasks?.[activeChallenge],
                passed: true,
              },
            },
          },
        },
      };
    });
    notify(
      activeChallenge === "mastery"
        ? "Mastery 强化挑战通过！"
        : "基础挑战通过，继续完成知识检测。",
    );
  };
  const mastered = (id: number) => {
    const next = learningChapters[learningChapters.findIndex(c => c.id === id) + 1]?.lessons[0];
    const destination = next?.id || chapters[id - 1].lessons[0].id;
    setProgress((p) => {
      const records = { ...p.records };
      for (const l of chapters[id - 1].lessons)
        if (!completed(records[l.id]))
          records[l.id] = { ...records[l.id], skipped: true };
      return {
        ...p,
        records,
        current: destination,
      };
    });
    lessonLocation(destination);
    notify("本章已标记为已掌握，跳过记录已单独保存。");
  };
  ensureChapter(baseLesson.chapter);
  return (
    <div className="app">
      <aside className={"sidebar " + (mobileNav ? "open" : "")}
        role={mobileNav ? "dialog" : undefined}
        aria-modal={mobileNav || undefined}
        aria-label="课程导航"
        onKeyDown={e => {
          if (!mobileNav) return;
          if (e.key === "Escape") {
            e.preventDefault();
            setMobileNav(false);
          }
          if (e.key === "Tab") {
            const controls = Array.from(e.currentTarget.querySelectorAll<HTMLElement>("button:not(:disabled), input, a[href]"))
              .filter(control => control.tabIndex >= 0 && control.getClientRects().length);
            const first = controls[0], last = controls.at(-1);
            if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last?.focus(); }
            if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first?.focus(); }
          }
        }}
      >
        <Sidebar
          progress={progress}
          onSelect={navigate}
          onLocked={navigate}
          onStats={() => { setMobileNav(false); setPanel("records"); }}
          onDiagnostic={() => { setMobileNav(false); setPanel("diagnostic"); }}
          onClose={() => setMobileNav(false)}
        />
      </aside>
      {mobileNav && (
        <button
          className="sidebar-scrim"
          aria-label="关闭课程导航"
          tabIndex={-1}
          onClick={() => setMobileNav(false)}
        />
      )}
      <div className="workspace">
        <header className="topbar">
          <button
            className="icon-button nav-toggle"
            onClick={() => setMobileNav(true)}
            aria-label="打开课程导航"
          >
            <Menu size={21} />
          </button>
          <div className="breadcrumb">
            <span>C Fundamentals</span>
            <ChevronRight size={13} />
            <span>{chapter.title}</span>
            <ChevronRight size={13} />
            <strong>{lesson.title}</strong>
          </div>
          <div className="topbar-actions">
            <span className="save-indicator" aria-live={saveStatus === "failed" ? "polite" : "off"}>
              <Save size={14} />
              {saveStatus === "saved" ? "已保存到本机" : saveStatus === "pending" ? "保存中…" : "保存失败，可导出"}
              {saveStatus === "failed" && <button className="text-button" onClick={retry}>重试</button>}
            </span>
            <button
              className="icon-button"
              onClick={() => setPanel("records")}
              aria-label="学习设置与记录"
            >
              <Settings2 size={18} />
            </button>
          </div>
        </header>
        <div className="workspace-heading">
          <div>
            <span className="journey-symbol">
              <Code2 size={20} />
            </span>
            <div>
              <strong>一点点理解，一步步实现。</strong>
              <span>YOUR C LEARNING JOURNEY</span>
            </div>
          </div>
          <button className="review-button" onClick={() => setTextbook(true)}>
            教材目录
          </button>
          <button className="review-button desktop-learning-tool" onClick={() => setJourney(true)}>学习路径</button>
          <button className="review-button desktop-learning-tool" onClick={() => setPanel("review")}>错题与巩固</button>
          <details className="learning-tools">
            <summary className="review-button">学习工具</summary>
            <div className="learning-tools-menu">
              <button className="review-button" onClick={e => {
                const details = e.currentTarget.closest("details");
                if (details) { details.open = false; details.querySelector("summary")?.focus(); }
                setJourney(true);
              }}>学习路径</button>
              <button className="review-button" onClick={e => {
                const details = e.currentTarget.closest("details");
                if (details) { details.open = false; details.querySelector("summary")?.focus(); }
                setPanel("review");
              }}>错题与巩固</button>
            </div>
          </details>
        </div>
        <main className="learning-layout">
          <div className="lesson-pane">
            <LessonContent
              lesson={lesson}
              record={{
                ...record,
                practicePassed: displayRecord.practicePassed,
              }}
              tab={tab}
              onTab={changeTab}
              onQuestionMove={(n) => update({ currentQuestion: n })}
              onChallenge={(mode) => {
                update({ activeChallenge: mode, lastTab: "practice" });
                setTab("practice");
              }}
              activeChallenge={activeChallenge}
              onQuiz={quiz}
              onGoToCode={jumpToCode}
              onRestoreDraft={() => {
                const raw = localStorage.getItem("c-lab-draft-recovery-" + lesson.id + activeChallenge);
                if (!raw) { notify("本题还没有示例载入前的备份"); return; }
                try {
                  const { draft, input, files, args } = JSON.parse(raw) as TaskState;
                  updateTask({ draft, input, files, args });
                  notify("已恢复载入示例前的解答");
                } catch { notify("备份无法读取，请导出本机数据"); }
              }}
              onLoadExample={() => {
                if (displayRecord.draft !== undefined) {
                  if (!window.confirm("载入示例将替换当前代码。将保留上一份解答，可通过“恢复我的解答”找回。是否继续？")) return;
                  try {
                    localStorage.setItem("c-lab-draft-recovery-" + lesson.id + activeChallenge,
                      JSON.stringify({ draft: displayRecord.draft, input, files: task.files ?? lesson.challenge.files ?? {}, args: task.args ?? lesson.challenge.args ?? [] }));
                  } catch {
                    notify("浏览器无法保存示例载入前的备份，请先导出当前草稿。");
                    return;
                  }
                }
                updateTask({
                  draft: lesson.example,
                  input: lesson.exampleInput || "",
                  files: lesson.exampleFiles || {},
                  args: lesson.exampleArgs || [],
                });
                notify("讲解示例已载入代码实验室");
                jumpToCode();
              }}
              onSkip={() => setGate({ kind: "skip" })}
              onNext={next}
            />
            <footer className="lesson-footer">
              <button
                className="secondary previous"
                disabled={index === 0}
                onClick={() => navigate(lessons[index - 1].id)}
              >
                <ArrowLeft size={15} />
                上一课
              </button>
              <span className={done ? "lesson-state complete" : "lesson-state"}>
                {done ? (
                  <>
                    <CheckCircle2 size={14} />
                    本节已完成
                  </>
                ) : record.skipped ? (
                  <>
                    <SkipForward size={14} />
                    已掌握并跳过
                  </>
                ) : (
                  <>
                    {index + 1} / {lessons.length} 节
                  </>
                )}
              </span>
              <button
                className="primary next"
                disabled={
                  index < lessons.length - 1 &&
                  !unlocked(lessons[index + 1].id, progress)
                }
                onClick={next}
              >
                {index === lessons.length - 1 ? "查看学习记录" : "下一课"}
                <ArrowRight size={15} />
              </button>
            </footer>
          </div>
          <Workbench
            key={lesson.id + activeChallenge}
            lesson={lesson}
            showExpectedOutput={tab === "practice"}
            record={displayRecord}
            files={task.files ?? lesson.challenge.files ?? {}}
            args={task.args ?? lesson.challenge.args ?? []}
            onFiles={(files) => updateTask({ files })}
            onArgs={(args) => updateTask({ args })}
            onDraft={(s) => updateTask({ draft: s })}
            input={input}
            onInput={(input) => updateTask({ input })}
            draftHistory={task.draftHistory ?? []}
            onRestoreDraft={draft => updateTask({
              draft,
              draftHistory: [...new Set([displayRecord.draft, ...(task.draftHistory ?? [])])]
                .filter((code): code is string => code !== undefined && code !== draft).slice(0, 5),
            })}
            onReturnToLesson={jumpBack}
            onPassed={passed}
            onFailed={() =>
              setProgress((p) => ({
                ...p,
                records: {
                  ...p.records,
                  [lesson.id]: {
                    ...p.records[lesson.id],
                    tasks: {
                      ...p.records[lesson.id]?.tasks,
                      [activeChallenge]: {
                        ...p.records[lesson.id]?.tasks?.[activeChallenge],
                        failures: (p.records[lesson.id]?.tasks?.[activeChallenge]?.failures ?? 0) + 1,
                      },
                    },
                  },
                },
              }))
            }
            onHint={(n) => updateTask({ hint: n })}
            notify={notify}
          />
        </main>
        <div className="workspace-footnote">
          <span>
            <span className="status-dot" />
            学以致用，每一行都算数。
          </span>
          <span>C99 · WebAssembly · 本地进度</span>
        </div>
      </div>
      {textbook && (
        <TextbookGuide
          progress={progress}
          onClose={() => setTextbook(false)}
          onSelect={(id) => {
            setTextbook(false);
            navigate(id, true);
          }}
        />
      )}
      {journey && (
        <Journey
          progress={progress}
          onClose={() => setJourney(false)}
          onSelect={(id) => {
            setJourney(false);
            navigate(id);
          }}
          onDiagnostic={() => {
            setJourney(false);
            setPanel("diagnostic");
          }}
        />
      )}
      {completion && (
        <Completion
          lesson={lessonById[completion]}
          progress={progress}
          onClose={() => setCompletion(null)}
          onNext={() => {
            setCompletion(null);
            next();
          }}
        />
      )}
      {panel && (
        <StudyDialog
          panel={panel}
          onClose={() => setPanel(null)}
          progress={progress}
          onImport={(text) => {
            try {
              setGate({ kind: "import", data: validate(JSON.parse(text)) });
            } catch (e) {
              notify("导入失败：" + String(e));
            }
          }}
          onFreeMode={() =>
            setProgress((p) => ({ ...p, freeMode: !progress.freeMode }))
          }
          onMastered={mastered}
          onSelect={navigate}
          notify={notify}
          onReviewAnswer={quizFor}
        />
      )}
      <dialog
        ref={gateDialog}
        className="small-dialog"
        aria-labelledby="navigation-dialog-title"
        onCancel={closeGate}
      >
        <div className="dialog-symbol">
          {gate?.kind === "locked" ? (
            <Lock size={24} />
          ) : gate?.kind === "skip" ? (
            <SkipForward size={24} />
          ) : (
            <Save size={24} />
          )}
        </div>
        <h2 id="navigation-dialog-title">
          {gate?.kind === "locked"
            ? "学习「" + lessonById[gate.id!].title + "」？"
            : gate?.kind === "unknown" ? "未找到这个课时"
            : gate?.kind === "skip"
              ? "标记为已掌握并跳过？"
              : "导入这份学习记录？"}
        </h2>
        <p>
          {gate?.kind === "locked"
            ? "当前采用顺序学习。你可以开启自由探索，随时访问所有课程；完成状态仍由真实测验和编程结果决定。"
            : gate?.kind === "unknown" ? "这个课程地址无效。关闭后可继续当前课程，或从教材目录查找。"
            : gate?.kind === "skip"
              ? "跳过后会解锁下一课，并单独记录为“已跳过”。以后仍可回来完成测验和编程挑战。"
              : "导入会替换当前的进度与草稿。建议先取消并导出当前记录，保留备份。"}
        </p>
        <div className="dialog-actions">
          <button className="secondary" onClick={closeGate}>
            {gate?.kind === "locked" || gate?.kind === "unknown" ? "继续当前课程" : "取消"}
          </button>
          {gate?.kind !== "unknown" && <button
            className="primary"
            onClick={() => {
              if (gate?.kind === "locked") {
                navigate(gate.id!, true);
              } else if (gate?.kind === "skip") {
                setProgress((p) => ({
                  ...p,
                  records: {
                    ...p.records,
                    [lesson.id]: { ...p.records[lesson.id], skipped: true },
                  },
                  current: lessons[index + 1]?.id || lesson.id,
                }));
                lessonLocation(lessons[index + 1]?.id || lesson.id);
                notify("已跳过本节，可以继续学习");
              } else if (gate?.data) {
                const imported = gate.data;
                setProgress(() => imported);
                lessonLocation(imported.current);
                notify("学习记录与草稿已恢复");
              }
              setGate(null);
            }}
          >
            {gate?.kind === "locked"
              ? "自由探索本课"
              : gate?.kind === "skip"
                ? "已掌握，跳过"
                : "导入并替换"}
            <ArrowRight size={15} />
          </button>}
        </div>
      </dialog>
      {toast && (
        <div className="toast" role="status">
          <Check size={16} />
          {toast}
          <button onClick={() => setToast("")} aria-label="关闭提示">
            <X size={14} />
          </button>
        </div>
      )}
    </div>
  );
}
