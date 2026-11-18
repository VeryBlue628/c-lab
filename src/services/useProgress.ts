import { useEffect, useRef, useState } from "react";
import { accessProgress, type ProgressChange } from "./progress-store";
import type { Progress } from "./progress";

export function useProgress(initial: Progress, initialFailed: boolean) {
  const [progress, setProgress] = useState(initial);
  const [saveStatus, setSaveStatus] = useState<"saved" | "pending" | "failed">(initialFailed ? "failed" : "saved");
  const latest = useRef(initial);
  const queue = useRef<ProgressChange[]>([]);
  const writing = useRef(false);
  const revision = useRef(-1);
  const channel = useRef<BroadcastChannel | null>(null);

  function display(next: Progress) {
    latest.current = next;
    setProgress(next);
  }

  async function refresh() {
    try {
      const snapshot = await accessProgress();
      if (!queue.current.length && snapshot.revision > revision.current) {
        revision.current = snapshot.revision;
        display(snapshot.progress);
        setSaveStatus("saved");
      }
    } catch {
      setSaveStatus("failed");
    }
  }

  async function flush() {
    if (writing.current || !queue.current.length) return;
    writing.current = true;
    setSaveStatus("pending");
    try {
      while (queue.current.length) {
        const batch = queue.current.slice();
        const result = await accessProgress(p => batch.reduce((state, update) => update(state), p));
        queue.current.splice(0, batch.length);
        revision.current = result.revision;
        display(queue.current.reduce((p, change) => change(p), result.progress));
        channel.current?.postMessage(result.revision);
      }
      setSaveStatus("saved");
      void refresh();
    } catch {
      setSaveStatus("failed");
    } finally {
      writing.current = false;
    }
  }

  function change(update: ProgressChange) {
    queue.current.push(update);
    display(update(latest.current));
    void flush();
  }

  useEffect(() => {
    const sync = () => {
      if (queue.current.length) void flush();
      else void refresh();
    };
    if (typeof BroadcastChannel !== "undefined") {
      const connection = new BroadcastChannel("c-lab-progress");
      connection.onmessage = () => { if (!queue.current.length) void refresh(); };
      channel.current = connection;
    }
    window.addEventListener("pageshow", sync);
    document.addEventListener("visibilitychange", sync);
    const warnIfPending = (event: BeforeUnloadEvent) => {
      if (!queue.current.length) return;
      event.preventDefault();
      event.returnValue = true;
    };
    window.addEventListener("beforeunload", warnIfPending);
    return () => {
      channel.current?.close();
      channel.current = null;
      window.removeEventListener("pageshow", sync);
      document.removeEventListener("visibilitychange", sync);
      window.removeEventListener("beforeunload", warnIfPending);
    };
  }, []);

  return { progress, latest, change, saveStatus, retry: () => queue.current.length ? flush() : refresh() };
}
