'use client';

import { Gamepad2, Download, FileSpreadsheet, RefreshCw } from 'lucide-react';

interface HeaderProps {
  isOnline: boolean;
  onRefresh: () => void;
}

export default function Header({ isOnline, onRefresh }: HeaderProps) {
  const handleExportSQL = async () => {
    try {
      const res = await fetch('/api/export/sql');
      const text = await res.text();
      const blob = new Blob([text], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'esports_export.sql';
      a.click();
      URL.revokeObjectURL(url);
    } catch {
      alert('Erro ao exportar SQL');
    }
  };

  const handleExportCSV = async () => {
    try {
      const res = await fetch('/api/export/csv');
      const text = await res.text();
      const blob = new Blob([text], { type: 'text/csv' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'esports_export.csv';
      a.click();
      URL.revokeObjectURL(url);
    } catch {
      alert('Erro ao exportar CSV');
    }
  };

  return (
    <header className="sticky top-0 z-50 border-b border-slate-700/50 backdrop-blur-xl bg-slate-900/90">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between flex-wrap gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/30">
            <Gamepad2 className="text-white w-5 h-5" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-white" style={{ textShadow: '0 0 20px rgba(99,102,241,0.5)' }}>
              eSports Manager
            </h1>
            <p className="text-xs text-slate-400">Next.js + Prisma + SQLite</p>
          </div>
        </div>
        <div className="flex items-center gap-3 flex-wrap">
          <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${
            isOnline
              ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'
              : 'bg-rose-500/20 text-rose-400 border-rose-500/30'
          }`}>
            <span className={`inline-block w-2 h-2 rounded-full mr-1 ${isOnline ? 'bg-emerald-400' : 'bg-rose-400'}`}></span>
            {isOnline ? 'Online' : 'Offline'}
          </span>
          <button
            onClick={onRefresh}
            className="px-3 py-2 rounded-lg bg-slate-800/50 border border-slate-700 text-slate-400 hover:text-white transition-all"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
          <button
            onClick={handleExportSQL}
            className="px-4 py-2 rounded-lg bg-emerald-600/20 text-emerald-400 border border-emerald-500/30 hover:bg-emerald-600/30 transition-all text-sm font-medium flex items-center gap-2"
          >
            <Download className="w-4 h-4" /> SQL
          </button>
          <button
            onClick={handleExportCSV}
            className="px-4 py-2 rounded-lg bg-blue-600/20 text-blue-400 border border-blue-500/30 hover:bg-blue-600/30 transition-all text-sm font-medium flex items-center gap-2"
          >
            <FileSpreadsheet className="w-4 h-4" /> CSV
          </button>
        </div>
      </div>
    </header>
  );
}
