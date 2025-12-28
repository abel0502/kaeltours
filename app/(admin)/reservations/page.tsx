'use client';

import { useState, useEffect } from 'react';
import { Loader2, Calendar, User, Mail, Phone, DollarSign } from 'lucide-react';
import type { Booking, Tour } from '@prisma/client';

type BookingWithTour = Booking & { tour: Tour };

export default function ReservationsPage() {
  const [bookings, setBookings] = useState<BookingWithTour[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'pending' | 'confirmed' | 'cancelled'>('all');

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const res = await fetch('/api/admin/reservations');
      const data = await res.json();
      setBookings(data.bookings || []);
    } catch (error) {
      console.error('Error fetching bookings:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const updateStatus = async (id: string, status: string) => {
    try {
      const res = await fetch(`/api/admin/reservations/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      });

      if (!res.ok) throw new Error('Error al actualizar reserva');

      await fetchBookings();
    } catch (error) {
      alert('Error al actualizar la reserva');
    }
  };

  const filteredBookings = bookings.filter((r) =>
    filter === 'all' ? true : r.status.toLowerCase() === filter
  );

  const stats = {
    total: bookings.length,
    pending: bookings.filter((r) => r.status === 'PENDING').length,
    confirmed: bookings.filter((r) => r.status === 'CONFIRMED').length,
    cancelled: bookings.filter((r) => r.status === 'CANCELLED').length,
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-primary-600" />
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Reservas</h1>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="text-sm text-gray-600">Total Reservas</div>
          <div className="text-3xl font-bold text-gray-900">{stats.total}</div>
        </div>
        <div className="bg-yellow-50 rounded-lg shadow p-6">
          <div className="text-sm text-yellow-800">Pendientes</div>
          <div className="text-3xl font-bold text-yellow-900">{stats.pending}</div>
        </div>
        <div className="bg-green-50 rounded-lg shadow p-6">
          <div className="text-sm text-green-800">Confirmadas</div>
          <div className="text-3xl font-bold text-green-900">{stats.confirmed}</div>
        </div>
        <div className="bg-red-50 rounded-lg shadow p-6">
          <div className="text-sm text-red-800">Canceladas</div>
          <div className="text-3xl font-bold text-red-900">{stats.cancelled}</div>
        </div>
      </div>

      {/* Filtros */}
      <div className="bg-white rounded-lg shadow p-4 mb-6">
        <div className="flex gap-2">
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-md transition-colors ${
              filter === 'all'
                ? 'bg-primary-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Todas
          </button>
          <button
            onClick={() => setFilter('pending')}
            className={`px-4 py-2 rounded-md transition-colors ${
              filter === 'pending'
                ? 'bg-yellow-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Pendientes
          </button>
          <button
            onClick={() => setFilter('confirmed')}
            className={`px-4 py-2 rounded-md transition-colors ${
              filter === 'confirmed'
                ? 'bg-green-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Confirmadas
          </button>
          <button
            onClick={() => setFilter('cancelled')}
            className={`px-4 py-2 rounded-md transition-colors ${
              filter === 'cancelled'
                ? 'bg-red-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Canceladas
          </button>
        </div>
      </div>

      {/* Lista de Reservas */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        {filteredBookings.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            No hay reservas con este filtro.
          </div>
        ) : (
          <div className="divide-y divide-gray-200">
            {filteredBookings.map((booking) => (
              <div key={booking.id} className="p-6 hover:bg-gray-50 transition-colors">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {booking.tour?.title || 'Tour no disponible'}
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                      <div className="flex items-center gap-2 text-gray-600">
                        <User className="w-4 h-4" />
                        <span>{booking.customerName}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-600">
                        <Mail className="w-4 h-4" />
                        <span>{booking.customerEmail}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-600">
                        <Phone className="w-4 h-4" />
                        <span>{booking.whatsappNumber}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-600">
                        <Calendar className="w-4 h-4" />
                        <span>{new Date(booking.startDate).toLocaleDateString('es-ES')}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-900 font-medium">
                        <DollarSign className="w-4 h-4" />
                        <span>
                          {booking.guests} {booking.guests === 1 ? 'persona' : 'personas'} - ${booking.totalPrice ? Number(booking.totalPrice).toFixed(2) : '0.00'}
                        </span>
                      </div>
                    </div>

                    {booking.notes && (
                      <div className="mt-3 p-3 bg-gray-50 rounded-md text-sm text-gray-700">
                        <strong>Notas:</strong> {booking.notes}
                      </div>
                    )}
                  </div>

                  <div className="ml-6 flex flex-col gap-2">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        booking.status === 'PENDING'
                          ? 'bg-yellow-100 text-yellow-800'
                          : booking.status === 'CONFIRMED'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {booking.status === 'PENDING'
                        ? 'Pendiente'
                        : booking.status === 'CONFIRMED'
                        ? 'Confirmada'
                        : 'Cancelada'}
                    </span>

                    {booking.status === 'PENDING' && (
                      <>
                        <button
                          onClick={() => updateStatus(booking.id, 'CONFIRMED')}
                          className="px-4 py-2 bg-green-600 text-white text-sm rounded-md hover:bg-green-700 transition-colors"
                        >
                          Confirmar
                        </button>
                        <button
                          onClick={() => updateStatus(booking.id, 'CANCELLED')}
                          className="px-4 py-2 bg-red-600 text-white text-sm rounded-md hover:bg-red-700 transition-colors"
                        >
                          Cancelar
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
