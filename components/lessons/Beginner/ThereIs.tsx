
import React from 'react';
import { LessonTitle, SectionHeader, RuleCard, GrammarTable, ExampleBox, MistakeAlert } from '../../ui/LessonComponents';
import { MapPin } from 'lucide-react';
import { useLanguage } from '../../../contexts/LanguageContext';

export const ThereIsLesson: React.FC = () => {
  const { language } = useLanguage();
  const content = {
    en: {
      subtitle: "Describing Existence",
      intro: "We use this structure to introduce something or say that something exists in a place.",
      sing_plur: "Singular vs Plural",
      there_is_desc: "Use for singular nouns (1 thing) or uncountable nouns.",
      there_are_desc: "Use for plural nouns (2+ things).",
      ques_neg: "Questions & Negatives",
      short_ans: "Short Answers",
      mistake_exp: "Don't translate directly from other languages (like 'Il y a' or 'Hay'). Use 'There are' for existence."
    },
    pl: {
      subtitle: "Opisywanie istnienia",
      intro: "Używamy tej konstrukcji, aby powiedzieć, że coś istnieje lub znajduje się w danym miejscu.",
      sing_plur: "Liczba pojedyncza vs mnoga",
      there_is_desc: "Używaj dla liczby pojedynczej (1 rzecz) lub niepoliczalnych.",
      there_are_desc: "Używaj dla liczby mnogiej (2+ rzeczy).",
      ques_neg: "Pytania i Przeczenia",
      short_ans: "Krótkie odpowiedzi",
      mistake_exp: "Nie tłumacz dosłownie z innych języków (np. 'Ma 5 ludzi'). Użyj 'There are' dla istnienia."
    }
  };
  const t = content[language];

  return (
    <div className="animate-in fade-in duration-500">
      <LessonTitle subtitle={t.subtitle}>
        There is / There are
      </LessonTitle>

      <p className="text-lg text-slate-600 mb-8">
         {t.intro}
      </p>

      <SectionHeader icon={MapPin} title={t.sing_plur} />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
         <div className="bg-white p-5 rounded-xl border border-slate-200 text-center">
            <h3 className="text-xl font-bold text-indigo-600 mb-2">There is</h3>
            <p className="text-slate-500 mb-4">{t.there_is_desc}</p>
            <ExampleBox>
               There is <strong>a</strong> book on the table. <br/>
               There is <strong>some</strong> milk in the fridge.
            </ExampleBox>
         </div>

         <div className="bg-white p-5 rounded-xl border border-slate-200 text-center">
            <h3 className="text-xl font-bold text-emerald-600 mb-2">There are</h3>
            <p className="text-slate-500 mb-4">{t.there_are_desc}</p>
            <ExampleBox>
               There are <strong>two</strong> cats in the garden. <br/>
               There are <strong>many</strong> people here.
            </ExampleBox>
         </div>
      </div>

      <SectionHeader title={t.ques_neg} />
      <GrammarTable 
         headers={language === 'en' ? ['Type', 'Singular', 'Plural'] : ['Typ', 'Liczba pojedyncza', 'Liczba mnoga']}
         rows={[
            [language === 'en' ? 'Positive (+)' : 'Twierdzące (+)', 'There is a car.', 'There are two cars.'],
            [language === 'en' ? 'Negative (-)' : 'Przeczące (-)', 'There isn\'t a car.', 'There aren\'t any cars.'],
            [language === 'en' ? 'Question (?)' : 'Pytające (?)', 'Is there a car?', 'Are there any cars?'],
         ]}
         variant="blue"
      />

      <RuleCard title={t.short_ans}>
         <ul className="space-y-2">
            <li><strong>Is there...?</strong> → Yes, there is. / No, there isn't.</li>
            <li><strong>Are there...?</strong> → Yes, there are. / No, there aren't.</li>
         </ul>
      </RuleCard>

      <MistakeAlert 
         correct="There are 5 people." 
         incorrect="It has 5 people." 
         explanation={t.mistake_exp}
      />
    </div>
  );
};
