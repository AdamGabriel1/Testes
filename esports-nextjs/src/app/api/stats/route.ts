import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  const timesColocacoes = await prisma.colocacao.findMany({ select: { Time: true } });
  const timesJogadores = await prisma.jogador.findMany({ select: { Time: true } });
  const todosTimes = [...timesColocacoes.map(c => c.Time), ...timesJogadores.map(j => j.Time)];
  const totalTimes = new Set(todosTimes).size;

  const totalJogadores = await prisma.jogador.count();

  const partidasColocacoes = await prisma.colocacao.findMany({
    select: { Mes: true, Dia: true },
    distinct: ['Mes', 'Dia'],
  });
  const totalPartidas = partidasColocacoes.length;

  const kills = await prisma.jogador.aggregate({
    _sum: {
      Q1_Kills: true,
      Q2_Kills: true,
      Q3_Kills: true,
    },
  });
  const totalKills = (kills._sum.Q1_Kills || 0) + (kills._sum.Q2_Kills || 0) + (kills._sum.Q3_Kills || 0);

  return NextResponse.json({
    total_times: totalTimes,
    total_jogadores: totalJogadores,
    total_partidas: totalPartidas,
    total_kills: totalKills,
  });
}
