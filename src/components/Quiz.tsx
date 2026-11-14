import { useState } from "react";
import { Check, ArrowRight, Lightbulb, X } from "lucide-react";
import type { Quiz as QuizData } from "../data/types";
const labels = {
  single: "单选题",
  multi: "多选题",
  boolean: "判断题",
  fill: "填空题",
  predict: "输出预测",
  debug: "错误分析",
};
export function Quiz({
  quiz,
  initial = [],
  onSubmit,
  failures = 0,
  onReview,
  compact = false,
}: {
  quiz: QuizData;
  initial?: string[];
  onSubmit: (correct: boolean, answer: string[]) => void;
  failures?: number;
  onReview: () => void;
  compact?: boolean;
}) {
  const [answer, setAnswer] = useState<string[]>(initial),
    [result, setResult] = useState<boolean | null>(null);
  const check = () => {
    if (!answer.length || !answer[0].trim()) return;
    const clean = (a: string[]) =>
      a
        .map((x) => x.trim())
        .sort()
        .join("\0");
    const correct = clean(answer) === clean(quiz.answer);
    setResult(correct);
    onSubmit(correct, answer);
  };
  return (
    <div className={"quiz " + (compact ? "compact" : "")}>
      <div className="eyebrow">
        <span>{labels[quiz.type]}</span>
        <span>QUICK CHECK</span>
      </div>
      <h2>{quiz.question}</h2>
      {quiz.type === "multi" && <p className="muted">选择所有正确选项</p>}
      {quiz.options ? (
        <div className="options">
          {quiz.options.map((option, i) => (
            <button
              key={option}
              className={
                "option " + (answer.includes(option) ? "selected" : "")
              }
              aria-pressed={answer.includes(option)}
              onClick={() => {
                setResult(null);
                setAnswer(
                  quiz.type === "multi"
                    ? answer.includes(option)
                      ? answer.filter((a) => a !== option)
                      : [...answer, option]
                    : [option],
                );
              }}
            >
              <span className="option-letter">
                {String.fromCharCode(65 + i)}
              </span>
              <span>{option}</span>
              {answer.includes(option) && <Check size={16} />}
            </button>
          ))}
        </div>
      ) : (
        <label className="answer-label">
          你的答案
          <input
            autoComplete="off"
            value={answer[0] || ""}
            placeholder={
              quiz.type === "predict" ? "输入程序输出" : "在这里填写答案"
            }
            onChange={(e) => {
              setResult(null);
              setAnswer([e.target.value]);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") check();
            }}
          />
        </label>
      )}
      <button
        className="primary"
        disabled={result !== null || !answer.length || !answer[0].trim()}
        onClick={check}
      >
        检查答案
        <ArrowRight size={16} />
      </button>
      {result !== null && (
        <div role="status" className={"feedback " + (result ? "good" : "bad")}>
          <div className="feedback-title">
            {result ? <Check size={18} /> : <X size={18} />}{" "}
            {result ? "回答正确，理解很扎实！" : "再想一想，看看这里的原因"}
          </div>
          <p>
            <strong>正确答案：</strong>
            {quiz.answer.join("、")}
          </p>
          <p>{quiz.explanation}</p>
        </div>
      )}
      {!result && failures >= 2 && (
        <div className="callout">
          <Lightbulb size={18} />
          <div>
            这个知识点值得再看一次。
            <button className="text-button" onClick={onReview}>
              返回相关讲解 →
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
