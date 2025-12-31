
import { GoogleGenAI } from "@google/genai";

export class GeminiService {
  private ai: GoogleGenAI;

  constructor() {
    this.ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
  }

  async explainTopic(topicTitle: string, userQuery?: string) {
    try {
      const prompt = userQuery 
        ? `Explain the following C programming concept to a beginner: "${topicTitle}". Specifically, answer this question: "${userQuery}"`
        : `Explain the C programming concept "${topicTitle}" in very simple, easy-to-understand terms. Use metaphors if possible. Keep it concise but helpful.`;

      const response = await this.ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: prompt,
        config: {
          systemInstruction: "You are an expert C programming tutor who simplifies complex concepts for absolute beginners. Use clear language and brief code snippets if helpful.",
          temperature: 0.7,
        }
      });

      return response.text;
    } catch (error) {
      console.error("Gemini API Error:", error);
      return "I'm having trouble connecting to my brain right now. Please try again in a moment!";
    }
  }

  async debugCode(code: string) {
    try {
      const response = await this.ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Review this C code for errors and explain what is wrong and how to fix it:\n\n\`\`\`c\n${code}\n\`\`\``,
        config: {
          systemInstruction: "You are a code debugger. Provide clear, step-by-step explanations of bugs and provide the corrected code snippet.",
          temperature: 0.3,
        }
      });
      return response.text;
    } catch (error) {
      return "Unable to analyze code at this time.";
    }
  }
}

export const gemini = new GeminiService();
