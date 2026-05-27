import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const data = await request.json();
  const colocacao = await prisma.colocacao.update({
    where: { id: parseInt(id) },
    data,
  });
  return NextResponse.json(colocacao);
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  await prisma.colocacao.delete({ where: { id: parseInt(id) } });
  return NextResponse.json({ message: 'Colocação excluída' });
}
