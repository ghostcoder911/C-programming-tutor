
import React, { useState } from 'react';
import { Copy, Check, Play } from 'lucide-react';

interface CodeBlockProps {
  code: string;
}

const CodeBlock: React.FC<CodeBlockProps> = ({ code }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative group rounded-xl overflow-hidden bg-slate-900 border border-slate-800 my-6 shadow-lg">
      <div className="flex items-center justify-between px-4 py-2 bg-slate-800 border-b border-slate-700">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-red-500/80" />
          <div className="w-3 h-3 rounded-full bg-amber-500/80" />
          <div className="w-3 h-3 rounded-full bg-green-500/80" />
        </div>
        <div className="flex gap-2">
          <button 
            onClick={handleCopy}
            className="text-slate-400 hover:text-white transition-colors p-1"
            title="Copy Code"
          >
            {copied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
          </button>
        </div>
      </div>
      <pre className="p-4 text-sm code-font text-slate-100 overflow-x-auto">
        <code>
          {code.split('\n').map((line, i) => (
            <div key={i} className="flex gap-4">
              <span className="text-slate-600 select-none w-4 text-right">{i + 1}</span>
              <span>{line}</span>
            </div>
          ))}
        </code>
      </pre>
      <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
        <div className="bg-blue-600 text-white text-xs px-3 py-1.5 rounded-full flex items-center gap-1 shadow-xl">
          <Play className="w-3 h-3" />
          Run Example
        </div>
      </div>
    </div>
  );
};

export default CodeBlock;
