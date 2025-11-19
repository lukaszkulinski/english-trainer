
import React from 'react';
import { LessonTitle, SectionHeader, RuleCard, ExampleBox, VocabList, ProTip } from '../../ui/LessonComponents';
import { MessageSquare, Feather, Shield } from 'lucide-react';
import { useLanguage } from '../../../contexts/LanguageContext';

export const FluencyLesson: React.FC = () => {
  const { language } = useLanguage();
  const content = {
    en: {
      subtitle: "Sounding natural, polite, and sophisticated",
      intro: "Fluency isn't just about speed; it's about <strong>flexibility</strong>. Advanced speakers can rephrase ideas to be clearer (Reformulation) and soften their language to be more polite or precise (Hedging).",
      reformulation: "Reformulation",
      ref_desc: "Sometimes your first sentence isn't clear enough, or you want to emphasize a point. Use reformulation markers to try again.",
      hedging: "Hedging (Softening)",
      why_hedge: "Why Hedge?",
      hedge_desc: "In academic and professional English, making 100% direct statements can sound aggressive or naive. \"Hedging\" protects you from being wrong and sounds more polite.",
      too_direct: "Too Direct",
      hedged: "Hedged (Better)",
      style: "Style: Nominalisation",
      style_desc: "Formal English often prefers Nouns over Verbs. This is called Nominalisation.",
      protip: "Don't over-hedge! If you say \"I sort of think that maybe it might be possibly true,\" you sound unconfident. Aim for <strong>precision</strong>, not vagueness.",
      vocab: [
        { term: 'In other words, ...', def: 'Simplifying complex ideas.' },
        { term: 'To put it another way, ...', def: 'Explaining from a different angle.' },
        { term: 'What I mean is...', def: 'Clarifying intent.' },
        { term: 'Basically / Essentially, ...', def: 'Summarizing the main point.' },
      ]
    },
    pl: {
      subtitle: "Brzmienie naturalne, uprzejme i wyrafinowane",
      intro: "Płynność to nie tylko prędkość, to <strong>elastyczność</strong>. Zaawansowani mówcy potrafią przeformułować myśli (Reformulation) i zmiękczać język, by był bardziej uprzejmy (Hedging).",
      reformulation: "Przeformułowanie",
      ref_desc: "Czasami Twoje pierwsze zdanie nie jest wystarczająco jasne. Użyj markerów, aby spróbować ponownie.",
      hedging: "Zmiękczanie (Hedging)",
      why_hedge: "Po co zmiękczać?",
      hedge_desc: "W języku akademickim i zawodowym, stwierdzenia w 100% bezpośrednie mogą brzmieć agresywnie lub naiwnie. Hedging chroni przed błędem i brzmi uprzejmiej.",
      too_direct: "Zbyt bezpośrednio",
      hedged: "Zmiękczone (Lepiej)",
      style: "Styl: Nominalizacja",
      style_desc: "Formalny angielski woli rzeczowniki od czasowników.",
      protip: "Nie przesadzaj! Jeśli powiesz \"Chyba myślę, że może to ewentualnie prawda\", zabrzmisz niepewnie. Celuj w <strong>precyzję</strong>.",
      vocab: [
        { term: 'In other words, ...', def: '(Innymi słowy) Upraszczanie idei.' },
        { term: 'To put it another way, ...', def: '(Inaczej mówiąc) Wyjaśnianie z innej strony.' },
        { term: 'What I mean is...', def: '(Chodzi mi o to, że...) Wyjaśnianie intencji.' },
        { term: 'Basically / Essentially, ...', def: '(W zasadzie) Podsumowanie sedna.' },
      ]
    }
  };
  const t = content[language];

  return (
    <div className="animate-in fade-in duration-500">
      <LessonTitle subtitle={t.subtitle}>
        Advanced Fluency Techniques
      </LessonTitle>

      <div className="prose prose-lg prose-slate mb-8">
        <p dangerouslySetInnerHTML={{__html: t.intro}}></p>
      </div>

      <SectionHeader icon={MessageSquare} title={t.reformulation} />
      <p className="text-slate-600 mb-4">{t.ref_desc}</p>

      <VocabList items={t.vocab} />

      <ExampleBox>
         "The fiscal situation is becoming untenable. <strong>In other words</strong>, we are running out of money."
      </ExampleBox>

      <SectionHeader icon={Shield} title={t.hedging} />
      <RuleCard title={t.why_hedge} type="important">
        <p>{t.hedge_desc}</p>
      </RuleCard>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6">
        <div className="border border-red-200 bg-red-50 p-5 rounded-xl">
           <h4 className="font-bold text-red-800 mb-2">{t.too_direct}</h4>
           <ul className="space-y-2 text-red-900/80">
             <li>"This idea is bad."</li>
             <li>"The data shows a decline."</li>
             <li>"You are wrong."</li>
           </ul>
        </div>
        <div className="border border-emerald-200 bg-emerald-50 p-5 rounded-xl">
           <h4 className="font-bold text-emerald-800 mb-2">{t.hedged}</h4>
           <ul className="space-y-2 text-emerald-900/80">
             <li>"This idea <strong>seems to have</strong> some potential issues."</li>
             <li>"The data <strong>suggests</strong> a decline."</li>
             <li>"I <strong>would argue</strong> that there is another perspective."</li>
           </ul>
        </div>
      </div>

      <SectionHeader icon={Feather} title={t.style} />
      <p className="text-slate-600 mb-4">{t.style_desc}</p>

      <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
         <div className="mb-3 border-b border-slate-100 pb-3">
           <span className="text-xs font-bold text-slate-400 uppercase">Verbal Style</span>
           <p className="text-slate-700">"We <strong>discussed</strong> the problem and <strong>decided</strong> to wait."</p>
         </div>
         <div>
           <span className="text-xs font-bold text-indigo-400 uppercase">Nominal Style (Formal)</span>
           <p className="text-slate-900 font-medium">"After a <strong>discussion</strong> of the problem, a <strong>decision</strong> was made to wait."</p>
         </div>
      </div>

      <ProTip>
         <span dangerouslySetInnerHTML={{__html: t.protip}}></span>
      </ProTip>
    </div>
  );
};
