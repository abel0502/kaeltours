import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/auth';
import { prisma } from '@/lib/prisma';

export async function GET(request: NextRequest) {
  const session = await auth();

  if (!session) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
  }

  try {
    const tours = await prisma.tour.findMany({
      include: {
        category: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return NextResponse.json({ tours });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  const session = await auth();

  if (!session) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
  }

  try {
    const data = await request.json();

    // Validación básica
    if (!data.title || !data.categoryId || !data.destination) {
      return NextResponse.json(
        { error: 'Faltan campos requeridos' },
        { status: 400 }
      );
    }

    const tour = await prisma.tour.create({
      data: {
        title: data.title,
        slug: data.slug,
        description: data.description,
        destination: data.destination,
        categoryId: data.categoryId,
        price: data.price,
        currency: data.currency || 'USD',
        duration: data.duration,
        maxGuests: data.maxGuests,
        heroImage: data.heroImage,
        gallery: data.gallery || [],
        videoYoutubeId: data.videoYoutubeId,
        highlights: data.highlights || [],
        included: data.included || [],
        notIncluded: data.notIncluded || [],
        featured: data.featured || false,
        published: data.published || false,
        seoTitle: data.seoTitle,
        seoDescription: data.seoDescription,
      },
    });

    return NextResponse.json({ tour }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
