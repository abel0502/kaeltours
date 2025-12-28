import { prisma } from '@/lib/prisma';
import Link from 'next/link';

export async function CategoryGrid() {
  const categories = await prisma.category.findMany({
    include: {
      _count: {
        select: { tours: true },
      },
    },
  });

  if (categories.length === 0) {
    return null;
  }

  return (
    <section className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-12">
          Explora por Categoría
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={`/tours?category=${category.slug}`}
              className="group relative overflow-hidden rounded-2xl aspect-square bg-gradient-to-br from-primary-500 to-primary-700 p-6 flex flex-col justify-end hover:scale-105 transition-transform"
            >
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors" />
              <div className="relative z-10">
                <h3 className="text-2xl font-bold text-white mb-1">
                  {category.name}
                </h3>
                <p className="text-white/80 text-sm">
                  {category._count.tours} tours
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
