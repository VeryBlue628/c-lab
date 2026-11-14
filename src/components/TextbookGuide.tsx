import { useEffect, useRef } from "react";
import { X, ArrowRight, Check, BookOpen } from "lucide-react";
import audit from "../data/page-review.json";
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
    <dialog
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
              ISBN 9787302481447 ·
              清华大学出版社。按公开目录组织的配套练习，讲解和题目为本站编写。此处选课将开启自由探索，完成仍需通过检测与挑战。
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
        <details className="textbook-chapter">
          <summary>正文逐页核对：已审 20 页（书内第 37—56 页）</summary>
          <p>
            已逐页检查出版社公开样章的正文和图表。其余正文及完整习题待取得后继续审阅。
          </p>
          <p>
            <a href={audit.source} target="_blank" rel="noreferrer">
              查看出版社样章 ↗
            </a>
          </p>
          {audit.pages.map((p) => (
            <div className="page-review-row" key={p.page}>
              <strong>
                第 {p.page} 页 · {p.topic}
              </strong>
              <p>{p.result}</p>
              <div>
                {p.lessons.map((id) => (
                  <button
                    className="text-button"
                    key={id}
                    onClick={() => onSelect(id)}
                  >
                    {lessonById[id].title} →
                  </button>
                ))}
              </div>
            </div>
          ))}
        </details>
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
                    <small>{l.chapter > 9 ? "新增" : "基础课程"}</small>
                    <ArrowRight size={14} />
                  </button>
                );
              })}
            </div>
          </details>
        ))}
        <div className="textbook-reference">
          <h3>随手查</h3>
          <p>
            ASCII：数字 0—9 为 48—57，大写 A—Z 为 65—90，小写 a—z 为
            97—122，换行 10，零终止符 0。UTF-8 中文不是单个 ASCII 字符。
          </p>
          <p>
            C99 关键字：auto break case char const continue default do double
            else enum extern float for goto if inline int long register restrict
            return short signed sizeof static struct switch typedef union
            unsigned void volatile while _Bool _Complex _Imaginary。
          </p>
          <p>
            优先级从高到低：后缀调用/下标/成员/后缀自增 → 一元与 sizeof → 乘除余
            → 加减 → 移位 → 关系 → 相等 → 位与 → 位异或 → 位或 → 逻辑与 → 逻辑或
            → 条件 → 赋值 →
            逗号。赋值、条件与一元运算通常从右结合；结合性不等于运行时求值顺序。
          </p>
          <p>
            库接口：stdio.h（输入输出）、stdlib.h（分配/转换）、string.h（字节/字符串）、ctype.h（字符分类）、math.h（数学）、limits.h/float.h（数值范围）、stddef.h（size_t/NULL）、stdbool.h（C99
            布尔）、stdint.h/inttypes.h（整数类型与格式）。_Complex/_Imaginary
            及全部标准库接口列作速查，不宣称本沙箱完整支持所有可选能力。
          </p>
        </div>
      </div>
    </dialog>
  );
}
