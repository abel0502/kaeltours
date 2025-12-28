import { HeroSection } from '@/components/home/HeroSection';
import { FeaturedTours } from '@/components/home/FeaturedTours';
import { CategoryGrid } from '@/components/home/CategoryGrid';

export const revalidate = 3600; // ISR: Revalidar cada hora

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <FeaturedTours />
      <CategoryGrid />
      
      {/* CTA Section */}
      <section className="py-20 px-4 bg-primary-600">
        <div className="max-w-4xl mx-auto text-center text-white">
          <h2 className="text-4xl font-bold mb-6">
            ¿Listo para tu próxima aventura?
          </h2>
          <p className="text-xl mb-8">
            Contacta con nuestros expertos para diseñar el viaje perfecto
          </p>
          <button className="px-8 py-4 bg-white text-primary-600 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors">
            Consultar Ahora
          </button>
        </div>
      </section>
    </>
  );
}
