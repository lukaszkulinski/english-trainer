
import React from 'react';
import { LessonTitle, SectionHeader, RuleCard, VocabList, ExampleBox, ProTip } from '../../ui/LessonComponents';
import { Anchor, BookOpen } from 'lucide-react';
import { useLanguage } from '../../../contexts/LanguageContext';

export const AdvancedPhrasalsLesson: React.FC = () => {
  const { language } = useLanguage();
  const content = {
    en: {
      subtitle: "Abstract meanings and nuance",
      intro: "Basic phrasal verbs are physical (Sit down, Stand up). Advanced ones are often <strong>metaphorical</strong> or abstract.",
      common_title: "Common Advanced Phrasals",
      usage_title: "Usage Examples",
      three_word_title: "Three-word Phrasal Verbs",
      three_word_desc: "Some phrasal verbs have three parts! They are usually inseparable.",
      protip: "Phrasal verbs can often be replaced by a single formal verb. <br/> <em>Put up with = Tolerate</em> <br/> Use the phrasal verb in speaking, and the formal verb in academic writing.",
      vocab: [
         { term: 'Brush up on', def: 'To practice/refresh knowledge quickly.' },
         { term: 'Do away with', def: 'To remove or abolish (a law/rule).' },
         { term: 'Fall out', def: 'To argue and stop being friends.' },
         { term: 'Live up to', def: 'To match expectations or standards.' },
         { term: 'Weigh up', def: 'To consider the pros and cons.' },
         { term: 'Put up with', def: 'To tolerate something annoying.' },
         { term: 'Come up with', def: 'To invent an idea or plan.' },
      ]
    },
    pl: {
      subtitle: "Abstrakcyjne znaczenia i niuanse",
      intro: "Podstawowe phrasal verbs są fizyczne (usiądź, wstań). Zaawansowane są często <strong>metaforyczne</strong> lub abstrakcyjne.",
      common_title: "Popularne zaawansowane 'Phrasals'",
      usage_title: "Przykłady użycia",
      three_word_title: "Trzyczłonowe Phrasal Verbs",
      three_word_desc: "Niektóre czasowniki złożone mają trzy części! Zazwyczaj są nierozdzielne.",
      protip: "Phrasal verbs często można zastąpić jednym formalnym słowem. <br/> <em>Put up with = Tolerate</em> <br/> Używaj phrasal verbs w mowie, a formalnych czasowników w piśmie akademickim.",
      vocab: [
         { term: 'Brush up on', def: 'Odświeżyć wiedzę.' },
         { term: 'Do away with', def: 'Pozbyć się / znieść (prawo).' },
         { term: 'Fall out', def: 'Pokłócić się.' },
         { term: 'Live up to', def: 'Sprostać oczekiwaniom.' },
         { term: 'Weigh up', def: 'Rozważyć za i przeciw.' },
         { term: 'Put up with', def: 'Tolerować / znosić coś.' },
         { term: 'Come up with', def: 'Wymyślić pomysł.' },
      ]
    }
  };
  const t = content[language];

  return (
    <div className="animate-in fade-in duration-500">
      <LessonTitle subtitle={t.subtitle}>
        Advanced Phrasal Verbs
      </LessonTitle>

      <p className="text-lg text-slate-600 mb-8" dangerouslySetInnerHTML={{__html: t.intro}}></p>

      <SectionHeader icon={Anchor} title={t.common_title} />
      
      <VocabList items={t.vocab} />

      <SectionHeader icon={BookOpen} title={t.usage_title} />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
         <ExampleBox>
            "I need to <strong>brush up on</strong> my Spanish before the trip."
         </ExampleBox>
         <ExampleBox>
            "The movie didn't <strong>live up to</strong> the hype. It was boring."
         </ExampleBox>
         <ExampleBox>
            "I can't <strong>put up with</strong> this noise any longer!"
         </ExampleBox>
         <ExampleBox>
            "The government wants to <strong>do away with</strong> this tax."
         </ExampleBox>
      </div>

      <RuleCard title={t.three_word_title}>
         <p className="text-sm text-slate-700 mb-2">{t.three_word_desc}</p>
         <ul className="list-disc ml-5 space-y-1 text-slate-800">
            <li>Look forward to ({language === 'en' ? 'Excited about future' : 'Czekać z niecierpliwością'})</li>
            <li>Get on with ({language === 'en' ? 'Continue doing' : 'Kontynuować'})</li>
            <li>Come up against ({language === 'en' ? 'Face a problem' : 'Napotkać problem'})</li>
         </ul>
      </RuleCard>

      <ProTip>
         <span dangerouslySetInnerHTML={{__html: t.protip}}></span>
      </ProTip>
    </div>
  );
};
