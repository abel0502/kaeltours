'use client';

import Image from 'next/image';
import Link from 'next/link';
import { formatPrice } from '@/lib/utils';
import { motion } from 'framer-motion';
import { Calendar, Users } from 'lucide-react';

interface TourCardProps {
  tour: {
    id: string;
    slug: string;
    title: string;
    destination: string;
    price: any;
    currency: string;
    heroImage: string | null;
    duration: number;
    maxGuests: number;
    featured: boolean;
    category: {
      name: string;
    };
  };
}

export function TourCard({ tour }: TourCardProps) {
  const imageUrl =
    tour.heroImage ||
    `https://source.unsplash.com/800x600/?${tour.destination},travel`;

  return (
    <motion.div
      whileHover={{ scale: 1.03, y: -8 }}
      transition={{ duration: 0.3 }}
      className="group relative"
    >
      <Link href={`/tours/${tour.slug}`} className="block">
        <div className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-shadow">
          {/* Imagen */}
          <div className="relative aspect-[4/3] overflow-hidden">
            <Image
              src={imageUrl}
              alt={tour.title}
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-500"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            
            {/* Badge Featured */}
            {tour.featured && (
              <div className="absolute top-4 right-4 bg-yellow-400 text-gray-900 px-3 py-1 rounded-full text-sm font-semibold">
                ⭐ Destacado
              </div>
            )}

            {/* Categoría */}
            <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium">
              {tour.category.name}
            </div>
          </div>

          {/* Contenido */}
          <div className="p-5">
            <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-primary-600 transition-colors">
              {tour.title}
            </h3>
            
            <p className="text-gray-600 mb-4">📍 {tour.destination}</p>

            <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                <span>{tour.duration} días</span>
              </div>
              <div className="flex items-center gap-1">
                <Users className="w-4 h-4" />
                <span>Hasta {tour.maxGuests}</span>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Desde</p>
                <p className="text-2xl font-bold text-primary-600">
                  {formatPrice(Number(tour.price), tour.currency)}
                </p>
              </div>
              <button className="px-4 py-2 bg-primary-600 text-white rounded-lg font-medium hover:bg-primary-700 transition-colors">
                Ver Detalles
              </button>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
