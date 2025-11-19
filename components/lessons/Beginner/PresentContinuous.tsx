
import React from 'react';
import { LessonTitle, SectionHeader, RuleCard, GrammarTable, ExampleBox, MistakeAlert, ProTip } from '../../ui/LessonComponents';
import { Clock, Zap, AlertOctagon } from 'lucide-react';
import { useLanguage } from '../../../contexts/LanguageContext';

export const PresentContinuousLesson: React.FC = () => {
  const { language } = useLanguage();

  const content = {
    en: {
      subtitle: "Happening Now",
      when_use: "When to use it?",
      now: "Right Now",
      temp: "Temporary",
      plans: "Fixed Plans",
      formula: "The Formula",
      spelling: "Spelling Rules for -ing",
      rule_1: "Most verbs: Add **-ing**",
      rule_2: "Ends in 'e': Remove 'e' + **-ing**",
      rule_3: "Short vowel + consonant: Double it!",
      stative: "Stative Verbs (Don't use -ing!)",
      stative_desc: "Some verbs describe feelings or states, not actions. We usually do NOT use them in continuous form.",
      mistake_exp: "'Want' is a state, not an action.",
      protip: "Look for time words: *Now, Right now, At the moment, Currently*."
    },
    pl: {
      subtitle: "Dzieje się teraz",
      when_use: "Kiedy używać?",
      now: "W tej chwili",
      temp: "Tymczasowo",
      plans: "Ustalone plany",
      formula: "Wzór",
      spelling: "Pisownia końcówki -ing",
      rule_1: "Większość: Dodaj **-ing**",
      rule_2: "Kończy się na 'e': Usuń 'e' + **-ing**",
      rule_3: "Krótka samogłoska + spółgłoska: Podwój ostatnią!",
      stative: "Czasowniki Statyczne (Bez -ing!)",
      stative_desc: "Niektóre czasowniki opisują uczucia lub stany, a nie akcje. Zazwyczaj NIE używamy ich w formie ciągłej.",
      mistake_exp: "'Want' (chcieć) to stan, a nie czynność.",
      protip: "Szukaj słów: *Now, Right now, At the moment, Currently*."
    }
  };

  const t = content[language];

  return (
    <div className="animate-in fade-in duration-500">
      <LessonTitle subtitle={t.subtitle}>
        Present Continuous
      </LessonTitle>

      <SectionHeader icon={Clock} title={t.when_use} />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
         <div className="bg-indigo-50 p-4 rounded-xl border border-indigo-100 text-center">
            <strong className="block text-indigo-900 mb-2">{t.now}</strong>
            <p className="text-sm text-indigo-700">"I am speaking."</p>
         </div>
         <div className="bg-indigo-50 p-4 rounded-xl border border-indigo-100 text-center">
            <strong className="block text-indigo-900 mb-2">{t.temp}</strong>
            <p className="text-sm text-indigo-700">"I'm staying here for a week."</p>
         </div>
         <div className="bg-indigo-50 p-4 rounded-xl border border-indigo-100 text-center">
            <strong className="block text-indigo-900 mb-2">{t.plans}</strong>
            <p className="text-sm text-indigo-700">"I am meeting John later."</p>
         </div>
      </div>

      <SectionHeader icon={Zap} title={t.formula} />
      <RuleCard title="Be + V-ing">
        <GrammarTable 
          headers={['Subject', 'Be', 'Verb-ing']}
          rows={[
            ['I', 'am', 'reading.'],
            ['He / She / It', 'is', 'sleeping.'],
            ['You / We / They', 'are', 'working.'],
          ]}
          variant="green"
        />
      </RuleCard>

      <h3 className="font-bold text-slate-800 mt-6 mb-3">{t.spelling}</h3>
      <div className="space-y-2 text-slate-700">
         <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-indigo-500 rounded-full"></span>
            {language === 'en' ? <span>Most verbs: Add <strong>-ing</strong> (Play → Playing)</span> : <span>Większość: Dodaj <strong>-ing</strong> (Play → Playing)</span>}
         </div>
         <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-indigo-500 rounded-full"></span>
            {language === 'en' ? <span>Ends in 'e': Remove 'e' + <strong>-ing</strong> (Make → Making)</span> : <span>Koniec na 'e': Usuń 'e' + <strong>-ing</strong> (Make → Making)</span>}
         </div>
         <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-indigo-500 rounded-full"></span>
            {language === 'en' ? <span>Short vowel + consonant: Double it! (Run → Running)</span> : <span>Krótka samogłoska + spółgłoska: Podwój! (Run → Running)</span>}
         </div>
      </div>

      <SectionHeader icon={AlertOctagon} title={t.stative} />
      <p className="mb-4 text-slate-600">{t.stative_desc}</p>
      
      <div className="flex flex-wrap gap-2 mb-6">
         {['Like', 'Love', 'Hate', 'Want', 'Need', 'Know', 'Believe', 'Understand'].map(v => (
            <span key={v} className="px-3 py-1 bg-red-50 text-red-700 border border-red-100 rounded-md text-sm font-medium">
               {v}
            </span>
         ))}
      </div>

      <MistakeAlert 
        correct="I want a coffee." 
        incorrect="I am wanting a coffee." 
        explanation={t.mistake_exp} 
      />

      <ProTip>
         {t.protip}
      </ProTip>
    </div>
  );
};
