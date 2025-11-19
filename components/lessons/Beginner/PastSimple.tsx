
import React from 'react';
import { LessonTitle, SectionHeader, RuleCard, GrammarTable, ExampleBox, MistakeAlert, ProTip } from '../../ui/LessonComponents';
import { History, AlertTriangle, CheckSquare, List } from 'lucide-react';
import { useLanguage } from '../../../contexts/LanguageContext';

interface PastSimpleLessonProps {
  onOpenIrregularVerbs?: () => void;
}

export const PastSimpleLesson: React.FC<PastSimpleLessonProps> = ({ onOpenIrregularVerbs }) => {
  const { language } = useLanguage();

  const content = {
    en: {
      subtitle: "Finished actions in the past",
      regular_title: "Regular Verbs",
      regular_desc: "Just add **-ed**!",
      irregular_title: "Irregular Verbs",
      irregular_desc: "They change completely. Memorize them!",
      view_list: "View Full List",
      neg_ques_title: "Negatives & Questions",
      helper_did: "Use the helper 'Did'",
      helper_rule: "In negatives and questions, we use **Did**. The main verb goes back to base form!",
      be_title: "The Verb 'To Be' in Past",
      be_desc: "'To Be' is special. It doesn't use 'Did'.",
      mistake_inc: "I didn't saw him.",
      mistake_corr: "I didn't see him.",
      mistake_exp: "After 'didn't', use the base form (see), not the past form (saw).",
      ex_1: "I **was** tired, so I didn't go out.",
      ex_2: "They **were** late for the meeting."
    },
    pl: {
      subtitle: "Zakończone czynności w przeszłości",
      regular_title: "Czasowniki Regularne",
      regular_desc: "Po prostu dodaj **-ed**!",
      irregular_title: "Czasowniki Nieregularne",
      irregular_desc: "Zmieniają się całkowicie. Naucz się ich na pamięć!",
      view_list: "Zobacz pełną listę",
      neg_ques_title: "Przeczenia i Pytania",
      helper_did: "Użyj operatora 'Did'",
      helper_rule: "W przeczeniach i pytaniach używamy **Did**. Czasownik główny wraca do formy podstawowej!",
      be_title: "Czasownik 'To Be' (Być) w przeszłości",
      be_desc: "'To Be' jest wyjątkowy. Nie używa 'Did'.",
      mistake_inc: "I didn't saw him.",
      mistake_corr: "I didn't see him.",
      mistake_exp: "Po 'didn't' używamy formy podstawowej (see), a nie czasu przeszłego (saw).",
      ex_1: "I **was** tired, so I didn't go out. (Byłem zmęczony...)",
      ex_2: "They **were** late for the meeting. (Oni byli spóźnieni...)"
    }
  };

  const t = content[language];

  return (
    <div className="animate-in fade-in duration-500">
      <LessonTitle subtitle={t.subtitle}>
        Past Simple
      </LessonTitle>

      <SectionHeader icon={History} title={language === 'en' ? "Regular vs Irregular" : "Regularne vs Nieregularne"} />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
         <div className="bg-green-50 p-5 rounded-xl border border-green-100">
            <h3 className="font-bold text-green-800 mb-3 flex items-center gap-2"><CheckSquare size={18}/> {t.regular_title}</h3>
            <p className="text-sm text-green-900 mb-2">{language === 'en' ? "Just add" : "Po prostu dodaj"} <strong>-ed</strong>!</p>
            <ul className="space-y-1 text-sm text-green-800/80">
               <li>Walk → Walked</li>
               <li>Play → Played</li>
               <li>Watch → Watched</li>
            </ul>
         </div>

         <div className="bg-amber-50 p-5 rounded-xl border border-amber-100 relative overflow-hidden">
            <h3 className="font-bold text-amber-800 mb-3 flex items-center gap-2"><AlertTriangle size={18}/> {t.irregular_title}</h3>
            <p className="text-sm text-amber-900 mb-2">{t.irregular_desc}</p>
            <ul className="space-y-1 text-sm text-amber-800/80 mb-4">
               <li>Go → Went</li>
               <li>See → Saw</li>
               <li>Buy → Bought</li>
            </ul>
            {onOpenIrregularVerbs && (
               <button 
                 onClick={onOpenIrregularVerbs}
                 className="w-full bg-amber-100 hover:bg-amber-200 text-amber-800 py-2 rounded-lg text-sm font-bold transition-colors flex items-center justify-center gap-2"
               >
                 <List size={16} /> {t.view_list}
               </button>
            )}
         </div>
      </div>

      <SectionHeader title={t.neg_ques_title} />
      <RuleCard title={t.helper_did} type="default">
         <p className="mb-4">{language === 'en' ? "In negatives and questions, we use" : "W przeczeniach i pytaniach używamy"} <strong>Did</strong>. {language === 'en' ? "The main verb goes back to base form!" : "Czasownik główny wraca do formy podstawowej!"}</p>
         <GrammarTable 
            headers={['Type', 'Structure', 'Example']}
            rows={[
               ['Positive', 'Subject + V2', 'I **went** to the park.'],
               ['Negative', 'Didn\'t + V1', 'I **didn\'t go** to the park.'],
               ['Question', 'Did + S + V1', '**Did** you **go** to the park?'],
            ]}
            variant="blue"
         />
      </RuleCard>

      <MistakeAlert 
        correct={t.mistake_corr} 
        incorrect={t.mistake_inc} 
        explanation={t.mistake_exp} 
      />

      <SectionHeader title={t.be_title} />
      <p className="text-slate-600 mb-4">{t.be_desc}</p>
      
      <div className="grid grid-cols-2 gap-4 mb-6">
         <div className="p-4 border rounded-lg text-center">
            <strong className="block mb-1 text-indigo-600">Was</strong>
            <span className="text-xs text-slate-500">I / He / She / It</span>
         </div>
         <div className="p-4 border rounded-lg text-center">
            <strong className="block mb-1 text-indigo-600">Were</strong>
            <span className="text-xs text-slate-500">You / We / They</span>
         </div>
      </div>

      <ExampleBox>
         {language === 'en' ? 
           <>I <strong>was</strong> tired, so I didn't go out. <br/> They <strong>were</strong> late for the meeting.</> 
           : 
           <>I <strong>was</strong> tired... (Byłem zmęczony...) <br/> They <strong>were</strong> late... (Oni byli spóźnieni...)</>
         }
      </ExampleBox>
    </div>
  );
};
