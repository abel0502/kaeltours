# 🎬 Guía Rápida - Obtener Video Hero

## Opción 1: Stock Gratuito (Recomendado)

### Pexels Videos (Gratis, sin registro)
1. Ir a: https://www.pexels.com/videos/
2. Buscar: "travel destination beach" o "tropical paradise"
3. Filtrar por: "Landscape" orientation
4. Descargar en calidad HD (1920x1080)
5. Guardar como: `public/videos/hero-raw.mp4`

### Comprimir con FFmpeg

```bash
# Windows (PowerShell)
ffmpeg -i public/videos/hero-raw.mp4 -vf scale=1920:1080 -c:v libx264 -preset slow -crf 28 -c:a aac -b:a 128k -movflags +faststart public/videos/hero.mp4

# Extraer poster frame
ffmpeg -i public/videos/hero.mp4 -ss 00:00:01 -vframes 1 public/videos/hero-poster.jpg
```

### Instalar FFmpeg (Windows)
- Descargar desde: https://ffmpeg.org/download.html
- O con Chocolatey: `choco install ffmpeg`
- O con Scoop: `scoop install ffmpeg`

## Opción 2: Usar Imagen Estática Temporal

Si no tienes video ahora, usa una imagen de alta calidad:

1. Descargar de Unsplash: https://unsplash.com/s/photos/travel-destination
2. Guardar como: `public/videos/hero-poster.jpg`
3. El componente usará solo la imagen en todos los dispositivos

## Opción 3: Videos Recomendados de Pexels

Videos específicos que funcionan bien para KaelTours:

- **Playa tropical**: https://www.pexels.com/video/aerial-view-of-beautiful-resort-3571264/
- **Destino exótico**: https://www.pexels.com/video/drone-footage-of-a-resort-3249913/
- **Aventura**: https://www.pexels.com/video/man-riding-a-boat-in-the-middle-of-the-ocean-2659659/

## Especificaciones Técnicas

- **Resolución:** 1920x1080 (Full HD)
- **Formato:** MP4 (H.264)
- **Duración:** 10-30 segundos (loop)
- **Peso target:** <5MB después de compresión
- **FPS:** 30fps
- **Orientación:** Landscape

## Notas
- El video se reproduce solo en desktop (>1024px)
- En móvil se muestra solo la imagen poster
- Sin audio (muted)
- Loop infinito
