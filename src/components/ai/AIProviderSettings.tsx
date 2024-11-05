import React from 'react';
import { AIProvider } from '../../types/ai';
import { useStore } from '../../store';

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
      <h3 className="text-lg font-medium text-white">Настройки AI провайдеров</h3>

      <div className="space-y-4">
        {(Object.keys(providerInfo) as AIProvider[]).map(provider => (
          <div
            key={provider}
            className="bg-gray-800 rounded-lg p-4 space-y-4"
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
                <div key={field}>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    {field === 'apiKey' ? 'API Ключ' : 'Endpoint'}
                  </label>
                  <input
                    type="password"
                    value={providers[provider]?.[field] || ''}
                    onChange={(e) => handleProviderUpdate(provider, field, e.target.value)}
                    placeholder={`Введите ${field === 'apiKey' ? 'API ключ' : 'endpoint'}`}
                    className="w-full bg-gray-700 text-white rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
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