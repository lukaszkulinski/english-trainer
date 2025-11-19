
import React from 'react';
import { GraduationCap, LayoutDashboard, BrainCircuit, MessageSquare, PenTool, Map } from 'lucide-react';
import { ViewState } from '../types';
import { useLanguage } from '../contexts/LanguageContext';

interface LayoutProps {
  children: React.ReactNode;
  currentView: ViewState;
  onChangeView: (view: ViewState) => void;
}

export const Layout: React.FC<LayoutProps> = ({ children, currentView, onChangeView }) => {
  const { language, setLanguage, t } = useLanguage();

  const navItems = [
    { id: ViewState.DASHBOARD, label: t('nav_learn'), icon: LayoutDashboard },
    { id: ViewState.CURRICULUM, label: t('nav_path'), icon: Map },
    { id: ViewState.PRACTICE, label: t('nav_practice'), icon: BrainCircuit },
    { id: ViewState.WRITING, label: t('nav_write'), icon: PenTool },
    { id: ViewState.TUTOR, label: t('nav_tutor'), icon: MessageSquare },
  ];

  // Helper to check if active
  const isActive = (id: ViewState) => {
    if (id === ViewState.CURRICULUM && currentView === ViewState.LESSON) return true;
    return currentView === id;
  };

  return (
    <div className="min-h-[100dvh] flex flex-col bg-slate-50">
      {/* Navbar */}
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-xl border-b border-slate-200 safe-top">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-14 md:h-16 gap-2">
            <div className="flex items-center gap-2 cursor-pointer shrink-0" onClick={() => onChangeView(ViewState.DASHBOARD)}>
              <div className="bg-indigo-600 p-1.5 rounded-lg shadow-sm shrink-0">
                <GraduationCap className="h-5 w-5 md:h-6 md:w-6 text-white" />
              </div>
              <span className="text-lg md:text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-violet-600 truncate max-w-[140px] md:max-w-none">
                {t('app_name')}
              </span>
            </div>
            
            <div className="flex items-center gap-2 md:gap-4 shrink-0">
              {/* Language Switcher */}
              <div className="bg-slate-100 rounded-lg p-1 flex text-xs font-bold">
                 <button 
                   onClick={() => setLanguage('en')}
                   className={`px-2 py-1 rounded-md transition-all ${language === 'en' ? 'bg-white shadow-sm text-indigo-600' : 'text-slate-400 hover:text-slate-600'}`}
                 >
                   EN
                 </button>
                 <button 
                   onClick={() => setLanguage('pl')}
                   className={`px-2 py-1 rounded-md transition-all ${language === 'pl' ? 'bg-white shadow-sm text-indigo-600' : 'text-slate-400 hover:text-slate-600'}`}
                 >
                   PL
                 </button>
              </div>

              {/* Desktop Nav */}
              <nav className="hidden md:flex space-x-1">
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => onChangeView(item.id)}
                    className={`px-3 lg:px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 flex items-center gap-2 whitespace-nowrap ${
                      isActive(item.id)
                        ? 'bg-slate-900 text-white shadow-md transform scale-105'
                        : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                    }`}
                  >
                    <item.icon size={18} />
                    {item.label}
                  </button>
                ))}
              </nav>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Nav Bottom Bar (Sticky) */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-xl border-t border-slate-200 z-50 pb-safe shadow-[0_-4px_10px_rgba(0,0,0,0.03)]">
        <div className="grid grid-cols-5 px-1 h-full">
          {navItems.map((item) => {
            const active = isActive(item.id);
            return (
              <button
                key={item.id}
                onClick={() => onChangeView(item.id)}
                className={`flex flex-col items-center justify-start pt-2 pb-1 space-y-0.5 transition-all duration-200 w-full min-w-0 ${
                  active ? 'text-indigo-600' : 'text-slate-400 hover:text-slate-600'
                }`}
              >
                <div className={`relative p-1 rounded-2xl transition-all duration-300 shrink-0 ${active ? 'bg-indigo-50 -translate-y-1 shadow-sm' : ''}`}>
                  <item.icon 
                    size={22} 
                    strokeWidth={active ? 2.5 : 2} 
                    className={`transition-all ${active ? 'scale-110' : ''}`}
                  />
                </div>
                {/* Removed truncate, added break-words and leading-none to handle long translations */}
                <span className={`text-[10px] font-medium tracking-wide transition-colors w-full text-center break-words leading-none px-0.5 ${active ? 'text-indigo-700' : ''}`}>
                  {item.label}
                </span>
              </button>
            );
          })}
        </div>
      </nav>

      {/* Main Content Area */}
      <main className={`flex-1 w-full max-w-7xl mx-auto px-3 md:px-4 py-4 md:py-8 pb-24 md:pb-8 transition-all duration-300 ${currentView === ViewState.TUTOR ? 'flex flex-col h-[calc(100dvh-3.5rem)] md:h-auto' : ''}`}>
        {children}
      </main>
    </div>
  );
};
