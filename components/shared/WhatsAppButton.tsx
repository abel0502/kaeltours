'use client';

import { useWhatsApp } from '@/hooks/useWhatsApp';
import { MessageCircle } from 'lucide-react';

export function WhatsAppButton() {
  const { sendMessage } = useWhatsApp();

  const handleClick = () => {
    sendMessage({
      tourName: 'Información general',
      tourUrl: window.location.origin,
    });
  };

  return (
    <button
      onClick={handleClick}
      className="fixed bottom-6 right-6 z-50 bg-green-500 text-white p-4 rounded-full shadow-lg hover:bg-green-600 transition-all hover:scale-110 animate-pulse"
      aria-label="Contactar por WhatsApp"
    >
      <MessageCircle className="w-6 h-6" />
    </button>
  );
}
