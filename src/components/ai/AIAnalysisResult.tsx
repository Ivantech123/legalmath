import React from 'react';
import { Sparkles, TrendingUp, Target, AlertTriangle } from 'lucide-react';

interface AIAnalysisResultProps {
  analysis: {
    legalAdvice: string;
    similarCases: string[];
    recommendedActions: string[];
    riskAssessment: {
      level: 'low' | 'medium' | 'high';
      factors: string[];
    };
    confidence: number;
  };
}

const AIAnalysisResult: React.FC<AIAnalysisResultProps> = ({ analysis }) => {
  const getRiskColor = (level: string) => {
    switch (level) {
      case 'low': return 'text-green-600 bg-green-50';
      case 'medium': return 'text-yellow-600 bg-yellow-50';
      case 'high': return 'text-red-600 bg-red-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 space-y-6 animate-fade-in">
      <div className="flex items-center gap-2 text-purple-600">
        <Sparkles className="w-6 h-6" />
        <h3 className="text-lg font-semibold">AI Анализ профиля</h3>
      </div>

      <div className="space-y-4">
        <div className="bg-purple-50 rounded-lg p-4">
          <h4 className="font-medium text-purple-700 mb-2">Рекомендация:</h4>
          <p className="text-gray-700">{analysis.legalAdvice}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-blue-50 rounded-lg p-4">
            <div className="flex items-center gap-2 text-blue-600 mb-2">
              <Target className="w-5 h-5" />
              <h4 className="font-medium">Похожие дела</h4>
            </div>
            <ul className="space-y-2">
              {analysis.similarCases.map((item, index) => (
                <li key={index} className="text-gray-700 text-sm">• {item}</li>
              ))}
            </ul>
          </div>

          <div className="bg-green-50 rounded-lg p-4">
            <div className="flex items-center gap-2 text-green-600 mb-2">
              <TrendingUp className="w-5 h-5" />
              <h4 className="font-medium">Рекомендуемые действия</h4>
            </div>
            <ul className="space-y-2">
              {analysis.recommendedActions.map((item, index) => (
                <li key={index} className="text-gray-700 text-sm">• {item}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className={`rounded-lg p-4 ${getRiskColor(analysis.riskAssessment.level)}`}>
          <div className="flex items-center gap-2 mb-2">
            <AlertTriangle className="w-5 h-5" />
            <h4 className="font-medium">Оценка рисков</h4>
          </div>
          <ul className="space-y-2">
            {analysis.riskAssessment.factors.map((factor, index) => (
              <li key={index} className="text-sm">• {factor}</li>
            ))}
          </ul>
        </div>

        <div className="flex justify-end items-center gap-2 text-sm text-gray-500">
          <Sparkles className="w-4 h-4" />
          <span>Уверенность анализа: {analysis.confidence}%</span>
        </div>
      </div>
    </div>
  );
};

export default AIAnalysisResult;