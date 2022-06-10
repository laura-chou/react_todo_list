import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: "/react_todo_list/",
  plugins: [react()],
  server: {
    host: '0.0.0.0'
  }
})
