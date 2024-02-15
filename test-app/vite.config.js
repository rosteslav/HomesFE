import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  envDir: './environment',
  server: {
    host: true,
    port: 8000,
     watch: {
       usePolling: true
     }
  }
})
