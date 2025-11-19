
import React from 'react';
import { LessonTitle, SectionHeader, RuleCard, GrammarTable, ExampleBox, MistakeAlert } from '../../ui/LessonComponents';
import { ShieldCheck, Hand, AlertCircle } from 'lucide-react';
import { useLanguage } from '../../../contexts/LanguageContext';

export const BasicModalsLesson: React.FC = () => {
  const { language } = useLanguage();
  const content = {
    en: {
      subtitle: "Can, Must, Have to",
      golden_rules: "The Golden Rules",
      rule_1: "Modals <strong>never change</strong> form (No -s, no -ing, no -ed).",
      rule_2: "They are followed by the <strong>Base Verb</strong> (without 'to').",
      can_title: "Can (Ability & Permission)",
      must_title: "Must vs. Have to",
      must_desc: "Internal obligation. I feel it is necessary.",
      haveto_desc: "External rule. Someone else says so.",
      diff_title: "The Big Difference (Negative)",
      mistake_exp: "Never add 's' or 'to' after a modal verb."
    },
    pl: {
      subtitle: "Can, Must, Have to",
      golden_rules: "Złote Zasady",
      rule_1: "Czasowniki modalne <strong>nigdy nie zmieniają</strong> formy (Bez -s, -ing, -ed).",
      rule_2: "Po nich występuje <strong>czasownik w formie podstawowej</strong> (bez 'to').",
      can_title: "Can (Umiejętność i Pozwolenie)",
      must_title: "Must vs. Have to",
      must_desc: "Wewnętrzny przymus. Czuję, że to konieczne.",
      haveto_desc: "Zewnętrzna zasada. Ktoś inny tak nakazuje.",
      diff_title: "Wielka Różnica (Przeczenia)",
      mistake_exp: "Nigdy nie dodawaj 's' ani 'to' po czasowniku modalnym."
    }
  };
  const t = content[language];

  return (
    <div className="animate-in fade-in duration-500">
      <LessonTitle subtitle={t.subtitle}>
        Basic Modal Verbs
      </LessonTitle>

      <RuleCard title={t.golden_rules} type="important">
         <ol className="list-decimal ml-5 space-y-2">
            <li dangerouslySetInnerHTML={{__html: t.rule_1}}></li>
            <li dangerouslySetInnerHTML={{__html: t.rule_2}}></li>
         </ol>
      </RuleCard>

      <SectionHeader icon={Hand} title={t.can_title} />
      <ExampleBox>
         I <strong>can</strong> swim. (Ability) <br/>
         <strong>Can</strong> I open the window? (Permission)
      </ExampleBox>
      <div className="mt-4 p-4 bg-slate-100 rounded-lg text-sm text-slate-600">
         <strong>Negative:</strong> Cannot / Can't.
      </div>

      <SectionHeader icon={AlertCircle} title={t.must_title} />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
         <div className="bg-white p-5 rounded-xl border border-slate-200">
            <h3 className="font-bold text-slate-800 mb-2">Must</h3>
            <p className="text-sm text-slate-500 mb-3">{t.must_desc}</p>
            <ExampleBox>I <strong>must</strong> call my mom.</ExampleBox>
         </div>
         <div className="bg-white p-5 rounded-xl border border-slate-200">
            <h3 className="font-bold text-slate-800 mb-2">Have to</h3>
            <p className="text-sm text-slate-500 mb-3">{t.haveto_desc}</p>
            <ExampleBox>I <strong>have to</strong> wear a uniform.</ExampleBox>
         </div>
      </div>

      <SectionHeader icon={ShieldCheck} title={t.diff_title} />
      <GrammarTable 
         headers={language === 'en' ? ['Modal', 'Meaning', 'Example'] : ['Modal', 'Znaczenie', 'Przykład']}
         rows={[
            ['Mustn\'t', language === 'en' ? 'Prohibition (Don\'t do it!)' : 'Zakaz (Nie rób tego!)', 'You **mustn\'t** smoke here.'],
            ['Don\'t have to', language === 'en' ? 'No obligation (It\'s your choice)' : 'Brak przymusu (Twój wybór)', 'You **don\'t have to** come.'],
         ]}
         variant="green"
      />

      <MistakeAlert 
         correct="He can swim." 
         incorrect="He cans swim / He can to swim." 
         explanation={t.mistake_exp}
      />
    </div>
  );
};
