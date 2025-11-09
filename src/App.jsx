import React, { useState, useEffect, lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import NavBottom from './components/NavBottom'
import Footer from './components/Footer'
import { useAuth, AuthProvider } from './context/AuthContext'
import { Navigate } from 'react-router-dom'
import { STORAGE_KEYS } from './constants/storage'

// Lazy loading de rutas para reducir el bundle inicial
const Home = lazy(() => import('./pages/Home'))
const QuienesSomos = lazy(() => import('./pages/QuienesSomos'))
const Contactanos = lazy(() => import('./pages/Contactanos'))
const AddVehicle = lazy(() => import('./pages/AddVehicle'))
const Inventory = lazy(() => import('./pages/Inventory'))
const PossiblePurchases = lazy(() => import('./pages/PossiblePurchases'))
const Login = lazy(() => import('./pages/Login'))

// Componente raíz de la aplicación
// Gestiona el tema (claro/oscuro) y monta la navegación + rutas
export default function App(){
  // Estado que trackea si está activo el tema oscuro
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.THEME)
    return saved ? saved === 'dark' : false
  })

  // Sincroniza el atributo data-theme en el root y guarda la preferencia
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light')
    localStorage.setItem(STORAGE_KEYS.THEME, isDark ? 'dark' : 'light')
  }, [isDark])

  // Alterna el tema entre claro y oscuro
  const toggleTheme = () => setIsDark(prev => !prev)

  return (
    <div className="app">
      {/* NavBottom ahora recibe control del tema para integrar el toggle */}
      <NavBottom isDark={isDark} toggleTheme={toggleTheme} />

      {/* Rutas principales con lazy loading y loading fallback */}
      <Suspense fallback={
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '60vh',
          color: 'var(--muted)'
        }}>
          <div>Cargando...</div>
        </div>
      }>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/quienes" element={<QuienesSomos/>} />
          <Route path="/contacto" element={<Contactanos/>} />
          <Route path="/login" element={<Login />} />
          {/* Protegemos rutas administrativas */}
          <Route path="/agregar" element={<RequireAuth><AddVehicle/></RequireAuth>} />
          <Route path="/inventario" element={<RequireAuth><Inventory/></RequireAuth>} />
          <Route path="/posibles" element={<RequireAuth><PossiblePurchases/></RequireAuth>} />
        </Routes>
      </Suspense>
      
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
