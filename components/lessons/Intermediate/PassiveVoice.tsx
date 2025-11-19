
import React from 'react';
import { LessonTitle, SectionHeader, RuleCard, GrammarTable, ExampleBox, MistakeAlert } from '../../ui/LessonComponents';
import { RefreshCw, EyeOff } from 'lucide-react';
import { useLanguage } from '../../../contexts/LanguageContext';

export const PassiveVoiceLesson: React.FC = () => {
  const { language } = useLanguage();
  const content = {
    en: {
      subtitle: "Focusing on the Object",
      active: "Active",
      active_desc: "Subject does the action.",
      passive: "Passive",
      passive_desc: "Subject receives the action.",
      when_title: "When to use it?",
      use_1: "<strong>Unknown Agent:</strong> We don't know who did it.",
      use_2: "<strong>Obvious Agent:</strong> It's clear who did it.",
      use_3: "<strong>Formal/Scientific:</strong> Facts and processes.",
      tense_title: "Tense Changes",
      formula: "Formula: Be + Past Participle (V3)",
      mistake_exp: "'Born' is a passive verb (your mother bore you). It always needs 'was/were'."
    },
    pl: {
      subtitle: "Skupienie na obiekcie",
      active: "Strona czynna",
      active_desc: "Podmiot wykonuje czynność.",
      passive: "Strona bierna",
      passive_desc: "Podmiot podlega czynności.",
      when_title: "Kiedy używać?",
      use_1: "<strong>Nieznany sprawca:</strong> Nie wiemy, kto to zrobił.",
      use_2: "<strong>Oczywisty sprawca:</strong> Wiadomo, kto to zrobił.",
      use_3: "<strong>Styl formalny/naukowy:</strong> Fakty i procesy.",
      tense_title: "Zmiana czasu",
      formula: "Wzór: Be + V3 (Imiesłów)",
      mistake_exp: "'Born' (urodzić się) jest bierne. Zawsze wymaga 'was/were'."
    }
  };
  const t = content[language];

  return (
    <div className="animate-in fade-in duration-500">
      <LessonTitle subtitle={t.subtitle}>
        Passive Voice
      </LessonTitle>

      <SectionHeader icon={RefreshCw} title="Active vs. Passive" />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
         <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
            <h3 className="text-lg font-bold text-indigo-600 mb-2">{t.active}</h3>
            <p className="text-slate-500 mb-4">{t.active_desc}</p>
            <div className="text-lg">
               <span className="font-bold text-slate-800">Picasso</span> painted this picture.
            </div>
         </div>
         <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
            <h3 className="text-lg font-bold text-emerald-600 mb-2">{t.passive}</h3>
            <p className="text-slate-500 mb-4">{t.passive_desc}</p>
            <div className="text-lg">
               <span className="font-bold text-slate-800">This picture</span> was painted by Picasso.
            </div>
         </div>
      </div>

      <SectionHeader icon={EyeOff} title={t.when_title} />
      <ul className="space-y-3 text-slate-700 mb-8">
         <li className="flex items-start gap-3">
            <span className="bg-indigo-100 text-indigo-600 rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold mt-0.5">1</span>
            <div dangerouslySetInnerHTML={{__html: t.use_1 + " <br/> <em>\"My bike was stolen.\"</em>"}}></div>
         </li>
         <li className="flex items-start gap-3">
            <span className="bg-indigo-100 text-indigo-600 rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold mt-0.5">2</span>
            <div dangerouslySetInnerHTML={{__html: t.use_2 + " <br/> <em>\"The thief was arrested.\"</em>"}}></div>
         </li>
         <li className="flex items-start gap-3">
            <span className="bg-indigo-100 text-indigo-600 rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold mt-0.5">3</span>
            <div dangerouslySetInnerHTML={{__html: t.use_3 + " <br/> <em>\"The water is heated to 100 degrees.\"</em>"}}></div>
         </li>
      </ul>

      <SectionHeader title={t.tense_title} />
      <RuleCard title={t.formula}>
         <GrammarTable 
            headers={['Tense', 'Active', 'Passive (Be + V3)']}
            rows={[
               ['Present Simple', 'eats', 'is eaten'],
               ['Past Simple', 'ate', 'was eaten'],
               ['Present Perfect', 'has eaten', 'has been eaten'],
               ['Future', 'will eat', 'will be eaten'],
            ]}
            variant="blue"
         />
      </RuleCard>

      <MistakeAlert 
         correct="I was born in 1990." 
         incorrect="I born in 1990." 
         explanation={t.mistake_exp}
      />
    </div>
  );
};
