
import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import CodeBlock from './components/CodeBlock';
import AIAssistant from './components/AIAssistant';
import { C_TOPICS } from './constants';
import { CheckCircle2, ChevronLeft, ChevronRight, GraduationCap, Github } from 'lucide-react';

const App: React.FC = () => {
  const [activeTopicId, setActiveTopicId] = useState(C_TOPICS[0].id);
  const [completedTopics, setCompletedTopics] = useState<string[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem('c-masterclass-progress');
    if (saved) {
      setCompletedTopics(JSON.parse(saved));
    }
  }, []);

  const toggleComplete = (id: string) => {
    const newCompleted = completedTopics.includes(id)
      ? completedTopics.filter(t => t !== id)
      : [...completedTopics, id];
    setCompletedTopics(newCompleted);
    localStorage.setItem('c-masterclass-progress', JSON.stringify(newCompleted));
  };

  const activeTopic = C_TOPICS.find(t => t.id === activeTopicId) || C_TOPICS[0];
  const currentIndex = C_TOPICS.findIndex(t => t.id === activeTopicId);

  const navigate = (direction: 'next' | 'prev') => {
    const nextIndex = direction === 'next' ? currentIndex + 1 : currentIndex - 1;
    if (nextIndex >= 0 && nextIndex < C_TOPICS.length) {
      setActiveTopicId(C_TOPICS[nextIndex].id);
      window.scrollTo(0, 0);
    }
  };

  return (
    <div className="flex min-h-screen bg-white">
      <Sidebar 
        topics={C_TOPICS} 
        activeTopicId={activeTopicId} 
        onTopicSelect={setActiveTopicId} 
        completedTopics={completedTopics}
      />
      
      <main className="flex-1 ml-64 p-8 md:p-12 lg:p-16 max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-2 text-blue-600 text-sm font-semibold uppercase tracking-wider">
            <GraduationCap className="w-5 h-5" />
            <span>Learning Path: {activeTopic.category}</span>
          </div>
          <div className="flex gap-4">
            <a href="#" className="text-gray-400 hover:text-gray-600 transition-colors">
              <Github className="w-6 h-6" />
            </a>
          </div>
        </div>

        {/* Content Section */}
        <section className="animate-in fade-in duration-500">
          <div className="flex items-start justify-between mb-6">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900">{activeTopic.title}</h1>
            <button 
              onClick={() => toggleComplete(activeTopic.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full border-2 transition-all ${
                completedTopics.includes(activeTopic.id)
                  ? 'bg-green-50 border-green-500 text-green-700'
                  : 'bg-white border-gray-200 text-gray-500 hover:border-gray-300'
              }`}
            >
              <CheckCircle2 className={`w-5 h-5 ${completedTopics.includes(activeTopic.id) ? 'fill-green-500 text-white' : ''}`} />
              <span className="font-medium">{completedTopics.includes(activeTopic.id) ? 'Completed' : 'Mark Complete'}</span>
            </button>
          </div>

          <p className="text-xl text-gray-600 mb-10 leading-relaxed font-light">
            {activeTopic.summary}
          </p>

          <div className="prose prose-lg prose-blue max-w-none text-gray-800 leading-relaxed space-y-6">
            {activeTopic.content.split('\n').map((para, i) => {
              if (para.startsWith('- ')) {
                return (
                  <li key={i} className="list-none flex gap-3 items-start my-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2.5 shrink-0" />
                    <span>{para.substring(2)}</span>
                  </li>
                );
              }
              return <p key={i}>{para}</p>;
            })}
          </div>

          <div className="mt-12">
            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Code className="w-5 h-5 text-blue-600" />
              Interactive Code Example
            </h3>
            <CodeBlock code={activeTopic.codeExample} />
          </div>
        </section>

        {/* Navigation Footer */}
        <div className="mt-20 pt-8 border-t border-gray-100 flex items-center justify-between">
          <button 
            onClick={() => navigate('prev')}
            disabled={currentIndex === 0}
            className="flex items-center gap-2 text-gray-600 hover:text-blue-600 disabled:opacity-30 disabled:hover:text-gray-600 font-medium group transition-all"
          >
            <ChevronLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            Previous
          </button>
          
          <div className="hidden sm:flex items-center gap-1.5">
            {C_TOPICS.map((_, i) => (
              <div 
                key={i} 
                className={`w-2 h-2 rounded-full transition-all duration-300 ${i === currentIndex ? 'bg-blue-600 w-4' : 'bg-gray-200'}`} 
              />
            ))}
          </div>

          <button 
            onClick={() => navigate('next')}
            disabled={currentIndex === C_TOPICS.length - 1}
            className="flex items-center gap-2 text-gray-600 hover:text-blue-600 disabled:opacity-30 disabled:hover:text-gray-600 font-medium group transition-all"
          >
            Next
            <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* AI Assistant Hook */}
        <AIAssistant currentTopic={activeTopic.title} />
      </main>
    </div>
  );
};

export default App;

// Sub-components helpers (internal to App for simplicity in this structure)
function Code({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg>
  );
}
