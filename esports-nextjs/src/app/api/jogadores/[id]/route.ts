import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const data = await request.json();
  const jogador = await prisma.jogador.update({
    where: { id: parseInt(id) },
    data,
  });
  return NextResponse.json(jogador);
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  await prisma.jogador.delete({ where: { id: parseInt(id) } });
  return NextResponse.json({ message: 'Jogador excluído' });
}
