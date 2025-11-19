
import React from 'react';
import { LessonTitle, SectionHeader, RuleCard, GrammarTable, ExampleBox, ProTip, MistakeAlert } from '../../ui/LessonComponents';
import { GitMerge, History, Timer, List } from 'lucide-react';
import { useLanguage } from '../../../contexts/LanguageContext';

interface PresentPerfectLessonProps {
  onOpenIrregularVerbs?: () => void;
}

export const PresentPerfectLesson: React.FC<PresentPerfectLessonProps> = ({ onOpenIrregularVerbs }) => {
  const { language } = useLanguage();
  const content = {
    en: {
      subtitle: "Connecting Past and Present",
      intro: "The <strong>Present Perfect</strong> is one of the most common tenses in English. It connects the past to the present. It tells us about life experiences, recent changes, or unfinished time.",
      simple_title: "Present Perfect Simple",
      formula: "Formula: Have/Has + V3 (Past Participle)",
      formula_desc: "The <strong>V3</strong> is the third form of the verb (e.g., Gone, Seen, Done).",
      exp: "Experience",
      res: "Result",
      change: "Change",
      view_list: "Open Irregular Verbs List (V3)",
      since_for_title: "Since vs. For",
      since_desc: "Use with a specific time, date, or event.",
      for_desc: "Use with a period of time.",
      vs_title: "Simple vs. Continuous",
      mistake_exp: "If the action started in the past and continues now, use Present Perfect, not Present Simple.",
      protip: "<strong>Gone vs Been:</strong> <br/> <em>\"He has gone to Italy.\"</em> = He is there now. <br/> <em>\"He has been to Italy.\"</em> = He went and came back."
    },
    pl: {
      subtitle: "Łączenie przeszłości z teraźniejszością",
      intro: "<strong>Present Perfect</strong> to jeden z najczęstszych czasów. Łączy przeszłość z teraźniejszością. Mówi o doświadczeniach życiowych, niedawnych zmianach lub niezakończonym czasie.",
      simple_title: "Present Perfect Simple",
      formula: "Wzór: Have/Has + V3 (Imiesłów)",
      formula_desc: "<strong>V3</strong> to trzecia forma czasownika (np. Gone, Seen, Done).",
      exp: "Doświadczenie",
      res: "Wynik",
      change: "Zmiana",
      view_list: "Otwórz listę czasowników (V3)",
      since_for_title: "Since vs. For",
      since_desc: "Używaj z konkretnym momentem, datą lub wydarzeniem.",
      for_desc: "Używaj z okresem czasu.",
      vs_title: "Simple vs. Continuous",
      mistake_exp: "Jeśli czynność zaczęła się w przeszłości i trwa do teraz, użyj Present Perfect, a nie Present Simple.",
      protip: "<strong>Gone vs Been:</strong> <br/> <em>\"He has gone to Italy.\"</em> = Jest tam teraz. <br/> <em>\"He has been to Italy.\"</em> = Był tam i wrócił."
    }
  };
  const t = content[language];

  return (
    <div className="animate-in fade-in duration-500">
      <LessonTitle subtitle={t.subtitle}>
        Present Perfect & Continuous
      </LessonTitle>

      <div className="bg-indigo-50 p-6 rounded-2xl border border-indigo-100 mb-8">
         <p className="text-indigo-900 leading-relaxed" dangerouslySetInnerHTML={{__html: t.intro}}></p>
      </div>

      <SectionHeader icon={GitMerge} title={t.simple_title} />
      <RuleCard title={t.formula}>
         <p className="mb-4" dangerouslySetInnerHTML={{__html: t.formula_desc}}></p>
         <ul className="list-disc ml-5 space-y-1 text-slate-700 mb-4">
            <li><strong>{t.exp}:</strong> "I have been to Paris."</li>
            <li><strong>{t.res}:</strong> "She has lost her keys."</li>
            <li><strong>{t.change}:</strong> "You have grown!"</li>
         </ul>
         
         {onOpenIrregularVerbs && (
           <button 
             onClick={onOpenIrregularVerbs}
             className="w-full mt-2 bg-indigo-100 hover:bg-indigo-200 text-indigo-700 py-2.5 rounded-lg font-bold text-sm transition-colors flex items-center justify-center gap-2"
           >
             <List size={16} />
             {t.view_list}
           </button>
         )}
      </RuleCard>

      <SectionHeader icon={History} title={t.since_for_title} />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
         <div className="bg-white p-5 border rounded-xl">
            <h4 className="font-bold text-slate-800 mb-2">SINCE</h4>
            <p className="text-sm text-slate-600 mb-2">{t.since_desc}</p>
            <ExampleBox>Since 2010, Since Monday, Since I was a child.</ExampleBox>
         </div>
         <div className="bg-white p-5 border rounded-xl">
            <h4 className="font-bold text-slate-800 mb-2">FOR</h4>
            <p className="text-sm text-slate-600 mb-2">{t.for_desc}</p>
            <ExampleBox>For 2 years, For 5 minutes, For a long time.</ExampleBox>
         </div>
      </div>

      <SectionHeader icon={Timer} title={t.vs_title} />
      <GrammarTable 
         headers={language === 'en' ? ['Tense', 'Focus', 'Example'] : ['Czas', 'Skupienie', 'Przykład']}
         rows={[
            ['Present Perfect Simple', language === 'en' ? 'The Result / Quantity' : 'Wynik / Ilość', 'I have written 3 emails. (Finished)'],
            ['Present Perfect Continuous', language === 'en' ? 'The Activity / Duration' : 'Czynność / Czas trwania', 'I have been writing emails for an hour. (Still doing it)'],
         ]}
         variant="green"
      />

      <MistakeAlert 
         correct="I have lived here for 5 years." 
         incorrect="I live here for 5 years." 
         explanation={t.mistake_exp}
      />

      <ProTip>
         <span dangerouslySetInnerHTML={{__html: t.protip}}></span>
      </ProTip>
    </div>
  );
};
