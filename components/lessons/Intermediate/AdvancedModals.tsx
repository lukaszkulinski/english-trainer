
import React from 'react';
import { LessonTitle, SectionHeader, RuleCard, GrammarTable, ExampleBox, ProTip } from '../../ui/LessonComponents';
import { Search, History } from 'lucide-react';
import { useLanguage } from '../../../contexts/LanguageContext';

export const AdvancedModalsLesson: React.FC = () => {
  const { language } = useLanguage();
  const content = {
    en: {
      subtitle: "Deduction and Past Modals",
      deduction_title: "Modals of Deduction (Present)",
      deduction_desc: "We use these when we are guessing if something is true.",
      must: "Must be (90-100% sure it's TRUE)",
      cant: "Can't be (90-100% sure it's FALSE)",
      might: "Might / May / Could (50% sure)",
      past_title: "Modals in the Past",
      formula: "Formula: Modal + HAVE + V3",
      formula_desc: "When talking about past deductions or regrets.",
      note: "(Regret: I ate it, and now I feel sick.)",
      protip: "<strong>Could have done</strong> means it was possible, but didn't happen. <br/> <em>\"I could have won, but I fell.\"</em>"
    },
    pl: {
      subtitle: "Dedukcja i Modale w przeszłości",
      deduction_title: "Modale dedukcji (Teraźniejszość)",
      deduction_desc: "Używamy ich, gdy zgadujemy, czy coś jest prawdą.",
      must: "Must be (90-100% pewności, że to PRAWDA)",
      cant: "Can't be (90-100% pewności, że to FAŁSZ)",
      might: "Might / May / Could (50% pewności)",
      past_title: "Modale w przeszłości",
      formula: "Wzór: Modal + HAVE + V3",
      formula_desc: "Mówiąc o przeszłych domysłach lub żalu.",
      note: "(Żal: Zjadłem i teraz jest mi niedobrze.)",
      protip: "<strong>Could have done</strong> oznacza, że coś było możliwe, ale się nie wydarzyło. <br/> <em>\"Mogłem wygrać, ale upadłem.\"</em>"
    }
  };
  const t = content[language];

  return (
    <div className="animate-in fade-in duration-500">
      <LessonTitle subtitle={t.subtitle}>
        Modal Verbs – Advanced
      </LessonTitle>

      <SectionHeader icon={Search} title={t.deduction_title} />
      <p className="text-slate-600 mb-4">{t.deduction_desc}</p>

      <div className="space-y-4 mb-8">
         <div className="bg-emerald-50 p-4 rounded-xl border border-emerald-100">
            <strong className="text-emerald-900 block mb-1">{t.must}</strong>
            <p className="text-emerald-800">"He has a Ferrari. He <strong>must be</strong> rich."</p>
         </div>
         <div className="bg-amber-50 p-4 rounded-xl border border-amber-100">
            <strong className="text-amber-900 block mb-1">{t.cant}</strong>
            <p className="text-amber-800">"He just ate lunch. He <strong>can't be</strong> hungry already."</p>
         </div>
         <div className="bg-blue-50 p-4 rounded-xl border border-blue-100">
            <strong className="text-blue-900 block mb-1">{t.might}</strong>
            <p className="text-blue-800">"She's not here. She <strong>might be</strong> in traffic."</p>
         </div>
      </div>

      <SectionHeader icon={History} title={t.past_title} />
      <RuleCard title={t.formula}>
         <p className="mb-4">{t.formula_desc}</p>
         <GrammarTable 
            headers={['Modal + Have + V3', 'Meaning', 'Example']}
            rows={[
               ['Must have done', 'Certainty (Past)', 'He wasn\'t at home. He **must have gone** out.'],
               ['Can\'t have done', 'Impossibility (Past)', 'It was 3 AM. You **can\'t have seen** him.'],
               ['Should have done', 'Regret / Criticism', 'You **should have studied** harder. (You didn\'t).'],
            ]}
            variant="blue"
         />
      </RuleCard>

      <ExampleBox>
         "I <strong>shouldn't have eaten</strong> that cake." <br/>
         <span className="text-xs text-slate-400">{t.note}</span>
      </ExampleBox>

      <ProTip>
         <span dangerouslySetInnerHTML={{__html: t.protip}}></span>
      </ProTip>
    </div>
  );
};
