
import React from 'react';
import { Languages, ArrowRightLeft, BookA } from 'lucide-react';
import { VocabDirection } from '../types';
import { useLanguage } from '../contexts/LanguageContext';

interface VocabularyPanelProps {
  onPractice: (direction: VocabDirection) => void;
}

export const VocabularyPanel: React.FC<VocabularyPanelProps> = ({ onPractice }) => {
  const { t } = useLanguage();

  return (
    <div className="max-w-4xl mx-auto px-2 md:px-4 pb-12 space-y-6 md:space-y-8">
      <div className="text-center mb-4 md:mb-8">
        <h2 className="text-2xl md:text-3xl font-bold text-slate-800 mb-2">{t('vocab_title')}</h2>
        <p className="text-sm md:text-base text-slate-600">{t('vocab_subtitle')}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
        {/* PL -> EN Card */}
        <div 
          onClick={() => onPractice('PL_EN')}
          className="group cursor-pointer bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-slate-200 hover:shadow-xl hover:border-indigo-200 transition-all duration-300 relative overflow-hidden active:scale-[0.98]"
        >
          <div className="absolute top-0 right-0 w-24 h-24 md:w-32 md:h-32 bg-indigo-50 rounded-bl-full -mr-6 -mt-6 md:-mr-8 md:-mt-8 transition-transform group-hover:scale-110"></div>
          
          <div className="relative z-10">
            <div className="w-12 h-12 md:w-14 md:h-14 bg-indigo-100 text-indigo-600 rounded-xl flex items-center justify-center mb-4 md:mb-6">
               <Languages size={24} className="md:w-8 md:h-8" />
            </div>
            
            <h3 className="text-xl md:text-2xl font-bold text-slate-900 mb-2 flex items-center gap-2">
              Polish <ArrowRightLeft size={18} className="text-slate-400 md:w-5 md:h-5" /> English
            </h3>
            <p className="text-slate-600 text-sm md:text-base mb-6">
              {t('pl_en_desc')} <br/>
              <span className="text-indigo-600 font-medium text-xs md:text-sm bg-indigo-50 px-2 py-1 rounded mt-2 inline-block">
                {t('requires_verb_forms')}
              </span>
            </p>

            <button className="w-full py-3 bg-slate-900 text-white rounded-xl font-semibold text-sm md:text-base group-hover:bg-indigo-600 transition-colors shadow-md">
              {t('btn_start_practice')}
            </button>
          </div>
        </div>

        {/* EN -> PL Card */}
        <div 
          onClick={() => onPractice('EN_PL')}
          className="group cursor-pointer bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-slate-200 hover:shadow-xl hover:border-emerald-200 transition-all duration-300 relative overflow-hidden active:scale-[0.98]"
        >
          <div className="absolute top-0 right-0 w-24 h-24 md:w-32 md:h-32 bg-emerald-50 rounded-bl-full -mr-6 -mt-6 md:-mr-8 md:-mt-8 transition-transform group-hover:scale-110"></div>
          
          <div className="relative z-10">
            <div className="w-12 h-12 md:w-14 md:h-14 bg-emerald-100 text-emerald-600 rounded-xl flex items-center justify-center mb-4 md:mb-6">
               <BookA size={24} className="md:w-8 md:h-8" />
            </div>
            
            <h3 className="text-xl md:text-2xl font-bold text-slate-900 mb-2 flex items-center gap-2">
              English <ArrowRightLeft size={18} className="text-slate-400 md:w-5 md:h-5" /> Polish
            </h3>
            <p className="text-slate-600 text-sm md:text-base mb-6">
              {t('en_pl_desc')} <br/>
              <span className="text-emerald-600 font-medium text-xs md:text-sm bg-emerald-50 px-2 py-1 rounded mt-2 inline-block">
                 {t('focus_meaning')}
              </span>
            </p>

            <button className="w-full py-3 bg-slate-900 text-white rounded-xl font-semibold text-sm md:text-base group-hover:bg-emerald-600 transition-colors shadow-md">
              {t('btn_start_practice')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
