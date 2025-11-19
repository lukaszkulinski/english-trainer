
import React from 'react';
import { LessonTitle, SectionHeader, ExampleBox, VocabList, ProTip } from '../../ui/LessonComponents';
import { Map, ShoppingCart, Coffee } from 'lucide-react';
import { useLanguage } from '../../../contexts/LanguageContext';

export const EverydayCommunicationLesson: React.FC = () => {
  const { language } = useLanguage();
  const content = {
    en: {
      subtitle: "Survival English for real life",
      directions_title: "Asking for Directions",
      directions_tip: "Politeness is key! Start with \"Excuse me\".",
      food_title: "Ordering Food",
      shop_title: "Shopping",
      protip: "\"I want\" is considered rude in service situations. Always use <strong>\"I'd like\"</strong> (I would like) or <strong>\"Can I have\"</strong>.",
      vocab: [
        { term: 'Go straight', def: 'Keep walking forward.' },
        { term: 'Turn left / right', def: 'Change direction.' },
        { term: 'Go past', def: 'Walk next to something but don\'t stop.' },
        { term: 'Cross', def: 'Go from one side of the road to the other.' },
      ]
    },
    pl: {
      subtitle: "Angielski w codziennych sytuacjach",
      directions_title: "Pytanie o drogę",
      directions_tip: "Uprzejmość to podstawa! Zacznij od \"Excuse me\".",
      food_title: "Zamawianie Jedzenia",
      shop_title: "Zakupy",
      protip: "\"I want\" (chcę) jest uważane za niegrzeczne. Zawsze używaj <strong>\"I'd like\"</strong> (Chciałbym) lub <strong>\"Can I have\"</strong> (Czy mogę prosić).",
      vocab: [
        { term: 'Go straight', def: 'Idź prosto.' },
        { term: 'Turn left / right', def: 'Skręć w lewo / prawo.' },
        { term: 'Go past', def: 'Miń coś, nie zatrzymuj się.' },
        { term: 'Cross', def: 'Przejdź na drugą stronę ulicy.' },
      ]
    }
  };
  const t = content[language];

  return (
    <div className="animate-in fade-in duration-500">
      <LessonTitle subtitle={t.subtitle}>
        Everyday Communication
      </LessonTitle>

      <SectionHeader icon={Map} title={t.directions_title} />
      <p className="text-slate-600 mb-4">{t.directions_tip}</p>
      
      <ExampleBox>
         <strong>A:</strong> Excuse me, how do I get to the train station? <br/>
         <strong>B:</strong> Go straight on, then turn left at the bank.
      </ExampleBox>

      <VocabList items={t.vocab} />

      <SectionHeader icon={Coffee} title={t.food_title} />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
         <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
            <h3 className="font-bold text-slate-800 mb-2 border-b pb-2">Server says:</h3>
            <ul className="space-y-2 text-sm text-slate-600">
               <li>• Are you ready to order?</li>
               <li>• What would you like to drink?</li>
               <li>• Is that everything?</li>
               <li>• For here or to go?</li>
            </ul>
         </div>
         <div className="bg-indigo-50 p-4 rounded-xl border border-indigo-100 shadow-sm">
            <h3 className="font-bold text-indigo-900 mb-2 border-b border-indigo-200 pb-2">You say:</h3>
            <ul className="space-y-2 text-sm text-indigo-800">
               <li>• I'd like a burger, please.</li>
               <li>• Can I have some water?</li>
               <li>• Could I get the bill?</li>
            </ul>
         </div>
      </div>

      <SectionHeader icon={ShoppingCart} title={t.shop_title} />
      <ExampleBox>
         <strong>A:</strong> Excuse me, how much is this shirt? <br/>
         <strong>B:</strong> It's $20. <br/>
         <strong>A:</strong> Can I try it on? <br/>
         <strong>B:</strong> Sure, the changing rooms are over there.
      </ExampleBox>

      <ProTip>
         <span dangerouslySetInnerHTML={{__html: t.protip}}></span>
      </ProTip>
    </div>
  );
};
