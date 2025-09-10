import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // ВОТ РЕШЕНИЕ: ПУСТОЙ base ГОВОРИТ VITE ИСПОЛЬЗОВАТЬ ОТНОСИТЕЛЬНЫЕ ПУТИ
  base: ''
})