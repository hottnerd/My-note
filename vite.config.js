import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'



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
})
