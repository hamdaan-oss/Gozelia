import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {         // Define the prefix for API routes
        target: 'http://localhost:5000',  // Replace with your backend server's address
        changeOrigin: true,  // Ensure the origin header is updated to match the target
        rewrite: (path) => path.replace(/^\/api/, '')  // Remove '/api' prefix before forwarding
      }
    }
  }
})
