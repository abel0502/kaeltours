import { HeroSection } from '@/components/home/HeroSection';
import { FeaturedTours } from '@/components/home/FeaturedTours';
import { CategoryGrid } from '@/components/home/CategoryGrid';
import { CTASection } from '@/components/home/CTASection';

export const revalidate = 3600; // ISR: Revalidar cada hora

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <FeaturedTours />
      <CategoryGrid />
      <CTASection />
    </>
  );
}
