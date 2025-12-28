import { z } from 'zod';

export const tourSchema = z.object({
  title: z.string().min(5, 'El título debe tener al menos 5 caracteres'),
  slug: z.string().min(3, 'El slug debe tener al menos 3 caracteres'),
  description: z.string().min(50, 'La descripción debe tener al menos 50 caracteres'),
  destination: z.string().min(2, 'El destino es requerido'),
  categoryId: z.string().min(1, 'La categoría es requerida'),
  price: z.number().positive('El precio debe ser mayor a 0'),
  duration: z.number().int().positive('La duración debe ser al menos 1 día'),
  maxGuests: z.number().int().positive('Debe permitir al menos 1 huésped'),
  heroImage: z.string().url().optional(),
  gallery: z.array(z.string().url()).optional(),
  videoYoutubeId: z.string().optional(),
  highlights: z.array(z.string()).optional(),
  included: z.array(z.string()).optional(),
  notIncluded: z.array(z.string()).optional(),
  featured: z.boolean().default(false),
  published: z.boolean().default(false),
  seoTitle: z.string().optional(),
  seoDescription: z.string().optional(),
});

export type TourFormData = z.infer<typeof tourSchema>;
