import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const mes = searchParams.get('mes');
  const time = searchParams.get('time');
  const search = searchParams.get('search');

  const where: any = {};
  if (mes) where.Mes = mes;
  if (time) where.Time = time;
  if (search) {
    where.OR = [
      { Jogador: { contains: search, mode: 'insensitive' } },
      { Time: { contains: search, mode: 'insensitive' } },
      { Mes: { contains: search, mode: 'insensitive' } },
    ];
  }

  const jogadores = await prisma.jogador.findMany({
    where,
    orderBy: [{ Mes: 'desc' }, { Dia: 'desc' }],
  });

  return NextResponse.json(jogadores);
}

export async function POST(request: NextRequest) {
  const data = await request.json();
  const jogador = await prisma.jogador.create({ data });
  return NextResponse.json(jogador, { status: 201 });
}
