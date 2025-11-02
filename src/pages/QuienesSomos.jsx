import React from 'react'

// Página informativa: describe la empresa, valores y llamada a la acción
export default function QuienesSomos() {
  return (
    <main className="page quienes" aria-labelledby="qs-title">
      <header className="quienes-hero">
        <div className="hero-content">
          <h1 id="qs-title">Quiénes somos</h1>
          <p className="hero-sub">Más de 20 años conectando personas con su próximo vehículo, con transparencia y servicio.</p>
          <p className="hero-cta">Nuestro compromiso es hacer la compra simple, segura y agradable.</p>
          <div className="hero-actions">
            <a className="btn primary" href="/">Ver catálogo</a>
            <a className="btn ghost" href="/contacto">Contactar asesor</a>
          </div>
        </div>
        <div className="hero-visual" aria-hidden="true">
          {/* Ilustración simple con SVG para evitar añadir assets */}
          <svg width="320" height="220" viewBox="0 0 320 220" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Ilustración de autos">
            <rect width="320" height="220" rx="16" fill="url(#g)" />
            <g opacity="0.9" fill="#ffffff">
              <rect x="30" y="110" width="220" height="60" rx="8" opacity="0.14" />
              <circle cx="90" cy="170" r="12" opacity="0.18" />
              <circle cx="200" cy="170" r="12" opacity="0.18" />
            </g>
            <defs>
              <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0" stopColor="#0b5fff" />
                <stop offset="1" stopColor="#2b8dff" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </header>

      <section className="quienes-body">
        <div className="quienes-grid">
          <article className="quienes-text">
            <h2>Nuestra historia</h2>
            <p>
              En <strong>Círculo Automotriz</strong> creemos que comprar un vehículo debe ser una experiencia humana y transparente.
              Cada unidad en nuestro inventario pasa por un riguroso control técnico y una selección que prioriza fiabilidad y valor.
            </p>
            <p>
              Nuestro equipo no persigue comisiones de venta rápida; trabajamos para encontrar la mejor solución de movilidad para cada cliente.
            </p>
          </article>

          <aside className="quienes-values" aria-labelledby="values-title">
            <h3 id="values-title">Nuestros valores</h3>
            <div className="values-grid">
              <div className="value-card">
                <strong>Transparencia</strong>
                <p>Información clara: historial, inspecciones y precios sin sorpresas.</p>
              </div>
              <div className="value-card">
                <strong>Calidad</strong>
                <p>Vehículos inspeccionados y certificados por nuestro taller.</p>
              </div>
              <div className="value-card">
                <strong>Servicio</strong>
                <p>Asesoría personalizada antes y después de la compra.</p>
              </div>
              <div className="value-card">
                <strong>Confianza</strong>
                <p>Transacciones claras y respaldo postventa.</p>
              </div>
            </div>
          </aside>
        </div>

        <div className="quienes-cta">
          <h3>Listo para ver las opciones?</h3>
          <p>Explora nuestro catálogo y agenda una prueba de manejo sin compromiso.</p>
          <a className="btn primary large" href="/">Explorar vehículos</a>
        </div>
      </section>
    </main>
  )
}
