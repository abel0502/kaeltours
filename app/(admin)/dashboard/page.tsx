import { prisma } from '@/lib/prisma';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Package, Users, TrendingUp } from 'lucide-react';

export default async function DashboardPage() {
  const [toursCount, publishedToursCount, pendingBookingsCount] = await Promise.all([
    prisma.tour.count(),
    prisma.tour.count({ where: { published: true } }),
    prisma.booking.count({ where: { status: 'PENDING' } }),
  ]);

  const stats = [
    {
      title: 'Total Tours',
      value: toursCount,
      icon: Package,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
    },
    {
      title: 'Tours Publicados',
      value: publishedToursCount,
      icon: TrendingUp,
      color: 'text-green-600',
      bgColor: 'bg-green-100',
    },
    {
      title: 'Reservas Pendientes',
      value: pendingBookingsCount,
      icon: Users,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-100',
    },
  ];

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">{stat.title}</p>
                  <p className="text-3xl font-bold">{stat.value}</p>
                </div>
                <div className={`p-4 rounded-lg ${stat.bgColor}`}>
                  <stat.icon className={`w-6 h-6 ${stat.color}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <h2 className="text-xl font-semibold">Bienvenido al Panel de Administración</h2>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600 mb-4">
            Desde aquí puedes gestionar todos los aspectos de KaelTours.
          </p>
          <ul className="space-y-2 text-gray-700">
            <li>• Crear y editar tours</li>
            <li>• Gestionar reservas</li>
            <li>• Subir imágenes y videos</li>
            <li>• Configurar categorías</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
