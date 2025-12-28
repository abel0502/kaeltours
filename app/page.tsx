import { HeroSection } from '@/components/home/HeroSection';
import { FeaturedTours } from '@/components/home/FeaturedTours';
import { CategoryGrid } from '@/components/home/CategoryGrid';
import { CTASection } from '@/components/home/CTASection';
import { prisma } from '@/lib/prisma';

export const revalidate = 3600; // ISR: Revalidar cada hora

export default async function HomePage() {
  const [tours, categories] = await Promise.all([
    prisma.tour.findMany({
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
    }),
    prisma.category.findMany({
      include: {
        _count: {
          select: { tours: true },
        },
      },
    }),
  ]);

  return (
    <>
      <HeroSection />
      <FeaturedTours tours={tours} />
      <CategoryGrid categories={categories} />
      <CTASection />
    </>
  );
}
