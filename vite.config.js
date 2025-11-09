import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Configuración para GitHub Pages bajo la ruta /vehiculos/
export default defineConfig({
  base: '/vehiculos/',
  plugins: [react()]
})

