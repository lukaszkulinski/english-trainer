
import React from 'react';
import { LessonTitle, SectionHeader, RuleCard, ExampleBox, ProTip, GrammarTable } from '../../ui/LessonComponents';
import { ArrowRightLeft, Crown } from 'lucide-react';
import { useLanguage } from '../../../contexts/LanguageContext';

export const ComplexStructuresLesson: React.FC = () => {
  const { language } = useLanguage();
  const content = {
    en: {
      subtitle: "Cleft Sentences and Inversion",
      intro: "At C1/C2 level, you can change the structure of sentences to create <strong>emphasis</strong>, drama, or formality.",
      cleft_title: "Cleft Sentences",
      cleft_desc: "\"Cleft\" means cut. We cut the sentence in two to highlight one part.",
      it_clefts: "It-Clefts (It was X that...)",
      standard: "Standard:",
      inv_title: "Inversion",
      inv_desc: "Used in formal writing or speeches. When starting with a negative adverb, swap the Subject and Auxiliary verb.",
      protip: "Inversion makes you sound very formal and sophisticated. Use it in essays or presentations, but not too much in casual chat!"
    },
    pl: {
      subtitle: "Zdania rozszczepione i Inwersja",
      intro: "Na poziomie C1/C2 możesz zmieniać strukturę zdań, aby dodać <strong>nacisk</strong>, dramaturgię lub formalność.",
      cleft_title: "Zdania rozszczepione (Cleft)",
      cleft_desc: "\"Cleft\" znaczy rozcięty. Rozcinamy zdanie na dwie części, aby wyróżnić jedną z nich.",
      it_clefts: "It-Clefts (To było X, co...)",
      standard: "Standard:",
      inv_title: "Inwersja",
      inv_desc: "Używana w mowie formalnej. Zaczynając od negatywnego przysłówka, zamień miejscami Podmiot i Czasownik posiłkowy.",
      protip: "Inwersja sprawia, że brzmisz bardzo formalnie i wyrafinowanie. Używaj jej w esejach, ale nie w luźnej rozmowie!"
    }
  };
  const t = content[language];

  return (
    <div className="animate-in fade-in duration-500">
      <LessonTitle subtitle={t.subtitle}>
        Complex Grammar Structures
      </LessonTitle>

      <p className="text-lg text-slate-600 mb-8" dangerouslySetInnerHTML={{__html: t.intro}}></p>

      <SectionHeader icon={Crown} title={t.cleft_title} />
      <p className="text-slate-600 mb-4">{t.cleft_desc}</p>

      <RuleCard title={t.it_clefts}>
         <p className="mb-2 text-sm">{t.standard} <em>John stole the money on Monday.</em></p>
         <ul className="space-y-2 mt-4">
            <li className="bg-white p-3 border rounded-lg shadow-sm">
               <strong>It was JOHN</strong> who stole the money. (Not Peter)
            </li>
            <li className="bg-white p-3 border rounded-lg shadow-sm">
               <strong>It was THE MONEY</strong> that John stole. (Not the jewels)
            </li>
            <li className="bg-white p-3 border rounded-lg shadow-sm">
               <strong>It was ON MONDAY</strong> that John stole the money. (Not Tuesday)
            </li>
         </ul>
      </RuleCard>

      <RuleCard title="Wh-Clefts (What I need is...)">
         <ExampleBox>
            Standard: I need a coffee. <br/>
            Emphasis: <strong>What I need is</strong> a coffee.
         </ExampleBox>
         <ExampleBox>
            Standard: He hates waking up early. <br/>
            Emphasis: <strong>What he hates is</strong> waking up early.
         </ExampleBox>
      </RuleCard>

      <SectionHeader icon={ArrowRightLeft} title={t.inv_title} />
      <p className="text-slate-600 mb-4">{t.inv_desc}</p>

      <GrammarTable 
         headers={['Negative Adverb', 'Inverted Structure', 'Standard Version']}
         rows={[
            ['Never', '**Never have I** seen such beauty.', 'I have never seen...'],
            ['Rarely', '**Rarely do we** go out.', 'We rarely go out.'],
            ['Under no circumstances', '**Under no circumstances should you** open this.', 'You should not open...'],
            ['Not only', '**Not only is he** rich, but he is also kind.', 'He is rich and kind.'],
         ]}
         variant="purple"
      />

      <ProTip>
         {t.protip}
      </ProTip>
    </div>
  );
};
