import React, { createContext, useContext, useState, useEffect } from 'react'
// Use URL imports so Vite resolves the correct base path (works with `basename`)
const kiaImg = new URL('../components/img/kia.jpeg', import.meta.url).href
const kiaImg2 = new URL('../components/img/kia2.jpeg', import.meta.url).href
const subaruImg = new URL('../components/img/subaru.jpg', import.meta.url).href
const subaruImg2 = new URL('../components/img/subaru2.jpg', import.meta.url).href
const hyundaiImg = new URL('../components/img/hyundai.jpg', import.meta.url).href
const hyundaiImg2 = new URL('../components/img/hiundai2.jpeg', import.meta.url).href

const VehiclesContext = createContext(null)

// Inventario inicial (se puede ampliar)
const initialVehicles = [
  {
    id: 1,
    marca: 'Kia',
    modelo: 'K3',
    title: 'Kia K3',
    desc: 'Confort y eficiencia.',
    year: 2024,
    km: '12.000 km',
    price: '$12.990.000',
    status: 'disponible',
    img: kiaImg,
    gallery: [kiaImg, kiaImg2]
  },
  {
    id: 2,
    marca: 'Subaru',
    modelo: 'WRX',
    title: 'Subaru WRX',
    desc: 'Rendimiento deportivo y tracción.',
    year: 2023,
    km: '30.500 km',
    price: '$18.450.000',
    status: 'disponible',
    img: subaruImg,
    gallery: [subaruImg, subaruImg2]
  },
  {
    id: 3,
    marca: 'Hyundai',
    modelo: 'i30 Fastback',
    title: 'Hyundai i30 Fastback',
    desc: 'Diseño dinámico y versatilidad.',
    year: 2022,
    km: '22.100 km',
    price: '$14.200.000',
    status: 'disponible',
    img: hyundaiImg,
    gallery: [hyundaiImg, hyundaiImg2]
  }
]

export function VehiclesProvider({ children }){
  // Clave usada en localStorage
  const STORAGE_KEY = 'venta_de_vehiculos'

  // Inicializar el estado leyendo desde localStorage si existe; si no, usar initialVehicles
  // Migración: antes guardábamos solo un array de vehicles; ahora guardamos un objeto { vehicles, possible }
  const [vehicles, setVehicles] = useState(() => {
    try{
      const raw = localStorage.getItem(STORAGE_KEY)
      if(!raw) return initialVehicles
      const parsed = JSON.parse(raw)
      // Soportar formato antiguo (array)
      if(Array.isArray(parsed)) return parsed
      if(parsed && Array.isArray(parsed.vehicles)) return parsed.vehicles
      return initialVehicles
    } catch (err){
      return initialVehicles
    }
  })

  const [possiblePurchases, setPossiblePurchases] = useState(() => {
    try{
      const raw = localStorage.getItem(STORAGE_KEY)
      if(!raw) return []
      const parsed = JSON.parse(raw)
      if(Array.isArray(parsed)) return []
      if(parsed && Array.isArray(parsed.possiblePurchases)) return parsed.possiblePurchases
      return []
    } catch (err){
      return []
    }
  })

  // Sincroniza el inventario y la lista de posibles compras en localStorage cada vez que cambian
  useEffect(()=>{
    try{
      const payload = { vehicles, possiblePurchases }
      localStorage.setItem(STORAGE_KEY, JSON.stringify(payload))
    }catch(err){
      console.warn('No se pudo guardar inventario en localStorage', err)
    }
  }, [vehicles, possiblePurchases])

  // Agrega un vehículo al inventario (simple push con id incremental)
  const addVehicle = (veh) => {
    const id = vehicles.length ? Math.max(...vehicles.map(v=>v.id))+1 : 1
    setVehicles(prev => [...prev, { id, status: 'disponible', ...veh }])
  }

  // Alterna el estado entre 'disponible' y 'vendido' para un vehículo
  const toggleAvailability = (id) => {
    setVehicles(prev => prev.map(v => v.id === id ? { ...v, status: v.status === 'vendido' ? 'disponible' : 'vendido' } : v))
  }

  // Marca un vehículo como posible compra: lo mueve desde `vehicles` hacia `possiblePurchases`
  const markPossiblePurchase = (id) => {
    setVehicles(prev => {
      const item = prev.find(v => v.id === id)
      if(!item) return prev
      setPossiblePurchases(pp => [...pp, item])
      return prev.filter(v => v.id !== id)
    })
  }

  // Desmarca un vehículo (lo devuelve al inventario general)
  const unmarkPossiblePurchase = (id) => {
    setPossiblePurchases(prev => {
      const item = prev.find(v => v.id === id)
      if(!item) return prev
      setVehicles(vs => [...vs, item])
      return prev.filter(v => v.id !== id)
    })
  }

  const value = { vehicles, addVehicle, toggleAvailability, possiblePurchases, markPossiblePurchase, unmarkPossiblePurchase }

  return (
    <VehiclesContext.Provider value={value}>
      {children}
    </VehiclesContext.Provider>
  )
}

export function useVehicles(){
  const ctx = useContext(VehiclesContext)
  if(!ctx) throw new Error('useVehicles must be used within VehiclesProvider')
  return ctx
}
