import React, { useState } from 'react';
import { Sparkles } from 'lucide-react';
import { Lawyer } from '../types';
import { ru } from '../i18n/ru';

interface AIAnalysisButtonProps {
  lawyer: Lawyer;
  onAnalysisComplete: (analysis: Lawyer['aiAnalysis']) => void;
}

const AIAnalysisButton: React.FC<AIAnalysisButtonProps> = ({ lawyer, onAnalysisComplete }) => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleAnalysis = async () => {
    setIsAnalyzing(true);
    
    // Simulate AI analysis with a delay
    setTimeout(() => {
      const analysis = {
        strengthScore: Math.round(Math.random() * 30 + 70), // 70-100
        successRate: Math.round(Math.random() * 20 + 80), // 80-100
        specialtyFit: lawyer.tags.slice(0, 3),
        recommendation: "Высококвалифицированный специалист с сильной практикой в семейном праве",
        lastUpdated: new Date().toISOString()
      };
      
      onAnalysisComplete(analysis);
      setIsAnalyzing(false);
    }, 2000);
  };

  return (
    <button
      onClick={handleAnalysis}
      disabled={isAnalyzing}
      className={`
        flex items-center gap-2 px-4 py-2 rounded-lg
        transition-all duration-300 transform
        ${isAnalyzing ? 
          'bg-purple-100 text-purple-500 cursor-wait' : 
          'bg-purple-500 text-white hover:bg-purple-600 hover:-translate-y-0.5 hover:shadow-lg active:translate-y-0'
        }
      `}
    >
      <Sparkles className={`w-5 h-5 ${isAnalyzing ? 'animate-spin' : 'animate-pulse'}`} />
      <span>{isAnalyzing ? 'Анализируем...' : 'AI Анализ'}</span>
    </button>
  );
};

export default AIAnalysisButton;