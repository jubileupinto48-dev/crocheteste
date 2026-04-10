import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [react(), mode === "development" && componentTagger()].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    // Compress assets
    minify: "esbuild",
    // Raise warning limit — we know we have large page modules
    chunkSizeWarningLimit: 800,
    rollupOptions: {
      output: {
        // Split vendor libraries into separate cached chunks
        manualChunks: {
          "vendor-react":    ["react", "react-dom"],
          "vendor-router":   ["react-router-dom"],
          "vendor-ui":       ["@radix-ui/react-dialog", "@radix-ui/react-tooltip", "@tanstack/react-query"],
          "vendor-carousel": ["embla-carousel-react", "embla-carousel-autoplay"],
          "vendor-pdf":      ["html2canvas", "jspdf"],
        },
      },
    },
  },
}));
