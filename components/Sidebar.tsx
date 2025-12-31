
import React from 'react';
import { Topic } from '../types';
import { 
  BookOpen, 
  ChevronRight, 
  Code, 
  Cpu, 
  Terminal, 
  Layers, 
  Settings, 
  Database, 
  Zap, 
  FileText 
} from 'lucide-react';

interface SidebarProps {
  topics: Topic[];
  activeTopicId: string;
  onTopicSelect: (id: string) => void;
  completedTopics: string[];
}

const CategoryIcon: React.FC<{ category: string }> = ({ category }) => {
  switch (category) {
    case 'Environment': return <Settings className="w-4 h-4" />;
    case 'Basics': return <Terminal className="w-4 h-4" />;
    case 'Control Flow': return <Zap className="w-4 h-4" />;
    case 'Functions': return <Layers className="w-4 h-4" />;
    case 'Data Structures': return <Database className="w-4 h-4" />;
    case 'Advanced': return <Cpu className="w-4 h-4" />;
    case 'Standard Library': return <FileText className="w-4 h-4" />;
    default: return <BookOpen className="w-4 h-4" />;
  }
};

const Sidebar: React.FC<SidebarProps> = ({ topics, activeTopicId, onTopicSelect, completedTopics }) => {
  const categories: Topic['category'][] = [
    'Environment', 
    'Basics', 
    'Control Flow', 
    'Functions', 
    'Data Structures', 
    'Advanced', 
    'Standard Library'
  ];

  return (
    <div className="w-72 bg-white h-screen border-r border-gray-200 flex flex-col fixed left-0 top-0 z-10">
      <div className="p-6 border-b border-gray-100 flex items-center gap-3">
        <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold">C</div>
        <h1 className="font-bold text-xl text-gray-800">C Masterclass</h1>
      </div>
      
      <div className="flex-1 overflow-y-auto py-4 px-3 space-y-6">
        {categories.map(category => {
          const categoryTopics = topics.filter(t => t.category === category);
          if (categoryTopics.length === 0) return null;
          
          return (
            <div key={category}>
              <h2 className="px-3 text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 flex items-center gap-2">
                <CategoryIcon category={category} />
                {category}
              </h2>
              <ul className="space-y-1">
                {categoryTopics.map(topic => (
                  <li key={topic.id}>
                    <button
                      onClick={() => onTopicSelect(topic.id)}
                      className={`w-full flex items-center justify-between px-3 py-2 text-sm rounded-md transition-all ${
                        activeTopicId === topic.id 
                          ? 'bg-blue-50 text-blue-700 font-medium' 
                          : 'text-gray-600 hover:bg-gray-100'
                      }`}
                    >
                      <span className="flex items-center gap-2 truncate pr-2">
                        <div className={`w-2 h-2 shrink-0 rounded-full ${completedTopics.includes(topic.id) ? 'bg-green-500' : 'bg-transparent border border-gray-300'}`} />
                        <span className="truncate">{topic.title}</span>
                      </span>
                      {activeTopicId === topic.id && <ChevronRight className="w-4 h-4 shrink-0" />}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
      
      <div className="p-4 bg-gray-50 border-t border-gray-200">
        <div className="text-xs text-gray-500 mb-2">CURRICULUM PROGRESS: {completedTopics.length}/{topics.length}</div>
        <div className="w-full bg-gray-200 rounded-full h-1.5">
          <div 
            className="bg-blue-600 h-1.5 rounded-full transition-all duration-500" 
            style={{ width: `${(completedTopics.length / topics.length) * 100}%` }}
          />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
