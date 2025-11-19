
import React from 'react';
import { LessonTitle, SectionHeader, RuleCard, GrammarTable, ExampleBox, MistakeAlert, ProTip } from '../../ui/LessonComponents';
import { User, Type, LayoutTemplate, List } from 'lucide-react';
import { useLanguage } from '../../../contexts/LanguageContext';

interface EnglishBasicsLessonProps {
  onOpenIrregularVerbs?: () => void;
}

export const EnglishBasicsLesson: React.FC<EnglishBasicsLessonProps> = ({ onOpenIrregularVerbs }) => {
  const { language } = useLanguage();

  const content = {
    en: {
      subtitle: "Pronouns, To Be, and Sentence Structure",
      pronouns_title: "Personal Pronouns",
      pronouns_desc: "Pronouns replace names. You need them in almost every sentence!",
      be_title: "The Verb 'To Be'",
      be_rule_title: "The Most Important Verb",
      be_rule_desc: "\"To be\" is irregular. It changes form depending on the person.",
      other_irregular: "There are many other irregular verbs in English!",
      view_irregular: "See all Irregular Verbs",
      mistake_exp: "In English, we use 'to be' for age, not 'have'.",
      articles_title: "Articles: A, An, The",
      indefinite: "Indefinite (A / An)",
      indefinite_desc: "Use for one general thing (not specific).",
      cons_sound: "+ Consonant sound (A car, A dog)",
      vowel_sound: "+ Vowel sound (An apple, An hour)",
      definite: "Definite (The)",
      definite_desc: "Use for specific things we both know.",
      structure_title: "Sentence Structure (SVO)",
      protip: "English word order is strict! **Subject** + **Verb** + **Object**.",
      mistake_structure: "The verb must come after the subject."
    },
    pl: {
      subtitle: "Zaimki, Czasownik 'Być' i Budowa Zdania",
      pronouns_title: "Zaimki Osobowe",
      pronouns_desc: "Zaimki zastępują imiona. Potrzebujesz ich w prawie każdym zdaniu!",
      be_title: "Czasownik 'To Be' (Być)",
      be_rule_title: "Najważniejszy Czasownik",
      be_rule_desc: "\"To be\" jest nieregularny. Zmienia formę w zależności od osoby.",
      other_irregular: "W angielskim jest wiele innych czasowników nieregularnych!",
      view_irregular: "Zobacz czasowniki nieregularne",
      mistake_exp: "W angielskim o wieku mówimy używając 'to be' (być), a nie 'have' (mieć).",
      articles_title: "Przedimki: A, An, The",
      indefinite: "Nieokreślone (A / An)",
      indefinite_desc: "Używaj dla pojedynczych, ogólnych rzeczy.",
      cons_sound: "+ Spółgłoska (A car, A dog)",
      vowel_sound: "+ Samogłoska (An apple, An hour)",
      definite: "Określone (The)",
      definite_desc: "Używaj dla konkretnych rzeczy, o których oboje wiemy.",
      structure_title: "Budowa Zdania (SVO)",
      protip: "Szyk zdania jest sztywny! **Podmiot** + **Orzeczenie** + **Dopełnienie**.",
      mistake_structure: "Czasownik musi być po podmiocie."
    }
  };

  const t = content[language];

  return (
    <div className="animate-in fade-in duration-500">
      <LessonTitle subtitle={t.subtitle}>
        English Basics
      </LessonTitle>

      <SectionHeader icon={User} title={t.pronouns_title} />
      <p className="text-slate-600 mb-4">{t.pronouns_desc}</p>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
         {['I', 'You', 'He', 'She', 'It', 'We', 'They'].map(p => (
           <div key={p} className="bg-indigo-50 text-indigo-700 font-bold text-center py-3 rounded-lg border border-indigo-100">
             {p}
           </div>
         ))}
      </div>

      <SectionHeader icon={LayoutTemplate} title={t.be_title} />
      <RuleCard title={t.be_rule_title} type="important">
        <p className="mb-4">{t.be_rule_desc}</p>
        <GrammarTable 
          headers={['Person', 'Form', 'Example']}
          rows={[
            ['I', 'am', 'I am happy.'],
            ['He / She / It', 'is', 'She is a doctor.'],
            ['You / We / They', 'are', 'We are friends.'],
          ]}
        />
        {onOpenIrregularVerbs && (
          <div className="mt-4 border-t border-amber-200 pt-3">
             <p className="text-sm text-amber-800 mb-2">{t.other_irregular}</p>
             <button 
               onClick={onOpenIrregularVerbs}
               className="bg-white text-amber-700 border border-amber-300 px-4 py-2 rounded-lg text-sm font-bold hover:bg-amber-50 transition-colors flex items-center gap-2"
             >
               <List size={14} />
               {t.view_irregular}
             </button>
          </div>
        )}
      </RuleCard>

      <MistakeAlert 
        correct="I am 20 years old." 
        incorrect="I have 20 years." 
        explanation={t.mistake_exp} 
      />

      <SectionHeader icon={Type} title={t.articles_title} />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
          <h3 className="font-bold text-slate-800 mb-2 text-lg">{t.indefinite}</h3>
          <p className="text-sm text-slate-600 mb-3">{t.indefinite_desc}</p>
          <ul className="space-y-2">
             <li className="flex items-center gap-2">
               <span className="font-bold text-indigo-600 w-8">A</span> 
               <span>{t.cons_sound}</span>
             </li>
             <li className="flex items-center gap-2">
               <span className="font-bold text-indigo-600 w-8">An</span> 
               <span>{t.vowel_sound}</span>
             </li>
          </ul>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
          <h3 className="font-bold text-slate-800 mb-2 text-lg">{t.definite}</h3>
          <p className="text-sm text-slate-600 mb-3">{t.definite_desc}</p>
          <ExampleBox>
             Can you pass <strong>the</strong> salt? <br/>
             <span className="text-xs text-slate-400">(The specific salt on the table)</span>
          </ExampleBox>
        </div>
      </div>

      <SectionHeader title={t.structure_title} />
      <ProTip>
        {t.protip}
      </ProTip>

      <div className="flex flex-wrap gap-2 items-center justify-center text-lg md:text-xl font-bold my-8">
         <div className="bg-blue-100 text-blue-800 px-4 py-2 rounded-lg">John</div>
         <div className="text-slate-400">→</div>
         <div className="bg-amber-100 text-amber-800 px-4 py-2 rounded-lg">eats</div>
         <div className="text-slate-400">→</div>
         <div className="bg-green-100 text-green-800 px-4 py-2 rounded-lg">an apple</div>
      </div>

      <MistakeAlert 
        correct="I like coffee." 
        incorrect="I coffee like." 
        explanation={t.mistake_structure} 
      />
    </div>
  );
};
