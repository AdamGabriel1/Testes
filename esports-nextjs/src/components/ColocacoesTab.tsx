'use client';

import { useState, useCallback } from 'react';
import { Search, Plus, RefreshCw, Pencil, Trash2 } from 'lucide-react';
import Modal from './Modal';

interface Colocacao {
  id: number;
  Mes: string;
  Dia: number;
  Time: string;
  Q1_Pos: number;
  Q2_Pos: number;
  Q3_Pos: number;
}

interface ColocacoesTabProps {
  data: Colocacao[];
  loading: boolean;
  onRefresh: () => void;
  onSave: (data: any, id?: number) => Promise<void>;
  onDelete: (id: number) => Promise<void>;
  meses: string[];
}

const mesesOptions = [
  'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
  'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
];

export default function ColocacoesTab({ data, loading, onRefresh, onSave, onDelete, meses }: ColocacoesTabProps) {
  const [search, setSearch] = useState('');
  const [filterMes, setFilterMes] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [sortField, setSortField] = useState<string | null>(null);
  const [sortAsc, setSortAsc] = useState(true);

  const [form, setForm] = useState({
    Mes: 'Maio',
    Dia: 1,
    Time: '',
    Q1_Pos: 0,
    Q2_Pos: 0,
    Q3_Pos: 0,
  });

  const filtered = data.filter(c => {
    const matchSearch = !search || c.Time.toLowerCase().includes(search.toLowerCase()) || c.Mes.toLowerCase().includes(search.toLowerCase());
    const matchMes = !filterMes || c.Mes === filterMes;
    return matchSearch && matchMes;
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
    setForm({ Mes: 'Maio', Dia: 1, Time: '', Q1_Pos: 0, Q2_Pos: 0, Q3_Pos: 0 });
    setModalOpen(true);
  };

  const openEdit = (c: Colocacao) => {
    setEditingId(c.id);
    setForm({
      Mes: c.Mes,
      Dia: c.Dia,
      Time: c.Time,
      Q1_Pos: c.Q1_Pos,
      Q2_Pos: c.Q2_Pos,
      Q3_Pos: c.Q3_Pos,
    });
    setModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSave(form, editingId ?? undefined);
    setModalOpen(false);
  };

  const posClass = (pos: number) => {
    if (pos === 1) return 'text-yellow-400 font-bold';
    if (pos <= 3) return 'text-emerald-400';
    return 'text-slate-400';
  };

  return (
    <div className="space-y-4">
      <div className="rounded-2xl p-6 backdrop-blur-xl bg-slate-800/40 border border-slate-700/50">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div>
            <h2 className="text-lg font-bold text-white">Colocações por Partida</h2>
            <p className="text-sm text-slate-400">Gerencie as posições dos times em cada quartil</p>
          </div>
          <button
            onClick={openNew}
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold hover:shadow-lg hover:shadow-indigo-500/30 transition-all flex items-center gap-2"
          >
            <Plus className="w-4 h-4" /> Nova Colocação
          </button>
        </div>

        <div className="flex gap-3 mb-4 flex-wrap">
          <div className="relative flex-1 max-w-xs">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 w-4 h-4" />
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Buscar time ou data..."
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
                <th className="px-4 py-3 text-center font-semibold">Q1 Pos</th>
                <th className="px-4 py-3 text-center font-semibold">Q2 Pos</th>
                <th className="px-4 py-3 text-center font-semibold">Q3 Pos</th>
                <th className="px-4 py-3 text-center font-semibold">Média</th>
                <th className="px-4 py-3 text-center font-semibold">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700/50">
              {loading ? (
                <tr><td colSpan={8} className="px-4 py-8 text-center text-slate-500">Carregando...</td></tr>
              ) : sorted.length === 0 ? (
                <tr><td colSpan={8} className="px-4 py-8 text-center text-slate-500">Nenhum registro encontrado</td></tr>
              ) : (
                sorted.map(c => {
                  const media = ((c.Q1_Pos + c.Q2_Pos + c.Q3_Pos) / 3).toFixed(1);
                  return (
                    <tr key={c.id} className="hover:bg-indigo-500/5 transition-colors">
                      <td className="px-4 py-3 text-slate-300">{c.Mes}</td>
                      <td className="px-4 py-3 text-slate-300">{c.Dia}</td>
                      <td className="px-4 py-3 text-white font-medium">{c.Time}</td>
                      <td className={`px-4 py-3 text-center ${posClass(c.Q1_Pos)}`}>{c.Q1_Pos}</td>
                      <td className={`px-4 py-3 text-center ${posClass(c.Q2_Pos)}`}>{c.Q2_Pos}</td>
                      <td className={`px-4 py-3 text-center ${posClass(c.Q3_Pos)}`}>{c.Q3_Pos}</td>
                      <td className="px-4 py-3 text-center text-slate-300">{media}</td>
                      <td className="px-4 py-3 text-center">
                        <button onClick={() => openEdit(c)} className="text-indigo-400 hover:text-indigo-300 mr-2 transition-colors">
                          <Pencil className="w-4 h-4 inline" />
                        </button>
                        <button onClick={() => onDelete(c.id)} className="text-rose-400 hover:text-rose-300 transition-colors">
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

      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title={editingId ? 'Editar Colocação' : 'Nova Colocação'}>
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
          <div className="grid grid-cols-3 gap-4">
            {['Q1_Pos', 'Q2_Pos', 'Q3_Pos'].map((field) => (
              <div key={field}>
                <label className="block text-sm font-medium text-slate-400 mb-1">{field.replace('_Pos', '')}</label>
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
