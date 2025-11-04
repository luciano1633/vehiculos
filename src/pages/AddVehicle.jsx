import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { useVehicles } from '../context/VehiclesContext'

// Página para agregar nuevos vehículos al inventario global
// Se adapta a la misma presentación visual que las otras páginas usando
// las clases `quienes-hero`, `hero-content`, `hero-visual` y `contact-card`.
export default function AddVehicle(){
  const { addVehicle } = useVehicles()
  const navigate = useNavigate()
  const [form, setForm] = useState({ marca:'', modelo:'', price:'', year:'', desc:'' })
  const [showCustomBrand, setShowCustomBrand] = useState(false)
  const [autoDescModel, setAutoDescModel] = useState('')
  const [priceError, setPriceError] = useState('')
  

  // Map de modelos por marca (se usan máximo 2 opciones)
  const modelsMap = {
    Kia: ['Rio','Sportage'],
    Hyundai: ['Accent','Tucson'],
    Subaru: ['Impreza','Forester'],
    Chevrolet: ['Spark','Cruze'],
    Toyota: ['Yaris','Corolla'],
  }

  // Descripciones predefinidas por modelo (autocompletan el campo descripción)
  const descriptionsMap = {
    Rio: 'Confort y eficiencia.',
    Sportage: 'Espacio y confort para la familia.',
    Accent: 'Económico y práctico para la ciudad.',
    Tucson: 'Versatilidad y tecnologías de seguridad.',
    Impreza: 'Estabilidad y desempeño en ruta.',
    Forester: 'Robustez y capacidad para viajes largos.',
    Spark: 'Ágil, ideal para ciudad.',
    Cruze: 'Comodidad y rendimiento en ruta.',
    Yaris: 'Confiable y de bajo consumo.',
    Corolla: 'Durabilidad y confort.',
    // Algunos modelos adicionales en ejemplo de inventario
    K3: 'Confort y eficiencia.',
    WRX: 'Rendimiento deportivo y tracción.',
    'i30 Fastback': 'Diseño dinámico y versatilidad.'
  }

  const currentYear = new Date().getFullYear()

  const onChange = (e) => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))

  const handlePriceChange = (e) => {
    const raw = e.target.value
  // Si el usuario escribe letras en precio, mostramos error
    const hasLetter = /[A-Za-zÁÉÍÓÚáéíóúÑñ]/.test(raw)
    if(hasLetter){
      setPriceError('Sólo se permiten números')
    } else {
      setPriceError('')
    }

  // Conserva solo dígitos y formatea con separadores de miles
    const digits = raw.replace(/[^0-9]/g, '')
    if(digits === ''){
      setForm(prev=>({ ...prev, price: '' }))
      return
    }
    const num = parseInt(digits, 10)
    const formatted = new Intl.NumberFormat('es-CL').format(num)
    setForm(prev=>({ ...prev, price: formatted }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Validación mínima antes de enviar
    if(!form.marca || !form.modelo) return alert('Ingrese marca y modelo')
  const rawPrice = (form.price || '').toString().trim()
  const digits = rawPrice.replace(/[^0-9]/g, '')
  const num = digits === '' ? 0 : parseInt(digits, 10)
    const formattedNumber = new Intl.NumberFormat('es-CL').format(num) // ej. 1.200.000
  const priceValue = `$${formattedNumber}`

    addVehicle({
      marca: form.marca,
      modelo: form.modelo,
      title: `${form.marca} ${form.modelo}`,
      desc: form.desc || '',
      year: parseInt(form.year||0,10),
      km: '0 km',
      price: priceValue,
      img: '',
      gallery: []
    })
    navigate('/inventario')
  }

  return (
    <main className="page add-vehicle" aria-labelledby="add-veh-title">
      <header className="quienes-hero contact-hero">
        <div className="hero-content">
          <h1 id="add-veh-title">Agregar vehículo</h1>
          <p className="hero-sub">Incluye un nuevo vehículo al inventario del sitio.</p>
          <div className="hero-actions">
            <Link className="btn primary" to="/">Inicio</Link>
            <Link className="btn ghost" to="/inventario">Ver inventario</Link>
          </div>
        </div>
        <div className="hero-visual" aria-hidden="true">
          <svg width="320" height="200" viewBox="0 0 320 200" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Ilustración de formulario">
            <rect width="320" height="200" rx="12" fill="url(#gAdd)" />
            <g fill="#fff" opacity="0.9">
              <rect x="40" y="50" width="240" height="18" rx="6" opacity="0.18" />
              <rect x="40" y="80" width="180" height="14" rx="6" opacity="0.12" />
              <circle cx="60" cy="150" r="10" opacity="0.18" />
            </g>
            <defs>
              <linearGradient id="gAdd" x1="0" y1="0" x2="1" y2="1">
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
            <h2>Formulario de vehículo</h2>
            <form className="contact-form" onSubmit={handleSubmit} aria-label="Formulario agregar vehículo">
              <label>
                Marca
                <div className="select-wrap">
                  <select name="marca" value={form.marca} onChange={(e)=>{
                    const v = e.target.value
                    // Resetear el modelo cuando cambia la marca
                    setForm(prev=>({ ...prev, marca: v, modelo: '' }))
                    if(v === 'other'){
                      setShowCustomBrand(true)
                      // dejar marca vacía para marca personalizada
                      setForm(prev=>({ ...prev, marca: '' }))
                    } else {
                      setShowCustomBrand(false)
                    }
                  }} required>
                    <option value="">-- Seleccione --</option>
                    <option value="Kia">Kia</option>
                    <option value="Hyundai">Hyundai</option>
                    <option value="Subaru">Subaru</option>
                    <option value="Chevrolet">Chevrolet</option>
                    <option value="Toyota">Toyota</option>
                  </select>
                  <span className="select-arrow" aria-hidden="true"></span>
                </div>
              </label>

              {showCustomBrand && (
                <label>
                  Especifique marca
                  <input name="marca" value={form.marca} onChange={onChange} required />
                </label>
              )}
              <label>
                Modelo
                { /* Modelo como select fijo (máximo 2 por marca). Si no hay marca seleccionada, el select queda deshabilitado. */ }
                <div className="select-wrap">
                  <select name="modelo" value={form.modelo} onChange={(e)=>{
                    const v = e.target.value
                    const prevModelo = form.modelo
                    // Si existe una descripción predefinida para el modelo seleccionado,
                    // autocompletarla solo si la descripción está vacía o si fue autocompletada antes.
                    if(v && descriptionsMap[v]){
                      if(form.desc === '' || autoDescModel === prevModelo){
                        setForm(prev=>({ ...prev, modelo: v, desc: descriptionsMap[v] }))
                        setAutoDescModel(v)
                      } else {
                        setForm(prev=>({ ...prev, modelo: v }))
                        setAutoDescModel('')
                      }
                    } else {
                      setForm(prev=>({ ...prev, modelo: v }))
                      setAutoDescModel('')
                    }
                  }} required disabled={!modelsMap[form.marca]}>
                    <option value="">-- Seleccione --</option>
                    {modelsMap[form.marca] && modelsMap[form.marca].slice(0,2).map((m)=> (
                      <option key={m} value={m}>{m}</option>
                    ))}
                  </select>
                  <span className="select-arrow" aria-hidden="true"></span>
                </div>
              </label>
              <label>
                Año
                <div className="select-wrap">
                  <select name="year" value={form.year} onChange={onChange} required>
                    <option value="">-- Seleccione --</option>
                    {Array.from({length: (currentYear - 2020) + 1}, (_, i) => (currentYear - i)).map(y => (
                      <option key={y} value={y}>{y}</option>
                    ))}
                  </select>
                  <span className="select-arrow" aria-hidden="true"></span>
                </div>
              </label>
              <label>
                Precio
                <div className="price-wrap">
                  <input name="price" value={form.price} onChange={handlePriceChange} className={priceError? 'input-error':''} placeholder="e.g. 1200000" />
                </div>
                {priceError && <div className="field-error" role="alert">{priceError}</div>}
              </label>
              <label>
                Descripción
                <textarea name="desc" value={form.desc} onChange={(e)=>{ setAutoDescModel(''); setForm(prev=>({ ...prev, desc: e.target.value })) }} rows={4} />
              </label>
              <div style={{marginTop:'.6rem'}}>
                <button className="btn cta" type="submit">Agregar</button>
                <button className="btn ghost" type="button" style={{marginLeft:'.6rem'}} onClick={()=>navigate(-1)}>Cancelar</button>
              </div>
            </form>
          </article>

          <aside className="quienes-values" aria-hidden="true">
            <h3>Consejo</h3>
            <div className="values-grid">
              <div className="value-card">
                <strong>Revisa los datos</strong>
                <p>Verifica marca, modelo y año antes de agregar.</p>
              </div>
              <div className="value-card">
                <strong>Imágenes</strong>
                <p>Puedes subir imágenes más adelante desde la edición del inventario.</p>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </main>
  )
}
