
import React, { useState } from 'react';
import { Report, UNITS, ANJURAN_LIST } from '../types';
import { analyzeReport } from '../services/geminiService';

interface ReportFormProps {
  onAdd: (report: Report) => void;
  setLoading: (l: boolean) => void;
  showToast: (m: string, t?: any) => void;
}

const ReportForm: React.FC<ReportFormProps> = ({ onAdd, setLoading, showToast }) => {
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setFormData] = useState({
    namaProgram: '',
    unit: '',
    anjuran: '',
    tarikh: new Date().toISOString().split('T')[0],
    masa: '08:00',
    tempat: '',
    bilanganPeserta: '',
    sasaran: '',
    aktiviti: '',
    rumusan: '',
    disediakanOleh: '',
  });
  const [images, setImages] = useState<string[]>([]);
  const [aiSuggestions, setAiSuggestions] = useState<{ analysis: string; suggestions: string } | null>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []) as File[];
    const remaining = 4 - images.length;
    const toUpload = files.slice(0, remaining);

    toUpload.forEach(file => {
      const reader = new FileReader();
      reader.onload = (ev) => {
        setImages(prev => [...prev, ev.target?.result as string]);
      };
      reader.readAsDataURL(file);
    });
  };

  const handleAiHelp = async () => {
    if (!formData.aktiviti || !formData.rumusan) {
      showToast("Sila isi bahagian Aktiviti dan Rumusan dahulu.", "warning");
      return;
    }
    setLoading(true);
    const result = await analyzeReport(formData.aktiviti, formData.rumusan);
    if (result) {
      setAiSuggestions(result);
      showToast("Analisis AI Selesai", "success");
    } else {
      showToast("Gagal mendapatkan analisis AI", "error");
    }
    setLoading(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newReport: Report = {
      ...formData,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
      images,
    };
    onAdd(newReport);
    setIsSuccess(true);
    setAiSuggestions(null);
  };

  const resetForm = () => {
    setFormData({
      namaProgram: '',
      unit: '',
      anjuran: '',
      tarikh: new Date().toISOString().split('T')[0],
      masa: '08:00',
      tempat: '',
      bilanganPeserta: '',
      sasaran: '',
      aktiviti: '',
      rumusan: '',
      disediakanOleh: '',
    });
    setImages([]);
    setIsSuccess(false);
  };

  if (isSuccess) {
    return (
      <div className="max-w-2xl mx-auto bg-slate-900/80 p-12 rounded-3xl border-2 border-gold shadow-[0_0_50px_rgba(203,163,98,0.2)] text-center animate-fade-in">
        <div className="w-24 h-24 bg-gold rounded-full flex items-center justify-center mx-auto mb-8 shadow-[0_0_30px_rgba(203,163,98,0.5)]">
          <span className="text-5xl text-slate-950">✓</span>
        </div>
        <h2 className="text-4xl font-black text-gold executive-title mb-4">LAPORAN BERJAYA DIHANTAR</h2>
        <p className="text-slate-300 mb-10 leading-relaxed">
          Terima kasih. Laporan program <span className="text-gold font-bold">"{formData.namaProgram}"</span> telah berjaya disimpan ke dalam sistem dokumentasi digital sekolah.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button 
            onClick={resetForm}
            className="px-8 py-4 bg-gold text-slate-950 font-bold rounded-xl hover:bg-gold-light transition-all shadow-lg"
          >
            ➕ HANTAR LAPORAN LAIN
          </button>
          <button 
            onClick={() => window.location.reload()} 
            className="px-8 py-4 bg-slate-800 text-gold border border-gold/30 font-bold rounded-xl hover:bg-slate-700 transition-all"
          >
            📊 LIHAT DASHBOARD
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto bg-slate-900/50 p-8 rounded-3xl border border-gold/20 shadow-2xl relative overflow-hidden">
      <div className="absolute top-0 left-0 w-24 h-24 border-t-4 border-l-4 border-gold/40 -m-1 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-24 h-24 border-b-4 border-r-4 border-gold/40 -m-1 pointer-events-none" />
      
      <div className="text-center mb-12">
        <img 
          src="https://i.postimg.cc/L6bXZbNM/Gemini-Generated-Image-eupsu3eupsu3eups.png" 
          alt="Logo" 
          className="w-24 h-24 mx-auto mb-6 rounded-full border-2 border-gold shadow-lg"
        />
        <h2 className="text-4xl font-extrabold text-[#E5C88F] executive-title mb-2">BORANG LAPORAN PROGRAM</h2>
        <p className="text-slate-400 tracking-[0.3em] uppercase text-xs font-semibold">One Page Report System</p>
        <div className="flex items-center justify-center gap-4 mt-6">
          <div className="h-[1px] w-20 bg-gradient-to-r from-transparent to-gold" />
          <div className="w-2 h-2 rounded-full bg-gold" />
          <div className="h-[1px] w-20 bg-gradient-to-l from-transparent to-gold" />
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="md:col-span-2">
            <label className="block text-[10px] font-bold text-gold uppercase tracking-widest mb-2">Nama Program / Aktiviti</label>
            <input 
              required
              className="w-full bg-slate-800/50 border border-gold/30 rounded-xl px-4 py-3 focus:outline-none focus:border-gold transition-all"
              value={formData.namaProgram}
              onChange={e => setFormData({...formData, namaProgram: e.target.value})}
              placeholder="Masukkan nama program"
            />
          </div>

          <div>
            <label className="block text-[10px] font-bold text-gold uppercase tracking-widest mb-2">Unit</label>
            <select 
              required
              className="w-full bg-slate-800/50 border border-gold/30 rounded-xl px-4 py-3 focus:outline-none focus:border-gold transition-all"
              value={formData.unit}
              onChange={e => setFormData({...formData, unit: e.target.value})}
            >
              <option value="">Pilih Unit</option>
              {UNITS.map(u => <option key={u} value={u}>{u}</option>)}
            </select>
          </div>

          <div>
            <label className="block text-[10px] font-bold text-gold uppercase tracking-widest mb-2">Anjuran</label>
            <select 
              required
              className="w-full bg-slate-800/50 border border-gold/30 rounded-xl px-4 py-3 focus:outline-none focus:border-gold transition-all"
              value={formData.anjuran}
              onChange={e => setFormData({...formData, anjuran: e.target.value})}
            >
              <option value="">Pilih Anjuran</option>
              {ANJURAN_LIST.map(a => <option key={a} value={a}>{a}</option>)}
            </select>
          </div>

          <div>
            <label className="block text-[10px] font-bold text-gold uppercase tracking-widest mb-2">Tarikh</label>
            <input 
              type="date"
              required
              className="w-full bg-slate-800/50 border border-gold/30 rounded-xl px-4 py-3 focus:outline-none focus:border-gold"
              value={formData.tarikh}
              onChange={e => setFormData({...formData, tarikh: e.target.value})}
            />
          </div>

          <div>
            <label className="block text-[10px] font-bold text-gold uppercase tracking-widest mb-2">Masa</label>
            <input 
              type="time"
              required
              className="w-full bg-slate-800/50 border border-gold/30 rounded-xl px-4 py-3 focus:outline-none focus:border-gold"
              value={formData.masa}
              onChange={e => setFormData({...formData, masa: e.target.value})}
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-[10px] font-bold text-gold uppercase tracking-widest mb-2">Tempat</label>
            <input 
              required
              className="w-full bg-slate-800/50 border border-gold/30 rounded-xl px-4 py-3 focus:outline-none focus:border-gold"
              value={formData.tempat}
              onChange={e => setFormData({...formData, tempat: e.target.value})}
              placeholder="Lokasi kejadian"
            />
          </div>

          <div>
            <label className="block text-[10px] font-bold text-gold uppercase tracking-widest mb-2">Bil. Peserta</label>
            <input 
              required
              type="text"
              className="w-full bg-slate-800/50 border border-gold/30 rounded-xl px-4 py-3 focus:outline-none focus:border-gold"
              value={formData.bilanganPeserta}
              onChange={e => setFormData({...formData, bilanganPeserta: e.target.value})}
              placeholder="Contoh: 30 orang / Semua Guru"
            />
          </div>

          <div>
            <label className="block text-[10px] font-bold text-gold uppercase tracking-widest mb-2">Sasaran</label>
            <input 
              required
              className="w-full bg-slate-800/50 border border-gold/30 rounded-xl px-4 py-3 focus:outline-none focus:border-gold"
              value={formData.sasaran}
              onChange={e => setFormData({...formData, sasaran: e.target.value})}
              placeholder="Contoh: Murid Tingkatan 5"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-[10px] font-bold text-gold uppercase tracking-widest mb-2">Aktiviti</label>
            <textarea 
              required
              rows={4}
              className="w-full bg-slate-800/50 border border-gold/30 rounded-xl px-4 py-3 focus:outline-none focus:border-gold resize-none"
              value={formData.aktiviti}
              onChange={e => setFormData({...formData, aktiviti: e.target.value})}
              placeholder="Huraikan aktiviti yang telah dijalankan..."
            />
          </div>

          <div className="md:col-span-2">
            <div className="flex justify-between items-center mb-2">
              <label className="block text-[10px] font-bold text-gold uppercase tracking-widest">Rumusan / Pencapaian</label>
              <button 
                type="button"
                onClick={handleAiHelp}
                className="text-[10px] font-bold text-sky-400 flex items-center gap-1 hover:text-sky-300 transition-all bg-sky-400/10 px-2 py-1 rounded"
              >
                ✨ ANALISIS AI
              </button>
            </div>
            <textarea 
              required
              rows={4}
              className="w-full bg-slate-800/50 border border-gold/30 rounded-xl px-4 py-3 focus:outline-none focus:border-gold resize-none"
              value={formData.rumusan}
              onChange={e => setFormData({...formData, rumusan: e.target.value})}
              placeholder="Hasil dan impak program..."
            />
            {aiSuggestions && (
              <div className="mt-4 p-4 bg-sky-950/30 border border-sky-400/20 rounded-xl text-sm animate-fade-in">
                <p className="text-sky-400 font-bold mb-1">🤖 Analisis AI:</p>
                <p className="text-slate-300 italic mb-3">"{aiSuggestions.analysis}"</p>
                <p className="text-sky-400 font-bold mb-1">💡 Cadangan Profesional:</p>
                <p className="text-slate-300">{aiSuggestions.suggestions}</p>
                <button 
                  type="button" 
                  onClick={() => setFormData({...formData, rumusan: aiSuggestions.suggestions})}
                  className="mt-3 text-xs bg-sky-400 text-slate-900 font-bold px-3 py-1 rounded hover:bg-sky-300"
                >
                  Gunakan Cadangan
                </button>
              </div>
            )}
          </div>

          <div className="md:col-span-2">
            <label className="block text-[10px] font-bold text-gold uppercase tracking-widest mb-2">Disediakan Oleh</label>
            <input 
              required
              className="w-full bg-slate-800/50 border border-gold/30 rounded-xl px-4 py-3 focus:outline-none focus:border-gold"
              value={formData.disediakanOleh}
              onChange={e => setFormData({...formData, disediakanOleh: e.target.value})}
              placeholder="Nama Penuh Pelapor"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-[10px] font-bold text-gold uppercase tracking-widest mb-2">📷 Gambar Dokumentasi (Max 4)</label>
            <div 
              className="border-2 border-dashed border-gold/30 rounded-2xl p-8 text-center hover:bg-gold/5 cursor-pointer transition-all"
              onClick={() => document.getElementById('image-input')?.click()}
            >
              <span className="text-4xl mb-4 block">📸</span>
              <p className="text-gold font-bold">KLIK UNTUK MUAT NAIK</p>
              <p className="text-slate-500 text-xs mt-1">PNG, JPG (Disarankan nisbah 4:3)</p>
              <input 
                id="image-input"
                type="file"
                multiple
                accept="image/*"
                className="hidden"
                onChange={handleImageUpload}
              />
            </div>
            
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6">
              {images.map((img, idx) => (
                <div key={idx} className="aspect-video relative rounded-lg overflow-hidden border border-gold/40">
                  <img src={img} className="w-full h-full object-cover" alt={`Upload ${idx}`} />
                  <button 
                    type="button"
                    onClick={() => setImages(prev => prev.filter((_, i) => i !== idx))}
                    className="absolute top-1 right-1 w-6 h-6 bg-red-500 rounded-full text-white text-xs font-bold"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        <button 
          type="submit"
          className="w-full py-5 rounded-2xl bg-gradient-to-r from-gold to-gold-dark text-slate-950 font-black tracking-[0.2em] shadow-xl hover:shadow-gold/20 hover:scale-[1.01] active:scale-[0.99] transition-all"
        >
          HANTAR LAPORAN 🚀
        </button>
      </form>
    </div>
  );
};

export default ReportForm;
