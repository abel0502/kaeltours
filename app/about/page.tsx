import Image from 'next/image';
import { CheckCircle, Award, Users, Globe } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Nosotros - KaelTours',
  description: 'Descubre quiénes somos y por qué somos tu mejor opción para vivir experiencias inolvidables alrededor del mundo.',
};

export default function AboutPage() {
  const stats = [
    { label: 'Tours Realizados', value: '5,000+', icon: Globe },
    { label: 'Clientes Felices', value: '3,500+', icon: Users },
    { label: 'Años de Experiencia', value: '15+', icon: Award },
    { label: 'Destinos', value: '50+', icon: CheckCircle },
  ];

  const values = [
    {
      title: 'Experiencias Únicas',
      description: 'Diseñamos cada tour pensando en crear momentos inolvidables que superen tus expectativas.',
    },
    {
      title: 'Atención Personalizada',
      description: 'Nuestro equipo está disponible 24/7 para asegurar que tu experiencia sea perfecta.',
    },
    {
      title: 'Calidad Premium',
      description: 'Trabajamos solo con los mejores hoteles, guías y servicios en cada destino.',
    },
    {
      title: 'Mejores Precios',
      description: 'Garantizamos las mejores tarifas del mercado sin comprometer la calidad.',
    },
  ];

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="relative h-96 flex items-center justify-center">
        <div className="absolute inset-0 bg-gradient-to-r from-primary-600 to-primary-800" />
        <div className="relative z-10 text-center text-white px-4">
          <h1 className="text-5xl font-bold mb-4">Sobre Nosotros</h1>
          <p className="text-xl max-w-2xl mx-auto">
            Expertos en crear experiencias de viaje inolvidables desde hace más de 15 años
          </p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="text-center">
                  <Icon className="w-12 h-12 mx-auto text-primary-600 mb-4" />
                  <div className="text-4xl font-bold text-gray-900 mb-2">{stat.value}</div>
                  <div className="text-gray-600">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-6">Nuestra Historia</h2>
              <div className="space-y-4 text-gray-700 text-lg leading-relaxed">
                <p>
                  KaelTours nació en 2010 con una visión clara: transformar la forma en que las personas
                  experimentan el mundo. Comenzamos como una pequeña agencia local y hemos crecido hasta
                  convertirnos en uno de los operadores turísticos más confiables de la región.
                </p>
                <p>
                  Nuestra pasión por los viajes y el compromiso con la excelencia nos han permitido crear
                  experiencias únicas para miles de viajeros. Cada tour que diseñamos refleja nuestro
                  conocimiento profundo de los destinos y nuestra dedicación a superar las expectativas.
                </p>
                <p>
                  Hoy, con presencia en más de 50 destinos alrededor del mundo, seguimos comprometidos
                  con nuestra misión original: hacer de cada viaje una experiencia inolvidable.
                </p>
              </div>
            </div>
            <div className="relative h-96 rounded-lg overflow-hidden shadow-2xl">
              <Image
                src="https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800&h=600&fit=crop"
                alt="Equipo KaelTours"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">¿Por Qué Elegirnos?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-lg">
                <CheckCircle className="w-12 h-12 text-primary-600 mb-4" />
                <h3 className="text-xl font-bold mb-3">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">Nuestro Compromiso</h2>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto mb-12">
            En KaelTours, no solo vendemos viajes, creamos experiencias que transforman vidas.
            Cada miembro de nuestro equipo está apasionado por el turismo y comprometido con
            hacer de tu aventura algo extraordinario.
          </p>
          <div className="flex flex-col md:flex-row gap-6 justify-center items-center">
            <div className="bg-primary-50 p-8 rounded-lg max-w-md">
              <h3 className="text-2xl font-bold text-primary-900 mb-4">Nuestra Misión</h3>
              <p className="text-gray-700">
                Inspirar y facilitar viajes memorables que enriquezcan la vida de nuestros clientes
                a través de experiencias auténticas y servicios excepcionales.
              </p>
            </div>
            <div className="bg-primary-50 p-8 rounded-lg max-w-md">
              <h3 className="text-2xl font-bold text-primary-900 mb-4">Nuestra Visión</h3>
              <p className="text-gray-700">
                Ser la agencia de viajes líder en innovación y satisfacción del cliente,
                reconocida por crear las experiencias turísticas más memorables del mercado.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-primary-600 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">¿Listo para tu Próxima Aventura?</h2>
          <p className="text-xl mb-8">
            Permítenos ser parte de tu próximo viaje inolvidable
          </p>
          <a
            href="/contact"
            className="inline-block px-8 py-4 bg-white text-primary-600 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors"
          >
            Contáctanos Ahora
          </a>
        </div>
      </section>
    </div>
  );
}
