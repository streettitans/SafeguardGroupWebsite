import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: { target: 'es2020', sourcemap: false },
  server: { host: '127.0.0.1' },
  preview: { host: '127.0.0.1' },
})
