import React from 'react';
import { FileText, AlertTriangle, CheckCircle } from 'lucide-react';

interface DocumentAnalysisProps {
  analysis: {
    type: string;
    mainPoints: string[];
    risks: string[];
    recommendations: string[];
  };
}

const DocumentAnalysis: React.FC<DocumentAnalysisProps> = ({ analysis }) => {
  return (
    <div className="space-y-4 animate-fade-in">
      <div className="bg-gray-800 rounded-lg p-4">
        <div className="flex items-center gap-2 mb-3">
          <FileText className="w-5 h-5 text-blue-400" />
          <h3 className="text-lg font-medium text-white">Анализ документа</h3>
        </div>

        <div className="space-y-4">
          <div>
            <h4 className="text-gray-400 mb-2">Тип документа</h4>
            <p className="text-white">{analysis.type}</p>
          </div>

          <div>
            <h4 className="text-gray-400 mb-2">Основные пункты</h4>
            <ul className="space-y-1">
              {analysis.mainPoints.map((point, index) => (
                <li key={index} className="text-gray-300">• {point}</li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-gray-400 mb-2">Риски</h4>
            <ul className="space-y-2">
              {analysis.risks.map((risk, index) => (
                <li key={index} className="flex items-center gap-2 text-red-400">
                  <AlertTriangle className="w-4 h-4 flex-shrink-0" />
                  <span>{risk}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-gray-400 mb-2">Рекомендации</h4>
            <ul className="space-y-2">
              {analysis.recommendations.map((rec, index) => (
                <li key={index} className="flex items-center gap-2 text-green-400">
                  <CheckCircle className="w-4 h-4 flex-shrink-0" />
                  <span>{rec}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocumentAnalysis;