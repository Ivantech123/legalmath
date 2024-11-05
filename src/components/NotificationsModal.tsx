import React, { useState } from 'react';
import { Bell, Check, X, Bot, Shield, AlertCircle } from 'lucide-react';

interface Notification {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  type: 'info' | 'success' | 'warning';
}

interface NotificationsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const NotificationsModal: React.FC<NotificationsModalProps> = ({ isOpen, onClose }) => {
  const [notifications] = useState<Notification[]>([
    {
      id: '1',
      title: 'Новая консультация',
      message: 'Завтра в 15:00 у вас консультация с юристом Анной Сергеевой',
      timestamp: '1 час назад',
      read: false,
      type: 'info'
    },
    {
      id: '2',
      title: 'Успешная верификация',
      message: 'Ваш документ был успешно проверен и подтвержден AI-системой',
      timestamp: '2 часа назад',
      read: false,
      type: 'success'
    },
    {
      id: '3',
      title: 'Важное обновление',
      message: 'Обновите данные профиля для улучшения видимости в поиске',
      timestamp: '3 часа назад',
      read: false,
      type: 'warning'
    }
  ]);

  if (!isOpen) return null;

  const getNotificationIcon = (type: Notification['type']) => {
    switch (type) {
      case 'success':
        return <Check className="w-5 h-5 text-green-400" />;
      case 'warning':
        return <AlertCircle className="w-5 h-5 text-yellow-400" />;
      default:
        return <Bell className="w-5 h-5 text-blue-400" />;
    }
  };

  const getNotificationStyle = (type: Notification['type']) => {
    switch (type) {
      case 'success':
        return 'bg-green-500/10 border-green-500/20';
      case 'warning':
        return 'bg-yellow-500/10 border-yellow-500/20';
      default:
        return 'bg-blue-500/10 border-blue-500/20';
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
      <div className="bg-gray-900 rounded-xl w-full max-w-md border border-gray-800 shadow-xl animate-scale-in">
        {/* Header */}
        <div className="p-4 border-b border-gray-800">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-500/20 rounded-lg">
                <Bell className="w-5 h-5 text-blue-400" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-white">Уведомления</h2>
                <p className="text-sm text-gray-400">
                  {notifications.filter(n => !n.read).length} новых
                </p>
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

        {/* AI Notice */}
        <div className="p-4 mx-4 mt-4 bg-purple-500/10 rounded-lg border border-purple-500/20">
          <div className="flex items-center gap-3">
            <Bot className="w-5 h-5 text-purple-400" />
            <p className="text-sm text-gray-400">
              AI анализирует уведомления для оптимизации коммуникации
            </p>
          </div>
        </div>

        {/* Notifications List */}
        <div className="max-h-[400px] overflow-y-auto p-4 space-y-3">
          {notifications.map(notification => (
            <div
              key={notification.id}
              className={`
                p-4 rounded-lg border transition-all duration-200
                ${notification.read ? 'opacity-75' : 'opacity-100'}
                ${getNotificationStyle(notification.type)}
              `}
            >
              <div className="flex items-start gap-3">
                <div className="p-2 bg-gray-800 rounded-lg">
                  {getNotificationIcon(notification.type)}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium text-white mb-1">
                    {notification.title}
                  </h3>
                  <p className="text-gray-300 text-sm mb-2">
                    {notification.message}
                  </p>
                  <span className="text-xs text-gray-400">
                    {notification.timestamp}
                  </span>
                </div>
                {!notification.read && (
                  <button className="p-1 hover:bg-gray-800 rounded-lg transition-colors">
                    <Check className="w-5 h-5 text-blue-400" />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-800">
          <button
            onClick={onClose}
            className="w-full py-2 text-center text-blue-400 hover:text-blue-300 transition-colors"
          >
            Отметить все как прочитанные
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotificationsModal;