
import React from 'react';
import { LessonTitle, SectionHeader, GrammarTable, ExampleBox, MistakeAlert } from '../../ui/LessonComponents';
import { Puzzle } from 'lucide-react';
import { useLanguage } from '../../../contexts/LanguageContext';

export const GerundsInfinitivesLesson: React.FC = () => {
  const { language } = useLanguage();
  const content = {
    en: {
      subtitle: "Using verbs as nouns",
      gerund_desc: "Looks like a verb, acts like a noun.",
      inf_desc: "The base form with 'to'.",
      patterns_title: "Common Verb Patterns",
      stop_title: "Stop: The Meaning Change",
      stop_desc: "Some verbs change meaning depending on which form you use.",
      stop_1: "Quit the habit forever.",
      stop_2: "Pause what you are doing in order to smoke.",
      mistake_exp: "After a preposition (in, at, on, of, about...), ALWAYS use -ing."
    },
    pl: {
      subtitle: "Czasownik jako rzeczownik",
      gerund_desc: "Wygląda jak czasownik, działa jak rzeczownik.",
      inf_desc: "Forma podstawowa z 'to'.",
      patterns_title: "Typowe Wzorce",
      stop_title: "Stop: Zmiana Znaczenia",
      stop_desc: "Niektóre czasowniki zmieniają znaczenie w zależności od formy.",
      stop_1: "Rzucić nawyk na zawsze.",
      stop_2: "Zatrzymać się, żeby zapalić.",
      mistake_exp: "Po przyimku (in, at, on, of, about...), ZAWSZE używaj -ing."
    }
  };
  const t = content[language];

  return (
    <div className="animate-in fade-in duration-500">
      <LessonTitle subtitle={t.subtitle}>
        Gerunds & Infinitives
      </LessonTitle>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
         <div>
            <SectionHeader icon={Puzzle} title="Gerund (-ing)" />
            <p className="text-slate-600 mb-4">{t.gerund_desc}</p>
            <ul className="list-disc ml-5 space-y-2 text-slate-700">
               <li>After prepositions (interested <strong>in</strong> learning).</li>
               <li>As the subject (<strong>Swimming</strong> is fun).</li>
               <li>After specific verbs (enjoy, mind, suggest).</li>
            </ul>
         </div>
         <div>
            <SectionHeader icon={Puzzle} title="Infinitive (to ...)" />
            <p className="text-slate-600 mb-4">{t.inf_desc}</p>
            <ul className="list-disc ml-5 space-y-2 text-slate-700">
               <li>To give a reason (I went <strong>to buy</strong> milk).</li>
               <li>After adjectives (It's easy <strong>to do</strong>).</li>
               <li>After specific verbs (want, need, hope).</li>
            </ul>
         </div>
      </div>

      <SectionHeader title={t.patterns_title} />
      <GrammarTable 
         headers={['Verbs taking Gerund (-ing)', 'Verbs taking Infinitive (to...)']}
         rows={[
            ['Enjoy (I enjoy cooking)', 'Want (I want to cook)'],
            ['Mind (I don\'t mind waiting)', 'Need (I need to sleep)'],
            ['Suggest (He suggested going)', 'Hope (I hope to see you)'],
            ['Finish (I finished eating)', 'Decide (I decided to go)'],
            ['Avoid (Avoid doing)', 'Plan (Plan to do)'],
         ]}
         variant="blue"
      />

      <SectionHeader title={t.stop_title} />
      <p className="text-slate-600 mb-4">{t.stop_desc}</p>
      
      <div className="space-y-4">
         <ExampleBox>
            <strong>Stop smoking</strong> (-ing) <br/>
            <span className="text-sm text-slate-500">{t.stop_1}</span>
         </ExampleBox>
         <ExampleBox>
            <strong>Stop to smoke</strong> (to...) <br/>
            <span className="text-sm text-slate-500">{t.stop_2}</span>
         </ExampleBox>
      </div>

      <MistakeAlert 
         correct="I am interested in learning English." 
         incorrect="I am interested in to learn English." 
         explanation={t.mistake_exp}
      />
    </div>
  );
};
