import React from 'react';
import { Sparkles } from 'lucide-react';

interface AIAnalysisButtonProps {
  onClick: () => void;
  isAnalyzing: boolean;
}

const AIAnalysisButton: React.FC<AIAnalysisButtonProps> = ({ onClick, isAnalyzing }) => {
  return (
    <button
      onClick={onClick}
      disabled={isAnalyzing}
      className={`
        flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium
        transition-all duration-300 transform
        ${isAnalyzing 
          ? 'bg-purple-100 text-purple-400 cursor-wait'
          : 'bg-gradient-to-r from-purple-500 to-blue-500 text-white hover:shadow-lg hover:-translate-y-0.5'
        }
      `}
    >
      <Sparkles className={`w-4 h-4 ${isAnalyzing ? 'animate-spin' : 'animate-pulse'}`} />
      {isAnalyzing ? 'Анализируем...' : 'AI Анализ'}
    </button>
  );
};

export default AIAnalysisButton;