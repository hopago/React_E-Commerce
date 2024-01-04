import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import reactRouterPlugin from 'vite-plugin-next-react-router';

export default defineConfig({
  plugins: [react()],
  esbuild: {
    define: {
      this: "window"
    }
  }
})
