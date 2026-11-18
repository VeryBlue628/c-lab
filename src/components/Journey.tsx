import { stageFor } from "../data/pathway";
import { useEffect, useRef, useState } from "react";
import { X, Check, Lock, ArrowRight, Target, SkipForward } from "lucide-react";
import { learningChapters as chapters, lessons, curriculumStats } from "../data/runtime-curriculum";
import { completed, unlocked, type Progress } from "../services/progress";
export function Journey({
  progress,
  onClose,
  onSelect,
  onDiagnostic,
}: {
  progress: Progress;
  onClose: () => void;
  onSelect: (id: string) => void;
  onDiagnostic: () => void;
}) {
  const dialog = useRef<HTMLDialogElement>(null),
    [open, setOpen] = useState<number[]>([
      lessons.find((l) => l.id === progress.current)!.chapter,
    ]);
  useEffect(() => {
    dialog.current?.showModal();
    return () => dialog.current?.close();
  }, []);
  return (
    <dialog aria-labelledby="journey-title"
      ref={dialog}
      className="study-dialog journey-dialog"
      onCancel={onClose}
    >
      <div className="dialog-header">
        <div>
          <span className="eyebrow">C FUNDAMENTALS</span>
          <h2 id="journey-title">从理解到实践的学习路径</h2>
        </div>
        <button
          className="icon-button"
          aria-label="关闭学习路径"
          onClick={onClose}
        >
          <X size={20} />
        </button>
      </div>
      <div className="dialog-body">
        <div className="journey-summary">
          <span>
            {chapters.length} 章 · {lessons.length} 课 ·{" "}
            {curriculumStats.challenges} 个挑战 · {curriculumStats.questions}{" "}
            道检测
          </span>
          <button
            className="primary"
            onClick={() => onSelect(progress.current)}
          >
            继续上次学习
            <ArrowRight size={14} />
          </button>
        </div>
        <div className="sequence-actions">
          <button
            className="text-button"
            onClick={() => setOpen(chapters.map((c) => c.id))}
          >
            展开全部
          </button>
          <button className="text-button" onClick={() => setOpen([])}>
            收起全部
          </button>
          <button className="text-button" onClick={onDiagnostic}>
            <Target size={14} />
            已学过？章节自测
          </button>
        </div>
        {chapters.map((c) => (
          <section className="journey-chapter" key={c.id}>
            <button
              aria-expanded={open.includes(c.id)}
              onClick={() =>
                setOpen((p) =>
                  p.includes(c.id)
                    ? p.filter((id) => id !== c.id)
                    : [...p, c.id],
                )
              }
            >
              <strong>
                <small className="path-stage">{stageFor(c.id).title} · {stageFor(c.id).goal}</small>
                {String(c.id).padStart(2, "0")} · {c.title}
              </strong>
              <span>
                {
                  c.lessons.filter((l) => completed(progress.records[l.id]))
                    .length
                }
                /{c.lessons.length} 完成
              </span>
            </button>
            {open.includes(c.id) && (
              <div>
                {c.lessons.map((l) => {
                  const r = progress.records[l.id],
                    done = completed(r);
                  return (
                    <button
                      key={l.id}
                      className={
                        "journey-lesson " +
                        (progress.current === l.id ? "current" : "")
                      }
                      onClick={() => onSelect(l.id)}
                    >
                      <span>
                        {done ? (
                          <Check size={14} />
                        ) : r?.skipped ? (
                          <SkipForward size={14} />
                        ) : !unlocked(l.id, progress) ? (
                          <Lock size={13} />
                        ) : (
                          String(l.index + 1).padStart(2, "0")
                        )}
                      </span>
                      <div>
                        <strong>{l.title}</strong>
                        <small>
                          {l.quizzes.length} 道检测 · 基础挑战
                          {l.mastery ? " + Mastery" : ""}
                        </small>
                      </div>
                      <ArrowRight size={14} />
                    </button>
                  );
                })}
              </div>
            )}
          </section>
        ))}
      </div>
    </dialog>
  );
}
