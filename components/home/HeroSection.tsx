'use client';

import { useMediaQuery } from '@/hooks/useMediaQuery';
import Image from 'next/image';

export function HeroSection() {
  const isDesktop = useMediaQuery('(min-width: 1024px)');

  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Video para Desktop */}
      {isDesktop ? (
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          poster="/videos/hero-poster.jpg"
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/videos/hero.mp4" type="video/mp4" />
        </video>
      ) : (
        /* Imagen estática para Móvil */
        <Image
          src="/videos/hero-poster.jpg"
          alt="KaelTours"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
      )}

      {/* Overlay oscuro para legibilidad */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />

      {/* Contenido */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4">
        <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 animate-fade-up">
          Vive Experiencias Inolvidables
        </h1>
        <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-2xl">
          Descubre destinos únicos con la mejor calidad y servicio premium
        </p>
        
        {/* SearchBar */}
        <div className="w-full max-w-4xl bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <input
              type="text"
              placeholder="¿A dónde quieres ir?"
              className="px-4 py-3 rounded-lg bg-white/90 text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
            <input
              type="date"
              className="px-4 py-3 rounded-lg bg-white/90 text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
            <button className="px-6 py-3 bg-primary-600 text-white rounded-lg font-semibold hover:bg-primary-700 transition-all">
              Buscar Tours
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
