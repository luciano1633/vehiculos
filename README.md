# Venta de Vehículos (Proyecto React)

Proyecto de frontend para la actividad "Utilizando tecnologías avanzadas de React en sitios web".

Estructura rápida:

- `src/` - código fuente
  - `pages/` - `Home`, `QuienesSomos`, `Contactanos`
  - `components/` - `NavBottom`

# Venta de Vehículos (Proyecto React)

Proyecto frontend (Vite + React) usado en la actividad. Implementa catálogo de vehículos, formulario para agregar, inventario y un pequeño flujo de administración.

Principales características implementadas
- Página principal `Home` con catálogo y modal de detalles.
- Página `Agregar vehículo` (`/agregar`) con selects para marca/modelo/año, formato de precio y autocompletado de descripción.
- Página `Inventario` (`/inventario`) con listado y botón para marcar como "vendido"/"disponible".
- Contexto global `VehiclesContext` para manejar el inventario en memoria.
- Autenticación simple `AuthContext` y página de login (`/login`) para proteger las rutas administrativas.
- Estilos globales en `src/components/styles.css` y componentes reutilizables (tarjetas, botones, selects).

Credenciales de administrador (desarrollo)
- Usuario: `admin`
- Contraseña: `admin`

Nota: las credenciales están hardcodeadas para fines de desarrollo; no usar en producción.

Requisitos
- Node.js 18+ recomendado

Comandos (PowerShell)

```powershell
# instalar dependencias
npm install

# ejecutar en desarrollo
npm run dev

# construir para producción
npm run build

# previsualizar el build
npm run preview
```

Archivos clave
- `src/context/VehiclesContext.jsx` — proveedor del inventario (addVehicle, toggleAvailability).
- `src/context/AuthContext.jsx` — proveedor de autenticación simple.
- `src/pages/AddVehicle.jsx` — formulario para agregar vehículos.
- `src/pages/Inventory.jsx` — listado y gestión de estado (vendido/disponible).
- `src/pages/Login.jsx` — acceso administrador.
- `src/components/styles.css` — estilos globales y utilidades.

 Siguientes mejoras recomendadas
 - Persistir el inventario en `localStorage` o backend para que sobreviva a recargas.
 - Reemplazar las credenciales hardcodeadas por un sistema real de autenticación.
 - Añadir confirmaciones y mejoras de accesibilidad donde sea necesario.

 Persistencia
 - El inventario ahora se persiste en `localStorage` bajo la clave `venta_de_vehiculos`. Los vehículos añadidos o marcados como vendidos se conservarán entre recargas del navegador.

 Despliegue a GitHub / GitHub Pages
 Puedes subir este proyecto a GitHub y desplegarlo en GitHub Pages. A continuación se incluyen pasos recomendados (PowerShell):

 1) Inicializar repo local (si aún no existe) y subir al remoto:

 ```powershell
 # desde la raíz del proyecto
 git init
 git add .
 git commit -m "Inicial: proyecto Venta de Vehículos"
 # crea la rama principal y añade el remote (reemplaza la URL por la de tu repo)
 git branch -M main
 git remote add origin https://github.com/USUARIO/REPO.git
 git push -u origin main
 ```

 2) Desplegar en GitHub Pages (opción simple con `gh-pages`):

 ```powershell
 # instalar gh-pages como dependencia de desarrollo
 npm install --save-dev gh-pages

 # añade en package.json estas dos entradas en "scripts":
 # "predeploy": "npm run build",
 # "deploy": "gh-pages -d dist"

 # luego construir y desplegar
 npm run build
 npm run deploy
 ```

 3) Alternativa: usar GitHub Actions para desplegar automáticamente desde la rama `main` al permitir Pages en la configuración del repositorio (con la carpeta `dist` o `gh-pages`).

 Notas
 - Si vas a usar `gh-pages`, asegúrate de que la propiedad `homepage` en `package.json` (opcional) apunte a `https://USUARIO.github.io/REPO` para que las rutas relativas funcionen correctamente.
 - Para un entorno profesional/restringido, reemplaza la autenticación hardcodeada por un backend o servicio de autenticación.

