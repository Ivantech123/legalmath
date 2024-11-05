import React, { useEffect, useState } from 'react';
import { Scale, Bot, Sparkles, ChevronRight } from 'lucide-react';
import AuthModal from '../auth/AuthModal';
import LawyerRegistrationModal from './LawyerRegistrationModal';

type ModalType = 'none' | 'login' | 'register-client' | 'register-lawyer' | 'register-developer';

const LandingPage: React.FC = () => {
  const [modalType, setModalType] = useState<ModalType>('none');

  const features = [
    {
      title: 'AI-помощник',
      description: 'Искусственный интеллект поможет найти подходящего юриста',
      icon: Bot,
      color: 'purple'
    },
    {
      title: 'Безопасные консультации',
      description: 'Защищенное общение с юристом через платформу',
      icon: Scale,
      color: 'blue'
    },
    {
      title: 'Умный поиск',
      description: 'Поиск юристов по специализации и рейтингу',
      icon: Sparkles,
      color: 'green'
    }
  ];

  const roles = [
    {
      title: 'Я ищу юриста',
      description: 'Найдите квалифицированного специалиста для решения ваших вопросов',
      icon: Scale,
      color: 'blue',
      type: 'register-client' as ModalType
    },
    {
      title: 'Я юрист',
      description: 'Создайте профиль и находите новых клиентов',
      icon: Bot,
      color: 'purple',
      type: 'register-lawyer' as ModalType
    },
    {
      title: 'Я разработчик',
      description: 'Получите доступ к API платформы',
      icon: Sparkles,
      color: 'green',
      type: 'register-developer' as ModalType
    }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        }
      });
    }, {
      threshold: 0.1
    });

    document.querySelectorAll('.reveal').forEach((element) => {
      observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  const renderModal = () => {
    switch (modalType) {
      case 'login':
        return (
          <AuthModal
            type="login"
            onClose={() => setModalType('none')}
            onTypeChange={() => setModalType('register-client')}
          />
        );
      case 'register-client':
        return (
          <AuthModal
            type="register"
            onClose={() => setModalType('none')}
            onTypeChange={() => setModalType('login')}
          />
        );
      case 'register-lawyer':
        return (
          <LawyerRegistrationModal
            onClose={() => setModalType('none')}
          />
        );
      case 'register-developer':
        return (
          <AuthModal
            type="register"
            role="developer"
            onClose={() => setModalType('none')}
            onTypeChange={() => setModalType('login')}
          />
        );
      default:
        return null;
    }
  };

  return (
    <>
      <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900">
        <div className="container mx-auto px-4 py-16">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <div className="relative w-32 h-32 mx-auto mb-8">
              <div className="absolute inset-0 bg-blue-500/20 rounded-full animate-pulse-ring"></div>
              <Scale className="w-32 h-32 text-blue-500 relative z-10 animate-float" />
              <div className="absolute -top-4 -right-4 animate-bounce-subtle">
                <Bot className="w-8 h-8 text-purple-400" />
              </div>
              <div className="absolute -bottom-4 -left-4 animate-bounce-subtle delay-200">
                <Sparkles className="w-8 h-8 text-blue-400" />
              </div>
            </div>
            <h1 className="text-5xl font-bold text-white mb-4">
              Legal<span className="text-blue-500">Match</span>
            </h1>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Инновационная платформа для поиска юристов с поддержкой искусственного интеллекта
            </p>
          </div>

          {/* Features Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={index}
                  className={`
                    bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6 
                    hover:border-gray-600/50 transition-all duration-300 group
                    hover-float reveal reveal-delay-${index + 1}
                  `}
                >
                  <div className={`
                    w-12 h-12 rounded-lg mb-4 flex items-center justify-center 
                    bg-${feature.color}-500/20 group-hover:animate-bounce-subtle
                  `}>
                    <Icon className={`w-6 h-6 text-${feature.color}-400`} />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-blue-400 transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-gray-400">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Roles Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {roles.map((role, index) => {
              const Icon = role.icon;
              return (
                <button
                  key={index}
                  onClick={() => setModalType(role.type)}
                  className={`
                    bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6 
                    hover:border-gray-600/50 transition-all duration-300 group text-left
                    hover-float reveal reveal-delay-${index + 1}
                  `}
                >
                  <div className={`
                    w-12 h-12 rounded-lg mb-4 flex items-center justify-center 
                    bg-${role.color}-500/20 group-hover:animate-bounce-subtle
                  `}>
                    <Icon className={`w-6 h-6 text-${role.color}-400`} />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-blue-400 transition-colors">
                    {role.title}
                  </h3>
                  <p className="text-gray-400 mb-4">
                    {role.description}
                  </p>
                  <div className="flex items-center gap-2 text-blue-400 group-hover:text-blue-300">
                    <span>Регистрация</span>
                    <ChevronRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
                  </div>
                </button>
              );
            })}
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { number: '1000+', label: 'Юристов' },
              { number: '5000+', label: 'Клиентов' },
              { number: '10000+', label: 'Консультаций' },
              { number: '95%', label: 'Довольных клиентов' }
            ].map((stat, index) => (
              <div 
                key={index} 
                className={`
                  text-center hover-float reveal reveal-delay-${index + 1}
                  hover:bg-gray-800/50 hover:border hover:border-gray-700/50 
                  rounded-xl p-6 transition-all duration-300
                `}
              >
                <div className="text-4xl font-bold text-white mb-2 animate-slide-up">
                  {stat.number}
                </div>
                <div className="text-gray-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Modals */}
      {renderModal()}
    </>
  );
};

export default LandingPage;