import react from "@vitejs/plugin-react";
import { defineConfig } from "vite-plus";

export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
  },
  fmt: {},
  lint: {
    ignorePatterns: ["dist/**"],
    options: {
      typeAware: true,
      typeCheck: true,
    },
  },
  staged: {
    "*.{css,html,json,ts,tsx}": "vp check --fix",
  },
});
