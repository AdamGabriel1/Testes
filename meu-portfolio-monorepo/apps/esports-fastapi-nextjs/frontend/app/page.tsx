"use client";

import { useState, useEffect, useCallback } from "react";
import { apiFetch, type Colocacao, type Jogador, type Stats, type DashboardData } from "@/lib/utils";
import {
  Trophy, Crosshair, BarChart3, Users, User, CalendarCheck, Skull,
  Plus, Search, RefreshCw, Edit2, Trash2, Download, FileSpreadsheet,
  Gamepad2, Wifi, WifiOff, ChevronDown
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, LineChart, Line
} from "recharts";

// ─── Componentes UI ────────────────────────────────────────────────
function Card({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={cn("rounded-2xl border border-slate-700/50 bg-slate-800/70 backdrop-blur-sm", className)}>
      {children}
    </div>
  );
}

function Button({
  children, onClick, variant = "primary", className, type = "button", disabled
}: {
  children: React.ReactNode; onClick?: () => void; variant?: "primary" | "secondary" | "danger" | "ghost";
  className?: string; type?: "button" | "submit"; disabled?: boolean;
}) {
  const variants = {
    primary: "bg-gradient-to-r from-indigo-500 to-purple-600 text-white hover:shadow-lg hover:shadow-indigo-500/30",
    secondary: "bg-slate-700/50 text-slate-300 hover:bg-slate-700 border border-slate-600",
    danger: "bg-rose-500/20 text-rose-400 hover:bg-rose-500/30 border border-rose-500/30",
    ghost: "text-slate-400 hover:text-white hover:bg-slate-700/50",
  };
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={cn("px-4 py-2 rounded-xl font-medium transition-all flex items-center gap-2 disabled:opacity-50", variants[variant], className)}
    >
      {children}
    </button>
  );
}

function Input({ className, ...props }: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={cn(
        "w-full px-4 py-2.5 rounded-xl bg-slate-800/50 border border-slate-700 text-white placeholder-slate-500",
        "outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all",
        className
      )}
      {...props}
    />
  );
}

function Select({ className, ...props }: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select
      className={cn(
        "px-4 py-2.5 rounded-xl bg-slate-800/50 border border-slate-700 text-white outline-none",
        "focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all appearance-none",
        className
      )}
      {...props}
    />
  );
}

function Modal({ isOpen, onClose, title, children }: {
  isOpen: boolean; onClose: () => void; title: string; children: React.ReactNode;
}) {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-slate-800 border border-slate-700 rounded-2xl w-full max-w-lg p-6 animate-in fade-in slide-in-from-bottom-4 duration-300">
        <button onClick={onClose} className="absolute top-4 right-4 text-slate-400 hover:text-white">
          ✕
        </button>
        <h3 className="text-xl font-bold text-white mb-6">{title}</h3>
        {children}
      </div>
    </div>
  );
}

function Toast({ message, type, onClose }: { message: string; type: "success" | "error"; onClose: () => void }) {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-in slide-in-from-right duration-300">
      <div className={cn(
        "rounded-xl px-6 py-4 flex items-center gap-3 border",
        type === "success" ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400" : "bg-rose-500/10 border-rose-500/30 text-rose-400"
      )}>
        {type === "success" ? <Wifi size={20} /> : <WifiOff size={20} />}
        <span className="font-medium">{message}</span>
      </div>
    </div>
  );
}

// ─── Página Principal ──────────────────────────────────────────────
export default function HomePage() {
  const [activeTab, setActiveTab] = useState<"colocacoes" | "jogadores" | "dashboard">("colocacoes");
  const [apiOnline, setApiOnline] = useState(false);
  const [stats, setStats] = useState<Stats | null>(null);
  const [colocacoes, setColocacoes] = useState<Colocacao[]>([]);
  const [jogadores, setJogadores] = useState<Jogador[]>([]);
  const [dashboard, setDashboard] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [searchCol, setSearchCol] = useState("");
  const [searchJog, setSearchJog] = useState("");
  const [filterMesCol, setFilterMesCol] = useState("");
  const [filterMesJog, setFilterMesJog] = useState("");
  const [filterTimeJog, setFilterTimeJog] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState<"colocacoes" | "jogadores">("colocacoes");
  const [editingId, setEditingId] = useState<number | null>(null);
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);
  const [sortConfig, setSortConfig] = useState<{ key: string; asc: boolean } | null>(null);

  const meses = ["Janeiro","Fevereiro","Março","Abril","Maio","Junho","Julho","Agosto","Setembro","Outubro","Novembro","Dezembro"];

  const showToast = (message: string, type: "success" | "error" = "success") => {
    setToast({ message, type });
  };

  const testConnection = useCallback(async () => {
    try {
      await apiFetch("/api/stats");
      setApiOnline(true);
    } catch {
      setApiOnline(false);
    }
  }, []);

  const loadStats = useCallback(async () => {
    try {
      const data = await apiFetch("/api/stats");
      setStats(data);
      setApiOnline(true);
    } catch {
      setApiOnline(false);
    }
  }, []);

  const loadColocacoes = useCallback(async () => {
    setLoading(true);
    try {
      let url = "/api/colocacoes";
      const params = new URLSearchParams();
      if (searchCol) params.append("search", searchCol);
      if (filterMesCol) params.append("mes", filterMesCol);
      if (params.toString()) url += `?${params.toString()}`;
      const data = await apiFetch(url);
      setColocacoes(data);
    } catch (err) {
      showToast("Erro ao carregar colocações", "error");
    } finally {
      setLoading(false);
    }
  }, [searchCol, filterMesCol]);

  const loadJogadores = useCallback(async () => {
    setLoading(true);
    try {
      let url = "/api/jogadores";
      const params = new URLSearchParams();
      if (searchJog) params.append("search", searchJog);
      if (filterMesJog) params.append("mes", filterMesJog);
      if (filterTimeJog) params.append("time", filterTimeJog);
      if (params.toString()) url += `?${params.toString()}`;
      const data = await apiFetch(url);
      setJogadores(data);
    } catch {
      showToast("Erro ao carregar jogadores", "error");
    } finally {
      setLoading(false);
    }
  }, [searchJog, filterMesJog, filterTimeJog]);

  const loadDashboard = useCallback(async () => {
    try {
      const data = await apiFetch("/api/dashboard");
      setDashboard(data);
    } catch {
      showToast("Erro ao carregar dashboard", "error");
    }
  }, []);

  useEffect(() => {
    testConnection();
    loadStats();
    loadColocacoes();
    loadJogadores();
  }, []);

  useEffect(() => {
    if (activeTab === "dashboard") loadDashboard();
  }, [activeTab, loadDashboard]);

  useEffect(() => {
    const timer = setTimeout(() => loadColocacoes(), 300);
    return () => clearTimeout(timer);
  }, [searchCol, filterMesCol, loadColocacoes]);

  useEffect(() => {
    const timer = setTimeout(() => loadJogadores(), 300);
    return () => clearTimeout(timer);
  }, [searchJog, filterMesJog, filterTimeJog, loadJogadores]);

  const handleSort = (key: string) => {
    setSortConfig(prev => prev?.key === key ? { key, asc: !prev.asc } : { key, asc: true });
  };

  const sortedData = (data: any[]) => {
    if (!sortConfig) return data;
    return [...data].sort((a, b) => {
      const va = a[sortConfig.key];
      const vb = b[sortConfig.key];
      if (typeof va === "string") {
        return sortConfig.asc ? va.localeCompare(vb) : vb.localeCompare(va);
      }
      return sortConfig.asc ? (va > vb ? 1 : -1) : (va < vb ? 1 : -1);
    });
  };

  const openModal = (type: "colocacoes" | "jogadores", id?: number) => {
    setModalType(type);
    setEditingId(id || null);
    setModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const data: any = {
      Mes: formData.get("mes"),
      Dia: parseInt(formData.get("dia") as string),
      Time: formData.get("time"),
      Q1: parseInt(formData.get("q1") as string),
      Q2: parseInt(formData.get("q2") as string),
      Q3: parseInt(formData.get("q3") as string),
    };
    if (modalType === "jogadores") {
      data.Jogador = formData.get("jogador");
      data.Q1_Kills = data.Q1; data.Q2_Kills = data.Q2; data.Q3_Kills = data.Q3;
      delete data.Q1; delete data.Q2; delete data.Q3;
    } else {
      data.Q1_Pos = data.Q1; data.Q2_Pos = data.Q2; data.Q3_Pos = data.Q3;
      delete data.Q1; delete data.Q2; delete data.Q3;
    }

    try {
      if (editingId) {
        await apiFetch(`/api/${modalType}/${editingId}`, { method: "PUT", body: JSON.stringify(data) });
        showToast("Registro atualizado!");
      } else {
        await apiFetch(`/api/${modalType}`, { method: "POST", body: JSON.stringify(data) });
        showToast("Registro criado!");
      }
      setModalOpen(false);
      loadStats();
      modalType === "colocacoes" ? loadColocacoes() : loadJogadores();
    } catch {
      showToast("Erro ao salvar", "error");
    }
  };

  const handleDelete = async (type: "colocacoes" | "jogadores", id: number) => {
    if (!confirm("Tem certeza que deseja excluir?")) return;
    try {
      await apiFetch(`/api/${type}/${id}`, { method: "DELETE" });
      showToast("Registro excluído!");
      loadStats();
      type === "colocacoes" ? loadColocacoes() : loadJogadores();
    } catch {
      showToast("Erro ao excluir", "error");
    }
  };

  const exportFile = async (type: "sql" | "csv") => {
    try {
      const res = await fetch(`http://localhost:5000/api/export/${type}`);
      const text = await res.text();
      const blob = new Blob([text], { type: type === "csv" ? "text/csv" : "text/plain" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `esports_export.${type}`;
      a.click();
      URL.revokeObjectURL(url);
      showToast(`${type.toUpperCase()} exportado!`);
    } catch {
      showToast("Erro na exportação", "error");
    }
  };

  const posClass = (pos: number) =>
    pos === 1 ? "text-amber-400 font-bold" : pos <= 3 ? "text-emerald-400" : "text-slate-400";

  const timesUnicos = [...new Set(jogadores.map(j => j.Time))];

  // ─── Render ──────────────────────────────────────────────────────
  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-slate-700/50 bg-slate-800/90 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/30">
              <Gamepad2 className="text-white" size={20} />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">eSports Manager</h1>
              <p className="text-xs text-slate-400">FastAPI + Next.js</p>
            </div>
          </div>
          <div className="flex items-center gap-3 flex-wrap">
            <span className={cn(
              "px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1.5",
              apiOnline ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30" : "bg-rose-500/20 text-rose-400 border border-rose-500/30"
            )}>
              <span className={cn("w-2 h-2 rounded-full", apiOnline ? "bg-emerald-400" : "bg-rose-400")} />
              {apiOnline ? "Online" : "Offline"}
            </span>
            <Button variant="secondary" onClick={() => exportFile("sql")}>
              <Download size={16} /> SQL
            </Button>
            <Button variant="secondary" onClick={() => exportFile("csv")}>
              <FileSpreadsheet size={16} /> CSV
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-6 space-y-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: "Total de Times", value: stats?.total_times ?? "-", icon: Users, color: "indigo" },
            { label: "Total de Jogadores", value: stats?.total_jogadores ?? "-", icon: User, color: "purple" },
            { label: "Partidas Registradas", value: stats?.total_partidas ?? "-", icon: CalendarCheck, color: "pink" },
            { label: "Total de Kills", value: stats?.total_kills ?? "-", icon: Skull, color: "rose" },
          ].map((stat, i) => (
            <Card key={i} className="p-5 animate-in fade-in slide-in-from-bottom-2 duration-500" style={{ animationDelay: `${i * 100}ms` }}>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-400 text-sm">{stat.label}</p>
                  <p className="text-2xl font-bold text-white mt-1">{stat.value}</p>
                </div>
                <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center", `bg-${stat.color}-500/20`)}>
                  <stat.icon className={cn(`text-${stat.color}-400`)} size={24} />
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex gap-2 p-2 rounded-2xl bg-slate-800/70 border border-slate-700/50">
          {[
            { id: "colocacoes" as const, label: "Colocações", icon: Trophy },
            { id: "jogadores" as const, label: "Jogadores", icon: Crosshair },
            { id: "dashboard" as const, label: "Dashboard", icon: BarChart3 },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "flex-1 py-3 rounded-xl text-sm font-semibold transition-all flex items-center justify-center gap-2",
                activeTab === tab.id
                  ? "bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg shadow-indigo-500/30"
                  : "text-slate-400 hover:text-white hover:bg-slate-700/50"
              )}
            >
              <tab.icon size={16} /> {tab.label}
            </button>
          ))}
        </div>

        {/* ─── Colocações ─────────────────────────────────────────── */}
        {activeTab === "colocacoes" && (
          <Card className="p-6 animate-in fade-in duration-300">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
              <div>
                <h2 className="text-lg font-bold text-white">Colocações por Partida</h2>
                <p className="text-sm text-slate-400">Gerencie as posições dos times em cada quartil</p>
              </div>
              <Button onClick={() => openModal("colocacoes")}>
                <Plus size={18} /> Nova Colocação
              </Button>
            </div>
            <div className="flex gap-3 mb-4 flex-wrap">
              <div className="relative flex-1 min-w-[200px]">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
                <Input placeholder="Buscar time ou data..." value={searchCol} onChange={e => setSearchCol(e.target.value)} className="pl-10" />
              </div>
              <Select value={filterMesCol} onChange={e => setFilterMesCol(e.target.value)}>
                <option value="">Todos os Meses</option>
                {meses.map(m => <option key={m} value={m}>{m}</option>)}
              </Select>
              <Button variant="ghost" onClick={loadColocacoes}><RefreshCw size={16} /></Button>
            </div>
            <div className="overflow-x-auto rounded-xl border border-slate-700/50">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-slate-800/80 text-slate-300">
                    {["Mes", "Dia", "Time", "Q1 Pos", "Q2 Pos", "Q3 Pos", "Média", "Ações"].map(h => (
                      <th key={h} className="px-4 py-3 text-left font-semibold cursor-pointer hover:text-white" onClick={() => handleSort(h.replace(" Pos", "_Pos").replace(" ", ""))}>
                        {h} {h !== "Ações" && <span className="text-xs ml-1">⇅</span>}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-700/50">
                  {loading ? (
                    <tr><td colSpan={8} className="px-4 py-8 text-center text-slate-500">Carregando...</td></tr>
                  ) : sortedData(colocacoes).length === 0 ? (
                    <tr><td colSpan={8} className="px-4 py-8 text-center text-slate-500">Nenhum registro encontrado</td></tr>
                  ) : sortedData(colocacoes).map(c => {
                    const media = ((c.Q1_Pos + c.Q2_Pos + c.Q3_Pos) / 3).toFixed(1);
                    return (
                      <tr key={c.id} className="hover:bg-indigo-500/5 transition-colors">
                        <td className="px-4 py-3 text-slate-300">{c.Mes}</td>
                        <td className="px-4 py-3 text-slate-300">{c.Dia}</td>
                        <td className="px-4 py-3 text-white font-medium">{c.Time}</td>
                        <td className={cn("px-4 py-3 text-center", posClass(c.Q1_Pos))}>{c.Q1_Pos}</td>
                        <td className={cn("px-4 py-3 text-center", posClass(c.Q2_Pos))}>{c.Q2_Pos}</td>
                        <td className={cn("px-4 py-3 text-center", posClass(c.Q3_Pos))}>{c.Q3_Pos}</td>
                        <td className="px-4 py-3 text-center text-slate-300">{media}</td>
                        <td className="px-4 py-3 text-center">
                          <button onClick={() => openModal("colocacoes", c.id)} className="text-indigo-400 hover:text-indigo-300 mr-3"><Edit2 size={16} /></button>
                          <button onClick={() => handleDelete("colocacoes", c.id)} className="text-rose-400 hover:text-rose-300"><Trash2 size={16} /></button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </Card>
        )}

        {/* ─── Jogadores ──────────────────────────────────────────── */}
        {activeTab === "jogadores" && (
          <Card className="p-6 animate-in fade-in duration-300">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
              <div>
                <h2 className="text-lg font-bold text-white">Estatísticas dos Jogadores</h2>
                <p className="text-sm text-slate-400">Gerencie kills e performance dos jogadores</p>
              </div>
              <Button onClick={() => openModal("jogadores")}>
                <Plus size={18} /> Novo Jogador
              </Button>
            </div>
            <div className="flex gap-3 mb-4 flex-wrap">
              <div className="relative flex-1 min-w-[200px]">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
                <Input placeholder="Buscar jogador, time..." value={searchJog} onChange={e => setSearchJog(e.target.value)} className="pl-10" />
              </div>
              <Select value={filterMesJog} onChange={e => setFilterMesJog(e.target.value)}>
                <option value="">Todos os Meses</option>
                {meses.map(m => <option key={m} value={m}>{m}</option>)}
              </Select>
              <Select value={filterTimeJog} onChange={e => setFilterTimeJog(e.target.value)}>
                <option value="">Todos os Times</option>
                {timesUnicos.map(t => <option key={t} value={t}>{t}</option>)}
              </Select>
              <Button variant="ghost" onClick={loadJogadores}><RefreshCw size={16} /></Button>
            </div>
            <div className="overflow-x-auto rounded-xl border border-slate-700/50">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-slate-800/80 text-slate-300">
                    {["Mes", "Dia", "Time", "Jogador", "Q1 Kills", "Q2 Kills", "Q3 Kills", "Total", "Média", "Ações"].map(h => (
                      <th key={h} className="px-4 py-3 text-left font-semibold cursor-pointer hover:text-white" onClick={() => handleSort(h.replace(" Kills", "_Kills").replace(" ", ""))}>
                        {h} {h !== "Ações" && <span className="text-xs ml-1">⇅</span>}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-700/50">
                  {loading ? (
                    <tr><td colSpan={10} className="px-4 py-8 text-center text-slate-500">Carregando...</td></tr>
                  ) : sortedData(jogadores).length === 0 ? (
                    <tr><td colSpan={10} className="px-4 py-8 text-center text-slate-500">Nenhum registro encontrado</td></tr>
                  ) : sortedData(jogadores).map(j => {
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
                          <button onClick={() => openModal("jogadores", j.id)} className="text-indigo-400 hover:text-indigo-300 mr-3"><Edit2 size={16} /></button>
                          <button onClick={() => handleDelete("jogadores", j.id)} className="text-rose-400 hover:text-rose-300"><Trash2 size={16} /></button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </Card>
        )}

        {/* ─── Dashboard ──────────────────────────────────────────── */}
        {activeTab === "dashboard" && dashboard && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 animate-in fade-in duration-500">
            <Card className="p-6">
              <h3 className="text-lg font-bold text-white mb-4">Kills por Time (Top 10)</h3>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={dashboard.kills_por_time}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                  <XAxis dataKey="Time" tick={{ fill: "#94a3b8" }} />
                  <YAxis tick={{ fill: "#94a3b8" }} />
                  <Tooltip contentStyle={{ backgroundColor: "#1e293b", border: "1px solid #334155", borderRadius: "8px" }} />
                  <Bar dataKey="total" fill="#6366f1" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </Card>
            <Card className="p-6">
              <h3 className="text-lg font-bold text-white mb-4">Top Jogadores - Total de Kills</h3>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={dashboard.top_jogadores} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                  <XAxis type="number" tick={{ fill: "#94a3b8" }} />
                  <YAxis dataKey="Jogador" type="category" tick={{ fill: "#94a3b8" }} width={100} />
                  <Tooltip contentStyle={{ backgroundColor: "#1e293b", border: "1px solid #334155", borderRadius: "8px" }} />
                  <Bar dataKey="total" fill="#8b5cf6" radius={[0, 6, 6, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </Card>
            <Card className="p-6">
              <h3 className="text-lg font-bold text-white mb-4">Distribuição de Colocações Q1</h3>
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={dashboard.distribuicao_q1}
                    dataKey="quantidade"
                    nameKey="posicao"
                    cx="50%" cy="50%"
                    innerRadius={60}
                    outerRadius={90}
                    paddingAngle={4}
                  >
                    {dashboard.distribuicao_q1.map((_, i) => (
                      <Cell key={i} fill={["#fbbf24", "#34d399", "#60a5fa", "#a78bfa", "#f472b6", "#fb923c", "#94a3b8"][i % 7]} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ backgroundColor: "#1e293b", border: "1px solid #334155", borderRadius: "8px" }} />
                </PieChart>
              </ResponsiveContainer>
            </Card>
            <Card className="p-6">
              <h3 className="text-lg font-bold text-white mb-4">Kills por Quartil (Média)</h3>
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={[
                  { name: "Q1", value: dashboard.kills_quartis.q1_total },
                  { name: "Q2", value: dashboard.kills_quartis.q2_total },
                  { name: "Q3", value: dashboard.kills_quartis.q3_total },
                ]}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                  <XAxis dataKey="name" tick={{ fill: "#94a3b8" }} />
                  <YAxis tick={{ fill: "#94a3b8" }} />
                  <Tooltip contentStyle={{ backgroundColor: "#1e293b", border: "1px solid #334155", borderRadius: "8px" }} />
                  <Line type="monotone" dataKey="value" stroke="#ec4899" strokeWidth={3} dot={{ fill: "#ec4899", strokeWidth: 2, r: 6 }} />
                </LineChart>
              </ResponsiveContainer>
            </Card>
          </div>
        )}
      </main>

      {/* Modal */}
      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editingId ? "Editar Registro" : "Novo Registro"}
      >
        <form onSubmit={handleSave} className="space-y-4">
          <input type="hidden" name="id" value={editingId || ""} />
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-400 mb-1">Mês</label>
              <Select name="mes" required defaultValue={editingId ? undefined : "Maio"}>
                {meses.map(m => <option key={m} value={m}>{m}</option>)}
              </Select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-400 mb-1">Dia</label>
              <Input name="dia" type="number" min={1} max={31} required />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-400 mb-1">Time</label>
            <Input name="time" required />
          </div>
          {modalType === "jogadores" && (
            <div>
              <label className="block text-sm font-medium text-slate-400 mb-1">Jogador</label>
              <Input name="jogador" required />
            </div>
          )}
          <div className="grid grid-cols-3 gap-4">
            <div><label className="block text-sm font-medium text-slate-400 mb-1">Q1</label><Input name="q1" type="number" min={0} required className="text-center" /></div>
            <div><label className="block text-sm font-medium text-slate-400 mb-1">Q2</label><Input name="q2" type="number" min={0} required className="text-center" /></div>
            <div><label className="block text-sm font-medium text-slate-400 mb-1">Q3</label><Input name="q3" type="number" min={0} required className="text-center" /></div>
          </div>
          <div className="flex gap-3 pt-4">
            <Button variant="secondary" onClick={() => setModalOpen(false)} className="flex-1">Cancelar</Button>
            <Button type="submit" className="flex-1">Salvar</Button>
          </div>
        </form>
      </Modal>

      {/* Toast */}
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
    </div>
  );
}
