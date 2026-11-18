import React from "react";
import ReactDOM from "react-dom/client";
import { CourseBoundary } from "./components/CourseBoundary";
import App from "./App";
import { load } from "./services/progress";
import { accessProgress } from "./services/progress-store";
import "./styles.css";

const root = ReactDOM.createRoot(document.getElementById("root")!);
root.render(<main className="course-loading" role="status">正在读取学习记录…</main>);
async function start() {
  const snapshot = await accessProgress().catch(() => null);
  root.render(
    <React.StrictMode>
      <CourseBoundary>
        <React.Suspense fallback={<main className="course-loading" role="status">正在加载本章课程…</main>}>
          <App initial={snapshot?.progress ?? load()} storageFailed={!snapshot} />
        </React.Suspense>
      </CourseBoundary>
    </React.StrictMode>,
  );
}
void start();
