import { prisma } from '@/lib/prisma';
import { TourCard } from '@/components/tours/TourCard';
import { TourFilters } from '@/components/tours/TourFilters';

interface ToursPageProps {
  searchParams: {
    category?: string;
    destination?: string;
    minPrice?: string;
    maxPrice?: string;
  };
}

export default async function ToursPage({ searchParams }: ToursPageProps) {
  const categories = await prisma.category.findMany();

  const where: any = {
    published: true,
  };

  if (searchParams.category) {
    const category = await prisma.category.findUnique({
      where: { slug: searchParams.category },
    });
    if (category) {
      where.categoryId = category.id;
    }
  }

  if (searchParams.destination) {
    where.destination = {
      contains: searchParams.destination,
    };
  }

  if (searchParams.minPrice || searchParams.maxPrice) {
    where.price = {};
    if (searchParams.minPrice) {
      where.price.gte = parseFloat(searchParams.minPrice);
    }
    if (searchParams.maxPrice) {
      where.price.lte = parseFloat(searchParams.maxPrice);
    }
  }

  const tours = await prisma.tour.findMany({
    where,
    include: {
      category: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-4xl font-bold mb-8">Nuestros Tours</h1>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar con filtros */}
          <aside className="lg:col-span-1">
            <TourFilters categories={categories} />
          </aside>

          {/* Grid de tours */}
          <main className="lg:col-span-3">
            {tours.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-xl text-gray-600">
                  No se encontraron tours con los filtros seleccionados.
                </p>
              </div>
            ) : (
              <>
                <p className="text-gray-600 mb-6">
                  {tours.length} {tours.length === 1 ? 'tour encontrado' : 'tours encontrados'}
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {tours.map((tour) => (
                    <TourCard key={tour.id} tour={tour} />
                  ))}
                </div>
              </>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
