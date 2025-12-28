import { UserRole, BookingStatus } from '@prisma/client';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
}

export interface Tour {
  id: string;
  slug: string;
  title: string;
  description: string;
  destination: string;
  categoryId: string;
  price: number;
  currency: string;
  featured: boolean;
  published: boolean;
  heroImage: string | null;
  gallery: string[];
  videoYoutubeId: string | null;
  videoVimeoId: string | null;
  duration: number;
  maxGuests: number;
  highlights: string[];
  included: string[];
  notIncluded: string[];
  itinerary: Itinerary[];
  seoTitle: string | null;
  seoDescription: string | null;
  seoKeywords: string | null;
  viewCount: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface Itinerary {
  day: number;
  title: string;
  description: string;
}

export interface Booking {
  id: string;
  tourId: string | null;
  hotelId: string | null;
  customerName: string;
  customerEmail: string;
  whatsappNumber: string;
  startDate: Date;
  endDate: Date | null;
  guests: number;
  totalPrice: number | null;
  status: BookingStatus;
  notes: string | null;
  metadata: Record<string, any>;
  createdAt: Date;
  updatedAt: Date;
}
