import React, { useState } from 'react';
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
  Save,
  AlertCircle,
  Globe,
  Webhook,
  Cpu,
  Lock
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useStore } from '../../store';

const DeveloperProfileSettings: React.FC = () => {
  const { user } = useAuth();
  const { settings } = useStore();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [activeTab, setActiveTab] = useState('general');
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    // Basic Info
    name: user?.name || '',
    email: user?.email || '',
    company: user?.company || '',
    purpose: user?.purpose || '',
    
    // API Keys
    apiKey: user?.apiKey || 'sk-1234567890abcdef',
    testApiKey: user?.testApiKey || 'sk-test-1234567890abcdef',
    
    // Rate Limits
    rateLimit: user?.rateLimit || 1000,
    burstLimit: user?.burstLimit || 50,
    
    // Endpoints
    endpoints: user?.endpoints || [
      { id: 'lawyers', enabled: true, quota: 10000 },
      { id: 'cases', enabled: true, quota: 5000 },
      { id: 'documents', enabled: true, quota: 2000 },
      { id: 'ai', enabled: true, quota: 1000 }
    ],
    
    // Webhooks
    webhooks: user?.webhooks || [],
    
    // Security
    ipWhitelist: user?.ipWhitelist || [],
    allowedDomains: user?.allowedDomains || [],
    
    // AI Features
    aiEnabled: settings?.ai?.enabled || true,
    aiModels: settings?.ai?.models || ['gemini', 'gigachat', 'yandexgpt'],
    
    // Monitoring
    errorReporting: true,
    performanceMonitoring: true,
    usageAlerts: true
  });

  const tabs = [
    { id: 'general', name: 'Основная информация', icon: Code },
    { id: 'api', name: 'API ключи', icon: Key },
    { id: 'endpoints', name: 'Эндпоинты', icon: Globe },
    { id: 'webhooks', name: 'Вебхуки', icon: Webhook },
    { id: 'security', name: 'Безопасность', icon: Shield },
    { id: 'ai', name: 'AI интеграция', icon: Bot },
    { id: 'monitoring', name: 'Мониторинг', icon: BarChart },
    { id: 'docs', name: 'Документация', icon: FileText }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    try {
      // Имитация сохранения
      await new Promise(resolve => setTimeout(resolve, 1000));
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      setError('Ошибка при сохранении настроек');
    } finally {
      setLoading(false);
    }
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'general':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-6">
              <div className="form-group">
                <label className="form-label">Имя</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Email</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Компания</label>
                <input
                  type="text"
                  value={formData.company}
                  onChange={(e) => setFormData(prev => ({ ...prev, company: e.target.value }))}
                  className="form-input"
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Цель использования API</label>
              <textarea
                value={formData.purpose}
                onChange={(e) => setFormData(prev => ({ ...prev, purpose: e.target.value }))}
                className="form-textarea"
                rows={4}
              />
            </div>
          </div>
        );

      case 'api':
        return (
          <div className="space-y-6">
            <div className="p-4 bg-blue-500/10 rounded-lg border border-blue-500/20">
              <div className="flex items-center gap-3">
                <Key className="w-6 h-6 text-blue-400" />
                <div>
                  <h3 className="text-sm font-medium text-blue-400">API ключи</h3>
                  <p className="text-sm text-gray-400">
                    Используйте эти ключи для доступа к API
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="form-group">
                <label className="form-label">Production API Key</label>
                <div className="relative">
                  <input
                    type="password"
                    value={formData.apiKey}
                    readOnly
                    className="form-input pr-24"
                  />
                  <button 
                    className="absolute right-2 top-1/2 -translate-y-1/2 px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-500"
                    onClick={() => navigator.clipboard.writeText(formData.apiKey)}
                  >
                    Копировать
                  </button>
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Test API Key</label>
                <div className="relative">
                  <input
                    type="password"
                    value={formData.testApiKey}
                    readOnly
                    className="form-input pr-24"
                  />
                  <button 
                    className="absolute right-2 top-1/2 -translate-y-1/2 px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-500"
                    onClick={() => navigator.clipboard.writeText(formData.testApiKey)}
                  >
                    Копировать
                  </button>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="form-group">
                <label className="form-label">Rate Limit (запросов/час)</label>
                <input
                  type="number"
                  value={formData.rateLimit}
                  onChange={(e) => setFormData(prev => ({ ...prev, rateLimit: parseInt(e.target.value) }))}
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Burst Limit (запросов/сек)</label>
                <input
                  type="number"
                  value={formData.burstLimit}
                  onChange={(e) => setFormData(prev => ({ ...prev, burstLimit: parseInt(e.target.value) }))}
                  className="form-input"
                />
              </div>
            </div>
          </div>
        );

      case 'endpoints':
        return (
          <div className="space-y-6">
            <div className="p-4 bg-blue-500/10 rounded-lg border border-blue-500/20">
              <div className="flex items-center gap-3">
                <Globe className="w-6 h-6 text-blue-400" />
                <div>
                  <h3 className="text-sm font-medium text-blue-400">Доступные эндпоинты</h3>
                  <p className="text-sm text-gray-400">
                    Управляйте доступом к API эндпоинтам
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              {formData.endpoints.map(endpoint => (
                <div 
                  key={endpoint.id}
                  className="flex items-center justify-between p-4 bg-gray-800 rounded-lg"
                >
                  <div className="flex items-center gap-4">
                    <div className="p-2 bg-gray-700 rounded-lg">
                      <Terminal className="w-5 h-5 text-blue-400" />
                    </div>
                    <div>
                      <h4 className="text-white font-medium">/api/v1/{endpoint.id}</h4>
                      <p className="text-sm text-gray-400">Квота: {endpoint.quota} запросов/месяц</p>
                    </div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      className="sr-only peer"
                      checked={endpoint.enabled}
                      onChange={(e) => {
                        setFormData(prev => ({
                          ...prev,
                          endpoints: prev.endpoints.map(ep =>
                            ep.id === endpoint.id
                              ? { ...ep, enabled: e.target.checked }
                              : ep
                          )
                        }));
                      }}
                    />
                    <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
              ))}
            </div>
          </div>
        );

      case 'webhooks':
        return (
          <div className="space-y-6">
            <div className="p-4 bg-blue-500/10 rounded-lg border border-blue-500/20">
              <div className="flex items-center gap-3">
                <Webhook className="w-6 h-6 text-blue-400" />
                <div>
                  <h3 className="text-sm font-medium text-blue-400">Вебхуки</h3>
                  <p className="text-sm text-gray-400">
                    Настройте уведомления о событиях
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-gray-800 rounded-lg">
                <div className="flex items-center gap-4">
                  <div className="p-2 bg-gray-700 rounded-lg">
                    <Database className="w-5 h-5 text-green-400" />
                  </div>
                  <div>
                    <h4 className="text-white font-medium">Новые данные</h4>
                    <p className="text-sm text-gray-400">
                      Уведомления о новых записях в базе данных
                    </p>
                  </div>
                </div>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500">
                  Настроить
                </button>
              </div>

              <div className="flex items-center justify-between p-4 bg-gray-800 rounded-lg">
                <div className="flex items-center gap-4">
                  <div className="p-2 bg-gray-700 rounded-lg">
                    <AlertCircle className="w-5 h-5 text-red-400" />
                  </div>
                  <div>
                    <h4 className="text-white font-medium">Ошибки</h4>
                    <p className="text-sm text-gray-400">
                      Уведомления об ошибках в API
                    </p>
                  </div>
                </div>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500">
                  Настроить
                </button>
              </div>
            </div>
          </div>
        );

      case 'security':
        return (
          <div className="space-y-6">
            <div className="p-4 bg-blue-500/10 rounded-lg border border-blue-500/20">
              <div className="flex items-center gap-3">
                <Shield className="w-6 h-6 text-blue-400" />
                <div>
                  <h3 className="text-sm font-medium text-blue-400">Безопасность</h3>
                  <p className="text-sm text-gray-400">
                    Настройте параметры безопасности API
                  </p>
                </div>
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Разрешенные IP адреса</label>
              <textarea
                value={formData.ipWhitelist.join('\n')}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  ipWhitelist: e.target.value.split('\n').filter(ip => ip.trim())
                }))}
                placeholder="По одному IP адресу на строку"
                className="form-textarea"
                rows={4}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Разрешенные домены</label>
              <textarea
                value={formData.allowedDomains.join('\n')}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  allowedDomains: e.target.value.split('\n').filter(domain => domain.trim())
                }))}
                placeholder="По одному домену на строку"
                className="form-textarea"
                rows={4}
              />
            </div>

            <div className="flex items-center gap-2">
              <Lock className="w-5 h-5 text-blue-400" />
              <span className="text-sm text-gray-400">
                Все запросы должны использовать HTTPS
              </span>
            </div>
          </div>
        );

      case 'ai':
        return (
          <div className="space-y-6">
            <div className="p-4 bg-purple-500/10 rounded-lg border border-purple-500/20">
              <div className="flex items-center gap-3">
                <Bot className="w-6 h-6 text-purple-400" />
                <div>
                  <h3 className="text-sm font-medium text-purple-400">AI интеграция</h3>
                  <p className="text-sm text-gray-400">
                    Настройте параметры AI функций
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={formData.aiEnabled}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    aiEnabled: e.target.checked
                  }))}
                  className="form-checkbox"
                />
                <span className="text-gray-300">Включить AI функции</span>
              </label>

              <div className="form-group">
                <label className="form-label">Доступные AI модели</label>
                <div className="space-y-2">
                  {['gemini', 'gigachat', 'yandexgpt'].map(model => (
                    <label key={model} className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={formData.aiModels.includes(model)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setFormData(prev => ({
                              ...prev,
                              aiModels: [...prev.aiModels, model]
                            }));
                          } else {
                            setFormData(prev => ({
                              ...prev,
                              aiModels: prev.aiModels.filter(m => m !== model)
                            }));
                          }
                        }}
                        className="form-checkbox"
                      />
                      <span className="text-gray-300">{model}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );

      case 'monitoring':
        return (
          <div className="space-y-6">
            <div className="p-4 bg-blue-500/10 rounded-lg border border-blue-500/20">
              <div className="flex items-center gap-3">
                <BarChart className="w-6 h-6 text-blue-400" />
                <div>
                  <h3 className="text-sm font-medium text-blue-400">Мониторинг</h3>
                  <p className="text-sm text-gray-400">
                    Настройте мониторинг API
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={formData.errorReporting}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    errorReporting: e.target.checked
                  }))}
                  className="form-checkbox"
                />
                <span className="text-gray-300">Отчеты об ошибках</span>
              </label>

              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={formData.performanceMonitoring}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    performanceMonitoring: e.target.checked
                  }))}
                  className="form-checkbox"
                />
                <span className="text-gray-300">Мониторинг производительности</span>
              </label>

              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={formData.usageAlerts}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    usageAlerts: e.target.checked
                  }))}
                  className="form-checkbox"
                />
                <span className="text-gray-300">Оповещения о превышении квот</span>
              </label>
            </div>
          </div>
        );

      case 'docs':
        return (
          <div className="space-y-6">
            <div className="p-4 bg-blue-500/10 rounded-lg border border-blue-500/20">
              <div className="flex items-center gap-3">
                <FileText className="w-6 h-6 text-blue-400" />
                <div>
                  <h3 className="text-sm font-medium text-blue-400">Документация API</h3>
                  <p className="text-sm text-gray-400">
                    Полная документация по использованию API
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <a
                href="#"
                className="p-4 bg-gray-800 rounded-lg hover:bg-gray-750 transition-colors group"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-gray-700 rounded-lg group-hover:bg-gray-600">
                    <Terminal className="w-5 h-5 text-blue-400" />
                  </div>
                  <div>
                    <h4 className="text-white font-medium">Начало работы</h4>
                    <p className="text-sm text-gray-400">
                      Руководство по началу работы с API
                    </p>
                  </div>
                </div>
              </a>

              <a
                href="#"
                className="p-4 bg-gray-800 rounded-lg hover:bg-gray-750 transition-colors group"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-gray-700 rounded-lg group-hover:bg-gray-600">
                    <Code className="w-5 h-5 text-green-400" />
                  </div>
                  <div>
                    <h4 className="text-white font-medium">Примеры кода</h4>
                    <p className="text-sm text-gray-400">
                      Примеры использования API
                    </p>
                  </div>
                </div>
              </a>

              <a
                href="#"
                className="p-4 bg-gray-800 rounded-lg hover:bg-gray-750 transition-colors group"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-gray-700 rounded-lg group-hover:bg-gray-600">
                    <Bot className="w-5 h-5 text-purple-400" />
                  </div>
                  <div>
                    <h4 className="text-white font-medium">AI интеграция</h4>
                    <p className="text-sm text-gray-400">
                      Документация по AI функциям
                    </p>
                  </div>
                </div>
              </a>

              <a
                href="#"
                className="p-4 bg-gray-800 rounded-lg hover:bg-gray-750 transition-colors group"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-gray-700 rounded-lg group-hover:bg-gray-600">
                    <Webhook className="w-5 h-5 text-orange-400" />
                  </div>
                  <div>
                    <h4 className="text-white font-medium">Webhooks</h4>
                    <p className="text-sm text-gray-400">
                      Документация по вебхукам
                    </p>
                  </div>
                </div>
              </a>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-4 p-4 bg-blue-500/10 rounded-xl border border-blue-500/20">
        <div className="p-3 bg-blue-500/20 rounded-full">
          <Settings className="w-6 h-6 text-blue-400" />
        </div>
        <div>
          <h3 className="text-sm font-medium text-blue-400">Настройки разработчика</h3>
          <p className="text-sm text-gray-400">
            Управляйте настройками API и интеграций
          </p>
        </div>
      </div>

      <div className="flex gap-2 overflow-x-auto pb-4">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`
              flex items-center gap-2 px-4 py-2 rounded-lg whitespace-nowrap transition-colors
              ${activeTab === tab.id
                ? 'bg-blue-600 text-white'
                : 'bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-white'
              }
            `}
          >
            <tab.icon className="w-5 h-5" />
            <span>{tab.name}</span>
          </button>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {renderTabContent()}

        {error && (
          <div className="flex items-center gap-2 p-4 bg-red-500/10 text-red-400 rounded-lg animate-shake">
            <AlertCircle className="w-5 h-5 flex-shrink-0" />
            <p>{error}</p>
          </div>
        )}

        <div className="flex items-center justify-between pt-6 border-t border-gray-700">
          <div className="flex items-center gap-2">
            <Cpu className="w-5 h-5 text-blue-400" />
            <span className="text-sm text-gray-400">
              Изменения вступят в силу немедленно
            </span>
          </div>
          
          <button
            type="submit"
            disabled={loading}
            className={`
              flex items-center gap-2 px-6 py-2 rounded-lg text-white font-medium
              transition-all duration-200
              ${loading
                ? 'bg-gray-700 cursor-wait'
                : success
                ? 'bg-green-600'
                : 'bg-blue-600 hover:bg-blue-500'
              }
            `}
          >
            {loading ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-2 border-white/20 border-t-white" />
                <span>Сохранение...</span>
              </>
            ) : success ? (
              <>
                <Save className="w-5 h-5" />
                <span>Сохранено!</span>
              </>
            ) : (
              <>
                <Save className="w-5 h-5" />
                <span>Сохранить изменения</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default DeveloperProfileSettings;