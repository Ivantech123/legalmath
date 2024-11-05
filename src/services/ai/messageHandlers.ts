import { getLawyers } from '../lawyerService';
import { AIResponse } from './types';

export const handleGreeting = (): AIResponse => ({
  message: 'Здравствуйте! Я AI-ассистент LegalMatch. Помогу найти юриста, проанализировать документы или ответить на вопросы о сервисе.',
  type: 'text'
});

export const handleFarewell = (): AIResponse => ({
  message: 'До свидания! Буду рад помочь вам снова!',
  type: 'text'
});

export const handleLawyerSearch = async (): Promise<AIResponse> => {
  const lawyers = await getLawyers();
  return {
    message: 'Вот юристы, которые могут вам помочь:',
    type: 'lawyers',
    data: lawyers.slice(0, 3)
  };
};

export const handleSpecializationSearch = async (specialization: string): Promise<AIResponse> => {
  const lawyers = await getLawyers();
  const filteredLawyers = lawyers.filter(
    lawyer => lawyer.specialization.toLowerCase().includes(specialization)
  );
  
  return {
    message: `Нашел юристов по специализации "${specialization}":`,
    type: 'lawyers',
    data: filteredLawyers
  };
};