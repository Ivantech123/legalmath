import React from 'react';
import { Search, Filter, Clock, Calendar, MessageSquare, FileText, Bot, User } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const LawyerFeed: React.FC = () => {
  const { user } = useAuth();

  const consultations = [
    {
      id: '1',
      client: 'Анна Петрова',
      type: 'Семейное право',
      time: '14:00',
      status: 'upcoming',
      duration: '60 мин'
    },
    {
      id: '2',
      client: 'Иван Сидоров',
      type: 'Трудовое право',
      time: '15:30',
      status: 'pending',
      duration: '45 мин'
    }
  ];

  const cases = [
    {
      id: '1',
      title: 'Семейный спор',
      client: 'Петров А.И.',
      type: 'Развод',
      status: 'in_progress',
      nextHearing: '2024-03-15'
    },
    {
      id: '2',
      title: 'Трудовой спор',
      client: 'ООО "Технологии"',
      type: 'Увольнение',
      status: 'pending',
      nextHearing: '2024-03-20'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Search and Filters */}
      <div className="mb-8 space-y-4">
        <div className="flex items-center gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Поиск по делам и клиентам..."
              className="w-full pl-12 pr-4 py-3 bg-gray-800 text-white rounded-xl border border-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <button className="p-3 bg-gray-800 text-gray-400 hover:text-white rounded-xl border border-gray-700 hover:border-gray-600 transition-colors">
            <Filter className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* AI Assistant Banner */}
      <div className="mb-8 p-6 bg-gradient-to-r from-purple-500/10 to-blue-500/10 rounded-xl border border-purple-500/20">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-purple-500/20 rounded-xl">
            <Bot className="w-8 h-8 text-purple-400" />
          </div>
          <div>
            <h2 className="text-lg font-medium text-white mb-1">AI-ассистент</h2>
            <p className="text-gray-400">
              AI поможет проанализировать документы и подготовиться к делам
            </p>
          </div>
          <button className="ml-auto px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-500 transition-colors">
            Начать
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Upcoming Consultations */}
          <div className="bg-gray-800 rounded-xl border border-gray-700">
            <div className="p-6 border-b border-gray-700">
              <h2 className="text-xl font-semibold text-white">Ближайшие консультации</h2>
            </div>
            <div className="p-6 space-y-4">
              {consultations.map(consultation => (
                <div key={consultation.id} className="flex items-center justify-between p-4 bg-gray-750 rounded-lg">
                  <div className="flex items-center gap-4">
                    <div className="p-2 bg-gray-700 rounded-lg">
                      <User className="w-5 h-5 text-blue-400" />
                    </div>
                    <div>
                      <h3 className="font-medium text-white">{consultation.client}</h3>
                      <p className="text-sm text-gray-400">{consultation.type}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-white">{consultation.time}</div>
                    <div className="text-sm text-gray-400">{consultation.duration}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Active Cases */}
          <div className="bg-gray-800 rounded-xl border border-gray-700">
            <div className="p-6 border-b border-gray-700">
              <h2 className="text-xl font-semibold text-white">Текущие дела</h2>
            </div>
            <div className="p-6 space-y-4">
              {cases.map(case_ => (
                <div key={case_.id} className="flex items-center justify-between p-4 bg-gray-750 rounded-lg">
                  <div className="flex items-center gap-4">
                    <div className="p-2 bg-gray-700 rounded-lg">
                      <FileText className="w-5 h-5 text-purple-400" />
                    </div>
                    <div>
                      <h3 className="font-medium text-white">{case_.title}</h3>
                      <p className="text-sm text-gray-400">{case_.client}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-white">{case_.type}</div>
                    <div className="text-sm text-gray-400">
                      Заседание: {new Date(case_.nextHearing).toLocaleDateString()}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="space-y-6">
          {/* Quick Actions */}
          <div className="bg-gray-800 rounded-xl border border-gray-700 p-6">
            <h2 className="text-xl font-semibold text-white mb-6">Быстрые действия</h2>
            <div className="space-y-3">
              <button className="w-full flex items-center gap-3 p-3 bg-gray-750 rounded-lg hover:bg-gray-700 transition-colors">
                <Calendar className="w-5 h-5 text-blue-400" />
                <span className="text-gray-300">Запланировать консультацию</span>
              </button>
              <button className="w-full flex items-center gap-3 p-3 bg-gray-750 rounded-lg hover:bg-gray-700 transition-colors">
                <FileText className="w-5 h-5 text-green-400" />
                <span className="text-gray-300">Создать документ</span>
              </button>
              <button className="w-full flex items-center gap-3 p-3 bg-gray-750 rounded-lg hover:bg-gray-700 transition-colors">
                <MessageSquare className="w-5 h-5 text-purple-400" />
                <span className="text-gray-300">Написать клиенту</span>
              </button>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-gray-800 rounded-xl border border-gray-700 p-6">
            <h2 className="text-xl font-semibold text-white mb-6">Последние действия</h2>
            <div className="space-y-4">
              {[
                { action: 'Новая консультация', time: '2 часа назад' },
                { action: 'Загружен документ', time: '4 часа назад' },
                { action: 'Обновлен статус дела', time: '5 часов назад' }
              ].map((activity, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-750 rounded-lg">
                  <div className="text-gray-300">{activity.action}</div>
                  <div className="text-sm text-gray-400">{activity.time}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LawyerFeed;