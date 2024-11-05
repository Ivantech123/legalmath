import React from 'react';
import { Bot, Key } from 'lucide-react';
import { useStore } from '../../store';
import { AIProvider } from '../../types/ai';

const providerInfo = {
  gemini: {
    name: 'Google Gemini',
    description: 'AI от Google с поддержкой анализа текста и изображений',
    fields: ['apiKey']
  },
  gigachat: {
    name: 'GigaChat',
    description: 'Российская языковая модель от Сбера',
    fields: ['apiKey', 'endpoint']
  },
  yandexgpt: {
    name: 'YandexGPT',
    description: 'Языковая модель от Яндекса',
    fields: ['apiKey']
  },
  cloudgpt: {
    name: 'CloudGPT',
    description: 'Облачное решение для AI анализа',
    fields: ['apiKey']
  }
};

const AIProviderSettings: React.FC = () => {
  const { settings, updateAIProvider, setActiveProvider } = useStore();
  const { providers, activeProvider } = settings.ai;

  const handleProviderUpdate = (provider: AIProvider, field: string, value: string) => {
    const currentConfig = providers[provider] || { provider };
    updateAIProvider(provider, {
      ...currentConfig,
      [field]: value
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4 p-4 bg-blue-500/10 rounded-xl border border-blue-500/20">
        <div className="p-3 bg-blue-500/20 rounded-full">
          <Bot className="w-6 h-6 text-blue-400" />
        </div>
        <div>
          <h3 className="text-sm font-medium text-blue-400">Настройки AI провайдеров</h3>
          <p className="text-sm text-gray-400">
            Настройте подключение к различным AI провайдерам
          </p>
        </div>
      </div>

      <div className="space-y-4">
        {(Object.keys(providerInfo) as AIProvider[]).map(provider => (
          <div
            key={provider}
            className="bg-gray-800/50 rounded-lg p-4 space-y-4 border border-gray-700/50"
          >
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-white font-medium">
                  {providerInfo[provider].name}
                </h4>
                <p className="text-sm text-gray-400">
                  {providerInfo[provider].description}
                </p>
              </div>
              <button
                onClick={() => setActiveProvider(provider)}
                className={`px-3 py-1 rounded-full text-sm ${
                  activeProvider === provider
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                {activeProvider === provider ? 'Активен' : 'Выбрать'}
              </button>
            </div>

            <div className="space-y-3">
              {providerInfo[provider].fields.map(field => (
                <div key={field} className="form-group">
                  <label className="form-label">
                    {field === 'apiKey' ? 'API Ключ' : 'Endpoint'}
                  </label>
                  <div className="relative">
                    <Key className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="password"
                      value={providers[provider]?.[field] || ''}
                      onChange={(e) => handleProviderUpdate(provider, field, e.target.value)}
                      placeholder={`Введите ${field === 'apiKey' ? 'API ключ' : 'endpoint'}`}
                      className="form-input pl-10"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AIProviderSettings;