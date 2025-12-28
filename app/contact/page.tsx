'use client';

import { useState } from 'react';
import { Mail, Phone, MapPin, Send, MessageCircle } from 'lucide-react';
import { useWhatsApp } from '@/hooks/useWhatsApp';

export default function ContactPage() {
  const { openWhatsApp } = useWhatsApp();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    // Simular envío (implementar endpoint real más tarde)
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Por ahora, redirigir a WhatsApp con el mensaje
      const message = `Hola, soy ${formData.name}.\n\nAsunto: ${formData.subject}\n\n${formData.message}\n\nContacto: ${formData.email} | ${formData.phone}`;
      openWhatsApp(message);
      
      setSubmitStatus('success');
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
      });
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: Phone,
      title: 'Teléfono',
      details: '+52 123 456 7890',
      link: 'tel:+521234567890',
    },
    {
      icon: Mail,
      title: 'Email',
      details: 'info@kaeltours.com',
      link: 'mailto:info@kaeltours.com',
    },
    {
      icon: MapPin,
      title: 'Oficina',
      details: 'Av. Principal 123, Ciudad de México',
      link: null,
    },
    {
      icon: MessageCircle,
      title: 'WhatsApp',
      details: 'Chatea con nosotros',
      link: null,
      action: () => openWhatsApp('Hola, me gustaría obtener información sobre los tours'),
    },
  ];

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="relative h-80 flex items-center justify-center bg-gradient-to-r from-primary-600 to-primary-800">
        <div className="relative z-10 text-center text-white px-4">
          <h1 className="text-5xl font-bold mb-4">Contáctanos</h1>
          <p className="text-xl max-w-2xl mx-auto">
            Estamos aquí para ayudarte a planear tu próxima aventura
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Contact Information */}
          <div className="lg:col-span-1 space-y-6">
            <div>
              <h2 className="text-3xl font-bold mb-6">Información de Contacto</h2>
              <p className="text-gray-600 mb-8">
                Nuestro equipo está disponible para responder todas tus preguntas. Contáctanos por el medio que prefieras.
              </p>
            </div>

            <div className="space-y-4">
              {contactInfo.map((item, index) => {
                const Icon = item.icon;
                const content = (
                  <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                    <Icon className="w-6 h-6 text-primary-600 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">{item.title}</h3>
                      <p className="text-gray-600">{item.details}</p>
                    </div>
                  </div>
                );

                if (item.action) {
                  return (
                    <button
                      key={index}
                      onClick={item.action}
                      className="w-full text-left"
                    >
                      {content}
                    </button>
                  );
                }

                if (item.link) {
                  return (
                    <a key={index} href={item.link}>
                      {content}
                    </a>
                  );
                }

                return <div key={index}>{content}</div>;
              })}
            </div>

            {/* Quick WhatsApp CTA */}
            <div className="bg-green-50 border-2 border-green-200 rounded-lg p-6">
              <h3 className="font-bold text-green-900 mb-2 flex items-center gap-2">
                <MessageCircle className="w-5 h-5" />
                Respuesta Inmediata
              </h3>
              <p className="text-green-700 mb-4">
                ¿Necesitas ayuda urgente? Chatea con nosotros por WhatsApp
              </p>
              <button
                onClick={() => openWhatsApp('Hola, necesito ayuda con...')}
                className="w-full py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-5 h-5" />
                Abrir WhatsApp
              </button>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h2 className="text-3xl font-bold mb-6">Envíanos un Mensaje</h2>
              
              {submitStatus === 'success' && (
                <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg text-green-800">
                  ¡Gracias por contactarnos! Te redirigiremos a WhatsApp para continuar la conversación.
                </div>
              )}
              
              {submitStatus === 'error' && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-800">
                  Hubo un error. Por favor intenta nuevamente o contáctanos por WhatsApp.
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                      Nombre Completo *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      placeholder="Juan Pérez"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      placeholder="tu@email.com"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                      Teléfono
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      placeholder="+52 123 456 7890"
                    />
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                      Asunto *
                    </label>
                    <select
                      id="subject"
                      name="subject"
                      required
                      value={formData.subject}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    >
                      <option value="">Selecciona un asunto</option>
                      <option value="Consulta de Tour">Consulta de Tour</option>
                      <option value="Reservación">Reservación</option>
                      <option value="Cotización Personalizada">Cotización Personalizada</option>
                      <option value="Información General">Información General</option>
                      <option value="Quejas y Sugerencias">Quejas y Sugerencias</option>
                      <option value="Otro">Otro</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    Mensaje *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={6}
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
                    placeholder="Cuéntanos cómo podemos ayudarte..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 bg-primary-600 text-white rounded-lg font-semibold hover:bg-primary-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>Enviando...</>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      Enviar Mensaje
                    </>
                  )}
                </button>

                <p className="text-sm text-gray-600 text-center">
                  Al enviar este formulario, aceptas nuestros términos y condiciones.
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Map Section */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8">Visítanos</h2>
          <div className="bg-gray-200 rounded-lg h-96 flex items-center justify-center">
            <p className="text-gray-600">
              Mapa de Google (integración pendiente)
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
