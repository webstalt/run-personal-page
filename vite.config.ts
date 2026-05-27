import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// Настройка для GitHub Pages - убрать при деплое у себя на хостинге
const repoBase = '/run-personal-page/'

export default defineConfig(({ command }) => ({
  base: command === 'build' ? repoBase : '/',
  plugins: [react(), tailwindcss()],
}))
