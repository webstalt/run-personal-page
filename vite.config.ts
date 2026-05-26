import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://webstalt.github.io/run-personal-page/
const repoBase = '/run-personal-page/'

export default defineConfig(({ command }) => ({
  base: command === 'build' ? repoBase : '/',
  plugins: [react(), tailwindcss()],
}))
