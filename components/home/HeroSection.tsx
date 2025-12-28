'use client';

import { useMediaQuery } from '@/hooks/useMediaQuery';
import { motion } from 'framer-motion';
import Image from 'next/image';

export function HeroSection() {
  const isDesktop = useMediaQuery('(min-width: 1024px)');

  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Background Image/Video */}
      {isDesktop ? (
        /* Imagen de fondo para simular video hasta que se agregue uno real */
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=1920&h=1080&fit=crop&q=80"
            alt="KaelTours - Experiencias Inolvidables"
            fill
            priority
            className="object-cover animate-ken-burns"
            sizes="100vw"
          />
        </div>
      ) : (
        /* Imagen estática para Móvil */
        <Image
          src="https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=1200&h=1600&fit=crop&q=80"
          alt="KaelTours"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
      )}

      {/* Overlay oscuro con gradiente animado */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent animate-pulse-slow" />

      {/* Contenido con animaciones */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-5xl md:text-7xl font-bold text-white mb-6"
        >
          Vive Experiencias Inolvidables
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-xl md:text-2xl text-white/90 mb-8 max-w-2xl"
        >
          Descubre destinos únicos con la mejor calidad y servicio premium
        </motion.p>
        
        {/* SearchBar con animación */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="w-full max-w-4xl bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20 shadow-2xl"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <input
              type="text"
              placeholder="¿A dónde quieres ir?"
              className="px-4 py-3 rounded-lg bg-white/95 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all"
            />
            <input
              type="date"
              className="px-4 py-3 rounded-lg bg-white/95 text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all"
            />
            <button className="px-6 py-3 bg-gradient-to-r from-primary-600 to-primary-700 text-white rounded-lg font-semibold hover:from-primary-700 hover:to-primary-800 transition-all shadow-lg hover:shadow-xl transform hover:scale-105">
              Buscar Tours
            </button>
          </div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-1.5 h-1.5 bg-white rounded-full mt-2"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
