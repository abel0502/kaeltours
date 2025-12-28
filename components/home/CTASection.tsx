'use client';

import { MessageCircle } from 'lucide-react';
import { useWhatsApp } from '@/hooks/useWhatsApp';

export function CTASection() {
  const { openWhatsApp } = useWhatsApp();

  return (
    <section className="py-20 px-4 bg-primary-600">
      <div className="max-w-4xl mx-auto text-center text-white">
        <h2 className="text-4xl font-bold mb-6">
          ¿Listo para tu próxima aventura?
        </h2>
        <p className="text-xl mb-8">
          Contacta con nuestros expertos para diseñar el viaje perfecto
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => openWhatsApp('Hola, me gustaría información sobre los tours disponibles')}
            className="px-8 py-4 bg-white text-primary-600 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors inline-flex items-center justify-center gap-2"
          >
            <MessageCircle className="w-5 h-5" />
            Consultar por WhatsApp
          </button>
          <a
            href="/contact"
            className="px-8 py-4 bg-transparent border-2 border-white text-white rounded-lg font-semibold text-lg hover:bg-white hover:text-primary-600 transition-colors inline-flex items-center justify-center"
          >
            Formulario de Contacto
          </a>
        </div>
      </div>
    </section>
  );
}
