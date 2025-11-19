
import React, { useState } from 'react';
import { TenseCategory, TenseAspect, TenseInfo } from '../types';
import { BookOpen, X, Sparkles, ChevronRight, LayoutGrid, ListFilter } from 'lucide-react';
import { geminiService } from '../services/geminiService';
import { useLanguage } from '../contexts/LanguageContext';

// Static definition of the 12 tenses for the matrix structure
const TENSES: TenseInfo[] = [
  // Present
  { id: 'pres-simp', name: 'Present Simple', category: TenseCategory.PRESENT, aspect: TenseAspect.SIMPLE, formula: 'S + V(s/es)', description: 'Facts, habits, routines.', example: 'I walk to work every day.', color: 'bg-blue-50 border-blue-200 text-blue-900' },
  { id: 'pres-cont', name: 'Present Continuous', category: TenseCategory.PRESENT, aspect: TenseAspect.CONTINUOUS, formula: 'S + am/is/are + V-ing', description: 'Actions happening now.', example: 'I am walking to work right now.', color: 'bg-blue-50 border-blue-200 text-blue-900' },
  { id: 'pres-perf', name: 'Present Perfect', category: TenseCategory.PRESENT, aspect: TenseAspect.PERFECT, formula: 'S + have/has + V3', description: 'Past action with result in present.', example: 'I have walked to work.', color: 'bg-blue-50 border-blue-200 text-blue-900' },
  { id: 'pres-perf-cont', name: 'Present Perfect Continuous', category: TenseCategory.PRESENT, aspect: TenseAspect.PERFECT_CONTINUOUS, formula: 'S + have/has + been + V-ing', description: 'Action started in past, continues now.', example: 'I have been walking for an hour.', color: 'bg-blue-50 border-blue-200 text-blue-900' },
  
  // Past
  { id: 'past-simp', name: 'Past Simple', category: TenseCategory.PAST, aspect: TenseAspect.SIMPLE, formula: 'S + V2 (ed/irregular)', description: 'Finished action in the past.', example: 'I walked to work yesterday.', color: 'bg-amber-50 border-amber-200 text-amber-900' },
  { id: 'past-cont', name: 'Past Continuous', category: TenseCategory.PAST, aspect: TenseAspect.CONTINUOUS, formula: 'S + was/were + V-ing', description: 'Action in progress at past time.', example: 'I was walking when it rained.', color: 'bg-amber-50 border-amber-200 text-amber-900' },
  { id: 'past-perf', name: 'Past Perfect', category: TenseCategory.PAST, aspect: TenseAspect.PERFECT, formula: 'S + had + V3', description: 'Action before another past action.', example: 'I had walked before the bus came.', color: 'bg-amber-50 border-amber-200 text-amber-900' },
  { id: 'past-perf-cont', name: 'Past Perfect Continuous', category: TenseCategory.PAST, aspect: TenseAspect.PERFECT_CONTINUOUS, formula: 'S + had + been + V-ing', description: 'Duration before past moment.', example: 'I had been walking for miles.', color: 'bg-amber-50 border-amber-200 text-amber-900' },

  // Future
  { id: 'fut-simp', name: 'Future Simple', category: TenseCategory.FUTURE, aspect: TenseAspect.SIMPLE, formula: 'S + will + V', description: 'Predictions, instant decisions.', example: 'I will walk to work tomorrow.', color: 'bg-emerald-50 border-emerald-200 text-emerald-900' },
  { id: 'fut-cont', name: 'Future Continuous', category: TenseCategory.FUTURE, aspect: TenseAspect.CONTINUOUS, formula: 'S + will be + V-ing', description: 'Action in progress in future.', example: 'I will be walking at 9 AM.', color: 'bg-emerald-50 border-emerald-200 text-emerald-900' },
  { id: 'fut-perf', name: 'Future Perfect', category: TenseCategory.FUTURE, aspect: TenseAspect.PERFECT, formula: 'S + will have + V3', description: 'Action finished by future time.', example: 'I will have walked 5 miles by noon.', color: 'bg-emerald-50 border-emerald-200 text-emerald-900' },
  { id: 'fut-perf-cont', name: 'Future Perfect Continuous', category: TenseCategory.FUTURE, aspect: TenseAspect.PERFECT_CONTINUOUS, formula: 'S + will have been + V-ing', description: 'Duration up to future moment.', example: 'I will have been walking for 2 hours.', color: 'bg-emerald-50 border-emerald-200 text-emerald-900' },
];

interface TenseMatrixProps {
  onPractice: (tense: string) => void;
}

export const TenseMatrix: React.FC<TenseMatrixProps> = ({ onPractice }) => {
  const { t } = useLanguage();
  const [selectedTense, setSelectedTense] = useState<TenseInfo | null>(null);
  const [mobileTab, setMobileTab] = useState<TenseCategory>(TenseCategory.PRESENT);
  const [aiExplanation, setAiExplanation] = useState<string | null>(null);
  const [loadingAi, setLoadingAi] = useState(false);

  const handleSelect = (tense: TenseInfo) => {
    setSelectedTense(tense);
    setAiExplanation(null);
  };

  const fetchExplanation = async () => {
    if (!selectedTense) return;
    setLoadingAi(true);
    try {
      const text = await geminiService.getDetailedExplanation(selectedTense.name);
      setAiExplanation(text);
    } catch (e) {
      setAiExplanation("Failed to load AI explanation. Please try again.");
    } finally {
      setLoadingAi(false);
    }
  };

  // Desktop Cell Renderer
  const renderDesktopCell = (category: TenseCategory, aspect: TenseAspect) => {
    const tense = TENSES.find(t => t.category === category && t.aspect === aspect);
    if (!tense) return <div className="p-4 border border-slate-100 bg-slate-50"></div>;

    return (
      <div 
        key={tense.id}
        onClick={() => handleSelect(tense)}
        className={`p-4 border rounded-lg cursor-pointer transition-all duration-200 hover:shadow-md hover:scale-[1.02] ${tense.color} h-full flex flex-col justify-between shadow-sm`}
      >
        <div>
          <h3 className="font-bold text-base mb-1 leading-tight">{tense.name}</h3>
          <p className="text-xs opacity-80 mb-1.5 italic font-mono">{tense.formula}</p>
        </div>
        <p className="text-sm line-clamp-3 leading-snug">{tense.example}</p>
      </div>
    );
  };

  // Mobile Tab Renderer
  const renderMobileTabs = () => (
    <div className="flex p-1 bg-slate-200/50 rounded-xl mb-6">
      {Object.values(TenseCategory).map((cat) => {
        const isActive = mobileTab === cat;
        let activeClass = "bg-white shadow-sm text-slate-900 ring-1 ring-black/5";
        let inactiveClass = "text-slate-500 hover:text-slate-700 hover:bg-slate-200/50";
        
        if (isActive) {
           if (cat === TenseCategory.PAST) activeClass = "bg-amber-50 text-amber-900 shadow-sm ring-1 ring-amber-200";
           if (cat === TenseCategory.PRESENT) activeClass = "bg-blue-50 text-blue-900 shadow-sm ring-1 ring-blue-200";
           if (cat === TenseCategory.FUTURE) activeClass = "bg-emerald-50 text-emerald-900 shadow-sm ring-1 ring-emerald-200";
        }

        return (
          <button
            key={cat}
            onClick={() => setMobileTab(cat)}
            className={`flex-1 py-2.5 text-xs sm:text-sm font-bold rounded-lg transition-all duration-200 break-words leading-tight ${isActive ? activeClass : inactiveClass}`}
          >
            {t(cat)}
          </button>
        );
      })}
    </div>
  );

  // Mobile List Renderer
  const renderMobileList = () => {
    const tenses = TENSES.filter(t => t.category === mobileTab);
    return (
      <div className="space-y-3 animate-in slide-in-from-bottom-2 duration-300">
        {tenses.map(tense => {
           // Dynamic style extraction for left border strip
           const stripColor = tense.category === TenseCategory.PAST ? 'bg-amber-400' : 
                              tense.category === TenseCategory.PRESENT ? 'bg-blue-400' : 'bg-emerald-400';

           return (
            <div 
              key={tense.id}
              onClick={() => handleSelect(tense)}
              className={`group relative pl-4 p-4 rounded-xl border transition-all active:scale-[0.98] ${tense.color} overflow-hidden`}
            >
               {/* Decorative side strip */}
               <div className={`absolute left-0 top-0 bottom-0 w-1.5 ${stripColor}`}></div>
               
               <div className="flex justify-between items-start mb-2">
                  <div>
                     <h3 className="font-bold text-lg leading-tight">{tense.name}</h3>
                     <span className="text-xs font-bold uppercase tracking-wider opacity-60">{t(tense.aspect)}</span>
                  </div>
                  <div className="bg-white/50 p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                    <ChevronRight size={20} className="text-slate-600" />
                  </div>
               </div>
               
               <div className="space-y-2">
                 <div className="bg-white/40 inline-block px-2 py-1 rounded text-xs font-mono border border-black/5">
                    {tense.formula}
                 </div>
                 <p className="text-sm opacity-90 italic">"{tense.example}"</p>
               </div>
            </div>
           );
        })}
      </div>
    );
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-8">
      <div className="text-center mb-8 px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-slate-800 mb-2">{t('tense_matrix_title')}</h2>
        <p className="text-sm md:text-base text-slate-600">
          <span className="md:hidden">{t('tense_matrix_subtitle_mobile')}</span>
          <span className="hidden md:inline">{t('tense_matrix_subtitle_desktop')}</span>
        </p>
      </div>

      {/* Mobile View */}
      <div className="md:hidden px-1">
        {renderMobileTabs()}
        {renderMobileList()}
      </div>

      {/* Desktop Matrix Grid */}
      <div className="hidden md:block relative">
        <div className="grid grid-cols-[100px_1fr_1fr_1fr] gap-4 min-w-[800px]">
          {/* Header Row */}
          <div className="text-slate-400 font-medium text-right pr-4 pt-4 flex items-end justify-end pb-2">
             <LayoutGrid size={20} className="opacity-50" />
          </div>
          <div className="text-center font-bold text-amber-700 bg-amber-50 p-3 rounded-t-lg text-sm uppercase tracking-wide border-b-2 border-amber-100">{t('Past')}</div>
          <div className="text-center font-bold text-blue-700 bg-blue-50 p-3 rounded-t-lg text-sm uppercase tracking-wide border-b-2 border-blue-100">{t('Present')}</div>
          <div className="text-center font-bold text-emerald-700 bg-emerald-50 p-3 rounded-t-lg text-sm uppercase tracking-wide border-b-2 border-emerald-100">{t('Future')}</div>

          {/* Rows */}
          {[TenseAspect.SIMPLE, TenseAspect.CONTINUOUS, TenseAspect.PERFECT, TenseAspect.PERFECT_CONTINUOUS].map((aspect) => (
            <React.Fragment key={aspect}>
              <div className="flex items-center justify-end pr-4 font-bold text-slate-400 text-sm text-right leading-tight uppercase tracking-wider">
                {t(aspect).replace(' ', '\n')}
              </div>
              {renderDesktopCell(TenseCategory.PAST, aspect)}
              {renderDesktopCell(TenseCategory.PRESENT, aspect)}
              {renderDesktopCell(TenseCategory.FUTURE, aspect)}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Detail Modal */}
      {selectedTense && (
        <div className="fixed inset-0 z-[60] flex items-end md:items-center justify-center bg-black/50 backdrop-blur-sm p-0 md:p-4" onClick={() => setSelectedTense(null)}>
          <div 
            className="bg-white rounded-t-2xl md:rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden animate-in slide-in-from-bottom-10 md:zoom-in duration-200 max-h-[90dvh] md:max-h-[85vh] flex flex-col"
            onClick={e => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className={`p-5 md:p-6 ${selectedTense.color} bg-opacity-30 flex justify-between items-start shrink-0`}>
              <div className="pr-8">
                <h3 className="text-xl md:text-2xl font-bold text-slate-900">{selectedTense.name}</h3>
                <span className="inline-block mt-2 px-3 py-1 rounded-full bg-white/60 text-xs md:text-sm font-mono border border-slate-200 shadow-sm">
                  {selectedTense.formula}
                </span>
              </div>
              <button onClick={() => setSelectedTense(null)} className="text-slate-500 hover:text-slate-800 bg-white/50 rounded-full p-2 absolute right-4 top-4 md:relative md:right-auto md:top-auto">
                <X size={24} />
              </button>
            </div>
            
            {/* Modal Body */}
            <div className="p-5 md:p-6 space-y-5 md:space-y-6 overflow-y-auto overscroll-contain">
              <div>
                <h4 className="text-xs md:text-sm font-bold text-slate-400 uppercase tracking-wider mb-1.5">{t('usage_label')}</h4>
                <p className="text-base md:text-lg text-slate-700 leading-relaxed">{selectedTense.description}</p>
              </div>

              <div>
                <h4 className="text-xs md:text-sm font-bold text-slate-400 uppercase tracking-wider mb-1.5">{t('example_label')}</h4>
                <p className="text-base md:text-lg font-medium text-slate-800 border-l-4 border-blue-500 pl-4 italic bg-slate-50 py-2 rounded-r-lg">
                  "{selectedTense.example}"
                </p>
              </div>

              {aiExplanation && (
                <div className="bg-indigo-50 p-4 rounded-lg text-sm text-slate-700 leading-relaxed border border-indigo-100 animate-in fade-in">
                   <div className="flex items-center gap-2 mb-2 text-indigo-700 font-semibold">
                      <Sparkles size={16} />
                      <span>{t('gemini_explanation')}</span>
                   </div>
                   <div className="whitespace-pre-wrap">{aiExplanation}</div>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="p-4 md:p-6 border-t border-slate-100 bg-slate-50/50 shrink-0 safe-bottom">
              <div className="flex flex-col md:flex-row gap-3">
                <button 
                  onClick={() => onPractice(selectedTense.name)}
                  className="flex-1 bg-slate