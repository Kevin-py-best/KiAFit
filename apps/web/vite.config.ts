import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: ["icons/kiafit-mark.svg"],
      manifest: {
        name: "KiaFIT",
        short_name: "KiaFIT",
        description: "Build participation and confidence toward your IPPT goals.",
        theme_color: "#123b3a",
        background_color: "#f4f1e8",
        display: "standalone",
        start_url: "/",
        icons: [
          {
            src: "/icons/kiafit-mark.svg",
            sizes: "any",
            type: "image/svg+xml",
            purpose: "any maskable"
          }
        ]
      }
    })
  ],
  server: {
    port: 5173,
    proxy: {
      "/api": {
        target: "http://localhost:3000",
        changeOrigin: true
      }
    }
  }
});
