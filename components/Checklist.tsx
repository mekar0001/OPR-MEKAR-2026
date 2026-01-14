
import React, { useState, useMemo } from 'react';
import { Report, UNITS, ANJURAN_LIST } from '../types';

interface ChecklistProps {
  reports: Report[];
  onDelete: (id: string) => void;
  onBulkDelete: (ids: string[]) => void;
  onView: (r: Report) => void;
}

const Checklist: React.FC<ChecklistProps> = ({ reports, onDelete, onBulkDelete, onView }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterUnit, setFilterUnit] = useState('');
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

  const filtered = useMemo(() => {
    return reports.filter(r => {
      const matchSearch = r.namaProgram.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          r.disediakanOleh.toLowerCase().includes(searchTerm.toLowerCase());
      const matchUnit = !filterUnit || r.unit === filterUnit;
      return matchSearch && matchUnit;
    });
  }, [reports, searchTerm, filterUnit]);

  const toggleSelect = (id: string) => {
    const next = new Set(selectedIds);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    setSelectedIds(next);
  };

  const toggleSelectAll = () => {
    if (selectedIds.size === filtered.length) setSelectedIds(new Set());
    else setSelectedIds(new Set(filtered.map(r => r.id)));
  };

  const handleBulkDelete = () => {
    if (confirm(`Adakah anda pasti untuk memadam ${selectedIds.size} laporan?`)) {
      onBulkDelete(Array.from(selectedIds));
      setSelectedIds(new Set());
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-slate-900/50 p-6 rounded-2xl border border-gold/20 shadow-xl">
        <h2 className="text-2xl font-bold text-gold executive-title mb-6">✅ SENARAI SEMAK LAPORAN</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="md:col-span-2">
            <input 
              className="w-full bg-slate-800 border border-gold/30 rounded-xl px-4 py-3 focus:outline-none focus:border-gold"
              placeholder="Cari laporan atau pelapor..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
            />
          </div>
          <div>
            <select 
              className="w-full bg-slate-800 border border-gold/30 rounded-xl px-4 py-3 focus:outline-none focus:border-gold"
              value={filterUnit}
              onChange={e => setFilterUnit(e.target.value)}
            >
              <option value="">Semua Unit</option>
              {UNITS.map(u => <option key={u} value={u}>{u}</option>)}
            </select>
          </div>
        </div>

        <div className="flex gap-2 mb-4">
          <button 
            onClick={toggleSelectAll}
            className="px-4 py-2 bg-slate-800 border border-gold/30 rounded-lg text-xs font-bold text-gold hover:bg-slate-700"
          >
            {selectedIds.size === filtered.length ? '◻️ NYAHPILIH' : '☑️ PILIH SEMUA'}
          </button>
          {selectedIds.size > 0 && (
            <button 
              onClick={handleBulkDelete}
              className="px-4 py-2 bg-red-500/10 border border-red-500/30 rounded-lg text-xs font-bold text-red-400 hover:bg-red-500/20"
            >
              🗑️ PADAM PILIHAN ({selectedIds.size})
            </button>
          )}
        </div>

        <div className="overflow-x-auto rounded-xl border border-gold/10">
          <table className="w-full text-left text-sm">
            <thead className="bg-gold/10 text-gold uppercase text-[10px] font-black tracking-widest">
              <tr>
                <th className="px-6 py-4 w-10"></th>
                <th className="px-6 py-4">Nama Program</th>
                <th className="px-6 py-4">Unit</th>
                <th className="px-6 py-4">Tarikh</th>
                <th className="px-6 py-4">Pelapor</th>
                <th className="px-6 py-4 text-center">Tindakan</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gold/10">
              {filtered.map(report => (
                <tr key={report.id} className="hover:bg-slate-800/30 transition-all">
                  <td className="px-6 py-4">
                    <input 
                      type="checkbox" 
                      className="accent-gold w-4 h-4" 
                      checked={selectedIds.has(report.id)}
                      onChange={() => toggleSelect(report.id)}
                    />
                  </td>
                  <td className="px-6 py-4 font-semibold text-slate-100">{report.namaProgram}</td>
                  <td className="px-6 py-4 text-slate-400">{report.unit}</td>
                  <td className="px-6 py-4 text-slate-400">{report.tarikh}</td>
                  <td className="px-6 py-4 text-slate-400">{report.disediakanOleh}</td>
                  <td className="px-6 py-4">
                    <div className="flex justify-center gap-2">
                      <button 
                        onClick={() => onView(report)}
                        className="p-2 bg-gold/10 text-gold rounded-lg hover:bg-gold/20"
                      >
                        👁️
                      </button>
                      <button 
                        onClick={() => onDelete(report.id)}
                        className="p-2 bg-red-500/10 text-red-400 rounded-lg hover:bg-red-500/20"
                      >
                        🗑️
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-slate-500 italic">
                    Tiada rekod ditemui.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Checklist;
