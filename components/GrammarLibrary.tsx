
import React, { useState } from 'react';
import { GrammarTopic } from '../types';
import { ArrowRight, BookOpen, X, Sparkles, Layers, MessageCircle, Repeat, Shuffle, Anchor, Zap, Link as LinkIcon, Handshake, Quote } from 'lucide-react';
import { geminiService } from '../services/geminiService';
import { useLanguage } from '../contexts/LanguageContext';

const TOPICS: GrammarTopic[] = [
  {
    id: 'modal-verbs',
    title: 'Modal Verbs',
    description: 'Verbs that express necessity, possibility, permission, or ability (can, could, must, should, etc.).',
    example: 'You really should see a doctor.',
    color: 'bg-orange-50 border-orange-200 text-orange-900',
    tags: ['Ability', 'Permission', 'Obligation']
  },
  {
    id: 'conditionals',
    title: 'Conditionals',
    description: 'Sentences describing the result of something that might happen or might have happened.',
    example: 'If I were you, I would study harder.',
    color: 'bg-purple-50 border-purple-200 text-purple-900',
    tags: ['Zero', 'First', 'Second', 'Third', 'Mixed']
  },
  {
    id: 'reported-speech',
    title: 'Reported Speech',
    description: 'How we represent the speech of other people or what we ourselves say (Direct vs Indirect).',
    example: 'He said that he was tired.',
    color: 'bg-pink-50 border-pink-200 text-pink-900',
    tags: ['Indirect Speech', 'Backshift']
  },
  {
    id: 'passive-voice',
    title: 'Passive Voice',
    description: 'Sentences where the subject receives the action rather than performing it.',
    example: 'The novel was written by Jane Austen.',
    color: 'bg-cyan-50 border-cyan-200 text-cyan-900',
    tags: ['Object Focus', 'Formal']
  },
  {
    id: 'gerunds-infinitives',
    title: 'Gerunds & Infinitives',
    description: 'Using verbs as nouns (Gerunds) or in their base form with "to" (Infinitives).',
    example: 'I enjoy swimming, but I want to run.',
    color: 'bg-teal-50 border-teal-200 text-teal-900',
    tags: ['Verb Patterns', '-ing form']
  },
  {
    id: 'phrasal-verbs',
    title: 'Phrasal Verbs',
    description: 'Verbs combined with a preposition or adverb that creates a new meaning.',
    example: 'Please look after my cat.',
    color: 'bg-lime-50 border-lime-200 text-lime-900',
    tags: ['Multi-word verbs', 'Colloquial']
  },
  {
    id: 'collocations',
    title: 'Collocations',
    description: 'Natural combinations of words that native speakers use together.',
    example: 'Make a mistake (not do a mistake), heavy rain.',
    color: 'bg-violet-50 border-violet-200 text-violet-900',
    tags: ['Word Pairs', 'Fluency']
  },
  {
    id: 'fixed-expressions',
    title: 'Fixed Expressions',
    description: 'Standardized phrases with specific meanings (idioms, set phrases).',
    example: 'To be honest, ... / It goes without saying...',
    color: 'bg-rose-50 border-rose-200 text-rose-900',
    tags: ['Idioms', 'Set Phrases']
  },
  {
    id: 'linking-words',
    title: 'Linking Words',
    description: 'Connectors used to join ideas, contrast points, or show consequences.',
    example: 'However, Furthermore, Consequently, Despite.',
    color: 'bg-sky-50 border-sky-200 text-sky-900',
    tags: ['Conjunctions', 'Writing', 'Cohesion']
  }
];

interface GrammarLibraryProps {
  onPractice: (topic: string) => void;
}

export const GrammarLibrary: React.FC<GrammarLibraryProps> = ({ onPractice }) => {
  const { t } = useLanguage();
  const [selectedTopic, setSelectedTopic] = useState<GrammarTopic | null>(null);
  const [aiExplanation, setAiExplanation] = useState<string | null>(null);
  const [loadingAi, setLoadingAi] = useState(false);

  const handleSelect = (topic: GrammarTopic) => {
    setSelectedTopic(topic);
    setAiExplanation(null);
  };

  const fetchExplanation = async () => {
    if (!selectedTopic) return;
    setLoadingAi(true);
    try {
      const text = await geminiService.getDetailedExplanation(selectedTopic.title);
      setAiExplanation(text);
    } catch (e) {
      setAiExplanation("Failed to load AI explanation. Please try again.");
    } finally {
      setLoadingAi(false);
    }
  };

  const getIcon = (id: string) => {
    switch (id) {
      case 'modal-verbs': return <Zap size={24} className="text-orange-500" />;
      case 'conditionals': return <Shuffle size={24} className="text-purple-500" />;
      case 'reported-speech': return <MessageCircle size={24} className="text-pink-500" />;
      case 'passive-voice': return <Repeat size={24} className="text-cyan-500" />;
      case 'gerunds-infinitives': return <Layers size={24} className="text-teal-500" />;
      case 'phrasal-verbs': return <Anchor size={24} className="text-lime-600" />;
      case 'collocations': return <Handshake size={24} className="text-violet-500" />;
      case 'fixed-expressions': return <Quote size={24} className="text-rose-500" />;
      case 'linking-words': return <LinkIcon size={24} className="text-sky-500" />;
      default: return <BookOpen size={24} />;
    }
  };

  return (
    <div className="space-y-6 md:space-y-8 max-w-7xl mx-auto pb-12">
      <div className="text-center mb-4 md:mb-8 px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-slate-800 mb-2">{t('advanced_grammar_title')}</h2>
        <p className="text-sm md:text-base text-slate-600">{t('advanced_grammar_subtitle')}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {TOPICS.map((topic) => (
          <div 
            key={topic.id}
            onClick={() => handleSelect(topic)}
            className={`p-5 md:p-6 border rounded-xl cursor-pointer transition-all duration-200 active:scale-[0.98] md:hover:shadow-lg md:hover:scale-[1.02] bg-white group relative overflow-hidden shadow-sm`}
          >
            <div className={`absolute top-0 left-0 w-1.5 h-full ${topic.color.replace('bg-', 'bg-').split(' ')[0].replace('50', '400')}`}></div>
            <div className="flex justify-between items-start mb-4">
              <div className={`p-3 rounded-lg ${topic.color} bg-opacity-50`}>
                {getIcon(topic.id)}
              </div>
              <ArrowRight className="text-slate-300 group-hover:text-slate-600 transition-colors" />
            </div>
            
            <h3 className="font-bold text-lg md:text-xl text-slate-800 mb-2">{topic.title}</h3>
            <p className="text-slate-600 text-sm mb-4 line-clamp-2 leading-relaxed">{topic.description}</p>
            
            <div className="flex flex-wrap gap-2 mt-auto">
              {topic.tags.map(tag => (
                <span key={tag} className="px-2 py-1 bg-slate-100 text-slate-600 text-[10px] md:text-xs rounded-md font-medium uppercase tracking-wide">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Detail Modal */}
      {selectedTopic && (
        <div className="fixed inset-0 z-[60] flex items-end md:items-center justify-center bg-black/50 backdrop-blur-sm p-0 md:p-4" onClick={() => setSelectedTopic(null)}>
          <div 
            className="bg-white rounded-t-2xl md:rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden animate-in slide-in-from-bottom-10 md:zoom-in duration-200 max-h-[90dvh] md:max-h-[90vh] flex flex-col"
            onClick={e => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className={`p-5 md:p-6 ${selectedTopic.color} bg-opacity-30 flex justify-between items-start shrink-0`}>
              <div className="flex items-center gap-4">
                <div className="p-2 bg-white rounded-lg shadow-sm hidden md:block">
                   {getIcon(selectedTopic.id)}
                </div>
                <div>
                  <h3 className="text-xl md:text-2xl font-bold text-slate-900">{selectedTopic.title}</h3>
                  <p className="text-slate-700 opacity-80 text-xs md:text-sm font-medium">{t('grammar_module')}</p>
                </div>
              </div>
              <button onClick={() => setSelectedTopic(null)} className="text-slate-500 hover:text-slate-800 bg-white/50 rounded-full p-2">
                <X size={24} />
              </button>
            </div>
            
            {/* Modal Body */}
            <div className="p-5 md:p-6 space-y-5 md:space-y-6 overflow-y-auto overscroll-contain">
              <div>
                <h4 className="text-xs md:text-sm font-bold text-slate-400 uppercase tracking-wider mb-2">{t('description_label')}</h4>
                <p className="text-base md:text-lg text-slate-700 leading-relaxed">{selectedTopic.description}</p>
              </div>

              <div>
                <h4 className="text-xs md:text-sm font-bold text-slate-400 uppercase tracking-wider mb-2">{t('example_label')}</h4>
                <p className="text-base md:text-lg font-medium text-slate-800 border-l-4 border-indigo-500 pl-4 italic bg-slate-50 py-3 rounded-r-lg shadow-sm">
                  "{selectedTopic.example}"
                </p>
              </div>

              {aiExplanation && (
                <div className="bg-indigo-50 p-4 rounded-lg text-sm text-slate-700 leading-relaxed border border-indigo-100 animate-in fade-in slide-in-from-bottom-2">
                   <div className="flex items-center gap-2 mb-2 text-indigo-700 font-semibold">
                      <Sparkles size={16} />
                      <span>{t('gemini_explanation')}</span>
                   </div>
                   <div className="whitespace-pre-wrap">{aiExplanation}</div>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="p-4 md:p-6 border-t border-slate-100 bg-slate-50/50 shrink-0 safe-bottom">
              <div className="flex flex-col md:flex-row gap-3">
                <button 
                  onClick={() => onPractice(selectedTopic.title)}
                  className="flex-1 bg-slate-900 text-white py-3.5 px-4 rounded-xl font-bold text-sm md:text-base hover:bg-slate-800 transition-colors flex items-center justify-center gap-2 shadow-lg shadow-slate-200 active:scale-[0.98]"
                >
                  <BookOpen size={18} />
                  {t('btn_practice_now')}
                </button>
                
                <button 
                  onClick={fetchExplanation}
                  disabled={loadingAi}
                  className="flex-1 border border-slate-200 bg-white text-slate-700 py-3.5 px-4 rounded-xl font-semibold text-sm md:text-base hover:bg-slate-50 transition-colors flex items-center justify-center gap-2 disabled:opacity-50 active:scale-[0.98]"
                >
                  {loadingAi ? (
                    <span className="animate-spin rounded-full h-4 w-4 border-2 border-slate-400 border-t-transparent"></span>
                  ) : (
                    <Sparkles size={18} className="text-indigo-500" />
                  )}
                  {aiExplanation ? t('btn_regenerate') : t('btn_explain_ai')}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
