import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/auth';
import { prisma } from '@/lib/prisma';

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await auth();

  if (!session) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
  }

  try {
    const data = await request.json();

    const tour = await prisma.tour.update({
      where: { id: params.id },
      data: {
        title: data.title,
        slug: data.slug,
        description: data.description,
        destination: data.destination,
        categoryId: data.categoryId,
        price: data.price,
        currency: data.currency,
        duration: data.duration,
        maxGuests: data.maxGuests,
        heroImage: data.heroImage,
        gallery: data.gallery,
        videoYoutubeId: data.videoYoutubeId,
        highlights: data.highlights,
        included: data.included,
        notIncluded: data.notIncluded,
        featured: data.featured,
        published: data.published,
        seoTitle: data.seoTitle,
        seoDescription: data.seoDescription,
      },
    });

    return NextResponse.json({ tour });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await auth();

  if (!session) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
  }

  try {
    await prisma.tour.delete({
      where: { id: params.id },
    });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
