import React from 'react';
import { 
  MessageSquare, 
  FileText, 
  Calendar, 
  Scale,
  Bot,
  Shield,
  Settings,
  Bell,
  Search,
  UserCog,
  Star,
  MapPin,
  ChevronRight
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { Client } from '../../types';
import { useRole } from '../../context/RoleContext';

const ClientDashboard: React.FC = () => {
  const { user } = useAuth() as { user: Client };
  const { setShowRoleSwitcher } = useRole();

  // Calculate stats based on user data
  const stats = {
    consultations: user?.consultations?.length || 0,
    documents: user?.documents?.length || 0,
    lawyers: user?.lawyers?.length || 0,
    cases: user?.cases?.length || 0
  };

  // Get upcoming consultations
  const upcomingConsultations = user?.consultations
    ?.filter(c => new Date(c.scheduledAt) > new Date())
    .sort((a, b) => new Date(a.scheduledAt).getTime() - new Date(b.scheduledAt).getTime())
    .slice(0, 3) || [];

  // Get recent documents
  const recentDocuments = user?.documents
    ?.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 3) || [];

  return (
    <div className="min-h-screen bg-gray-900 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header with animated gradient */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 p-8 mb-8">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-blue-500/20 animate-pulse"></div>
          <div className="relative z-10">
            <h1 className="text-3xl font-bold text-white mb-2 animate-slide-up">
              Добро пожаловать, {user?.name}
            </h1>
            <p className="text-blue-100 animate-slide-up delay-100">
              Найдите подходящего юриста с помощью AI
            </p>
          </div>
          
          {/* Floating elements */}
          <div className="absolute top-4 right-4 animate-float">
            <Bot className="w-12 h-12 text-blue-300/50" />
          </div>
          <div className="absolute bottom-4 right-12 animate-float delay-200">
            <Scale className="w-8 h-8 text-purple-300/50" />
          </div>
        </div>

        {/* Stats Grid with hover animations */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {[
            { icon: Calendar, label: 'Консультации', value: stats.consultations, color: 'blue' },
            { icon: FileText, label: 'Документы', value: stats.documents, color: 'green' },
            { icon: Scale, label: 'Юристы', value: stats.lawyers, color: 'purple' },
            { icon: Star, label: 'Дела', value: stats.cases, color: 'orange' }
          ].map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={index}
                className={`
                  bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6
                  hover:border-${stat.color}-500/50 transition-all duration-300 group
                  hover:-translate-y-1 hover:shadow-lg animate-fade-in
                `}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className={`
                  w-12 h-12 rounded-lg mb-4 flex items-center justify-center
                  bg-${stat.color}-500/20 group-hover:animate-bounce-subtle
                `}>
                  <Icon className={`w-6 h-6 text-${stat.color}-400`} />
                </div>
                <div className="text-2xl font-bold text-white mb-1 group-hover:scale-110 transition-transform">
                  {stat.value}
                </div>
                <div className="text-gray-400">{stat.label}</div>
              </div>
            );
          })}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Upcoming Consultations */}
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700/50 overflow-hidden group hover:border-blue-500/50 transition-all duration-300">
              <div className="p-6 border-b border-gray-700/50">
                <h2 className="text-xl font-semibold text-white">Ближайшие консультации</h2>
              </div>
              <div className="p-6 space-y-4">
                {upcomingConsultations.map((consultation, index) => (
                  <div
                    key={consultation.id}
                    className="flex items-center justify-between p-4 bg-gray-700/50 rounded-lg hover:bg-gray-700 transition-all duration-300 animate-fade-in"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="flex items-center gap-4">
                      <div className="p-2 bg-blue-500/20 rounded-lg">
                        <Calendar className="w-5 h-5 text-blue-400" />
                      </div>
                      <div>
                        <h3 className="font-medium text-white">{consultation.type}</h3>
                        <p className="text-sm text-gray-400">
                          {new Date(consultation.scheduledAt).toLocaleString()}
                        </p>
                      </div>
                    </div>
                    <button className="px-4 py-2 bg-blue-600/20 text-blue-400 rounded-lg hover:bg-blue-600/30 transition-colors">
                      Подробнее
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Documents */}
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700/50 overflow-hidden group hover:border-green-500/50 transition-all duration-300">
              <div className="p-6 border-b border-gray-700/50">
                <h2 className="text-xl font-semibold text-white">Последние документы</h2>
              </div>
              <div className="p-6 space-y-4">
                {recentDocuments.map((document, index) => (
                  <div
                    key={document.id}
                    className="flex items-center justify-between p-4 bg-gray-700/50 rounded-lg hover:bg-gray-700 transition-all duration-300 animate-fade-in"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="flex items-center gap-4">
                      <div className="p-2 bg-green-500/20 rounded-lg">
                        <FileText className="w-5 h-5 text-green-400" />
                      </div>
                      <div>
                        <h3 className="font-medium text-white">{document.name}</h3>
                        <p className="text-sm text-gray-400">{document.type}</p>
                      </div>
                    </div>
                    <button className="px-4 py-2 bg-green-600/20 text-green-400 rounded-lg hover:bg-green-600/30 transition-colors">
                      Открыть
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* AI Assistant */}
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-purple-500/50 p-6 hover:-translate-y-1 transition-all duration-300">
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 bg-purple-500/20 rounded-xl">
                  <Bot className="w-8 h-8 text-purple-400" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-white">AI Помощник</h2>
                  <p className="text-gray-400">Задайте вопрос AI</p>
                </div>
              </div>
              <button className="w-full py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-500 transition-colors group">
                <span className="flex items-center justify-center gap-2">
                  <span>Начать чат</span>
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </span>
              </button>
            </div>

            {/* Quick Actions */}
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700/50 p-6">
              <h2 className="text-xl font-semibold text-white mb-6">Быстрые действия</h2>
              <div className="space-y-3">
                {[
                  { icon: Search, label: 'Найти юриста', color: 'blue' },
                  { icon: Calendar, label: 'Записаться на консультацию', color: 'green' },
                  { icon: FileText, label: 'Загрузить документ', color: 'purple' }
                ].map((action, index) => {
                  const Icon = action.icon;
                  return (
                    <button
                      key={index}
                      className={`
                        w-full flex items-center gap-3 p-3 rounded-lg
                        bg-gray-700/50 hover:bg-gray-700 transition-all duration-300
                        group animate-fade-in
                      `}
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <div className={`p-2 bg-${action.color}-500/20 rounded-lg`}>
                        <Icon className={`w-5 h-5 text-${action.color}-400`} />
                      </div>
                      <span className="text-gray-300 group-hover:text-white transition-colors">
                        {action.label}
                      </span>
                      <ChevronRight className="w-4 h-4 text-gray-400 group-hover:translate-x-1 transition-transform ml-auto" />
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientDashboard;