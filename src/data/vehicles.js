import { getImagePath } from '../utils/images'

// Rutas de imágenes desde public
const kiaImg = getImagePath('kia.jpg')
const kiaImg2 = getImagePath('kia2.jpg')
const subaruImg = getImagePath('subaru.jpg')
const subaruImg2 = getImagePath('subaru2.jpg')
const hyundaiImg = getImagePath('hyundai.jpg')
const hyundaiImg2 = getImagePath('hiundai2.jpg')

/**
 * Inventario inicial de vehículos
 */
export const initialVehicles = [
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
