'use client';

import { useWhatsApp } from '@/hooks/useWhatsApp';
import { formatPrice } from '@/lib/utils';
import { Calendar, Users, MessageCircle, Mail } from 'lucide-react';

interface TourSidebarProps {
  tour: {
    title: string;
    slug: string;
    price: any;
    currency: string;
    duration: number;
    maxGuests: number;
  };
}

export function TourSidebar({ tour }: TourSidebarProps) {
  const { openWhatsApp } = useWhatsApp();

  const handleWhatsApp = () => {
    const tourUrl = `${window.location.origin}/tours/${tour.slug}`;
    const message = `Hola, estoy interesado en el tour "${tour.title}". Me gustaría obtener más información sobre disponibilidad y precios.\n\nVer tour: ${tourUrl}`;
    openWhatsApp(message);
  };

  return (
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

      <button
        onClick={handleWhatsApp}
        className="w-full py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-colors mb-3 flex items-center justify-center gap-2"
      >
        <MessageCircle className="w-5 h-5" />
        Consultar por WhatsApp
      </button>

      <a
        href="/contact"
        className="w-full py-3 border border-primary-600 text-primary-600 rounded-lg font-semibold hover:bg-primary-50 transition-colors flex items-center justify-center gap-2"
      >
        <Mail className="w-5 h-5" />
        Enviar Mensaje
      </a>

      <div className="mt-6 pt-6 border-t border-gray-200">
        <p className="text-sm text-gray-600 mb-3">
          ¿Tienes dudas? Nuestro equipo está disponible 24/7
        </p>
        <ul className="text-sm text-gray-700 space-y-2">
          <li>✓ Respuesta inmediata por WhatsApp</li>
          <li>✓ Cotizaciones personalizadas</li>
          <li>✓ Asesoría de viaje incluida</li>
          <li>✓ Mejor precio garantizado</li>
        </ul>
      </div>
    </div>
  );
}
