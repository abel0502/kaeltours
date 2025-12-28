import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: NextRequest) {
  try {
    // Test de conexión a la base de datos
    await prisma.$queryRaw`SELECT 1`;
    
    const toursCount = await prisma.tour.count();
    
    return NextResponse.json({
      status: 'ok',
      database: 'connected',
      tours: toursCount,
      timestamp: new Date().toISOString(),
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        status: 'error',
        database: 'disconnected',
        error: error.message,
      },
      { status: 500 }
    );
  }
}
