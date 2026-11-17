import React from "react";
import ReactDOM from "react-dom/client";
import { CourseBoundary } from "./components/CourseBoundary";
import App from "./App";
import "./styles.css";
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <CourseBoundary><React.Suspense fallback={<main className="course-loading" role="status">正在加载本章课程…</main>}><App /></React.Suspense></CourseBoundary>
  </React.StrictMode>,
);
