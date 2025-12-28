#!/bin/bash

# Script para setup inicial de KaelTours
# Ejecutar: bash setup.sh

echo "🌍 KaelTours - Setup Inicial"
echo "=============================="
echo ""

# Verificar Node.js
if ! command -v node &> /dev/null; then
    echo "❌ Node.js no está instalado. Por favor instala Node.js 18+ primero."
    exit 1
fi

echo "✅ Node.js $(node -v) detectado"

# Verificar si .env existe
if [ ! -f .env ]; then
    echo "⚠️  Archivo .env no encontrado"
    echo "📝 Copiando .env.example a .env..."
    cp .env.example .env
    echo "✅ .env creado. Por favor edita el archivo con tus credenciales."
    echo ""
    echo "Variables requeridas:"
    echo "  - DATABASE_URL (MySQL Hostinger)"
    echo "  - NEXTAUTH_SECRET (genera con: openssl rand -base64 32)"
    echo "  - CLOUDINARY_* (credenciales de Cloudinary)"
    echo "  - NEXT_PUBLIC_WHATSAPP_NUMBER"
    echo ""
    read -p "Presiona Enter cuando hayas configurado .env..."
fi

echo ""
echo "📦 Instalando dependencias..."
npm install

echo ""
echo "🔑 Generando Prisma Client..."
npx prisma generate

echo ""
echo "🗄️  ¿Quieres crear las tablas en la base de datos ahora? (y/n)"
read -p "> " crear_tablas

if [ "$crear_tablas" = "y" ]; then
    echo "📊 Creando tablas..."
    npx prisma migrate dev --name init
    
    echo ""
    echo "🌱 ¿Quieres poblar la base de datos con datos de ejemplo? (y/n)"
    read -p "> " ejecutar_seed
    
    if [ "$ejecutar_seed" = "y" ]; then
        echo "🌱 Ejecutando seed..."
        npm run seed
    fi
fi

echo ""
echo "✨ Setup completado!"
echo ""
echo "📝 Próximos pasos:"
echo "  1. Agregar video hero en public/videos/hero.mp4"
echo "  2. Ejecutar: npm run dev"
echo "  3. Abrir: http://localhost:3000"
echo "  4. Login admin: admin@kaeltours.com / Admin123!"
echo ""
echo "🚀 ¡Listo para desarrollar!"
