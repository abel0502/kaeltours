# 🌍 KaelTours - Plataforma Premium de Turismo

[![Next.js](https://img.shields.io/badge/Next.js-14-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)](https://www.typescriptlang.org/)
[![Prisma](https://img.shields.io/badge/Prisma-5-2D3748)](https://www.prisma.io/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3-38bdf8)](https://tailwindcss.com/)

## 🎯 Descripción del Proyecto

KaelTours es una plataforma web premium de turismo diseñada para ofrecer experiencias de viaje inolvidables. El sitio está optimizado para dispositivos móviles (80% del tráfico esperado) con un enfoque en rendimiento y experiencia visual cinematográfica.

### Características Principales

- 🎥 **Hero cinematográfico** con video adaptativo (desktop) e imagen estática (móvil)
- 🎨 **Animaciones fluidas** con Framer Motion para scroll reveals
- 📱 **Responsive design** optimizado para móvil
- 🔐 **Panel de administración** completo con NextAuth v5
- 💬 **Integración WhatsApp** para consultas y reservas
- 🖼️ **Cloudinary** para optimización automática de imágenes
- 🎬 **YouTube/Vimeo embeds** para videos de tours
- 🔍 **SEO optimizado** con metadata dinámica
- 📊 **Dashboard administrativo** con estadísticas

## 🏗️ Arquitectura Técnica

### Stack Tecnológico

- **Framework:** Next.js 14 (App Router)
- **Lenguaje:** TypeScript (strict mode)
- **Base de Datos:** MySQL en Hostinger (Remote Access)
- **ORM:** Prisma 5
- **Autenticación:** NextAuth.js v5
- **Estilos:** Tailwind CSS 3
- **Animaciones:** Framer Motion
- **Media:** Cloudinary (Plan Free)
- **Deployment:** Vercel (Edge Functions)

### Arquitectura Híbrida

```
┌─────────────────────────────────────────┐
│         Frontend & API (Vercel)         │
│   - Next.js 14 Server & Client          │
│   - Edge Functions                      │
│   - Static Assets                       │
└────────────────┬────────────────────────┘
                 │
                 ├─────────────────┐
                 │                 │
         ┌───────▼──────┐   ┌─────▼──────────┐
         │   MySQL DB   │   │   Cloudinary   │
         │  (Hostinger) │   │   (Images)     │
         └──────────────┘   └────────────────┘
```

## 🚀 Instalación y Configuración

### Prerrequisitos

- Node.js 18+ instalado
- npm o yarn
- Acceso a base de datos MySQL (Hostinger)
- Cuenta de Cloudinary (opcional para desarrollo)

### Paso 1: Clonar e Instalar Dependencias

```bash
# Navegar al directorio del proyecto
cd "KAEL TOURS"

# Instalar dependencias
npm install
```

### Paso 2: Configurar Variables de Entorno

Copia `.env.example` a `.env` y configura las siguientes variables:

```env
# Database MySQL Hostinger
DATABASE_URL="mysql://u181039611_kaeltours:TU_PASSWORD@TU_HOST:3306/u181039611_kaeltours?connection_limit=5&pool_timeout=10&connect_timeout=30"

# NextAuth
NEXTAUTH_URL="http://localhost:3000"  # Cambiar en producción
NEXTAUTH_SECRET="genera-con-openssl-rand-base64-32"

# Cloudinary
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME="tu-cloud-name"
CLOUDINARY_API_KEY="tu-api-key"
CLOUDINARY_API_SECRET="tu-api-secret"

# WhatsApp
NEXT_PUBLIC_WHATSAPP_NUMBER="521234567890"  # Formato internacional sin +
```

#### Generar NEXTAUTH_SECRET

```bash
openssl rand -base64 32
```

### Paso 3: Configurar Base de Datos

```bash
# Generar cliente de Prisma
npx prisma generate

# Crear tablas en la base de datos
npx prisma migrate dev --name init

# Poblar base de datos con datos de ejemplo
npm run seed
```

### Paso 4: Ejecutar en Desarrollo

```bash
npm run dev
```

La aplicación estará disponible en `http://localhost:3000`

### Paso 5: Preparar Assets de Video Hero

El componente Hero espera un video en `/public/videos/hero.mp4` y un poster en `/public/videos/hero-poster.jpg`.

#### Comprimir Video Hero (Recomendado <5MB)

```bash
# Usando FFmpeg (instalar desde https://ffmpeg.org/)
ffmpeg -i input-video.mp4 -vf scale=1920:1080 -c:v libx264 -preset slow -crf 28 -c:a aac -b:a 128k -movflags +faststart public/videos/hero.mp4

# Extraer poster del video
ffmpeg -i public/videos/hero.mp4 -ss 00:00:01 -vframes 1 public/videos/hero-poster.jpg
```

**Nota:** Si no tienes video, el componente mostrará la imagen poster en su lugar.

## 👤 Acceso al Panel de Administración

Después de ejecutar el seed, usa estas credenciales:

- **URL:** `http://localhost:3000/login`
- **Email:** `admin@kaeltours.com`
- **Password:** `Admin123!`

**⚠️ IMPORTANTE:** Cambia la contraseña después del primer login en producción.

## 📁 Estructura del Proyecto

```
kaeltours/
├── app/                      # App Router (Next.js 14)
│   ├── (admin)/             # Route group - Panel Admin
│   │   ├── layout.tsx       # Layout con sidebar
│   │   ├── dashboard/       # Dashboard principal
│   │   └── tours/           # CRUD de tours
│   ├── (public)/            # Route group - Sitio público
│   │   └── tours/           # Catálogo y detalle
│   ├── api/                 # API Routes
│   │   ├── auth/            # NextAuth endpoints
│   │   ├── admin/           # API protegidas
│   │   ├── upload/          # Cloudinary upload
│   │   └── health/          # Health check
│   ├── login/               # Página de login
│   ├── layout.tsx           # Root layout
│   ├── page.tsx             # Homepage
│   └── globals.css          # Estilos globales
├── components/              # Componentes reutilizables
│   ├── home/                # Componentes del home
│   ├── tours/               # Componentes de tours
│   ├── shared/              # Componentes compartidos
│   └── ui/                  # Componentes UI base
├── lib/                     # Utilidades y configuraciones
│   ├── prisma.ts            # Prisma client
│   ├── utils.ts             # Helpers
│   ├── auth-utils.ts        # Utilidades de auth
│   ├── media-service.ts     # Abstracción de Cloudinary
│   └── validations/         # Schemas de Zod
├── hooks/                   # Custom React Hooks
│   ├── useMediaQuery.ts     # Detección de breakpoints
│   └── useWhatsApp.ts       # Integración WhatsApp
├── prisma/
│   ├── schema.prisma        # Schema de base de datos
│   └── seed.ts              # Datos de ejemplo
├── public/
│   └── videos/              # Assets de video
├── types/                   # TypeScript types
├── auth.ts                  # Configuración NextAuth
├── middleware.ts            # Protección de rutas
└── package.json
```

## 🎨 Guía de Uso del Panel Admin

### Gestión de Tours

#### Crear un Nuevo Tour

1. **Acceder al Panel:** Login en `/login` con credenciales de admin
2. **Ir a Tours:** Click en "Tours" en el sidebar
3. **Crear Tour:** Click en "Crear Tour"
4. **Completar Información:**
   - **Título:** Descriptivo y atractivo (ej: "Aventura en Cancún - Caribe Mexicano")
   - **Slug:** Se genera automáticamente del título (URL-friendly)
   - **Destino:** Ciudad o región principal
   - **Categoría:** Seleccionar entre Aventura, Romance, Familia, Lujo, Cultural
   - **Precio:** Monto en USD (sin símbolo $)
   - **Duración:** Número de días del tour
   - **Max Guests:** Capacidad máxima del grupo

#### Multimedia

##### Imágenes
- **Hero Image:** Imagen principal del tour (1920x1080px recomendado)
- **Gallery:** Mínimo 4 imágenes (1200x800px cada una)
- **Formatos:** JPG, PNG o WebP
- **Peso:** Máximo 5MB por imagen (Cloudinary optimiza automáticamente)

##### Videos
- **YouTube ID:** Extraer de la URL de YouTube
  - URL: `https://www.youtube.com/watch?v=dQw4w9WgXcQ`
  - ID: `dQw4w9WgXcQ`
- **Vimeo ID:** Similar para videos de Vimeo

#### Contenido

- **Descripción:** Mínimo 200 palabras, usar saltos de línea para párrafos
- **Highlights:** Lista de puntos destacados (bullet points)
- **Qué Incluye:** Servicios y productos incluidos en el precio
- **No Incluye:** Gastos adicionales que el cliente debe considerar

#### SEO

- **SEO Title:** 50-60 caracteres (incluir keywords principales)
- **SEO Description:** 150-160 caracteres (resumen atractivo)
- **Keywords:** Separadas por comas

#### Publicación

- **Featured:** Marca para mostrar en homepage (máximo 6)
- **Published:** Solo tours publicados son visibles públicamente

### Checklist de Tour Completo ✅

Antes de publicar un tour, verifica:

- [ ] Título atractivo y descriptivo
- [ ] Descripción mayor a 200 palabras
- [ ] Al menos 4 imágenes de alta calidad en la galería
- [ ] Hero image configurada
- [ ] Precio definido
- [ ] Duración y capacidad especificadas
- [ ] Al menos 3 highlights
- [ ] Información de "Qué Incluye"
- [ ] Metadata SEO completa
- [ ] Video de YouTube (opcional pero recomendado)
- [ ] Estado "Published" activado

## 🚀 Deployment en Vercel (Producción)

### Paso 1: Preparar Repositorio

```bash
# Inicializar git (si no está inicializado)
git init

# Agregar archivos
git add .

# Commit inicial
git commit -m "Initial commit - KaelTours MVP"

# Crear repositorio en GitHub y subir
git remote add origin https://github.com/tu-usuario/kaeltours.git
git branch -M main
git push -u origin main
```

### Paso 2: Configurar Proyecto en Vercel

1. **Ir a [vercel.com](https://vercel.com)** y hacer login con GitHub
2. **Import Project:** Click en "Add New" > "Project"
3. **Seleccionar Repositorio:** Buscar y seleccionar el repo de KaelTours
4. **Framework Preset:** Vercel detectará automáticamente Next.js
5. **Root Directory:** Dejar en `.` (raíz)

### Paso 3: Configurar Variables de Entorno en Vercel

En la sección "Environment Variables":

```env
DATABASE_URL=mysql://u181039611_kaeltours:PASSWORD@HOST:3306/u181039611_kaeltours?connection_limit=5&pool_timeout=10&connect_timeout=30
NEXTAUTH_URL=https://tu-proyecto.vercel.app
NEXTAUTH_SECRET=tu-secret-generado-con-openssl
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=tu-cloud-name
CLOUDINARY_API_KEY=tu-api-key
CLOUDINARY_API_SECRET=tu-api-secret
NEXT_PUBLIC_WHATSAPP_NUMBER=521234567890
```

### Paso 4: Build Settings

- **Build Command:** `npm run build` (default)
- **Output Directory:** `.next` (default)
- **Install Command:** `npm install` (default)

### Paso 5: Deploy

Click en "Deploy" y esperar a que termine el proceso.

### Paso 6: Verificar Conexión a Base de Datos

Después del primer deploy, visita:
```
https://tu-proyecto.vercel.app/api/health
```

Deberías ver:
```json
{
  "status": "ok",
  "database": "connected",
  "tours": 5,
  "timestamp": "2025-01-01T00:00:00.000Z"
}
```

### Paso 7: Ejecutar Migraciones en Producción

```bash
# En local, con DATABASE_URL de producción en .env
npx prisma migrate deploy

# O usar Vercel CLI
vercel env pull
npx prisma migrate deploy
```

### Paso 8: Poblar Base de Datos (Primera Vez)

```bash
npm run seed
```

## 🌐 Conectar Dominio Personalizado (kaeltours.com)

### En Vercel

1. **Ir a Project Settings** > **Domains**
2. **Add Domain:** Ingresar `kaeltours.com`
3. **Copiar registros DNS** que Vercel proporciona

### En tu Registrador de Dominio

Agregar los siguientes registros DNS:

```
Tipo: A
Host: @
Valor: 76.76.21.21

Tipo: CNAME
Host: www
Valor: cname.vercel-dns.com
```

Guardar cambios y esperar propagación (5-60 minutos).

### Actualizar NEXTAUTH_URL

En Vercel Environment Variables:
```env
NEXTAUTH_URL=https://kaeltours.com
```

Redeploy para aplicar cambios.

## 🔧 Troubleshooting

### Error: "Can't reach database server"

**Causa:** Hostinger no permite conexiones desde IPs de Vercel

**Solución:**
1. Verificar en Hostinger > Remote MySQL > Allowed Hosts
2. Debe estar configurado `%` (wildcard) para permitir todas las IPs
3. Alternativamente, migrar a PlanetScale o Railway para mejor compatibilidad serverless

### Error: "Module not found"

**Solución:**
```bash
rm -rf node_modules package-lock.json
npm install
```

### Imágenes no se muestran

**Causa:** Dominio no agregado en `next.config.mjs`

**Solución:** Agregar dominio en `remotePatterns`:
```js
{
  protocol: 'https',
  hostname: 'tu-nuevo-dominio.com',
}
```

### Video hero no aparece en móvil

**Comportamiento esperado:** Por diseño, el video solo se muestra en desktop (>1024px) para ahorrar datos móviles.

## 📊 Performance Targets

### Lighthouse Scores (Objetivos)

| Métrica | Desktop | Mobile |
|---------|---------|--------|
| Performance | >90 | >85 |
| Accessibility | >95 | >95 |
| Best Practices | >95 | >95 |
| SEO | 100 | 100 |

### Estrategias de Optimización

1. **Imágenes:** Next.js Image optimization + Cloudinary transformations
2. **Videos:** Solo en desktop, lazy loading
3. **Fonts:** next/font con subset latino
4. **Code Splitting:** Dynamic imports para Framer Motion
5. **ISR:** Revalidación cada hora para páginas estáticas

## 📝 Próximos Pasos (Roadmap)

### Fase 1: MVP (Actual) ✅
- [x] Homepage con hero cinematográfico
- [x] Catálogo de tours con filtros
- [x] Detalle de tour completo
- [x] Panel de administración básico
- [x] Integración WhatsApp
- [x] Seed con 5 tours de ejemplo

### Fase 2: Mejoras (Pendiente)
- [ ] Formulario completo de creación/edición de tours en admin
- [ ] Upload real a Cloudinary con preview
- [ ] Sistema de bookings con almacenamiento en DB
- [ ] Exportación de bookings a CSV/Excel
- [ ] Gestión de categorías desde admin
- [ ] Editor WYSIWYG para descripciones
- [ ] Gestión de hoteles (CRUD completo)

### Fase 3: Avanzado (Futuro)
- [ ] Internacionalización (i18n) - Inglés
- [ ] Sistema de reviews/testimoniales
- [ ] Integración de pagos (Stripe/PayPal)
- [ ] Calendario de disponibilidad
- [ ] Email notifications (SendGrid/Resend)
- [ ] Rate limiting y seguridad avanzada
- [ ] Analytics dashboard (Google Analytics 4)

## 🤝 Contribución

Este es un proyecto privado, pero si necesitas hacer cambios:

1. Crea un branch: `git checkout -b feature/nueva-funcionalidad`
2. Commit cambios: `git commit -m "Descripción del cambio"`
3. Push al branch: `git push origin feature/nueva-funcionalidad`
4. Abre un Pull Request

## 📄 Licencia

Proyecto privado - Todos los derechos reservados © 2025 KaelTours

## 📞 Soporte

Para dudas o soporte:
- Email: admin@kaeltours.com
- WhatsApp: +52 123 456 7890

---

**Desarrollado con ❤️ por el equipo de KaelTours**
* **Animaciones:** **Framer Motion** (Indispensable para transiciones de página y scroll reveals).
* **Base de Datos:** MySQL (Alojada en Hostinger).
* **ORM:** Prisma.
* **Media Assets:** Cloudinary (Para optimización automática de videos e imágenes).
* **Auth:** NextAuth.js.

## 2. Experiencia Visual y Motion Design (Requisito Crítico)
El diseño debe ser de alto impacto. Instrucciones específicas:
1.  **Hero Section Cinematográfico:**
    * Implementa un componente de **Video Background** a pantalla completa (loop, muted, auto-play) que cargue rápido.
    * Overlay degradado sutil para asegurar que el texto y el buscador sean legibles sobre el video.
2.  **Animaciones al Scroll (Scroll Reveal):**
    * Los elementos (tarjetas de tours, textos) no deben estar estáticos; deben aparecer suavemente (Fade Up) a medida que el usuario baja (usa `framer-motion` con `whileInView`).
3.  **Micro-interacciones:**
    * **Hover Effects:** Las tarjetas de tours deben tener un efecto "Zoom in" suave en la imagen y elevación (shadow) al pasar el mouse.
    * **Botones:** Efectos de pulsación o cambio de color fluido al interactuar.
4.  **Galerías Modernas:** Implementa un carrusel o grid tipo "Masonry" para las fotos de los hoteles que sea interactivo.

## 3. Estructura de Base de Datos (MySQL)
Ya tengo la base de datos creada en Hostinger.
* **Nombre BD:** `u181039611_kaeltours`
* **Usuario:** `u181039611_kaeltours`
* **Host:** `localhost` (o IP del servidor).
* **Password:** *[Se usará vía variable de entorno]*

**Tarea:** Genera el `schema.prisma` considerando:
* Tablas: `User` (Admin), `Tour`, `Hotel`, `Booking`.
* Campos multimedia: Asegúrate de que las tablas soporten arrays de strings para guardar múltiples URLs de fotos/videos de Cloudinary.

## 4. Funcionalidades de Negocio

### A. Usuario Público
1.  **Buscador Inteligente:** Sobre el video del Hero, un buscador de (Destino / Fecha / Tipo).
2.  **Reserva vía WhatsApp:**
    * Botón "Solicitar Reserva" que abra la API de WhatsApp con el mensaje: *"Hola KaelTours, vi el video del destino [Nombre] y quiero reservar para..."*
3.  **Secciones:** "Destinos de Película", "Escapadas de Lujo", "Ofertas Flash".

### B. Panel de Administración (CMS)
1.  **Gestor de Multimedia:**
    * Al crear un tour, debo poder subir no solo fotos, sino también un link a un video promocional (Youtube/Vimeo o Cloudinary).

## 5. Entregables Solicitados
Actúa como experto y entrégame:

1.  **Configuración (.env):** Plantilla para conectar MySQL, NextAuth y Cloudinary.
2.  **Schema Prisma:** Definición completa de tablas.
3.  **Componentes UI de Alto Impacto:**
    * `HeroVideo`: Código optimizado para el video de fondo.
    * `AnimatedCard`: Tarjeta de tour con efectos Framer Motion.
    * `Navbar`: Con efecto "Glassmorphism" (vidrio esmerilado).
4.  **Páginas:** Estructura del `page.tsx` integrando estas animaciones.
5.  **Instrucciones de Despliegue:** Guía para subir a Hostinger.

¡Sorpréndeme! Quiero que el código refleje un sitio web premiun.