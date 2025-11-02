import React from 'react'

// Botón simple para alternar tema claro/oscuro. Recibe el estado actual
// `isDark` y la función `toggleTheme` para cambiar la preferencia.
export default function ThemeToggle({ isDark, toggleTheme }) {
  return (
    <button 
      className="theme-toggle"
      onClick={toggleTheme}
      aria-label="Cambiar tema"
    >
      {isDark ? '☀️' : '🌙'}
    </button>
  )
}