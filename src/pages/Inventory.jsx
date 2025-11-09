import React, { useMemo, useState } from 'react'
import { useVehicles } from '../context/VehiclesContext'

// Página que lista el inventario en una tabla con filtros y detalle
export default function Inventory(){
  const { vehicles, toggleAvailability, markPossiblePurchase } = useVehicles()
  // filtros locales (no mutan el estado global)
  const [marca, setMarca] = useState('')
  const [year, setYear] = useState('')
  const [maxPrice, setMaxPrice] = useState('')

  // Modal para detalle
  const [detail, setDetail] = useState(null)

  // Helper para parsear precio a número (quita símbolos y puntos)
  const parsePrice = (p) => {
    if(!p) return 0
    return Number(String(p).replace(/[^0-9]/g, '')) || 0
  }

  // Opciones únicas para selects
  const marcas = useMemo(()=> Array.from(new Set(vehicles.map(v=>v.marca).filter(Boolean))), [vehicles])
  const years = useMemo(()=> Array.from(new Set(vehicles.map(v=>v.year).filter(Boolean))).sort((a,b)=>b-a), [vehicles])

  // Lista filtrada en memoria
  const filtered = useMemo(()=>{
    return vehicles.filter(v => {
      if(marca && v.marca !== marca) return false
      if(year && String(v.year) !== String(year)) return false
      if(maxPrice){
        const limit = parsePrice(maxPrice)
        if(limit > 0 && parsePrice(v.price) > limit) return false
      }
      return true
    })
  }, [vehicles, marca, year, maxPrice])

  return (
    <main className="page inventory">
      <h2>Inventario de vehículos</h2>

      <div className="mb-3" style={{display:'flex',gap:'.6rem',flexWrap:'wrap',marginBottom:'1rem'}}>
        <div>
          <label className="form-label" style={{display:'block'}}>Marca</label>
          <select className="form-select" value={marca} onChange={e=>setMarca(e.target.value)}>
            <option value="">Todas</option>
            {marcas.map(m => <option key={m} value={m}>{m}</option>)}
          </select>
        </div>

        <div>
          <label className="form-label" style={{display:'block'}}>Año</label>
          <select className="form-select" value={year} onChange={e=>setYear(e.target.value)}>
            <option value="">Todos</option>
            {years.map(y => <option key={y} value={y}>{y}</option>)}
          </select>
        </div>

        <div>
          <label className="form-label" style={{display:'block'}}>Precio máximo (CLP)</label>
          <input className="form-control" placeholder="ej. 15000000" value={maxPrice} onChange={e=>setMaxPrice(e.target.value)} />
        </div>
      </div>

      <div className="cards">
        {filtered.map(v => (
          <article key={v.id} className="card vehicle-card" style={{cursor:'pointer'}} onClick={()=>setDetail(v)}>
            <img src={v.img} alt={v.title} />
            <div className="card-body">
              <h3>{v.title}</h3>
              <p style={{color:'var(--muted)'}}>{v.desc}</p>
              <p><strong>{v.price}</strong> • {v.year}</p>
              <div style={{display:'flex',gap:'.5rem'}}>
                <button className="btn cta" onClick={(e)=>{ e.stopPropagation(); toggleAvailability(v.id) }}>{v.status === 'vendido' ? 'Vendido' : 'Disponible'}</button>
                <button className="btn ghost" onClick={(e)=>{ e.stopPropagation(); markPossiblePurchase(v.id) }}>Marcar posible compra</button>
              </div>
            </div>
          </article>
        ))}
      </div>

      {detail && (
        <div className="details-backdrop" role="dialog" aria-modal="true" onClick={()=>setDetail(null)}>
          <div className="details-modal" onClick={(e)=>e.stopPropagation()}>
            <button className="modal-close" onClick={()=>setDetail(null)} aria-label="Cerrar">×</button>
            <div className="details-grid">
              <div className="gallery">
                <img src={detail.img} alt={detail.title} style={{width:'100%',height:360,objectFit:'cover',borderRadius:8}} />
              </div>
              <div className="details">
                <h2>{detail.title}</h2>
                <p>{detail.desc}</p>
                <ul className="specs">
                  <li><strong>Marca:</strong> {detail.marca}</li>
                  <li><strong>Modelo:</strong> {detail.modelo}</li>
                  <li><strong>Año:</strong> {detail.year}</li>
                  <li><strong>Kilometraje:</strong> {detail.km}</li>
                  <li><strong>Precio:</strong> {detail.price}</li>
                </ul>
                <div style={{display:'flex',gap:'.6rem',marginTop:'.8rem'}}>
                  <button className="btn cta" onClick={()=>{ markPossiblePurchase(detail.id); setDetail(null) }}>Marcar como posible compra</button>
                  <button className="btn ghost" onClick={()=>setDetail(null)}>Cerrar</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  )
}
