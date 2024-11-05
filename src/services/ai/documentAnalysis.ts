import { AIResponse } from './types';

const DOCUMENT_TYPES = {
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

export const analyzeDocument = async (file: File): Promise<AIResponse> => {
  try {
    await new Promise(resolve => setTimeout(resolve, 2000));
    const type = Math.random() > 0.5 ? 'contract' : 'court';
    const analysis = DOCUMENT_TYPES[type];

    return {
      message: `Анализ документа "${file.name}" завершен.`,
      type: 'document',
      data: analysis
    };
  } catch (error) {
    throw new Error('Ошибка при анализе документа');
  }
};