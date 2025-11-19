
import React from 'react';
import { LessonTitle, SectionHeader, RuleCard, ExampleBox, MistakeAlert, ProTip, GrammarTable } from '../../ui/LessonComponents';
import { Mail, PenTool, AlignLeft } from 'lucide-react';
import { useLanguage } from '../../../contexts/LanguageContext';

export const WritingEssentialsLesson: React.FC = () => {
  const { language } = useLanguage();
  const content = {
    en: {
      subtitle: "Emails and Messages",
      email_struct: "Structure of an Email",
      intro: "Every email has 4 main parts. Keep it simple!",
      greeting: "1. Greeting",
      opening: "2. Opening",
      body: "3. Body (The message)",
      signoff: "4. Sign-off",
      linkers: "Linking Words (Connectors)",
      linkers_desc: "Don't write short, choppy sentences. Connect them!",
      punct: "Punctuation Rules",
      caps: "Capital Letters (ABC)",
      commas: "Commas ( , )",
      mistake_exp: "Always capitalize 'I', cities, and days of the week.",
      protip: "Keep your sentences short. Subject + Verb + Object. <br/> <em>\"I went to the park. It was fun.\"</em> is better than a long, confusing sentence."
    },
    pl: {
      subtitle: "E-maile i Wiadomości",
      email_struct: "Struktura E-maila",
      intro: "Każdy e-mail ma 4 główne części. Pisz prosto!",
      greeting: "1. Powitanie",
      opening: "2. Wstęp",
      body: "3. Treść (Wiadomość)",
      signoff: "4. Pożegnanie",
      linkers: "Słowa łączące",
      linkers_desc: "Nie pisz krótkich, rwanych zdań. Połącz je!",
      punct: "Zasady interpunkcji",
      caps: "Wielkie litery (ABC)",
      commas: "Przecinki ( , )",
      mistake_exp: "Zawsze pisz wielką literą 'I' (ja), miasta i dni tygodnia.",
      protip: "Pisz krótkie zdania. Podmiot + Czasownik + Dopełnienie. <br/> <em>\"Poszedłem do parku. Było fajnie.\"</em> jest lepsze niż długie, zagmatwane zdanie."
    }
  };
  const t = content[language];

  return (
    <div className="animate-in fade-in duration-500">
      <LessonTitle subtitle={t.subtitle}>
        Writing Essentials
      </LessonTitle>

      <SectionHeader icon={Mail} title={t.email_struct} />
      <p className="text-slate-600 mb-4">{t.intro}</p>
      
      <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden mb-8">
         <div className="bg-slate-50 border-b border-slate-200 p-3 flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-400"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
            <div className="w-3 h-3 rounded-full bg-green-400"></div>
            <span className="text-xs text-slate-400 ml-2">New Message</span>
         </div>
         <div className="p-6 space-y-4">
            <div>
               <span className="text-xs font-bold text-indigo-500 uppercase">{t.greeting}</span>
               <p className="font-medium">Hi John, / Dear Sarah,</p>
            </div>
            <div>
               <span className="text-xs font-bold text-indigo-500 uppercase">{t.opening}</span>
               <p className="text-slate-600">How are you? / Thanks for your email.</p>
            </div>
            <div>
               <span className="text-xs font-bold text-indigo-500 uppercase">{t.body}</span>
               <p className="text-slate-600">I'm writing to tell you about the party on Friday. Can you come? It starts at 8 PM.</p>
            </div>
            <div>
               <span className="text-xs font-bold text-indigo-500 uppercase">{t.signoff}</span>
               <p className="font-medium">Best regards, / See you soon,</p>
               <p className="font-medium mt-1">Tom</p>
            </div>
         </div>
      </div>

      <SectionHeader icon={AlignLeft} title={t.linkers} />
      <p className="text-slate-600 mb-4">{t.linkers_desc}</p>

      <RuleCard title="The Big 4">
         <GrammarTable 
            headers={language === 'en' ? ['Connector', 'Function', 'Example'] : ['Łącznik', 'Funkcja', 'Przykład']}
            rows={[
               ['AND', language === 'en' ? 'Adds information (+)' : 'Dodaje informację (+)', 'I like tea **and** coffee.'],
               ['BUT', language === 'en' ? 'Contrast (-)' : 'Kontrast (-)', 'I like tea, **but** I don\'t like coffee.'],
               ['BECAUSE', language === 'en' ? 'Reason (Why?)' : 'Powód (Dlaczego?)', 'I stayed home **because** I was sick.'],
               ['SO', language === 'en' ? 'Result (What happened?)' : 'Wynik (Co się stało?)', 'I was sick, **so** I stayed home.'],
            ]}
            variant="blue"
         />
      </RuleCard>

      <SectionHeader icon={PenTool} title={t.punct} />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
         <div className="bg-white p-4 rounded-xl border border-slate-200">
            <h4 className="font-bold text-slate-800 mb-2">{t.caps}</h4>
            <ul className="text-sm text-slate-600 space-y-1">
               <li>• Start of a sentence.</li>
               <li>• The word "I".</li>
               <li>• Names (John, London).</li>
               <li>• Days & Months (Monday, July).</li>
            </ul>
         </div>
         <div className="bg-white p-4 rounded-xl border border-slate-200">
            <h4 className="font-bold text-slate-800 mb-2">{t.commas}</h4>
            <ul className="text-sm text-slate-600 space-y-1">
               <li>• In lists: <em>Apples, bananas, and pears.</em></li>
               <li>• Before "but" (usually).</li>
               <li>• After "Hi John," in emails.</li>
            </ul>
         </div>
      </div>

      <MistakeAlert 
         correct="I live in London on Monday." 
         incorrect="i live in london on monday." 
         explanation={t.mistake_exp}
      />

      <ProTip>
         <span dangerouslySetInnerHTML={{__html: t.protip}}></span>
      </ProTip>
    </div>
  );
};
