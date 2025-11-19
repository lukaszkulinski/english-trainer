
import React from 'react';
import { LessonTitle, SectionHeader, GrammarTable, RuleCard, ExampleBox, MistakeAlert } from '../../ui/LessonComponents';
import { Clock, CalendarDays } from 'lucide-react';
import { useLanguage } from '../../../contexts/LanguageContext';

export const TimeDatesLesson: React.FC = () => {
  const { language } = useLanguage();
  const content = {
    en: {
      subtitle: "When does it happen?",
      telling_time: "Telling Time",
      preps_title: "Prepositions of Time (AT, ON, IN)",
      rule_title: "The Triangle Rule",
      rule_desc: "Think of a triangle. <strong>AT</strong> is the point (specific). <strong>ON</strong> is the day. <strong>IN</strong> is the big period.",
      mistake_exp: "Days always take 'ON'."
    },
    pl: {
      subtitle: "Kiedy to się dzieje?",
      telling_time: "Podawanie czasu",
      preps_title: "Przyimki Czasu (AT, ON, IN)",
      rule_title: "Zasada Trójkąta",
      rule_desc: "Pomyśl o trójkącie. <strong>AT</strong> to punkt (konkret). <strong>ON</strong> to dzień. <strong>IN</strong> to długi okres.",
      mistake_exp: "Z dniami zawsze używamy 'ON'."
    }
  };
  const t = content[language];

  return (
    <div className="animate-in fade-in duration-500">
      <LessonTitle subtitle={t.subtitle}>
        Time, Dates & Prepositions
      </LessonTitle>

      <SectionHeader icon={Clock} title={t.telling_time} />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
         <div className="bg-white p-4 border rounded-xl text-center shadow-sm">
            <div className="text-2xl font-bold text-slate-800 mb-1">3:00</div>
            <div className="text-indigo-600 font-medium">It's three o'clock.</div>
         </div>
         <div className="bg-white p-4 border rounded-xl text-center shadow-sm">
            <div className="text-2xl font-bold text-slate-800 mb-1">3:15</div>
            <div className="text-indigo-600 font-medium">It's quarter past three.</div>
         </div>
         <div className="bg-white p-4 border rounded-xl text-center shadow-sm">
            <div className="text-2xl font-bold text-slate-800 mb-1">3:30</div>
            <div className="text-indigo-600 font-medium">It's half past three.</div>
         </div>
         <div className="bg-white p-4 border rounded-xl text-center shadow-sm">
            <div className="text-2xl font-bold text-slate-800 mb-1">3:45</div>
            <div className="text-indigo-600 font-medium">It's quarter to four.</div>
         </div>
      </div>

      <SectionHeader icon={CalendarDays} title={t.preps_title} />
      
      <RuleCard type="important" title={t.rule_title}>
         <p className="mb-4" dangerouslySetInnerHTML={{__html: t.rule_desc}}></p>
         <GrammarTable 
            headers={language === 'en' ? ['Preposition', 'Use For', 'Examples'] : ['Przyimek', 'Użycie', 'Przykłady']}
            rows={[
               ['AT', language === 'en' ? 'Specific Times' : 'Konkretny czas', 'At 5:00, At noon, At night'],
               ['ON', language === 'en' ? 'Days & Dates' : 'Dni i Daty', 'On Monday, On my birthday, On July 4th'],
               ['IN', language === 'en' ? 'Long Periods' : 'Długie okresy', 'In 2023, In July, In the morning, In summer'],
            ]}
            variant="blue"
         />
      </RuleCard>

      <MistakeAlert 
         correct="See you on Monday." 
         incorrect="See you in Monday." 
         explanation={t.mistake_exp}
      />

      <ExampleBox>
         My birthday is <strong>in</strong> October. <br/>
         The party is <strong>on</strong> October 5th. <br/>
         It starts <strong>at</strong> 8 PM.
      </ExampleBox>
    </div>
  );
};
