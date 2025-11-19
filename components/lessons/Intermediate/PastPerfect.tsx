
import React from 'react';
import { LessonTitle, SectionHeader, RuleCard, ExampleBox, ProTip } from '../../ui/LessonComponents';
import { ArrowLeftRight, Rewind } from 'lucide-react';
import { useLanguage } from '../../../contexts/LanguageContext';

export const PastPerfectLesson: React.FC = () => {
  const { language } = useLanguage();
  const content = {
    en: {
      subtitle: "The 'Past of the Past'",
      intro: "When we tell a story, we often need to go back to an earlier time. If we are already in the past, and we want to talk about something that happened <em>before</em> that, we use the <strong>Past Perfect</strong>.",
      formula: "Formula: Had + V3",
      rule: "Use this for the <strong>first</strong> of two past actions.",
      ev1: "Event 1 (Earlier)",
      ev2: "Event 2 (Later)",
      train_left: "Train left",
      arrived: "I arrived",
      ex_1: "I missed the train.",
      ex_2: "I arrived, then it left immediately. I caught it.",
      cont_title: "Past Continuous (Setting the Scene)",
      cont_desc: "Use Past Continuous (Was/Were + ing) for background actions.",
      protip: "Don't overuse Past Perfect! You only need it to make the timeline clear. Once the timeline is established, you can switch back to Past Simple."
    },
    pl: {
      subtitle: "'Przeszłość przeszłości'",
      intro: "Kiedy opowiadamy historię, często musimy cofnąć się w czasie. Jeśli już jesteśmy w przeszłości i chcemy opowiedzieć o czymś, co wydarzyło się <em>wcześniej</em>, używamy <strong>Past Perfect</strong>.",
      formula: "Wzór: Had + V3",
      rule: "Użyj tego dla <strong>pierwszej</strong> z dwóch czynności w przeszłości.",
      ev1: "Zdarzenie 1 (Wcześniej)",
      ev2: "Zdarzenie 2 (Później)",
      train_left: "Pociąg odjechał",
      arrived: "Przyjechałem",
      ex_1: "Spóźniłem się na pociąg.",
      ex_2: "Przyjechałem, potem odjechał. Zdążyłem.",
      cont_title: "Past Continuous (Tło)",
      cont_desc: "Użyj Past Continuous (Was/Were + ing) do opisu tła wydarzeń.",
      protip: "Nie nadużywaj Past Perfect! Potrzebujesz go tylko, by wyjaśnić kolejność zdarzeń. Potem możesz wrócić do Past Simple."
    }
  };
  const t = content[language];

  return (
    <div className="animate-in fade-in duration-500">
      <LessonTitle subtitle={t.subtitle}>
        Past Perfect & Narrative Tenses
      </LessonTitle>

      <p className="text-lg text-slate-600 mb-8" dangerouslySetInnerHTML={{__html: t.intro}}></p>

      <SectionHeader icon={Rewind} title="The Past Perfect" />
      <RuleCard title={t.formula}>
         <span dangerouslySetInnerHTML={{__html: t.rule}}></span>
      </RuleCard>

      <div className="my-8 flex flex-col md:flex-row items-center justify-center gap-4 text-center">
         <div className="bg-slate-100 p-4 rounded-xl opacity-60">
            <span className="block text-xs uppercase font-bold text-slate-500">{t.ev1}</span>
            <strong className="text-lg">{t.train_left}</strong>
            <div className="text-indigo-600 font-bold mt-1">Past Perfect</div>
         </div>
         <ArrowLeftRight className="text-slate-300 rotate-90 md:rotate-0" />
         <div className="bg-slate-100 p-4 rounded-xl">
            <span className="block text-xs uppercase font-bold text-slate-500">{t.ev2}</span>
            <strong className="text-lg">{t.arrived}</strong>
            <div className="text-blue-600 font-bold mt-1">Past Simple</div>
         </div>
      </div>

      <ExampleBox>
         "When I arrived at the station, the train <strong>had left</strong>." <br/>
         <span className="text-sm text-slate-500">({t.ex_1})</span>
      </ExampleBox>
      
      <div className="mt-4"></div>
      
      <ExampleBox>
         "When I arrived at the station, the train <strong>left</strong>." <br/>
         <span className="text-sm text-slate-500">({t.ex_2})</span>
      </ExampleBox>

      <SectionHeader title={t.cont_title} />
      <p className="text-slate-600 mb-4">{t.cont_desc}</p>
      
      <div className="bg-amber-50 border border-amber-100 p-6 rounded-xl italic text-lg text-amber-900 leading-relaxed font-serif">
         "It <strong>was raining</strong> and the wind <strong>was blowing</strong>. 
         I <strong>was walking</strong> home when suddenly I <strong>saw</strong> a strange light. 
         I realized I <strong>had forgotten</strong> my umbrella."
      </div>

      <ProTip>
         {t.protip}
      </ProTip>
    </div>
  );
};
