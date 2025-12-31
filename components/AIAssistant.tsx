
import React, { useState } from 'react';
import { MessageSquare, Send, Sparkles, X, Loader2 } from 'lucide-react';
import { gemini } from '../services/geminiService';

interface AIAssistantProps {
  currentTopic: string;
}

const AIAssistant: React.FC<AIAssistantProps> = ({ currentTopic }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [messages, setMessages] = useState<{ role: 'user' | 'ai'; content: string }[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    const userMsg = query;
    setQuery('');
    setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
    setIsLoading(true);

    const response = await gemini.explainTopic(currentTopic, userMsg);
    setMessages(prev => [...prev, { role: 'ai', content: response || 'I am sorry, I could not generate a response.' }]);
    setIsLoading(false);
  };

  const handleExplain = async () => {
    setIsOpen(true);
    setIsLoading(true);
    const response = await gemini.explainTopic(currentTopic);
    setMessages(prev => [...prev, { role: 'ai', content: response || 'Failed to explain.' }]);
    setIsLoading(false);
  };

  return (
    <>
      <div className="fixed bottom-8 right-8 flex flex-col items-end gap-3 z-50">
        {!isOpen && (
          <button
            onClick={handleExplain}
            className="bg-blue-600 text-white px-6 py-3 rounded-full shadow-2xl hover:bg-blue-700 transition-all flex items-center gap-2 font-medium"
          >
            <Sparkles className="w-5 h-5" />
            Explain "{currentTopic}"
          </button>
        )}

        {isOpen && (
          <div className="bg-white w-96 max-h-[600px] rounded-2xl shadow-2xl border border-gray-200 flex flex-col overflow-hidden animate-in slide-in-from-bottom-5">
            <div className="p-4 bg-blue-600 text-white flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5" />
                <span className="font-semibold">AI Tutor</span>
              </div>
              <button onClick={() => setIsOpen(false)} className="p-1 hover:bg-blue-500 rounded">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4 min-h-[300px] bg-gray-50">
              {messages.length === 0 && !isLoading && (
                <div className="text-center py-10 text-gray-500">
                  <MessageSquare className="w-12 h-12 mx-auto mb-2 opacity-20" />
                  <p>Ask me anything about {currentTopic}!</p>
                </div>
              )}
              {messages.map((m, i) => (
                <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] p-3 rounded-2xl text-sm ${
                    m.role === 'user' 
                      ? 'bg-blue-600 text-white rounded-br-none' 
                      : 'bg-white text-gray-800 border border-gray-200 rounded-bl-none shadow-sm'
                  }`}>
                    {m.content}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-white p-3 rounded-2xl shadow-sm border border-gray-200">
                    <Loader2 className="w-5 h-5 animate-spin text-blue-600" />
                  </div>
                </div>
              )}
            </div>

            <form onSubmit={handleSubmit} className="p-4 border-t border-gray-100 bg-white">
              <div className="relative">
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Ask a question..."
                  className="w-full pl-4 pr-12 py-2.5 bg-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                />
                <button 
                  type="submit"
                  disabled={isLoading || !query.trim()}
                  className="absolute right-2 top-1.5 p-1.5 text-blue-600 disabled:text-gray-400"
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </>
  );
};

export default AIAssistant;
