import { model } from './aiConfig';
import { handleGreeting, handleFarewell, handleLawyerSearch, handleSpecializationSearch } from './messageHandlers';
import { analyzeDocument } from './documentAnalysis';
import { AIResponse } from './types';
import { getLawyers } from '../lawyerService';

const SPECIALIZATIONS = [
  'семейное право',
  'корпоративное право',
  'уголовное право',
  'гражданское право'
];

export const handleUserQuery = async (query: string): Promise<AIResponse> => {
  try {
    const lowerQuery = query.toLowerCase();

    // Handle greetings
    if (lowerQuery.match(/^(привет|здравствуй|добрый|доброе|здрасте)/)) {
      return handleGreeting();
    }

    // Handle farewells
    if (lowerQuery.match(/^(пока|до свидания|прощай)/)) {
      return handleFarewell();
    }

    // Handle lawyer search
    if (lowerQuery.includes('найти юриста') || lowerQuery.includes('поиск юриста')) {
      return await handleLawyerSearch();
    }

    // Handle specialization queries
    for (const spec of SPECIALIZATIONS) {
      if (lowerQuery.includes(spec)) {
        return await handleSpecializationSearch(spec);
      }
    }

    // Handle lawyer name search
    const lawyers = await getLawyers();
    const matchedLawyer = lawyers.find(
      lawyer => lawyer.name.toLowerCase().includes(lowerQuery)
    );

    if (matchedLawyer) {
      return {
        message: 'Нашел информацию о юристе:',
        type: 'lawyers',
        data: [matchedLawyer]
      };
    }

    // Use Gemini AI for general queries
    if (!model) {
      throw new Error('AI model not initialized. Please check your API key.');
    }

    const chat = model.startChat({
      history: [
        {
          role: 'user',
          parts: 'Ты - AI-ассистент юридической платформы LegalMatch. Давай краткие и четкие ответы на юридические вопросы.',
        },
        {
          role: 'model',
          parts: 'Понял. Буду давать краткие и четкие ответы на юридические вопросы, основываясь на российском законодательстве.',
        },
      ],
      generationConfig: {
        maxOutputTokens: 200,
        temperature: 0.7,
        topP: 0.8,
        topK: 40,
      },
    });

    const result = await chat.sendMessage(query);
    const response = await result.response;
    
    if (!response.text()) {
      throw new Error('Empty response from AI');
    }

    const text = response.text()
      .split('\n')
      .filter(line => line.trim())
      .slice(0, 3)
      .join('\n');

    return {
      message: text,
      type: 'text'
    };

  } catch (error) {
    console.error('AI Service Error:', error);
    
    // Return user-friendly error message based on error type
    let errorMessage = 'Извините, произошла ошибка. Попробуйте переформулировать вопрос или обратиться к нашим специалистам.';
    
    if (error instanceof Error) {
      if (error.message.includes('API key')) {
        errorMessage = 'Система AI временно недоступна. Пожалуйста, обратитесь к администратору.';
      } else if (error.message.includes('Empty response')) {
        errorMessage = 'Извините, не удалось сформировать ответ. Попробуйте задать вопрос иначе.';
      }
    }

    return {
      message: errorMessage,
      type: 'error'
    };
  }
};

export { analyzeDocument };