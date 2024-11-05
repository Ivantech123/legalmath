import React from 'react';
import { 
  Code, 
  Key, 
  Bot, 
  FileText, 
  BarChart, 
  Terminal, 
  Database,
  Shield,
  Settings,
  Bell,
  Globe,
  Webhook,
  Cpu,
  ArrowUp,
  ArrowDown,
  AlertCircle,
  UserCog
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useRole } from '../../context/RoleContext';

const DeveloperDashboard: React.FC = () => {
  const { user } = useAuth();
  const { setShowRoleSwitcher } = useRole();

  // Calculate stats based on user data
  const stats = {
    apiCalls: user?.statistics?.apiCalls || 0,
    activeTokens: user?.statistics?.activeTokens || 0,
    errorRate: user?.statistics?.errorRate || 0,
    averageResponseTime: user?.statistics?.averageResponseTime || 0,
    endpoints: user?.endpoints?.length || 0,
    webhooks: user?.webhooks?.length || 0,
    aiRequests: user?.statistics?.aiRequests || 0,
    monthlyUsage: user?.statistics?.monthlyUsage || 0
  };

  return (
    <div className="min-h-screen bg-gray-900 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-white">Панель разработчика</h1>
            <p className="text-gray-400">Добро пожаловать, {user?.name}</p>
          </div>
          <div className="flex items-center gap-4">
            <button className="p-2 text-gray-400 hover:text-white bg-gray-800 rounded-lg hover:bg-gray-750 transition-colors">
              <Bell className="w-5 h-5" />
            </button>
            <button className="p-2 text-gray-400 hover:text-white bg-gray-800 rounded-lg hover:bg-gray-750 transition-colors">
              <Settings className="w-5 h-5" />
            </button>
            <button
              onClick={() => setShowRoleSwitcher(true)}
              className="p-2 text-gray-400 hover:text-white bg-gray-800 rounded-lg hover:bg-gray-750 transition-colors"
            >
              <UserCog className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-blue-500/20 rounded-xl">
                <Terminal className="w-6 h-6 text-blue-400" />
              </div>
              <div className="flex items-center gap-1 text-green-400">
                <ArrowUp className="w-4 h-4" />
                <span className="text-sm">12%</span>
              </div>
            </div>
            <h3 className="text-gray-400 text-sm mb-1">API вызовы (24ч)</h3>
            <div className="text-2xl font-bold text-white">{stats.apiCalls.toLocaleString()}</div>
          </div>

          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-green-500/20 rounded-xl">
                <Key className="w-6 h-6 text-green-400" />
              </div>
              <div className="flex items-center gap-1 text-green-400">
                <ArrowUp className="w-4 h-4" />
                <span className="text-sm">5%</span>
              </div>
            </div>
            <h3 className="text-gray-400 text-sm mb-1">Активные токены</h3>
            <div className="text-2xl font-bold text-white">{stats.activeTokens}</div>
          </div>

          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-red-500/20 rounded-xl">
                <AlertCircle className="w-6 h-6 text-red-400" />
              </div>
              <div className="flex items-center gap-1 text-green-400">
                <ArrowDown className="w-4 h-4" />
                <span className="text-sm">3%</span>
              </div>
            </div>
            <h3 className="text-gray-400 text-sm mb-1">Ошибки</h3>
            <div className="text-2xl font-bold text-white">{stats.errorRate}%</div>
          </div>

          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-purple-500/20 rounded-xl">
                <Bot className="w-6 h-6 text-purple-400" />
              </div>
              <div className="flex items-center gap-1 text-green-400">
                <ArrowUp className="w-4 h-4" />
                <span className="text-sm">8%</span>
              </div>
            </div>
            <h3 className="text-gray-400 text-sm mb-1">AI запросы</h3>
            <div className="text-2xl font-bold text-white">{stats.aiRequests.toLocaleString()}</div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* API Documentation */}
          <div className="lg:col-span-2">
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
            <div className="bg-gray-800 rounded-xl border border-gray-700 mt-6">
              <div className="p-6 border-b border-gray-700">
                <h2 className="text-xl font-semibold text-white">Эндпоинты</h2>
              </div>
              <div className="p-6 space-y-4">
                {[
                  { name: '/api/v1/lawyers', status: 'active', calls: '2.3k', method: 'GET' },
                  { name: '/api/v1/cases', status: 'active', calls: '1.5k', method: 'POST' },
                  { name: '/api/v1/ai/analyze', status: 'active', calls: '800', method: 'POST' }
                ].map((endpoint, index) => (
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
            {/* API Keys */}
            <div className="bg-gray-800 rounded-xl border border-gray-700 p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-white">API Ключи</h2>
                <button className="text-blue-400 hover:text-blue-300 text-sm">
                  Создать новый
                </button>
              </div>
              <div className="space-y-4">
                <div className="p-4 bg-gray-750 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <div className="text-sm font-medium text-white">Production</div>
                    <div className="px-2 py-1 bg-green-500/20 text-green-400 rounded-full text-xs">
                      Active
                    </div>
                  </div>
                  <div className="font-mono text-sm text-gray-400 break-all">
                    sk_live_...f8a9
                  </div>
                </div>
                <div className="p-4 bg-gray-750 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <div className="text-sm font-medium text-white">Test</div>
                    <div className="px-2 py-1 bg-yellow-500/20 text-yellow-400 rounded-full text-xs">
                      Test
                    </div>
                  </div>
                  <div className="font-mono text-sm text-gray-400 break-all">
                    sk_test_...b3c2
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Events */}
            <div className="bg-gray-800 rounded-xl border border-gray-700 p-6">
              <h2 className="text-xl font-semibold text-white mb-6">События</h2>
              <div className="space-y-4">
                {[
                  { type: 'error', message: 'Rate limit exceeded', time: '2 мин назад' },
                  { type: 'success', message: 'New API key created', time: '15 мин назад' },
                  { type: 'info', message: 'Webhook delivered', time: '1 час назад' }
                ].map((event, index) => (
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
                      <p className="text-xs text-gray-500">{event.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* AI Integration */}
            <div className="bg-gray-800 rounded-xl border border-gray-700 p-6">
              <div className="flex items-center gap-3 mb-6">
                <Bot className="w-6 h-6 text-purple-400" />
                <h2 className="text-xl font-semibold text-white">AI Интеграция</h2>
              </div>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-gray-750 rounded-lg">
                  <div className="text-sm text-gray-300">Анализ документов</div>
                  <div className="px-2 py-1 bg-green-500/20 text-green-400 rounded-full text-xs">
                    Включено
                  </div>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-750 rounded-lg">
                  <div className="text-sm text-gray-300">Подбор юристов</div>
                  <div className="px-2 py-1 bg-green-500/20 text-green-400 rounded-full text-xs">
                    Включено
                  </div>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-750 rounded-lg">
                  <div className="text-sm text-gray-300">Чат-бот</div>
                  <div className="px-2 py-1 bg-yellow-500/20 text-yellow-400 rounded-full text-xs">
                    Beta
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeveloperDashboard;