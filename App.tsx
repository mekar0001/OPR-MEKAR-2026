
import React, { useState, useEffect, useCallback } from 'react';
import { Tab, Report } from './types';
import Navigation from './components/Navigation';
import ReportForm from './components/ReportForm';
import Checklist from './components/Checklist';
import Dashboard from './components/Dashboard';
import Analytics from './components/Analytics';
import ReportPreview from './components/ReportPreview';
import Gallery from './components/Gallery';
import { Toast, Loader } from './components/UIElements';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>(Tab.FORM);
  const [reports, setReports] = useState<Report[]>([]);
  const [viewingReport, setViewingReport] = useState<Report | null>(null);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' | 'warning' } | null>(null);
  const [loading, setLoading] = useState(false);

  // Persistence
  useEffect(() => {
    const saved = localStorage.getItem('executive_opr_reports');
    if (saved) {
      try {
        setReports(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse reports", e);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('executive_opr_reports', JSON.stringify(reports));
  }, [reports]);

  const showToast = useCallback((message: string, type: 'success' | 'error' | 'warning' = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  }, []);

  const handleAddReport = (report: Report) => {
    setReports(prev => [report, ...prev]);
    showToast("Laporan berjaya disimpan!", "success");
  };

  const handleDeleteReport = (id: string) => {
    setReports(prev => prev.filter(r => r.id !== id));
    showToast("Laporan telah dipadam.", "warning");
  };

  const handleBulkDelete = (ids: string[]) => {
    setReports(prev => prev.filter(r => !ids.includes(r.id)));
    showToast(`${ids.length} laporan telah dipadam.`, "warning");
  };

  return (
    <div className="executive-bg text-slate-200">
      <Navigation activeTab={activeTab} onTabChange={setActiveTab} />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-24">
        {activeTab === Tab.FORM && (
          <ReportForm onAdd={handleAddReport} setLoading={setLoading} showToast={showToast} />
        )}

        {activeTab === Tab.GALLERY && (
          <Gallery reports={reports} onView={(r) => setViewingReport(r)} />
        )}
        
        {activeTab === Tab.CHECKLIST && (
          <Checklist 
            reports={reports} 
            onDelete={handleDeleteReport} 
            onBulkDelete={handleBulkDelete}
            onView={(r) => setViewingReport(r)} 
          />
        )}
        
        {activeTab === Tab.DASHBOARD && (
          <Dashboard reports={reports} onView={(r) => setViewingReport(r)} />
        )}
        
        {activeTab === Tab.ANALYTICS && (
          <Analytics reports={reports} />
        )}
      </main>

      {viewingReport && (
        <ReportPreview 
          report={viewingReport} 
          onClose={() => setViewingReport(null)} 
          setLoading={setLoading}
        />
      )}

      {toast && <Toast message={toast.message} type={toast.type} />}
      {loading && <Loader />}
      
      <footer className="fixed bottom-0 left-0 right-0 py-4 text-center text-xs text-slate-500 bg-slate-950/50 backdrop-blur-md border-t border-gold/10 z-40">
        &copy; {new Date().getFullYear()} Executive OPR System • Sekolah Menengah Agama Al Ehya Al Karim
      </footer>
    </div>
  );
};

export default App;
