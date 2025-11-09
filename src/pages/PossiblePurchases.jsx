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
              <img 
                src={v.img} 
                alt={v.title} 
                loading="lazy"
                style={{width:'100%',height:160,objectFit:'cover',borderRadius:8}} 
              />
              <div className="card-body">
                <h3>{v.title}</h3>
                <p style={{color:'var(--muted)'}}>{v.desc}</p>
                <p><strong>{v.price}</strong></p>
                <div style={{display:'flex',gap:'.6rem',marginTop:'.6rem'}}>
                  <button className="btn primary" onClick={()=>unmarkPossiblePurchase(v.id)}>Quitar marca</button>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </main>
  )
}
