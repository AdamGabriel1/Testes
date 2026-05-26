'use client';

import { cn } from '@/lib/utils';

interface TabButtonProps {
  active: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
}

export default function TabButton({ active, onClick, icon, label }: TabButtonProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'flex-1 py-3 rounded-xl text-sm font-semibold transition-all flex items-center justify-center gap-2',
        active
          ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg shadow-indigo-500/40'
          : 'text-slate-400 hover:text-white hover:bg-slate-700/50'
      )}
    >
      {icon}
      {label}
    </button>
  );
}
