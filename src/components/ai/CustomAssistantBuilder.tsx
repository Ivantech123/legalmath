import React, { useState } from 'react';
import { Plus, Save, Trash2 } from 'lucide-react';
import { useStore } from '../../store';
import { CustomAIAssistant, AIProvider } from '../../types/ai';

const CustomAssistantBuilder: React.FC = () => {
  const { settings, addCustomAssistant, updateCustomAssistant, deleteCustomAssistant } = useStore();
  const [newAssistant, setNewAssistant] = useState<Partial<CustomAIAssistant>>({
    name: '',
    description: '',
    prompt: '',
    provider: settings.ai.activeProvider
  });

  const handleCreate = () => {
    if (!newAssistant.name || !newAssistant.prompt) return;

    addCustomAssistant({
      id: Date.now().toString(),
      name: newAssistant.name,
      description: newAssistant.description || '',
      prompt: newAssistant.prompt,
      provider: newAssistant.provider as AIProvider,
      created: new Date().toISOString(),
      lastModified: new Date().toISOString()
    });

    setNewAssistant({
      name: '',
      description: '',
      prompt: '',
      provider: settings.ai.activeProvider
    });
  };

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-medium text-white">
        Создание AI ассистента
      </h3>

      <div className="bg-gray-800 rounded-lg p-4 space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">
            Название
          </label>
          <input
            type="text"
            value={newAssistant.name}
            onChange={(e) => setNewAssistant(prev => ({ ...prev, name: e.target.value }))}
            placeholder="Название ассистента"
            className="w-full bg-gray-700 text-white rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">
            Описание
          </label>
          <input
            type="text"
            value={newAssistant.description}
            onChange={(e) => setNewAssistant(prev => ({ ...prev, description: e.target.value }))}
            placeholder="Краткое описание"
            className="w-full bg-gray-700 text-white rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">
            Промпт
          </label>
          <textarea
            value={newAssistant.prompt}
            onChange={(e) => setNewAssistant(prev => ({ ...prev, prompt: e.target.value }))}
            placeholder="Инструкции для AI..."
            rows={4}
            className="w-full bg-gray-700 text-white rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">
            AI Провайдер
          </label>
          <select
            value={newAssistant.provider}
            onChange={(e) => setNewAssistant(prev => ({ ...prev, provider: e.target.value as AIProvider }))}
            className="w-full bg-gray-700 text-white rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="gemini">Google Gemini</option>
            <option value="gigachat">GigaChat</option>
            <option value="yandexgpt">YandexGPT</option>
            <option value="cloudgpt">CloudGPT</option>
          </select>
        </div>

        <button
          onClick={handleCreate}
          disabled={!newAssistant.name || !newAssistant.prompt}
          className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed"
        >
          <Plus className="w-5 h-5" />
          Создать ассистента
        </button>
      </div>

      <div className="space-y-4">
        {settings.ai.customAssistants.map(assistant => (
          <div key={assistant.id} className="bg-gray-800 rounded-lg p-4 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-white font-medium">{assistant.name}</h4>
                <p className="text-sm text-gray-400">{assistant.description}</p>
              </div>
              <button
                onClick={() => deleteCustomAssistant(assistant.id)}
                className="text-red-400 hover:text-red-300"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
            <div className="text-sm text-gray-500">
              Последнее изменение: {new Date(assistant.lastModified).toLocaleString()}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CustomAssistantBuilder;