
import React, { useState } from 'react';

interface InterviewResultsProps {
  content: string;
  onReset: () => void;
}

const InterviewResults: React.FC<InterviewResultsProps> = ({ content, onReset }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Improved parsing: Attempt to split by numbered sections or headers
  const sections = content.split(/(?=1\)|2\)|3\)|###|Final-round Interview Questions|Out-of-the-box)/i);

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden animate-fadeIn max-w-5xl mx-auto">
      <div className="bg-slate-900 px-8 py-6 flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
        <div>
          <h2 className="text-2xl font-bold text-white">Strategic Interview Architecture</h2>
          <p className="text-slate-400 text-sm font-medium">Domain-Validated Questions & Insight Lenses</p>
        </div>
        <div className="flex space-x-3 w-full md:w-auto">
          <button
            onClick={handleCopy}
            className="flex-1 md:flex-none px-4 py-2 text-xs font-bold uppercase tracking-wider text-slate-300 border border-slate-700 rounded hover:bg-slate-800 transition-all flex items-center justify-center space-x-2"
          >
            {copied ? (
              <>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span>Copied!</span>
              </>
            ) : (
              <>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                </svg>
                <span>Copy Full Report</span>
              </>
            )}
          </button>
          <button
            onClick={onReset}
            className="flex-1 md:flex-none px-4 py-2 text-xs font-bold uppercase tracking-wider text-indigo-400 border border-indigo-900 rounded hover:bg-indigo-950 transition-all"
          >
            New Session
          </button>
        </div>
      </div>

      <div className="p-8 space-y-10">
        {sections.map((section, idx) => {
          const trimmed = section.trim();
          if (!trimmed) return null;

          // Detect Out-of-the-box section
          const isOutOfTheBox = trimmed.toLowerCase().includes('out-of-the-box');
          
          return (
            <div key={idx} className={`${isOutOfTheBox ? 'bg-indigo-50 border border-indigo-100 p-8 rounded-2xl' : ''}`}>
              {isOutOfTheBox && (
                <div className="flex items-center space-x-2 text-indigo-700 mb-4">
                  <span className="text-2xl">⚡</span>
                  <h3 className="text-xl font-bold uppercase tracking-tight">High-Signal Novelty Probes</h3>
                </div>
              )}
              
              <div className="prose prose-slate max-w-none prose-headings:text-slate-900 prose-p:text-slate-600 prose-strong:text-slate-900">
                <div className="whitespace-pre-wrap leading-relaxed">
                  {trimmed.split('\n').map((line, lIdx) => {
                    // Visual cues for specific lines requested in the prompt
                    if (line.toLowerCase().includes('question text:')) {
                      return <div key={lIdx} className="text-lg font-bold text-slate-900 mt-6 mb-2">{line}</div>;
                    }
                    if (line.toLowerCase().includes('what it assesses:')) {
                      return <div key={lIdx} className="flex items-start space-x-2 text-indigo-600 font-medium italic text-sm mt-1 bg-indigo-50/50 p-2 rounded"><span className="shrink-0">🔍</span><span>{line}</span></div>;
                    }
                    if (line.toLowerCase().includes('why this will be asked:')) {
                      return <div key={lIdx} className="flex items-start space-x-2 text-emerald-600 font-medium italic text-sm mt-1 bg-emerald-50/50 p-2 rounded"><span className="shrink-0">💡</span><span>{line}</span></div>;
                    }
                    if (line.toLowerCase().includes('follow-up probe')) {
                      return <div key={lIdx} className="text-sm text-slate-500 font-medium border-l-2 border-slate-200 pl-4 mt-2 ml-4 mb-4">{line}</div>;
                    }
                    return <div key={lIdx}>{line}</div>;
                  })}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="bg-slate-50 p-6 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center text-slate-400 text-xs font-medium space-y-2 md:space-y-0">
        <div className="flex items-center space-x-4">
          <span>SME CALIBRATED</span>
          <span>•</span>
          <span>LATE-STAGE FOCUS</span>
          <span>•</span>
          <span>EVIDENCE-GROUNDED</span>
        </div>
        <div>© EnkiduZ Interview Architect</div>
      </div>
    </div>
  );
};

export default InterviewResults;
