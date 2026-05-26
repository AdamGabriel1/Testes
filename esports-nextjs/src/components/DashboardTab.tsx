'use client';

import { useEffect, useState } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, LineChart, Line
} from 'recharts';

interface DashboardData {
  kills_por_time: { Time: string; total: number }[];
  top_jogadores: { Jogador: string; total: number }[];
  distribuicao_q1: { posicao: number; quantidade: number }[];
  kills_quartis: { q1_total: number; q2_total: number; q3_total: number };
}

const COLORS = ['#fbbf24', '#34d399', '#60a5fa', '#a78bfa', '#f472b6', '#fb923c', '#94a3b8', '#6366f1', '#ec4899', '#22c55e'];

export default function DashboardTab() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/dashboard')
      .then(r => r.json())
      .then(d => { setData(d); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  const quartisData = data ? [
    { name: 'Q1', value: data.kills_quartis.q1_total },
    { name: 'Q2', value: data.kills_quartis.q2_total },
    { name: 'Q3', value: data.kills_quartis.q3_total },
  ] : [];

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 shadow-xl">
          <p className="text-white text-sm font-medium">{label}</p>
          <p className="text-indigo-400 text-sm">{payload[0].value}</p>
        </div>
      );
    }
    return null;
  };

  if (loading) {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {[1, 2, 3, 4].map(i => (
          <div key={i} className="rounded-2xl p-6 backdrop-blur-xl bg-slate-800/40 border border-slate-700/50 h-80 animate-pulse" />
        ))}
      </div>
    );
  }

  if (!data) return null;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="rounded-2xl p-6 backdrop-blur-xl bg-slate-800/40 border border-slate-700/50">
        <h3 className="text-lg font-bold text-white mb-4">Kills por Time (Top 10)</h3>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={data.kills_por_time}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,0.1)" />
            <XAxis dataKey="Time" tick={{ fill: '#94a3b8', fontSize: 12 }} axisLine={{ stroke: 'rgba(148,163,184,0.2)' }} />
            <YAxis tick={{ fill: '#94a3b8', fontSize: 12 }} axisLine={{ stroke: 'rgba(148,163,184,0.2)' }} />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="total" fill="rgba(99,102,241,0.7)" stroke="#6366f1" strokeWidth={1} radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="rounded-2xl p-6 backdrop-blur-xl bg-slate-800/40 border border-slate-700/50">
        <h3 className="text-lg font-bold text-white mb-4">Top Jogadores - Total de Kills</h3>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={data.top_jogadores} layout="vertical">
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,0.1)" />
            <XAxis type="number" tick={{ fill: '#94a3b8', fontSize: 12 }} axisLine={{ stroke: 'rgba(148,163,184,0.2)' }} />
            <YAxis dataKey="Jogador" type="category" tick={{ fill: '#94a3b8', fontSize: 12 }} axisLine={{ stroke: 'rgba(148,163,184,0.2)' }} width={80} />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="total" fill="rgba(139,92,246,0.7)" stroke="#8b5cf6" strokeWidth={1} radius={[0, 6, 6, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="rounded-2xl p-6 backdrop-blur-xl bg-slate-800/40 border border-slate-700/50">
        <h3 className="text-lg font-bold text-white mb-4">Distribuição de Colocações Q1</h3>
        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Pie
              data={data.distribuicao_q1}
              cx="40%"
              cy="50%"
              innerRadius={60}
              outerRadius={90}
              paddingAngle={4}
              dataKey="quantidade"
              nameKey="posicao"
              label={({ posicao, quantidade }) => `Pos ${posicao}: ${quantidade}`}
              labelLine={{ stroke: 'rgba(148,163,184,0.3)' }}
            >
              {data.distribuicao_q1.map((_, i) => (
                <Cell key={`cell-${i}`} fill={COLORS[i % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="rounded-2xl p-6 backdrop-blur-xl bg-slate-800/40 border border-slate-700/50">
        <h3 className="text-lg font-bold text-white mb-4">Kills por Quartil (Média)</h3>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={quartisData}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,0.1)" />
            <XAxis dataKey="name" tick={{ fill: '#94a3b8', fontSize: 12 }} axisLine={{ stroke: 'rgba(148,163,184,0.2)' }} />
            <YAxis tick={{ fill: '#94a3b8', fontSize: 12 }} axisLine={{ stroke: 'rgba(148,163,184,0.2)' }} />
            <Tooltip content={<CustomTooltip />} />
            <Line
              type="monotone"
              dataKey="value"
              stroke="#ec4899"
              strokeWidth={3}
              dot={{ fill: '#ec4899', stroke: '#fff', strokeWidth: 2, r: 6 }}
              activeDot={{ r: 8, fill: '#ec4899' }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
