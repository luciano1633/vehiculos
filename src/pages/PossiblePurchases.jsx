import React from 'react'
import { useVehicles } from '../context/VehiclesContext'
import { Link } from 'react-router-dom'

export default function PossiblePurchases(){
  const { possiblePurchases, unmarkPossiblePurchase } = useVehicles()

  return (
    <main className="page">
      <h2>Vehículos marcados como posible compra</h2>
      {possiblePurchases.length === 0 ? (
        <p>No has marcado vehículos. <Link to="/inventario">Volver al inventario</Link></p>
      ) : (
        <div className="cards">
          {possiblePurchases.map(v => (
            <article key={v.id} className="card value-card">
              <div className="card-body">
                <h3>{v.title}</h3>
                <p style={{color:'var(--muted)',marginBottom:'.75rem'}}>{v.desc}</p>
                <div style={{marginBottom:'1rem'}}>
                  <p style={{margin:'0.25rem 0'}}><strong>Marca:</strong> {v.marca}</p>
                  <p style={{margin:'0.25rem 0'}}><strong>Modelo:</strong> {v.modelo}</p>
                  <p style={{margin:'0.25rem 0'}}><strong>Año:</strong> {v.year}</p>
                  <p style={{margin:'0.25rem 0'}}><strong>Kilometraje:</strong> {v.km || 'No especificado'}</p>
                  <p style={{margin:'0.25rem 0',fontSize:'1.1rem',fontWeight:'700',color:'var(--primary)'}}><strong>Precio:</strong> {v.price}</p>
                </div>
                <div style={{display:'flex',gap:'.6rem',marginTop:'.6rem'}}>
                  <button className="btn cta" onClick={()=>unmarkPossiblePurchase(v.id)}>Quitar marca</button>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </main>
  )
}
