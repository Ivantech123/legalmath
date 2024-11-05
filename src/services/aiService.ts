import { GoogleGenerativeAI } from '@google/generative-ai';
import { getLawyers } from './lawyerService';
import { Lawyer } from '../types';

interface AIResponse {
  message: string;
  data?: any;
}

// Initialize Gemini AI
const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

export const handleUserQuery = async (query: string): Promise<AIResponse> => {
  try {
    // Convert query to lowercase for easier matching
    const lowerQuery = query.toLowerCase();

    // Handle greetings
    if (lowerQuery.match(/^(привет|здравствуй|добрый|доброе|здрасте)/)) {
      return {
        message: 'Здравствуйте! Я AI-ассистент LegalMatch. Помогу найти юриста, проанализировать документы или ответить на вопросы о сервисе.'
      };
    }

    // Handle farewells
    if (lowerQuery.match(/^(пока|до свидания|прощай)/)) {
      return {
        message: 'До свидания! Буду рад помочь вам снова!'
      };
    }

    // Handle lawyer search
    if (lowerQuery.includes('найти юриста') || lowerQuery.includes('поиск юриста')) {
      const lawyers = await getLawyers();
      return {
        message: 'Вот юристы, которые могут вам помочь:',
        data: {
          type: 'lawyers',
          lawyers: lawyers.slice(0, 3)
        }
      };
    }

    // Handle specialization queries
    const specializations = [
      'семейное право',
      'корпоративное право',
      'уголовное право',
      'гражданское право'
    ];

    for (const spec of specializations) {
      if (lowerQuery.includes(spec)) {
        const lawyers = await getLawyers();
        const filteredLawyers = lawyers.filter(
          lawyer => lawyer.specialization.toLowerCase().includes(spec)
        );
        
        return {
          message: `Нашел юристов по специализации "${spec}":`,
          data: {
            type: 'lawyers',
            lawyers: filteredLawyers
          }
        };
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
        data: {
          type: 'lawyers',
          lawyers: [matchedLawyer]
        }
      };
    }

    // For other queries, use Gemini AI
    const result = await model.generateContent(query);
    const response = await result.response;
    const text = response.text();

    return {
      message: text,
      data: {
        type: 'text'
      }
    };

  } catch (error) {
    console.error('AI Error:', error);
    return {
      message: 'Извините, произошла ошибка. Попробуйте переформулировать вопрос или обратиться к нашим специалистам.',
      data: {
        type: 'error'
      }
    };
  }
};

export const analyzeDocument = async (file: File): Promise<AIResponse> => {
  try {
    // For demo purposes, we'll simulate document analysis
    await new Promise(resolve => setTimeout(resolve, 2000));

    const documentTypes = {
      contract: {
        mainPoints: [
          'Определены стороны договора',
          'Указаны сроки исполнения',
          'Прописаны условия оплаты'
        ],
        risks: [
          'Отсутствует порядок разрешения споров',
          'Неясные условия расторжения'
        ],
        recommendations: [
          'Добавить раздел о разрешении споров',
          'Уточнить условия расторжения',
          'Проверить реквизиты сторон'
        ]
      },
      court: {
        mainPoints: [
          'Определен предмет иска',
          'Указаны требования истца',
          'Приложены доказательства'
        ],
        risks: [
          'Пропущен срок исковой давности',
          'Недостаточно доказательств'
        ],
        recommendations: [
          'Собрать дополнительные доказательства',
          'Уточнить исковые требования',
          'Проверить процессуальные сроки'
        ]
      }
    };

    // Randomly select document type for demo
    const type = Math.random() > 0.5 ? 'contract' : 'court';
    const analysis = documentTypes[type];

    return {
      message: `Анализ документа "${file.name}" завершен.`,
      data: {
        type: 'document',
        ...analysis
      }
    };
  } catch (error) {
    console.error('Document Analysis Error:', error);
    return {
      message: 'Произошла ошибка при анализе документа.',
      data: {
        type: 'error'
      }
    };
  }
};