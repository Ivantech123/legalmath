import React, { useState } from 'react';
import { Plus, Save, Trash2, Bot } from 'lucide-react';
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
      <div className="flex items-center gap-4 p-4 bg-blue-500/10 rounded-xl border border-blue-500/20">
        <div className="p-3 bg-blue-500/20 rounded-full">
          <Bot className="w-6 h-6 text-blue-400" />
        </div>
        <div>
          <h3 className="text-sm font-medium text-blue-400">Создание AI ассистента</h3>
          <p className="text-sm text-gray-400">
            Создавайте персональных AI ассистентов для разных задач
          </p>
        </div>
      </div>

      <div className="bg-gray-800/50 rounded-lg p-4 space-y-4 border border-gray-700/50">
        <div className="form-group">
          <label className="form-label">Название</label>
          <input
            type="text"
            value={newAssistant.name}
            onChange={(e) => setNewAssistant(prev => ({ ...prev, name: e.target.value }))}
            placeholder="Название ассистента"
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label className="form-label">Описание</label>
          <input
            type="text"
            value={newAssistant.description}
            onChange={(e) => setNewAssistant(prev => ({ ...prev, description: e.target.value }))}
            placeholder="Краткое описание"
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label className="form-label">Промпт</label>
          <textarea
            value={newAssistant.prompt}
            onChange={(e) => setNewAssistant(prev => ({ ...prev, prompt: e.target.value }))}
            placeholder="Инструкции для AI..."
            rows={4}
            className="form-textarea"
          />
        </div>

        <div className="form-group">
          <label className="form-label">AI Провайдер</label>
          <select
            value={newAssistant.provider}
            onChange={(e) => setNewAssistant(prev => ({ ...prev, provider: e.target.value as AIProvider }))}
            className="form-select"
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
          <div key={assistant.id} className="bg-gray-800/50 rounded-lg p-4 space-y-4 border border-gray-700/50">
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