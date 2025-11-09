import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

// Helper para generar rutas de imágenes públicas
const getImagePath = (filename) => {
  const base = import.meta.env.BASE_URL || '/'
  return `${base}img/${filename}`
}

// Rutas de imágenes desde public
const kiaImg = getImagePath('kia.jpg')
const kiaImg2 = getImagePath('kia2.jpg')
const subaruImg = getImagePath('subaru.jpg')
const subaruImg2 = getImagePath('subaru2.jpg')
const hyundaiImg = getImagePath('hyundai.jpg')
const hyundaiImg2 = getImagePath('hiundai2.jpg')

const vehicles = [
  {
    id: 1,
    title: 'Kia K3',
    desc: 'Confort y eficiencia.',
    year: 2024,
    km: '12.000 km',
    price: '$12.990.000',
    img: kiaImg,
    gallery: [kiaImg, kiaImg2]
  },
  {
    id: 2,
    title: 'Subaru WRX',
    desc: 'Rendimiento deportivo y tracción.',
    year: 2023,
    km: '30.500 km',
    price: '$18.450.000',
    img: subaruImg,
    gallery: [subaruImg, subaruImg2]
  },
  {
    id: 3,
    title: 'Hyundai i30 Fastback',
    desc: 'Diseño dinámico y versatilidad.',
    year: 2022,
    km: '22.100 km',
    price: '$14.200.000',
    img: hyundaiImg,
    gallery: [hyundaiImg, hyundaiImg2]
  }
]

// Componente principal de la página Home
// Muestra el catálogo de vehículos, permite abrir un modal con los detalles
// y navegar por la galería de imágenes. También contiene un modal de contacto.
export default function Home(){
  const [selected, setSelected] = useState(null)
  const [galleryIndex, setGalleryIndex] = useState(0)
  const [showContactModal, setShowContactModal] = useState(false)

  // Efecto: escucha teclas para navegación dentro del modal de detalles
  // - Escape: cierra el modal
  // - ArrowRight / ArrowLeft: cambia la imagen de la galería
  useEffect(() => {
    const onKey = (e) => {
      if (!selected) return
      if (e.key === 'Escape') setSelected(null)
      if (e.key === 'ArrowRight') setGalleryIndex(i => Math.min(i+1, (selected?.gallery?.length||1)-1))
      if (e.key === 'ArrowLeft') setGalleryIndex(i => Math.max(i-1, 0))
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [selected])

  // Abre el modal de detalles para un vehículo y resetea la galería
  const openDetails = (veh) => { setSelected(veh); setGalleryIndex(0) }
  // Cierra el modal de detalles
  const closeDetails = () => setSelected(null)
  return (
    <main className="page home" aria-labelledby="home-title">
      <header className="quienes-hero home-hero">
        <div className="hero-content">
          <h1 id="home-title">Venta de Vehículos</h1>
          <p className="hero-sub">Círculo Automotriz</p>
          <p className="hero-cta">Encuentra tu próximo vehículo con las mejores ofertas.</p>
          <div className="hero-actions">
            <Link className="btn primary" to="/">Ver catálogo</Link>
            <Link className="btn ghost" to="/contacto">Contactar asesor</Link>
          </div>
        </div>
        <div className="hero-visual" aria-hidden="true">
          {/* Ilustración simple para mantener consistencia visual entre páginas */}
          <svg width="380" height="220" viewBox="0 0 380 220" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Ilustración de vehículos">
            <rect width="380" height="220" rx="14" fill="url(#gHome)" />
            <g fill="#ffffff" opacity="0.9">
              <rect x="28" y="110" width="240" height="60" rx="8" opacity="0.14" />
              <rect x="90" y="70" width="200" height="40" rx="6" opacity="0.12" />
              <circle cx="110" cy="170" r="12" opacity="0.18" />
              <circle cx="240" cy="170" r="12" opacity="0.18" />
            </g>
            <defs>
              <linearGradient id="gHome" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0" stopColor="var(--primary)" />
                <stop offset="1" stopColor="var(--primary-2)" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </header>

      <section className="catalog">
        <h2>Vehículos destacados</h2>
        <div className="cards">
          {vehicles.map(v => (
            <article key={v.id} className="card vehicle-card">
              <img src={v.img} alt={v.title} loading="lazy" srcSet={`${v.img} 1200w, ${v.img} 600w`} sizes="(max-width:600px) 100vw, 33vw" />
              <div className="card-body">
                <h3>{v.title}</h3>
                <p className="muted">{v.year} · {v.km}</p>
                <p>{v.desc}</p>
                <div className="card-actions">
                  <div className="price">{v.price}</div>
                  <button className="btn cta" onClick={()=>openDetails(v)}>Ver detalles</button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {selected && (
        <div className="details-backdrop" role="dialog" aria-modal="true">
            <div className="details-modal">
            <div className="details-grid">
              <div className="gallery">
                <img src={selected.gallery[galleryIndex]} alt={`${selected.title} ${galleryIndex+1}`} loading="lazy" />
                <div className="gallery-controls">
                  <button onClick={()=>setGalleryIndex(i => Math.max(i-1,0))} disabled={galleryIndex===0}>‹</button>
                  <span>{galleryIndex+1}/{selected.gallery.length}</span>
                  <button onClick={()=>setGalleryIndex(i => Math.min(i+1, selected.gallery.length-1))} disabled={galleryIndex===selected.gallery.length-1}>›</button>
                </div>
              </div>
              <div className="details">
                <h2>{selected.title}</h2>
                <p className="muted">{selected.year} · {selected.km}</p>
                <p>{selected.desc}</p>
                <ul className="specs">
                  <li><strong>Precio:</strong> {selected.price}</li>
                  <li><strong>Año:</strong> {selected.year}</li>
                  <li><strong>Kilometraje:</strong> {selected.km}</li>
                </ul>
                <div style={{marginTop:'1rem'}}>
                  <button className="btn cta" onClick={()=>setShowContactModal(true)}>Contactar vendedor</button>
                  <button className="btn cta" style={{marginLeft:'.6rem'}} aria-label="Cerrar detalles" onClick={closeDetails}>Cerrar</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {showContactModal && (
        <div className="call-backdrop" role="dialog" aria-modal="true" style={{zIndex:1700}}>
          <div className="call-modal">
            <div className="call-inner">
              <h3>Contacto del vendedor</h3>
              <p>Teléfono: <a href="tel:+56986243597">+56 9 8624 3597</a></p>
              <p>Email: <a href="mailto:soporte@circuloautomotriz.cl">soporte@circuloautomotriz.cl</a></p>
              <div style={{display:'flex',justifyContent:'center',marginTop:'.6rem'}}>
                <button className="btn cta" onClick={()=>setShowContactModal(false)}>Cerrar</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  )
}
