
import React from 'react';

export const Toast: React.FC<{ message: string; type: 'success' | 'error' | 'warning' }> = ({ message, type }) => {
  const colors = {
    success: 'from-gold to-gold-dark border-gold-light text-slate-950',
    error: 'from-red-600 to-red-800 border-red-400 text-white',
    warning: 'from-amber-500 to-amber-700 border-amber-300 text-white',
  };

  return (
    <div className="fixed top-24 right-6 z-[100] animate-slide-in">
      <div className={`px-6 py-3 rounded-xl shadow-2xl border-2 bg-gradient-to-r flex items-center gap-3 ${colors[type]}`}>
        <span className="text-xl">
          {type === 'success' ? '✅' : type === 'error' ? '❌' : '⚠️'}
        </span>
        <span className="font-bold text-sm tracking-tight">{message}</span>
      </div>
    </div>
  );
};

export const Loader: React.FC = () => (
  <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-slate-950/80 backdrop-blur-md">
    <div className="w-16 h-16 border-4 border-gold/20 border-t-gold rounded-full animate-spin mb-6" />
    <p className="text-gold font-black tracking-[0.3em] uppercase animate-pulse">Memproses...</p>
  </div>
);
