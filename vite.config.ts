import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  base: "git@github.com:Denkut/Portfolio-KutepovDM.git",
  plugins: [react()],
  server: {
    port: 3006,
  },
});
