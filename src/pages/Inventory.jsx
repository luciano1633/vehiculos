import React from 'react'
import { useVehicles } from '../context/VehiclesContext'

// Página que lista el inventario en una tabla
export default function Inventory(){
  const { vehicles, toggleAvailability } = useVehicles()

  return (
    <main className="page inventory">
      <h2>Inventario de vehículos</h2>
      <div style={{overflowX:'auto'}}>
        <table style={{width:'100%',borderCollapse:'collapse'}}>
          <thead>
            <tr>
              <th style={{textAlign:'left',padding:'.6rem',borderBottom:'1px solid var(--border)'}}>Marca</th>
              <th style={{textAlign:'left',padding:'.6rem',borderBottom:'1px solid var(--border)'}}>Modelo</th>
              <th style={{textAlign:'left',padding:'.6rem',borderBottom:'1px solid var(--border)'}}>Año</th>
              <th style={{textAlign:'left',padding:'.6rem',borderBottom:'1px solid var(--border)'}}>Precio</th>
              <th style={{textAlign:'left',padding:'.6rem',borderBottom:'1px solid var(--border)'}}>Descripción</th>
              <th style={{textAlign:'left',padding:'.6rem',borderBottom:'1px solid var(--border)'}}>Estado</th>
            </tr>
          </thead>
          <tbody>
            {vehicles.map(v => (
              <tr key={v.id}>
                <td style={{padding:'.6rem',borderBottom:'1px solid var(--border)'}}>{v.marca || ''}</td>
                <td style={{padding:'.6rem',borderBottom:'1px solid var(--border)'}}>{v.modelo || v.title}</td>
                <td style={{padding:'.6rem',borderBottom:'1px solid var(--border)'}}>{v.year}</td>
                <td style={{padding:'.6rem',borderBottom:'1px solid var(--border)'}}>{v.price}</td>
                <td style={{padding:'.6rem',borderBottom:'1px solid var(--border)'}}>{v.desc}</td>
                <td style={{padding:'.6rem',borderBottom:'1px solid var(--border)'}}>
                  <button className={`btn ${v.status === 'vendido' ? 'sold' : 'cta'}`} onClick={()=>toggleAvailability(v.id)}>
                    {v.status === 'vendido' ? 'Vendido' : 'Disponible'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  )
}
