
import React, { useState } from 'react';
import { CURRICULUM } from '../data/curriculum';
import { Chapter } from '../types';
import { ChevronDown, ChevronRight, BookOpen, CheckCircle2, Lock } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface CurriculumViewProps {
  onSelectChapter: (chapter: Chapter, level: string) => void;
}

export const CurriculumView: React.FC<CurriculumViewProps> = ({ onSelectChapter }) => {
  const { t } = useLanguage();
  const [expandedLevel, setExpandedLevel] = useState<string | null>("Beginner");

  return (
    <div className="max-w-3xl mx-auto pb-12 space-y-4 md:space-y-6">
      <div className="text-center mb-6 md:mb-8 px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-slate-800 mb-2">{t('study_path')}</h2>
        <p className="text-sm md:text-base text-slate-600">{t('study_subtitle')}</p>
      </div>

      {Object.entries(CURRICULUM).map(([levelName, data]) => {
        const isExpanded = expandedLevel === levelName;
        
        // Color coding based on level
        const headerColor = levelName === 'Beginner' ? 'bg-blue-50 border-blue-200 text-blue-900' :
                           levelName === 'Intermediate' ? 'bg-amber-50 border-amber-200 text-amber-900' :
                           'bg-emerald-50 border-emerald-200 text-emerald-900';

        return (
          <div key={levelName} className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden transition-all duration-300">
            {/* Accordion Header */}
            <button 
              onClick={() => setExpandedLevel(isExpanded ? null : levelName)}
              className={`w-full p-4 md:p-5 flex items-center justify-between text-left transition-colors ${headerColor} ${isExpanded ? 'border-b' : ''}`}
            >
              <div className="flex-1 min-w-0 pr-4">
                 <h3 className="text-lg md:text-xl font-bold flex flex-wrap items-center gap-2">
                    <span>{t(levelName.toLowerCase())}</span>
                    <span className="text-[10px] md:text-xs font-medium bg-white/50 px-2 py-0.5 rounded border border-black/5 whitespace-nowrap">{data.level}</span>
                 </h3>
                 <p className="text-xs md:text-sm opacity-80 mt-1">{data.chapters.length} {t('lessons_count')}</p>
              </div>
              <div className={`p-1.5 md:p-2 rounded-full bg-white/40 transition-transform duration-300 shrink-0 ${isExpanded ? 'rotate-180' : ''}`}>
                <ChevronDown size={20} className="w-5 h-5 md:w-6 md:h-6" />
              </div>
            </button>

            {/* Accordion Content */}
            <div className={`transition-all duration-300 ease-in-out overflow-hidden ${isExpanded ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'}`}>
              <div className="p-3 md:p-4 space-y-2 bg-slate-50/50">
                {data.chapters.map((chapter, idx) => (
                  <div 
                    key={idx}
                    onClick={() => onSelectChapter(chapter, levelName)}
                    className="group bg-white p-3 md:p-4 rounded-xl border border-slate-100 hover:border-indigo-200 hover:shadow-md cursor-pointer transition-all flex items-center justify-between active:scale-[0.98]"
                  >
                    <div className="flex items-start gap-3 md:gap-4 overflow-hidden">
                       <div className="mt-0.5 w-7 h-7 md:w-8 md:h-8 rounded-full bg-slate-100 text-slate-500 flex items-center justify-center font-bold text-xs md:text-sm group-hover:bg-indigo-100 group-hover:text-indigo-600 transition-colors shrink-0">
                         {idx + 1}
                       </div>
                       <div className="min-w-0">
                         <h4 className="font-bold text-sm md:text-base text-slate-800 group-hover:text-indigo-700 transition-colors truncate break-words whitespace-normal">{chapter.title}</h4>
                         <p className="text-[10px] md:text-xs text-slate-500 mt-1 line-clamp-1">
                            {chapter.content.join(" • ")}
                         </p>
                       </div>
                    </div>
                    <ChevronRight size={18} className="text-slate-300 group-hover:text-indigo-400 shrink-0" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
