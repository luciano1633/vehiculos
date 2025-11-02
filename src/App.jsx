import React, { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import QuienesSomos from './pages/QuienesSomos'
import Contactanos from './pages/Contactanos'
import AddVehicle from './pages/AddVehicle'
import Inventory from './pages/Inventory'
import Login from './pages/Login'
import NavBottom from './components/NavBottom'
import Footer from './components/Footer'
import { useAuth, AuthProvider } from './context/AuthContext'
import { Navigate } from 'react-router-dom'

// Componente raíz de la aplicación
// Gestiona el tema (claro/oscuro) y monta la navegación + rutas
export default function App(){
  // Estado que trackea si está activo el tema oscuro
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem('theme')
    return saved ? saved === 'dark' : false
  })

  // Sincroniza el atributo data-theme en el root y guarda la preferencia
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light')
    localStorage.setItem('theme', isDark ? 'dark' : 'light')
  }, [isDark])

  // Alterna el tema entre claro y oscuro
  const toggleTheme = () => setIsDark(prev => !prev)

  return (
    <div className="app">
      {/* NavBottom ahora recibe control del tema para integrar el toggle */}
      <NavBottom isDark={isDark} toggleTheme={toggleTheme} />

      {/* Rutas principales de la aplicación */}
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/quienes" element={<QuienesSomos/>} />
        <Route path="/contacto" element={<Contactanos/>} />
        <Route path="/login" element={<Login />} />
        {/* Protegemos rutas administrativas */}
        <Route path="/agregar" element={<RequireAuth><AddVehicle/></RequireAuth>} />
        <Route path="/inventario" element={<RequireAuth><Inventory/></RequireAuth>} />
      </Routes>
      
      {/* Pie de página global */}
      <Footer />
    </div>
  )
}

// Pequeño wrapper que exige autenticación para las rutas administrativas
function RequireAuth({ children }){
  const { isAuthenticated } = useAuth()
  if(!isAuthenticated) return <Navigate to="/login" replace />
  return children
}
