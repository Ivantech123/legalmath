import React from 'react';
import { MessageSquare, AlertCircle, User } from 'lucide-react';
import { AIResponse } from '../../services/ai/types';
import { Lawyer } from '../../types';

interface AIMessageProps {
  response: AIResponse | null;
  isUser?: boolean;
}

const LawyerCard: React.FC<{ lawyer: Lawyer }> = ({ lawyer }) => (
  <div className="flex items-start gap-4 p-4 bg-gray-800 rounded-lg animate-fade-in">
    <img
      src={lawyer.image}
      alt={lawyer.name}
      className="w-16 h-16 rounded-full object-cover"
    />
    <div className="flex-1">
      <h3 className="text-lg font-semibold text-white">{lawyer.name}</h3>
      <p className="text-gray-300">{lawyer.specialization}</p>
      <div className="mt-2 flex items-center gap-4">
        <span className="text-gray-400">Опыт: {lawyer.experience} лет</span>
        <span className="text-gray-400">Рейтинг: {lawyer.rating}</span>
      </div>
    </div>
  </div>
);

const DocumentAnalysis: React.FC<{ data: any }> = ({ data }) => (
  <div className="space-y-4 animate-fade-in">
    <div>
      <h4 className="text-lg font-semibold text-white mb-2">Основные пункты:</h4>
      <ul className="list-disc pl-4 space-y-1">
        {data.mainPoints.map((point: string, index: number) => (
          <li key={index} className="text-gray-300">{point}</li>
        ))}
      </ul>
    </div>
    <div>
      <h4 className="text-lg font-semibold text-white mb-2">Риски:</h4>
      <ul className="list-disc pl-4 space-y-1">
        {data.risks.map((risk: string, index: number) => (
          <li key={index} className="text-red-400">{risk}</li>
        ))}
      </ul>
    </div>
    <div>
      <h4 className="text-lg font-semibold text-white mb-2">Рекомендации:</h4>
      <ul className="list-disc pl-4 space-y-1">
        {data.recommendations.map((rec: string, index: number) => (
          <li key={index} className="text-green-400">{rec}</li>
        ))}
      </ul>
    </div>
  </div>
);

const AIMessage: React.FC<AIMessageProps> = ({ response, isUser }) => {
  if (!response) {
    return null;
  }

  const renderContent = () => {
    switch (response.type) {
      case 'lawyers':
        return (
          <div className="space-y-4">
            {response.data?.map((lawyer: Lawyer) => (
              <LawyerCard key={lawyer.id} lawyer={lawyer} />
            ))}
          </div>
        );
      case 'document':
        return response.data ? <DocumentAnalysis data={response.data} /> : null;
      case 'error':
        return (
          <div className="flex items-center gap-2 text-red-400 animate-shake">
            <AlertCircle className="w-5 h-5" />
            <span>{response.message}</span>
          </div>
        );
      default:
        return <p className="text-gray-300">{response.message}</p>;
    }
  };

  return (
    <div
      className={`flex gap-4 ${
        isUser ? 'flex-row-reverse' : 'flex-row'
      } animate-fade-in`}
    >
      <div className="w-8 h-8 rounded-full flex items-center justify-center bg-gray-800">
        {isUser ? (
          <User className="w-5 h-5 text-white" />
        ) : (
          <MessageSquare className="w-5 h-5 text-blue-400" />
        )}
      </div>
      <div
        className={`max-w-[80%] p-4 rounded-lg ${
          isUser
            ? 'bg-blue-600 text-white'
            : 'bg-gray-800'
        }`}
      >
        {renderContent()}
      </div>
    </div>
  );
};

export default AIMessage;