
import React, { useState } from 'react';
import { IRREGULAR_VERBS } from '../data/irregularVerbs';
import { ArrowLeft, Search, List, ArrowRight } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface IrregularVerbsViewProps {
  onBack: () => void;
}

export const IrregularVerbsView: React.FC<IrregularVerbsViewProps> = ({ onBack }) => {
  const { t } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredVerbs = IRREGULAR_VERBS.filter(verb => 
    verb.base.toLowerCase().includes(searchTerm.toLowerCase()) ||
    verb.past.toLowerCase().includes(searchTerm.toLowerCase()) ||
    verb.participle.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-4xl mx-auto animate-in fade-in duration-300 pb-12">
      {/* Header */}
      <div className="mb-4 md:mb-6 flex items-center gap-3 md:gap-4 px-4 pt-2">
        <button 
          onClick={onBack}
          className="p-2 rounded-full hover:bg-slate-200 text-slate-600 transition-colors active:scale-95"
        >
          <ArrowLeft size={24} />
        </button>
        <div>
          <h2 className="text-xl md:text-2xl font-bold text-slate-800 flex items-center gap-2">
            <List className="text-indigo-600" size={24} />
            {t('irregular_verbs_title')}
          </h2>
          <p className="text-slate-600 text-xs md:text-sm">{t('irregular_verbs_subtitle')}</p>
        </div>
      </div>

      {/* Search - Sticky */}
      <div className="sticky top-[3.5rem] md:top-[4rem] z-30 bg-slate-50/95 backdrop-blur-xl py-2 px-4 mb-4 md:mb-8 border-b border-slate-200/50 md:border-none md:bg-transparent transition-all">
        <div className="relative shadow-sm md:shadow-none">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-slate-400" />
          </div>
          <input
            type="text"
            placeholder={t('search_placeholder')}
            className="block w-full pl-10 pr-3 py-3 border border-slate-200 rounded-xl leading-5 bg-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-base shadow-sm transition-all appearance-none"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="px-2 md:px-4">
        
        {/* DESKTOP TABLE VIEW (Hidden on Mobile) */}
        <div className="hidden md:block bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-200">
              <thead className="bg-slate-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-slate-500 uppercase tracking-wider w-1/3">
                    {t('base_form')} (V1)
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-slate-500 uppercase tracking-wider w-1/3">
                    {t('past_simple')} (V2)
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-slate-500 uppercase tracking-wider w-1/3">
                    {t('past_participle')} (V3)
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-slate-200">
                {filteredVerbs.length > 0 ? (
                  filteredVerbs.map((verb, index) => (
                    <tr key={index} className="hover:bg-slate-50/80 transition-colors group">
                      <td className="px-6 py-4 whitespace-nowrap text-base font-bold text-slate-900 group-hover:text-indigo-700">
                        {verb.base}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-base text-slate-700 font-medium">
                        {verb.past}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-base text-slate-500">
                        {verb.participle}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={3} className="px-6 py-12 text-center text-slate-500">
                      {t('no_verbs_found')} "{searchTerm}"
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* MOBILE CARD VIEW (Hidden on Desktop) */}
        <div className="md:hidden space-y-3">
          {filteredVerbs.length > 0 ? (
            filteredVerbs.map((verb, index) => (
              <div key={index} className="bg-white rounded-xl border border-slate-200 shadow-sm p-4 active:scale-[0.99] transition-transform">
                <div className="flex items-center justify-between mb-3">
                   <h3 className="text-xl font-extrabold text-slate-900">{verb.base}</h3>
                   <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 bg-slate-50 px-2 py-1 rounded border border-slate-100">{t('base_form')}</span>
                </div>
                
                <div className="grid grid-cols-[1fr_auto_1fr] gap-2 items-center">
                   <div className="bg-indigo-50/50 p-2.5 rounded-lg border border-indigo-50">
                      <span className="block text-[10px] font-bold uppercase text-indigo-400 mb-0.5">V2</span>
                      <span className="block font-semibold text-indigo-900 text-sm">{verb.past}</span>
                   </div>

                   <ArrowRight size={16} className="text-slate-300" />

                   <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                      <span className="block text-[10px] font-bold uppercase text-slate-400 mb-0.5">V3</span>
                      <span className="block font-medium text-slate-600 text-sm">{verb.participle}</span>
                   </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-12">
               <div className="bg-slate-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-400">
                  <Search size={24} />
               </div>
               <h3 className="text-slate-900 font-bold mb-1">{t('no_verbs_found')}</h3>
               <p className="text-slate-500 text-sm">Try searching for a different form.</p>
            </div>
          )}
        </div>
        
        <div className="mt-4 text-center text-xs text-slate-400 pb-safe">
          {t('showing_verbs')} {filteredVerbs.length} {t('verbs_count')}
        </div>
      </div>
    </div>
  );
};
