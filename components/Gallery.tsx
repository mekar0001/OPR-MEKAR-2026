
import React from 'react';
import { Report } from '../types';

interface GalleryProps {
  reports: Report[];
  onView: (r: Report) => void;
}

const Gallery: React.FC<GalleryProps> = ({ reports, onView }) => {
  if (reports.length === 0) {
    return (
      <div className="text-center py-20 bg-slate-900/30 rounded-3xl border border-gold/10">
        <p className="text-gold text-lg font-bold">TIADA LAPORAN UNTUK DIPAPARKAN</p>
        <p className="text-slate-500">Sila hantar laporan melalui borang terlebih dahulu.</p>
      </div>
    );
  }

  return (
    <div className="space-y-12">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-3xl font-black text-gold executive-title">🖼️ GALERI SEMUA LAPORAN</h2>
        <span className="bg-gold/20 text-gold px-4 py-2 rounded-full text-xs font-bold border border-gold/30">
          JUMLAH: {reports.length} LAPORAN
        </span>
      </div>

      <div className="grid grid-cols-1 gap-12">
        {reports.map((report) => (
          <div 
            key={report.id} 
            className="bg-white rounded-3xl overflow-hidden shadow-2xl border-[6px] border-[#CBA362] transition-transform hover:scale-[1.01]"
          >
            {/* Header Laporan Dalam Galeri */}
            <div className="bg-[#0f172a] p-6 flex items-center justify-between border-b-4 border-[#CBA362]">
              <div className="flex items-center gap-4">
                <img src="https://i.postimg.cc/L6bXZbNM/Gemini-Generated-Image-eupsu3eupsu3eups.png" className="w-12 h-12" alt="Logo" />
                <div>
                  <h3 className="text-gold font-black text-lg leading-none uppercase">{report.namaProgram}</h3>
                  <p className="text-slate-400 text-[10px] tracking-widest mt-1 uppercase">{report.unit} • {report.tarikh}</p>
                </div>
              </div>
              <button 
                onClick={() => onView(report)}
                className="bg-gold text-slate-950 px-4 py-2 rounded-xl font-bold text-xs hover:bg-gold-light transition-all"
              >
                LIHAT PENUH & PDF
              </button>
            </div>

            {/* Kandungan Ringkas Galeri */}
            <div className="p-8 text-black grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="md:col-span-2 space-y-6">
                <div>
                  <h4 className="text-[10px] font-black text-gold-dark uppercase tracking-widest mb-1">📋 AKTIVITI UTAMA:</h4>
                  <p className="text-sm leading-relaxed whitespace-pre-line">{report.aktiviti}</p>
                </div>
                <div>
                  <h4 className="text-[10px] font-black text-gold-dark uppercase tracking-widest mb-1">✨ RUMUSAN & IMPAK:</h4>
                  <p className="text-sm leading-relaxed whitespace-pre-line font-medium italic">"{report.rumusan}"</p>
                </div>
                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-100">
                  <div>
                    <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">TEMPAT:</h4>
                    <p className="text-xs font-bold">{report.tempat}</p>
                  </div>
                  <div>
                    <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">BIL. PESERTA:</h4>
                    <p className="text-xs font-bold">{report.bilanganPeserta}</p>
                  </div>
                </div>
              </div>

              {/* Gambar Dalam Galeri */}
              <div className="space-y-4">
                <h4 className="text-[10px] font-black text-gold-dark uppercase tracking-widest mb-1 text-center">📷 DOKUMENTASI GAMBAR:</h4>
                <div className="grid grid-cols-2 gap-2">
                  {report.images.length > 0 ? report.images.map((img, idx) => (
                    <div key={idx} className="aspect-square rounded-lg border-2 border-gold/20 overflow-hidden shadow-inner">
                      <img src={img} className="w-full h-full object-cover" alt="Doc" />
                    </div>
                  )) : (
                    <div className="col-span-2 py-10 bg-slate-50 border-2 border-dashed border-slate-200 rounded-xl flex items-center justify-center text-slate-400 text-xs italic">
                      Tiada Gambar
                    </div>
                  )}
                </div>
                <div className="pt-4 text-center">
                  <p className="text-[10px] font-black text-slate-400 uppercase">Disediakan Oleh:</p>
                  <p className="text-xs font-bold text-slate-800">{report.disediakanOleh}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Gallery;
