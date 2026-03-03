
import React, { useState } from 'react';
import { InterviewInputs } from '../types';

interface InterviewFormProps {
  onSubmit: (inputs: InterviewInputs) => void;
  isLoading: boolean;
}

const InterviewForm: React.FC<InterviewFormProps> = ({ onSubmit, isLoading }) => {
  const [formData, setFormData] = useState<InterviewInputs>({
    companyInfo: '',
    jobDescription: '',
    workExperience: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const isFormValid = formData.jobDescription.trim() !== '' && 
                     formData.workExperience.trim() !== '';

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8 border border-slate-200">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-slate-900 flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
          Interview Intake
        </h2>
        <p className="text-slate-500 text-sm mt-1">Provide Your context to generate Your questions.</p>
      </div>
      
      <div className="space-y-8">
        <div>
          <label htmlFor="companyInfo" className="flex justify-between items-center mb-2">
            <span className="text-sm font-bold text-slate-700 uppercase tracking-wider">Company & Website</span>
            <span className="text-[10px] bg-slate-100 text-slate-500 px-2 py-0.5 rounded font-bold">OPTIONAL</span>
          </label>
          <input
            type="text"
            id="companyInfo"
            name="companyInfo"
            value={formData.companyInfo}
            onChange={handleChange}
            placeholder="e.g. Anthropic - https://anthropic.com"
            className="w-full px-4 py-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:bg-white focus:border-transparent transition-all outline-none text-slate-800 placeholder:text-slate-400"
          />
          <p className="text-[11px] text-slate-400 mt-2 ml-1">The URL allows the architect to skim products, values, and market context.</p>
        </div>

        <div>
          <label htmlFor="jobDescription" className="flex justify-between items-center mb-2">
            <span className="text-sm font-bold text-slate-700 uppercase tracking-wider">Full Job Description</span>
            <span className="text-[10px] bg-slate-100 text-slate-500 px-2 py-0.5 rounded font-bold">REQUIRED</span>
          </label>
          <textarea
            id="jobDescription"
            name="jobDescription"
            rows={6}
            value={formData.jobDescription}
            onChange={handleChange}
            placeholder="Paste responsibilities, metrics, and technical requirements..."
            className="w-full px-4 py-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:bg-white focus:border-transparent transition-all outline-none resize-none text-slate-800 placeholder:text-slate-400"
          />
        </div>

        <div>
          <label htmlFor="workExperience" className="flex justify-between items-center mb-2">
            <span className="text-sm font-bold text-slate-700 uppercase tracking-wider">Your Experience (CV Section)</span>
            <span className="text-[10px] bg-slate-100 text-slate-500 px-2 py-0.5 rounded font-bold">REQUIRED</span>
          </label>
          <textarea
            id="workExperience"
            name="workExperience"
            rows={8}
            value={formData.workExperience}
            onChange={handleChange}
            placeholder="Paste roles, bullets, and outcomes. Evidence-based questions are built from this."
            className="w-full px-4 py-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:bg-white focus:border-transparent transition-all outline-none resize-none text-slate-800 placeholder:text-slate-400"
          />
        </div>

        <button
          onClick={() => isFormValid && onSubmit(formData)}
          disabled={!isFormValid || isLoading}
          className={`w-full py-5 px-6 rounded-xl font-black text-sm uppercase tracking-[0.2em] text-white shadow-xl transition-all transform active:scale-95 flex items-center justify-center space-x-3 ${
            !isFormValid || isLoading 
              ? 'bg-slate-300 cursor-not-allowed shadow-none' 
              : 'bg-indigo-600 hover:bg-indigo-700 hover:shadow-indigo-200'
          }`}
        >
          {isLoading ? (
            <>
              <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <span>Executing SME Logic...</span>
            </>
          ) : (
            <>
              <span>GENERATED QUESTIONS & INSIGHTS</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default InterviewForm;
