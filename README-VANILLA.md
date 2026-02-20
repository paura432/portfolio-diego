# Portfolio Periodístico - HTML/CSS/JavaScript Vanilla

Portfolio web moderno y responsive para estudiante de periodismo, construido con HTML, CSS y JavaScript puro (sin frameworks).

## 🎯 Características

- ✅ Diseño minimalista tipo editorial
- ✅ Completamente responsive (mobile-first)
- ✅ Animaciones suaves al hacer scroll
- ✅ Navegación fija con menú móvil
- ✅ Paleta de colores neutra con acento azul
- ✅ Tipografía legible y profesional
- ✅ Código limpio y bien comentado
- ✅ Sin dependencias externas

## 📁 Estructura de Archivos

```
portfolio-dego/
├── index.html      # Estructura HTML principal
├── styles.css      # Estilos CSS
├── script.js       # Funcionalidades JavaScript
└── README-VANILLA.md
```

## 🚀 Uso

1. Abre `index.html` en tu navegador
2. O sirve los archivos con un servidor local:
   ```bash
   # Con Python
   python -m http.server 8000
   
   # Con Node.js (http-server)
   npx http-server
   ```

## 📋 Secciones

### 1. Conóceme
- Foto de perfil
- Nombre y presentación
- Texto sobre intereses y enfoque
- Cita destacada

### 2. Fotografía
- Galería en grid responsive
- 8 imágenes con overlay al hover
- Títulos y descripciones

### 3. Reportajes
- Lista de artículos/reportajes
- Información de medio y fecha
- Extractos y enlaces "Leer más"

### 4. Vida Laboral
- Timeline vertical con formación y experiencia
- Sección de habilidades

### 5. Contacto
- Email y redes sociales

## 🎨 Personalización

### Cambiar Colores

En `styles.css`, modifica las variables CSS:

```css
:root {
    --color-primary: #000000;        /* Color principal */
    --color-accent: #4a90e2;         /* Color de acento */
    --color-text: #1a1a1a;           /* Color de texto */
    --color-bg: #ffffff;              /* Color de fondo */
}
```

### Cambiar Contenido

Edita directamente en `index.html`:
- Nombre y datos personales
- Textos de presentación
- Reportajes y trabajos
- Información de contacto

### Cambiar Imágenes

Reemplaza las URLs de las imágenes placeholder en `index.html`:
- Foto de perfil (línea ~20)
- Imágenes de la galería (sección Fotografía)

## 📱 Responsive Design

El diseño es completamente responsive con breakpoints en:
- **Desktop**: > 768px
- **Tablet**: 481px - 768px
- **Mobile**: ≤ 480px

## 🔧 Funcionalidades JavaScript

- **Menú móvil**: Toggle del menú en dispositivos móviles
- **Scroll suave**: Navegación suave entre secciones
- **Animaciones**: Efectos al hacer scroll usando Intersection Observer
- **Header dinámico**: Cambio de estilo al hacer scroll
- **Año actual**: Actualización automática en el footer

## 🌐 Compatibilidad

- Chrome/Edge (últimas versiones)
- Firefox (últimas versiones)
- Safari (últimas versiones)
- Navegadores móviles modernos

## 📝 Notas

- Las imágenes usan placeholder de Unsplash. Reemplázalas con tus propias imágenes.
- Los enlaces "Leer más" y redes sociales son placeholders. Actualízalos con tus URLs reales.
- El email es un ejemplo. Cambia `maria.gonzalez@email.com` por tu email real.

## 🎯 Próximos Pasos Sugeridos

- Agregar más secciones si es necesario
- Integrar un formulario de contacto
- Agregar más animaciones personalizadas
- Optimizar imágenes para mejor rendimiento
- Agregar meta tags para SEO

## 📄 Licencia

Este proyecto es de código abierto y está disponible para uso personal y educativo.
