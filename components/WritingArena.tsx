
import React, { useState } from 'react';
import { WritingLength, WritingFeedback } from '../types';
import { geminiService } from '../services/geminiService';
import { PenTool, Send, RefreshCw, FileText, CheckCircle2, AlertCircle, Sparkles, ArrowRight } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface WritingArenaProps {
  onBack: () => void;
}

export const WritingArena: React.FC<WritingArenaProps> = ({ onBack }) => {
  const { t } = useLanguage();
  const [step, setStep] = useState<'setup' | 'writing' | 'feedback'>('setup');
  const [difficulty, setDifficulty] = useState('intermediate');
  const [lengthOption, setLengthOption] = useState<WritingLength>('Medium (100-200 words)');
  
  const [topic, setTopic] = useState('');
  const [userText, setUserText] = useState('');
  const [feedback, setFeedback] = useState<WritingFeedback | null>(null);
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerateTopic = async () => {
    setLoading(true);
    setError(null);
    try {
      const generatedTopic = await geminiService.generateWritingTopic(difficulty);
      setTopic(generatedTopic);
      setStep('writing');
      setUserText('');
    } catch (e) {
      setError("Failed to generate topic. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    if (!userText.trim()) return;
    setLoading(true);
    setError(null);
    try {
      const result = await geminiService.evaluateWriting(topic, userText, lengthOption);
      setFeedback(result);
      setStep('feedback');
    } catch (e) {
      setError("Failed to evaluate text. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleRetry = () => {
    setStep('setup');
    setFeedback(null);
    setTopic('');
    setUserText('');
  };

  const wordCount = userText.trim().split(/\s+/).filter(w => w.length > 0).length;

  // --- Loading View ---
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-6 animate-in fade-in px-4 text-center">
        <div className="relative">
           <div className="w-16 h-16 md:w-20 md:h-20 border-4 border-indigo-100 rounded-full"></div>
           <div className="w-16 h-16 md:w-20 md:h-20 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin absolute top-0 left-0"></div>
           <PenTool className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-indigo-600" size={24} />
        </div>
        <div>
          <h3 className="text-lg md:text-xl font-bold text-slate-800 mb-2">
            {step === 'setup' ? t('creating_topic') : t('analyzing_text')}
          </h3>
          <p className="text-slate-500 text-sm">Gemini is working on it.</p>
        </div>
      </div>
    );
  }

  // --- Setup Step ---
  if (step === 'setup') {
    return (
      <div className="max-w-xl mx-auto bg-white p-6 md:p-10 rounded-2xl shadow-lg border border-slate-100 animate-in zoom-in-95 mx-4 md:mx-auto">
        <div className="text-center mb-6 md:mb-8">
          <div className="w-14 h-14 md:w-16 md:h-16 bg-indigo-100 rounded-2xl flex items-center justify-center mx-auto mb-4 text-indigo-600">
            <PenTool size={28} className="md:w-8 md:h-8" />
          </div>
          <h2 className="text-xl md:text-3xl font-bold text-slate-800">{t('writing_challenge')}</h2>
          <p className="text-slate-600 mt-2 text-sm md:text-base">{t('writing_subtitle')}</p>
        </div>

        <div className="space-y-6">
          <div>
            <label className="block text-xs md:text-sm font-bold text-slate-700 mb-2 uppercase tracking-wide">{t('lbl_select_level')}</label>
            <div className="grid grid-cols-3 gap-2 md:gap-3">
              {['Beginner', 'Intermediate', 'Advanced'].map((lvl) => (
                <button
                  key={lvl}
                  onClick={() => setDifficulty(lvl.toLowerCase())}
                  className={`py-2.5 md:py-3 px-1 md:px-2 rounded-xl text-xs md:text-sm font-medium transition-all border-2 active:scale-95 ${
                    difficulty === lvl.toLowerCase()
                      ? 'border-indigo-600 bg-indigo-50 text-indigo-700'
                      : 'border-slate-100 bg-white text-slate-600 hover:border-slate-200'
                  }`}
                >
                  {t(`${lvl.toLowerCase()}_lvl`)}
                </button>
              ))}
            </div>
          </div>

          <div>
             <label className="block text-xs md:text-sm font-bold text-slate-700 mb-2 uppercase tracking-wide">{t('lbl_target_length')}</label>
             <div className="space-y-2">
                {(['Short (50-100 words)', 'Medium (100-200 words)', 'Long (200+ words)'] as WritingLength[]).map((opt) => (
                  <button
                    key={opt}
                    onClick={() => setLengthOption(opt)}
                    className={`w-full text-left px-3 py-3 md:px-4 md:py-3 rounded-xl border-2 transition-all flex items-center justify-between active:scale-[0.98] ${
                       lengthOption === opt
                        ? 'border-indigo-600 bg-indigo-50 text-indigo-900'
                        : 'border-slate-100 bg-white text-slate-600 hover:border-slate-200'
                    }`}
                  >
                    <span className="font-medium text-sm md:text-base">{t(opt.split(' ')[0].toLowerCase())}</span>
                    <span className="text-[10px] md:text-xs opacity-60">{opt.split(' (')[1].replace(')', '')}</span>
                  </button>
                ))}
             </div>
          </div>

          <div className="pt-4">
            <button 
              onClick={handleGenerateTopic}
              className="w-full py-3.5 md:py-4 bg-slate-900 text-white rounded-xl font-bold text-base md:text-lg hover:bg-slate-800 transition-all flex items-center justify-center gap-2 shadow-xl shadow-indigo-100/50 active:scale-[0.98]"
            >
              <Sparkles size={18} className="text-indigo-300 md:w-5 md:h-5" />
              {t('btn_generate_topic')}
            </button>
          </div>
          {error && <p className="text-red-500 text-sm text-center">{error}</p>}
        </div>
      </div>
    );
  }

  // --- Writing Step ---
  if (step === 'writing') {
    return (
      <div className="max-w-3xl mx-auto animate-in slide-in-from-bottom-4">
        <div className="mb-4 md:mb-6 flex items-center justify-between px-1">
           <button onClick={onBack} className="text-slate-500 hover:text-slate-900 font-medium text-sm p-2 -ml-2">{t('btn_cancel')}</button>
           <span className="text-slate-400 text-xs md:text-sm font-medium">{t(`${difficulty}_lvl`)} • {t(lengthOption.split(' ')[0].toLowerCase())}</span>
        </div>

        <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden flex flex-col h-[calc(100vh-180px)] md:h-auto">
           <div className="bg-indigo-50 p-4 md:p-6 border-b border-indigo-100 shrink-0">
              <h3 className="text-[10px] md:text-xs font-bold text-indigo-500 uppercase tracking-wider mb-1 md:mb-2">{t('your_topic')}</h3>
              <p className="text-lg md:text-2xl font-bold text-slate-900 leading-snug">
                "{topic}"
              </p>
           </div>

           <div className="p-4 md:p-6 flex-1 flex flex-col">
              <textarea
                value={userText}
                onChange={(e) => setUserText(e.target.value)}
                placeholder={t('placeholder_writing')}
                className="w-full flex-1 p-2 md:p-4 text-base md:text-lg leading-relaxed text-slate-800 bg-slate-50 rounded-xl border-2 border-transparent focus:border-indigo-200 focus:bg-white outline-none transition-all resize-none md:resize-y appearance-none"
                style={{ fontSize: '16px' }} // Prevent iOS zoom
              />
              
              <div className="mt-4 flex items-center justify-between shrink-0">
                 <div className={`text-xs md:text-sm font-medium px-3 py-1 rounded-full ${wordCount === 0 ? 'bg-slate-100 text-slate-400' : 'bg-indigo-100 text-indigo-700'}`}>
                    {wordCount} words
                 </div>
                 <button
                    onClick={handleSubmit}
                    disabled={wordCount < 5}
                    className="bg-indigo-600 text-white px-6 md:px-8 py-2.5 md:py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg shadow-indigo-200 active:scale-[0.98] text-sm md:text-base"
                 >
                    {t('btn_submit')}
                    <Send size={16} className="md:w-[18px] md:h-[18px]" />
                 </button>
              </div>
           </div>
        </div>
      </div>
    );
  }

  // --- Feedback Step ---
  if (step === 'feedback' && feedback) {
    return (
      <div className="max-w-4xl mx-auto pb-12 animate-in slide-in-from-bottom-8 px-1">
        <div className="flex items-center justify-between mb-6">
           <h2 className="text-xl md:text-2xl font-bold text-slate-800">{t('results_title')}</h2>
           <button onClick={handleRetry} className="text-indigo-600 font-semibold hover:bg-indigo-50 px-3 py-1.5 md:px-4 md:py-2 rounded-lg transition-colors flex items-center gap-2 text-sm md:text-base">
             <RefreshCw size={16} className="md:w-[18px] md:h-[18px]" /> <span className="hidden md:inline">{t('btn_new_topic')}</span><span className="md:hidden">Retry</span>
           </button>
        </div>

        {/* Scores Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-6 md:mb-8">
           {[
             { label: t('overall'), score: feedback.overallScore, color: 'text-indigo-600' },
             { label: t('grammar'), score: feedback.grammarScore, color: 'text-blue-600' },
             { label: t('vocabulary'), score: feedback.vocabularyScore, color: 'text-emerald-600' },
             { label: t('relevance'), score: feedback.relevanceScore, color: 'text-amber-600' }
           ].map((metric) => (
             <div key={metric.label} className="bg-white p-4 md:p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col items-center justify-center">
                <div className="relative w-16 h-16 md:w-20 md:h-20 mb-2 md:mb-3 flex items-center justify-center">
                   <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                      <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#e2e8f0" strokeWidth="3" />
                      <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="3" strokeDasharray={`${metric.score}, 100`} className={metric.color} />
                   </svg>
                   <span className={`absolute text-lg md:text-xl font-bold ${metric.color}`}>{metric.score}</span>
                </div>
                <span className="text-xs md:text-sm font-medium text-slate-600">{metric.label}</span>
             </div>
           ))}
        </div>

        {/* General Feedback */}
        <div className="bg-white rounded-2xl p-5 md:p-8 shadow-sm border border-slate-200 mb-6 md:mb-8">
           <h3 className="text-base md:text-lg font-bold text-slate-900 mb-3 md:mb-4 flex items-center gap-2">
             <FileText className="text-indigo-500" size={20} />
             {t('general_feedback')}
           </h3>
           <p className="text-slate-700 leading-relaxed text-sm md:text-base">{feedback.generalFeedback}</p>
        </div>

        {/* Corrections */}
        {feedback.corrections.length > 0 && (
          <div className="space-y-4">
            <h3 className="text-base md:text-lg font-bold text-slate-900 mb-4 px-1 flex items-center gap-2">
               <AlertCircle className="text-amber-500" size={20} />
               {t('suggested_improvements')}
            </h3>
            {feedback.corrections.map((item, idx) => (
               <div key={idx} className="bg-white rounded-xl p-4 md:p-5 border-l-4 border-amber-400 shadow-sm">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4 mb-3">
                     <div className="bg-red-50 text-red-900 p-3 rounded-lg text-sm">
                        <span className="block text-[10px] md:text-xs font-bold text-red-400 uppercase mb-1">{t('original')}</span>
                        <span className="line-through decoration-red-400/50">{item.original}</span>
                     </div>
                     <div className="bg-green-50 text-green-900 p-3 rounded-lg text-sm flex items-start gap-2">
                        <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-green-600" />
                        <div>
                           <span className="block text-[10px] md:text-xs font-bold text-green-600 uppercase mb-1">{t('better')}</span>
                           {item.correction}
                        </div>
                     </div>
                  </div>
                  <p className="text-slate-500 text-xs md:text-sm italic pl-1 border-l-2 border-slate-200 ml-1">
                     💡 {item.explanation}
                  </p>
               </div>
            ))}
          </div>
        )}

        {/* Success: High Score & No Corrections */}
        {feedback.corrections.length === 0 && feedback.overallScore >= 80 && (
           <div className="bg-green-50 border border-green-200 rounded-xl p-6 md:p-8 text-center">
              <div className="w-14 h-14 md:w-16 md:h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                 <Sparkles size={28} className="md:w-8 md:h-8" />
              </div>
              <h3 className="text-lg md:text-xl font-bold text-green-900 mb-2">{t('perfect_title')}</h3>
              <p className="text-green-800 text-sm md:text-base">{t('perfect_msg')}</p>
           </div>
        )}

        {/* Failure: Low Score & No Corrections */}
        {feedback.corrections.length === 0 && feedback.overallScore < 80 && (
           <div className="bg-red-50 border border-red-200 rounded-xl p-6 md:p-8 text-center">
              <div className="w-14 h-14 md:w-16 md:h-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
                 <AlertCircle size={28} className="md:w-8 md:h-8" />
              </div>
              <h3 className="text-lg md:text-xl font-bold text-red-900 mb-2">{t('review_required')}</h3>
              <p className="text-red-800 text-sm md:text-base">
                 {t('review_msg')}
              </p>
           </div>
        )}
        
        <div className="mt-8 text-center">
           <button onClick={onBack} className="text-slate-500 hover:text-slate-800 font-medium flex items-center gap-1 mx-auto text-sm md:text-base">
              {t('return_dashboard')} <ArrowRight size={16} />
           </button>
        </div>
      </div>
    );
  }
  
  return null;
};
