import React, { useState } from 'react';
import { Sparkles } from 'lucide-react';
import { Lawyer } from '../../types';
import { analyzeCase } from '../../services/aiService';
import AIAnalysisResult from './AIAnalysisResult';
import AIAnalysisError from './AIAnalysisError';
import AIAnalysisButton from './AIAnalysisButton';

interface AIAnalysisProps {
  lawyer: Lawyer;
}

const AIAnalysis: React.FC<AIAnalysisProps> = ({ lawyer }) => {
  const [showAnalysis, setShowAnalysis] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [aiResult, setAiResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const handleAnalysis = async () => {
    if (isAnalyzing) return;
    
    setIsAnalyzing(true);
    setError(null);
    
    try {
      const result = await analyzeCase(`
        Имя: ${lawyer.name}
        Специализация: ${lawyer.specialization}
        Опыт: ${lawyer.experience} лет
        Дела: ${lawyer.cases}+
        Рейтинг: ${lawyer.rating}
        Отзывы: ${lawyer.reviewCount}
        География: ${lawyer.geography?.city || lawyer.location}
        Успешные дела: ${lawyer.courtCases?.map(c => `${c.title} (${c.result})`).join(', ')}
        Образование: ${lawyer.education?.map(e => `${e.institution} - ${e.degree}`).join(', ')}
      `);
      
      setAiResult(result);
      setShowAnalysis(true);
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Ошибка AI анализа');
    } finally {
      setIsAnalyzing(false);
    }
  };

  if (!showAnalysis) {
    return (
      <AIAnalysisButton
        onClick={handleAnalysis}
        isAnalyzing={isAnalyzing}
      />
    );
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
      <div className="max-w-2xl w-full bg-white rounded-xl shadow-xl overflow-hidden">
        {error ? (
          <AIAnalysisError message={error} />
        ) : (
          <AIAnalysisResult analysis={aiResult} />
        )}
        <div className="p-4 border-t border-gray-100">
          <button
            onClick={() => setShowAnalysis(false)}
            className="w-full px-4 py-2 text-gray-600 hover:text-gray-900"
          >
            Закрыть
          </button>
        </div>
      </div>
    </div>
  );
};

export default AIAnalysis;