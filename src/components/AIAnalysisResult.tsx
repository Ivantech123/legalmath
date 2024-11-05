import React from 'react';
import { Sparkles, TrendingUp, Target, Award, AlertCircle } from 'lucide-react';
import { Lawyer } from '../types';

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
    <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-xl p-4 space-y-4">
      <div className="flex items-center gap-2 mb-2">
        <Sparkles className="w-5 h-5 text-purple-600" />
        <h3 className="font-semibold text-purple-900">AI Анализ профиля</h3>
      </div>

      <div className="bg-white rounded-lg p-4">
        <h4 className="font-medium text-gray-900 mb-2">Рекомендация</h4>
        <p className="text-gray-600 text-sm">{analysis.legalAdvice}</p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white rounded-lg p-4">
          <div className="flex items-center gap-2 text-blue-600 mb-3">
            <Target className="w-4 h-4" />
            <h4 className="font-medium">Похожие дела</h4>
          </div>
          <ul className="space-y-2">
            {analysis.similarCases.map((caseRef, index) => (
              <li key={index} className="text-sm text-gray-600">
                • {caseRef}
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-white rounded-lg p-4">
          <div className="flex items-center gap-2 text-green-600 mb-3">
            <TrendingUp className="w-4 h-4" />
            <h4 className="font-medium">Рекомендуемые действия</h4>
          </div>
          <ul className="space-y-2">
            {analysis.recommendedActions.map((action, index) => (
              <li key={index} className="text-sm text-gray-600">
                • {action}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="bg-white rounded-lg p-4">
        <div className="flex items-center gap-2 mb-3">
          <AlertCircle className={`w-4 h-4 ${getRiskColor(analysis.riskAssessment.level).split(' ')[0]}`} />
          <h4 className="font-medium text-gray-900">
            Оценка рисков
            <span className={`ml-2 px-2 py-0.5 rounded-full text-xs ${getRiskColor(analysis.riskAssessment.level)}`}>
              {analysis.riskAssessment.level.toUpperCase()}
            </span>
          </h4>
        </div>
        <ul className="space-y-2">
          {analysis.riskAssessment.factors.map((factor, index) => (
            <li key={index} className="text-sm text-gray-600">
              • {factor}
            </li>
          ))}
        </ul>
      </div>

      <div className="flex justify-end">
        <div className="text-sm text-gray-500">
          Уверенность анализа: {analysis.confidence}%
        </div>
      </div>
    </div>
  );
};

export default AIAnalysisResult;