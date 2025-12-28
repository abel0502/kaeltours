'use client';

import { TourCard } from '@/components/tours/TourCard';
import { motion } from 'framer-motion';

interface FeaturedToursProps {
  tours: any[];
}

export function FeaturedTours({ tours }: FeaturedToursProps) {
  if (tours.length === 0) {
    return null;
  }

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <section className="py-20 px-4 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Destinos Destacados
          </h2>
          <p className="text-xl text-gray-600">
            Los tours más populares seleccionados especialmente para ti
          </p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {tours.map((tour) => (
            <motion.div key={tour.id} variants={item}>
              <TourCard tour={tour} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
