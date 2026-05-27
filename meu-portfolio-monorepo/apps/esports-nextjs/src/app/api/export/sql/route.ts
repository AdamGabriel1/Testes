import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  const colocacoes = await prisma.colocacao.findMany();
  const jogadores = await prisma.jogador.findMany();

  let sql = `-- eSports Database Export\n`;
  sql += `PRAGMA foreign_keys=OFF;\nBEGIN TRANSACTION;\n\n`;

  sql += `CREATE TABLE IF NOT EXISTS colocacoes (id INTEGER PRIMARY KEY AUTOINCREMENT, Mes TEXT, Dia INTEGER, Time TEXT, Q1_Pos INTEGER, Q2_Pos INTEGER, Q3_Pos INTEGER);\n`;
  sql += `CREATE TABLE IF NOT EXISTS jogadores (id INTEGER PRIMARY KEY AUTOINCREMENT, Mes TEXT, Dia INTEGER, Time TEXT, Jogador TEXT, Q1_Kills INTEGER, Q2_Kills INTEGER, Q3_Kills INTEGER);\n\n`;

  for (const c of colocacoes) {
    sql += `INSERT INTO colocacoes VALUES (${c.id}, '${c.Mes}', ${c.Dia}, '${c.Time}', ${c.Q1_Pos}, ${c.Q2_Pos}, ${c.Q3_Pos});\n`;
  }
  sql += `\n`;
  for (const j of jogadores) {
    sql += `INSERT INTO jogadores VALUES (${j.id}, '${j.Mes}', ${j.Dia}, '${j.Time}', '${j.Jogador}', ${j.Q1_Kills}, ${j.Q2_Kills}, ${j.Q3_Kills});\n`;
  }

  sql += `\nCOMMIT;`;

  return new NextResponse(sql, {
    headers: { 'Content-Type': 'text/plain' },
  });
}
