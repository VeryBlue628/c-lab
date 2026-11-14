import { useEffect, useRef } from "react";
import {
  ArrowRight,
  BookOpen,
  Check,
  CheckCircle2,
  ChevronRight,
  Clock3,
  Code2,
  Lightbulb,
  Play,
  ShieldAlert,
  Target,
  SkipForward,
  FileCode2,
} from "lucide-react";
import type { Lesson } from "../data/types";
import type { RecordState } from "../services/progress";
import { QuizSequence } from "./QuizSequence";
import { ReadAloud } from "./ReadAloud";
function emphasize(text: string) {
  const terms =
    /(?:C11|未定义行为|短路|值传递|基本情况|数组越界|整数除法|向零截断|原型)/;
  return text
    .split(
      /(C11|未定义行为|短路|值传递|基本情况|数组越界|整数除法|向零截断|原型)/g,
    )
    .map((part, i) =>
      terms.test(part) ? <strong key={i}>{part}</strong> : part,
    );
}
export type Tab = "lesson" | "quiz" | "practice";
export function LessonContent({
  lesson,
  record,
  tab,
  onTab,
  onQuestionMove,
  onChallenge,
  activeChallenge,
  onQuiz,
  onLoadExample,
  onSkip,
  onNext,
}: {
  lesson: Lesson;
  record: RecordState;
  tab: Tab;
  onTab: (t: Tab) => void;
  onQuiz: (c: boolean, a: string[], id: string) => void;
  onQuestionMove: (n: number) => void;
  onChallenge: (mode: "practice" | "mastery") => void;
  activeChallenge: "practice" | "mastery";
  onLoadExample: () => void;
  onSkip: () => void;
  onNext: () => void;
}) {
  const scroll = useRef<HTMLDivElement>(null);
  useEffect(() => {
    scroll.current?.scrollTo(0, 0);
  }, [lesson.id, tab]);
  return (
    <>
      <div className="lesson-tabs" role="tablist" aria-label="学习步骤">
        {(
          [
            ["lesson", "知识讲解", BookOpen],
            ["quiz", "知识检测", Target],
            ["practice", "编程挑战", Code2],
          ] as const
        ).map(([id, label, Icon], i) => (
          <button
            role="tab"
            aria-selected={tab === id}
            tabIndex={tab === id ? 0 : -1}
            onKeyDown={(e) => {
              if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(e.key))
                return;
              e.preventDefault();
              const next =
                e.key === "Home"
                  ? 0
                  : e.key === "End"
                    ? 2
                    : (i + (e.key === "ArrowRight" ? 1 : 2)) % 3;
              onTab((["lesson", "quiz", "practice"] as Tab[])[next]);
              e.currentTarget.parentElement
                ?.querySelectorAll<HTMLButtonElement>("button[role=tab]")
                [next]?.focus();
            }}
            key={id}
            className={tab === id ? "selected" : ""}
            onClick={() => onTab(id)}
          >
            <Icon size={15} />
            {label}
            <span>{i + 1}</span>
            {id === "quiz" && record.quizPassed && <Check size={12} />}{" "}
            {id === "practice" && record.practicePassed && <Check size={12} />}
          </button>
        ))}
      </div>
      <div className="lesson-scroll" ref={scroll}>
        <div className="lesson-inner">
          <div className="lesson-meta">
            <span className="eyebrow">
              CHAPTER {String(lesson.chapter).padStart(2, "0")} / LESSON{" "}
              {String(lesson.index + 1).padStart(2, "0")}
            </span>
            <span>
              <Clock3 size={13} />
              {lesson.chapter === 9 ? "15–20" : "5–10"} 分钟
            </span>
          </div>
          <h1>{lesson.title}</h1>
          <p className="english-title">{lesson.en}</p>
          {tab === "lesson" ? (
            <>
              <ReadAloud key={lesson.id} lesson={lesson} />
              <div className="objective">
                <span className="objective-icon">
                  <Target size={18} />
                </span>
                <div>
                  <span>本节你将学会</span>
                  <p>{lesson.objective}</p>
                </div>
              </div>
              <section className="explanation">
                <h2>
                  <span className="section-dot" />
                  先理解，再动手
                </h2>
                {lesson.explanation.map((p, i) => (
                  <p key={i}>{emphasize(p)}</p>
                ))}
              </section>
              <section>
                <h2>语法拆解</h2>
                <div className="syntax-block">
                  <span>C11</span>
                  <pre>{lesson.syntax}</pre>
                </div>
                <p className="subtext">{lesson.syntaxNotes}</p>
              </section>
              <section>
                <div className="section-title">
                  <h2>看一个完整例子</h2>
                  <button className="text-button" onClick={onLoadExample}>
                    <Play size={13} />
                    在编辑器中运行
                    <ArrowRight size={13} />
                  </button>
                </div>
                <div className="example-code">
                  <div>
                    <FileCode2 size={13} /> example.c<span>C</span>
                  </div>
                  <pre>{lesson.example}</pre>
                </div>
                {lesson.exampleInput && (
                  <div className="example-output">
                    <span>示例输入</span>
                    <pre>{lesson.exampleInput}</pre>
                  </div>
                )}
                <div className="example-output">
                  <span>程序输出</span>
                  <pre>{lesson.exampleOutput || "（无输出）"}</pre>
                </div>
                <p className="subtext">{lesson.walkthrough}</p>
              </section>
              <div className="mistakes">
                <ShieldAlert size={19} />
                <div>
                  <h3>避开这些小陷阱</h3>
                  <ul>
                    {lesson.mistakes.map((m) => (
                      <li key={m}>{m}</li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="takeaway">
                <Lightbulb size={18} />
                <div>
                  <strong>记住这一点</strong>
                  <p>{lesson.summary}</p>
                </div>
              </div>
              <div className="lesson-cta">
                <span>读懂了？用一组题确认每个细节。</span>
                <button className="primary" onClick={() => onTab("quiz")}>
                  开始知识检测
                  <ArrowRight size={16} />
                </button>
              </div>
            </>
          ) : tab === "quiz" ? (
            <>
              <div className="step-intro">
                <span className="round-icon">
                  <Target size={20} />
                </span>
                <div>
                  <h3>给理解一个小小的检验</h3>
                  <p>答题后查看解析，再把知识写进代码。</p>
                </div>
              </div>
              <QuizSequence
                lesson={lesson}
                record={record}
                onSubmit={onQuiz}
                onMove={onQuestionMove}
                onReview={() => onTab("lesson")}
              />
              {record.quizPassed && (
                <div className="lesson-cta">
                  <span>
                    <CheckCircle2 size={16} />
                    知识检测已通过
                  </span>
                  <button className="primary" onClick={() => onTab("practice")}>
                    开始编程挑战
                    <ArrowRight size={16} />
                  </button>
                </div>
              )}
            </>
          ) : (
            <>
              <div className="challenge-switch">
                <button
                  className={activeChallenge === "practice" ? "selected" : ""}
                  onClick={() => onChallenge("practice")}
                >
                  基础挑战
                </button>
                {lesson.mastery && (
                  <button
                    className={activeChallenge === "mastery" ? "selected" : ""}
                    onClick={() => onChallenge("mastery")}
                  >
                    Mastery 强化
                  </button>
                )}
              </div>
              <div className="challenge-heading">
                <span className="tiny-badge">
                  {lesson.challenge.difficulty}
                </span>
                <span>{lesson.challenge.tests.length} 组测试 · 输出校验</span>
              </div>
              <section>
                <h2>{lesson.challenge.title}</h2>
                <p>{lesson.challenge.description}</p>
              </section>
              <div className="io-spec">
                <div>
                  <h3>输入要求</h3>
                  <p>{lesson.challenge.input}</p>
                </div>
                <div>
                  <h3>输出要求</h3>
                  <p>{lesson.challenge.output}</p>
                </div>
              </div>
              <div className="sample-grid">
                <div>
                  <span>示例输入</span>
                  <pre>{lesson.challenge.tests[0].input || "（无）"}</pre>
                </div>
                <div>
                  <span>示例输出</span>
                  <pre>{lesson.challenge.tests[0].output || "（无输出）"}</pre>
                </div>
              </div>
              <div className="callout">
                <Code2 size={18} />
                <div>
                  <strong>轮到你来写了</strong>
                  <p>
                    在右侧编辑器完成代码。“运行代码”使用你的标准输入；“提交答案”运行全部测试用例。
                  </p>
                </div>
              </div>
              {record.practicePassed && (
                <div className="feedback good">
                  <strong>
                    <CheckCircle2 size={18} />
                    编程挑战已通过
                  </strong>
                  <p>
                    {record.quizPassed
                      ? activeChallenge === "mastery"
                        ? "强化挑战通过。它单独记录，不替代基础挑战。"
                        : "本节学习已完成，可以继续下一课。"
                      : "再通过知识检测，即可完成本节课程。"}
                  </p>
                  {record.quizPassed ? (
                    <button className="primary" onClick={onNext}>
                      继续下一课
                      <ChevronRight size={16} />
                    </button>
                  ) : (
                    <button className="primary" onClick={() => onTab("quiz")}>
                      完成知识检测
                      <ArrowRight size={16} />
                    </button>
                  )}
                </div>
              )}
            </>
          )}
          <div className="skip-row">
            <span>这个知识点已经掌握？</span>
            <button className="text-button" onClick={onSkip}>
              <SkipForward size={13} />
              跳过本节
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
