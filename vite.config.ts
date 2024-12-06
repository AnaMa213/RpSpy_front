import react from "@vitejs/plugin-react"
import path from "path"
import { defineConfig } from "vite"

export default defineConfig({
  server: {
    https: {
      key: "./private.key",       // Clé privée
      cert: "./certificate.crt",  // Certificat
    },
    host: "localhost",
    port: 5173,
  },
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
