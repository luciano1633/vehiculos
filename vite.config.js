import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Configuración optimizada para GitHub Pages bajo la ruta /vehiculos/
export default defineConfig({
  base: '/vehiculos/',
  plugins: [react()],
  build: {
    // Optimizaciones de build
    rollupOptions: {
      output: {
        // Separar dependencias de vendor para mejor caching
        manualChunks: {
          'react-vendor': ['react', 'react-dom'],
          'router': ['react-router-dom']
        }
      }
    },
    // Generar source maps solo en desarrollo
    sourcemap: false,
    // Aumentar límite de warning de tamaño de chunk
    chunkSizeWarningLimit: 600
  },
  // Optimizaciones de desarrollo
  server: {
    port: 5173,
    open: false
  }
})

