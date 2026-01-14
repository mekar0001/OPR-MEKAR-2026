
import React, { useMemo } from 'react';
import { Report } from '../types';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, PieChart, Pie } from 'recharts';

interface DashboardProps {
  reports: Report[];
  onView: (r: Report) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ reports, onView }) => {
  const stats = useMemo(() => {
    const totalReports = reports.length;
    const totalParticipants = reports.reduce((acc, r) => acc + (parseInt(r.bilanganPeserta) || 0), 0);
    const thisMonth = reports.filter(r => new Date(r.tarikh).getMonth() === new Date().getMonth()).length;
    
    // Monthly Distribution
    const months = ['Jan', 'Feb', 'Mac', 'Apr', 'Mei', 'Jun', 'Jul', 'Ogo', 'Sep', 'Okt', 'Nov', 'Dis'];
    const monthlyData = months.map((m, idx) => ({
      name: m,
      value: reports.filter(r => new Date(r.tarikh).getMonth() === idx).length
    }));

    // Unit Distribution
    const unitsMap: Record<string, number> = {};
    reports.forEach(r => {
      unitsMap[r.unit] = (unitsMap[r.unit] || 0) + 1;
    });
    const unitData = Object.entries(unitsMap).map(([name, value]) => ({ name, value }));

    return { totalReports, totalParticipants, thisMonth, monthlyData, unitData };
  }, [reports]);

  const COLORS = ['#CBA362', '#E5C88F', '#A8824A', '#D4AF37', '#B8860B', '#996515'];

  return (
    <div className="space-y-8">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Jumlah Laporan', value: stats.totalReports, icon: '📊' },
          { label: 'Jumlah Peserta', value: stats.totalParticipants, icon: '👥' },
          { label: 'Bulan Ini', value: stats.thisMonth, icon: '📅' },
          { label: 'Unit Terlibat', value: stats.unitData.length, icon: '🏢' },
        ].map((s, i) => (
          <div key={i} className="bg-slate-900/50 p-6 rounded-2xl border border-gold/10 shadow-lg relative group">
            <div className="absolute inset-0 bg-gold/5 opacity-0 group-hover:opacity-100 transition-all rounded-2xl" />
            <div className="flex justify-between items-start relative">
              <div>
                <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">{s.label}</p>
                <p className="text-3xl font-black text-gold executive-title">{s.value}</p>
              </div>
              <span className="text-2xl">{s.icon}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-slate-900/50 p-8 rounded-3xl border border-gold/10 shadow-xl">
          <h3 className="text-sm font-bold text-gold uppercase tracking-widest mb-8">Trend Bulanan Laporan</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={stats.monthlyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                <XAxis dataKey="name" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip 
                  cursor={{ fill: 'rgba(203, 163, 98, 0.1)' }}
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#CBA362', borderRadius: '12px', fontSize: '12px' }}
                />
                <Bar dataKey="value" fill="#CBA362" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-slate-900/50 p-8 rounded-3xl border border-gold/10 shadow-xl">
          <h3 className="text-sm font-bold text-gold uppercase tracking-widest mb-8">Taburan Mengikut Unit</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={stats.unitData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {stats.unitData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#CBA362', borderRadius: '12px', fontSize: '12px' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Recent Activities */}
      <div className="bg-slate-900/50 p-8 rounded-3xl border border-gold/10 shadow-xl">
        <h3 className="text-sm font-bold text-gold uppercase tracking-widest mb-6">Laporan Terkini</h3>
        <div className="space-y-4">
          {reports.slice(0, 5).map(r => (
            <div 
              key={r.id}
              onClick={() => onView(r)}
              className="flex items-center justify-between p-4 bg-slate-800/40 rounded-xl border border-gold/5 hover:border-gold/30 hover:bg-slate-800/60 transition-all cursor-pointer group"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg bg-gold/10 flex items-center justify-center text-gold font-bold">
                  {r.unit[0]}
                </div>
                <div>
                  <h4 className="font-bold text-slate-200 group-hover:text-gold transition-colors">{r.namaProgram}</h4>
                  <p className="text-xs text-slate-500">{r.tarikh} • {r.unit}</p>
                </div>
              </div>
              <span className="text-gold opacity-0 group-hover:opacity-100 transition-all">➔</span>
            </div>
          ))}
          {reports.length === 0 && (
            <div className="text-center py-10 text-slate-600 italic">Tiada data untuk dipaparkan.</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
