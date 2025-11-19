
import React, { useEffect, useState, useMemo } from 'react';
import { Chapter } from '../types';
import { CURRICULUM } from '../data/curriculum';
import { lessonService } from '../services/lessonService';
import { getLessonComponent } from './lessons/LessonRegistry';
import { ArrowLeft, PenTool, BrainCircuit, Loader2, AlertCircle, ChevronLeft, ChevronRight } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface LessonViewProps {
  chapter: Chapter;
  level: string;
  onBack: () => void;
  onNavigate: (chapter: Chapter, level: string) => void;
  onStartQuiz: (topic: string) => void;
  onStartWriting: () => void;
  onOpenIrregularVerbs: () => void;
}

export const LessonView: React.FC<LessonViewProps> = ({ chapter, level, onBack, onNavigate, onStartQuiz, onStartWriting, onOpenIrregularVerbs }) => {
  const { t } = useLanguage();
  const [content, setContent] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Scroll to top when chapter changes
    window.scrollTo(0, 0);
    
    const loadContent = async () => {
      setLoading(true);
      try {
        const text = await lessonService.getLessonContent(chapter);
        setContent(text);
      } catch (e) {
        setContent("# Error\nCould not load content.");
      } finally {
        setLoading(false);
      }
    };

    loadContent();
  }, [chapter]);

  // Logic to find previous and next lessons
  const { prevLesson, nextLesson } = useMemo(() => {
    const LEVELS = ['Beginner', 'Intermediate', 'Advanced'];
    const currentLevelIndex = LEVELS.indexOf(level);
    
    if (currentLevelIndex === -1) return { prevLesson: null, nextLesson: null };

    const currentChapters = CURRICULUM[level].chapters;
    const currentChapterIndex = currentChapters.findIndex(c => c.title === chapter.title);

    let prev = null;
    let next = null;

    // Find Previous
    if (currentChapterIndex > 0) {
       prev = { level: level, chapter: currentChapters[currentChapterIndex - 1] };
    } else if (currentLevelIndex > 0) {
       const prevLevel = LEVELS[currentLevelIndex - 1];
       const prevLevelChapters = CURRICULUM[prevLevel].chapters;
       prev = { level: prevLevel, chapter: prevLevelChapters[prevLevelChapters.length - 1] };
    }

    // Find Next
    if (currentChapterIndex < currentChapters.length - 1) {
       next = { level: level, chapter: currentChapters[currentChapterIndex + 1] };
    } else if (currentLevelIndex < LEVELS.length - 1) {
       const nextLevel = LEVELS[currentLevelIndex + 1];
       const nextLevelChapters = CURRICULUM[nextLevel].chapters;
       next = { level: nextLevel, chapter: nextLevelChapters[0] };
    }

    return { prevLesson: prev, nextLesson: next };
  }, [chapter, level]);

  return (
    <div className="max-w-5xl mx-auto animate-in slide-in-from-right-4 pb-12">
      {/* Header Nav */}
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-slate-500 hover:text-indigo-600 transition-colors font-medium text-sm px-3 py-2 hover:bg-slate-100 rounded-lg"
        >
          <ArrowLeft size={16} /> {t('back_to_path')}
        </button>
        
        <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide border whitespace-nowrap ${
             level === 'Beginner' ? 'bg-blue-50 text-blue-700 border-blue-100' :
             level === 'Intermediate' ? 'bg-amber-50 text-amber-700 border-amber-100' :
             'bg-emerald-50 text-emerald-700 border-emerald-100'
        }`}>
          {t(level.toLowerCase())}
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-8 items-start">
        {/* Main Lesson Content */}
        <div className="flex flex-col min-h-[60vh]">
          <div className="bg-white rounded-2xl p-6 md:p-12 shadow-sm border border-slate-200 flex-1 mb-6">
             {loading ? (
               <div className="flex flex-col items-center justify-center h-64 space-y-4">
                 <Loader2 size={32} className="animate-spin text-indigo-600" />
                 <p className="text-slate-500 animate-pulse">{t('opening_lesson')}</p>
               </div>
             ) : (
               // RENDER FROM REGISTRY
               getLessonComponent(chapter.title, content || "", onOpenIrregularVerbs)
             )}
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-between items-center gap-4">
            <button 
              onClick={() => prevLesson && onNavigate(prevLesson.chapter, prevLesson.level)}
              disabled={!prevLesson}
              className={`flex items-center gap-3 px-4 md:px-5 py-4 rounded-xl font-bold text-sm md:text-base transition-all flex-1 md:flex-initial justify-center md:justify-start min-h-[80px] ${
                prevLesson 
                  ? 'bg-white border border-slate-200 text-slate-700 hover:border-indigo-300 hover:text-indigo-600 hover:shadow-md active:scale-[0.98]' 
                  : 'bg-slate-100 text-slate-400 cursor-not-allowed'
              }`}
            >
              <ChevronLeft size={20} className="shrink-0" />
              <div className="text-left hidden md:block">
                 <span className="block text-[10px] uppercase text-slate-400 font-bold">{t('previous')}</span>
                 <span className="block leading-tight">{prevLesson ? prevLesson.chapter.title : 'Start'}</span>
              </div>
              <span className="md:hidden">{t('btn_prev')}</span>
            </button>

            <button 
              onClick={() => nextLesson && onNavigate(nextLesson.chapter, nextLesson.level)}
              disabled={!nextLesson}
              className={`flex items-center gap-3 px-4 md:px-5 py-4 rounded-xl font-bold text-sm md:text-base transition-all flex-1 md:flex-initial justify-center md:justify-end min-h-[80px] ${
                nextLesson 
                  ? 'bg-slate-900 text-white hover:bg-indigo-600 hover:shadow-lg active:scale-[0.98]' 
                  : 'bg-slate-100 text-slate-400 cursor-not-allowed'
              }`}
            >
              <span className="md:hidden">{t('btn_next')}</span>
              <div className="text-right hidden md:block">
                 <span className="block text-[10px] uppercase text-slate-300/60 font-bold">{t('up_next')}</span>
                 <span className="block leading-tight">{nextLesson ? nextLesson.chapter.title : t('finished')}</span>
              </div>
              <ChevronRight size={20} className="shrink-0" />
            </button>
          </div>
        </div>

        {/* Sidebar / Actions */}
        <div className="space-y-6 sticky top-24 hidden lg:block">
          <div className="bg-slate-900 rounded-2xl p-6 text-white shadow-xl shadow-slate-200">
            <h3 className="font-bold text-lg mb-4 border-b border-slate-700 pb-4">{t('ready_practice')}</h3>
            
            <button 
              onClick={() => onStartQuiz(chapter.title)}
              className="w-full bg-indigo-600 hover:bg-indigo-500 border border-transparent p-4 rounded-xl text-left mb-3 group transition-all active:scale-95 shadow-lg shadow-indigo-900/20"
            >
              <div className="flex items-center gap-3 mb-1">
                 <BrainCircuit size={20} className="text-indigo-200" />
                 <span className="font-bold">{t('take_quiz')}</span>
              </div>
              <p className="text-xs text-indigo-200 opacity-80 pl-8">{t('quiz_desc')}</p>
            </button>

            <button 
              onClick={onStartWriting}
              className="w-full bg-slate-800 hover:bg-slate-700 border border-slate-700 p-4 rounded-xl text-left group transition-all active:scale-95"
            >
              <div className="flex items-center gap-3 mb-1">
                 <PenTool size={20} className="text-purple-300" />
                 <span className="font-bold">{t('writing_task')}</span>
              </div>
              <p className="text-xs text-slate-400 pl-8">{t('writing_desc')}</p>
            </button>
          </div>

          <div className="bg-indigo-50 rounded-xl p-5 border border-indigo-100">
            <div className="flex items-start gap-3">
               <AlertCircle className="text-indigo-600 shrink-0 mt-1" size={20} />
               <div>
                 <h4 className="font-bold text-indigo-900 text-sm mb-1">{t('stuck_title')}</h4>
                 <p className="text-xs text-indigo-800 leading-relaxed">
                   {t('stuck_desc')} <strong>"{chapter.title}"</strong>.
                 </p>
               </div>
            </div>
          </div>
        </div>
        
        {/* Mobile Sidebar Actions (shown below nav buttons on mobile) */}
        <div className="space-y-4 lg:hidden mt-4 border-t border-slate-200 pt-6">
          <h3 className="font-bold text-slate-800">{t('practice_lesson_mobile')}</h3>
          <div className="grid grid-cols-2 gap-3">
            <button 
              onClick={() => onStartQuiz(chapter.title)}
              className="bg-indigo-600 text-white p-3 rounded-xl font-bold text-sm flex flex-col items-center justify-center gap-2"
            >
               <BrainCircuit size={20} />
               {t('take_quiz')}
            </button>
            <button 
              onClick={onStartWriting}
              className="bg-slate-800 text-white p-3 rounded-xl font-bold text-sm flex flex-col items-center justify-center gap-2"
            >
               <PenTool size={20} />
               {t('writing_task')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
