
import React from 'react';
import { LessonTitle, SectionHeader, RuleCard, GrammarTable, ExampleBox, ProTip } from '../../ui/LessonComponents';
import { Calendar, Zap, Clock } from 'lucide-react';
import { useLanguage } from '../../../contexts/LanguageContext';

export const FutureFormsLesson: React.FC = () => {
  const { language } = useLanguage();
  const content = {
    en: {
      subtitle: "Will, Going to, Present Continuous",
      intro: "English has no single \"Future Tense\". We choose the form based on <strong>how certain</strong> or <strong>arranged</strong> the plan is.",
      title_1: "1. Present Continuous (Arrangements)",
      rule_1: "Use for: Fixed Plans",
      desc_1: "Use this when you have a specific time and place, often involving other people (appointments, meetings, tickets).",
      note_1: "(It's in my diary. John knows.)",
      title_2: "2. Be Going To (Intentions)",
      desc_2: "Use this when you have decided to do something, but it might not be fully arranged yet.",
      note_2: "(That is my plan, but I haven't bought it yet.)",
      title_3: "3. Will (Instant Decisions / Predictions)",
      desc_3: "Use this for decisions made <strong>now</strong>, promises, offers, or general predictions.",
      note_3: "(Offer made right now.)",
      summary: "Summary Comparison",
      protip: "<strong>Future Continuous</strong> (Will be doing) is used for actions in progress at a future time. <br/> <em>\"Don't call me at 8 PM. I <strong>will be watching</strong> the movie.\"</em>"
    },
    pl: {
      subtitle: "Will, Going to, Present Continuous",
      intro: "Angielski nie ma jednego \"czasu przyszłego\". Wybieramy formę w zależności od tego, <strong>jak pewny</strong> lub <strong>ustalony</strong> jest plan.",
      title_1: "1. Present Continuous (Ustalone plany)",
      rule_1: "Użycie: Konkretne ustalenia",
      desc_1: "Użyj, gdy masz konkretny czas i miejsce, często z udziałem innych osób (wizyty, spotkania, bilety).",
      note_1: "(Mam to w kalendarzu. John wie.)",
      title_2: "2. Be Going To (Intencje)",
      desc_2: "Użyj, gdy zdecydowałeś coś zrobić, ale może to nie być jeszcze w pełni załatwione.",
      note_2: "(To mój plan, ale jeszcze go nie kupiłem.)",
      title_3: "3. Will (Nagłe decyzje / Przewidywania)",
      desc_3: "Użyj dla decyzji podjętych <strong>teraz</strong>, obietnic, ofert lub ogólnych przewidywań.",
      note_3: "(Oferta złożona w tej chwili.)",
      summary: "Porównanie",
      protip: "<strong>Future Continuous</strong> (Will be doing) jest używany dla czynności trwających w przyszłości. <br/> <em>\"Nie dzwoń o 20:00. Będę wtedy oglądać film.\"</em>"
    }
  };
  const t = content[language];

  return (
    <div className="animate-in fade-in duration-500">
      <LessonTitle subtitle={t.subtitle}>
        Future Forms
      </LessonTitle>

      <p className="text-lg text-slate-600 mb-8" dangerouslySetInnerHTML={{__html: t.intro}}></p>

      <SectionHeader icon={Calendar} title={t.title_1} />
      <RuleCard title={t.rule_1} type="important">
         <p className="mb-2">{t.desc_1}</p>
         <ExampleBox>
            "I <strong>am meeting</strong> John at 7 PM tonight." <br/>
            <span className="text-xs text-slate-400">{t.note_1}</span>
         </ExampleBox>
      </RuleCard>

      <SectionHeader icon={Clock} title={t.title_2} />
      <p className="text-slate-600 mb-2">{t.desc_2}</p>
      <ExampleBox>
         "I <strong>am going to buy</strong> a new car next year." <br/>
         <span className="text-xs text-slate-400">{t.note_2}</span>
      </ExampleBox>

      <SectionHeader icon={Zap} title={t.title_3} />
      <p className="text-slate-600 mb-2" dangerouslySetInnerHTML={{__html: t.desc_3}}></p>
      <ExampleBox>
         "Wait, I <strong>will help</strong> you with those bags!" <br/>
         <span className="text-xs text-slate-400">{t.note_3}</span>
      </ExampleBox>

      <SectionHeader title={t.summary} />
      <GrammarTable 
         headers={language === 'en' ? ['Form', 'Certainty', 'Example'] : ['Forma', 'Pewność', 'Przykład']}
         rows={[
            ['Present Continuous', '99% (Booked)', 'I am flying to Paris tomorrow.'],
            ['Going to', '80% (Intended)', 'I am going to visit Paris next year.'],
            ['Will', '50% (Prediction/Maybe)', 'I think I will go to Paris one day.'],
         ]}
         variant="purple"
      />

      <ProTip>
         <span dangerouslySetInnerHTML={{__html: t.protip}}></span>
      </ProTip>
    </div>
  );
};
