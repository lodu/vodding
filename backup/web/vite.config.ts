import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import dns from 'dns'
import path from "path";
import tailwindcss from "tailwindcss";
import autoprefixer from "autoprefixer";

dns.setDefaultResultOrder('verbatim')
// https://vitejs.dev/config/
export default defineConfig({
  base: "/",
  server: {
    host: true,
    port: 5173,
    strictPort: true,
    hmr: true,
    watch: {
      usePolling: true
    }
  },
  plugins: [react()],
  css: {
    postcss: {
      plugins: [tailwindcss, autoprefixer],
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
