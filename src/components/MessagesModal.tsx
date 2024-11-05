import React, { useState } from 'react';
import { MessageSquare, Send, Shield, Bot, AlertCircle, X, ChevronRight } from 'lucide-react';

interface Message {
  id: string;
  sender: string;
  content: string;
  timestamp: string;
  isOwn: boolean;
  status: 'sent' | 'delivered' | 'read';
}

interface MessagesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const MessagesModal: React.FC<MessagesModalProps> = ({ isOpen, onClose }) => {
  const [messages] = useState<Message[]>([
    {
      id: '1',
      sender: 'Анна Сергеева',
      content: 'Здравствуйте! Я получила ваш запрос на консультацию.',
      timestamp: '10:30',
      isOwn: false,
      status: 'read'
    },
    {
      id: '2',
      sender: 'Вы',
      content: 'Добрый день! Да, хотел бы обсудить мой вопрос.',
      timestamp: '10:32',
      isOwn: true,
      status: 'read'
    },
    {
      id: '3',
      sender: 'Анна Сергеева',
      content: 'Конечно, давайте обсудим. Расскажите подробнее о вашей ситуации.',
      timestamp: '10:33',
      isOwn: false,
      status: 'read'
    }
  ]);

  const [newMessage, setNewMessage] = useState('');
  const [showPrivacyNotice, setShowPrivacyNotice] = useState(true);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
      <div className="bg-gray-900 rounded-xl w-full max-w-2xl h-[600px] flex flex-col border border-gray-800 shadow-xl animate-scale-in">
        {/* Header */}
        <div className="p-4 border-b border-gray-800">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-500/20 rounded-lg">
                <MessageSquare className="w-5 h-5 text-blue-400" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-white">Сообщения</h2>
                <p className="text-sm text-gray-400">Анна Сергеева • Онлайн</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Privacy Notice */}
        {showPrivacyNotice && (
          <div className="p-4 bg-blue-500/10 mx-4 mt-4 rounded-lg border border-blue-500/20 animate-fade-in">
            <div className="flex items-start gap-3">
              <div className="p-2 bg-blue-500/20 rounded-lg">
                <Shield className="w-5 h-5 text-blue-400" />
              </div>
              <div className="flex-1">
                <h3 className="text-sm font-medium text-blue-400 mb-1">
                  Правила конфиденциальности
                </h3>
                <p className="text-sm text-gray-400">
                  • Не передавайте личные данные и платежную информацию в чате<br />
                  • Общайтесь только через платформу для вашей безопасности<br />
                  • История сообщений хранится в зашифрованном виде
                </p>
              </div>
              <button
                onClick={() => setShowPrivacyNotice(false)}
                className="p-1 text-gray-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {/* AI Assistant Notice */}
          <div className="flex items-center gap-3 p-3 bg-purple-500/10 rounded-lg border border-purple-500/20">
            <Bot className="w-5 h-5 text-purple-400" />
            <p className="text-sm text-gray-400">
              AI-ассистент анализирует диалог для улучшения коммуникации
            </p>
          </div>

          {messages.map(message => (
            <div
              key={message.id}
              className={`flex ${message.isOwn ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`
                  max-w-[70%] rounded-2xl p-4 space-y-2
                  ${message.isOwn
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-800 text-gray-100'
                  }
                `}
              >
                <div className="flex items-center justify-between gap-4">
                  <span className="text-sm font-medium">
                    {message.sender}
                  </span>
                  <span className={`text-xs ${message.isOwn ? 'text-blue-200' : 'text-gray-400'}`}>
                    {message.timestamp}
                  </span>
                </div>
                <p>{message.content}</p>
                {message.isOwn && (
                  <div className="flex justify-end">
                    <span className="text-xs text-blue-200">
                      {message.status === 'sent' && 'Отправлено'}
                      {message.status === 'delivered' && 'Доставлено'}
                      {message.status === 'read' && 'Прочитано'}
                    </span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Input */}
        <div className="p-4 border-t border-gray-800">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (newMessage.trim()) {
                // In a real app, this would send the message to the server
                setNewMessage('');
              }
            }}
            className="flex items-center gap-3"
          >
            <div className="relative flex-1">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Введите сообщение..."
                className="w-full bg-gray-800 text-white rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 border border-gray-700"
              />
              <div className="absolute right-3 top-1/2 -translate-y-1/2">
                <Bot className="w-5 h-5 text-gray-400" />
              </div>
            </div>
            <button
              type="submit"
              disabled={!newMessage.trim()}
              className={`
                p-3 rounded-xl transition-all duration-200 group
                ${!newMessage.trim()
                  ? 'bg-gray-800 text-gray-400 cursor-not-allowed'
                  : 'bg-blue-600 text-white hover:bg-blue-500'
                }
              `}
            >
              <Send className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default MessagesModal;