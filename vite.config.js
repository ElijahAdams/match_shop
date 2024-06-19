import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 4200
  },
  // set up a proxy for api calls so calls may go to /api/endpoint
  proxy: {
    '/api': {
      target: 'http://localhost:8000',
      changeOrigin: true,
      rewrite: (path) => {
        return path.replace(/^\/api/, '');
      }
    }
  }
})
