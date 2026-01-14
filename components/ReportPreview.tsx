
import React from 'react';
import { Report } from '../types';

interface ReportPreviewProps {
  report: Report;
  onClose: () => void;
  setLoading: (l: boolean) => void;
}

const ReportPreview: React.FC<ReportPreviewProps> = ({ report, onClose, setLoading }) => {
  const handleExportPDF = async () => {
    setLoading(true);
    const element = document.getElementById('opr-print-area');
    if (!element) return;

    try {
      // @ts-ignore
      const canvas = await html2canvas(element, { scale: 2 });
      const imgData = canvas.toDataURL('image/png');
      // @ts-ignore
      const { jsPDF } = window.jspdf;
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save(`OPR_${report.namaProgram.replace(/\s+/g, '_')}.pdf`);
    } catch (e) {
      console.error(e);
    }
    setLoading(false);
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-950/90 backdrop-blur-sm p-4 sm:p-8">
      <div className="w-full max-w-5xl h-full flex flex-col">
        {/* Controls */}
        <div className="flex justify-between items-center mb-4 bg-slate-900/80 p-4 rounded-2xl border border-gold/20 no-print">
          <div className="flex gap-4">
            <button 
              onClick={handleExportPDF}
              className="px-6 py-2 bg-gold text-slate-950 font-bold rounded-xl shadow-lg hover:bg-gold-light transition-all"
            >
              📄 MUAT TURUN PDF
            </button>
            <button 
              onClick={() => window.print()}
              className="px-6 py-2 bg-slate-800 text-gold font-bold rounded-xl border border-gold/30 hover:bg-slate-700"
            >
              🖨️ CETAK
            </button>
          </div>
          <button 
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-red-500/20 text-red-500 font-bold hover:bg-red-500/40"
          >
            ×
          </button>
        </div>

        {/* Report Content */}
        <div className="flex-1 overflow-auto bg-white rounded-xl shadow-2xl p-4 sm:p-12 text-black" id="opr-print-area">
          <div className="max-w-4xl mx-auto border-[10px] border-double border-[#CBA362] p-8 relative bg-white">
            {/* Header */}
            <div className="text-center border-b-4 border-black pb-6 mb-8">
              <img src="https://i.postimg.cc/L6bXZbNM/Gemini-Generated-Image-eupsu3eupsu3eups.png" className="w-20 h-20 mx-auto mb-4" alt="Logo" />
              <h1 className="text-2xl font-black tracking-widest text-black executive-title uppercase">ONE PAGE REPORT (OPR)</h1>
              <h2 className="text-lg font-bold text-black italic">SMA AL EHYA AL KARIM</h2>
              <p className="text-[10px] font-black text-black mt-1 uppercase tracking-tighter">Sistem Pelaporan Eksekutif Dokumentasi Digital</p>
            </div>

            {/* Table */}
            <table className="w-full border-collapse mb-8 text-sm">
              <tbody>
                {[
                  { label: 'NAMA PROGRAM', value: report.namaProgram },
                  { label: 'UNIT / ANJURAN', value: `${report.unit} / ${report.anjuran}` },
                  { label: 'TARIKH / MASA', value: `${report.tarikh} / ${report.masa}` },
                  { label: 'TEMPAT', value: report.tempat },
                  { label: 'SASARAN / BIL. PESERTA', value: `${report.sasaran} (${report.bilanganPeserta})` },
                  { label: 'AKTIVITI', value: report.aktiviti, multi: true },
                  { label: 'RUMUSAN & IMPAK', value: report.rumusan, multi: true },
                ].map((row, i) => (
                  <tr key={i} className="border-b-2 border-black">
                    <td className="w-1/3 bg-slate-100 px-4 py-4 font-black text-[10px] uppercase text-black tracking-widest border-r-2 border-black">{row.label}</td>
                    <td className={`px-4 py-4 text-black leading-relaxed font-bold ${row.multi ? 'whitespace-pre-line' : ''}`}>
                      {row.value}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Documentation Images */}
            {report.images.length > 0 && (
              <div className="mb-8">
                <p className="text-[10px] font-black text-black uppercase tracking-widest mb-4">📷 DOKUMENTASI GAMBAR:</p>
                <div className="grid grid-cols-2 gap-4">
                  {report.images.map((img, idx) => (
                    <div key={idx} className="aspect-video border-2 border-black rounded overflow-hidden">
                      <img src={img} className="w-full h-full object-cover" alt={`Doc ${idx}`} />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Footer Signatures */}
            <div className="mt-16 flex justify-center">
              <div className="text-center w-64">
                <div className="border-b-2 border-black mb-2 h-10" />
                <p className="text-[10px] font-black uppercase text-black">Disediakan Oleh:</p>
                <p className="text-sm font-black text-black">{report.disediakanOleh}</p>
                <p className="text-[8px] text-black font-bold uppercase">Tarikh: {new Date().toLocaleDateString('ms-MY')}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportPreview;
