import React, { useState, useEffect } from 'react';
import { MessageSquare, Send, X, AlertCircle } from 'lucide-react';
import { handleUserQuery } from '../../services/ai/aiService';
import { AIResponse } from '../../services/ai/types';
import AIMessage from './AIMessage';

interface Message {
  content: string;
  isUser: boolean;
  response: AIResponse | null;
}

interface AIAssistantModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AIAssistantModal: React.FC<AIAssistantModalProps> = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Initialize with greeting
    if (messages.length === 0) {
      setMessages([{
        content: '',
        isUser: false,
        response: {
          message: 'Здравствуйте! Я AI-ассистент LegalMatch. Помогу найти юриста, проанализировать документы или ответить на вопросы о сервисе.',
          type: 'text'
        }
      }]);
    }
  }, []);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userMessage = input.trim();
    setInput('');
    setLoading(true);
    setError(null);

    // Add user message immediately
    setMessages(prev => [...prev, {
      content: userMessage,
      isUser: true,
      response: null
    }]);

    try {
      const response = await handleUserQuery(userMessage);
      
      // Add AI response
      setMessages(prev => [...prev, {
        content: '',
        isUser: false,
        response
      }]);
    } catch (error) {
      setError('Произошла ошибка при обработке запроса. Пожалуйста, попробуйте еще раз.');
      console.error('AI Assistant Error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
      <div className="w-full max-w-4xl bg-gray-900 rounded-xl shadow-xl overflow-hidden animate-scale-in">
        <div className="flex items-center justify-between p-4 border-b border-gray-800">
          <div className="flex items-center gap-2">
            <MessageSquare className="w-6 h-6 text-blue-400" />
            <h2 className="text-xl font-semibold text-white">AI Ассистент</h2>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="h-[600px] overflow-y-auto p-4 space-y-4">
          {messages.map((message, index) => (
            <AIMessage
              key={index}
              response={message.response}
              isUser={message.isUser}
            />
          ))}
          
          {loading && (
            <div className="flex justify-center">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          )}

          {error && (
            <div className="flex items-center gap-2 p-4 bg-red-500/10 text-red-400 rounded-lg animate-shake">
              <AlertCircle className="w-5 h-5 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}
        </div>

        <form onSubmit={handleSubmit} className="p-4 border-t border-gray-800">
          <div className="flex gap-4">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Введите ваш вопрос..."
              className="flex-1 bg-gray-800 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={loading}
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              className={`
                px-4 py-2 rounded-lg transition-colors flex items-center gap-2
                ${loading || !input.trim()
                  ? 'bg-gray-700 text-gray-400 cursor-not-allowed'
                  : 'bg-blue-600 text-white hover:bg-blue-700'
                }
              `}
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AIAssistantModal;