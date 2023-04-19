import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const API_BASE_URL = import.meta.env.API_BASE_URL;

export default defineConfig({
  plugins: [react()],
  server: {
    proxy:{
      "^/api":{
        target: API_BASE_URL,
        changeOrigin: true,
        secure: true,      
        ws: true,
      }
    
    }
  }
})
