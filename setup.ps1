# KaelTours - Setup PowerShell Script
# Ejecutar: .\setup.ps1

Write-Host "🌍 KaelTours - Setup Inicial" -ForegroundColor Cyan
Write-Host "==============================" -ForegroundColor Cyan
Write-Host ""

# Verificar Node.js
try {
    $nodeVersion = node -v
    Write-Host "✅ Node.js $nodeVersion detectado" -ForegroundColor Green
} catch {
    Write-Host "❌ Node.js no está instalado. Por favor instala Node.js 18+ primero." -ForegroundColor Red
    exit 1
}

# Verificar si .env existe
if (-not (Test-Path .env)) {
    Write-Host "⚠️  Archivo .env no encontrado" -ForegroundColor Yellow
    Write-Host "📝 Copiando .env.example a .env..." -ForegroundColor Yellow
    Copy-Item .env.example .env
    Write-Host "✅ .env creado. Por favor edita el archivo con tus credenciales." -ForegroundColor Green
    Write-Host ""
    Write-Host "Variables requeridas:"
    Write-Host "  - DATABASE_URL (MySQL Hostinger)"
    Write-Host "  - NEXTAUTH_SECRET (genera con: openssl rand -base64 32)"
    Write-Host "  - CLOUDINARY_* (credenciales de Cloudinary)"
    Write-Host "  - NEXT_PUBLIC_WHATSAPP_NUMBER"
    Write-Host ""
    Read-Host "Presiona Enter cuando hayas configurado .env"
}

Write-Host ""
Write-Host "📦 Instalando dependencias..." -ForegroundColor Cyan
npm install

Write-Host ""
Write-Host "🔑 Generando Prisma Client..." -ForegroundColor Cyan
npx prisma generate

Write-Host ""
$crearTablas = Read-Host "🗄️  ¿Quieres crear las tablas en la base de datos ahora? (y/n)"

if ($crearTablas -eq "y") {
    Write-Host "📊 Creando tablas..." -ForegroundColor Cyan
    npx prisma migrate dev --name init
    
    Write-Host ""
    $ejecutarSeed = Read-Host "🌱 ¿Quieres poblar la base de datos con datos de ejemplo? (y/n)"
    
    if ($ejecutarSeed -eq "y") {
        Write-Host "🌱 Ejecutando seed..." -ForegroundColor Cyan
        npm run seed
    }
}

Write-Host ""
Write-Host "✨ Setup completado!" -ForegroundColor Green
Write-Host ""
Write-Host "📝 Próximos pasos:"
Write-Host "  1. Agregar video hero en public/videos/hero.mp4"
Write-Host "  2. Ejecutar: npm run dev"
Write-Host "  3. Abrir: http://localhost:3000"
Write-Host "  4. Login admin: admin@kaeltours.com / Admin123!"
Write-Host ""
Write-Host "🚀 ¡Listo para desarrollar!" -ForegroundColor Cyan
