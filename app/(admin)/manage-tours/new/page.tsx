import { prisma } from '@/lib/prisma';
import { TourForm } from '@/components/admin/TourForm';

export default async function NewTourPage() {
  const categories = await prisma.category.findMany({
    orderBy: { name: 'asc' },
  });

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Crear Nuevo Tour</h1>
      <TourForm categories={categories} />
    </div>
  );
}
