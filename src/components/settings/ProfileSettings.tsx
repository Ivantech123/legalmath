import React, { useState } from 'react';
import { User, Shield, Bot, Settings, ChevronRight, SwitchCamera } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import LawyerProfileSettings from './LawyerProfileSettings';
import ClientProfileSettings from './ClientProfileSettings';
import DeveloperProfileSettings from './DeveloperProfileSettings';
import SecuritySettings from './SecuritySettings';
import NotificationSettings from './NotificationSettings';
import RoleSwitcher from './RoleSwitcher';
import AIProviderSettings from './AIProviderSettings';
import CustomAssistantBuilder from './CustomAssistantBuilder';

const ProfileSettings: React.FC = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('profile');

  const tabs = [
    { id: 'profile', name: 'Профиль', icon: User },
    { id: 'security', name: 'Безопасность', icon: Shield },
    { id: 'notifications', name: 'Уведомления', icon: Bot },
    { id: 'role', name: 'Смена роли', icon: SwitchCamera },
    { id: 'ai', name: 'AI Настройки', icon: Bot },
    { id: 'assistants', name: 'AI Ассистенты', icon: Bot }
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'profile':
        if (user?.role === 'lawyer') {
          return <LawyerProfileSettings />;
        } else if (user?.role === 'developer') {
          return <DeveloperProfileSettings />;
        } else {
          return <ClientProfileSettings />;
        }
      case 'security':
        return <SecuritySettings />;
      case 'notifications':
        return <NotificationSettings />;
      case 'role':
        return <RoleSwitcher />;
      case 'ai':
        return <AIProviderSettings />;
      case 'assistants':
        return <CustomAssistantBuilder />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 p-4 sm:p-6 lg:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white">Настройки профиля</h1>
            <p className="text-gray-400 mt-2">Управляйте своим аккаунтом и настройками</p>
          </div>
          <div className="flex items-center gap-3 px-4 py-2 bg-gray-800/50 rounded-lg border border-gray-700/50">
            <Settings className="w-5 h-5 text-blue-400" />
            <span className="text-gray-300">
              {user?.role === 'lawyer' 
                ? 'Юрист' 
                : user?.role === 'developer' 
                ? 'Разработчик' 
                : 'Клиент'
              }
            </span>
          </div>
        </div>

        <div className="grid grid-cols-12 gap-6">
          {/* Sidebar */}
          <div className="col-span-12 lg:col-span-3">
            <div className="bg-gray-800 rounded-xl p-4">
              <nav className="space-y-2">
                {tabs.map(tab => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`
                        w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200
                        ${activeTab === tab.id
                          ? 'bg-blue-600 text-white'
                          : 'text-gray-400 hover:bg-gray-700/50 hover:text-white'
                        }
                      `}
                    >
                      <Icon className="w-5 h-5" />
                      <span>{tab.name}</span>
                      <ChevronRight className={`
                        w-4 h-4 ml-auto transition-transform duration-200
                        ${activeTab === tab.id ? 'rotate-90' : ''}
                      `} />
                    </button>
                  );
                })}
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="col-span-12 lg:col-span-9">
            <div className="bg-gray-800 rounded-xl p-6">
              {renderContent()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileSettings;