import React from 'react';
import { Sparkles } from 'lucide-react';
import { ru } from '../i18n/ru';

interface AISummaryProps {
  lawyerBio: string;
}

const AISummary: React.FC<AISummaryProps> = ({ lawyerBio }) => {
  // In a real application, this would call an AI service to generate the summary
  const generateAISummary = (bio: string): string => {
    const words = bio.split(' ').slice(0, 15);
    return words.join(' ') + '...';
  };

  return (
    <div className="flex items-start gap-2 text-gray-600">
      <Sparkles className="w-5 h-5 text-purple-500 mt-1" />
      <div>
        <div className="text-sm font-medium text-purple-600 mb-1">{ru.common.aiSummary}</div>
        <p className="text-sm">{generateAISummary(lawyerBio)}</p>
      </div>
    </div>
  );
};

export default AISummary;