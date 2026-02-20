# Portfolio Periodístico Profesional

Portfolio web profesional para periodista, construido con Next.js 14, TypeScript y Tailwind CSS. Diseño minimalista, sobrio y textual inspirado en el estilo editorial profesional.

## 🎯 Características

- ✅ **Next.js 14** con App Router
- ✅ **TypeScript** con tipado estricto completo
- ✅ **Tailwind CSS** para estilos minimalistas
- ✅ **Contenido JSON centralizado** - Todo el contenido en `data/content.json`
- ✅ **Diseño sobrio y profesional** - Estilo editorial, mucho espacio en blanco
- ✅ **Tipografía editorial** - Serif para títulos, sans-serif para cuerpo
- ✅ **Sin animaciones excesivas** - Enfoque en el contenido
- ✅ **Componentes reutilizables** - Section, ArticleCard, PhotoGrid
- ✅ **Mobile-first** y completamente responsive

## 🚀 Inicio Rápido

### Instalación

```bash
npm install
```

### Desarrollo

```bash
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

### Producción

```bash
npm run build
npm start
```

## 📁 Estructura del Proyecto

```
portfolio-dego/
├── app/
│   ├── layout.tsx              # Layout principal
│   ├── page.tsx                # Página de inicio
│   ├── about/
│   │   └── page.tsx            # Conóceme
│   ├── photography/
│   │   └── page.tsx            # Fotografía
│   ├── reports/
│   │   └── page.tsx            # Reportajes
│   ├── work/
│   │   └── page.tsx            # Vida laboral
│   └── globals.css             # Estilos globales Tailwind
├── components/
│   ├── Header.tsx              # Navegación minimalista
│   ├── Footer.tsx              # Footer con contacto
│   ├── Section.tsx             # Contenedor de secciones
│   ├── ArticleCard.tsx         # Tarjeta de artículo/reportaje
│   └── PhotoGrid.tsx           # Grid de fotografías
├── data/
│   └── content.json            # ⭐ Contenido centralizado
├── lib/
│   └── content.ts              # Funciones helper para leer JSON
└── types/
    └── content.ts              # Tipos TypeScript
```

## 📝 Gestión de Contenido

### Archivo `data/content.json`

Todo el contenido del portfolio se gestiona desde un único archivo JSON con la siguiente estructura:

```json
{
  "site": {
    "name": "Nombre Apellidos",
    "role": "Periodista / Estudiante de Periodismo",
    "location": "Madrid, España",
    "languages": ["Español", "Italiano", "Inglés"]
  },
  "about": {
    "bio": "Texto biográfico profesional...",
    "focus": ["Política", "Sociedad", "Cultura", "Internacional"]
  },
  "photography": {
    "intro": "Texto sobre enfoque fotográfico...",
    "photos": [...]
  },
  "reports": [...],
  "work": [...],
  "contact": {...}
}
```

### Modificar Contenido

1. Abre `data/content.json`
2. Edita cualquier sección que necesites cambiar
3. Los cambios se reflejarán automáticamente en todas las páginas

### Funciones Helper

El archivo `lib/content.ts` proporciona funciones para acceder al contenido:

```typescript
import { 
  getSiteInfo, 
  getAbout, 
  getPhotography, 
  getReports, 
  getWork, 
  getContact 
} from '@/lib/content';
```

## 🎨 Estilo Visual

### Principios de Diseño

- **Minimalista**: Diseño limpio sin elementos innecesarios
- **Textual**: Prioridad al contenido escrito
- **Espacio en blanco**: Mucho espacio para respirar
- **Tipografía editorial**: Serif para títulos, sans-serif para cuerpo
- **Colores sobrios**: Blanco, negro, grises (sin colores de acento)
- **Sin animaciones**: Transiciones mínimas y discretas

### Paleta de Colores

- **Fondo**: Blanco (`bg-white`)
- **Texto principal**: Gris oscuro (`text-gray-900`)
- **Texto secundario**: Gris medio (`text-gray-600`, `text-gray-700`)
- **Bordes**: Gris claro (`border-gray-200`)

## 📱 Páginas

### `/` - Inicio
Página principal con nombre, rol, ubicación y breve presentación.

### `/about` - Conóceme
Biografía profesional y áreas de enfoque.

### `/photography` - Fotografía
Galería de fotografías documentales con captions discretas.

### `/reports` - Reportajes
Listado limpio de artículos y reportajes, priorizando el texto.

### `/work` - Vida laboral
Timeline vertical de experiencia profesional.

## 🔧 Componentes Reutilizables

### `Section`
Contenedor estándar para secciones con espaciado consistente.

```tsx
<Section>
  {/* Contenido */}
</Section>
```

### `ArticleCard`
Tarjeta para mostrar reportajes con diseño limpio y textual.

```tsx
<ArticleCard report={report} />
```

### `PhotoGrid`
Grid responsive para mostrar fotografías con captions.

```tsx
<PhotoGrid photos={photos} />
```

## 🌐 Despliegue

### Vercel (Recomendado)

1. Sube tu código a GitHub
2. Importa el proyecto en [Vercel](https://vercel.com)
3. Vercel detectará automáticamente Next.js
4. Haz clic en "Deploy"

### Otros Proveedores

El proyecto puede desplegarse en cualquier plataforma que soporte Next.js:
- Netlify
- Railway
- AWS Amplify
- etc.

## 📝 Notas Importantes

- **Imágenes**: Las imágenes usan placeholder de Unsplash. Reemplázalas con tus propias imágenes en `content.json`.
- **Enlaces**: Los enlaces de reportajes y redes sociales son placeholders. Actualízalos con tus URLs reales.
- **Email**: Cambia el email en `content.json` por tu email real.

## 🎯 Personalización

### Cambiar Colores

Los colores están definidos usando las clases de Tailwind. Para mantener el estilo sobrio, se recomienda usar solo:
- `text-gray-900` (texto principal)
- `text-gray-600` / `text-gray-700` (texto secundario)
- `border-gray-200` (bordes)

### Cambiar Tipografía

Las fuentes están configuradas en `tailwind.config.ts`:
- **Serif**: Georgia, Times New Roman (títulos)
- **Sans**: Sistema de fuentes del sistema (cuerpo)

### Modificar Espaciado

El componente `Section` controla el espaciado principal. Puedes ajustarlo en `components/Section.tsx`.

## 📄 Licencia

Este proyecto es de código abierto y está disponible para uso personal y educativo.

## 🤝 Inspiración

Diseño inspirado en el estilo sobrio y profesional de portfolios periodísticos como [francescorodella.com](https://francescorodella.com).
# portfolio-diego
