
import React, { useState, useRef, useEffect } from 'react';
import { ChatMessage } from '../types';
import { geminiService } from '../services/geminiService';
import { Send, Bot, User, Loader2, Trash2 } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export const AiTutor: React.FC = () => {
  const { t } = useLanguage();
  
  // Initialize with translated message
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  
  useEffect(() => {
    // Set initial message on mount (or language change if you wanted to reset chat)
    if (messages.length === 0) {
      setMessages([{
        id: 'init',
        role: 'model',
        text: t('tutor_welcome'),
        timestamp: Date.now()
      }]);
    }
  }, [t, messages.length]);

  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userText = inputValue.trim();
    setInputValue('');
    
    const newUserMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      text: userText,
      timestamp: Date.now()
    };

    setMessages(prev => [...prev, newUserMsg]);
    setIsLoading(true);

    // Slight delay to allow UI to update and scroll before network request logic
    setTimeout(scrollToBottom, 100);

    try {
      // Prepare history for Gemini
      const history = messages.map(m => ({
        role: m.role,
        parts: [{ text: m.text }]
      }));

      const responseText = await geminiService.chatWithTutor(history, userText);

      const newAiMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'model',
        text: responseText || "I'm sorry, I couldn't formulate a response.",
        timestamp: Date.now()
      };

      setMessages(prev => [...prev, newAiMsg]);
    } catch (error) {
      setMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(),
        role: 'model',
        text: t('connection_error'),
        timestamp: Date.now()
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const clearChat = () => {
    setMessages([{
      id: 'init',
      role: 'model',
      text: t('chat_cleared'),
      timestamp: Date.now()
    }]);
  };

  return (
    <div className="flex flex-col h-full md:h-[calc(100vh-8rem)] max-w-4xl mx-auto bg-white rounded-none md:rounded-2xl shadow-none md:shadow-xl border-0 md:border border-slate-200 overflow-hidden -m-4 md:m-0">
      
      {/* Chat Header */}
      <div className="bg-indigo-600 p-3 md:p-4 text-white flex justify-between items-center shrink-0 shadow-md z-10">
        <div className="flex items-center gap-3">
          <div className="bg-white/20 p-1.5 md:p-2 rounded-full">
             <Bot size={20} className="md:w-6 md:h-6" />
          </div>
          <div>
            <h3 className="font-bold text-base md:text-lg">{t('tutor_name')}</h3>
            <p className="text-[10px] md:text-xs text-indigo-200 opacity-90">{t('tutor_role')}</p>
          </div>
        </div>
        <button 
          onClick={clearChat}
          className="p-2 hover:bg-white/10 rounded-full transition-colors" 
          title={t('clear_chat')}
        >
          <Trash2 size={18} className="md:w-5 md:h-5" />
        </button>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-3 md:p-4 space-y-4 md:space-y-6 bg-slate-50 scrollbar-hide overscroll-contain">
        {messages.map((msg) => (
          <div 
            key={msg.id} 
            className={`flex gap-2 md:gap-4 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
          >
            <div className={`w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center shadow-sm ${msg.role === 'user' ? 'bg-slate-900 text-white' : 'bg-indigo-600 text-white'}`}>
              {msg.role === 'user' ? <User size={14} /> : <Bot size={14} />}
            </div>
            
            <div className={`max-w-[85%] md:max-w-[80%] p-3 md:p-4 rounded-2xl text-sm md:text-base leading-relaxed shadow-sm ${
              msg.role === 'user' 
                ? 'bg-slate-900 text-white rounded-tr-none' 
                : 'bg-white text-slate-800 border border-slate-100 rounded-tl-none'
            }`}>
              <div className="whitespace-pre-wrap break-words">{msg.text}</div>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex gap-2 md:gap-4">
            <div className="w-8 h-8 rounded-full bg-indigo-600 text-white flex items-center justify-center">
               <Bot size={14} />
            </div>
            <div className="bg-white p-3 md:p-4 rounded-2xl rounded-tl-none border border-slate-100 shadow-sm flex items-center gap-2">
              <Loader2 size={16} className="animate-spin text-indigo-600" />
              <span className="text-xs md:text-sm text-slate-500">{t('thinking')}</span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} className="h-1" />
      </div>

      {/* Input Area */}
      <div className="p-3 md:p-4 bg-white border-t border-slate-100 shrink-0 z-20 safe-bottom pb-20 md:pb-4"> 
        <div className="flex gap-2 items-end bg-slate-50 p-2 rounded-xl border border-slate-200 focus-within:border-indigo-300 focus-within:ring-2 focus-within:ring-indigo-100 transition-all">
          <textarea
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={t('ask_question')}
            className="flex-1 bg-transparent border-none focus:ring-0 p-2 min-h-[44px] max-h-32 resize-none text-base text-slate-800 placeholder:text-slate-400"
            rows={1}
            style={{ fontSize: '16px' }} // Prevent iOS zoom
          />
          <button 
            onClick={handleSend}
            disabled={!inputValue.trim() || isLoading}
            className="p-2.5 md:p-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-sm active:scale-95"
          >
            <Send size={18} className="md:w-5 md:h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};
