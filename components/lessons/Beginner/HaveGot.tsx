
import React from 'react';
import { LessonTitle, SectionHeader, GrammarTable, MistakeAlert, ProTip } from '../../ui/LessonComponents';
import { Briefcase } from 'lucide-react';
import { useLanguage } from '../../../contexts/LanguageContext';

export const HaveGotLesson: React.FC = () => {
  const { language } = useLanguage();
  const content = {
    en: {
      subtitle: "Talking about Possession",
      intro: "<strong>Have got</strong> means the same as <strong>Have</strong>. It is very common in spoken British English. We use it for possessions, family relationships, illnesses, and physical descriptions.",
      forms: "The Forms",
      questions: "Questions",
      mistake_exp: "You must use 'don't have' OR 'haven't got'. You cannot say 'I haven't a car' in modern English.",
      protip: "\"He's got\" can mean \"He has got\" OR \"He is\". Context is key! <br/> <em>\"He's got a dog.\"</em> (Has got) <br/> <em>\"He's tired.\"</em> (Is)"
    },
    pl: {
      subtitle: "Mówienie o posiadaniu",
      intro: "<strong>Have got</strong> znaczy to samo co <strong>Have</strong> (mieć). Jest bardzo popularne w mówionym brytyjskim angielskim. Używamy go do opisu posiadania, rodziny, chorób i wyglądu.",
      forms: "Formy",
      questions: "Pytania",
      mistake_exp: "Musisz użyć 'don't have' LUB 'haven't got'. Nie można powiedzieć 'I haven't a car' we współczesnym angielskim.",
      protip: "\"He's got\" może znaczyć \"He has got\" (On ma) LUB \"He is\" (On jest). Kontekst jest kluczowy!"
    }
  };
  const t = content[language];

  return (
    <div className="animate-in fade-in duration-500">
      <LessonTitle subtitle={t.subtitle}>
        Have Got
      </LessonTitle>

      <p className="text-lg text-slate-600 mb-8" dangerouslySetInnerHTML={{__html: t.intro}}></p>

      <SectionHeader icon={Briefcase} title={t.forms} />

      <GrammarTable 
         headers={language === 'en' ? ['Subject', 'Positive (+)', 'Negative (-)', 'Short Form'] : ['Podmiot', 'Twierdzące (+)', 'Przeczące (-)', 'Skrót']}
         rows={[
            ['I / You / We / They', 'have got', 'haven\'t got', 'I\'ve got'],
            ['He / She / It', 'has got', 'hasn\'t got', 'She\'s got'],
         ]}
         variant="purple"
      />

      <h3 className="font-bold text-slate-800 mt-6 mb-3 text-xl">{t.questions}</h3>
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm mb-8">
         <p className="mb-2 font-medium text-lg text-indigo-900">
            <span className="font-bold text-indigo-600">Have</span> + Subject + <span className="font-bold text-indigo-600">got</span> ...?
         </p>
         <ul className="space-y-2 text-slate-600 list-disc ml-5">
            <li><strong>Have</strong> you <strong>got</strong> a pen?</li>
            <li><strong>Has</strong> she <strong>got</strong> a sister?</li>
         </ul>
      </div>

      <MistakeAlert 
         correct="I don't have a car / I haven't got a car." 
         incorrect="I haven't a car." 
         explanation={t.mistake_exp}
      />

      <ProTip>
         <span dangerouslySetInnerHTML={{__html: t.protip}}></span>
      </ProTip>
    </div>
  );
};
