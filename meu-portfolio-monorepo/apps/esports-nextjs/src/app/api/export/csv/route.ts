import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  const colocacoes = await prisma.colocacao.findMany();
  const jogadores = await prisma.jogador.findMany();

  let csv = 'Tipo;Mes;Dia;Time;Jogador;Q1;Q2;Q3\n';

  for (const c of colocacoes) {
    csv += `Colocacao;${c.Mes};${c.Dia};${c.Time};;${c.Q1_Pos};${c.Q2_Pos};${c.Q3_Pos}\n`;
  }
  for (const j of jogadores) {
    csv += `Jogador;${j.Mes};${j.Dia};${j.Time};${j.Jogador};${j.Q1_Kills};${j.Q2_Kills};${j.Q3_Kills}\n`;
  }

  return new NextResponse(csv, {
    headers: {
      'Content-Type': 'text/csv',
      'Content-Disposition': 'attachment; filename=esports.csv',
    },
  });
}
