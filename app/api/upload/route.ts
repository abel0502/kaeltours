import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/auth';

export async function POST(request: NextRequest) {
  const session = await auth();

  if (!session) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
  }

  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    const folder = formData.get('folder') as string || 'tours';

    if (!file) {
      return NextResponse.json({ error: 'No se proporcionó archivo' }, { status: 400 });
    }

    // Validación de tipo de archivo
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        { error: 'Tipo de archivo no permitido' },
        { status: 400 }
      );
    }

    // Validación de tamaño (5MB max)
    if (file.size > 5 * 1024 * 1024) {
      return NextResponse.json(
        { error: 'El archivo es demasiado grande (máx 5MB)' },
        { status: 400 }
      );
    }

    // Aquí iría la integración con Cloudinary
    // Por ahora devolvemos un placeholder
    const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
    
    if (!cloudName) {
      return NextResponse.json(
        { error: 'Cloudinary no está configurado' },
        { status: 500 }
      );
    }

    // TODO: Implementar upload real a Cloudinary
    // const uploadResponse = await cloudinary.v2.uploader.upload(...)

    // Placeholder response
    return NextResponse.json({
      url: `https://res.cloudinary.com/${cloudName}/${folder}/placeholder.jpg`,
      publicId: 'placeholder',
      message: 'Upload endpoint configurado - Implementar Cloudinary SDK',
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}
