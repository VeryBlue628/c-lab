import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
export default defineConfig({
  plugins: [react()],
  worker: { format: "es" },
  build: {
    target: "es2022",
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (
            id.includes("node_modules/@codemirror") ||
            id.includes("node_modules/@lezer") ||
            id.includes("node_modules/style-mod") ||
            id.includes("node_modules/crelt") ||
            id.includes("node_modules/w3c-keyname")
          )
            return "editor";
          if (
            id.includes("node_modules/react") ||
            id.includes("node_modules/scheduler")
          )
            return "react";
          if (id.includes("/src/data/")) return "curriculum";
        },
      },
    },
  },
  server: { host: "127.0.0.1" },
});
