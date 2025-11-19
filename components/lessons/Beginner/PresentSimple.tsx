
import React, { useState } from 'react';
import { LessonTitle, SectionHeader, RuleCard, ExampleBox, GrammarTable, ProTip, MistakeAlert } from '../../ui/LessonComponents';
import { Clock, Calendar, Repeat, Activity } from 'lucide-react';
import { useLanguage } from '../../../contexts/LanguageContext';

export const PresentSimpleLesson: React.FC = () => {
  const { language } = useLanguage();
  const [activeTab, setActiveTab] = useState<'positive' | 'negative' | 'question'>('positive');

  const content = {
    en: {
      subtitle: "Habits, Facts, and Routines",
      when_use: "When to use it?",
      habits: "Habits",
      habits_ex: "I wake up at 7 AM.",
      facts: "Facts",
      facts_ex: "The sun rises in the east.",
      states: "States",
      states_ex: "She likes pizza.",
      structure: "The Structure",
      pos_text: "Just use the base verb. Add **-s** or **-es** for He/She/It.",
      neg_text: "Use **don't** or **doesn't**. The main verb loses the 's'!",
      ques_text: "Start with **Do** or **Does**.",
      spelling: "Spelling Rules (He/She/It)",
      most_verbs: "Most verbs",
      ends_in: "Ends in -o, -sh, -ch, -x",
      cons_y: "Consonant + y",
      irregular: "Irregular",
      mistake_1_exp: "Verbs ending in 'o' take -es.",
      mistake_2_exp: "In questions with 'Does', the main verb goes back to base form.",
      protip: "Look for time words like *often, usually, always, every day, on Mondays*. These are big clues that you need Present Simple!"
    },
    pl: {
      subtitle: "Nawyki, Fakty i Rutyny",
      when_use: "Kiedy używać?",
      habits: "Nawyki",
      habits_ex: "Budzę się o 7 rano.",
      facts: "Fakty",
      facts_ex: "Słońce wschodzi na wschodzie.",
      states: "Stany",
      states_ex: "Ona lubi pizzę.",
      structure: "Konstrukcja",
      pos_text: "Użyj formy podstawowej. Dodaj **-s** lub **-es** dla He/She/It.",
      neg_text: "Użyj **don't** lub **doesn't**. Czasownik główny traci 's'!",
      ques_text: "Zacznij od **Do** lub **Does**.",
      spelling: "Zasady Pisowni (He/She/It)",
      most_verbs: "Większość czasowników",
      ends_in: "Końcówki -o, -sh, -ch, -x",
      cons_y: "Spółgłoska + y",
      irregular: "Nieregularne",
      mistake_1_exp: "Czasowniki kończące się na 'o' przyjmują końcówkę -es.",
      mistake_2_exp: "W pytaniach z 'Does' czasownik główny wraca do formy podstawowej (bez 's').",
      protip: "Szukaj określeń czasu jak *often, usually, always, every day*. To wskazówka, że potrzebujesz Present Simple!"
    }
  };

  const t = content[language];

  return (
    <div className="animate-in fade-in duration-500">
      <LessonTitle subtitle={t.subtitle}>
        Present Simple
      </LessonTitle>

      <RuleCard title={t.when_use}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
           <div className="flex flex-col items-center text-center p-2">
              <div className="bg-blue-100 p-3 rounded-full text-blue-600 mb-2"><Repeat /></div>
              <strong className="text-slate-800">{t.habits}</strong>
              <p className="text-sm text-slate-500">{t.habits_ex}</p>
           </div>
           <div className="flex flex-col items-center text-center p-2">
              <div className="bg-emerald-100 p-3 rounded-full text-emerald-600 mb-2"><Calendar /></div>
              <strong className="text-slate-800">{t.facts}</strong>
              <p className="text-sm text-slate-500">{t.facts_ex}</p>
           </div>
           <div className="flex flex-col items-center text-center p-2">
              <div className="bg-purple-100 p-3 rounded-full text-purple-600 mb-2"><Activity /></div>
              <strong className="text-slate-800">{t.states}</strong>
              <p className="text-sm text-slate-500">{t.states_ex}</p>
           </div>
        </div>
      </RuleCard>

      <SectionHeader icon={Clock} title={t.structure} />

      {/* Interactive Tabbed View for Structure */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
        <div className="flex border-b border-slate-200">
           {['positive', 'negative', 'question'].map(tab => (
             <button 
               key={tab}
               onClick={() => setActiveTab(tab as any)}
               className={`flex-1 py-3 text-sm font-bold uppercase tracking-wide transition-colors ${
                 activeTab === tab ? 'bg-indigo-50 text-indigo-700 border-b-2 border-indigo-500' : 'text-slate-500 hover:bg-slate-50'
               }`}
             >
               {language === 'en' ? tab : (tab === 'positive' ? 'twierdzące' : tab === 'negative' ? 'przeczące' : 'pytające')}
             </button>
           ))}
        </div>
        
        <div className="p-6">
           {activeTab === 'positive' && (
             <div className="animate-in fade-in slide-in-from-right-2">
                <p className="mb-4 text-slate-600">{language === 'en' ? <span>Just use the base verb. Add <strong>-s</strong> or <strong>-es</strong> for He/She/It.</span> : <span>Użyj formy podstawowej. Dodaj <strong>-s</strong> lub <strong>-es</strong> dla He/She/It.</span>}</p>
                <GrammarTable 
                   headers={['Subject', 'Verb', 'Rest']}
                   rows={[
                     ['I / You / We / They', 'work', 'in an office.'],
                     ['He / She / It', 'work**s**', 'at home.'],
                     ['My brother', 'plays', 'football.'],
                   ]}
                />
             </div>
           )}
           {activeTab === 'negative' && (
             <div className="animate-in fade-in slide-in-from-right-2">
                <p className="mb-4 text-slate-600">{language === 'en' ? <span>Use <strong>don't</strong> or <strong>doesn't</strong>. The main verb loses the 's'!</span> : <span>Użyj <strong>don't</strong> lub <strong>doesn't</strong>. Czasownik traci 's'!</span>}</p>
                <GrammarTable 
                   headers={['Subject', 'Helper', 'Main Verb', 'Rest']}
                   rows={[
                     ['I / You', 'do not (don\'t)', 'like', 'spicy food.'],
                     ['He / She', 'does not (doesn\'t)', 'like', 'spicy food.'],
                     ['We / They', 'don\'t', 'need', 'help.'],
                   ]}
                   variant="green"
                />
                <div className="mt-4 text-xs text-amber-600 font-bold bg-amber-50 p-2 rounded border border-amber-100 inline-block">
                  ⚠️ Note: She doesn't *likes* (Incorrect) → She doesn't *like* (Correct)
                </div>
             </div>
           )}
           {activeTab === 'question' && (
             <div className="animate-in fade-in slide-in-from-right-2">
                <p className="mb-4 text-slate-600">{t.ques_text}</p>
                 <GrammarTable 
                   headers={['Helper', 'Subject', 'Verb', '?']}
                   rows={[
                     ['Do', 'you', 'speak', 'English?'],
                     ['Does', 'he', 'live', 'here?'],
                     ['Do', 'they', 'work', 'together?'],
                   ]}
                   variant="purple"
                />
             </div>
           )}
        </div>
      </div>

      <SectionHeader icon={Repeat} title={t.spelling} />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <ExampleBox>
           <strong>{t.most_verbs}:</strong> Add -s <br/>
           <span className="text-sm font-normal text-slate-500">Walk → Walks, Play → Plays</span>
        </ExampleBox>
        <ExampleBox>
           <strong>{t.ends_in}:</strong> Add -es <br/>
           <span className="text-sm font-normal text-slate-500">Go → Goes, Watch → Watches</span>
        </ExampleBox>
        <ExampleBox>
           <strong>{t.cons_y}:</strong> Change y to -ies <br/>
           <span className="text-sm font-normal text-slate-500">Study → Studies, Cry → Cries</span>
        </ExampleBox>
        <ExampleBox>
           <strong>{t.irregular}:</strong> <br/>
           <span className="text-sm font-normal text-slate-500">Have → Has, Be → Is</span>
        </ExampleBox>
      </div>

      <MistakeAlert 
         correct="He goes to school." 
         incorrect="He gos to school." 
         explanation={t.mistake_1_exp}
      />
      
      <MistakeAlert 
         correct="Does she play tennis?" 
         incorrect="Does she plays tennis?" 
         explanation={t.mistake_2_exp}
      />

      <ProTip>
        {t.protip}
      </ProTip>
    </div>
  );
};
