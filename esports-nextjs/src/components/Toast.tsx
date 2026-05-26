'use client';

import { CheckCircle, XCircle } from 'lucide-react';

interface ToastProps {
  message: string;
  type: 'success' | 'error';
  isVisible: boolean;
}

export default function Toast({ message, type, isVisible }: ToastProps) {
  return (
    <div
      className={`fixed bottom-6 right-6 z-50 transform transition-all duration-300 ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
      }`}
    >
      <div
        className={`rounded-xl px-6 py-4 flex items-center gap-3 border backdrop-blur-xl ${
          type === 'success'
            ? 'bg-slate-900/95 border-emerald-500/30'
            : 'bg-slate-900/95 border-rose-500/30'
        }`}
      >
        {type === 'success' ? (
          <CheckCircle className="text-emerald-400 w-5 h-5" />
        ) : (
          <XCircle className="text-rose-400 w-5 h-5" />
        )}
        <span className="text-white font-medium">{message}</span>
      </div>
    </div>
  );
}
