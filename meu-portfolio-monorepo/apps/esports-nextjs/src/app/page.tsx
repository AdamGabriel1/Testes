'use client';

import { useState, useEffect, useCallback } from 'react';
import { Trophy, Crosshair, ChartPie } from 'lucide-react';
import Header from '@/components/Header';
import StatsCards from '@/components/StatsCards';
import ColocacoesTab from '@/components/ColocacoesTab';
import JogadoresTab from '@/components/JogadoresTab';
import DashboardTab from '@/components/DashboardTab';
import TabButton from '@/components/TabButton';
import Toast from '@/components/Toast';

interface Stats {
  total_times: number;
  total_jogadores: number;
  total_partidas: number;
  total_kills: number;
}

interface Colocacao {
  id: number;
  Mes: string;
  Dia: number;
  Time: string;
  Q1_Pos: number;
  Q2_Pos: number;
  Q3_Pos: number;
}

interface Jogador {
  id: number;
  Mes: string;
  Dia: number;
  Time: string;
  Jogador: string;
  Q1_Kills: number;
  Q2_Kills: number;
  Q3_Kills: number;
}

export default function Home() {
  const [activeTab, setActiveTab] = useState<'colocacoes' | 'jogadores' | 'dashboard'>('colocacoes');
  const [stats, setStats] = useState<Stats | null>(null);
  const [colocacoes, setColocacoes] = useState<Colocacao[]>([]);
  const [jogadores, setJogadores] = useState<Jogador[]>([]);
  const [loading, setLoading] = useState({ stats: true, colocacoes: true, jogadores: true });
  const [isOnline, setIsOnline] = useState(true);
  const [toast, setToast] = useState({ message: '', type: 'success' as 'success' | 'error', visible: false });

  const showToast = (message: string, type: 'success' | 'error' = 'success') => {
    setToast({ message, type, visible: true });
    setTimeout(() => setToast(prev => ({ ...prev, visible: false })), 3000);
  };

  const loadStats = useCallback(async () => {
    try {
      const res = await fetch('/api/stats');
      if (!res.ok) throw new Error();
      const data = await res.json();
      setStats(data);
      setIsOnline(true);
    } catch {
      setIsOnline(false);
    } finally {
      setLoading(prev => ({ ...prev, stats: false }));
    }
  }, []);

  const loadColocacoes = useCallback(async () => {
    try {
      const res = await fetch('/api/colocacoes');
      if (!res.ok) throw new Error();
      const data = await res.json();
      setColocacoes(data);
    } catch {
      setIsOnline(false);
    } finally {
      setLoading(prev => ({ ...prev, colocacoes: false }));
    }
  }, []);

  const loadJogadores = useCallback(async () => {
    try {
      const res = await fetch('/api/jogadores');
      if (!res.ok) throw new Error();
      const data = await res.json();
      setJogadores(data);
    } catch {
      setIsOnline(false);
    } finally {
      setLoading(prev => ({ ...prev, jogadores: false }));
    }
  }, []);

  const refreshAll = useCallback(async () => {
    setLoading({ stats: true, colocacoes: true, jogadores: true });
    await Promise.all([loadStats(), loadColocacoes(), loadJogadores()]);
    showToast('Dados atualizados!');
  }, [loadStats, loadColocacoes, loadJogadores]);

  useEffect(() => {
    refreshAll();
  }, [refreshAll]);

  const saveColocacao = async (data: any, id?: number) => {
    try {
      const url = id ? `/api/colocacoes/${id}` : '/api/colocacoes';
      const method = id ? 'PUT' : 'POST';
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error();
      showToast(id ? 'Colocação atualizada!' : 'Colocação criada!');
      await Promise.all([loadStats(), loadColocacoes()]);
    } catch {
      showToast('Erro ao salvar colocação', 'error');
    }
  };

  const deleteColocacao = async (id: number) => {
    if (!confirm('Tem certeza que deseja excluir?')) return;
    try {
      const res = await fetch(`/api/colocacoes/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error();
      showToast('Colocação excluída!');
      await Promise.all([loadStats(), loadColocacoes()]);
    } catch {
      showToast('Erro ao excluir', 'error');
    }
  };

  const saveJogador = async (data: any, id?: number) => {
    try {
      const url = id ? `/api/jogadores/${id}` : '/api/jogadores';
      const method = id ? 'PUT' : 'POST';
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error();
      showToast(id ? 'Jogador atualizado!' : 'Jogador criado!');
      await Promise.all([loadStats(), loadJogadores()]);
    } catch {
      showToast('Erro ao salvar jogador', 'error');
    }
  };

  const deleteJogador = async (id: number) => {
    if (!confirm('Tem certeza que deseja excluir?')) return;
    try {
      const res = await fetch(`/api/jogadores/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error();
      showToast('Jogador excluído!');
      await Promise.all([loadStats(), loadJogadores()]);
    } catch {
      showToast('Erro ao excluir', 'error');
    }
  };

  const meses = [...new Set([...colocacoes.map(c => c.Mes), ...jogadores.map(j => j.Mes)])];
  const times = [...new Set(jogadores.map(j => j.Time))];

  return (
    <div className="min-h-screen bg-[#0f172a] text-[#e2e8f0]">
      <Header isOnline={isOnline} onRefresh={refreshAll} />

      <main className="max-w-7xl mx-auto px-4 py-6 space-y-6">
        <StatsCards stats={stats} />

        <div className="rounded-2xl p-2 backdrop-blur-xl bg-slate-800/40 border border-slate-700/50 flex gap-2">
          <TabButton
            active={activeTab === 'colocacoes'}
            onClick={() => setActiveTab('colocacoes')}
            icon={<Trophy className="w-4 h-4" />}
            label="Colocações"
          />
          <TabButton
            active={activeTab === 'jogadores'}
            onClick={() => setActiveTab('jogadores')}
            icon={<Crosshair className="w-4 h-4" />}
            label="Jogadores"
          />
          <TabButton
            active={activeTab === 'dashboard'}
            onClick={() => setActiveTab('dashboard')}
            icon={<ChartPie className="w-4 h-4" />}
            label="Dashboard"
          />
        </div>

        {activeTab === 'colocacoes' && (
          <ColocacoesTab
            data={colocacoes}
            loading={loading.colocacoes}
            onRefresh={loadColocacoes}
            onSave={saveColocacao}
            onDelete={deleteColocacao}
            meses={meses}
          />
        )}

        {activeTab === 'jogadores' && (
          <JogadoresTab
            data={jogadores}
            loading={loading.jogadores}
            onRefresh={loadJogadores}
            onSave={saveJogador}
            onDelete={deleteJogador}
            meses={meses}
            times={times}
          />
        )}

        {activeTab === 'dashboard' && <DashboardTab />}
      </main>

      <Toast message={toast.message} type={toast.type} isVisible={toast.visible} />
    </div>
  );
}
