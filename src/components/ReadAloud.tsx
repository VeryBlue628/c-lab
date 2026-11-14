import { useEffect, useRef, useState } from "react";
import { Volume2, Pause, Play, Square } from "lucide-react";
import type { Lesson } from "../data/types";
export function ReadAloud({ lesson }: { lesson: Lesson }) {
  const supported = typeof speechSynthesis !== "undefined";
  const [state, setState] = useState<"idle" | "speaking" | "paused">("idle"),
    [rate, setRate] = useState(1),
    [error, setError] = useState("");
  const queue = useRef<string[]>([]),
    active = useRef(false);
  useEffect(
    () => () => {
      active.current = false;
      if (supported) speechSynthesis.cancel();
    },
    [lesson.id],
  );
  function next() {
    if (!active.current) return;
    const text = queue.current.shift();
    if (!text) {
      active.current = false;
      setState("idle");
      return;
    }
    const u = new SpeechSynthesisUtterance(text);
    u.lang = "zh-CN";
    u.rate = rate;
    const voice = speechSynthesis
      .getVoices()
      .find((v) => v.lang.startsWith("zh"));
    if (voice) u.voice = voice;
    u.onend = next;
    u.onerror = (e) => {
      if (active.current) {
        active.current = false;
        setState("idle");
        setError("朗读未能完成（" + e.error + "）。请确认设备安装了中文语音。");
      }
    };
    speechSynthesis.speak(u);
  }
  function start() {
    speechSynthesis.cancel();
    queue.current = [
      lesson.title,
      lesson.objective,
      ...lesson.explanation,
      "重点总结。" + lesson.summary,
    ].flatMap((p) => p.match(/[^。！？]+[。！？]?/g) || [p]);
    active.current = true;
    setState("speaking");
    setError("");
    next();
  }
  return (
    <div className="read-aloud">
      <button
        className="secondary"
        disabled={!supported}
        onClick={() => {
          if (state === "idle") start();
          else if (state === "speaking") {
            speechSynthesis.pause();
            setState("paused");
          } else {
            speechSynthesis.resume();
            setState("speaking");
          }
        }}
      >
        {state === "speaking" ? (
          <Pause size={14} />
        ) : state === "paused" ? (
          <Play size={14} />
        ) : (
          <Volume2 size={14} />
        )}{" "}
        {state === "speaking"
          ? "暂停朗读"
          : state === "paused"
            ? "继续朗读"
            : "朗读本节"}
      </button>
      {state !== "idle" && (
        <button
          className="icon-button"
          aria-label="停止朗读"
          onClick={() => {
            active.current = false;
            speechSynthesis.cancel();
            setState("idle");
          }}
        >
          <Square size={13} />
        </button>
      )}
      <label>
        语速
        <select
          aria-label="朗读语速"
          value={rate}
          disabled={state !== "idle"}
          onChange={(e) => setRate(Number(e.target.value))}
        >
          <option value="0.8">0.8×</option>
          <option value="1">1×</option>
          <option value="1.25">1.25×</option>
        </select>
      </label>
      <small>{supported ? "使用设备中文语音" : "当前浏览器不支持朗读"}</small>
      {error && <p role="status">{error}</p>}
    </div>
  );
}
