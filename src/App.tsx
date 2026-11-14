import { useCallback, useEffect, useRef, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  CheckCircle2,
  ChevronRight,
  Menu,
  PanelLeft,
  SkipForward,
  Lock,
  Settings2,
  X,
  Code2,
  Save,
  BookOpen,
} from "lucide-react";
import { chapters, lessons, lessonById } from "./data/curriculum";
import {
  load,
  save,
  validate,
  completed,
  unlocked,
  type Progress,
  type RecordState,
  type TaskState,
} from "./services/progress";
import { Sidebar } from "./components/Sidebar";
import { LessonContent, type Tab } from "./components/LessonContent";
import { Workbench } from "./components/Workbench";
import { Journey } from "./components/Journey";
import { Completion } from "./components/Completion";
import { StudyDialog } from "./components/StudyDialog";
export default function App() {
  const [progress, setProgress] = useState<Progress>(() => {
      const p = load();
      const id = location.hash.slice(1);
      if (lessonById[id] && unlocked(id, p)) p.current = id;
      return p;
    }),
    [tab, setTab] = useState<Tab>("lesson"),
    [mobileNav, setMobileNav] = useState(false),
    [panel, setPanel] = useState<"records" | "diagnostic" | "review" | null>(
      null,
    ),
    [journey, setJourney] = useState(false),
    [completion, setCompletion] = useState<string | null>(null),
    [input, setInput] = useState(""),
    [toast, setToast] = useState(""),
    [saved, setSaved] = useState(true),
    [gate, setGate] = useState<{
      kind: "locked" | "skip" | "import";
      id?: string;
      data?: Progress;
    } | null>(null);
  const gateDialog = useRef<HTMLDialogElement>(null),
    timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined),
    latest = useRef(progress);
  latest.current = progress;
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
    setInput(task.input || "");
    setTab(record.lastTab || "lesson");
  }, [lesson.id, activeChallenge]);
  const done = completed(record);
  useEffect(() => {
    if (location.hash.slice(1) !== progress.current)
      history.replaceState(null, "", "#" + progress.current);
  }, [progress.current]);
  const notify = useCallback((message: string) => {
    clearTimeout(timer.current);
    setToast(message);
    timer.current = setTimeout(() => setToast(""), 4500);
  }, []);
  useEffect(() => {
    setSaved(false);
    const t = setTimeout(() => {
      try {
        save(progress);
        setSaved(true);
      } catch {
        notify("浏览器无法保存进度，请导出备份。");
      }
    }, 400);
    return () => clearTimeout(t);
  }, [progress, notify]);
  useEffect(() => {
    const handler = () => {
      try {
        save(latest.current);
      } catch {}
    };
    window.addEventListener("beforeunload", handler);
    window.addEventListener("pagehide", handler);
    return () => {
      window.removeEventListener("beforeunload", handler);
      window.removeEventListener("pagehide", handler);
    };
  }, []);
  const navigate = (id: string) => {
    if (!lessonById[id]) return;
    setProgress((p) => ({ ...p, current: id }));
    setTab("lesson");
    setInput("");
    setMobileNav(false);
    history.pushState(null, "", "#" + id);
  };
  useEffect(() => {
    const handler = () => {
      const id = location.hash.slice(1) || lessons[0].id;
      if (lessonById[id] && unlocked(id, latest.current)) {
        setProgress((p) => ({ ...p, current: id }));
        setTab("lesson");
        setInput("");
      }
    };
    window.addEventListener("hashchange", handler);
    return () => window.removeEventListener("hashchange", handler);
  }, []);
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
  const updateTask = (patch: Partial<TaskState>) =>
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
              [activeChallenge]: { ...r.tasks?.[activeChallenge], ...patch },
            },
          },
        },
      };
    });
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
              ? { practicePassed: true, skipped: false }
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
    setProgress((p) => {
      const records = { ...p.records };
      for (const l of chapters[id - 1].lessons)
        if (!completed(records[l.id]))
          records[l.id] = { ...records[l.id], skipped: true };
      const next = chapters[id]?.lessons[0];
      return {
        ...p,
        records,
        current: next?.id || chapters[id - 1].lessons[0].id,
      };
    });
    setTab("lesson");
    setInput("");
    notify("本章已标记为已掌握，跳过记录已单独保存。");
  };
  return (
    <div className="app">
      <aside className={"sidebar " + (mobileNav ? "open" : "")}>
        <Sidebar
          progress={progress}
          onSelect={navigate}
          onLocked={(id) => setGate({ kind: "locked", id })}
          onStats={() => setPanel("records")}
          onDiagnostic={() => setPanel("diagnostic")}
          onClose={() => setMobileNav(false)}
        />
      </aside>
      {mobileNav && (
        <button
          className="sidebar-scrim"
          aria-label="关闭课程导航"
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
            <span className="save-indicator">
              <Save size={14} />
              {saved ? "已保存到本机" : "保存中…"}
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
          <button className="review-button" onClick={() => setJourney(true)}>
            学习路径
          </button>
          <button className="review-button" onClick={() => setPanel("review")}>
            <BookOpen size={14} />
            错题与巩固
            <ArrowRight size={14} />
          </button>
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
              onLoadExample={() => {
                updateTask({
                  draft: lesson.example,
                  input: lesson.exampleInput || "",
                });
                setInput(lesson.exampleInput || "");
                notify("示例已载入右侧编辑器，可点击运行代码");
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
                  <>{index + 1} / 63 节</>
                )}
              </span>
              <button
                className="primary next"
                disabled={
                  index < 62 && !unlocked(lessons[index + 1].id, progress)
                }
                onClick={next}
              >
                {index === 62 ? "查看学习记录" : "下一课"}
                <ArrowRight size={15} />
              </button>
            </footer>
          </div>
          <Workbench
            key={lesson.id + activeChallenge}
            lesson={lesson}
            record={displayRecord}
            onDraft={(s) => updateTask({ draft: s })}
            input={input}
            onInput={(s) => {
              setInput(s);
              updateTask({ input: s });
            }}
            onPassed={passed}
            onFailed={() =>
              setProgress((p) => ({
                ...p,
                records: {
                  ...p.records,
                  [lesson.id]: {
                    ...p.records[lesson.id],
                    failures: (p.records[lesson.id]?.failures || 0) + 1,
                    streak: (p.records[lesson.id]?.streak || 0) + 1,
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
          <span>C11 · WebAssembly · 本地进度</span>
        </div>
      </div>
      {journey && (
        <Journey
          progress={progress}
          onClose={() => setJourney(false)}
          onSelect={(id) => {
            setJourney(false);
            unlocked(id, progress)
              ? navigate(id)
              : setGate({ kind: "locked", id });
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
            setProgress((p) => ({ ...p, freeMode: !p.freeMode }))
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
        onCancel={() => setGate(null)}
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
        <h2>
          {gate?.kind === "locked"
            ? "想直接学习这一节？"
            : gate?.kind === "skip"
              ? "标记为已掌握并跳过？"
              : "导入这份学习记录？"}
        </h2>
        <p>
          {gate?.kind === "locked"
            ? "当前采用顺序学习。你可以开启自由探索，随时访问所有课程；完成状态仍由真实测验和编程结果决定。"
            : gate?.kind === "skip"
              ? "跳过后会解锁下一课，并单独记录为“已跳过”。以后仍可回来完成测验和编程挑战。"
              : "导入会替换当前的进度与草稿。建议先取消并导出当前记录，保留备份。"}
        </p>
        <div className="dialog-actions">
          <button className="secondary" onClick={() => setGate(null)}>
            取消
          </button>
          <button
            className="primary"
            onClick={() => {
              if (gate?.kind === "locked") {
                setProgress((p) => ({
                  ...p,
                  freeMode: true,
                  current: gate.id!,
                }));
                setTab("lesson");
                setInput("");
                setMobileNav(false);
              } else if (gate?.kind === "skip") {
                setProgress((p) => ({
                  ...p,
                  records: {
                    ...p.records,
                    [lesson.id]: { ...p.records[lesson.id], skipped: true },
                  },
                  current: lessons[index + 1]?.id || lesson.id,
                }));
                setTab("lesson");
                setInput("");
                notify("已跳过本节，可以继续学习");
              } else if (gate?.data) {
                setProgress(gate.data);
                setTab("lesson");
                setInput("");
                notify("学习记录与草稿已恢复");
              }
              setGate(null);
            }}
          >
            {gate?.kind === "locked"
              ? "开启自由探索"
              : gate?.kind === "skip"
                ? "已掌握，跳过"
                : "导入并替换"}
            <ArrowRight size={15} />
          </button>
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
