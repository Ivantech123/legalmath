import React from 'react';
import { 
  Users, 
  DollarSign, 
  BarChart, 
  Calendar, 
  MessageSquare, 
  FileText,
  Star,
  Clock,
  ChevronRight,
  Briefcase,
  Bot,
  Shield
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const LawyerDashboard: React.FC = () => {
  const { user } = useAuth();

  // Calculate stats based on user data
  const stats = {
    activeClients: user?.statistics?.activeClients || 0,
    monthlyIncome: user?.statistics?.monthlyIncome || 0,
    successRate: user?.courtCases?.filter(c => c.result === 'Выиграно').length / (user?.courtCases?.length || 1) * 100 || 0,
    consultationsToday: user?.consultations?.filter(c => {
      const today = new Date().toISOString().split('T')[0];
      return c.scheduledAt.startsWith(today);
    }).length || 0,
    totalCases: user?.courtCases?.length || 0,
    averageRating: user?.rating || 0,
    responseRate: user?.statistics?.responseRate || 98,
    newLeads: user?.statistics?.newLeads || 0
  };

  // Get upcoming consultations from user data
  const upcomingConsultations = user?.consultations?.filter(c => 
    new Date(c.scheduledAt) > new Date()
  ).sort((a, b) => 
    new Date(a.scheduledAt).getTime() - new Date(b.scheduledAt).getTime()
  ).slice(0, 3) || [];

  // Get active cases from user data
  const activeCases = user?.courtCases?.filter(c => 
    c.status === 'in_progress'
  ).slice(0, 3) || [];

  // Get recent messages
  const recentMessages = user?.messages?.sort((a, b) => 
    new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
  ).slice(0, 3) || [];

  return (
    <div className="min-h-screen bg-gray-900 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-white">Кабинет юриста</h1>
            <p className="text-gray-400">Добро пожаловать, {user?.name}</p>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-blue-500/20 rounded-xl">
                <Users className="w-6 h-6 text-blue-400" />
              </div>
            </div>
            <h3 className="text-gray-400 text-sm mb-1">Активные клиенты</h3>
            <div className="text-2xl font-bold text-white">{stats.activeClients}</div>
          </div>

          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-green-500/20 rounded-xl">
                <DollarSign className="w-6 h-6 text-green-400" />
              </div>
            </div>
            <h3 className="text-gray-400 text-sm mb-1">Доход за месяц</h3>
            <div className="text-2xl font-bold text-white">{stats.monthlyIncome.toLocaleString()}₽</div>
          </div>

          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-purple-500/20 rounded-xl">
                <Star className="w-6 h-6 text-purple-400" />
              </div>
            </div>
            <h3 className="text-gray-400 text-sm mb-1">Успешные дела</h3>
            <div className="text-2xl font-bold text-white">{stats.successRate}%</div>
          </div>

          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-orange-500/20 rounded-xl">
                <Calendar className="w-6 h-6 text-orange-400" />
              </div>
            </div>
            <h3 className="text-gray-400 text-sm mb-1">Консультации сегодня</h3>
            <div className="text-2xl font-bold text-white">{stats.consultationsToday}</div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Upcoming Consultations */}
            <div className="bg-gray-800 rounded-xl border border-gray-700">
              <div className="p-6 border-b border-gray-700">
                <h2 className="text-xl font-semibold text-white">Ближайшие консультации</h2>
              </div>
              <div className="p-6 space-y-4">
                {upcomingConsultations.map((consultation, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-gray-750 rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className="p-2 bg-gray-700 rounded-lg">
                        <Clock className="w-5 h-5 text-blue-400" />
                      </div>
                      <div>
                        <h3 className="font-medium text-white">{consultation.client.name}</h3>
                        <p className="text-sm text-gray-400">{consultation.type}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-white">{new Date(consultation.scheduledAt).toLocaleTimeString()}</div>
                      <div className="text-sm text-gray-400">{consultation.duration} мин</div>
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
                {activeCases.map((case_, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-gray-750 rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className="p-2 bg-gray-700 rounded-lg">
                        <Briefcase className="w-5 h-5 text-purple-400" />
                      </div>
                      <div>
                        <h3 className="font-medium text-white">{case_.title}</h3>
                        <p className="text-sm text-gray-400">{case_.client.name}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-white">{case_.court}</div>
                      <div className="text-sm text-gray-400">
                        Следующее заседание: {new Date(case_.nextHearing).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Profile Stats */}
            <div className="bg-gray-800 rounded-xl border border-gray-700 p-6">
              <div className="flex items-center gap-4 mb-6">
                <img
                  src={user?.image || `https://ui-avatars.com/api/?name=${user?.name}&background=random`}
                  alt={user?.name}
                  className="w-16 h-16 rounded-xl object-cover"
                />
                <div>
                  <h2 className="text-lg font-semibold text-white">{user?.name}</h2>
                  <p className="text-sm text-gray-400">{user?.specialization}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-gray-750 rounded-lg text-center">
                  <div className="text-2xl font-bold text-white">{stats.totalCases}</div>
                  <div className="text-sm text-gray-400">Всего дел</div>
                </div>
                <div className="p-4 bg-gray-750 rounded-lg text-center">
                  <div className="text-2xl font-bold text-white">{stats.averageRating}</div>
                  <div className="text-sm text-gray-400">Рейтинг</div>
                </div>
                <div className="p-4 bg-gray-750 rounded-lg text-center">
                  <div className="text-2xl font-bold text-white">{stats.responseRate}%</div>
                  <div className="text-sm text-gray-400">Ответы</div>
                </div>
                <div className="p-4 bg-gray-750 rounded-lg text-center">
                  <div className="text-2xl font-bold text-white">{stats.newLeads}</div>
                  <div className="text-sm text-gray-400">Новые клиенты</div>
                </div>
              </div>
            </div>

            {/* Recent Messages */}
            <div className="bg-gray-800 rounded-xl border border-gray-700">
              <div className="p-6 border-b border-gray-700">
                <h2 className="text-xl font-semibold text-white">Сообщения</h2>
              </div>
              <div className="p-6 space-y-4">
                {recentMessages.map(message => (
                  <div key={message.id} className="flex items-start gap-4 p-4 bg-gray-750 rounded-lg">
                    <img
                      src={`https://ui-avatars.com/api/?name=${message.sender}&background=random`}
                      alt={message.sender}
                      className="w-10 h-10 rounded-full"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <h3 className="font-medium text-white">{message.sender}</h3>
                        <span className="text-sm text-gray-400">{message.time}</span>
                      </div>
                      <p className="text-sm text-gray-300 truncate">{message.content}</p>
                    </div>
                    {!message.read && (
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    )}
                  </div>
                ))}
                <button className="w-full py-2 text-blue-400 hover:text-blue-300 text-sm">
                  Все сообщения
                </button>
              </div>
            </div>

            {/* AI Assistant */}
            <div className="bg-gray-800 rounded-xl border border-gray-700 p-6">
              <div className="flex items-center gap-3 mb-4">
                <Bot className="w-6 h-6 text-purple-400" />
                <h2 className="text-lg font-semibold text-white">AI Ассистент</h2>
              </div>
              <p className="text-sm text-gray-400 mb-4">
                AI проанализировал вашу активность и подготовил рекомендации
              </p>
              <button className="w-full py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-500 transition-colors">
                Посмотреть рекомендации
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LawyerDashboard;