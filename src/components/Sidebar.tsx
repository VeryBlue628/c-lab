import { stageFor } from "../data/pathway";
import { useEffect, useRef, useState } from "react";
import {
  BookOpen,
  Check,
  ChevronDown,
  Search,
  Lock,
  ArrowUpRight,
  FlaskConical,
  PanelLeftClose,
  SkipForward,
  Code2,
} from "lucide-react";
import { learningChapters as chapters, lessons } from "../data/runtime-curriculum";
import { completed, unlocked, type Progress } from "../services/progress";
import { matchesLesson, textbookLabel } from "../data/lesson-search";
export function Sidebar({
  progress,
  onSelect,
  onLocked,
  onStats,
  onDiagnostic,
  onClose,
}: {
  progress: Progress;
  onSelect: (id: string) => void;
  onLocked: (id: string) => void;
  onStats: () => void;
  onDiagnostic: () => void;
  onClose: () => void;
}) {
  const current = lessons.find((l) => l.id === progress.current)!;
  const [expanded, setExpanded] = useState<number[]>([current.chapter]),
    [search, setSearch] = useState("");
  const selected = useRef<HTMLButtonElement>(null);
  const searchInput = useRef<HTMLInputElement>(null);
  useEffect(() => {
    const handler = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement;
      if (
        event.key === "/" &&
        matchMedia("(min-width:1051px)").matches &&
        !["INPUT", "TEXTAREA"].includes(target.tagName) &&
        !target.isContentEditable
      ) {
        event.preventDefault();
        searchInput.current?.focus();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);
  useEffect(() => {
    setExpanded((x) =>
      x.includes(current.chapter) ? x : [...x, current.chapter],
    );
    setTimeout(
      () => selected.current?.scrollIntoView({ block: "nearest" }),
      80,
    );
  }, [current.id]);
  const done = lessons.filter((l) => completed(progress.records[l.id])).length;
  return (
    <>
      <div className="brand">
        <div className="brand-icon">
          <Code2 size={24} />
        </div>
        <div>
          C<span>Lab</span>
          <small>编程，从理解开始。</small>
        </div>
        <button
          className="icon-button mobile-close"
          onClick={onClose}
          aria-label="关闭课程导航"
        >
          <PanelLeftClose size={20} />
        </button>
      </div>
      <div className="course-label">
        <span className="language-badge">C</span>
        <div>
          <strong>C Fundamentals</strong>
          <small>C99 · {lessons.length} 节课程</small>
        </div>
        <span className="tiny-badge">C99</span>
      </div>
      <div className="sidebar-heading">
        <span>学习路径</span>
        <button className="text-button" onClick={onDiagnostic}>
          <FlaskConical size={13} />
          章节自测
        </button>
      </div>
      <div className="sidebar-expand">
        <button
          className="text-button"
          onClick={() => setExpanded(chapters.map((c) => c.id))}
        >
          展开全部
        </button>
        <button className="text-button" onClick={() => setExpanded([])}>
          收起全部
        </button>
      </div>
      <label className="search">
        <Search size={16} />
        <input
          ref={searchInput}
          placeholder="搜课程、函数或教材节号"
          aria-label="搜索课程"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <kbd>/</kbd>
      </label>
      <nav aria-label="课程导航" className="course-nav">
        {chapters.map((ch) => {
          const filtered = ch.lessons.filter(l => matchesLesson(l, ch, search));
          if (!filtered.length) return null;
          const count = ch.lessons.filter((l) =>
            completed(progress.records[l.id]),
          ).length;
          const skipped = ch.lessons.filter(
            (l) =>
              progress.records[l.id]?.skipped &&
              !completed(progress.records[l.id]),
          ).length;
          const open = search || expanded.includes(ch.id);
          return (
            <div className="chapter" key={ch.id}>
              {stageFor(ch.id).chapters[0] === ch.id && <p className="sidebar-stage">{stageFor(ch.id).title}</p>}
              <button
                className={
                  "chapter-button " +
                  (ch.id === current.chapter ? "current-chapter" : "")
                }
                aria-expanded={!!open}
                onClick={() =>
                  setExpanded((x) =>
                    x.includes(ch.id)
                      ? x.filter((i) => i !== ch.id)
                      : [...x, ch.id],
                  )
                }
              >
                <span className="chapter-number">
                  {String(ch.id).padStart(2, "0")}
                </span>
                <span>
                  <strong>{ch.title}</strong>
                  <small>{ch.en}</small>
                </span>
                <span className="chapter-count" title={skipped + " 节已跳过"}>
                  {count}/{ch.lessons.length}
                </span>
                <ChevronDown size={14} className={open ? "" : "rotated"} />
              </button>
              {open && (
                <div className="chapter-lessons">
                  {filtered.map((l) => {
                    const active = l.id === current.id,
                      done = completed(progress.records[l.id]),
                      skip = progress.records[l.id]?.skipped,
                      available = unlocked(l.id, progress);
                    return (
                      <button
                        key={l.id}
                        ref={active ? selected : undefined}
                        className={
                          "lesson-link " +
                          (active ? "active " : "") +
                          (!available ? "locked" : "")
                        }
                        aria-current={active ? "page" : undefined}
                        aria-label={l.title + (!available ? "，尚未解锁" : "")}
                        onClick={() =>
                          available ? onSelect(l.id) : onLocked(l.id)
                        }
                      >
                        <span className={"lesson-node " + (done ? "done" : "")}>
                          {done ? (
                            <Check size={12} />
                          ) : skip ? (
                            <SkipForward size={11} />
                          ) : !available ? (
                            <Lock size={11} />
                          ) : (
                            <span />
                          )}
                        </span>
                        <span>
                          {l.title}
                          <small>{search.trim() && l.textbook ? textbookLabel(l.textbook, ch.id) : l.en}</small>
                        </span>
                        {active && <span className="active-dot" />}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
        {!chapters.some(ch => ch.lessons.some(l => matchesLesson(l, ch, search))) &&
          <p className="empty-search">没有匹配的课程。可以试试函数名、教材节号，或在教材目录按页码查找。</p>}
      </nav>
      <div className="sidebar-bottom">
        <div className="progress-label">
          <span>你的学习旅程</span>
          <strong>{Math.round((done / lessons.length) * 100)}%</strong>
        </div>
        <div className="progress-track">
          <i style={{ width: (done / lessons.length) * 100 + "%" }} />
        </div>
        <div className="progress-caption">
          已完成 {done} / {lessons.length} 节<span>慢慢来，比较快。</span>
        </div>
        <button className="progress-button" onClick={onStats}>
          <BookOpen size={16} />
          学习记录与备份
          <ArrowUpRight size={16} />
        </button>
      </div>
    </>
  );
}
