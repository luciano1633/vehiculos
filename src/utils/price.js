
/**
 * Parsea un precio en formato string a número
 * @param {string|number} price - Precio con símbolos y formato
 * @returns {number} - Precio como número limpio
 */
export const parsePrice = (price) => {
  if (!price) return 0
  return Number(String(price).replace(/[^0-9]/g, '')) || 0
}

/**
 * Formatea un número a precio en formato chileno
 * @param {number} num - Número a formatear
 * @returns {string} - Precio formateado (ej: "$12.990.000")
 */
export const formatPrice = (num) => {
  if (!num && num !== 0) return ''
  const formatted = new Intl.NumberFormat('es-CL').format(num)
  return `$${formatted}`
}
