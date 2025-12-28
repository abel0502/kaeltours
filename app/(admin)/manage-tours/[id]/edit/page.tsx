import { prisma } from '@/lib/prisma';
import { TourForm } from '@/components/admin/TourForm';
import { notFound } from 'next/navigation';

export default async function EditTourPage({ params }: { params: { id: string } }) {
  const tour = await prisma.tour.findUnique({
    where: { id: params.id },
  });

  if (!tour) {
    notFound();
  }

  const categories = await prisma.category.findMany({
    orderBy: { name: 'asc' },
  });

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Editar Tour</h1>
      <TourForm tour={tour} categories={categories} />
    </div>
  );
}
