import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import basicSsl from "@vitejs/plugin-basic-ssl"; // 1. Import this

export default defineConfig({
  plugins: [
    react(),
    basicSsl(), // 2. Add this
  ],
  server: {
    https: true, // 3. Force HTTPS
    port: 5173,
  },
});
