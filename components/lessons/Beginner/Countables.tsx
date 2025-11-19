
import React from 'react';
import { LessonTitle, SectionHeader, RuleCard, GrammarTable, MistakeAlert, ProTip } from '../../ui/LessonComponents';
import { Apple, Droplets, Scale } from 'lucide-react';
import { useLanguage } from '../../../contexts/LanguageContext';

export const CountablesLesson: React.FC = () => {
  const { language } = useLanguage();
  const content = {
    en: {
      subtitle: "How to count nouns",
      c_title: "Countable",
      c_desc: "Things you can count with numbers (1, 2, 3...).",
      u_title: "Uncountable",
      u_desc: "Liquids, powders, abstract ideas. Only singular!",
      quant_title: "Quantifiers (How much?)",
      safety_title: "The Safety Word",
      safety_desc: "<strong>A lot of</strong> is your best friend! You can use it with BOTH countable and uncountable nouns.",
      mistake_exp: "'Time' is uncountable (you can't say 'one time, two times' for duration).",
      protip: "You can make uncountable nouns countable by adding a container or unit. <br/> <em>A glass of water, A slice of bread, A piece of advice.</em>"
    },
    pl: {
      subtitle: "Jak liczyć rzeczowniki",
      c_title: "Policzalne",
      c_desc: "Rzeczy, które można policzyć (1, 2, 3...).",
      u_title: "Niepoliczalne",
      u_desc: "Płyny, proszki, pojęcia abstrakcyjne. Tylko liczba pojedyncza!",
      quant_title: "Określniki ilości (Ile?)",
      safety_title: "Bezpieczne słowo",
      safety_desc: "<strong>A lot of</strong> to Twój najlepszy przyjaciel! Możesz go używać ZARÓWNO z rzeczownikami policzalnymi, jak i niepoliczalnymi.",
      mistake_exp: "'Time' (czas) jest niepoliczalny (nie mówimy 'jeden czas, dwa czasy').",
      protip: "Możesz sprawić, że niepoliczalne staną się policzalne, dodając opakowanie lub jednostkę. <br/> <em>A glass of water (szklanka wody), A slice of bread (kromka chleba).</em>"
    }
  };
  const t = content[language];

  return (
    <div className="animate-in fade-in duration-500">
      <LessonTitle subtitle={t.subtitle}>
        Countable & Uncountable
      </LessonTitle>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
         <div className="border-2 border-indigo-100 rounded-xl p-6 hover:shadow-md transition-shadow bg-white">
             <div className="flex items-center gap-3 mb-4 text-indigo-600">
                <Apple size={28} />
                <h3 className="text-xl font-bold">{t.c_title}</h3>
             </div>
             <p className="text-slate-600 mb-4">{t.c_desc}</p>
             <ul className="space-y-2 text-sm font-medium text-slate-700">
                <li>✅ One apple, two apples</li>
                <li>✅ A car, three cars</li>
                <li>✅ A friend, many friends</li>
             </ul>
         </div>

         <div className="border-2 border-amber-100 rounded-xl p-6 hover:shadow-md transition-shadow bg-white">
             <div className="flex items-center gap-3 mb-4 text-amber-600">
                <Droplets size={28} />
                <h3 className="text-xl font-bold">{t.u_title}</h3>
             </div>
             <p className="text-slate-600 mb-4">{t.u_desc}</p>
             <ul className="space-y-2 text-sm font-medium text-slate-700">
                <li>✅ Water (Not: two waters)</li>
                <li>✅ Money (Not: three monies)</li>
                <li>✅ Information, Bread, Rice</li>
             </ul>
         </div>
      </div>

      <SectionHeader icon={Scale} title={t.quant_title} />
      
      <GrammarTable 
         headers={language === 'en' ? ['Meaning', 'Countable', 'Uncountable'] : ['Znaczenie', 'Policzalne', 'Niepoliczalne']}
         rows={[
            [language === 'en' ? 'Big quantity (+)' : 'Duża ilość (+)', 'A lot of / Many', 'A lot of / Much'],
            [language === 'en' ? 'Small quantity (+)' : 'Mała ilość (+)', 'A few', 'A little'],
            [language === 'en' ? 'Negative quantity (-)' : 'Mała ilość (-)', 'Few (not enough)', 'Little (not enough)'],
            [language === 'en' ? 'Question' : 'Pytanie', 'How many?', 'How much?'],
         ]}
         variant="green"
      />

      <RuleCard title={t.safety_title} type="important">
         <p dangerouslySetInnerHTML={{__html: t.safety_desc}}></p>
         <div className="mt-2 italic text-slate-600">
            "I have a lot of apples." / "I have a lot of money."
         </div>
      </RuleCard>

      <MistakeAlert 
        correct="I don't have much time." 
        incorrect="I don't have many time." 
        explanation={t.mistake_exp} 
      />

      <ProTip>
         <span dangerouslySetInnerHTML={{__html: t.protip}}></span>
      </ProTip>
    </div>
  );
};
