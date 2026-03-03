
import { GoogleGenAI } from "@google/genai";
import { SYSTEM_PROMPT } from "../constants";
import { InterviewInputs } from "../types";

export const generateInterviewQuestions = async (inputs: InterviewInputs): Promise<string> => {
  // Use gemini-3-pro-preview as specified for high-quality reasoning and search capability
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
  
  const userPrompt = `
Here is the intake information for my final round interview prep:

Company name + company website link:
${inputs.companyInfo || 'Not provided'}

Full job description text:
${inputs.jobDescription}

Candidate resume: Work Experience section:
${inputs.workExperience}

Please design the elite, final-round interview questions based on this information as per the SYSTEM instructions.
`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-preview',
      contents: userPrompt,
      config: {
        systemInstruction: SYSTEM_PROMPT,
        temperature: 0.7,
        topK: 64,
        topP: 0.95,
        // Adding Google Search tool to allow the model to "skim" the company website context as required by the system prompt
        tools: [{ googleSearch: {} }],
      },
    });

    return response.text || "Failed to generate interview questions. Please try again.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw new Error("The AI service encountered an error. Check your inputs or API key configuration.");
  }
};
