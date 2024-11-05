import React, { useState } from 'react';
import { Moon, Sun, Bell, BellOff, X } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';
import { useStore } from '../store';
import AIProviderSettings from './ai/AIProviderSettings';
import CustomAssistantBuilder from './ai/CustomAssistantBuilder';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SettingsModal: React.FC<SettingsModalProps> = ({ isOpen, onClose }) => {
  const { theme, toggleTheme } = useTheme();
  const { language, setLanguage } = useLanguage();
  const { settings, updateSettings } = useStore();
  const [activeTab, setActiveTab] = useState('general');

  if (!isOpen) return null;

  const tabs = [
    { id: 'general', name: 'Основные' },
    { id: 'ai', name: 'AI Настройки' },
    { id: 'assistants', name: 'AI Ассистенты' }
  ];

  return (
    <div className="fixed inset-0 bg-black/50 flex items-start justify-center z-50 p-4 overflow-y-auto backdrop-blur-sm">
      <div className="bg-gray-900 rounded-xl shadow-xl w-full max-w-4xl my-8">
        <div className="flex items-center justify-between p-6 border-b border-gray-800">
          <h2 className="text-2xl font-bold text-white">Настройки</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="flex border-b border-gray-800">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-6 py-3 text-sm font-medium transition-colors ${
                activeTab === tab.id
                  ? 'text-blue-400 border-b-2 border-blue-400'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              {tab.name}
            </button>
          ))}
        </div>

        <div className="p-6">
          {activeTab === 'general' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium text-white mb-4">Внешний вид</h3>
                <div className="flex items-center gap-4">
                  <button
                    onClick={toggleTheme}
                    className={`flex-1 p-4 rounded-lg border transition-all duration-300 ${
                      theme === 'light'
                        ? 'border-blue-500 bg-gray-800'
                        : 'border-gray-700'
                    }`}
                  >
                    <Sun className="w-6 h-6 mx-auto mb-2 text-gray-400" />
                    <div className="text-sm font-medium text-gray-300">
                      Светлая тема
                    </div>
                  </button>
                  <button
                    onClick={toggleTheme}
                    className={`flex-1 p-4 rounded-lg border transition-all duration-300 ${
                      theme === 'dark'
                        ? 'border-blue-500 bg-gray-800'
                        : 'border-gray-700'
                    }`}
                  >
                    <Moon className="w-6 h-6 mx-auto mb-2 text-gray-400" />
                    <div className="text-sm font-medium text-gray-300">
                      Темная тема
                    </div>
                  </button>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium text-white mb-4">Язык</h3>
                <select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value as 'ru' | 'en')}
                  className="w-full bg-gray-800 text-white rounded-lg px-3 py-2 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="ru">Русский</option>
                  <option value="en">English</option>
                </select>
              </div>

              <div>
                <h3 className="text-lg font-medium text-white mb-4">Уведомления</h3>
                <button
                  onClick={() => updateSettings({ notifications: !settings.notifications })}
                  className="w-full flex items-center justify-between p-4 rounded-lg border border-gray-700 hover:border-gray-600"
                >
                  <div className="flex items-center gap-3">
                    {settings.notifications ? (
                      <Bell className="w-6 h-6 text-blue-400" />
                    ) : (
                      <BellOff className="w-6 h-6 text-gray-400" />
                    )}
                    <span className="text-gray-300">
                      {settings.notifications ? 'Уведомления включены' : 'Уведомления выключены'}
                    </span>
                  </div>
                  <div
                    className={`w-10 h-6 rounded-full transition-colors duration-200 ${
                      settings.notifications ? 'bg-blue-600' : 'bg-gray-700'
                    }`}
                  >
                    <div
                      className={`w-4 h-4 rounded-full bg-white transform transition-transform duration-200 ${
                        settings.notifications ? 'translate-x-5' : 'translate-x-1'
                      } mt-1`}
                    />
                  </div>
                </button>
              </div>
            </div>
          )}

          {activeTab === 'ai' && <AIProviderSettings />}
          {activeTab === 'assistants' && <CustomAssistantBuilder />}
        </div>
      </div>
    </div>
  );
};

export default SettingsModal;