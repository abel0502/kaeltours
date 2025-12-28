import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { signOut } from '@/auth';
import { LayoutDashboard, Package, LogOut } from 'lucide-react';

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session) {
    redirect('/login');
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 bottom-0 w-64 bg-white border-r border-gray-200 z-40">
        <div className="p-6">
          <h1 className="text-2xl font-bold text-primary-600">KaelTours</h1>
          <p className="text-sm text-gray-600">Panel de Administración</p>
        </div>

        <nav className="px-4 space-y-2">
          <Link
            href="/admin/dashboard"
            className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <LayoutDashboard className="w-5 h-5" />
            <span>Dashboard</span>
          </Link>

          <Link
            href="/manage-tours"
            className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <Package className="w-5 h-5" />
            <span>Tours</span>
          </Link>
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-4">
          <div className="px-4 py-3 bg-gray-50 rounded-lg mb-3">
            <p className="text-sm font-medium text-gray-900">{session.user?.name}</p>
            <p className="text-xs text-gray-600">{session.user?.email}</p>
          </div>

          <form
            action={async () => {
              'use server';
              await signOut({ redirectTo: '/login' });
            }}
          >
            <button
              type="submit"
              className="w-full flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            >
              <LogOut className="w-5 h-5" />
              <span>Cerrar Sesión</span>
            </button>
          </form>
        </div>
      </aside>

      {/* Main Content */}
      <main className="ml-64 p-8">
        {children}
      </main>
    </div>
  );
}
