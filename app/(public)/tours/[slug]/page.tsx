import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { TourGallery } from '@/components/tours/TourGallery';
import { VideoEmbed } from '@/components/shared/VideoEmbed';
import { formatPrice } from '@/lib/utils';
import { Calendar, Users, MapPin, Check, X } from 'lucide-react';
import type { Metadata } from 'next';

interface TourDetailPageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  const tours = await prisma.tour.findMany({
    where: { published: true },
    select: { slug: true },
  });

  return tours.map((tour) => ({
    slug: tour.slug,
  }));
}

export async function generateMetadata({ params }: TourDetailPageProps): Promise<Metadata> {
  const tour = await prisma.tour.findUnique({
    where: { slug: params.slug },
  });

  if (!tour) {
    return {
      title: 'Tour no encontrado',
    };
  }

  return {
    title: tour.seoTitle || `${tour.title} - KaelTours`,
    description: tour.seoDescription || tour.description.substring(0, 160),
    keywords: tour.seoKeywords || undefined,
  };
}

export default async function TourDetailPage({ params }: TourDetailPageProps) {
  const tour = await prisma.tour.findUnique({
    where: { slug: params.slug },
    include: {
      category: true,
    },
  });

  if (!tour || !tour.published) {
    notFound();
  }

  // Incrementar viewCount
  prisma.tour.update({
    where: { id: tour.id },
    data: { viewCount: { increment: 1 } },
  }).catch(() => {});

  const gallery = Array.isArray(tour.gallery) ? tour.gallery : [];
  const highlights = Array.isArray(tour.highlights) ? tour.highlights : [];
  const included = Array.isArray(tour.included) ? tour.included : [];
  const notIncluded = Array.isArray(tour.notIncluded) ? tour.notIncluded : [];

  return (
    <div className="min-h-screen bg-white pt-20">
      {/* Hero Image */}
      <div className="relative h-96 w-full">
        <Image
          src={tour.heroImage || `https://source.unsplash.com/1920x1080/?${tour.destination},travel`}
          alt={tour.title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-8">
          <div className="max-w-7xl mx-auto">
            <span className="inline-block px-3 py-1 bg-primary-600 text-white rounded-full text-sm mb-3">
              {tour.category.name}
            </span>
            <h1 className="text-5xl font-bold text-white mb-2">{tour.title}</h1>
            <p className="text-white/90 flex items-center gap-2">
              <MapPin className="w-5 h-5" />
              {tour.destination}
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Video */}
            {tour.videoYoutubeId && (
              <div>
                <h2 className="text-2xl font-bold mb-4">Video del Tour</h2>
                <VideoEmbed youtubeId={tour.videoYoutubeId} />
              </div>
            )}

            {/* Descripción */}
            <div>
              <h2 className="text-2xl font-bold mb-4">Descripción</h2>
              <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                {tour.description}
              </p>
            </div>

            {/* Highlights */}
            {highlights.length > 0 && (
              <div>
                <h2 className="text-2xl font-bold mb-4">Puntos Destacados</h2>
                <ul className="space-y-2">
                  {highlights.map((highlight, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-primary-600 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{String(highlight)}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Qué Incluye / No Incluye */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {included.length > 0 && (
                <div>
                  <h3 className="text-xl font-bold mb-3 text-green-600">Qué Incluye</h3>
                  <ul className="space-y-2">
                    {included.map((item, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-green-600 mt-0.5" />
                        <span className="text-sm text-gray-700">{String(item)}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {notIncluded.length > 0 && (
                <div>
                  <h3 className="text-xl font-bold mb-3 text-red-600">No Incluye</h3>
                  <ul className="space-y-2">
                    {notIncluded.map((item, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <X className="w-4 h-4 text-red-600 mt-0.5" />
                        <span className="text-sm text-gray-700">{String(item)}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Galería */}
            {gallery.length > 0 && (
              <div>
                <h2 className="text-2xl font-bold mb-4">Galería</h2>
                <TourGallery images={gallery} title={tour.title} />
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 bg-white border border-gray-200 rounded-lg p-6 shadow-lg">
              <div className="mb-6">
                <p className="text-sm text-gray-600 mb-1">Desde</p>
                <p className="text-4xl font-bold text-primary-600">
                  {formatPrice(Number(tour.price), tour.currency)}
                </p>
                <p className="text-sm text-gray-500">por persona</p>
              </div>

              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-3 text-gray-700">
                  <Calendar className="w-5 h-5" />
                  <span>{tour.duration} días</span>
                </div>
                <div className="flex items-center gap-3 text-gray-700">
                  <Users className="w-5 h-5" />
                  <span>Hasta {tour.maxGuests} personas</span>
                </div>
              </div>

              <button className="w-full py-3 bg-primary-600 text-white rounded-lg font-semibold hover:bg-primary-700 transition-colors mb-3">
                Consultar Disponibilidad
              </button>

              <button className="w-full py-3 border border-primary-600 text-primary-600 rounded-lg font-semibold hover:bg-primary-50 transition-colors">
                Solicitar Información
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
