
import React from 'react';
import { LessonTitle, SectionHeader, RuleCard, GrammarTable, ExampleBox, ProTip } from '../../ui/LessonComponents';
import { MessageCircle, ArrowLeft } from 'lucide-react';
import { useLanguage } from '../../../contexts/LanguageContext';

export const ReportedSpeechLesson: React.FC = () => {
  const { language } = useLanguage();
  const content = {
    en: {
      subtitle: "He said, She said...",
      intro: "When we report what someone else said, we usually change the tense one step back into the past. This is called <strong>backshifting</strong>.",
      say_tell: "Say vs. Tell",
      say_note: "No person object",
      tell_note: "Must have person: me, him, us",
      backshift: "Backshifting Rules",
      one_step: "Go one step back",
      time_place: "Time & Place Changes",
      time_desc: "Because the time has passed, \"now\" is not \"now\" anymore!",
      protip: "If the reporting verb is in the present (\"He says...\"), you <strong>do not</strong> change the tense. <br/> <em>\"He says he is tired.\"</em>"
    },
    pl: {
      subtitle: "On powiedział, Ona powiedziała...",
      intro: "Kiedy relacjonujemy to, co ktoś powiedział, zazwyczaj cofamy czas o jeden krok w przeszłość. Nazywamy to <strong>backshifting</strong> (następstwem czasów).",
      say_tell: "Say vs. Tell",
      say_note: "Bez osoby (odbiorcy)",
      tell_note: "Musi być osoba: me, him, us",
      backshift: "Zasady Następstwa Czasów",
      one_step: "Cofnij się o jeden krok",
      time_place: "Zmiany Czasu i Miejsca",
      time_desc: "Ponieważ czas minął, \"teraz\" to już nie \"teraz\"!",
      protip: "Jeśli czasownik wprowadzający jest w teraźniejszości (\"He says...\"), <strong>nie</strong> zmieniasz czasu. <br/> <em>\"He says he is tired.\"</em>"
    }
  };
  const t = content[language];

  return (
    <div className="animate-in fade-in duration-500">
      <LessonTitle subtitle={t.subtitle}>
        Reported Speech
      </LessonTitle>

      <p className="text-lg text-slate-600 mb-8" dangerouslySetInnerHTML={{__html: t.intro}}></p>

      <SectionHeader icon={MessageCircle} title={t.say_tell} />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
         <ExampleBox>
            He <strong>said (that)</strong> he was tired. <br/>
            <span className="text-xs text-slate-400">({t.say_note})</span>
         </ExampleBox>
         <ExampleBox>
            He <strong>told me (that)</strong> he was tired. <br/>
            <span className="text-xs text-slate-400">({t.tell_note})</span>
         </ExampleBox>
      </div>

      <SectionHeader icon={ArrowLeft} title={t.backshift} />
      <RuleCard title={t.one_step}>
         <GrammarTable 
            headers={['Direct Speech', 'Reported Speech (Past)']}
            rows={[
               ['Present Simple ("I work")', 'Past Simple (He said he worked)'],
               ['Present Continuous ("I am working")', 'Past Continuous (He said he was working)'],
               ['Past Simple ("I worked")', 'Past Perfect (He said he had worked)'],
               ['Present Perfect ("I have worked")', 'Past Perfect (He said he had worked)'],
               ['Will ("I will work")', 'Would (He said he would work)'],
               ['Can ("I can work")', 'Could (He said he could work)'],
            ]}
            variant="purple"
         />
      </RuleCard>

      <SectionHeader title={t.time_place} />
      <p className="mb-4 text-slate-600">{t.time_desc}</p>
      
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 text-sm font-medium text-slate-700 mb-8">
         <div className="bg-white p-3 border rounded shadow-sm">Now → Then</div>
         <div className="bg-white p-3 border rounded shadow-sm">Today → That day</div>
         <div className="bg-white p-3 border rounded shadow-sm">Here → There</div>
         <div className="bg-white p-3 border rounded shadow-sm">Tomorrow → The next day</div>
         <div className="bg-white p-3 border rounded shadow-sm">Yesterday → The day before</div>
         <div className="bg-white p-3 border rounded shadow-sm">This → That</div>
      </div>

      <ProTip>
         <span dangerouslySetInnerHTML={{__html: t.protip}}></span>
      </ProTip>
    </div>
  );
};
