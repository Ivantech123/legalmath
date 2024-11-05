import React from 'react';
import { AlertCircle } from 'lucide-react';

interface AIAnalysisErrorProps {
  message: string;
}

const AIAnalysisError: React.FC<AIAnalysisErrorProps> = ({ message }) => {
  return (
    <div className="flex items-center gap-2 p-4 bg-red-50 text-red-600 rounded-lg animate-shake">
      <AlertCircle className="w-5 h-5 flex-shrink-0" />
      <p className="text-sm">{message}</p>
    </div>
  );
};

export default AIAnalysisError;