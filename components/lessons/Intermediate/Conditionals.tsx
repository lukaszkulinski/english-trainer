
import React from 'react';
import { LessonTitle, SectionHeader, RuleCard, GrammarTable, ProTip, ExampleBox } from '../../ui/LessonComponents';
import { Split, HelpCircle, AlertTriangle } from 'lucide-react';
import { useLanguage } from '../../../contexts/LanguageContext';

export const ConditionalsLesson: React.FC = () => {
  const { language } = useLanguage();
  const content = {
    en: {
      subtitle: "Talking about 'If'...",
      intro: "Conditionals describe the result of something that might happen (in the present or future) or might have happened (in the past). They always have two parts: the <strong>If-clause</strong> (condition) and the <strong>Main clause</strong> (result).",
      summary_title: "The 4 Types Summary",
      real_title: "Zero & First (Real)",
      zero: "Zero Conditional",
      zero_use: "Use for scientific facts or general truths.",
      first: "First Conditional",
      first_use: "Use for real specific situations in the future.",
      unreal_title: "Second Conditional (Unreal)",
      unreal_intro: "Use this for dreams, imaginary situations, or advice. It is NOT about the past, even though we use the Past Simple tense.",
      was_were_title: "The \"Was/Were\" Rule",
      was_were_desc: "In formal English, we often use <strong>were</strong> instead of <strong>was</strong> for all persons in the Second Conditional.",
      third_title: "Third Conditional (Regrets)",
      third_intro: "Talking about the past. Changing history. Impossible!",
      protip: "You can swap the order of the clauses! If you put the <em>If-clause</em> second, you don't need a comma. <br/> <em>\"I will stay home if it rains.\"</em>"
    },
    pl: {
      subtitle: "Mówienie o 'Gdyby'...",
      intro: "Tryby warunkowe opisują wynik czegoś, co może się wydarzyć (teraz lub w przyszłości) lub mogło się wydarzyć (w przeszłości). Zawsze mają dwie części: <strong>If-clause</strong> (warunek) i <strong>Main clause</strong> (wynik).",
      summary_title: "Podsumowanie 4 Typów",
      real_title: "Zerowy i Pierwszy (Realne)",
      zero: "Zerowy Tryb Warunkowy",
      zero_use: "Fakty naukowe i ogólne prawdy.",
      first: "Pierwszy Tryb Warunkowy",
      first_use: "Realne, konkretne sytuacje w przyszłości.",
      unreal_title: "Drugi Tryb Warunkowy (Nierealne)",
      unreal_intro: "Używaj do marzeń, sytuacji wyimaginowanych lub rad. NIE dotyczy przeszłości, mimo że używamy czasu Past Simple.",
      was_were_title: "Zasada \"Was/Were\"",
      was_were_desc: "W formalnym angielskim często używamy <strong>were</strong> zamiast <strong>was</strong> dla wszystkich osób w drugim trybie warunkowym.",
      third_title: "Trzeci Tryb Warunkowy (Żal za przeszłością)",
      third_intro: "Mówienie o przeszłości. Zmienianie historii. Niemożliwe!",
      protip: "Możesz zamienić kolejność zdań! Jeśli wstawisz <em>If</em> w środku, nie stawiasz przecinka. <br/> <em>\"I will stay home if it rains.\"</em>"
    }
  };
  const t = content[language];

  return (
    <div className="animate-in fade-in duration-500">
      <LessonTitle subtitle={t.subtitle}>
        Conditional Sentences
      </LessonTitle>

      <p className="text-lg text-slate-600 mb-8" dangerouslySetInnerHTML={{__html: t.intro}}></p>

      <RuleCard title={t.summary_title} type="important">
         <ul className="space-y-2 text-sm md:text-base">
            <li><strong>Zero:</strong> {language === 'en' ? 'Facts / Truths (100% real)' : 'Fakty / Prawdy (100% realne)'}</li>
            <li><strong>First:</strong> {language === 'en' ? 'Real possibilities in the future (50-90% likely)' : 'Realne możliwości w przyszłości (50-90% szans)'}</li>
            <li><strong>Second:</strong> {language === 'en' ? 'Unreal/Imaginary present or future (0-10% likely)' : 'Nierealne/Wyobrażone (0-10% szans)'}</li>
            <li><strong>Third:</strong> {language === 'en' ? 'Unreal past / Regrets (0% - it\'s too late)' : 'Nierealna przeszłość / Żal (0% - za późno)'}</li>
         </ul>
      </RuleCard>

      <SectionHeader icon={Split} title={t.real_title} />
      
      <h3 className="text-xl font-bold text-slate-800 mt-6 mb-2">{t.zero}</h3>
      <p className="text-slate-600 mb-2">{t.zero_use}</p>
      <GrammarTable 
        headers={['If Clause (Present)', 'Result Clause (Present)']}
        rows={[
          ['If you heat ice,', 'it melts.'],
          ['If babies are hungry,', 'they cry.'],
        ]}
      />

      <h3 className="text-xl font-bold text-slate-800 mt-6 mb-2">{t.first}</h3>
      <p className="text-slate-600 mb-2">{t.first_use}</p>
      <GrammarTable 
        headers={['If Clause (Present)', 'Result Clause (Will + V)']}
        rows={[
          ['If it rains,', 'I will stay home.'],
          ['If she studies hard,', 'she will pass the exam.'],
        ]}
        variant="green"
      />

      <SectionHeader icon={HelpCircle} title={t.unreal_title} />
      <p className="text-slate-600 mb-4">{t.unreal_intro}</p>

      <RuleCard title="Formula">
         <strong>If + Past Simple, ... would + Verb</strong>
      </RuleCard>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
         <ExampleBox>
            If I <strong>won</strong> the lottery, I <strong>would buy</strong> an island.
            <br/><span className="text-xs text-slate-400">({language === 'en' ? 'I probably won\'t win' : 'Pewnie nie wygram'})</span>
         </ExampleBox>
         <ExampleBox>
            If I <strong>had</strong> more time, I <strong>would learn</strong> piano.
            <br/><span className="text-xs text-slate-400">({language === 'en' ? 'But I don\'t have time now' : 'Ale teraz nie mam czasu'})</span>
         </ExampleBox>
      </div>

      <div className="mt-6 bg-indigo-50 p-4 rounded-xl border border-indigo-100">
         <h4 className="font-bold text-indigo-800 mb-2">{t.was_were_title}</h4>
         <p className="text-slate-700 text-sm" dangerouslySetInnerHTML={{__html: t.was_were_desc}}></p>
         <div className="mt-3 font-medium text-indigo-900 italic">
            "If I <strong>were</strong> you, I wouldn't do that."
         </div>
      </div>

      <SectionHeader icon={AlertTriangle} title={t.third_title} />
      <p className="text-slate-600 mb-4">{t.third_intro}</p>

      <RuleCard title="Formula">
         <strong>If + Past Perfect (had V3), ... would have + V3</strong>
      </RuleCard>

      <ExampleBox>
         If I <strong>had known</strong> you were coming, I <strong>would have baked</strong> a cake.
         <br/><span className="text-xs text-slate-400">({language === 'en' ? 'But I didn\'t know, so no cake.' : 'Ale nie wiedziałem, więc ciasta brak.'})</span>
      </ExampleBox>

      <ProTip>
         <span dangerouslySetInnerHTML={{__html: t.protip}}></span>
      </ProTip>
    </div>
  );
};
