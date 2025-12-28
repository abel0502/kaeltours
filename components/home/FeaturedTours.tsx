import { TourCard } from '@/components/tours/TourCard';
import { prisma } from '@/lib/prisma';

export async function FeaturedTours() {
  const tours = await prisma.tour.findMany({
    where: {
      featured: true,
      published: true,
    },
    include: {
      category: true,
    },
    take: 6,
    orderBy: {
      createdAt: 'desc',
    },
  });

  if (tours.length === 0) {
    return null;
  }

  return (
    <section className="py-20 px-4 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Destinos Destacados
          </h2>
          <p className="text-xl text-gray-600">
            Los tours más populares seleccionados especialmente para ti
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {tours.map((tour) => (
            <TourCard key={tour.id} tour={tour} />
          ))}
        </div>
      </div>
    </section>
  );
}
