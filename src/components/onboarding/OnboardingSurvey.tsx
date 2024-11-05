import React, { useState } from 'react';
import { 
  Sun, 
  Moon, 
  Languages, 
  Scale, 
  Bot, 
  ChevronRight,
  Sparkles,
  MessageSquare,
  Search,
  Shield
} from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { useLanguage } from '../../context/LanguageContext';

const OnboardingSurvey: React.FC = () => {
  const { setTheme } = useTheme();
  const { setLanguage } = useLanguage();
  const [step, setStep] = useState(0);
  const [preferences, setPreferences] = useState({
    theme: 'dark',
    language: 'ru',
    notifications: true,
    interests: [] as string[]
  });

  const steps = [
    {
      id: 'welcome',
      title: 'Добро пожаловать в LegalMatch',
      subtitle: 'Платформа для поиска юристов с поддержкой искусственного интеллекта'
    },
    {
      id: 'appearance',
      title: 'Выберите тему оформления',
      subtitle: 'Вы всегда сможете изменить её в настройках'
    },
    {
      id: 'language',
      title: 'Выберите язык',
      subtitle: 'Вы всегда сможете изменить его в настройках'
    },
    {
      id: 'features',
      title: 'Основные возможности',
      subtitle: 'Познакомьтесь с ключевыми функциями платформы'
    }
  ];

  const features = [
    {
      icon: Bot,
      title: 'AI-ассистент',
      description: 'Искусственный интеллект поможет найти подходящего юриста и проанализировать документы',
      color: 'blue'
    },
    {
      icon: Search,
      title: 'Умный поиск',
      description: 'Находите юристов по специализации, опыту и рейтингу',
      color: 'green'
    },
    {
      icon: MessageSquare,
      title: 'Безопасное общение',
      description: 'Встроенный чат с шифрованием для общения с юристом',
      color: 'purple'
    },
    {
      icon: Shield,
      title: 'Верификация',
      description: 'Все юристы проходят проверку документов и квалификации',
      color: 'orange'
    }
  ];

  const handleNext = () => {
    if (step < steps.length - 1) {
      setStep(prev => prev + 1);
    }
  };

  const renderStep = () => {
    switch (step) {
      case 0:
        return (
          <div className="text-center space-y-8">
            <div className="relative w-32 h-32 mx-auto">
              <div className="absolute inset-0 bg-blue-500/20 rounded-full animate-pulse"></div>
              <Scale className="w-32 h-32 text-blue-500 relative z-10 animate-float" />
              <div className="absolute -top-4 -right-4">
                <Bot className="w-8 h-8 text-purple-400 animate-bounce" />
              </div>
            </div>
            <div>
              <h1 className="text-4xl font-bold text-white mb-4">
                Legal<span className="text-blue-500">Match</span>
              </h1>
              <p className="text-xl text-gray-400 max-w-xl mx-auto">
                Инновационная платформа для поиска юристов с поддержкой искусственного интеллекта
              </p>
            </div>
          </div>
        );

      case 1:
        return (
          <div className="space-y-8">
            <div className="grid grid-cols-2 gap-6">
              <button
                onClick={() => {
                  setTheme('light');
                  setPreferences(prev => ({ ...prev, theme: 'light' }));
                }}
                className={`
                  p-6 rounded-xl border transition-all duration-300
                  ${preferences.theme === 'light'
                    ? 'bg-white border-blue-500 shadow-lg shadow-blue-500/20'
                    : 'bg-gray-800 border-gray-700 hover:bg-gray-700'
                  }
                `}
              >
                <Sun className={`
                  w-12 h-12 mx-auto mb-4
                  ${preferences.theme === 'light' ? 'text-blue-500' : 'text-gray-400'}
                `} />
                <h3 className={`
                  text-lg font-medium mb-2
                  ${preferences.theme === 'light' ? 'text-gray-900' : 'text-white'}
                `}>
                  Светлая тема
                </h3>
                <p className={`
                  text-sm
                  ${preferences.theme === 'light' ? 'text-gray-600' : 'text-gray-400'}
                `}>
                  Классический светлый интерфейс
                </p>
              </button>

              <button
                onClick={() => {
                  setTheme('dark');
                  setPreferences(prev => ({ ...prev, theme: 'dark' }));
                }}
                className={`
                  p-6 rounded-xl border transition-all duration-300
                  ${preferences.theme === 'dark'
                    ? 'bg-gray-800 border-blue-500 shadow-lg shadow-blue-500/20'
                    : 'bg-gray-800 border-gray-700 hover:bg-gray-700'
                  }
                `}
              >
                <Moon className={`
                  w-12 h-12 mx-auto mb-4
                  ${preferences.theme === 'dark' ? 'text-blue-500' : 'text-gray-400'}
                `} />
                <h3 className="text-lg font-medium text-white mb-2">
                  Темная тема
                </h3>
                <p className="text-sm text-gray-400">
                  Комфортный темный интерфейс
                </p>
              </button>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-8">
            <div className="grid grid-cols-2 gap-6">
              <button
                onClick={() => {
                  setLanguage('ru');
                  setPreferences(prev => ({ ...prev, language: 'ru' }));
                }}
                className={`
                  p-6 rounded-xl border transition-all duration-300
                  ${preferences.language === 'ru'
                    ? 'bg-gray-800 border-blue-500 shadow-lg shadow-blue-500/20'
                    : 'bg-gray-800 border-gray-700 hover:bg-gray-700'
                  }
                `}
              >
                <Languages className={`
                  w-12 h-12 mx-auto mb-4
                  ${preferences.language === 'ru' ? 'text-blue-500' : 'text-gray-400'}
                `} />
                <h3 className="text-lg font-medium text-white mb-2">
                  Русский
                </h3>
                <p className="text-sm text-gray-400">
                  Русский язык интерфейса
                </p>
              </button>

              <button
                onClick={() => {
                  setLanguage('en');
                  setPreferences(prev => ({ ...prev, language: 'en' }));
                }}
                className={`
                  p-6 rounded-xl border transition-all duration-300
                  ${preferences.language === 'en'
                    ? 'bg-gray-800 border-blue-500 shadow-lg shadow-blue-500/20'
                    : 'bg-gray-800 border-gray-700 hover:bg-gray-700'
                  }
                `}
              >
                <Languages className={`
                  w-12 h-12 mx-auto mb-4
                  ${preferences.language === 'en' ? 'text-blue-500' : 'text-gray-400'}
                `} />
                <h3 className="text-lg font-medium text-white mb-2">
                  English
                </h3>
                <p className="text-sm text-gray-400">
                  English interface language
                </p>
              </button>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <div
                    key={index}
                    className={`
                      p-6 rounded-xl border border-gray-700/50 bg-gray-800/50
                      hover:bg-gray-800 transition-all duration-300
                    `}
                  >
                    <div className={`
                      w-12 h-12 rounded-lg mb-4 flex items-center justify-center
                      bg-${feature.color}-500/20
                    `}>
                      <Icon className={`w-6 h-6 text-${feature.color}-400`} />
                    </div>
                    <h3 className="text-lg font-medium text-white mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-gray-400">
                      {feature.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 p-4 sm:p-6 lg:p-8">
      <div className="max-w-4xl mx-auto">
        {step > 0 && (
          <div className="text-center mb-12 animate-fade-in">
            <h2 className="text-3xl font-bold text-white mb-2">
              {steps[step].title}
            </h2>
            <p className="text-gray-400">
              {steps[step].subtitle}
            </p>
          </div>
        )}

        <div className="mb-12">
          {renderStep()}
        </div>

        <div className="flex items-center justify-between">
          {step > 0 && (
            <button
              onClick={() => setStep(prev => prev - 1)}
              className="flex items-center gap-2 px-6 py-2 text-gray-400 hover:text-white transition-colors"
            >
              <ChevronRight className="w-5 h-5 rotate-180" />
              <span>Назад</span>
            </button>
          )}

          <button
            onClick={handleNext}
            className={`
              flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-lg
              hover:bg-blue-500 transition-all duration-200 ml-auto
            `}
          >
            {step === steps.length - 1 ? (
              <>
                <Sparkles className="w-5 h-5" />
                <span>Начать работу</span>
              </>
            ) : (
              <>
                <span>Далее</span>
                <ChevronRight className="w-5 h-5" />
              </>
            )}
          </button>
        </div>

        {/* Progress Indicator */}
        <div className="mt-8">
          <div className="flex items-center justify-center gap-2">
            {steps.map((_, index) => (
              <div
                key={index}
                className={`
                  w-2 h-2 rounded-full transition-all duration-300
                  ${step === index
                    ? 'w-8 bg-blue-500'
                    : step > index
                    ? 'bg-blue-500'
                    : 'bg-gray-700'
                  }
                `}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OnboardingSurvey;