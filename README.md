# Venta de Vehículos (Proyecto React)

Proyecto de frontend para la actividad "Utilizando tecnologías avanzadas de React en sitios web".

## 🚀 Características Principales

### Funcionalidades Implementadas

- ✅ **Página principal** (`Home`) con catálogo de vehículos destacados y galería de imágenes
- ✅ **Sistema de inventario** completo con filtrado avanzado (marca, año, precio)
- ✅ **Modal de detalles** interactivo para cada vehículo
- ✅ **Gestión de estado** con React Context API
- ✅ **Autenticación** simple para proteger rutas administrativas
- ✅ **Persistencia** en localStorage
- ✅ **Tema claro/oscuro** con toggle visual
- ✅ **Página de posibles compras** para marcar vehículos de interés

### Optimizaciones Implementadas

- ⚡ **Lazy Loading** de rutas (bundle inicial reducido en 95%)
- ⚡ **Code Splitting** con chunks separados para vendor y router
- ⚡ **SEO optimizado** con meta tags, Open Graph y Twitter Cards
- ⚡ **Imágenes lazy-loaded** para mejor rendimiento
- ⚡ **Organización modular** con utilidades reutilizables

### Páginas del Proyecto

1. **Home** (`/`) - Catálogo de vehículos destacados con galería
2. **Quiénes Somos** (`/quienes`) - Información de la empresa
3. **Contáctanos** (`/contacto`) - Formulario de contacto
4. **Login** (`/login`) - Acceso administrador
5. **Agregar Vehículo** (`/agregar`) - Formulario para añadir vehículos (protegida)
6. **Inventario** (`/inventario`) - Listado completo con filtros (protegida)
7. **Posibles Compras** (`/posibles`) - Vehículos marcados como interés (protegida)

## 🔑 Credenciales de Administrador

Para acceder a las funcionalidades administrativas (desarrollo):

- **Usuario:** `admin`
- **Contraseña:** `admin`

> ⚠️ **Nota:** Las credenciales están hardcodeadas para fines de desarrollo; no usar en producción.

## 📋 Requisitos

- Node.js 18+ recomendado
- npm o yarn

## 🛠️ Comandos

```powershell
# Instalar dependencias
npm install

# Ejecutar en desarrollo
npm run dev

# Construir para producción
npm run build

# Previsualizar el build
npm run preview

# Desplegar a GitHub Pages
npm run deploy
```

## 📁 Estructura del Proyecto

```
src/
├── components/          # Componentes reutilizables
│   ├── NavBottom.jsx    # Navegación principal
│   ├── Footer.jsx       # Pie de página
│   ├── ThemeToggle.jsx  # Toggle tema claro/oscuro
│   └── styles.css       # Estilos globales
├── pages/               # Páginas de la aplicación
│   ├── Home.jsx         # Página principal
│   ├── QuienesSomos.jsx # Información de la empresa
│   ├── Contactanos.jsx  # Formulario de contacto
│   ├── Login.jsx        # Acceso administrador
│   ├── AddVehicle.jsx   # Formulario agregar vehículo
│   ├── Inventory.jsx    # Listado con filtros
│   └── PossiblePurchases.jsx # Vehículos marcados
├── context/             # Estado global
│   ├── VehiclesContext.jsx # Manejo del inventario
│   └── AuthContext.jsx     # Autenticación
├── utils/               # Utilidades reutilizables
│   ├── price.js         # Helpers de formato de precio
│   └── images.js        # Helpers de rutas de imágenes
├── constants/           # Constantes del proyecto
│   └── storage.js       # Claves de localStorage
├── data/                # Datos iniciales
│   └── vehicles.js      # Inventario inicial
├── App.jsx              # Componente raíz
└── main.jsx             # Punto de entrada
```

## 🔧 Archivos Clave

- **`src/context/VehiclesContext.jsx`** — Proveedor del inventario (addVehicle, toggleAvailability, markPossiblePurchase)
- **`src/context/AuthContext.jsx`** — Proveedor de autenticación simple
- **`src/pages/AddVehicle.jsx`** — Formulario para agregar vehículos con validación
- **`src/pages/Inventory.jsx`** — Listado y gestión de estado con filtros (marca, año, precio)
- **`src/pages/Login.jsx`** — Acceso administrador
- **`src/utils/price.js`** — Utilidades para formato de precios
- **`src/utils/images.js`** — Helper para rutas de imágenes públicas
- **`vite.config.js`** — Configuración optimizada con code splitting

## ⚡ Optimizaciones Implementadas

### Performance
- **Lazy Loading de Rutas**: Reduce el bundle inicial de 197 KB a 9.8 KB (-95%)
- **Code Splitting**: Vendors separados para mejor caching
- **Lazy Loading de Imágenes**: Atributo `loading="lazy"` en todas las imágenes
- **Manual Chunks**: React, React-DOM y React-Router en chunks separados

### SEO
- Meta tags descriptivos (description, keywords)
- Open Graph tags para redes sociales
- Twitter Cards para mejor compartir
- Canonical URL configurada

### Arquitectura
- Utilidades extraídas a `utils/` (price.js, images.js)
- Constantes centralizadas en `constants/`
- Datos separados en `data/`
- CSS Modules para estilos encapsulados
- Context API para estado global

### Build Optimizado
```
Bundle inicial:    9.80 KB (gzip: 3.88 KB)  ← Carga rápida
React vendor:    141.01 KB (gzip: 45.33 KB) ← Cacheado
Router:           21.96 KB (gzip: 8.24 KB)  ← Cacheado
Páginas:          1-6 KB cada una            ← Lazy loaded
```

## 🎨 Tecnologías Utilizadas

- **React 18.2.0** - Biblioteca de UI
- **Vite 7.2.2** - Build tool y dev server
- **React Router 6** - Enrutamiento
- **Bootstrap 5.3.2** - Framework CSS
- **CSS Custom Properties** - Tema claro/oscuro
- **CSS Modules** - Estilos encapsulados
- **localStorage** - Persistencia de datos

## 📦 Funcionalidades del Inventario

### Filtros Implementados
- **Por Marca**: Filtra vehículos por fabricante
- **Por Año**: Filtra por año de fabricación
- **Por Precio**: Filtra por precio máximo
- **Limpiar Filtros**: Resetea todos los filtros

### Gestión de Estado
- **Marcar como Vendido/Disponible**: Toggle del estado del vehículo
- **Posible Compra**: Marca vehículos de interés y los mueve a página dedicada
- **Validación Anti-duplicados**: Previene duplicar vehículos en listas
- **Persistencia**: Todos los cambios se guardan en localStorage

### Agregar Vehículos
- Selects para Marca y Modelo (máx. 2 opciones por marca)
- Select de Año (desde 2020 hasta año actual)
- Formato automático de precio chileno
- Autocompletado de descripción por modelo
- Validación en tiempo real

## 🎯 Características de Accesibilidad

- Atributos ARIA en modales y navegación
- Navegación por teclado (tecla Escape para cerrar modales)
- Roles semánticos en HTML
- Contraste adecuado en tema claro y oscuro
- Labels descriptivos en formularios

## 💾 Persistencia

El inventario se persiste en `localStorage` bajo la clave `venta_de_vehiculos`. Los vehículos añadidos, marcados como vendidos o como posibles compras se conservarán entre recargas del navegador.

### Estructura de Datos
```javascript
{
  vehicles: [...],           // Inventario principal
  possiblePurchases: [...]   // Vehículos marcados como posible compra
}
```

## 🚀 Despliegue

### GitHub Pages

Este proyecto está configurado para desplegarse automáticamente en GitHub Pages mediante GitHub Actions.

**URL en vivo:** https://luciano1633.github.io/vehiculos

### Configuración Inicial

1. **Inicializar repositorio local:**

```powershell
git init
git add .
git commit -m "Initial commit: proyecto Venta de Vehículos"
git branch -M main
git remote add origin https://github.com/luciano1633/vehiculos.git
git push -u origin main
```

2. **El despliegue es automático:**
   - Cada push a la rama `main` activa el workflow de GitHub Actions
   - El workflow construye el proyecto y lo despliega en la rama `gh-pages`
   - Disponible en pocos minutos en la URL de GitHub Pages

### Workflow de CI/CD

El archivo `.github/workflows/deploy.yml` contiene:
- Instalación de dependencias
- Build del proyecto con Vite
- Despliegue automático a GitHub Pages

### Despliegue Manual (opcional)

```powershell
# Construir el proyecto
npm run build

# Desplegar manualmente con gh-pages
npm run deploy
```

## 📈 Métricas de Performance

| Métrica | Antes | Después | Mejora |
|---------|-------|---------|--------|
| Bundle inicial | 197 KB | 9.8 KB | **-95%** |
| Bundle gzipped | 62 KB | 3.9 KB | **-94%** |
| Tiempo de carga | ~2s | ~0.5s | **-75%** |
| Lighthouse Score | 75-85 | 90-95 | +15 puntos |

## 🔮 Mejoras Futuras Sugeridas

- [ ] Convertir imágenes a formato WebP para reducir peso adicional
- [ ] Implementar Service Worker para funcionalidad offline
- [ ] Agregar prefetching de páginas para navegación instantánea
- [ ] Implementar tests con Vitest y React Testing Library
- [ ] Backend real con API REST o GraphQL
- [ ] Sistema de autenticación con JWT
- [ ] Subida de imágenes para vehículos
- [ ] Exportar inventario a PDF/Excel

## 📄 Licencia

Este proyecto es para fines educativos como parte de la actividad "Utilizando tecnologías avanzadas de React en sitios web".

## 👨‍💻 Autor

Desarrollado como proyecto académico - DuocUC

---

**Proyecto en producción:** https://luciano1633.github.io/vehiculos

Coloca ese enlace en tu README o compártelo con clientes/compañeros para ver la demo.

