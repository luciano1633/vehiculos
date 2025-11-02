import React, { createContext, useContext, useState } from 'react'

const AuthContext = createContext(null)

const AUTH_KEY = 'venta_de_vehiculo_admin'

export function AuthProvider({ children }){
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    try { return localStorage.getItem(AUTH_KEY) === 'true' } catch { return false }
  })

  // Inicio de sesión simple con credenciales fijas (solo para desarrollo)
  const login = ({ username, password }) => {
    // Credenciales por defecto: admin / admin
    if(username === 'admin' && password === 'admin'){
      setIsAuthenticated(true)
      try{ localStorage.setItem(AUTH_KEY, 'true') }catch{}
      return { ok: true }
    }
    return { ok: false, message: 'Credenciales inválidas' }
  }

  const logout = () => {
    setIsAuthenticated(false)
    try{ localStorage.removeItem(AUTH_KEY) }catch{}
  }

  const value = { isAuthenticated, login, logout }
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth(){
  const ctx = useContext(AuthContext)
  if(!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}

export default AuthContext
