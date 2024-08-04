import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000, // 设置端口为 3000
  },
  build: {
    outDir: "./dist", // 输出目录
    assetsDir: "assets", // 静态资源目录
    rollupOptions: {
      input: {
        main: "index.html", // 入口 HTML 文件
      },
    },
  },
});
