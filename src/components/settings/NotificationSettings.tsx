import React, { useState } from 'react';
import { Bell, Mail, MessageSquare, Calendar, Bot } from 'lucide-react';
import { useStore } from '../../store';

const NotificationSettings: React.FC = () => {
  const { settings, updateSettings } = useStore();
  const [loading, setLoading] = useState(false);

  const handleToggle = async (key: string) => {
    setLoading(true);
    try {
      // Имитация сохранения настроек
      await new Promise(resolve => setTimeout(resolve, 500));
      updateSettings({
        notifications: {
          ...settings.notifications,
          [key]: !settings.notifications?.[key]
        }
      });
    } finally {
      setLoading(false);
    }
  };

  const notifications = [
    {
      id: 'email',
      title: 'Email уведомления',
      description: 'Получать уведомления на email',
      icon: Mail
    },
    {
      id: 'messages',
      title: 'Сообщения',
      description: 'Уведомления о новых сообщениях',
      icon: MessageSquare
    },
    {
      id: 'consultations',
      title: 'Консультации',
      description: 'Напоминания о предстоящих консультациях',
      icon: Calendar
    },
    {
      id: 'ai',
      title: 'AI рекомендации',
      description: 'Персональные рекомендации от AI',
      icon: Bot
    }
  ];

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-4 p-4 bg-blue-500/10 rounded-xl border border-blue-500/20">
        <div className="p-3 bg-blue-500/20 rounded-full">
          <Bell className="w-6 h-6 text-blue-400" />
        </div>
        <div>
          <h3 className="text-sm font-medium text-blue-400">Настройки уведомлений</h3>
          <p className="text-sm text-gray-400">
            Выберите, какие уведомления вы хотите получать
          </p>
        </div>
      </div>

      <div className="space-y-4">
        {notifications.map(({ id, title, description, icon: Icon }) => (
          <div
            key={id}
            className="flex items-center justify-between p-4 bg-gray-800/50 rounded-xl border border-gray-700/50"
          >
            <div className="flex items-center gap-4">
              <div className="p-2 bg-gray-700/50 rounded-lg">
                <Icon className="w-5 h-5 text-gray-400" />
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-200">{title}</h3>
                <p className="text-sm text-gray-400">{description}</p>
              </div>
            </div>

            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="sr-only peer"
                checked={settings.notifications?.[id] ?? true}
                onChange={() => handleToggle(id)}
                disabled={loading}
              />
              <div className={`
                w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer 
                peer-checked:after:translate-x-full peer-checked:after:border-white 
                after:content-[''] after:absolute after:top-[2px] after:left-[2px] 
                after:bg-white after:rounded-full after:h-5 after:w-5 
                after:transition-all peer-checked:bg-blue-600
                ${loading ? 'opacity-50 cursor-wait' : ''}
              `}></div>
            </label>
          </div>
        ))}
      </div>

      <div className="flex items-center gap-4 p-4 bg-gray-800/50 rounded-xl border border-gray-700/50">
        <Bot className="w-6 h-6 text-blue-400" />
        <div>
          <h3 className="text-sm font-medium text-gray-200">AI-оптимизация уведомлений</h3>
          <p className="text-sm text-gray-400">
            AI анализирует ваши предпочтения для оптимальной настройки уведомлений
          </p>
        </div>
      </div>
    </div>
  );
};

export default NotificationSettings;