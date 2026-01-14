
import React from 'react';
import { Tab } from '../types';

interface NavigationProps {
  activeTab: Tab;
  onTabChange: (tab: Tab) => void;
}

const Navigation: React.FC<NavigationProps> = ({ activeTab, onTabChange }) => {
  const tabs = [
    { id: Tab.FORM, label: '📝 BORANG', icon: '📝' },
    { id: Tab.GALLERY, label: '🖼️ GALERI', icon: '🖼️' },
    { id: Tab.CHECKLIST, label: '✅ SENARAI SEMAK', icon: '✅' },
    { id: Tab.DASHBOARD, label: '📊 DASHBOARD', icon: '📊' },
    { id: Tab.ANALYTICS, label: '📈 ANALISIS', icon: '📈' },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-[#0f172a]/95 backdrop-blur-md border-t-4 border-[#CBA362] shadow-2xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full border-2 border-[#CBA362] overflow-hidden shadow-[0_0_15px_rgba(203,163,98,0.3)]">
              <img 
                src="https://i.postimg.cc/L6bXZbNM/Gemini-Generated-Image-eupsu3eupsu3eups.png" 
                alt="Logo" 
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-widest text-[#CBA362] executive-title">ONE PAGE REPORT</h1>
              <p className="text-[10px] uppercase font-semibold text-slate-400 tracking-tighter">SMA Al Ehya Al Karim</p>
            </div>
          </div>
          
          <div className="hidden md:flex items-end h-full gap-2">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className={`px-6 py-3 rounded-t-lg text-sm font-bold transition-all duration-300 border-b-2 ${
                  activeTab === tab.id 
                    ? 'text-[#CBA362] bg-[#CBA362]/10 border-[#CBA362]' 
                    : 'text-slate-500 border-transparent hover:text-slate-300'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="md:hidden flex gap-2">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className={`p-2 rounded-lg transition-all ${
                  activeTab === tab.id ? 'bg-[#CBA362]/20 text-[#CBA362]' : 'text-slate-500'
                }`}
              >
                <span className="text-xl">{tab.label.split(' ')[0]}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
