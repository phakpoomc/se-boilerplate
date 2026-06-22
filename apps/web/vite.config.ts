import path from "node:path";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react-swc";
import { defineConfig, loadEnv } from "vite";

export default defineConfig(({ mode }) => {
  const webEnv = loadEnv(mode, __dirname, "");
  const apiTarget =
    process.env.API_PROXY_TARGET ??
    webEnv.VITE_API_URL ??
    "http://localhost:4100";

  return {
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "src"),
        "@starter/shared": path.resolve(__dirname, "../../packages/shared/src/index.ts")
      }
    },
    server: {
      port: 5173,
      strictPort: true,
      proxy: {
        "/api": apiTarget,
        "/health": apiTarget,
        "/uploads": apiTarget
      }
    }
  };
});
