
import React from 'react';
import { AlphabetLesson } from './Beginner/Alphabet';
import { PresentSimpleLesson } from './Beginner/PresentSimple';
import { EnglishBasicsLesson } from './Beginner/EnglishBasics';
import { PresentContinuousLesson } from './Beginner/PresentContinuous';
import { PastSimpleLesson } from './Beginner/PastSimple';
import { FuturePlansLesson } from './Beginner/FuturePlans';
import { CountablesLesson } from './Beginner/Countables';
import { ThereIsLesson } from './Beginner/ThereIs';
import { HaveGotLesson } from './Beginner/HaveGot';
import { BasicModalsLesson } from './Beginner/BasicModals';
import { EverydayCommunicationLesson } from './Beginner/EverydayCommunication';
import { AdjectivesLesson } from './Beginner/Adjectives';
import { TimeDatesLesson } from './Beginner/TimeDates';
import { WritingEssentialsLesson } from './Beginner/WritingEssentials';

import { ConditionalsLesson } from './Intermediate/Conditionals';
import { PresentPerfectLesson } from './Intermediate/PresentPerfect';
import { PastPerfectLesson } from './Intermediate/PastPerfect';
import { PassiveVoiceLesson } from './Intermediate/PassiveVoice';
import { ReportedSpeechLesson } from './Intermediate/ReportedSpeech';
import { GerundsInfinitivesLesson } from './Intermediate/GerundsInfinitives';
import { BuildingNaturalEnglishLesson } from './Intermediate/BuildingNaturalEnglish';
import { FutureFormsLesson } from './Intermediate/FutureForms';
import { AdvancedModalsLesson } from './Intermediate/AdvancedModals';

import { FluencyLesson } from './Advanced/Fluency';
import { ComplexStructuresLesson } from './Advanced/ComplexStructures';
import { AdvancedPhrasalsLesson } from './Advanced/AdvancedPhrasals';
import { LessonTitle } from '../ui/LessonComponents';
import { AlertTriangle } from 'lucide-react';

// A generic fallback for lessons that aren't fully custom yet
const GenericLesson: React.FC<{ title: string; content: string }> = ({ title, content }) => {
  const sections = content.split('\n');
  
  return (
    <div className="animate-in fade-in">
      <LessonTitle>{title}</LessonTitle>
      <div className="prose prose-slate max-w-none">
        {sections.map((line, idx) => {
           if (line.startsWith('# ')) return null;
           if (line.startsWith('## ')) return <h2 key={idx} className="text-2xl font-bold text-slate-800 mt-8 mb-4">{line.replace('## ', '')}</h2>;
           if (line.startsWith('### ')) return <h3 key={idx} className="text-xl font-bold text-indigo-700 mt-6 mb-3">{line.replace('### ', '')}</h3>;
           if (line.startsWith('- ')) return <li key={idx} className="ml-4 list-disc text-slate-700 my-1">{line.replace('- ', '')}</li>;
           if (line.trim() === '') return <br key={idx} />;
           return <p key={idx} className="text-slate-600 leading-relaxed mb-2">{line.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')}</p>; 
        })}
      </div>
      <div className="mt-12 p-6 bg-slate-50 rounded-xl border border-slate-200 text-center">
         <AlertTriangle className="mx-auto text-slate-400 mb-2" />
         <p className="text-slate-500 italic text-sm">
           This is a standard lesson format. A rich, interactive version of this topic is coming soon!
         </p>
      </div>
    </div>
  );
};

export const getLessonComponent = (title: string, fallbackContent: string, onOpenIrregularVerbs: () => void) => {
  switch (title) {
    // Beginner
    case 'Alphabet & Sounds': return <AlphabetLesson />;
    case 'English Basics': return <EnglishBasicsLesson onOpenIrregularVerbs={onOpenIrregularVerbs} />;
    case 'Present Simple': return <PresentSimpleLesson />;
    case 'Present Continuous': return <PresentContinuousLesson />;
    case 'Past Simple': return <PastSimpleLesson onOpenIrregularVerbs={onOpenIrregularVerbs} />;
    case 'Future Plans': return <FuturePlansLesson />;
    case 'Countable & Uncountable Nouns': return <CountablesLesson />;
    case 'There is / There are': return <ThereIsLesson />;
    case 'Have got / Possession': return <HaveGotLesson />;
    case 'Basic Modal Verbs': return <BasicModalsLesson />;
    case 'Everyday Communication': return <EverydayCommunicationLesson />;
    case 'Basic Adjectives & Descriptions': return <AdjectivesLesson />;
    case 'Time, Dates, Numbers': return <TimeDatesLesson />;
    case 'Writing Essentials': return <WritingEssentialsLesson />;
    
    // Intermediate
    case 'Conditional Sentences': return <ConditionalsLesson />;
    case 'Present Perfect & Present Perfect Continuous': return <PresentPerfectLesson onOpenIrregularVerbs={onOpenIrregularVerbs} />;
    case 'Past Continuous & Past Perfect': return <PastPerfectLesson />;
    case 'Passive Voice': return <PassiveVoiceLesson />;
    case 'Reported Speech': return <ReportedSpeechLesson />;
    case 'Gerunds & Infinitives': return <GerundsInfinitivesLesson />;
    case 'Building Natural English': return <BuildingNaturalEnglishLesson />;
    case 'Future Forms': return <FutureFormsLesson />;
    case 'Modal Verbs – Advanced': return <AdvancedModalsLesson />;
    
    // Advanced
    case 'Advanced Fluency Techniques': return <FluencyLesson />;
    case 'Complex Grammar Structures': return <ComplexStructuresLesson />;
    case 'Advanced Phrasal Verbs': return <AdvancedPhrasalsLesson />;
    
    default:
      return <GenericLesson title={title} content={fallbackContent} />;
  }
};