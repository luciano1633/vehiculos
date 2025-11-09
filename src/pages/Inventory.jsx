import React, { useMemo, useState } from 'react'
import { useVehicles } from '../context/VehiclesContext'
import { parsePrice } from '../utils/price'
import styles from '../styles/Inventory.module.css'

// Página que lista el inventario en una tabla con filtros y detalle
export default function Inventory(){
  const { vehicles, toggleAvailability, markPossiblePurchase } = useVehicles()
  // filtros locales (no mutan el estado global)
  const [marca, setMarca] = useState('')
  const [year, setYear] = useState('')
  const [maxPrice, setMaxPrice] = useState('')

  // Modal para detalle
  const [detail, setDetail] = useState(null)

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

      <div className={styles.filterContainer}>
        <div className={styles.filterGroup}>
          <label htmlFor="filter-marca">Marca</label>
          <select id="filter-marca" className="form-select" value={marca} onChange={e=>setMarca(e.target.value)}>
            <option value="">Todas</option>
            {marcas.map(m => <option key={m} value={m}>{m}</option>)}
          </select>
        </div>

        <div className={styles.filterGroup}>
          <label htmlFor="filter-year">Año</label>
          <select id="filter-year" className="form-select" value={year} onChange={e=>setYear(e.target.value)}>
            <option value="">Todos</option>
            {years.map(y => <option key={y} value={y}>{y}</option>)}
          </select>
        </div>

        <div className={styles.filterGroup}>
          <label htmlFor="filter-price">Precio máximo (CLP)</label>
          <input id="filter-price" className="form-control" placeholder="ej. 15000000" value={maxPrice} onChange={e=>setMaxPrice(e.target.value)} />
        </div>

        <div className={styles.filterActions}>
          <button className="btn btn-outline-secondary" onClick={()=>{ setMarca(''); setYear(''); setMaxPrice('') }}>Limpiar</button>
          <button className="btn btn-primary" onClick={()=>{ /* placeholder */ }}>Filtrar</button>
        </div>
      </div>

      <div className="row">
        {filtered.map(v => (
          <div key={v.id} className="col-md-4 mb-3">
            <article className="card value-card h-100">
              <div className="card-body">
                <h3>{v.title}</h3>
                <p style={{color:'var(--muted)',marginBottom:'.5rem'}}>{v.desc}</p>
                <div style={{marginBottom:'.75rem'}}>
                  <p style={{margin:'0.25rem 0'}}><strong>Marca:</strong> {v.marca}</p>
                  <p style={{margin:'0.25rem 0'}}><strong>Modelo:</strong> {v.modelo}</p>
                  <p style={{margin:'0.25rem 0'}}><strong>Año:</strong> {v.year}</p>
                  <p style={{margin:'0.25rem 0'}}><strong>Precio:</strong> {v.price}</p>
                  <p style={{margin:'0.25rem 0'}}>
                    <strong>Estado:</strong> 
                    <span style={{
                      marginLeft:'.5rem',
                      padding:'.2rem .5rem',
                      borderRadius:'4px',
                      fontSize:'.85rem',
                      fontWeight:'600',
                      background: v.status === 'vendido' ? '#fee' : '#efe',
                      color: v.status === 'vendido' ? '#c00' : '#070'
                    }}>
                      {v.status === 'vendido' ? 'Vendido' : 'Disponible'}
                    </span>
                  </p>
                </div>
                <div style={{display:'flex',gap:'.5rem',flexWrap:'wrap'}}>
                  <button 
                    className={`btn ${v.status === 'vendido' ? 'sold' : 'cta'}`}
                    onClick={()=>toggleAvailability(v.id)}
                  >
                    {v.status === 'vendido' ? 'Marcar disponible' : 'Marcar vendido'}
                  </button>
                  <button className="btn ghost" onClick={()=>markPossiblePurchase(v.id)}>
                    Posible compra
                  </button>
                  <button className="btn primary" onClick={()=>setDetail(v)}>
                    Ver detalles
                  </button>
                </div>
              </div>
            </article>
          </div>
        ))}
      </div>

      {detail && (
        <div className="details-backdrop" role="dialog" aria-modal="true" onClick={()=>setDetail(null)}>
          <div className="details-modal" onClick={(e)=>e.stopPropagation()} style={{maxWidth:'600px'}}>
            <button className="modal-close" onClick={()=>setDetail(null)} aria-label="Cerrar">×</button>
            <div style={{padding:'1.5rem'}}>
              <h2 style={{marginTop:0}}>{detail.title}</h2>
              <p style={{color:'var(--muted)',marginBottom:'1rem'}}>{detail.desc}</p>
              <div style={{
                display:'grid',
                gridTemplateColumns:'1fr 1fr',
                gap:'0.75rem',
                marginBottom:'1.5rem',
                padding:'1rem',
                background:'var(--bg)',
                borderRadius:'8px'
              }}>
                <div>
                  <strong style={{display:'block',marginBottom:'.25rem',fontSize:'.9rem',color:'var(--muted)'}}>Marca</strong>
                  <p style={{margin:0}}>{detail.marca}</p>
                </div>
                <div>
                  <strong style={{display:'block',marginBottom:'.25rem',fontSize:'.9rem',color:'var(--muted)'}}>Modelo</strong>
                  <p style={{margin:0}}>{detail.modelo}</p>
                </div>
                <div>
                  <strong style={{display:'block',marginBottom:'.25rem',fontSize:'.9rem',color:'var(--muted)'}}>Año</strong>
                  <p style={{margin:0}}>{detail.year}</p>
                </div>
                <div>
                  <strong style={{display:'block',marginBottom:'.25rem',fontSize:'.9rem',color:'var(--muted)'}}>Precio</strong>
                  <p style={{margin:0,fontSize:'1.2rem',fontWeight:'700',color:'var(--primary)'}}>{detail.price}</p>
                </div>
                <div>
                  <strong style={{display:'block',marginBottom:'.25rem',fontSize:'.9rem',color:'var(--muted)'}}>Estado</strong>
                  <p style={{margin:0}}>
                    <span style={{
                      padding:'.25rem .6rem',
                      borderRadius:'4px',
                      fontSize:'.85rem',
                      fontWeight:'600',
                      background: detail.status === 'vendido' ? '#fee' : '#efe',
                      color: detail.status === 'vendido' ? '#c00' : '#070'
                    }}>
                      {detail.status === 'vendido' ? 'Vendido' : 'Disponible'}
                    </span>
                  </p>
                </div>
              </div>
              <div style={{display:'flex',gap:'.6rem',flexWrap:'wrap'}}>
                <button className="btn cta" onClick={()=>{ markPossiblePurchase(detail.id); setDetail(null) }}>
                  Marcar como posible compra
                </button>
                <button className="btn ghost" onClick={()=>setDetail(null)}>Cerrar</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  )
}
