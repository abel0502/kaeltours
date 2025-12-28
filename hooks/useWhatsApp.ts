'use client';

import { formatPrice } from '@/lib/utils';

interface WhatsAppMessageParams {
  tourName: string;
  tourPrice?: number;
  tourUrl: string;
}

export function useWhatsApp() {
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '';

  const sendMessage = ({ tourName, tourPrice, tourUrl }: WhatsAppMessageParams) => {
    const priceText = tourPrice ? ` por ${formatPrice(tourPrice)}` : '';
    
    const message = `¡Hola KaelTours! 👋

Vi el tour "${tourName}"${priceText} en:
${tourUrl}

y me gustaría obtener más información sobre disponibilidad y formas de pago.

¡Gracias!`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
    
    window.open(whatsappUrl, '_blank');
  };

  const openWhatsApp = (message: string) => {
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
  };

  return { sendMessage, openWhatsApp };
}
