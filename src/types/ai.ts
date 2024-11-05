export type AIProvider = 'gemini' | 'gigachat' | 'yandexgpt' | 'cloudgpt';

export interface AIConfig {
  provider: AIProvider;
  apiKey: string;
  endpoint?: string;
}

export interface AIMessage {
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}

export interface AIAnalysis {
  legalAdvice: string;
  similarCases: string[];
  recommendedActions: string[];
  riskAssessment: {
    level: 'low' | 'medium' | 'high';
    factors: string[];
  };
  confidence: number;
}

export interface CustomAIAssistant {
  id: string;
  name: string;
  description: string;
  prompt: string;
  provider: AIProvider;
  created: string;
  lastModified: string;
}