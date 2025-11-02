import React from 'react'
import { NavLink } from 'react-router-dom'
import ThemeToggle from './ThemeToggle'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'

// Barra de navegación inferior / superior dependiendo del viewport
// Recibe `isDark` y `toggleTheme` para renderizar el control del tema
export default function NavBottom({ isDark, toggleTheme }){
  const { isAuthenticated, logout } = useAuth()
  const navigate = useNavigate()

  // Muestra/oculta enlaces administrativos según el estado de autenticación

  return (
    <header className="nav-bottom" role="banner">
      <div className="nav-inner">
        <nav className="nav-links" aria-label="Menú principal">
          <NavLink to="/" end className={({isActive})=> isActive? 'active' : ''}>Inicio</NavLink>
          <NavLink to="/quienes" className={({isActive})=> isActive? 'active' : ''}>Quiénes somos</NavLink>
          <NavLink to="/contacto" className={({isActive})=> isActive? 'active' : ''}>Contáctanos</NavLink>
          {isAuthenticated && (
            <>
              <NavLink to="/agregar" className={({isActive})=> isActive? 'active' : ''}>Agregar vehículo</NavLink>
              <NavLink to="/inventario" className={({isActive})=> isActive? 'active' : ''}>Inventario</NavLink>
            </>
          )}
        </nav>

        <div className="nav-actions">
          {/* Toggle del tema (claro/oscuro) */}
          <ThemeToggle isDark={isDark} toggleTheme={toggleTheme} />
          {isAuthenticated ? (
            // Botón para cerrar sesión del admin
            <button className="btn ghost" onClick={() => { logout(); navigate('/') }}>Cerrar sesión</button>
          ) : null}
        </div>
        {/* Mostrar enlace Admin dentro de nav-links para que herede el mismo estilo */}
        {!isAuthenticated && (
          // Enlace de acceso al panel admin (usa mismo estilo que las demás opciones)
          <nav className="nav-links" aria-label="Admin">
            <NavLink to="/login" className={({isActive})=> isActive? 'active' : ''}>Admin</NavLink>
          </nav>
        )}
      </div>
    </header>
  )
}
