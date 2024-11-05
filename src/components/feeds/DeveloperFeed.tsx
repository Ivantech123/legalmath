import React from 'react';
import { Search, Filter, Terminal, Code, Bot, Globe, Database, AlertCircle, Webhook } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const DeveloperFeed: React.FC = () => {
  const { user } = useAuth();

  const endpoints = [
    {
      name: '/api/v1/lawyers',
      method: 'GET',
      status: 'active',
      calls: '2.3k',
      latency: '120ms'
    },
    {
      name: '/api/v1/cases',
      method: 'POST',
      status: 'active',
      calls: '1.5k',
      latency: '180ms'
    },
    {
      name: '/api/v1/ai/analyze',
      method: 'POST',
      status: 'active',
      calls: '800',
      latency: '250ms'
    }
  ];

  const events = [
    {
      type: 'error',
      message: 'Rate limit exceeded',
      endpoint: '/api/v1/lawyers',
      time: '2 мин назад'
    },
    {
      type: 'success',
      message: 'Webhook delivered',
      endpoint: '/api/v1/webhooks',
      time: '5 мин назад'
    },
    {
      type: 'info',
      message: 'New API key created',
      endpoint: 'system',
      time: '10 мин назад'
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
              placeholder="Поиск по API документации и эндпоинтам..."
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
              AI поможет с интеграцией API и написанием кода
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
          {/* API Documentation */}
          <div className="bg-gray-800 rounded-xl border border-gray-700">
            <div className="p-6 border-b border-gray-700">
              <h2 className="text-xl font-semibold text-white">API Документация</h2>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-2 gap-4">
                <a href="#" className="p-4 bg-gray-750 rounded-lg hover:bg-gray-700 transition-colors">
                  <div className="flex items-center gap-3">
                    <Terminal className="w-5 h-5 text-blue-400" />
                    <div>
                      <h3 className="font-medium text-white">Начало работы</h3>
                      <p className="text-sm text-gray-400">Руководство по API</p>
                    </div>
                  </div>
                </a>

                <a href="#" className="p-4 bg-gray-750 rounded-lg hover:bg-gray-700 transition-colors">
                  <div className="flex items-center gap-3">
                    <Code className="w-5 h-5 text-green-400" />
                    <div>
                      <h3 className="font-medium text-white">Примеры</h3>
                      <p className="text-sm text-gray-400">Готовые решения</p>
                    </div>
                  </div>
                </a>

                <a href="#" className="p-4 bg-gray-750 rounded-lg hover:bg-gray-700 transition-colors">
                  <div className="flex items-center gap-3">
                    <Bot className="w-5 h-5 text-purple-400" />
                    <div>
                      <h3 className="font-medium text-white">AI API</h3>
                      <p className="text-sm text-gray-400">AI интеграция</p>
                    </div>
                  </div>
                </a>

                <a href="#" className="p-4 bg-gray-750 rounded-lg hover:bg-gray-700 transition-colors">
                  <div className="flex items-center gap-3">
                    <Webhook className="w-5 h-5 text-orange-400" />
                    <div>
                      <h3 className="font-medium text-white">Webhooks</h3>
                      <p className="text-sm text-gray-400">События и триггеры</p>
                    </div>
                  </div>
                </a>
              </div>
            </div>
          </div>

          {/* Endpoints */}
          <div className="bg-gray-800 rounded-xl border border-gray-700">
            <div className="p-6 border-b border-gray-700">
              <h2 className="text-xl font-semibold text-white">Эндпоинты</h2>
            </div>
            <div className="p-6 space-y-4">
              {endpoints.map((endpoint, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-gray-750 rounded-lg">
                  <div className="flex items-center gap-4">
                    <div className="p-2 bg-gray-700 rounded-lg">
                      <Globe className="w-5 h-5 text-blue-400" />
                    </div>
                    <div>
                      <h3 className="font-medium text-white">{endpoint.name}</h3>
                      <p className="text-sm text-gray-400">{endpoint.method}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-sm text-gray-400">{endpoint.calls} calls/day</div>
                    <div className="text-sm text-gray-400">{endpoint.latency}</div>
                    <div className="px-2 py-1 bg-green-500/20 text-green-400 rounded-full text-xs">
                      {endpoint.status}
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
                <Terminal className="w-5 h-5 text-blue-400" />
                <span className="text-gray-300">Создать API ключ</span>
              </button>
              <button className="w-full flex items-center gap-3 p-3 bg-gray-750 rounded-lg hover:bg-gray-700 transition-colors">
                <Database className="w-5 h-5 text-green-400" />
                <span className="text-gray-300">Мониторинг</span>
              </button>
              <button className="w-full flex items-center gap-3 p-3 bg-gray-750 rounded-lg hover:bg-gray-700 transition-colors">
                <Webhook className="w-5 h-5 text-purple-400" />
                <span className="text-gray-300">Настроить webhook</span>
              </button>
            </div>
          </div>

          {/* Recent Events */}
          <div className="bg-gray-800 rounded-xl border border-gray-700 p-6">
            <h2 className="text-xl font-semibold text-white mb-6">События</h2>
            <div className="space-y-4">
              {events.map((event, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className={`
                    p-2 rounded-lg
                    ${event.type === 'error' ? 'bg-red-500/20' : ''}
                    ${event.type === 'success' ? 'bg-green-500/20' : ''}
                    ${event.type === 'info' ? 'bg-blue-500/20' : ''}
                  `}>
                    <AlertCircle className={`
                      w-4 h-4
                      ${event.type === 'error' ? 'text-red-400' : ''}
                      ${event.type === 'success' ? 'text-green-400' : ''}
                      ${event.type === 'info' ? 'text-blue-400' : ''}
                    `} />
                  </div>
                  <div>
                    <p className="text-sm text-gray-300">{event.message}</p>
                    <p className="text-xs text-gray-500">{event.endpoint} • {event.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeveloperFeed;