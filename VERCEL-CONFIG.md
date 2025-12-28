# Configuración de Variables de Entorno en Vercel

## ⚠️ IMPORTANTE: Sin estas variables, el admin NO funcionará en producción

Ve a tu proyecto en Vercel: https://vercel.com/koves-projects/kaeltours

## Paso 1: Ir a Settings → Environment Variables

## Paso 2: Agregar TODAS estas variables:

### 1. DATABASE_URL
```
mysql://u181039611_kaeltours:Soldier258456%40%40%2A@srv766.hstgr.io:3306/u181039611_kaeltours?connection_limit=5&pool_timeout=10&connect_timeout=30
```
**Importante:** Marca como disponible en Production, Preview y Development

### 2. NEXTAUTH_URL
```
https://kaeltours-ikidpaaq5-koves-projects.vercel.app
```
O tu dominio personalizado cuando lo configures

### 3. NEXTAUTH_SECRET
```
aTFzckNORFBZTzJvUndnN3FNdkIwdFRKcG1uSTVMRVg=
```
**CRÍTICO:** Sin esto, NextAuth NO funcionará

### 4. NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
```
dfl7iz6wd
```

### 5. CLOUDINARY_API_KEY
```
929683418273157
```

### 6. CLOUDINARY_API_SECRET
```
7jezOHYXlnM-ZXqE6XDIX9tOPxU
```

### 7. NEXT_PUBLIC_WHATSAPP_NUMBER
```
8296046146
```

## Paso 3: Redeploy

Después de agregar las variables:
1. Ve a la pestaña "Deployments"
2. Click en el último deployment (el de arriba)
3. Click en los tres puntos (...)
4. Click en "Redeploy"
5. Marca "Use existing Build Cache"
6. Click en "Redeploy"

## Paso 4: Ejecutar Seed en Producción (Solo primera vez)

Una vez que el redeploy termine, ejecuta en tu terminal local:

```bash
# Configurar DATABASE_URL temporal para producción
$env:DATABASE_URL="mysql://u181039611_kaeltours:Soldier258456%40%40%2A@srv766.hstgr.io:3306/u181039611_kaeltours?connection_limit=5&pool_timeout=10&connect_timeout=30"

# Ejecutar seed
npm run seed

# Restaurar variable local
$env:DATABASE_URL=""
```

## Paso 5: Probar el Login

1. Ve a: https://kaeltours-ikidpaaq5-koves-projects.vercel.app/login
2. Usa estas credenciales:
   - **Email:** admin@kaeltours.com
   - **Password:** Admin123!

3. Deberías ser redirigido a: `/admin/dashboard`

## 🔧 Troubleshooting

### Error: "Configuration invalid"
- Verifica que NEXTAUTH_SECRET esté configurado
- Verifica que NEXTAUTH_URL sea la URL correcta (sin trailing slash)

### Error: "Can't reach database"
- Verifica que DATABASE_URL esté correcta
- Verifica que Hostinger tenga Remote MySQL habilitado
- Verifica que el host permitido sea `%` (cualquier IP)

### Error 404 en /login
- Fuerza un redeploy
- Verifica que el build completó correctamente

### Login no funciona (credenciales correctas)
- Verifica que el seed se ejecutó
- Verifica NEXTAUTH_SECRET
- Revisa los logs en Vercel > tu proyecto > Logs

## 📊 Verificar que todo funciona

1. Health Check: `https://tu-url.vercel.app/api/health`
   - Debería mostrar: `{"status":"ok","database":"connected",...}`

2. Login: `https://tu-url.vercel.app/login`
   - Debería cargar sin errores

3. Dashboard: `https://tu-url.vercel.app/admin/dashboard`
   - Debería redirigir a /login si no estás autenticado
