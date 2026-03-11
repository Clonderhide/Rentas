# GOSY (Global Operations System for Yield)

GOSY es un sistema integral de Punto de Venta (POS) y Gestión Inmobiliaria enfocado en optimizar el rendimiento y las operaciones.

## Estructura del Proyecto

- `index.html` - Landing page principal de GOSY, orientada al software POS.
- `rentas.html` - Sección de bienes raíces para renta de casas y departamentos, con sistema de filtrado y visualización detallada.
- `styles.css` - Estilos globales personalizados y utilidades adicionales a TailwindCSS (como glassmorphism y animaciones).
- `app.js` - Lógica de interacciones interactivas, menús de navegación móvil, y modales de galerías y propiedades.
- `imagenes/` - Carpeta destinada a albergar todos los activos de imagen.

## Tecnologías

- HTML5
- CSS puro con integración de utilidades personalizadas
- JavaScript (Vanilla)
- [TailwindCSS via CDN](https://tailwindcss.com/)
- [Phosphor Icons](https://phosphoricons.com/)

## Despliegue

Este proyecto no requiere un proceso de construcción (build process) complicado. Para verlo en vivo, simplemente abre el archivo `index.html` en tu navegador web. Si prefieres alojarlo, puedes subir todos los archivos a plataformas estáticas gratuitas como Vercel, Netlify, Github Pages, o Hostinger.

## Configuración y Mantenimiento

### Añadir Nuevas Propiedades
Para añadir más propiedades a la vista de "Rentas", ubique la sección `#propiedades` en `rentas.html` y copie la estructura de un elemento existente.

### Editar Galería de Imágenes
Edite el objeto `propertiesData` dentro de `app.js`. Asegúrese de listar URLs (o rutas relativas a su carpeta `imagenes/`) válidas dentro del sub-arreglo `gallery: []` asignado a cada objeto de propiedad.
