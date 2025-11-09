
/**
 * Helper para generar rutas de imágenes públicas
 * Maneja el base URL configurado en Vite
 * @param {string} filename - Nombre del archivo de imagen
 * @returns {string} - Ruta completa de la imagen
 */
export const getImagePath = (filename) => {
  const base = import.meta.env.BASE_URL || '/'
  return `${base}img/${filename}`
}

/**
 * Migra rutas de imágenes antiguas a nuevas
 * @param {Array} vehiclesList - Lista de vehículos
 * @returns {Array} - Lista con rutas actualizadas
 */
export const migrateImagePaths = (vehiclesList) => {
  return vehiclesList.map(vehicle => {
    // Si la imagen tiene una ruta antigua (src/components/img), actualizarla
    if (vehicle.img && vehicle.img.includes('src/components/img')) {
      const filename = vehicle.img.split('/').pop()
      vehicle.img = getImagePath(filename)
    }
    if (vehicle.gallery && Array.isArray(vehicle.gallery)) {
      vehicle.gallery = vehicle.gallery.map(imgPath => {
        if (imgPath.includes('src/components/img')) {
          const filename = imgPath.split('/').pop()
          return getImagePath(filename)
        }
        return imgPath
      })
    }
    return vehicle
  })
}
