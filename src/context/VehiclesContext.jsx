import React, { createContext, useContext, useState, useEffect } from 'react'
import kiaImg from '../components/img/kia.jpeg'
import kiaImg2 from '../components/img/kia2.jpeg'
import subaruImg from '../components/img/subaru.jpg'
import subaruImg2 from '../components/img/subaru2.jpg'
import hyundaiImg from '../components/img/hyundai.jpg'
import hyundaiImg2 from '../components/img/hiundai2.jpeg'

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
  const [vehicles, setVehicles] = useState(() => {
    try{
      const raw = localStorage.getItem(STORAGE_KEY)
      if(!raw) return initialVehicles
      const parsed = JSON.parse(raw)
      // Si el storage está corrupto o vacío, fallback
      if(!Array.isArray(parsed)) return initialVehicles
      return parsed
    } catch (err){
      // En caso de error, usar inventario por defecto
      return initialVehicles
    }
  })

  // Sincroniza el inventario en localStorage cada vez que cambia
  useEffect(()=>{
    try{
      localStorage.setItem(STORAGE_KEY, JSON.stringify(vehicles))
    }catch(err){
      // si falla el guardado, no rompemos la app; podría registrarse el error si se desea
      console.warn('No se pudo guardar inventario en localStorage', err)
    }
  }, [vehicles])

  // Agrega un vehículo al inventario (simple push con id incremental)
  const addVehicle = (veh) => {
    const id = vehicles.length ? Math.max(...vehicles.map(v=>v.id))+1 : 1
    setVehicles(prev => [...prev, { id, status: 'disponible', ...veh }])
  }

  // Alterna el estado entre 'disponible' y 'vendido' para un vehículo
  const toggleAvailability = (id) => {
    setVehicles(prev => prev.map(v => v.id === id ? { ...v, status: v.status === 'vendido' ? 'disponible' : 'vendido' } : v))
  }

  const value = { vehicles, addVehicle, toggleAvailability }

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
