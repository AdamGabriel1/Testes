import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  const killsPorTimeRaw = await prisma.jogador.groupBy({
    by: ['Time'],
    _sum: { Q1_Kills: true, Q2_Kills: true, Q3_Kills: true },
    orderBy: { _sum: { Q1_Kills: 'desc' } },
    take: 10,
  });
  const killsPorTime = killsPorTimeRaw.map(t => ({
    Time: t.Time,
    total: (t._sum.Q1_Kills || 0) + (t._sum.Q2_Kills || 0) + (t._sum.Q3_Kills || 0),
  })).sort((a, b) => b.total - a.total);

  const topJogadoresRaw = await prisma.jogador.groupBy({
    by: ['Jogador'],
    _sum: { Q1_Kills: true, Q2_Kills: true, Q3_Kills: true },
    orderBy: { _sum: { Q1_Kills: 'desc' } },
    take: 10,
  });
  const topJogadores = topJogadoresRaw.map(j => ({
    Jogador: j.Jogador,
    total: (j._sum.Q1_Kills || 0) + (j._sum.Q2_Kills || 0) + (j._sum.Q3_Kills || 0),
  })).sort((a, b) => b.total - a.total);

  const distribuicaoQ1Raw = await prisma.colocacao.groupBy({
    by: ['Q1_Pos'],
    _count: { Q1_Pos: true },
  });
  const distribuicaoQ1 = distribuicaoQ1Raw.map(d => ({
    posicao: d.Q1_Pos,
    quantidade: d._count.Q1_Pos,
  }));

  const killsQuartis = await prisma.jogador.aggregate({
    _sum: { Q1_Kills: true, Q2_Kills: true, Q3_Kills: true },
  });

  return NextResponse.json({
    kills_por_time: killsPorTime,
    top_jogadores: topJogadores,
    distribuicao_q1: distribuicaoQ1,
    kills_quartis: {
      q1_total: killsQuartis._sum.Q1_Kills || 0,
      q2_total: killsQuartis._sum.Q2_Kills || 0,
      q3_total: killsQuartis._sum.Q3_Kills || 0,
    },
  });
}
