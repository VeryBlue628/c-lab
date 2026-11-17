import { useEffect, useRef } from "react";
import { CheckCircle2, ArrowRight, X } from "lucide-react";
import type { Lesson } from "../data/types";
import { chapters } from "../data/curriculum";
import { completed, type Progress } from "../services/progress";
export function Completion({
  lesson,
  progress,
  onClose,
  onNext,
}: {
  lesson: Lesson;
  progress: Progress;
  onClose: () => void;
  onNext: () => void;
}) {
  const dialog = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    dialog.current?.showModal();
    return () => dialog.current?.close();
  }, []);
  const chapter = chapters[lesson.chapter - 1],
    count = chapter.lessons.filter((l) =>
      completed(progress.records[l.id]),
    ).length;
  return (
    <dialog aria-label="学习对话框" 
      ref={dialog}
      className="small-dialog completion-dialog"
      onCancel={onClose}
    >
      <button
        className="icon-button completion-close"
        aria-label="关闭完成反馈"
        onClick={onClose}
      >
        <X size={18} />
      </button>
      <CheckCircle2 size={42} />
      <h2>
        {count === chapter.lessons.length
          ? "这一章，完成了！"
          : "这一课，学会了！"}
      </h2>
      <p>{lesson.title}</p>
      <div className="completion-checks">
        <span>✓ 知识检测已通过</span>
        <span>✓ 基础编程挑战已通过</span>
      </div>
      <p>
        {chapter.title} · 已完成 {count}/{chapter.lessons.length} 节
      </p>
      <div className="progress-track">
        <i style={{ width: (count / chapter.lessons.length) * 100 + "%" }} />
      </div>
      <div className="dialog-actions">
        <button className="secondary" onClick={onClose}>
          留在本节
        </button>
        <button className="primary" onClick={onNext}>
          继续下一课
          <ArrowRight size={15} />
        </button>
      </div>
    </dialog>
  );
}
