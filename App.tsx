
import React, { useState } from 'react';
import { Layout } from './components/Layout';
import { TenseMatrix } from './components/TenseMatrix';
import { GrammarLibrary } from './components/GrammarLibrary';
import { PracticeArena } from './components/PracticeArena';
import { VocabularyPanel } from './components/VocabularyPanel';
import { AiTutor } from './components/AiTutor';
import { WritingArena } from './components/WritingArena';
import { CurriculumView } from './components/CurriculumView';
import { LessonView } from './components/LessonView';
import { IrregularVerbsView } from './components/IrregularVerbsView';
import { ViewState, PracticeMode, VocabDirection, Chapter } from './types';
import { Grid3X3, Book, Languages } from 'lucide-react';
import { useLanguage } from './contexts/LanguageContext';

export default function App() {
  const { t } = useLanguage();
  const [currentView, setCurrentView] = useState<ViewState>(ViewState.DASHBOARD);
  const [dashboardTab, setDashboardTab] = useState<'tenses' | 'topics' | 'vocab'>('tenses');
  
  // Practice State
  const [practiceTopic, setPracticeTopic] = useState<string | undefined>(undefined);
  const [practiceMode, setPracticeMode] = useState<PracticeMode>('grammar');
  const [vocabDirection, setVocabDirection] = useState<VocabDirection>('PL_EN');

  // Lesson State
  const [selectedChapter, setSelectedChapter] = useState<{chapter: Chapter, level: string} | null>(null);
  // Keep track of previous view to return correctly from Irregular Verbs list
  const [previousView, setPreviousView] = useState<ViewState>(ViewState.DASHBOARD);

  const handleNavigate = (view: ViewState) => {
    // Reset practice state when navigating away manually
    if (view === ViewState.PRACTICE && currentView !== ViewState.PRACTICE) {
      setPracticeTopic(undefined);
      setPracticeMode('grammar');
    }
    setCurrentView(view);
  };

  const handleStartGrammarPractice = (topic: string) => {
    setPracticeTopic(topic);
    setPracticeMode('grammar');
    setCurrentView(ViewState.PRACTICE);
  };

  const handleStartVocabPractice = (direction: VocabDirection) => {
    setVocabDirection(direction);
    setPracticeMode('vocabulary');
    setPracticeTopic(undefined); // Clears manual topic to allow setup screen default
    setCurrentView(ViewState.PRACTICE);
  };

  const handleSelectChapter = (chapter: Chapter, level: string) => {
    setSelectedChapter({ chapter, level });
    setCurrentView(ViewState.LESSON);
  };

  const handleOpenIrregularVerbs = () => {
    setPreviousView(currentView);
    setCurrentView(ViewState.IRREGULAR_VERBS);
  };

  return (
    <Layout currentView={currentView} onChangeView={handleNavigate}>
      <div className="animate-in fade-in duration-300">
        {currentView === ViewState.DASHBOARD && (
          <div className="flex flex-col space-y-0 md:space-y-6">
            {/* Sticky Dashboard Tab Switcher */}
            <div className="sticky top-[3.5rem] z-30 bg-slate-50/95 backdrop-blur-sm border-b border-slate-200 md:border-none md:static md:bg-transparent py-3 md:py-0 -mx-3 px-3 md:mx-0 mb-6 transition-all">
               <div className="flex justify-start md:justify-center overflow-x-auto no-scrollbar">
                <div className="bg-slate-200/60 p-1 rounded-xl inline-flex whitespace-nowrap md:min-w-0">
                  <button
                    onClick={() => setDashboardTab('tenses')}
                    className={`px-4 sm:px-6 py-2.5 rounded-lg text-sm font-bold transition-all flex items-center gap-2 border border-transparent ${
                      dashboardTab === 'tenses'
                        ? 'bg-white text-slate-900 shadow-sm border-slate-100'
                        : 'text-slate-500 hover:text-slate-700'
                    }`}
                  >
                    <Grid3X3 size={16} />
                    {t('tab_tenses')}
                  </button>
                  <button
                    onClick={() => setDashboardTab('topics')}
                    className={`px-4 sm:px-6 py-2.5 rounded-lg text-sm font-bold transition-all flex items-center gap-2 border border-transparent ${
                      dashboardTab === 'topics'
                        ? 'bg-white text-slate-900 shadow-sm border-slate-100'
                        : 'text-slate-500 hover:text-slate-700'
                    }`}
                  >
                    <Book size={16} />
                    {t('tab_advanced')}
                  </button>
                  <button
                    onClick={() => setDashboardTab('vocab')}
                    className={`px-4 sm:px-6 py-2.5 rounded-lg text-sm font-bold transition-all flex items-center gap-2 border border-transparent ${
                      dashboardTab === 'vocab'
                        ? 'bg-white text-slate-900 shadow-sm border-slate-100'
                        : 'text-slate-500 hover:text-slate-700'
                    }`}
                  >
                    <Languages size={16} />
                    {t('tab_vocab')}
                  </button>
                </div>
              </div>
            </div>

            {/* Tab Content */}
            {dashboardTab === 'tenses' && (
               <div className="animate-in slide-in-from-left-4 duration-300 fade-in">
                 <TenseMatrix onPractice={handleStartGrammarPractice} />
               </div>
            )}

            {dashboardTab === 'topics' && (
               <div className="animate-in slide-in-from-bottom-4 duration-300 fade-in">
                 <GrammarLibrary onPractice={handleStartGrammarPractice} />
               </div>
            )}
            
            {dashboardTab === 'vocab' && (
               <div className="animate-in slide-in-from-right-4 duration-300 fade-in">
                 <VocabularyPanel onPractice={handleStartVocabPractice} />
               </div>
            )}
          </div>
        )}

        {currentView === ViewState.CURRICULUM && (
          <CurriculumView onSelectChapter={handleSelectChapter} />
        )}

        {currentView === ViewState.LESSON && selectedChapter && (
          <LessonView 
            chapter={selectedChapter.chapter} 
            level={selectedChapter.level}
            onBack={() => setCurrentView(ViewState.CURRICULUM)}
            onNavigate={handleSelectChapter}
            onStartQuiz={handleStartGrammarPractice}
            onStartWriting={() => setCurrentView(ViewState.WRITING)}
            onOpenIrregularVerbs={handleOpenIrregularVerbs}
          />
        )}
        
        {currentView === ViewState.PRACTICE && (
          <PracticeArena 
            initialTopic={practiceTopic}
            mode={practiceMode}
            vocabDirection={vocabDirection}
            onBack={() => setCurrentView(ViewState.DASHBOARD)} 
          />
        )}

        {currentView === ViewState.WRITING && (
           <WritingArena onBack={() => setCurrentView(ViewState.DASHBOARD)} />
        )}

        {currentView === ViewState.TUTOR && (
          <AiTutor />
        )}
        
        {currentView === ViewState.IRREGULAR_VERBS && (
          <IrregularVerbsView onBack={() => setCurrentView(previousView)} />
        )}
      </div>
    </Layout>
  );
}
