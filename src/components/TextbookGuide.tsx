import { useEffect, useRef } from "react";
import { X, ArrowRight, Check, BookOpen } from "lucide-react";
import { BookAudit, LibraryReference } from "./BookAudit";
import guide from "../data/textbook-guide.json";
import { lessonById } from "../data/curriculum";
import { completed, type Progress } from "../services/progress";
export function TextbookGuide({
  progress,
  onClose,
  onSelect,
}: {
  progress: Progress;
  onClose: () => void;
  onSelect: (id: string) => void;
}) {
  const dialog = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    dialog.current?.showModal();
    return () => dialog.current?.close();
  }, []);
  return (
    <dialog aria-label="学习对话框" 
      ref={dialog}
      className="study-dialog textbook-dialog"
      onCancel={onClose}
    >
      <div className="dialog-header">
        <div>
          <span className="eyebrow">TEXTBOOK COMPANION · C99</span>
          <h2>按教材章节学习</h2>
        </div>
        <button
          className="icon-button"
          aria-label="关闭教材目录"
          onClick={onClose}
        >
          <X size={20} />
        </button>
      </div>
      <div className="dialog-body">
        <div className="callout">
          <BookOpen size={22} />
          <div>
            <strong>谭浩强《C程序设计（第五版）》</strong>
            <p>
              ISBN 9787302481447 · 清华大学出版社。已按所提供的完整 PDF
              逐页对照，补充算法、例题方法和 C99
              规则说明；讲解与练习为本站编写。此处选课将开启自由探索，完成仍需通过检测与挑战。
            </p>
            <a
              href="https://www.tup.tsinghua.edu.cn/booksCenter/bookcatalog?id=07645004"
              target="_blank"
              rel="noreferrer"
            >
              核对出版社目录 ↗
            </a>
          </div>
        </div>
        <BookAudit onSelect={onSelect} />
        {guide.map((c) => (
          <details
            className="textbook-chapter"
            key={c.number}
            open={c.lessons.includes(progress.current)}
          >
            <summary>
              <span>
                {c.number === 11 ? "附录" : "第 " + c.number + " 章"} ·{" "}
                {c.title}
              </span>
              <small>
                {c.sections} ·{" "}
                {
                  c.lessons.filter((id) => completed(progress.records[id]))
                    .length
                }
                /{c.lessons.length}
              </small>
            </summary>
            <p>{c.topics}</p>
            <div>
              {c.lessons.map((id) => {
                const l = lessonById[id];
                return (
                  <button
                    className="textbook-lesson"
                    key={id}
                    onClick={() => onSelect(id)}
                  >
                    <span>
                      {completed(progress.records[id]) ? (
                        <Check size={14} />
                      ) : (
                        <BookOpen size={14} />
                      )}
                    </span>
                    <strong>{l.title}</strong>
                    <small>
                      {l.chapter >= 17
                        ? "逐页审阅补充"
                        : l.chapter > 9
                          ? "教材配套"
                          : "基础课程"}
                    </small>
                    <ArrowRight size={14} />
                  </button>
                );
              })}
            </div>
          </details>
        ))}
        <LibraryReference onSelect={onSelect} />
      </div>
    </dialog>
  );
}
