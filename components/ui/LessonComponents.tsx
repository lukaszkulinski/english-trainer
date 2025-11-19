
import React from 'react';
import { AlertCircle, Lightbulb, CheckCircle2, XCircle, Info, Star, ArrowRight } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';

// --- TYPOGRAPHY ---

export const LessonTitle: React.FC<{ children: React.ReactNode; subtitle?: string }> = ({ children, subtitle }) => (
  <div className="mb-6 md:mb-8 border-b border-slate-100 pb-4 md:pb-6">
    <h1 className="text-2xl md:text-4xl font-extrabold text-slate-900 tracking-tight mb-2 leading-tight">{children}</h1>
    {subtitle && <p className="text-base md:text-lg text-slate-500 font-medium leading-snug">{subtitle}</p>}
  </div>
);

export const SectionHeader: React.FC<{ icon?: React.ElementType; title: string }> = ({ icon: Icon, title }) => (
  <div className="flex items-center gap-3 mt-8 md:mt-10 mb-4 md:mb-6">
    {Icon && <div className="p-1.5 md:p-2 bg-indigo-100 text-indigo-600 rounded-lg"><Icon size={20} className="w-5 h-5 md:w-6 md:h-6" /></div>}
    <h2 className="text-xl md:text-2xl font-bold text-slate-800 leading-snug">{title}</h2>
  </div>
);

// --- CONTAINERS ---

export const RuleCard: React.FC<{ title?: string; children: React.ReactNode; type?: 'default' | 'important' }> = ({ title, children, type = 'default' }) => (
  <div className={`rounded-xl p-5 md:p-6 border-l-4 shadow-sm my-4 md:my-6 ${
    type === 'important' 
      ? 'bg-amber-50 border-amber-400' 
      : 'bg-slate-50 border-indigo-500'
  }`}>
    {title && <h3 className={`font-bold uppercase tracking-wider text-xs md:text-sm mb-3 ${
      type === 'important' ? 'text-amber-700' : 'text-indigo-700'
    }`}>{title}</h3>}
    <div className="text-slate-700 leading-relaxed text-sm md:text-base">
      {children}
    </div>
  </div>
);

export const ExampleBox: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="bg-white border border-slate-200 rounded-xl p-4 md:p-5 my-3 md:my-4 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
    <div className="absolute top-0 left-0 w-1 h-full bg-emerald-400"></div>
    <div className="flex items-start gap-3">
      <div className="mt-0.5 md:mt-1 text-emerald-500 shrink-0"><CheckCircle2 size={18} /></div>
      <div className="text-slate-800 font-medium italic text-base md:text-lg">{children}</div>
    </div>
  </div>
);

export const ProTip: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { t } = useLanguage();
  return (
    <div className="flex gap-3 md:gap-4 bg-gradient-to-r from-violet-50 to-indigo-50 p-4 md:p-5 rounded-xl border border-indigo-100 my-4 md:my-6">
      <div className="shrink-0 p-1.5 md:p-2 bg-white rounded-full shadow-sm h-fit text-indigo-600">
        <Lightbulb size={18} className="md:w-5 md:h-5" />
      </div>
      <div>
        <h4 className="font-bold text-indigo-900 mb-1 text-xs md:text-sm uppercase">{t('protip')}</h4>
        <p className="text-indigo-800/80 text-sm leading-relaxed">{children}</p>
      </div>
    </div>
  );
};

export const MistakeAlert: React.FC<{ correct: string; incorrect: string; explanation?: string }> = ({ correct, incorrect, explanation }) => {
  const { t } = useLanguage();
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4 my-4 md:my-6">
      <div className="bg-red-50 p-4 rounded-xl border border-red-100">
        <div className="flex items-center gap-2 text-red-700 font-bold text-xs uppercase mb-2">
          <XCircle size={14} /> {t('dont_say')}
        </div>
        <p className="text-red-900 line-through decoration-red-400/50 decoration-2 text-sm md:text-base">{incorrect}</p>
      </div>
      <div className="bg-green-50 p-4 rounded-xl border border-green-100">
        <div className="flex items-center gap-2 text-green-700 font-bold text-xs uppercase mb-2">
          <CheckCircle2 size={14} /> {t('say_instead')}
        </div>
        <p className="text-green-900 font-medium text-sm md:text-base">{correct}</p>
      </div>
      {explanation && (
        <div className="md:col-span-2 text-xs text-slate-500 text-center italic">
          {t('reason')}: {explanation}
        </div>
      )}
    </div>
  );
};

// --- DATA DISPLAY ---

export const GrammarTable: React.FC<{ 
  headers: string[]; 
  rows: (string | React.ReactNode)[][];
  variant?: 'blue' | 'green' | 'purple';
}> = ({ headers, rows, variant = 'blue' }) => {
  const colors = {
    blue: 'bg-blue-50 text-blue-700 border-blue-100',
    green: 'bg-emerald-50 text-emerald-700 border-emerald-100',
    purple: 'bg-purple-50 text-purple-700 border-purple-100'
  };

  const borderColors = {
    blue: 'border-l-blue-500',
    green: 'border-l-emerald-500',
    purple: 'border-l-purple-500'
  };

  // Helper to parse simple markdown bolding (**text**) in strings
  const renderCell = (content: string | React.ReactNode) => {
    if (typeof content === 'string' && content.includes('**')) {
      const parts = content.split(/(\*\*.*?\*\*)/g);
      return (
        <span>
          {parts.map((part, i) => {
            if (part.startsWith('**') && part.endsWith('**')) {
              return <strong key={i} className="font-bold text-slate-900">{part.slice(2, -2)}</strong>;
            }
            return <span key={i}>{part}</span>;
          })}
        </span>
      );
    }
    return content;
  };

  return (
    <div className="my-4 md:my-6">
      {/* Desktop Table View */}
      <div className="hidden md:block overflow-x-auto rounded-xl border border-slate-200 shadow-sm">
        <table className="w-full text-left border-collapse">
          <thead className={`text-[10px] md:text-xs uppercase font-bold ${colors[variant]}`}>
            <tr>
              {headers.map((h, i) => (
                <th key={i} className="px-4 py-3 md:px-6 md:py-3 border-b border-slate-200/50 whitespace-nowrap">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-slate-100 text-sm md:text-base">
            {rows.map((row, i) => (
              <tr key={i} className="hover:bg-slate-50/80">
                {row.map((cell, j) => (
                  <td key={j} className={`px-4 py-3 md:px-6 md:py-4 ${j === 0 ? 'font-semibold text-slate-900 whitespace-nowrap' : 'text-slate-600 min-w-[120px]'}`}>
                    {renderCell(cell)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Card View */}
      <div className="md:hidden space-y-3">
        {rows.map((row, i) => (
          <div key={i} className={`bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden relative pl-5 pt-4 pr-4 pb-2 border-l-[6px] ${borderColors[variant]}`}>
             {row.map((cell, j) => (
               <div key={j} className={`mb-3 ${j !== row.length - 1 ? 'border-b border-slate-50 pb-2' : ''}`}>
                 <div className="text-[10px] font-bold uppercase text-slate-400 tracking-wider mb-1">{headers[j]}</div>
                 <div className={`text-sm ${j === 0 ? 'font-bold text-slate-900 text-base' : 'text-slate-700'}`}>
                    {renderCell(cell)}
                 </div>
               </div>
             ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export const VocabList: React.FC<{ items: { term: string; def: string }[] }> = ({ items }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 my-4 md:my-6">
    {items.map((item, idx) => (
      <div key={idx} className="flex items-start gap-3 p-3 rounded-lg bg-slate-50 border border-slate-100">
        <span className="font-bold text-indigo-700 shrink-0 text-sm md:text-base">{item.term}</span>
        <span className="text-slate-600 text-xs md:text-sm leading-snug">{item.def}</span>
      </div>
    ))}
  </div>
);
