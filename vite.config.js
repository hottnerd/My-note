import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'



export default defineConfig({
  plugins: [react()],

  


  server: {
       proxy:{
          "^/api":{
        target: "https://my-note-api-u30q.onrender.com",
        secure: true,      
        ws: true,
      }
     }
    }
})
