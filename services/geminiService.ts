
import { GoogleGenAI, Type } from "@google/genai";
import { QuizData, WritingFeedback } from "../types";

// Initialize Gemini Client
// process.env.API_KEY is guaranteed to be available in this environment.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const MODEL_NAME = "gemini-2.5-flash";

export const geminiService = {
  /**
   * Generates a multiple-choice grammar quiz.
   */
  async generateQuiz(topic: string, difficulty: string, length: number): Promise<QuizData> {
    const prompt = `Generate a multiple-choice quiz with ${length} questions about English Grammar specifically focusing on: ${topic}. 
    Difficulty level: ${difficulty}.
    Return valid JSON with questions, options, correct answer index (0-3), and a brief explanation.
    Each question must be of type 'multiple-choice'.`;

    try {
      const response = await ai.models.generateContent({
        model: MODEL_NAME,
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              questions: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    id: { type: Type.INTEGER },
                    type: { type: Type.STRING, enum: ["multiple-choice"] },
                    text: { type: Type.STRING },
                    options: {
                      type: Type.ARRAY,
                      items: { type: Type.STRING }
                    },
                    correctAnswerIndex: { type: Type.INTEGER },
                    explanation: { type: Type.STRING }
                  },
                  required: ['id', 'type', 'text', 'options', 'correctAnswerIndex', 'explanation']
                }
              }
            },
            required: ['questions']
          }
        }
      });

      const text = response.text;
      if (!text) throw new Error("No response from Gemini");
      
      return JSON.parse(text) as QuizData;
    } catch (error) {
      console.error("Quiz Generation Error:", error);
      throw error;
    }
  },

  /**
   * Generates a vocabulary/translation quiz.
   */
  async generateVocabularyQuiz(direction: 'PL_EN' | 'EN_PL', difficulty: string, length: number): Promise<QuizData> {
    const sourceLang = direction === 'PL_EN' ? 'Polish' : 'English';
    const targetLang = direction === 'PL_EN' ? 'English' : 'Polish';
    
    const prompt = `Generate a vocabulary practice list with ${length} words/phrases to translate from ${sourceLang} to ${targetLang}.
    Difficulty: ${difficulty}.
    Include a mix of verbs, nouns, and adjectives.
    
    CRITICAL RULES:
    1. If the TARGET word is an English VERB (direction PL->EN), set type to 'verb-forms' and provide [Base, Past, Participle] in 'verbForms'.
    2. Otherwise, set type to 'text-input'.
    3. 'correctAnswer' should be the main translation.
    4. 'acceptableAnswers' should be a list of valid synonyms.
    `;

    try {
      const response = await ai.models.generateContent({
        model: MODEL_NAME,
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              title: { type: Type.STRING },
              questions: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    id: { type: Type.INTEGER },
                    type: { type: Type.STRING, enum: ["text-input", "verb-forms"] },
                    text: { type: Type.STRING, description: "The word to translate" },
                    correctAnswer: { type: Type.STRING },
                    acceptableAnswers: { type: Type.ARRAY, items: { type: Type.STRING } },
                    verbForms: { type: Type.ARRAY, items: { type: Type.STRING }, description: "Only for English verbs: [Base, Past, Participle]" },
                    explanation: { type: Type.STRING, description: "Example usage sentence" }
                  },
                  required: ['id', 'type', 'text', 'correctAnswer', 'explanation']
                }
              }
            },
            required: ['questions']
          }
        }
      });

      const text = response.text;
      if (!text) throw new Error("No response from Gemini");
      return JSON.parse(text) as QuizData;
    } catch (error) {
      console.error("Vocab Generation Error:", error);
      throw error;
    }
  },

  /**
   * Chat with the AI Tutor.
   */
  async chatWithTutor(history: { role: string, parts: { text: string }[] }[], message: string) {
    try {
      const chat = ai.chats.create({
        model: MODEL_NAME,
        history: history,
        config: {
          systemInstruction: "You are an expert English grammar tutor named 'Prof. Gemini'. You explain concepts clearly, provide examples, and correct user mistakes gently. Keep responses concise but helpful. Use Markdown for formatting."
        }
      });

      const result = await chat.sendMessage({ message });
      return result.text;
    } catch (error) {
      console.error("Chat Error:", error);
      throw error;
    }
  },

  /**
   * Get a specific example or detailed explanation for a tense card or topic.
   */
  async getDetailedExplanation(topicName: string): Promise<string> {
    const response = await ai.models.generateContent({
      model: MODEL_NAME,
      contents: `Provide a concise but comprehensive explanation of '${topicName}' in English Grammar. Include: 1. When to use it (Rules). 2. Common structures/patterns. 3. Two varied examples. Return as plain text with simple markdown formatting.`,
    });
    return response.text || "Could not load explanation.";
  },

  /**
   * Generate a creative writing topic.
   */
  async generateWritingTopic(difficulty: string): Promise<string> {
    const prompt = `Generate a creative and engaging writing topic for an English student at ${difficulty} level. 
    The topic should be interesting, open-ended, and suitable for a short essay or paragraph.
    Examples: "Describe your ideal weekend", "Discuss the advantages of living in a city", "What would you do if you found a wallet?".
    Return ONLY the topic string, no other text.`;

    const response = await ai.models.generateContent({
      model: MODEL_NAME,
      contents: prompt,
    });
    return response.text?.trim().replace(/^"(.*)"$/, '$1') || "Describe a memorable holiday you have taken.";
  },

  /**
   * Evaluate written text.
   */
  async evaluateWriting(topic: string, text: string, targetLengthLabel: string): Promise<WritingFeedback> {
    const prompt = `Evaluate the following English text written by a student.
    
    Topic: "${topic}"
    Target Length: ${targetLengthLabel}
    Student Text: "${text}"
    
    Analyze the text for:
    1. Grammar accuracy
    2. Vocabulary variety and appropriateness
    3. Relevance to the topic and adherence to length
    
    Provide a JSON response with scores (0-100), feedback, and specific corrections.
    `;

    try {
      const response = await ai.models.generateContent({
        model: MODEL_NAME,
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              overallScore: { type: Type.INTEGER },
              grammarScore: { type: Type.INTEGER },
              vocabularyScore: { type: Type.INTEGER },
              relevanceScore: { type: Type.INTEGER },
              generalFeedback: { type: Type.STRING },
              corrections: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    original: { type: Type.STRING },
                    correction: { type: Type.STRING },
                    explanation: { type: Type.STRING }
                  },
                  required: ['original', 'correction', 'explanation']
                }
              }
            },
            required: ['overallScore', 'grammarScore', 'vocabularyScore', 'relevanceScore', 'generalFeedback', 'corrections']
          }
        }
      });

      const jsonText = response.text;
      if (!jsonText) throw new Error("No response from AI");
      return JSON.parse(jsonText) as WritingFeedback;
    } catch (error) {
      console.error("Writing Evaluation Error:", error);
      throw error;
    }
  }
};
