'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface Category {
  id: string;
  name: string;
  slug: string;
}

interface TourFiltersProps {
  categories: Category[];
}

export function TourFilters({ categories }: TourFiltersProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const [selectedCategory, setSelectedCategory] = useState(
    searchParams.get('category') || ''
  );
  const [destination, setDestination] = useState(
    searchParams.get('destination') || ''
  );
  const [minPrice, setMinPrice] = useState(searchParams.get('minPrice') || '');
  const [maxPrice, setMaxPrice] = useState(searchParams.get('maxPrice') || '');

  const handleApplyFilters = () => {
    const params = new URLSearchParams();
    
    if (selectedCategory) params.set('category', selectedCategory);
    if (destination) params.set('destination', destination);
    if (minPrice) params.set('minPrice', minPrice);
    if (maxPrice) params.set('maxPrice', maxPrice);

    router.push(`/tours?${params.toString()}`);
  };

  const handleReset = () => {
    setSelectedCategory('');
    setDestination('');
    setMinPrice('');
    setMaxPrice('');
    router.push('/tours');
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
      <h3 className="text-xl font-bold mb-6">Filtrar Tours</h3>

      {/* Búsqueda por destino */}
      <div className="mb-6">
        <Input
          label="Destino"
          placeholder="Ej: Cancún, París..."
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
        />
      </div>

      {/* Categorías */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Categoría
        </label>
        <div className="space-y-2">
          {categories.map((category) => (
            <label key={category.id} className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="category"
                value={category.slug}
                checked={selectedCategory === category.slug}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-4 h-4 text-primary-600 focus:ring-primary-500"
              />
              <span className="text-gray-700">{category.name}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Rango de precio */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Precio (USD)
        </label>
        <div className="grid grid-cols-2 gap-3">
          <Input
            type="number"
            placeholder="Mínimo"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
          />
          <Input
            type="number"
            placeholder="Máximo"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
          />
        </div>
      </div>

      {/* Botones */}
      <div className="space-y-3">
        <Button onClick={handleApplyFilters} className="w-full">
          Aplicar Filtros
        </Button>
        <Button onClick={handleReset} variant="outline" className="w-full">
          Limpiar Filtros
        </Button>
      </div>
    </div>
  );
}
