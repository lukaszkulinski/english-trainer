
import React from 'react';
import { LessonTitle, SectionHeader, RuleCard, VocabList, ExampleBox, MistakeAlert, ProTip } from '../../ui/LessonComponents';
import { Handshake, GitCommit, Puzzle } from 'lucide-react';
import { useLanguage } from '../../../contexts/LanguageContext';

export const BuildingNaturalEnglishLesson: React.FC = () => {
  const { language } = useLanguage();
  const content = {
    en: {
      subtitle: "Collocations and Linking Words",
      intro: "To sound fluent, grammar isn't enough. You need to know which words \"go together\" naturally. These are called <strong>Collocations</strong>.",
      make_do_title: "Make vs. Do",
      make_do_desc: "This is the most common confusion. Generally: <strong>Make</strong> = Create, <strong>Do</strong> = Action/Job.",
      mistake_exp: "'Mistake' always goes with MAKE.",
      linking_title: "Formal Linking Words",
      linking_desc: "Upgrade your writing by replacing simple connectors with advanced ones.",
      collocations_title: "Common Collocations",
      protip: "Don't translate collocations word-for-word from your language. Learn them as fixed pairs!",
      vocab: [
        { term: 'However', def: '(Formal "But") The food was good. However, the service was slow.' },
        { term: 'Therefore', def: '(Formal "So") He didn\'t study. Therefore, he failed.' },
        { term: 'Furthermore', def: '(Formal "And/Also") It is cheap. Furthermore, it is high quality.' },
        { term: 'Although', def: '(Formal "Even though") Although it rained, we went out.' },
      ]
    },
    pl: {
      subtitle: "Kolokacje i słowa łączące",
      intro: "Aby brzmieć płynnie, gramatyka nie wystarczy. Musisz wiedzieć, które słowa naturalnie do siebie pasują. Nazywamy to <strong>Kolokacjami</strong>.",
      make_do_title: "Make vs. Do",
      make_do_desc: "To częsty błąd. Ogólnie: <strong>Make</strong> = Tworzyć, <strong>Do</strong> = Działać/Wykonywać.",
      mistake_exp: "'Mistake' zawsze łączy się z MAKE.",
      linking_title: "Formalne słowa łączące",
      linking_desc: "Ulepsz swój styl pisania, zastępując proste łączniki bardziej zaawansowanymi.",
      collocations_title: "Popularne kolokacje",
      protip: "Nie tłumacz kolokacji słowo w słowo. Ucz się ich jako stałych par!",
      vocab: [
        { term: 'However', def: '(Jednakże) Jedzenie było dobre. Jednakże obsługa była wolna.' },
        { term: 'Therefore', def: '(Dlatego/Zatem) Nie uczył się. Dlatego oblał.' },
        { term: 'Furthermore', def: '(Ponadto) Jest tani. Ponadto, jest wysokiej jakości.' },
        { term: 'Although', def: '(Chociaż) Chociaż padało, wyszliśmy.' },
      ]
    }
  };
  const t = content[language];

  return (
    <div className="animate-in fade-in duration-500">
      <LessonTitle subtitle={t.subtitle}>
        Building Natural English
      </LessonTitle>

      <p className="text-lg text-slate-600 mb-8" dangerouslySetInnerHTML={{__html: t.intro}}></p>

      <SectionHeader icon={Handshake} title={t.make_do_title} />
      <p className="text-slate-600 mb-4" dangerouslySetInnerHTML={{__html: t.make_do_desc}}></p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
         <div className="border-t-4 border-indigo-500 bg-indigo-50 p-5 rounded-xl shadow-sm">
            <h3 className="text-xl font-bold text-indigo-900 mb-3">MAKE</h3>
            <ul className="space-y-2 text-indigo-800">
               <li>• Make a mistake</li>
               <li>• Make a decision</li>
               <li>• Make a promise</li>
               <li>• Make friends</li>
               <li>• Make money</li>
               <li>• Make dinner</li>
            </ul>
         </div>

         <div className="border-t-4 border-emerald-500 bg-emerald-50 p-5 rounded-xl shadow-sm">
            <h3 className="text-xl font-bold text-emerald-900 mb-3">DO</h3>
            <ul className="space-y-2 text-emerald-800">
               <li>• Do your homework</li>
               <li>• Do a favor</li>
               <li>• Do business</li>
               <li>• Do your best</li>
               <li>• Do the dishes</li>
               <li>• Do exercise</li>
            </ul>
         </div>
      </div>

      <MistakeAlert 
         correct="I made a mistake." 
         incorrect="I did a mistake." 
         explanation={t.mistake_exp}
      />

      <SectionHeader icon={GitCommit} title={t.linking_title} />
      <p className="text-slate-600 mb-4">{t.linking_desc}</p>

      <VocabList items={t.vocab} />

      <SectionHeader icon={Puzzle} title={t.collocations_title} />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
         <ExampleBox>
            <strong>Take</strong> a break / a photo / a chance.
         </ExampleBox>
         <ExampleBox>
            <strong>Have</strong> a party / a shower / a good time.
         </ExampleBox>
         <ExampleBox>
            <strong>Catch</strong> a cold / the bus.
         </ExampleBox>
         <ExampleBox>
            <strong>Pay</strong> attention / a visit.
         </ExampleBox>
      </div>

      <ProTip>
         {t.protip}
      </ProTip>
    </div>
  );
};
