import { useEffect, useRef, useState } from "react";
import {
  X,
  Download,
  Upload,
  CheckCircle2,
  SkipForward,
  Target,
  ArrowRight,
  BookOpen,
  RotateCcw,
  Code2,
  Lightbulb,
} from "lucide-react";
import { chapters, lessons } from "../data/curriculum";
import { reinforcement } from "../data/reinforcement";
import { accuracy, completed, type Progress } from "../services/progress";
import { Quiz } from "./Quiz";
type Panel = "records" | "diagnostic" | "review";
export function StudyDialog({
  panel,
  onClose,
  progress,
  onImport,
  onFreeMode,
  onMastered,
  onSelect,
  notify,
  onReviewAnswer,
}: {
  panel: Panel;
  onClose: () => void;
  progress: Progress;
  onImport: (s: string) => void;
  onFreeMode: () => void;
  onMastered: (chapter: number) => void;
  onSelect: (id: string) => void;
  notify: (s: string) => void;
  onReviewAnswer: (
    lessonId: string,
    questionId: string,
    ok: boolean,
    answer: string[],
  ) => void;
}) {
  const dialog = useRef<HTMLDialogElement>(null),
    file = useRef<HTMLInputElement>(null);
  const [active, setActive] = useState<Panel>(panel),
    [chapterId, setChapterId] = useState<number | null>(null),
    [index, setIndex] = useState(0),
    [answers, setAnswers] = useState<Record<number, boolean>>({}),
    [finished, setFinished] = useState(false),
    [extra, setExtra] = useState<number | null>(null),
    [reviewItem, setReviewItem] = useState<{
      lessonId: string;
      questionId: string;
    } | null>(null),
    [round, setRound] = useState(0);
  useEffect(() => {
    dialog.current?.showModal();
    return () => dialog.current?.close();
  }, []);
  const chapter = chapters.find((c) => c.id === chapterId);
  const count = lessons.filter((l) => completed(progress.records[l.id])).length,
    skipped = lessons.filter(
      (l) =>
        !completed(progress.records[l.id]) && progress.records[l.id]?.skipped,
    ).length;
  const review = lessons.filter(
    (l) => (progress.records[l.id]?.failures || 0) > 0,
  );
  const exportProgress = () => {
    const blob = new Blob([JSON.stringify(progress, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download =
      "c-lab-progress-" + new Date().toISOString().slice(0, 10) + ".json";
    a.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
    notify("学习记录已导出");
  };
  const start = (id: number) => {
    setChapterId(id);
    setRound((n) => n + 1);
    setIndex(0);
    setAnswers({});
    setFinished(false);
  };
  return (
    <dialog className="study-dialog" ref={dialog} onCancel={onClose}>
      <div className="dialog-header">
        <div>
          <span className="eyebrow">YOUR LEARNING SPACE</span>
          <h2>按自己的节奏，学好 C。</h2>
        </div>
        <button
          className="icon-button"
          onClick={onClose}
          aria-label="关闭学习记录"
        >
          <X size={20} />
        </button>
      </div>
      <div className="dialog-tabs">
        {(
          [
            ["records", "学习记录"],
            ["diagnostic", "章节自测"],
            ["review", "错题与巩固"],
          ] as const
        ).map(([id, title]) => (
          <button
            className={active === id ? "selected" : ""}
            key={id}
            onClick={() => setActive(id)}
          >
            {title}
          </button>
        ))}
      </div>
      <div className="dialog-body">
        {active === "records" ? (
          <>
            <div className="stats-grid">
              <div>
                <CheckCircle2 size={18} />
                <strong>
                  {count}
                  <small>/ 63</small>
                </strong>
                <span>已完成课程</span>
              </div>
              <div>
                <SkipForward size={18} />
                <strong>{skipped}</strong>
                <span>已跳过课程</span>
              </div>
              <div>
                <Target size={18} />
                <strong>
                  {accuracy(progress)}
                  <small>%</small>
                </strong>
                <span>知识检测正确率</span>
              </div>
            </div>
            <p className="subtext">
              基础挑战已通过{" "}
              {
                lessons.filter((l) => progress.records[l.id]?.practicePassed)
                  .length
              }
              /63 · Mastery 已通过{" "}
              {
                lessons.filter(
                  (l) => progress.records[l.id]?.tasks?.mastery?.passed,
                ).length
              }
              /17
            </p>
            <div className="chapter-progress-list">
              {chapters.map((c) => {
                const n = c.lessons.filter((l) =>
                  completed(progress.records[l.id]),
                ).length;
                const s = c.lessons.filter(
                  (l) =>
                    !completed(progress.records[l.id]) &&
                    progress.records[l.id]?.skipped,
                ).length;
                return (
                  <div key={c.id}>
                    <span>{String(c.id).padStart(2, "0")}</span>
                    <div>
                      <strong>{c.title}</strong>
                      <div className="progress-track">
                        <i
                          style={{ width: (n / c.lessons.length) * 100 + "%" }}
                        />
                      </div>
                    </div>
                    <small>
                      {n}/{c.lessons.length}
                      {s ? " · 跳过 " + s : ""}
                    </small>
                  </div>
                );
              })}
            </div>
            <label className="mode-setting">
              <div>
                <strong>自由探索模式</strong>
                <p>直接访问全部课程，完成状态仍需通过测验与编程挑战。</p>
              </div>
              <input
                type="checkbox"
                checked={progress.freeMode}
                onChange={onFreeMode}
              />
            </label>
            <div className="backup-section">
              <div>
                <h3>给学习记录留一份备份</h3>
                <p>进度和代码保存在当前浏览器；换设备前，请导出备份。</p>
              </div>
              <div>
                <button className="secondary" onClick={exportProgress}>
                  <Download size={15} />
                  导出进度
                </button>
                <button
                  className="secondary"
                  onClick={() => file.current?.click()}
                >
                  <Upload size={15} />
                  导入进度
                </button>
                <input
                  ref={file}
                  type="file"
                  accept=".json,application/json"
                  hidden
                  onChange={async (e) => {
                    const f = e.target.files?.[0];
                    if (!f) return;
                    if (f.size > 3000000) {
                      notify("备份超过 3 MB，无法导入");
                      return;
                    }
                    onImport(await f.text());
                    e.target.value = "";
                  }}
                />
              </div>
            </div>
          </>
        ) : active === "diagnostic" ? (
          <>
            {!chapter ? (
              <>
                <div className="callout">
                  <Target size={20} />
                  <div>
                    <strong>已经学过？先测试，再决定从哪里开始。</strong>
                    <p>
                      每章从每节题组抽取一道题，重测时轮换，按首次作答计分，达到
                      80% 后可将这一章标为已掌握并跳过。
                    </p>
                  </div>
                </div>
                <div className="diagnostic-grid">
                  {chapters.map((c) => (
                    <button
                      className="diagnostic-card"
                      key={c.id}
                      onClick={() => start(c.id)}
                    >
                      <span>{String(c.id).padStart(2, "0")}</span>
                      <strong>{c.title}</strong>
                      <small>
                        {c.lessons.length} 道题 · {c.en}
                      </small>
                      <ArrowRight size={16} />
                    </button>
                  ))}
                </div>
              </>
            ) : finished ? (
              <div className="diagnostic-finish">
                <Target size={36} />
                <h2>{chapter.title} · 自测完成</h2>
                <strong>
                  {Object.values(answers).filter(Boolean).length} /{" "}
                  {chapter.lessons.length}
                </strong>
                <p>
                  按首次作答计分。
                  {Object.values(answers).filter(Boolean).length /
                    chapter.lessons.length >=
                  0.8
                    ? "基础很扎实，可以继续下一章。"
                    : "建议回看答错的知识点，然后再测试一次。"}
                </p>
                {chapter.lessons
                  .filter((_, i) => !answers[i])
                  .map((l) => (
                    <button
                      className="review-row"
                      key={l.id}
                      onClick={() => {
                        onSelect(l.id);
                        onClose();
                      }}
                    >
                      <BookOpen size={16} />
                      {l.title}
                      <ArrowRight size={15} />
                    </button>
                  ))}
                <div className="dialog-actions">
                  <button
                    className="secondary"
                    onClick={() => setChapterId(null)}
                  >
                    返回章节
                  </button>
                  <button
                    className="secondary"
                    onClick={() => start(chapter.id)}
                  >
                    <RotateCcw size={15} />
                    重新自测
                  </button>
                  {Object.values(answers).filter(Boolean).length /
                    chapter.lessons.length >=
                    0.8 && (
                    <button
                      className="primary"
                      onClick={() => {
                        onMastered(chapter.id);
                        onClose();
                      }}
                    >
                      已掌握，跳过本章
                      <SkipForward size={15} />
                    </button>
                  )}
                </div>
              </div>
            ) : (
              <>
                <div className="diagnostic-meta">
                  <button
                    className="text-button"
                    onClick={() => setChapterId(null)}
                  >
                    ← 选择章节
                  </button>
                  <span>
                    {chapter.title} · {index + 1}/{chapter.lessons.length}
                  </span>
                </div>
                <Quiz
                  key={chapter.id + "-" + index}
                  compact
                  quiz={
                    chapter.lessons[index].quizzes[
                      (round + index) % chapter.lessons[index].quizzes.length
                    ]
                  }
                  onSubmit={(correct) =>
                    setAnswers((prev) =>
                      index in prev ? prev : { ...prev, [index]: correct },
                    )
                  }
                  onReview={() => {
                    onSelect(chapter.lessons[index].id);
                    onClose();
                  }}
                />
                <div className="dialog-actions">
                  <button
                    className="primary"
                    disabled={!(index in answers)}
                    onClick={() => {
                      if (index + 1 < chapter.lessons.length)
                        setIndex(index + 1);
                      else setFinished(true);
                    }}
                  >
                    {index + 1 < chapter.lessons.length
                      ? "下一题"
                      : "查看自测结果"}
                    <ArrowRight size={16} />
                  </button>
                </div>
              </>
            )}
          </>
        ) : (
          <>
            <div className="review-title">
              <h3>值得再练一次的知识点</h3>
              <span>{review.length} 个</span>
            </div>
            {review.length ? (
              review.map((l) => (
                <button
                  className="review-row"
                  key={l.id}
                  onClick={() => {
                    onSelect(l.id);
                    onClose();
                  }}
                >
                  <BookOpen size={16} />
                  <span>
                    {l.title}
                    <small>
                      累计 {progress.records[l.id].failures} 次错误 ·{" "}
                      {completed(progress.records[l.id])
                        ? "已完成，可复习"
                        : "建议回顾讲解与挑战"}
                    </small>
                  </span>
                  <ArrowRight size={15} />
                </button>
              ))
            ) : (
              <div className="empty-state">
                <CheckCircle2 size={28} />
                <p>暂时没有错题记录。试试下面的变式练习。</p>
              </div>
            )}
            <div className="review-title">
              <h3>按具体错题重新练习</h3>
            </div>
            {lessons.flatMap((l) =>
              l.quizzes
                .filter((q) => {
                  const s = progress.records[l.id]?.questions?.[q.id!];
                  return s && s.attempts > s.correct;
                })
                .map((q) => (
                  <button
                    className="review-row"
                    key={q.id}
                    onClick={() =>
                      setReviewItem({ lessonId: l.id, questionId: q.id! })
                    }
                  >
                    <Target size={15} />
                    <span>
                      {l.title} · 第 {l.quizzes.indexOf(q) + 1} 题
                      <small>
                        {(progress.records[l.id]?.questions?.[q.id!]
                          ?.lastCorrect ??
                        progress.records[l.id]?.questions?.[q.id!]?.passed)
                          ? "已纠正，可再次巩固"
                          : "待纠正"}{" "}
                        · {q.question.slice(0, 50)}
                      </small>
                    </span>
                    <ArrowRight size={14} />
                  </button>
                )),
            )}
            {reviewItem &&
              (() => {
                const l = lessons.find((l) => l.id === reviewItem.lessonId)!;
                const q = l.quizzes.find(
                  (q) => q.id === reviewItem.questionId,
                )!;
                return (
                  <Quiz
                    key={"review-" + q.id}
                    quiz={q}
                    onSubmit={(ok, a) => onReviewAnswer(l.id, q.id!, ok, a)}
                    onReview={() => {
                      onSelect(l.id);
                      onClose();
                    }}
                  />
                );
              })()}
            <div className="review-title">
              <h3>换个问法，确认真的会了</h3>
              <Lightbulb size={17} />
            </div>
            <div className="reinforcement-tabs">
              {chapters.map((c) => (
                <button
                  key={c.id}
                  className={extra === c.id ? "selected" : ""}
                  onClick={() => setExtra(c.id)}
                >
                  {c.title}
                </button>
              ))}
            </div>
            {extra && (
              <Quiz
                key={"extra-" + extra}
                quiz={reinforcement[extra]}
                onSubmit={(correct) => {
                  if (correct) notify("变式练习通过");
                }}
                onReview={() => {
                  onSelect(chapters[extra - 1].lessons[0].id);
                  onClose();
                }}
              />
            )}
          </>
        )}
      </div>
    </dialog>
  );
}
