import { PrismaClient } from '@prisma/client';
import { hashPassword } from '../lib/auth-utils';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Iniciando seed...');

  // Crear usuario admin
  const adminPassword = await hashPassword('Admin123!');
  const admin = await prisma.user.upsert({
    where: { email: 'admin@kaeltours.com' },
    update: {},
    create: {
      email: 'admin@kaeltours.com',
      name: 'Administrador',
      passwordHash: adminPassword,
      role: 'ADMIN',
    },
  });
  console.log('✅ Usuario admin creado:', admin.email);

  // Crear categorías
  const categories = await Promise.all([
    prisma.category.upsert({
      where: { slug: 'aventura' },
      update: {},
      create: {
        name: 'Aventura',
        slug: 'aventura',
        description: 'Tours llenos de adrenalina y emoción',
        icon: '🏔️',
      },
    }),
    prisma.category.upsert({
      where: { slug: 'romance' },
      update: {},
      create: {
        name: 'Romance',
        slug: 'romance',
        description: 'Escapadas perfectas para parejas',
        icon: '💑',
      },
    }),
    prisma.category.upsert({
      where: { slug: 'familia' },
      update: {},
      create: {
        name: 'Familia',
        slug: 'familia',
        description: 'Diversión para toda la familia',
        icon: '👨‍👩‍👧‍👦',
      },
    }),
    prisma.category.upsert({
      where: { slug: 'lujo' },
      update: {},
      create: {
        name: 'Lujo',
        slug: 'lujo',
        description: 'Experiencias premium y exclusivas',
        icon: '✨',
      },
    }),
    prisma.category.upsert({
      where: { slug: 'cultural' },
      update: {},
      create: {
        name: 'Cultural',
        slug: 'cultural',
        description: 'Descubre historia y tradiciones',
        icon: '🏛️',
      },
    }),
  ]);
  console.log('✅ Categorías creadas:', categories.length);

  // Crear tours de ejemplo
  const tours = [
    {
      title: 'Aventura en Cancún - Caribe Mexicano',
      slug: 'aventura-cancun-caribe-mexicano',
      description: `Descubre la belleza del Caribe mexicano en este tour de 4 días lleno de aventura y diversión. Explora las cristalinas aguas de Cancún, nada en cenotes místicos y conoce la cultura maya en sus ruinas más impresionantes.

Este tour incluye actividades como snorkel en los arrecifes más hermosos, visita a la zona arqueológica de Tulum, y una experiencia única en los cenotes de la Riviera Maya. Perfecto para los amantes de la naturaleza y la aventura.`,
      destination: 'Cancún, México',
      categoryId: categories[0].id,
      price: 1299.99,
      duration: 4,
      maxGuests: 12,
      heroImage: 'https://images.unsplash.com/photo-1602002418082-a4443e081dd1?w=1200&q=80',
      gallery: [
        'https://images.unsplash.com/photo-1569923411655-256f566ba2a9?w=1200&q=80',
        'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=1200&q=80',
        'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&q=80',
        'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=1200&q=80',
      ],
      videoYoutubeId: 'dQw4w9WgXcQ',
      highlights: [
        'Snorkel en arrecifes de coral',
        'Visita a cenotes mayas',
        'Tour por ruinas de Tulum',
        'Comida típica yucateca incluida',
        'Transporte en vehículo con A/C',
      ],
      included: [
        'Hospedaje 3 noches en hotel 4 estrellas',
        'Desayunos buffet',
        'Todas las entradas a parques y cenotes',
        'Guía certificado en español e inglés',
        'Equipo de snorkel',
      ],
      notIncluded: [
        'Vuelos internacionales',
        'Comidas no especificadas',
        'Propinas',
        'Gastos personales',
      ],
      featured: true,
      published: true,
      seoTitle: 'Tour Aventura en Cancún 4 Días | KaelTours',
      seoDescription: 'Explora Cancún con nuestro tour de aventura de 4 días. Snorkel, cenotes, ruinas mayas y más. ¡Reserva ahora!',
    },
    {
      title: 'Romance en París - Ciudad del Amor',
      slug: 'romance-paris-ciudad-del-amor',
      description: `Vive una experiencia romántica inolvidable en la ciudad de la luz. Este tour de 5 días está diseñado para parejas que buscan celebrar su amor en uno de los destinos más románticos del mundo.

Pasea por las calles parisinas, disfruta de cenas románticas con vista a la Torre Eiffel, recorre el Louvre tomados de la mano y navega por el Sena al atardecer. Cada momento está pensado para crear recuerdos eternos.`,
      destination: 'París, Francia',
      categoryId: categories[1].id,
      price: 2899.99,
      duration: 5,
      maxGuests: 8,
      heroImage: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=1200&q=80',
      gallery: [
        'https://images.unsplash.com/photo-1511739001486-6bfe10ce785f?w=1200&q=80',
        'https://images.unsplash.com/photo-1500835556837-99ac94a94552?w=1200&q=80',
        'https://images.unsplash.com/photo-1550340499-a6c60fc8287c?w=1200&q=80',
      ],
      videoYoutubeId: '',
      highlights: [
        'Cena romántica en la Torre Eiffel',
        'Crucero por el río Sena',
        'Visita al Museo del Louvre',
        'Paseo por Montmartre',
        'Fotógrafo profesional incluido',
      ],
      included: [
        'Hotel boutique 4 noches',
        'Desayunos continentales',
        'Cena romántica especial',
        'Tickets sin fila para museos',
        'Traslados aeropuerto-hotel-aeropuerto',
      ],
      notIncluded: [
        'Vuelos internacionales',
        'Comidas no mencionadas',
        'Bebidas alcohólicas',
        'Seguro de viaje',
      ],
      featured: true,
      published: true,
      seoTitle: 'Viaje Romántico a París 5 Días | Paquetes para Parejas',
      seoDescription: 'Escapada romántica a París. Tour de 5 días con cena en Torre Eiffel, crucero y visitas guiadas. Perfecto para parejas.',
    },
    {
      title: 'Descubre Tokio - Tradición y Modernidad',
      slug: 'descubre-tokio-tradicion-modernidad',
      description: `Sumérgete en la fascinante cultura japonesa con este tour de 6 días por Tokio. Experimenta la perfecta fusión entre tradición milenaria y tecnología de vanguardia que caracteriza a la capital japonesa.

Desde los templos ancestrales de Asakusa hasta los rascacielos futuristas de Shibuya, este tour te llevará por los rincones más emblemáticos de Tokio, incluyendo experiencias culinarias únicas y la oportunidad de presenciar la ceremonia del té tradicional.`,
      destination: 'Tokio, Japón',
      categoryId: categories[4].id,
      price: 3499.99,
      duration: 6,
      maxGuests: 10,
      heroImage: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=1200&q=80',
      gallery: [
        'https://images.unsplash.com/photo-1492571350019-22de08371fd3?w=1200&q=80',
        'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?w=1200&q=80',
        'https://images.unsplash.com/photo-1526481280693-3bfa7568e0f3?w=1200&q=80',
      ],
      videoYoutubeId: '',
      highlights: [
        'Visita al Templo Senso-ji',
        'Cruce de Shibuya',
        'Ceremonia del té tradicional',
        'Tour gastronómico en Tsukiji',
        'Monte Fuji (clima permitiendo)',
      ],
      included: [
        'Hotel céntrico 5 noches',
        'Desayunos japoneses',
        'JR Pass para 7 días',
        'Experiencia de ceremonia del té',
        'Guía local especializado',
      ],
      notIncluded: [
        'Vuelos internacionales',
        'Visa (si aplica)',
        'Comidas y cenas',
        'Actividades opcionales',
      ],
      featured: false,
      published: true,
    },
    {
      title: 'Machu Picchu Místico - Camino Inca',
      slug: 'machu-picchu-mistico-camino-inca',
      description: `Embárcate en una aventura épica siguiendo los pasos de los antiguos incas. Este tour de 7 días incluye el legendario Camino Inca, una experiencia de trekking que culmina con la majestuosa vista del amanecer en Machu Picchu.

Atraviesa paisajes de montaña impresionantes, conoce comunidades locales y descubre ruinas arqueológicas escondidas antes de llegar a la ciudadela perdida de los incas. Una experiencia transformadora para los amantes del senderismo y la historia.`,
      destination: 'Cusco, Perú',
      categoryId: categories[0].id,
      price: 1899.99,
      duration: 7,
      maxGuests: 15,
      heroImage: 'https://images.unsplash.com/photo-1587595431973-160d0d94add1?w=1200&q=80',
      gallery: [
        'https://images.unsplash.com/photo-1526392060635-9d6019884377?w=1200&q=80',
        'https://images.unsplash.com/photo-1583507331569-7c303c6117f5?w=1200&q=80',
        'https://images.unsplash.com/photo-1613312328068-c9b6b76c9e8a?w=1200&q=80',
      ],
      videoYoutubeId: '',
      highlights: [
        'Trekking por el Camino Inca clásico',
        'Amanecer en Machu Picchu',
        'Valle Sagrado de los Incas',
        'Mercado de Pisac',
        'Aclimatación en Cusco',
      ],
      included: [
        'Camping durante el trek',
        'Hotel en Cusco (2 noches)',
        'Todas las comidas durante el trek',
        'Porteadores y chef',
        'Entradas a Machu Picchu',
        'Tren de retorno',
      ],
      notIncluded: [
        'Vuelos a Cusco',
        'Bolsa de dormir (se puede rentar)',
        'Bastones de trekking (se pueden rentar)',
        'Comidas en Cusco',
      ],
      featured: true,
      published: true,
    },
    {
      title: 'Santorini Mágico - Atardecer en las Cícladas',
      slug: 'santorini-magico-atardecer-cicladas',
      description: `Disfruta de la belleza hipnotizante de Santorini, la joya de las islas griegas. Este tour de 5 días te permitirá explorar las casas blancas con cúpulas azules, disfrutar de atardeceres espectaculares y probar la exquisita gastronomía mediterránea.

Navega por la caldera volcánica, visita bodegas locales, explora pueblos pintorescos como Oia y Fira, y relájate en playas de arena negra única. Una experiencia perfecta para quienes buscan belleza natural y cultura mediterránea.`,
      destination: 'Santorini, Grecia',
      categoryId: categories[3].id,
      price: 2499.99,
      duration: 5,
      maxGuests: 8,
      heroImage: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=1200&q=80',
      gallery: [
        'https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?w=1200&q=80',
        'https://images.unsplash.com/photo-1601581987584-70a6f0c0c9ae?w=1200&q=80',
        'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=1200&q=80',
      ],
      videoYoutubeId: '',
      highlights: [
        'Atardecer en Oia',
        'Tour en catamarán por la caldera',
        'Degustación de vinos locales',
        'Visita a Akrotiri (Pompeya griega)',
        'Playa Roja y Playa Negra',
      ],
      included: [
        'Hotel con vista al mar (4 noches)',
        'Desayunos mediterráneos',
        'Tour en catamarán con comida',
        'Cata de vinos en bodega',
        'Traslados en la isla',
      ],
      notIncluded: [
        'Vuelos a Santorini',
        'Comidas y cenas (excepto tour en catamarán)',
        'Actividades opcionales',
      ],
      featured: true,
      published: true,
    },
  ];

  for (const tourData of tours) {
    await prisma.tour.upsert({
      where: { slug: tourData.slug },
      update: {},
      create: {
        ...tourData,
        gallery: tourData.gallery,
        highlights: tourData.highlights,
        included: tourData.included,
        notIncluded: tourData.notIncluded,
      },
    });
  }
  console.log('✅ Tours creados:', tours.length);

  console.log('🎉 Seed completado exitosamente!');
  console.log('\n📝 Credenciales de acceso:');
  console.log('   Email: admin@kaeltours.com');
  console.log('   Password: Admin123!');
}

main()
  .catch((e) => {
    console.error('❌ Error en seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
