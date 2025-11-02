import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Login(){
  const navigate = useNavigate()
  const { login } = useAuth()
  const [form, setForm] = useState({ username:'', password:'' })
  const [error, setError] = useState('')

  const onChange = (e) => setForm(prev=>({ ...prev, [e.target.name]: e.target.value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    const res = login(form)
    if(res.ok){
      navigate('/inventario')
    } else {
      setError(res.message || 'Error')
    }
  }

  return (
    <main className="page" style={{maxWidth:760}}>
      <div className="contact-card">
        <h2>Acceso administrador</h2>
        <p>Ingresa tus credenciales para acceder al panel de administración.</p>

  {/* Formulario de login: llama a login() desde AuthContext y redirige al inventario */}
  <form onSubmit={handleSubmit} className="contact-form" style={{marginTop:'.6rem'}}>
          <label>
            Usuario
            <input name="username" value={form.username} onChange={onChange} required />
          </label>
          <label>
            Contraseña
            <input name="password" type="password" value={form.password} onChange={onChange} required />
          </label>

          {error && <div className="field-error">{error}</div>}

          <div style={{display:'flex',gap:'.6rem',marginTop:'.4rem'}}>
            <button className="btn cta" type="submit">Entrar</button>
            <button className="btn ghost" type="button" onClick={()=>navigate('/')}>Cancelar</button>
          </div>
        </form>

        <p style={{marginTop:'.6rem',color:'var(--muted)'}}>Credenciales por defecto: <strong>admin</strong> / <strong>admin</strong></p>
      </div>
    </main>
  )
}
