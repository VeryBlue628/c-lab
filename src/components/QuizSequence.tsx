import { ArrowLeft, ArrowRight, CheckCircle2 } from "lucide-react";
import type { Lesson } from "../data/types";
import type { RecordState } from "../services/progress";
import { Quiz } from "./Quiz";
export function QuizSequence({
  lesson,
  record,
  onSubmit,
  onMove,
  onReview,
}: {
  lesson: Lesson;
  record: RecordState;
  onSubmit: (ok: boolean, a: string[], id: string) => void;
  onMove: (n: number) => void;
  onReview: () => void;
}) {
  const index = Math.min(
    record.currentQuestion || 0,
    lesson.quizzes.length - 1,
  );
  const q = lesson.quizzes[index];
  const passed = lesson.quizzes.filter(
    (q) => record.questions?.[q.id!]?.passed,
  ).length;
  const state = record.questions?.[q.id!];
  return (
    <div className="quiz-sequence">
      {record.legacyCompleted && passed < lesson.quizzes.length && (
        <div className="callout">
          <p>旧版完成记录已保留，新增题组可继续巩固，不会撤销已完成课程。</p>
        </div>
      )}
      <div className="sequence-head">
        <strong>
          知识检测 · {index + 1}/{lesson.quizzes.length}
        </strong>
        <span>已掌握 {passed} 题</span>
      </div>
      <div className="question-dots" aria-label="选择测验题">
        {lesson.quizzes.map((q, i) => (
          <button
            key={q.id}
            aria-label={
              "第 " +
              (i + 1) +
              " 题" +
              (record.questions?.[q.id!]?.passed ? "，已通过" : "")
            }
            aria-current={i === index ? "step" : undefined}
            className={
              (i === index ? "current " : "") +
              (record.questions?.[q.id!]?.passed ? "solved" : "")
            }
            onClick={() => onMove(i)}
          >
            {i + 1}
          </button>
        ))}
      </div>
      <Quiz
        key={q.id}
        quiz={q}
        initial={state?.answer}
        onSubmit={(ok, a) => onSubmit(ok, a, q.id!)}
        failures={record.streak}
        onReview={onReview}
      />
      <div className="sequence-actions">
        <button
          className="secondary"
          disabled={index === 0}
          onClick={() => onMove(index - 1)}
        >
          <ArrowLeft size={14} />
          上一题
        </button>
        {index < lesson.quizzes.length - 1 ? (
          <button className="primary" onClick={() => onMove(index + 1)}>
            下一题
            <ArrowRight size={14} />
          </button>
        ) : (
          <button
            className="secondary"
            onClick={() => {
              const n = lesson.quizzes.findIndex(
                (q) => !record.questions?.[q.id!]?.passed,
              );
              onMove(n < 0 ? 0 : n);
            }}
          >
            回顾未掌握题
          </button>
        )}
      </div>
      {passed === lesson.quizzes.length ? (
        <div className="feedback good">
          <strong>
            <CheckCircle2 size={18} />
            本节全部检测已通过
          </strong>
          <p>可以继续编程挑战；每一道题的答案和状态都已保存。</p>
        </div>
      ) : (
        <p className="subtext">
          全部 {lesson.quizzes.length}{" "}
          题通过后完成本节知识检测。答错可查看解析并重试，已通过的题不会丢失。
        </p>
      )}
    </div>
  );
}
