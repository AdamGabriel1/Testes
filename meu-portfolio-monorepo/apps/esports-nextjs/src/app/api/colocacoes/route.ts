import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const mes = searchParams.get('mes');
  const search = searchParams.get('search');

  const where: any = {};
  if (mes) where.Mes = mes;
  if (search) {
    where.OR = [
      { Time: { contains: search, mode: 'insensitive' } },
      { Mes: { contains: search, mode: 'insensitive' } },
    ];
  }

  const colocacoes = await prisma.colocacao.findMany({
    where,
    orderBy: [{ Mes: 'desc' }, { Dia: 'desc' }, { Q1_Pos: 'asc' }],
  });

  return NextResponse.json(colocacoes);
}

export async function POST(request: NextRequest) {
  const data = await request.json();
  const colocacao = await prisma.colocacao.create({ data });
  return NextResponse.json(colocacao, { status: 201 });
}
