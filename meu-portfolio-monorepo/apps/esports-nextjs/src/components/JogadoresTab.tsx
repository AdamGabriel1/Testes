'use client';

import { useState } from 'react';
import { Search, Plus, RefreshCw, Pencil, Trash2 } from 'lucide-react';
import Modal from './Modal';

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

interface JogadoresTabProps {
  data: Jogador[];
  loading: boolean;
  onRefresh: () => void;
  onSave: (data: any, id?: number) => Promise<void>;
  onDelete: (id: number) => Promise<void>;
  meses: string[];
  times: string[];
}

const mesesOptions = [
  'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
  'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
];

export default function JogadoresTab({ data, loading, onRefresh, onSave, onDelete, meses, times }: JogadoresTabProps) {
  const [search, setSearch] = useState('');
  const [filterMes, setFilterMes] = useState('');
  const [filterTime, setFilterTime] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [sortField, setSortField] = useState<string | null>(null);
  const [sortAsc, setSortAsc] = useState(true);

  const [form, setForm] = useState({
    Mes: 'Maio',
    Dia: 1,
    Time: '',
    Jogador: '',
    Q1_Kills: 0,
    Q2_Kills: 0,
    Q3_Kills: 0,
  });

  const filtered = data.filter(j => {
    const matchSearch = !search || 
      j.Jogador.toLowerCase().includes(search.toLowerCase()) ||
      j.Time.toLowerCase().includes(search.toLowerCase()) ||
      j.Mes.toLowerCase().includes(search.toLowerCase());
    const matchMes = !filterMes || j.Mes === filterMes;
    const matchTime = !filterTime || j.Time === filterTime;
    return matchSearch && matchMes && matchTime;
  });

  const sorted = [...filtered].sort((a, b) => {
    if (!sortField) return 0;
    const va = (a as any)[sortField];
    const vb = (b as any)[sortField];
    if (typeof va === 'string') {
      return sortAsc ? va.localeCompare(vb) : vb.localeCompare(va);
    }
    return sortAsc ? va - vb : vb - va;
  });

  const handleSort = (field: string) => {
    if (sortField === field) setSortAsc(!sortAsc);
    else { setSortField(field); setSortAsc(true); }
  };

  const openNew = () => {
    setEditingId(null);
    setForm({ Mes: 'Maio', Dia: 1, Time: '', Jogador: '', Q1_Kills: 0, Q2_Kills: 0, Q3_Kills: 0 });
    setModalOpen(true);
  };

  const openEdit = (j: Jogador) => {
    setEditingId(j.id);
    setForm({
      Mes: j.Mes,
      Dia: j.Dia,
      Time: j.Time,
      Jogador: j.Jogador,
      Q1_Kills: j.Q1_Kills,
      Q2_Kills: j.Q2_Kills,
      Q3_Kills: j.Q3_Kills,
    });
    setModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSave(form, editingId ?? undefined);
    setModalOpen(false);
  };

  return (
    <div className="space-y-4">
      <div className="rounded-2xl p-6 backdrop-blur-xl bg-slate-800/40 border border-slate-700/50">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div>
            <h2 className="text-lg font-bold text-white">Estatísticas dos Jogadores</h2>
            <p className="text-sm text-slate-400">Gerencie kills e performance dos jogadores</p>
          </div>
          <button
            onClick={openNew}
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold hover:shadow-lg hover:shadow-indigo-500/30 transition-all flex items-center gap-2"
          >
            <Plus className="w-4 h-4" /> Novo Jogador
          </button>
        </div>

        <div className="flex gap-3 mb-4 flex-wrap">
          <div className="relative flex-1 min-w-[200px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 w-4 h-4" />
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Buscar jogador, time..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-800/50 border border-slate-700 text-white placeholder-slate-500 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/30 transition-all"
            />
          </div>
          <select
            value={filterMes}
            onChange={e => setFilterMes(e.target.value)}
            className="px-4 py-2.5 rounded-xl bg-slate-800/50 border border-slate-700 text-white outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/30"
          >
            <option value="">Todos os Meses</option>
            {meses.map(m => <option key={m} value={m}>{m}</option>)}
          </select>
          <select
            value={filterTime}
            onChange={e => setFilterTime(e.target.value)}
            className="px-4 py-2.5 rounded-xl bg-slate-800/50 border border-slate-700 text-white outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/30"
          >
            <option value="">Todos os Times</option>
            {times.map(t => <option key={t} value={t}>{t}</option>)}
          </select>
          <button
            onClick={onRefresh}
            className="px-3 py-2.5 rounded-xl bg-slate-800/50 border border-slate-700 text-slate-400 hover:text-white transition-all"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>

        <div className="overflow-x-auto rounded-xl border border-slate-700/50">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-slate-800/80 text-slate-300">
                <th className="px-4 py-3 text-left font-semibold cursor-pointer hover:text-white" onClick={() => handleSort('Mes')}>Mês</th>
                <th className="px-4 py-3 text-left font-semibold cursor-pointer hover:text-white" onClick={() => handleSort('Dia')}>Dia</th>
                <th className="px-4 py-3 text-left font-semibold cursor-pointer hover:text-white" onClick={() => handleSort('Time')}>Time</th>
                <th className="px-4 py-3 text-left font-semibold cursor-pointer hover:text-white" onClick={() => handleSort('Jogador')}>Jogador</th>
                <th className="px-4 py-3 text-center font-semibold">Q1 Kills</th>
                <th className="px-4 py-3 text-center font-semibold">Q2 Kills</th>
                <th className="px-4 py-3 text-center font-semibold">Q3 Kills</th>
                <th className="px-4 py-3 text-center font-semibold">Total</th>
                <th className="px-4 py-3 text-center font-semibold">Média</th>
                <th className="px-4 py-3 text-center font-semibold">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700/50">
              {loading ? (
                <tr><td colSpan={10} className="px-4 py-8 text-center text-slate-500">Carregando...</td></tr>
              ) : sorted.length === 0 ? (
                <tr><td colSpan={10} className="px-4 py-8 text-center text-slate-500">Nenhum registro encontrado</td></tr>
              ) : (
                sorted.map(j => {
                  const total = j.Q1_Kills + j.Q2_Kills + j.Q3_Kills;
                  const media = (total / 3).toFixed(1);
                  return (
                    <tr key={j.id} className="hover:bg-indigo-500/5 transition-colors">
                      <td className="px-4 py-3 text-slate-300">{j.Mes}</td>
                      <td className="px-4 py-3 text-slate-300">{j.Dia}</td>
                      <td className="px-4 py-3 text-white font-medium">{j.Time}</td>
                      <td className="px-4 py-3 text-slate-200">{j.Jogador}</td>
                      <td className="px-4 py-3 text-center text-slate-300">{j.Q1_Kills}</td>
                      <td className="px-4 py-3 text-center text-slate-300">{j.Q2_Kills}</td>
                      <td className="px-4 py-3 text-center text-slate-300">{j.Q3_Kills}</td>
                      <td className="px-4 py-3 text-center text-white font-bold">{total}</td>
                      <td className="px-4 py-3 text-center text-slate-400">{media}</td>
                      <td className="px-4 py-3 text-center">
                        <button onClick={() => openEdit(j)} className="text-indigo-400 hover:text-indigo-300 mr-2 transition-colors">
                          <Pencil className="w-4 h-4 inline" />
                        </button>
                        <button onClick={() => onDelete(j.id)} className="text-rose-400 hover:text-rose-300 transition-colors">
                          <Trash2 className="w-4 h-4 inline" />
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title={editingId ? 'Editar Jogador' : 'Novo Jogador'}>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-400 mb-1">Mês</label>
              <select
                value={form.Mes}
                onChange={e => setForm({ ...form, Mes: e.target.value })}
                required
                className="w-full px-4 py-2.5 rounded-xl bg-slate-800/50 border border-slate-700 text-white outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/30"
              >
                {mesesOptions.map(m => <option key={m} value={m}>{m}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-400 mb-1">Dia</label>
              <input
                type="number" min={1} max={31}
                value={form.Dia}
                onChange={e => setForm({ ...form, Dia: parseInt(e.target.value) || 1 })}
                required
                className="w-full px-4 py-2.5 rounded-xl bg-slate-800/50 border border-slate-700 text-white outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/30"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-400 mb-1">Time</label>
            <input
              type="text"
              value={form.Time}
              onChange={e => setForm({ ...form, Time: e.target.value })}
              required
              className="w-full px-4 py-2.5 rounded-xl bg-slate-800/50 border border-slate-700 text-white outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/30"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-400 mb-1">Jogador</label>
            <input
              type="text"
              value={form.Jogador}
              onChange={e => setForm({ ...form, Jogador: e.target.value })}
              required
              className="w-full px-4 py-2.5 rounded-xl bg-slate-800/50 border border-slate-700 text-white outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/30"
            />
          </div>
          <div className="grid grid-cols-3 gap-4">
            {['Q1_Kills', 'Q2_Kills', 'Q3_Kills'].map((field) => (
              <div key={field}>
                <label className="block text-sm font-medium text-slate-400 mb-1">{field.replace('_Kills', '')}</label>
                <input
                  type="number" min={0}
                  value={(form as any)[field]}
                  onChange={e => setForm({ ...form, [field]: parseInt(e.target.value) || 0 })}
                  required
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-800/50 border border-slate-700 text-white outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/30 text-center"
                />
              </div>
            ))}
          </div>
          <div className="flex gap-3 pt-4">
            <button type="button" onClick={() => setModalOpen(false)} className="flex-1 py-2.5 rounded-xl border border-slate-600 text-slate-300 hover:bg-slate-700/50 transition-all font-medium">
              Cancelar
            </button>
            <button type="submit" className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold hover:shadow-lg hover:shadow-indigo-500/30 transition-all">
              Salvar
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
