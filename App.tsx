
import React, { useState, useCallback } from 'react';
import Header from './components/Header';
import InterviewForm from './components/InterviewForm';
import InterviewResults from './components/InterviewResults';
import { generateInterviewQuestions } from './services/geminiService';
import { InterviewInputs } from './types';

const App: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<string | null>(null);

  const handleSubmit = useCallback(async (inputs: InterviewInputs) => {
    setLoading(true);
    setError(null);
    try {
      const questions = await generateInterviewQuestions(inputs);
      setResult(questions);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred.');
    } finally {
      setLoading(false);
    }
  }, []);

  const handleReset = () => {
    setResult(null);
    setError(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 selection:bg-indigo-100 selection:text-indigo-900">
      <Header />
      
      <main className="flex-grow container mx-auto px-4 py-12">
        {!result ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 max-w-6xl mx-auto">
            <div className="lg:col-span-5 space-y-8">
              <div className="bg-slate-900 text-white p-10 rounded-[2rem] shadow-2xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-600 rounded-full blur-[80px] opacity-20 group-hover:opacity-40 transition-opacity"></div>
                <div className="relative z-10">
                  <div className="inline-block bg-indigo-600 text-[10px] font-black tracking-[0.2em] uppercase px-3 py-1 rounded-full mb-6">
                    Professional HR-System
                  </div>
                  <h3 className="text-4xl font-extrabold mb-6 leading-tight tracking-tight">
                    Precision <span className="text-indigo-400 italic">Interview</span> Engineering
                  </h3>
                  <p className="text-slate-400 leading-relaxed font-medium mb-8">
                    Interview questions tailored precisely to Your resume & Your job description. Generic one-size-fits-all questions are unfit for Your interview preparation. Tailored to fit You so You’re fit for the interview.
                  </p>
                  
                  <div className="space-y-6">
                    {[
                      { title: "Anti-Genericity", desc: "Tailored to industry, products, and specific business models." },
                      { title: "SME Validation", desc: "Ensures questions mirror real-world functional constraints." },
                      { title: "Assessment Lenses", desc: "Covers Judgment, Leadership, Ethics, and Culture fit." }
                    ].map((item, i) => (
                      <div key={i} className="flex items-start space-x-4 group/item">
                        <div className="mt-1 bg-indigo-500/20 p-2 rounded-lg group-hover/item:bg-indigo-500/40 transition-colors">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-indigo-400" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <div>
                          <h4 className="text-sm font-bold text-slate-100">{item.title}</h4>
                          <p className="text-xs text-slate-500 mt-0.5">{item.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {error && (
                <div className="bg-red-50 border border-red-100 text-red-600 p-6 rounded-2xl flex items-start space-x-4 shadow-sm">
                  <div className="bg-red-100 p-2 rounded-lg shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <h5 className="font-bold text-sm">System Interruption</h5>
                    <p className="text-xs font-medium mt-1">{error}</p>
                  </div>
                </div>
              )}
            </div>

            <div className="lg:col-span-7">
              <InterviewForm onSubmit={handleSubmit} isLoading={loading} />
            </div>
          </div>
        ) : (
          <InterviewResults content={result} onReset={handleReset} />
        )}
      </main>

      <footer className="py-16 bg-white border-t border-slate-100 mt-20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center justify-center space-y-4">
            <div className="flex items-center space-x-2 text-slate-900 font-bold tracking-tighter text-xl">
              <span className="bg-slate-900 text-white p-1.5 rounded-lg shadow-lg">E</span>
              <span>EnkiduZ</span>
            </div>
            <p className="text-slate-400 text-sm max-w-md text-center">
              Elevating career intelligence through high-fidelity behavioral architecture.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
