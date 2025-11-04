import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import { VehiclesProvider } from './context/VehiclesContext'
import { AuthProvider } from './context/AuthContext'
import './components/styles.css'

// Punto de entrada: monta React en el elemento #root
// Nota: la aplicación está configurada para desplegarse bajo la ruta base
// '/vehiculos/' (ver `vite.config.js`). Para que React Router funcione
// correctamente cuando la app se sirve en ese subpath, pasamos `basename`.
createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter basename="/vehiculos">
      <AuthProvider>
        <VehiclesProvider>
          <App />
        </VehiclesProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
)
