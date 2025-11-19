
import React from 'react';
import { LessonTitle, SectionHeader, RuleCard, GrammarTable, MistakeAlert, ExampleBox } from '../../ui/LessonComponents';
import { Users, TrendingUp, Trophy } from 'lucide-react';
import { useLanguage } from '../../../contexts/LanguageContext';

export const AdjectivesLesson: React.FC = () => {
  const { language } = useLanguage();
  const content = {
    en: {
      subtitle: "Describing and Comparing",
      desc_people: "Describing People",
      desc_text: "We use <strong>Be</strong> for adjectives and <strong>Have</strong> for hair/eyes.",
      comp_title: "Comparatives (Comparing 2 things)",
      rules: "The Rules",
      rule_1: "<strong>Short words (1 syllable):</strong> Add <strong>-er</strong> (Fast → Faster).",
      rule_2: "<strong>Ends in Y:</strong> Change to <strong>-ier</strong> (Happy → Happier).",
      rule_3: "<strong>Long words (2+ syllables):</strong> Use <strong>more</strong> (Beautiful → More beautiful).",
      rule_4: "<strong>Don't forget 'THAN'!</strong> (Faster than...)",
      mistake_exp: "'Tall' is a short word, so use -er.",
      super_title: "Superlatives (The #1)",
      super_desc: "Comparing 3 or more things. Always use <strong>THE</strong>."
    },
    pl: {
      subtitle: "Opisywanie i Porównywanie",
      desc_people: "Opisywanie Ludzi",
      desc_text: "Używamy <strong>Be</strong> dla przymiotników i <strong>Have</strong> dla włosów/oczu.",
      comp_title: "Stopień Wyższy (Porównywanie 2 rzeczy)",
      rules: "Zasady",
      rule_1: "<strong>Krótkie słowa (1 sylaba):</strong> Dodaj <strong>-er</strong> (Fast → Faster).",
      rule_2: "<strong>Końcówka Y:</strong> Zmień na <strong>-ier</strong> (Happy → Happier).",
      rule_3: "<strong>Długie słowa (2+ sylaby):</strong> Użyj <strong>more</strong> (Beautiful → More beautiful).",
      rule_4: "<strong>Nie zapomnij o 'THAN' (niż)!</strong> (Faster than...)",
      mistake_exp: "'Tall' to krótkie słowo, więc używamy -er.",
      super_title: "Stopień Najwyższy (Nr 1)",
      super_desc: "Porównywanie 3 lub więcej rzeczy. Zawsze używaj <strong>THE</strong>."
    }
  };
  const t = content[language];

  return (
    <div className="animate-in fade-in duration-500">
      <LessonTitle subtitle={t.subtitle}>
        Adjectives & Comparisons
      </LessonTitle>

      <SectionHeader icon={Users} title={t.desc_people} />
      <p className="text-slate-600 mb-4" dangerouslySetInnerHTML={{__html: t.desc_text}}></p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
         <ExampleBox>
            She <strong>is</strong> tall and slim. <br/>
            He <strong>is</strong> friendly and funny.
         </ExampleBox>
         <ExampleBox>
            She <strong>has</strong> blue eyes. <br/>
            He <strong>has</strong> short, curly hair.
         </ExampleBox>
      </div>

      <SectionHeader icon={TrendingUp} title={t.comp_title} />
      <RuleCard title={t.rules}>
         <ul className="space-y-2 text-sm md:text-base">
            <li dangerouslySetInnerHTML={{__html: t.rule_1}}></li>
            <li dangerouslySetInnerHTML={{__html: t.rule_2}}></li>
            <li dangerouslySetInnerHTML={{__html: t.rule_3}}></li>
            <li dangerouslySetInnerHTML={{__html: t.rule_4}}></li>
         </ul>
      </RuleCard>

      <MistakeAlert 
         correct="She is taller than me." 
         incorrect="She is more tall than me." 
         explanation={t.mistake_exp}
      />

      <SectionHeader icon={Trophy} title={t.super_title} />
      <p className="text-slate-600 mb-4" dangerouslySetInnerHTML={{__html: t.super_desc}}></p>

      <GrammarTable 
         headers={language === 'en' ? ['Adjective', 'Comparative', 'Superlative'] : ['Przymiotnik', 'Stopień Wyższy', 'Stopień Najwyższy']}
         rows={[
            ['Old', 'Older', 'The oldest'],
            ['Big', 'Bigger', 'The biggest'],
            ['Funny', 'Funnier', 'The funniest'],
            ['Expensive', 'More expensive', 'The most expensive'],
            ['Good (Irregular)', 'Better', 'The best'],
            ['Bad (Irregular)', 'Worse', 'The worst'],
         ]}
         variant="purple"
      />
    </div>
  );
};
