# Instrucciones de Configuración y Despliegue

## Configuración Inicial

### 1. Instalar dependencias

```bash
npm install
```

### 2. Configurar Cloudinary

1. Ve a [https://cloudinary.com/](https://cloudinary.com/)
2. Crea una cuenta gratuita (tiene 25GB de almacenamiento)
3. En el Dashboard, copia tus credenciales:
   - Cloud Name
   - API Key
   - API Secret

### 3. Crear archivo de variables de entorno

Crea un archivo `.env.local` en la raíz del proyecto:

```env
CLOUDINARY_CLOUD_NAME=tu_cloud_name_aqui
CLOUDINARY_API_KEY=tu_api_key_aqui
CLOUDINARY_API_SECRET=tu_api_secret_aqui
```

**⚠️ IMPORTANTE**: Nunca subas el archivo `.env.local` a Git. Ya está incluido en `.gitignore`.

### 4. Ejecutar en desarrollo

```bash
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

## Despliegue en Vercel

### Paso 1: Preparar el repositorio

1. Inicializa Git (si no lo has hecho):
```bash
git init
git add .
git commit -m "Initial commit"
```

2. Crea un repositorio en GitHub y súbelo:
```bash
git remote add origin tu_repositorio_url
git push -u origin main
```

### Paso 2: Desplegar en Vercel

#### Opción A: Desde el Dashboard de Vercel

1. Ve a [https://vercel.com](https://vercel.com)
2. Inicia sesión con tu cuenta de GitHub
3. Haz clic en "Add New Project"
4. Importa tu repositorio de GitHub
5. En "Environment Variables", agrega:
   - `CLOUDINARY_CLOUD_NAME` = tu cloud name
   - `CLOUDINARY_API_KEY` = tu API key
   - `CLOUDINARY_API_SECRET` = tu API secret
6. Haz clic en "Deploy"

#### Opción B: Desde la CLI

1. Instala Vercel CLI:
```bash
npm i -g vercel
```

2. Ejecuta:
```bash
vercel
```

3. Sigue las instrucciones y cuando te pregunte por las variables de entorno, agrégalas.

4. Para producción:
```bash
vercel --prod
```

### Paso 3: Configurar variables de entorno en Vercel

Si olvidaste agregar las variables de entorno durante el despliegue:

1. Ve a tu proyecto en Vercel
2. Settings → Environment Variables
3. Agrega las tres variables:
   - `CLOUDINARY_CLOUD_NAME`
   - `CLOUDINARY_API_KEY`
   - `CLOUDINARY_API_SECRET`
4. Haz clic en "Redeploy" para aplicar los cambios

## Uso de la Aplicación

### Página Principal (`/`)

- Muestra todas las fotos en una galería responsive
- Diseño moderno con efectos hover
- Las fotos se muestran con su título y descripción

### Panel de Administración (`/admin`)

- **Subir fotos**: Completa el formulario con título, descripción y selecciona una imagen
- **Ver fotos**: Todas las fotos subidas se muestran en la parte inferior
- **Eliminar fotos**: Haz clic en "Eliminar" para borrar una foto

## Características Técnicas

- ✅ Next.js 14 con App Router
- ✅ TypeScript para tipado estático
- ✅ Tailwind CSS para estilos
- ✅ Cloudinary para almacenamiento de imágenes
- ✅ Server Actions y API Routes
- ✅ Optimización de imágenes automática
- ✅ Diseño responsive
- ✅ Dark mode support

## Solución de Problemas

### Error: "Error al subir la foto"

- Verifica que las variables de entorno estén correctamente configuradas
- Asegúrate de que Cloudinary esté activo y las credenciales sean correctas
- Revisa la consola del navegador para más detalles

### Las fotos no se muestran

- Verifica que `next.config.js` tenga configurado el dominio de Cloudinary
- Asegúrate de que las imágenes estén en la carpeta `portfolio-dego` en Cloudinary

### Error en producción (Vercel)

- Verifica que todas las variables de entorno estén configuradas en Vercel
- Revisa los logs de Vercel para ver errores específicos
- Asegúrate de que el build se complete correctamente

## Próximos Pasos (Opcional)

- Agregar autenticación para proteger el panel de administración
- Implementar categorías o álbumes para las fotos
- Agregar búsqueda y filtros
- Implementar un sistema de base de datos para mejor gestión de metadatos
- Agregar más información sobre el fotógrafo (biografía, contacto, etc.)
