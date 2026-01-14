
import React, { useState, useMemo } from 'react';
import { Report, UNITS, ANJURAN_LIST } from '../types';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

interface AnalyticsProps {
  reports: Report[];
}

const Analytics: React.FC<AnalyticsProps> = ({ reports }) => {
  const [selectedUnit, setSelectedUnit] = useState('');

  const unitAnalysis = useMemo(() => {
    const data = UNITS.map(unit => {
      const unitReports = reports.filter(r => r.unit === unit);
      return {
        name: unit.replace('Unit ', ''),
        count: unitReports.length,
        participants: unitReports.reduce((acc, r) => acc + (parseInt(r.bilanganPeserta) || 0), 0)
      };
    }).filter(d => d.count > 0);
    return data;
  }, [reports]);

  return (
    <div className="space-y-8">
      <div className="bg-slate-900/50 p-8 rounded-3xl border border-gold/20 shadow-xl">
        <h2 className="text-3xl font-black text-gold executive-title mb-8">📈 ANALISIS TERPERINCI</h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Activity by Unit */}
          <div>
            <h3 className="text-xs font-black text-slate-500 uppercase tracking-[0.2em] mb-6">Produktiviti Mengikut Unit</h3>
            <div className="h-[350px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={unitAnalysis} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" horizontal={true} vertical={false} />
                  <XAxis type="number" stroke="#64748b" hide />
                  <YAxis dataKey="name" type="category" stroke="#CBA362" fontSize={10} width={80} axisLine={false} tickLine={false} />
                  <Tooltip 
                    cursor={{ fill: 'rgba(203, 163, 98, 0.05)' }}
                    contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #CBA362', borderRadius: '8px' }}
                  />
                  <Bar dataKey="count" fill="#CBA362" radius={[0, 4, 4, 0]} name="Bilangan Laporan" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Participants by Unit */}
          <div>
            <h3 className="text-xs font-black text-slate-500 uppercase tracking-[0.2em] mb-6">Impak Peserta Mengikut Unit</h3>
            <div className="h-[350px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={unitAnalysis}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                  <XAxis dataKey="name" stroke="#64748b" fontSize={10} axisLine={false} tickLine={false} />
                  <YAxis stroke="#64748b" fontSize={10} axisLine={false} tickLine={false} />
                  <Tooltip 
                    cursor={{ fill: 'rgba(203, 163, 98, 0.05)' }}
                    contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #CBA362', borderRadius: '8px' }}
                  />
                  <Bar dataKey="participants" fill="#E5C88F" radius={[4, 4, 0, 0]} name="Jumlah Peserta" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {unitAnalysis.map((u, i) => (
          <div key={i} className="bg-slate-900/40 p-6 rounded-2xl border border-gold/10 hover:border-gold/40 transition-all">
            <p className="text-[10px] font-black text-gold uppercase tracking-widest mb-2">{u.name}</p>
            <div className="flex justify-between items-end">
              <div>
                <p className="text-2xl font-black text-slate-100">{u.count}</p>
                <p className="text-[10px] text-slate-500 uppercase">Laporan</p>
              </div>
              <div className="text-right">
                <p className="text-xl font-bold text-gold-light">{u.participants}</p>
                <p className="text-[10px] text-slate-500 uppercase">Peserta Terlibat</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Analytics;
