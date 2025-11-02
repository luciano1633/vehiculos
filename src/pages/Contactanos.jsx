import React, { useState, useEffect } from 'react'

// Página de contacto con formulario y métodos para mostrar toasts/modal de llamada
export default function Contactanos(){
  const [showToast, setShowToast] = useState(false)
  const [showCallModal, setShowCallModal] = useState(false)
  const [showCallToast, setShowCallToast] = useState(false)

  // Efecto: cuando se muestra el toast de envío, lo oculta automáticamente
  useEffect(() => {
    let t
    if(showToast){
      t = setTimeout(()=> setShowToast(false), 3000)
    }
    return ()=> clearTimeout(t)
  }, [showToast])

  // Efecto: toast para confirmación de solicitud de llamada
  useEffect(() => {
    let t
    if(showCallToast){
      t = setTimeout(()=> setShowCallToast(false), 3500)
    }
    return ()=> clearTimeout(t)
  }, [showCallToast])

  // Envia el formulario (simulado): resetea el formulario y muestra un toast
  const handleSubmit = (e) => {
    e.preventDefault()
    // Resetear el formulario y mostrar el toast de confirmación
    e.currentTarget.reset()
    setShowToast(true)
  }

  return (
    <main className="page contacto" aria-labelledby="contacto-title">
      <header className="quienes-hero contact-hero">
        <div className="hero-content">
          <h1 id="contacto-title">Contáctanos</h1>
          <p className="hero-sub">Estamos listos para ayudarte a elegir el mejor vehículo. Completa el formulario o utiliza los datos de contacto.</p>
          <div className="hero-actions">
            <a className="btn primary" href="/">Ver catálogo</a>
            <a className="btn ghost" href="/quienes">Conócenos</a>
          </div>
        </div>
        <div className="hero-visual" aria-hidden="true">
          {/* Pequeña ilustración/ícono */}
          <svg width="320" height="200" viewBox="0 0 320 200" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Ilustración de contacto">
            <rect width="320" height="200" rx="12" fill="url(#g2)" />
            <g fill="#fff" opacity="0.9">
              <circle cx="80" cy="100" r="22" opacity="0.12" />
              <rect x="120" y="70" width="120" height="60" rx="8" opacity="0.12" />
            </g>
            <defs>
              <linearGradient id="g2" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0" stopColor="var(--primary)" />
                <stop offset="1" stopColor="var(--primary-2)" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </header>

      <section className="quienes-body contact-body">
        <div className="quienes-grid contact-grid">
          <article className="contact-card">
            <h2>Envíanos un mensaje</h2>
            <form className="contact-form" onSubmit={handleSubmit}>
              <label>
                Nombre
                <input type="text" name="nombre" required />
              </label>
              <label>
                Email
                <input type="email" name="email" required />
              </label>
              <label>
                Mensaje
                <textarea name="mensaje" rows="6" required></textarea>
              </label>
              <button type="submit" className="btn cta">Enviar</button>
            </form>
          </article>

          <aside className="quienes-values contact-info" aria-labelledby="contact-info-title">
            <h3 id="contact-info-title">Nuestros datos</h3>
            <div className="values-grid">
              <div className="value-card contact-item">
                <strong>Teléfono</strong>
                <p>+569-86243597</p>
              </div>
              <div className="value-card contact-item">
                <strong>Dirección</strong>
                <p>Calle Chile 1234, Santiago</p>
              </div>
              <div className="value-card contact-item">
                <strong>Horario</strong>
                <p>Lunes a Viernes, 9:00 - 18:00</p>
              </div>
              <div className="value-card contact-item">
                <strong>Soporte</strong>
                <p>soporte@circuloautomotriz.cl</p>
              </div>
            </div>
          </aside>
        </div>

        <div className="quienes-cta">
          <h3>¿Prefieres hablar directamente?</h3>
          <p>Agenda una llamada con uno de nuestros asesores o visítanos en nuestras instalaciones.</p>
          <button type="button" className="btn cta large" onClick={()=>setShowCallModal(true)}>Solicitar llamada</button>
        </div>
      </section>

      {showToast && (
        <div className="toast-backdrop" role="dialog" aria-modal="true">
          <div className="floating-toast" role="status" aria-live="polite">
            <div className="toast-inner">
              <div className="toast-icon">✅</div>
              <div className="toast-body">
                <strong>Mensaje enviado</strong>
                <p>Gracias. Nos pondremos en contacto contigo pronto.</p>
              </div>
              <button className="btn ghost toast-close" onClick={()=>setShowToast(false)} aria-label="Cerrar">Cerrar</button>
            </div>
          </div>
        </div>
      )}

        {/** Modal para solicitar llamada **/}
        {showCallModal && (
          <div className="call-backdrop" role="dialog" aria-modal="true">
            <div className="call-modal">
              <div className="call-inner">
                <h3>Solicitar llamada</h3>
                <p>Déjanos tu teléfono y uno de nuestros asesores te contactará.</p>
                <form onSubmit={(e)=>{
                  e.preventDefault();
                  const phone = e.currentTarget.elements?.telefono?.value || '';
                  // Aquí podrías enviar a backend; simulamos success
                  setShowCallModal(false);
                  setShowCallToast(true);
                  e.currentTarget.reset();
                }}>
                  <label>
                    Teléfono
                    <input name="telefono" type="tel" placeholder="+569 9XXXXXXX" required />
                  </label>
                  <div style={{display:'flex',gap:'0.6rem',marginTop:'0.6rem'}}>
                    <button className="btn cta" type="submit">Solicitar</button>
                    <button className="btn ghost" type="button" onClick={()=>setShowCallModal(false)}>Cancelar</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}

        {/** Toast de confirmación para la solicitud de llamada **/}
        {showCallToast && (
          <div className="toast-backdrop" role="status" aria-live="polite">
            <div className="floating-toast">
              <div className="toast-inner">
                <div className="toast-icon">📞</div>
                <div className="toast-body">
                  <strong>Solicitud recibida</strong>
                  <p>Nuestros vendedores se pondrán en contacto contigo pronto.</p>
                </div>
                <button className="btn ghost toast-close" onClick={()=>setShowCallToast(false)} aria-label="Cerrar">Cerrar</button>
              </div>
            </div>
          </div>
        )}

    </main>
  )
}
