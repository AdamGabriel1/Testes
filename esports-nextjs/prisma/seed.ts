import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Dados de exemplo para Colocações
  const colocacoes = [
    { Mes: 'Maio', Dia: 15, Time: 'FURIA', Q1_Pos: 1, Q2_Pos: 3, Q3_Pos: 2 },
    { Mes: 'Maio', Dia: 15, Time: 'LOUD', Q1_Pos: 2, Q2_Pos: 1, Q3_Pos: 1 },
    { Mes: 'Maio', Dia: 15, Time: 'Imperial', Q1_Pos: 3, Q2_Pos: 2, Q3_Pos: 3 },
    { Mes: 'Maio', Dia: 22, Time: 'FURIA', Q1_Pos: 2, Q2_Pos: 1, Q3_Pos: 1 },
    { Mes: 'Maio', Dia: 22, Time: 'LOUD', Q1_Pos: 1, Q2_Pos: 3, Q3_Pos: 2 },
    { Mes: 'Maio', Dia: 22, Time: 'Imperial', Q1_Pos: 3, Q2_Pos: 2, Q3_Pos: 3 },
    { Mes: 'Junho', Dia: 5, Time: 'FURIA', Q1_Pos: 1, Q2_Pos: 1, Q3_Pos: 2 },
    { Mes: 'Junho', Dia: 5, Time: 'LOUD', Q1_Pos: 2, Q2_Pos: 3, Q3_Pos: 1 },
    { Mes: 'Junho', Dia: 5, Time: 'Imperial', Q1_Pos: 3, Q2_Pos: 2, Q3_Pos: 3 },
    { Mes: 'Junho', Dia: 12, Time: 'FURIA', Q1_Pos: 2, Q2_Pos: 2, Q3_Pos: 1 },
    { Mes: 'Junho', Dia: 12, Time: 'LOUD', Q1_Pos: 1, Q2_Pos: 1, Q3_Pos: 2 },
    { Mes: 'Junho', Dia: 12, Time: 'Imperial', Q1_Pos: 3, Q2_Pos: 3, Q3_Pos: 3 },
  ];

  // Dados de exemplo para Jogadores
  const jogadores = [
    { Mes: 'Maio', Dia: 15, Time: 'FURIA', Jogador: 'KSCERATO', Q1_Kills: 12, Q2_Kills: 15, Q3_Kills: 18 },
    { Mes: 'Maio', Dia: 15, Time: 'FURIA', Jogador: 'yuurih', Q1_Kills: 10, Q2_Kills: 14, Q3_Kills: 16 },
    { Mes: 'Maio', Dia: 15, Time: 'FURIA', Jogador: 'skullz', Q1_Kills: 8, Q2_Kills: 11, Q3_Kills: 13 },
    { Mes: 'Maio', Dia: 15, Time: 'LOUD', Jogador: 'aspas', Q1_Kills: 15, Q2_Kills: 18, Q3_Kills: 20 },
    { Mes: 'Maio', Dia: 15, Time: 'LOUD', Jogador: 'less', Q1_Kills: 12, Q2_Kills: 14, Q3_Kills: 16 },
    { Mes: 'Maio', Dia: 15, Time: 'LOUD', Jogador: 'cauanzin', Q1_Kills: 10, Q2_Kills: 12, Q3_Kills: 14 },
    { Mes: 'Maio', Dia: 15, Time: 'Imperial', Jogador: 'FalleN', Q1_Kills: 9, Q2_Kills: 10, Q3_Kills: 12 },
    { Mes: 'Maio', Dia: 15, Time: 'Imperial', Jogador: 'chelo', Q1_Kills: 8, Q2_Kills: 9, Q3_Kills: 11 },
    { Mes: 'Maio', Dia: 15, Time: 'Imperial', Jogador: 'VINI', Q1_Kills: 7, Q2_Kills: 8, Q3_Kills: 10 },
    { Mes: 'Maio', Dia: 22, Time: 'FURIA', Jogador: 'KSCERATO', Q1_Kills: 14, Q2_Kills: 16, Q3_Kills: 19 },
    { Mes: 'Maio', Dia: 22, Time: 'FURIA', Jogador: 'yuurih', Q1_Kills: 11, Q2_Kills: 13, Q3_Kills: 15 },
    { Mes: 'Maio', Dia: 22, Time: 'FURIA', Jogador: 'skullz', Q1_Kills: 9, Q2_Kills: 10, Q3_Kills: 12 },
    { Mes: 'Maio', Dia: 22, Time: 'LOUD', Jogador: 'aspas', Q1_Kills: 16, Q2_Kills: 17, Q3_Kills: 18 },
    { Mes: 'Maio', Dia: 22, Time: 'LOUD', Jogador: 'less', Q1_Kills: 13, Q2_Kills: 15, Q3_Kills: 17 },
    { Mes: 'Maio', Dia: 22, Time: 'LOUD', Jogador: 'cauanzin', Q1_Kills: 11, Q2_Kills: 13, Q3_Kills: 15 },
    { Mes: 'Maio', Dia: 22, Time: 'Imperial', Jogador: 'FalleN', Q1_Kills: 8, Q2_Kills: 9, Q3_Kills: 11 },
    { Mes: 'Maio', Dia: 22, Time: 'Imperial', Jogador: 'chelo', Q1_Kills: 7, Q2_Kills: 8, Q3_Kills: 10 },
    { Mes: 'Maio', Dia: 22, Time: 'Imperial', Jogador: 'VINI', Q1_Kills: 6, Q2_Kills: 7, Q3_Kills: 9 },
    { Mes: 'Junho', Dia: 5, Time: 'FURIA', Jogador: 'KSCERATO', Q1_Kills: 13, Q2_Kills: 14, Q3_Kills: 16 },
    { Mes: 'Junho', Dia: 5, Time: 'FURIA', Jogador: 'yuurih', Q1_Kills: 10, Q2_Kills: 12, Q3_Kills: 14 },
    { Mes: 'Junho', Dia: 5, Time: 'FURIA', Jogador: 'skullz', Q1_Kills: 8, Q2_Kills: 9, Q3_Kills: 11 },
    { Mes: 'Junho', Dia: 5, Time: 'LOUD', Jogador: 'aspas', Q1_Kills: 17, Q2_Kills: 19, Q3_Kills: 21 },
    { Mes: 'Junho', Dia: 5, Time: 'LOUD', Jogador: 'less', Q1_Kills: 14, Q2_Kills: 16, Q3_Kills: 18 },
    { Mes: 'Junho', Dia: 5, Time: 'LOUD', Jogador: 'cauanzin', Q1_Kills: 12, Q2_Kills: 14, Q3_Kills: 16 },
    { Mes: 'Junho', Dia: 5, Time: 'Imperial', Jogador: 'FalleN', Q1_Kills: 7, Q2_Kills: 8, Q3_Kills: 10 },
    { Mes: 'Junho', Dia: 5, Time: 'Imperial', Jogador: 'chelo', Q1_Kills: 6, Q2_Kills: 7, Q3_Kills: 9 },
    { Mes: 'Junho', Dia: 5, Time: 'Imperial', Jogador: 'VINI', Q1_Kills: 5, Q2_Kills: 6, Q3_Kills: 8 },
    { Mes: 'Junho', Dia: 12, Time: 'FURIA', Jogador: 'KSCERATO', Q1_Kills: 15, Q2_Kills: 17, Q3_Kills: 20 },
    { Mes: 'Junho', Dia: 12, Time: 'FURIA', Jogador: 'yuurih', Q1_Kills: 12, Q2_Kills: 14, Q3_Kills: 16 },
    { Mes: 'Junho', Dia: 12, Time: 'FURIA', Jogador: 'skullz', Q1_Kills: 10, Q2_Kills: 11, Q3_Kills: 13 },
    { Mes: 'Junho', Dia: 12, Time: 'LOUD', Jogador: 'aspas', Q1_Kills: 18, Q2_Kills: 20, Q3_Kills: 22 },
    { Mes: 'Junho', Dia: 12, Time: 'LOUD', Jogador: 'less', Q1_Kills: 15, Q2_Kills: 17, Q3_Kills: 19 },
    { Mes: 'Junho', Dia: 12, Time: 'LOUD', Jogador: 'cauanzin', Q1_Kills: 13, Q2_Kills: 15, Q3_Kills: 17 },
    { Mes: 'Junho', Dia: 12, Time: 'Imperial', Jogador: 'FalleN', Q1_Kills: 6, Q2_Kills: 7, Q3_Kills: 9 },
    { Mes: 'Junho', Dia: 12, Time: 'Imperial', Jogador: 'chelo', Q1_Kills: 5, Q2_Kills: 6, Q3_Kills: 8 },
    { Mes: 'Junho', Dia: 12, Time: 'Imperial', Jogador: 'VINI', Q1_Kills: 4, Q2_Kills: 5, Q3_Kills: 7 },
  ];

  for (const c of colocacoes) {
    await prisma.colocacao.create({ data: c });
  }

  for (const j of jogadores) {
    await prisma.jogador.create({ data: j });
  }

  console.log('✅ Seed concluído!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
