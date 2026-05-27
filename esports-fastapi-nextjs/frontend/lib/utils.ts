import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const API_BASE = "https://probable-space-zebra-wrw4rg65gqgfw76-5000.app.github.dev";

export async function apiFetch(endpoint: string, options?: RequestInit) {
  const res = await fetch(`${API_BASE}${endpoint}`, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
}

export type Colocacao = {
  id: number;
  Mes: string;
  Dia: number;
  Time: string;
  Q1_Pos: number;
  Q2_Pos: number;
  Q3_Pos: number;
};

export type Jogador = {
  id: number;
  Mes: string;
  Dia: number;
  Time: string;
  Jogador: string;
  Q1_Kills: number;
  Q2_Kills: number;
  Q3_Kills: number;
};

export type Stats = {
  total_times: number;
  total_jogadores: number;
  total_partidas: number;
  total_kills: number;
};

export type DashboardData = {
  kills_por_time: { Time: string; total: number }[];
  top_jogadores: { Jogador: string; total: number }[];
  distribuicao_q1: { posicao: number; quantidade: number }[];
  kills_quartis: { q1_total: number; q2_total: number; q3_total: number };
};
