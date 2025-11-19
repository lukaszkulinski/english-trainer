
import React, { useState, useEffect, useCallback } from 'react';
import { QuizData, QuizQuestion, PracticeMode, VocabDirection } from '../types';
import { geminiService } from '../services/geminiService';
import { CheckCircle, XCircle, Play, AlertCircle, RefreshCw, ArrowRight, Settings2, X, Lock } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface PracticeArenaProps {
  initialTopic?: string;
  mode?: PracticeMode;
  vocabDirection?: VocabDirection;
  onBack: () => void;
}

export const PracticeArena: React.FC<PracticeArenaProps> = ({ 
  initialTopic, 
  mode = 'grammar', 
  vocabDirection = 'PL_EN',
  onBack 
}) => {
  const { t } = useLanguage();
  // Setup State
  const [topic, setTopic] = useState(initialTopic || "General English");
  const [difficulty, setDifficulty] = useState<'beginner' | 'intermediate' | 'advanced'>('intermediate');
  const [questionCount, setQuestionCount] = useState(5);
  
  // Quiz State
  const [quizData, setQuizData] = useState<QuizData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  
  // Answer States
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [textInput, setTextInput] = useState('');
  const [verbInputs, setVerbInputs] = useState({ v1: '', v2: '', v3: '' });
  
  const [showExplanation, setShowExplanation] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);

  // Reset when entering with new props
  useEffect(() => {
    setTopic(initialTopic || (mode === 'vocabulary' ? 'General Vocabulary' : 'Mixed Tenses'));
    setQuizData(null);
    setQuizCompleted(false);
  }, [initialTopic, mode]);

  const generateQuiz = useCallback(async () => {
    setLoading(true);
    setError(null);
    setQuizData(null);
    setScore(0);
    setCurrentQuestionIndex(0);
    setQuizCompleted(false);
    setSelectedOption(null);
    setTextInput('');
    setVerbInputs({ v1: '', v2: '', v3: '' });
    setShowExplanation(false);

    try {
      let data: QuizData;
      if (mode === 'vocabulary') {
        data = await geminiService.generateVocabularyQuiz(vocabDirection, difficulty, questionCount);
      } else {
        data = await geminiService.generateQuiz(topic, difficulty, questionCount);
      }
      setQuizData(data);
    } catch (err) {
      setError("Failed to generate quiz. Please check your connection or try again.");
    } finally {
      setLoading(false);
    }
  }, [topic, difficulty, questionCount, mode, vocabDirection]);

  const handleOptionSelect = (index: number) => {
    if (selectedOption !== null) return;
    if (!quizData) return;
    
    const q = quizData.questions[currentQuestionIndex];
    setSelectedOption(index);
    setShowExplanation(true);
    
    const correct = index === q.correctAnswerIndex;
    setIsCorrect(correct);
    if (correct) setScore(prev => prev + 1);
  };

  const handleTextSubmit = () => {
    if (!quizData) return;
    const q = quizData.questions[currentQuestionIndex];
    
    let correct = false;

    if (q.type === 'verb-forms') {
      // Validate all 3 forms
      const forms = q.verbForms?.map(f => f.toLowerCase().trim());
      if (forms) {
        const v1Match = verbInputs.v1.toLowerCase().trim() === forms[0];
        const v2Match = verbInputs.v2.toLowerCase().trim() === forms[1];
        const v3Match = verbInputs.v3.toLowerCase().trim() === forms[2];
        correct = v1Match && v2Match && v3Match;
      }
    } else {
      // Standard Text Input
      const userAns = textInput.toLowerCase().trim();
      const correctAns = q.correctAnswer?.toLowerCase().trim();
      const acceptable = q.acceptableAnswers?.map(a => a.toLowerCase().trim()) || [];
      
      correct = userAns === correctAns || acceptable.includes(userAns);
    }

    setIsCorrect(correct);
    if (correct) setScore(prev => prev + 1);
    setShowExplanation(true);
  };

  const handleNext = () => {
    if (!quizData) return;
    if (currentQuestionIndex < quizData.questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedOption(null);
      setTextInput('');
      setVerbInputs({ v1: '', v2: '', v3: '' });
      setShowExplanation(false);
      setIsCorrect(false);
    } else {
      setQuizCompleted(true);
    }
  };

  // --- Loading View ---
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] space-y-4 px-4 text-center">
        <div className="w-12 h-12 md:w-16 md:h-16 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div>
        <p className="text-slate-600 font-medium animate-pulse text-sm md:text-base">
          {t('loading_session')}
        </p>
      </div>
    );
  }

  // --- Error View ---
  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] space-y-4 text-center px-4">
        <AlertCircle className="w-14 h-14 text-red-500" />
        <p className="text-slate-800 font-bold text-lg">{t('error_title')}</p>
        <p className="text-slate-600 text-sm">{error}</p>
        <button onClick={generateQuiz} className="px-6 py-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 font-medium">{t('btn_try_again')}</button>
        <button onClick={onBack} className="px-6 py-3 text-slate-600 font-medium">{t('btn_go_back')}</button>
      </div>
    );
  }

  // --- Setup View ---
  if (!quizData) {
    return (
      <div className="max-w-xl mx-auto bg-white p-6 md:p-8 rounded-2xl shadow-lg border border-slate-100 animate-in slide-in-from-bottom-4">
        <div className="flex items-center gap-3 mb-6 justify-center">
          <Settings2 className="text-indigo-600" size={24} />
          <h2 className="text-xl md:text-2xl font-bold text-slate-800">{t('session_setup')}</h2>
        </div>
        
        <div className="space-y-6">
          {mode === 'grammar' && (
             <div>
               <label className="block text-sm font-medium text-slate-700 mb-2">{t('lbl_topic')}</label>
               <div className="w-full px-4 py-3.5 border border-slate-200 rounded-xl bg-slate-50 text-slate-700 font-semibold flex items-center justify-between shadow-sm">
                 <span>{topic}</span>
                 <div className="flex items-center gap-2">
                   {initialTopic ? (
                     <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-2 py-1 rounded-md border border-indigo-100">{t('lbl_selected')}</span>
                   ) : (
                     <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 bg-white px-2 py-1 rounded-md border border-slate-200">{t('lbl_mixed')}</span>
                   )}
                   <Lock size={16} className="text-slate-400" />
                 </div>
               </div>
             </div>
          )}

          {mode === 'vocabulary' && (
            <div className="p-4 bg-indigo-50 rounded-xl border border-indigo-100 text-center">
              <p className="text-indigo-900 font-semibold">
                {vocabDirection === 'PL_EN' ? 'Polish ➔ English' : 'English ➔ Polish'}
              </p>
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">{t('lbl_difficulty')}</label>
            <div className="grid grid-cols-3 gap-2">
              {['beginner', 'intermediate', 'advanced'].map((d) => (
                <button
                  key={d}
                  onClick={() => setDifficulty(d as any)}
                  className={`py-3 rounded-xl text-xs md:text-sm font-medium capitalize transition-all active:scale-95 ${
                    difficulty === d ? 'bg-slate-800 text-white shadow-md' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {t(`${d}_lvl`)}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">{t('lbl_questions')}</label>
            <div className="grid grid-cols-3 gap-2">
              {[5, 10, 15].map((count) => (
                <button
                  key={count}
                  onClick={() => setQuestionCount(count)}
                  className={`py-3 rounded-xl text-sm font-medium transition-all active:scale-95 ${
                    questionCount === count ? 'bg-indigo-600 text-white shadow-md' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {count}
                </button>
              ))}
            </div>
          </div>

          <div className="flex gap-3 pt-4">
             <button 
              onClick={onBack}
              className="flex-1 py-3.5 border border-slate-200 text-slate-700 rounded-xl font-semibold hover:bg-slate-50 active:scale-95 transition-transform"
            >
              {t('btn_back')}
            </button>
            <button 
              onClick={generateQuiz}
              className="flex-[2] py-3.5 bg-slate-900 text-white rounded-xl font-bold text-lg hover:bg-slate-800 transition-all flex items-center justify-center gap-2 shadow-lg shadow-indigo-100 active:scale-95"
            >
              <Play size={20} fill="currentColor" />
              {t('btn_start')}
            </button>
          </div>
        </div>
      </div>
    );
  }

  // --- Results View ---
  if (quizCompleted) {
    const percentage = Math.round((score / quizData.questions.length) * 100);
    return (
      <div className="max-w-lg mx-auto bg-white p-6 md:p-8 rounded-2xl shadow-xl text-center animate-in zoom-in-95">
        <h2 className="text-2xl md:text-3xl font-bold text-slate-800 mb-2">{t('quiz_complete')}</h2>
        <p className="text-slate-500 mb-6 md:mb-8">{t('performance_summary')}</p>
        
        <div className="w-28 h-28 md:w-32 md:h-32 mx-auto rounded-full border-8 border-slate-100 flex items-center justify-center mb-6 relative">
          <span className="text-3xl md:text-4xl font-bold text-slate-900">{percentage}%</span>
          <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 100 100">
             <circle 
               cx="50" cy="50" r="46" 
               fill="none" 
               stroke="currentColor" 
               strokeWidth="8"
               className={percentage > 70 ? "text-green-500" : percentage > 40 ? "text-yellow-500" : "text-red-500"}
               strokeDasharray={`${(score / quizData.questions.length) * 289} 289`}
               strokeLinecap="round"
             />
          </svg>
        </div>

        <div className="text-base md:text-lg font-medium text-slate-700 mb-8">
          {t('score_result')} <span className="font-bold text-slate-900">{score}</span> {t('out_of')} {quizData.questions.length} {t('correct')}.
        </div>

        <div className="flex flex-col md:flex-row gap-3">
          <button onClick={onBack} className="flex-1 py-3 border border-slate-200 rounded-xl hover:bg-slate-50 font-semibold text-slate-700 active:scale-[0.98]">
            {t('btn_dashboard')}
          </button>
          <button onClick={generateQuiz} className="flex-1 py-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 font-semibold flex items-center justify-center gap-2 active:scale-[0.98]">
            <RefreshCw size={18} />
            {t('btn_retry')}
          </button>
        </div>
      </div>
    );
  }

  const currentQuestion = quizData.questions[currentQuestionIndex];
  const isMultipleChoice = currentQuestion.type === 'multiple-choice';
  const isVerbForms = currentQuestion.type === 'verb-forms';

  // --- Question View ---
  return (
    <div className="max-w-2xl mx-auto">
      {/* Progress & Header */}
      <div className="mb-4 md:mb-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
           <span className="text-sm font-bold text-slate-500">
             Q {currentQuestionIndex + 1} <span className="font-normal opacity-50">/ {quizData.questions.length}</span>
           </span>
           <span className="uppercase tracking-wider text-[10px] font-bold bg-indigo-50 text-indigo-600 px-2 py-0.5 rounded border border-indigo-100">
             {mode === 'grammar' ? t('q_grammar') : t('q_vocab')}
           </span>
        </div>
        <button 
          onClick={onBack} 
          className="p-2 -mr-2 text-slate-400 hover:text-red-500 transition-colors rounded-full hover:bg-slate-100 active:bg-slate-200"
          aria-label="Exit Quiz"
        >
           <X size={22} />
        </button>
      </div>
      
      <div className="w-full bg-slate-200 h-2 rounded-full mb-6 md:mb-8 overflow-hidden">
        <div 
          className="bg-indigo-600 h-2 rounded-full transition-all duration-500 ease-out" 
          style={{ width: `${((currentQuestionIndex + 1) / quizData.questions.length) * 100}%` }}
        ></div>
      </div>

      {/* Card */}
      <div className="bg-white p-5 md:p-8 rounded-2xl shadow-lg border border-slate-100">
        <h3 className="text-lg md:text-2xl font-bold text-slate-900 mb-2 leading-snug">
          {currentQuestion.text}
        </h3>
        
        {mode === 'vocabulary' && (
           <p className="text-xs md:text-sm text-slate-500 mb-6 italic">
             {t('translate_to')} {vocabDirection === 'PL_EN' ? 'English' : 'Polish'}
             {isVerbForms && ` ${t('provide_3_forms')}`}
           </p>
        )}

        {/* Options / Inputs */}
        <div className="space-y-3 md:space-y-4">
          {/* MULTIPLE CHOICE */}
          {isMultipleChoice && currentQuestion.options?.map((option, idx) => {
            let stateClass = "border-slate-200 bg-white hover:border-indigo-300 hover:bg-indigo-50";
            
            if (showExplanation) {
               if (idx === currentQuestion.correctAnswerIndex) stateClass = "border-green-500 bg-green-50 text-green-900";
               else if (idx === selectedOption) stateClass = "border-red-500 bg-red-50 text-red-900";
               else stateClass = "border-slate-100 opacity-50 bg-slate-50";
            }

            return (
              <button
                key={idx}
                onClick={() => handleOptionSelect(idx)}
                disabled={showExplanation}
                className={`w-full text-left p-3.5 md:p-4 rounded-xl border-2 transition-all duration-200 flex items-center justify-between text-sm md:text-base active:scale-[0.99] ${stateClass}`}
              >
                <span className="font-medium">{option}</span>
                {showExplanation && idx === currentQuestion.correctAnswerIndex && <CheckCircle size={20} className="text-green-600 shrink-0 ml-2" />}
                {showExplanation && idx === selectedOption && idx !== currentQuestion.correctAnswerIndex && <XCircle size={20} className="text-red-600 shrink-0 ml-2" />}
              </button>
            );
          })}

          {/* TEXT INPUT (SINGLE) */}
          {!isMultipleChoice && !isVerbForms && (
             <div className="space-y-2">
               <input 
                 type="text" 
                 value={textInput}
                 onChange={e => setTextInput(e.target.value)}
                 disabled={showExplanation}
                 onKeyDown={e => e.key === 'Enter' && !showExplanation && handleTextSubmit()}
                 placeholder={t('type_answer')}
                 autoComplete="off"
                 className={`w-full p-3.5 md:p-4 text-lg border-2 rounded-xl outline-none transition-colors shadow-sm ${
                    showExplanation 
                      ? isCorrect ? "border-green-500 bg-green-50 text-green-900" : "border-red-500 bg-red-50 text-red-900"
                      : "border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                 }`}
               />
               {showExplanation && !isCorrect && (
                 <div className="text-green-700 font-bold text-sm pl-2 bg-green-50 p-2 rounded-lg border border-green-100 mt-2">
                   Answer: {currentQuestion.correctAnswer}
                 </div>
               )}
             </div>
          )}

          {/* VERB FORMS (TRIPLE INPUT) */}
          {isVerbForms && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4">
              {(['v1', 'v2', 'v3'] as const).map((key, idx) => (
                <div key={key} className="relative">
                   <label className="text-[10px] md:text-xs font-bold text-slate-400 mb-1 block uppercase tracking-wider">
                      {idx === 0 ? t('base_form') : idx === 1 ? t('past_simple') : t('past_participle')}
                   </label>
                   <input 
                    type="text" 
                    value={verbInputs[key]}
                    onChange={e => setVerbInputs(prev => ({...prev, [key]: e.target.value}))}
                    disabled={showExplanation}
                    autoComplete="off"
                    className={`w-full p-3 border-2 rounded-lg outline-none font-medium text-base shadow-sm ${
                      showExplanation
                        ? (currentQuestion.verbForms && verbInputs[key].toLowerCase().trim() === currentQuestion.verbForms[idx].toLowerCase().trim())
                            ? "border-green-500 bg-green-50 text-green-900"
                            : "border-red-500 bg-red-50 text-red-900"
                        : "border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                    }`}
                  />
                  {showExplanation && currentQuestion.verbForms && (
                    <div className="text-xs text-green-700 mt-1 font-medium">
                      {currentQuestion.verbForms[idx]}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="mt-6 md:mt-8">
          {!showExplanation ? (
            !isMultipleChoice && (
              <button 
                onClick={handleTextSubmit}
                disabled={isVerbForms ? (!verbInputs.v1 || !verbInputs.v2 || !verbInputs.v3) : !textInput}
                className="w-full py-3.5 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98] shadow-lg shadow-indigo-100"
              >
                {t('btn_check')}
              </button>
            )
          ) : (
            <div className="animate-in slide-in-from-top-2">
               <div className="bg-slate-50 rounded-lg p-4 border border-slate-200 mb-4">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-bold text-slate-700 text-sm uppercase tracking-wide">{t('explanation_label')}</span>
                </div>
                <p className="text-slate-700 text-sm leading-relaxed">{currentQuestion.explanation}</p>
              </div>
              
              <button 
                onClick={handleNext}
                className="w-full py-3.5 bg-slate-900 text-white rounded-xl font-bold hover:bg-slate-800 flex items-center justify-center gap-2 shadow-lg shadow-slate-200 active:scale-[0.98]"
              >
                {currentQuestionIndex === quizData.questions.length - 1 ? t('btn_view_results') : t('btn_next_question')}
                <ArrowRight size={18} />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
