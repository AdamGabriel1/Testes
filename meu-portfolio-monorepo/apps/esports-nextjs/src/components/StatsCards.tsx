'use client';

import { Users, User, CalendarCheck, Skull } from 'lucide-react';

interface Stats {
  total_times: number;
  total_jogadores: number;
  total_partidas: number;
  total_kills: number;
}

interface StatsCardsProps {
  stats: Stats | null;
}

export default function StatsCards({ stats }: StatsCardsProps) {
  const cards = [
    { label: 'Total de Times', value: stats?.total_times ?? '-', icon: Users, color: 'indigo' },
    { label: 'Total de Jogadores', value: stats?.total_jogadores ?? '-', icon: User, color: 'purple' },
    { label: 'Partidas Registradas', value: stats?.total_partidas ?? '-', icon: CalendarCheck, color: 'pink' },
    { label: 'Total de Kills', value: stats?.total_kills ?? '-', icon: Skull, color: 'rose' },
  ];

  const colorMap: Record<string, { bg: string; icon: string }> = {
    indigo: { bg: 'bg-indigo-500/20', icon: 'text-indigo-400' },
    purple: { bg: 'bg-purple-500/20', icon: 'text-purple-400' },
    pink: { bg: 'bg-pink-500/20', icon: 'text-pink-400' },
    rose: { bg: 'bg-rose-500/20', icon: 'text-rose-400' },
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      {cards.map((card, i) => {
        const Icon = card.icon;
        const colors = colorMap[card.color];
        return (
          <div
            key={card.label}
            className="rounded-2xl p-5 animate-fade-in"
            style={{
              background: 'linear-gradient(135deg, rgba(99,102,241,0.1), rgba(139,92,246,0.1))',
              border: '1px solid rgba(99,102,241,0.2)',
              animationDelay: `${i * 0.1}s`,
            }}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm">{card.label}</p>
                <p className="text-2xl font-bold text-white mt-1">{card.value}</p>
              </div>
              <div className={`w-12 h-12 rounded-xl ${colors.bg} flex items-center justify-center`}>
                <Icon className={`${colors.icon} w-6 h-6`} />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
