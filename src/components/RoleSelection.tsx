import React, { useState } from 'react';
import { Scale, User, Briefcase, Sparkles, Bot, Code, ChevronLeft } from 'lucide-react';
import { UserRole } from '../types';
import { ru } from '../i18n/ru';
import LawyerRegistrationForm from './registration/LawyerRegistrationForm';
import ClientRegistrationForm from './registration/ClientRegistrationForm';
import DeveloperRegistrationForm from './registration/DeveloperRegistrationForm';
import LoginForm from './auth/LoginForm';

const RoleSelection: React.FC = () => {
  const [selectedRole, setSelectedRole] = useState<UserRole | 'developer' | null>(null);
  const [showLogin, setShowLogin] = useState(false);

  const handleBack = () => {
    setSelectedRole(null);
    setShowLogin(false);
  };

  if (showLogin) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 p-4 sm:p-6 lg:p-8">
        <div className="max-w-md mx-auto">
          <button
            onClick={handleBack}
            className="flex items-center gap-2 text-gray-400 hover:text-white mb-8 transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
            <span>Назад</span>
          </button>
          <LoginForm onSuccess={() => setShowLogin(false)} />
        </div>
      </div>
    );
  }

  if (selectedRole) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900">
        <div className="max-w-6xl mx-auto p-4 sm:p-6 lg:p-8">
          <button
            onClick={handleBack}
            className="flex items-center gap-2 text-gray-400 hover:text-white mb-8 transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
            <span>Назад</span>
          </button>
          
          {selectedRole === 'lawyer' ? (
            <LawyerRegistrationForm />
          ) : selectedRole === 'developer' ? (
            <DeveloperRegistrationForm />
          ) : (
            <ClientRegistrationForm />
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900">
      <div className="max-w-4xl w-full">
        <div className="text-center mb-12 animate-fade-in">
          <div className="relative w-32 h-32 mx-auto mb-8">
            <div className="absolute inset-0 bg-blue-500/20 rounded-full animate-pulse"></div>
            <Scale className="w-32 h-32 text-blue-500 relative z-10" />
            <div className="absolute -top-2 -right-2">
              <div className="relative">
                <Sparkles className="w-8 h-8 text-purple-400 animate-pulse" />
                <Bot className="w-6 h-6 text-purple-500 absolute -bottom-1 -right-1" />
              </div>
            </div>
          </div>
          <h1 className="text-5xl font-bold text-white mb-4 tracking-tight">
            Legal<span className="text-blue-500">Match</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Платформа с поддержкой искусственного интеллекта для эффективного решения юридических вопросов
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <button
            onClick={() => setSelectedRole('client')}
            className="group relative bg-gray-800 rounded-2xl shadow-lg p-8 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:bg-gray-750 border border-gray-700 animate-fade-in overflow-hidden"
            style={{ animationDelay: '100ms' }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="relative z-10">
              <div className="p-4 bg-gradient-to-r from-blue-500/20 to-blue-600/20 rounded-xl w-16 h-16 flex items-center justify-center mb-6">
                <User className="w-8 h-8 text-blue-400" />
              </div>
              <h2 className="text-2xl font-bold text-white mb-4">
                {ru.welcome.clientTitle}
              </h2>
              <p className="text-gray-400">
                {ru.welcome.clientDescription}
              </p>
              <div className="mt-6 flex items-center gap-2 text-sm text-blue-400">
                <Sparkles className="w-4 h-4" />
                <span>AI-помощник для подбора юриста</span>
              </div>
            </div>
          </button>

          <button
            onClick={() => setSelectedRole('lawyer')}
            className="group relative bg-gray-800 rounded-2xl shadow-lg p-8 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:bg-gray-750 border border-gray-700 animate-fade-in overflow-hidden"
            style={{ animationDelay: '200ms' }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="relative z-10">
              <div className="p-4 bg-gradient-to-r from-purple-500/20 to-purple-600/20 rounded-xl w-16 h-16 flex items-center justify-center mb-6">
                <Briefcase className="w-8 h-8 text-purple-400" />
              </div>
              <h2 className="text-2xl font-bold text-white mb-4">
                {ru.welcome.lawyerTitle}
              </h2>
              <p className="text-gray-400">
                {ru.welcome.lawyerDescription}
              </p>
              <div className="mt-6 flex items-center gap-2 text-sm text-purple-400">
                <Bot className="w-4 h-4" />
                <span>AI-анализ профиля и клиентов</span>
              </div>
            </div>
          </button>

          <button
            onClick={() => setSelectedRole('developer')}
            className="group relative bg-gray-800 rounded-2xl shadow-lg p-8 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:bg-gray-750 border border-gray-700 animate-fade-in overflow-hidden"
            style={{ animationDelay: '300ms' }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-green-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="relative z-10">
              <div className="p-4 bg-gradient-to-r from-green-500/20 to-green-600/20 rounded-xl w-16 h-16 flex items-center justify-center mb-6">
                <Code className="w-8 h-8 text-green-400" />
              </div>
              <h2 className="text-2xl font-bold text-white mb-4">
                Разработчик
              </h2>
              <p className="text-gray-400">
                Доступ к API и инструментам разработки
              </p>
              <div className="mt-6 flex items-center gap-2 text-sm text-green-400">
                <Code className="w-4 h-4" />
                <span>Интеграция и разработка</span>
              </div>
            </div>
          </button>
        </div>

        <div className="mt-8 text-center">
          <button
            onClick={() => setShowLogin(true)}
            className="text-blue-400 hover:text-blue-300 transition-colors"
          >
            Уже есть аккаунт? Войти
          </button>
        </div>

        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gray-800/50 rounded-full">
            <Sparkles className="w-4 h-4 text-blue-400" />
            <span className="text-sm text-gray-400">Powered by AI</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoleSelection;