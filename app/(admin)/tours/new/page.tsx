import { prisma } from '@/lib/prisma';
import { Card, CardContent, CardHeader } from '@/components/ui/card';

export default async function NewTourPage() {
  const categories = await prisma.category.findMany();

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Crear Nuevo Tour</h1>

      <Card>
        <CardHeader>
          <h2 className="text-xl font-semibold">Información del Tour</h2>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600 mb-4">
            El formulario completo de creación de tours estará aquí.
            Por ahora, esta es una estructura básica.
          </p>
          <p className="text-sm text-gray-500">
            Nota: Para completar la implementación del CRUD completo,
            necesitarás crear los componentes de formulario con React Hook Form,
            integración con Cloudinary para subida de imágenes, y los API routes correspondientes.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
