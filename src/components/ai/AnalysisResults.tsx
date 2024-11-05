import React from 'react';
import { AIAnalysis } from '../../types/ai';

interface AnalysisResultsProps {
  analysis: AIAnalysis;
}

const AnalysisResults: React.FC<AnalysisResultsProps> = ({ analysis }) => {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-xl">
        <h4 className="font-medium text-blue-400 mb-2">Рекомендация:</h4>
        <p className="text-gray-300">{analysis.legalAdvice}</p>
      </div>

      <div className="space-y-3">
        <h4 className="font-medium text-blue-400">Похожие дела:</h4>
        {analysis.similarCases.map((caseRef, index) => (
          <div
            key={`case-${index}`}
            className="p-4 bg-gray-800/50 rounded-xl text-gray-300 border border-gray-700/50 hover:border-gray-600/50 transition-colors"
          >
            {caseRef}
          </div>
        ))}
      </div>

      <div className="space-y-3">
        <h4 className="font-medium text-blue-400">Рекомендуемые действия:</h4>
        {analysis.recommendedActions.map((action, index) => (
          <div
            key={`action-${index}`}
            className="flex items-center gap-3 p-4 bg-gray-800/50 rounded-xl text-gray-300 border border-gray-700/50"
          >
            <div className="w-6 h-6 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400 flex-shrink-0">
              {index + 1}
            </div>
            <span>{action}</span>
          </div>
        ))}
      </div>

      <div className="p-4 bg-gray-800/50 rounded-xl border border-gray-700/50">
        <h4 className="font-medium text-blue-400 mb-3">Оценка рисков:</h4>
        <div className="flex items-center gap-2 mb-3">
          <div className={`
            w-3 h-3 rounded-full animate-pulse
            ${analysis.riskAssessment.level === 'low' && 'bg-green-500'}
            ${analysis.riskAssessment.level === 'medium' && 'bg-yellow-500'}
            ${analysis.riskAssessment.level === 'high' && 'bg-red-500'}
          `}></div>
          <span className="text-gray-300 capitalize">
            {analysis.riskAssessment.level === 'low' && 'Низкий'}
            {analysis.riskAssessment.level === 'medium' && 'Средний'}
            {analysis.riskAssessment.level === 'high' && 'Высокий'}
          </span>
        </div>
        <ul className="space-y-2">
          {analysis.riskAssessment.factors.map((factor, index) => (
            <li key={`factor-${index}`} className="text-gray-300 flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-blue-400 flex-shrink-0"></div>
              {factor}
            </li>
          ))}
        </ul>
      </div>

      <div className="flex items-center justify-between p-4 bg-blue-500/10 border border-blue-500/20 rounded-xl">
        <span className="text-gray-300">Уверенность анализа:</span>
        <div className="flex items-center gap-2">
          <div className="w-20 h-2 bg-gray-800 rounded-full overflow-hidden">
            <div 
              className="h-full bg-blue-500 rounded-full transition-all duration-1000"
              style={{ width: `${analysis.confidence}%` }}
            ></div>
          </div>
          <span className="text-blue-400 font-medium">{analysis.confidence}%</span>
        </div>
      </div>
    </div>
  );
};

export default AnalysisResults;