'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Upload, X, Plus, Loader2 } from 'lucide-react';
import type { Tour, Category } from '@prisma/client';

interface TourFormProps {
  tour?: Tour;
  categories: Category[];
}

export function TourForm({ tour, categories }: TourFormProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [formData, setFormData] = useState({
    title: tour?.title || '',
    slug: tour?.slug || '',
    description: tour?.description || '',
    destination: tour?.destination || '',
    categoryId: tour?.categoryId || '',
    price: tour?.price?.toString() || '',
    currency: tour?.currency || 'USD',
    duration: tour?.duration || '',
    maxGuests: tour?.maxGuests?.toString() || '',
    heroImage: tour?.heroImage || '',
    gallery: (tour?.gallery as string[]) || [],
    videoYoutubeId: tour?.videoYoutubeId || '',
    highlights: (tour?.highlights as string[]) || [''],
    included: (tour?.included as string[]) || [''],
    notIncluded: (tour?.notIncluded as string[]) || [''],
    featured: tour?.featured || false,
    published: tour?.published || false,
    seoTitle: tour?.seoTitle || '',
    seoDescription: tour?.seoDescription || '',
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));

    // Auto-generar slug desde el título
    if (name === 'title' && !tour) {
      const slug = value
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
      setFormData((prev) => ({ ...prev, slug }));
    }
  };

  const handleArrayChange = (
    field: 'highlights' | 'included' | 'notIncluded',
    index: number,
    value: string
  ) => {
    setFormData((prev) => {
      const newArray = [...prev[field]];
      newArray[index] = value;
      return { ...prev, [field]: newArray };
    });
  };

  const addArrayItem = (field: 'highlights' | 'included' | 'notIncluded') => {
    setFormData((prev) => ({
      ...prev,
      [field]: [...prev[field], ''],
    }));
  };

  const removeArrayItem = (field: 'highlights' | 'included' | 'notIncluded', index: number) => {
    setFormData((prev) => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index),
    }));
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, isHero = false) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    const formDataUpload = new FormData();
    formDataUpload.append('file', file);

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formDataUpload,
      });

      if (!res.ok) throw new Error('Error al subir imagen');

      const data = await res.json();

      if (isHero) {
        setFormData((prev) => ({ ...prev, heroImage: data.url }));
      } else {
        setFormData((prev) => ({
          ...prev,
          gallery: [...prev.gallery, data.url],
        }));
      }
    } catch (error) {
      alert('Error al subir la imagen');
    } finally {
      setIsUploading(false);
    }
  };

  const removeGalleryImage = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      gallery: prev.gallery.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const url = tour ? `/api/admin/tours/${tour.id}` : '/api/admin/tours';
      const method = tour ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          price: parseFloat(formData.price),
          maxGuests: parseInt(formData.maxGuests),
          highlights: formData.highlights.filter((h) => h.trim() !== ''),
          included: formData.included.filter((i) => i.trim() !== ''),
          notIncluded: formData.notIncluded.filter((n) => n.trim() !== ''),
        }),
      });

      if (!res.ok) throw new Error('Error al guardar el tour');

      router.push('/manage-tours');
      router.refresh();
    } catch (error) {
      alert('Error al guardar el tour');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Información Básica */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Información Básica</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Título del Tour *
            </label>
            <Input
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              required
              placeholder="Tour a Samaná"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Slug (URL)</label>
            <Input
              name="slug"
              value={formData.slug}
              onChange={handleInputChange}
              required
              placeholder="tour-a-samana"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Destino *</label>
            <Input
              name="destination"
              value={formData.destination}
              onChange={handleInputChange}
              required
              placeholder="Samaná, República Dominicana"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Categoría *</label>
            <select
              name="categoryId"
              value={formData.categoryId}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="">Seleccionar categoría</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Precio *</label>
            <Input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleInputChange}
              required
              min="0"
              step="0.01"
              placeholder="99.99"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Moneda</label>
            <select
              name="currency"
              value={formData.currency}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="USD">USD</option>
              <option value="EUR">EUR</option>
              <option value="DOP">DOP</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Duración *</label>
            <Input
              name="duration"
              value={formData.duration}
              onChange={handleInputChange}
              required
              placeholder="3 días / 2 noches"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Máximo de Invitados
            </label>
            <Input
              type="number"
              name="maxGuests"
              value={formData.maxGuests}
              onChange={handleInputChange}
              min="1"
              placeholder="10"
            />
          </div>
        </div>

        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Descripción *</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            required
            rows={4}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
            placeholder="Descripción detallada del tour..."
          />
        </div>
      </div>

      {/* Imágenes */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Imágenes</h2>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Imagen Principal *
          </label>
          {formData.heroImage ? (
            <div className="relative w-full h-64 rounded-lg overflow-hidden">
              <img
                src={formData.heroImage}
                alt="Hero"
                className="w-full h-full object-cover"
              />
              <button
                type="button"
                onClick={() => setFormData((prev) => ({ ...prev, heroImage: '' }))}
                className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-full hover:bg-red-600"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-primary-500 transition-colors">
              <Upload className="w-12 h-12 text-gray-400 mb-2" />
              <span className="text-sm text-gray-600">Click para subir imagen principal</span>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleImageUpload(e, true)}
                className="hidden"
                disabled={isUploading}
              />
            </label>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Galería de Imágenes
          </label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {formData.gallery.map((img, idx) => (
              <div key={idx} className="relative aspect-square rounded-lg overflow-hidden">
                <img src={img} alt={`Gallery ${idx + 1}`} className="w-full h-full object-cover" />
                <button
                  type="button"
                  onClick={() => removeGalleryImage(idx)}
                  className="absolute top-1 right-1 p-1 bg-red-500 text-white rounded-full hover:bg-red-600"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            ))}
            <label className="flex flex-col items-center justify-center aspect-square border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-primary-500 transition-colors">
              <Plus className="w-8 h-8 text-gray-400" />
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleImageUpload(e, false)}
                className="hidden"
                disabled={isUploading}
              />
            </label>
          </div>
          {isUploading && (
            <p className="text-sm text-gray-600 mt-2">Subiendo imagen...</p>
          )}
        </div>

        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            ID de Video de YouTube
          </label>
          <Input
            name="videoYoutubeId"
            value={formData.videoYoutubeId}
            onChange={handleInputChange}
            placeholder="dQw4w9WgXcQ"
          />
          <p className="text-xs text-gray-500 mt-1">
            Solo el ID del video, no la URL completa
          </p>
        </div>
      </div>

      {/* Detalles del Tour */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Detalles del Tour</h2>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Puntos Destacados
            </label>
            {formData.highlights.map((highlight, idx) => (
              <div key={idx} className="flex gap-2 mb-2">
                <Input
                  value={highlight}
                  onChange={(e) => handleArrayChange('highlights', idx, e.target.value)}
                  placeholder="Visita a la playa..."
                />
                {formData.highlights.length > 1 && (
                  <Button
                    type="button"
                    variant="destructive"
                    size="icon"
                    onClick={() => removeArrayItem('highlights', idx)}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                )}
              </div>
            ))}
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => addArrayItem('highlights')}
            >
              <Plus className="w-4 h-4 mr-2" />
              Agregar Punto
            </Button>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Incluido</label>
            {formData.included.map((item, idx) => (
              <div key={idx} className="flex gap-2 mb-2">
                <Input
                  value={item}
                  onChange={(e) => handleArrayChange('included', idx, e.target.value)}
                  placeholder="Transporte..."
                />
                {formData.included.length > 1 && (
                  <Button
                    type="button"
                    variant="destructive"
                    size="icon"
                    onClick={() => removeArrayItem('included', idx)}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                )}
              </div>
            ))}
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => addArrayItem('included')}
            >
              <Plus className="w-4 h-4 mr-2" />
              Agregar Item
            </Button>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">No Incluido</label>
            {formData.notIncluded.map((item, idx) => (
              <div key={idx} className="flex gap-2 mb-2">
                <Input
                  value={item}
                  onChange={(e) => handleArrayChange('notIncluded', idx, e.target.value)}
                  placeholder="Propinas..."
                />
                {formData.notIncluded.length > 1 && (
                  <Button
                    type="button"
                    variant="destructive"
                    size="icon"
                    onClick={() => removeArrayItem('notIncluded', idx)}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                )}
              </div>
            ))}
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => addArrayItem('notIncluded')}
            >
              <Plus className="w-4 h-4 mr-2" />
              Agregar Item
            </Button>
          </div>
        </div>
      </div>

      {/* SEO */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">SEO</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Título SEO</label>
            <Input
              name="seoTitle"
              value={formData.seoTitle}
              onChange={handleInputChange}
              placeholder="Tour a Samaná - Descubre el paraíso"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Descripción SEO
            </label>
            <textarea
              name="seoDescription"
              value={formData.seoDescription}
              onChange={handleInputChange}
              rows={2}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
              placeholder="Descripción breve para motores de búsqueda..."
            />
          </div>
        </div>
      </div>

      {/* Opciones de Publicación */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Opciones de Publicación</h2>
        <div className="space-y-3">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              name="featured"
              checked={formData.featured}
              onChange={handleInputChange}
              className="w-4 h-4 text-primary-600 rounded"
            />
            <span className="text-sm font-medium text-gray-700">Tour Destacado</span>
          </label>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              name="published"
              checked={formData.published}
              onChange={handleInputChange}
              className="w-4 h-4 text-primary-600 rounded"
            />
            <span className="text-sm font-medium text-gray-700">Publicar Tour</span>
          </label>
        </div>
      </div>

      {/* Botones de Acción */}
      <div className="flex gap-4">
        <Button type="submit" disabled={isLoading} className="flex-1">
          {isLoading ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Guardando...
            </>
          ) : (
            <>{tour ? 'Actualizar Tour' : 'Crear Tour'}</>
          )}
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={() => router.back()}
          disabled={isLoading}
        >
          Cancelar
        </Button>
      </div>
    </form>
  );
}
