import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// base "./" makes built asset paths relative, so the app works on
// GitHub Pages under any repository name without extra configuration.
export default defineConfig({
  plugins: [react()],
  base: "./",
});
