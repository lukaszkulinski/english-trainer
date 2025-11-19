
import React from 'react';
import { LessonTitle, SectionHeader, RuleCard, GrammarTable, ExampleBox, ProTip } from '../../ui/LessonComponents';
import { CalendarClock, Zap } from 'lucide-react';
import { useLanguage } from '../../../contexts/LanguageContext';

export const FuturePlansLesson: React.FC = () => {
  const { language } = useLanguage();

  const content = {
    en: {
      subtitle: "Will vs. Going To",
      intro: "In English, we choose the future form based on **how** and **when** we decided to do something.",
      going_to: "Be Going To",
      usage: "Usage",
      plans: "Plans & Intentions",
      plans_desc: "Decided **before** speaking.",
      evidence: "Evidence",
      evidence_desc: "Predictions based on sight",
      will: "Will",
      instant: "Instant Decisions",
      instant_desc: "Decided **while** speaking.",
      other: "Other Uses",
      other_desc: "Promises, Offers, & Beliefs",
      comparison: "Quick Comparison",
      protip: "In spoken English, \"going to\" is often pronounced as **gonna**. \"I'm gonna go.\" (But write \"going to\" in formal texts!)"
    },
    pl: {
      subtitle: "Will czy Going To?",
      intro: "W angielskim wybieramy formę przyszłą w zależności od tego **jak** i **kiedy** podjęliśmy decyzję.",
      going_to: "Be Going To (Zamierzać)",
      usage: "Użycie",
      plans: "Plany i Intencje",
      plans_desc: "Zdecydowano **przed** rozmową.",
      evidence: "Dowody",
      evidence_desc: "Przewidywania na podstawie tego, co widzimy",
      will: "Will",
      instant: "Nagłe Decyzje",
      instant_desc: "Zdecydowano **w trakcie** rozmowy.",
      other: "Inne użycia",
      other_desc: "Obietnice, Oferty i Przekonania",
      comparison: "Szybkie Porównanie",
      protip: "W mowie potocznej \"going to\" często wymawia się jako **gonna**. \"I'm gonna go.\" (Ale w oficjalnych tekstach pisz \"going to\"!)"
    }
  };

  const t = content[language];

  return (
    <div className="animate-in fade-in duration-500">
      <LessonTitle subtitle={t.subtitle}>
        Future Plans
      </LessonTitle>

      <p className="text-lg text-slate-600 mb-8">
         {language === 'en' ? <span>In English, we choose the future form based on <strong>how</strong> and <strong>when</strong> we decided to do something.</span> : <span>W angielskim wybieramy formę przyszłą w zależności od tego <strong>jak</strong> i <strong>kiedy</strong> podjęliśmy decyzję.</span>}
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
         {/* Going To */}
         <div className="space-y-4">
            <SectionHeader icon={CalendarClock} title={t.going_to} />
            <div className="bg-emerald-50 border border-emerald-100 p-4 rounded-xl">
               <h3 className="font-bold text-emerald-800 uppercase text-xs tracking-wider mb-2">{t.usage}</h3>
               <p className="text-emerald-900 font-medium">{t.plans}</p>
               <p className="text-sm text-emerald-700 mt-1">{language === 'en' ? <span>Decided <strong>before</strong> speaking.</span> : <span>Zdecydowano <strong>przed</strong> rozmową.</span>}</p>
            </div>
            <ExampleBox>
               "I <strong>am going to visit</strong> my mom next week." <br/>
               <span className="text-xs text-slate-400">({language === 'en' ? "I already planned this" : "Już to zaplanowałem"})</span>
            </ExampleBox>
            <div className="bg-emerald-50 border border-emerald-100 p-4 rounded-xl">
               <h3 className="font-bold text-emerald-800 uppercase text-xs tracking-wider mb-2">{t.evidence}</h3>
               <p className="text-emerald-900 font-medium">{t.evidence_desc}</p>
            </div>
            <ExampleBox>
               "Look at those black clouds! It <strong>is going to rain</strong>."
            </ExampleBox>
         </div>

         {/* Will */}
         <div className="space-y-4">
            <SectionHeader icon={Zap} title={t.will} />
            <div className="bg-blue-50 border border-blue-100 p-4 rounded-xl">
               <h3 className="font-bold text-blue-800 uppercase text-xs tracking-wider mb-2">{t.usage}</h3>
               <p className="text-blue-900 font-medium">{t.instant}</p>
               <p className="text-sm text-blue-700 mt-1">{language === 'en' ? <span>Decided <strong>while</strong> speaking.</span> : <span>Zdecydowano <strong>w trakcie</strong> rozmowy.</span>}</p>
            </div>
            <ExampleBox>
               "The phone is ringing. I <strong>will answer</strong> it." <br/>
               <span className="text-xs text-slate-400">({language === 'en' ? "Decided just now" : "Decyzja teraz"})</span>
            </ExampleBox>
            <div className="bg-blue-50 border border-blue-100 p-4 rounded-xl">
               <h3 className="font-bold text-blue-800 uppercase text-xs tracking-wider mb-2">{t.other}</h3>
               <p className="text-blue-900 font-medium">{t.other_desc}</p>
            </div>
            <ExampleBox>
               "I promise I <strong>won't tell</strong> anyone."
            </ExampleBox>
         </div>
      </div>

      <SectionHeader title={t.comparison} />
      <GrammarTable 
         headers={['Situation', 'Form', 'Example']}
         rows={[
            [language === 'en' ? 'Have a plan' : 'Mam plan', 'Going to', 'I\'m going to buy a car.'],
            [language === 'en' ? 'Decision now' : 'Decyzja teraz', 'Will', 'I\'ll have the salad.'],
            [language === 'en' ? 'Prediction (Evidence)' : 'Przewidywanie (Dowód)', 'Going to', 'He\'s going to fall!'],
            [language === 'en' ? 'Prediction (Opinion)' : 'Przewidywanie (Opinia)', 'Will', 'I think humans will live on Mars.'],
         ]}
         variant="purple"
      />

      <ProTip>
         {t.protip}
      </ProTip>
    </div>
  );
};
