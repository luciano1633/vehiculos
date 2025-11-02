import React from 'react'

// Pie de página mínimo: solo la línea de copyright requerida.
// Montado globalmente en `App.jsx`.
export default function Footer(){
  return (
    <footer className="site-footer" role="contentinfo">
      <div className="footer-inner">
        <div className="footer-bottom" style={{justifyContent:'center'}}>
          <small>© 2025 Círculo Automotriz. Todos los derechos reservados.</small>
        </div>
      </div>
    </footer>
  )
}
