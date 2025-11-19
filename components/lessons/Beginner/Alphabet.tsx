
import React from 'react';
import { LessonTitle, SectionHeader, RuleCard, GrammarTable, ProTip, MistakeAlert } from '../../ui/LessonComponents';
import { Mic, Ear, Keyboard } from 'lucide-react';
import { useLanguage } from '../../../contexts/LanguageContext';

export const AlphabetLesson: React.FC = () => {
  const { language } = useLanguage();

  const content = {
    en: {
      subtitle: "The foundation of spoken and written English",
      intro: "The English alphabet has 26 letters, but over 44 different sounds! Unlike some languages where you say exactly what you see, English is not always phonetic.",
      letters_title: "The 26 Letters",
      vowels_note: "Vowels (A, E, I, O, U) are highlighted. All others are Consonants.",
      pronunciation_title: "Tricky Pronunciation Rules",
      magic_e_title: "The Magic 'E'",
      magic_e_desc: "When a word ends with a silent **'e'**, it usually changes the vowel before it to a \"long\" sound (it says its alphabet name).",
      th_title: "The 'Th' Sound",
      th_desc: "This is unique to English. Put your tongue between your teeth and blow.",
      unvoiced: "Unvoiced (Soft)",
      unvoiced_desc: "Just air, no vibration.",
      voiced: "Voiced (Hard)",
      voiced_desc: "Vibrate your throat.",
      silent_title: "Silent Letters",
      silent_desc: "English loves to hide letters! You write them, but you don't say them.",
      protip: "When you learn a new word, don't just guess the pronunciation from the spelling. Use an online dictionary or ask the AI Tutor to check the phonetic script!",
      mistake_exp: "'Tree' is a plant. 'Three' is a number. The 'th' sound matters!"
    },
    pl: {
      subtitle: "Podstawy języka mówionego i pisanego",
      intro: "Alfabet angielski ma 26 liter, ale ponad 44 różne dźwięki! W przeciwieństwie do polskiego, angielski nie zawsze czyta się tak, jak się pisze.",
      letters_title: "26 Liter",
      vowels_note: "Samogłoski (A, E, I, O, U) są wyróżnione. Reszta to Spółgłoski.",
      pronunciation_title: "Trudne zasady wymowy",
      magic_e_title: "Magiczne 'E'",
      magic_e_desc: "Gdy słowo kończy się na nieme **'e'**, zazwyczaj zmienia ono samogłoskę przed nim na 'długą' (wymawianą tak jak w alfabecie).",
      th_title: "Dźwięk 'Th'",
      th_desc: "Unikalny dla angielskiego. Włóż język między zęby i dmuchaj.",
      unvoiced: "Bezdźwięczne (Miękkie)",
      unvoiced_desc: "Tylko powietrze, bez wibracji.",
      voiced: "Dźwięczne (Twarde)",
      voiced_desc: "Wibruj gardłem.",
      silent_title: "Nieme litery",
      silent_desc: "Angielski uwielbia ukrywać litery! Piszesz je, ale ich nie wymawiasz.",
      protip: "Kiedy uczysz się nowego słowa, nie zgaduj wymowy z pisowni. Sprawdź w słowniku lub zapytaj Nauczyciela AI!",
      mistake_exp: "'Tree' to drzewo. 'Three' to liczba trzy. Dźwięk 'th' ma znaczenie!"
    }
  };

  const t = content[language];

  return (
    <div className="animate-in fade-in duration-500">
      <LessonTitle subtitle={t.subtitle}>
        Alphabet & Sounds
      </LessonTitle>

      <div className="prose prose-slate max-w-none mb-8">
        <p className="text-lg leading-relaxed text-slate-600">
          {t.intro}
        </p>
      </div>

      <SectionHeader icon={Keyboard} title={t.letters_title} />
      
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-center mb-8">
         {['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'].map(letter => (
           <div key={letter} className={`p-4 rounded-xl font-bold text-2xl shadow-sm border transition-transform hover:scale-105 ${
             ['A','E','I','O','U'].includes(letter) 
               ? 'bg-indigo-100 text-indigo-700 border-indigo-200' 
               : 'bg-white text-slate-700 border-slate-200'
           }`}>
             {letter}
           </div>
         ))}
      </div>
      <p className="text-center text-sm text-slate-500 italic mb-8">
        <span className="inline-block w-3 h-3 bg-indigo-100 border border-indigo-200 mr-2 rounded-sm"></span>
        {t.vowels_note}
      </p>

      <SectionHeader icon={Ear} title={t.pronunciation_title} />

      <RuleCard title={t.magic_e_title} type="important">
        <p className="mb-4">{language === 'en' ? <span>When a word ends with a silent <strong>'e'</strong>, it usually changes the vowel before it to a "long" sound (it says its alphabet name).</span> : <span>Gdy słowo kończy się na nieme <strong>'e'</strong>, zazwyczaj zmienia ono samogłoskę przed nim na "długą".</span>}</p>
        <GrammarTable 
          headers={['Short Vowel', 'With Magic E (Long Vowel)', 'Change']}
          rows={[
            ['Hat (like cat)', 'Hate (like hey)', 'a → ay'],
            ['Kit (like sit)', 'Kite (like eye)', 'i → eye'],
            ['Hop (like top)', 'Hope (like go)', 'o → oh'],
            ['Cut (like up)', 'Cute (like you)', 'u → you'],
          ]}
          variant="purple"
        />
      </RuleCard>

      <RuleCard title={t.th_title}>
        <p>{t.th_desc}</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
            <div>
                <strong className="text-indigo-700 block mb-2">{t.unvoiced}</strong>
                <p className="text-sm text-slate-600">{t.unvoiced_desc}</p>
                <ul className="list-disc ml-5 mt-2 text-slate-700">
                    <li>Think</li>
                    <li>Thank you</li>
                    <li>Thursday</li>
                </ul>
            </div>
            <div>
                <strong className="text-indigo-700 block mb-2">{t.voiced}</strong>
                <p className="text-sm text-slate-600">{t.voiced_desc}</p>
                <ul className="list-disc ml-5 mt-2 text-slate-700">
                    <li>This</li>
                    <li>That</li>
                    <li>The</li>
                </ul>
            </div>
        </div>
      </RuleCard>

      <SectionHeader icon={Mic} title={t.silent_title} />
      <p className="mb-4 text-slate-600">{t.silent_desc}</p>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-sm">
           <h4 className="font-bold text-slate-800 mb-2">Silent K</h4>
           <p className="text-xs text-slate-500 mb-2">Before 'N'</p>
           <div className="space-y-1 text-indigo-600 font-medium">
             <div><span className="opacity-30">K</span>nee</div>
             <div><span className="opacity-30">K</span>now</div>
             <div><span className="opacity-30">K</span>nife</div>
           </div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-sm">
           <h4 className="font-bold text-slate-800 mb-2">Silent W</h4>
           <p className="text-xs text-slate-500 mb-2">Before 'R'</p>
           <div className="space-y-1 text-indigo-600 font-medium">
             <div><span className="opacity-30">W</span>rite</div>
             <div><span className="opacity-30">W</span>rong</div>
             <div><span className="opacity-30">W</span>rist</div>
           </div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-sm">
           <h4 className="font-bold text-slate-800 mb-2">Silent H</h4>
           <p className="text-xs text-slate-500 mb-2">Common words</p>
           <div className="space-y-1 text-indigo-600 font-medium">
             <div><span className="opacity-30">H</span>our</div>
             <div><span className="opacity-30">H</span>onest</div>
             <div>G<span className="opacity-30">h</span>ost</div>
           </div>
        </div>
      </div>

      <ProTip>
        {t.protip}
      </ProTip>

      <MistakeAlert 
        correct="I have three brothers." 
        incorrect="I have tree brothers." 
        explanation={t.mistake_exp} 
      />
    </div>
  );
};
