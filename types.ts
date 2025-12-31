
export interface Topic {
  id: string;
  title: string;
  category: 'Environment' | 'Basics' | 'Control Flow' | 'Functions' | 'Data Structures' | 'Advanced' | 'Standard Library';
  content: string;
  codeExample: string;
  summary: string;
}

export interface UserProgress {
  completedTopics: string[];
}
